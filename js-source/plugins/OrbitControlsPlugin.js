import { ModelingScene } from './../extends/ModelingScene/ModelingScene';
import { SCENEVIEWPOINT } from "../extends/ModelingScene/ModelingScene";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { MODULETYPE } from '../middleware/constants/MODULETYPE';
import { CONFIGTYPE } from '../middleware/constants/configType';
import { generateConfig } from '../convenient/generateConfig';
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
    if (this.scene instanceof ModelingScene) {
        const scene = this.scene;
        scene.addEventListener(`${SCENEVIEWPOINT.DEFAULT}ViewPoint`, e => {
            this.orbitControls.enableRotate = true;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.TOP}ViewPoint`, e => {
            this.orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.BOTTOM}ViewPoint`, e => {
            this.orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.RIGHT}ViewPoint`, e => {
            this.orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.LEFT}ViewPoint`, e => {
            this.orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.FRONT}ViewPoint`, e => {
            this.orbitControls.enableRotate = false;
        });
        scene.addEventListener(`${SCENEVIEWPOINT.BACK}ViewPoint`, e => {
            this.orbitControls.enableRotate = false;
        });
    }
    return true;
};
export const OrbitControlsSupportPlugin = function (params) {
    if (OrbitControlsPlugin.call(this, params)) {
        const dataSupport = this.dataSupportManager.getDataSupport(MODULETYPE.CONTROLS).getData();
        dataSupport[CONFIGTYPE.ORBITCONTROLS] = generateConfig(CONFIGTYPE.ORBITCONTROLS);
        return true;
    }
    else {
        return false;
    }
};
//# sourceMappingURL=OrbitControlsPlugin.js.map