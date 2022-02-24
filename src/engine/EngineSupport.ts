import { CompilerManager } from "../manager/CompilerManager";
import { DataSupportManager, DataSupportManagerParameters, LoadOptions } from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { Engine, ENGINEPLUGIN } from "./Engine";

export interface EngineSupportParameters extends DataSupportManagerParameters {
}

export interface EngineSupportLoadOptions extends LoadOptions{
  assets?: string[]
}

export class EngineSupport extends Engine {

  IS_ENGINESUPPORT: boolean = true

  declare loaderManager: LoaderManager
  declare resourceManager: ResourceManager
  declare dataSupportManager: DataSupportManager
  declare compilerManager: CompilerManager

  declare loadResources: (urlList: Array<string>) => this
  declare registerResources: (resourceMap: {[key: string]: unknown}) => this
  declare toJSON: () => string
  
  constructor (parameters?: EngineSupportParameters) {
    super()
    this.install(ENGINEPLUGIN.LOADERMANAGER)
      .install(ENGINEPLUGIN.RESOURCEMANAGER)
      .install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters)
      .install(ENGINEPLUGIN.COMPILERMANAGER)

  }

  loadConfig (config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this {
    const loadLifeCycle = () => {
      const dataSupportManager = this.dataSupportManager

      // 生成贴图
      config.texture && dataSupportManager.load({texture: config.texture})
        
      // 生成材质
      config.material && dataSupportManager.load({material: config.material})

      // 其他

      delete config.texture
      delete config.material

      dataSupportManager.load(config)
    }
    // 导入外部资源
    if (config.assets && config.assets.length) {

      this.loaderManager.reset().load(config.assets)

      const mappedFun = (event: MappedEvent) => {

        delete config.assets
        loadLifeCycle()
        
  
        this.resourceManager.removeEventListener('mapped', mappedFun)
        callback && callback(event)
      }
  
      this.resourceManager.addEventListener<MappedEvent>('mapped', mappedFun)
    } else {
      loadLifeCycle()
      callback && callback()
    }

    return this
  }

  loadConfigAsync (config: EngineSupportLoadOptions): Promise<MappedEvent | undefined> {
    return new Promise((resolve, reject) => {
      const loadLifeCycle = () => {
        const dataSupportManager = this.dataSupportManager
  
        // 生成贴图
        config.texture && dataSupportManager.load({texture: config.texture})
          
        // 生成材质
        config.material && dataSupportManager.load({material: config.material})
  
        // 其他
  
        delete config.texture
        delete config.material
  
        dataSupportManager.load(config)
      }
      // 导入外部资源
      if (config.assets && config.assets.length) {
  
        this.loaderManager.reset().load(config.assets)
  
        const mappedFun = (event: MappedEvent) => {
  
          delete config.assets
          loadLifeCycle()
          
    
          this.resourceManager.removeEventListener('mapped', mappedFun)
          resolve(event)
        }
    
        this.resourceManager.addEventListener<MappedEvent>('mapped', mappedFun)
      } else {
        loadLifeCycle()
        resolve(undefined)
      }
    })
  }
}