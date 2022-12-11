import { ENGINE_EVENT, RENDER_EVENT, } from "@vis-three/core";
import { CSS2DObject, CSS2DRenderer, } from "three/examples/jsm/renderers/CSS2DRenderer";
export const CSS2DRendererPlugin = function () {
    let setDomFun;
    let setSizeFun;
    let setSceneFun;
    let renderFun;
    let cacheRender;
    return {
        name: "CSS2DRendererPlugin",
        install(engine) {
            const css2DRenderer = new CSS2DRenderer();
            engine.css2DRenderer = css2DRenderer;
            const domElement = css2DRenderer.domElement;
            domElement.classList.add("vis-css2D");
            domElement.style.position = "absolute";
            domElement.style.top = "0";
            domElement.style.left = "0";
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
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            cacheRender = engine.render.bind(engine);
            engine.render = function () {
                cacheRender();
                this.css2DRenderer.render(this.scene, this.camera);
                return this;
            };
        },
        dispose(engine) {
            engine.render = cacheRender;
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
        },
        installDeps: {
            RendererManagerPlugin(engine) {
                renderFun = (event) => {
                    engine.css2DRenderer.render(engine.scene, engine.camera);
                };
                engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
            },
        },
        disposeDeps: {
            RendererManagerPlugin(engine) {
                engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
            },
        },
    };
};
