import Stats from 'three/examples/jsm/libs/stats.module';
export class VisStats {
    REVISION;
    dom;
    addPanel;
    showPanel;
    begin;
    end;
    update;
    domElement;
    setMode;
    constructor(parameters) {
        const stats = Stats();
        this.REVISION = stats.REVISION;
        this.dom = stats.dom;
        this.domElement = stats.domElement;
        this.begin = stats.begin.bind(stats);
        this.end = stats.end.bind(stats);
        this.update = stats.update.bind(stats);
        this.addPanel = stats.addPanel.bind(stats);
        this.showPanel = stats.showPanel.bind(stats);
        this.setMode = stats.setMode.bind(stats);
        const dom = this.domElement;
        dom.style.position = 'absolute';
        dom.style.top = '0';
        dom.style.left = '35px';
        if (parameters) {
            dom.style.top = `${parameters.top}px`;
            dom.style.left = `${parameters.left}px`;
            dom.style.right = `${parameters.right}px`;
            dom.style.bottom = `${parameters.bottom}px`;
        }
    }
}
//# sourceMappingURL=VisStats.js.map