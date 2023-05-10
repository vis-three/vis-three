import { BaseEvent, EventDispatcher } from "@vis-three/core";
import { PointerManagerEngine } from "@vis-three/plugin-pointer-manager";
import { Matrix4, Mesh, MeshBasicMaterial, Object3D, OrthographicCamera, Plane, PlaneBufferGeometry, Vector3 } from "three";
export interface Face {
    a: Vector3;
    b: Vector3;
    c: Vector3;
}
export interface WriteEvent extends BaseEvent {
    point: Vector3;
    relativePoint: Vector3;
}
export interface MoveEvent extends WriteEvent {
}
export declare enum PATHSKETCHER_EVENT {
    BEGIN = "begin",
    END = "end",
    WRITE = "write",
    MOVE = "move"
}
export declare class PathSketcher extends EventDispatcher {
    camera: OrthographicCamera;
    plane: Plane;
    boardOffset: number;
    drawingBoard: Mesh<PlaneBufferGeometry, MeshBasicMaterial>;
    relativeMatrixInvert: Matrix4;
    engine: PointerManagerEngine;
    private cachePoint;
    private cacheRelativePoint;
    begun: boolean;
    private setScene;
    private cacheBeginWriteFun;
    private cacheWriteFun;
    private cacheMoveFun;
    constructor(engine: PointerManagerEngine);
    setDraingBoardSize(width: number, height: number): void;
    offsetCamera(offset: Vector3): this;
    setRelativeObject(object: Object3D): this;
    setDrawPlane(normal: Vector3, constant?: number): this;
    setDrawPlaneByFace(face: Face): this;
    private setDrawingBoardMatrix;
    dispose(): void;
    showDrawingBoard(show: boolean): this;
    setSketcherByPlane(normal?: Vector3, constant?: number, offset?: Vector3): this;
    setSketcherByFace(face: Face, offset?: Vector3): this;
    setSketcherByFaceAndObject(face: Face, object: Object3D): this;
    changeToDrawingView(): this;
    beginDraw(): this;
    endDraw(clearEvent?: boolean): this;
}
