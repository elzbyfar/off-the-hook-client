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
      characterName: null,
      characterStats: [],
    };
  }

  userID = this.props.route.params.user.id;

  characterID = null;

  componentDidMount() {
    let bestTime = null;
    let relatedStats = null;
    let bestScore = null;
    let capturedKey = null;
    let status = null;
    this.setState({
      characterName: this.props.route.params.character,
    });
    this.findCharacterID(this.props.route.params.character);
    fetch(`http://localhost:3000/api/v1/statistics/${this.userID}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((stats) => {
        if (stats.length === 0) {
          return;
        }
        relatedStats = stats.filter((stat) => {
          return stat.character_id === this.characterID;
        });
        console.log(relatedStats);

        bestTime = relatedStats.sort((a, b) => {
          a.time_remaining > b.time_remaining ? 1 : -1;
        });
      });
  }

  findCharacterID = (name) => {
    switch (name) {
      case "Nemo":
        this.characterID = 1;
        break;
      case "Ignatius":
        this.characterID = 2;
        break;
      case "Tummy Rub":
        this.characterID = 3;
        break;
      case "Ariana":
        this.characterID = 4;
        break;
      case "Loquacious":
        this.characterID = 5;
        break;
      case "Garrett":
        this.characterID = 6;
        break;
      case "Doug":
        this.characterID = 7;
        break;
      case "Roger Stan Smith":
        this.characterID = 8;
        break;
    }
  };

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
                <View style={styles.levelRequirementsContainer}>
                  <View style={styles.levelRequirements}>
                    <Text style={styles.objectives}>OBJECTIVES</Text>
                    {/* <Text>Score</Text> */}
                    <Text>1 Key</Text>
                    <Text>100 Points</Text>
                    <Text>{`< ${"120"} Seconds`}</Text>
                  </View>
                </View>
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
              <View style={styles.characterPhotoContainer}>
                <Image
                  style={styles.characterPhoto}
                  source={
                    this.state.characterName &&
                    Images[this.state.characterName.toLowerCase()]
                  }
                  resizeMode="contain"
                />
                <Text style={styles.characterName}>
                  {this.state.characterName}
                </Text>
              </View>

              <View style={styles.userStats}>
                <Text style={styles.stats}>KEY: </Text>
                <Text style={styles.stats}>BEST TIME:</Text>
                <Text style={styles.stats}>BEST SCORE:</Text>
                <Text style={styles.stats}>STATUS:</Text>
              </View>
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
