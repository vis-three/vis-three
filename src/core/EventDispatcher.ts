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
    this.listeners = new Map();
  }

  useful(): boolean {
    return Boolean([...this.listeners.keys()].length);
  }
}
