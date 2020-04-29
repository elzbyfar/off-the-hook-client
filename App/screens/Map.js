import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Images from "../assets/Images";
import {
  PinchGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

import Constants from "../helpers/Constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22a1e6",
  },
  mapView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: "absolute",
    width: Constants.maxWidth,
    zIndex: -100,
  },
  textBox: {
    marginTop: 30,
    height: 250,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
    color: "#40200f",
  },
  startButton: {
    borderWidth: 2,
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40200f",
    borderRadius: 35,
    marginTop: 10,
  },
  start: {
    color: "#f0c97d",
  },
});

const Map = ({ navigation }) => {
  let scale = React.useRef(new Animated.Value(1)).current;
  let translateX = React.useRef(new Animated.Value(0)).current;
  let translateY = React.useRef(new Animated.Value(0)).current;

  const handlePan = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );
  const handlePinch = Animated.event([{ nativeEvent: { scale } }]);
  return (
    <PanGestureHandler onGestureEvent={handlePan}>
      <Animated.View style={styles.container}>
        <PinchGestureHandler onGestureEvent={handlePinch}>
          <Animated.View
            style={[
              styles.mapView,
              { transform: [{ scale }, { translateX }, { translateY }] },
            ]}
          >
            <Animated.Image
              source={Images.map}
              style={styles.map}
              resizeMode="contain"
            />
            <View style={styles.textBox}>
              <Text style={styles.heading}>Trace Your Quest</Text>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text>Level One: </Text>
                  <Text style={{ fontWeight: "700" }}>La Palma</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Objective: </Text>
                  <Text style={{ fontWeight: "700" }}>40 Points</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.push("LevelOne")}
                  activeOpacity={0.6}
                  style={styles.startButton}
                >
                  <Text style={styles.start}>START</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Map;
