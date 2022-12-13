import { Engine, Plugin } from "@vis-three/core";
import { Object3D, Scene } from "three";
import { ObjectHelperManager } from "./ObjectHelperManager";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export * from "./ObjectHelperManager";

export interface ObjectHelperParameters {
  interact?: boolean;
  activeColor?: string;
  hoverColor?: string;
  defaultColor?: string;
  selectedColor?: string;
}

export interface ObjectHelperEngine extends Engine {
  objectHelperManager: ObjectHelperManager;
  setObjectHelper: (show: boolean) => ObjectHelperEngine;
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

export const OBJECT_HELPER_PLUGIN = transPkgName(pkgname);

export const ObjectHelperPlugin: Plugin<ObjectHelperEngine> = function () {
  return {
    name: OBJECT_HELPER_PLUGIN,
    install(engine) {
      const helperManager = new ObjectHelperManager();
      const helperMap = helperManager.objectHelperMap;

      engine.objectHelperManager = helperManager;

      engine.setObjectHelper = function (show: boolean) {
        if (show) {
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
    },
    dispose(
      engine: Optional<
        ObjectHelperEngine,
        "objectHelperManager" | "setObjectHelper"
      >
    ) {
      engine.objectHelperManager!.dispose();

      delete engine.objectHelperManager;
      delete engine.setObjectHelper;
    },
  };
};
