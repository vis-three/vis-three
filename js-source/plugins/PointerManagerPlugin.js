import { PointerManager, } from "../manager/PointerManager";
export const PointerManagerPlugin = function (params) {
    if (this.pointerManager) {
        console.warn("this has installed pointerManager plugin.");
        return false;
    }
    const pointerManager = new PointerManager(Object.assign(params || {}, {
        dom: this.dom,
    }));
    pointerManager.addEventListener("setDom", (event) => {
        pointerManager.setDom(event.dom);
    });
    this.pointerManager = pointerManager;
    return true;
};
//# sourceMappingURL=PointerManagerPlugin.js.map