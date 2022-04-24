import { OrthographicCamera, PerspectiveCamera } from "three";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
export class CameraCompiler extends ObjectCompiler {
    COMPILER_NAME = MODULETYPE.CAMERA;
    constructMap;
    cacheCameraMap;
    constructor() {
        super();
        const constructMap = new Map();
        constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
        constructMap.set("OrthographicCamera", () => new OrthographicCamera(-50, 50, 50, -50));
        this.constructMap = constructMap;
        this.mergeFilterAttribute({
            scale: true,
            adaptiveWindow: true,
        });
        this.cacheCameraMap = new WeakMap();
    }
    // 自适应窗口大小
    setAdaptiveWindow(vid, value) {
        if (!this.map.has(vid)) {
            console.warn(`camera compiler can not found this vid camera: '${vid}'`);
            return this;
        }
        const camera = this.map.get(vid);
        let cacheData = this.cacheCameraMap.get(camera);
        if (!cacheData) {
            cacheData = {};
            this.cacheCameraMap.set(camera, cacheData);
        }
        if (!value) {
            if (cacheData.setSizeFun &&
                this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
                this.engine.removeEventListener("setSize", cacheData.setSizeFun);
                cacheData.setSizeFun = undefined;
                return this;
            }
            if (cacheData.setSizeFun &&
                !this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
                cacheData.setSizeFun = undefined;
                return this;
            }
        }
        if (value) {
            if (cacheData.setSizeFun &&
                this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
                return this;
            }
            if (cacheData.setSizeFun &&
                !this.engine.hasEventListener("setSize", cacheData.setSizeFun)) {
                this.engine.addEventListener("setSize", cacheData.setSizeFun);
                return this;
            }
            let setSizeFun = (event) => { };
            if (camera instanceof PerspectiveCamera) {
                setSizeFun = (event) => {
                    camera.aspect = event.width / event.height;
                    camera.updateProjectionMatrix();
                };
            }
            else if (camera instanceof OrthographicCamera) {
                setSizeFun = (event) => {
                    const width = event.width;
                    const height = event.height;
                    camera.left = -width / 2;
                    camera.right = width / 2;
                    camera.top = height / 2;
                    camera.bottom = -height / 2;
                    camera.updateProjectionMatrix();
                };
            }
            else {
                console.warn(`camera compiler can not support this class camera:`, camera);
            }
            this.engine.addEventListener("setSize", setSizeFun);
            cacheData.setSizeFun = setSizeFun;
            // 执行一次
            const domElement = this.engine.webGLRenderer.domElement;
            setSizeFun({
                type: "setSize",
                width: domElement.offsetWidth,
                height: domElement.offsetHeight,
            });
        }
        return this;
    }
    add(vid, config) {
        if (config.type && this.constructMap.has(config.type)) {
            const camera = this.constructMap.get(config.type)();
            this.map.set(vid, camera);
            this.weakMap.set(camera, vid);
            this.setLookAt(config.vid, config.lookAt);
            this.setAdaptiveWindow(config.vid, config.adaptiveWindow);
            super.add(vid, config);
            if (camera instanceof PerspectiveCamera ||
                camera instanceof OrthographicCamera) {
                camera.updateProjectionMatrix();
            }
        }
        else {
            console.warn(`CameraCompiler: can not support this config type: ${config.type}`);
        }
        return this;
    }
    set(vid, path, key, value) {
        if (key === "adaptiveWindow") {
            return this.setAdaptiveWindow(vid, value);
        }
        super.set(vid, path, key, value);
        const object = this.map.get(vid);
        if (object &&
            (object instanceof PerspectiveCamera ||
                object instanceof OrthographicCamera)) {
            object.updateProjectionMatrix();
        }
        return this;
    }
    dispose() {
        super.dispose();
        return this;
    }
}
//# sourceMappingURL=CameraCompiler.js.map