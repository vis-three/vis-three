import { OrthographicCameraConfig } from "../CameraConfig";
import { OrthographicCamera } from "three";
import { SetSizeEvent } from "@vis-three/core";
import { CameraEngineSupport } from "../CameraExtend";
declare const _default: import("@vis-three/tdcm").ModelOption<OrthographicCameraConfig, OrthographicCamera, import("@vis-three/module-object").ObjectModelContext & {
    updateFun: (event: SetSizeEvent) => void;
}, import("@vis-three/module-object").ObjectModelShared, CameraEngineSupport, import("@vis-three/tdcm").Compiler<CameraEngineSupport>>;
export default _default;
