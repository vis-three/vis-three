import { LineBasicMaterial, Object3D } from "three";
export interface VisHelper {
    target: Object3D;
    type: string;
    dispose: () => void;
}
export declare const getHelperLineMaterial: () => LineBasicMaterial;
