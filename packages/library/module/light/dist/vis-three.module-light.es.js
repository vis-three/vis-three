import { ObjectCompiler, ObjectRule, getObjectConfig, objectCommands, objectCreate, objectDispose } from "@vis-three/module-object";
import { Vector2, Color, AmbientLight, DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight } from "three";
import { emptyHandler, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ENGINE_EVENT } from "@vis-three/core";
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
const getShadowLightConfig = function(camera) {
  return Object.assign(getLightConfig(), {
    shadow: {
      bias: 0,
      normalBias: 0,
      radius: 1,
      mapSize: {
        x: 512,
        y: 512
      },
      camera
    }
  });
};
const getAmbientLightConfig = function() {
  return Object.assign(getObjectConfig(), {
    color: "rgb(255, 255, 255)",
    intensity: 1
  });
};
const getPointLightConfig = function() {
  return Object.assign(
    getShadowLightConfig({
      fov: 90,
      aspect: 1,
      near: 0.5,
      far: 500
    }),
    {
      distance: 30,
      decay: 0.01
    }
  );
};
const getSpotLightConfig = function() {
  return Object.assign(
    getShadowLightConfig({
      fov: 50,
      aspect: 1,
      near: 0.5,
      far: 500
    }),
    {
      distance: 30,
      angle: Math.PI / 180 * 45,
      penumbra: 0.01,
      decay: 0.01
    }
  );
};
const getDirectionalLightConfig = function() {
  return Object.assign(
    getShadowLightConfig({
      near: 0.5,
      far: 500,
      top: window.innerHeight,
      bottom: -window.innerHeight,
      left: -window.innerWidth,
      right: window.innerWidth
    }),
    {}
  );
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
const cacheMapSize = new Vector2();
const cacheViewportSize = new Vector2();
const updateShadowSize = function(light, config, maxTextureSize) {
  const shadow = light.shadow;
  light.shadow.mapSize.set(config.shadow.mapSize.x, config.shadow.mapSize.y);
  cacheMapSize.copy(shadow.mapSize);
  const shadowFrameExtents = shadow.getFrameExtents();
  cacheMapSize.multiply(shadowFrameExtents);
  cacheViewportSize.copy(shadow.mapSize);
  if (cacheMapSize.x > maxTextureSize || cacheMapSize.y > maxTextureSize) {
    if (cacheMapSize.x > maxTextureSize) {
      cacheViewportSize.x = Math.floor(maxTextureSize / shadowFrameExtents.x);
      cacheMapSize.x = cacheViewportSize.x * shadowFrameExtents.x;
      shadow.mapSize.x = cacheViewportSize.x;
    }
    if (cacheMapSize.y > maxTextureSize) {
      cacheViewportSize.y = Math.floor(maxTextureSize / shadowFrameExtents.y);
      cacheMapSize.y = cacheViewportSize.y * shadowFrameExtents.y;
      shadow.mapSize.y = cacheViewportSize.y;
    }
  }
  light.shadow.map.setSize(cacheMapSize.x, cacheMapSize.y);
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
const shadowLightCreate = function(light, config, filter, engine) {
  const shadowRenderFun = () => {
    if (light.shadow.map) {
      updateShadowSize(
        light,
        config,
        engine.webGLRenderer.capabilities.maxTextureSize
      );
      engine.renderManager.removeEventListener(
        ENGINE_EVENT.RENDER,
        shadowRenderFun
      );
    }
  };
  engine.renderManager.addEventListener(
    ENGINE_EVENT.RENDER,
    shadowRenderFun
  );
  for (const key in config.shadow.camera) {
    light.shadow.camera[key] = config.shadow.camera[key];
  }
  light.shadow.camera.updateProjectionMatrix();
  return lightCreate(
    light,
    config,
    {
      shadow: {
        mapSize: true,
        camera: true
      },
      ...filter
    },
    engine
  );
};
const lightCommands = Object.assign(
  {},
  objectCommands,
  {
    set: {
      color: colorHandler,
      scale: emptyHandler,
      rotation: emptyHandler,
      lookAt: emptyHandler
    }
  }
);
const ShadowCommands = {
  set: {
    shadow: {
      mapSize({
        target,
        config,
        engine,
        key,
        value
      }) {
        target.shadow.mapSize[key] = value;
        updateShadowSize(
          target,
          config,
          engine.webGLRenderer.capabilities.maxTextureSize
        );
      },
      camera({
        target,
        key,
        value
      }) {
        target.shadow.camera[key] = value;
        target.shadow.camera.updateProjectionMatrix();
      }
    }
  }
};
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
  commands: {
    set: {
      ...lightCommands.set,
      ...ShadowCommands.set
    }
  },
  create(config, engine) {
    return shadowLightCreate(new DirectionalLight(), config, {}, engine);
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
  commands: {
    set: {
      ...lightCommands.set,
      ...ShadowCommands.set
    }
  },
  create(config, engine) {
    return shadowLightCreate(new PointLight(), config, {}, engine);
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
  commands: {
    set: {
      ...lightCommands.set,
      ...ShadowCommands.set
    }
  },
  create(config, engine) {
    return shadowLightCreate(new SpotLight(), config, {}, engine);
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
