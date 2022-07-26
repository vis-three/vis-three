import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import GroupProcessor from "./GroupProcessor";
export class GroupCompiler extends ObjectCompiler {
    MODULE = MODULETYPE.GROUP;
    constructor() {
        super();
    }
}
Compiler.processor(GroupProcessor);
//# sourceMappingURL=GroupCompiler.js.map