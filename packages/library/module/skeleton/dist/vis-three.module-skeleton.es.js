import {
  Compiler,
  Rule,
  getSymbolConfig,
  defineProcessor,
  globalObjectModuleTrigger,
  SUPPORT_LIFE_CYCLE,
} from "@vis-three/middleware";
import { validate } from "uuid";
import { Skeleton, Matrix4, Bone } from "three";
class SkeletonCompiler extends Compiler {
  constructor() {
    super();
  }
}
const SkeletonRule = function (input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getSkeletonConfig = function () {
  return Object.assign(getSymbolConfig(), {
    bones: [],
    boneInverses: [],
  });
};
const getLoadSkeletonConfig = function () {
  return Object.assign(getSymbolConfig(), {
    url: "",
  });
};
var SkeletonProcessor = defineProcessor({
  type: "Skeleton",
  config: getSkeletonConfig,
  commands: {
    add: {
      bones({ target, value, engine }) {
        const bone = engine.getObjectBySymbol(value);
        if (bone) {
          target.bones.push(bone);
          target.boneInverses = [];
          target.init();
        } else {
          console.warn(
            `skeleton processor can not found bone in engine: ${value}`
          );
        }
      },
    },
    set: {},
    delete: {
      bones({ target, value, engine }) {
        target.bones.splice(value, 1);
        target.boneInverses = [];
        target.init();
      },
    },
  },
  create(config, engine) {
    const bones = [];
    config.bones.forEach((vid) => {
      const bone = engine.getObjectBySymbol(vid);
      if (bone) {
        bones.push(bone);
      } else {
        console.warn(`skeleton processor can not found bone in engine: ${vid}`);
      }
    });
    const skeleton = new Skeleton(
      bones,
      config.boneInverses.length
        ? config.boneInverses.map((item) => {
            const matrix = new Matrix4();
            matrix.elements = [].concat(item);
            return matrix;
          })
        : []
    );

    if (!config.boneInverses.length) {
      globalObjectModuleTrigger.registerExec(() => {
        skeleton.calculateInverses();
        return false;
      });
    }
    return skeleton;
  },
  dispose(target) {
    target.bones = [];
    target.boneInverses = [];
    target.dispose();
  },
});
var LoadSkeletonProcessor = defineProcessor({
  type: "LoadSkeleton",
  config: getLoadSkeletonConfig,
  commands: {
    set: {
      url() {},
    },
  },
  create(config, engine) {
    const target = engine.resourceManager.resourceMap.get(config.url);
    if (!target && !(target instanceof Skeleton)) {
      console.error(
        `LoadSkeletonProcessor: engine rescoure can not found url: ${config.url}`
      );
      return new Skeleton([new Bone()]);
    }
    return new Skeleton(
      [].concat(target.bones),
      [].concat(target.boneInverses)
    );
  },
  dispose(target) {
    target.bones = [];
    target.boneInverses = [];
    target.dispose();
  },
});
var index = {
  type: "skeleton",
  compiler: SkeletonCompiler,
  rule: SkeletonRule,
  processors: [SkeletonProcessor, LoadSkeletonProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE - 1,
};
export {
  SkeletonCompiler,
  index as default,
  getLoadSkeletonConfig,
  getSkeletonConfig,
};
