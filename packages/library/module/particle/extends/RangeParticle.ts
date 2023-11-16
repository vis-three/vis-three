import { BufferAttribute, Points, PointsMaterial, Texture } from "three";

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
  colorMap: Texture;
  alphaMap: Texture;
  sizeAttenuation: boolean;
  opacity: number;
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

    this.updateGeometry();

    this.material = new PointsMaterial({
      sizeAttenuation: params.sizeAttenuation,
      size: params.size || 1,
      map: params.colorMap || undefined,
      alphaMap: params.alphaMap || undefined,
      transparent: true,
      opacity: params.opacity || 1,
      alphaTest: 0.01,
    });
  }

  updateGeometry() {
    const range = this.range;
    const geometry = this.geometry;
    const amount = this.amount;

    const getRandomNum = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const position = new Array(amount * 3);

    for (let index = 0; index < amount * 3; index += 3) {
      position[index] = getRandomNum(range.left, range.right);
      position[index + 1] = getRandomNum(range.bottom, range.top);
      position[index + 2] = getRandomNum(range.back, range.front);
    }

    geometry.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(position), 3)
    );

    const uv = new Array(amount * 2);

    for (let index = 0; index < amount * 2; index += 2) {
      uv[index] = getRandomNum(0, 1);
      uv[index + 1] = getRandomNum(0, 1);
    }

    geometry.setAttribute("uv", new BufferAttribute(new Float32Array(uv), 2));
  }
}
