import Matter from "matter-js";
import Constants from "./Constants";
import Line from "../components/Hook";
import Hook from "../components/Hook";
import Food from "../components/Food";
import Treasure from "../components/Treasure";

let tick = 0;
let pose = 1;
// let lines = 0;

// export const randomBetween = (min, max) =>
//   Math.floor(Math.random() * (max - min * 1) + min);

// export const GenerateLines = () => {
//   let topLineHeight = randomBetween(100, Constants.maxHeight / 2 - 100);
//   let bottomLineHeight =
//     Constants.maxHeight - topLineHeight - Constants.gapSize;

//   let sizes = [topLineHeight, bottomLineHeight];

//   if (Math.random() < 0.5) {
//     sizes = sizes.reverse();
//   }

//   return sizes;
// };

// export const addLinesAtLocation = (x, world, entities) => {
//   let [line1Height, line2Height] = GenerateLines();

//   let hookWidth = Constants.lineWidth + 20;
//   let hookHeight = (hookWidth / 205) * 95;
//   let treasureWidth = Constants.lineWidth + 20;
//   let treasureHeight = (treasureWidth / 205) * 95;

//   line1Height = line1Height - hookHeight;

//   let line1Top = Matter.Bodies.rectangle(
//     x - 16,
//     line1Height - 20,
//     hookWidth,
//     hookHeight,
//     {
//       isStatic: true,
//     }
//   );

//   let line1 = Matter.Bodies.rectangle(
//     x,
//     line1Height / 2,
//     Constants.lineWidth - 99,
//     line1Height,
//     { isStatic: true }
//   );

//   line2Height = line1Height - treasureHeight;

//   let line2Top = Matter.Bodies.rectangle(
//     x - 100,
//     Constants.maxHeight - 250,
//     1,
//     1,
//     {
//       isStatic: true,
//     }
//   );

//   let line2 = Matter.Bodies.rectangle(
//     x,
//     Constants.maxHeight - 100 - line2Height / 2,
//     Constants.lineWidth - 99,
//     1,
//     { isStatic: true }
//   );

//   Matter.World.add(world, [line1, line1Top, line2, line2Top]);

//   entities["line" + (lines + 1)] = {
//     body: line1,
//     size: [Constants.lineWidth - 99, line1Height],
//     color: "beige",
//     renderer: Line,
//   };
//   entities["line" + (lines + 2)] = {
//     body: line2,
//     size: [Constants.lineWidth - 99, line2Height],
//     color: "beige",
//     renderer: Line,
//   };

//   entities["line1Top" + (lines + 1) + "Top"] = {
//     body: line1Top,
//     renderer: Hook,
//   };
//   entities["line2Top" + (lines + 2) + "Top"] = {
//     body: line2Top,
//     renderer: Treasure,
//   };

//   lines += 2;
// };

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
          // addLinesAtLocation(
          //   Constants.maxWidth * 2 - Constants.lineWidth / 2,
          //   world,
          //   entities
          // );
          // addLinesAtLocation(
          //   Constants.maxWidth * 3 - Constants.lineWidth / 2,
          //   world,
          //   entities
          // );
        }
        hadTouches = true;
        Matter.Body.setVelocity(fish, {
          x: fish.velocity.x,
          y: -4,
        });
      }
    });

  //LINE MOVEMENT AKA SCREEN MOVEMENT (HORIZONTAL)

  if (entities.hook1.body.position.x <= -100) {
    Matter.Body.setPosition(entities.hook1.body, {
      x: Constants.maxWidth * 2 - Constants.hookWidth / 2,
      y: Constants.maxHeight / 8,
    });
  } else {
    Matter.Body.translate(entities.hook1.body, { x: -4, y: 0 });
  }

  if (entities.hook1.body.position.x - entities.fish.body.position.x < 180) {
    Matter.Body.translate(entities.hook1.body, { x: 0, y: -12 });
  }

  // for (let i = 1; i <= 2; i++) {
  //   if (
  //     entities["hook" + i].body.position.x <=
  //     -1 * (Constants.lineWidth / 2 - 16)
  //   ) {
  //     Matter.Body.setPosition(entities["hook" + i].body, {
  //       x: Constants.maxWidth * 2 - Constants.lineWidth / 2 - 16,
  //       y: entities["hook" + i].body.position.y,
  //     });
  //   } else {
  //     Matter.Body.translate(entities["hook" + i].body, { x: -3, y: 0 });
  //   }
  // }

  // for (let i = 1; i <= 2; i++) {
  //   if (
  //     entities["treasure" + i].body.position.x <=
  //     -1 * (Constants.lineWidth / 2 - 100)
  //   ) {
  //     Matter.Body.setPosition(entities["treasure" + i].body, {
  //       x: Constants.maxWidth * 2 - Constants.lineWidth / 2 - 100,
  //       y: entities["treasure" + i].body.position.y,
  //     });
  //   } else {
  //     Matter.Body.translate(entities["treasure" + i].body, { x: -3, y: 0 });
  //   }
  // }

  Matter.Engine.update(engine, time.delta);

  //MOVE THE FLOOR
  Object.keys(entities).forEach((key) => {
    // if (key.indexOf("line") === 0 && entities.hasOwnProperty(key)) {
    //   Matter.Body.translate(entities[key].body, { x: -2, y: 0 });

    //   if (
    //     key.indexOf("Top") !== -1 &&
    //     parseInt(key.replace("line", "")) % 2 === 0
    //   ) {
    //     if (entities[key].body.position.x <= -1 * (Constants.lineWidth / 2)) {
    //       let lineIndex = parseInt(key.replace("line", ""));
    //       delete entities["line" + (lineIndex - 1) + "Top"];
    //       delete entities["line" + (lineIndex - 1)];
    //       delete entities["line" + lineIndex + "Top"];
    //       delete entities["line" + lineIndex];
    //       if (!entities["line" + lineIndex] && !newLine) {
    //         newLine = true;
    //         addLinesAtLocation(
    //           Constants.maxWidth * 2 - Constants.lineWidth / 2,
    //           world,
    //           entities
    //         );
    //       }
    //     }
    //   }
    // } else
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
