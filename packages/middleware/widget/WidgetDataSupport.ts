import { Group } from "three";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupCompiler } from "./WidgetCompiler";
import { GroupConfig } from "./WidgetConfig";
import { GroupRule } from "./WidgetRule";

export class GroupDataSupport extends ObjectDataSupport<
  GroupConfig,
  Group,
  GroupCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.GROUP;

  constructor(data: Array<GroupConfig> = []) {
    super(GroupRule, data);
  }
}
