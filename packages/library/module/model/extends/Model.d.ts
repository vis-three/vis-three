import { Box3, Object3D } from "three";
export interface Model extends Object3D {
    cacheBox: Box3;
}
export declare function createModel(object: Object3D, raw: boolean): Model;
