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
      currentLevel: {},
      currentStats: {
        key: "",
        status: "",
        mostPelletPoints: 0,
      },
      allLevels: [],
      characterName: null,
      characterID: null,
    };
  }

  userID = this.props.route.params.user.id;
  characterID = this.props.route.params.character.id;
  characterName = this.props.route.params.character.name;
  unlockedLevels = this.props.route.params.unlockedLevels;
  currentLevel = this.props.route.params.currentLevel;

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/levels/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((levels) => {
        console.log(this.currentLevel);
        this.setState({
          allLevels: levels,
          currentLevel: this.currentLevel,
        });
      });

    let relatedStats = null;
    let mostPelletPoints = null;
    let key = null;
    let status = null;
    this.setState({
      characterName: this.characterName,
      characterID: this.characterID,
      unlockedLevels: this.unlockedLevels,
    });

    fetch(`http://localhost:3000/api/v1/characters/${this.characterID}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((character) => {
        let stats = character.statistics;
        if (stats.length === 0) {
          return;
        }
        relatedStats = stats.filter((stat) => {
          return (
            stat.user_id === this.userID &&
            stat.level_id === this.currentLevel.id
          );
        });
        mostPelletPoints = relatedStats.sort((a, b) => {
          return a.pellet_points > b.pellet_points ? -1 : 1;
        })[0].pellet_points;

        status = relatedStats.find((stats) => {
          return stats.completed;
        });
        status ? (status = "Complete!") : (status = "Not Complete");

        key = relatedStats.find((stats) => {
          return stats.captured_key;
        });
        key ? (key = "Captured!") : (key = "Not Captured");

        this.setState((state) => ({
          currentStats: {
            ...state.currentStats,
            key: key,
            status: status,
            mostPelletPoints: mostPelletPoints,
          },
        }));
      });
  }

  setupCharacter = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.levelNameView}>
          <Text style={styles.levelCountText}>
            {this.state.currentLevel.level_name}
          </Text>
          <Text style={styles.levelNameText}>
            {this.state.currentLevel.territory_name}
          </Text>
        </View>
        <View style={styles.levelsContainer}>
          {/* <View style={styles.leftArrow}>
            <Image
              style={styles.arrows}
              source={Images.left}
              resizeMode="contain"
            />
          </View> */}
          <View style={styles.levelCard}>
            <View style={styles.midSection}>
              <View style={styles.imageView}>
                <View style={styles.levelRequirementsContainer}>
                  <View style={styles.levelRequirements}>
                    <Text style={styles.objectives}>OBJECTIVES</Text>
                    <Text>
                      Collect {this.state.currentLevel.pellet_points_needed}{" "}
                      Pellet Points
                    </Text>
                    <Text>
                      Endure {this.state.currentLevel.max_time} Seconds
                    </Text>
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
          {/* <View style={styles.rightArrow}>
            <Image
              style={styles.arrows}
              source={Images.right}
              resizeMode="contain"
            />
          </View> */}
        </View>
        <View style={styles.characterInfoContainer}>
          <View style={styles.characterCard}>
            <View style={styles.levelDetails}>
              <View style={styles.characterPhotoContainer}>
                <Image
                  style={styles.characterPhoto}
                  source={
                    this.state.characterName &&
                    Images[
                      this.state.characterName
                        .split(" ")
                        .join("_")
                        .toLowerCase()
                    ]
                  }
                  resizeMode="contain"
                />
                <Text style={styles.characterName}>
                  {this.state.characterName}
                </Text>
              </View>

              <View style={styles.userStats}>
                <Text style={styles.statsHeading}>
                  {this.state.currentLevel.level_name} Stats
                </Text>
                <Text style={styles.stats}>
                  KEY:{" "}
                  <Text
                    style={{
                      color:
                        this.state.currentStats.key === "Captured!"
                          ? "#f27f33"
                          : "#d5ebde",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {this.state.currentStats.key}
                  </Text>
                </Text>
                <Text style={styles.stats}>
                  STATUS:{" "}
                  <Text
                    style={{
                      color:
                        this.state.currentStats.status === "Complete!"
                          ? "#f27f33"
                          : "#d5ebde",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {this.state.currentStats.status}
                  </Text>
                </Text>
                <Text style={styles.stats}>
                  MOST PELLET POINTS:{" "}
                  <Text
                    style={{
                      color:
                        this.state.currentStats.status === "Complete!"
                          ? "#f27f33"
                          : "#d5ebde",
                      fontWeight: "600",
                      fontSize: 14,
                    }}
                  >
                    {this.state.currentStats.mostPelletPoints}
                  </Text>
                </Text>
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
