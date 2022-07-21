import { validate } from "uuid";
import { Compiler, CompilerTarget } from "./Compiler";
import { ProxyNotice } from "./ProxyBroadcast";

export type Rule<C extends Compiler<CompilerTarget, object>> = (
  input: ProxyNotice,
  output: C
) => void;

export const Rule: Rule<Compiler<CompilerTarget, object>> = (
  input: ProxyNotice,
  compiler: Compiler<CompilerTarget, object>
) => {
  const { operate, key, path, value } = input;

  let vid = key;

  const tempPath = ([] as string[]).concat(path);
  if (path.length) {
    vid = tempPath.shift()!;
  }

  if (!validate(vid)) {
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
