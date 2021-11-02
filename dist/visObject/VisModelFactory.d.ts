import { VisBufferGeometry } from "../visGeometry/VisBufferGeometry";
import { VisMaterial } from "../visMaterial/VisMaterial";
import { VisMesh } from "./VisMesh";
import { VisObjectDataConfig } from "./VisObject";
export declare enum VisModelMode {
    MESH = "mesh",
    LINE = "line",
    POINTS = "points"
}
export interface VisModelFactoryParameters {
    mode: VisModelMode;
    material: VisMaterial;
    geometry: VisBufferGeometry;
}
export declare const VisModelFactory: (parameters: VisModelFactoryParameters) => VisMesh | void;
export interface VisModelDataConfig extends VisObjectDataConfig {
    mode: VisModelMode;
    material: string;
    geometry: string;
}
export declare const getDataConfig: () => VisModelDataConfig;
//# sourceMappingURL=VisModelFactory.d.ts.map