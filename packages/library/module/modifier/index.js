import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import BooleanModifierProcessor from "./BooleanModifierProcessor";
import { ModifierCompiler } from "./ModifierCompiler";
import { ModifierRule } from "./ModifierRule";
export default {
    type: "modifier",
    compiler: ModifierCompiler,
    rule: ModifierRule,
    processors: [BooleanModifierProcessor],
    lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
};
