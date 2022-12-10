import { ProxyNotice, Rule } from "@vis-three/core";
import { validate } from "uuid";
import { uniqueSymbol } from "../common";
import { CONFIGTYPE } from "../constants/configType";
import { RendererCompiler } from "./RendererCompiler";

const uniqueList = [
  uniqueSymbol(CONFIGTYPE.WEBGLRENDERER),
  uniqueSymbol(CONFIGTYPE.CSS3DRENDERER),
];

export const RendererRule: Rule<RendererCompiler> = function (
  input: ProxyNotice,
  compiler: RendererCompiler
) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || uniqueList.includes(vid as CONFIGTYPE);
  });
};
