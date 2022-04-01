import { CONFIGTYPE } from "../constants/configType";
export const getGeometryConfig = function () {
    return {
        vid: '',
        type: 'Geometry',
        position: {
            x: 0,
            y: 0,
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
    };
};
export const getBoxGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        type: CONFIGTYPE.BOXGEOMETRY,
        width: 5,
        height: 5,
        depth: 5,
        widthSegments: 1,
        heightSegments: 1,
        depthSegments: 1
    });
};
export const getSphereGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        type: CONFIGTYPE.SPHEREGEOMETRY,
        radius: 3,
        widthSegments: 32,
        heightSegments: 32,
        phiStart: 0,
        phiLength: Math.PI * 2,
        thetaStart: 0,
        thetaLength: Math.PI
    });
};
export const getPlaneGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        type: CONFIGTYPE.PLANEGEOMETRY,
        width: 1,
        height: 1,
        widthSegments: 1,
        heightSegments: 1,
    });
};
export const getLoadGeometryConfig = function () {
    return Object.assign(getGeometryConfig(), {
        type: CONFIGTYPE.LOADGEOMETRY,
        url: ''
    });
};
//# sourceMappingURL=GeometryConfig.js.map