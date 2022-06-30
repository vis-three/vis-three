import { LinearEncoding, NoToneMapping, PCFShadowMap } from "three";
import { CONFIGTYPE } from "../constants/configType";
export const getRendererConfig = function () {
    return {
        vid: "",
        type: "Renderer",
        size: null,
    };
};
export const getWebGLRendererConfig = function () {
    return Object.assign(getRendererConfig(), {
        vid: CONFIGTYPE.WEBGLRENDERER,
        type: CONFIGTYPE.WEBGLRENDERER,
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
export const getCSS3DRenderereConfig = function () {
    return Object.assign(getRendererConfig(), {
        vid: CONFIGTYPE.CSS3DRENDERER,
        type: CONFIGTYPE.CSS3DRENDERER,
    });
};
//# sourceMappingURL=RendererConfig.js.map