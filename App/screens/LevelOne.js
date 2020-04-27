import React, { Component } from "react";
import Images from "../assets/Images";
import LottieView from "lottie-react-native";
// import Constants from

import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";

const styles = StyleSheet.create({
  gameView: {
    backgroundColor: "#22a1e6",
    flex: 1,
  },
});

class LevelOne extends Component {
  state = {};

  render() {
    return <View style={styles.gameView}></View>;
  }
}

export default LevelOne;
