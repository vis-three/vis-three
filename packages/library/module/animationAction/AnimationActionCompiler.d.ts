import { Compiler } from "@vis-three/middleware";
import { AnimationActionConfig } from "./AnimationActionConfig";
import { AnimationAction } from "three";
export declare class AnimationActionCompiler extends Compiler<AnimationActionConfig, object> {
    constructor();
    updateAction(vid: string, action: AnimationAction): void;
}
