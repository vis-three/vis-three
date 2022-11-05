import { validate } from "uuid";
import { ProxyNotice } from "../../core/DataContainer";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
import { RendererCompiler } from "./RendererCompiler";

export const RendererRule: Rule<RendererCompiler> = function (
  input: ProxyNotice,
  compiler: RendererCompiler
) {
  Rule(input, compiler, (vid) => {
    return (
      validate(vid) ||
      [CONFIGTYPE.WEBGLRENDERER, CONFIGTYPE.CSS3DRENDERER].includes(
        vid as CONFIGTYPE
      )
    );
  });
};
