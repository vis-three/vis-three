import { OBJECT_MODULE } from "../module";
import { Trigger } from "./Trigger";

export const ObjectTrigger = new Trigger((module: string) => {
  return Boolean(OBJECT_MODULE[module]);
});

export { Trigger };
