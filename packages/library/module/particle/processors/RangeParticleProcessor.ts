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
    set: {
      range(params) {
        Object.assign(params.target.range, params.config.range);
        params.target.updateGeometry();
      },
      amount(params) {
        params.target.amount = params.value;
        params.target.resetGeometry();
      },
      time(params) {
        // @ts-ignore
        params.target.material.uniforms.time.value = params.value;
      },
    },
  },
  create(config, engine) {
    const particle = new RangeParticle({
      range: { ...config.range },
      amount: config.amount,
      size: config.size,
      opacity: config.opacity,
      alphaMap: engine.getObjectfromModule(
        MODULETYPE.TEXTURE,
        config.alphaMap
      ) as Texture,
      flicker: config.flicker,
    });

    return objectCreate(
      particle,
      config,
      {
        range: true,
        amount: true,
        size: true,
        alphaMap: true,
        opacity: true,
        flicker: true,
      },
      engine
    );
  },
  dispose() {},
});
