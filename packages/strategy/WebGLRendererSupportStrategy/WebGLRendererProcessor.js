import { defineProcessor, uniqueSymbol, } from "@vis-three/middleware";
import { getRendererConfig, } from "@vis-three/module-renderer/RendererConfig";
import { syncObject } from "@vis-three/utils";
import { LinearEncoding, NoToneMapping, PCFShadowMap, } from "three";
export const getWebGLRendererConfig = function () {
    return Object.assign(getRendererConfig(), {
        vid: uniqueSymbol("WebGLRenderer"),
        clearColor: "rgba(0, 0, 0, 0)",
        outputEncoding: LinearEncoding,
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
export default defineProcessor({
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
                const alpha = Number(value.slice(0, -1).split(",").pop().trim());
                target.setClearColor(value, alpha);
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
    create(config, engine) {
        let renderer = engine.webGLRenderer;
        if (config.size) {
            renderer.setSize(config.size.x, config.size.y);
        }
        if (config.clearColor) {
            const alpha = Number(config.clearColor.slice(0, -1).split(",").pop().trim());
            renderer.setClearColor(config.clearColor, alpha);
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
    dispose(renderer) {
        renderer.clear();
        renderer.dispose();
    },
});
