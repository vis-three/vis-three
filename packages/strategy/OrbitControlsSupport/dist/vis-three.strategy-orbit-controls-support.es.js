import { defineProcessor, uniqueSymbol, COMPILER_MANAGER_PLUGIN, DATA_SUPPORT_MANAGER_PLUGIN, MODULETYPE, CONFIGTYPE } from "@vis-three/middleware";
import { ORBIT_CONTROLS_PLUGIN } from "@vis-three/plugin-orbit-controls";
import { syncObject, transPkgName } from "@vis-three/utils";
import { Vector3 } from "three";
const type = "OrbitControls";
const getOrbitControlsConfig = function() {
  return {
    vid: uniqueSymbol(type),
    name: "",
    type: "",
    autoRotate: false,
    autoRotateSpeed: 2,
    enableDamping: false,
    dampingFactor: 0.05,
    enabled: true,
    enablePan: true,
    enableRotate: true,
    enableZoom: true,
    maxAzimuthAngle: Infinity,
    maxDistance: Infinity,
    maxPolarAngle: Math.PI,
    maxZoom: Infinity,
    minAzimuthAngle: -Infinity,
    minDistance: 0,
    minPolarAngle: 0,
    minZoom: 0,
    panSpeed: 1,
    rotateSpeed: 1,
    zoomSpeed: 1,
    screenSpacePanning: true,
    target: null
  };
};
var OrbitControlsProcessor = defineProcessor({
  type,
  config: getOrbitControlsConfig,
  commands: {
    set: {
      target({ target, config, path, key, value }) {
        const targetConfig = config.target;
        if (!config.type) {
          config.target = new Vector3(0, 0, 0);
          return;
        }
        if (typeof config.target === "string")
          ;
        else {
          if (path.length > 1) {
            target.target[key] = value;
          } else {
            target.target = new Vector3(
              targetConfig.x,
              targetConfig.y,
              targetConfig.z
            );
          }
        }
      }
    }
  },
  create(config, engine) {
    let controls = engine.orbitControls;
    if (config.target) {
      if (typeof config.target === "string")
        ;
      else {
        controls.target = new Vector3(
          config.target.x,
          config.target.y,
          config.target.z
        );
      }
    }
    syncObject(config, controls, {
      target: true
    });
    return controls;
  },
  dispose(target) {
    target.dispose();
  }
});
const name = "@vis-three/strategy-orbit-controls-support";
const ORBIT_CONTROLS_SUPPORT_STRATEGY = transPkgName(name);
const OrbitControlsSupportStrategy = function() {
  return {
    name: ORBIT_CONTROLS_SUPPORT_STRATEGY,
    condition: [
      COMPILER_MANAGER_PLUGIN,
      DATA_SUPPORT_MANAGER_PLUGIN,
      ORBIT_CONTROLS_PLUGIN
    ],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler(
        MODULETYPE.CONTROLS
      );
      compiler.reigstProcessor(OrbitControlsProcessor, (compiler2) => {
        compiler2.map.set(
          uniqueSymbol(CONFIGTYPE.ORBITCONTROLS),
          engine.orbitControls
        );
        compiler2.weakMap.set(
          engine.orbitControls,
          uniqueSymbol(CONFIGTYPE.ORBITCONTROLS)
        );
      });
    },
    rollback() {
    }
  };
};
export { ORBIT_CONTROLS_SUPPORT_STRATEGY, OrbitControlsSupportStrategy, getOrbitControlsConfig };
