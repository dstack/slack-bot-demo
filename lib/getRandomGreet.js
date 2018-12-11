const greets = require('./data/greets');
const { PRNG } =  require('./prng/PRNG');

const randomGreetPRNG = new PRNG(PRNG.randString(16));

module.exports = function randomGreet() {
  return randomGreetPRNG.fromSet(greets).item;
}
