import React, { Component } from "react";
import Images from "../assets/Images";
import styles from "../styles/SignInStyles.js";
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

const SignIn = ({ navigation, route }) => {
  return (
    <View>
      <Formik
        initialValues={{ name: "", password: "" }}
        onSubmit={(values, actions) => {
          // if (this.state.formType === "create") {
          fetch("http://localhost:3000/api/v1/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(values),
          })
            .then((resp) => resp.json())
            // .then((user) => {
            //   this.setState({
            //     user: {
            //       id: user.id,
            //       name: user.name,
            //     },
            //   });
            // })
            .then((user) =>
              navigation.push("CharacterSelect", {
                user: user,
              })
            );
          // } else if (this.state.formType === "find") {
          //   fetch("http://localhost:3000/api/v1/users", {
          //     method: "GET",
          //   })
          //     .then((resp) => resp.json())
          //     .then((users) => {
          //       let user = users.find((user) => {
          //         return user.name === values.name;
          //       });
          //       () =>
          //         navigation.push("CharacterSelect", {
          //           user: user,
          //         });
          //     });
          // .then(() =>
          //   navigation.push("CharacterSelect", {
          //     user: user,
          //   })
          // );
          // }
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <React.Fragment>
            <View style={styles.formContainer}>
              <TextInput
                placeholder={
                  // this.state.formType === "find"
                  // ? "enter your name"
                  // :
                  "create name"
                }
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
                        "Create New Account"
                        {/* } */}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} onPress={this.showForm}>
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
    </View>
  );
};

export default SignIn;
