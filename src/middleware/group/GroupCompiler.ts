import { Group } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";

export interface GroupCompilerTarget extends ObjectCompilerTarget<GroupConfig> {
  [key: string]: GroupConfig;
}

export class GroupCompiler extends ObjectCompiler<
  GroupConfig,
  GroupCompilerTarget,
  Group
> {
  MODULE: MODULETYPE = MODULETYPE.GROUP;

  constructor() {
    super();
  }

  add(vid: string, config: GroupConfig): this {
    const group = new Group();

    this.map.set(vid, group);
    this.weakMap.set(group, vid);

    super.add(vid, config);
    return this;
  }

  dispose(): this {
    super.dispose();
    return this;
  }
}
