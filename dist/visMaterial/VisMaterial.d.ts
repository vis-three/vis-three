import { Material } from "three";
import { VisCommonAttribute } from "../common";
export interface VisMaterialAttribute extends VisCommonAttribute {
}
export declare type VisMaterial = Material & VisMaterialAttribute;
export interface VisMaterialDataConfig {
    type: string;
    alphaTest: number;
    colorWrite: boolean;
    depthTest: boolean;
    depthWrite: boolean;
    fog: boolean;
    opacity: number;
    shadowSide: number | null;
    side: number;
    toneMapped: boolean;
    transparent: boolean;
    vertexColors: boolean;
}
export declare const getVisMaterialConfig: () => VisMaterialDataConfig;
//# sourceMappingURL=VisMaterial.d.ts.map