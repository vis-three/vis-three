import { BaseEvent, EventDispatcher } from "./EventDispatcher"
import { isValidKey } from "../utils/utils"

export interface ProxyNotice {
  operate: 'add' | 'set' | 'delete'
  path: Array<string>
  key: string
  value: any
}

export interface ProxyEvent extends BaseEvent {
  notice: ProxyNotice
}

export class ProxyBroadcast extends EventDispatcher {
  static proxyWeakSet = new WeakSet()

  constructor () {
    super()
  }

  // 代理拓展
  proxyExtends<T extends object> (object: T, path?: Array<string>): T {
    if (!path) {
      path = []
    }

    if (ProxyBroadcast.proxyWeakSet.has(object) || (typeof object !== 'object' && object !== null)) {
      return object
    }

    const self = this

    const handler: ProxyHandler<object> = {
      get: (target: object, key: any) => {
        return Reflect.get(target, key)
      },

      set: (target: object, key: any, value: any) => {

        // 先执行反射
        let result: boolean

        // 新增
        if (target[key as never] === undefined) {
          
          // 如果是对象就递归
          if (typeof value === 'object' && value !== null && !ProxyBroadcast.proxyWeakSet.has(value)) {
            const newPath = path!.concat([key])
            value = this.proxyExtends(value, newPath)
          }

          result = Reflect.set(target, key, value)

          this.broadcast({
            operate: 'add',
            path: path!.concat([]),
            key,
            value
          })
        // 设置值
        } else {
          // 如果是对象就递归
          if (typeof value === 'object' && value !== null && !ProxyBroadcast.proxyWeakSet.has(value)) {
            const newPath = path!.concat([key])
            value = this.proxyExtends(value, newPath)
          }

          result = Reflect.set(target, key, value)

          this.broadcast({
            operate: 'set',
            path: path!.concat([]),
            key,
            value: value
          })
        }

        return result
      },

      deleteProperty: (target: object, key: any) => {
        // 先执行反射
        const result = Reflect.deleteProperty(target, key)

        this.broadcast({
          operate: 'delete',
          path: path!.concat([]),
          key,
          value: ''
        })
        return result
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

    const proxy = new Proxy(object, handler) as T

    ProxyBroadcast.proxyWeakSet.add(proxy)

    return proxy
  }

  // 广播
  broadcast({ operate, path, key, value }: ProxyNotice): this {
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