import { validate } from "uuid";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { Compiler, CompilerTarget } from "./Compiler";
import { ProxyNotice } from "./ProxyBroadcast";

type BasicCompiler = Compiler<
  SymbolConfig,
  CompilerTarget<SymbolConfig>,
  object
>;

export type Rule<C extends BasicCompiler> = (
  input: ProxyNotice,
  output: C
) => void;

export const Rule: Rule<BasicCompiler> = (
  input: ProxyNotice,
  compiler: BasicCompiler
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
