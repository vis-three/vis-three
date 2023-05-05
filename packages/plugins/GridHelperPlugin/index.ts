import { Engine, ENGINE_EVENT, Plugin, SetSceneEvent } from "@vis-three/core";
import { GridHelper, Material } from "three";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface GridHelperParameters {
  range?: number;
  spacing?: number;
  axesColor?: string;
  cellColor?: string;
  opacity?: number;
}

export interface GridHelperEngine extends Engine {
  gridHelper: GridHelper;
  setGridHelper: (show: boolean) => GridHelperEngine;
}

export const GRID_HELPER_PLUGIN = transPkgName(pkgname);

export const GridHelperPlugin: Plugin<GridHelperEngine, GridHelperParameters> =
  function (params: GridHelperParameters = {}) {
    let setSceneFun: (event: SetSceneEvent) => void;

    return {
      name: GRID_HELPER_PLUGIN,
      install(engine) {
        const gridHelper = new GridHelper(
          params.range || 500,
          params.spacing || 50,
          params.axesColor || "rgb(130, 130, 130)",
          params.cellColor || "rgb(70, 70, 70)"
        );

        if (params.opacity !== 1) {
          const material = gridHelper.material as Material;
          material.transparent = true;
          material.opacity = params.opacity || 0.5;
          material.needsUpdate = true;
        }

        gridHelper.matrixAutoUpdate = false;
        gridHelper.raycast = () => {};

        engine.gridHelper = gridHelper;

        engine.scene.add(gridHelper);

        engine.setGridHelper = function (show: boolean) {
          if (show) {
            this.scene.add(gridHelper);
          } else {
            this.scene.remove(gridHelper);
          }
          return this;
        };

        setSceneFun = (event) => {
          event.scene.add(gridHelper);
        };

        engine.addEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );
      },
      dispose(
        engine: Optional<GridHelperEngine, "gridHelper" | "setGridHelper">
      ) {
        engine.removeEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );

        (<Material>engine.gridHelper!.material).dispose();
        engine.gridHelper!.geometry.dispose();
        delete engine.gridHelper;
        delete engine.setGridHelper;
      },
    };
  };
