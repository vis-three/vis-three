import { MODULE_TYPE } from "@vis-three/tdcm";
import { FloatParticleConfig, getFloatParticleConfig } from "../ParticleConfig";
import { FloatParticle } from "../extends/FloatParticle";
import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { Color, Texture } from "three";

export default defineObjectModel<FloatParticleConfig, FloatParticle>(
  (objectModel) => ({
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
          const texture =
            (params.engine.getObjectFromModule(
              MODULE_TYPE.TEXTURE,
              params.value
            ) as Texture) || null;
          //@ts-ignore
          params.target.material.uniforms.alphaMap.value = texture;
          //@ts-ignore
          params.target.material.uniforms.useAlphaMap.value = texture
            ? true
            : false;
        },
      },
    },
    create({ model, config, engine }) {
      const particle = new FloatParticle({
        range: { ...config.range },
        amount: config.amount,
        size: config.size,
        opacity: config.opacity,
        alphaMap: engine.getObjectFromModule(
          MODULE_TYPE.TEXTURE,
          config.alphaMap
        ) as Texture,
        flicker: config.flicker,
        floatRange: config.floatRange,
        refColor: new Color(config.refColor),
        colorRange: config.colorRange,
      });

      objectModel.create!<FloatParticleConfig>({
        model: model as unknown as ObjectModel,
        target: particle,
        config,
        filter: {
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
        engine,
      });

      return particle;
    },
    dispose({ target }) {
      target.dispose();
    },
  })
);
