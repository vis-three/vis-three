import { stringify } from "../convenient/JSONHandler"
import { MODULETYPE } from "../middleware/constants/MODULETYPE"
import { Compiler, CompilerTarget } from "./Compiler"
import { ProxyBroadcast, ProxyEvent } from "./ProxyBroadcast"
import { Rule } from "./Rule"
import { Translater } from "./Translater"

export abstract class DataSupport<D extends CompilerTarget, C extends Compiler> {

  abstract MODULE: MODULETYPE

  private data: D
  private broadcast: ProxyBroadcast
  private translater: Translater<C>
  constructor (rule: Rule<C>, data: D) {
    this.translater = new Translater<C>().setRule(rule)
    this.broadcast = new ProxyBroadcast()
    this.data = this.broadcast.proxyExtends<D>(data)

    this.broadcast.addEventListener('broadcast', (event: ProxyEvent) => {
      this.translater.translate(event.notice)
    })
  }

  getData (): D {
    return this.data
  }

  setData (data: D): this {
    this.data = data
    return this
  }

  proxyData (data: D): D {
    this.data = this.broadcast.proxyExtends<D>(data)
    return this.data
  }

  existSymbol (vid: string): boolean {
    return Boolean(this.data[vid])
  }
  
  addConfig (config: valueOf<D>): this {
    this.data[config.vid as keyof D] = config
    return this
  }

  getConfig (vid: string) {
    return this.data[vid]
  }

  removeConfig (vid: string) {
    const data = this.data
    data[vid] !== undefined && (delete data[vid])
  }

  addCompiler (compiler: C): this {
    compiler.setTarget(this.data)
    compiler.compileAll()
    this.translater.apply(compiler)
    return this
  }

  toJSON (): string {
    return JSON.stringify(this.data, stringify)
  }

  load (config: D): this {
    const data = this.data
    for (const key in config) {
      data[key] = config[key]
    }
    return this
  }

  remove (config: D): this {
    const data = this.data
    for (const key in config) {
      data[key] !== undefined && (delete data[key])
    }
    return this
  }

  getModule(): MODULETYPE {
    return this.MODULE
  }
}