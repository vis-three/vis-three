import { EventDispatcher } from "@vis-three/core";
import { Material, Mesh, Object3D, Sprite } from "three";
import {
  BoundingBoxHelper,
  CameraHelper,
  CSS2DPlaneHelper,
  CSS3DPlaneHelper,
  CSS3DSpriteHelper,
  DirectionalLightHelper,
  GeometricOriginHelper,
  GroupHelper,
  LineHelper,
  LocalAxesHelper,
  MeshHelper,
  PointLightHelper,
  PointsHelper,
  RectAreaLightHelper,
  SpotLightHelper,
  SpriteHelper,
} from "./helper";
import { VisHelper } from "./helper/common";

export interface ObjectHelperManagerParameters {
  helperGenerator?: { [key: string]: typeof Object3D };
  typeFilter?: { [key: string]: boolean };
  objectFilter?: Object3D[];
}

export class ObjectHelperManager extends EventDispatcher {
  private helperGenerator = {
    LocalAxes: LocalAxesHelper,
    BoundingBox: BoundingBoxHelper,
    GeometricOrigin: GeometricOriginHelper,
    PointLight: PointLightHelper,
    SpotLight: SpotLightHelper,
    DirectionalLight: DirectionalLightHelper,
    RectAreaLight: RectAreaLightHelper,
    PerspectiveCamera: CameraHelper,
    OrthographicCamera: CameraHelper,
    Mesh: MeshHelper,
    Group: GroupHelper,
    Sprite: SpriteHelper,
    Points: PointsHelper,
    Line: LineHelper,
    CSS3DPlane: CSS3DPlaneHelper,
    CSS3DSprite: CSS3DSpriteHelper,
    CSS2DPlane: CSS2DPlaneHelper,
  };

  private typeFilter = {
    AmbientLight: true,
    HemisphereLight: true,
    Object3D: true,
    TransformControls: true,
    Scene: true,
  };

  private objectFilter = new Set<Object3D>();

  objectHelperMap = new Map<Object3D, Record<string, Object3D>>(); // object -> {type: helper}

  constructor(params: ObjectHelperManagerParameters = {}) {
    super();

    params.helperGenerator &&
      (this.helperGenerator = Object.assign(
        this.helperGenerator,
        params.helperGenerator
      ));

    params.typeFilter &&
      (this.typeFilter = Object.assign(this.typeFilter, params.typeFilter));

    params.objectFilter &&
      (this.objectFilter = new Set(
        params.objectFilter.concat(Array.from(this.objectFilter))
      ));
  }

  /**
   * 添加过滤的物体
   * @param {Object3D} objects three object
   * @return {this} this
   */
  addFilteredObject(...objects: Object3D[]): this {
    for (const object of objects) {
      this.objectFilter.add(object);
    }

    return this;
  }

  /**
   * 添加过滤的类型
   * @param types
   * @returns this
   */
  addFilteredType(...types: string[]): this {
    for (const type of types) {
      this.typeFilter[type] = true;
    }
    return this;
  }

  /**
   * 添加物体辅助
   * @param {Object3D} obejct three object
   * @param helperType 辅助类型
   * @return {Object3D | null} three object or null
   */
  addObjectHelper(object: Object3D, helperType?: string): Object3D | null {
    if (
      this.objectFilter.has(object) ||
      this.objectHelperMap.has(object) ||
      this.typeFilter[object.type] ||
      object.type.toLocaleLowerCase().includes("helper")
    ) {
      return null;
    }

    if (
      !this.helperGenerator[object.type] ||
      (helperType && !this.helperGenerator[helperType])
    ) {
      console.warn(
        `object helper can not support this type object: '${object.type}', ${
          helperType || ""
        }`
      );
      return null;
    }

    const helper = new this.helperGenerator[helperType || object.type](object);

    if (!this.objectHelperMap.has(object)) {
      this.objectHelperMap.set(object, {});
    }
    this.objectHelperMap.get(object)![helperType || object.type] = helper;

    return helper;
  }

  /**
   * 销毁物体，不传type销毁所有的物体辅助
   * @param object
   * @param helperType
   * @returns
   */
  disposeObjectHelper(object: Object3D, helperType?: string) {
    if (!this.objectHelperMap.has(object)) {
      console.warn(
        `object helper manager can not found this object\`s helpers: `,
        object
      );
      return;
    }

    const dispose = function (helper: Mesh) {
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
    };

    const map = this.objectHelperMap.get(object)!;

    if (helperType) {
      const helper = map[helperType]!;

      if (!map[helperType]) {
        console.warn(
          `object helper manager can not found this helper type with object: ${helperType}`,
          object
        );
        return;
      }

      dispose(helper as unknown as Mesh);
      delete map[helperType];
      return;
    }

    Object.values(map).forEach((object) => {
      dispose(object as unknown as Mesh);
    });

    this.objectHelperMap.delete(object);
  }

  dispose() {
    for (const object of this.objectHelperMap.keys()) {
      this.disposeObjectHelper(object);
    }

    this.objectHelperMap.clear();
  }
}
