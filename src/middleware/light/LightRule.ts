import { Light } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { ObjectRule } from "../object/ObjectRule";
import { LightCompiler, LightCompilerTarget } from "./LightCompiler";
import { LightConfigAllType } from "./LightConfig";

export type LightRule = ObjectRule<
  LightCompiler,
  LightConfigAllType,
  LightCompilerTarget,
  Light
>;

export const LightRule: LightRule = function (
  input: ProxyNotice,
  compiler: LightCompiler
) {
  const { operate, key, path, value } = input;

  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }

  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.set(vid, tempPath, key, value);
    } else {
      console.warn(`model rule vid is illeage: '${vid}'`);
    }
    return;
  }

  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
