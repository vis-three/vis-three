import { Color, Euler, Matrix4, MeshBasicMaterial, Object3D, OrthographicCamera, PerspectiveCamera, Quaternion, Vector3 } from "three";
export interface GizmoObject extends Object3D {
    tag: string;
    material: MeshBasicMaterial;
}
export interface CacheMaterial extends MeshBasicMaterial {
    _opacity: number;
    _color: Color;
    color: Color;
}
export declare class TransformControlsGizmo extends Object3D {
    camera: PerspectiveCamera | OrthographicCamera;
    object?: Object3D;
    enabled: boolean;
    mode: "scale" | "position" | "rotation";
    space: "local" | "world";
    gizmo: any;
    picker: any;
    helper: any;
    axis: string;
    translationSnap: null;
    rotationSnap: null;
    scaleSnap: null;
    size: number;
    dragging: boolean;
    showX: boolean;
    showY: boolean;
    showZ: boolean;
    worldPosition: Vector3;
    worldPositionStart: Vector3;
    worldQuaternion: Quaternion;
    worldQuaternionStart: Quaternion;
    cameraPosition: Vector3;
    cameraQuaternion: Quaternion;
    pointStart: Vector3;
    pointEnd: Vector3;
    rotationAxis: Vector3;
    rotationAngle: number;
    eye: Vector3;
    _tempVector: Vector3;
    _identityQuaternion: Quaternion;
    _tempEuler: Euler;
    _alignVector: Vector3;
    _zeroVector: Vector3;
    _lookAtMatrix: Matrix4;
    _tempQuaternion: Quaternion;
    _tempQuaternion2: Quaternion;
    _unitX: Vector3;
    _unitY: Vector3;
    _unitZ: Vector3;
    constructor();
    updateMatrixWorld(force: any): void;
}
