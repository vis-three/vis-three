import { ModelingEngine } from "../../main";
import { GeometryCompiler } from "../geometry/GeometryCompiler";
import { GeometryDataSupport } from "../geometry/GeometryDataSupport";
import { LightCompiler } from "../light/LightCompiler";
import { LightDataSupport } from "../light/LightDataSupport";
import { ModelCompiler } from "../model/ModelCompiler";
import { ModelDataSupport } from "../model/ModelDataSupport";

export interface ModelingEngineSupportParametets {
  dom?: HTMLElement
  lightDataSupport: LightDataSupport,
  geometryDataSupport: GeometryDataSupport,
  modelDataSupport: ModelDataSupport
}

export class ModelingEngineSupport extends ModelingEngine {

  private lightCompiler: LightCompiler
  private modelCompiler: ModelCompiler
  private geometryCompiler: GeometryCompiler

  constructor (parameters: ModelingEngineSupportParametets) {
    super(parameters.dom)

    const lightCompiler = new LightCompiler({
      scene: this.scene,
      target: parameters.lightDataSupport.getData()
    })

    const geometryCompiler = new GeometryCompiler({
      target: parameters.geometryDataSupport.getData()
    })

    const modelCompiler = new ModelCompiler({
      scene: this.scene,
      target: parameters.modelDataSupport.getData()
    })

    // 建立编译器链接
    modelCompiler.linkGeometryMap(geometryCompiler.getMap())

    // 添加通知
    parameters.lightDataSupport.addCompiler(lightCompiler)
    parameters.geometryDataSupport.addCompiler(geometryCompiler)
    parameters.modelDataSupport.addCompiler(modelCompiler)



    this.lightCompiler = lightCompiler
    this.modelCompiler = modelCompiler
    this.geometryCompiler = geometryCompiler
  }

  load () {}

  export () {}
}