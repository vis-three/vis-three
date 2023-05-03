var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { MODULETYPE, defineProcessor, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ObjectCompiler, ObjectRule, getObjectConfig, objectCommands, objectCreate, objectDispose } from "@vis-three/module-object";
import { OrthographicCamera, PerspectiveCamera } from "three";
class CameraCompiler extends ObjectCompiler {
  constructor() {
    super();
    __publicField(this, "cacheCameraMap", /* @__PURE__ */ new WeakMap());
  }
}
function CameraExtend(engine) {
  engine.setCameraBySymbol = function(camera) {
    const compiler = this.compilerManager.getCompiler(
      MODULETYPE.CAMERA
    );
    if (compiler.map.has(camera)) {
      this.setCamera(compiler.map.get(camera));
    } else {
      console.warn("can not found camera", camera);
    }
    return this;
  };
}
const CameraRule = function(notice, compiler) {
  ObjectRule(notice, compiler);
};
const getPerspectiveCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50
  });
};
const getOrthographicCameraConfig = function() {
  return Object.assign(getObjectConfig(), {
    adaptiveWindow: false,
    left: -window.innerWidth,
    right: window.innerWidth,
    top: window.innerHeight,
    bottom: -window.innerHeight,
    near: 5,
    far: 50,
    zoom: 1
  });
};
var OrthographicCameraProcessor = defineProcessor({
  type: "OrthographicCamera",
  config: getOrthographicCameraConfig,
  commands: {
    add: {
      scale() {
      },
      ...objectCommands.add
    },
    set: {
      scale() {
      },
      adaptiveWindow({ target, value, engine, compiler }) {
        if (value) {
          if (!compiler.cacheCameraMap.has(value)) {
            const fun = (event) => {
              const width = event.width;
              const height = event.height;
              target.left = -width;
              target.right = width;
              target.top = height;
              target.bottom = -height;
              target.updateProjectionMatrix();
            };
            compiler.cacheCameraMap.set(target, fun);
            engine.addEventListener("setSize", fun);
            fun({
              type: "setSize",
              width: engine.dom.offsetWidth,
              height: engine.dom.offsetHeight
            });
          }
        } else {
          const fun = compiler.cacheCameraMap.get(target);
          if (fun) {
            engine.removeEventListener("setSize", fun);
            compiler.cacheCameraMap.delete(target);
          }
        }
      },
      ...objectCommands.set,
      $reg: [
        {
          reg: new RegExp("left|right|top|bottom|near|far|zoom"),
          handler({ target, key, value }) {
            target[key] = value;
            target.updateProjectionMatrix();
          }
        }
      ]
    },
    delete: {
      scale() {
      },
      ...objectCommands.delete
    }
  },
  create(config, engine, compiler) {
    const camera = new OrthographicCamera(-50, 50, 50, -50);
    objectCreate(
      camera,
      config,
      {
        scale: true,
        adaptiveWindow: true
      },
      engine
    );
    camera.updateProjectionMatrix();
    if (config.adaptiveWindow) {
      const fun = (event) => {
        const width = event.width;
        const height = event.height;
        camera.left = -width;
        camera.right = width;
        camera.top = height;
        camera.bottom = -height;
        camera.updateProjectionMatrix();
      };
      compiler.cacheCameraMap.set(camera, fun);
      engine.addEventListener("setSize", fun);
      fun({
        type: "setSize",
        width: engine.dom.offsetWidth,
        height: engine.dom.offsetHeight
      });
    }
    return camera;
  },
  dispose(camera, engine, compiler) {
    compiler.cacheCameraMap.delete(camera);
    objectDispose(camera);
  }
});
var PerspectiveCameraProcessor = defineProcessor({
  type: "PerspectiveCamera",
  config: getPerspectiveCameraConfig,
  commands: {
    add: {
      scale() {
      },
      ...objectCommands.add
    },
    set: {
      scale() {
      },
      adaptiveWindow({ target, value, engine, compiler }) {
        if (value) {
          if (!compiler.cacheCameraMap.has(value)) {
            const fun = (event) => {
              target.aspect = event.width / event.height;
              target.updateProjectionMatrix();
            };
            compiler.cacheCameraMap.set(target, fun);
            engine.addEventListener("setSize", fun);
            fun({
              type: "setSize",
              width: engine.dom.offsetWidth,
              height: engine.dom.offsetHeight
            });
          }
        } else {
          const fun = compiler.cacheCameraMap.get(target);
          if (fun) {
            engine.removeEventListener("setSize", fun);
            compiler.cacheCameraMap.delete(target);
          }
        }
      },
      ...objectCommands.set,
      $reg: [
        {
          reg: new RegExp("fov|aspect|near|far"),
          handler({ target, key, value }) {
            target[key] = value;
            target.updateProjectionMatrix();
          }
        }
      ]
    },
    delete: {
      scale() {
      },
      ...objectCommands.delete
    }
  },
  create(config, engine, compiler) {
    const camera = new PerspectiveCamera();
    objectCreate(
      camera,
      config,
      {
        scale: true,
        adaptiveWindow: true
      },
      engine
    );
    camera.updateProjectionMatrix();
    if (config.adaptiveWindow) {
      const fun = (event) => {
        camera.aspect = event.width / event.height;
        camera.updateProjectionMatrix();
      };
      compiler.cacheCameraMap.set(camera, fun);
      engine.addEventListener("setSize", fun);
      fun({
        type: "setSize",
        width: engine.dom.offsetWidth,
        height: engine.dom.offsetHeight
      });
    }
    return camera;
  },
  dispose(camera, engine, compiler) {
    compiler.cacheCameraMap.delete(camera);
    objectDispose(camera);
  }
});
var index = {
  type: "camera",
  object: true,
  compiler: CameraCompiler,
  rule: CameraRule,
  processors: [OrthographicCameraProcessor, PerspectiveCameraProcessor],
  extend: CameraExtend,
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE
};
export { index as default };
