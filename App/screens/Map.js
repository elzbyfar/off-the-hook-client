import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import Images from "../assets/Images";
import styles from "../styles/MapStyles.js";
import {
  PinchGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

import Constants from "../helpers/Constants";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unlockedLevels: [],
      allLevels: [],
      characterName: "",
      characterStats: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/statistics/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((stats) => {
        const userStats = stats.filter((stat) => {
          return stat.user_id === this.props.route.params.user.id;
        });
        console.log(userStats);
        if (userStats.length === 0) {
          console.log("nothing found");
          return;
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.levelNameView}>
          <Text style={styles.levelCountText}>LEVEL ONE: </Text>
          <Text style={styles.levelNameText}>La Palma</Text>
        </View>
        <View style={styles.levelsContainer}>
          <View style={styles.leftArrow}>
            <Image
              style={styles.arrows}
              source={Images.left}
              resizeMode="contain"
            />
          </View>
          <View style={styles.levelCard}>
            <View style={styles.midSection}>
              <View style={styles.imageView}>
                <Image
                  style={styles.levelImage}
                  source={Images.backgroundImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>
          <View style={styles.rightArrow}>
            <Image
              style={styles.arrows}
              source={Images.right}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.characterInfoContainer}>
          <View style={styles.characterCard}>
            <View style={styles.levelDetails}>
              {/* <View style={styles.userStats}>
                <Text>User Stats</Text>
              </View> */}
              <View style={styles.levelRequirements}>
                <Text>How To Complete This Level</Text>
                <Text>Score: 100 Points</Text>
                <Text>In Under: 120 Seconds</Text>
              </View>
              {/* <View style={styles.topStats}>
                <Text>Global Leader</Text>
              </View> */}
            </View>
            <View style={styles.startButtonContainer}>
              <TouchableOpacity
                onPress={() => this.props.navigation.push("LevelOne")}
                activeOpacity={0.6}
                style={styles.startButton}
              >
                <Text style={styles.start}>START</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // let scale = React.useRef(new Animated.Value(1)).current;
  // let translateX = React.useRef(new Animated.Value(0)).current;
  // let translateY = React.useRef(new Animated.Value(0)).current;

  // const handlePan = Animated.event(
  //   [
  //     {
  //       nativeEvent: {
  //         translationX: translateX,
  //         translationY: translateY,
  //       },
  //     },
  //   ],
  //   {
  //     useNativeDriver: true,
  //   }
  // );
  // const handlePinch = Animated.event([{ nativeEvent: { scale } }]);
  // return (
  //   <PanGestureHandler onGestureEvent={handlePan}>
  //     <Animated.View style={styles.container}>
  //       <PinchGestureHandler onGestureEvent={handlePinch}>
  //         <Animated.View
  //           style={[
  //             styles.mapView,
  //             { transform: [{ scale }, { translateX }, { translateY }] },
  //           ]}
  //         >
  //           <Animated.Image
  //             source={Images.map}
  //             style={styles.map}
  //             resizeMode="contain"
  //           />
  //           <View style={styles.textBox}>
  //             <Text style={styles.heading}>Trace Your Quest</Text>

  //             <View style={{ justifyContent: "center", alignItems: "center" }}>
  //               <View style={{ flexDirection: "row" }}>
  //                 <Text>Level One: </Text>
  //                 <Text style={{ fontWeight: "700" }}>La Palma</Text>
  //               </View>
  //               <View style={{ flexDirection: "row" }}>
  //                 <Text>Objective: </Text>
  //                 <Text style={{ fontWeight: "700" }}>40 Points</Text>
  //               </View>
  //               <TouchableOpacity
  //                 onPress={() => navigation.push("LevelOne")}
  //                 activeOpacity={0.6}
  //                 style={styles.startButton}
  //               >
  //                 <Text style={styles.start}>START</Text>
  //               </TouchableOpacity>
  //             </View>
  //           </View>
  //         </Animated.View>
  //       </PinchGestureHandler>
  //     </Animated.View>
  //   </PanGestureHandler>
  // );
}

export default Map;
