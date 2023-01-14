import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { KeyboardManager } from "./KeyboardManager";
export * from "./KeyboardManager";
export const KEYBOARD_MANAGER_PLUGIN = transPkgName(pkgname);
export const KeyboardManagerPlugin = function () {
    return {
        name: KEYBOARD_MANAGER_PLUGIN,
        install(engine) {
            engine.keyboardManager = new KeyboardManager();
        },
        dispose(engine) {
            engine.keyboardManager.clear();
            delete engine.keyboardManager;
        },
    };
};
