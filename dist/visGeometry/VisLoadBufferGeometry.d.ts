import { BufferGeometry } from "three";
import { VisBufferGeometryConfig, VisBufferGeometryAttribute } from "./VisBufferGeometry";
export interface VisLoadBufferGeometryParameters {
    url: string;
    path: string;
    geometry: BufferGeometry | null;
}
export interface VisLoadBufferGeometryConfig extends VisBufferGeometryConfig, VisLoadBufferGeometryParameters {
}
export declare const getDataConfig: () => VisLoadBufferGeometryConfig;
export declare class VisLoadBufferGeometry extends BufferGeometry implements VisBufferGeometryAttribute {
    vid: string;
    constructor(parameters?: VisLoadBufferGeometryParameters);
}
//# sourceMappingURL=VisLoadBufferGeometry.d.ts.map