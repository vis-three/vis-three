import JSONHandler from "./JSONHandler";
import { v4 } from "uuid";
import { SymbolConfig } from "../common";
import { EngineSupportLoadOptions } from "../engine";
import { LoadOptions } from "../plugin/DataSupportManagerPlugin";

export interface CloneResult {
  config: EngineSupportLoadOptions;
  detail: Record<string, string>;
}

/**
 * 克隆整个配置单
 * @param object EngineSupportLoadOptions
 * @param options 额外选项
 * - detail:bolean 返回clone映射
 * - fillName 是否填充未命名的单位
 * @returns EngineSupportLoadOptions | CloneResult
 */
export const clone = (
  object: EngineSupportLoadOptions,
  options: {
    detail?: boolean;
    fillName?: boolean | ((SymbolConfig) => string);
  } = {}
): EngineSupportLoadOptions | CloneResult => {
  let jsonObject = JSON.stringify(object, JSONHandler.stringify);
  const detail: Record<string, string> = {};

  const modulekeys = Object.keys(object).filter(
    (module) => module !== "assets"
  );
  // 遍历所有的vid替换新的vid
  for (const modulekey of modulekeys) {
    for (const config of object[modulekey]) {
      const vid = config.vid;
      const newVid = v4();
      jsonObject = jsonObject.replace(new RegExp(vid, "g"), newVid);
      if (options.detail) {
        detail[vid] = newVid;
      }
    }
  }

  const newConfig = JSON.parse(jsonObject, JSONHandler.parse);

  if (options.fillName) {
    if (typeof options.fillName === "function") {
      for (const modulekey of modulekeys) {
        for (const config of newConfig[modulekey]) {
          if (!config.name) {
            config.name = options.fillName(config);
          }
        }
      }
    } else {
      for (const modulekey of modulekeys) {
        for (const config of newConfig[modulekey]) {
          if (!config.name) {
            config.name = `${config.type}-${config.vid.slice(-2)}`;
          }
        }
      }
    }
  }

  return options.detail ? { config: newConfig, detail } : newConfig;
};

/**
 * 对配置单中的每个配置项做处理
 * @param object
 * @param handler
 * @param options
 */
export const handler = (
  object: EngineSupportLoadOptions,
  handler: (config: SymbolConfig) => SymbolConfig,
  options: {
    clone?: boolean;
    assets?: boolean;
  } = {
    clone: true,
    assets: false,
  }
) => {
  const config = options.clone ? JSONHandler.clone(object) : object;

  const modulekeys = options.assets
    ? Object.keys(config)
    : Object.keys(config).filter((module) => module !== "assets");

  for (const modulekey of modulekeys) {
    const module = config[modulekey];
    module.forEach((elem, i, arr) => {
      arr[i] = handler(elem);
    });
  }

  return config;
};

export const planish = function (
  configs: LoadOptions
): Record<string, SymbolConfig> {
  const result = {};

  for (const module of Object.keys(configs)) {
    for (const config of configs[module]) {
      result[config.name] = config;
    }
  }

  return result;
};

export default {
  clone,
  handler,
  planish,
};
