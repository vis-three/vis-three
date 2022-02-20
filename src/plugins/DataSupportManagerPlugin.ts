import { Engine } from "../engine/Engine";
import { DataSupportManager, DataSupportManagerParameters } from "../manager/DataSupportManager";
import { LoadedEvent } from "../manager/LoaderManager";
import { Plugin } from "./plugin";

export const DataSupportManagerPlugin: Plugin<DataSupportManagerParameters> = function (this: Engine, params: DataSupportManagerParameters): boolean {
  if (this.dataSupportManager) {
    console.warn('engine has installed dataSupportManager plugin.')
    return false
  }

  const dataSupportManager = new DataSupportManager(params)

  this.dataSupportManager = dataSupportManager
  return true
}