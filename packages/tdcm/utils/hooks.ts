import { BaseEvent, EventDispatcher } from "@vis-three/core";

export class Hook {
  private map: WeakMap<object, EventDispatcher> = new WeakMap();

  create(object: object) {
    if (this.map.has(object)) {
      console.warn(`Hook: object is exist.`, object);
      return;
    }
    this.map.set(object, new EventDispatcher());
  }

  dispose(object: object) {
    this.map.delete(object);
  }

  check(object: object) {
    return this.map.has(object);
  }

  emit(object: object, type: string, data?: object) {
    if (!this.map.has(object)) {
      console.warn(
        `object can not create eventDispatcher please create it`,
        object
      );
      return;
    }
    const eventDispatcher = this.map.get(object)!;

    eventDispatcher.emit(type, data);
  }

  on(object: object, type: string, callback: (event: BaseEvent) => void) {
    if (!this.map.has(object)) {
      console.warn(
        `object can not create eventDispatcher please create it`,
        object
      );
      return;
    }

    const eventDispatcher = this.map.get(object)!;

    eventDispatcher.on(type, callback);
  }

  off(object: object, type: string, callback: (event: BaseEvent) => void) {
    if (!this.map.has(object)) {
      console.warn(
        `object can not create eventDispatcher please create it`,
        object
      );
      return;
    }

    const eventDispatcher = this.map.get(object)!;

    eventDispatcher.off(type, callback);
  }
}
