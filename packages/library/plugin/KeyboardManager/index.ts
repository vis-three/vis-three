import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Engine, Plugin } from "@vis-three/core";
import { KeyboardEntity, KeyboardManager } from "./KeyboardManager";

export * from "./KeyboardManager";

export interface KeyboardManagerEngine extends Engine {
  keyboardManager: KeyboardManager;
}

export interface KeyboardParameters {
  /**快捷键设置 */
  keyboards?: Array<KeyboardEntity>;
}

export const KEYBOARD_MANAGER_PLUGIN = transPkgName(pkgname);

export const KeyboardManagerPlugin: Plugin<
  KeyboardManagerEngine,
  KeyboardParameters
> = function (param) {
  return {
    name: KEYBOARD_MANAGER_PLUGIN,
    install(engine) {
      engine.keyboardManager = new KeyboardManager();

      if (param && param.keyboards) {
        param.keyboards.forEach((entity) => {
          engine.keyboardManager.register(entity);
        });
      }
    },
    dispose(engine: Optional<KeyboardManagerEngine, "keyboardManager">) {
      engine.keyboardManager!.clear();
      delete engine.keyboardManager;
    },
  };
};
