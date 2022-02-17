import { ModelingScene } from './../extends/ModelingScene/ModelingScene';
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
    if (this.scene instanceof ModelingScene) {
        this.eventManager.addEventListener('pointermove', (event) => {
            this.scene.setObjectHelperHover(...event.intersections.map(elem => elem.object));
        });
        // click发生在pointerup之后
        this.eventManager.addEventListener('click', (event) => {
            if (this.transing) {
                this.transing = false;
                return;
            }
            if (event.button === 0) {
                this.scene.setObjectHelperActive(...event.intersections.map(elem => elem.object));
            }
        });
    }
    return true;
};
export const EventManagerSupportPlugin = function (params) {
    if (EventManagerPlugin.call(this, params)) {
        return true;
    }
    else {
        return false;
    }
};
//# sourceMappingURL=EventManagerPlugin.js.map