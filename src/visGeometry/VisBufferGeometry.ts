import { BufferGeometry } from "three";
import { VisCommonAttribute, VisVector3Config } from "../common";


export interface VisBufferGeometryConfig {
  type: string,
  position: VisVector3Config
  rotation: VisVector3Config
  scale: VisVector3Config
}

export const getDataConfig = function(): VisBufferGeometryConfig {
  return {
    type: 'VisBufferGeometry',
    position: {
      x: 0.5,
      y: 0.5,
      z: 0.5
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 1
    }
  }
}

export interface VisBufferGeometryAttribute extends VisCommonAttribute {
}

export type VisBufferGeometry = BufferGeometry & VisBufferGeometryAttribute