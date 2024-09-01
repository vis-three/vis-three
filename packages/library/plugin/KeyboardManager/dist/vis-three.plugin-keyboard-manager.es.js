import { transPkgName as o } from "@vis-three/utils";
import { EventDispatcher as n } from "@vis-three/core";
import t from "keyboardjs";
const i = "@vis-three/plugin-keyboard-manager";
class h extends n {
  constructor() {
    super(), this.map = /* @__PURE__ */ new Map();
  }
  generateSymbol(e) {
    return Array.isArray(e) ? e.join(" + ") : e.shortcutKey.join(" + ");
  }
  /**
   * 限定捷键监听dom- 默认document
   * @param dom
   * @returns this
   */
  watch(e) {
    return e ? t.watch(void 0, e) : t.watch(), this;
  }
  /**
   * 注册快捷键
   * @param entity
   * @returns
   */
  register(e) {
    const r = this.generateSymbol(e);
    return this.map.has(r) ? (console.warn(
      `KeyboardManager: shortcutKey already exist: ${r}. desp: ${this.map.get(r).desp}`
    ), this) : (t.bind(r, e.keydown || null, e.keyup), this.map.set(r, e), this);
  }
  /**
   * 更新快捷键
   * @param entity
   * @returns
   */
  update(e) {
    const r = this.generateSymbol(e);
    return this.map.has(r) ? (this.cancel(e.shortcutKey), this.register(e), this) : (console.warn(
      "KeyboardManager: shortcutKey unregister then exec register function"
    ), this.register(e), this);
  }
  /**
   * 注销快捷键
   * @param keyArray 快捷键组合
   * @returns this
   */
  cancel(e) {
    const r = this.generateSymbol(e);
    if (this.map.has(r)) {
      const a = this.map.get(r);
      t.unbind(r, a.keydown || null, a.keyup), this.map.delete(r);
    }
    return this;
  }
  /**
   * 检查有无重复键
   * @param keyArray 快捷键组合
   * @returns boolean
   */
  checkRepeat(e) {
    const r = this.generateSymbol(e);
    return this.map.has(r);
  }
  /**
   * 获取快捷键文档
   */
  getDocs() {
    const e = [];
    return this.map.forEach((r) => {
      e.push({
        shortcutKey: [].concat(r.shortcutKey),
        desp: r.desp
      });
    }), e;
  }
}
const c = o(i), m = function(s) {
  return {
    name: c,
    install(e) {
      e.keyboardManager = new h(), s && s.keyboards && s.keyboards.forEach((r) => {
        e.keyboardManager.register(r);
      });
    },
    dispose(e) {
      e.keyboardManager.clear(), delete e.keyboardManager;
    }
  };
};
export {
  c as KEYBOARD_MANAGER_PLUGIN,
  h as KeyboardManager,
  m as KeyboardManagerPlugin
};
