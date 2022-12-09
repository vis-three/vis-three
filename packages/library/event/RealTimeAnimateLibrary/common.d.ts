export declare enum TIMINGFUNCTION {
    /**
     * @deprecated 使用 EASING_LINEAR_NONE
     */
    ELN = "ELN",
    /**
     * @deprecated 使用 EASING_QUARTIC_IN
     */
    EQI = "EQI",
    /**
     * @deprecated 使用 EASING_QUARTIC_OUT
     */
    EQO = "EQO",
    EASING_LINEAR_NONE = "EASING_LINEAR_NONE",
    EASING_QUARTIC_IN = "EASING_QUARTIC_IN",
    EASING_QUARTIC_OUT = "EASING_QUARTIC_OUT",
    EASING_QUARTIC_INOUT = "EASING_QUARTIC_INOUT",
    EASING_QUADRATIC_IN = "EASING_QUADRATIC_IN",
    EASING_QUADRATIC_OUT = "EASING_QUADRATIC_OUT",
    EASING_QUADRATIC_INOUT = "EASING_QUADRATIC_INOUT"
}
export declare const timingFunction: {
    [key in TIMINGFUNCTION]: (amount: number) => number;
};
