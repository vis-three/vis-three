import { ColorRepresentation, SpotLight } from "three";
import { VisLightDataConfig } from "../VisLight";
import { VisObject3DAttribute } from "../VisObject";
export interface VisSpotLightParameters {
    color?: ColorRepresentation;
    intensity?: number;
    distance?: number;
    angle?: number;
    penumbra?: number;
    decay?: number;
}
export declare class VisSpotLight extends SpotLight implements VisObject3DAttribute {
    vid: string;
    constructor(parameters?: VisSpotLightParameters);
}
export interface VisSpotLightDataConfig extends VisLightDataConfig {
    color: string;
    intensity: number;
    distance: number;
    decay: number;
    angle: number;
    penumbra: number;
}
export declare const getDataConfig: () => VisSpotLightDataConfig;
//# sourceMappingURL=VisSpotLight.d.ts.map