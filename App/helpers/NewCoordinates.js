import Values from "./Values";

const random = (n) => {
  return Math.floor(Math.random() * n);
};

const NewCoordinates = (n) => {
  return {
    fish: {
      x: Values.maxW / 6,
      y: Values.maxH / 3,
    },
    pellet: {
      x: (Values.maxW * (n + 1)) / 2 - random(300),
      y: 5,
    },
    hook: {
      x: Values.maxW * 2 - 200 / 2,
      y: Values.maxH / 8,
    },
    crab: {
      x: Values.maxW * 4 - Values.crabWidth / 2,
      y: Values.maxH - 195,
    },
    purpleShark: {
      x: Values.maxW * 4 - Values.purpleSharkWidth / 2,
      y: Values.maxH - 20 - (150 + random(500)),
    },
    fishBones: {
      x: Values.maxW * 4 - Values.fishBonesWidth / 2,
      y: Values.maxH - (10 + random(600)),
    },
    floor: {
      x: 512 + 512 / 2,
      y: Values.maxH - 60,
    },
  };
};

export default NewCoordinates;
