import { Engine, Plugin } from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export interface PointerLockControlsEngine extends Engine {
  pointerLockControls: PointerLockControls;
}

export const POINTER_LOCK_CONTROLS_PLUGIN = transPkgName(pkgname);

export const PointerLockControlsPlugin: Plugin<PointerLockControlsEngine> =
  function () {
    return {
      name: POINTER_LOCK_CONTROLS_PLUGIN,
      install() {},
      dispose() {},
    };
  };
