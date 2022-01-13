import { Color, EventDispatcher, Material } from "three";
import { PointLightHelper } from "../../extends/helper/light/PointLightHelper";
import { CameraHelper } from "../../extends/helper/camera/CameraHelper";
import { MeshHelper } from "../../extends/helper/object/MeshHelper";
import { ACTIVECOLOR, HELPERCOLOR, HOVERCOLOR } from "../../case/constants/COLOR";
export var HELPERCOMPILEREVENTTYPE;
(function (HELPERCOMPILEREVENTTYPE) {
    HELPERCOMPILEREVENTTYPE["ADD"] = "add";
    HELPERCOMPILEREVENTTYPE["REMOVE"] = "remove";
})(HELPERCOMPILEREVENTTYPE || (HELPERCOMPILEREVENTTYPE = {}));
export class SceneHelperCompiler extends EventDispatcher {
    static helperColorHex = new Color(HELPERCOLOR).getHex();
    static activeColorHex = new Color(ACTIVECOLOR).getHex();
    static hoverColorHex = new Color(HOVERCOLOR).getHex();
    static typeHelperMap = {
        'PointLight': PointLightHelper,
        'PerspectiveCamera': CameraHelper,
        'OrthographicCamera': CameraHelper,
        'Mesh': MeshHelper
    };
    static filterHelperMap = {
        'AmbientLight': true,
        'Object3D': true
    };
    map;
    scene;
    constructor(scene) {
        super();
        this.map = new Map();
        this.scene = scene;
    }
    getMap() {
        return this.map;
    }
    add(object) {
        if (SceneHelperCompiler.filterHelperMap[object.type]) {
            return;
        }
        if (SceneHelperCompiler.typeHelperMap[object.type]) {
            const helper = new SceneHelperCompiler.typeHelperMap[object.type](object);
            this.map.set(object, helper);
            this.scene._add(helper);
            this.dispatchEvent({
                type: HELPERCOMPILEREVENTTYPE.ADD,
                helper,
                object
            });
        }
        else {
            console.warn(`Scene helper compiler can not support this type object: '${object.type}'`);
        }
    }
    remove(object) {
        if (SceneHelperCompiler.filterHelperMap[object.type]) {
            return;
        }
        if (this.map.has(object)) {
            const helper = this.map.get(object);
            this.scene._remove(helper);
            helper.geometry.dispose();
            if (helper.material) {
                if (helper.material instanceof Material) {
                    helper.material.dispose();
                }
                else {
                    helper.material.forEach(material => {
                        material.dispose();
                    });
                }
            }
            this.map.delete(object);
            this.dispatchEvent({
                type: HELPERCOMPILEREVENTTYPE.REMOVE,
                helper,
                object
            });
        }
        else {
            console.warn(`Scene helper compiler can not found this object\`s helper: ${object}`);
        }
    }
    setVisiable(visiable) {
        const scene = this.scene;
        if (visiable) {
            this.map.forEach((helper, origin) => {
                scene._add(helper);
            });
        }
        else {
            this.map.forEach((helper, origin) => {
                scene._remove(helper);
            });
        }
    }
    // 重置辅助的颜色
    resetHelperColor(...object) {
        const map = this.map;
        const helperColorHex = SceneHelperCompiler.helperColorHex;
        object.forEach(elem => {
            if (map.has(elem)) {
                const helper = map.get(elem);
                helper.material.color.setHex(helperColorHex);
            }
        });
    }
    // 设置hover辅助色
    setHelperHoverColor(...object) {
        const map = this.map;
        const hoverColorHex = SceneHelperCompiler.hoverColorHex;
        object.forEach(elem => {
            if (map.has(elem)) {
                const helper = map.get(elem);
                helper.material.color.setHex(hoverColorHex);
            }
        });
    }
    // 设置激活辅助色
    setHelperActiveColor(...object) {
        const map = this.map;
        const activeColorHex = SceneHelperCompiler.activeColorHex;
        object.forEach(elem => {
            if (map.has(elem)) {
                const helper = map.get(elem);
                helper.material.color.setHex(activeColorHex);
            }
        });
    }
}
//# sourceMappingURL=SceneHelperCompiler.js.map