import Stats from "three/examples/jsm/libs/stats.module.js";
export interface VisStatsParameters {
    /**监视器模式 */
    mode: number;
    /**顶部距离 */
    top: number;
    /**左边距离 */
    left: number;
    /**底部距离 */
    bottom: number;
    /**右边距离 */
    right: number;
}
export declare class VisStats implements Stats {
    REVISION: number;
    dom: HTMLDivElement;
    addPanel: (panel: Stats.Panel) => Stats.Panel;
    showPanel: (id: number) => void;
    begin: () => void;
    end: () => number;
    update: () => void;
    domElement: HTMLDivElement;
    /**
     * @deprecated
     */
    setMode: (id: number) => void;
    constructor(parameters?: VisStatsParameters);
}
