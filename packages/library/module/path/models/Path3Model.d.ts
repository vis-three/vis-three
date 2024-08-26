import { Curve, CurvePath, Vector3 } from "three";
import { PathConfig, SegmentConfig } from "../PathConfig";
declare const _default: import("@vis-three/tdcm").ModelOption<PathConfig, CurvePath<Vector3>, {}, {
    getCurveExtrPoint: (curve: SegmentConfig, extr: "start" | "end") => {
        x: number;
        y: number;
        z: number;
    };
    generateCurve: (segment: SegmentConfig) => Curve<Vector3>;
    syncExtrParams: (config: SegmentConfig, params: number[], extr: "start" | "end") => void;
}, import("@vis-three/tdcm").EngineSupport, import("@vis-three/tdcm").Compiler<import("@vis-three/tdcm").EngineSupport>>;
export default _default;
