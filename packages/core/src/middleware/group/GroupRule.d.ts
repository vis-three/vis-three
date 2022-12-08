import { Group } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { GroupCompiler } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";
export type GroupRule = ObjectRule<GroupCompiler, GroupConfig, Group>;
export declare const GroupRule: GroupRule;
