import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  Points,
  ShaderMaterial,
  Texture,
} from "three";

export interface FloatParticleParameters {
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
  floatRange: number;
  refColor: Color;
  colorRange: number;
}

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
export class RangeParticleMaterial extends ShaderMaterial {
  constructor(params: {
    flicker?: boolean;
    time?: number;
    alphaMap?: Texture;
    size?: number;
    opacity?: number;
    floatRange?: number;
  }) {
    super();

    this.uniforms = {
      flicker: { value: params.flicker || false },
      time: { value: params.time || 0 },
      alphaMap: { value: params.alphaMap || null },
      size: { value: params.size || 1 },
      opacity: { value: params.opacity || 1 },
      floatRange: { value: params.floatRange || 5 },
    };
    this.vertexShader = vertex;
    this.fragmentShader = fragment;
    this.vertexColors = true;
    this.blending = AdditiveBlending;
    this.transparent = true;
  }
}

export class FloatParticle extends Points {
  range = {
    top: 100,
    bottom: -100,
    left: -100,
    right: 100,
    front: 100,
    back: -100,
  };

  amount = 200;

  refColor = new Color(1, 1, 1);
  colorRange = 1;

  constructor(params: FloatParticleParameters) {
    super();
    this.raycast = () => {};

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
      floatRange: params.floatRange,
    });
  }

  private getRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomColor(key: string) {
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

    for (let index = 0; index < amount; index += 1) {
      position.setXYZ(
        index,
        this.getRandomNum(range.left, range.right),
        this.getRandomNum(range.bottom, range.top),
        this.getRandomNum(range.back, range.front)
      );

      color.setXYZ(
        index,
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

    for (let index = 0; index < amount * 3; index += 3) {
      position[index] = this.getRandomNum(range.left, range.right);
      position[index + 1] = this.getRandomNum(range.bottom, range.top);
      position[index + 2] = this.getRandomNum(range.back, range.front);

      color[index] = this.getRandomColor("r");
      color[index + 1] = this.getRandomColor("g");
      color[index + 2] = this.getRandomColor("b");
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

  dispose() {
    this.geometry.dispose();
    (<ShaderMaterial>this.material).dispose();
    this.removeFromParent();
  }
}
