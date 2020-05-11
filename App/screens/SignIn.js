import React from "react";
import ValidationSchema from "../helpers/Validation";
import LottieView from "lottie-react-native";
import MakeGet from "../helpers/MakeGet";
import Images from "../assets/Images";
import styles from "../styles/SignInStyles.js";
import { Formik } from "formik";

import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.SignInView}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Image
            style={styles.logo}
            source={Images.logo}
            resizeMode="contain"
          />
        </View>
        <Formik
          initialValues={{ name: "", password: "" }}
          onSubmit={(values) => {
            MakeGet("users", (users) => {
              let user = users.find((user) => {
                return user.name === values.name;
              });
              navigation.push("CharacterSelect", { user, newUser: false });
            });
          }}
          validationSchema={ValidationSchema}
        >
          {(formikProps) => (
            <React.Fragment>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder={"enter your name"}
                  placeholderTextColor="#ddd"
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange("name")}
                  autoFocus
                />
              </View>
              <View>
                <TextInput
                  placeholder={"enter your password"}
                  placeholderTextColor="#ddd"
                  style={styles.formInput}
                  onChangeText={formikProps.handleChange("password")}
                  secureTextEntry
                />
                <Text style={styles.errors}>{formikProps.errors.name}</Text>
                <Text style={styles.errors}>{formikProps.errors.password}</Text>
                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <View style={styles.submitButtonContainer}>
                    <TouchableOpacity
                      type="submit"
                      activeOpacity={0.8}
                      onPress={formikProps.handleSubmit}
                    >
                      <View style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Sign In</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </React.Fragment>
          )}
        </Formik>
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

export default SignIn;
