import { MOUSE, OrthographicCamera, PerspectiveCamera, Quaternion, Spherical, TOUCH, Vector2, Vector3, } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
export class VisOrbitControls extends EventDispatcher {
    object;
    domElement;
    // Set to false to disable this control
    enabled = true;
    // "target" sets the location of focus, where the object orbits around
    target = new Vector3();
    // How far you can dolly in and out ( PerspectiveCamera only )
    minDistance = 0;
    maxDistance = Infinity;
    // How far you can zoom in and out ( OrthographicCamera only )
    minZoom = 0;
    maxZoom = Infinity;
    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    minPolarAngle = 0; // radians
    maxPolarAngle = Math.PI; // radians
    // How far you can orbit horizontally, upper and lower limits.
    // If set, the interval [ min, max ] must be a sub-interval of [ - 2 PI, 2 PI ], with ( max - min < 2 PI )
    minAzimuthAngle = -Infinity; // radians
    maxAzimuthAngle = Infinity; // radians
    // Set to true to enable damping (inertia)
    // If damping is enabled, you must call controls.update() in your animation loop
    enableDamping = false;
    dampingFactor = 0.05;
    // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
    // Set to false to disable zooming
    enableZoom = true;
    zoomSpeed = 1.0;
    // Set to false to disable rotating
    enableRotate = true;
    rotateSpeed = 1.0;
    // Set to false to disable panning
    enablePan = true;
    panSpeed = 1.0;
    screenSpacePanning = true; // if false, pan orthogonal to world-space direction camera.up
    keyPanSpeed = 7.0; // pixels moved per arrow key push
    // Set to true to automatically rotate around the target
    // If auto-rotate is enabled, you must call controls.update() in your animation loop
    autoRotate = false;
    autoRotateSpeed = 2.0; // 30 seconds per orbit when fps is 60
    // The four arrow keys
    keys = {
        LEFT: "ArrowLeft",
        UP: "ArrowUp",
        RIGHT: "ArrowRight",
        BOTTOM: "ArrowDown",
    };
    // Mouse buttons
    mouseButtons = {
        LEFT: null,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE,
    };
    // Touch fingers
    touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };
    // for reset
    target0;
    position0;
    zoom0;
    // the target DOM element for key events
    _domElementKeyEvents = null;
    spherical;
    // reset
    reset;
    // update
    update;
    // onContextMenu
    onContextMenu;
    // onPointerDown
    onPointerDown;
    // onPointerCancel
    onPointerCancel;
    // onMouseWheel
    onMouseWheel;
    // onPointerMove
    onPointerMove;
    // onPointerUp
    onPointerUp;
    // onKeyDown
    onKeyDown;
    constructor(object, domElement) {
        super();
        this.object = object || new PerspectiveCamera();
        this.domElement = domElement || document.createElement("div");
        this.domElement.style.touchAction = "none"; // disable touch scroll
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
        // this method is exposed, but perhaps it would be better if we can make it private...
        this.update = (() => {
            const offset = new Vector3();
            // so camera.up is the orbit axis
            const quat = new Quaternion().setFromUnitVectors(this.object.up, new Vector3(0, 1, 0));
            const quatInverse = quat.clone().invert();
            const lastPosition = new Vector3();
            const lastQuaternion = new Quaternion();
            const twoPI = 2 * Math.PI;
            return () => {
                const position = this.object.position;
                offset.copy(position).sub(this.target);
                // rotate offset to "y-axis-is-up" space
                offset.applyQuaternion(quat);
                // angle from z-axis around y-axis
                spherical.setFromVector3(offset);
                if (this.autoRotate && state === STATE.NONE) {
                    rotateLeft(getAutoRotationAngle());
                }
                if (this.enableDamping) {
                    spherical.theta += sphericalDelta.theta * this.dampingFactor;
                    spherical.phi += sphericalDelta.phi * this.dampingFactor;
                }
                else {
                    spherical.theta += sphericalDelta.theta;
                    spherical.phi += sphericalDelta.phi;
                }
                // restrict theta to be between desired limits
                let min = this.minAzimuthAngle;
                let max = this.maxAzimuthAngle;
                if (isFinite(min) && isFinite(max)) {
                    if (min < -Math.PI)
                        min += twoPI;
                    else if (min > Math.PI)
                        min -= twoPI;
                    if (max < -Math.PI)
                        max += twoPI;
                    else if (max > Math.PI)
                        max -= twoPI;
                    if (min <= max) {
                        spherical.theta = Math.max(min, Math.min(max, spherical.theta));
                    }
                    else {
                        spherical.theta =
                            spherical.theta > (min + max) / 2
                                ? Math.max(min, spherical.theta)
                                : Math.min(max, spherical.theta);
                    }
                }
                // restrict phi to be between desired limits
                spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, spherical.phi));
                spherical.makeSafe();
                spherical.radius *= scale;
                // restrict radius to be between desired limits
                spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, spherical.radius));
                // move target to panned location
                if (this.enableDamping === true) {
                    this.target.addScaledVector(panOffset, this.dampingFactor);
                }
                else {
                    this.target.add(panOffset);
                }
                offset.setFromSpherical(spherical);
                // rotate offset back to "camera-up-vector-is-up" space
                offset.applyQuaternion(quatInverse);
                position.copy(this.target).add(offset);
                this.object.lookAt(this.target);
                if (this.enableDamping === true) {
                    sphericalDelta.theta *= 1 - this.dampingFactor;
                    sphericalDelta.phi *= 1 - this.dampingFactor;
                    panOffset.multiplyScalar(1 - this.dampingFactor);
                }
                else {
                    sphericalDelta.set(0, 0, 0);
                    panOffset.set(0, 0, 0);
                }
                scale = 1;
                // update condition is:
                // min(camera displacement, camera rotation in radians)^2 > EPS
                // using small-angle approximation cos(x/2) = 1 - x^2 / 8
                if (zoomChanged ||
                    lastPosition.distanceToSquared(this.object.position) > EPS ||
                    8 * (1 - lastQuaternion.dot(this.object.quaternion)) > EPS) {
                    this.dispatchEvent({ type: "change" });
                    lastPosition.copy(this.object.position);
                    lastQuaternion.copy(this.object.quaternion);
                    zoomChanged = false;
                    return true;
                }
                return false;
            };
        })();
        const STATE = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_PAN: 4,
            TOUCH_DOLLY_PAN: 5,
            TOUCH_DOLLY_ROTATE: 6,
        };
        let state = STATE.NONE;
        const EPS = 0.000001;
        // current position in spherical coordinates
        const spherical = new Spherical();
        const sphericalDelta = new Spherical();
        let scale = 1;
        const panOffset = new Vector3();
        let zoomChanged = false;
        const rotateStart = new Vector2();
        const rotateEnd = new Vector2();
        const rotateDelta = new Vector2();
        const panStart = new Vector2();
        const panEnd = new Vector2();
        const panDelta = new Vector2();
        const dollyStart = new Vector2();
        const dollyEnd = new Vector2();
        const dollyDelta = new Vector2();
        const pointers = [];
        const pointerPositions = {};
        const getAutoRotationAngle = () => {
            return ((2 * Math.PI) / 60 / 60) * this.autoRotateSpeed;
        };
        const getZoomScale = () => {
            return Math.pow(0.95, this.zoomSpeed);
        };
        const rotateLeft = (angle) => {
            sphericalDelta.theta -= angle;
        };
        const rotateUp = (angle) => {
            sphericalDelta.phi -= angle;
        };
        const panLeft = (function () {
            const v = new Vector3();
            return function panLeft(distance, objectMatrix) {
                v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix
                v.multiplyScalar(-distance);
                panOffset.add(v);
            };
        })();
        const panUp = (() => {
            const v = new Vector3();
            return (distance, objectMatrix) => {
                if (this.screenSpacePanning === true) {
                    v.setFromMatrixColumn(objectMatrix, 1);
                }
                else {
                    v.setFromMatrixColumn(objectMatrix, 0);
                    v.crossVectors(this.object.up, v);
                }
                v.multiplyScalar(distance);
                panOffset.add(v);
            };
        })();
        // deltaX and deltaY are in pixels; right and down are positive
        const pan = (() => {
            const offset = new Vector3();
            return (deltaX, deltaY) => {
                const element = this.domElement;
                if (this.object instanceof PerspectiveCamera) {
                    // perspective
                    const position = this.object.position;
                    offset.copy(position).sub(this.target);
                    let targetDistance = offset.length();
                    // half of the fov is center to top of screen
                    targetDistance *= Math.tan(((this.object.fov / 2) * Math.PI) / 180.0);
                    // we use only clientHeight here so aspect ratio does not distort speed
                    panLeft((2 * deltaX * targetDistance) / element.clientHeight, this.object.matrix);
                    panUp((2 * deltaY * targetDistance) / element.clientHeight, this.object.matrix);
                }
                else if (this.object instanceof OrthographicCamera) {
                    // orthographic
                    panLeft((deltaX * (this.object.right - this.object.left)) /
                        this.object.zoom /
                        element.clientWidth, this.object.matrix);
                    panUp((deltaY * (this.object.top - this.object.bottom)) /
                        this.object.zoom /
                        element.clientHeight, this.object.matrix);
                }
                else {
                    // camera neither orthographic nor perspective
                    console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
                    this.enablePan = false;
                }
            };
        })();
        const dollyOut = (dollyScale) => {
            if (this.object instanceof PerspectiveCamera) {
                scale /= dollyScale;
            }
            else if (this.object instanceof OrthographicCamera) {
                this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom * dollyScale));
                this.object.updateProjectionMatrix();
                zoomChanged = true;
            }
            else {
                console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
                this.enableZoom = false;
            }
        };
        const dollyIn = (dollyScale) => {
            if (this.object instanceof PerspectiveCamera) {
                scale *= dollyScale;
            }
            else if (this.object instanceof OrthographicCamera) {
                this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / dollyScale));
                this.object.updateProjectionMatrix();
                zoomChanged = true;
            }
            else {
                console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
                this.enableZoom = false;
            }
        };
        //
        // event callbacks - update the object state
        //
        function handleMouseDownRotate(event) {
            rotateStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownDolly(event) {
            dollyStart.set(event.clientX, event.clientY);
        }
        function handleMouseDownPan(event) {
            panStart.set(event.clientX, event.clientY);
        }
        const handleMouseMoveRotate = (event) => {
            rotateEnd.set(event.clientX, event.clientY);
            rotateDelta
                .subVectors(rotateEnd, rotateStart)
                .multiplyScalar(this.rotateSpeed);
            const element = this.domElement;
            rotateLeft((2 * Math.PI * rotateDelta.x) / element.clientHeight); // yes, height
            rotateUp((2 * Math.PI * rotateDelta.y) / element.clientHeight);
            rotateStart.copy(rotateEnd);
            this.update();
        };
        const handleMouseMoveDolly = (event) => {
            dollyEnd.set(event.clientX, event.clientY);
            dollyDelta.subVectors(dollyEnd, dollyStart);
            if (dollyDelta.y > 0) {
                dollyOut(getZoomScale());
            }
            else if (dollyDelta.y < 0) {
                dollyIn(getZoomScale());
            }
            dollyStart.copy(dollyEnd);
            this.update();
        };
        const handleMouseMovePan = (event) => {
            panEnd.set(event.clientX, event.clientY);
            panDelta.subVectors(panEnd, panStart).multiplyScalar(this.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
            this.update();
        };
        function handleMouseUp(event) {
            // no-op
        }
        const handleMouseWheel = (event) => {
            if (event.deltaY < 0) {
                dollyIn(getZoomScale());
            }
            else if (event.deltaY > 0) {
                dollyOut(getZoomScale());
            }
            this.update();
        };
        const handleKeyDown = (event) => {
            let needsUpdate = false;
            switch (event.code) {
                case this.keys.UP:
                    pan(0, this.keyPanSpeed);
                    needsUpdate = true;
                    break;
                case this.keys.BOTTOM:
                    pan(0, -this.keyPanSpeed);
                    needsUpdate = true;
                    break;
                case this.keys.LEFT:
                    pan(this.keyPanSpeed, 0);
                    needsUpdate = true;
                    break;
                case this.keys.RIGHT:
                    pan(-this.keyPanSpeed, 0);
                    needsUpdate = true;
                    break;
            }
            if (needsUpdate) {
                // prevent the browser from scrolling on cursor keys
                event.preventDefault();
                this.update();
            }
        };
        function handleTouchStartRotate() {
            if (pointers.length === 1) {
                rotateStart.set(pointers[0].pageX, pointers[0].pageY);
            }
            else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                rotateStart.set(x, y);
            }
        }
        function handleTouchStartPan() {
            if (pointers.length === 1) {
                panStart.set(pointers[0].pageX, pointers[0].pageY);
            }
            else {
                const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
                const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
                panStart.set(x, y);
            }
        }
        function handleTouchStartDolly() {
            const dx = pointers[0].pageX - pointers[1].pageX;
            const dy = pointers[0].pageY - pointers[1].pageY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyStart.set(0, distance);
        }
        const handleTouchStartDollyPan = () => {
            if (this.enableZoom)
                handleTouchStartDolly();
            if (this.enablePan)
                handleTouchStartPan();
        };
        const handleTouchStartDollyRotate = () => {
            if (this.enableZoom)
                handleTouchStartDolly();
            if (this.enableRotate)
                handleTouchStartRotate();
        };
        const handleTouchMoveRotate = (event) => {
            if (pointers.length == 1) {
                rotateEnd.set(event.pageX, event.pageY);
            }
            else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                rotateEnd.set(x, y);
            }
            rotateDelta
                .subVectors(rotateEnd, rotateStart)
                .multiplyScalar(this.rotateSpeed);
            const element = this.domElement;
            rotateLeft((2 * Math.PI * rotateDelta.x) / element.clientHeight); // yes, height
            rotateUp((2 * Math.PI * rotateDelta.y) / element.clientHeight);
            rotateStart.copy(rotateEnd);
        };
        const handleTouchMovePan = (event) => {
            if (pointers.length === 1) {
                panEnd.set(event.pageX, event.pageY);
            }
            else {
                const position = getSecondPointerPosition(event);
                const x = 0.5 * (event.pageX + position.x);
                const y = 0.5 * (event.pageY + position.y);
                panEnd.set(x, y);
            }
            panDelta.subVectors(panEnd, panStart).multiplyScalar(this.panSpeed);
            pan(panDelta.x, panDelta.y);
            panStart.copy(panEnd);
        };
        const handleTouchMoveDolly = (event) => {
            const position = getSecondPointerPosition(event);
            const dx = event.pageX - position.x;
            const dy = event.pageY - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            dollyEnd.set(0, distance);
            dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, this.zoomSpeed));
            dollyOut(dollyDelta.y);
            dollyStart.copy(dollyEnd);
        };
        const handleTouchMoveDollyPan = (event) => {
            if (this.enableZoom)
                handleTouchMoveDolly(event);
            if (this.enablePan)
                handleTouchMovePan(event);
        };
        const handleTouchMoveDollyRotate = (event) => {
            if (this.enableZoom)
                handleTouchMoveDolly(event);
            if (this.enableRotate)
                handleTouchMoveRotate(event);
        };
        function handleTouchEnd(event) {
            // no-op
        }
        //
        // event handlers - FSM: listen for events and reset state
        //
        this.onPointerDown = (event) => {
            if (this.enabled === false)
                return;
            if (pointers.length === 0) {
                // this.domElement.setPointerCapture(event.pointerId);
                this.domElement.addEventListener("pointermove", this.onPointerMove);
                this.domElement.addEventListener("pointerup", this.onPointerUp);
            }
            //
            addPointer(event);
            if (event.pointerType === "touch") {
                onTouchStart(event);
            }
            else {
                onMouseDown(event);
            }
        };
        let pointerLock = false;
        this.onPointerMove = (event) => {
            if (this.enabled === false)
                return;
            if (!pointerLock) {
                this.domElement.setPointerCapture(event.pointerId);
                pointerLock = true;
            }
            if (event.pointerType === "touch") {
                onTouchMove(event);
            }
            else {
                onMouseMove(event);
            }
        };
        this.onPointerUp = (event) => {
            if (this.enabled === false)
                return;
            pointerLock = false;
            if (event.pointerType === "touch") {
                onTouchEnd();
            }
            else {
                onMouseUp(event);
            }
            removePointer(event);
            if (pointers.length === 0) {
                this.domElement.releasePointerCapture(event.pointerId);
                this.domElement.removeEventListener("pointermove", this.onPointerMove);
                this.domElement.removeEventListener("pointerup", this.onPointerUp);
            }
        };
        this.onPointerCancel = (event) => {
            removePointer(event);
        };
        const onMouseDown = (event) => {
            let mouseAction;
            switch (event.button) {
                case 0:
                    mouseAction = this.mouseButtons.LEFT;
                    break;
                case 1:
                    mouseAction = this.mouseButtons.MIDDLE;
                    break;
                case 2:
                    mouseAction = this.mouseButtons.RIGHT;
                    break;
                default:
                    mouseAction = -1;
            }
            switch (mouseAction) {
                case MOUSE.DOLLY:
                    if (this.enableZoom === false)
                        return;
                    handleMouseDownDolly(event);
                    state = STATE.DOLLY;
                    break;
                case MOUSE.ROTATE:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (this.enablePan === false)
                            return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    }
                    else {
                        if (this.enableRotate === false)
                            return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    }
                    break;
                case MOUSE.PAN:
                    if (event.ctrlKey || event.metaKey || event.shiftKey) {
                        if (this.enableRotate === false)
                            return;
                        handleMouseDownRotate(event);
                        state = STATE.ROTATE;
                    }
                    else {
                        if (this.enablePan === false)
                            return;
                        handleMouseDownPan(event);
                        state = STATE.PAN;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                this.dispatchEvent({ type: "start" });
            }
        };
        const onMouseMove = (event) => {
            if (this.enabled === false)
                return;
            switch (state) {
                case STATE.ROTATE:
                    if (this.enableRotate === false)
                        return;
                    handleMouseMoveRotate(event);
                    break;
                case STATE.DOLLY:
                    if (this.enableZoom === false)
                        return;
                    handleMouseMoveDolly(event);
                    break;
                case STATE.PAN:
                    if (this.enablePan === false)
                        return;
                    handleMouseMovePan(event);
                    break;
            }
        };
        const onMouseUp = (event) => {
            handleMouseUp(event);
            this.dispatchEvent({ type: "end" });
            state = STATE.NONE;
        };
        this.onMouseWheel = (event) => {
            if (this.enabled === false ||
                this.enableZoom === false ||
                state !== STATE.NONE)
                return;
            event.preventDefault();
            this.dispatchEvent({ type: "start" });
            handleMouseWheel(event);
            this.dispatchEvent({ type: "end" });
        };
        this.onKeyDown = (event) => {
            if (this.enabled === false || this.enablePan === false)
                return;
            handleKeyDown(event);
        };
        const onTouchStart = (event) => {
            trackPointer(event);
            switch (pointers.length) {
                case 1:
                    switch (this.touches.ONE) {
                        case TOUCH.ROTATE:
                            if (this.enableRotate === false)
                                return;
                            handleTouchStartRotate();
                            state = STATE.TOUCH_ROTATE;
                            break;
                        case TOUCH.PAN:
                            if (this.enablePan === false)
                                return;
                            handleTouchStartPan();
                            state = STATE.TOUCH_PAN;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                case 2:
                    switch (this.touches.TWO) {
                        case TOUCH.DOLLY_PAN:
                            if (this.enableZoom === false && this.enablePan === false)
                                return;
                            handleTouchStartDollyPan();
                            state = STATE.TOUCH_DOLLY_PAN;
                            break;
                        case TOUCH.DOLLY_ROTATE:
                            if (this.enableZoom === false && this.enableRotate === false)
                                return;
                            handleTouchStartDollyRotate();
                            state = STATE.TOUCH_DOLLY_ROTATE;
                            break;
                        default:
                            state = STATE.NONE;
                    }
                    break;
                default:
                    state = STATE.NONE;
            }
            if (state !== STATE.NONE) {
                this.dispatchEvent({ type: "start" });
            }
        };
        const onTouchMove = (event) => {
            trackPointer(event);
            switch (state) {
                case STATE.TOUCH_ROTATE:
                    if (this.enableRotate === false)
                        return;
                    handleTouchMoveRotate(event);
                    this.update();
                    break;
                case STATE.TOUCH_PAN:
                    if (this.enablePan === false)
                        return;
                    handleTouchMovePan(event);
                    this.update();
                    break;
                case STATE.TOUCH_DOLLY_PAN:
                    if (this.enableZoom === false && this.enablePan === false)
                        return;
                    handleTouchMoveDollyPan(event);
                    this.update();
                    break;
                case STATE.TOUCH_DOLLY_ROTATE:
                    if (this.enableZoom === false && this.enableRotate === false)
                        return;
                    handleTouchMoveDollyRotate(event);
                    this.update();
                    break;
                default:
                    state = STATE.NONE;
            }
        };
        const onTouchEnd = (event) => {
            handleTouchEnd(event);
            this.dispatchEvent({ type: "end" });
            state = STATE.NONE;
        };
        this.onContextMenu = (event) => {
            if (this.enabled === false)
                return;
            event.preventDefault();
        };
        function addPointer(event) {
            pointers.push(event);
        }
        const removePointer = (event) => {
            delete pointerPositions[event.pointerId];
            for (let i = 0; i < pointers.length; i++) {
                if (pointers[i].pointerId == event.pointerId) {
                    pointers.splice(i, 1);
                    return;
                }
            }
        };
        function trackPointer(event) {
            let position = pointerPositions[event.pointerId];
            if (position === undefined) {
                position = new Vector2();
                pointerPositions[event.pointerId] = position;
            }
            position.set(event.pageX, event.pageY);
        }
        function getSecondPointerPosition(event) {
            const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
            return pointerPositions[pointer.pointerId];
        }
        this.spherical = spherical;
        //
        this.domElement.addEventListener("contextmenu", this.onContextMenu);
        this.domElement.addEventListener("pointerdown", this.onPointerDown);
        this.domElement.addEventListener("pointercancel", this.onPointerCancel);
        this.domElement.addEventListener("wheel", this.onMouseWheel, {
            passive: false,
        });
        this.reset = () => {
            this.target.copy(this.target0);
            this.object.position.copy(this.position0);
            this.object.zoom = this.zoom0;
            this.object.updateProjectionMatrix();
            this.dispatchEvent({ type: "change" });
            this.update();
            state = STATE.NONE;
        };
        // force an update at start
        this.update();
    }
    getPolarAngle() {
        return this.spherical.phi;
    }
    getAzimuthalAngle() {
        return this.spherical.theta;
    }
    getDistance() {
        return this.object.position.distanceTo(this.target);
    }
    listenToKeyEvents(domElement) {
        domElement.addEventListener("keydown", this.onKeyDown);
        this._domElementKeyEvents = domElement;
    }
    saveState() {
        this.target0.copy(this.target);
        this.position0.copy(this.object.position);
        this.zoom0 = this.object.zoom;
    }
    setCamera(camera) {
        this.object = camera;
    }
    setDom(dom) {
        this.dispose();
        this.domElement = dom;
        this.domElement.addEventListener("contextmenu", this.onContextMenu);
        this.domElement.addEventListener("pointerdown", this.onPointerDown);
        this.domElement.addEventListener("pointercancel", this.onPointerCancel);
        this.domElement.addEventListener("wheel", this.onMouseWheel, {
            passive: false,
        });
    }
    dispose() {
        this.domElement.removeEventListener("contextmenu", this.onContextMenu);
        this.domElement.removeEventListener("pointerdown", this.onPointerDown);
        this.domElement.removeEventListener("pointercancel", this.onPointerCancel);
        this.domElement.removeEventListener("wheel", this.onMouseWheel);
        this.domElement.removeEventListener("pointermove", this.onPointerMove);
        this.domElement.removeEventListener("pointerup", this.onPointerUp);
        if (this._domElementKeyEvents !== null) {
            this._domElementKeyEvents.removeEventListener("keydown", this.onKeyDown);
        }
        //this.dispatchEvent( { type: 'dispose' } ); // should this be added here?
    }
}
//# sourceMappingURL=VisOrbitControls.js.map