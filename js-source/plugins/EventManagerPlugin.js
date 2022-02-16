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
        const generateGlobalSupportEvent = (event, type) => {
            const newEvent = Object.assign({}, event);
            newEvent.type = type;
            newEvent.vidList = [];
            if (newEvent.intersections && newEvent.intersections.length) {
                newEvent.vidList = newEvent.intersections.map(intersection => {
                    const vid = this.compilerManager.getObjectVid(intersection.object);
                    if (!vid) {
                        console.warn(`can not found this object symbol vid in compiler manager: ${intersection.object}`);
                    }
                    return vid;
                });
            }
            return newEvent;
        };
        // 增加event support事件
        this.eventManager.addEventListener('pointermove', (event) => {
            this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, 'pointermove-support'));
        });
        this.eventManager.addEventListener('pointerdown', (event) => {
            this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, 'pointerdown-support'));
        });
        this.eventManager.addEventListener('pointerup', (event) => {
            this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, 'pointerup-support'));
        });
        this.eventManager.addEventListener('click', (event) => {
            this.eventManager.dispatchEvent(generateGlobalSupportEvent(event, 'click-support'));
        });
        return true;
    }
    else {
        return false;
    }
};
//# sourceMappingURL=EventManagerPlugin.js.map