import {
  defineProcessor,
  EngineSupport,
  globalAntiShake,
  globalObjectModuleTrigger,
} from "@vis-three/middleware";
import { SkeletonCompiler } from "../SkeletonCompiler";
import {
  getLoadSkeletonConfig,
  getSkeletonConfig,
  LoadSkeletonConfig,
  SkeletonConfig,
} from "../SkeletonConfig";
import { Bone, Skeleton } from "three";

export default defineProcessor<
  LoadSkeletonConfig,
  Skeleton,
  EngineSupport,
  SkeletonCompiler
>({
  type: "LoadSkeleton",
  config: getLoadSkeletonConfig,
  commands: {
    set: {
      url() {},
    },
  },
  create(config, engine) {
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
  dispose(target) {
    target.bones = [];
    target.boneInverses = [];
    target.dispose();
  },
});
