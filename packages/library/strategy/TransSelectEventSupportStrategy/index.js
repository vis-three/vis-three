import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { SELECTED, SELECTION_PLUGIN, } from "@vis-three/plugin-selection";
import { EVENT_MANAGER_PLUGIN, } from "@vis-three/plugin-event-manager";
import { TRANSFORM_CONTROLS_PLUGIN, } from "@vis-three/plugin-transform-controls";
import { COMPILER_MANAGER_PLUGIN, DATA_SUPPORT_MANAGER_PLUGIN, } from "@vis-three/tdcm";
import { SELECTION_SUPPORT_PLUGIN, } from "@vis-three/plugin-selection-support";
export const name = transPkgName(pkgname);
export const TransSelectEventSupportStrategy = function () {
    let cacheSetSelectionBox;
    let clickFun;
    let selectedFun;
    return {
        name,
        condition: [
            SELECTION_PLUGIN,
            SELECTION_SUPPORT_PLUGIN,
            EVENT_MANAGER_PLUGIN,
            TRANSFORM_CONTROLS_PLUGIN,
            COMPILER_MANAGER_PLUGIN,
            DATA_SUPPORT_MANAGER_PLUGIN,
        ],
        exec(engine) {
            const dispatchEvent = () => {
                const objectSymbols = [];
                engine.selectionBox.forEach((object) => {
                    const objectSymbol = engine.compilerManager.getObjectSymbol(object);
                    if (objectSymbol) {
                        objectSymbols.push(objectSymbol);
                    }
                    else {
                        console.warn(`${name} can not font vid in compilerManager.`, object);
                    }
                });
                engine.dispatchEvent({
                    type: SELECTED,
                    objects: Array.from(engine.selectionBox),
                    objectSymbols,
                });
            };
            cacheSetSelectionBox = engine.setSelectionBox;
            engine.setSelectionBox = function (objects) {
                this.selectionBox.clear();
                for (const object of objects) {
                    this.selectionBox.add(object);
                }
                dispatchEvent();
                return this;
            };
            // 与eventManager作用
            engine.eventManager.addFilterObject(engine.transformControls);
            clickFun = (event) => {
                if (engine.selectionDisable) {
                    return;
                }
                // 兼容transformControls事件
                if (engine.transing) {
                    engine.transing = false;
                    return;
                }
                const intersections = event.intersections;
                // ctrl多选
                if (!event.ctrlKey) {
                    engine.selectionBox.clear();
                }
                if (engine.eventManager.penetrate) {
                    for (const intersection of intersections) {
                        // 反选
                        if (event.ctrlKey) {
                            if (engine.selectionBox.has(intersection.object)) {
                                engine.selectionBox.delete(intersection.object);
                                continue;
                            }
                        }
                        engine.selectionBox.add(intersection.object);
                    }
                }
                else {
                    if (intersections.length) {
                        const object = intersections[0].object;
                        // 反选
                        if (event.ctrlKey) {
                            if (engine.selectionBox.has(object)) {
                                engine.selectionBox.delete(object);
                                return;
                            }
                        }
                        engine.selectionBox.add(object);
                    }
                }
                dispatchEvent();
            };
            engine.eventManager.addEventListener("click", clickFun);
            // 与selection联调
            selectedFun = (event) => {
                engine.transformControls.setAttach(...event.objects);
            };
            engine.addEventListener(SELECTED, selectedFun);
        },
        rollback(engine) {
            engine.setSelectionBox = cacheSetSelectionBox;
            engine.eventManager.removeFilterObject(engine.transformControls);
            engine.eventManager.removeEventListener("click", clickFun);
            engine.eventManager.removeEventListener(SELECTED, selectedFun);
        },
    };
};
