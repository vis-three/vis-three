import { Engine } from "../engine/Engine";
import { LoaderManager, LoaderManagerParameters } from "../manager/LoaderManager";
import { Plugin } from "./plugin";

export const LoaderManagerPlugin: Plugin<LoaderManagerParameters> = function (this: Engine, params: LoaderManagerParameters): boolean {
  if (this.loaderManager) {
    console.warn('engine has installed loaderManager plugin.')
    return false
  }

  const loaderManager = new LoaderManager(params)

  this.loaderManager = loaderManager

  this.loadResources = (urlList: Array<string>) => {
    this.loaderManager!.load(urlList)
    return this
  }

  return true
}