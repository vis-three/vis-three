import { BufferGeometry } from "three";
import { CustomGeometryConfig } from "../GeometryInterface";
declare const _default: import("@vis-three/tdcm").ModelOption<CustomGeometryConfig, BufferGeometry<import("three").NormalBufferAttributes>, {}, {
    generateGeometry: (attribute: CustomGeometryConfig["attribute"]) => BufferGeometry;
}, import("@vis-three/tdcm").EngineSupport, import("@vis-three/tdcm").Compiler<import("@vis-three/tdcm").EngineSupport>>;
export default _default;
