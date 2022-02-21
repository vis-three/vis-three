import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EventConfig } from "./eventConfig";

export interface EventCompilerTarget extends CompilerTarget {
  [key: string]: EventConfig
}

export interface EventCompilerParameters {
  target: EventCompilerTarget
}

export class EventCompiler extends Compiler {

  private target: EventCompilerTarget

  constructor (parameters?: EventCompilerParameters) {
    super()

    if (parameters) {
      this.target = parameters.target
    } else {
      this.target = {}
    }
  }

  add (vid: string, config: EventConfig): this {
    return this
  }

  remove (): this {
    return this
  }

  setTarget (target: EventCompilerTarget): this {
    this.target = target
    return this
  }
  
  compileAll (): this {
    const target = this.target
    for (const key in target) {
      this.add(key, target[key])
    }
    return this
  }

  dispose (): this {
    return this
  }
}