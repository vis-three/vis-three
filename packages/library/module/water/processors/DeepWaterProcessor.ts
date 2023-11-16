import {
  defineProcessor,
  EngineSupport,
  MODULETYPE,
} from "@vis-three/middleware";
import { WaterCompiler } from "../WaterCompiler";
import { DeepWaterConfig, getDeepWaterConfig } from "../WaterConfig";
import { Water as DeepWater } from "three/examples/jsm/objects/Water";
import { BufferGeometry, Color, Texture, Vector3 } from "three";
import { objectCreate, objectDispose } from "@vis-three/module-object";

const cacheColor = new Color();

export default defineProcessor<
  DeepWaterConfig,
  DeepWater,
  EngineSupport,
  WaterCompiler
>({
  type: "DeepWater",
  config: getDeepWaterConfig,
  commands: {
    set: {
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
  create(config, engine) {
    const water = new DeepWater(
      engine.getObjectfromModule(
        MODULETYPE.GEOMETRY,
        config.geometry
      ) as BufferGeometry,
      {
        textureWidth: config.textureWidth || 512,
        textureHeight: config.textureHeight || 512,
        waterNormals: engine.getObjectfromModule(
          MODULETYPE.TEXTURE,
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
    return objectCreate(
      water,
      config,
      {
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
      engine
    );
  },
  dispose(target) {
    target.onBeforeRender = () => {};
    target.material.dispose();
    target.geometry = null as unknown as BufferGeometry;

    objectDispose(target);
  },
});
