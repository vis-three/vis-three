import { Material } from "three";
import { PointLightHelper } from "../../extends/helper/light/PointLightHelper";
import { CameraHelper } from "../../extends/helper/camera/CameraHelper";
export class SceneHelperCompiler {
    static typeHelperMap = {
        'PointLight': PointLightHelper,
        'PerspectiveCamera': CameraHelper,
        'OrthographicCamera': CameraHelper
    };
    static filterHelperMap = {
        'AmbientLight': true
    };
    map;
    scene;
    constructor(scene) {
        this.map = new Map();
        this.scene = scene;
    }
    add(object) {
        if (SceneHelperCompiler.filterHelperMap[object.type]) {
            return;
        }
        if (SceneHelperCompiler.typeHelperMap[object.type]) {
            const helper = new SceneHelperCompiler.typeHelperMap[object.type](object);
            this.map.set(object, helper);
            this.scene._add(helper);
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
        }
        else {
            console.warn(`Scene helper compiler can not found this object\`s helper: ${object}`);
        }
    }
    setVisiable(visiable) {
        const scene = this.scene;
        if (visiable) {
            this.map.forEach((origin, helper) => {
                scene._add(helper);
            });
        }
        else {
            this.map.forEach((origin, helper) => {
                scene._remove(helper);
            });
        }
    }
}
//# sourceMappingURL=SceneHelperCompiler.js.map