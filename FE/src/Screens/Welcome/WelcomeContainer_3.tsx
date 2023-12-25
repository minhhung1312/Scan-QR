import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "react-native";
const onboarding3 = require("../../../assets/onboarding3.png");

type WelcomeScreenNavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  RootScreens.OB3
>;

const Welcome = (props: { onNavigate: (string: RootScreens) => void }) => {
  return (
    <View style={styles.container}>
      <Image
        source={onboarding3}
        style={{ width: 300, height: 500, borderRadius: 10 }}
      />
      <Text style={styles.text}>Explore The World Around You !</Text>
      <StatusBar style="auto" />
      <View style={styles.icons}>
        <Button
          style={styles.button}
          onPress={() => props.onNavigate(RootScreens.OB2)}
        >
          {/* <Icon name="angle-left" style={styles.icon} /> */}
          <Text style={{ color: "#fff", fontSize: 50, fontWeight: "bold" }}>
            {"<"}
          </Text>
        </Button>
        <Button
          style={styles.button}
          onPress={() => props.onNavigate(RootScreens.MAIN)}
        >
          <Text style={styles.start}>Let's go</Text>
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
    paddingTop: 180,
  },
  text: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 50,
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
  start: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export const WelcomeContainer_3 = ({
  navigation,
}: WelcomeScreenNavigatorProps) => {
  const onNavigate = (screen: RootScreens) => {
    navigation.navigate(screen);
  };

  return <Welcome onNavigate={onNavigate} />;
};
