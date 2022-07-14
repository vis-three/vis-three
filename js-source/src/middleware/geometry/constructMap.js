import { BoxBufferGeometry, CircleBufferGeometry, ConeBufferGeometry, CylinderBufferGeometry, EdgesGeometry, PlaneBufferGeometry, RingBufferGeometry, SphereBufferGeometry, TorusGeometry, Vector3, Vector2, } from "three";
import { LineCurveGeometry } from "../../extends/geometry/CurveGeometry/LineCurveGeometry";
import { SplineCurveGeometry } from "../../extends/geometry/CurveGeometry/SplineCurveGeometry";
import { CubicBezierCurveGeometry } from "../../extends/geometry/CurveGeometry/CubicBezierCurveGeometry";
import { QuadraticBezierCurveGeometry } from "../../extends/geometry/CurveGeometry/QuadraticBezierCurveGeometry";
import { LineTubeGeometry } from "../../extends/geometry/TubeGeometry/LineTubeGeometry";
import { SplineTubeGeometry } from "../../extends/geometry/TubeGeometry/SplineTubeGeometry";
import { CONFIGTYPE } from "../constants/configType";
import { GeometryCompiler } from "./GeometryCompiler";
import { LoadGeometry } from "../../extends/geometry/LoadGeometry";
import { LineShapeGeometry } from "../../extends/geometry/ShapeGeometry/LineShapeGeometry";
const map = new Map();
map.set(CONFIGTYPE.BOXGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new BoxBufferGeometry(config.width, config.height, config.depth, config.widthSegments, config.heightSegments, config.depthSegments), config);
});
map.set(CONFIGTYPE.SPHEREGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new SphereBufferGeometry(config.radius, config.widthSegments, config.heightSegments, config.phiStart, config.phiLength, config.thetaStart, config.thetaLength), config);
});
map.set(CONFIGTYPE.PLANEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new PlaneBufferGeometry(config.width, config.height, config.widthSegments, config.heightSegments), config);
});
map.set(CONFIGTYPE.LOADGEOMETRY, (config, compiler) => {
    return GeometryCompiler.transfromAnchor(new LoadGeometry(compiler.getGeometry(config.url)), config);
});
map.set(CONFIGTYPE.CUSTOMGEOMETRY, (config, compiler) => {
    return GeometryCompiler.transfromAnchor(compiler.generateGeometry(config.attribute), config);
});
map.set(CONFIGTYPE.CIRCLEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new CircleBufferGeometry(config.radius, config.segments, config.thetaStart, config.thetaLength), config);
});
map.set(CONFIGTYPE.CONEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new ConeBufferGeometry(config.radius, config.height, config.radialSegments, config.heightSegments, config.openEnded, config.thetaStart, config.thetaLength), config);
});
map.set(CONFIGTYPE.CYLINDERGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new CylinderBufferGeometry(config.radiusTop, config.radiusBottom, config.height, config.radialSegments, config.heightSegments, config.openEnded, config.thetaStart, config.thetaLength), config);
});
map.set(CONFIGTYPE.EDGESGEOMETRY, (config, compiler) => {
    return GeometryCompiler.transfromAnchor(new EdgesGeometry(compiler.getGeometry(config.url), config.thresholdAngle), config);
});
map.set(CONFIGTYPE.LINECURVEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new LineCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space), config);
});
map.set(CONFIGTYPE.SPLINECURVEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new SplineCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space), config);
});
map.set(CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new CubicBezierCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space), config);
});
map.set(CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new QuadraticBezierCurveGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.divisions, config.space), config);
});
map.set(CONFIGTYPE.LINETUBEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new LineTubeGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.tubularSegments, config.radius, config.radialSegments, config.closed), config);
});
map.set(CONFIGTYPE.SPLINETUBEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new SplineTubeGeometry(config.path.map((vector3) => new Vector3(vector3.x, vector3.y, vector3.z)), config.tubularSegments, config.radius, config.radialSegments, config.closed), config);
});
map.set(CONFIGTYPE.TORUSGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new TorusGeometry(config.radius, config.tube, config.radialSegments, config.tubularSegments, config.arc), config);
});
map.set(CONFIGTYPE.RINGGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new RingBufferGeometry(config.innerRadius, config.outerRadius, config.thetaSegments, config.phiSegments, config.thetaStart, config.thetaLength), config);
});
map.set(CONFIGTYPE.LINESHAPEGEOMETRY, (config) => {
    return GeometryCompiler.transfromAnchor(new LineShapeGeometry(config.path.map((vector2) => new Vector2(vector2.x, vector2.y)), config.curveSegments), config);
});
export default map;
//# sourceMappingURL=constructMap.js.map