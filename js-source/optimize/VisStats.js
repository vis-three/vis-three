import Stats from 'three/examples/jsm/libs/stats.module';
export class VisStats {
    stats;
    domElement;
    render;
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
        this.render = () => {
            this.stats.update();
        };
        this.domElement = dom;
    }
}
//# sourceMappingURL=VisStats.js.map