import { ClampToEdgeWrapping, CubeReflectionMapping, LinearEncoding, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, UVMapping, } from "three";
export const getTextureConfig = function () {
    return {
        vid: "",
        type: "Texture",
        name: "",
        mapping: UVMapping,
        wrapS: ClampToEdgeWrapping,
        wrapT: ClampToEdgeWrapping,
        magFilter: LinearFilter,
        minFilter: LinearMipmapLinearFilter,
        anisotropy: 1,
        format: RGBAFormat,
        flipY: true,
        offset: {
            x: 0,
            y: 0,
        },
        repeat: {
            x: 1,
            y: 1,
        },
        rotation: 0,
        center: {
            x: 0,
            y: 0,
        },
        matrixAutoUpdate: true,
        encoding: LinearEncoding,
        needsUpdate: false,
    };
};
export const getImageTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        url: "",
    });
};
export const getVideoTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        url: "",
        minFilter: LinearFilter,
    });
};
export const getCubeTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        cube: {
            nx: "",
            ny: "",
            nz: "",
            px: "",
            py: "",
            pz: "",
        },
        mapping: CubeReflectionMapping,
        flipY: false,
    });
};
export const getCanvasTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        url: "",
        needsUpdate: false,
    });
};
export const getLoadTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        url: "",
    });
};
