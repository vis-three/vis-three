import { GroupCompiler } from "./GroupCompiler";
import GroupProcessor from "./GroupProcessor";
import { GroupRule } from "./GroupRule";
export default {
    type: "group",
    object: true,
    compiler: GroupCompiler,
    rule: GroupRule,
    processors: [GroupProcessor],
};
