import { Plugin } from "@vis-three/core";
import {
  COMPILER_MANAGER_PLUGIN,
  DATA_SUPPORT_MANAGER_PLUGIN,
  EngineSupport,
} from "@vis-three/middleware";
import { SelectionEngine, SELECTION_PLUGIN } from "@vis-three/selection-plugin";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface SelectionSupportEngine extends SelectionEngine, EngineSupport {
  setSelectionBoxBySymbol: (symbols: string[]) => SelectionSupportEngine;
}

export const SELECTED = "selected";

export const SELECTION_SUPPORT_PLUGIN = transPkgName(pkgname);

export const SelectionSupportPlugin: Plugin<SelectionSupportEngine> =
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
