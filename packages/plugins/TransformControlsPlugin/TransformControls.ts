import {
  BaseEvent,
  BoxBufferGeometry,
  Camera,
  Euler,
  Matrix4,
  Mesh,
  Object3D,
  Quaternion,
  Raycaster,
  Scene,
  Sprite,
  Vector3,
} from "three";
import { TransformControlsGizmo } from "./TransformControlsGizmo";
import { TransformControlsPlane } from "./TransformControlsPlane";

export enum TRANSFORM_EVENT {
  HOVER = "hover",
  CHANGE = "change",
  MOUSE_DOWN = "mouseDown",
  OBJECT_CHANGE = "objectChange",
  MOUSE_UP = "mouseUp",
}

class TransformControls extends Object3D {
  domElement: HTMLElement;
  gizmo: TransformControlsGizmo;
  plane: TransformControlsPlane;

  camera!: Camera;
  object: Object3D = new Object3D();
  enabled = true;
  mode: "scale" | "position" | "rotation" = "position";
  space: "local" | "world" = "local";
  axis: string | null = "XYZ";
  translationSnap = 0;
  rotationSnap = 0;
  scaleSnap = 0;
  size = 1;
  dragging = false;
  showX = true;
  showY = true;
  showZ = true;

  private cacheScene: Object3D | null = null;
  private transObjectSet = new Set<Object3D>();
  private cacheObjects: Map<
    Object3D,
    {
      virtual: Object3D;
      matrixAutoUpdate: boolean;
    }
  > = new Map();

  worldPosition!: Vector3;
  worldPositionStart!: Vector3;
  worldQuaternion!: Quaternion;
  worldQuaternionStart!: Quaternion;
  cameraPosition!: Vector3;
  cameraQuaternion!: Quaternion;
  pointStart!: Vector3;
  pointEnd!: Vector3;
  rotationAxis!: Vector3;
  rotationAngle = 0;
  eye!: Vector3;

  _getPointer: (event: any) => void;
  _onPointerDown: (event: any) => void;
  _onPointerHover: (event: any) => void;
  _onPointerMove: (event: any) => void;
  _onPointerUp: (event: any) => void;

  _raycaster = new Raycaster();
  _offset = new Vector3();
  _startNorm = new Vector3();
  _endNorm = new Vector3();
  _cameraScale = new Vector3();

  _parentPosition = new Vector3();
  _parentQuaternion = new Quaternion();
  _parentQuaternionInv = new Quaternion();
  _parentScale = new Vector3();

  _worldScaleStart = new Vector3();
  _worldQuaternionInv = new Quaternion();
  _worldScale = new Vector3();

  _positionStart = new Vector3();
  _quaternionStart = new Quaternion();
  _scaleStart = new Vector3();

  _tempQuaternion = new Quaternion();
  _tempVector = new Vector3();
  _tempVector2 = new Vector3();
  _tempMatrix = new Matrix4();

  _unit = {
    X: new Vector3(1, 0, 0),
    Y: new Vector3(0, 1, 0),
    Z: new Vector3(0, 0, 1),
  };

