import { BufferGeometry, Group, Material } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  ObjectCompiler,
  ObjectCompilerParameters,
  ObjectCompilerTarget,
} from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";

export interface GroupCompilerTarget extends ObjectCompilerTarget<GroupConfig> {
  [key: string]: GroupConfig;
}

export type GroupCompilerParameters = ObjectCompilerParameters<
  GroupConfig,
  GroupCompilerTarget
>;

export class GroupCompiler extends ObjectCompiler<
  GroupConfig,
  GroupCompilerTarget,
  Group
> {
  COMPILER_NAME: string = MODULETYPE.GROUP;

  private replaceMaterial = new Material();
  private replaceGeometry = new BufferGeometry();

  private filterAttribute: { [key: string]: boolean };

  constructor(parameters?: GroupCompilerParameters) {
    super(parameters);

    this.filterAttribute = {
      lookAt: true,
      children: true,
    };
  }

  getReplaceMaterial(): Material {
    console.warn(`GroupCompiler: can not use material in GroupCompiler.`);
    return this.replaceMaterial;
  }

  getReplaceGeometry(): BufferGeometry {
    console.warn(`GroupCompiler: can not use geometry in GroupCompiler.`);
    return this.replaceGeometry;
  }

  add(vid: string, config: GroupConfig): this {
    const group = new Group();
    Compiler.applyConfig(config, group, this.filterAttribute);

    this.map.set(vid, group);
    this.weakMap.set(group, vid);
    this.scene.add(group);

    for (const target of config.children) {
      this.addChildren(vid, target);
    }

    this.setLookAt(vid, config.lookAt);
    return this;
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(
        `GroupCompiler: can not found this vid mapping object: '${vid}'`
      );
      return this;
    }

    if (key === "lookAt") {
      this.setLookAt(vid, value);
      return this;
    }

    let object = this.map.get(vid)!;

    for (const key of path) {
      if (this.filterAttribute[key]) {
        return this;
      }
      object = object[key];
    }

    object[key] = value;

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

    group.attach(targetObject);

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
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
