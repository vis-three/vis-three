import { BaseEvent, EventDispatcher } from "three";
import { VisCompiler } from "../visCompiler/VisCompiler";
import { VisRule } from "../visRule/VisRule";
import { VisProxyNotice } from "./VisProxyBroadcast";

export class VisTranslater< C extends VisCompiler > {
  private rule: VisRule<C>
  private memberSet: Set<C>
  
  constructor () {
    this.rule = function () {}
    this.memberSet = new Set()
  }

  apply (compiler: C): this {
    this.memberSet.add(compiler)
    return this
  }

  cancel (compiler: C): this {
    this.memberSet.delete(compiler)
    return this
  }

  setRule (rule: VisRule<C>): this {
    this.rule = rule
    return this
  }

  translate (notice: VisProxyNotice): this {
    const rule = this.rule
    this.memberSet.forEach(compiler => {
      rule(notice, compiler)
    })
    return this
  }
}