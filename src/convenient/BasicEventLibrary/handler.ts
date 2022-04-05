import { ObjectEvent } from "../../manager/EventManager";
import {
  EventCompiler,
  EventHandler,
} from "../../middleware/event/EventCompiler";
import { OpenWindow } from "./configure";

export const openWindow: EventHandler<OpenWindow> = function (
  compiler: EventCompiler,
  config: OpenWindow
): (event?: ObjectEvent) => void {
  return () => {
    window.open(config.params.url);
  };
};
