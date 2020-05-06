import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
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

const backgroundImages = [
  Images.backgroundImage1,
  Images.backgroundImage2,
  Images.backgroundImage3,
  Images.backgroundImage4,
  Images.backgroundImage5,
  Images.backgroundImage6,
  Images.backgroundImage7,
];

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
      characterStats: null,
      allLevels: null,
      characterName: null,
      characterID: null,
      active: 0,
    };
  }

  userID = this.props.route.params.user.id;
  characterID = this.props.route.params.character.id;
  characterName = this.props.route.params.character.name;
  unlockedLevels = this.props.route.params.unlockedLevels;
  userKeys = this.props.route.params.userKeys;

  // currentLevel = this.props.route.params.currentLevel;

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/levels/", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((levels) => {
        this.setState({
          allLevels: levels,
          currentLevel: levels[0],
        });
      });

    let relatedStats = null;

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
          return stat.user_id === this.userID;
        });
        this.setState({
          characterStats: relatedStats,
        });

        this.setCurrentStats();
      });
  }

  setupCharacter = () => {};

  change = ({ nativeEvent }) => {
    let levelStats;
    let mostPelletPoints;
    let key;
    let status;
    let slide;

    slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    slide > 6 && (slide = 6);
    slide < 0 && (slide = 0);

    levelStats = this.state.characterStats.filter((stats) => {
      return stats.level_id === slide + 1;
    });

    if (levelStats.length === 0) {
      mostPelletPoints = 0;
      key = "No Attempts";
      status = "No Attempts";
    } else {
      mostPelletPoints = levelStats.sort((a, b) => {
        return a.pellet_points > b.pellet_points ? -1 : 1;
      })[0].pellet_points;

      status = levelStats.find((stats) => {
        return stats.completed;
      });
      status ? (status = "Complete!") : (status = "Not Complete");

      key = levelStats.find((stats) => {
        return stats.captured_key;
      });
      key ? (key = "Captured!") : (key = "Not Captured");
    }

    if (slide !== this.state.active) {
      this.setState((state) => ({
        active: slide,
        currentLevel: state.allLevels[slide],
        currentStats: {
          ...state.currentStats,
          key: key,
          status: status,
          mostPelletPoints: mostPelletPoints,
        },
      }));
    }
  };

  setCurrentStats = () => {
    let levelStats;
    let mostPelletPoints;
    let key;
    let status;

    levelStats = this.state.characterStats.filter((stats) => {
      return stats.level_id === this.state.active + 1;
    });

    if (levelStats.length === 0) {
      mostPelletPoints = 0;
      key = "No Attempts";
      status = "No Attempts";
    } else {
      mostPelletPoints = levelStats.sort((a, b) => {
        return a.pellet_points > b.pellet_points ? -1 : 1;
      })[0].pellet_points;

      status = levelStats.find((stats) => {
        return stats.completed;
      });
      status ? (status = "Complete!") : (status = "Not Complete");

      key = levelStats.find((stats) => {
        return stats.captured_key;
      });
      key ? (key = "Captured!") : (key = "Not Captured");
    }

    this.setState((state) => ({
      currentStats: {
        ...state.currentStats,
        key: key,
        status: status,
        mostPelletPoints: mostPelletPoints,
      },
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.levelsContainer}> */}
        {/* <View style={styles.leftArrow}>
            <Image
              style={styles.arrows}
              source={Images.left}
              resizeMode="contain"
            />
          </View> */}
        {/* <View style={styles.levelCard}> */}
        {/* <View style={styles.midSection}> */}
        <View style={styles.imageView}>
          <ScrollView
            pagingEnabled
            horizontal
            ref={this.setScrollViewRef}
            onScroll={this.change}
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "column" }}
          >
            {backgroundImages.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={image}
                  style={styles.imageWrapperBackground}
                  blurRadius={10}
                  resizeMode="cover"
                />
                <View style={styles.levelNameView}>
                  <Text style={styles.levelCountText}>
                    {this.state.allLevels &&
                      this.state.allLevels[index].level_name}
                  </Text>
                  <Text style={styles.levelNameText}>
                    {this.state.allLevels &&
                      this.state.allLevels[index].territory_name}
                  </Text>
                </View>
                <Image
                  key={index}
                  style={styles.levelImage}
                  source={image}
                  resizeMode="contain"
                />
                <View style={styles.levelRequirementsContainer}>
                  <View style={styles.levelRequirements}>
                    <Text style={styles.objectives}>OBJECTIVES</Text>
                    <Text style={styles.objectiveItems}>
                      {this.state.allLevels &&
                        this.state.allLevels[index].pellet_points_needed}{" "}
                      Pellet Points
                    </Text>
                    <Text style={styles.objectiveItems}>
                      {this.state.allLevels &&
                        this.state.allLevels[index].max_time}{" "}
                      Seconds
                    </Text>
                    <Text style={styles.objectiveItems}>1 Key</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        {/* </View> */}
        {/* </View> */}
        {/* <View style={styles.rightArrow}>
            <Image
              style={styles.arrows}
              source={Images.right}
              resizeMode="contain"
            />
          </View> */}
        {/* </View> */}
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
                  {this.state.characterName &&
                    this.state.characterName.toUpperCase()}
                </Text>
              </View>

              <View style={styles.userStats}>
                <Text style={styles.statsHeading}>
                  {`${this.state.currentLevel.level_name} Stats`.toUpperCase()}
                </Text>
                <Text style={styles.stats}>
                  KEY:{" "}
                  <Text
                    style={{
                      color:
                        this.state.currentStats.key === "Captured!"
                          ? "#E4B23E"
                          : "#d5ebde",
                      fontWeight: "600",
                      fontSize: 16,
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
                          ? "#E4B23E"
                          : "#d5ebde",
                      fontWeight: "600",
                      fontSize: 16,
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
                          ? "#E4B23E"
                          : "#d5ebde",
                      fontWeight: "600",
                      fontSize: 16,
                    }}
                  >
                    {this.state.currentStats.mostPelletPoints}
                  </Text>
                </Text>
                <Text></Text>
                <Text></Text>
              </View>
            </View>
            <View style={styles.startButtonContainer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.push("LevelOne", {
                    userKeys: this.userKeys,
                    currentLevel: this.state.currentLevel,
                    currentStats: this.state.currentStats,
                    userID: this.userID,
                    characterID: this.state.characterID,
                  })
                }
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
}

export default Map;
