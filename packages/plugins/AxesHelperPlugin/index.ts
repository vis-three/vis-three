import { Engine, ENGINE_EVENT, Plugin, SetSceneEvent } from "@vis-three/core";
import { AxesHelper } from "three";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface AxesHelperParameters {
  length?: number;
}

export interface AxesHelperOptions {}

export interface AxesHelperEngine extends Engine {
  axesHelper: AxesHelper;
  setAxesHelper: (show: boolean, params: AxesHelperOptions) => AxesHelperEngine;
}

export const AXES_HELPER_PLUGIN = transPkgName(pkgname);

export const AxesHelperPlugin: Plugin<AxesHelperEngine, AxesHelperParameters> =
  function (params?: AxesHelperParameters) {
    let setSceneFun: (event: SetSceneEvent) => void;

    return {
      name: AXES_HELPER_PLUGIN,
      install(engine) {
        const axesHelper = new AxesHelper(params?.length || 500);
        axesHelper.matrixAutoUpdate = false;
        axesHelper.raycast = () => {};

        engine.axesHelper = axesHelper;

        engine.scene.add(axesHelper);

        engine.setAxesHelper = function (
          show: boolean,
          params: AxesHelperOptions
        ): AxesHelperEngine {
          if (show) {
            engine.scene.add(axesHelper);
          } else {
            engine.scene.remove(axesHelper);
          }
          return this;
        };

        setSceneFun = (event) => {
          event.scene.add(axesHelper);
        };

        engine.addEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );
      },
      dispose(engine: Partial<AxesHelperEngine>) {
        delete engine.setAxesHelper;
        engine.axesHelper!.dispose();
        delete engine.axesHelper;

        engine.removeEventListener!<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );
      },
    };
  };
