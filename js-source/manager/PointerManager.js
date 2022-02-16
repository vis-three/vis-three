import { Vector2 } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
export class PointerManager extends EventDispatcher {
    dom;
    mouse;
    canMouseMove;
    mouseEventTimer;
    throttleTime;
    constructor(parameters) {
        super();
        const dom = parameters.dom;
        this.dom = dom;
        this.mouse = new Vector2();
        this.canMouseMove = true;
        this.mouseEventTimer = null;
        this.throttleTime = parameters.throttleTime || 1000 / 60;
        dom.addEventListener('pointerdown', (event) => {
            this.pointerDown(event);
        });
        dom.addEventListener('pointermove', (event) => {
            if (!this.canMouseMove) {
                return;
            }
            this.canMouseMove = false;
            this.mouseEventTimer = setTimeout(() => {
                const mouse = this.mouse;
                const dom = this.dom;
                mouse.x = (event.offsetX / dom.offsetWidth) * 2 - 1;
                mouse.y = -(event.offsetY / dom.offsetHeight) * 2 + 1;
                this.canMouseMove = true;
                this.pointerMove(event);
            }, this.throttleTime);
        });
        dom.addEventListener('pointerup', (event) => {
            this.pointerUp(event);
        });
    }
    // 获取鼠标指针
    getMousePoint() {
        return this.mouse;
    }
    // 鼠标指针按下
    pointerDown(event) {
        const eventObject = { mouse: this.mouse };
        for (let key in event) {
            eventObject[key] = event[key];
        }
        this.dispatchEvent(eventObject);
    }
    // 鼠标指针移动
    pointerMove(event) {
        const eventObject = { mouse: this.mouse };
        for (let key in event) {
            eventObject[key] = event[key];
        }
        this.dispatchEvent(eventObject);
    }
    // 鼠标指针抬起
    pointerUp(event) {
        const eventObject = { mouse: this.mouse };
        for (let key in event) {
            eventObject[key] = event[key];
        }
        this.dispatchEvent(eventObject);
    }
}
//# sourceMappingURL=PointerManager.js.map