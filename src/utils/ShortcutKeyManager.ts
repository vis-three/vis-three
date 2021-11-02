import keyboardjs from "keyboardjs"

export interface ShortcutKeyParams {
  desp: string,
  keyCombine: string[]
  downFun: keyboardjs.Callback,
  upFun: keyboardjs.Callback,
  preventRepeatByDefault?: boolean
}

// 快捷键管理器ex
export class ShortcutKeyManager {
  private shortcutKeyMap: Map<string, string>
  constructor () {
    this.shortcutKeyMap = new Map()
  }

  apply(params: ShortcutKeyParams): this {
    const keyCombine = params.keyCombine.join(' + ')
    if (this.shortcutKeyMap.has(keyCombine)) {
      console.warn(`ShortcutKeyManager has already apply this key combine:  ${keyCombine}, if this operate are you want, you can use replace function.`)
      return this
    }

    keyboardjs.bind(
      keyCombine,
      params.downFun,
      params.upFun,
      params.preventRepeatByDefault
    )
    this.shortcutKeyMap.set(keyCombine, params.desp)

    return this
  }

  replace (params: ShortcutKeyParams): this {
    const keyCombine = params.keyCombine.join(' + ')
    if (!this.shortcutKeyMap.has(keyCombine)) {
      console.warn(`ShortcutKeyManager can not found this key combine: ${keyCombine}, but we will always help you apply.`)
      this.apply(params)
    }

    keyboardjs.unbind(keyCombine)
    this.apply(params)

    return this
  }
}