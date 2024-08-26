import { Curve, Path, Vector2 } from "three";
import { PathConfig, SegmentConfig } from "../PathConfig";
declare const _default: import("@vis-three/tdcm").ModelOption<PathConfig, Path, {}, {
    getCurveExtrPoint: (curve: SegmentConfig, extr: "start" | "end") => {
        x: number;
        y: number;
    };
    generateCurve: (segment: SegmentConfig) => Curve<Vector2>;
    syncExtrParams: (config: SegmentConfig, params: number[], extr: "start" | "end") => void;
}, import("@vis-three/tdcm").EngineSupport, import("@vis-three/tdcm").Compiler<import("@vis-three/tdcm").EngineSupport>>;
export default _default;
