import { name as pkgname } from "./package.json";
import { transPkgName } from "@vis-three/utils";
import { OBJECT_HELPER_PLUGIN, } from "@vis-three/plugin-object-helper";
import { TRANSFORM_CONTROLS_PLUGIN, } from "@vis-three/plugin-transform-controls";
export const TRANSFORM_CONTROLS_OBJECT_HELPER_STRATEGY = transPkgName(pkgname);
export const TransformControlsHelperFilterStrategy = function () {
    return {
        name: TRANSFORM_CONTROLS_OBJECT_HELPER_STRATEGY,
        condition: [TRANSFORM_CONTROLS_PLUGIN, OBJECT_HELPER_PLUGIN],
        exec(engine) {
            const filterObjects = [];
            engine.transformControls.traverse((object) => {
                filterObjects.push(object);
            });
            engine.objectHelperManager.addFilteredObject(...filterObjects);
        },
        rollback(engine) { },
    };
};
