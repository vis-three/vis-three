import { BufferGeometry, Group, Material } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { GroupConfig } from "./GroupConfig";

export interface GroupCompilerTarget extends ObjectCompilerTarget<GroupConfig> {
  [key: string]: GroupConfig
}

export interface GroupCompilerParameters extends ObjectCompilerParameters<GroupConfig, GroupCompilerTarget> {}

export class GroupCompiler extends ObjectCompiler<GroupConfig, GroupCompilerTarget, Group> {
  COMPILER_NAME: string = MODULETYPE.GROUP

  private replaceMaterial = new Material()
  private replaceGeometry = new BufferGeometry()

  getReplaceMaterial (): Material {
    console.warn(`LightCompiler: can not use material in LightCompiler.`)
    return this.replaceMaterial
  }

  getReplaceGeometry (): BufferGeometry {
    console.warn(`LightCompiler: can not use geometry in LightCompiler.`)
    return this.replaceGeometry
  }

  add(vid: string, config: GroupConfig): this {
    return this    
  }

  set(vid: string, path: string[], key: string, value: any): this {
      return this
  }

  dispose (): this {
    super.dispose()
    this.replaceGeometry.dispose()
    this.replaceMaterial.dispose()
    return this
  }

}