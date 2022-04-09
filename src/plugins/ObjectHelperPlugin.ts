import { Color, Object3D, Sprite } from "three";
import { Engine } from "../engine/Engine";
import { Plugin } from "./plugin";
import { SelectedEvent } from "./SelectionPlugin";
import { ObjectHelperManager } from "../manager/ObjectHelperManager";

export interface ObjectHelperParameters {
  interact?: boolean;
  activeColor?: string;
  hoverColor?: string;
  defaultColor?: string;
  selectedColor?: string;
}

export const ObjectHelperPlugin: Plugin<ObjectHelperParameters> = function (
  this: Engine,
  params: ObjectHelperParameters = {}
): boolean {
  if (!this.scene) {
    console.error("must install some scene plugin before ObjectHelper plugin.");
    return false;
  }

  if (params.interact === undefined) {
    params.interact = true;
  }

  if (params.interact) {
    if (!this.eventManager) {
      console.warn(
        "must install eventManager plugin that can use interact function."
      );
      params.interact = false;
    }
  }

  const helperManager = new ObjectHelperManager();
  const pointerenterFunMap = new Map<Object3D, Function>();
  const pointerleaveFunMap = new Map<Object3D, Function>();
  const clickFunMap = new Map<Object3D, Function>();
  const helperMap = helperManager.helperMap;

  this.objectHelperManager = helperManager;
  const scene = this.scene!;

  !params.activeColor && (params.activeColor = "rgb(230, 20, 240)");
  !params.hoverColor && (params.hoverColor = "rgb(255, 158, 240)");
  !params.defaultColor && (params.defaultColor = "rgb(255, 255, 255)");
  !params.selectedColor && (params.selectedColor = params.activeColor);

  const defaultColorHex = new Color(params.defaultColor).getHex();
  const activeColorHex = new Color(params.activeColor).getHex();
  const hoverColorHex = new Color(params.hoverColor).getHex();
  const selectedColorHex = new Color(params.selectedColor).getHex();

  scene.addEventListener("afterAdd", (event) => {
    const objects = event.objects;

    for (const object of objects) {
      const helper = helperManager.addObjectHelper(object) as Sprite;

      if (!helper) {
        continue;
      }
      helper.material.color.setHex(defaultColorHex);
      scene.add(helper);

      if (params.interact) {
        const pointerenterFun = () => {
          if (this.transing) {
            return;
          }
          if (this.selectionBox) {
            if (this.selectionBox.has(object)) {
              return;
            }
          }
          helper.material.color.setHex(hoverColorHex);
        };

        const pointerleaveFun = () => {
          if (this.transing) {
            return;
          }
          if (this.selectionBox) {
            if (this.selectionBox.has(object)) {
              return;
            }
          }

          helper.material.color.setHex(defaultColorHex);
        };

        const clickFun = () => {
          if (this.transing) {
            return;
          }
          if (this.selectionBox) {
            if (this.selectionBox.has(object)) {
              return;
            }
          }
          helper.material.color.setHex(activeColorHex);
        };

        object.addEventListener("pointerenter", pointerenterFun);
        object.addEventListener("pointerleave", pointerleaveFun);
        object.addEventListener("click", clickFun);

        pointerenterFunMap.set(object, pointerenterFun);
        pointerleaveFunMap.set(object, pointerleaveFun);
        clickFunMap.set(object, clickFun);
      }
    }
  });

  scene.addEventListener("afterRemove", (event) => {
    const objects = event.objects;

    for (const object of objects) {
      const helper = helperManager.disposeObjectHelper(object);

      if (!helper) {
        continue;
      }

      scene.remove(helper);

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
  });

  this.setObjectHelper = function (params: { show: boolean }): Engine {
    if (params.show) {
      helperMap.forEach((helper) => {
        scene.add(helper);
      });
    } else {
      helperMap.forEach((helper) => {
        scene.remove(helper);
      });
    }
    return this;
  };

  const cacheObjectsHelper = new Set<Object3D>();

  this.completeSet.add(() => {
    if (this.selectionBox) {
      this.addEventListener<SelectedEvent>("selected", (event) => {
        cacheObjectsHelper.forEach((helper) => {
          (helper as Sprite).material.color.setHex(defaultColorHex);
        });
        cacheObjectsHelper.clear();

        for (const object of event.objects) {
          if (helperMap.has(object)) {
            const helper = helperMap.get(object) as Sprite;
            helper.material.color.setHex(selectedColorHex);
            cacheObjectsHelper.add(helper);
          }
        }
      });
    }
  });
  return true;
};
