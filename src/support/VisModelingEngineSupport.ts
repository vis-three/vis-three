import { VisModelingEngine } from "../engine.case/VisModelingEngine";
import { VisLightCompiler, VisLightCompileTarget } from "../visCompiler/VisLightCompiler";
import { LoadedEvent, VisLoaderManager, VisLoaderManagerEventType } from "../visCore/VisLoadManager";
import { VisResourceManager, VisResourceManagerEventType } from "../visCore/VisResourceManager";
import { VisDataSupport } from "./visDataSupport/VisDataSupport";

export interface VisVueModelingEngineSupportParameters {
  dom?: HTMLElement
  lightDataSupport: VisDataSupport<VisLightCompileTarget, VisLightCompiler>

}

export class VisVueModelingEngineSupport {
  private engine: VisModelingEngine
  private loadManager: VisLoaderManager
  private resourceManager: VisResourceManager

  constructor (parameters: VisVueModelingEngineSupportParameters) {
    this.engine = new VisModelingEngine()
    this.loadManager = new VisLoaderManager()
    this.resourceManager = new VisResourceManager()

    this.loadManager.addEventListener(VisLoaderManagerEventType.LOADED, event => {
      const e = event as LoadedEvent
      this.resourceManager.mappingResource(e.resourceMap)
    })

    // TODO: load config
    this.resourceManager.addEventListener(VisResourceManagerEventType.MAPPED, event => {

    })

    const scene = this.engine.getScene()
    
    const visLightCompiler = new VisLightCompiler(scene, parameters.lightDataSupport.getData())

    parameters.lightDataSupport.addCompiler(visLightCompiler)



    if (parameters.dom) {
      const dom = parameters.dom
      this.engine.setSize(dom.offsetWidth, dom.offsetHeight)
      parameters.dom.appendChild(this.engine.getEngine().getRenderCanvas())
    }
  }

  getEngine (): VisModelingEngine {
    return this.engine
  }

  load (urlList: string[]) {
    const loadManager = this.loadManager
    loadManager.reset()
    loadManager.load(urlList)
  }
}