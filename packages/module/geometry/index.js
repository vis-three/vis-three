import BoxGeometryProcessor from "./BoxGeometryProcessor";
import CircleGeometryProcessor from "./CircleGeometryProcessor";
import ConeGeometryProcessor from "./ConeGeometryProcessor";
import CubicBezierCurveGeometryProcessor from "./CubicBezierCurveGeometryProcessor";
import CustomGeometryProcessor from "./CustomGeometryProcessor";
import CylinderGeometryProcessor from "./CylinderGeometryProcessor";
import EdgesGeometryProcessor from "./EdgesGeometryProcessor";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryRule } from "./GeometryRule";
import LineCurveGeometryProcessor from "./LineCurveGeometryProcessor";
import LineShapeGeometryProcessor from "./LineShapeGeometryProcessor";
import LineTubeGeometryProcessor from "./LineTubeGeometryProcessor";
import LoadGeometryProcessor from "./LoadGeometryProcessor";
import PlaneGeometryProcessor from "./PlaneGeometryProcessor";
import QuadraticBezierCurveGeometryProcessor from "./QuadraticBezierCurveGeometryProcessor";
import RingGeometryProcessor from "./RingGeometryProcessor";
import SphereGeometryProcessor from "./SphereGeometryProcessor";
import SplineCurveGeometryProcessor from "./SplineCurveGeometryProcessor";
import SplineTubeGeometryProcessor from "./SplineTubeGeometryProcessor";
import TorusGeometryProcessor from "./TorusGeometryProcessor";
export default {
    type: "geometry",
    compiler: GeometryCompiler,
    rule: GeometryRule,
    processors: [
        BoxGeometryProcessor,
        CircleGeometryProcessor,
        ConeGeometryProcessor,
        CubicBezierCurveGeometryProcessor,
        CustomGeometryProcessor,
        CylinderGeometryProcessor,
        EdgesGeometryProcessor,
        LineCurveGeometryProcessor,
        LineShapeGeometryProcessor,
        LineTubeGeometryProcessor,
        LoadGeometryProcessor,
        PlaneGeometryProcessor,
        QuadraticBezierCurveGeometryProcessor,
        RingGeometryProcessor,
        SphereGeometryProcessor,
        SplineCurveGeometryProcessor,
        SplineTubeGeometryProcessor,
        TorusGeometryProcessor,
    ],
};
