import { MeshStandardMaterial, MeshStandardMaterialParameters } from "three";
import { VisVector2Config } from "../common";
import { VisMaterialAttribute, VisMaterialDataConfig } from "./VisMaterial";
export interface VisMeshStandardMaterialParameters extends MeshStandardMaterialParameters {
}
export declare class VisMeshStandardMaterial extends MeshStandardMaterial implements VisMaterialAttribute {
    vid: string;
    constructor(parameters?: VisMeshStandardMaterialParameters);
}
export interface VisMeshStandardMaterialDataConfig extends VisMaterialDataConfig {
    aoMapIntensity: number;
    bumpScale: number;
    color: string;
    displaceMentScale: number;
    displacementBias: number;
    emissive: string;
    emissiveIntensity: number;
    envMapIntensity: number;
    lightMapIntensity: number;
    metalness: number;
    normalMapType: number;
    normalScale: VisVector2Config;
    refractionRatio: number;
    roughness: number;
    wrieframe: boolean;
    wrieframeLinecap: string;
    wrieframeLinejoin: string;
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
export declare const getVisMeshStandardMaterialConfig: () => VisMeshStandardMaterialDataConfig;
//# sourceMappingURL=VisMeshStandardMaterial.d.ts.map