import { Group } from "three";
import { ProxyNotice } from "../../core/DataContainer";
import { ObjectRule } from "../object/ObjectRule";
import { GroupCompiler } from "./WidgetCompiler";
import { GroupConfig } from "./WidgetConfig";

export type GroupRule = ObjectRule<GroupCompiler, GroupConfig, Group>;

export const GroupRule: GroupRule = function (
  notice: ProxyNotice,
  compiler: GroupCompiler
) {
  ObjectRule(notice, compiler);
};
