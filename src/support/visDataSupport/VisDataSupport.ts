
import { VisProxyBroadcast, VisProxyEvent } from '../../visCore/VisProxyBroadcast'
import { VisLightConfigType } from '../../visObject/VisLight'
import { VisLightCompiler, VisLightCompileTarget } from '../../visCompiler/VisLightCompiler'
import { VisCompiler, VisCompilerTarget } from '../../visCompiler/VisCompiler'
import { VisTranslater } from '../../visCore/VisTranslater'
import { VisRule } from '../../visRule/VisRule'

export class VisDataSupport<D extends VisCompilerTarget, C extends VisCompiler> {
  private data: D
  private broadcast: VisProxyBroadcast
  private translater: VisTranslater<C>
  constructor (rule: VisRule<C>, data: D) {
    this.translater = new VisTranslater<C>().setRule(rule)
    this.broadcast = new VisProxyBroadcast()
    this.data = this.broadcast.proxyExtends<D>(data)

    this.broadcast.addEventListener('broadcast', (event: VisProxyEvent) => {
      this.translater.translate(event.notice)
    })
  }

  getData (): D {
    return this.data
  }

  addCompiler (compiler: C): this {
    this.translater.apply(compiler)
    return this
  }
}