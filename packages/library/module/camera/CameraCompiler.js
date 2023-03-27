import { ObjectCompiler } from "@vis-three/module-object";
export class CameraCompiler extends ObjectCompiler {
    cacheCameraMap = new WeakMap();
    constructor() {
        super();
    }
}
