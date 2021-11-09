import { Raycaster } from 'three';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { SelectionHelper } from './SelectionHelper';
export class SceneStatusManager extends SelectionBox {
    selectionHelper;
    raycaster;
    hoverObjectSet;
    activeObjectSet;
    constructor(dom, camera, scene, deep) {
        super(camera, scene, deep);
        this.hoverObjectSet = new Set();
        this.activeObjectSet = new Set();
        this.raycaster = new Raycaster();
        this.selectionHelper = new SelectionHelper(dom);
    }
    setCamera(camera) {
        this.camera = camera;
        return this;
    }
    /// 单选
    checkHoverObject(event) {
        this.hoverObjectSet.clear();
        const mouse = event.mouse;
        this.raycaster.setFromCamera(mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects[0]) {
            this.hoverObjectSet.add(intersects[0].object);
        }
        return this;
    }
    checkActiveObject(event) {
        this.activeObjectSet.clear();
        const mouse = event.mouse;
        this.raycaster.setFromCamera(mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects[0]) {
            this.activeObjectSet.add(intersects[0].object);
        }
        return this;
    }
    /// 框选
    // 选择开始
    selectStart(event) {
        const mouse = event.mouse;
        this.selectionHelper.onSelectStart(event);
        this.collection = [];
        this.startPoint.set(mouse.x, mouse.y, 0.5);
        return this;
    }
    // 选择中
    selecting(event) {
        this.selectionHelper.onSelectMove(event);
        return this;
    }
    // 选择结束
    selectEnd(event) {
        const mouse = event.mouse;
        this.selectionHelper.onSelectOver(event);
        this.endPoint.set(mouse.x, mouse.y, 0.5);
        this.select();
        this.collection.forEach(object => {
            this.activeObjectSet.add(object);
        });
        return this;
    }
    getActiveObjectSet() {
        return this.activeObjectSet;
    }
    getHoverObjectSet() {
        return this.hoverObjectSet;
    }
}
//# sourceMappingURL=SceneStatusManager.js.map