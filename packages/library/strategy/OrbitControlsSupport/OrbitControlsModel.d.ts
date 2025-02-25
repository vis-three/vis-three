import { OrbitControlsEngine, VisOrbitControls } from "@vis-three/plugin-orbit-controls";
import { EngineSupport, Vector3Config } from "@vis-three/tdcm";
import { ControlsCompiler, ControlsConfig } from "@vis-three/module-controls";
export interface OrbitControlsConfig extends ControlsConfig {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableDamping: boolean;
    dampingFactor: number;
    enabled: boolean;
    enablePan: boolean;
    enableRotate: boolean;
    enableZoom: boolean;
    maxAzimuthAngle: number;
    maxDistance: number;
    maxPolarAngle: number;
    maxZoom: number;
    minAzimuthAngle: number;
    minDistance: number;
    minPolarAngle: number;
    minZoom: number;
    panSpeed: number;
    rotateSpeed: number;
    zoomSpeed: number;
    screenSpacePanning: boolean;
    target: string | Vector3Config | null;
}
export declare const getOrbitControlsConfig: () => OrbitControlsConfig;
export interface OrbitControlsSupportEngine extends EngineSupport, OrbitControlsEngine {
}
declare const _default: import("@vis-three/tdcm").ModelOption<OrbitControlsConfig, VisOrbitControls, {}, {}, OrbitControlsSupportEngine, ControlsCompiler>;
export default _default;
