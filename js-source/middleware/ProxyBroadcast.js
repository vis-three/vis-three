import { EventDispatcher } from "./EventDispatcher";
import { isValidKey } from "../utils/utils";
export class ProxyBroadcast extends EventDispatcher {
    static proxyWeakSet = new WeakSet();
    constructor() {
        super();
    }
    // 代理拓展
    proxyExtends(object, path) {
        if (!path) {
            path = [];
        }
        if (ProxyBroadcast.proxyWeakSet.has(object) || (typeof object !== 'object' && object !== null)) {
            return object;
        }
        const self = this;
        const handler = {
            get(target, key) {
                return Reflect.get(target, key);
            },
            set(target, key, value) {
                // 新增
                if (target[key] === undefined) {
                    // 如果是对象就递归
                    if (typeof value === 'object' && value !== null) {
                        const newPath = path.concat([key]);
                        value = self.proxyExtends(value, newPath);
                    }
                    self.broadcast({
                        operate: 'add',
                        path: path.concat([]),
                        key,
                        value
                    });
                    // 设置值
                }
                else {
                    // 如果是对象就递归
                    if (typeof value === 'object' && !ProxyBroadcast.proxyWeakSet.has(object)) {
                        const newPath = path.concat([key]);
                        value = self.proxyExtends(value, newPath);
                    }
                    self.broadcast({
                        operate: 'set',
                        path: path.concat([]),
                        key,
                        value: value
                    });
                }
                return Reflect.set(target, key, value);
            },
            deleteProperty(target, key) {
                self.broadcast({
                    operate: 'delete',
                    path: path.concat([]),
                    key,
                    value: ''
                });
                return Reflect.deleteProperty(target, key);
            }
        };
        // 递归整个对象进行代理拓展
        if (typeof object === 'object' && object !== null) {
            for (const key in object) {
                const tempPath = path.concat([key]);
                if (isValidKey(key, object) && typeof object[key] === 'object' && object[key] !== null) {
                    object[key] = this.proxyExtends(object[key], tempPath);
                }
            }
        }
        return new Proxy(object, handler);
    }
    // 广播
    broadcast({ operate, path, key, value }) {
        // 过滤
        const filterMap = {
            __poto__: true,
            length: true
        };
        if (isValidKey(key, filterMap) && filterMap[key]) {
            return this;
        }
        this.dispatchEvent({
            type: 'broadcast',
            notice: { operate, path, key, value }
        });
        return this;
    }
}
//# sourceMappingURL=ProxyBroadcast.js.map