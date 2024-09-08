import { BufferGeometry, Mesh } from "three";
import { DecalGeometryConfig } from "../GeometryInterface";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry.js";
declare const _default: import("@vis-three/tdcm").ModelOption<DecalGeometryConfig, DecalGeometry, {}, {
    tempGeometry: BufferGeometry;
    tempMesh: Mesh;
}, import("@vis-three/tdcm").EngineSupport, import("@vis-three/tdcm").Compiler<import("@vis-three/tdcm").EngineSupport>>;
export default _default;
