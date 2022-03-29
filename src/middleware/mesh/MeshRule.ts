import { Mesh } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { MeshCompiler, MeshCompilerTarget } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";

export type MeshRule = ObjectRule<
  MeshCompiler,
  MeshConfig,
  MeshCompilerTarget,
  Mesh
>

export const MeshRule: MeshRule = function (notice: ProxyNotice, compiler: MeshCompiler) {
  const {operate, key, path, value} = notice

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
    return
  }
  
  if (operate === 'set') {
    const tempPath = path.concat([])
    const vid = tempPath.shift()
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value)
    } else {
      console.warn(`Mesh rule vid is illeage: '${vid}'`)
    }
    return
  }

  if (operate === 'delete') {
    if (validate(key)) {
      compiler.remove(key)
    }
    return
  }
}