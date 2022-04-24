import { ObjectEvent } from "../../manager/EventManager";
import {
  BasicObjectCompiler,
  EventHandler,
} from "../../middleware/object/ObjectCompiler";
import { OpenWindow } from "./configure";

export const openWindow: EventHandler<OpenWindow> = function (
  compiler: BasicObjectCompiler,
  config: OpenWindow
): (event?: ObjectEvent) => void {
  return () => {
    window.open(config.params.url);
  };
};
