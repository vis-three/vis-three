import { VisOrbitControls } from "@vis-three/plugin-orbit-controls";
import { EngineSupport, Vector3Config } from "@vis-three/middleware";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";
import { ControlsConfig } from "@vis-three/module-controls/ControlsConfig";
import { ControlsCompiler } from "@vis-three/module-controls/ControlsCompiler";
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
declare const _default: import("@vis-three/middleware").Processor<OrbitControlsConfig, VisOrbitControls, OrbitControlsSupportEngine, ControlsCompiler>;
export default _default;
