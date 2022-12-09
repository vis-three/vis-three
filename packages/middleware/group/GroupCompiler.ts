import { Group } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";
import GroupProcessor from "./GroupProcessor";

export class GroupCompiler extends ObjectCompiler<GroupConfig, Group> {
  MODULE: MODULETYPE = MODULETYPE.GROUP;

  constructor() {
    super();
  }
}

Compiler.processor(GroupProcessor);
