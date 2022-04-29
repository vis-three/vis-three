export const SelectionPlugin = function (params = {}) {
    if (this.selectionBox) {
        console.warn("engine has installed selection plugin.");
        return false;
    }
    if (!this.eventManager) {
        console.warn("must install eventManager plugin before Selection plugin.");
        return false;
    }
    this.selectionBox = new Set();
    const dispatchEvent = () => {
        const objectSymbols = [];
        if (this.IS_ENGINESUPPORT) {
            this.selectionBox.forEach((object) => {
                const objectSymbol = this.compilerManager.getObjectSymbol(object);
                if (objectSymbol) {
                    objectSymbols.push(objectSymbol);
                }
                else {
                    console.warn("selection plugin can not font vid in compilerManager.", object);
                }
            });
        }
        this.dispatchEvent({
            type: "selected",
            objects: [...this.selectionBox],
            objectSymbols,
        });
    };
    this.setSelectionBox = function (params) {
        this.selectionBox.clear();
        for (const object of params.objects) {
            this.selectionBox.add(object);
        }
        dispatchEvent();
        return this;
    };
    // 单选
    this.eventManager.addEventListener("click", (event) => {
        // 兼容transformControls事件
        if (this.transformControls?.dragging) {
            return;
        }
        const intersections = event.intersections;
        // ctrl多选
        if (!event.ctrlKey) {
            this.selectionBox.clear();
        }
        if (this.eventManager.penetrate) {
            for (const intersection of intersections) {
                // 反选
                if (event.ctrlKey) {
                    if (this.selectionBox?.has(intersection.object)) {
                        this.selectionBox.delete(intersection.object);
                        continue;
                    }
                }
                this.selectionBox.add(intersection.object);
            }
        }
        else {
            if (intersections.length) {
                const object = intersections[0].object;
                // 反选
                if (event.ctrlKey) {
                    if (this.selectionBox?.has(object)) {
                        this.selectionBox.delete(object);
                        return;
                    }
                }
                this.selectionBox?.add(object);
            }
        }
        dispatchEvent();
    });
    // TODO: 框选 selectionBox selectionHelper
    return true;
};
//# sourceMappingURL=SelectionPlugin.js.map