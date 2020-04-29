import Matter from "matter-js";
import Constants from "./Constants";
import Hook from "../components/Hook";
import Food from "../components/Food";

let tick = 0;
let pose = 1;

const Physics = (entities, { touches, time }) => {
  let engine = entities.physics.engine;
  let world = entities.physics.world;
  let fish = entities.fish.body;
  let hadTouches = false;
  //FISH MOVEMENT (VERTICAL)
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      if (!hadTouches) {
        if (world.gravity.y === 0) {
          world.gravity.y = 0.4;
        }
        hadTouches = true;
        Matter.Body.setVelocity(fish, {
          x: fish.velocity.x,
          y: -4,
        });
      }
    });

  //HOOK REGENERATION + VERTICAL MOVEMENT
  if (entities.hook1.body.position.x <= -100) {
    Matter.Body.setPosition(entities.hook1.body, {
      x: Constants.maxWidth * 2 - Constants.hookWidth / 2,
      y: Constants.maxHeight / 3,
    });
  } else {
    Matter.Body.translate(entities.hook1.body, { x: -6, y: 0 });
  }

  if (entities.hook1.body.position.x - entities.fish.body.position.x < 180) {
    Matter.Body.translate(entities.hook1.body, { x: 0, y: -12 });
  }

  //FOOD

  for (let i = 1; i <= 3; i++) {
    if (entities["food" + i].body.position.x <= -200) {
      Matter.Body.setPosition(entities["food" + i].body, {
        x:
          Constants.maxWidth * (3 * i) -
          2 / (100 + i * Math.floor(Math.random() * 200)),
        y: Constants.maxHeight - (350 + i * Math.floor(Math.random() * 100)),
      });
    } else {
      Matter.Body.translate(entities["food" + i].body, { x: -4, y: 0.35 });
    }
  }

  //EAT FOOD
  for (let i = 1; i <= 3; i++) {
    if (
      Math.abs(
        entities["food" + i].body.position.x - entities.fish.body.position.x
      ) < 55 &&
      Math.abs(
        entities["food" + i].body.position.y - entities.fish.body.position.y
      ) < 47
    ) {
      Matter.Body.setPosition(entities["food" + i].body, {
        x:
          Constants.maxWidth * (3 * i) -
          2 / (100 + i * Math.floor(Math.random() * 200)),
        y: Constants.maxHeight - (350 + i * Math.floor(Math.random() * 100)),
      });
    }
  }

  // if (entities.food1.body.position.x <= -200) {
  //   Matter.Body.setPosition(entities.food1.body, {
  //     x: Constants.maxWidth * 2 - Constants.hookWidth / 2,
  //     y: Constants.maxHeight - 250,
  //   });
  // } else {
  //   Matter.Body.translate(entities.food1.body, { x: -4, y: 0 });
  // }

  Matter.Engine.update(engine, time.delta);

  //FLOOR MOVEMENT
  Object.keys(entities).forEach((key) => {
    if (key.indexOf("floor") === 0) {
      if (entities[key].body.position.x <= (-1 * 502) / 2) {
        Matter.Body.setPosition(entities[key].body, {
          x: 512 + 512 / 2,
          y: entities[key].body.position.y,
        });
      } else {
        Matter.Body.translate(entities[key].body, { x: -4, y: 0 });
      }
    }
  });

  //FINS ANIMATION
  tick += 1;
  if (tick % 5 === 0) {
    pose = pose + 1;
    if (pose > 3) {
      pose = 1;
    }
    entities.fish.pose = pose;
  }
  return entities;
};

export default Physics;
