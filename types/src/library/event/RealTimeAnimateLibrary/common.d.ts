export declare enum TIMINGFUNCTION {
    ELN = "ELN",
    EQI = "EQI"
}
export declare const timingFunction: {
    [key in TIMINGFUNCTION]: (amount: number) => number;
};
