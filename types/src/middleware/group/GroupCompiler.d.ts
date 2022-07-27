import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";
export declare class GroupCompiler extends ObjectCompiler<GroupConfig, Group> {
    MODULE: MODULETYPE;
    constructor();
}
