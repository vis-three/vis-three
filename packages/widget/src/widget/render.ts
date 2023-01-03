import { generateConfig } from "../../convenient/generateConfig";
import { EngineSupport } from "../../engine/EngineSupport";
import {
  BasicEventConfig,
  EventLibrary,
} from "../../library/event/EventLibrary";
import { LoadOptions } from "../../manager/DataSupportManager";
import { ObjectEvent } from "../../manager/EventManager";
import { SymbolConfig } from "../../middleware/common/CommonConfig";
import { CONFIGTYPE } from "../../middleware/constants/CONFIGTYPE";
import { isObject } from "../../utils/utils";
import { Watcher } from "./Watcher";

export const onComputed = function (fun: () => any) {
  return new Watcher(fun).token;
};

export const onEvent = function (fun: (event?: ObjectEvent) => void) {
  const config = { name: Symbol("VIS.RENDER.EVENT") };
  EventLibrary.register(config, () => fun);
  return config;
};

export const createElement = function (type: CONFIGTYPE, merge: any) {
  return generateConfig(type, merge, false, false);
};
