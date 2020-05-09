import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

import CharacterSelect from "../screens/CharacterSelect";
import Map from "../screens/Map";
import LevelOne from "../screens/LevelOne";
import Images from "../assets/Images";

const GameStack = createStackNavigator();
const GameStackScreen = () => (
  <GameStack.Navigator
    screenOptions={{
      headerShown: true,
    }}
  >
    <GameStack.Screen
      name="Welcome"
      component={Welcome}
      options={{
        title: "Back",
        headerShown: false,
      }}
    />
    <GameStack.Screen
      name="SignIn"
      component={SignIn}
      options={{
        title: "Sign In",
        headerStyle: { backgroundColor: "#eee" },
        headerTitleStyle: { color: "#037CFF", fontWeight: "600" },
        headerBackTitleStyle: { color: "#037CFF" },
      }}
    />
    <GameStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        title: "Sign Up",
        headerStyle: { backgroundColor: "#eee" },
        headerTitleStyle: { color: "#037CFF", fontWeight: "600" },
        headerBackTitleStyle: { color: "#037CFF" },
      }}
    />
    <GameStack.Screen name="CharacterSelect" component={CharacterSelect} />
    <GameStack.Screen name="Map" component={Map} />
    <GameStack.Screen name="LevelOne" component={LevelOne} />
  </GameStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <GameStackScreen />
  </NavigationContainer>
);
