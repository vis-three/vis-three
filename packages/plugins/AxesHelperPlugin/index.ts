import { Engine, ENGINE_EVENT, Plugin, SetSceneEvent } from "@vis-three/core";
import { AxesHelper } from "three";

export interface AxesHelperParameters {
  length?: number;
}

export interface AxesHelperOptions {
  show: boolean;
}

export interface AxesHelperEngine extends Engine {
  axesHelper: AxesHelper;
  setAxesHelper: (params: AxesHelperOptions) => AxesHelperEngine;
}

const AxesHelperPlugin: Plugin<AxesHelperEngine> = function (
  params: AxesHelperParameters
) {
  let setSceneFun: (event: SetSceneEvent) => void;

  return {
    name: "AxesHelperPlugin",
    install(engine) {
      const axesHelper = new AxesHelper(params.length || 500);
      axesHelper.matrixAutoUpdate = false;
      axesHelper.raycast = () => {};

      engine.axesHelper = axesHelper;

      engine.scene.add(axesHelper);

      engine.setAxesHelper = function (
        params: AxesHelperOptions
      ): AxesHelperEngine {
        if (params.show) {
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

export default AxesHelperPlugin;
