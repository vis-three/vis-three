import { FrontSide, MultiplyOperation, RGBAFormat, TangentSpaceNormalMap } from "three";
import { CONFIGTYPE } from "../constants/configType";
export const getMaterialConfig = function () {
    return {
        vid: '',
        type: 'Material',
        alphaTest: 0,
        colorWrite: true,
        depthTest: true,
        depthWrite: true,
        format: RGBAFormat,
        fog: true,
        name: '',
        needsUpdate: false,
        opacity: 1,
        dithering: false,
        shadowSide: null,
        side: FrontSide,
        toneMapped: true,
        transparent: false,
        visible: true
    };
};
export const getMeshStandardMaterialConfig = function () {
    return Object.assign(getMaterialConfig(), {
        type: CONFIGTYPE.MESHSTANDARDMATERIAL,
        aoMapIntensity: 1,
        bumpScale: 1,
        color: 'rgb(255, 255, 255)',
        displacementScale: 1,
        displacementBias: 0,
        emissive: 'rgb(0, 0, 0)',
        emissiveIntensity: 1,
        envMapIntensity: 1,
        flatShading: false,
        lightMapIntensity: 1,
        metalness: 0,
        normalMapType: TangentSpaceNormalMap,
        refractionRatio: 0.98,
        roughness: 1,
        wireframe: false,
        wireframeLinecap: 'round',
        wireframeLinejoin: 'round',
        roughnessMap: '',
        normalMap: '',
        metalnessMap: '',
        map: '',
        lightMap: '',
        envMap: '',
        emissiveMap: '',
        displacementMap: '',
        bumpMap: '',
        alphaMap: '',
        aoMap: ''
    });
};
export const getMeshPhongMaterialConfig = function () {
    return Object.assign(getMaterialConfig(), {
        type: CONFIGTYPE.MESHPHONGMATERIAL,
        aoMapIntensity: 1,
        bumpScale: 1,
        color: 'rgb(255, 255, 255)',
        displacementScale: 1,
        displacementBias: 0,
        emissive: 'rgb(0, 0, 0)',
        emissiveIntensity: 1,
        envMapIntensity: 1,
        flatShading: false,
        lightMapIntensity: 1,
        normalMapType: TangentSpaceNormalMap,
        refractionRatio: 0.98,
        wireframe: false,
        wireframeLinecap: 'round',
        wireframeLinejoin: 'round',
        specular: 'rgb(17, 17, 17)',
        shininess: 30,
        combine: MultiplyOperation,
        normalMap: '',
        map: '',
        lightMap: '',
        envMap: '',
        emissiveMap: '',
        displacementMap: '',
        bumpMap: '',
        alphaMap: '',
        aoMap: '',
        specularMap: ''
    });
};
export const getSpriteMaterialConfig = function () {
    return Object.assign(getMaterialConfig(), {
        type: CONFIGTYPE.SPRITEMATERIAL,
        color: 'rgb(255, 255, 255)',
        rotation: 0,
        map: '',
        alphaMap: '',
        sizeAttenuation: true
    });
};
export const getLineBasicMaterialConfig = function () {
    return Object.assign(getMaterialConfig(), {
        type: CONFIGTYPE.LINEBASICMATERIAL,
        color: 'rgb(255, 255, 255)',
        linecap: 'round',
        linejoin: 'round',
        linewidth: 1
    });
};
export const getPointsMaterialConfig = function () {
    return Object.assign(getMaterialConfig(), {
        type: CONFIGTYPE.POINTSMATERIAL,
        map: '',
        alphaMap: '',
        color: 'rgb(255, 255, 255)',
        sizeAttenuation: true,
        size: 1
    });
};
//# sourceMappingURL=MaterialConfig.js.map