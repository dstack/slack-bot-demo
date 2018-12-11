const SQUAWKS = require("./data/squawks");
const { PRNG } = require("./prng/PRNG");

// const strings
const BIRD = ":bird:";

const squawkPRNG = new PRNG(PRNG.randString(32));

function randomSquawk() {
  return squawkPRNG.fromSet(SQUAWKS).item;
}

module.exports = {
  parrotize: function(msg) {
    msg = `${randomSquawk()}! ${msg}`;
    msg = msg.toUpperCase();
    return `${BIRD} ${msg} ${BIRD}`;
  }
};
