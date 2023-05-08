import { ENGINE_EVENT, } from "@vis-three/core";
import { CSS2DObject, CSS2DRenderer, } from "three/examples/jsm/renderers/CSS2DRenderer";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const name = transPkgName(pkgname);
export const CSS2DRendererPlugin = function () {
    let setDomFun;
    let setSizeFun;
    let setSceneFun;
    let renderFun;
    return {
        name,
        install(engine) {
            const css2DRenderer = new CSS2DRenderer();
            engine.css2DRenderer = css2DRenderer;
            const domElement = css2DRenderer.domElement;
            domElement.classList.add("vis-css2D");
            domElement.style.position = "absolute";
            domElement.style.top = "0";
            domElement.style.left = "0";
            domElement.style.zIndex = "2";
            setDomFun = (event) => {
                event.dom.appendChild(css2DRenderer.domElement);
            };
            setSizeFun = (event) => {
                css2DRenderer.setSize(event.width, event.height);
            };
            setSceneFun = (event) => {
                const oldScene = event.oldScene;
                oldScene.traverse((object) => {
                    if (object instanceof CSS2DObject) {
                        object.element.style.display = "none";
                    }
                });
            };
            renderFun = () => {
                css2DRenderer.render(engine.scene, engine.camera);
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
