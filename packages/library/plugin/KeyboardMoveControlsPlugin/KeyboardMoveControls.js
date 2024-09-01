import { EventDispatcher } from "@vis-three/core";
import { Vector3 } from "three";
export class KeyboardMoveControls extends EventDispatcher {
    constructor(object, domElement) {
        super();
        this.enabled = true;
        this.movementSpeed = 1.0;
        this.quickenSpeed = 10;
        this.space = "local";
        this.forwrad = new Vector3(0, 0, -1);
        this.extendKeyDown = () => { };
        this.extendKeyUp = () => { };
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.quicken = false;
        this.worldVector = new Vector3();
        this._onKeyDown = this.onKeyDown.bind(this);
        this._onKeyUp = this.onKeyUp.bind(this);
        if (domElement === undefined) {
            console.warn('THREE.KeyboardMoveControls: The second parameter "domElement" is now mandatory.');
            domElement = document.body;
        }
        this.object = object;
        this.domElement = domElement;
        window.addEventListener("keydown", this._onKeyDown);
        window.addEventListener("keyup", this._onKeyUp);
    }
    setCamera(camera) {
        this.object = camera;
    }
    setDom(dom) {
        this.domElement = dom;
    }
    onKeyDown(event) {
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
    onKeyUp(event) {
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
    update(delta) {
        if (this.enabled === false)
            return;
        this.dispatchEvent({
            type: "beforeUpdate",
            delta,
            object: this.object,
        });
        const actualMoveSpeed = delta * this.movementSpeed +
            (this.quicken ? this.quickenSpeed * delta : 0);
        const space = this.space;
        const object = this.object;
        const worldVector = this.worldVector;
        const forwradVector = typeof this.forwrad === "object" ? this.forwrad : this.forwrad(object);
        const upVector = object.up;
        if (this.moveForward) {
            if (space === "local") {
                object.translateZ(-actualMoveSpeed);
            }
            else {
                worldVector.copy(forwradVector);
                object.position.addScaledVector(worldVector, actualMoveSpeed);
            }
        }
        if (this.moveBackward) {
            if (space === "local") {
                object.translateZ(actualMoveSpeed);
            }
            else {
                worldVector.copy(forwradVector).applyAxisAngle(upVector, Math.PI);
                object.position.addScaledVector(worldVector, actualMoveSpeed);
            }
        }
        if (this.moveLeft) {
            if (space === "local") {
                object.translateX(-actualMoveSpeed);
            }
            else {
                worldVector.copy(forwradVector).applyAxisAngle(upVector, Math.PI / 2);
                object.position.addScaledVector(worldVector, actualMoveSpeed);
            }
        }
        if (this.moveRight) {
            if (space === "local") {
                object.translateX(actualMoveSpeed);
            }
            else {
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
