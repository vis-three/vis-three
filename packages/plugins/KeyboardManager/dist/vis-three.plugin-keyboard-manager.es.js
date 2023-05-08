var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { transPkgName } from "@vis-three/utils";
import { EventDispatcher } from "@vis-three/core";
import keyboardjs from "keyboardjs";
const name = "@vis-three/plugin-keyboard-manager";
class KeyboardManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "map", /* @__PURE__ */ new Map());
  }
  generateSymbol(entity) {
    if (Array.isArray(entity)) {
      return entity.join(" + ");
    }
    return entity.shortcutKey.join(" + ");
  }
  watch(dom) {
    if (!dom) {
      keyboardjs.watch();
    } else {
      keyboardjs.watch(void 0, dom);
    }
    return this;
  }
  register(entity) {
    const symbol = this.generateSymbol(entity);
    if (this.map.has(symbol)) {
      console.warn(
        `KeyboardManager: shortcutKey already exist: ${symbol}. desp: ${this.map.get(symbol).desp}`
      );
      return this;
    }
    keyboardjs.bind(symbol, entity.keydown || null, entity.keyup);
    this.map.set(symbol, entity);
    return this;
  }
  update(entity) {
    const symbol = this.generateSymbol(entity);
    if (!this.map.has(symbol)) {
      console.warn(
        `KeyboardManager: shortcutKey unregister then exec register function`
      );
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
  getDocs() {
    const list = [];
    this.map.forEach((entity) => {
      list.push({
        shortcutKey: [].concat(entity.shortcutKey),
        desp: entity.desp
      });
    });
    return list;
  }
}
const KEYBOARD_MANAGER_PLUGIN = transPkgName(name);
const KeyboardManagerPlugin = function(param) {
  return {
    name: KEYBOARD_MANAGER_PLUGIN,
    install(engine) {
      engine.keyboardManager = new KeyboardManager();
      if (param && param.keyboards) {
        param.keyboards.forEach((entity) => {
          engine.keyboardManager.register(entity);
        });
      }
    },
    dispose(engine) {
      engine.keyboardManager.clear();
      delete engine.keyboardManager;
    }
  };
};
export { KEYBOARD_MANAGER_PLUGIN, KeyboardManager, KeyboardManagerPlugin };
