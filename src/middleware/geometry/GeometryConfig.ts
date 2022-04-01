import { SymbolConfig, Vector3Config } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
export interface GeometryConfig extends SymbolConfig {
  type: string
  position: Vector3Config
  rotation: Vector3Config
  scale: Vector3Config
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

export interface PlaneGeometryConfig extends GeometryConfig {
  width: number
  height: number
  widthSegments: number
  heightSegments: number
}

export interface LoadGeometryConfig extends GeometryConfig {
  url: string
}


export const getGeometryConfig = function (): GeometryConfig {
  return {
    vid: '',
    type: 'Geometry',
    position: {
      x: 0, // percent
      y: 0, // percent
      z: 0 // percent
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

export const getBoxGeometryConfig  = function (): BoxGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.BOXGEOMETRY,
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
    type: CONFIGTYPE.SPHEREGEOMETRY,
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI
  })
}

export const getPlaneGeometryConfig = function (): PlaneGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.PLANEGEOMETRY,
    width: 1,
    height: 1,
    widthSegments: 1,
    heightSegments: 1,
  })
}

export const getLoadGeometryConfig = function (): LoadGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.LOADGEOMETRY,
    url: ''
  })
}


export type GeometryAllType = 
  BoxGeometryConfig |
  SphereGeometryConfig |
  PlaneGeometryConfig |
  LoadGeometryConfig