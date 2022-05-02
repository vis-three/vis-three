import { EventManager, } from "../manager/EventManager";
export const EventManagerPlugin = function (params) {
    if (this.eventManager) {
        console.warn("engine has installed eventManager plugin.");
        return false;
    }
    if (!this.pointerManager) {
        console.error("must install pointerManager before this plugin.");
        return false;
    }
    const eventManager = new EventManager(Object.assign({
        scene: this.scene,
        camera: this.camera,
    }, params));
    eventManager.use(this.pointerManager);
    this.eventManager = eventManager;
    this.addEventListener("setCamera", (event) => {
        this.eventManager.setCamera(event.camera);
    });
    this.addEventListener("setScene", (event) => {
        this.eventManager.setScene(event.scene);
    });
    return true;
};
//# sourceMappingURL=EventManagerPlugin.js.map