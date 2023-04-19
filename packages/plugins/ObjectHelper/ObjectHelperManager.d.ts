import { EventDispatcher } from "@vis-three/core";
import { Object3D } from "three";
export interface ObjectHelperManagerParameters {
    helperGenerator?: {
        [key: string]: typeof Object3D;
    };
    typeFilter?: {
        [key: string]: boolean;
    };
    objectFilter?: Object3D[];
}
export declare class ObjectHelperManager extends EventDispatcher {
    private helperGenerator;
    private typeFilter;
    private objectFilter;
    objectHelperMap: Map<Object3D<import("three").Event>, Record<string, Object3D<import("three").Event>>>;
    constructor(params?: ObjectHelperManagerParameters);
    /**
     * 添加过滤的物体
     * @param {Object3D} objects three object
     * @return {this} this
     */
    addFilteredObject(...objects: Object3D[]): this;
    /**
     * 添加过滤的类型
     * @param types
     * @returns this
     */
    addFilteredType(...types: string[]): this;
    /**
     * 添加物体辅助
     * @param {Object3D} obejct three object
     * @param helperType 辅助类型
     * @return {Object3D | null} three object or null
     */
    addObjectHelper(object: Object3D, helperType?: string): Object3D | null;
    /**
     * 销毁物体，不传type销毁所有的物体辅助
     * @param object
     * @param helperType
     * @returns
     */
    disposeObjectHelper(object: Object3D, helperType?: string): void;
    dispose(): void;
}
