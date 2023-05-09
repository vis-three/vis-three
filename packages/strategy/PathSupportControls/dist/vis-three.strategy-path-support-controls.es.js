import { transPkgName } from "@vis-three/utils";
import { defineProcessor, uniqueSymbol, PLUGINS, MODULETYPE, CONFIGTYPE } from "@vis-three/middleware";
import { PATH_SUPPORT_CONTROLS_PLUGIN } from "@vis-three/plugin-path-support-controls";
const name = "@vis-three/strategy-path-support-controls";
const type = "PathSupportControls";
const getPathSupportControlsConfig = function() {
  return {
    vid: uniqueSymbol(type),
    name: "",
    type,
    object: "",
    config: null,
    visible: false
  };
};
var PathSupportControlsProcessor = defineProcessor({
  type,
  config: getPathSupportControlsConfig,
  commands: {
    set: {
      config({ target, value, engine }) {
        const conf = engine.getConfigBySymbol(value);
        if (!conf) {
          console.warn(
            `pathSupportControls processor can not found config in engine: ${value}`
          );
        } else {
          target.setConfig(conf);
        }
      },
      object({ target, value, engine }) {
        const object = engine.getObjectBySymbol(value);
        if (!object) {
          console.warn(
            `pathSupportControls processor can not found object in engine: ${value}`
          );
        } else {
          target.setObject(object);
        }
      }
    }
  },
  create(config, engine) {
    const controls = engine.pathSupportControls;
    if (config.config) {
      const conf = engine.getConfigBySymbol(config.config);
      if (!conf) {
        console.warn(
          `pathSupportControls processor can not found config in engine: ${config.config}`
        );
      } else {
        controls.setConfig(conf);
      }
    }
    if (config.object) {
      const object = engine.getObjectBySymbol(config.object);
      if (!object) {
        console.warn(
          `pathSupportControls processor can not found object in engine: ${config.object}`
        );
      } else {
        controls.setObject(object);
      }
    }
    controls.visible = config.visible;
    engine.scene.add(controls);
    return controls;
  },
  dispose(target) {
    target.removeFromParent();
    target.disconnect();
    target.dispose();
  }
});
const PATH_SUPPORT_CONTROLS_STRATEGY = transPkgName(name);
const PathSupportControlsStrategy = function() {
  return {
    name: PATH_SUPPORT_CONTROLS_STRATEGY,
    condition: [...PLUGINS, PATH_SUPPORT_CONTROLS_PLUGIN],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler(
        MODULETYPE.CONTROLS
      );
      compiler.reigstProcessor(PathSupportControlsProcessor, (compiler2) => {
        compiler2.map.set(
          uniqueSymbol(CONFIGTYPE.PATHSUPPORTCONTROLS),
          engine.pathSupportControls
        );
        compiler2.weakMap.set(
          engine.pathSupportControls,
          uniqueSymbol(CONFIGTYPE.PATHSUPPORTCONTROLS)
        );
      });
    },
    rollback(engine) {
    }
  };
};
export { PATH_SUPPORT_CONTROLS_STRATEGY, PathSupportControlsStrategy };
