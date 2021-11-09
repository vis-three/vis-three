import { Scene, Object3D, PerspectiveCamera, OrthographicCamera } from "three";
export declare enum ModelingSceneCameraDefalutType {
    DefaultPerspectiveCamera = "DefaultPerspectiveCamera",
    DefaultOrthograpbicCamera = "DefaultOrthograpbicCamera"
}
export declare enum ModelingSceneViewpoint {
    DEFAULT = "default",
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    FRONT = "front",
    BACK = "back"
}
export declare enum ModelingSceneDisplayMode {
    GEOMETRY = 0,
    MATERIAL = 1,
    LIGHT = 2,
    ENV = 3
}
export interface ModelingSceneParameters {
    hasDefaultPerspectiveCamera?: boolean;
    hasDefaultOrthographicCamera?: boolean;
    hasAxesHelper?: boolean;
    hasGridHelper?: boolean;
    hasDisplayMode?: boolean;
    displayMode?: ModelingSceneDisplayMode;
    defaultPerspectiveCameraSetting?: {
        fov: number;
        aspect: number;
        near: number;
        far: number;
    };
    defaultOrthographicCameraSetting?: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        near: number;
        far: number;
    };
}
export interface ModelingAxesHelperSetting {
    size?: number;
    visiable?: boolean;
}
export interface ModelingGridHelperSetting {
    size?: number;
    division?: number;
    axesColor?: number;
    meshColor?: number;
    rotation?: {
        x: number;
        y: number;
        z: number;
    };
}
export declare class ModelingScene extends Scene {
    private cameraSet;
    private lightSet;
    private meshSet;
    private lineSet;
    private pointsSet;
    private spriteSet;
    private displayMode?;
    private meshOverrideMaterial?;
    private lineOverrideMaterial?;
    private pointsOverrideMaterial?;
    private spriteOverrideMaterial?;
    private materialCacheMap?;
    private defaultAmbientLight?;
    private defaultDirectionalLight?;
    private backgroundCache?;
    private environmentCache?;
    private defaultPerspectiveCamera?;
    private defaultOrthograpbicCamera?;
    private axesHelper?;
    private gridHelper?;
    private showAxesHelper?;
    private showGridHelper?;
    getDefaultPerspectiveCamera?: () => PerspectiveCamera;
    getDefaultOrthographicCamera?: () => OrthographicCamera;
    setAxesHelper?: (setting: ModelingAxesHelperSetting) => void;
    setGridHelper?: (setting: ModelingGridHelperSetting) => void;
    setDispalyMode?: (mode: ModelingSceneDisplayMode) => void;
    constructor(config: ModelingSceneParameters);
    setViewPoint(direction: ModelingSceneViewpoint): void;
    add(...object: Object3D[]): this;
    remove(...object: Object3D[]): this;
    _add(...object: Object3D[]): this;
    _remove(...object: Object3D[]): this;
}
