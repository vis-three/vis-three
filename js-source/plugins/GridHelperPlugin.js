import { GridHelper } from "three";
import { VIEWPOINT } from "./ViewpointPlugin";
export const GridHelperPlugin = function (params = {}) {
    if (!this.scene) {
        console.error('must install some scene before BasicViewpoint plugin.');
        return false;
    }
    const gridHelper = new GridHelper(params.range || 500, params.spacing || 50, params.axesColor || 'rgb(130, 130, 130)', params.cellColor || 'rgb(70, 70, 70)');
    if (params.opacity !== 1) {
        const material = gridHelper.material;
        material.transparent = true;
        material.opacity = params.opacity || 0.5;
        material.needsUpdate = true;
    }
    gridHelper.matrixAutoUpdate = false;
    gridHelper.raycast = () => { };
    this.scene.add(gridHelper);
    this.setGridHelper = function (params) {
        if (params.show) {
            this.scene.add(gridHelper);
        }
        else {
            this.scene.remove(gridHelper);
        }
        return this;
    };
    this.completeSet.add(() => {
        if (this.setViewpoint) {
            this.addEventListener('setViewpoint', event => {
                const viewpoint = event.viewpoint;
                if (viewpoint === VIEWPOINT.DEFAULT) {
                    gridHelper.rotation.set(0, 0, 0);
                }
                else if (viewpoint === VIEWPOINT.TOP) {
                    gridHelper.rotation.set(0, 0, 0);
                }
                else if (viewpoint === VIEWPOINT.BOTTOM) {
                    gridHelper.rotation.set(0, 0, 0);
                }
                else if (viewpoint === VIEWPOINT.RIGHT) {
                    gridHelper.rotation.set(0, 0, Math.PI / 2);
                }
                else if (viewpoint === VIEWPOINT.LEFT) {
                    gridHelper.rotation.set(0, 0, Math.PI / 2);
                }
                else if (viewpoint === VIEWPOINT.FRONT) {
                    gridHelper.rotation.set(Math.PI / 2, 0, 0);
                }
                else if (viewpoint === VIEWPOINT.BACK) {
                    gridHelper.rotation.set(Math.PI / 2, 0, 0);
                }
                gridHelper.updateMatrix();
                gridHelper.updateMatrixWorld();
            });
        }
    });
    return true;
};
//# sourceMappingURL=GridHelperPlugin.js.map