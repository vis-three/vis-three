import { Camera, Euler, EventDispatcher, Vector3 } from "three";

const _euler = new Euler(0, 0, 0, "YXZ");
const _vector = new Vector3();

const _changeEvent = { type: "change" };

const _PI_2 = Math.PI / 2;

export enum MOUSE_BUTTON {
  LEFT = 0,
  MID = 1,
  RIGHT = 2,
}

export class PointerVisualControls extends EventDispatcher {
  domElement: HTMLElement;
  camera: Camera;
  minPolarAngle = 0; // radians
  maxPolarAngle = Math.PI; // radians
  pointerSpeed = 1.0;
  pointerButton = MOUSE_BUTTON.LEFT;

  private isLocked = false;
  private direction = new Vector3(0, 0, -1);
  private _mouseMove = this.onMouseMove.bind(this);
  private _mouseDown = this.onMouseDown.bind(this);
  private _mouseUp = this.onMouseUp.bind(this);

  constructor(camera: Camera, domElement: HTMLElement) {
    super();

    if (domElement === undefined) {
      console.warn(
        'PointerVisualControls: The second parameter "domElement" is now mandatory.'
      );
      domElement = document.body;
    }

    this.domElement = domElement;
    this.camera = camera;

    this.connect();
  }

  setDom(dom: HTMLElement) {
    this.dispose();
    this.domElement = dom;
    this.connect();
  }

  setCamera(camera: Camera) {
    this.camera = camera;
  }

  getDirection(v: Vector3) {
    return v.copy(this.direction).applyQuaternion(this.camera.quaternion);
  }

  onMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      this.isLocked = true;
    }
  }

  onMouseUp(event: MouseEvent) {
    if (event.button === 0) {
      this.isLocked = false;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isLocked === false) return;

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    _euler.setFromQuaternion(this.camera.quaternion);

    _euler.y -= movementX * 0.002 * this.pointerSpeed;
    _euler.x -= movementY * 0.002 * this.pointerSpeed;

    _euler.x = Math.max(
      _PI_2 - this.maxPolarAngle,
      Math.min(_PI_2 - this.minPolarAngle, _euler.x)
    );

    this.camera.quaternion.setFromEuler(_euler);

    this.dispatchEvent(_changeEvent);
  }

  connect() {
    this.domElement.addEventListener("mousemove", this._mouseMove);
    this.domElement.addEventListener("mousedown", this._mouseDown);
    this.domElement.addEventListener("mouseup", this._mouseUp);
  }

  dispose() {
    this.domElement.removeEventListener("mousemove", this._mouseMove);
    this.domElement.removeEventListener("mousedown", this._mouseDown);
    this.domElement.removeEventListener("mouseup", this._mouseUp);
  }

  getObject() {
    return this.camera;
  }

  moveForward(distance: number) {
    // move forward parallel to the xz-plane
    // assumes camera.up is y-up
    const camera = this.camera;

    _vector.setFromMatrixColumn(camera.matrix, 0);

    _vector.crossVectors(camera.up, _vector);

    camera.position.addScaledVector(_vector, distance);
  }

  moveRight(distance: number) {
    _vector.setFromMatrixColumn(this.camera.matrix, 0);

    this.camera.position.addScaledVector(_vector, distance);
  }
}
