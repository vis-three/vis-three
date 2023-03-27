import { GroupCompiler } from "./GroupCompiler";
import { GroupRule } from "./GroupRule";
declare const _default: {
    type: string;
    object: boolean;
    compiler: typeof GroupCompiler;
    rule: GroupRule;
    processors: import("@vis-three/middleware").Processor<import("./GroupConfig").GroupConfig, import("three").Group, import("@vis-three/middleware").EngineSupport, GroupCompiler>[];
};
export default _default;
