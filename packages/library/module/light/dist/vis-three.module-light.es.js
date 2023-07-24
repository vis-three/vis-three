import { ObjectCompiler, ObjectRule, getObjectConfig, objectCommands, objectCreate, objectDispose } from "@vis-three/module-object";
import { Color, AmbientLight, DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight } from "three";
import { emptyHandler, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
class LightCompiler extends ObjectCompiler {
  constructor() {
    super();
  }
}
const LightRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
const getLightConfig = function() {
  return Object.assign(getObjectConfig(), {
    type: "Light",
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getAmbientLightConfig = function() {
  return Object.assign(getObjectConfig(), {
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getPointLightConfig = function() {
  return Object.assign(getLightConfig(), {
    distance: 30,
    decay: 0.01
  });
};
const getSpotLightConfig = function() {
  return Object.assign(getLightConfig(), {
    distance: 30,
    angle: Math.PI / 180 * 45,
    penumbra: 0.01,
    decay: 0.01
  });
};
const getDirectionalLightConfig = function() {
  return Object.assign(getLightConfig(), {
    shadow: {
      mapSize: {
        width: 512,
        height: 512
      },
      camera: {
        near: 0.5,
        far: 500
      }
    }
  });
};
const getHemisphereLightConfig = function() {
  return Object.assign(getLightConfig(), {
    color: "rgb(255, 255, 255)",
    groundColor: "rgb(0, 0, 0)"
  });
};
const getRectAreaLightConfig = function() {
  return Object.assign(getLightConfig(), {
    width: 10,
    height: 10
  });
};
const colorHandler = function({
  target,
  value
}) {
  target.color.copy(new Color(value));
};
const lightCreate = function(light, config, filter, engine) {
  light.color.copy(new Color(config.color));
  return objectCreate(
    light,
    config,
    {
      color: true,
      scale: true,
      rotation: true,
      lookAt: true,
      ...filter
    },
    engine
  );
};
const lightCommands = Object.assign({}, objectCommands, {
  set: {
    color: colorHandler,
    scale: emptyHandler,
    rotation: emptyHandler,
    lookAt: emptyHandler
  }
});
var AmbientLightProcessor = defineProcessor({
  type: "AmbientLight",
  config: getAmbientLightConfig,
  commands: lightCommands,
  create(config, engine) {
    return lightCreate(new AmbientLight(), config, {}, engine);
  },
  dispose: objectDispose
});
var DirectionalLightProcessor = defineProcessor({
  type: "DirectionalLight",
  config: getDirectionalLightConfig,
  commands: lightCommands,
  create(config, engine) {
    return lightCreate(new DirectionalLight(), config, {}, engine);
  },
  dispose: objectDispose
});
var HemisphereLightProcessor = defineProcessor({
  type: "HemisphereLight",
  config: getHemisphereLightConfig,
  commands: {
    set: {
      ...lightCommands.set,
      groundColor: function({ target, value }) {
        target.groundColor.copy(new Color(value));
      }
    }
  },
  create(config, engine) {
    const light = new HemisphereLight();
    light.groundColor.copy(new Color(config.groundColor));
    return lightCreate(
      light,
      config,
      {
        groundColor: true
      },
      engine
    );
  },
  dispose: objectDispose
});
var PointLightProcessor = defineProcessor({
  type: "PointLight",
  config: getPointLightConfig,
  commands: lightCommands,
  create(config, engine) {
    return lightCreate(new PointLight(), config, {}, engine);
  },
  dispose: objectDispose
});
var RectAreaLightProcessor = defineProcessor({
  type: "RectAreaLight",
  config: getRectAreaLightConfig,
  commands: {
    set: {
      ...lightCommands.set,
      rotation: void 0
    }
  },
  create(config, engine) {
    const light = lightCreate(new RectAreaLight(), config, {}, engine);
    light.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z);
    light.updateMatrixWorld();
    return light;
  },
  dispose: objectDispose
});
var SpotLightProcessor = defineProcessor({
  type: "SpotLight",
  config: getSpotLightConfig,
  commands: lightCommands,
  create(config, engine) {
    return lightCreate(new SpotLight(), config, {}, engine);
  },
  dispose: objectDispose
});
var index = {
  type: "light",
  object: true,
  compiler: LightCompiler,
  rule: LightRule,
  processors: [
    AmbientLightProcessor,
    PointLightProcessor,
    DirectionalLightProcessor,
    HemisphereLightProcessor,
    RectAreaLightProcessor,
    SpotLightProcessor
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { LightCompiler, index as default, getAmbientLightConfig, getDirectionalLightConfig, getHemisphereLightConfig, getPointLightConfig, getRectAreaLightConfig, getSpotLightConfig };