  constructor(camera: Camera, domElement: HTMLElement, scene: Scene) {
    super();

    if (domElement === undefined) {
      console.warn(
        'THREE.TransformControls: The second parameter "domElement" is now mandatory.'
      );
      domElement = document.body;
    }

    this.domElement = domElement;

    this.cacheScene = scene;

    const gizmo = new TransformControlsGizmo();
    this.gizmo = gizmo;
    this.add(gizmo);

    const plane = new TransformControlsPlane();
    this.plane = plane;
    this.add(plane);

    const scope = this;

    // Defined getter, setter and store for a property
    function defineProperty(propName, defaultValue) {
      let propValue = defaultValue;

      Object.defineProperty(scope, propName, {
        get: function () {
          return propValue !== undefined ? propValue : defaultValue;
        },

        set: function (value) {
          if (propValue !== value) {
            propValue = value;
            plane[propName] = value;
            gizmo[propName] = value;
          }
        },
      });

      scope[propName] = defaultValue;
      plane[propName] = defaultValue;
      gizmo[propName] = defaultValue;
    }

    // Define properties with getters/setter
    // Setting the defined property will automatically trigger change event
    // Defined properties are passed down to gizmo and plane

    defineProperty("camera", camera);
    defineProperty("object", this.object);
    defineProperty("enabled", true);
    defineProperty("axis", null);
    defineProperty("mode", "position");
    defineProperty("translationSnap", 0);
    defineProperty("rotationSnap", 0);
    defineProperty("scaleSnap", 0);
    defineProperty("space", "world");
    defineProperty("size", 1);
    defineProperty("dragging", false);
    defineProperty("showX", true);
    defineProperty("showY", true);
    defineProperty("showZ", true);

    // Reusable utility variables

    const worldPosition = new Vector3();
    const worldPositionStart = new Vector3();
    const worldQuaternion = new Quaternion();
    const worldQuaternionStart = new Quaternion();
    const cameraPosition = new Vector3();
    const cameraQuaternion = new Quaternion();
    const pointStart = new Vector3();
    const pointEnd = new Vector3();
    const rotationAxis = new Vector3();
    const rotationAngle = 0;
    const eye = new Vector3();

    // TODO: remove properties unused in plane and gizmo

    defineProperty("worldPosition", worldPosition);
    defineProperty("worldPositionStart", worldPositionStart);
    defineProperty("worldQuaternion", worldQuaternion);
    defineProperty("worldQuaternionStart", worldQuaternionStart);
    defineProperty("cameraPosition", cameraPosition);
    defineProperty("cameraQuaternion", cameraQuaternion);
    defineProperty("pointStart", pointStart);
    defineProperty("pointEnd", pointEnd);
    defineProperty("rotationAxis", rotationAxis);
    defineProperty("rotationAngle", rotationAngle);
    defineProperty("eye", eye);

    this._getPointer = this.getPointer.bind(this);
    this._onPointerDown = this.onPointerDown.bind(this);
    this._onPointerHover = this.onPointerHover.bind(this);
    this._onPointerMove = this.onPointerMove.bind(this);
    this._onPointerUp = this.onPointerUp.bind(this);
  }

  setDom(dom: HTMLElement) {
    this.disconnect();
    this.domElement = dom;
    this.connect();
    return this;
  }

  setScene(scene: Scene) {
    this.cacheScene = scene;
  }

  setCamera(camera: Camera) {
    this.camera = camera;
    return this;
  }

