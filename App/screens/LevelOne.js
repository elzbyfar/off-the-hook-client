import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import BodyDimensions from "../helpers/BodyDimensions";
import LottieView from "lottie-react-native";
import MakeFetch from "../helpers/MakeFetch";
import Physics from "../helpers/Physics";
import Matter from "matter-js";
import Images from "../assets/Images";
import styles from "../styles/LevelStyles";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default class LevelOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
      character: {},
      currentLevel: {},
      currentStats: {},
      user: null,
      keys: null,
      timer: null,
      running: true,
      capturedKey: null,
      currentLevelID: null,
      pelletPoints: 0,
    };
    this.gameEngine = null;
    this.bodies = BodyDimensions();
    this.entities = this.createWorld();
  }

  interval = null;
  params = this.props.route.params.gameObj;
  nav = this.props.navigation;

  componentDidMount() {
    this.setState({
      timer: this.params.currentLevel.max_time,
      user: this.params.user,
      keys: this.params.keys,
      levels: this.params.levels,
      levelID: this.params.currentLevel.id,
      character: this.params.character,
      capturedKey: this.params.currentStats.capturedKey,
      currentLevel: this.params.currentLevel,
      currentLevelID: this.params.currentLevel.id,
    });
    this.startInterval();
  }

  componentDidUpdate() {
    if (this.state.timer === 0 && this.state.running) {
      this.gameEngine.dispatch({ type: "next-level" });
      if (this.isWinningGame()) {
        MakeFetch("statistics", "POST", this.saveStatObj());
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      this.setState((state) => ({
        timer: state.timer - 1,
      }));
    }, 1000);
  };

  onEvent = (event) => {
    if (event.type === "game-over") {
      this.setState((state) => ({
        key: state.key,
        running: false,
      }));
      clearInterval(this.interval);
      if (this.state.user) {
        MakeFetch("statistics", "POST", this.saveStatObj());
      }
    }

    if (event.type === "next-level") {
      clearInterval(this.interval);
      this.setState((state) => ({
        capturedKey: state.capturedKey,
        running: false,
      }));
    }
  };

  updateUserKeys = () => {
    return (user) => {
      this.setState({
        capturedKey: "Captured!",
        keys: user.keys,
        user: { ...user, keys: user.keys },
      });
    };
  };

  styleKey = () => {
    return [
      styles.key,
      this.state.capturedKey !== "Captured!"
        ? { tintColor: "#888", opacity: 0.5 }
        : { tintColor: null, opacity: 1 },
    ];
  };

  findBackground = () => {
    return (
      this.state.currentLevel &&
      Images.backgrounds[this.state.currentLevelID - 1]
    );
  };

  isWinningGame = () => {
    return (
      this.state.capturedKey === "Captured!" &&
      this.state.pelletPoints >= this.state.currentLevel.pellet_points_needed &&
      this.state.timer === 0
    );
  };

  decideOutcome = () => {
    return this.isWinningGame()
      ? "CONGRATULATIONS!"
      : this.state.pelletPoints < this.state.currentLevel.pellet_points_needed
      ? `Sorry.\nYou needed ${
          this.state.currentLevel.pellet_points_needed - this.state.pelletPoints
        } more Pellet Points to complete this level.`
      : "Sorry.\nCapture The Missing Key to complete this level.";
  };

  saveStatObj = () => {
    return {
      completed: this.isWinningGame(),
      captured_key: this.state.capturedKey === "Captured!",
      pellet_points: this.state.pelletPoints,
      character_id: this.state.character.id,
      level_id: this.state.currentLevelID,
      user_id: this.state.user.id,
    };
  };

  reset = () => {
    clearInterval(this.interval);
    this.bodies = BodyDimensions();
    this.gameEngine.swap(this.createWorld());
    this.setState((state) => ({
      capturedKey: state.capturedKey,
      pelletPoints: 0,
      running: true,
      timer: this.params.currentLevel.max_time,
    }));
    this.startInterval();
  };

  mainMenu = () => {
    clearInterval(this.interval);
    this.nav.navigate("CharacterSelect", {
      user: this.state.user,
      newUser: false,
    });
  };

  selectLevel = () => {
    clearInterval(this.interval);

    this.nav.navigate("Map", {
      selection: {
        keys: this.state.keys,
        user: this.state.user,
        character: this.state.character,
        currentLevel: this.state.currentLevel,
      },
    });
  };

  endGameScreen = () => {
    return (
      !this.state.running &&
      (this.state.timer !== 0 ? (
        <View style={styles.fullScreen}>
          <Text style={styles.gameOverText}>Ouch!</Text>
          <TouchableOpacity
            onPress={() => this.reset()}
            style={styles.nextLevelButton}
          >
            <Text style={styles.nextLevelButtonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.mainMenu()}
            style={styles.mainMenuButton}
          >
            <Text style={styles.mainMenuButtonText}>Main Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.fullScreen}>
          <Text style={styles.congratulationsText}>{this.decideOutcome()}</Text>
          <TouchableOpacity
            onPress={this.isWinningGame() ? this.selectLevel : this.reset}
            style={styles.nextLevelButton}
          >
            <Text style={styles.nextLevelButtonText}>
              {this.isWinningGame() ? "NEXT LEVEL" : "TRY AGAIN"}
            </Text>
          </TouchableOpacity>
        </View>
      ))
    );
  };

  createWorld = () => {
    //DECLARE ENTITIES FIRST APPEARANCE
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.35;

    //PLACE ENTITIES WITHIN MATTER.WORLD'S SCOPE
    Matter.World.add(world, [
      this.bodies.fish,
      this.bodies.floor1,
      this.bodies.floor2,
      this.bodies.hook,
      this.bodies.crab,
      this.bodies.purpleShark,
      this.bodies.fishBones,
      this.bodies.pellet1,
      this.bodies.pellet2,
      this.bodies.pellet3,
      this.bodies.pellet4,
      this.bodies.pellet5,
      this.bodies.pellet6,
      this.bodies.key,
    ]);

    //COLLISION DETECTION
    Matter.Events.on(engine, "collisionStart", (event) => {
      let pairs = event.pairs;
      let other = pairs[0].bodyB;

      //FOOD COLLISION
      if (other.label === "Polygon Body" && other.area < 967) {
        pairs[0].isActive = false;
        pairs[0].isStatic = false;
        this.setState((state) => ({
          pelletPoints: state.pelletPoints + 1,
        }));
      }

      //CAPTURE KEY
      if (other.label === "Polygon Body" && other.area > 967) {
        if (this.state.capturedKey !== "Captured!") {
          MakeFetch(
            `users/${this.state.user.id}`,
            "PATCH",
            { keys: this.state.keys + 1 },
            this.updateUserKeys()
          );
        }
        pairs[0].isActive = false;
        pairs[0].isStatic = false;
      }

      //GAME OVER EVENT
      if (other.label === "Circle Body") {
        this.gameEngine.dispatch({ type: "game-over" });
      }
      if (other.label === "Rectangle Body" && other.area === 31500) {
        this.gameEngine.dispatch({ type: "game-over" });
      }
    });

    //RETURN ENTITIES TO RENDER ON SCREEN
    return {
      physics: {
        engine: engine,
        world: world,
        name: this.params.character.name,
      },
      key: this.bodies.renderers.key,
      fish: this.bodies.renderers.fish,
      hook: this.bodies.renderers.hook,
      floor1: this.bodies.renderers.floor1,
      floor2: this.bodies.renderers.floor2,
      crab: this.bodies.renderers.crab,
      pellet1: this.bodies.renderers.pellet1,
      pellet2: this.bodies.renderers.pellet2,
      pellet3: this.bodies.renderers.pellet3,
      pellet4: this.bodies.renderers.pellet4,
      pellet5: this.bodies.renderers.pellet5,
      pellet6: this.bodies.renderers.pellet6,
      fishBones: this.bodies.renderers.fishBones,
      purpleShark: this.bodies.renderers.purpleShark,
    };
  };

  render() {
    return (
      <View style={styles.gameView}>
        <Image
          resizeMode="cover"
          source={this.findBackground()}
          style={styles.backgroundImage}
        />
        <LottieView
          style={styles.bubbles}
          source={require("../assets/img/animations/bubbles.json")}
          autoPlay
          resizeMode="cover"
        />
        <GameEngine
          ref={(ref) => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          systems={[Physics]}
          running={this.state.running}
          onEvent={this.onEvent}
          entities={this.entities}
        />
        {this.endGameScreen()}
        <View style={styles.statsContainer}>
          <View style={[styles.statBoxes, { marginTop: -15 }]}>
            <Text style={styles.statsCategory}>PELLET</Text>
            <Text style={styles.statsCategory}>POINTS</Text>
            <Text style={styles.statsValue}>{this.state.pelletPoints}</Text>
          </View>

          <View style={styles.statBoxes}>
            <Text style={styles.statsCategory}>TIME</Text>
            <Text style={styles.statsValue}>{this.state.timer}</Text>
          </View>
          <View style={styles.statBoxes}>
            <Text style={styles.statsCategory}>KEY</Text>
            <View style={styles.keyContainer}>
              <Image
                source={Images.key}
                resizeMode="contain"
                style={this.styleKey()}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
