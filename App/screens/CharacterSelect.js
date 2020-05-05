import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import styles from "../styles/CharacterSelectStyles.js";
import LottieView from "lottie-react-native";
import Images from "../assets/Images";
import { Render } from "matter-js";

class CharacterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unlockedCharacters: [],
      unlockedLevels: [],
      allCharacters: [],
      allLevels: [],
      keys: null,
    };
  }

  userID = this.props.route.params.user.id;

  componentDidMount() {
    if (this.props.route.params.newUser) {
      fetch("http://localhost:3000/api/v1/statistics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          pellet_points: 0,
          captured_key: false,
          completed: false,
          user_id: this.userID,
          level_id: 1,
          character_id: 1,
        }),
      });
    }
    fetch(`http://localhost:3000/api/v1/users/${this.userID}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((user) => {
        this.setState((state) => ({
          unlockedCharacters: user.unlocked_characters,
          unlockedLevels: user.unlocked_levels,
          keys: user.keys,
        }));
      });

    fetch("http://localhost:3000/api/v1/characters", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((characters) => {
        this.setState({
          allCharacters: characters,
        });
      });
    fetch("http://localhost:3000/api/v1/levels", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((levels) => {
        this.setState({
          allLevels: levels,
        });
      });
  }

  selectionHandler = (name) => {
    if (this.state.unlockedCharacters.includes(name)) {
      this.props.navigation.push("Map", {
        user: this.props.route.params.user,
        unlockedLevels: this.state.unlockedLevels,
        character: this.state.allCharacters.find((char) => char.name === name),
        currentLevel: this.state.allLevels.find(
          (level) =>
            level.level_name ===
            this.state.unlockedLevels[this.state.unlockedLevels.length - 1]
        ),
      });
    } else if (
      !this.state.unlockedCharacters.includes(name) &&
      this.state.keys > 0
    ) {
      fetch(`http://localhost:3000/api/v1/users/${this.userID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          unlocked_characters: [...this.state.unlockedCharacters, name],
          keys: this.state.keys - 1,
        }),
      });
      this.setState((state) => ({
        keys: state.keys - 1,
        unlockedCharacters: [...state.unlockedCharacters, name],
      }));
      this.state.unlockedLevels.map((level, index) => {
        fetch("http://localhost:3000/api/v1/statistics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            pellet_points: 0,
            captured_key: false,
            completed: false,
            user_id: this.userID,
            level_id: index + 1,
            character_id: this.state.allCharacters.find(
              (char) => char.name === name
            ).id,
          }),
        });
      });
    } else {
      alert(
        name +
          " is trapped! Find a key to unlock " +
          (name === "Ariana" || name === "Loquacious" ? "her." : "him.")
      );
    }
  };

  renderCharacterImage = (name, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.characterBox}
        onPress={() => this.selectionHandler(name)}
        activeOpacity={0.6}
      >
        <Image
          style={
            this.state.unlockedCharacters.includes(name)
              ? styles.photo
              : [styles.photo, styles.lockedCharacter]
          }
          source={Images[name.split(" ").join("_").toLowerCase()]}
          resizeMode="contain"
        />
        <Text style={styles.characterName}>{name}</Text>
        {!this.state.unlockedCharacters.includes(name) && this.renderLock()}
      </TouchableOpacity>
    );
  };

  renderLock = () => {
    if (this.state.keys === 0) {
      return (
        <LottieView
          style={styles.lock}
          source={require("../assets/img/animations/lock.json")}
          resizeMode="contain"
        />
      );
    } else {
      return (
        <LottieView
          style={styles.lock}
          source={require("../assets/img/animations/lock.json")}
          autoPlay
          resizeMode="contain"
        />
      );
    }
  };

  callRenderer = () => {
    let characters = [
      "Nemo",
      "Ignatius",
      "Tummy Rub",
      "Ariana",
      "Loquacious",
      "Garrett",
      "Doug",
      "Roger Stan Smith",
    ];
    let boxes = characters.map((char, index) => {
      return this.renderCharacterImage(char, index);
    });
    return boxes;
  };

  render() {
    return (
      <View style={styles.CharacterSelectView}>
        <Text style={styles.heading}>SELECT A SWIMMER</Text>
        <View style={styles.boxes}>
          {this.state.keys !== null && this.callRenderer()}
        </View>
        <View style={styles.keyInfoContainer}>
          <View style={styles.keyBox}>
            <View style={styles.keyContainer}>
              <Image
                style={styles.key}
                source={Images.key}
                resizeMode="contain"
              />
              <Text style={styles.keyText}>x{this.state.keys}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CharacterSelect;
