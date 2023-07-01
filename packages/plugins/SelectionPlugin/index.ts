import { BaseEvent, Engine, Plugin } from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { Object3D } from "three";
import { name as pkgname } from "./package.json";

export interface SelectionEngine extends Engine {
  /**当前engine的选中对象集合 */
  selectionBox: Set<Object3D>;
  /**设置当前engine的选中物体 */
  setSelectionBox: (objects: Object3D[]) => SelectionEngine;
}

export interface SelectedEvent extends BaseEvent {
  objects: Object3D[];
}

export const SELECTED = "selected";

export const SELECTION_PLUGIN = transPkgName(pkgname);

export const SelectionPlugin: Plugin<SelectionEngine, object> = function () {
  return {
    name: SELECTION_PLUGIN,
    install(engine) {
      engine.selectionBox = new Set();

      engine.setSelectionBox = function (objects: Object3D[]) {
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
    dispose(
      engine: Optional<SelectionEngine, "selectionBox" | "setSelectionBox">
    ) {
      engine.selectionBox!.clear();
      delete engine.selectionBox;
      delete engine.setSelectionBox;
    },
  };
};
