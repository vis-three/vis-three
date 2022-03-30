import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Process, Processor } from "../../core/Processor";
import { OrbitControlsConfig } from "./ControlsConfig";

export interface ProcessAssemble {
  control: OrbitControls
  config: OrbitControlsConfig
}

export class OrbitControlsProcessor implements Processor {

  private config?: OrbitControlsConfig
  private control?: OrbitControls
  private assembly: boolean = false

  constructor () {}

  assemble(params: ProcessAssemble): this {
    this.config = params.config
    this.control = params.control
    this.assembly = true
    return this
  }

  process (params: Process): this {
    if (!this.assembly) {
      console.warn(`OrbitControls Processor unassembled`)
      return this
    }
    this.merge(params.key, params.value)
    return this
  }

  processAll (): this {
    if (!this.assembly) {
      console.warn(`OrbitControls Processor unassembled`)
      return this
    }
    const control = this.control!
    const config = this.config!
    for (let key of Object.keys(config)) {
      control[key] !== undefined && (control[key] = config[key])
    }

    return this
  }

  dispose(): this {
    this.config = undefined
    this.control = undefined
    this.assembly = false
    return this
  }


  private merge (key: string, value: any): boolean {
    this.control![key] = value
    return true
  }
}