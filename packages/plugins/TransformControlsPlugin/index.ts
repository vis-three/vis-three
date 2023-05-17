import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetCameraEvent,
  SetDomEvent,
  SetSceneEvent,
} from "@vis-three/core";
import { TRANSFORM_EVENT, VisTransformControls } from "./VisTransformControls";

export * from "./VisTransformControls";
export interface TransformControlsEngine extends Engine {
  transing: boolean;
  transformControls: VisTransformControls;
  setTransformControls: (show: boolean) => TransformControlsEngine;
}

export const TRANSFORM_CONTROLS_PLUGIN = transPkgName(pkgname);

export const TransformControlsPlugin: Plugin<TransformControlsEngine, object> =
  function () {
    let setDomFun: (event: SetDomEvent) => void;
    let setCameraFun: (event: SetCameraEvent) => void;
    let setSceneFun: (event: SetSceneEvent) => void;
    return {
      name: TRANSFORM_CONTROLS_PLUGIN,
      install(engine) {
        const transformControls = new VisTransformControls(
          engine.camera,
          engine.dom
        );

        transformControls.detach();

        engine.transformControls = transformControls;

        engine.scene.add(transformControls);
        engine.scene.add(transformControls.target);

        engine.transformControls.addEventListener(
          TRANSFORM_EVENT.MOUSE_DOWN,
          () => {
            engine.transing = true;
          }
        );

        engine.setTransformControls = function (show: boolean) {
          if (show) {
            this.scene.add(this.transformControls);
          } else {
            this.scene.remove(this.transformControls);
          }
          return this;
        };

        setCameraFun = (event) => {
          event.options.transformControls &&
            transformControls.setCamera(event.camera);
        };

        engine.addEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );

        setDomFun = (event) => {
          transformControls.setDom(event.dom);
        };

        engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

        setSceneFun = (event) => {
          const scene = event.scene;
          scene.add(transformControls.target);
          scene.add(transformControls);
        };

        engine.addEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );
      },
      dispose(
        engine: Optional<
          TransformControlsEngine,
          "transing" | "transformControls" | "setTransformControls"
        >
      ) {
        engine.removeEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );

        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

        engine.removeEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );

        engine.transformControls?.dispose();

        delete engine.transing;
        delete engine.transformControls;
        delete engine.setTransformControls;
      },
    };
  };
