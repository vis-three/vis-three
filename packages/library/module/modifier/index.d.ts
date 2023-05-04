import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ModifierCompiler } from "./ModifierCompiler";
export * from "./ModifierCompiler";
export * from "./ModifierConfig";
declare const _default: {
    type: string;
    compiler: typeof ModifierCompiler;
    rule: import("@vis-three/middleware").Rule<ModifierCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./ModifierConfig").BooleanModifierConfig, import("@vis-three/library-modifier").BooleanModifier, import("@vis-three/middleware").EngineSupport, ModifierCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
