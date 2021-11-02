import { Object3D } from "three";
import { VisCommonAttribute, VisVector3Config } from "../common";
export interface VisObject3DAttribute extends VisCommonAttribute {
}
export declare type VisObject3D = VisObject3DAttribute & Object3D;
export interface VisObjectDataConfig {
    vid: string;
    type: string;
    castShadow: boolean;
    receiveShadow: boolean;
    lookAt: string;
    position: VisVector3Config;
    rotation: VisVector3Config;
    scale: VisVector3Config;
}
export declare const getDataConfig: () => VisObjectDataConfig;
//# sourceMappingURL=VisObject.d.ts.map