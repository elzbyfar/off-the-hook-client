import Matter from "matter-js";
import Values from "./Values";
import NewCoordinates from "./NewCoordinates";

let tick = 0;
let pose = 1;
let colorPick = 0;
let crabPose = 0;
let purpleSharkPose = 0;

const Physics = (entities, { touches, time }) => {
  let hadTouches = false;
  const engine = entities.physics.engine;
  const world = entities.physics.world;
  const name = entities.physics.name;
  const key = entities.key.body;
  const crab = entities.crab.body;
  const fish = entities.fish.body;
  const hook = entities.hook.body;
  const floor1 = entities.floor1.body;
  const floor2 = entities.floor2.body;
  const fishBones = entities.fishBones.body;
  const purpleShark = entities.purpleShark.body;

  const hookPosition = hook.position.x - Values.maxW;
  const fishPosition = fish.position;
  const pellet = [
    entities.pellet1.body,
    entities.pellet2.body,
    entities.pellet3.body,
    entities.pellet4.body,
    entities.pellet5.body,
    entities.pellet6.body,
  ];

  const shouldEatPellet = (i) => {
    return (
      Math.abs(pellet[i - 1].position.x - fishPosition.x) < 35 &&
      Math.abs(pellet[i - 1].position.y - fishPosition.y) < 20
    );
  };
  const shouldCaptureKey = () => {
    return (
      Math.abs(key.position.x - fishPosition.x) < 35 &&
      Math.abs(key.position.y - fishPosition.y) < 35
    );
  };

  const hookMovementOnStop = () => {
    if (
      (hookPosition > 100 && hookPosition < 200) ||
      (hookPosition > -100 && hookPosition < 0) ||
      hookPosition < -200
    ) {
      Matter.Body.translate(hook, { x: 2.9, y: 3.9 });
    }
    if (
      (hookPosition > 0 && hookPosition < 100) ||
      (hookPosition > -200 && hookPosition < -100)
    ) {
      Matter.Body.translate(hook, { x: 2.9, y: -3.9 });
    }
  };

  //FISH MOVEMENT VERTICAL
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      if (!hadTouches) {
        world.gravity.y === 0.2 && (world.gravity.y = 0.28);

        hadTouches = true;
        Matter.Body.setVelocity(fish, { x: 0.35, y: -5.2 });
      }
    });

  if (fish.velocity.y > 1.5) {
    Matter.Body.setVelocity(fish, { x: -0.43, y: fish.velocity.y });
  }

  //HOOK REGENERATION
  if (hook.position.x <= -200) {
    Matter.Body.setPosition(hook, {
      x: NewCoordinates().hook.x,
      y: NewCoordinates().hook.y,
    });
  } else {
    Matter.Body.translate(hook, { x: -3.0, y: 0 });
  }
  if (hookPosition < -200) {
    Matter.Body.translate(hook, { x: 0, y: -4 });
  } else if (hookPosition > 100 && hookPosition < 200) {
    Matter.Body.translate(hook, { x: 0, y: -4 });
  } else if (hookPosition > 0 && hookPosition < 100) {
    Matter.Body.translate(hook, { x: 0, y: 4 });
  } else if (hookPosition > -100 && hookPosition < 0) {
    Matter.Body.translate(hook, { x: 0, y: -4 });
  } else if (hookPosition > -200 && hookPosition < -100) {
    Matter.Body.translate(hook, { x: 0, y: 4 });
  }

  //CRAB REGENERATION + MOVEMENT
  if (crab.position.x <= -100) {
    Matter.Body.setPosition(crab, {
      x: NewCoordinates().crab.x,
      y: NewCoordinates().crab.y,
    });
  } else {
    Matter.Body.translate(crab, { x: -3.8, y: 0 });
  }

  //PURPLE SHARK REGENERATION
  if (purpleShark.position.x <= -100) {
    Matter.Body.setPosition(purpleShark, {
      x: NewCoordinates().purpleShark.x,
      y: NewCoordinates().purpleShark.y,
    });
  } else {
    Matter.Body.translate(purpleShark, { x: -2.6, y: -0.2 });
  }

  //FISH BONES REGENERATION
  if (fishBones.position.x <= -100) {
    Matter.Body.setPosition(fishBones, {
      x: NewCoordinates().fishBones.x,
      y: NewCoordinates().fishBones.y,
    });
    console.log(fishBones.position.y);
  } else {
    Matter.Body.translate(fishBones, { x: -0.75, y: 0.15 });
  }
  if (fishBones.position.y > 720) {
    Matter.Body.translate(fishBones, { x: 0, y: -0.15 });
  }

  //PELLET MAKER
  let n = null;
  for (let i = 1; i <= 120; i++) {
    i % 6 === 1 && (n = 1);
    i % 6 === 2 && (n = 2);
    i % 6 === 3 && (n = 3);
    i % 6 === 4 && (n = 4);
    i % 6 === 5 && (n = 5);
    i % 6 === 0 && (n = 6);

    if (pellet[n - 1].position.x <= -200) {
      Matter.Body.setPosition(pellet[n - 1], {
        x: NewCoordinates(n).pellet.x,
        y: NewCoordinates(n).pellet.y,
      });
    } else {
      Matter.Body.translate(pellet[n - 1], { x: -0.04, y: 0.08 });
    }

    //GROUNDED PELLET
    if (pellet[n - 1].position.y > 722) {
      Matter.Body.translate(pellet[n - 1], { x: 0, y: -0.075 });
    }

    if (fishPosition.y > 710 && !(pellet[n - 1].position.y > 722)) {
      Matter.Body.translate(pellet[n - 1], { x: 0.04, y: 0 });
    }
  }

  //EAT PELLET
  for (let i = 1; i <= 6; i++) {
    if (shouldEatPellet(i)) {
      Matter.Body.setPosition(pellet[i - 1], {
        x: NewCoordinates(i).pellet.x,
        y: NewCoordinates(i).pellet.y,
      });
    }
  }

  //KEY DROPS
  if (key) {
    if (Math.abs(key.position.x - fishPosition.x) < 300) {
      Matter.Body.translate(key, { x: -0.9, y: 1.5 });
    } else {
      Matter.Body.translate(key, { x: -0.9, y: 0 });
    }
    if (shouldCaptureKey()) {
      Matter.Body.setPosition(key, {
        x: -100,
        y: -100,
      });
    }
    if (key.position.y > 720) {
      Matter.Body.translate(key, { x: 0, y: -1.5 });
    }

    if (fishPosition.y > 710 && !(key.position.y < 720)) {
      Matter.Body.translate(key, { x: 0, y: -1.3 });
    }
  }

  Matter.Engine.update(engine, time.delta);

  //FLOOR MOVEMENT
  Object.keys(entities).forEach((floor) => {
    if (floor.indexOf("floor") === 0) {
      if (entities[floor].body.position.x <= (-1 * 496) / 2) {
        Matter.Body.setPosition(entities[floor].body, {
          x: NewCoordinates().floor.x,
          y: NewCoordinates().floor.y,
        });
      } else {
        Matter.Body.translate(entities[floor].body, { x: -4.4, y: 0 });
      }
    }
  });

  //FISH GROUNDED
  if (fishPosition.y > 710) {
    Matter.Body.translate(floor1, { x: 4.4, y: 0 });
    Matter.Body.translate(floor2, { x: 4.4, y: 0 });
    Matter.Body.translate(crab, { x: 3.6, y: 0 });
    Matter.Body.translate(fishBones, { x: 0.65, y: -0 });
    Matter.Body.translate(purpleShark, { x: 2, y: -0.25 });
    hookMovementOnStop();
  }

  //FINS ANIMATION
  tick += 1;
  entities.fish.name = name;
  if (tick % 5 === 0) {
    pose = pose + 1;
    if (pose > 3) {
      pose = 1;
    }
    entities.fish.pose = pose;
  }

  //COLOR CHANGE
  if (tick % 7 === 0) {
    for (let i = 1; i <= 6; i++) {
      entities["pellet" + i].colorPick = colorPick;
    }
    colorPick += 1;
    if (colorPick === 4) {
      colorPick = 0;
    }
  }

  //CRAB ANIMATION
  if (tick % 15 === 0) {
    crabPose = crabPose + 1;
    if (crabPose > 7) {
      crabPose = 0;
    }
    entities.crab.crabPose = crabPose;
  }

  //PURPLE SHARK ANIMATION
  if (tick % 20 === 0) {
    purpleSharkPose = purpleSharkPose + 1;
    if (purpleSharkPose > 2) {
      purpleSharkPose = 0;
    }
    entities.purpleShark.purpleSharkPose = purpleSharkPose;
  }

  return entities;
};

export default Physics;
