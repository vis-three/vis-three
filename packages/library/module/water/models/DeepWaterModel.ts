import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { DeepWaterConfig, getDeepWaterConfig } from "../WaterConfig";
import { Water as DeepWater } from "three/examples/jsm/objects/Water.js";
import { BufferGeometry, Color, Texture, Vector3 } from "three";
import { MODULE_TYPE } from "@vis-three/tdcm";

export default defineObjectModel<DeepWaterConfig, DeepWater>((objectModel) => ({
  type: "DeepWater",
  config: getDeepWaterConfig,
  commands: {
    set: {
      geometry({ value, target, engine }) {
        const geometry = engine.getObjectFromModule(
          MODULE_TYPE.GEOMETRY,
          value
        ) as BufferGeometry;

        if (!geometry) {
          console.warn(
            `DeepWater processor: can not found geometry with:${value}`
          );
          return;
        }

        target.geometry = geometry;
      },

      waterNormals({ value, target, engine }) {
        const texture = engine.getObjectFromModule(
          MODULE_TYPE.TEXTURE,
          value
        ) as Texture;

        if (!texture) {
          console.warn(
            `DeepWater processor: can not found texture with:${value}`
          );
          return;
        }

        target.material.uniforms.normalSampler.value = texture;
      },

      time(params) {
        // @ts-ignore
        params.target.material.uniforms.time.value = params.value;
      },
      size(params) {
        // @ts-ignore
        params.target.material.uniforms.size.value = params.value;
      },
      alpha(params) {
        // @ts-ignore
        params.target.material.uniforms.alpha.value = params.value;
      },
      distortionScale(params) {
        // @ts-ignore
        params.target.material.uniforms.distortionScale.value = params.value;
      },
      waterColor(params) {
        (<Color>params.target.material.uniforms.waterColor.value).setStyle(
          params.value
        );
      },
      sunColor(params) {
        (<Color>params.target.material.uniforms.waterColor.value).setStyle(
          params.value
        );
      },
      sunDirection(params) {
        (<Vector3>params.target.material.uniforms.sunDirection.value)[
          params.key
        ] = params.value;
      },
      eye(params) {
        (<Vector3>params.target.material.uniforms.eye.value)[params.key] =
          params.value;
      },
    },
  },
  create({ model, config, engine }) {
    const water = new DeepWater(
      engine.getObjectFromModule(
        MODULE_TYPE.GEOMETRY,
        config.geometry
      ) as BufferGeometry,
      {
        textureWidth: config.textureWidth || 512,
        textureHeight: config.textureHeight || 512,
        waterNormals: engine.getObjectFromModule(
          MODULE_TYPE.TEXTURE,
          config.waterNormals
        ) as Texture,
        waterColor: config.waterColor,
        sunColor: config.sunColor,
        sunDirection: new Vector3(
          config.sunDirection.x,
          config.sunDirection.y,
          config.sunDirection.z
        ),
        alpha: config.alpha,
        time: config.time,
        distortionScale: config.distortionScale,
        eye: new Vector3(config.eye.x, config.eye.y, config.eye.z),
        fog: config.fog,
      }
    );

    objectModel.create!<DeepWaterConfig>({
      model: model as unknown as ObjectModel,
      target: water,
      config,
      filter: {
        geometry: true,
        textureWidth: true,
        textureHeight: true,
        waterNormals: true,
        waterColor: true,
        sunColor: true,
        sunDirection: true,
        alpha: true,
        time: true,
        distortionScale: true,
        eye: true,
        fog: true,
      },
      engine,
    });

    return water;
  },
  dispose({ target }) {
    target.onBeforeRender = () => {};
    target.material.dispose();
    target.geometry = null as unknown as BufferGeometry;

    objectModel.dispose!({ target });
  },
}));
