import { SymbolConfig, Vector3Config } from "../common/CommonConfig";

export interface AnchorConfig {
  position: Vector3Config
  rotation: Vector3Config
  scale: Vector3Config
}

export interface GeometryConfig extends SymbolConfig {
  type: string,
  anchor: AnchorConfig
}

export interface BoxGeometryConfig extends GeometryConfig {
  width: number
  height: number
  depth: number
  widthSegments: number
  heightSegments: number
  depthSegments: number
}

export type GeometryAllType = BoxGeometryConfig

export const getGeometryConfig = function (): GeometryConfig {
  return {
    vid: '',
    type: 'Geometry',
    anchor: {
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
}

export const getBoxGeometryConfig  = function (): BoxGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1
  })
}