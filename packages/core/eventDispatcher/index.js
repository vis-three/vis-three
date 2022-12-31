export class EventDispatcher {
    listeners = new Map();
    addEventListener(type, listener) {
        const listeners = this.listeners;
        if (!listeners.has(type)) {
            listeners.set(type, new Set());
        }
        listeners.get(type).add(listener);
    }
    hasEventListener(type, listener) {
        const listeners = this.listeners;
        if (!listeners.has(type)) {
            return false;
        }
        return listeners.get(type).has(listener);
    }
    removeEventListener(type, listener) {
        const listeners = this.listeners;
        if (!listeners.has(type)) {
            return;
        }
        if (!listeners.get(type).has(listener)) {
            return;
        }
        listeners.get(type).delete(listener);
    }
    dispatchEvent(event) {
        const type = event.type;
        const listeners = this.listeners;
        if (listeners.has(type)) {
            try {
                listeners.get(type)?.forEach((listener) => {
                    listener.call(this, event);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    clear() {
        this.listeners.clear();
    }
    useful() {
        return Boolean([...this.listeners.keys()].length);
    }
    once(type, listener) {
        const onceListener = function (event) {
            listener.call(this, event);
            this.removeEventListener(type, onceListener);
        };
        this.addEventListener(type, onceListener);
    }
    emit(name, params = {}) {
        const listeners = this.listeners;
        if (listeners.has(name)) {
            try {
                listeners.get(name)?.forEach((listener) => {
                    listener.call(this, params);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    on(type, listener) {
        this.addEventListener(type, listener);
    }
    has(type, listener) {
        return this.hasEventListener(type, listener);
    }
    off(type, listener) {
        if (listener) {
            this.removeEventListener(type, listener);
        }
        else {
            const listeners = this.listeners;
            if (!listeners.has(type)) {
                return;
            }
            listeners.delete(type);
        }
    }
}
