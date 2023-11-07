import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ConstraintorCompiler } from "./ConstraintorCompiler";
declare const _default: {
    type: string;
    compiler: typeof ConstraintorCompiler;
    rule: import("@vis-three/middleware").Rule<ConstraintorCompiler>;
    processors: import("@vis-three/middleware").Processor<import("./ConstraintorConfig").NumberConstraintorConfig, import("@vis-three/library-constraintor").NumberConstraintor, import("@vis-three/middleware").EngineSupport, ConstraintorCompiler>[];
    lifeOrder: SUPPORT_LIFE_CYCLE;
};
export default _default;
