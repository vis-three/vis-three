import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { EventCompiler } from "./EventCompiler";

export const EventRule: Rule<EventCompiler> = function (notice: ProxyNotice, compiler: EventCompiler) {

  const {operate, key, path, value} = notice

  if (operate === 'add') {
    if (validate(key)) {
      compiler.add(key, value)
    }
    return
  }

  
}