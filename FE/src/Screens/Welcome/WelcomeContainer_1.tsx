import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, ChevronLeftIcon, ChevronRightIcon } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native";
const logo = require("../../../assets/logo.png");

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.OB1
>;

const Welcome = (props: { onNavigate: (string: RootScreens) => void }) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 150, height: 150 }} />
      <Text style={styles.text}>Unlock Locations, Uncover Stories!</Text>
      <StatusBar style="auto" />
      <View style={styles.icons}>
        <Button
          style={styles.button}
          onPress={() => props.onNavigate(RootScreens.OB1)}
        >
          {/* <Icon name="angle-left" style={styles.icon} /> */}
        </Button>
        <Button
          style={styles.button}
          onPress={() => props.onNavigate(RootScreens.OB2)}
        >
          {/* <Icon name="angle-right" style={styles.icon} /> */}
          <Text style={{ color: "#fff", fontSize: 50, fontWeight: "bold" }}>
            {">"}
          </Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15803D",
    alignItems: "center",
    paddingTop: 280,
  },
  text: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 300,
    fontSize: 20,
    color: "#fff",
  },
  icons: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    fontSize: 50,
    color: "#fff",
    marginTop: 20,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
});

export const WelcomeContainer_1 = ({
  navigation,
}: WelcomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Welcome onNavigate={onNavigate} />;
};
