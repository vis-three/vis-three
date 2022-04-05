import { Camera } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { CameraCompiler, CameraCompilerTarget } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";

export type CameraRule = ObjectRule<
  CameraCompiler,
  CameraConfigAllType,
  CameraCompilerTarget,
  Camera
>;
export const CameraRule: CameraRule = function (
  notice: ProxyNotice,
  compiler: CameraCompiler
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
      console.warn(`camera rule vid is illeage: '${vid}'`);
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
