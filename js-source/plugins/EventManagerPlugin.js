import { EventManager } from "../manager/EventManager";
export const EventManagerPlugin = function (params) {
    if (this.eventManager) {
        console.warn('engine has installed eventManager plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.error('must install some renderer before this plugin.');
        return false;
    }
    if (!this.pointerManager) {
        console.error('must install pointerManager before this plugin.');
        return false;
    }
    const eventManager = new EventManager(Object.assign({
        scene: this.scene,
        camera: this.currentCamera
    }, params));
    eventManager.use(this.pointerManager);
    this.eventManager = eventManager;
    this.addEventListener('setCamera', event => {
        this.eventManager.setCamera(event.camera);
    });
    return true;
};
//# sourceMappingURL=EventManagerPlugin.js.map