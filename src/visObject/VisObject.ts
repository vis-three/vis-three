import { Object3D } from "three";
import { VisCommonAttribute, VisVector3Config } from "../common";



export interface VisObject3DAttribute extends VisCommonAttribute {}

export type VisObject3D = VisObject3DAttribute & Object3D 
export interface VisObjectDataConfig {
  vid: string
  type: string
  castShadow: boolean
  receiveShadow: boolean
  lookAt: string
  position: VisVector3Config
  rotation: VisVector3Config
  scale: VisVector3Config
}

export const getDataConfig = (): VisObjectDataConfig => {
  return {
    vid: '',
    type: 'VisObject',
    castShadow: true,
    receiveShadow: true,
    lookAt: '',
    position: {
      x: 0,
      y: 0,
      z: 0
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



