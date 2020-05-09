import React from "react";
import Images from "../assets/Images";
import styles from "../styles/WelcomeStyles.js";
import LottieView from "lottie-react-native";
import { Formik } from "formik";
import * as yup from "yup";

import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";

const validationSchema = yup.object().shape({
  name: yup.string().label("name").required().min(3, "Seems a bit short..."),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(3, "Seems a bit short..."),
});

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      formType: "",
      user: {
        id: "",
        name: "",
      },
    };
  }

  userID = null;

  showForm = (type) => {
    this.setState((state) => ({
      showForm: !state.showForm,
      formType: type,
    }));
  };

  render() {
    return (
      <View style={styles.welcomeView}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <Animated.View>
            <Animated.Image
              style={{
                width: !this.state.showForm ? 380 : 150,
                height: !this.state.showForm ? 380 : 150,
                marginTop: !this.state.showForm ? 0 : -180,
                marginBottom: !this.state.showForm ? -30 : 10,
                zIndex: -10,
              }}
              source={Images.logo}
              resizeMode="contain"
            />
          </Animated.View>
          {!this.state.showForm ? (
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.push("SignIn")}
                activeOpacity={0.8}
              >
                <View style={styles.buttonView}>
                  <Text style={styles.buttonText}>SIGN IN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.push("SignUp")}
                activeOpacity={0.8}
              >
                <View style={styles.buttonView}>
                  <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
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
  }
}

export default Welcome;
