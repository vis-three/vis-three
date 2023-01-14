import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const SELECTED = "selected";
export const SELECTION_PLUGIN = transPkgName(pkgname);
export const SelectionPlugin = function () {
    return {
        name: SELECTION_PLUGIN,
        install(engine) {
            engine.selectionBox = new Set();
            engine.setSelectionBox = function (objects) {
                this.selectionBox.clear();
                for (const object of objects) {
                    this.selectionBox.add(object);
                }
                engine.dispatchEvent({
                    type: SELECTED,
                    objects: Array.from(this.selectionBox),
                });
                return this;
            };
        },
        dispose(engine) {
            engine.selectionBox.clear();
            delete engine.selectionBox;
            delete engine.setSelectionBox;
        },
    };
};
