import { Scene } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { CONFIGTYPE } from "../constants/configType";
import { ObjectRule } from "../object/ObjectRule";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";

export type SceneRule = ObjectRule<
  SceneCompiler,
  SceneConfig,
  SceneCompilerTarget,
  Scene
>;

export const SceneRule: SceneRule = function (
  input: ProxyNotice,
  compiler: SceneCompiler
) {
  const { operate, key, path, value } = input;

  let vid = key;

  const tempPath = ([] as string[]).concat(path);
  if (path.length) {
    vid = tempPath.shift()!;
  }

  if (!validate(vid) && vid !== CONFIGTYPE.SCENE) {
    console.warn(`${compiler.MODULE} Rule: vid is illeage: ${vid}`);
    return;
  }

  if (operate === "add" && !tempPath.length) {
    compiler.add(value);
    return;
  }

  if (input.operate === "delete" && !tempPath.length) {
    compiler.remove(value);
    return;
  }

  if (input.operate === "set" && !tempPath.length && !key) {
    compiler.cover(value);
    return;
  }

  compiler.compile(vid, { operate, key, path: tempPath, value });
};
