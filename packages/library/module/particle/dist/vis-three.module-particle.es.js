var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { defineProcessor, MODULETYPE, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, ObjectRule, getObjectConfig, objectCreate } from "@vis-three/module-object";
import { validate } from "uuid";
import { Points, Color, BufferAttribute, ShaderMaterial, AdditiveBlending } from "three";
class ParticleCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const ParticleRule = function(input, compiler, validateFun = validate) {
  ObjectRule(input, compiler, validateFun);
};
const getFloatParticleConfig = function() {
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
    alphaMap: "",
    opacity: 1,
    flicker: true,
    time: 0,
    floatRange: 5,
    refColor: "rgb(255, 255, 255)",
    colorRange: 0.5
  });
};
const vertex = `
varying vec3 vColor;
uniform bool flicker;
uniform float time;
uniform float size;
uniform float floatRange;

void main() {

  vColor = color;
  float positionX = position.x + sin(time  + color.r + position.y + color.b ) * floatRange;
  float positionY = position.y + sin(time  + color.r + color.g + color.g ) * floatRange;
  float positionZ = position.z + sin(time  + color.b + color.g + position.x ) * floatRange;

  vec4 mvPosition = modelViewMatrix * vec4( positionX, positionY, positionZ, 1.0 );

  float pointSize = size * ( 300.0 / -mvPosition.z );

  if (flicker) {
    pointSize = sin(time + position.x + color.g + color.b + position.z - position.y) * pointSize;
  }

  gl_PointSize = pointSize;

  gl_Position = projectionMatrix * mvPosition;

}
`;
const fragment = `
uniform sampler2D alphaMap;
uniform float opacity;
varying vec3 vColor;

void main() {

  gl_FragColor = vec4( vColor, opacity );

  gl_FragColor = gl_FragColor * texture2D( alphaMap, gl_PointCoord );

  if (gl_FragColor.a < 0.01) {
    discard;
  }

}
`;
class RangeParticleMaterial extends ShaderMaterial {
  constructor(params) {
    super();
    this.uniforms = {
      flicker: { value: params.flicker || false },
      time: { value: params.time || 0 },
      alphaMap: { value: params.alphaMap || null },
      size: { value: params.size || 1 },
      opacity: { value: params.opacity || 1 },
      floatRange: { value: params.floatRange || 5 }
    };
    this.vertexShader = vertex;
    this.fragmentShader = fragment;
    this.vertexColors = true;
    this.blending = AdditiveBlending;
    this.transparent = true;
  }
}
class FloatParticle extends Points {
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
    __publicField(this, "refColor", new Color(1, 1, 1));
    __publicField(this, "colorRange", 1);
    this.raycast = () => {
    };
    Object.assign(this.range, params.range);
    this.refColor.setHex(params.refColor.getHex());
    this.colorRange = params.colorRange;
    this.amount = params.amount;
    this.resetGeometry();
    this.material = new RangeParticleMaterial({
      size: params.size || 1,
      alphaMap: params.alphaMap || null,
      opacity: params.opacity || 1,
      flicker: params.flicker,
      floatRange: params.floatRange
    });
  }
  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getRandomColor(key) {
    const color = this.refColor;
    const colorRange = this.colorRange;
    return this.getRandomNum(
      color[key] - color[key] * colorRange,
      (1 - color[key]) * colorRange + color[key]
    );
  }
  updateGeometry() {
    const range = this.range;
    const geometry = this.geometry;
    const amount = this.amount;
    const position = geometry.getAttribute("position");
    const color = geometry.getAttribute("color");
    for (let index2 = 0; index2 < amount; index2 += 1) {
      position.setXYZ(
        index2,
        this.getRandomNum(range.left, range.right),
        this.getRandomNum(range.bottom, range.top),
        this.getRandomNum(range.back, range.front)
      );
      color.setXYZ(
        index2,
        this.getRandomColor("r"),
        this.getRandomColor("g"),
        this.getRandomColor("b")
      );
    }
    position.needsUpdate = true;
    color.needsUpdate = true;
  }
  resetGeometry() {
    const range = this.range;
    const geometry = this.geometry;
    const amount = this.amount;
    const position = new Array(amount * 3);
    const color = new Array(amount * 3);
    for (let index2 = 0; index2 < amount * 3; index2 += 3) {
      position[index2] = this.getRandomNum(range.left, range.right);
      position[index2 + 1] = this.getRandomNum(range.bottom, range.top);
      position[index2 + 2] = this.getRandomNum(range.back, range.front);
      color[index2] = this.getRandomColor("r");
      color[index2 + 1] = this.getRandomColor("g");
      color[index2 + 2] = this.getRandomColor("b");
    }
    geometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );
    geometry.setAttribute(
      "color",
      new BufferAttribute(new Float32Array(color), 3)
    );
  }
}
var FloatParticleProcessor = defineProcessor({
  type: "FloatParticle",
  config: getFloatParticleConfig,
  commands: {
    set: {
      range(params) {
        Object.assign(params.target.range, params.config.range);
        params.target.updateGeometry();
      },
      amount(params) {
        params.target.amount = params.value;
        params.target.resetGeometry();
      },
      time(params) {
        params.target.material.uniforms.time.value = params.value;
      },
      flicker(params) {
        params.target.material.uniforms.flicker.value = params.value;
      },
      size(params) {
        params.target.material.uniforms.size.value = params.value;
      },
      opacity(params) {
        params.target.material.uniforms.opacity.value = params.value;
      },
      floatRange(params) {
        params.target.material.uniforms.floatRange.value = params.value;
      },
      colorRange(params) {
        params.target.colorRange = params.value;
        params.target.updateGeometry();
      },
      refColor(params) {
        params.target.refColor.setStyle(params.value);
        params.target.updateGeometry();
      },
      alphaMap(params) {
        params.target.material.uniforms.alphaMap.value = params.engine.getObjectfromModule(
          MODULETYPE.TEXTURE,
          params.value
        ) || null;
      }
    }
  },
  create(config, engine) {
    const particle = new FloatParticle({
      range: { ...config.range },
      amount: config.amount,
      size: config.size,
      opacity: config.opacity,
      alphaMap: engine.getObjectfromModule(
        MODULETYPE.TEXTURE,
        config.alphaMap
      ),
      flicker: config.flicker,
      floatRange: config.floatRange,
      refColor: new Color(config.refColor),
      colorRange: config.colorRange
    });
    return objectCreate(
      particle,
      config,
      {
        range: true,
        amount: true,
        size: true,
        alphaMap: true,
        opacity: true,
        flicker: true,
        floatRange: true,
        refColor: true,
        colorRange: true
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
  processors: [FloatParticleProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { index as default };
