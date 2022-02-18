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
                listeners.get(type)?.forEach(listener => {
                    listener.call(this, event);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    clear() {
        this.listeners = new Map();
    }
    useful() {
        return Boolean([...this.listeners.keys()].length);
    }
}
//# sourceMappingURL=EventDispatcher.js.map