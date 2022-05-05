export declare enum TIMEINGFUNCTION {
    ELN = "ELN",
    EQI = "EQI"
}
export declare const timeingFunction: {
    [key in TIMEINGFUNCTION]: (amount: number) => number;
};
