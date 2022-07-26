import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
import { ControlsCompiler } from "./ControlsCompiler";

export const ControlsRule: Rule<ControlsCompiler> = function (
  input: ProxyNotice,
  compiler: ControlsCompiler
) {
  const { operate, key, path, value } = input;

  let vid = key;

  const tempPath = ([] as string[]).concat(path);
  if (path.length) {
    vid = tempPath.shift()!;
  }

  if (
    !validate(vid) &&
    ![CONFIGTYPE.ORBITCONTROLS, CONFIGTYPE.TRNASFORMCONTROLS].includes(
      <CONFIGTYPE>vid
    )
  ) {
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
