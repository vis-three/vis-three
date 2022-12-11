import { ENGINE_EVENT, VisOrbitControls, } from "@vis-three/core";
import { SETVIEWPOINT, VIEWPOINT, } from "@vis-three/viewpoint-plugin";
import { RENDER_EVENT, } from "@vis-three/render-manager-plugin";
export const OrbitControlsPlugin = function () {
    let setDomFun;
    let setCameraFun;
    let renderFun;
    let viewpointFun;
    let cacheRender;
    return {
        name: "OrbitControlsPlugin",
        install(engine) {
            const controls = new VisOrbitControls(engine.camera, engine.dom);
            engine.orbitControls = controls;
            setDomFun = (event) => {
                controls.setDom(event.dom);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setCameraFun = (event) => {
                event.options.orbitControls && controls.setCamera(event.camera);
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            cacheRender = engine.render;
            engine.render = function () {
                cacheRender();
                controls.update();
            };
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.render = cacheRender;
        },
        installDeps: {
            RenderManagerPlugin(engine) {
                renderFun = () => {
                    engine.orbitControls.update();
                };
                engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
            },
            ViewpointPlugin(engine) {
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
                engine.addEventListener(SETVIEWPOINT, viewpointFun);
            },
        },
        disposeDeps: {
            RenderManagerPlugin(engine) {
                engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
            },
            ViewpointPlugin(engine) {
                engine.removeEventListener(SETVIEWPOINT, viewpointFun);
            },
        },
    };
};