  getTransObjectSet(): Set<Object3D> {
    return this.transObjectSet;
  }

  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointermove", this._onPointerHover);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
  }

  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerup",
      this._onPointerUp
    );
  }

  // updateMatrixWorld  updates key transformation variables
  updateMatrixWorld() {
    if (this.object !== undefined) {
      this.object.updateMatrixWorld();

      if (this.object.parent === null) {
        console.error(
          "TransformControls: The attached 3D object must be a part of the scene graph."
        );
      } else {
        this.object.parent.matrixWorld.decompose(
          this._parentPosition,
          this._parentQuaternion,
          this._parentScale
        );
      }

      this.object.matrixWorld.decompose(
        this.worldPosition,
        this.worldQuaternion,
        this._worldScale
      );

      this._parentQuaternionInv.copy(this._parentQuaternion).invert();
      this._worldQuaternionInv.copy(this.worldQuaternion).invert();
    }

    this.camera.matrixWorld.decompose(
      this.cameraPosition,
      this.cameraQuaternion,
      this._cameraScale
    );

    this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize();

    super.updateMatrixWorld(true);
  }

  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerup",
      this._onPointerUp
    );

    this.traverse((child) => {
      if ((<Sprite>child).geometry) (<Sprite>child).geometry.dispose();
      if ((<Sprite>child).material) (<Sprite>child).material.dispose();
    });
  }

  attach() {
    this.connect();
    this.cacheScene?.add(this.object);
    this.cacheScene?.add(this);
    return this;
  }

  // Detatch
  detach() {
    this.disconnect();
    this.cacheScene?.remove(this);
    this.cacheScene?.remove(this.object);
    this.axis = null;
    return this;
  }

  setAttach(...object: Object3D[]): this {
    this.transObjectSet.clear();
    this.cacheObjects.clear();

    if (!object.length || !object[0]) {
      this.detach();
      return this;
    }

    this.attach();
    const target = this.object;

    if (object.length === 1) {
      const currentObject = object[0];

      currentObject.matrixWorld.decompose(
        target.position,
        target.quaternion,
        target.scale
      );

      target.updateMatrix();
      target.updateMatrixWorld();

      this.transObjectSet.add(currentObject);

      const virtual = new Object3D();
      target.add(virtual);

      virtual.matrixWorld.copy(currentObject.matrixWorld);
      this.applyMatrixToMatrixWorld(virtual.matrixWorld, virtual);

      this.cacheObjects.set(currentObject, {
        matrixAutoUpdate: currentObject.matrixAutoUpdate,
        virtual,
      });

      return this;
    }

    const xList: number[] = [];
    const yList: number[] = [];
    const zList: number[] = [];

    object.forEach((elem) => {
      xList.push(elem.matrixWorld.elements[12]);
      yList.push(elem.matrixWorld.elements[13]);
      zList.push(elem.matrixWorld.elements[14]);
    });

    target.rotation.set(0, 0, 0);
    target.scale.set(1, 1, 1);

    target.position.x =
      (Math.max(...xList) - Math.min(...xList)) / 2 + Math.min(...xList);
    target.position.y =
      (Math.max(...yList) - Math.min(...yList)) / 2 + Math.min(...yList);
    target.position.z =
      (Math.max(...zList) - Math.min(...zList)) / 2 + Math.min(...zList);

    target.updateMatrix();
    target.updateMatrixWorld();

    object.forEach((elem) => {
      this.transObjectSet.add(elem);
      const virtual = new Object3D();
      target.add(virtual);

      virtual.matrixWorld.copy(elem.matrixWorld);
      this.applyMatrixToMatrixWorld(virtual.matrixWorld, virtual);

      this.cacheObjects.set(elem, {
        matrixAutoUpdate: elem.matrixAutoUpdate,
        virtual,
      });
    });

    return this;
  }

  applyMatrixToMatrixWorld(matrix: Matrix4, object: Object3D) {
    object.matrixWorld.copy(matrix);
    object.matrix.multiplyMatrices(
      this._tempMatrix.copy(object.parent!.matrixWorld).invert(),
      object.matrixWorld
    );
    object.matrix.decompose(object.position, object.quaternion, object.scale);
  }

  // TODO: deprecate

  getMode() {
    return this.mode;
  }

  setMode(mode) {
    this.mode = mode;
  }

  setTranslationSnap(translationSnap) {
    this.translationSnap = translationSnap;
  }

  setRotationSnap(rotationSnap) {
    this.rotationSnap = rotationSnap;
  }

  setScaleSnap(scaleSnap) {
    this.scaleSnap = scaleSnap;
  }

  setSize(size) {
    this.size = size;
  }

  setSpace(space) {
    this.space = space;
  }

  intersectObjectWithRay(object, raycaster, includeInvisible?) {
    const allIntersections = raycaster.intersectObject(object, true);

    for (let i = 0; i < allIntersections.length; i++) {
      if (allIntersections[i].object.visible || includeInvisible) {
        return allIntersections[i];
      }
    }

    return false;
  }

  pointerHover(pointer) {
    if (this.object === undefined || this.dragging === true) return;

    this._raycaster.setFromCamera(pointer, this.camera);

    const intersect = this.intersectObjectWithRay(
      this.gizmo.picker[this.mode],
      this._raycaster
    );

    if (intersect) {
      this.axis = intersect.object.name;
      this.gizmo.updateMatrixWorld(true);
      this.plane.updateMatrixWorld(true);
      this.dispatchEvent({
        type: TRANSFORM_EVENT.HOVER,
        axis: this.axis,
        mode: this.mode,
      });
    } else {
      this.axis = null;
    }
  }

  pointerDown(pointer) {
    if (
      this.object === undefined ||
      this.dragging === true ||
      pointer.button !== 0
    )
      return;

    if (this.axis !== null) {
      this._raycaster.setFromCamera(pointer, this.camera);

      const planeIntersect = this.intersectObjectWithRay(
        this.plane,
        this._raycaster,
        true
      );

      if (planeIntersect) {
        let space = this.space;

        if (this.mode === "scale") {
          space = "local";
        } else if (
          this.axis === "E" ||
          this.axis === "XYZE" ||
          this.axis === "XYZ"
        ) {
          space = "world";
        }

        if (space === "local" && this.mode === "rotation") {
          const snap = this.rotationSnap;

          if (this.axis === "X" && snap)
            this.object.rotation.x =
              Math.round(this.object.rotation.x / snap) * snap;
          if (this.axis === "Y" && snap)
            this.object.rotation.y =
              Math.round(this.object.rotation.y / snap) * snap;
          if (this.axis === "Z" && snap)
            this.object.rotation.z =
              Math.round(this.object.rotation.z / snap) * snap;
        }

        this.object.updateMatrixWorld();
        this.object.parent && this.object.parent.updateMatrixWorld();

        this._positionStart.copy(this.object.position);
        this._quaternionStart.copy(this.object.quaternion);
        this._scaleStart.copy(this.object.scale);

        this.object.matrixWorld.decompose(
          this.worldPositionStart,
          this.worldQuaternionStart,
          this._worldScaleStart
        );

        this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
      }

      this.transObjectSet.forEach((object) => {
        object.matrixAutoUpdate = false;
      });

      this.dragging = true;
      this.dispatchEvent({ type: TRANSFORM_EVENT.MOUSE_DOWN, mode: this.mode });
    }
  }

  pointerMove(pointer) {
    const axis = this.axis;
    const mode = this.mode;
    const object = this.object;
    let space = this.space;

    if (mode === "scale") {
      space = "local";
    } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
      space = "world";
    }

    if (
      object === undefined ||
      axis === null ||
      this.dragging === false ||
      pointer.button !== -1
    )
      return;

    this._raycaster.setFromCamera(pointer, this.camera);

    const planeIntersect = this.intersectObjectWithRay(
      this.plane,
      this._raycaster,
      true
    );

    if (!planeIntersect) return;

    this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);

    if (mode === "position") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);

      if (space === "local" && axis !== "XYZ") {
        this._offset.applyQuaternion(this._worldQuaternionInv);
      }

      if (axis.indexOf("X") === -1) this._offset.x = 0;
      if (axis.indexOf("Y") === -1) this._offset.y = 0;
      if (axis.indexOf("Z") === -1) this._offset.z = 0;

      if (space === "local" && axis !== "XYZ") {
        this._offset
          .applyQuaternion(this._quaternionStart)
          .divide(this._parentScale);
      } else {
        this._offset
          .applyQuaternion(this._parentQuaternionInv)
          .divide(this._parentScale);
      }

      object.position.copy(this._offset).add(this._positionStart);

      // Apply translation snap

      if (this.translationSnap) {
        if (space === "local") {
          object.position.applyQuaternion(
            this._tempQuaternion.copy(this._quaternionStart).invert()
          );

          if (axis.search("X") !== -1) {
            object.position.x =
              Math.round(object.position.x / this.translationSnap) *
              this.translationSnap;
          }

          if (axis.search("Y") !== -1) {
            object.position.y =
              Math.round(object.position.y / this.translationSnap) *
              this.translationSnap;
          }

          if (axis.search("Z") !== -1) {
            object.position.z =
              Math.round(object.position.z / this.translationSnap) *
              this.translationSnap;
          }

          object.position.applyQuaternion(this._quaternionStart);
        }

        if (space === "world") {
          if (object.parent) {
            object.position.add(
              this._tempVector.setFromMatrixPosition(object.parent.matrixWorld)
            );
          }

          if (axis.search("X") !== -1) {
            object.position.x =
              Math.round(object.position.x / this.translationSnap) *
              this.translationSnap;
          }

          if (axis.search("Y") !== -1) {
            object.position.y =
              Math.round(object.position.y / this.translationSnap) *
              this.translationSnap;
          }

          if (axis.search("Z") !== -1) {
            object.position.z =
              Math.round(object.position.z / this.translationSnap) *
              this.translationSnap;
          }

          if (object.parent) {
            object.position.sub(
              this._tempVector.setFromMatrixPosition(object.parent.matrixWorld)
            );
          }
        }
      }
    } else if (mode === "scale") {
      if (axis.search("XYZ") !== -1) {
        let d = this.pointEnd.length() / this.pointStart.length();

        if (this.pointEnd.dot(this.pointStart) < 0) d *= -1;

        this._tempVector2.set(d, d, d);
      } else {
        this._tempVector.copy(this.pointStart);
        this._tempVector2.copy(this.pointEnd);

        this._tempVector.applyQuaternion(this._worldQuaternionInv);
        this._tempVector2.applyQuaternion(this._worldQuaternionInv);

        this._tempVector2.divide(this._tempVector);

        if (axis.search("X") === -1) {
          this._tempVector2.x = 1;
        }

        if (axis.search("Y") === -1) {
          this._tempVector2.y = 1;
        }

        if (axis.search("Z") === -1) {
          this._tempVector2.z = 1;
        }
      }

      // Apply scale

      object.scale.copy(this._scaleStart).multiply(this._tempVector2);

      if (this.scaleSnap) {
        if (axis.search("X") !== -1) {
          object.scale.x =
            Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap ||
            this.scaleSnap;
        }

        if (axis.search("Y") !== -1) {
          object.scale.y =
            Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap ||
            this.scaleSnap;
        }

        if (axis.search("Z") !== -1) {
          object.scale.z =
            Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap ||
            this.scaleSnap;
        }
      }
    } else if (mode === "rotation") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);

      const ROTATION_SPEED =
        20 /
        this.worldPosition.distanceTo(
          this._tempVector.setFromMatrixPosition(this.camera.matrixWorld)
        );

      if (axis === "E") {
        this.rotationAxis.copy(this.eye);
        this.rotationAngle = this.pointEnd.angleTo(this.pointStart);

        this._startNorm.copy(this.pointStart).normalize();
        this._endNorm.copy(this.pointEnd).normalize();

        this.rotationAngle *=
          this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1;
      } else if (axis === "XYZE") {
        this.rotationAxis.copy(this._offset).cross(this.eye).normalize();
        this.rotationAngle =
          this._offset.dot(
            this._tempVector.copy(this.rotationAxis).cross(this.eye)
          ) * ROTATION_SPEED;
      } else if (axis === "X" || axis === "Y" || axis === "Z") {
        this.rotationAxis.copy(this._unit[axis]);

        this._tempVector.copy(this._unit[axis]);

        if (space === "local") {
          this._tempVector.applyQuaternion(this.worldQuaternion);
        }

        this.rotationAngle =
          this._offset.dot(this._tempVector.cross(this.eye).normalize()) *
          ROTATION_SPEED;
      }

      // Apply rotation snap

      if (this.rotationSnap)
        this.rotationAngle =
          Math.round(this.rotationAngle / this.rotationSnap) *
          this.rotationSnap;

      // Apply rotate
      if (space === "local" && axis !== "E" && axis !== "XYZE") {
        object.quaternion.copy(this._quaternionStart);
        object.quaternion
          .multiply(
            this._tempQuaternion.setFromAxisAngle(
              this.rotationAxis,
              this.rotationAngle
            )
          )
          .normalize();
      } else {
        this.rotationAxis.applyQuaternion(this._parentQuaternionInv);
        object.quaternion.copy(
          this._tempQuaternion.setFromAxisAngle(
            this.rotationAxis,
            this.rotationAngle
          )
        );
        object.quaternion.multiply(this._quaternionStart).normalize();
      }
    }

    this.transObjectSet.forEach((elem) => {
      const cache = this.cacheObjects.get(elem)!;
      this.applyMatrixToMatrixWorld(cache.virtual.matrixWorld, elem);
    });

    this.dispatchEvent({
      type: TRANSFORM_EVENT.CHANGE,
      mode: this.mode,
      transObjectSet: this.transObjectSet,
    });
    this.dispatchEvent({
      type: TRANSFORM_EVENT.OBJECT_CHANGE,
      mode: this.mode,
      transObjectSet: this.transObjectSet,
    });
  }

  pointerUp(pointer) {
    if (pointer.button !== 0) return;

    if (this.dragging && this.axis !== null) {
      this.transObjectSet.forEach((object) => {
        const cacheTrans = this.cacheObjects.get(object)!;
        object.matrixAutoUpdate = cacheTrans.matrixAutoUpdate;
      });

      this.dispatchEvent({ type: TRANSFORM_EVENT.MOUSE_UP, mode: this.mode });
    }

    this.dragging = false;
    this.axis = null;
  }

  getPointer(event) {
    if (this.domElement.ownerDocument.pointerLockElement) {
      return {
        x: 0,
        y: 0,
        button: event.button,
      };
    } else {
      const pointer = event.changedTouches ? event.changedTouches[0] : event;

      const rect = this.domElement.getBoundingClientRect();

      return {
        x: ((pointer.clientX - rect.left) / rect.width) * 2 - 1,
        y: (-(pointer.clientY - rect.top) / rect.height) * 2 + 1,
        button: event.button,
      };
    }
  }

  onPointerDown(event) {
    if (!this.enabled) return;

    this.domElement.style.touchAction = "none"; // disable touch scroll
    this.domElement.ownerDocument.addEventListener(
      "pointermove",
      this._onPointerMove
    );

    this.pointerHover(this._getPointer(event));
    this.pointerDown(this._getPointer(event));
  }

  onPointerHover(event) {
    if (!this.enabled) return;

    switch (event.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(event));
        break;
    }
  }

  onPointerMove(event) {
    if (!this.enabled) return;

    this.pointerMove(this._getPointer(event));
  }

  onPointerUp(event) {
    if (!this.enabled) return;

    this.domElement.style.touchAction = "";
    this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    );

    this.pointerUp(this._getPointer(event));
  }
}

export { TransformControls, TransformControlsGizmo, TransformControlsPlane };
