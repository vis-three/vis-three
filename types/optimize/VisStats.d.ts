export interface VisStatsParameter {
    mode: number;
    top: number;
    left: number;
    bottom: number;
    right: number;
}
export declare class VisStats {
    private stats;
    domElement: HTMLElement;
    constructor(parameter?: VisStatsParameter);
    render(): void;
}
