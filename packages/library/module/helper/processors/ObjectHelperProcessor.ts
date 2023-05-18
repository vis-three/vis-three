import {
  Bus,
  COMPILER_EVENT,
  defineProcessor,
  EngineSupport,
} from "@vis-three/middleware";
import { HelperCompiler } from "../HelperCompiler";
import { getObjectHelperConfig, ObjectHelperConfig } from "../HelperConfig";
import { BaseEvent, EventDispatcher } from "@vis-three/core";
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
import { Object3D } from "three";
import { VisHelper } from "../extends/common";
import { SolidObject3D } from "@vis-three/module-solid-object";
import { getHelperExpandConfig } from "../expand/objectHelper";

export interface ShapeHelper extends Object3D, VisHelper {}

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
      const boundingBox = new BoundingBoxHelper(this.target! as SolidObject3D);
      this.boundingBox = boundingBox;
    }
  }

  generateGeometricOrigin() {
    if (this.target) {
      const geometricOrigin = new GeometricOriginHelper(
        this.target! as SolidObject3D
      );
      this.geometricOrigin = geometricOrigin;
    }
  }

  generateLocalAxes() {
    if (this.target) {
      const localAxes = new LocalAxesHelper(this.target! as SolidObject3D);
      this.localAxes = localAxes;
    }
  }

  dispose(params?: string) {
    if (params) {
      if (this[params]) {
        this[params].dispose();
        this[params] = undefined;
        return;
      }
    }

    this.target = undefined;
    if (this.shape) {
      this.shape.dispose();
      this.shape = undefined;
    }

    if (this.boundingBox) {
      this.boundingBox.dispose();
      this.boundingBox = undefined;
    }

    if (this.geometricOrigin) {
      this.geometricOrigin.dispose();
      this.geometricOrigin = undefined;
    }

    if (this.localAxes) {
      this.localAxes.dispose();
      this.localAxes = undefined;
    }
  }
}

const eventMap = new WeakMap<Object3D, (event: BaseEvent) => void>();

const addHelper = function (
  helper: Object3D,
  config: ObjectHelperConfig,
  engine: EngineSupport
) {
  const object = engine.getObjectBySymbol(config.target) as Object3D;
  if (!object) {
    console.warn(
      `object helper processor can not fund object: ${config.target}`
    );
    return;
  }
  object.parent!.add(helper);

  const cacheFun = () => {
    object.parent!.add(helper);
  };
  Bus.compilerEvent.on(object, `${COMPILER_EVENT.UPDATE}:parent`, cacheFun);
  eventMap.set(object, cacheFun);
};

const removeHelper = function (
  helper: string,
  config: ObjectHelperConfig,
  target: ObjectHelper,
  engine: EngineSupport
) {
  const object = engine.getObjectBySymbol(config.target) as Object3D;
  if (!object) {
    console.warn(
      `object helper processor can not fund object: ${config.target}`
    );
    return;
  }
  target[helper].removeFromParent();
  const cacheFun = eventMap.get(object);
  cacheFun &&
    Bus.compilerEvent.off(object, `${COMPILER_EVENT.UPDATE}:parent`, cacheFun);

  target.dispose(helper);
};

export default defineProcessor<
  ObjectHelperConfig,
  ObjectHelper,
  EngineSupport,
  HelperCompiler
>({
  type: "ObjectHelper",
  config: getObjectHelperConfig,
  commands: {
    set: {
      shape({ config, target, value, engine }) {
        if (value && !target.shape) {
          target.generateShape();
          addHelper(target.shape!, config, engine);
        } else if (!value && target.shape) {
          removeHelper("shape", config, target, engine);
        }
      },
      boundingBox({ config, target, value, engine }) {
        if (value && !target.boundingBox) {
          target.generateBoundingBox();
          addHelper(target.boundingBox!, config, engine);
        } else if (!value && target.boundingBox) {
          removeHelper("boundingBox", config, target, engine);
        }
      },
      geometricOrigin({ config, target, value, engine }) {
        if (value && !target.geometricOrigin) {
          target.generateGeometricOrigin();
          addHelper(target.geometricOrigin!, config, engine);
        } else if (!value && target.geometricOrigin) {
          removeHelper("geometricOrigin", config, target, engine);
        }
      },
      localAxes({ config, target, value, engine }) {
        if (value && !target.localAxes) {
          target.generateLocalAxes();
          addHelper(target.localAxes!, config, engine);
        } else if (!value && target.localAxes) {
          removeHelper("localAxes", config, target, engine);
        }
      },
    },
  },
  create(config, engine) {
    const helper = new ObjectHelper();

    if (config.target) {
      const target = engine.getObjectBySymbol(config.target);
      const targetConfig = getHelperExpandConfig(
        engine.getConfigBySymbol(config.target)!
      );

      targetConfig.helper = config.vid;

      if (!target) {
        console.warn(
          `object helper processor can not found target in engine ${config.target}`
        );
      } else {
        helper.target = target;

        if (config.shape) {
          helper.generateShape();
          addHelper(helper.shape!, config, engine);
        }
        if (config.boundingBox) {
          helper.generateBoundingBox();
          addHelper(helper.boundingBox!, config, engine);
        }
        if (config.geometricOrigin) {
          helper.generateGeometricOrigin();
          addHelper(helper.geometricOrigin!, config, engine);
        }
        if (config.localAxes) {
          helper.generateLocalAxes();
          addHelper(helper.localAxes!, config, engine);
        }
      }
    }

    return helper;
  },
  dispose(target) {
    target.dispose();
  },
});
