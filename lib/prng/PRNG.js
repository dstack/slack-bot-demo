const { XorGen128 } = require("./XorGen128");

const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

class PRNG {
  constructor(seed) {
    this.seed = seed || PRNG.randString(32);
    this.gen = new XorGen128(this.seed);
  }

  static randString(len) {
    len = len || 8;
    let str = "";
    for (let i = 0; i < len; i++) {
      str += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return str;
  }

  int(max) {
    max = max || 1000;
    return Math.floor(this.gen.prng() * max);
  }

  fromSet(set) {
    const rindex = this.int(set.length);
    const res = {
      index: rindex,
      item: set[rindex]
    };
    return res;
  }

  range(min, max) {
    min = min || 0;
    max = max || 1000;
    return Math.floor(this.gen.prng() * (max - min + 1)) + min;
  }

  chance(pctToPass = 50) {
    pctToPass = pctToPass || 50;
    const target = 100 - pctToPass;
    const passRoll = this.gen.prng() * 101; // high precision pass roll
    return {
      roll: passRoll,
      success: passRoll >= target,
      passChance: pctToPass,
      failChance: target
    };
  }

}

module.exports = {
  PRNG: PRNG
};
