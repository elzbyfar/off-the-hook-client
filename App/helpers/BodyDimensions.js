import Matter from "matter-js";
import Values from "./Values";
import Bodies from "../helpers/Bodies";
import NewCoordinates from "./NewCoordinates";

const random = (n) => {
  return Math.floor(Math.random() * n);
};

export default BodyDimensions = () => {
  let fish = Matter.Bodies.rectangle(
    NewCoordinates().fish.x,
    NewCoordinates().fish.y,
    Values.fishWidth,
    Values.fishHeight
  );
  let floor1 = Matter.Bodies.rectangle(
    Values.floorWidth / 2,
    NewCoordinates().floor.y,
    Values.floorWidth,
    Values.floorHeight,
    { isStatic: true }
  );
  let floor2 = Matter.Bodies.rectangle(
    Values.floorWidth + Values.floorWidth / 2,
    NewCoordinates().floor.y,
    Values.floorWidth,
    Values.floorHeight,
    { isStatic: true }
  );
  let hook = Matter.Bodies.rectangle(
    Values.maxW * 4 - 200 / 2,
    Values.maxH / 8,
    Values.hookWidth,
    Values.hookHeight,
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
    Values.maxH - 20 - (150 + random(500)),
    Values.purpleSharkRadius,
    { isStatic: true }
  );
  let fishBones = Matter.Bodies.circle(
    Values.maxW * 4 - Values.fishBonesWidth / 2,
    Values.maxH - (300 + random(600)),
    Values.fishBonesRadius,
    { isStatic: true }
  );
  let pellet1 = Matter.Bodies.polygon(
    NewCoordinates(1).pellet.x,
    NewCoordinates(1).pellet.y,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let pellet2 = Matter.Bodies.polygon(
    NewCoordinates(2).pellet.x,
    NewCoordinates(2).pellet.y,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let pellet3 = Matter.Bodies.polygon(
    NewCoordinates(3).pellet.x,
    NewCoordinates(3).pellet.y,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let pellet4 = Matter.Bodies.polygon(
    NewCoordinates(4).pellet.x,
    NewCoordinates(4).pellet.y,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let pellet5 = Matter.Bodies.polygon(
    NewCoordinates(5).pellet.x,
    NewCoordinates(5).pellet.y,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let pellet6 = Matter.Bodies.polygon(
    NewCoordinates(6).pellet.x,
    NewCoordinates(6).pellet.y,
    4,
    Values.foodRadius,
    { isStatic: true, isSleeping: false }
  );
  let key = Matter.Bodies.polygon(
    (Values.maxW * 5) / 2 - random(300),
    -30,
    4,
    Values.keyRadius,
    { isStatic: true, isSleeping: false }
  );

  return {
    fish,
    floor1,
    floor2,
    hook,
    crab,
    purpleShark,
    fishBones,
    pellet1,
    pellet2,
    pellet3,
    pellet4,
    pellet5,
    pellet6,
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
      hook: {
        body: hook,
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
      pellet4: {
        body: pellet4,
        colorPick: 1,
        renderer: Bodies.Pellet,
      },
      pellet5: {
        body: pellet5,
        colorPick: 2,
        renderer: Bodies.Pellet,
      },
      pellet6: {
        body: pellet6,
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
