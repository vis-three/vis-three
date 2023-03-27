import { ObjectCompiler } from "@vis-three/module-object";
import { Group } from "three";
import { GroupConfig } from "./GroupConfig";

export class GroupCompiler extends ObjectCompiler<GroupConfig, Group> {
  constructor() {
    super();
  }
}
