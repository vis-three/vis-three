import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  AnimationCompiler,
  AnimationCompilerTarget,
} from "./AnimationCompiler";
import { AnimationRule } from "./AnimationRule";

export class AnimationDataSupport extends DataSupport<
  AnimationCompilerTarget,
  AnimationCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.ANIMATION;

  constructor(data?: AnimationCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(AnimationRule, data, ignore);
  }
}
