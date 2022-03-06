import { Group } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { GroupCompiler, GroupCompilerTarget } from "./GroupCompiler";
import { GroupConfig } from "./GroupConfig";

export type GroupRule = ObjectRule<
  GroupCompiler,
  GroupConfig,
  GroupCompilerTarget,
  Group
>

export const GroupRule: GroupRule = function (input: ProxyNotice, compiler: GroupCompiler) {
  
  const {operate, key, path, value} = input

  console.log(input)
  
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
      console.warn(`model rule vid is illeage: '${vid}'`)
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