import { EngineSupport } from "@vis-three/tdcm";
import { BooleanModifierConfig } from "../ModifierConfig";
import { BooleanModifier } from "@vis-three/library-modifier";
import { ModifierCompiler } from "../ModifierCompiler";
declare const _default: import("@vis-three/tdcm").ModelOption<BooleanModifierConfig, BooleanModifier, {
    renderFun: () => void;
    cacheTarget: object;
}, {
    modifyKey: string[];
}, EngineSupport, ModifierCompiler>;
export default _default;
