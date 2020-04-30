let m = -20;
let ArrayMaker = { length: 40 };
ArrayMaker = Array.from(ArrayMaker);

for (let i = 0; i < ArrayMaker.length; i++) {
  m = m + i;
  ArrayMaker.push(m);
}
export default ArrayMaker;
