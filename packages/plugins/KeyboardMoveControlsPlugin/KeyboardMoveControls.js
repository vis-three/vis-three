export class KeyboardMoveControls {
    object;
    domElement;
    enabled = true;
    movementSpeed = 1.0;
    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
    _onKeyDown = this.onKeyDown.bind(this);
    _onKeyUp = this.onKeyUp.bind(this);
    constructor(object, domElement) {
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
            case "KeyR":
                this.moveUp = true;
                break;
            case "KeyF":
                this.moveDown = true;
                break;
        }
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
            case "KeyR":
                this.moveUp = false;
                break;
            case "KeyF":
                this.moveDown = false;
                break;
        }
    }
    update(delta) {
        if (this.enabled === false)
            return;
        const actualMoveSpeed = delta * this.movementSpeed;
        if (this.moveForward)
            this.object.translateZ(-actualMoveSpeed);
        if (this.moveBackward)
            this.object.translateZ(actualMoveSpeed);
        if (this.moveLeft)
            this.object.translateX(-actualMoveSpeed);
        if (this.moveRight)
            this.object.translateX(actualMoveSpeed);
        if (this.moveUp)
            this.object.translateY(actualMoveSpeed);
        if (this.moveDown)
            this.object.translateY(-actualMoveSpeed);
    }
    dispose() {
        window.removeEventListener("keydown", this._onKeyDown);
        window.removeEventListener("keyup", this._onKeyUp);
    }
}
