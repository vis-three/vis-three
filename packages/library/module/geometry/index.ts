import BoxGeometryProcessor from "./processors/BoxGeometryProcessor";
import CircleGeometryProcessor from "./processors/CircleGeometryProcessor";
import ConeGeometryProcessor from "./processors/ConeGeometryProcessor";
import CubicBezierCurveGeometryProcessor from "./processors/CubicBezierCurveGeometryProcessor";
import CustomGeometryProcessor from "./processors/CustomGeometryProcessor";
import CylinderGeometryProcessor from "./processors/CylinderGeometryProcessor";
import EdgesGeometryProcessor from "./processors/EdgesGeometryProcessor";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryRule } from "./GeometryRule";
import LineCurveGeometryProcessor from "./processors/LineCurveGeometryProcessor";
import LineShapeGeometryProcessor from "./processors/LineShapeGeometryProcessor";
import LineTubeGeometryProcessor from "./processors/LineTubeGeometryProcessor";
import LoadGeometryProcessor from "./processors/LoadGeometryProcessor";
import PlaneGeometryProcessor from "./processors/PlaneGeometryProcessor";
import QuadraticBezierCurveGeometryProcessor from "./processors/QuadraticBezierCurveGeometryProcessor";
import RingGeometryProcessor from "./processors/RingGeometryProcessor";
import SphereGeometryProcessor from "./processors/SphereGeometryProcessor";
import SplineCurveGeometryProcessor from "./processors/SplineCurveGeometryProcessor";
import SplineTubeGeometryProcessor from "./processors/SplineTubeGeometryProcessor";
import TorusGeometryProcessor from "./processors/TorusGeometryProcessor";
import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import ExtrudeGeometryProcessor from "./processors/ExtrudeGeometryProcessor";
import PathGeometryProcessor from "./processors/PathGeometryProcessor";
import ShapeGeometryProcessor from "./processors/ShapeGeometryProcessor";

export default {
  type: "geometry",
  compiler: GeometryCompiler,
  rule: GeometryRule,
  lifeOrder: SUPPORT_LIFE_CYCLE.TWO,
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
    ExtrudeGeometryProcessor,
    PathGeometryProcessor,
    ShapeGeometryProcessor,
  ],
};
