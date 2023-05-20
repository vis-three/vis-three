import { validate } from "uuid";
import { BasicCompiler } from "../compiler";
import { ProxyNotice } from "../dataContainer";

export type Rule<C extends BasicCompiler> = (
  input: ProxyNotice,
  output: C,
  validateFun?: (key: string) => boolean
) => void;

export const Rule: Rule<BasicCompiler> = (
  input: ProxyNotice,
  compiler: BasicCompiler,
  validateFun = validate
) => {
  const { operate, key, path, value } = input;
  let vid = key;

  const tempPath = path.split(".");

  if (tempPath.length) {
    vid = tempPath.shift()!;
  }

  if (!validateFun(vid)) {
    console.warn(`${compiler.MODULE} Rule: vid is illeage: ${vid}`);
    return;
  }

  if (operate === "add" && !tempPath.length && vid === key) {
    compiler.add(value);
    return;
  }

  if (input.operate === "delete" && !tempPath.length) {
    compiler.remove(value);
    return;
  }

  if (input.operate === "set" && !tempPath.length && key === vid) {
    compiler.cover(value);
    return;
  }

  compiler.compile(vid, { operate, key, path: tempPath, value });
};
