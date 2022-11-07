export interface BaseEvent {
  type: string;
}

export interface Event extends BaseEvent {
  target?: any;
  [attachment: string]: any;
}

export interface EventListener<E extends BaseEvent = Event> {
  (event: E): void;
}

export class EventDispatcher {
  private listeners: Map<string, Set<Function>> = new Map();

  addEventListener<C extends BaseEvent>(
    type: string,
    listener: EventListener<C>
  ): void {
    const listeners = this.listeners;

    if (!listeners.has(type)) {
      listeners.set(type, new Set());
    }

    listeners.get(type)!.add(listener);
  }

  hasEventListener<C extends BaseEvent>(
    type: string,
    listener: EventListener<C>
  ): boolean {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return false;
    }

    return listeners.get(type)!.has(listener);
  }

  removeEventListener<C extends BaseEvent>(
    type: string,
    listener: EventListener<C>
  ): void {
    const listeners = this.listeners;
    if (!listeners.has(type)) {
      return;
    }

    if (!listeners.get(type)!.has(listener)) {
      return;
    }

    listeners.get(type)!.delete(listener);
  }

  dispatchEvent<C extends BaseEvent>(event: C): void {
    const type = event.type;
    const listeners = this.listeners;
    if (listeners.has(type)) {
      try {
        listeners.get(type)?.forEach((listener) => {
          listener.call(this, event);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  clear() {
    this.listeners.clear();
  }

  useful(): boolean {
    return Boolean([...this.listeners.keys()].length);
  }

  once<C extends BaseEvent>(type: string, listener: EventListener<C>) {
    const onceListener = function (this: EventDispatcher, event: C) {
      listener.call(this, event);
      this.removeEventListener(type, onceListener);
    };

    this.addEventListener(type, onceListener);
  }

  emit<C extends BaseEvent>(
    name: C["type"],
    params: Omit<C, "type"> = {} as Omit<C, "type">
  ): void {
    const listeners = this.listeners;
    if (listeners.has(name)) {
      try {
        listeners.get(name)?.forEach((listener) => {
          listener.call(this, params);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  on<C extends BaseEvent>(type: C["type"], listener: EventListener<C>): void {
    this.addEventListener(type, listener);
  }

  has<C extends BaseEvent>(
    type: C["type"],
    listener: EventListener<C>
  ): boolean {
    return this.hasEventListener(type, listener);
  }

  off<C extends BaseEvent>(type: C["type"], listener?: EventListener<C>): void {
    if (listener) {
      this.removeEventListener(type, listener);
    } else {
      const listeners = this.listeners;
      if (!listeners.has(type)) {
        return;
      }
      listeners.delete(type);
    }
  }
}
