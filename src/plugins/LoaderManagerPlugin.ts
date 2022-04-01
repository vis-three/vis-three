import { Engine } from "../engine/Engine";
import { LoadedEvent, LoaderManager, LoaderManagerParameters } from "../manager/LoaderManager";
import { MappedEvent } from "../manager/ResourceManager";
import { Plugin } from "./plugin";

export const LoaderManagerPlugin: Plugin<LoaderManagerParameters> = function (this: Engine, params: LoaderManagerParameters): boolean {
  if (this.loaderManager) {
    console.warn('engine has installed loaderManager plugin.')
    return false
  }

  const loaderManager = new LoaderManager(params)

  this.loaderManager = loaderManager

  this.loadResources = (urlList: Array<string>, callback:  (err: Error | undefined, event?: LoadedEvent | MappedEvent) => void) => {
   
    if (this.resourceManager) {
      const lodedFun = (event: MappedEvent) => {
        callback(undefined, event)
        this.resourceManager!.removeEventListener<MappedEvent>('mapped', lodedFun)
      }
  
      try {
        this.resourceManager!.addEventListener<MappedEvent>('mapped', lodedFun)
      } catch (error) {
        callback(error as Error)
      }
    } else {
      const lodedFun = (event: LoadedEvent) => {
        callback(undefined, event)
        this.loaderManager!.removeEventListener<LoadedEvent>('loaded', lodedFun)
      }
  
      try {
        this.loaderManager!.addEventListener<LoadedEvent>('loaded', lodedFun)
      } catch (error) {
        callback(error as Error)
      }
    }
    this.loaderManager!.load(urlList)
    return this
  }

  this.loadResourcesAsync = (urlList: Array<string>): Promise<LoadedEvent | MappedEvent> => {
    return new Promise((resolve, reject) => {
      if (this.resourceManager) {
        const lodedFun = (event: MappedEvent) => {
          resolve(event)
          this.resourceManager!.removeEventListener<MappedEvent>('mapped', lodedFun)
        }
    
        try {
          this.resourceManager!.addEventListener<MappedEvent>('mapped', lodedFun)
        } catch (error) {
          reject(error)
        }
      } else {
        const lodedFun = (event: LoadedEvent) => {
          resolve(event)
          this.loaderManager!.removeEventListener<LoadedEvent>('loaded', lodedFun)
        }
        
        try {
          this.loaderManager!.addEventListener<LoadedEvent>('loaded', lodedFun)
        } catch (error) {
          reject(error)
        }
      }

  
      this.loaderManager!.load(urlList)
    })
  }

  return true
}