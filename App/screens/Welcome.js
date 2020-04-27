import React from "react";
import Images from "../assets/Images";
import LottieView from "lottie-react-native";
import { Formik } from "formik";
import * as yup from "yup";

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  ActivityIndicator,
} from "react-native";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  welcomeView: {
    flex: 1,
    backgroundColor: "#22a1e6",
    justifyContent: "center",
    alignItems: "center",
  },
  bubbles: {
    position: "absolute",
    width: 1000,
    zIndex: -1,
  },
  annoyedFish: {
    width: 240,
    marginTop: -150,
    position: "absolute",
  },
  safeArea: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    alignItems: "center",
    backgroundColor: "rgba(250, 253, 255, 0.4)",
    borderColor: "rgba(250, 253, 255, 0.4)",
    paddingVertical: 10,
    width: 200,
    marginBottom: 5,
    borderRadius: 35,
    opacity: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgb(42, 72, 107)",
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().label("Username").required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(3, "Seems a bit short..."),
});

class Welcome extends React.Component {
  constructor({ props }) {
    super({ props });
    this.state = {
      showForm: false,
      signInForm: false,
      createAccountForm: false,
    };
  }

  showForm = (formType) => {
    this.setState((state) => ({
      showForm: !state.showForm,
      // [formType]: !state[formType],
    }));
  };

  render() {
    return (
      <View style={styles.welcomeView}>
        <StatusBar barStyle="light-content" />
        {/* BLOW FISH */}
        {/* <LottieView
          style={styles.annoyedFish}
          source={require("../assets/img/annoyed-fish.json")}
          autoPlay
          loop
          resizeMode="cover"
        /> */}
        {/* BLOW FISH */}
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
                onPress={() => this.showForm()}
                activeOpacity={0.8}
              >
                <View style={styles.buttonView}>
                  <Text style={styles.buttonText}>SIGN IN</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.showForm()}
                activeOpacity={0.8}
              >
                <View style={styles.buttonView}>
                  <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values, actions) => {
                  alert(JSON.stringify(values));
                  setTimeout(() => {
                    actions.setSubmitting(false);
                  }, 1000);
                }}
                validationSchema={validationSchema}
              >
                {(formikProps) => (
                  <React.Fragment>
                    <View style={{ marginBottom: 5, marginTop: -30 }}>
                      <TextInput
                        placeholder="enter your username"
                        placeholderTextColor="#ddd"
                        style={{
                          backgroundColor: "#22a1e6",
                          borderWidth: 1,
                          borderRadius: 35,
                          fontSize: 16,
                          fontWeight: "500",
                          width: 200,
                          alignItems: "center",
                          textAlign: "center",
                          borderColor: "#555",
                          paddingVertical: 12,
                        }}
                        onChangeText={formikProps.handleChange("username")}
                        autoFocus
                      />
                    </View>
                    <View style={{}}>
                      <TextInput
                        placeholder="enter your password"
                        placeholderTextColor="#ddd"
                        style={{
                          backgroundColor: "#22a1e6",
                          borderWidth: 1,
                          borderRadius: 35,
                          fontSize: 16,
                          fontWeight: "500",
                          width: 200,
                          textAlign: "center",
                          borderColor: "#555",
                          paddingVertical: 12,
                        }}
                        onChangeText={formikProps.handleChange("password")}
                        secureTextEntry
                      />
                      {/* ERROR MESSAGES */}
                      {/* <Text style={{ color: "red" }}>
                        {formikProps.errors.username}
                      </Text>
                      <Text style={{ color: "red" }}>
                        {formikProps.errors.password}
                      </Text> */}
                      {/* ERRER MESSAGES */}
                      {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                      ) : (
                        <View
                          style={{
                            marginTop: 15,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: 200,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={{ marginBottom: -5 }}>
                              <Button
                                color="#ddd"
                                title="Back"
                                onPress={this.showForm}
                              />
                            </View>
                            <Button
                              color="#ddd"
                              title="<<"
                              onPress={this.showForm}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={{ marginBottom: -5 }}>
                              <Button
                                color="#ddd"
                                title="Enter"
                                onPress={() =>
                                  this.props.navigation.push("LevelOne")
                                }
                              />
                            </View>
                            <Button
                              color="#ddd"
                              title=">>"
                              onPress={() =>
                                this.props.navigation.push("LevelOne")
                              }
                            />
                          </View>
                        </View>
                      )}
                    </View>
                  </React.Fragment>
                )}
              </Formik>
            </View>
          )}
        </SafeAreaView>
        <LottieView
          style={styles.bubbles}
          source={require("../assets/img/bubbles.json")}
          autoPlay
          loop
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default Welcome;
