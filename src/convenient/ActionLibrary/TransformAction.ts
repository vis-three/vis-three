import { Object3D } from "three";
import { Vector3Config } from "../../middleware/common/CommonConfig";
import { VisTransformControls } from "../../optimize/VisTransformControls";
import { BasicAction } from "./Action";

export interface TransformActionParameters {
  transformControls: VisTransformControls;
}

interface CacheState {
  mode: "translate" | "rotate" | "scale";
  space: "local" | "world";
  tranform: string;
  objectMap: Map<Object3D, Vector3Config>;
}

export class TransformAction implements BasicAction {
  private transfromControls: VisTransformControls;
  private nextState: CacheState = {
    mode: "translate",
    space: "world",
    tranform: "",
    objectMap: new Map(),
  };
  private prevState: CacheState = {
    mode: "translate",
    space: "world",
    tranform: "",
    objectMap: new Map(),
  };

  constructor(params: TransformActionParameters) {
    this.transfromControls = params.transformControls;
  }

  generate(status: "next" | "prev") {
    const transformControls = this.transfromControls;
    const mode = transformControls.mode;
    const tranform =
      mode === "rotate" ? "rotation" : mode === "translate" ? "position" : mode;
    const objectSet = transformControls.getTransObjectSet();
    const state = this[`${status}State`];

    state.mode = mode;
    state.tranform = tranform;
    state.space = transformControls.space;

    const cacheMap = state.objectMap;
    objectSet.forEach((object) => {
      cacheMap.set(object, {
        x: object[tranform].x,
        y: object[tranform].y,
        z: object[tranform].z,
      });
    });

    this[status] = function () {
      const transformControls = this.transfromControls;
      const state = this[`${status}State`];
      transformControls.mode = state.mode;
      transformControls.space = state.space;
      const tranform = state.tranform;
      const objects: Object3D[] = [];
      state.objectMap.forEach((vector3, object) => {
        object[tranform].x = vector3.x;
        object[tranform].y = vector3.y;
        object[tranform].z = vector3.z;
        objects.push(object);
      });
      transformControls.setAttach(...objects);
    };
  }

  next() {}
  prev() {}
}
