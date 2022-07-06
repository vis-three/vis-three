import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { AnimationCompiler } from "./AnimationCompiler";

export const AnimationRule: Rule<AnimationCompiler> = function (
  notice: ProxyNotice,
  compiler: AnimationCompiler
) {
  const { operate, key, path, value } = notice;

  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    } else {
      console.warn(`animation rule vid is illeage: '${key}'`);
    }
    return;
  }

  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift();
    if (vid && validate(vid)) {
      compiler.update(vid, tempPath, key, value);
    } else {
      console.warn(`animation rule vid is illeage: '${vid}'`);
    }
    return;
  }

  if (
    operate === "delete" ||
    (operate === "set" && key === "play" && value === "false")
  ) {
    if (validate(key)) {
      compiler.remove(value);
    } else {
      console.warn(`animation rule vid is illeage: '${key}'`);
    }
    return;
  }
};
