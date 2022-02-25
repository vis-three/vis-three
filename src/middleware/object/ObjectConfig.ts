import { Vector2Config, Vector3Config, SymbolConfig } from "../common/CommonConfig"

export interface ObjectConfig extends SymbolConfig {
  type: string
  name: string
  castShadow: boolean
  receiveShadow: boolean
  lookAt: string
  position: Vector3Config
  rotation: Vector3Config
  scale: Vector3Config
  visible: boolean
}

export const getObjectConfig = (): ObjectConfig => {
  return {
    vid: '',
    name: '',
    type: 'Object3D',
    castShadow: true,
    receiveShadow: true,
    lookAt: '',
    visible: true,
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