import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupCompiler } from "./WidgetCompiler";
import { GroupConfig } from "./WidgetConfig";
export declare class GroupDataSupport extends ObjectDataSupport<GroupConfig, Group, GroupCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<GroupConfig>);
}
