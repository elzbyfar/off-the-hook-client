import Values from "./Values";

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min * 1) + min);

export const GenerateLines = () => {
  let topLineHeight = randomBetween(100, Values.maxHeight / 2 - 100);
  let bottomLineHeight = Values.maxH - topLineHeight - Values.gapSize;

  let sizes = [topLineHeight, bottomLineHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export default GenerateLines;
