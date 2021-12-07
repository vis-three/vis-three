import { Object3D } from "three";
import { ModelingScene } from "./ModelingScene";
export declare class SceneHelperCompiler {
    private static typeHelperMap;
    private static filterHelperMap;
    private map;
    private scene;
    constructor(scene: ModelingScene);
    add(object: Object3D): void;
    remove(object: Object3D): void;
    setVisiable(visiable: boolean): void;
}
