import { Vector3Config } from "../middleware/common/CommonConfig";
import { Plugin } from "./plugin";
export interface DisplayModeParameters {
    mode?: DISPLAYMODE;
    overrideColor?: string;
    defaultAmbientLightSetting?: {
        color?: string;
        intensity?: number;
    };
    defaultDirectionalLightSetting?: {
        color?: string;
        intensity?: number;
        position?: Vector3Config;
    };
}
export declare enum DISPLAYMODE {
    GEOMETRY = "geometry",
    MATERIAL = "material",
    LIGHT = "light",
    ENV = "env"
}
export declare const DisplayModelPlugin: Plugin<DisplayModeParameters>;
