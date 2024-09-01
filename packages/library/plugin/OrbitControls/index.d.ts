import { Engine, Plugin } from "@vis-three/core";
import { VisOrbitControls } from "./VisOrbitControls";
import { MOUSE } from "three";
export * from "./VisOrbitControls";
export interface OrbitControlsEngine extends Engine {
    orbitControls: VisOrbitControls;
}
export interface OrbitControlsPluginParameters {
    minDistance?: number;
    maxDistance?: number;
    minZoom?: number;
    maxZoom?: number;
    minPolarAngle?: number;
    maxPolarAngle?: number;
    minAzimuthAngle?: number;
    maxAzimuthAngle?: number;
    enableDamping?: boolean;
    dampingFactor?: number;
    enableZoom?: number;
    zoomSpeed?: number;
    enableRotate?: boolean;
    rotateSpeed?: number;
    enablePan?: boolean;
    panSpeed?: number;
    screenSpacePanning?: boolean;
    keyPanSpeed?: number;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
    keys?: {
        LEFT?: string;
        UP?: string;
        RIGHT?: string;
        BOTTOM?: string;
    };
    keysDom?: HTMLElement;
    mouseButtons?: {
        LEFT?: MOUSE;
        MIDDLE?: MOUSE;
        RIGHT?: MOUSE;
    };
}
export declare const ORBIT_CONTROLS_PLUGIN: string;
export declare const OrbitControlsPlugin: Plugin<OrbitControlsEngine, OrbitControlsPluginParameters>;
