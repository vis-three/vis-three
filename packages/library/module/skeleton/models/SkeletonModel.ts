import { defineModel } from "@vis-three/tdcm";
import { getSkeletonConfig, SkeletonConfig } from "../SkeletonConfig";
import { Bone, Matrix4, Matrix4Tuple, Skeleton } from "three";

export default defineModel<SkeletonConfig, Skeleton>({
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
  create({ model, config, engine }) {
    const bones: Bone[] = [];
    config.bones.forEach((vid) => {
      const bone = engine.getObjectBySymbol(vid) as Bone;

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
            matrix.elements = (<number[]>[]).concat(
              item
            ) as unknown as Matrix4Tuple;
            return matrix;
          })
        : []
    );

    if (!config.boneInverses.length) {
      model.toTrigger("object", () => {
        skeleton.calculateInverses();
        return false;
      });
    }

    return skeleton;
  },
  dispose({target}) {
    target.bones = [];
    target.boneInverses = [];
    target.dispose();
  },
});
