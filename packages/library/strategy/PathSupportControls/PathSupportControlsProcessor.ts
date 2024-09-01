import {
  EngineSupport,
  defineProcessor,
  uniqueSymbol,
} from "@vis-three/middleware";
import { ControlsCompiler } from "@vis-three/module-controls/ControlsCompiler";
import { ControlsConfig } from "@vis-three/module-controls/ControlsConfig";
import { PathConfig } from "@vis-three/module-path";
import { PathSupportControlsEngine } from "@vis-three/plugin-path-support-controls";
import { PathSupportControls } from "@vis-three/plugin-path-support-controls/PathSupportControls";
import { Object3D } from "three";

export interface PathSupportControlsConfig extends ControlsConfig {
  object: string | null;
  config: string | null;
  visible: boolean;
}

const type = "PathSupportControls";

export const getPathSupportControlsConfig =
  function (): PathSupportControlsConfig {
    return {
      vid: uniqueSymbol(type),
      name: "",
      type,
      object: "",
      config: null,
      visible: false,
    };
  };

export interface PathSupportControlsEngineSupport
  extends EngineSupport,
    PathSupportControlsEngine {}

export default defineProcessor<
  PathSupportControlsConfig,
  PathSupportControls,
  PathSupportControlsEngineSupport,
  ControlsCompiler
>({
  type,
  config: getPathSupportControlsConfig,
  commands: {
    set: {
      config({ target, value, engine }) {
        if (!value) {
          target.disconnect();
          return;
        }
        const conf = engine.getConfigBySymbol(value) as PathConfig;

        if (!conf) {
          console.warn(
            `pathSupportControls processor can not found config in engine: ${value}`
          );
        } else {
          target.setConfig(conf);
        }

        target.connect();
      },
      object({ target, value, engine }) {
        if (!value) {
          target.disconnect();
          return;
        }

        const object = engine.getObjectBySymbol(value) as Object3D;

        if (!object) {
          console.warn(
            `pathSupportControls processor can not found object in engine: ${value}`
          );
        } else {
          target.setObject(object);
        }

        target.connect();
      },
      visible({ target, value }) {
        if (value) {
          target.connect();
        } else {
          target.disconnect();
        }

        target.visible = value;
      },
    },
  },
  create(config, engine) {
    const controls = engine.pathSupportControls;

    if (config.config) {
      const conf = engine.getConfigBySymbol(config.config) as PathConfig;

      if (!conf) {
        console.warn(
          `pathSupportControls processor can not found config in engine: ${config.config}`
        );
      } else {
        controls.setConfig(conf);
      }
    }

    if (config.object) {
      const object = engine.getObjectBySymbol(config.object) as Object3D;

      if (!object) {
        console.warn(
          `pathSupportControls processor can not found object in engine: ${config.object}`
        );
      } else {
        controls.setObject(object);
      }
    }

    if (config.object && config.config) {
      controls.connect();
    }

    controls.visible = config.visible;

    engine.scene.add(controls);

    return controls;
  },
  dispose(target) {
    target.removeFromParent();
    target.disconnect();
    target.dispose();
  },
});
