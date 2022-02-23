import { Engine } from "../engine/Engine";
import { Plugin } from "./plugin";
import { VisStats, VisStatsParameters } from '../optimize/VisStats'

export const StatsPlugin: Plugin<VisStatsParameters> = function (this: Engine, params: VisStatsParameters): boolean {
  if (this.stats) {
    console.warn('this has installed stats plugin.')
    return false
  }

  if (!this.renderManager) {
    console.warn('this must install renderManager before install stats plugin.')
    return false
  }

  const stats = new VisStats(params)

  this.stats = stats

  this.setStats = function (show: boolean): Engine {
    if (show) {
      this.dom!.appendChild(this.stats!.domElement)
    } else {
      try {
        this.dom!.removeChild(this.stats!.domElement)
      } catch (error) {
        
      }
    }
    return this
  }
  
  this.renderManager.addEventListener('render', () => {
    this.stats!.update()
  })

  return true
}