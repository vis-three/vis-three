import {
  BaseEvent,
  Color,
  Material,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Scene,
  Sprite,
} from "three";
import { Engine } from "../engine/Engine";
import { CameraHelper } from "../extends/helper/camera/CameraHelper";
import { PointLightHelper } from "../extends/helper/light/PointLightHelper";
import { GroupHelper } from "../extends/helper/object/GroupHelper";
import { MeshHelper } from "../extends/helper/object/MeshHelper";
import { SpotLightHelper } from "../extends/helper/light/SpotLightHelper";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { Plugin } from "./plugin";
import { SelectedEvent } from "./SelectionPlugin";
import { DirectionalLightHelper } from "../extends/helper/light/DirectionalLightHelper";

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

  const typeHelperMap = {
    [CONFIGTYPE.POINTLIGHT]: PointLightHelper,
    [CONFIGTYPE.SPOTLIGHT]: SpotLightHelper,
    [CONFIGTYPE.DIRECTIONALLIGHT]: DirectionalLightHelper,
    [CONFIGTYPE.PERSPECTIVECAMERA]: CameraHelper,
    [CONFIGTYPE.ORTHOGRAPHICCAMERA]: CameraHelper,
    [CONFIGTYPE.MESH]: MeshHelper,
    [CONFIGTYPE.GROUP]: GroupHelper,
  };

  const filterHelperMap = {
    AmbientLight: true,
    Object3D: true,
    TransformControls: true,
  };

  const helperMap = new Map<Object3D, Object3D>();
  const pointerenterFunMap = new Map<Object3D, Function>();
  const pointerleaveFunMap = new Map<Object3D, Function>();
  const clickFunMap = new Map<Object3D, Function>();

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
      if (filterHelperMap[object.type] || object.type.includes("Helper")) {
        continue;
      }

      if (typeHelperMap[object.type]) {
        const helper = new typeHelperMap[object.type](object);
        helper.material.color.setHex(defaultColorHex);

        helperMap.set(object, helper);
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
      } else {
        console.warn(
          `object helper can not support this type object: '${object.type}'`
        );
      }
    }
  });

  scene.addEventListener("afterRemove", (event) => {
    const objects = event.objects;

    for (const object of objects) {
      if (filterHelperMap[object.type] || object.type.includes("Helper")) {
        continue;
      }

      if (!helperMap.has(object)) {
        console.warn(
          `Object helper plugin can not found this object\`s helper: ${object}`
        );
        continue;
      }

      const helper = helperMap.get(object)! as Mesh;
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

      helper.geometry && helper.geometry.dispose();

      if (helper.material) {
        if (helper.material instanceof Material) {
          helper.material.dispose();
        } else {
          helper.material.forEach((material) => {
            material.dispose();
          });
        }
      }

      helperMap.delete(object);
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
