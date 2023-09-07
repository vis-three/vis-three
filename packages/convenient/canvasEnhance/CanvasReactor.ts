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

  setSize() {
    return this;
  }

  draw() {
    return this;
  }
}
