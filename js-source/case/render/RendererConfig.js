import { LinearEncoding, NoToneMapping, PCFShadowMap } from "three";
export const getWebGLRendererConfig = function () {
    return {
        vid: 'WebGLRenderer',
        type: 'WebGLRenderer',
        clearColor: 'rgba(0, 0, 0, 0)',
        outputEncoding: LinearEncoding,
        physicallyCorrectLights: false,
        shadowMap: {
            enabled: false,
            autoUpdate: true,
            type: PCFShadowMap
        },
        toneMapping: NoToneMapping,
        toneMappingExposure: 1,
        pixelRatio: window.devicePixelRatio,
        adaptiveCamera: false,
        viewport: null,
        scissor: null,
        size: null,
    };
};
//# sourceMappingURL=RendererConfig.js.map