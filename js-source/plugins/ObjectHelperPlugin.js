import { Color } from "three";
import { ObjectHelperManager } from "../manager/ObjectHelperManager";
export const ObjectHelperPlugin = function (params = {}) {
    if (!this.scene) {
        console.error("must install some scene plugin before ObjectHelper plugin.");
        return false;
    }
    if (params.interact === undefined) {
        params.interact = true;
    }
    if (params.interact) {
        if (!this.eventManager) {
            console.warn("must install eventManager plugin that can use interact function.");
            params.interact = false;
        }
    }
    const helperManager = new ObjectHelperManager();
    const pointerenterFunMap = new Map();
    const pointerleaveFunMap = new Map();
    const clickFunMap = new Map();
    const helperMap = helperManager.helperMap;
    this.objectHelperManager = helperManager;
    const scene = this.scene;
    !params.activeColor && (params.activeColor = "rgb(230, 20, 240)");
    !params.hoverColor && (params.hoverColor = "rgb(255, 158, 240)");
    !params.defaultColor && (params.defaultColor = "rgb(255, 255, 255)");
    !params.selectedColor && (params.selectedColor = params.activeColor);
    const defaultColorHex = new Color(params.defaultColor).getHex();
    const activeColorHex = new Color(params.activeColor).getHex();
    const hoverColorHex = new Color(params.hoverColor).getHex();
    const selectedColorHex = new Color(params.selectedColor).getHex();
    scene.addEventListener("afterAdd", (event) => {
        const objects = event.objects;
        for (const object of objects) {
            const helper = helperManager.addObjectHelper(object);
            if (!helper) {
                continue;
            }
            helper.material.color.setHex(defaultColorHex);
            scene.add(helper);
            if (params.interact) {
                const pointerenterFun = () => {
                    if (this.transing) {
                        return;
                    }
                    if (this.selectionBox) {
                        if (this.selectionBox.has(object)) {
                            return;
                        }
                    }
                    helper.material.color.setHex(hoverColorHex);
                };
                const pointerleaveFun = () => {
                    if (this.transing) {
                        return;
                    }
                    if (this.selectionBox) {
                        if (this.selectionBox.has(object)) {
                            return;
                        }
                    }
                    helper.material.color.setHex(defaultColorHex);
                };
                const clickFun = () => {
                    if (this.transing) {
                        return;
                    }
                    if (this.selectionBox) {
                        if (this.selectionBox.has(object)) {
                            return;
                        }
                    }
                    helper.material.color.setHex(activeColorHex);
                };
                object.addEventListener("pointerenter", pointerenterFun);
                object.addEventListener("pointerleave", pointerleaveFun);
                object.addEventListener("click", clickFun);
                pointerenterFunMap.set(object, pointerenterFun);
                pointerleaveFunMap.set(object, pointerleaveFun);
                clickFunMap.set(object, clickFun);
            }
        }
    });
    scene.addEventListener("afterRemove", (event) => {
        const objects = event.objects;
        for (const object of objects) {
            const helper = helperManager.disposeObjectHelper(object);
            if (!helper) {
                continue;
            }
            scene.remove(helper);
            if (params.interact) {
                object.removeEventListener("pointerenter", pointerenterFunMap.get(object));
                object.removeEventListener("pointerleave", pointerleaveFunMap.get(object));
                object.removeEventListener("click", clickFunMap.get(object));
                pointerenterFunMap.delete(object);
                pointerleaveFunMap.delete(object);
                clickFunMap.delete(object);
            }
        }
    });
    this.setObjectHelper = function (params) {
        if (params.show) {
            helperMap.forEach((helper) => {
                scene.add(helper);
            });
        }
        else {
            helperMap.forEach((helper) => {
                scene.remove(helper);
            });
        }
        return this;
    };
    const cacheObjectsHelper = new Set();
    this.completeSet.add(() => {
        if (this.selectionBox) {
            this.addEventListener("selected", (event) => {
                cacheObjectsHelper.forEach((helper) => {
                    helper.material.color.setHex(defaultColorHex);
                });
                cacheObjectsHelper.clear();
                for (const object of event.objects) {
                    if (helperMap.has(object)) {
                        const helper = helperMap.get(object);
                        helper.material.color.setHex(selectedColorHex);
                        cacheObjectsHelper.add(helper);
                    }
                }
            });
        }
    });
    return true;
};
//# sourceMappingURL=ObjectHelperPlugin.js.map