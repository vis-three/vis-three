import { Group } from "three";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";

export class GroupCompiler extends ObjectCompiler<GroupConfig, Group> {
  constructor() {
    super();
  }
}
