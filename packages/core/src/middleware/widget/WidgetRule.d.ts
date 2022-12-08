import { Group } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { GroupCompiler } from "./WidgetCompiler";
import { GroupConfig } from "./WidgetConfig";
export type GroupRule = ObjectRule<GroupCompiler, GroupConfig, Group>;
export declare const GroupRule: GroupRule;
