import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "@/Services";
import { HStack, Spinner, Heading, ScrollView } from "native-base";
import { Button } from "react-native";
import moment from 'moment';
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity, Alert } from 'react-native';

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
    height: 34,
    borderColor: "#15803D",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
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

const homeTitle = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  slogan: {
    marginBottom: 20,
  },
});
const buttonStyle = StyleSheet.create({
  scanButton: {
    borderRadius: 30,
    width: 120,
    height: 50,
    backgroundColor: "#15803D",
  },
  scanText: {
    fontWeight: "bold",
    color: "white",
  },
});

const dateStyle = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
});