import { Easing } from "@tweenjs/tween.js";
export var TIMINGFUNCTION;
(function (TIMINGFUNCTION) {
    /**
     * @deprecated 使用 EASING_LINEAR_NONE
     */
    TIMINGFUNCTION["ELN"] = "ELN";
    /**
     * @deprecated 使用 EASING_QUARTIC_IN
     */
    TIMINGFUNCTION["EQI"] = "EQI";
    /**
     * @deprecated 使用 EASING_QUARTIC_OUT
     */
    TIMINGFUNCTION["EQO"] = "EQO";
    TIMINGFUNCTION["EASING_LINEAR_NONE"] = "EASING_LINEAR_NONE";
    TIMINGFUNCTION["EASING_QUARTIC_IN"] = "EASING_QUARTIC_IN";
    TIMINGFUNCTION["EASING_QUARTIC_OUT"] = "EASING_QUARTIC_OUT";
    TIMINGFUNCTION["EASING_QUARTIC_INOUT"] = "EASING_QUARTIC_INOUT";
    TIMINGFUNCTION["EASING_QUADRATIC_IN"] = "EASING_QUADRATIC_IN";
    TIMINGFUNCTION["EASING_QUADRATIC_OUT"] = "EASING_QUADRATIC_OUT";
    TIMINGFUNCTION["EASING_QUADRATIC_INOUT"] = "EASING_QUADRATIC_INOUT";
})(TIMINGFUNCTION || (TIMINGFUNCTION = {}));
export const timingFunction = {
    ELN: Easing.Linear.None,
    EQI: Easing.Quartic.In,
    EQO: Easing.Quartic.Out,
    EASING_LINEAR_NONE: Easing.Linear.None,
    EASING_QUARTIC_IN: Easing.Quartic.In,
    EASING_QUARTIC_OUT: Easing.Quartic.Out,
    EASING_QUARTIC_INOUT: Easing.Quartic.InOut,
    EASING_QUADRATIC_IN: Easing.Quadratic.In,
    EASING_QUADRATIC_OUT: Easing.Quadratic.Out,
    EASING_QUADRATIC_INOUT: Easing.Quadratic.InOut,
};
//# sourceMappingURL=common.js.map