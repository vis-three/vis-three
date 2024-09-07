import { defineModel, uniqueSymbol } from "@vis-three/tdcm";
import { getRendererConfig, } from "@vis-three/module-renderer";
import { parseColor, syncObject } from "@vis-three/utils";
import { NoToneMapping, PCFShadowMap, SRGBColorSpace, } from "three";
export const getWebGLRendererConfig = function () {
    return Object.assign(getRendererConfig(), {
        vid: uniqueSymbol("WebGLRenderer"), // WebGLRenderer or vid
        clearColor: "rgba(0, 0, 0, 0)",
        outputEncoding: 0,
        outputColorSpace: SRGBColorSpace,
        physicallyCorrectLights: false,
        shadowMap: {
            enabled: false,
            autoUpdate: true,
            needsUpdate: false,
            type: PCFShadowMap,
        },
        toneMapping: NoToneMapping,
        toneMappingExposure: 1,
        pixelRatio: window.devicePixelRatio,
        adaptiveCamera: false,
        viewport: null,
        scissor: null,
    });
};
export default defineModel({
    type: "WebGLRenderer",
    config: getWebGLRendererConfig,
    commands: {
        set: {
            size({ target, config }) {
                if (!config.size) {
                    target.setSize(target.domElement.offsetWidth, target.domElement.offsetHeight);
                }
                else {
                    target.setSize(config.size.x, config.size.y);
                }
            },
            clearColor({ target, value }) {
                // 取出alpha的值
                const color = parseColor(value);
                target.setClearColor(`rgb(${color.r}, ${color.g}, ${color.b})`, color.a);
                target.clear();
            },
            viewport({ target, config }) {
                const viewport = config.viewport;
                if (viewport) {
                    target.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
                }
                else {
                    const domElement = target.domElement;
                    target.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
                }
            },
            scissor({ target, config }) {
                const scissor = config.scissor;
                if (scissor) {
                    target.setScissorTest(true);
                    target.setScissor(scissor.x, scissor.y, scissor.width, scissor.height);
                }
                else {
                    target.setScissorTest(false);
                    const domElement = target.domElement;
                    target.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
                }
            },
            pixelRatio({ target, value }) {
                target.setPixelRatio(value);
                target.clear();
            },
        },
    },
    create({ config, engine }) {
        let renderer = engine.webGLRenderer;
        if (config.size) {
            renderer.setSize(config.size.x, config.size.y);
        }
        if (config.clearColor) {
            const color = parseColor(config.clearColor);
            renderer.setClearColor(`rgb(${color.r}, ${color.g}, ${color.b})`, color.a);
        }
        if (config.viewport) {
            const viewport = config.viewport;
            renderer.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
        }
        if (config.scissor) {
            const scissor = config.scissor;
            renderer.setScissorTest(true);
            renderer.setScissor(scissor.x, scissor.y, scissor.width, scissor.height);
        }
        if (config.pixelRatio) {
            renderer.setPixelRatio(config.pixelRatio);
        }
        syncObject(config, renderer, {
            size: true,
            clearColor: true,
            viewport: true,
            scissor: true,
            pixelRatio: true,
        });
        return renderer;
    },
    dispose({ target }) {
        target.clear();
        target.dispose();
    },
});
