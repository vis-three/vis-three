import { generateConfigFunction } from "../../utils/utils";
import { Easing } from '@tweenjs/tween.js';
export const moveTo = generateConfigFunction({
    name: 'moveTo',
    desp: '物体移动到',
    params: {
        target: '',
        position: {
            x: 0,
            y: 0,
            z: 0
        },
        delay: 0,
        duration: 1000,
        timingFunction: Easing.Quadratic.InOut,
    }
});
export const moveSpacing = generateConfigFunction({
    name: 'moveSpacing',
    desp: '物体移动间距',
    params: {
        target: '',
        spacing: {
            x: 10,
            y: 10,
            z: 10
        },
        delay: 0,
        duration: 1000,
        timingFunction: Easing.Quadratic.InOut,
    }
});
//# sourceMappingURL=configure.js.map