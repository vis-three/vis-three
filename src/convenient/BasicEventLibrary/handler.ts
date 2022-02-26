import { ObjectEvent } from "../../manager/EventManager";
import { EventCompiler, EventHandler } from "../../middleware/event/EventCompiler";
import { OpenWindow } from "./configure";
import * as Entity from './entity'

export const openWindow: EventHandler<OpenWindow> = function (compiler: EventCompiler, config: OpenWindow): (event?: ObjectEvent) => void {
  return () => {
    Entity.openWindow(config.params.url)
  }
}  