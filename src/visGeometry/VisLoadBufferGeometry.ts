import { BufferGeometry } from "three";
import { VisBufferGeometryConfig, getDataConfig as getVisBufferGeometryConfig, VisBufferGeometryAttribute } from "./VisBufferGeometry";

export interface VisLoadBufferGeometryParameters {
  url: string
  path: string
  geometry: BufferGeometry | null
}

export interface VisLoadBufferGeometryConfig extends VisBufferGeometryConfig, VisLoadBufferGeometryParameters{
}

export const getDataConfig = function(): VisLoadBufferGeometryConfig {
  return Object.assign(getVisBufferGeometryConfig(), {
    type: 'VisLoadBufferGeometry',
    url: '',
    path: '',
    geometry: null
  })
}

export class VisLoadBufferGeometry extends BufferGeometry implements VisBufferGeometryAttribute {
  vid: string = ''
  constructor (parameters?: VisLoadBufferGeometryParameters) {
    super()
    if (parameters?.geometry) {
      this.copy(parameters.geometry)
    }
  }
}