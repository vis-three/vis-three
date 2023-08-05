import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { CameraCompiler } from "./CameraCompiler";
import CameraExtend from "./CameraExtend";
import { CameraRule } from "./CameraRule";
export * from "./CameraConfig";
export * from "./CameraCompiler";
export { CameraEngineSupport } from "./CameraExtend";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof CameraCompiler;
    rule: CameraRule;
    processors: (import("@vis-three/middleware").Processor<import("./CameraConfig").OrthographicCameraConfig, import("three").OrthographicCamera, import("@vis-three/middleware").EngineSupport, CameraCompiler> | import("@vis-three/middleware").Processor<import("./CameraConfig").PerspectiveCameraConfig, import("three").PerspectiveCamera, import("@vis-three/middleware").EngineSupport, CameraCompiler>)[];
    extend: typeof CameraExtend;
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
