import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
} from "@vis-three/middleware";
import { ParticleCompiler } from "../ParticleCompiler";
import { getFloatParticleConfig, FloatParticleConfig } from "../ParticleConfig";
import { Color, Object3D, Texture } from "three";
import { objectCreate } from "@vis-three/module-object";
import { FloatParticle } from "../extends/FloatParticle";

export default defineProcessor<
  FloatParticleConfig,
  FloatParticle,
  EngineSupport,
  ParticleCompiler
>({
  type: "FloatParticle",
  config: getFloatParticleConfig,
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
      flicker(params) {
        // @ts-ignore
        params.target.material.uniforms.flicker.value = params.value;
      },
      size(params) {
        // @ts-ignore
        params.target.material.uniforms.size.value = params.value;
      },
      opacity(params) {
        // @ts-ignore
        params.target.material.uniforms.opacity.value = params.value;
      },
      floatRange(params) {
        // @ts-ignore
        params.target.material.uniforms.floatRange.value = params.value;
      },
      colorRange(params) {
        params.target.colorRange = params.value;
        params.target.updateGeometry();
      },
      refColor(params) {
        params.target.refColor.setStyle(params.value);
        params.target.updateGeometry();
      },
      alphaMap(params) {
        //@ts-ignore
        params.target.material.uniforms.alphaMap.value =
          (params.engine.getObjectfromModule(
            MODULETYPE.TEXTURE,
            params.value
          ) as Texture) || null;
      },
    },
  },
  create(config, engine) {
    const particle = new FloatParticle({
      range: { ...config.range },
      amount: config.amount,
      size: config.size,
      opacity: config.opacity,
      alphaMap: engine.getObjectfromModule(
        MODULETYPE.TEXTURE,
        config.alphaMap
      ) as Texture,
      flicker: config.flicker,
      floatRange: config.floatRange,
      refColor: new Color(config.refColor),
      colorRange: config.colorRange,
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
        floatRange: true,
        refColor: true,
        colorRange: true,
      },
      engine
    );
  },
  dispose(target) {
    target.dispose();
  },
});
