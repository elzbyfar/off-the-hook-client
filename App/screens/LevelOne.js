import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import LottieView from "lottie-react-native";
import Constants from "../helpers/Constants";
import Physics from "../helpers/Physics";
import Matter from "matter-js";
import BackgroundImage from "../components/BackgroundImage";
import Floor from "../components/Floor";
import Fish from "../components/Fish";
import Hook from "../components/Hook";
import Crab from "../components/Crab";
import PurpleShark from "../components/PurpleShark";
import Meatball from "../components/Meatball";
import Food from "../components/Food";
// import LottieView from "lottie-react-native";
// import Ceiling from "../components/Ceiling";
// import GenerateLines from "../helpers/GenerateLines";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Images from "../assets/Images";

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
    backgroundColor: "black",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  gameOverText: {
    color: "white",
    fontSize: 48,
  },
  congratulationsText: {
    color: "white",
    fontSize: 24,
  },
  nextLevelButton: {
    marginTop: 15,
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
    color: "#eee",
    fontSize: 20,
  },
  scoreContainer: {
    marginTop: Constants.maxHeight - 100,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 20,
    color: "#fff",
  },
});

class LevelOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: true,
      score: 0,
    };
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }
  nextLevel = () => {
    if (this.state.score >= 100) {
      this.setState({
        running: false,
      });
    }
  };

  setupWorld = () => {
    //GENERATE ENTITIES FOR USE
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.35;

    let fish = Matter.Bodies.rectangle(
      Constants.maxWidth / 6,
      Constants.maxHeight / 3,
      Constants.fishWidth,
      Constants.fishHeight
    );
    // let backgroundImage1 = Matter.Bodies.polygon(
    //   Constants.backgroundImageWidth / 2,
    //   1000,
    //   4,
    //   Constants.maxHeight,
    //   { isStatic: true }
    // );
    // let backgroundImage2 = Matter.Bodies.polygon(
    //   Constants.backgroundImageWidth / 2,
    //   1000,
    //   4,
    //   Constants.maxHeight,
    //   { isStatic: true }
    // );
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

    let hook1 = Matter.Bodies.rectangle(
      Constants.maxWidth * 4 - Constants.hookWidth / 2,
      Constants.maxHeight / 3,
      Constants.hookWidth,
      Constants.hookHeight,
      { isStatic: true }
    );
    let crab = Matter.Bodies.rectangle(
      Constants.maxWidth * 2 - Constants.crabWidth / 2,
      Constants.maxHeight - 200,
      Constants.crabWidth,
      Constants.crabHeight,
      { isStatic: true }
    );
    let purpleShark = Matter.Bodies.rectangle(
      Constants.maxWidth * 2 - Constants.purpleSharkWidth / 2,
      Constants.maxHeight - 600,
      Constants.purpleSharkWidth,
      Constants.purpleSharkHeight,
      { isStatic: true }
    );
    // let meatball = Matter.Bodies.rectangle(
    //   Constants.maxWidth * 2 - Constants.meatballWidth / 2,
    //   Constants.maxHeight -
    //     Math.floor(Math.random() * 300) -
    //     Math.floor(Math.random() * 300),
    //   Constants.meatballWidth,
    //   Constants.meatballHeight,
    //   { isStatic: true }
    // );

    let food1 = Matter.Bodies.circle(
      (Constants.maxWidth * 3) / 2 - Math.floor(Math.random() * 300),
      Constants.maxHeight - (600 + Math.floor(Math.random() * 200)),
      Constants.foodRadius,
      { isStatic: true }
    );
    let food2 = Matter.Bodies.circle(
      (Constants.maxWidth * 5) / 2 - Math.floor(Math.random() * 300),
      Constants.maxHeight - (600 + Math.floor(Math.random() * 200)),
      Constants.foodRadius,
      { isStatic: true }
    );
    let food3 = Matter.Bodies.circle(
      (Constants.maxWidth * 7) / 2 - Math.floor(Math.random() * 300),
      Constants.maxHeight - (600 + Math.floor(Math.random() * 200)),
      Constants.foodRadius,
      { isStatic: true }
    );

    //PLACE ENTITIES WITHIN MATTER.WORLD'S SCOPE
    Matter.World.add(world, [
      fish,
      // backgroundImage1,
      // backgroundImage2,
      floor1,
      floor2,
      hook1,
      crab,
      purpleShark,
      // meatball,
      food1,
      food2,
      food3,
      // food4,
    ]);

    //COLLISION DETECTION
    Matter.Events.on(engine, "collisionStart", (event) => {
      //PAIRS INVOLVED IN COLLISION
      let pairs = event.pairs;

      if (pairs[0].bodyB.label === "Circle Body") {
        pairs[0].isActive = false;
        this.setState((state) => ({
          score: state.score + 1,
        }));
      }
      if (pairs[0].bodyA.label === "Circle Body") {
        pairs[0].isActive = false;
        this.setState((state) => ({
          score: state.score + 1,
        }));
      }

      if (pairs[0].bodyB.label === "Polygon Body") {
        pairs[0].isActive = false;
        // this.setState((state) => ({
        //   score: state.score + 1,
        // }));
      }
      if (pairs[0].bodyA.label === "Polygon Body") {
        pairs[0].isActive = false;
        // this.setState((state) => ({
        //   score: state.score + 1,
        // }));
      }

      //EVENTS DISPATCHED TO ALL LISTENERS
      if (this.state.score >= 100) {
        this.gameEngine.dispatch({ type: "next-level" });
      }
      if (pairs[0].bodyB.label === "Rectangle Body") {
        this.gameEngine.dispatch({ type: "game-over" });
      }
    });

    //RETURN ENTITIES TO RENDER ON SCREEN
    return {
      physics: { engine: engine, world: world },
      fish: { body: fish, pose: 1, renderer: Fish },
      // backgroundImage1: {
      //   body: backgroundImage1,
      //   renderer: BackgroundImage,
      // },
      // backgroundImage2: {
      //   body: backgroundImage2,
      //   renderer: BackgroundImage,
      // },
      floor1: {
        body: floor1,
        renderer: Floor,
      },
      floor2: {
        body: floor2,
        renderer: Floor,
      },
      // hook1: {
      //   body: hook1,
      //   renderer: Hook,
      // },
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
      // meatball: {
      //   body: meatball,
      //   meatballPose: 1,
      //   pose: 1,
      //   renderer: Meatball,
      // },
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
    };
  };

  onEvent = (event) => {
    if (event.type === "game-over") {
      this.setState({
        running: false,
      });
    }
    if (event.type === "next-level") {
      this.setState({
        running: false,
      });
    }
  };

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      score: 0,
      running: true,
    });
  };

  render() {
    return (
      <View style={styles.gameView}>
        <Image
          resizeMode="cover"
          source={Images.backgroundImage}
          style={styles.backgroundImage}
        />
        <LottieView
          style={styles.bubbles}
          source={require("../assets/img/animations/bubbles.json")}
          autoPlay
          loop
          resizeMode="contain"
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
        {!this.state.running && this.state.score < 100 && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {}}
            style={styles.fullScreenButton}
          >
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Ouch!</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.reset}
                style={styles.nextLevelButton}
              >
                <Text style={styles.nextLevelButtonText}>Play Again</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        {!this.state.running && this.state.score >= 100 && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {}}
            style={styles.fullScreenButton}
          >
            <View style={styles.fullScreen}>
              <Text style={styles.congratulationsText}>CONGRATULATIONS!</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => alert("Under Construction")}
                style={styles.nextLevelButton}
              >
                <Text style={styles.nextLevelButtonText}>NEXT LEVEL</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>Score: {this.state.score}</Text>
        </View>
      </View>
    );
  }
}

export default LevelOne;
