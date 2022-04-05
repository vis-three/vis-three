import { getConfigFunctionMap } from "../utils/utils";
import { v4 as getUuid } from "uuid";

const typeMap: { [key: string]: Function } = getConfigFunctionMap();

export const generateConfig = function <C>(
  type: string,
  merge?: object,
  strict = true,
  warn = true
): C | null {
  if (typeMap[type]) {
    const recursion = (config: C, merge: object) => {
      for (const key in merge) {
        if (config[key] === undefined) {
          !strict && (config[key] = merge[key]); // 允许额外配置
          strict &&
            warn &&
            console.warn(`'${type}' config can not set key: ${key}`);
          continue;
        }
        if (
          typeof merge[key] === "object" &&
          merge[key] !== null &&
          !Array.isArray(merge[key])
        ) {
          recursion(config[key], merge[key]);
        } else {
          config[key] = merge[key];
        }
      }
    };
    const initConfig = typeMap[type]();
    // 自动生成uuid
    if (initConfig.vid === "") {
      initConfig.vid = getUuid();
    }
    merge && recursion(initConfig, merge);
    return initConfig;
  } else {
    console.error(`type: ${type} can not be found in configList.`);
    return null;
  }
};
