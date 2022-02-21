import { PerspectiveCamera, Scene } from "three";
export const ScenePlugin = function (params) {
    if (this.scene) {
        console.warn('this has installed scene plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.error('must install some renderer before this plugin.');
        return false;
    }
    this.scene = new Scene();
    this.render = () => {
        this.webGLRenderer.render(this.scene, this.currentCamera);
        return this;
    };
    const defalutCamera = new PerspectiveCamera();
    defalutCamera.position.set(50, 50, 50);
    defalutCamera.lookAt(0, 0, 0);
    this.currentCamera = defalutCamera;
    return true;
};
//# sourceMappingURL=ScenePlugin.js.map