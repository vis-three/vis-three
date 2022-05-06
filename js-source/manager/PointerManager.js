import { Vector2 } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
export class PointerManager extends EventDispatcher {
    dom;
    mouse;
    canMouseMove;
    mouseEventTimer;
    throttleTime;
    pointerDownFun;
    pointerMoveFun;
    pointerUpFun;
    constructor(parameters) {
        super();
        this.dom = parameters.dom;
        this.mouse = new Vector2();
        this.canMouseMove = true;
        this.mouseEventTimer = null;
        this.throttleTime = parameters.throttleTime || 1000 / 60;
        this.pointerDownFun = (event) => {
            const eventObject = { mouse: this.mouse };
            for (const key in event) {
                eventObject[key] = event[key];
            }
            this.dispatchEvent(eventObject);
        };
        this.pointerMoveFun = (event) => {
            if (!this.canMouseMove) {
                return;
            }
            this.canMouseMove = false;
            this.mouseEventTimer = window.setTimeout(() => {
                const mouse = this.mouse;
                const dom = this.dom;
                const boundingBox = dom.getBoundingClientRect();
                // 兼容css3 dom
                mouse.x =
                    ((event.clientX - boundingBox.left) / dom.offsetWidth) * 2 - 1;
                mouse.y =
                    -((event.clientY - boundingBox.top) / dom.offsetHeight) * 2 + 1;
                this.canMouseMove = true;
                const eventObject = { mouse: this.mouse };
                for (const key in event) {
                    eventObject[key] = event[key];
                }
                this.dispatchEvent(eventObject);
            }, this.throttleTime);
        };
        this.pointerUpFun = (event) => {
            const eventObject = { mouse: this.mouse };
            for (const key in event) {
                eventObject[key] = event[key];
            }
            this.dispatchEvent(eventObject);
        };
    }
    /**
     * 设置当前作用的dom
     * @param dom
     * @returns
     */
    setDom(dom) {
        if (this.dom) {
            this.dom.removeEventListener("pointerdown", this.pointerDownFun);
            this.dom.removeEventListener("pointermove", this.pointerMoveFun);
            this.dom.removeEventListener("pointerup", this.pointerUpFun);
        }
        dom.addEventListener("pointerdown", this.pointerDownFun);
        dom.addEventListener("pointermove", this.pointerMoveFun);
        dom.addEventListener("pointerup", this.pointerUpFun);
        this.dom = dom;
        return this;
    }
    /**
     * 获取归一化的鼠标指针
     * @returns mouse
     */
    getNormalMouse() {
        return this.mouse;
    }
}
//# sourceMappingURL=PointerManager.js.map