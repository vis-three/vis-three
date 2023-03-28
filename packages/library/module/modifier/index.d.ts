import { ModifierCompiler } from "./ModifierCompiler";
declare const _default: {
    type: string;
    compiler: typeof ModifierCompiler;
    rule: import("@vis-three/middleware").Rule<ModifierCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./ModifierConfig").BooleanModifierConfig, import("@vis-three/library-modifier").BooleanModifier, import("@vis-three/middleware").EngineSupport, ModifierCompiler>[];
};
export default _default;
