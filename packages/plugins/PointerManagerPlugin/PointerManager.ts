import { EventDispatcher } from "@vis-three/core";
import { BaseEvent, Vector2 } from "three";

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

  private pointerDownHandler: (event: PointerEvent) => void;
  private pointerMoveHandler: (event: PointerEvent) => void;
  private pointerUpHandler: (event: PointerEvent) => void;
  private mouseDownHandler: (event: MouseEvent) => void;
  private mouseUpHandler: (event: MouseEvent) => void;
  private clickHandler: (event: MouseEvent) => void;
  private dblclickHandler: (event: MouseEvent) => void;
  private contextmenuHandler: (event: MouseEvent) => void;

  constructor(parameters: PointerManagerParameters) {
    super();
    this.dom = parameters.dom;
    this.mouse = new Vector2();

    this.canMouseMove = true;
    this.mouseEventTimer = null;
    this.throttleTime = parameters.throttleTime || 1000 / 60;

    const mergeEvent = (event: MouseEvent) => {
      const eventObject = {
        mouse: {
          x: this.mouse.x,
          y: this.mouse.y,
        },
      };
      for (const key in event) {
        eventObject[key] = event[key];
      }
      return eventObject as VisPointerEvent;
    };

    const extendEventHanlder = (event: PointerEvent | MouseEvent) => {
      this.dispatchEvent(mergeEvent(event));
    };

    this.pointerMoveHandler = (event: PointerEvent) => {
      if (!this.canMouseMove) {
        return;
      }
      this.canMouseMove = false;
      this.mouseEventTimer = window.setTimeout(() => {
        const mouse = this.mouse;
        const dom = this.dom!;
        const boundingBox = dom.getBoundingClientRect();
        // 兼容css3 dom
        mouse.x =
          ((event.clientX - boundingBox.left) / dom!.offsetWidth) * 2 - 1;
        mouse.y =
          -((event.clientY - boundingBox.top) / dom!.offsetHeight) * 2 + 1;

        this.canMouseMove = true;

        this.dispatchEvent(mergeEvent(event));
      }, this.throttleTime);
    };

    this.mouseDownHandler = extendEventHanlder;

    this.mouseUpHandler = extendEventHanlder;

    this.pointerDownHandler = extendEventHanlder;

    this.pointerUpHandler = extendEventHanlder;

    this.clickHandler = extendEventHanlder;

    this.dblclickHandler = extendEventHanlder;

    this.contextmenuHandler = extendEventHanlder;
  }

  /**
   * 设置当前作用的dom
   * @param dom
   * @returns
   */
  setDom(dom: HTMLElement): this {
    if (this.dom) {
      const dom = this.dom;
      dom.removeEventListener("mousedown", this.mouseDownHandler);
      dom.removeEventListener("mouseup", this.mouseUpHandler);
      dom.removeEventListener("pointerdown", this.pointerDownHandler);
      dom.removeEventListener("pointermove", this.pointerMoveHandler);
      dom.removeEventListener("pointerup", this.pointerUpHandler);
      dom.removeEventListener("click", this.clickHandler);
      dom.removeEventListener("dblclick", this.dblclickHandler);
      dom.removeEventListener("contextmenu", this.contextmenuHandler);
    }
    dom.addEventListener("mousedown", this.mouseDownHandler);
    dom.addEventListener("mouseup", this.mouseUpHandler);
    dom.addEventListener("pointerdown", this.pointerDownHandler);
    dom.addEventListener("pointermove", this.pointerMoveHandler);
    dom.addEventListener("pointerup", this.pointerUpHandler);
    dom.addEventListener("click", this.clickHandler);
    dom.addEventListener("dblclick", this.dblclickHandler);
    dom.addEventListener("contextmenu", this.contextmenuHandler);

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
