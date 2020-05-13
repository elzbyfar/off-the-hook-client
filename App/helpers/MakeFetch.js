import Values from "./Values";

const MakeFetch = (urlSlug, meth, stringifyObj, thenFunction) => {
  fetch(`${Values.API_BASE}/${urlSlug}`, {
    method: meth,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(stringifyObj),
  })
    .then((resp) => resp.json())
    .then(thenFunction ? thenFunction : null);
};
export default MakeFetch;
