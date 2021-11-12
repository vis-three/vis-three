import { BufferGeometry } from "three";

export class LoadGeometry extends BufferGeometry {
  type = 'LoadBufferGeometry'
  constructor (geometry?: BufferGeometry) {
    super()
    geometry && this.copy(geometry)
  }
}