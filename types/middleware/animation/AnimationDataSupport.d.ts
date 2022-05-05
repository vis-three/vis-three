import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationCompiler, AnimationCompilerTarget } from "./AnimationCompiler";
export declare class AnimationDataSupport extends DataSupport<AnimationCompilerTarget, AnimationCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: AnimationCompilerTarget);
}
