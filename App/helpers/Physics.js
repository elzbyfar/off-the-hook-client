import Matter from "matter-js";
import Constants from "./Constants";
import Hook from "../components/Hook";
import Food from "../components/Food";

let tick = 0;
let pose = 1;
let crabPose = 1;
let pick = 0;

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
        if (world.gravity.y === 0.2) {
          world.gravity.y = 0.35;
        }
        hadTouches = true;
        Matter.Body.setVelocity(fish, {
          x: fish.velocity.x,
          y: -5,
        });
      }
    });

  //HOOK REGENERATION + VERTICAL MOVEMENT
  // if (entities.hook1.body.position.x <= -100) {
  //   Matter.Body.setPosition(entities.hook1.body, {
  //     x: Constants.maxWidth * 2 - Constants.hookWidth / 2,
  //     y: Constants.maxHeight / 3,
  //   });
  // } else {
  //   Matter.Body.translate(entities.hook1.body, { x: -6, y: 0 });
  // }

  // if (entities.hook1.body.position.x - entities.fish.body.position.x < 180) {
  //   Matter.Body.translate(entities.hook1.body, { x: 0, y: -12 });
  // }

  //CRAB REGENERATION + VERTICAL MOVEMENT
  if (entities.crab.body.position.x <= -100) {
    Matter.Body.setPosition(entities.crab.body, {
      x: Constants.maxWidth * 4 - Constants.crabWidth / 2,
      y: Constants.maxHeight - 200,
    });
  } else {
    Matter.Body.translate(entities.crab.body, { x: -4, y: 0 });
  }

  //FOOD
  let n = null;
  for (let i = 1; i <= 90; i++) {
    if (i % 3 === 1) {
      n = 1;
    }
    if (i % 3 === 2) {
      n = 2;
    }
    if (i % 3 === 0) {
      n = 3;
    }

    if (entities["food" + n].body.position.x <= -200) {
      Matter.Body.setPosition(entities["food" + n].body, {
        x: (Constants.maxWidth * (n + 1)) / 2 - Math.floor(Math.random() * 300),
        y: Constants.maxHeight - (350 + Math.floor(Math.random() * 200)),
      });
    } else {
      Matter.Body.translate(entities["food" + n].body, { x: -0.08, y: 0.01 });
    }
  }

  //EAT FOOD
  for (let i = 1; i <= 3; i++) {
    if (
      Math.abs(
        entities["food" + i].body.position.x - entities.fish.body.position.x
      ) < 45 &&
      Math.abs(
        entities["food" + i].body.position.y - entities.fish.body.position.y
      ) < 30
    ) {
      Matter.Body.setPosition(entities["food" + i].body, {
        x: (Constants.maxWidth * (n + 1)) / 2 - Math.floor(Math.random() * 300),
        y: Constants.maxHeight - (350 + Math.floor(Math.random() * 200)),
      });
    }
  }

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

  //COLOR CHANGE
  if (tick % 10 === 0) {
    for (let i = 1; i <= 3; i++) {
      entities["food" + i].pick = pick;
    }
    pick += 1;
    if (pick === 4) {
      pick = 0;
    }
  }

  //CRAB ANIMATION
  if (tick % 15 === 0) {
    crabPose = crabPose + 1;
    if (crabPose > 8) {
      crabPose = 1;
    }
    entities.crab.crabPose = crabPose;
  }

  return entities;
};

export default Physics;
