export class SectionAction {
    oldObjects;
    newObjects;
    engine;
    impact;
    constructor(parameters) {
        this.oldObjects = parameters.oldObjects;
        this.newObjects = parameters.newObjects;
        this.engine = parameters.engine;
        this.impact = true;
        if (!this.engine.selectionBox) {
            console.warn(`section action can not make any impact.`);
            this.impact = false;
        }
    }
    next() {
        if (!this.impact) {
            return;
        }
        this.engine.setSelectionBox({
            objects: this.newObjects
        });
    }
    prev() {
        if (!this.impact) {
            return;
        }
        this.engine.setSelectionBox({
            objects: this.oldObjects
        });
    }
}
//# sourceMappingURL=SectionAction.js.map