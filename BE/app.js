const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const QRCode = require('qrcode-reader');
const Jimp = require('jimp');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const uri = "mongodb+srv://admin123:o9SvpllhTGdXs2R2@cluster0.q2uyear.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.get('/api/locations', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("QR");
    const collection = database.collection("locations");

    const locations = await collection.find({}).toArray();

    res.json(locations);
  } finally {
    await client.close();
  }
});

app.get('/api/locations/:id', async (req, res) => {
  const locationId = req.params.id;

  try {
    await client.connect();
    const database = client.db("QR");
    const collection = database.collection("locations");

    const location = await collection.findOne({ _id: new ObjectId(locationId) });

    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } finally {
    await client.close();
  }
});

// Cập nhật API add-history
app.post('/api/add-history', async (req, res) => {
  const { location, timestamp } = req.body;

  try {
    await client.connect();
    const database = client.db("QR");
    const collection = database.collection("history");

    const historyRecord = {
      location,
      timestamp
    };

    const result = await collection.insertOne(historyRecord);

    res.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// API để lấy lịch sử
app.get('/api/history', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("QR");
    const collection = database.collection("history");
    const line_num = req.query.line_number;
    var history = null;
    if (line_num === undefined){
      history = await collection.find({}).sort({timestamp: -1}).toArray();
    }
    else{
      history = await collection.find({}).limit(parseInt(line_num)).sort({timestamp: -1}).toArray();
    }
    
    res.json(history);
  } finally {
    await client.close();
  }
});


// API để lấy lịch sử theo ID
app.get('/api/history/:id', async (req, res) => {
  const historyId = req.params.id;

  try {
    await client.connect();
    const database = client.db("QR");
    const collection = database.collection("history");

    const historyRecord = await collection.findOne({ _id: new ObjectId(historyId) });

    if (!historyRecord) {
      return res.status(404).json({ error: 'History record not found' });
    }

    res.json(historyRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});


// API để xóa lịch sử theo ID
app.delete('/api/history/:id', async (req, res) => {
  const historyId = req.params.id;

  try {
    await client.connect();
    const database = client.db("QR");
    const collection = database.collection("history");

    const result = await collection.deleteOne({ _id: new ObjectId(historyId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'History record not found' });
    }

    res.json({ success: true, message: 'History record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


