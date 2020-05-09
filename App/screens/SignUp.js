import React from "react";
import MakePost from "../helpers/MakePost";
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
  Image,
  ActivityIndicator,
} from "react-native";

const validationSchema = yup.object().shape({
  name: yup.string().label("name").required(),
  password: yup.string().label("Password").required(),
});

const SignUp = ({ navigation }) => {
  return (
    <View style={styles.SignUpView}>
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
          onSubmit={(values) =>
            MakePost(
              "users",
              {
                ...values,
                unlocked_characters: ["Nemo"],
                unlocked_levels: ["Level One"],
                keys: 1,
              },
              (user) => {
                navigation.push("CharacterSelect", { user });
              }
            )
          }
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
                  placeholder={"create password"}
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
                        <Text style={styles.submitButtonText}>
                          Create New Account
                        </Text>
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
