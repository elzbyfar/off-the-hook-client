import React, { Component } from "react";
import Images from "../assets/Images";
import styles from "../styles/SignUpStyles.js";
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
  name: yup.string().label("name").required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(3, "Seems a bit short..."),
});

const SignUp = ({ navigation, route }) => {
  return (
    <View style={styles.SignUpView}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View>
          <Animated.Image
            style={{
              width: 150,
              height: 150,
              marginTop: -180,
              marginBottom: 10,
              zIndex: -10,
            }}
            source={Images.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={(values, actions) => {
            fetch("http://localhost:3000/api/v1/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                ...values,
                unlocked_characters: ["Nemo"],
                unlocked_levels: ["Level One"],
                keys: 0,
              }),
            })
              .then((resp) => resp.json())
              .then((user) => {
                navigation.push("CharacterSelect", {
                  user: user,
                });
              });
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <React.Fragment>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder={"create name"}
                  placeholderTextColor="#ddd"
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange("name")}
                  autoFocus
                />
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  placeholder={
                    // this.state.formType === "find"
                    //   ? "enter your password"
                    // :
                    "create password"
                  }
                  placeholderTextColor="#ddd"
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange("password")}
                  secureTextEntry
                />
                <Text style={{ color: "#a31717", marginTop: 2 }}>
                  {formikProps.errors.name}
                </Text>
                <Text style={{ color: "#a31717", marginTop: 2 }}>
                  {formikProps.errors.password}
                </Text>
                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <View style={styles.submitButtonContainer}>
                    <TouchableOpacity
                      type="submit"
                      activeOpacity={0.8}
                      onPress={formikProps.handleSubmit}
                    >
                      <View
                        style={[
                          styles.submitButton,
                          { width: 150, marginBottom: 5 },
                        ]}
                      >
                        <Text style={styles.submitButtonText}>
                          {/* {this.state.formType === "find"
                          ? "Sign In" */}
                          {/* :  */}
                          Create New Account
                          {/* } */}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.push("Welcome")}
                    >
                      <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>{"Back"}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </React.Fragment>
          )}
        </Formik>
        <LottieView
          style={styles.bubbles}
          source={require("../assets/img/animations/bubbles.json")}
          autoPlay
          loop
          resizeMode="contain"
        />
      </SafeAreaView>
    </View>
  );
};

export default SignUp;
