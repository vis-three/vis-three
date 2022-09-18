import { EngineSupportLoadOptions } from "../engine/EngineSupport";
import JSONHandler from "./JSONHandler";
import { v4 } from "uuid";

export interface CloneResult {
  config: EngineSupportLoadOptions;
  detail: Record<string, string>;
}

/**
 * 克隆整个配置单
 * @param object EngineSupportLoadOptions
 * @param options .detail:bolean -> 返回clone映射
 * @returns EngineSupportLoadOptions | CloneResult
 */
export const clone = (
  object: EngineSupportLoadOptions,
  options: {
    detail?: boolean;
    fillName?: boolean | ((SymbolConfig) => string);
  }
): EngineSupportLoadOptions | CloneResult => {
  let jsonObject = JSON.stringify(object, JSONHandler.stringify);
  const detail: Record<string, string> = {};

  const modulekeys = Object.keys(object).filter(
    (module) => module !== "assets"
  );
  // 遍历所有的vid替换新的vid
  for (const modulekey of modulekeys) {
    for (const vid of Object.keys(object[modulekey])) {
      const newVid = v4();
      jsonObject = jsonObject.replace(new RegExp(vid, "g"), newVid);
      if (options.detail) {
        detail[vid] = newVid;
      }
    }
  }

  const config = JSON.parse(jsonObject, JSONHandler.parse);

  if (options.fillName) {
    if (typeof options.fillName === "function") {
      for (const modulekey of modulekeys) {
        for (const vid of Object.keys(config[modulekey])) {
          const objectConfig = config[modulekey][vid];
          if (!objectConfig.name) {
            objectConfig.name = options.fillName(objectConfig);
          }
        }
      }
    } else {
      for (const modulekey of modulekeys) {
        for (const vid of Object.keys(config[modulekey])) {
          const objectConfig = config[modulekey][vid];
          if (!objectConfig.name) {
            objectConfig.name = `${objectConfig.type}-${vid.slice(-2)}`;
          }
        }
      }
    }
  }

  return options.detail ? { config, detail } : config;
};

export default {
  clone,
};
