import { Group } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupCompiler } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";
import { GroupRule } from "./GroupRule";

export class GroupDataSupport extends ObjectDataSupport<
  GroupConfig,
  Group,
  GroupCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.GROUP;

  constructor(data?: CompilerTarget<GroupConfig>, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(GroupRule, data, ignore);
  }
}
