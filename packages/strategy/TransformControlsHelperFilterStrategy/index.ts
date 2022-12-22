import { name as pkgname } from "./package.json";
import { transPkgName } from "@vis-three/utils";
import { Strategy } from "../../core/strategy";
import {
  TransformControlsEngine,
  TRANSFORM_CONTROLS_PLUGIN,
} from "../../plugins/TransformControlsPlugin";
import {
  ObjectHelperEngine,
  OBJECT_HELPER_PLUGIN,
} from "@vis-three/object-helper-plugin";
import { Object3D } from "three";

export interface TransformHelperEngine
  extends TransformControlsEngine,
    ObjectHelperEngine {}

export const TRANSFORM_CONTROLS_OBJECT_HELPER_STRATEGY = transPkgName(pkgname);

export const TransformControlsHelperFilterStrategy: Strategy<TransformHelperEngine> =
  function () {
    return {
      name: TRANSFORM_CONTROLS_OBJECT_HELPER_STRATEGY,
      condition: [TRANSFORM_CONTROLS_PLUGIN, OBJECT_HELPER_PLUGIN],
      exec(engine) {
        const filterObjects: Object3D[] = [];
        engine.transformControls.traverse((object) => {
          filterObjects.push(object);
        });
        engine.objectHelperManager.addFilteredObject(...filterObjects);
      },
      rollback(engine) {},
    };
  };
