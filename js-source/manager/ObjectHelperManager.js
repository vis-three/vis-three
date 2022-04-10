import { Material } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { CameraHelper } from "../extends/helper/camera/CameraHelper";
import { DirectionalLightHelper } from "../extends/helper/light/DirectionalLightHelper";
import { PointLightHelper } from "../extends/helper/light/PointLightHelper";
import { SpotLightHelper } from "../extends/helper/light/SpotLightHelper";
import { GroupHelper } from "../extends/helper/object/GroupHelper";
import { MeshHelper } from "../extends/helper/object/MeshHelper";
import { CONFIGTYPE } from "../middleware/constants/configType";
export class ObjectHelperManager extends EventDispatcher {
    helperGenerator = {
        [CONFIGTYPE.POINTLIGHT]: PointLightHelper,
        [CONFIGTYPE.SPOTLIGHT]: SpotLightHelper,
        [CONFIGTYPE.DIRECTIONALLIGHT]: DirectionalLightHelper,
        [CONFIGTYPE.PERSPECTIVECAMERA]: CameraHelper,
        [CONFIGTYPE.ORTHOGRAPHICCAMERA]: CameraHelper,
        [CONFIGTYPE.MESH]: MeshHelper,
        [CONFIGTYPE.GROUP]: GroupHelper,
    };
    helperFilter = {
        AmbientLight: true,
        Object3D: true,
        TransformControls: true,
    };
    objectFilter = new Set();
    helperMap = new Map();
    constructor(params = {}) {
        super();
        params.helperGenerator &&
            (this.helperGenerator = Object.assign(this.helperGenerator, params.helperGenerator));
        params.helperFilter &&
            (this.helperFilter = Object.assign(this.helperFilter, params.helperFilter));
        params.objectFilter &&
            (this.objectFilter = new Set(params.objectFilter.concat(Array.from(this.objectFilter))));
    }
    /**
     * @description: 添加过滤的物体
     * @param {Object3D} objects three object
     * @return {this} this
     */
    addFilteredObject(...objects) {
        for (const object of objects) {
            this.objectFilter.add(object);
        }
        return this;
    }
    /**
     * @description:添加物体辅助
     * @param {Object3D} obejct three object
     * @return {Object3D | null} three object or null
     */
    addObjectHelper(object) {
        if (this.objectFilter.has(object) ||
            this.helperMap.has(object) ||
            this.helperFilter[object.type] ||
            object.type.toLocaleLowerCase().includes("helper")) {
            return null;
        }
        if (!this.helperGenerator[object.type]) {
            console.warn(`object helper can not support this type object: '${object.type}'`);
            return null;
        }
        const helper = new this.helperGenerator[object.type](object);
        this.helperMap.set(object, helper);
        return helper;
    }
    /**
     * @description: 销毁物体辅助
     * @param {Object3D} object three object
     * @return {*} three object or null
     */
    disposeObjectHelper(object) {
        if (this.objectFilter.has(object) ||
            this.helperFilter[object.type] ||
            object.type.toLocaleLowerCase().includes("helper")) {
            return null;
        }
        if (!this.helperMap.has(object)) {
            console.warn(`object helper manager can not found this object\`s helper: `, object);
            return null;
        }
        const helper = this.helperMap.get(object);
        helper.geometry && helper.geometry.dispose();
        if (helper.material) {
            if (helper.material instanceof Material) {
                helper.material.dispose();
            }
            else {
                helper.material.forEach((material) => {
                    material.dispose();
                });
            }
        }
        this.helperMap.delete(object);
        return helper;
    }
}
//# sourceMappingURL=ObjectHelperManager.js.map