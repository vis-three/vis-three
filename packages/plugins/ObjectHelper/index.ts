import {
  BaseEvent,
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetSceneEvent,
} from "@vis-three/core";
import { Object3D, Scene, Sprite } from "three";
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

export interface AfterAddEvent extends BaseEvent {
  objects: Object3D[];
}

export interface AfterRemoveEvent extends BaseEvent {
  objects: Object3D[];
}

export const AFTERADD = "afterAdd";

export const AFTERREMOVE = "afterRemove";

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
    type: AFTERADD,
    objects: object,
  });
  return this;
};

Scene.prototype.remove = function (...object: Object3D[]): Scene {
  sceneRemove.call(this, ...object);
  this.dispatchEvent({
    type: AFTERREMOVE,
    objects: object,
  });
  return this;
};

export const OBJECT_HELPER_PLUGIN = transPkgName(pkgname);

export const ObjectHelperPlugin: Plugin<ObjectHelperEngine> = function () {
  let setSceneFun: (event: SetSceneEvent) => void;
  let afterAddFun: (event: any) => void;
  let afterRemoveFun: (event: any) => void;
  const cacheSceneSet = new WeakSet<Scene>();

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
          for (let i = 0; i < this.scene.children.length; i++) {
            const object = this.scene.children[i];
            if (helperMap.has(object)) {
              this.scene.remove(helperMap.get(object)!);
            }
          }
        }
        return this;
      };

      const initSceneHelper = (scene: Scene) => {
        if (cacheSceneSet.has(scene)) {
          return;
        }

        scene.traverse((object) => {
          const helper = helperManager.addObjectHelper(object);
          helper && scene.add(helper);
        });
        cacheSceneSet.add(scene);
      };

      afterAddFun = (event) => {
        const objects = event.objects;

        for (const object of objects) {
          const helper = helperManager.addObjectHelper(object) as Sprite;

          if (!helper) {
            continue;
          }

          engine.scene.add(helper);
        }
      };

      afterRemoveFun = (event) => {
        const objects = event.objects;

        for (const object of objects) {
          const helper = helperManager.disposeObjectHelper(object);

          if (!helper) {
            continue;
          }

          engine.scene.remove(helper);
        }
      };

      engine.scene.addEventListener(AFTERADD, afterAddFun);

      engine.scene.addEventListener(AFTERREMOVE, afterRemoveFun);

      setSceneFun = (event) => {
        const scene = event.scene;
        // 初始化场景辅助
        !cacheSceneSet.has(scene) && initSceneHelper(scene);

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
    },
    dispose(
      engine: Optional<
        ObjectHelperEngine,
        "objectHelperManager" | "setObjectHelper"
      >
    ) {
      engine.objectHelperManager!.objectHelperMap.forEach((helper) => {
        if (helper.parent) {
          helper.parent.remove(helper);
        }
      });

      engine.objectHelperManager!.dispose();

      delete engine.objectHelperManager;
      delete engine.setObjectHelper;

      engine.removeEventListener<SetSceneEvent>(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );
    },
  };
};
