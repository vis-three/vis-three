import { ColorRepresentation, PointLight } from "three";
import { VisLightDataConfig } from "../VisLight";
import { VisObject3DAttribute } from "../VisObject";
export interface VisPointLightParameters {
    color?: ColorRepresentation;
    intensity?: number;
    distance?: number;
    decay?: number;
}
export declare class VisPointLight extends PointLight implements VisObject3DAttribute {
    vid: string;
    constructor(parameters?: VisPointLightParameters);
}
export interface VisPointLightDataConfig extends VisLightDataConfig {
    color: string;
    intensity: number;
    distance: number;
    decay: number;
}
export declare const getDataConfig: () => VisPointLightDataConfig;
//# sourceMappingURL=VisPointLight.d.ts.map