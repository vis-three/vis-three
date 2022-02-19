import { ClampToEdgeWrapping, LinearEncoding, LinearFilter, LinearMipmapLinearFilter, RGBAFormat, UVMapping } from "three";
export const getTextureConfig = function () {
    return {
        vid: '',
        type: 'Texture',
        name: '',
        mapping: UVMapping,
        wrapS: ClampToEdgeWrapping,
        wrapT: ClampToEdgeWrapping,
        magFilter: LinearFilter,
        minFilter: LinearMipmapLinearFilter,
        anisotropy: 1,
        format: RGBAFormat,
        offset: {
            x: 0,
            y: 0
        },
        repeat: {
            x: 1,
            y: 1
        },
        rotation: 0,
        center: {
            x: 0,
            y: 0
        },
        matrixAutoUpdate: true,
        encoding: LinearEncoding,
        needsUpdate: false
    };
};
export const getImageTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        type: 'ImageTexture',
        url: ''
    });
};
export const getCubeTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        type: 'CubeTexture',
        cube: {
            nx: '',
            ny: '',
            nz: '',
            px: '',
            py: '',
            pz: ''
        }
    });
};
export const getCanvasTextureConfig = function () {
    return Object.assign(getTextureConfig(), {
        type: 'CanvasTexture',
        url: '',
        needsUpdate: false
    });
};
//# sourceMappingURL=TextureConfig.js.map