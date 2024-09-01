import { COMPILER_MANAGER_PLUGIN, DATA_SUPPORT_MANAGER_PLUGIN, } from "@vis-three/middleware";
import { SELECTED, SELECTION_PLUGIN, } from "@vis-three/plugin-selection";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const SELECTION_SUPPORT_PLUGIN = transPkgName(pkgname);
export const SelectionSupportPlugin = function () {
    return {
        name: SELECTION_SUPPORT_PLUGIN,
        deps: [
            SELECTION_PLUGIN,
            COMPILER_MANAGER_PLUGIN,
            DATA_SUPPORT_MANAGER_PLUGIN,
        ],
        install(engine) {
            engine.setSelectionBoxBySymbol = function (symbols) {
                this.selectionBox.clear();
                for (const vid of symbols) {
                    const object = engine.getObjectBySymbol(vid);
                    if (object) {
                        this.selectionBox.add(object);
                    }
                    else {
                        console.warn(`can not found object by: ${vid}`);
                    }
                }
                engine.dispatchEvent({
                    type: SELECTED,
                    objects: Array.from(this.selectionBox),
                    objectSymbols: symbols,
                });
                return this;
            };
        },
        dispose(engine) {
            delete engine.setSelectionBoxBySymbol;
        },
    };
};
