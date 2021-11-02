import { VisRenderFun } from '../visCore/VisEngine';
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
    renderFun: VisRenderFun;
    constructor(parameter?: VisStatsParameter);
    update(): void;
}
//# sourceMappingURL=VisStats.d.ts.map