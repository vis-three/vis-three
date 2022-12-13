import {
  GridHelperEngine,
  GRID_HELPER_PLUGIN,
} from "@vis-three/grid-helper-plugin";
import {
  SETVIEWPOINT,
  VIEWPOINT,
  ViewpointEngine,
  ViewpointEvent,
  VIEWPOINT_PLUGIN,
} from "@vis-three/viewpoint-plugin";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";

export interface GridViewpointEngine
  extends GridHelperEngine,
    ViewpointEngine {}

export const GRID_VIEWPOINT_STRATEGY = transPkgName(pkgname);

export const GridViewpointStrategy: Strategy<GridViewpointEngine> =
  function () {
    let viewpointFun: (event: ViewpointEvent) => void;

    return {
      name: GRID_VIEWPOINT_STRATEGY,
      condition: [VIEWPOINT_PLUGIN, GRID_HELPER_PLUGIN],
      exec(engine) {
        const gridHelper = engine.gridHelper;
        const toZero = () => {
          gridHelper.rotation.set(0, 0, 0);
        };
        const toZ90 = () => {
          gridHelper.rotation.set(0, 0, Math.PI / 2);
        };
        const toX90 = () => {
          gridHelper.rotation.set(Math.PI / 2, 0, 0);
        };
        const viewpointAction = {
          [VIEWPOINT.DEFAULT]: toZero,
          [VIEWPOINT.TOP]: toZero,
          [VIEWPOINT.BOTTOM]: toZero,
          [VIEWPOINT.RIGHT]: toZ90,
          [VIEWPOINT.LEFT]: toZ90,
          [VIEWPOINT.FRONT]: toX90,
          [VIEWPOINT.BACK]: toX90,
        };

        viewpointFun = (event) => {
          const viewpoint = event.viewpoint;

          viewpointAction[viewpoint] && viewpointAction[viewpoint]();
          gridHelper.updateMatrix();
          gridHelper.updateMatrixWorld();
        };

        engine.addEventListener<ViewpointEvent>(SETVIEWPOINT, viewpointFun);
      },
      rollback(engine) {
        engine.removeEventListener<ViewpointEvent>(SETVIEWPOINT, viewpointFun);
      },
    };
  };
