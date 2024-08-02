import { ENGINE_EVENT, } from "@vis-three/core";
import { RGBAFormat, Vector2, WebGLRenderTarget } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { WEBGL_RENDERER_PLUGIN, } from "@vis-three/plugin-webgl-renderer";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
export const EFFECT_COMPOSER_PLUGIN = transPkgName(pkgname);
export const EffectComposerPlugin = function (params = {}) {
    let setCameraFun;
    let setSizeFun;
    let setSceneFun;
    let renderFun;
    return {
        name: EFFECT_COMPOSER_PLUGIN,
        deps: WEBGL_RENDERER_PLUGIN,
        install(engine) {
            let composer;
            if (params.MSAA) {
                const renderer = engine.webGLRenderer;
                const pixelRatio = renderer.getPixelRatio();
                const size = renderer.getDrawingBufferSize(new Vector2());
                composer = new EffectComposer(renderer, new WebGLRenderTarget(size.width * pixelRatio, size.height * pixelRatio, {
                    format: params.format || RGBAFormat,
                    // @ts-ignore
                    samples: params.samples || 4,
                }));
            }
            else {
                composer = new EffectComposer(engine.webGLRenderer);
            }
            engine.effectComposer = composer;
            const renderPass = new RenderPass(engine.scene, engine.camera);
            composer.addPass(renderPass);
            if (params.MSAA) {
                const copyPass = new ShaderPass(CopyShader);
                composer.addPass(copyPass);
            }
            setCameraFun = (event) => {
                renderPass.camera = event.camera;
            };
            engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            setSceneFun = (event) => {
                renderPass.scene = event.scene;
            };
            engine.addEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            setSizeFun = (event) => {
                composer.setSize(event.width, event.height);
            };
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            console.warn(`${EFFECT_COMPOSER_PLUGIN}: hope install close behind the ${WEBGL_RENDERER_PLUGIN}, because ${WEBGL_RENDERER_PLUGIN}\`s renderFun can be dispose. if you not do this, render are prone to bugs`);
            engine.popLatestEvent(ENGINE_EVENT.RENDER);
            renderFun = () => {
                composer.render();
            };
            engine.addEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
            engine.removeEventListener(ENGINE_EVENT.SETSCENE, setSceneFun);
            engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.removeEventListener(ENGINE_EVENT.RENDER, renderFun);
            delete engine.effectComposer;
        },
    };
};
