import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { User } from "@/Services";
import { HStack, Spinner, Heading, ScrollView } from "native-base";
import { Image } from "react-native";
import { useRoute, RouteProp } from '@react-navigation/native';
import { Location } from "../types";
import { RootStackParamList } from "../RootStackParamList";
// import { Button } from "react-native";
// import moment from 'moment';
// import Icon from "react-native-vector-icons/FontAwesome";
// import { TouchableOpacity, Alert } from 'react-native';

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}


export const Result = (props: IHomeProps) => {
  const { data, isLoading } = props;
  const route = useRoute<RouteProp<RootStackParamList, 'Result'>>();
  const locationData = route.params?.location;

  const screenWidth = Dimensions.get('window').width;

  const imageMap = {
    'h6.jpg': require('../../../assets/h6.jpg'),
    'hcmus.jpg': require('../../../assets/hcmus.jpg'),
    'iu.png': require('../../../assets/iu.png'),
  };
  const imageName = locationData.image.split('/').pop().replace('")', '');
  const imageSource = imageMap[imageName];

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.topContainer}>
          <Image
            source={imageSource}
            style={{ width: screenWidth, height: screenWidth * 0.5 }}
          />
        </View>

        {locationData ? (
          <View style={locationStyle.container}>
            <View style={locationItemStyle.container}>
              <Text style={locationItemStyle.text}>{locationData.name}</Text>
            </View>
            <View style={locationItemStyle.container}>
              <Text style={locationItemStyle.text}>Address: {locationData.address}</Text>
            </View>
            <View style={locationItemStyle.container}>
              <Text style={locationItemStyle.text}>Open: {locationData.open}</Text>
            </View>
            <View style={locationItemStyle.container}>
              <Text style={locationItemStyle.text}>Facilities: {locationData.facilities}</Text>
            </View>
            <View style={locationItemStyle.container}>
              <Text style={locationItemStyle.text}>Direction: {locationData.direction}</Text>
            </View>
            <View style={locationItemStyle.large_container}>
              <Text style={locationItemStyle.text}>Description: {locationData.description}</Text>
            </View>
            <View style={locationItemStyle.large_container}>
              <Text style={locationItemStyle.text}>More details: {locationData.details}</Text>
            </View>
          </View>
        ) : (
          <Text>Không có dữ liệu</Text>
        )}

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
    marginBottom: 30,
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
  large_container: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    width: "100%",
    borderColor: "#15803D",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
});
const locationStyle = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
    marginTop: 20,
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