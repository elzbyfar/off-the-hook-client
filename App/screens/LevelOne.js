import React, { Component } from "react";
import { GameEngine } from "react-native-game-engine";
import Constants from "../helpers/Constants";
import Physics from "../helpers/Physics";
import Matter from "matter-js";
import Floor from "../components/Floor";
import Fish from "../components/Fish";
import Hook from "../components/Hook";
import Crab from "../components/Crab";
import Food from "../components/Food";
// import Images from "../assets/Images";
// import LottieView from "lottie-react-native";
// import Ceiling from "../components/Ceiling";
// import GenerateLines from "../helpers/GenerateLines";

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
    world.gravity.y = 0.4;

    let fish = Matter.Bodies.rectangle(
      Constants.maxWidth / 4,
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

    let food1 = Matter.Bodies.circle(
      (Constants.maxWidth * 3) / 2 - Math.floor(Math.random() * 300),
      Constants.maxHeight - (350 + Math.floor(Math.random() * 200)),
      Constants.foodRadius,
      { isStatic: true }
    );
    let food2 = Matter.Bodies.circle(
      (Constants.maxWidth * 5) / 2 - Math.floor(Math.random() * 300),
      Constants.maxHeight - (350 + Math.floor(Math.random() * 200)),
      Constants.foodRadius,
      { isStatic: true }
    );
    let food3 = Matter.Bodies.circle(
      (Constants.maxWidth * 7) / 2 - Math.floor(Math.random() * 300),
      Constants.maxHeight - (350 + Math.floor(Math.random() * 200)),
      Constants.foodRadius,
      { isStatic: true }
    );

    //PLACE ENTITIES WITHIN MATTER.WORLD'S SCOPE
    Matter.World.add(world, [
      fish,
      floor1,
      floor2,
      hook1,
      crab,
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
      crab: {
        body: crab,
        pose: 1,
        renderer: Crab,
      },
      food1: {
        body: food1,
        renderer: Food,
      },
      food2: {
        body: food2,
        renderer: Food,
      },
      food3: {
        body: food3,
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
        {!this.state.running && this.state.score < 40 && (
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
