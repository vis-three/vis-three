import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import BoxGeometryModel from "./models/BoxGeometryModel";
import CircleGeometryModel from "./models/CircleGeometryModel";
import CubicBezierCurveGeometryModel from "./models/CubicBezierCurveGeometryModel";
import CustomGeometryModel from "./models/CustomGeometryModel";
import EdgesGeometryModel from "./models/EdgesGeometryModel";
import ExtrudeGeometryModel from "./models/ExtrudeGeometryModel";
import LatheGeometryModel from "./models/LatheGeometryModel";
import LineTubeGeometryModel from "./models/LineTubeGeometryModel";
import LoadGeometryModel from "./models/LoadGeometryModel";
import PathGeometryModel from "./models/PathGeometryModel";
import PathTubeGeometryModel from "./models/PathTubeGeometryModel";
import PlaneGeometryModel from "./models/PlaneGeometryModel";
import QuadraticBezierCurveGeometryModel from "./models/QuadraticBezierCurveGeometryModel";
import RingGeometryModel from "./models/RingGeometryModel";
import ShapeGeometryModel from "./models/ShapeGeometryModel";
import SplineCurveGeometryModel from "./models/SplineCurveGeometryModel";
import TorusGeometryModel from "./models/TorusGeometryModel";
import SphereGeometryModel from "./models/SphereGeometryModel";
import DecalGeometryModel from "./models/DecalGeometryModel";

export * from "./GeometryInterface";
export * from "./extends";

export default defineModule({
  type: "geometry",
  models: [
    BoxGeometryModel,
    CircleGeometryModel,
    CubicBezierCurveGeometryModel,
    CustomGeometryModel,
    DecalGeometryModel,
    EdgesGeometryModel,
    ExtrudeGeometryModel,
    LatheGeometryModel,
    LineTubeGeometryModel,
    LoadGeometryModel,
    PathGeometryModel,
    PathTubeGeometryModel,
    PlaneGeometryModel,
    QuadraticBezierCurveGeometryModel,
    RingGeometryModel,
    ShapeGeometryModel,
    SphereGeometryModel,
    SplineCurveGeometryModel,
    TorusGeometryModel,
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.TWO,
});
