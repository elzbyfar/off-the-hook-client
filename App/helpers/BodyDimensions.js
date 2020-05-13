import Matter from "matter-js";
import Values from "./Values";
import Bodies from "../helpers/Bodies";

export default BodyDimensions = () => {
  let fish = Matter.Bodies.rectangle(
    Values.maxW / 6,
    Values.maxH / 3,
    Values.fishWidth,
    Values.fishHeight
  );
  let floor1 = Matter.Bodies.rectangle(
    Values.floorWidth / 2,
    Values.maxH - 60,
    Values.floorWidth,
    Values.floorHeight,
    { isStatic: true }
  );
  let floor2 = Matter.Bodies.rectangle(
    Values.floorWidth + Values.floorWidth / 2,
    Values.maxH - 60,
    Values.floorWidth,
    Values.floorHeight,
    { isStatic: true }
  );
  let hook1 = Matter.Bodies.circle(
    Values.maxW * 4 - Values.hookWidth / 2,
    Values.maxH / 8,
    Values.hookRadius,
    { isStatic: true }
  );
  let crab = Matter.Bodies.circle(
    Values.maxW * 2 - Values.crabWidth / 2,
    Values.maxH - 195,
    Values.crabRadius,
    { isStatic: true }
  );
  let purpleShark = Matter.Bodies.circle(
    Values.maxW * 3 - Values.purpleSharkWidth / 2,
    Values.maxH - 100 - (300 + Math.floor(Math.random() * 200)),
    Values.purpleSharkRadius,
    { isStatic: true }
  );
  let fishBones = Matter.Bodies.circle(
    Values.maxW * 4 - Values.fishBonesWidth / 2,
    Values.maxH - 350,
    Values.fishBonesRadius,
    { isStatic: true }
  );
  let pellet1 = Matter.Bodies.polygon(
    (Values.maxW * 3) / 2 - Math.floor(Math.random() * 300),
    5,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let pellet2 = Matter.Bodies.polygon(
    (Values.maxW * 5) / 2 - Math.floor(Math.random() * 300),
    5,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let pellet3 = Matter.Bodies.polygon(
    (Values.maxW * 7) / 2 - Math.floor(Math.random() * 300),
    5,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let key = Matter.Bodies.polygon(
    (Values.maxW * 5) / 2 - Math.floor(Math.random() * 300),
    -30,
    4,
    Values.keyRadius,
    { isStatic: true, isSleeping: false }
  );

  return {
    fish,
    floor1,
    floor2,
    hook1,
    crab,
    purpleShark,
    fishBones,
    pellet1,
    pellet2,
    pellet3,
    key,
    renderers: {
      fish: {
        body: fish,
        pose: 1,
        name: "",
        renderer: Bodies.Fish,
      },
      floor1: {
        body: floor1,
        renderer: Bodies.Floor,
      },
      floor2: {
        body: floor2,
        renderer: Bodies.Floor,
      },
      hook1: {
        body: hook1,
        renderer: Bodies.Hook,
      },
      crab: {
        body: crab,
        crabPose: 1,
        renderer: Bodies.Crab,
      },
      purpleShark: {
        body: purpleShark,
        purpleSharkPose: 1,
        renderer: Bodies.PurpleShark,
      },
      fishBones: {
        body: fishBones,
        renderer: Bodies.FishBones,
      },
      pellet1: {
        body: pellet1,
        colorPick: 1,
        renderer: Bodies.Pellet,
      },
      pellet2: {
        body: pellet2,
        colorPick: 2,
        renderer: Bodies.Pellet,
      },
      pellet3: {
        body: pellet3,
        colorPick: 3,
        renderer: Bodies.Pellet,
      },
      key: {
        body: key,
        renderer: Bodies.Key,
      },
    },
  };
};
