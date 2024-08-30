import { EngineSupport, RenderEvent } from "@vis-three/tdcm";
import { ScriptAnimationConfig } from "../AnimationConfig";
declare const _default: import("@vis-three/tdcm").ModelOption<ScriptAnimationConfig, (event: RenderEvent) => void, {}, {
    eventSymbol: string;
    createFunction: (config: ScriptAnimationConfig, engine: EngineSupport) => (event: RenderEvent) => void;
    restoreAttribute: (config: ScriptAnimationConfig, engine: EngineSupport) => void;
}, EngineSupport, import("@vis-three/tdcm").Compiler<EngineSupport>>;
export default _default;
