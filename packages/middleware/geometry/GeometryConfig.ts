import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import {
  BoxGeometryConfig,
  CircleGeometryConfig,
  ConeGeometryConfig,
  CubicBezierCurveGeometryConfig,
  CurveGeometryConfig,
  CustomGeometryConfig,
  CylinderGeometryConfig,
  DodecahedronGeometryConfig,
  EdgesGeometryConfig,
  GeometryConfig,
  LineCurveGeometryConfig,
  LineShapeGeometryConfig,
  LineTubeGeometryConfig,
  LoadGeometryConfig,
  PlaneGeometryConfig,
  QuadraticBezierCurveGeometryConfig,
  RingGeometryConfig,
  ShapeGeometryConfig,
  SphereGeometryConfig,
  SplineCurveGeometryConfig,
  SplineTubeGeometryConfig,
  TorusGeometryConfig,
  TubeGeometryConfig,
} from "./GeometryInterface";

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
    groups: [],
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

export const getTorusGeometryConfig = function (): TorusGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.TORUSGEOMETRY,
    radius: 3,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2,
  });
};

export const getRingGeometryConfig = function (): RingGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.RINGGEOMETRY,
    innerRadius: 2,
    outerRadius: 3,
    thetaSegments: 8,
    phiSegments: 8,
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

export const getCustomGeometryConfig = function (): CustomGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: CONFIGTYPE.CUSTOMGEOMETRY,
    attribute: {
      position: [],
      color: [],
      index: [],
      normal: [],
      uv: [],
      uv2: [],
    },
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

const getCurveGeometryConfig = function (): CurveGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    path: [],
    divisions: 36,
    space: true,
  });
};

export const getLineCurveGeometryConfig = function (): LineCurveGeometryConfig {
  return Object.assign(getCurveGeometryConfig(), {
    type: CONFIGTYPE.LINECURVEGEOMETRY,
  });
};

export const getSplineCurveGeometryConfig =
  function (): SplineCurveGeometryConfig {
    return Object.assign(getCurveGeometryConfig(), {
      type: CONFIGTYPE.SPLINECURVEGEOMETRY,
    });
  };

export const getCubicBezierCurveGeometryConfig =
  function (): CubicBezierCurveGeometryConfig {
    return Object.assign(getCurveGeometryConfig(), {
      type: CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY,
    });
  };

export const getQuadraticBezierCurveGeometryConfig =
  function (): QuadraticBezierCurveGeometryConfig {
    return Object.assign(getCurveGeometryConfig(), {
      type: CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY,
    });
  };

export const getTubeGeometryConfig = function (): TubeGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    type: "TubeGeometry",
    path: [],
    tubularSegments: 64,
    radius: 1,
    radialSegments: 8,
    closed: false,
  });
};

export const getLineTubeGeometryConfig = function (): LineTubeGeometryConfig {
  return Object.assign(getTubeGeometryConfig(), {
    type: CONFIGTYPE.LINETUBEGEOMETRY,
  });
};

export const getSplineTubeGeometryConfig =
  function (): SplineTubeGeometryConfig {
    return Object.assign(getTubeGeometryConfig(), {
      type: CONFIGTYPE.SPLINETUBEGEOMETRY,
    });
  };

export const getShapeGeometryConfig = function (): ShapeGeometryConfig {
  return Object.assign(getGeometryConfig(), {
    path: [],
    curveSegments: 12,
  });
};

export const getLineShapeGeometryConfig = function (): LineShapeGeometryConfig {
  return Object.assign(getShapeGeometryConfig(), {
    type: CONFIGTYPE.LINESHAPEGEOMETRY,
  });
};
