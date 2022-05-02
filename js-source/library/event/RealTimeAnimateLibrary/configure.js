import { Easing } from "@tweenjs/tween.js";
import { generateConfigFunction } from "../../../utils/utils";
/**
 * 物体移动到
 */
export const moveTo = generateConfigFunction({
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
export const moveSpacing = generateConfigFunction({
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
//# sourceMappingURL=configure.js.map