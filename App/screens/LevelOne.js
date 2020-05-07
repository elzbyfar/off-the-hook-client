import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import LottieView from "lottie-react-native";
import Constants from "../helpers/Constants";
import Physics from "../helpers/Physics";
import Images from "../assets/Images";
import Matter from "matter-js";
import Floor from "../components/Floor";
import Fish from "../components/Fish";
import Food from "../components/Food";
import Hook from "../components/Hook";
import Crab from "../components/Crab";
import Key from "../components/Key";
import PurpleShark from "../components/PurpleShark";
import FishBones from "../components/FishBones";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const backgroundImages = [
  Images.backgroundImage1,
  Images.backgroundImage2,
  Images.backgroundImage3,
  Images.backgroundImage4,
  Images.backgroundImage5,
  Images.backgroundImage6,
  Images.backgroundImage7,
];

const styles = StyleSheet.create({
  gameView: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.2,
    width: Constants.maxWidth,
    height: Constants.maxHeight,
  },
  bubbles: {
    position: "absolute",
    opacity: 0.6,
    width: 1000,
    zIndex: -1,
  },
  gameContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullScreenButton: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    color: "white",
    fontSize: 48,
  },
  congratulationsText: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    width: 300,
    flexWrap: "wrap",
  },
  nextLevelButton: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#22a1e6",
    color: "#eee",
    height: 35,
    width: 200,
    borderRadius: 35,
  },
  nextLevelButtonText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    fontSize: 16,
  },
  mainMenuButton: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#22a1e6",
    color: "#eee",
    height: 35,
    width: 200,
    borderRadius: 35,
  },
  mainMenuButtonText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
    fontSize: 16,
  },
  statsContainer: {
    marginTop: Constants.maxHeight - 100,
    paddingHorizontal: 20,
    width: Constants.maxWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statBoxes: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    fontSize: 24,
    color: "#aaa",
  },
});

class LevelOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelletPoints: 0,
      currentLevel: null,
      allLevels: null,
      character: null,
      userKeys: null,
      levelID: null,
      user: null,
      timer: null,
      running: true,
      key: null,
    };
    this.gameEngine = null;
    this.entities = this.createWorld();
  }

  interval = null;

  componentDidMount() {
    this.startInterval();
    this.setState({
      currentLevel: this.props.route.params.currentLevel,
      levelID: this.props.route.params.currentLevel.id,
      timer: this.props.route.params.currentLevel.max_time,
      key: this.props.route.params.currentStats.key,
      user: this.props.route.params.user,
      character: this.props.route.params.character,
      userKeys: this.props.route.params.userKeys,
      allLevels: this.props.route.params.allLevels,
    });
  }

  componentDidUpdate() {
    if (this.state.timer === 0 && this.state.running) {
      this.gameEngine.dispatch({ type: "next-level" });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // nextLevel = () => {
  //   this.setState((state) => ({
  //     key: this.state.allLevels[state.currentLevel.id].key
  //       ? "Captured!"
  //       : "Not Captured",
  //     pelletPoints: 0,
  //     running: true,
  //     timer: this.state.allLevels[state.currentLevel.id].max_time,
  //     currentLevel: this.state.allLevels[state.currentLevel.id],
  //   }));
  // };

  // newLevel = () => {
  //   this.gameEngine.swap(this.createWorld());
  //   this.startInterval();
  // };

  selectLevel = () => {
    clearInterval(this.interval);
    this.props.navigation.push("Map", {
      userKeys: this.state.userKeys,
      user: this.state.user,
      character: this.state.character,
      currentLevel: this.state.currentLevel,
    });
  };

  createWorld = () => {
    //DECLARE ENTITIES FIRST APPEARANCE
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.35;

    let fish = Matter.Bodies.rectangle(
      Constants.maxWidth / 6,
      Constants.maxHeight / 3,
      Constants.fishWidth,
      Constants.fishHeight
    );
    let floor1 = Matter.Bodies.rectangle(
      Constants.floorWidth / 2,
      Constants.maxHeight - 60,
      Constants.floorWidth,
      Constants.floorHeight,
      { isStatic: true }
    );
    let floor2 = Matter.Bodies.rectangle(
      Constants.floorWidth + Constants.floorWidth / 2,
      Constants.maxHeight - 60,
      Constants.floorWidth,
      Constants.floorHeight,
      { isStatic: true }
    );
    let hook1 = Matter.Bodies.circle(
      Constants.maxWidth * 4 - Constants.hookWidth / 2,
      Constants.maxHeight / 8,
      Constants.hookRadius,
      { isStatic: true }
    );
    let hook2 = Matter.Bodies.circle(
      Constants.maxWidth * 4 - Constants.hookWidth / 2,
      Constants.maxHeight / 10,
      Constants.hookRadius,
      { isStatic: true }
    );
    let crab = Matter.Bodies.circle(
      Constants.maxWidth * 2 - Constants.crabWidth / 2,
      Constants.maxHeight - 195,
      Constants.crabRadius,
      { isStatic: true }
    );
    let purpleShark = Matter.Bodies.circle(
      Constants.maxWidth * 3 - Constants.purpleSharkWidth / 2,
      Constants.maxHeight - 100 - (300 + Math.floor(Math.random() * 200)),
      Constants.purpleSharkRadius,
      { isStatic: true }
    );

    let fishBones = Matter.Bodies.circle(
      Constants.maxWidth * 4 - Constants.fishBonesWidth / 2,
      Constants.maxHeight - 350,
      Constants.fishBonesRadius,
      { isStatic: true }
    );
    let food1 = Matter.Bodies.polygon(
      (Constants.maxWidth * 3) / 2 - Math.floor(Math.random() * 300),
      5,
      4,
      Constants.foodRadius,
      { isStatic: true, isSleeping: false }
    );
    let food2 = Matter.Bodies.polygon(
      (Constants.maxWidth * 5) / 2 - Math.floor(Math.random() * 300),
      5,
      4,
      Constants.foodRadius,
      { isStatic: true, isSleeping: false }
    );
    let food3 = Matter.Bodies.polygon(
      (Constants.maxWidth * 7) / 2 - Math.floor(Math.random() * 300),
      5,
      4,
      Constants.foodRadius,
      { isStatic: true, isSleeping: false }
    );
    let key = Matter.Bodies.polygon(
      (Constants.maxWidth *
        (5 + (this.state.currentLevel && this.state.currentLevel.id))) /
        2 -
        Math.floor(Math.random() * 300),
      -30,
      4,
      Constants.keyRadius,
      { isStatic: true, isSleeping: false }
    );

    //PLACE ENTITIES WITHIN MATTER.WORLD'S SCOPE
    Matter.World.add(world, [
      fish,
      floor1,
      floor2,
      hook1,
      hook2,
      crab,
      purpleShark,
      fishBones,
      food1,
      food2,
      food3,
      key,
    ]);

    //COLLISION DETECTION
    Matter.Events.on(engine, "collisionStart", (event) => {
      let pairs = event.pairs;

      //FOOD COLLISION
      if (
        pairs[0].bodyB.label === "Polygon Body" &&
        pairs[0].bodyB.area < 967
      ) {
        pairs[0].isActive = false;
        pairs[0].isStatic = false;
        this.setState((state) => ({
          pelletPoints: state.pelletPoints + 1,
        }));
      }
      if (
        pairs[0].bodyB.label === "Polygon Body" &&
        pairs[0].bodyB.area > 967
      ) {
        if (this.state.key !== "Captured!") {
          if (this.state.user) {
            fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                keys: this.state.userKeys + 1,
              }),
            })
              .then((resp) => resp.json())
              .then((user) => {});
          }
        }
        pairs[0].isActive = false;
        pairs[0].isStatic = false;
        this.setState((state) => ({
          key: "Captured!",
        }));
      }

      //GAME OVER / NEXT LEVEL
      // if (this.state.timer === 0) {
      //   this.gameEngine.dispatch({ type: "next-level" });
      // }
      if (pairs[0].bodyB.label === "Circle Body") {
        this.gameEngine.dispatch({ type: "game-over" });
      }
    });

    //RETURN ENTITIES TO RENDER ON SCREEN
    return {
      physics: {
        engine: engine,
        world: world,
        name: this.props.route.params.character.name,
      },
      fish: {
        body: fish,
        pose: 1,
        name: "",
        renderer: Fish,
      },

      floor1: {
        body: floor1,
        renderer: Floor,
      },
      floor2: {
        body: floor2,
        renderer: Floor,
      },
      hook1: {
        body: hook1,
        renderer: Hook,
      },
      hook2: {
        body: hook2,
        renderer: Hook,
      },
      crab: {
        body: crab,
        crabPose: 1,
        renderer: Crab,
      },
      purpleShark: {
        body: purpleShark,
        purpleSharkPose: 1,
        renderer: PurpleShark,
      },
      fishBones: {
        body: fishBones,
        renderer: FishBones,
      },
      food1: {
        body: food1,
        colorPick: 1,
        renderer: Food,
      },
      food2: {
        body: food2,
        colorPick: 2,
        renderer: Food,
      },
      food3: {
        body: food3,
        colorPick: 3,
        renderer: Food,
      },
      key: {
        body: this.state.key && this.state.key === "Captured!" ? null : key,
        renderer: this.state.key && this.state.key === "Captured!" ? null : Key,
      },
    };
  };

  onEvent = (event) => {
    if (event.type === "game-over" || event.type === "try-again") {
      this.setState((state) => ({
        key: state.key,
        running: false,
      }));
      clearInterval(this.interval);
      if (this.state.user) {
        fetch("http://localhost:3000/api/v1/statistics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            pellet_points: this.state.pelletPoints,
            captured_key: this.state.key === "Captured!" ? true : false,
            completed: false,
            user_id: this.state.user.id,
            level_id: this.state.levelID,
            character_id: this.state.character.id,
          }),
        });
      }
    }
    if (event.type === "next-level") {
      clearInterval(this.interval);
      this.setState((state) => ({
        key: state.key,
        running: false,
      }));
    }
  };

  startInterval = () => {
    this.interval = setInterval(() => {
      this.setState((state) => ({
        timer: state.timer - 1,
      }));
    }, 1000);
  };

  reset = () => {
    clearInterval(this.interval);
    this.gameEngine.swap(this.createWorld());
    this.setState((state) => ({
      key: state.key,
      pelletPoints: 0,
      running: true,
      timer: this.props.route.params.currentLevel.max_time,
    }));
    this.startInterval();
  };

  render() {
    return (
      <View style={styles.gameView}>
        <Image
          resizeMode="cover"
          source={
            this.state.currentLevel &&
            backgroundImages[this.state.currentLevel.id - 1]
          }
          style={styles.backgroundImage}
        />
        <LottieView
          style={styles.bubbles}
          source={require("../assets/img/animations/bubbles.json")}
          autoPlay
          loop
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
        {!this.state.running &&
          (this.state.timer !== 0 ? (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {}}
              style={styles.fullScreenButton}
            >
              <View style={styles.fullScreen}>
                <Text style={styles.gameOverText}>Ouch!</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => this.reset()}
                  style={styles.nextLevelButton}
                >
                  <Text style={styles.nextLevelButtonText}>Play Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    this.props.navigation.push("CharacterSelect", {
                      user: { id: this.state.user.id },
                      newUser: false,
                    })
                  }
                  style={styles.mainMenuButton}
                >
                  <Text style={styles.mainMenuButtonText}>Main Menu</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {}}
              style={styles.fullScreenButton}
            >
              <View style={styles.fullScreen}>
                <Text style={styles.congratulationsText}>
                  {this.state.pelletPoints >=
                    this.state.currentLevel.pellet_points_needed &&
                  this.state.key === "Captured!"
                    ? "CONGRATULATIONS!"
                    : this.state.pelletPoints <
                      this.state.currentLevel.pellet_points_needed
                    ? `Sorry.\nYou needed ${
                        this.state.currentLevel.pellet_points_needed -
                        this.state.pelletPoints
                      } more Pellet Points to complete this level.`
                    : "Sorry.\nCapture The Missing Key to complete this level."}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={
                    this.state.pelletPoints >=
                      this.state.currentLevel.pellet_points_needed &&
                    this.state.key === "Captured!"
                      ? this.selectLevel
                      : this.reset
                  }
                  style={styles.nextLevelButton}
                >
                  <Text style={styles.nextLevelButtonText}>
                    {this.state.pelletPoints >=
                      this.state.currentLevel.pellet_points_needed &&
                    this.state.key === "Captured!"
                      ? "NEXT LEVEL"
                      : "TRY AGAIN"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        <View style={styles.statsContainer}>
          <View style={[styles.statBoxes, { marginTop: -15 }]}>
            <Text style={[styles.stats, { fontSize: 14 }]}>PELLET</Text>
            <Text style={[styles.stats, { fontSize: 14 }]}>POINTS</Text>
            <Text
              style={[styles.stats, { fontWeight: "600", color: "#E4B23E" }]}
            >
              {this.state.pelletPoints}
            </Text>
          </View>

          <View style={styles.statBoxes}>
            <Text style={[styles.stats, { fontSize: 14 }]}>TIME</Text>
            <Text
              style={[styles.stats, { fontWeight: "600", color: "#E4B23E" }]}
            >
              {this.state.timer}
            </Text>
          </View>
          <View style={styles.statBoxes}>
            <Text style={[styles.stats, { fontSize: 14 }]}>KEY</Text>
            <View
              style={{
                width: 50,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={Images.key}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 20,
                  tintColor:
                    this.state.key &&
                    (this.state.key !== "Captured!" ? "#888" : null),
                  opacity:
                    this.state.key &&
                    (this.state.key !== "Captured!" ? 0.5 : 1),
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default LevelOne;
