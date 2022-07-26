import { BufferGeometry, BoxBufferGeometry, CircleBufferGeometry, ConeBufferGeometry, CylinderBufferGeometry, PlaneBufferGeometry, RingBufferGeometry, SphereBufferGeometry, TorusGeometry, Vector3, Vector2, } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { QuadraticBezierCurveGeometry } from "../../../extends/geometry/CurveGeometry/QuadraticBezierCurveGeometry";
import { CubicBezierCurveGeometry } from "../../../extends/geometry/CurveGeometry/CubicBezierCurveGeometry";
import { LineCurveGeometry } from "../../../extends/geometry/CurveGeometry/LineCurveGeometry";
import { SplineCurveGeometry } from "../../../extends/geometry/CurveGeometry/SplineCurveGeometry";
import { LineTubeGeometry } from "../../../extends/geometry/TubeGeometry/LineTubeGeometry";
import { SplineTubeGeometry } from "../../../extends/geometry/TubeGeometry/SplineTubeGeometry";
import { LineShapeGeometry } from "../../../extends/geometry/ShapeGeometry/LineShapeGeometry";
import { commands, create as commonCreate } from "./common";
const constructMap = new Map();
constructMap.set(CONFIGTYPE.BOXGEOMETRY, (config) => {
    return new BoxBufferGeometry(config.width, config.height, config.depth, config.widthSegments, config.heightSegments, config.depthSegments);
});
constructMap.set(CONFIGTYPE.SPHEREGEOMETRY, (config) => {
    return new SphereBufferGeometry(config.radius, config.widthSegments, config.heightSegments, config.phiStart, config.phiLength, config.thetaStart, config.thetaLength);
});
constructMap.set(CONFIGTYPE.PLANEGEOMETRY, (config) => {
    return new PlaneBufferGeometry(config.width, config.height, config.widthSegments, config.heightSegments);
});
constructMap.set(CONFIGTYPE.CIRCLEGEOMETRY, (config) => {
    return new CircleBufferGeometry(config.radius, config.segments, config.thetaStart, config.thetaLength);
});
constructMap.set(CONFIGTYPE.CONEGEOMETRY, (config) => {
    return new ConeBufferGeometry(config.radius, config.height, config.radialSegments, config.heightSegments, config.openEnded, config.thetaStart, config.thetaLength);
});
constructMap.set(CONFIGTYPE.CYLINDERGEOMETRY, (config) => {
    return new CylinderBufferGeometry(config.radiusTop, config.radiusBottom, config.height, config.radialSegments, config.heightSegments, config.openEnded, config.thetaStart, config.thetaLength);
});
constructMap.set(CONFIGTYPE.LINECURVEGEOMETRY, (config) => {
    return new LineCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space);
});
constructMap.set(CONFIGTYPE.SPLINECURVEGEOMETRY, (config) => {
    return new SplineCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space);
});
constructMap.set(CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY, (config) => {
    return new CubicBezierCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space);
});
constructMap.set(CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY, (config) => {
    return new QuadraticBezierCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space);
});
constructMap.set(CONFIGTYPE.LINETUBEGEOMETRY, (config) => {
    return new LineTubeGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.tubularSegments, config.radius, config.radialSegments, config.closed);
});
constructMap.set(CONFIGTYPE.SPLINETUBEGEOMETRY, (config) => {
    return new SplineTubeGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.tubularSegments, config.radius, config.radialSegments, config.closed);
});
constructMap.set(CONFIGTYPE.TORUSGEOMETRY, (config) => {
    return new TorusGeometry(config.radius, config.tube, config.radialSegments, config.tubularSegments, config.arc);
});
constructMap.set(CONFIGTYPE.RINGGEOMETRY, (config) => {
    return new RingBufferGeometry(config.innerRadius, config.outerRadius, config.thetaSegments, config.phiSegments, config.thetaStart, config.thetaLength);
});
constructMap.set(CONFIGTYPE.LINESHAPEGEOMETRY, (config) => {
    return new LineShapeGeometry(config.path.map((vector2) => new Vector2(vector2.x, vector2.y)), config.curveSegments);
});
const create = function (config) {
    if (!constructMap.has(config.type)) {
        console.error(`parametric geometry can not support this type config: ${config.type}`);
        return new BufferGeometry();
    }
    return commonCreate(constructMap.get(config.type)(config), config);
};
const dispose = function (target) {
    target.dispose();
};
const parametricProcessorFactory = function (configType) {
    return defineProcessor({
        configType,
        commands,
        create,
        dispose,
    });
};
const ParametricGeometryList = [
    CONFIGTYPE.BOXGEOMETRY,
    CONFIGTYPE.SPHEREGEOMETRY,
    CONFIGTYPE.PLANEGEOMETRY,
    CONFIGTYPE.CIRCLEGEOMETRY,
    CONFIGTYPE.CONEGEOMETRY,
    CONFIGTYPE.CYLINDERGEOMETRY,
    CONFIGTYPE.LINECURVEGEOMETRY,
    CONFIGTYPE.SPLINECURVEGEOMETRY,
    CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY,
    CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY,
    CONFIGTYPE.LINETUBEGEOMETRY,
    CONFIGTYPE.SPLINETUBEGEOMETRY,
    CONFIGTYPE.TORUSGEOMETRY,
    CONFIGTYPE.RINGGEOMETRY,
    CONFIGTYPE.LINESHAPEGEOMETRY,
];
export const ParametricGeometryProcessors = ParametricGeometryList.map((type) => parametricProcessorFactory(type));
//# sourceMappingURL=ParametricGeometryProcessors.js.map