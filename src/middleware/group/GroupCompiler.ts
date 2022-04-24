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
  COMPILER_NAME: string = MODULETYPE.GROUP;

  constructor() {
    super();
  }

  add(vid: string, config: GroupConfig): this {
    const group = new Group();

    this.map.set(vid, group);
    this.weakMap.set(group, vid);

    for (const target of config.children) {
      this.addChildren(vid, target);
    }

    super.add(vid, config);
    return this;
  }

  addChildren(vid: string, target: string): this {
    if (!this.map.has(vid)) {
      console.warn(
        `GroupCompiler: can not found this vid in compiler: ${vid}.`
      );
      return this;
    }

    const group = this.map.get(vid)!;

    const targetObject = this.getObject(target);

    if (!targetObject) {
      console.warn(
        `GroupCompiler: can not found this vid in compiler: ${target}.`
      );
      return this;
    }

    group.add(targetObject);

    return this;
  }

  removeChildren(vid: string, target: string): this {
    if (!this.map.has(vid)) {
      console.warn(
        `GroupCompiler: can not found this vid in compiler: ${vid}.`
      );
      return this;
    }

    const group = this.map.get(vid)!;

    const targetObject = this.getObject(target);

    if (!targetObject) {
      console.warn(
        `GroupCompiler: can not found this vid in compiler: ${target}.`
      );
      return this;
    }

    group.remove(targetObject);
    return this;
  }

  dispose(): this {
    super.dispose();
    return this;
  }
}
