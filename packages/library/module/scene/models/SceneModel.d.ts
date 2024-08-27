import { SceneConfig } from "../SceneConfig";
import { Scene } from "three";
import { EngineSupport } from "@vis-three/tdcm";
import { SceneEngineSupport } from "../SceneExtend";
declare const _default: import("@vis-three/tdcm").ModelOption<SceneConfig, Scene, import("@vis-three/module-object").ObjectModelContext, import("@vis-three/module-object").ObjectModelShared & {
    setBackground: (scene: Scene, value: string | null, engine: EngineSupport) => void;
    setEnvironment: (scene: Scene, value: string | null, engine: EngineSupport) => void;
}, SceneEngineSupport, import("@vis-three/tdcm").Compiler<SceneEngineSupport>>;
export default _default;
