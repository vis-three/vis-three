import { generateConfig } from "../../convenient/generateConfig";
import { EngineSupport } from "../../engine/EngineSupport";
import {
  BasicEventConfig,
  EventLibrary,
} from "../../library/event/EventLibrary";
import { ObjectEvent } from "../../manager/EventManager";
import { CONFIGTYPE } from "../../middleware/constants/configType";

export class Updater {
  static map = new Map<Symbol, Updater>();

  run: () => any;
  token = Symbol("VIS.RENDER.UPDATE");

  constructor(fun: () => any) {
    this.run = fun;

    Updater.map.set(this.token, this);
  }
}

export const onComputed = function (fun: () => any) {
  return new Updater(fun);
};

export const onEvent = function (fun: (event?: ObjectEvent) => void) {
  const config = { name: Symbol("VIS.RENDER.EVENT") };
  EventLibrary.register(config, () => fun);
  return config;
};

export const createElement = function (type: CONFIGTYPE, merge: any) {
  const recursion = (object: object) => {
    for (const key in object) {
      if (
        typeof object[key] === "object" &&
        object[key] !== null &&
        !(object[key] instanceof Updater)
      ) {
        recursion(object[key]);
      } else {
        if (object[key] instanceof Updater) {
          object[key] = object[key].token;
        }
      }
    }
  };

  recursion(merge);

  return generateConfig(type, merge, false, false);
};
