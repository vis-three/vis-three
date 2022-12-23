import { Camera, MathUtils, Object3D, Spherical, Vector3 } from "three";

const _lookDirection = new Vector3();
const _spherical = new Spherical();
const _target = new Vector3();

class FirstPersonControls {
  // API

  object: Object3D;
  domElement: HTMLElement;

  enabled = true;

  movementSpeed = 1.0;
  lookSpeed = 0.005;

  lookVertical = true;
  autoForward = false;

  activeLook = true;

  heightSpeed = false;
  heightCoef = 1.0;
  heightMin = 0.0;
  heightMax = 1.0;

  constrainVertical = false;
  verticalMin = 0;
  verticalMax = Math.PI;

  mouseDragOn = false;

  // internals

  autoSpeedFactor = 0.0;

  mouseX = 0;
  mouseY = 0;

  moveForward = false;
  moveBackward = false;
  moveLeft = false;
  moveRight = false;
  moveUp = false;
  moveDown = false;

  viewHalfX = 0;
  viewHalfY = 0;

  private targetPosition = new Vector3();
  private lat = 0;
  private lon = 0;
  private _onMouseMove = this.onMouseMove.bind(this);
  private _onMouseDown = this.onMouseDown.bind(this);
  private _onMouseUp = this.onMouseUp.bind(this);
  private _onKeyDown = this.onKeyDown.bind(this);
  private _onKeyUp = this.onKeyUp.bind(this);
  private contextmenu = function (event) {
    event.preventDefault();
  };

  constructor(object: Object3D, domElement: HTMLElement) {
    if (domElement === undefined) {
      console.warn(
        'THREE.FirstPersonControls: The second parameter "domElement" is now mandatory.'
      );
      domElement = document.body;
    }

    this.object = object;
    this.domElement = domElement;

    this.domElement.addEventListener("contextmenu", this.contextmenu);
    this.domElement.addEventListener("mousemove", this._onMouseMove);
    this.domElement.addEventListener("mousedown", this._onMouseDown);
    this.domElement.addEventListener("mouseup", this._onMouseUp);

    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);

    this.handleResize();
    this.setOrientation();
  }

  setCamera(camera: Camera) {
    this.object = camera;
  }

  setDom(dom: HTMLElement) {
    this.domElement.removeEventListener("contextmenu", this.contextmenu);
    this.domElement.removeEventListener("mousedown", this._onMouseDown);
    this.domElement.removeEventListener("mousemove", this._onMouseMove);
    this.domElement.removeEventListener("mouseup", this._onMouseUp);
    this.domElement = dom;

    this.domElement.addEventListener("contextmenu", this.contextmenu);
    this.domElement.addEventListener("mousedown", this._onMouseDown);
    this.domElement.addEventListener("mousemove", this._onMouseMove);
    this.domElement.addEventListener("mouseup", this._onMouseUp);
  }

  setOrientation() {
    const quaternion = this.object.quaternion;

    _lookDirection.set(0, 0, -1).applyQuaternion(quaternion);
    _spherical.setFromVector3(_lookDirection);

    this.lat = 90 - MathUtils.radToDeg(_spherical.phi);
    this.lon = MathUtils.radToDeg(_spherical.theta);
  }

  handleResize() {
    this.viewHalfX = this.domElement.offsetWidth / 2;
    this.viewHalfY = this.domElement.offsetHeight / 2;
  }

  onMouseDown(event: MouseEvent) {
    this.domElement.focus();

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = true;
          break;
        case 2:
          this.moveBackward = true;
          break;
      }
    }

    this.mouseDragOn = true;
  }

  onMouseUp(event: MouseEvent) {
    if (this.activeLook) {
      switch (event.button) {
        case 0:
          this.moveForward = false;
          break;
        case 2:
          this.moveBackward = false;
          break;
      }
    }

    this.mouseDragOn = false;
  }

  onMouseMove(event: MouseEvent) {
    this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
    this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        this.moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        this.moveRight = true;
        break;

      case "KeyR":
        this.moveUp = true;
        break;
      case "KeyF":
        this.moveDown = true;
        break;
    }
  }

  onKeyUp(event: KeyboardEvent) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        this.moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        this.moveRight = false;
        break;

      case "KeyR":
        this.moveUp = false;
        break;
      case "KeyF":
        this.moveDown = false;
        break;
    }
  }

  lookAt(x: number | Vector3, y: number, z: number) {
    if ((<Vector3>x).isVector3) {
      _target.copy(x as Vector3);
    } else {
      _target.set(x as number, y, z);
    }

    this.object.lookAt(_target);

    this.setOrientation();

    return this;
  }

  update(delta: number) {
    if (this.enabled === false) return;

    if (this.heightSpeed) {
      const y = MathUtils.clamp(
        this.object.position.y,
        this.heightMin,
        this.heightMax
      );
      const heightDelta = y - this.heightMin;

      this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
    } else {
      this.autoSpeedFactor = 0.0;
    }

    const actualMoveSpeed = delta * this.movementSpeed;

    if (this.moveForward || (this.autoForward && !this.moveBackward))
      this.object.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
    if (this.moveBackward) this.object.translateZ(actualMoveSpeed);

    if (this.moveLeft) this.object.translateX(-actualMoveSpeed);
    if (this.moveRight) this.object.translateX(actualMoveSpeed);

    if (this.moveUp) this.object.translateY(actualMoveSpeed);
    if (this.moveDown) this.object.translateY(-actualMoveSpeed);

    let actualLookSpeed = delta * this.lookSpeed;

    if (!this.activeLook) {
      actualLookSpeed = 0;
    }

    let verticalLookRatio = 1;

    if (this.constrainVertical) {
      verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
    }

    this.lon -= this.mouseX * actualLookSpeed;
    if (this.lookVertical)
      this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

    this.lat = Math.max(-85, Math.min(85, this.lat));

    let phi = MathUtils.degToRad(90 - this.lat);
    const theta = MathUtils.degToRad(this.lon);

    if (this.constrainVertical) {
      phi = MathUtils.mapLinear(
        phi,
        0,
        Math.PI,
        this.verticalMin,
        this.verticalMax
      );
    }

    const position = this.object.position;

    this.targetPosition.setFromSphericalCoords(1, phi, theta).add(position);

    this.object.lookAt(this.targetPosition);
  }

  dispose() {
    this.domElement.removeEventListener("contextmenu", this.contextmenu);
    this.domElement.removeEventListener("mousedown", this._onMouseDown);
    this.domElement.removeEventListener("mousemove", this._onMouseMove);
    this.domElement.removeEventListener("mouseup", this._onMouseUp);

    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("keyup", this._onKeyUp);
  }
}

export { FirstPersonControls };
