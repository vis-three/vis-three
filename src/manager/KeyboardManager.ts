import { EventDispatcher } from "../core/EventDispatcher"
import keyboardjs, { KeyEvent } from "keyboardjs"

export interface KeyboardEntity {
  shortcutKey: string[],
  desp: string
  keydown?: (event?: KeyEvent) => void
  keyup?: (event?: KeyEvent) => void
}

export class KeyboardManager extends EventDispatcher {

  private map = new Map()

  constructor () {
    super()
  }

  private generateSymbol (entity: KeyboardEntity | string[]): string {
    if (Array.isArray(entity)) {
      return entity.join(" + ")
    }
    return entity.shortcutKey.join(" + ")
  }

  register(entity: KeyboardEntity): this {
    const symbol = this.generateSymbol(entity)
    if (this.map.has(symbol)) {
      console.warn(`KeyboardManager: shortcutKey already exist: ${symbol}. desp: ${this.map.get(symbol)!.desp}`)
      return this
    }

    keyboardjs.bind(symbol, entity.keydown || null, entity.keyup)
    this.map.set(symbol, entity)

    return this
  }

  update(entity: KeyboardEntity): this {
    const symbol = this.generateSymbol(entity)
    if (!this.map.has(symbol)) {
      console.warn(`KeyboardManager: shortcutKey unregister then exec register function`)
      this.register(entity)
      return this
    }

    this.cancel(entity.shortcutKey)
    this.register(entity)
    return this
  }

  cancel(keyArray: string[]): this {
    const symbol = this.generateSymbol(keyArray)

    if (this.map.has(symbol)) {
      const entity = this.map.get(symbol)!
      keyboardjs.unbind(symbol, entity.keydown || null, entity.keyup)
      this.map.delete(symbol)
    }
    
    return this
  }

  checkRepeat(keyArray: string[]): boolean {
    const symbol = this.generateSymbol(keyArray)
    return this.map.has(symbol)
  }
}