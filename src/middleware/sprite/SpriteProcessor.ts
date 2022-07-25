import { Sprite } from "three";
import { defineProcessor } from "../../core/Processor";
import { EngineSupport } from "../../engine/EngineSupport";
import { CONFIGTYPE } from "../constants/configType";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { SpriteConfig } from "./SpriteConfig";

export default defineProcessor<SpriteConfig, Sprite>({
  configType: CONFIGTYPE.LINE,
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
    },
    delete: (
      solidObjectCommands as unknown as SolidObjectCommands<
        SpriteConfig,
        Sprite
      >
    ).add,
  },
  create(config: SpriteConfig, engine: EngineSupport): Sprite {
    return solidObjectCreate(
      new Sprite(),
      config,
      {
        geometry: true,
        lookAt: true,
      },
      engine
    );
  },
  dispose: solidObjectDispose,
});
