import Constants from "./Constants";

const MakeGet = (urlSlug, thenFunction) => {
  fetch(`${Constants.API_BASE}/${urlSlug}`)
    .then((resp) => resp.json())
    .then(thenFunction);
};
export default MakeGet;
