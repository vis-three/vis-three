import { Camera, Euler, EventDispatcher, Vector3 } from "three";

const _euler = new Euler(0, 0, 0, "YXZ");
const _vector = new Vector3();

const _changeEvent = { type: "change" };
const _lockEvent = { type: "lock" };
const _unlockEvent = { type: "unlock" };

const _PI_2 = Math.PI / 2;

export class PointerLockControls extends EventDispatcher {
  domElement: HTMLElement;
  camera: Camera;
  isLocked = false;
  minPolarAngle = 0; // radians
  maxPolarAngle = Math.PI; // radians
  pointerSpeed = 1.0;

  private direction = new Vector3(0, 0, -1);
  private _mouseMove = this.onMouseMove.bind(this);
  private _pointerlockChange = this.onPointerlockChange.bind(this);
  private _pointerlockError = this.onPointerlockError.bind(this);

  constructor(camera: Camera, domElement: HTMLElement) {
    super();

    if (domElement === undefined) {
      console.warn(
        'THREE.PointerLockControls: The second parameter "domElement" is now mandatory.'
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

  onPointerlockChange() {
    if (this.domElement.ownerDocument.pointerLockElement === this.domElement) {
      this.dispatchEvent(_lockEvent);

      this.isLocked = true;
    } else {
      this.dispatchEvent(_unlockEvent);

      this.isLocked = false;
    }
  }

  onPointerlockError() {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  }

  connect() {
    this.domElement.ownerDocument.addEventListener(
      "mousemove",
      this._mouseMove
    );
    this.domElement.ownerDocument.addEventListener(
      "pointerlockchange",
      this._pointerlockChange
    );
    this.domElement.ownerDocument.addEventListener(
      "pointerlockerror",
      this._pointerlockError
    );
  }

  dispose() {
    this.domElement.ownerDocument.removeEventListener(
      "mousemove",
      this._mouseMove
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerlockchange",
      this._pointerlockChange
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerlockerror",
      this._pointerlockError
    );
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

  lock() {
    this.domElement.requestPointerLock();
  }

  unlock() {
    this.domElement.ownerDocument.exitPointerLock();
  }
}
