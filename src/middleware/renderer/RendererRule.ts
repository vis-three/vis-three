import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
import { RendererCompiler } from "./RendererCompiler";

export const RendererRule: Rule<RendererCompiler> = function (
  input: ProxyNotice,
  compiler: RendererCompiler
) {
  const { operate, key, path, value } = input;

  if (operate === "add") {
    compiler.add(value);
    return;
  }

  if (operate === "set") {
    if (key === CONFIGTYPE.WEBGLRENDERER) {
      compiler.add(value);
      return;
    }

    let vid = key;
    if (path.length) {
      vid = path[0];
    }

    if (validate(vid) || vid === CONFIGTYPE.WEBGLRENDERER) {
      compiler.assembly(vid, (processer) => {
        processer.process({
          path: path.concat([]),
          key,
          value,
        });
      });
    } else {
      console.warn(`renderer rule can not support this vid: ${vid}`);
    }

    return;
  }
};
