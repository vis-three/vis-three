import { BaseEvent, Vector2 } from "three";
import { EventDispatcher } from "../core/EventDispatcher";

export interface VisPointerEvent extends Omit<PointerEvent, "type">, BaseEvent {
  mouse: Vector2;
}

export interface PointerManagerParameters {
  dom?: HTMLElement;
  throttleTime?: number;
}

export class PointerManager extends EventDispatcher {
  private dom: HTMLElement | undefined;
  private mouse: Vector2;

  private canMouseMove: boolean;
  private mouseEventTimer: number | null;
  private throttleTime: number;

  private pointerDownFun: (event: PointerEvent) => void;
  private pointerMoveFun: (event: PointerEvent) => void;
  private pointerUpFun: (event: PointerEvent) => void;

  constructor(parameters: PointerManagerParameters) {
    super();
    this.dom = parameters.dom;
    this.mouse = new Vector2();

    this.canMouseMove = true;
    this.mouseEventTimer = null;
    this.throttleTime = parameters.throttleTime || 1000 / 60;

    this.pointerDownFun = (event: PointerEvent) => {
      const eventObject = { mouse: this.mouse };
      for (const key in event) {
        eventObject[key] = event[key];
      }
      this.dispatchEvent(eventObject as VisPointerEvent);
    };

    this.pointerMoveFun = (event: PointerEvent) => {
      if (!this.canMouseMove) {
        return;
      }
      this.canMouseMove = false;
      this.mouseEventTimer = window.setTimeout(() => {
        const mouse = this.mouse;
        const dom = this.dom;
        const boundingBox = dom!.getBoundingClientRect();
        // 兼容css3 dom
        mouse.x =
          ((event.clientX - boundingBox.left) / dom!.offsetWidth) * 2 - 1;
        mouse.y =
          -((event.clientY - boundingBox.top) / dom!.offsetHeight) * 2 + 1;

        this.canMouseMove = true;

        const eventObject = { mouse: this.mouse };
        for (const key in event) {
          eventObject[key] = event[key];
        }
        this.dispatchEvent(eventObject as VisPointerEvent);
      }, this.throttleTime);
    };

    this.pointerUpFun = (event: PointerEvent) => {
      const eventObject = { mouse: this.mouse };
      for (const key in event) {
        eventObject[key] = event[key];
      }
      this.dispatchEvent(eventObject as VisPointerEvent);
    };
  }

  /**
   * 设置当前作用的dom
   * @param dom
   * @returns
   */
  setDom(dom: HTMLElement): this {
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
  getNormalMouse(): Vector2 {
    return this.mouse;
  }
}
