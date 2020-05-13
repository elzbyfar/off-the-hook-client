import React, { Component } from "react";
import MakeGet from "../helpers/MakeGet";
import Images from "../assets/Images";
import styles from "../styles/MapStyles.js";

import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
    };
  }
  gameObj = {
    user: this.props.route.params.selection.user,
    keys: this.props.route.params.selection.keys,
    character: this.props.route.params.selection.character,
    characterName: null,
    characterStats: null,
    currentLevel: {},
    currentStats: {},
    levels: null,
  };
  nav = this.props.navigation;

  componentDidMount() {
    MakeGet("levels", (levels) => {
      this.gameObj.levels = levels;
      this.gameObj.currentLevel = levels[0];
    });

    MakeGet(`characters/${this.gameObj.character.id}`, (char) => {
      (this.gameObj.characterStats = char.statistics.filter(
        (stats) => stats.user_id === this.gameObj.user.id
      )),
        (this.gameObj.characterName = char.name);
      this.gameObj.character = char;
      this.setCurrentStats(0);
    });
  }

  changeSlide = ({ nativeEvent }) => {
    let slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );

    (slide > 6 && (slide = 6)) || (slide < 0 && (slide = 0));

    this.setCurrentStats(slide);
  };

  setCurrentStats = (slide) => {
    let mostPelletPoints = 0;
    let capturedKey = "No Attempts";
    let status = "No Attempts";

    let levelStats = this.gameObj.characterStats.filter((stats) => {
      return stats.level_id === slide + 1;
    });

    if (levelStats.length > 0) {
      mostPelletPoints = levelStats.sort((a, b) => {
        return a.pellet_points > b.pellet_points ? -1 : 1;
      })[0].pellet_points;

      status = levelStats.find((stats) => {
        return stats.completed;
      });
      status ? (status = "Complete!") : (status = "Not Complete");

      capturedKey = levelStats.find((stats) => {
        return stats.captured_key;
      });
      capturedKey
        ? (capturedKey = "Captured!")
        : (capturedKey = "Not Captured");
    }

    if (slide !== this.state.active && this.gameObj.levels) {
      this.gameObj.currentStats = {
        capturedKey: capturedKey,
        status: status,
        mostPelletPoints: mostPelletPoints,
      };
      (this.gameObj.currentLevel = this.gameObj.levels[slide]),
        this.setState({ active: slide });
    }
  };

  levelName = (index) =>
    this.gameObj.levels && this.gameObj.levels[index].level_name;

  levelNameStatsHeading = () =>
    `${this.gameObj.currentLevel.level_name} Stats`.toUpperCase();

  territoryName = (index) =>
    this.gameObj.levels && this.gameObj.levels[index].territory_name;

  pelletsObjective = (index) =>
    this.gameObj.levels &&
    `${this.gameObj.levels[index].pellet_points_needed} Pellet Points`;

  timeObjective = (index) =>
    this.gameObj.levels && `${this.gameObj.levels[index].max_time} Seconds`;

  findCharacterName = () =>
    this.gameObj.characterName && this.gameObj.characterName.toUpperCase();

  findCharacterImage = () =>
    this.gameObj.characterName &&
    Images[this.gameObj.characterName.split(" ").join("_").toLowerCase()];

  pickColor = (stat) =>
    this.gameObj.currentStats[stat] === "Captured!" ||
    this.gameObj.currentStats[stat] === "Complete!"
      ? "#e4b23e"
      : "#d5ebde";

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.levelContainer}>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={this.changeSlide}
            style={{ flexDirection: "column" }}
          >
            {Images.backgrounds.map((image, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image
                  source={image}
                  style={styles.levelBackground}
                  blurRadius={10}
                  resizeMode="cover"
                />
                <View style={styles.levelNameView}>
                  <Text style={styles.levelCountText}>
                    {this.levelName(index)}
                  </Text>
                  <Text style={styles.levelNameText}>
                    {this.territoryName(index)}
                  </Text>
                </View>
                <Image
                  style={styles.levelImage}
                  source={image}
                  resizeMode="contain"
                />
                <View style={styles.levelRequirementsContainer}>
                  <View style={styles.levelRequirements}>
                    <Text style={styles.objectives}>OBJECTIVES</Text>
                    <Text style={styles.objectiveItems}>
                      {this.pelletsObjective(index)}
                    </Text>
                    <Text style={styles.objectiveItems}>
                      {this.timeObjective(index)}
                    </Text>
                    <Text style={styles.objectiveItems}>1 Key</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.characterInfoContainer}>
          <View style={styles.characterCard}>
            <View style={styles.levelDetails}>
              <View style={styles.characterPhotoContainer}>
                <Image
                  style={styles.characterPhoto}
                  source={this.findCharacterImage()}
                  resizeMode="contain"
                />
                <Text style={styles.characterName}>
                  {this.findCharacterName()}
                </Text>
              </View>

              <View style={styles.userStats}>
                <Text style={styles.statsHeading}>
                  {this.levelNameStatsHeading()}
                </Text>
                <Text style={styles.statsCategory}>
                  {"KEY: "}
                  <Text
                    style={[
                      styles.statsText,
                      { color: this.pickColor("capturedKey") },
                    ]}
                  >
                    {this.gameObj.currentStats.capturedKey}
                  </Text>
                </Text>
                <Text style={styles.statsCategory}>
                  {"STATUS: "}
                  <Text
                    style={[
                      styles.statsText,
                      { color: this.pickColor("status") },
                    ]}
                  >
                    {this.gameObj.currentStats.status}
                  </Text>
                </Text>
                <Text style={styles.statsCategory}>
                  {"MOST PELLET POINTS: "}
                  <Text
                    style={[
                      styles.statsText,
                      { color: this.pickColor("status") },
                    ]}
                  >
                    {this.gameObj.currentStats.mostPelletPoints}
                  </Text>
                </Text>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.nav.push("LevelOne", { gameObj: this.gameObj })
                    }
                    style={styles.startButton}
                  >
                    <Text style={styles.start}>START</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
