import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationCompiler } from "./AnimationCompiler";
import { AnimationAllType } from "./AnimationConfig";
export declare class AnimationDataSupport extends DataSupport<AnimationAllType, Function, AnimationCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<AnimationAllType>);
}
