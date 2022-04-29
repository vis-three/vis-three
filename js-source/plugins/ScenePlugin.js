import { PerspectiveCamera } from "three";
import { generateConfig } from "../convenient/generateConfig";
import { CONFIGTYPE } from "../middleware/constants/configType";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { VisScene } from "../optimize/VisScene";
export const ScenePlugin = function (params = {}) {
    if (this.scene) {
        console.warn("this has installed scene plugin.");
        return false;
    }
    if (!this.webGLRenderer) {
        console.error("must install some renderer before this plugin.");
        return false;
    }
    if (!params.symbol) {
        params.symbol = CONFIGTYPE.SCENE;
    }
    this.scene = new VisScene();
    if (!this.camera) {
        const defalutCamera = new PerspectiveCamera();
        defalutCamera.position.set(50, 50, 50);
        defalutCamera.lookAt(0, 0, 0);
        this.camera = defalutCamera;
        this.addEventListener("setSize", (event) => {
            const width = event.width;
            const height = event.height;
            defalutCamera.aspect = width / height;
            defalutCamera.updateProjectionMatrix();
        });
    }
    // support 联调
    this.completeSet.add(() => {
        if (this.dataSupportManager) {
            const sceneData = this.dataSupportManager.getDataSupport(MODULETYPE.SCENE).getData();
            if (!sceneData[params.symbol]) {
                sceneData[params.symbol] = generateConfig(CONFIGTYPE.SCENE);
            }
        }
    });
    return true;
};
//# sourceMappingURL=ScenePlugin.js.map