import { Light } from "three";
import { VisPointLightDataConfig } from "./visLight/VisPointLight";
import { VisSpotLightDataConfig } from "./visLight/VisSpotLight";
import { VisObject3D, VisObjectDataConfig } from "./VisObject";

export type VisLight = VisObject3D & Light

export interface VisLightDataConfig extends VisObjectDataConfig {

}

export type VisLightConfigType = VisPointLightDataConfig | VisSpotLightDataConfig