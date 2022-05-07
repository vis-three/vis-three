import { Group } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupCompiler, GroupCompilerTarget } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";
import { GroupRule } from "./GroupRule";

export class GroupDataSupport extends ObjectDataSupport<
  GroupRule,
  GroupCompiler,
  GroupConfig,
  GroupCompilerTarget,
  Group
> {
  MODULE: MODULETYPE = MODULETYPE.GROUP;

  constructor(data?: GroupCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(GroupRule, data, ignore);
  }
}
