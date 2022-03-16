import { EventDispatcher } from "../core/EventDispatcher";
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
    cancel(keyArray) {
        const symbol = this.generateSymbol(keyArray);
        if (this.map.has(symbol)) {
            const entity = this.map.get(symbol);
            keyboardjs.unbind(symbol, entity.keydown || null, entity.keyup);
            this.map.delete(symbol);
        }
        return this;
    }
    checkRepeat(keyArray) {
        const symbol = this.generateSymbol(keyArray);
        return this.map.has(symbol);
    }
}
//# sourceMappingURL=KeyboardManager.js.map