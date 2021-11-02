import { Object3D } from "three";
import { VisBufferGeometry } from "../visGeometry/VisBufferGeometry";
import { VisMaterial } from "../visMaterial/VisMaterial";
import { VisMesh } from "./VisMesh";
import { VisObject3DAttribute, VisObjectDataConfig, getDataConfig as getVisObjectDataConfig, VisObject3D } from "./VisObject";

export enum VisModelMode {
  MESH = 'mesh',
  LINE = 'line',
  POINTS = 'points'
}

export interface VisModelFactoryParameters {
  mode: VisModelMode
  material: VisMaterial
  geometry: VisBufferGeometry
}

export const VisModelFactory = function(parameters: VisModelFactoryParameters): VisMesh | void {
  const mode = parameters.mode
  const material = parameters.material
  const geometry = parameters.geometry
  if (mode === VisModelMode.MESH) {
    return new VisMesh(geometry, material)
  } else if (mode === VisModelMode.LINE) {
    // return new VisModelingEngine
  }
}

export interface VisModelDataConfig extends VisObjectDataConfig {
  mode: VisModelMode
  material: string
  geometry: string
}

export const getDataConfig = function(): VisModelDataConfig {
  return Object.assign(getVisObjectDataConfig(), {
    mode: VisModelMode.MESH,
    material: '',
    geometry: ''
  })
}