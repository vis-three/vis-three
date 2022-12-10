import { EngineSupport, defineProcessor } from "@vis-three/core";
import { Material, Sprite, SpriteMaterial } from "three";
import { CONFIGTYPE } from "../constants/configType";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { SpriteConfig } from "./SpriteConfig";

const spriteReplaceMaterial = new SpriteMaterial({
  color: "rgb(123, 123, 123)",
});

export default defineProcessor<SpriteConfig, Sprite>({
  configType: CONFIGTYPE.SPRITE,
  commands: {
    add: (
      solidObjectCommands as unknown as SolidObjectCommands<
        SpriteConfig,
        Sprite
      >
    ).add,
    set: {
      lookAt() {},
      ...(
        solidObjectCommands as unknown as SolidObjectCommands<
          SpriteConfig,
          Sprite
        >
      ).set,
      material({ target, engine, value }) {
        const material = engine.compilerManager.getMaterial(value);

        if (material && material instanceof SpriteMaterial) {
          target.material = material;
        } else {
          target.material = spriteReplaceMaterial;
        }
      },
    },
    delete: (
      solidObjectCommands as unknown as SolidObjectCommands<
        SpriteConfig,
        Sprite
      >
    ).add,
  },
  create(config: SpriteConfig, engine: EngineSupport): Sprite {
    const sprite = new Sprite();

    const material = engine.compilerManager.getMaterial(config.material);

    if (material && material instanceof SpriteMaterial) {
      sprite.material = material;
    } else {
      sprite.material = spriteReplaceMaterial;
    }

    return solidObjectCreate(
      sprite,
      config,
      {
        geometry: true,
        material: true,
        lookAt: true,
      },
      engine
    );
  },
  dispose: solidObjectDispose,
});
