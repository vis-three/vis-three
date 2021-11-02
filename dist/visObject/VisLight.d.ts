import { Light } from "three";
import { VisPointLightDataConfig } from "./visLight/VisPointLight";
import { VisSpotLightDataConfig } from "./visLight/VisSpotLight";
import { VisObject3D, VisObjectDataConfig } from "./VisObject";
export declare type VisLight = VisObject3D & Light;
export interface VisLightDataConfig extends VisObjectDataConfig {
}
export declare type VisLightConfigType = VisPointLightDataConfig | VisSpotLightDataConfig;
//# sourceMappingURL=VisLight.d.ts.map