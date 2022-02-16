import { PointerManager } from "../manager/PointerManager";
export const PointerManagerPlugin = function (params) {
    if (this.pointerManager) {
        console.warn('this has installed pointerManager plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.error('must install some renderer before this plugin.');
        return false;
    }
    const pointerManager = new PointerManager(Object.assign(params || {}, {
        dom: this.dom
    }));
    this.pointerManager = pointerManager;
    return true;
};
//# sourceMappingURL=PointerManagerPlugin.js.map