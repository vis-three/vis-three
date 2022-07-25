import { Group } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";
import GroupProcessor from "./GroupProcessor";

export interface GroupCompilerTarget
  extends ObjectCompilerTarget<GroupConfig> {}

export class GroupCompiler extends ObjectCompiler<
  GroupConfig,
  GroupCompilerTarget,
  Group
> {
  MODULE: MODULETYPE = MODULETYPE.GROUP;

  constructor() {
    super();
  }
}

Compiler.processor(GroupProcessor);
