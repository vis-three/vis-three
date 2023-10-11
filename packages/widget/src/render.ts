import {
  EventGeneratorManager,
  ObjectEvent,
  generateConfig,
} from "@vis-three/middleware";
import { Watcher } from "./Watcher";

export const onComputed = function (fun: () => any) {
  return new Watcher(fun).token;
};

export const onEvent = function (fun: (event?: ObjectEvent) => void) {
  const config = { name: Symbol("VIS.RENDER.EVENT") };
  EventGeneratorManager.register({
    config,
    generator: () => fun,
  });
  return config;
};

export const createElement = function (type: string, merge: any) {
  return generateConfig(type, merge, {
    strict: false,
  });
};
