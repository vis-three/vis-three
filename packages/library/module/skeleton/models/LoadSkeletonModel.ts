import { defineModel } from "@vis-three/tdcm";
import { getLoadSkeletonConfig, LoadSkeletonConfig } from "../SkeletonConfig";
import { Bone, Skeleton } from "three";

export default defineModel<LoadSkeletonConfig, Skeleton>({
  type: "LoadSkeleton",
  config: getLoadSkeletonConfig,
  commands: {
    set: {
      url() {},
    },
  },
  create({config, engine}) {
    const target = engine.resourceManager.resourceMap.get(config.url)!;

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
  dispose({target}) {
    target.bones = [];
    target.boneInverses = [];
    target.dispose();
  },
});
