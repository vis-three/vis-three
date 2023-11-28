import { Plugin } from "@vis-three/core";
import {
  COMPILER_MANAGER_PLUGIN,
  DATA_SUPPORT_MANAGER_PLUGIN,
  EngineSupport,
} from "@vis-three/middleware";
import {
  SELECTED,
  SelectedEvent,
  SelectionEngine,
  SELECTION_PLUGIN,
} from "@vis-three/plugin-selection";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface SelectionSupportEngine extends SelectionEngine, EngineSupport {
  /**通过vid标识设置场景的选中对象 */
  setSelectionBoxBySymbol: (symbols: string[]) => SelectionSupportEngine;
}

export interface SelectedSupportEvent extends SelectedEvent {
  objectSymbols: string[];
}

export const SELECTION_SUPPORT_PLUGIN = transPkgName(pkgname);

export const SelectionSupportPlugin: Plugin<SelectionSupportEngine, object> =
  function () {
    return {
      name: SELECTION_SUPPORT_PLUGIN,
      deps: [
        SELECTION_PLUGIN,
        COMPILER_MANAGER_PLUGIN,
        DATA_SUPPORT_MANAGER_PLUGIN,
      ],
      install(engine) {
        engine.setSelectionBoxBySymbol = function (symbols: string[]) {
          if (engine.selectionDisable) {
            return this;
          }

          this.selectionBox.clear();
          for (const vid of symbols) {
            const object = engine.getObjectBySymbol(vid);
            if (object) {
              this.selectionBox.add(object);
            } else {
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
      dispose(
        engine: Optional<SelectionSupportEngine, "setSelectionBoxBySymbol">
      ) {
        delete engine.setSelectionBoxBySymbol;
      },
    };
  };
