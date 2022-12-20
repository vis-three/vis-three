import { Vector3 } from "three";
import { VisOrbitControls } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { OrbitControlsConfig } from "../ControlsConfig";
import { Vector3Config } from "../../common";
import { defineProcessor } from "../../module";
import { EngineSupport } from "../../engine";

export default defineProcessor<OrbitControlsConfig, VisOrbitControls>({
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
  create(config: OrbitControlsConfig, engine: EngineSupport): VisOrbitControls {
    let controls: VisOrbitControls;

    if (engine.orbitControls) {
      controls = engine.orbitControls!;
    } else {
      controls = new VisOrbitControls();
      controls.setCamera(engine.camera);
      controls.setDom(engine.dom!);
    }

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
