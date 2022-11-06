import { generateConfig } from "../../convenient/generateConfig";
import { EngineSupport } from "../../engine/EngineSupport";
import {
  BasicEventConfig,
  EventLibrary,
} from "../../library/event/EventLibrary";
import { ObjectEvent } from "../../manager/EventManager";
import { CONFIGTYPE } from "../../middleware/constants/configType";
import { isObject } from "../../utils/utils";
import { Watcher } from "./Watcher";

export const onComputed = function (fun: () => any) {
  return new Watcher(fun);
};

export const onEvent = function (fun: (event?: ObjectEvent) => void) {
  const config = { name: Symbol("VIS.RENDER.EVENT") };
  EventLibrary.register(config, () => fun);
  return config;
};

export const createElement = function (type: CONFIGTYPE, merge: any) {
  const recursion = (object: object) => {
    for (const key in object) {
      if (isObject(object[key]) && !(object[key] instanceof Watcher)) {
        recursion(object[key]);
      } else {
        if (object[key] instanceof Watcher) {
          object[key] = object[key].token;
        }
      }
    }
  };

  recursion(merge);

  return generateConfig(type, merge, false, false);
};
