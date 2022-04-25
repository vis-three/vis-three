import { Group } from "three";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";
export interface GroupCompilerTarget extends ObjectCompilerTarget<GroupConfig> {
    [key: string]: GroupConfig;
}
export declare class GroupCompiler extends ObjectCompiler<GroupConfig, GroupCompilerTarget, Group> {
    COMPILER_NAME: string;
    constructor();
    add(vid: string, config: GroupConfig): this;
    dispose(): this;
}
