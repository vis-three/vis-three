import { Compiler } from "@vis-three/core";
import { Group } from "three";
import { MODULETYPE } from "../constants";
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
