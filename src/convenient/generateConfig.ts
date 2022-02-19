import { getConfigFunctionMap } from "../utils/utils"

const typeMap: {[key: string]: Function} = getConfigFunctionMap()

export const generateConfig = function<C> (type: string, merge?: object, warn?: boolean): C | null {
  if (typeMap[type]) {
    const recursion = (config: C, merge: object) => {
      for (const key in merge) {
        if (config[key] === undefined) {
          warn && console.warn(`'${type}' config can not set key: ${key}`)
          continue
        }
        if (typeof merge[key] === 'object' && merge[key] !== null) {
          recursion(config[key], merge[key])
        } else {
          config[key] = merge[key]
        }
      }
    }
    const initConfig = typeMap[type]()
    merge && recursion(initConfig, merge)
    return initConfig

  } else {
    console.error(`type: ${type} can not be found in configList.`)
    return null
  }
}