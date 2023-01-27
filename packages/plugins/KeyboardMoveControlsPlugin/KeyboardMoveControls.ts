import { BaseEvent, EventDispatcher } from "@vis-three/core";
import { Camera, Object3D, Vector3 } from "three";

export interface BeforeUpdateEvent extends BaseEvent {
  type: "beforeUpdate";
  delta: number;
  object: Object3D;
}

export interface AfterUpdateEvent extends BaseEvent {
  type: "afterUpdate";
  delta: number;
  object: Object3D;
}

export class KeyboardMoveControls extends EventDispatcher {
  object: Object3D;
  domElement: HTMLElement;

  enabled = true;

  movementSpeed = 1.0;
  quickenSpeed = 10;

  space = "local";

  forwrad: Vector3 | ((object: Object3D) => Vector3) = new Vector3(0, 0, -1);

  extendKeyDown: (event: KeyboardEvent) => void = () => {};
  extendKeyUp: (event: KeyboardEvent) => void = () => {};

  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private quicken = false;

  private worldVector = new Vector3();
  private _onKeyDown = this.onKeyDown.bind(this);
  private _onKeyUp = this.onKeyUp.bind(this);

  constructor(object: Object3D, domElement: HTMLElement) {
    super();
    if (domElement === undefined) {
      console.warn(
        'THREE.KeyboardMoveControls: The second parameter "domElement" is now mandatory.'
      );
      domElement = document.body;
    }

    this.object = object;
    this.domElement = domElement;

    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);
  }

  setCamera(camera: Camera) {
    this.object = camera;
  }

  setDom(dom: HTMLElement) {
    this.domElement = dom;
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
    }

    if (event.shiftKey) {
      this.quicken = true;
    }

    this.extendKeyDown(event);
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
    }

    if (!event.shiftKey) {
      this.quicken = false;
    }

    this.extendKeyUp(event);
  }

  update(delta: number) {
    if (this.enabled === false) return;

    this.dispatchEvent({
      type: "beforeUpdate",
      delta,
      object: this.object,
    });

    const actualMoveSpeed =
      delta * this.movementSpeed +
      (this.quicken ? this.quickenSpeed * delta : 0);
    const space = this.space;
    const object = this.object;
    const worldVector = this.worldVector;
    const forwradVector =
      typeof this.forwrad === "object" ? this.forwrad : this.forwrad(object);
    const upVector = object.up;

    if (this.moveForward) {
      if (space === "local") {
        object.translateZ(-actualMoveSpeed);
      } else {
        worldVector.copy(forwradVector);
        object.position.addScaledVector(worldVector, actualMoveSpeed);
      }
    }
    if (this.moveBackward) {
      if (space === "local") {
        object.translateZ(actualMoveSpeed);
      } else {
        worldVector.copy(forwradVector).applyAxisAngle(upVector, Math.PI);
        object.position.addScaledVector(worldVector, actualMoveSpeed);
      }
    }

    if (this.moveLeft) {
      if (space === "local") {
        object.translateX(-actualMoveSpeed);
      } else {
        worldVector.copy(forwradVector).applyAxisAngle(upVector, Math.PI / 2);
        object.position.addScaledVector(worldVector, actualMoveSpeed);
      }
    }
    if (this.moveRight) {
      if (space === "local") {
        object.translateX(actualMoveSpeed);
      } else {
        worldVector.copy(forwradVector).applyAxisAngle(upVector, -Math.PI / 2);
        object.position.addScaledVector(worldVector, actualMoveSpeed);
      }
    }

    this.dispatchEvent({
      type: "afterUpdate",
      delta,
      object,
    });
  }

  dispose() {
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("keyup", this._onKeyUp);
  }
}
