import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
} from "@vis-three/middleware";
import { ParticleCompiler } from "../ParticleCompiler";
import { getRangeParticleConfig, RangeParticleConfig } from "../ParticleConfig";
import { RangeParticle } from "../extends/RangeParticle";
import { Object3D, Texture } from "three";
import { objectCreate } from "@vis-three/module-object";

export default defineProcessor<
  RangeParticleConfig,
  RangeParticle,
  EngineSupport,
  ParticleCompiler
>({
  type: "RangeParticle",
  config: getRangeParticleConfig,
  commands: {
    set: {},
  },
  create(config, engine) {
    const particle = new RangeParticle({
      range: { ...config.range },
      amount: config.amount,
      size: config.size,
      sizeAttenuation: config.sizeAttenuation,
      opacity: config.opacity,
      colorMap: engine.getObjectfromModule(
        MODULETYPE.TEXTURE,
        config.colorMap
      ) as Texture,
      alphaMap: engine.getObjectfromModule(
        MODULETYPE.TEXTURE,
        config.colorMap
      ) as Texture,
    });

    return objectCreate(
      particle,
      config,
      {
        range: true,
        amount: true,
        size: true,
        colorMap: true,
        alphaMap: true,
        sizeAttenuation: true,
        opacity: true,
      },
      engine
    );
  },
  dispose() {},
});
