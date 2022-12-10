
import { DataSupport } from "@vis-three/core";
import { MODULETYPE } from "../constants";
import { AnimationCompiler } from "./AnimationCompiler";
import { AnimationAllType } from "./AnimationConfig";
import { AnimationRule } from "./AnimationRule";

export class AnimationDataSupport extends DataSupport<
  AnimationAllType,
  Function,
  AnimationCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.ANIMATION;

  constructor(data: Array<AnimationAllType> = []) {
    super(AnimationRule, data);
  }
}
