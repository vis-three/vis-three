import { Scene, Object3D } from 'three';
import { VisPerspectiveCamera } from '../visObject/visCamera/VisPerspectiveCamera';
import { VisOrthographicCamera } from '../visObject/visCamera/VisOrthographicCamera';
import { VisCamera } from '../visObject/visCamera/VisCamera';
import { VisObject3D } from '../visObject/VisObject';
export declare enum VisSceneCameraDefalutType {
    DefaultPerspectiveCamera = "DefaultPerspectiveCamera",
    DefaultOrthograpbicCamera = "DefaultOrthograpbicCamera"
}
export declare enum VisSceneViewpoint {
    DEFAULT = "default",
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    FRONT = "front",
    BACK = "back"
}
export declare enum VisSceneDisplayMode {
    GEOMETRY = 0,
    MATERIAL = 1,
    LIGHT = 2,
    ENV = 3
}
export declare enum VisSceneRenderOrder {
    GRIDHELPER = -200,
    AXESHELPER = -199
}
export interface VisSceneParameters {
    hasDefaultPerspectiveCamera?: boolean;
    hasDefaultOrthographicCamera?: boolean;
    hasAxesHelper?: boolean;
    hasGridHelper?: boolean;
    hasDisplayMode?: boolean;
    displayMode?: VisSceneDisplayMode;
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
export interface VisAxesHelperSetting {
    size?: number;
    visiable?: boolean;
}
export interface VisGridHelperSetting {
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
export declare class VisScene extends Scene {
    private cameraMap;
    private lightMap;
    private meshMap;
    private lineMap;
    private pointsMap;
    private spriteMap;
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
    private defaultCamera?;
    private defaultPerspectiveCamera?;
    private defaultOrthograpbicCamera?;
    private axesHelper?;
    private gridHelper?;
    private showAxesHelper?;
    private showGridHelper?;
    getDefaultPerspectiveCamera?: () => VisPerspectiveCamera;
    getDefaultOrthographicCamera?: () => VisOrthographicCamera;
    setAxesHelper?: (setting: VisAxesHelperSetting) => void;
    setGridHelper?: (setting: VisGridHelperSetting) => void;
    setDispalyMode?: (mode: VisSceneDisplayMode) => void;
    constructor(config: VisSceneParameters);
    setDefaultCamera(): void;
    getCamera(vid: string): VisCamera | null;
    setViewPoint(direction: VisSceneViewpoint): void;
    add(...object: VisObject3D[]): this;
    remove(...object: VisObject3D[]): this;
    _add(...object: Object3D[]): this;
    _remove(...object: Object3D[]): this;
    dispalyModeTest(): this;
}
//# sourceMappingURL=VisScene.d.ts.map