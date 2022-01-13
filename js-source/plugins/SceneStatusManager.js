import { EventDispatcher, Raycaster } from 'three';
import { SelectionBox } from 'three/examples/jsm/interactive/SelectionBox.js';
import { SCENESTATUSMANAGER } from '../case/constants/EVENTTYPE';
import { SelectionHelper } from './SelectionHelper';
export class SceneStatusManager extends EventDispatcher {
    scene;
    camera;
    selectionBox;
    selectionHelper;
    raycaster;
    hoverObjectSet;
    activeObjectSet;
    isSelecting; // 用来区分是单选还是框选，避免重复触发
    transformControls;
    transformControlsFilterMap;
    constructor(camera, scene, deep = Number.MAX_VALUE) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.isSelecting = false;
        this.hoverObjectSet = new Set();
        this.activeObjectSet = new Set();
        this.raycaster = new Raycaster();
        this.selectionHelper = new SelectionHelper();
        this.selectionBox = new SelectionBox(camera, scene, deep);
    }
    // 检测选中的物体
    getRaycastbject(intersects) {
        if (!intersects.length) {
            return null;
        }
        if (!this.transformControlsFilterMap) {
            return intersects[0].object;
        }
        const transformControlsFilterMap = this.transformControlsFilterMap;
        let index = -1;
        intersects.some((elem, i, arr) => {
            if (!transformControlsFilterMap[elem.object.uuid]) {
                index = i;
                return true;
            }
            else {
                return false;
            }
        });
        if (index === -1) {
            return null;
        }
        return intersects[index].object;
    }
    // 激活active事件
    triggerActiveEvent() {
        const scene = this.scene;
        const activeObjectSet = this.activeObjectSet;
        activeObjectSet.forEach(object => {
            object.dispatchEvent({
                type: 'active'
            });
        });
        this.dispatchEvent({
            type: SCENESTATUSMANAGER.ACTIVECHANGE,
            objectSet: this.activeObjectSet
        });
        if (this.transformControls) {
            const transformControls = this.transformControls;
            if (activeObjectSet.size) {
                transformControls.setAttach(...activeObjectSet);
                scene.add(transformControls.getTarget());
                scene.add(transformControls);
            }
            else {
                scene.remove(transformControls.getTarget());
                scene.remove(transformControls);
            }
        }
    }
    // 激活hover事件
    triggerHoverEvent() {
        const hoverObjectSet = this.hoverObjectSet;
        hoverObjectSet.forEach(object => {
            object.dispatchEvent({
                type: 'hover'
            });
        });
        this.dispatchEvent({
            type: SCENESTATUSMANAGER.HOVERCHANGE,
            objectSet: hoverObjectSet
        });
    }
    setCamera(camera) {
        this.selectionBox.camera = camera;
        this.camera = camera;
        return this;
    }
    // 过滤掉transformControls的选择
    filterTransformControls(controls) {
        this.transformControlsFilterMap = {};
        this.transformControls = controls;
        controls.traverse((object) => {
            this.transformControlsFilterMap[object.uuid] = true;
        });
        return this;
    }
    /// 单选
    checkHoverObject(event) {
        this.hoverObjectSet.clear();
        const mouse = event.mouse;
        this.raycaster.setFromCamera(mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        const reycastObject = this.getRaycastbject(intersects);
        if (reycastObject) {
            this.hoverObjectSet.add(reycastObject);
        }
        this.triggerHoverEvent();
        return this;
    }
    checkActiveObject(event) {
        if (this.isSelecting) {
            return this;
        }
        const activeObjectSet = this.activeObjectSet;
        const mouse = event.mouse;
        this.raycaster.setFromCamera(mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        const reycastObject = this.getRaycastbject(intersects);
        activeObjectSet.clear();
        if (reycastObject) {
            activeObjectSet.add(reycastObject);
        }
        this.triggerActiveEvent();
        return this;
    }
    /// 框选
    // 选择开始
    selectStart(event) {
        const mouse = event.mouse;
        this.selectionHelper.onSelectStart(event);
        this.selectionBox.collection = [];
        this.selectionBox.startPoint.set(mouse.x, mouse.y, 0.5);
        return this;
    }
    // 选择中
    selecting(event) {
        this.selectionHelper.onSelectMove(event);
        this.isSelecting = true;
        return this;
    }
    // 选择结束
    selectEnd(event) {
        this.selectionHelper.onSelectOver(event);
        if (!this.isSelecting) {
            return this;
        }
        this.isSelecting = false;
        const activeObjectSet = this.activeObjectSet;
        const mouse = event.mouse;
        this.selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
        this.selectionBox.select();
        activeObjectSet.clear();
        let collection = this.selectionBox.collection;
        // 过滤辅助
        collection = collection.filter(object => !object.type.includes('Helper'));
        // 过滤transformControls
        if (this.transformControlsFilterMap) {
            const filterMap = this.transformControlsFilterMap;
            collection = collection.filter(object => !filterMap[object.uuid]);
        }
        collection.forEach(object => {
            activeObjectSet.add(object);
        });
        this.triggerActiveEvent();
        return this;
    }
    getActiveObjectSet() {
        return this.activeObjectSet;
    }
    getHoverObjectSet() {
        return this.hoverObjectSet;
    }
    setHoverObjectSet(...object) {
        const hoverObjectSet = this.hoverObjectSet;
        hoverObjectSet.clear();
        object.forEach(object => {
            hoverObjectSet.add(object);
        });
        this.triggerHoverEvent();
        return this;
    }
    setActiveObjectSet(...object) {
        const activeObjectSet = this.activeObjectSet;
        activeObjectSet.clear();
        object.forEach(object => {
            activeObjectSet.add(object);
        });
        this.triggerActiveEvent();
        return this;
    }
}
//# sourceMappingURL=SceneStatusManager.js.map