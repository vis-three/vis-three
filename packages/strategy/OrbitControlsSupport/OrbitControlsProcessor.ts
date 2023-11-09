import { Vector3 } from "three";
import { VisOrbitControls } from "@vis-three/plugin-orbit-controls";
import { syncObject } from "@vis-three/utils";
import {
  defineProcessor,
  EngineSupport,
  uniqueSymbol,
  Vector3Config,
} from "@vis-three/middleware";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";
import {
  ControlsCompiler,
  ControlsConfig,
  getControlsConfig,
} from "@vis-three/module-controls";

export interface OrbitControlsConfig extends ControlsConfig {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableDamping: boolean;
  dampingFactor: number;
  enabled: boolean;
  enablePan: boolean;
  enableRotate: boolean;
  enableZoom: boolean;
  maxAzimuthAngle: number;
  maxDistance: number;
  maxPolarAngle: number;
  maxZoom: number;
  minAzimuthAngle: number;
  minDistance: number;
  minPolarAngle: number;
  minZoom: number;
  panSpeed: number;
  rotateSpeed: number;
  zoomSpeed: number;
  screenSpacePanning: boolean;
  target: string | Vector3Config | null;
}

const type = "OrbitControls";

export const getOrbitControlsConfig = function (): OrbitControlsConfig {
  return Object.assign(getControlsConfig(), {
    vid: uniqueSymbol(type),
    autoRotate: false,
    autoRotateSpeed: 2.0,
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
    target: null,
  });
};

export interface OrbitControlsSupportEngine
  extends EngineSupport,
    OrbitControlsEngine {}

export default defineProcessor<
  OrbitControlsConfig,
  VisOrbitControls,
  OrbitControlsSupportEngine,
  ControlsCompiler
>({
  type: type,
  config: getOrbitControlsConfig,
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
