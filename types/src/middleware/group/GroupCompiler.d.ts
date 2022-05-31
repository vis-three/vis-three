import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";
export interface GroupCompilerTarget extends ObjectCompilerTarget<GroupConfig> {
    [key: string]: GroupConfig;
}
export declare class GroupCompiler extends ObjectCompiler<GroupConfig, GroupCompilerTarget, Group> {
    MODULE: MODULETYPE;
    constructor();
    add(vid: string, config: GroupConfig): this;
    dispose(): this;
}
