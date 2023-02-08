export class EventDispatcher {
    listeners = new Map();
    /**
     * 添加事件
     * @param type
     * @param listener
     * @returns
     */
    addEventListener(type, listener) {
        const listeners = this.listeners;
        if (!listeners.has(type)) {
            listeners.set(type, []);
        }
        const array = listeners.get(type);
        if (array.includes(listener)) {
            return;
        }
        array.push(listener);
    }
    /**
     * 是否有此事件
     * @param type
     * @param listener
     * @returns
     */
    hasEventListener(type, listener) {
        const listeners = this.listeners;
        if (!listeners.has(type)) {
            return false;
        }
        return listeners.get(type).includes(listener);
    }
    /**
     * 移除事件
     * @param type
     * @param listener
     * @returns
     */
    removeEventListener(type, listener) {
        const listeners = this.listeners;
        if (!listeners.has(type)) {
            return;
        }
        if (!listeners.get(type).includes(listener)) {
            return;
        }
        const array = listeners.get(type);
        array.splice(array.indexOf(listener), 1);
    }
    /**
     * 触发事件
     * @param event
     */
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
    /**
     * 一次性事件触发
     * @param type
     * @param listener
     */
    once(type, listener) {
        const onceListener = function (event) {
            listener.call(this, event);
            this.removeEventListener(type, onceListener);
        };
        this.addEventListener(type, onceListener);
    }
    /**
     * 触发事件
     * @param name
     * @param params
     */
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
    /**
     * 订阅事件
     * @param type
     * @param listener
     */
    on(type, listener) {
        this.addEventListener(type, listener);
    }
    /**
     * 是否有此事件
     * @param type
     * @param listener
     * @returns
     */
    has(type, listener) {
        return this.hasEventListener(type, listener);
    }
    /**
     * 移除事件
     * @param type
     * @param listener
     * @returns
     */
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
    /**
     * 获取事件数量
     * @param type
     * @returns
     */
    eventCount(type) {
        if (!this.listeners.has(type)) {
            return 0;
        }
        return this.listeners.get(type).length;
    }
    /**
     * 销毁该类型的最后一个事件
     * @param type
     * @returns
     */
    popLatestEvent(type) {
        if (!this.listeners.has(type)) {
            return;
        }
        this.listeners.get(type).pop();
    }
    /**
     * 清空所有事件
     */
    clear() {
        this.listeners.clear();
    }
    /**
     * 当前派发器是否使用
     * @returns
     */
    useful() {
        return Boolean([...this.listeners.keys()].length);
    }
}
