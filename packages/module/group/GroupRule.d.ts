import { ObjectRule } from "@vis-three/module-object";
import { Group } from "three";
import { GroupCompiler } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";
export type GroupRule = ObjectRule<GroupCompiler, GroupConfig, Group>;
export declare const GroupRule: GroupRule;
