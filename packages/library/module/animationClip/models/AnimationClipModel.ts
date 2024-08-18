import { defineModel } from "@vis-three/tdcm";
import {
  AnimationClipConfig,
  getAnimationClipConfig,
} from "../AnimationClipConfig";
import { AnimationClip } from "three";

export default defineModel<AnimationClipConfig, {}>({
  type: "AnimationClip",
  config: getAnimationClipConfig,
  create() {
    return {};
  },
  dispose() {},
});
