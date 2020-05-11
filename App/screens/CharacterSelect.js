import React, { Component } from "react";
import LottieView from "lottie-react-native";
import styles from "../styles/CharacterSelectStyles.js";
import Images from "../assets/Images";
import MakeGet from "../helpers/MakeGet";
import MakeFetch from "../helpers/MakeFetch";
import ShadowView from "react-native-simple-shadow-view";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from "react-native";

class CharacterSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unlockedCharacters: [],
      characters: [],
      levels: [],
      user: null,
      keys: null,
    };
  }

  user = this.props.route.params.user;
  newUser = this.props.route.params.newUser;

  newUserObj = {
    pellet_points: 0,
    captured_key: false,
    completed: false,
    user_id: this.user.id,
    level_id: 1,
    character_id: 1,
  };

  componentDidMount() {
    //Initiate Character Stats
    if (this.newUser) {
      MakeFetch("statistics", "POST", newUserObj, this.setupUser(this.user));
    }
    //Get User & Set State
    MakeGet(`users/${this.user.id}`, this.setupUser(this.user));

    //Get Characters & Set State
    MakeGet("characters", (characters) => {
      this.setState({ characters });
    });

    //Get Levels & Set State
    MakeGet("levels", (levels) => {
      this.setState({ levels });
    });
  }

  //Name Formatter
  formatName = (name) => {
    return name.split(" ").join("_").toLowerCase();
  };

  //Unlocked Verifier
  isUnlocked = (name) => {
    return this.state.unlockedCharacters.includes(name);
  };

  //Set User State
  setupUser = (user) => {
    this.setState({
      unlockedCharacters: user.unlocked_characters,
      keys: user.keys,
      user: user,
    });
  };

  //Unlock Character & Update Keys
  unlockCharacterAndUpdateKeys = (name) => {
    this.setState((state) => ({
      keys: state.keys - 1,
      unlockedCharacters: [...state.unlockedCharacters, name],
    }));
  };

  //Setup Character Boxes
  setupCharacterBoxes = () => {
    let boxes = this.state.characters.map((char, index) => {
      return this.showCharacterImage(char.name, index);
    });
    return boxes;
  };

  //Handle Character Selection
  selectionHandler = (name) => {
    if (this.isUnlocked(name)) {
      //Choose Character & Go To Level Selection
      this.props.navigation.push("Map", {
        selection: {
          ...this.state,
          selectedCharacter: this.state.characters.find(
            (char) => char.name === name
          ),
        },
      });
    } else if (!this.isUnlocked(name) && this.state.keys > 0) {
      //Unlock Character
      MakeFetch(`/users/${this.user.id}`, "PATCH", {
        unlocked_characters: [...this.state.unlockedCharacters, name],
        keys: this.state.keys - 1,
      });

      this.unlockCharacterAndUpdateKeys(name);

      MakeFetch("statistics", "POST", {
        ...this.newUserObj,
        character_id: this.state.characters.find((char) => char.name === name)
          .id,
      });
    } else {
      //Reject Access
      alert(
        name +
          " is trapped! Find a key to unlock " +
          (name === "Ariana" || name === "Loquacious" ? "her." : "him.")
      );
    }
  };

  //Show Single Character Image
  showCharacterImage = (name, index) => {
    return (
      <ShadowView key={index} style={styles.characterBoxContainer}>
        <TouchableOpacity
          style={styles.characterBox}
          onPress={() => this.selectionHandler(name)}
          activeOpacity={0.6}
        >
          <Image
            style={
              this.isUnlocked(name)
                ? styles.character
                : [styles.character, styles.lockedCharacter]
            }
            source={Images[this.formatName(name)]}
            resizeMode="contain"
          />
          <Text style={styles.characterName}>{name}</Text>
          {!this.isUnlocked(name) && this.showLocks()}
        </TouchableOpacity>
      </ShadowView>
    );
  };

  //Show Single Lock
  showLocks = () => {
    if (this.state.keys && this.state.keys === 0) {
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

  render() {
    return (
      <View style={styles.CharacterSelectView}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <Text style={styles.heading}>SELECT A SWIMMER</Text>
          <View style={styles.boxesContainer}>
            {this.state.keys !== null && this.setupCharacterBoxes()}
          </View>
          <View style={styles.keyInfoContainer}>
            <ShadowView style={styles.keyBox}>
              <View style={styles.keyContainer}>
                <Image
                  style={styles.key}
                  source={Images.key}
                  resizeMode="contain"
                />
                <Text style={styles.keyContainerText}>x{this.state.keys}</Text>
              </View>
            </ShadowView>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default CharacterSelect;
