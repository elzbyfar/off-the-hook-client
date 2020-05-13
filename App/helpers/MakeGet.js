import Values from "./Values";

const MakeGet = (urlSlug, thenFunction) => {
  fetch(`${Values.API_BASE}/${urlSlug}`)
    .then((resp) => resp.json())
    .then(thenFunction);
};
export default MakeGet;
