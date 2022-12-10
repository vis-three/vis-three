import { Color, Object3D, Scene, ShaderMaterial, Sprite } from "three";
import { Engine, SetSceneEvent } from "../../engine/Engine";
import { Plugin } from "../../core/src/core/Plugin";
import { SelectedEvent } from "../SelectionPlugin";
import { ObjectHelperManager } from "../manager/ObjectHelperManager";

export interface ObjectHelperParameters {
  interact?: boolean;
  activeColor?: string;
  hoverColor?: string;
  defaultColor?: string;
  selectedColor?: string;
}

// 重写一下scene的add方法，由于其内部add会调用remove方法，存在藕合性
Scene.prototype.add = function (...object: Object3D[]): Scene {
  if (!arguments.length) {
    return this;
  }

  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      // eslint-disable-next-line
      this.add(arguments[i]);
    }
    return this;
  }

  const currentObject = object[0];

  if (currentObject === (this as Object3D)) {
    console.error(
      "THREE.Object3D.add: object can't be added as a child of itself.",
      object
    );
    return this;
  }

  if (currentObject && currentObject.isObject3D) {
    if (currentObject.parent !== null) {
      const index = this.children.indexOf(currentObject);

      if (index !== -1) {
        currentObject.parent = null;
        this.children.splice(index, 1);
        currentObject.dispatchEvent({ type: "removed" });
      }
    }
    currentObject.parent = this;
    this.children.push(currentObject);
    currentObject.dispatchEvent({ type: "added" });
  } else {
    console.error(
      "THREE.Object3D.add: object not an instance of THREE.Object3D.",
      object
    );
  }

  return this;
};

const sceneAdd = Scene.prototype.add;

const sceneRemove = Scene.prototype.remove;

Scene.prototype.add = function (...object: Object3D[]): Scene {
  sceneAdd.call(this, ...object);
  this.dispatchEvent({
    type: "afterAdd",
    objects: object,
  });
  return this;
};

Scene.prototype.remove = function (...object: Object3D[]): Scene {
  sceneRemove.call(this, ...object);
  this.dispatchEvent({
    type: "afterRemove",
    objects: object,
  });
  return this;
};

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
  const helperMap = helperManager.objectHelperMap;

  this.objectHelperManager = helperManager;

  !params.activeColor && (params.activeColor = "rgb(230, 20, 240)");
  !params.hoverColor && (params.hoverColor = "rgb(255, 158, 240)");
  !params.defaultColor && (params.defaultColor = "rgb(255, 255, 255)");
  !params.selectedColor && (params.selectedColor = params.activeColor);

  const defaultColorHex = new Color(params.defaultColor).getHex();
  const activeColorHex = new Color(params.activeColor).getHex();
  const hoverColorHex = new Color(params.hoverColor).getHex();
  const selectedColorHex = new Color(params.selectedColor).getHex();

  const cacheSceneSet = new WeakSet<Scene>();

  const updateHelperMaterial = (helper: Sprite, color: number) => {
    if (helper.material.color) {
      helper.material.color.setHex(defaultColorHex);
    } else if (helper.material instanceof ShaderMaterial) {
      (helper.material.uniforms.color.value as unknown as Color).setHex(color);
    }
  };

  const afterAddFun = (event) => {
    const objects = event.objects;

    for (const object of objects) {
      const helper = helperManager.addObjectHelper(object) as Sprite;

      if (!helper) {
        continue;
      }
      updateHelperMaterial(helper, defaultColorHex);

      this.scene.add(helper);

      if (params.interact) {
        const pointerenterFun = () => {
          if (this.transformControls?.dragging) {
            return;
          }
          if (this.selectionBox) {
            if (this.selectionBox.has(object)) {
              return;
            }
          }
          updateHelperMaterial(helper, hoverColorHex);
        };

        const pointerleaveFun = () => {
          if (this.transformControls?.dragging) {
            return;
          }
          if (this.selectionBox) {
            if (this.selectionBox.has(object)) {
              return;
            }
          }

          updateHelperMaterial(helper, defaultColorHex);
        };

        const clickFun = () => {
          if (this.transformControls?.dragging) {
            return;
          }
          if (this.selectionBox) {
            if (this.selectionBox.has(object)) {
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

  const afterRemoveFun = (event) => {
    const objects = event.objects;

    for (const object of objects) {
      const helper = helperManager.disposeObjectHelper(object);

      if (!helper) {
        continue;
      }

      this.scene.remove(helper);

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

  const initSceneHelper = (scene) => {
    if (cacheSceneSet.has(scene)) {
      return;
    }

    scene.traverse((object) => {
      const helper = helperManager.addObjectHelper(object);
      helper && scene.add(helper);
    });
    cacheSceneSet.add(scene);
  };

  this.scene.addEventListener("afterAdd", afterAddFun);

  this.scene.addEventListener("afterRemove", afterRemoveFun);

  this.setObjectHelper = function (params: { show: boolean }): Engine {
    if (params.show) {
      this.scene.traverse((object) => {
        if (helperMap.has(object)) {
          this.scene.add(helperMap.get(object)!);
        }
      });
    } else {
      this.scene.traverse((object) => {
        if (helperMap.has(object)) {
          this.scene.remove(helperMap.get(object)!);
        }
      });
    }
    return this;
  };

  this.addEventListener<SetSceneEvent>("setScene", (event) => {
    const scene = event.scene;
    // 初始化场景辅助
    !cacheSceneSet.has(scene) && initSceneHelper(scene);

    if (!scene.hasEventListener("afterAdd", afterAddFun)) {
      scene.addEventListener("afterAdd", afterAddFun);
    }

    if (!scene.hasEventListener("afterRemove", afterRemoveFun)) {
      scene.addEventListener("afterRemove", afterRemoveFun);
    }
  });

  const cacheObjectsHelper = new Set<Object3D>();

  this.completeSet.add(() => {
    if (this.selectionBox) {
      this.addEventListener<SelectedEvent>("selected", (event) => {
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
      });
    }
  });
  return true;
};
