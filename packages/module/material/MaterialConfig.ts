import { SymbolConfig, Vector2Config } from "@vis-three/middleware";
import {
  AddEquation,
  Blending,
  FrontSide,
  MultiplyOperation,
  NormalBlending,
  OneMinusSrcAlphaFactor,
  SrcAlphaFactor,
  TangentSpaceNormalMap,
} from "three";
export interface MaterialConfig extends SymbolConfig {
  alphaTest: number;
  colorWrite: boolean;
  depthTest: boolean;
  depthWrite: boolean;
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
  blendDst: number;
  blendDstAlpha: number | null;
  blendEquation: number;
  blendEquationAlpha: number | null;
  blending: Blending;
  blendSrc: number;
  blendSrcAlpha: number | null;

  polygonOffset: boolean;
  polygonOffsetFactor: number;
  polygonOffsetUnits: number;
}

export interface MeshBasicMaterialConfig extends MaterialConfig {
  color: string;
  combine: number;
  aoMapIntensity: number;
  fog: boolean;
  lightMapIntensity: number;
  reflectivity: number;
  refractionRatio: number;
  wireframe: boolean;
  wireframeLinecap: string;
  wireframeLinejoin: string;
  wireframeLinewidth: number;

  map: string;
  envMap: string;
  alphaMap: string;
  aoMap: string;
  lightMap: string;
  specularMap: string;
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

export interface ShaderMaterialConfig extends MaterialConfig {
  shader: string;
  uniforms: { [key: string]: any };
}

export interface MeshPhysicalMaterialConfig extends MeshStandardMaterialConfig {
  attenuationColor: string;
  attenuationDistance: number;
  clearcoat: number;
  clearcoatNormalScale: Vector2Config;
  clearcoatRoughness: number;
  ior: number;
  reflectivity: number;
  sheen: number;
  sheenRoughness: number;
  sheenColor: string;
  specularIntensity: number;
  specularColor: string;
  thickness: number;
  transmission: number;

  clearcoatMap: string;
  clearcoatNormalMap: string;
  clearcoatRoughnessMap: string;
  sheenRoughnessMap: string;
  sheenColorMap: string;
  specularIntensityMap: string;
  specularColorMap: string;
  thicknessMap: string;
  transmissionMap: string;
}

// TODO:
export interface LoadMaterialConfig extends MaterialConfig {
  url: string;
}

export type MaterialAllType =
  | MeshBasicMaterialConfig
  | MeshStandardMaterialConfig
  | MeshPhongMaterialConfig
  | LineBasicMaterialConfig
  | SpriteMaterialConfig
  | PointsMaterialConfig
  | ShaderMaterialConfig
  | MeshPhysicalMaterialConfig;

export const getMaterialConfig = function (): MaterialConfig {
  return {
    vid: "",
    type: "Material",
    alphaTest: 0,
    colorWrite: true,
    depthTest: true,
    depthWrite: true,
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
    blendDst: OneMinusSrcAlphaFactor,
    blendDstAlpha: null,
    blendEquation: AddEquation,
    blendEquationAlpha: null,
    blending: NormalBlending,
    blendSrc: SrcAlphaFactor,
    blendSrcAlpha: null,

    polygonOffset: false,
    polygonOffsetFactor: 0,
    polygonOffsetUnits: 0,
  };
};

export const getMeshBasicMaterialConfig = function (): MeshBasicMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    color: "rgb(255, 255, 255)",
    combine: MultiplyOperation,
    aoMapIntensity: 1,
    fog: true,
    lightMapIntensity: 1,
    reflectivity: 1,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 1,

    map: "",
    envMap: "",
    alphaMap: "",
    aoMap: "",
    lightMap: "",
    specularMap: "",
  });
};

export const getMeshStandardMaterialConfig =
  function (): MeshStandardMaterialConfig {
    return Object.assign(getMaterialConfig(), {
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

export const getMeshPhysicalMaterialConfig =
  function (): MeshPhysicalMaterialConfig {
    return Object.assign(getMeshStandardMaterialConfig(), {
      attenuationColor: "rgb(255, 255, 255)",
      attenuationDistance: 0,
      clearcoat: 0.0,
      clearcoatNormalScale: {
        x: 1,
        y: 1,
      },
      clearcoatRoughness: 0,
      ior: 1.5,
      reflectivity: 0.5,
      sheen: 0.0,
      sheenRoughness: 1.0,
      sheenColor: "rgb(255, 255, 255)",
      specularIntensity: 0.0,
      specularColor: "rgb(255, 255, 255)",
      thickness: 0,
      transmission: 0,

      clearcoatMap: "",
      clearcoatNormalMap: "",
      clearcoatRoughnessMap: "",
      sheenRoughnessMap: "",
      sheenColorMap: "",
      specularIntensityMap: "",
      specularColorMap: "",
      thicknessMap: "",
      transmissionMap: "",
    });
  };

export const getMeshPhongMaterialConfig = function (): MeshPhongMaterialConfig {
  return Object.assign(getMaterialConfig(), {
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
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: true,
  });
};

export const getLineBasicMaterialConfig = function (): LineBasicMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    color: "rgb(255, 255, 255)",
    linecap: "round",
    linejoin: "round",
    linewidth: 1,
  });
};

export const getPointsMaterialConfig = function (): PointsMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    map: "",
    alphaMap: "",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: true,
    size: 1,
  });
};

export const getShaderMaterialConfig = function (): ShaderMaterialConfig {
  return Object.assign(getMaterialConfig(), {
    shader: "defaultShader",
    uniforms: {},
  });
};
