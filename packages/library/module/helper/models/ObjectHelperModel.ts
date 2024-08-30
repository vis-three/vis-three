import { BaseEvent, EventDispatcher } from "@vis-three/core";
import {
  Compiler,
  defineModel,
  EngineSupport,
  Model,
  MODEL_EVENT,
} from "@vis-three/tdcm";
import { Object3D, Object3DEventMap } from "three";
import { VisHelper } from "../extends/common";
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
} from "../extends";
import { getObjectHelperConfig, ObjectHelperConfig } from "../HelperConfig";
import helper from "..";

export interface ShapeHelper extends VisHelper {}

export class ObjectHelper extends EventDispatcher {
  target?: Object3D;
  shape?: ShapeHelper;
  boundingBox?: BoundingBoxHelper;
  geometricOrigin?: GeometricOriginHelper;
  localAxes?: LocalAxesHelper;

  private shapeMap = {
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

  constructor() {
    super();
  }

  generateShape() {
    if (this.target) {
      if (!this.shapeMap[this.target.type]) {
        console.warn(`object helper can not support ${this.target.type}`);
        return;
      }
      const helper = new this.shapeMap[this.target.type](this.target);
      this.shape = helper;
    }
  }

  generateBoundingBox() {
    if (this.target) {
      const boundingBox = new BoundingBoxHelper(this.target!);
      this.boundingBox = boundingBox;
    }
  }

  generateGeometricOrigin() {
    if (this.target) {
      const geometricOrigin = new GeometricOriginHelper(this.target!);
      this.geometricOrigin = geometricOrigin;
    }
  }

  generateLocalAxes() {
    if (this.target) {
      const localAxes = new LocalAxesHelper(this.target!);
      this.localAxes = localAxes;
    }
  }

  dispose(params?: string) {
    if (params) {
      if (this[params]) {
        this[params].removeFromParent();
        this[params].dispose();
        this[params] = undefined;
        return;
      }
    }

    this.target = undefined;
    ["shape", "boundingBox", "geometricOrigin", "localAxes"].forEach((key) => {
      if (this[key]) {
        this[key].removeFromParent();
        this[key].dispose();
        this[key] = undefined;
      }
    });
  }
}

export interface ObjectHelperModelContext {
  helperEventMap: Record<string, () => void>;
}

export interface ObjectHelperModelShared {
  addHelper: (
    helper: string,
    target: ObjectHelper,
    config: ObjectHelperConfig,
    model: Model<
      ObjectHelperConfig,
      ObjectHelper,
      EngineSupport,
      Compiler<EngineSupport>
    > &
      ObjectHelperModelContext &
      Readonly<ObjectHelperModelShared>
  ) => void;
  removeHelper: (
    helper: string,
    target: ObjectHelper,
    config: ObjectHelperConfig,
    model: Model<
      ObjectHelperConfig,
      ObjectHelper,
      EngineSupport,
      Compiler<EngineSupport>
    > &
      ObjectHelperModelContext &
      Readonly<ObjectHelperModelShared>
  ) => void;
}

export default defineModel<
  ObjectHelperConfig,
  ObjectHelper,
  ObjectHelperModelContext,
  ObjectHelperModelShared
>({
  type: "ObjectHelper",
  config: getObjectHelperConfig,
  context() {
    return {
      helperEventMap: {},
    };
  },
  shared: {
    addHelper(helper, target, config, model) {
      const helperGenerator = {
        shape: target.generateShape,
        boundingBox: target.generateBoundingBox,
        geometricOrigin: target.generateGeometricOrigin,
        localAxes: target.generateLocalAxes,
      };

      if (!helperGenerator[helper]) {
        console.warn(
          `Object helper Model: can not found helper: ${helper} in generator.`
        );
        return;
      }

      const helperObject = helperGenerator[helper]!();

      model.toAsync((finish) => {
        const object = model.toObject(config.target) as Object3D;
        if (!object || !object.parent) {
          if (finish) {
            console.warn(
              `object helper model can not fund object parent: ${object}`
            );
          }
          return false;
        }

        object.parent!.add(helperObject);

        const cacheFun = () => {
          object.parent!.add(helperObject);
        };

        model
          .toModel(config.target)
          ?.on(`${MODEL_EVENT.COMPILED_ATTR}:parent`, cacheFun);

        model.helperEventMap[helper] = cacheFun;

        return true;
      });
    },
    removeHelper(helper, target, config, model) {
      const object = model.toObject(config.target) as Object3D;
      if (!object) {
        console.warn(
          `object helper model: can not fund object: ${config.target}`
        );
        return;
      }

      const cacheFun = model.helperEventMap[helper];

      cacheFun &&
        model
          .toModel(config.target)
          ?.off(`${MODEL_EVENT.COMPILED_ATTR}:parent`, cacheFun);

      target.dispose(helper);
    },
  },
  commands: {
    set: {
      shape({ model, config, target, value, engine }) {
        if (value && !target.shape) {
          model.addHelper("shape", target, config, model);
        } else if (!value && target.shape) {
          model.removeHelper("shape", target, config, model);
        }
      },
      boundingBox({ model, config, target, value, engine }) {
        if (value && !target.boundingBox) {
          model.addHelper("boundingBox", target, config, model);
        } else if (!value && target.boundingBox) {
          model.removeHelper("boundingBox", target, config, model);
        }
      },
      geometricOrigin({ model, config, target, value, engine }) {
        if (value && !target.geometricOrigin) {
          model.addHelper("geometricOrigin", target, config, model);
        } else if (!value && target.geometricOrigin) {
          model.removeHelper("geometricOrigin", target, config, model);
        }
      },
      localAxes({ model, config, target, value, engine }) {
        if (value && !target.localAxes) {
          model.addHelper("localAxes", target, config, model);
        } else if (!value && target.localAxes) {
          model.removeHelper("localAxes", target, config, model);
        }
      },
    },
  },
  create({ model, config, engine }) {
    const helper = new ObjectHelper();

    if (config.target) {
      const target = engine.getObjectBySymbol(config.target);
      const targetConfig = engine.getConfigBySymbol(config.target)!;

      targetConfig.helper = config.vid;

      if (!target) {
        console.warn(
          `object helper processor can not found target in engine ${config.target}`
        );
      } else {
        helper.target = target;

        if (config.shape) {
          model.addHelper("shape", helper, config, model);
        }
        if (config.boundingBox) {
          model.addHelper("boundingBox", helper, config, model);
        }
        if (config.geometricOrigin) {
          model.addHelper("geometricOrigin", helper, config, model);
        }
        if (config.localAxes) {
          model.addHelper("localAxes", helper, config, model);
        }
      }
    }

    return helper;
  },
  dispose({ target }) {
    target.dispose();
  },
  expand: [
    {
      models: new RegExp("Mesh|Light|Line|Points|Group|Object3D"),
      config: () => ({
        helper: "",
      }),
      commands: {
        add: {
          helper() {},
        },
        set: {
          helper() {},
        },
      },
    },
  ],
});
