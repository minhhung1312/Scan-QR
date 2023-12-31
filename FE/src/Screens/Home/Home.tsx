// import { i18n, LocalizationKey } from "@/Localization";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { HStack, Spinner, Heading, ScrollView } from "native-base";
import { ScrollView } from "native-base";
import { User } from "@/Services";
import { Image } from "react-native";
import { Button } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../RootStackParamList';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { domain } from "../../domain";
import { fetchLocationData } from "../Scan/Scan";

export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  const { data, isLoading } = props;
  type ScanScreenProps = StackNavigationProp<RootStackParamList, 'Scan'>;
  const navigation = useNavigation<ScanScreenProps>();

  const [recentLocation, setRecentLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${domain}/api/history?line_number=5`).then(res => {
          const list = res.data;

          setRecentLocation(list);
        })
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const outstandingDummy = [
    {
      id: "658839b62b9b4c5beca1e4ee",
      name: "Ho Chi Minh University of Technology",
      image: require("../../../assets/hcmut-outstanding.png"),
    },
    {
      id: "6588e92c189736bbac5eb368",
      name: "Ho Chi Minh City International University",
      image: require("../../../assets/iu-outstanding.png"),
    },
    {
      id: "65883b562b9b4c5beca1e4ef",
      name: "Ho Chi Minh City University of Science",
      image: require("../../../assets/hcmus-outstanding.png"),
    },
  ];

  const recentResult = async (id) => {
    console.log(id);
    const response = await fetchLocationData(id);
    console.log(response);
    navigation.navigate('Result', { location: response });
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <ScrollView style={styles.scrollContainer}>
        <View style={{ marginBottom: 30 }}>
          <View style={styles.topContainer}>
            <Image
              source={require("../../../assets/app-icon.png")}
              style={{ width: 120, height: 120 }}
            />
            <View>
              <Text style={homeTitle.name}>Quick Location Info Scanning</Text>
              <Text style={homeTitle.slogan}>Unlock Locations, Uncover Stories!</Text>
              <Button title="Scan now!" color="#15803d" onPress={() => navigation.navigate("Scan")} />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text style={locationStyle.title}>Recently scanned locations</Text>
          <View style={locationStyle.container}>
            {recentLocation.map((item, index) => (
              <TouchableOpacity key={index} style={locationItemStyle.container} onPress={() => recentResult(item.location._id)}>
                <Text style={locationItemStyle.text}>{item.location.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View>
          <Text style={locationStyle.title}>Outstanding locations</Text>
          <View style={styles.outstandingContainer}>
            {outstandingDummy.map((item, index) => (
              <TouchableOpacity key={index} style={{ width: 120 }} onPress={() => recentResult(item.id)}>
                <Image source={item.image} />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

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
    // height: 34,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#15803D",
  },
  text: {
    fontSize: 12,
    paddingLeft: 16,
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