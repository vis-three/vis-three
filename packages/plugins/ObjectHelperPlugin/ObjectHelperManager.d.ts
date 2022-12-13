import { EventDispatcher } from "@vis-three/core";
import { Object3D } from "three";
export interface ObjectHelperManagerParameters {
    helperGenerator?: {
        [key: string]: typeof Object3D;
    };
    helperFilter?: {
        [key: string]: boolean;
    };
    objectFilter?: Object3D[];
}
export declare class ObjectHelperManager extends EventDispatcher {
    private helperGenerator;
    private helperFilter;
    private objectFilter;
    objectHelperMap: Map<Object3D<import("three").Event>, Object3D<import("three").Event>>;
    constructor(params?: ObjectHelperManagerParameters);
    /**
     * @description: 添加过滤的物体
     * @param {Object3D} objects three object
     * @return {this} this
     */
    addFilteredObject(...objects: Object3D[]): this;
    /**
     * @description:添加物体辅助
     * @param {Object3D} obejct three object
     * @return {Object3D | null} three object or null
     */
    addObjectHelper(object: Object3D): Object3D | null;
    /**
     * @description: 销毁物体辅助
     * @param {Object3D} object three object
     * @return {*} three object or null
     */
    disposeObjectHelper(object: Object3D): Object3D | null;
    dispose(): void;
}
