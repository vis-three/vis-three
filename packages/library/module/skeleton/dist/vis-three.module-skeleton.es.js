import { Compiler, Rule, getSymbolConfig, defineProcessor, globalObjectModuleTrigger, SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { validate } from "uuid";
import { Skeleton } from "three";
class SkeletonCompiler extends Compiler {
  constructor() {
    super();
  }
}
const SkeletonRule = function(input, compiler, validateFun = validate) {
  Rule(input, compiler, validateFun);
};
const getSkeletonConfig = function() {
  return Object.assign(getSymbolConfig(), {
    bones: []
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
      }
    },
    set: {},
    delete: {
      bones({ target, value, engine }) {
        target.bones.splice(value, 1);
        target.boneInverses = [];
        target.init();
      }
    }
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
    const skeleton = new Skeleton(bones);
    globalObjectModuleTrigger.registerExec(() => {
      skeleton.calculateInverses();
      return false;
    });
    return skeleton;
  },
  dispose(target) {
    target.bones = [];
    target.boneInverses = [];
    target.dispose();
  }
});
var index = {
  type: "skeleton",
  compiler: SkeletonCompiler,
  rule: SkeletonRule,
  processors: [SkeletonProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE - 1
};
export { SkeletonCompiler, index as default, getSkeletonConfig };
