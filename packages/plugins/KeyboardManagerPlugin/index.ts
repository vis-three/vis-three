import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Engine, Plugin } from "@vis-three/core";
import { KeyboardManager } from "./KeyboardManager";

export * from "./KeyboardManager";

export interface KeyboardManagerEngine extends Engine {
  keyboardManager: KeyboardManager;
}

export const KEYBOARD_MANAGER_PLUGIN = transPkgName(pkgname);

export const KeyboardManagerPlugin: Plugin<KeyboardManagerEngine> =
  function () {
    return {
      name: KEYBOARD_MANAGER_PLUGIN,
      install(engine) {
        engine.keyboardManager = new KeyboardManager();
      },
      dispose(engine: Optional<KeyboardManagerEngine, "keyboardManager">) {
        engine.keyboardManager!.clear();
        delete engine.keyboardManager;
      },
    };
  };
