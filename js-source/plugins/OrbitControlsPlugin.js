import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { VIEWPOINT } from './ViewpointPlugin';
export const OrbitControlsPlugin = function (params) {
    if (this.orbitControls) {
        console.warn('this has installed orbitControls plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.warn('this must install renderer before install orbitControls plugin.');
        return false;
    }
    if (!this.renderManager) {
        console.warn('this must install renderManager before install orbitControls plugin.');
        return false;
    }
    this.orbitControls = new VisOrbitControls(this.currentCamera, this.dom);
    this.addEventListener('setCamera', (event) => {
        this.orbitControls.setCamera(event.camera);
    });
    this.renderManager.addEventListener('render', () => {
        this.orbitControls.update();
    });
    this.completeSet.add(() => {
        if (this.setViewpoint) {
            this.addEventListener('setViewpoint', event => {
                const viewpoint = event.viewpoint;
                this.orbitControls.target.set(0, 0, 0);
                if (viewpoint === VIEWPOINT.DEFAULT) {
                    this.orbitControls.enableRotate = true;
                }
                else if (viewpoint === VIEWPOINT.TOP) {
                    this.orbitControls.enableRotate = false;
                }
                else if (viewpoint === VIEWPOINT.BOTTOM) {
                    this.orbitControls.enableRotate = false;
                }
                else if (viewpoint === VIEWPOINT.RIGHT) {
                    this.orbitControls.enableRotate = false;
                }
                else if (viewpoint === VIEWPOINT.LEFT) {
                    this.orbitControls.enableRotate = false;
                }
                else if (viewpoint === VIEWPOINT.FRONT) {
                    this.orbitControls.enableRotate = false;
                }
                else if (viewpoint === VIEWPOINT.BACK) {
                    this.orbitControls.enableRotate = false;
                }
            });
        }
    });
    return true;
};
//# sourceMappingURL=OrbitControlsPlugin.js.map