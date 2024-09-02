import { defineModel } from "@vis-three/tdcm";
import { getLUTPassConfig, LUTPassConfig } from "../PassConfig";
import { PassModuleEngine, PassCompiler } from "../PassCompiler";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass.js";
import { Data3DTexture, DataTexture } from "three";

export default defineModel<
  LUTPassConfig,
  LUTPass,
  {},
  {
    getResource: (
      config: LUTPassConfig,
      engine: PassModuleEngine
    ) => DataTexture | Data3DTexture | undefined;
  },
  PassModuleEngine,
  PassCompiler
>({
  type: "LUTPass",
  config: getLUTPassConfig,
  shared: {
    getResource(config, engine) {
      if (config.lut) {
        const resource = engine.resourceManager.resourceMap.get(config.lut);

        if (!resource) {
          console.warn(
            `LUT pass processor can not found resource: ${config.lut}`
          );
        } else {
          return config.use2D ? resource.texture : resource.texture3D;
        }
      }
      return undefined;
    },
  },
  commands: {
    set: {
      lut({ model, target, config, engine }) {
        target.lut = model.getResource(config, engine);
      },
      use2D({ model, target, config, engine }) {
        target.lut = model.getResource(config, engine);
      },
    },
  },
  create({ model, config, engine }) {
    return new LUTPass({
      intensity: config.intensity,
      lut: model.getResource(config, engine),
    });
  },
  dispose({ target }) {
    target.lut = undefined;
  },
});
