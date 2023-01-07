import {
  BaseEvent,
  ENGINE_EVENT,
  SetSceneEvent,
  Strategy,
} from "@vis-three/core";
import { Color, Object3D, Scene, ShaderMaterial, Sprite } from "three";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import {
  EventManagerEngine,
  EVENT_MANAGER_PLUGIN,
} from "@vis-three/event-manager-plugin";
import {
  AFTERADD,
  AFTERREMOVE,
  ObjectHelperEngine,
  OBJECT_HELPER_PLUGIN,
} from "@vis-three/object-helper-plugin";
import {
  SELECTED,
  SelectedEvent,
  SelectionEngine,
  SELECTION_PLUGIN,
} from "@vis-three/selection-plugin";
import { TransformControlsEngine } from "@vis-three/transform-controls-plugin";
export interface HelperSelectInteractEngine
  extends EventManagerEngine,
    ObjectHelperEngine,
    SelectionEngine,
    TransformControlsEngine {}

export const HELPER_SELECT_INTERACT_STRATEGY = transPkgName(pkgname);

export interface HelperSelectInteractParameters {
  interact?: boolean;
  activeColor?: string;
  hoverColor?: string;
  defaultColor?: string;
  selectedColor?: string;
}

export const HelperSelectInteractStrategy: Strategy<HelperSelectInteractEngine> =
  function (params: HelperSelectInteractParameters = {}) {
    const pointerenterFunMap = new Map<Object3D, Function>();
    const pointerleaveFunMap = new Map<Object3D, Function>();
    const clickFunMap = new Map<Object3D, Function>();

    const cacheObjectsHelper = new Set<Object3D>();

    let afterAddFun: any;
    let afterRemoveFun: any;
    let setSceneFun: (event: SetSceneEvent) => void;
    let selectedFun: (event: SelectedEvent) => void;

    return {
      name: HELPER_SELECT_INTERACT_STRATEGY,
      condition: [EVENT_MANAGER_PLUGIN, OBJECT_HELPER_PLUGIN, SELECTION_PLUGIN],
      exec(engine) {
        if (params.interact === undefined) {
          params.interact = true;
        }

        const helperManager = engine.objectHelperManager;
        const helperMap = engine.objectHelperManager.objectHelperMap;

        !params.activeColor && (params.activeColor = "rgb(230, 20, 240)");
        !params.hoverColor && (params.hoverColor = "rgb(255, 158, 240)");
        !params.defaultColor && (params.defaultColor = "rgb(255, 255, 255)");
        !params.selectedColor && (params.selectedColor = params.activeColor);

        const defaultColorHex = new Color(params.defaultColor).getHex();
        const activeColorHex = new Color(params.activeColor).getHex();
        const hoverColorHex = new Color(params.hoverColor).getHex();
        const selectedColorHex = new Color(params.selectedColor).getHex();

        const updateHelperMaterial = (helper: Sprite, color: number) => {
          if (helper.material.color) {
            helper.material.color.setHex(color);
          } else if (helper.material instanceof ShaderMaterial) {
            (helper.material.uniforms.color.value as unknown as Color).setHex(
              color
            );
          }
        };

        afterAddFun = (event) => {
          const objects = event.objects;

          for (const object of objects) {
            const helper = helperManager.addObjectHelper(object) as Sprite;

            if (!helper) {
              continue;
            }
            updateHelperMaterial(helper, defaultColorHex);

            if (params.interact) {
              const pointerenterFun = () => {
                if (engine.transformControls.dragging) {
                  return;
                }
                if (engine.selectionBox) {
                  if (engine.selectionBox.has(object)) {
                    return;
                  }
                }
                updateHelperMaterial(helper, hoverColorHex);
              };

              const pointerleaveFun = () => {
                if (engine.transformControls.dragging) {
                  return;
                }
                if (engine.selectionBox) {
                  if (engine.selectionBox.has(object)) {
                    return;
                  }
                }

                updateHelperMaterial(helper, defaultColorHex);
              };

              const clickFun = () => {
                if (engine.transformControls.dragging) {
                  return;
                }
                if (engine.selectionBox) {
                  if (engine.selectionBox.has(object)) {
                    return;
                  }
                }

                updateHelperMaterial(helper, activeColorHex);
              };

              object.addEventListener("pointerenter", pointerenterFun);
              object.addEventListener("pointerleave", pointerleaveFun);
              object.addEventListener("click", clickFun);

              pointerenterFunMap.set(object, pointerenterFun);
              pointerleaveFunMap.set(object, pointerleaveFun);
              clickFunMap.set(object, clickFun);
            }
          }
        };

        afterRemoveFun = (event) => {
          const objects = event.objects;

          for (const object of objects) {
            const helper = helperManager.disposeObjectHelper(object);

            if (!helper) {
              continue;
            }

            if (params.interact) {
              object.removeEventListener(
                "pointerenter",
                pointerenterFunMap.get(object)
              );
              object.removeEventListener(
                "pointerleave",
                pointerleaveFunMap.get(object)
              );
              object.removeEventListener("click", clickFunMap.get(object));

              pointerenterFunMap.delete(object);
              pointerleaveFunMap.delete(object);
              clickFunMap.delete(object);
            }
          }
        };

        engine.scene.addEventListener(AFTERADD, afterAddFun);

        engine.scene.addEventListener(AFTERREMOVE, afterRemoveFun);

        setSceneFun = (event) => {
          const scene = event.scene;

          if (!scene.hasEventListener(AFTERADD, afterAddFun)) {
            scene.addEventListener(AFTERADD, afterAddFun);
          }

          if (!scene.hasEventListener(AFTERREMOVE, afterRemoveFun)) {
            scene.addEventListener(AFTERREMOVE, afterRemoveFun);
          }
        };
        engine.addEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );

        selectedFun = (event) => {
          cacheObjectsHelper.forEach((helper) => {
            updateHelperMaterial(helper as Sprite, defaultColorHex);
          });
          cacheObjectsHelper.clear();

          for (const object of event.objects) {
            if (helperMap.has(object)) {
              const helper = helperMap.get(object) as Sprite;
              updateHelperMaterial(helper as Sprite, selectedColorHex);
              cacheObjectsHelper.add(helper);
            }
          }
        };

        engine.addEventListener<SelectedEvent>(SELECTED, selectedFun);
      },
      rollback(engine) {
        engine.scene.removeEventListener(AFTERADD, afterAddFun);

        engine.scene.removeEventListener(AFTERREMOVE, afterRemoveFun);

        engine.removeEventListener<SelectedEvent>(SELECTED, selectedFun);

        engine.removeEventListener<SetSceneEvent>(
          ENGINE_EVENT.SETSCENE,
          setSceneFun
        );

        pointerenterFunMap.clear();
        pointerleaveFunMap.clear();
        clickFunMap.clear();
        cacheObjectsHelper.clear();
      },
    };
  };
