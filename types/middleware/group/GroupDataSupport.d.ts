import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupCompiler, GroupCompilerTarget } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";
import { GroupRule } from "./GroupRule";
export declare class GroupDataSupport extends ObjectDataSupport<GroupRule, GroupCompiler, GroupConfig, GroupCompilerTarget, Group> {
    MODULE: MODULETYPE;
    constructor(data?: GroupCompilerTarget);
}
