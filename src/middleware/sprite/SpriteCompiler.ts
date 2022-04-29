import {
  BufferGeometry,
  PlaneBufferGeometry,
  Sprite,
  SpriteMaterial,
} from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";

export interface SpriteCompilerTarget
  extends SolidObjectCompilerTarget<SpriteConfig> {
  [key: string]: SpriteConfig;
}

export class SpriteCompiler extends SolidObjectCompiler<
  SpriteConfig,
  SpriteCompilerTarget,
  Sprite
> {
  COMPILER_NAME: string = MODULETYPE.SPRITE;

  private replaceMaterial = new SpriteMaterial({ color: "rgb(150, 150, 150)" });
  private replaceGeometry = new PlaneBufferGeometry(1, 1);

  constructor() {
    super();
    this.mergeFilterAttribute({
      geometry: true,
    });
  }

  getReplaceMaterial(): SpriteMaterial {
    return this.replaceMaterial;
  }

  getReplaceGeometry(): BufferGeometry {
    console.warn(`SpriteCompiler: can not use geometry in SpriteCompiler.`);
    return this.replaceGeometry;
  }

  /**
   * @override
   */
  protected setLookAt(vid: string, target: string): this {
    return this;
  }

  /**
   * @override
   */
  protected getMaterial(vid: string): SpriteMaterial {
    const tempMaterial = super.getMaterial(vid);

    if (tempMaterial instanceof SpriteMaterial) {
      return tempMaterial;
    } else {
      console.warn(
        `SpriteCompiler: sprite object can not support this type material: ${tempMaterial.type}, vid: ${vid}.`
      );
      return this.getReplaceMaterial();
    }
  }

  add(vid: string, config: SpriteConfig): this {
    const sprite = new Sprite();

    this.map.set(vid, sprite);
    this.weakMap.set(sprite, vid);

    super.add(vid, config);
    return this;
  }

  dispose(): this {
    this.map.forEach((sprite, vid) => {
      sprite.geometry.dispose();
    });
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
