import Constants from "./Constants";

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min * 1) + min);

export const GenerateLines = () => {
  let topLineHeight = randomBetween(100, Constants.maxHeight / 2 - 100);
  let bottomLineHeight =
    Constants.maxHeight - topLineHeight - Constants.gapSize;

  let sizes = [topLineHeight, bottomLineHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export default GenerateLines;
