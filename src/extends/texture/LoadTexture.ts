import { Texture } from "three";

export class LoadTexture extends Texture {
  constructor(texture: Texture) {
    super();

    Object.keys(texture).forEach((key) => {
      this[key] = texture[key];
    });
  }
}
