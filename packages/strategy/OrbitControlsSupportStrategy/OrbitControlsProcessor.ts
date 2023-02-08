import { Vector3 } from "three";
import { VisOrbitControls } from "@vis-three/orbit-controls-plugin";
import { syncObject } from "@vis-three/utils";
import {
  CONFIGTYPE,
  defineProcessor,
  EngineSupport,
  OrbitControlsConfig,
  Vector3Config,
} from "@vis-three/middleware";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";

export interface OrbitControlsSupportEngine
  extends EngineSupport,
    OrbitControlsEngine {}

export default defineProcessor<
  OrbitControlsConfig,
  VisOrbitControls,
  OrbitControlsSupportEngine
>({
  configType: CONFIGTYPE.ORBITCONTROLS,
  commands: {
    set: {
      target({ target, config, path, key, value }) {
        const targetConfig = config.target;

        if (!config.type) {
          config.target = new Vector3(0, 0, 0);
          return;
        }

        if (typeof config.target === "string") {
          // TODO:
        } else {
          if (path.length > 1) {
            target.target[key] = value;
          } else {
            target.target = new Vector3(
              (<Vector3Config>targetConfig).x,
              (<Vector3Config>targetConfig).y,
              (<Vector3Config>targetConfig).z
            );
          }
        }
      },
    },
  },
  create(
    config: OrbitControlsConfig,
    engine: OrbitControlsSupportEngine
  ): VisOrbitControls {
    let controls = engine.orbitControls;

    if (config.target) {
      if (typeof config.target === "string") {
        // TODO:
      } else {
        controls.target = new Vector3(
          config.target.x,
          config.target.y,
          config.target.z
        );
      }
    }

    syncObject(config, controls, {
      target: true,
    });

    return controls;
  },
  dispose(target: VisOrbitControls) {
    target.dispose();
  },
});
