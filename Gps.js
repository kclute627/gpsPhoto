import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Gps = ({ orentation, coords, location }) => {
  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const fullDate = `${month}/${day}/${year}`;

  const { latitude, longitude } = coords;
  return (
    <View style={orentation === 1 ? styles.gps : styles.gps2}>
      <Text style={styles.text}>{fullDate}</Text>

      <View>
        <Text style={styles.text}>Lat: {latitude}</Text>
        <Text style={styles.text}>Lng: {longitude}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gps: {
    position: "absolute",
    bottom: 70,
    left: 15,
  },
  gps2: {
    position: "absolute",
    top: 20,
    left: 15,
  },
  text: {
    fontSize: 24,
    color: "white",

  },
});

export default Gps;
