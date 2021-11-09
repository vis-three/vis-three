import { ModelingEngine } from "../../main";
import { LightCompiler } from "../light/LightCompiler";
import { LightDataSupport } from "../light/LightDataSupport";

export interface ModelingEngineSupportParametets {
  dom?: HTMLElement
  lightDataSupport: LightDataSupport
}

export class ModelingEngineSupport extends ModelingEngine {
  private lightCompiler: LightCompiler
  constructor (parameters: ModelingEngineSupportParametets) {
    super(parameters.dom)

    this.lightCompiler = new LightCompiler({
      scene: this.scene,
      target: parameters.lightDataSupport.getData()
    })

    parameters.lightDataSupport.addCompiler(this.lightCompiler)
  }

}