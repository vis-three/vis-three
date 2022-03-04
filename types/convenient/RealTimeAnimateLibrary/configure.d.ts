import { Vector3Config } from "../../middleware/common/CommonConfig";
import { BasicEventConfig } from "../../middleware/event/EventCompiler";
import { EasingFunction } from '@tweenjs/tween.js';
export interface MoveTo extends BasicEventConfig {
    params: {
        target: string;
        position: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: EasingFunction;
    };
}
export interface MoveSpacing extends BasicEventConfig {
    params: {
        target: string;
        spacing: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: EasingFunction;
    };
}
export declare const moveTo: (merge: MoveTo) => MoveTo;
export declare const moveSpacing: (merge: MoveSpacing) => MoveSpacing;
