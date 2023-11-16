import { defineProcessor, MODULETYPE, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, ObjectRule, getObjectConfig, objectCreate, objectDispose } from "@vis-three/module-object";
import { validate } from "uuid";
import { Water } from "three/examples/jsm/objects/Water";
import { Color, Vector3 } from "three";
class WaterCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const WaterRule = function(input, compiler, validateFun = validate) {
  ObjectRule(input, compiler, validateFun);
};
const getDeepWaterConfig = function() {
  return Object.assign(getObjectConfig(), {
    geometry: "",
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: "",
    waterColor: "rgb(127, 127, 127)",
    sunColor: "rgb(255, 255, 255)",
    sunDirection: { x: 0.70707, y: 0.70707, z: 0 },
    size: 1,
    alpha: 1,
    time: 0,
    distortionScale: 20,
    eye: {
      x: 0,
      y: 0,
      z: 0
    },
    fog: false
  });
};
new Color();
var DeepWaterProcessor = defineProcessor({
  type: "DeepWater",
  config: getDeepWaterConfig,
  commands: {
    set: {
      time(params) {
        params.target.material.uniforms.time.value = params.value;
      },
      size(params) {
        params.target.material.uniforms.size.value = params.value;
      },
      alpha(params) {
        params.target.material.uniforms.alpha.value = params.value;
      },
      distortionScale(params) {
        params.target.material.uniforms.distortionScale.value = params.value;
      },
      waterColor(params) {
        params.target.material.uniforms.waterColor.value.setStyle(
          params.value
        );
      },
      sunColor(params) {
        params.target.material.uniforms.waterColor.value.setStyle(
          params.value
        );
      },
      sunDirection(params) {
        params.target.material.uniforms.sunDirection.value[params.key] = params.value;
      },
      eye(params) {
        params.target.material.uniforms.eye.value[params.key] = params.value;
      }
    }
  },
  create(config, engine) {
    const water = new Water(
      engine.getObjectfromModule(
        MODULETYPE.GEOMETRY,
        config.geometry
      ),
      {
        textureWidth: config.textureWidth || 512,
        textureHeight: config.textureHeight || 512,
        waterNormals: engine.getObjectfromModule(
          MODULETYPE.TEXTURE,
          config.waterNormals
        ),
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
        fog: config.fog
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
        fog: true
      },
      engine
    );
  },
  dispose(target) {
    target.onBeforeRender = () => {
    };
    target.material.dispose();
    target.geometry = null;
    objectDispose(target);
  }
});
var index = {
  type: "water",
  object: true,
  compiler: WaterCompiler,
  rule: WaterRule,
  processors: [DeepWaterProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { index as default };
