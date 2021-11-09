import Stats from 'three/examples/jsm/libs/stats.module';
export class VisStats {
    stats;
    domElement;
    constructor(parameter) {
        this.stats = Stats();
        const dom = this.stats.domElement;
        dom.style.position = 'absolute';
        dom.style.top = '0';
        dom.style.left = '35px';
        if (parameter) {
            dom.style.top = `${parameter.top}px`;
            dom.style.left = `${parameter.left}px`;
            dom.style.right = `${parameter.right}px`;
            dom.style.bottom = `${parameter.bottom}px`;
        }
        this.domElement = dom;
    }
    render() {
        this.stats.update();
    }
}
//# sourceMappingURL=VisStats.js.map