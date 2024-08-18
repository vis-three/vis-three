import { PerspectiveCameraConfig } from "../CameraConfig";
import { PerspectiveCamera } from "three";
import { SetSizeEvent } from "@vis-three/core";
import { CameraEngineSupport } from "../CameraExtend";
declare const _default: import("@vis-three/tdcm").ModelOption<PerspectiveCameraConfig, PerspectiveCamera, import("@vis-three/module-object").ObjectModelContext & {
    updateFun: (event: SetSizeEvent) => void;
}, {}, CameraEngineSupport, import("@vis-three/tdcm").Compiler<CameraEngineSupport>>;
export default _default;
