import Stats from 'three/examples/jsm/libs/stats.module';
export interface VisStatsParameters {
    mode: number;
    top: number;
    left: number;
    bottom: number;
    right: number;
}
export declare class VisStats implements Stats {
    REVISION: number;
    dom: HTMLDivElement;
    addPanel: (panel: Stats.Panel) => Stats.Panel;
    showPanel: (id: number) => void;
    begin: () => void;
    end: () => void;
    update: () => void;
    domElement: HTMLDivElement;
    setMode: (id: number) => void;
    constructor(parameters?: VisStatsParameters);
}
