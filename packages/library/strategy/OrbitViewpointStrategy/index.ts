import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";
import {
  OrbitControlsEngine,
  ORBIT_CONTROLS_PLUGIN,
} from "@vis-three/plugin-orbit-controls";
import {
  ViewpointEngine,
  ViewpointEvent,
  VIEWPOINT_PLUGIN,
  VIEWPOINT,
  SETVIEWPOINT,
} from "@vis-three/plugin-viewpoint";

export interface OrbitViewpointEngine
  extends OrbitControlsEngine,
    ViewpointEngine {}

export const name = transPkgName(pkgname);

export const OrbitViewpointStrategy: Strategy<OrbitViewpointEngine, object> =
  function () {
    let viewpointFun: (event: ViewpointEvent) => void;

    return {
      name,
      condition: [ORBIT_CONTROLS_PLUGIN, VIEWPOINT_PLUGIN],
      exec(engine) {
        const disableRotate = () => {
          engine.orbitControls.enableRotate = false;
        };

        const actionMap = {
          [VIEWPOINT.DEFAULT]: () => {
            engine.orbitControls.enableRotate = true;
          },
          [VIEWPOINT.TOP]: disableRotate,
          [VIEWPOINT.BOTTOM]: disableRotate,
          [VIEWPOINT.RIGHT]: disableRotate,
          [VIEWPOINT.LEFT]: disableRotate,
          [VIEWPOINT.FRONT]: disableRotate,
          [VIEWPOINT.BACK]: disableRotate,
        };

        viewpointFun = (event) => {
          const viewpoint = event.viewpoint;

          engine.orbitControls.target.set(0, 0, 0);
          actionMap[viewpoint] && actionMap[viewpoint]();
        };

        engine.addEventListener<ViewpointEvent>(SETVIEWPOINT, viewpointFun);
      },
      rollback(engine) {
        engine.removeEventListener<ViewpointEvent>(SETVIEWPOINT, viewpointFun);
      },
    };
  };
