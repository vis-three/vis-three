import { AxesHelper } from "three";
export const AxesHelperPlugin = function (params = {}) {
    if (!this.scene) {
        console.error('must install some scene plugin before BasicViewpoint plugin.');
        return false;
    }
    const axesHelper = new AxesHelper(params.length || 500);
    axesHelper.matrixAutoUpdate = false;
    axesHelper.raycast = () => { };
    this.scene.add(axesHelper);
    this.setAxesHelper = function (params) {
        if (params.show) {
            this.scene.add(axesHelper);
        }
        else {
            this.scene.remove(axesHelper);
        }
        return this;
    };
    return true;
};
//# sourceMappingURL=AxesHelperPlugin.js.map