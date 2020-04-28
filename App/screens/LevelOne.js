import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import Matter from "matter-js";
import Physics from "../helpers/Physics";
import GenerateLines from "../helpers/GenerateLines";
import Constants from "../helpers/Constants";
import Fish from "../components/Fish";
import Floor from "../components/Floor";
import Hook from "../components/Hook";
import Treasure from "../components/Treasure";
import Food from "../components/Food";
// import Images from "../assets/Images";
// import LottieView from "lottie-react-native";
// import Ceiling from "../components/Ceiling";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  gameView: {
    flex: 1,
    backgroundColor: "#22a1e6",
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
});

class LevelOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: true,
      hookHeight: 100,
    };
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    //GENERATE ENTITIES FOR USE
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.2;

    let fish = Matter.Bodies.rectangle(
      Constants.maxWidth / 4,
      Constants.maxHeight / 3,
      Constants.fishWidth,
      Constants.fishHeight
    );
    let floor1 = Matter.Bodies.rectangle(
      Constants.floorWidth / 2,
      Constants.maxHeight - 50,
      Constants.floorWidth,
      Constants.floorHeight,
      { isStatic: true }
    );
    let floor2 = Matter.Bodies.rectangle(
      Constants.floorWidth + Constants.floorWidth / 2,
      Constants.maxHeight - 50,
      Constants.floorWidth,
      Constants.floorHeight,
      { isStatic: true }
    );

    let hook1 = Matter.Bodies.rectangle(
      Constants.maxWidth * 2 - Constants.hookWidth / 2,
      Constants.maxHeight / 8,
      Constants.hookWidth,
      Constants.hookHeight,
      { isStatic: true }
    );
    let food = Matter.Bodies.rectangle(400, 150, 50, 50, {
      backgroundColor: "red",
      isStatic: true,
    });

    // let hook2 = Matter.Bodies.rectangle(
    //   Constants.maxWidth * 3 - Constants.hookWidth / 2,
    //   0,
    //   Constants.hookWidth,
    //   Constants.hookHeight,
    //   { isStatic: true }
    // );

    // let treasure1 = Matter.Bodies.rectangle(
    //   Constants.maxWidth - Constants.hookWidth / 2 - 100,
    //   Constants.maxHeight - 250,
    //   1,
    //   1,
    //   { isStatic: true }
    // );
    // let treasure2 = Matter.Bodies.rectangle(
    //   Constants.maxWidth * 2 - Constants.hookWidth / 2 - 100,
    //   Constants.maxHeight - 250,
    //   1,
    //   1,
    //   { isStatic: true }
    // );

    //PLACE ENTITIES WITHIN MATTER.WORLD'S SCOPE
    Matter.World.add(world, [
      fish,
      floor1,
      floor2,
      hook1,
      food,
      // hook2,

      // treasure1,
      // treasure2,
    ]);

    //COLLISION DETECTION
    Matter.Events.on(engine, "collisionStart", (event) => {
      //PAIRS INVOLVED IN COLLISION
      let pairs = event.pairs;

      //EVENT DISPATCHED TO ALL LISTENERS
      this.gameEngine.dispatch({ type: "game-over" });
    });

    //RETURN ENTITIES TO RENDER ON SCREEN
    return {
      physics: { engine: engine, world: world },
      fish: { body: fish, pose: 1, renderer: Fish },
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
      food: {
        body: food,
        size: [140, 140],
        color: "red",
        render: Food,
      },
      // hook2: {
      //   body: hook2,
      //   renderer: Hook,
      // },
      // treasure1: {
      //   body: treasure1,
      //   renderer: Treasure,
      // },
      // treasure2: {
      //   body: treasure2,
      //   renderer: Treasure,
      // },
    };
  };

  onEvent = (event) => {
    if (event.type === "game-over") {
      this.setState({
        running: false,
      });
    }
  };

  reset = () => {
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
    });
  };

  render() {
    return (
      <View style={styles.gameView}>
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
        {!this.state.running && (
          <TouchableOpacity
            onPress={this.reset}
            style={styles.fullScreenButton}
          >
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>GAME OVER</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default LevelOne;
