import { CameraCompiler } from "./CameraCompiler";
import { CameraRule } from "./CameraRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof CameraCompiler;
    rule: CameraRule;
    processors: (import("@vis-three/middleware").Processor<import("./CameraConfig").OrthographicCameraConfig, import("three").OrthographicCamera, import("@vis-three/middleware").EngineSupport, CameraCompiler> | import("@vis-three/middleware").Processor<import("./CameraConfig").PerspectiveCameraConfig, import("three").PerspectiveCamera, import("@vis-three/middleware").EngineSupport, CameraCompiler>)[];
};
export default _default;
