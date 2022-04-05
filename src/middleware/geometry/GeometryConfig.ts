import { SymbolConfig, Vector3Config } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
export interface GeometryConfig extends SymbolConfig {
  type: string;
  position: Vector3Config;
  rotation: Vector3Config;
  scale: Vector3Config;
}

export interface BoxGeometryConfig extends GeometryConfig {
  width: number;
  height: number;
  depth: number;
  widthSegments: number;
  heightSegments: number;
  depthSegments: number;
}

export interface SphereGeometryConfig extends GeometryConfig {
  radius: number;
  widthSegments: number;
  heightSegments: number;
  phiStart: number;
  phiLength: number;
  thetaStart: number;
  thetaLength: number;
}

export interface PlaneGeometryConfig extends GeometryConfig {
  width: number;
  height: number;
  widthSegments: number;
  heightSegments: number;
}

export interface CircleGeometryConfig extends GeometryConfig {
  radius: number;
  segments: number;
  thetaStart: number;
  thetaLength: number;
}

export interface ConeGeometryConfig extends GeometryConfig {
  radius: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
  thetaStart: number;
  thetaLength: number;
}

export interface LoadGeometryConfig extends GeometryConfig {
  url: string;
}

export interface CylinderGeometryConfig extends GeometryConfig {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
  thetaStart: number;
  thetaLength: number;
}

export interface DodecahedronGeometryConfig extends GeometryConfig {
  radius: number;
  detail: number;
}

export interface EdgesGeometryConfig extends GeometryConfig {
  url: string;
  thresholdAngle: number;
}

export const getGeometryConfig = function (): GeometryConfig {
  return {
    vid: "",
    type: "Geometry",
    position: {
      x: 0, // percent
      y: 0, // percent
      z: 0, // percent
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
  };
};

export const getBoxGeometryConfig = function (): BoxGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.BOXGEOMETRY,
    width: 5,
    height: 5,
    depth: 5,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  });
};

export const getSphereGeometryConfig = function (): SphereGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.SPHEREGEOMETRY,
    radius: 3,
    widthSegments: 32,
    heightSegments: 32,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI,
  });
};

export const getPlaneGeometryConfig = function (): PlaneGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.PLANEGEOMETRY,
    width: 5,
    height: 5,
    widthSegments: 1,
    heightSegments: 1,
  });
};

export const getCircleGeometryConfig = function (): CircleGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CIRCLEGEOMETRY,
    radius: 3,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
  });
};

export const getConeGeometryConfig = function (): ConeGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CONEGEOMETRY,
    radius: 3,
    height: 5,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
  });
};

export const getLoadGeometryConfig = function (): LoadGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.LOADGEOMETRY,
    url: "",
  });
};

export const getCylinderGeometryConfig = function (): CylinderGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CYLINDERGEOMETRY,
    radiusTop: 3,
    radiusBottom: 3,
    height: 5,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
  });
};

export const getDodecahedronGeometryConfig =
  function (): DodecahedronGeometryConfig {
    return Object.assign(getGeometryConfig(), {
      type: "",
      radius: 3,
      detail: 0,
    });
  };

export const getEdgesGeometryConfig = function (): EdgesGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.LOADGEOMETRY,
    url: "",
    thresholdAngle: 1,
  });
};

export type GeometryAllType =
  | BoxGeometryConfig
  | SphereGeometryConfig
  | PlaneGeometryConfig
  | LoadGeometryConfig
  | CircleGeometryConfig
  | ConeGeometryConfig
  | CylinderGeometryConfig
  | DodecahedronGeometryConfig
  | EdgesGeometryConfig;
