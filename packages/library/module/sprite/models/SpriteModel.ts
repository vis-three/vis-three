import {
  defineSolidObjectModel,
  SolidObjectModel,
} from "@vis-three/module-solid-object";
import { getSpriteConfig, SpriteConfig } from "../SpriteConfig";
import { Sprite, SpriteMaterial } from "three";
import { MODULE_TYPE } from "@vis-three/tdcm";

export default defineSolidObjectModel<
  SpriteConfig,
  Sprite,
  {},
  {
    spriteReplaceMaterial: SpriteMaterial;
  }
>((solidObjectModel) => ({
  type: "Sprite",
  config: getSpriteConfig,
  shared: {
    spriteReplaceMaterial: new SpriteMaterial({
      color: "rgb(123, 123, 123)",
    }),
  },
  commands: {
    set: {
      lookAt() {},
      material({ model, target, engine, value }) {
        const material = engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.MATERIAL,
          value
        );

        if (material && material instanceof SpriteMaterial) {
          target.material = material;
        } else {
          target.material = model.spriteReplaceMaterial;
        }
      },
    },
  },
  create({ model, config, engine }) {
    const sprite = new Sprite();

    const material = engine.compilerManager.getObjectFromModule(
      MODULE_TYPE.MATERIAL,
      config.material
    );

    if (material && material instanceof SpriteMaterial) {
      sprite.material = material;
    } else {
      sprite.material = model.spriteReplaceMaterial;
    }

    solidObjectModel.create!({
      model: model as unknown as SolidObjectModel,
      target: sprite,
      config,
      engine,
      filter: {
        geometry: true,
        material: true,
        lookAt: true,
      },
    });

    return sprite;
  },
  dispose({ target }) {
    solidObjectModel.dispose!({ target });
  },
}));
