import { ProxyNotice, Rule } from "@vis-three/middleware";
import { validate } from "uuid";
import { RendererCompiler } from "./RendererCompiler";

export const validSymbols: string[] = [];

export const RendererRule: Rule<RendererCompiler> = function (
  input: ProxyNotice,
  compiler: RendererCompiler
) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || validSymbols.includes(vid);
  });
};
