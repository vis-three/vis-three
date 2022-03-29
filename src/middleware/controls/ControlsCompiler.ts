import { Camera } from "three"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import { Compiler, CompilerTarget } from "../../core/Compiler"
import { getTransformControlsConfig, TransformControlsConfig } from "./ControlsConfig"


export interface ControlsCompilerTarget extends CompilerTarget {
  [key: string]: TransformControlsConfig
}

export interface ControlsCompilerParameters {
  target?: ControlsCompilerTarget
  transformControls?: TransformControls
}

export class ControlsCompiler extends Compiler {

  private target!: ControlsCompilerTarget
  private transformControls!: TransformControls

  constructor (parameters?: ControlsCompilerParameters) {
    super()
    if (parameters) {
      parameters.target && (this.target = parameters.target)
      parameters.transformControls && (this.transformControls = parameters.transformControls)
    } else {
      this.target = {
        TransformControls: getTransformControlsConfig()
      }
      this.transformControls = new TransformControls(new Camera())
    }
  }

  set (type: string, path: string[], key: string, value: any): this {
    if (type === 'TransformControls') {
      const controls = this.transformControls

      const filterMap = {
        translationSnap: true,
        rotationSnap: true,
        scaleSnap: true
      }

      if (filterMap[key]) {
        return this
      }

      if (key === 'snapAllow') {
        const config = this.target['TransformControls']
        if (value) {
          controls.translationSnap = config.translationSnap
          controls.rotationSnap = config.rotationSnap
          // @ts-ignore types 没写 源码有这个属性
          controls.scaleSnap = config.scaleSnap
        } else {
          controls.translationSnap = null
          controls.rotationSnap = null
          // @ts-ignore types 没写 源码有这个属性
          controls.scaleSnap = null
        }
        return this
      }


      
      controls[key] = value
    } else {
      console.warn(`controls compiler can not support this controls: '${type}'`)
      return this
    }
    return this
  }

  setTarget(target: ControlsCompilerTarget): this {
    this.target = target
    return this
  }

  compileAll(): this {
    return this
  }

  dispose(parameter: unknown): this {
    return this
  }
}