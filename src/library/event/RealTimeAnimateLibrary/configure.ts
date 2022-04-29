import { Easing, EasingFunction } from "@tweenjs/tween.js";
import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { generateConfigFunction } from "../../../utils/utils";
import { BasicEventConfig } from "../EventLibrary";

// TODO: const timingFunction => string
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
export const moveTo = generateConfigFunction<MoveTo>({
  name: "moveTo",
  params: {
    target: "",
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: Easing.Quadratic.InOut,
  },
});

/**
 * 物体移动间距
 */
export const moveSpacing = generateConfigFunction<MoveSpacing>({
  name: "moveSpacing",
  params: {
    target: "",
    spacing: {
      x: 10,
      y: 10,
      z: 10,
    },
    delay: 0,
    duration: 1000,
    timingFunction: Easing.Quadratic.InOut,
  },
});
