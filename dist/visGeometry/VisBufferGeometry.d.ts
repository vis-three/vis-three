import { BufferGeometry } from "three";
import { VisCommonAttribute, VisVector3Config } from "../common";
export interface VisBufferGeometryConfig {
    type: string;
    position: VisVector3Config;
    rotation: VisVector3Config;
    scale: VisVector3Config;
}
export declare const getDataConfig: () => VisBufferGeometryConfig;
export interface VisBufferGeometryAttribute extends VisCommonAttribute {
}
export declare type VisBufferGeometry = BufferGeometry & VisBufferGeometryAttribute;
//# sourceMappingURL=VisBufferGeometry.d.ts.map