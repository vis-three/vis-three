import { EventDispatcher } from "../eventDispatcher";

export interface BaseData {
  width: number;
  height: number;
}

export enum RECT_EVENT {
  RELOAD = "reload",
  UPDATE = "update",
}

export class CanvasReactor<
  O extends BaseData = BaseData
> extends EventDispatcher {
  static proxyGetter = function (
    target: any,
    property: PropertyKey,
    value: any
  ) {
    return Reflect.get(target, property, value);
  };

  static proxySetter = function (
    this: CanvasReactor,
    target: any,
    property: PropertyKey,
    value: any,
    receiver: any
  ) {
    const result = Reflect.set(target, property, value, receiver);
    if (property === "width" || property === "height") {
      this.setSize();
      this.dispatchEvent({
        type: RECT_EVENT.RELOAD,
      });
    }
    this.draw();
    this.dispatchEvent({
      type: RECT_EVENT.UPDATE,
    });
    return result;
  };

  canvas!: HTMLCanvasElement;
  data: O;

  constructor(config: O) {
    super();

    this.data = new Proxy(config, {
      get: CanvasReactor.proxyGetter,
      set: CanvasReactor.proxySetter.bind(this),
    });
  }

  /**
   * 设置尺寸，会通过配置的width和height变化而自动触发
   * @returns this
   */
  setSize() {
    return this;
  }

  /**
   * 重绘画布，会通过配置的变化自动触发
   * @returns this
   */
  draw() {
    return this;
  }
}
