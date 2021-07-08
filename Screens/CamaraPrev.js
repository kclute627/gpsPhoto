import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import Gps from "../Gps";

const CamaraPrev = ({ route, navigation }) => {
  const { picture, location } = route.params;

  const [orentation, setOrentation] = useState();

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener((event) => {
      setOrentation(event.orientationInfo.orientation);
      console.log(event.orientationInfo.orientation);
    });

    return () => ScreenOrientation.removeOrientationChangeListeners();
  });
  useEffect(() => {
    ort();
  }, [orentation]);

  const ort = async () => {
    const pisition = await ScreenOrientation.getOrientationAsync();
    setOrentation(pisition);
  };
  const viewShot = useRef();

  const usePhoto = () => {
    captureRef(viewShot, {
      result: "tmpfile",
      height: 1980,
      width: 1180,
      quality: 0.7,
      format: "jpg",
    }).then(
      (uri) => {
        console.log(uri, "uri");

        MediaLibrary.createAssetAsync(uri);
        Alert.alert("Photo Saved");
        navigation.navigate("Camara", { alert: "Photo Saved" });
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  };
  return (
    <View style={orentation !== 1 ? [styles.row] : styles.container}>
      <View style={styles.camera} ref={viewShot}>
        <Image
          source={{ uri: picture }}
          style={{ flex: 1, width: 66, height: 58 }}
        />
        <Gps orentation={orentation} coords={location} />
      </View>

      <View style={orentation !== 1 ? styles.bottomRow : styles.bottom}>
        <View style={[styles.btnAccept, { marginRight: 33 }]}>
          <TouchableOpacity onPress={usePhoto}>
            <Text style={{ color: "white", fontSize: 23 }}>Use Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.btnAccept]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: "white", fontSize: 23 }}>Retake</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  containerRow: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
  },
  gps: {
    position: "absolute",
    bottom: 20,
    left: 15,
  },
  gps2: {
    position: "absolute",
    top: 20,
    left: 15,
  },

  top: {
    // row
    height: 25,

    opacity: 0.75,
    backgroundColor: "#1a1a1a",
  },
  topRow: {
    width: 25,
    opacity: 0.75,
    backgroundColor: "black",
  },
  bottomRow: {
    width: 150,
    backgroundColor: "#1a1a1a",
    opacity: 0.5,

    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    backgroundColor: "#1a1a1a",
    height: 135,

    flexDirection: "row",

    justifyContent: "center",
  },
  button: {
    height: 65,
    width: 65,
    borderRadius: 1000,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  btnAccept: {
    height: 65,
    width: 145,
    backgroundColor: "#4a4a4a",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
});

export default CamaraPrev;
