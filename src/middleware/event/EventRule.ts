import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { EVENTNAME } from "../../manager/EventManager";
import { isValidEnum, isValidKey } from "../../utils/utils";
import { EventCompiler } from "./EventCompiler";

export const EventRule: Rule<EventCompiler> = function (notice: ProxyNotice, compiler: EventCompiler) {

  const {operate, key, path, value} = notice

  console.log(notice)
  if (operate === 'add') {
    // 新增配置
    if (validate(key) && !path.length) {
      compiler.add(key, value)
    } else {
      if (Number.isInteger(Number(key)) && path.length === 2) {
        const [vid, eventName] = path

        if (!validate(vid)) {
          console.warn(`EventRule: vid is illeage: ${vid}`)
          return
        }

        if (!isValidEnum(EVENTNAME, eventName)) {
          console.warn(`EventRule: eventName is not support: ${eventName}`)
          return
        }
        // 增加事件
        compiler.addEvent(vid, eventName as EVENTNAME, value)
      }
    }
    return
  }

  
}