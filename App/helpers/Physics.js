import Matter from "matter-js";
import Constants from "./Constants";

let tick = 0;
let pose = 1;
let colorPick = 0;
let crabPose = 1;
let purpleSharkPose = 1;

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
          world.gravity.y = 0.28;
        }
        hadTouches = true;
        Matter.Body.setVelocity(fish, {
          x: 0.2,
          y: -5,
        });
      }
    });

  if (entities.fish.body.velocity.y > 1.5) {
    Matter.Body.setVelocity(fish, {
      x: -0.25,
      y: entities.fish.body.velocity.y,
    });
  }

  //HOOK REGENERATION + VERTICAL MOVEMENT
  if (entities.hook1.body.position.x <= -100) {
    Matter.Body.setPosition(entities.hook1.body, {
      x: Constants.maxWidth * 3 - Constants.hookWidth / 2,
      y: Constants.maxHeight / 10,
    });
  } else {
    Matter.Body.translate(entities.hook1.body, { x: -5.5, y: 0 });
  }

  if (entities.hook1.body.position.x - entities.fish.body.position.x < 180) {
    Matter.Body.translate(entities.hook1.body, { x: 0, y: -12 });
  }

  //CRAB REGENERATION + VERTICAL MOVEMENT
  if (entities.crab.body.position.x <= -100) {
    Matter.Body.setPosition(entities.crab.body, {
      x: Constants.maxWidth * 4 - Constants.crabWidth / 2,
      y: Constants.maxHeight - 195,
    });
  } else {
    Matter.Body.translate(entities.crab.body, { x: -4, y: 0 });
  }

  //PURPLE SHARK REGENERATION
  if (entities.purpleShark.body.position.x <= -100) {
    Matter.Body.setPosition(entities.purpleShark.body, {
      x: Constants.maxWidth * 4 - Constants.purpleSharkWidth / 2,
      y: Constants.maxHeight - 100 - (300 + Math.floor(Math.random() * 200)),
    });
  } else {
    Matter.Body.translate(entities.purpleShark.body, { x: -2.1, y: 0.2 });
  }

  //FISH BONES REGENERATION
  if (entities.fishBones.body.position.x <= -100) {
    Matter.Body.setPosition(entities.fishBones.body, {
      x: Constants.maxWidth * 4 - Constants.fishBonesWidth / 2,
      y: Constants.maxHeight - (450 + Math.floor(Math.random() * 200)),
    });
  } else {
    Matter.Body.translate(entities.fishBones.body, { x: -1, y: -0.05 });
  }

  //FOOD MAKER
  let n = null;
  for (let i = 1; i <= 90; i++) {
    i % 3 === 1 ? (n = 1) : null;
    i % 3 === 2 ? (n = 2) : null;
    i % 3 === 0 ? (n = 3) : null;

    if (entities["food" + n].body.position.x <= -200) {
      Matter.Body.setPosition(entities["food" + n].body, {
        x: (Constants.maxWidth * (n + 1)) / 2 - Math.floor(Math.random() * 300),
        y: Constants.maxHeight - (350 + Math.floor(Math.random() * 200)),
      });
    } else {
      Matter.Body.translate(entities["food" + n].body, { x: -0.06, y: 0.03 });
    }

    if (entities["food" + n].body.position.y > 722) {
      Matter.Body.translate(entities["food" + n].body, { x: 0, y: -0.03 });
    }

    if (
      entities.fish.body.position.y > 710 &&
      !(entities["food" + n].body.position.y > 722)
    ) {
      Matter.Body.translate(entities["food" + n].body, { x: 0.01, y: 0 });
    }
  }

  //EAT FOOD
  for (let i = 1; i <= 3; i++) {
    if (
      Math.abs(
        entities["food" + i].body.position.x - entities.fish.body.position.x
      ) < 35 &&
      Math.abs(
        entities["food" + i].body.position.y - entities.fish.body.position.y
      ) < 20
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

  if (entities.fish.body.position.y > 710) {
    Matter.Body.translate(entities.floor1.body, { x: 4, y: 0 });
    Matter.Body.translate(entities.floor2.body, { x: 4, y: 0 });
    Matter.Body.translate(entities.crab.body, { x: 3, y: 0 });
  }

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
  if (tick % 7 === 0) {
    for (let i = 1; i <= 3; i++) {
      entities["food" + i].colorPick = colorPick;
    }
    colorPick += 1;
    if (colorPick === 4) {
      colorPick = 0;
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

  //PURPLE SHARK ANIMATION
  if (tick % 20 === 0) {
    purpleSharkPose = purpleSharkPose + 1;
    if (purpleSharkPose > 3) {
      purpleSharkPose = 1;
    }
    entities.purpleShark.purpleSharkPose = purpleSharkPose;
  }

  return entities;
};

export default Physics;
