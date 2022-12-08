import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupCompiler } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";
export declare class GroupDataSupport extends ObjectDataSupport<GroupConfig, Group, GroupCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<GroupConfig>);
}
