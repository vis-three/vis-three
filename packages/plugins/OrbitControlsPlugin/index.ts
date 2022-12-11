import {
  Engine,
  ENGINE_EVENT,
  Optional,
  Plugin,
  RenderEvent,
  RenderManagerEngine,
  RENDER_EVENT,
  SetCameraEvent,
  SetDomEvent,
  VisOrbitControls,
} from "@vis-three/core";
import {
  ViewpointEvent,
  SETVIEWPOINT,
  ViewpointEngine,
  VIEWPOINT,
} from "@vis-three/viewpoint-plugin";

export interface OrbitControlsEngine extends Engine {
  orbitControls: VisOrbitControls;
}

export interface OrbitRenderEngine
  extends OrbitControlsEngine,
    RenderManagerEngine {}

export interface OrbitViewpointEngine
  extends OrbitControlsEngine,
    ViewpointEngine {}

export const OrbitControlsPlugin: Plugin<OrbitControlsEngine> = function () {
  let setDomFun: (event: SetDomEvent) => void;
  let setCameraFun: (event: SetCameraEvent) => void;
  let renderFun: (event: RenderEvent) => void;
  let viewpointFun: (event: ViewpointEvent) => void;

  let cacheRender: () => void;

  return {
    name: "OrbitControlsPlugin",
    install(engine) {
      const controls = new VisOrbitControls(engine.camera, engine.dom);

      engine.orbitControls = controls;

      setDomFun = (event) => {
        controls.setDom(event.dom);
      };

      engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

      setCameraFun = (event) => {
        event.options.orbitControls && controls.setCamera(event.camera);
      };

      engine.addEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );

      cacheRender = engine.render;

      engine.render = function () {
        cacheRender();
        controls.update();
      };
    },
    dispose(engine: Optional<OrbitControlsEngine, "orbitControls">) {
      engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
      engine.removeEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );

      engine.render = cacheRender;
    },

    installDeps: {
      RenderManagerPlugin(engine: OrbitRenderEngine) {
        renderFun = () => {
          engine.orbitControls.update();
        };
        engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
      },
      ViewpointPlugin(engine: OrbitViewpointEngine) {
        const disableRotate = () => {
          engine.orbitControls.enableRotate = true;
        };

        const actionMap = {
          [VIEWPOINT.DEFAULT]: disableRotate,
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
    },

    disposeDeps: {
      RenderManagerPlugin(engine: OrbitRenderEngine) {
        engine.renderManager.removeEventListener(
          RENDER_EVENT.RENDER,
          renderFun
        );
      },
      ViewpointPlugin(engine: OrbitViewpointEngine) {
        engine.removeEventListener<ViewpointEvent>(SETVIEWPOINT, viewpointFun);
      },
    },
  };
};
