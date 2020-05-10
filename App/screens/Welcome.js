import React from "react";
import Images from "../assets/Images";
import styles from "../styles/WelcomeStyles.js";
import LottieView from "lottie-react-native";

import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.welcomeView}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Image
            style={styles.logo}
            source={Images.logo}
            resizeMode="contain"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.push("SignIn")}
            activeOpacity={0.8}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push("SignUp")}
            activeOpacity={0.8}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <LottieView
        style={styles.bubbles}
        source={require("../assets/img/animations/bubbles.json")}
        autoPlay
        loop
        resizeMode="contain"
      />
    </View>
  );
};

export default Welcome;
