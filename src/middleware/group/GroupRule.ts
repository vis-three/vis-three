import { Group } from "three";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { GroupCompiler, GroupCompilerTarget } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";

export type GroupRule = ObjectRule<
  GroupCompiler,
  GroupConfig,
  GroupCompilerTarget,
  Group
>;

export const GroupRule: GroupRule = function (
  notice: ProxyNotice,
  compiler: GroupCompiler
) {
  ObjectRule(notice, compiler);
};
