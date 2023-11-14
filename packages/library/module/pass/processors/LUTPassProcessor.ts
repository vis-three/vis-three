import { defineProcessor } from "@vis-three/middleware";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass";
import { ComposerSupportEngine, PassCompiler } from "../PassCompiler";
import { LUTPassConfig, getLUTPassConfig } from "../PassConfig";

const getResource = function (
  config: LUTPassConfig,
  engine: ComposerSupportEngine
) {
  if (config.lut) {
    const resource = engine.resourceManager.resourceMap.get(config.lut);

    if (!resource) {
      console.warn(`LUT pass processor can not found resource: ${config.lut}`);
    } else {
      return config.use2D ? resource.texture : resource.texture3D;
    }
  }
  return null;
};

export default defineProcessor<
  LUTPassConfig,
  LUTPass,
  ComposerSupportEngine,
  PassCompiler
>({
  type: "LUTPass",
  config: getLUTPassConfig,
  commands: {
    set: {
      lut({ target, config, engine }) {
        target.lut = getResource(config, engine);
      },
      use2D({ target, config, engine }) {
        target.lut = getResource(config, engine);
      },
    },
  },

  create(config, engine) {
    return new LUTPass({
      intensity: config.intensity,
      lut: getResource(config, engine),
    });
  },
  dispose(pass) {
    pass.lut = undefined;
  },
});
