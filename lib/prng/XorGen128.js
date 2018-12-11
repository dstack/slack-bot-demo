class XorGen128 {
  constructor(seed) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
    let strSeed = "";
    if (seed == (seed | 0)) {
      this.x = seed;
    }
    else {
      strSeed += seed;
    }

    for (let i = 0, l = strSeed.length + 64; i < l; i++) {
      this.x ^= strSeed.charCodeAt(i) | 0;
      this.next();
    }
  }

  next() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return this.w ^= (this.w >>> 19) ^ t ^ (t >>> 8);
  }

  prng() {
    return (this.next() >>> 0) / 0x100000000;
  }
}

module.exports = {
  XorGen128: XorGen128
};
