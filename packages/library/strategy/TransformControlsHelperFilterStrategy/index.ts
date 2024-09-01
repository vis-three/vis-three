import { name as pkgname } from "./package.json";
import { transPkgName } from "@vis-three/utils";
import {
  ObjectHelperEngine,
  OBJECT_HELPER_PLUGIN,
} from "@vis-three/plugin-object-helper";
import { Object3D } from "three";
import {
  TransformControlsEngine,
  TRANSFORM_CONTROLS_PLUGIN,
} from "@vis-three/plugin-transform-controls";
import { Strategy } from "@vis-three/core";

export interface TransformHelperEngine
  extends TransformControlsEngine,
    ObjectHelperEngine {}

export const TRANSFORM_CONTROLS_OBJECT_HELPER_STRATEGY = transPkgName(pkgname);

export const TransformControlsHelperFilterStrategy: Strategy<TransformHelperEngine, object> =
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
