import { Easing } from "@tweenjs/tween.js";
export var TIMINGFUNCTION;
(function (TIMINGFUNCTION) {
    TIMINGFUNCTION["ELN"] = "ELN";
    TIMINGFUNCTION["EQI"] = "EQI";
})(TIMINGFUNCTION || (TIMINGFUNCTION = {}));
export const timingFunction = {
    ELN: Easing.Linear.None,
    EQI: Easing.Quadratic.InOut,
};
//# sourceMappingURL=common.js.map