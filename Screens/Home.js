import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const Home = ({ navigation: { navigate } }) => {
  /// gps cords in state here and then a function to grab them
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#ffffff", "#fcfcfc" ]}  
      style={styles.container}
    >
      <View style={styles.top}>
        <LottieView
          style={{
            width: 400,
            height: 400,
          }}
          source={require("../Assets/20054-gps-location-arrow.json")}
        />
        <Text
          style={{
            fontSize: 44,
            fontWeight: "700",
            color: "blue",
            marginTop: -75,
            marginBottom: 88,
          }}
        >
          GPS Photo
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigate("Camara")}
        style={[styles.button]}
      >
        <Text style={[styles.btnText]}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert("We Are working on Creating This Please Check Back")
        }
        style={[styles.button, { marginTop: 24 }]}
      >
        <Text style={[styles.btnText]}>Settings</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: -53,
  },
  button: {
    fontSize: 20,
    backgroundColor: "#3541e6",
    color: "white",
    width: 195,
    height: 95,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    opacity: 0.2,
  },
});

export default Home;
