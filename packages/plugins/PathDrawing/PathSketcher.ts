import {
  BaseEvent,
  ENGINE_EVENT,
  EventDispatcher,
  SetSceneEvent,
} from "@vis-three/core";
import { PointerManagerEngine } from "@vis-three/plugin-pointer-manager";
import {
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  Plane,
  PlaneBufferGeometry,
  Quaternion,
  Vector2,
  Vector3,
} from "three";

export interface Face {
  a: Vector3;
  b: Vector3;
  c: Vector3;
}

export interface WriteEvent extends BaseEvent {
  point: Vector3;
  relativePoint: Vector3;
}

export interface MoveEvent extends WriteEvent {}

export enum PATHSKETCHER_EVENT {
  BEGIN = "begin",
  END = "end",
  WRITE = "write",
  MOVE = "move",
}

export class PathSketcher extends EventDispatcher {
  camera = new OrthographicCamera(
    -window.innerWidth,
    window.innerWidth,
    window.innerHeight,
    -window.innerHeight,
    0,
    10000
  );

  plane = new Plane(new Vector3(0, 0, 1), 0);

  boardOffset = 20;

  drawingBoard = new Mesh(
    new PlaneBufferGeometry(150, 150),
    new MeshBasicMaterial({
      transparent: true,
      opacity: 0.2,
      color: "rgb(64, 255, 242)",
    })
  );

  relativeMatrixInvert = new Matrix4();

  engine: PointerManagerEngine;

  private cachePoint = new Vector3();
  private cacheRelativePoint = new Vector3();

  private setScene = (event: SetSceneEvent) => {
    this.drawingBoard.parent && event.scene.add(this.drawingBoard);
  };

  private cacheWriteFun = (event: MouseEvent) => {
    const point = this.engine.pointerManager.intersectPlane(
      this.camera,
      this.plane,
      this.cachePoint
    );
    if (!point) {
      console.warn(
        `path sketcher can not intersect point in this plane and this camera`
      );
      return;
    }
    this.dispatchEvent({
      type: PATHSKETCHER_EVENT.WRITE,
      point,
      relativePoint: this.cacheRelativePoint
        .copy(point)
        .applyMatrix4(this.relativeMatrixInvert),
    });
  };

  private cacheMoveFun = (event: MouseEvent) => {
    const point = this.engine.pointerManager.intersectPlane(
      this.camera,
      this.plane,
      this.cachePoint
    );
    if (!point) {
      console.warn(
        `path sketcher can not intersect point in this plane and this camera`
      );
      return;
    }
    this.dispatchEvent({
      type: PATHSKETCHER_EVENT.MOVE,
      point,
      relativePoint: this.cacheRelativePoint
        .copy(point)
        .applyMatrix4(this.relativeMatrixInvert),
    });
  };

  constructor(engine: PointerManagerEngine) {
    super();
    this.engine = engine;
    this.drawingBoard.raycast = () => {};
    this.drawingBoard.matrixAutoUpdate = false;
    this.setDrawingBoardMatrix();

    engine.addEventListener(ENGINE_EVENT.SETSCENE, this.setScene);
  }

  setDraingBoardSize(width: number, height: number) {
    const newGeometry = new PlaneBufferGeometry(width, height);
    this.drawingBoard.geometry.copy(newGeometry);
    newGeometry.dispose();
  }

  offsetCamera(offset: Vector3) {
    const scalar = offset.length();
    offset
      .normalize()
      .applyQuaternion(
        new Quaternion().setFromUnitVectors(
          new Vector3(0, 1, 0),
          this.plane.normal
        )
      );

    this.camera.position
      .copy(this.plane.normal)
      .multiplyScalar(this.plane.constant)
      .add(offset.multiplyScalar(scalar));

    this.camera.zoom =
      (this.camera.top - this.camera.bottom) /
      (this.drawingBoard.geometry.parameters.height + this.boardOffset);

    this.camera.updateProjectionMatrix();

    this.drawingBoard.position.add(offset);
    this.drawingBoard.updateMatrix();
    this.drawingBoard.updateMatrixWorld(true);

    return this;
  }

  setRelativeObject(object: Object3D) {
    this.relativeMatrixInvert.copy(object.matrixWorld).invert();
    return this;
  }

  setDrawPlane(normal: Vector3, constant: number = 0) {
    this.plane.set(normal, constant);
    this.setDrawingBoardMatrix();
    return this;
  }

  setDrawPlaneByFace(face: Face): this {
    this.plane.setFromCoplanarPoints(face.a, face.b, face.c);
    this.setDrawingBoardMatrix();
    return this;
  }

  private setDrawingBoardMatrix() {
    const drawingBoard = this.drawingBoard;
    drawingBoard.position
      .copy(this.plane.normal)
      .multiplyScalar(this.plane.constant);
    drawingBoard.applyQuaternion(
      new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 1),
        this.plane.normal
      )
    );
    drawingBoard.updateMatrix();
    drawingBoard.updateMatrixWorld(true);
  }

  dispose() {
    this.drawingBoard.removeFromParent();
    this.drawingBoard.geometry.dispose();
    this.drawingBoard.material.dispose();
    this.engine.removeEventListener(ENGINE_EVENT.SETSCENE, this.setScene);
  }

  showDrawingBoard(show: boolean) {
    if (show) {
      this.engine.scene.add(this.drawingBoard);
    } else {
      this.engine.scene.remove(this.drawingBoard);
    }
    return this;
  }

  setSketcherByPlane(
    normal: Vector3 = new Vector3(0, 0, 1),
    constant: number = 0,
    offset: Vector3 = new Vector3(0, 50, 0)
  ) {
    return this.setDrawPlane(normal, constant).offsetCamera(offset);
  }

  setSketcherByFace(face: Face, offset: Vector3 = new Vector3(0, 50, 0)) {
    return this.setDrawPlaneByFace(face).offsetCamera(offset);
  }

  setSketcherByFaceAndObject(face: Face, object: Object3D) {
    const position = new Vector3().setFromMatrixPosition(object.matrixWorld);
    this.setRelativeObject(object);
    return this.setSketcherByFace(face, position);
  }

  changeToDrawingView() {
    this.engine.setCamera(this.camera);
    return this;
  }

  beginDraw() {
    this.dispatchEvent({
      type: PATHSKETCHER_EVENT.BEGIN,
    });
    const pointerManager = this.engine.pointerManager;
    pointerManager.once<MouseEvent>("mousedown", (event) => {
      this.cacheWriteFun(event);
      pointerManager.addEventListener("mousedown", this.cacheWriteFun);
      pointerManager.addEventListener("pointermove", this.cacheMoveFun);
    });
    return this;
  }

  endDraw(clearEvent: boolean = true) {
    const pointerManager = this.engine.pointerManager;
    pointerManager.removeEventListener("mousedown", this.cacheWriteFun);
    pointerManager.removeEventListener("pointermove", this.cacheMoveFun);
    this.dispatchEvent({
      type: PATHSKETCHER_EVENT.END,
    });

    if (clearEvent) {
      this.removeEvent(PATHSKETCHER_EVENT.BEGIN);
      this.removeEvent(PATHSKETCHER_EVENT.WRITE);
      this.removeEvent(PATHSKETCHER_EVENT.MOVE);
      this.removeEvent(PATHSKETCHER_EVENT.END);
    }
    return this;
  }
}
