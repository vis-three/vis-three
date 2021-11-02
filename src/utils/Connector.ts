import { isValidKey } from "./utils";

export class Connector {
  constructor () {}

  apply (target: Object, params: Array<string>): void {
    params.forEach(key => {
      if (isValidKey(key, target)) {
        if (typeof target[key] === 'function') {
          Object.defineProperty(this, key, {
            value: (target[key] as Function).bind(target),
            configurable: false
          })
        } else if (typeof target[key] === 'string' || typeof target[key] === 'number') {
          Object.defineProperty(this, key, {
            value: target[key],
            configurable: false
          })
        }
      }
    })
  }
}