import { EventDispatcher } from "@vis-three/core";
import keyboardjs from "keyboardjs";
export class KeyboardManager extends EventDispatcher {
    map = new Map();
    constructor() {
        super();
    }
    generateSymbol(entity) {
        if (Array.isArray(entity)) {
            return entity.join(" + ");
        }
        return entity.shortcutKey.join(" + ");
    }
    /**
     * 限定捷键监听dom- 默认document
     * @param dom
     * @returns this
     */
    watch(dom) {
        if (!dom) {
            keyboardjs.watch();
        }
        else {
            keyboardjs.watch(undefined, dom);
        }
        return this;
    }
    /**
     * 注册快捷键
     * @param entity
     * @returns
     */
    register(entity) {
        const symbol = this.generateSymbol(entity);
        if (this.map.has(symbol)) {
            console.warn(`KeyboardManager: shortcutKey already exist: ${symbol}. desp: ${this.map.get(symbol).desp}`);
            return this;
        }
        keyboardjs.bind(symbol, entity.keydown || null, entity.keyup);
        this.map.set(symbol, entity);
        return this;
    }
    /**
     * 更新快捷键
     * @param entity
     * @returns
     */
    update(entity) {
        const symbol = this.generateSymbol(entity);
        if (!this.map.has(symbol)) {
            console.warn(`KeyboardManager: shortcutKey unregister then exec register function`);
            this.register(entity);
            return this;
        }
        this.cancel(entity.shortcutKey);
        this.register(entity);
        return this;
    }
    /**
     * 注销快捷键
     * @param keyArray 快捷键组合
     * @returns this
     */
    cancel(keyArray) {
        const symbol = this.generateSymbol(keyArray);
        if (this.map.has(symbol)) {
            const entity = this.map.get(symbol);
            keyboardjs.unbind(symbol, entity.keydown || null, entity.keyup);
            this.map.delete(symbol);
        }
        return this;
    }
    /**
     * 检查有无重复键
     * @param keyArray 快捷键组合
     * @returns boolean
     */
    checkRepeat(keyArray) {
        const symbol = this.generateSymbol(keyArray);
        return this.map.has(symbol);
    }
    /**
     * 获取快捷键文档
     */
    getDocs() {
        const list = [];
        this.map.forEach((entity) => {
            list.push({
                shortcutKey: [].concat(entity.shortcutKey),
                desp: entity.desp,
            });
        });
        return list;
    }
}
