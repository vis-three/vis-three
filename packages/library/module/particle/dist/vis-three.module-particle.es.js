var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineProcessor, MODULETYPE, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, ObjectRule, getObjectConfig, objectCreate } from "@vis-three/module-object";
import { validate } from "uuid";
import { Points, PointsMaterial, BufferAttribute } from "three";
class ParticleCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const ParticleRule = function(input, compiler, validateFun = validate) {
  ObjectRule(input, compiler, validateFun);
};
const getRangeParticleConfig = function() {
  return Object.assign(getObjectConfig(), {
    range: {
      top: 100,
      bottom: -100,
      left: -100,
      right: 100,
      front: 100,
      back: -100
    },
    amount: 200,
    size: 1,
    colorMap: "",
    alphaMap: "",
    sizeAttenuation: true,
    opacity: 1
  });
};
class RangeParticle extends Points {
  constructor(params) {
    super();
    __publicField(this, "range", {
      top: 100,
      bottom: -100,
      left: -100,
      right: 100,
      front: 100,
      back: -100
    });
    __publicField(this, "amount", 200);
    this.raycast = () => {
    };
    Object.assign(this.range, params.range);
    this.amount = params.amount;
    this.updateGeometry();
    this.material = new PointsMaterial({
      sizeAttenuation: params.sizeAttenuation,
      size: params.size || 1,
      map: params.colorMap || void 0,
      alphaMap: params.alphaMap || void 0,
      transparent: true,
      opacity: params.opacity || 1,
      alphaTest: 0.01
    });
  }
  updateGeometry() {
    const range = this.range;
    const geometry = this.geometry;
    const amount = this.amount;
    const getRandomNum = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const position = new Array(amount * 3);
    for (let index2 = 0; index2 < amount * 3; index2 += 3) {
      position[index2] = getRandomNum(range.left, range.right);
      position[index2 + 1] = getRandomNum(range.bottom, range.top);
      position[index2 + 2] = getRandomNum(range.back, range.front);
    }
    geometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );
    const uv = new Array(amount * 2);
    for (let index2 = 0; index2 < amount * 2; index2 += 2) {
      uv[index2] = getRandomNum(0, 1);
      uv[index2 + 1] = getRandomNum(0, 1);
    }
    geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uv), 2));
  }
}
var RangeParticleProcessor = defineProcessor({
  type: "RangeParticle",
  config: getRangeParticleConfig,
  commands: {
    set: {}
  },
  create(config, engine) {
    const particle = new RangeParticle({
      range: { ...config.range },
      amount: config.amount,
      size: config.size,
      sizeAttenuation: config.sizeAttenuation,
      opacity: config.opacity,
      colorMap: engine.getObjectfromModule(
        MODULETYPE.TEXTURE,
        config.colorMap
      ),
      alphaMap: engine.getObjectfromModule(
        MODULETYPE.TEXTURE,
        config.colorMap
      )
    });
    return objectCreate(
      particle,
      config,
      {
        range: true,
        amount: true,
        size: true,
        colorMap: true,
        alphaMap: true,
        sizeAttenuation: true,
        opacity: true
      },
      engine
    );
  },
  dispose() {
  }
});
var index = {
  type: "particle",
  object: true,
  compiler: ParticleCompiler,
  rule: ParticleRule,
  processors: [RangeParticleProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { index as default };
