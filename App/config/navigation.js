import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import CharacterSelect from "../screens/CharacterSelect";
import Map from "../screens/Map";
import LevelOne from "../screens/LevelOne";

const GameStack = createStackNavigator();
const GameStackScreen = () => (
  <GameStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <GameStack.Screen name="Welcome" component={Welcome} />
    <GameStack.Screen name="CharacterSelect" component={CharacterSelect} />
    <GameStack.Screen name="Map" component={Map} />
    <GameStack.Screen name="LevelOne" component={LevelOne} />
  </GameStack.Navigator>
);

// const GameStack = createStackNavigator();
// const GameStackScreen = () => (
//   <GameStack.Navigator>
//     <GameStack.Screen name="LevelOne" component={LevelOne} />
//   </GameStack.Navigator>
// );

export default () => (
  <NavigationContainer>
    <GameStackScreen />
  </NavigationContainer>
);
