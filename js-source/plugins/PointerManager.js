import { Vector2 } from "three";
import { POINTERMANAGER } from "../case/constants/EVENTTYPE";
import { EventDispatcher } from "../middleware/EventDispatcher";
export class PointerManager extends EventDispatcher {
    dom;
    mouse;
    canMouseMove;
    mouseEventTimer;
    throttleTime;
    constructor(dom, throttleTime = 1000 / 60) {
        super();
        this.dom = dom;
        this.mouse = new Vector2();
        this.canMouseMove = true;
        this.mouseEventTimer = null;
        this.throttleTime = throttleTime;
        dom.addEventListener(POINTERMANAGER.POINTERDOWN, (event) => {
            this.pointerDown(event);
        });
        dom.addEventListener(POINTERMANAGER.POINTERMOVE, (event) => {
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
        dom.addEventListener(POINTERMANAGER.POINTERUP, (event) => {
            this.pointerUp(event);
        });
    }
    // 获取鼠标指针
    getMousePoint() {
        return this.mouse;
    }
    // 鼠标指针按下
    pointerDown(event) {
        const eventObject = Object.assign(event, { mouse: this.mouse });
        this.dispatchEvent(eventObject);
    }
    // 鼠标指针移动
    pointerMove(event) {
        const eventObject = Object.assign(event, { mouse: this.mouse });
        this.dispatchEvent(eventObject);
    }
    // 鼠标指针抬起
    pointerUp(event) {
        const eventObject = Object.assign(event, { mouse: this.mouse });
        this.dispatchEvent(eventObject);
    }
}
//# sourceMappingURL=PointerManager.js.map