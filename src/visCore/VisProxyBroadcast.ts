import { BaseEvent, EventDispatcher } from "three"
import { isValidKey } from "../utils/utils"

export interface VisProxyNotice {
  operate: 'add' | 'set' | 'delete'
  path: Array<string>
  key: string
  value: any
}

export interface VisProxyEvent extends BaseEvent {
  notice: VisProxyNotice
}

export class VisProxyBroadcast extends EventDispatcher<VisProxyEvent> {
  static proxyWeakSet = new WeakSet()

  constructor () {
    super()
  }

  // 代理拓展
  proxyExtends<T extends object> (object: T, path?: Array<string>): T {
    if (!path) {
      path = []
    }

    if (VisProxyBroadcast.proxyWeakSet.has(object) || (typeof object !== 'object' && object !== null)) {
      return object
    }

    const self = this

    const handler: ProxyHandler<object> = {
      get (target: object, key: any) {
        return Reflect.get(target, key)
      },

      set (target: object, key: any, value: any) {

        // 新增
        if (target[key as never] === undefined) {
          // 如果是对象就递归
          if (typeof value === 'object' && value !== null) {
            const newPath = path!.concat([key])
            value = self.proxyExtends(value, newPath)
          }

          self.broadcast({
            operate: 'add',
            path: path!.concat([]),
            key,
            value
          })
        // 设置值
        } else {
          // 如果是对象就递归
          if (typeof value === 'object' && !VisProxyBroadcast.proxyWeakSet.has(object)) {
            const newPath = path!.concat([key])
            value = self.proxyExtends(value, newPath)
          }
          self.broadcast({
            operate: 'set',
            path: path!.concat([]),
            key,
            value: value
          })
        }

        return Reflect.set(target, key, value)
      },

      deleteProperty (target: object, key: any) {
        self.broadcast({
          operate: 'delete',
          path: path!.concat([]),
          key,
          value: ''
        })
        return Reflect.deleteProperty(target, key)
      }
    }

    // 递归整个对象进行代理拓展
    if (typeof object === 'object' && object !== null) {
      for (const key in object) {
        const tempPath = path!.concat([key])
        if (isValidKey(key, object) && typeof object[key] === 'object' && object[key] !== null) {
          object[key] = this.proxyExtends(object[key], tempPath) as never
        }
      }
    }

    return new Proxy(object, handler) as T
  }

  // 广播
  broadcast({ operate, path, key, value }: VisProxyNotice): this {
    // 过滤
    const filterMap = {
      __poto__: true,
      length: true
    }

    if ( isValidKey(key, filterMap) && filterMap[key]) {
      return this
    }
    
    this.dispatchEvent({
      type: 'broadcast',
      notice: { operate, path, key, value }
    })

    return this
  }

}