import {
  defineProcessor,
  EngineSupport,
  globalAntiShake,
} from "@vis-three/middleware";
import { SkeletonCompiler } from "../SkeletonCompiler";
import { getSkeletonConfig, SkeletonConfig } from "../SkeletonConfig";
import { Bone, Skeleton } from "three";

export default defineProcessor<
  SkeletonConfig,
  Skeleton,
  EngineSupport,
  SkeletonCompiler
>({
  type: "Skeleton",
  config: getSkeletonConfig,
  commands: {
    add: {
      bones({ target, value, engine }) {
        const bone = engine.getObjectBySymbol(value) as Bone;
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
    const bones: Bone[] = [];
    config.bones.forEach((vid) => {
      const bone = engine.getObjectBySymbol(vid) as Bone;

      if (bone) {
        bones.push(bone);
      } else {
        console.warn(`skeleton processor can not found bone in engine: ${vid}`);
      }
    });

    const skeleton = new Skeleton(bones);

    globalAntiShake.append(() => {
      skeleton.calculateInverses();
      return true;
    });

    return skeleton;
  },
  dispose(target) {
    target.bones = [];
    target.boneInverses = [];
    target.dispose();
  },
});
