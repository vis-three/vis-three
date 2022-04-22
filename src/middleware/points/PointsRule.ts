import { Points } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";

export type PointsRule = SolidObjectRule<
  PointsCompiler,
  PointsConfig,
  PointsCompilerTarget,
  Points
>;

export const PointsRule: PointsRule = function (
  notice: ProxyNotice,
  compiler: PointsCompiler
) {
  const { operate, key, path, value } = notice;

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
