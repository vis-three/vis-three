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
import { TRANSFORM_EVENT, TransformControls } from "./TransformControls";

export * from "./TransformControls";
export interface TransformControlsEngine extends Engine {
  /**是否处于变换控制器的变换状态 */
  transing: boolean;
  /**变换控制器 */
  transformControls: TransformControls;
  /**设置变换控制器的显示隐藏 */
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
        const transformControls = new TransformControls(
          engine.camera,
          engine.dom,
          engine.scene
        );

        transformControls.detach();

        engine.transformControls = transformControls;

        engine.transformControls.addEventListener(
          TRANSFORM_EVENT.MOUSE_DOWN,
          () => {
            engine.transing = true;
          }
        );

        engine.setTransformControls = function (show: boolean) {
          if (show) {
            this.transformControls.attach();
          } else {
            this.transformControls.detach();
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
          transformControls.setScene(event.scene);
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
