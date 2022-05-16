import { Group } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { GroupCompiler, GroupCompilerTarget } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";
export declare type GroupRule = ObjectRule<GroupCompiler, GroupConfig, GroupCompilerTarget, Group>;
export declare const GroupRule: GroupRule;
