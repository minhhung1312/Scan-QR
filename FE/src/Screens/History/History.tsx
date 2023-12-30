import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/Services";
import { HStack, Spinner, Heading, ScrollView } from "native-base";
import { Button } from "react-native";
import moment from 'moment';
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { domain } from "../../domain";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const History = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const [historylist, setHistoryList] = useState([
    {
      "date": "22/12/2023",
      "detail": [
        {
          "id": 1,
          "time": "8:08 PM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 2,
          "time": "8:20 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 3,
          "time": "7:30 AM",
          "location": "Ho Chi Minh University of Technology",
        },
      ]
    },
    {
      "date": "14/11/2023",
      "detail": [
        {
          "id": 4,
          "time": "8:08 PM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 5,
          "time": "8:20 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 6,
          "time": "7:30 AM",
          "location": "Ho Chi Minh University of Technology",
        },
      ]
    },
    {
      "date": "13/11/2023",
      "detail": [
        {
          "id": 7,
          "time": "8:08 PM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 8,
          "time": "8:20 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 9,
          "time": "7:30 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 10,
          "time": "8:20 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 11,
          "time": "7:30 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 12,
          "time": "7:30 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 13,
          "time": "8:20 AM",
          "location": "Ho Chi Minh University of Technology",
        },
        {
          "id": 14,
          "time": "7:30 AM",
          "location": "Ho Chi Minh University of Technology",
        },
      ]
    },
  ]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        axios.get(`${domain}/api/history`).then(res => {
          var datalist = res.data;
          // console.log(datalist);
          var history = [];
          while (datalist.length > 0) {
            const date = new Date(datalist[0].timestamp.split("T")[0]);
            console.log("Date: ", date);
            var detail = [];
            while (true) {
              var currentDate = new Date(datalist[0].timestamp.split("T")[0]);
              if (currentDate.getDate() === date.getDate() && currentDate.getMonth() === date.getMonth() && currentDate.getFullYear() === date.getFullYear()) {
                const [hour, minute] = datalist[0].timestamp.split("T")[1].split(':').slice(0, 2); // Splitting the string and taking the first two parts

                const hour2min = `${hour}:${minute}`;

                detail.push({
                  "id": datalist[0]._id,
                  "time": hour2min,
                  "location": datalist[0].location.name
                })
                datalist.splice(0, 1);
                if (datalist.length === 0) {
                  history.push({
                    "date": `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                    "detail": detail,
                  })
                  console.log("History length: ", history.length);
                  break;
                }
              }
              else {
                history.push({
                  "date": `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                  "detail": detail,
                })
                console.log("History length: ", history.length);
                break;
              }
            }
            console.log("Data left: ", datalist.length);
          }
          console.log(history);
          setHistoryList(history);
        })
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchHistory();
  }, []);

  const currentDate = moment().format('DD/MM/YYYY');

  const handleDeleteItem = (date: string, id: number) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Cập nhật state để xóa phần tử
            axios.delete(`${domain}/api/history/${id}`).then((res) => {
              console.log(res.data.message);
            });
            setHistoryList(prevList => {
              const updatedList = prevList.map(item => {
                if (item.date === date) {
                  item.detail = item.detail.filter(detailItem => detailItem.id !== id);
                }
                return item;
              });
              return updatedList;
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <ScrollView style={styles.scrollContainer}>
        <View>
          {historylist.map((item, index) => (
            <View key={index} style={dateStyle.container}>
              <Text style={locationStyle.title}>
                {item.date === currentDate
                  ? `Today, ${item.date}`
                  : item.date}
              </Text>
              <View style={locationStyle.container}>
                {item.detail.map((item1, index1) => (
                  <View key={index1} style={locationItemStyle.container}>
                    <Text style={locationItemStyle.text}>
                      {item1.location}
                    </Text>
                    <Text style={locationItemStyle.time}>
                      {item1.time}
                    </Text>
                    <TouchableOpacity
                      style={locationItemStyle.icon}
                      onPress={() => handleDeleteItem(item.date, item1.id)}
                    >
                      <Icon name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          ))}

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    marginTop: 20,
  },
  topContainer: {
    display: "flex",
    flexDirection: "row",
  },
  outstandingContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

const locationItemStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    width: "100%",
    height: 40,
    borderColor: "#15803D",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    width: 240,
    flexWrap: 'wrap',
    fontSize: 12,
    marginLeft: 12,
  },
  time: {
    fontSize: 12,
    marginLeft: 26,
  },
  icon: {
    marginLeft: 20,
  },
});
const locationStyle = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
    paddingRight: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 10,
  },
});

const dateStyle = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
});