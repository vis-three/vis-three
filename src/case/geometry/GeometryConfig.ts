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

export interface SphereGeometryConfig extends GeometryConfig {
  radius: number
  widthSegments: number
  heightSegments: number
  phiStart: number
  phiLength: number
  thetaStart: number
  thetaLength: number
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

export const getSphereGeometryConfig = function (): SphereGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    radius: 1,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  })
}