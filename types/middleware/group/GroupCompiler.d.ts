import { Group } from "three";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";
export interface GroupCompilerTarget extends ObjectCompilerTarget<GroupConfig> {
    [key: string]: GroupConfig;
}
export declare type GroupCompilerParameters = ObjectCompilerParameters<GroupConfig, GroupCompilerTarget>;
export declare class GroupCompiler extends ObjectCompiler<GroupConfig, GroupCompilerTarget, Group> {
    COMPILER_NAME: string;
    private filterAttribute;
    constructor(parameters?: GroupCompilerParameters);
    add(vid: string, config: GroupConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    addChildren(vid: string, target: string): this;
    removeChildren(vid: string, target: string): this;
    dispose(): this;
}
