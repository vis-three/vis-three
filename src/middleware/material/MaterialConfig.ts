import {
  FrontSide,
  MultiplyOperation,
  RGBAFormat,
  TangentSpaceNormalMap,
} from "three";
import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
export interface MaterialConfig extends SymbolConfig {
  alphaTest: number;
  colorWrite: boolean;
  depthTest: boolean;
  depthWrite: boolean;
  format: number;
  fog: boolean;
  name: string;
  needsUpdate: boolean;
  opacity: number;
  dithering: boolean;
  shadowSide: number | null;
  side: number;
  toneMapped: boolean;
  transparent: boolean;
  visible: boolean;
}

export interface MeshStandardMaterialConfig extends MaterialConfig {
  aoMapIntensity: number;
  bumpScale: number;
  color: string;
  displacementScale: number;
  displacementBias: number;
  emissive: string;
  emissiveIntensity: number;
  envMapIntensity: number;
  flatShading: boolean;
  lightMapIntensity: number;
  metalness: number;
  normalMapType: number;
  refractionRatio: number;
  roughness: number;
  wireframe: boolean;
  wireframeLinecap: string;
  wireframeLinejoin: string;

  roughnessMap: string;
  normalMap: string;
  metalnessMap: string;
  map: string;
  lightMap: string;
  envMap: string;
  emissiveMap: string;
  displacementMap: string;
  bumpMap: string;
  alphaMap: string;
  aoMap: string;
}

export interface MeshPhongMaterialConfig extends MaterialConfig {
  aoMapIntensity: number;
  bumpScale: number;
  color: string;
  displacementScale: number;
  displacementBias: number;
  emissive: string;
  emissiveIntensity: number;
  flatShading: boolean;
  lightMapIntensity: number;
  normalMapType: number;
  refractionRatio: number;
  wireframe: boolean;
  wireframeLinecap: string;
  wireframeLinejoin: string;
  specular: string;
  shininess: number;
  combine: number;

  normalMap: string;
  map: string;
  lightMap: string;
  envMap: string;
  emissiveMap: string;
  displacementMap: string;
  bumpMap: string;
  alphaMap: string;
  aoMap: string;
  specularMap: string;
}

export interface SpriteMaterialConfig extends MaterialConfig {
  color: string;
  rotation: number;
  map: string;
  alphaMap: string;
  sizeAttenuation: boolean;
}

export interface LineBasicMaterialConfig extends MaterialConfig {
  color: string;
  linecap: string;
  linejoin: string;
  linewidth: number; // webgl limit always 1, use line2
}

export interface PointsMaterialConfig extends MaterialConfig {
  alphaMap: string;
  color: string;
  map: string;
  size: number;
  sizeAttenuation: boolean;
}

export type MaterialAllType =
  | MeshStandardMaterialConfig
  | MeshPhongMaterialConfig
  | LineBasicMaterialConfig
  | SpriteMaterialConfig
  | PointsMaterialConfig;

export const getMaterialConfig = function (): MaterialConfig {
  return {
    vid: "",
    type: "Material",
    alphaTest: 0,
    colorWrite: true,
    depthTest: true,
    depthWrite: true,
    format: RGBAFormat,
    fog: true,
    name: "",
    needsUpdate: false,
    opacity: 1,
    dithering: false,
    shadowSide: null,
    side: FrontSide,
    toneMapped: true,
    transparent: false,
    visible: true,
  };
};

export const getMeshStandardMaterialConfig =
  function (): MeshStandardMaterialConfig {
    return Object.assign(getMaterialConfig(), {
      type: CONFIGTYPE.MESHSTANDARDMATERIAL,
      aoMapIntensity: 1,
      bumpScale: 1,
      color: "rgb(255, 255, 255)",
      displacementScale: 1,
      displacementBias: 0,
      emissive: "rgb(0, 0, 0)",
      emissiveIntensity: 1,
      envMapIntensity: 1,
      flatShading: false,
      lightMapIntensity: 1,
      metalness: 0,
      normalMapType: TangentSpaceNormalMap,
      refractionRatio: 0.98,
      roughness: 1,
      wireframe: false,
      wireframeLinecap: "round",
      wireframeLinejoin: "round",

      roughnessMap: "",
      normalMap: "",
      metalnessMap: "",
      map: "",
      lightMap: "",
      envMap: "",
      emissiveMap: "",
      displacementMap: "",
      bumpMap: "",
      alphaMap: "",
      aoMap: "",
    });
  };

export const getMeshPhongMaterialConfig = function (): MeshPhongMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.MESHPHONGMATERIAL,
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    specular: "rgb(17, 17, 17)",
    shininess: 30,
    combine: MultiplyOperation,

    normalMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: "",
    specularMap: "",
  });
};

export const getSpriteMaterialConfig = function (): SpriteMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.SPRITEMATERIAL,
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: true,
  });
};

export const getLineBasicMaterialConfig = function (): LineBasicMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.LINEBASICMATERIAL,
    color: "rgb(255, 255, 255)",
    linecap: "round",
    linejoin: "round",
    linewidth: 1,
  });
};

export const getPointsMaterialConfig = function (): PointsMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    type: CONFIGTYPE.POINTSMATERIAL,
    map: "",
    alphaMap: "",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: true,
    size: 1,
  });
};
