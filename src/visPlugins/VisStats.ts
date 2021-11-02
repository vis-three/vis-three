import Stats from 'three/examples/jsm/libs/stats.module'
import { VisRenderFun } from '../visCore/VisEngine'

export interface VisStatsParameter {
  mode: number
  top: number
  left: number
  bottom: number
  right: number
}

export class VisStats {

  private stats: Stats
  public domElement: HTMLElement
  public renderFun: VisRenderFun

  constructor (parameter?: VisStatsParameter) {
    this.stats = Stats()
    
    const dom = this.stats.domElement

    dom.style.position = 'absolute'
    dom.style.top = '0'
    dom.style.left = '35px'

    if (parameter) {
      dom.style.top = `${parameter.top}px`
      dom.style.left = `${parameter.left}px`
      dom.style.right = `${parameter.right}px`
      dom.style.bottom = `${parameter.bottom}px`
    }
    
    this.domElement = dom

    this.renderFun = () => {this.stats.update()}
  }

  update (): void {
    this.stats.update()
  }

}