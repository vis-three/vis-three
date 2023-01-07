import { ENGINE_EVENT } from "@vis-three/core";
import { PointerManager } from "./PointerManager";
import { name as pkgname } from "./package.json";
import { transPkgName } from "@vis-three/utils";
export * from "./PointerManager";
export const POINTER_MANAGER_PLUGIN = transPkgName(pkgname);
export const PointerManagerPlugin = function (params) {
    let setDomFun;
    return {
        name: POINTER_MANAGER_PLUGIN,
        install(engine) {
            const pointerManager = new PointerManager(Object.assign(params || {}, {
                dom: engine.dom,
            }));
            setDomFun = (event) => {
                pointerManager.setDom(event.dom);
            };
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.pointerManager = pointerManager;
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setDomFun = undefined;
        },
    };
};
