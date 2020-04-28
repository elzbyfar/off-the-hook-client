import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Images from "../assets/Images";

const styles = StyleSheet.create({
  CharacterSelectView: {
    flex: 1,
    backgroundColor: "#22a1e6",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    color: "#eee",
    marginBottom: 8,
    letterSpacing: 1,
  },
  boxes: {
    width: 300,
    height: 300,
    marginTop: 1,
    borderColor: "#444",
    borderWidth: 2,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2190cc",
  },
  characterBox: {
    width: 137,
    height: 137,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#22a1e6",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    width: 100,
    height: 100,
  },
  lockedCharacter: {
    tintColor: "gray",
    opacity: 0.7,
  },
  lock: {
    position: "absolute",
    height: 75,
  },
});

export default ({ navigation }) => (
  <View style={styles.CharacterSelectView}>
    <Text style={styles.heading}>SELECT A SWIMMER</Text>
    <View style={styles.boxes}>
      <TouchableOpacity
        style={styles.characterBox}
        onPress={() => navigation.push("LevelOne")}
        activeOpacity={0.6}
      >
        <Image
          style={styles.photo}
          source={Images.tenacious04}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.characterBox}
        onPress={() =>
          alert("This swimmer is trapped! Collect crystals to release them.")
        }
        activeOpacity={0.6}
      >
        <Image
          style={[styles.photo, styles.lockedCharacter]}
          source={Images.ignatius01}
          resizeMode="contain"
        />
        <LottieView
          style={styles.lock}
          source={require("../assets/img/animations/lock.json")}
          autoPlay
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.characterBox}
        onPress={() =>
          alert("This swimmer is trapped! Collect crystals to release them.")
        }
        activeOpacity={0.6}
      >
        <Image
          style={[styles.photo, styles.lockedCharacter]}
          source={Images.fugacious01}
          resizeMode="contain"
        />
        <LottieView
          style={styles.lock}
          source={require("../assets/img/animations/lock.json")}
          autoPlay
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.characterBox}
        onPress={() =>
          alert("This swimmer is trapped! Collect crystals to release them.")
        }
        activeOpacity={0.6}
      >
        <Image
          style={[styles.photo, styles.lockedCharacter]}
          source={Images.loquacious01}
          resizeMode="contain"
        />
        <LottieView
          style={styles.lock}
          source={require("../assets/img/animations/lock.json")}
          autoPlay
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  </View>
);
