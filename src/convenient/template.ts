import { EngineSupportLoadOptions } from "../engine/EngineSupport";
import JSONHandler from "./JSONHandler";
import { v4 } from "uuid";

export const clone = (
  object: EngineSupportLoadOptions,
  options: {}
): EngineSupportLoadOptions => {
  let jsonObject = JSON.stringify(object, JSONHandler.stringify);
  const modulekeys = Object.keys(object).filter(
    (module) => module !== "assets"
  );
  // 遍历所有的vid替换新的vid
  for (const modulekey of modulekeys) {
    for (const vid of Object.keys(object[modulekey])) {
      jsonObject = jsonObject.replace(new RegExp(vid, "g"), v4());
    }
  }

  return JSON.parse(jsonObject, JSONHandler.parse);
};

export default {
  clone,
};
