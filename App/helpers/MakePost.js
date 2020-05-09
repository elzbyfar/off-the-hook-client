import Constants from "./Constants";

const MakePost = (urlSlug, stringifyObj, thenFunction) => {
  fetch(`${Constants.API_BASE}/${urlSlug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(stringifyObj),
  })
    .then((resp) => resp.json())
    .then(thenFunction);
};
export default MakePost;
