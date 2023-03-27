export const getGeometryConfig = function () {
    return {
        vid: "",
        type: "Geometry",
        position: {
            x: 0,
            y: 0,
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
export const getBoxGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        width: 5,
        height: 5,
        depth: 5,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1,
    });
};
export const getSphereGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        radius: 3,
        widthSegments: 32,
        heightSegments: 32,
        phiStart: 0,
        phiLength: Math.PI * 2,
        thetaStart: 0,
        thetaLength: Math.PI,
    });
};
export const getPlaneGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        width: 5,
        height: 5,
        widthSegments: 1,
        heightSegments: 1,
    });
};
export const getCircleGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        radius: 3,
        segments: 8,
        thetaStart: 0,
        thetaLength: Math.PI * 2,
    });
};
export const getConeGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        radius: 3,
        height: 5,
        radialSegments: 8,
        heightSegments: 1,
        openEnded: false,
        thetaStart: 0,
        thetaLength: Math.PI * 2,
    });
};
export const getTorusGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        radius: 3,
        tube: 0.4,
        radialSegments: 8,
        tubularSegments: 6,
        arc: Math.PI * 2,
    });
};
export const getRingGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        innerRadius: 2,
        outerRadius: 3,
        thetaSegments: 8,
        phiSegments: 8,
        thetaStart: 0,
        thetaLength: Math.PI * 2,
    });
};
export const getLoadGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        url: "",
    });
};
export const getCustomGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
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
export const getCylinderGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
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
export const getDodecahedronGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        type: "",
        radius: 3,
        detail: 0,
    });
};
export const getEdgesGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        url: "",
        thresholdAngle: 1,
    });
};
const getCurveGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        path: [],
        divisions: 36,
        space: true,
    });
};
export const getLineCurveGeometryConfig = function () {
    return Object.assign(getCurveGeometryConfig(), {});
};
export const getSplineCurveGeometryConfig = function () {
    return Object.assign(getCurveGeometryConfig(), {});
};
export const getCubicBezierCurveGeometryConfig = function () {
    return Object.assign(getCurveGeometryConfig(), {});
};
export const getQuadraticBezierCurveGeometryConfig = function () {
    return Object.assign(getCurveGeometryConfig(), {});
};
export const getTubeGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        path: [],
        tubularSegments: 64,
        radius: 1,
        radialSegments: 8,
        closed: false,
    });
};
export const getLineTubeGeometryConfig = function () {
    return Object.assign(getTubeGeometryConfig(), {});
};
export const getSplineTubeGeometryConfig = function () {
    return Object.assign(getTubeGeometryConfig(), {});
};
export const getShapeGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        path: [],
        curveSegments: 12,
    });
};
export const getLineShapeGeometryConfig = function () {
    return Object.assign(getShapeGeometryConfig(), {});
};
