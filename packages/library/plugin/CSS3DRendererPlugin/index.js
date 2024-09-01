import { ENGINE_EVENT, } from "@vis-three/core";
import { CSS3DObject, CSS3DRenderer, } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const CSS3D_RENDERER_PLUGIN = transPkgName(pkgname);
export const CSS3DRendererPlugin = function () {
    let setDomFun;
    let setSizeFun;
    let setSceneFun;
    let renderFun;
    return {
        name: CSS3D_RENDERER_PLUGIN,
        install(engine) {
            const css3DRenderer = new CSS3DRenderer();
            engine.css3DRenderer = css3DRenderer;
            const domElement = css3DRenderer.domElement;
            domElement.id = "vis-css3D";
            domElement.classList.add("vis-css3D");
            domElement.style.position = "absolute";
            domElement.style.top = "0";
            domElement.style.left = "0";
            domElement.style.zIndex = "1";
            setDomFun = (event) => {
                event.dom.appendChild(css3DRenderer.domElement);
            };
            setSizeFun = (event) => {
                css3DRenderer.setSize(event.width, event.height);
            };
            setSceneFun = (event) => {
                const oldScene = event.oldScene;
                oldScene.traverse((object) => {
                    if (object instanceof CSS3DObject) {
                        object.element.style.display = "none";
                    }
                });
            };
            renderFun = () => {
                css3DRenderer.render(engine.scene, engine.camera);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            engine.addEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            engine.removeEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
    };
};
