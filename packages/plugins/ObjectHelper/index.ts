import { Engine, Plugin } from "@vis-three/core";
import { ObjectHelperManager } from "./ObjectHelperManager";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export * from "./ObjectHelperManager";

export interface ObjectHelperEngine extends Engine {
  objectHelperManager: ObjectHelperManager;
  setObjectHelper: (show: boolean) => ObjectHelperEngine;
}

export const OBJECT_HELPER_PLUGIN = transPkgName(pkgname);

export const ObjectHelperPlugin: Plugin<ObjectHelperEngine> = function () {
  return {
    name: OBJECT_HELPER_PLUGIN,
    install(engine) {
      const helperManager = new ObjectHelperManager();
      const helperMap = helperManager.objectHelperMap;

      engine.objectHelperManager = helperManager;

      engine.setObjectHelper = function (show: boolean) {
        if (show) {
          this.scene.traverse((object) => {
            if (helperMap.has(object)) {
              this.scene.add(helperMap.get(object)!);
            }
          });
        } else {
          for (let i = 0; i < this.scene.children.length; i++) {
            const object = this.scene.children[i];
            if (helperMap.has(object)) {
              this.scene.remove(helperMap.get(object)!);
            }
          }
        }
        return this;
      };
    },
    dispose(
      engine: Optional<
        ObjectHelperEngine,
        "objectHelperManager" | "setObjectHelper"
      >
    ) {
      engine.objectHelperManager!.objectHelperMap.forEach((helper) => {
        if (helper.parent) {
          helper.parent.remove(helper);
        }
      });

      engine.objectHelperManager!.dispose();

      delete engine.objectHelperManager;
      delete engine.setObjectHelper;
    },
  };
};
