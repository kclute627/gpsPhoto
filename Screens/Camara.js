import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import Gps from "../Gps";
const Camara = ({ navigation: { navigate } }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [orentation, setOrentation] = useState(1);
  const [snapShot, setSnapShot] = useState("");
  const [picture, setPicture] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  /// Get latlon and pass to component and get coord quicker

  useEffect(() => {
    permission();
  }, []);
  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener((event) => {
      setOrentation(event.orientationInfo.orientation);
      console.log(event.orientationInfo.orientation);
    });

    return () => ScreenOrientation.removeOrientationChangeListeners();
  });
  useEffect(() => {
    locationPermission();
  });
  useEffect(() => {
    ort();
  });

  let camara;

  const date = new Date();

  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const fullDate = `${month}/${day}/${year}`;

  const locationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let locationBackground = await Location.getLastKnownPositionAsync({});
    if (!location && locationBackground.coords !== location) {
      setLocation(locationBackground.coords);
    }
    let locationNow = await Location.getCurrentPositionAsync({});
    if (
      locationNow &&
      locationNow.coords.latitude !== locationBackground.coords.latitude
    ) {
      setLocation(locationNow.coords);
    }
  };

  const cameraSwitch = () => {
    const front = Camera.Constants.Type.front;
    const back = Camera.Constants.Type.back;
    if (type == back) {
      return setType(front);
    }
    if (type == front) {
      return setType(back);
    }
  };

  const permission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status);
  };

  const ort = async () => {
    const pisition = await ScreenOrientation.getOrientationAsync();
    setOrentation(pisition);
  };

  const takePhoto = async () => {
    const { uri } = await camara.takePictureAsync();

    setPicture(uri);

    navigate("Camaraprev", {
      picture: uri,
      orentation,
      location,
      date: fullDate,
    });
  };

  return (
    <Camera
      style={
        orentation !== 1 ? [styles.container, styles.row] : styles.container
      }
      ref={(r) => {
        camara = r;
      }}
      type={type}
    >
      <View style={orentation !== 1 ? styles.topRow : styles.top}>
        <SafeAreaView></SafeAreaView>
      </View>

      <View style={styles.camera} type={type}>
        {location ? (
          <View style={orentation === 1 ? styles.gps : styles.gps2}>
            <Text style={styles.text}>{fullDate}</Text>

            <View>
              <Text style={styles.text}>Lat: {location.latitude}</Text>
              <Text style={styles.text}>Lng: {location.longitude}</Text>
            </View>
          </View>
        ) : (
          <Text>Waiting</Text>
        )}
      </View>

      <View style={orentation !== 1 ? styles.bottomRow : styles.bottom}>
        <View style={styles.btnContainer}>
          <Text
            style={orentation !== 1 ? { display: "none" } : styles.btnText}
          ></Text>
          <TouchableOpacity
            style={orentation !== 1 ? styles.bottomIcon4 : styles.bottomIcon3}
            onPress={() => navigate("Home")}
          >
            <MaterialIcons name="arrow-left" size={82} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <View style={styles.insideButton} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={orentation !== 1 ? styles.bottomIcon2 : styles.bottomIcon}
          onPress={cameraSwitch}
        >
          <MaterialIcons name="flip-camera-android" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    fontSize: 23,
    color: "white",
  },

  top: {
    // row
    height: 5,
    opacity: 0.75,
    backgroundColor: "black",
  },
  topRow: {
    width: 45,
    opacity: 0.75,
    backgroundColor: "black",
  },
  bottomRow: {
    width: 100,
    backgroundColor: "gray",
    opacity: 0.5,
    justifyContent: "center",
  },
  bottom: {
    backgroundColor: "gray",
    height: 130,

    opacity: 0.5,
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
    marginTop: 15,
  },
  btnContainer: {
    alignItems: "center",
    // justifyContent: "center",
  },
  insideButton: {
    height: 45,
    width: 45,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 1000,
  },
  btnText: {
    paddingTop: 5,
    color: "gold",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "700",
  },
  bottomIcon: {
    position: "absolute",
    right: 54,
    top: "35%",
  },
  bottomIcon2: {
    position: "absolute",
    right: 35,
    top: 75,
  },
  bottomIcon3: {
    position: "absolute",
    right: 121,
    top: "16%",

  },
  bottomIcon4: {
    position: "absolute",
    right: 54,
    top: "35%",

  },
  row: {
    flexDirection: "row",
  },
});

export default Camara;
