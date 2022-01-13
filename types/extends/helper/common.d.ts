import { LineBasicMaterial, Object3D } from "three";
export declare const getHelperLineMaterial: () => LineBasicMaterial;
export interface VisHelper {
    target: Object3D;
    type: string;
}
