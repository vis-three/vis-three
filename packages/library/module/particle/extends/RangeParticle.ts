import {
  AdditiveBlending,
  BufferAttribute,
  Points,
  PointsMaterial,
  PointsMaterialParameters,
  ShaderMaterial,
  Texture,
  UniformsLib,
  UniformsUtils,
} from "three";

export interface RangeParticleParameters {
  range: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    front: number;
    back: number;
  };
  amount: number;
  size: number;
  alphaMap: Texture;
  opacity: number;
  flicker: boolean;
}

const vertex = `
varying vec3 vColor;
uniform bool flicker;
uniform float time;
uniform float size;

void main() {

  vColor = color;
  float positionX = position.x + sin(time  + color.r + position.y + color.b ) * 5.0;
  float positionY = position.y + sin(time  + color.r + color.g + color.g ) * 5.0;
  float positionZ = position.z + sin(time  + color.b + color.g + position.x ) * 5.0;

  vec4 mvPosition = modelViewMatrix * vec4( positionX, positionY, positionZ, 1.0 );

  float pointSize = size * ( 300.0 / -mvPosition.z );

  if (flicker) {
    pointSize = sin(time + position.x + color.g + color.b) * pointSize;
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
export class RangeParticleMaterial extends ShaderMaterial {
  constructor(params: {
    flicker?: boolean;
    time?: number;
    alphaMap?: Texture;
    size?: number;
    opacity?: number;
  }) {
    super();

    this.uniforms = {
      flicker: { value: params.flicker || false },
      time: { value: params.time || 0 },
      alphaMap: { value: params.alphaMap || null },
      size: { value: params.size || 1 },
      opacity: { value: params.opacity || 1 },
    };
    this.vertexShader = vertex;
    this.fragmentShader = fragment;
    this.vertexColors = true;
    this.blending = AdditiveBlending;
    this.transparent = true;
  }
}

export class RangeParticle extends Points {
  range = {
    top: 100,
    bottom: -100,
    left: -100,
    right: 100,
    front: 100,
    back: -100,
  };

  amount = 200;

  constructor(params: RangeParticleParameters) {
    super();
    this.raycast = () => {};

    Object.assign(this.range, params.range);
    this.amount = params.amount;
    this.resetGeometry();

    this.material = new RangeParticleMaterial({
      size: params.size || 1,
      alphaMap: params.alphaMap || null,
      opacity: params.opacity || 1,
      flicker: params.flicker,
    });
  }

  updateGeometry() {
    const range = this.range;
    const geometry = this.geometry;
    const amount = this.amount;

    const getRandomNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const position = geometry.getAttribute("position");
    const color = geometry.getAttribute("color");

    for (let index = 0; index < amount; index += 1) {
      position.setXYZ(
        index,
        getRandomNum(range.left, range.right),
        getRandomNum(range.bottom, range.top),
        getRandomNum(range.back, range.front)
      );

      position.setXYZ(
        index,
        getRandomNum(0, 1),
        getRandomNum(0, 1),
        getRandomNum(0, 1)
      );
    }
    position.needsUpdate = true;
    color.needsUpdate = true;
  }

  resetGeometry() {
    const range = this.range;
    const geometry = this.geometry;
    const amount = this.amount;

    const getRandomNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const position = new Array(amount * 3);
    const color = new Array(amount * 3);

    for (let index = 0; index < amount * 3; index += 3) {
      position[index] = getRandomNum(range.left, range.right);
      position[index + 1] = getRandomNum(range.bottom, range.top);
      position[index + 2] = getRandomNum(range.back, range.front);

      color[index] = getRandomNum(0, 1);
      color[index + 1] = getRandomNum(0, 1);
      color[index + 2] = getRandomNum(0, 1);
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
