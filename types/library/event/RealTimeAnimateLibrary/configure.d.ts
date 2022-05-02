import { EasingFunction } from "@tweenjs/tween.js";
import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig } from "../EventLibrary";
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
/**
 * 物体移动到
 */
export declare const moveTo: (merge: MoveTo) => MoveTo;
/**
 * 物体移动间距
 */
export declare const moveSpacing: (merge: MoveSpacing) => MoveSpacing;
