import { ProxyNotice } from "../module";
import { Group } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { GroupCompiler } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";

export type GroupRule = ObjectRule<GroupCompiler, GroupConfig, Group>;

export const GroupRule: GroupRule = function (
  notice: ProxyNotice,
  compiler: GroupCompiler
) {
  ObjectRule(notice, compiler);
};
