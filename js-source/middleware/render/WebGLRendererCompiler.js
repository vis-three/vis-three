import { OrthographicCamera, PerspectiveCamera } from "three";
import { Compiler } from "../../core/Compiler";
export class WebGLRendererCompiler extends Compiler {
    renderer;
    engine;
    target;
    rendererCacheData;
    constructor(parameters) {
        super();
        this.engine = parameters.engine;
        this.target = parameters.target;
        this.renderer = this.engine.webGLRenderer;
        this.rendererCacheData = {};
    }
    setClearColor(value) {
        // 取出alpha的值
        const alpha = Number(value.slice(0, -1).split(',').pop().trim());
        this.renderer.setClearColor(value, alpha);
        this.renderer.clear();
        return this;
    }
    setPixelRatio(value) {
        this.renderer.setPixelRatio(value);
        this.renderer.clear();
        return this;
    }
    setSize(vector2) {
        const renderer = this.renderer;
        if (vector2) {
            renderer.setSize(vector2.x, vector2.y);
        }
        else {
            const domElement = renderer.domElement;
            renderer.setSize(domElement.offsetWidth, domElement.offsetHeight);
        }
        return this;
    }
    setViewpoint(config) {
        const renderer = this.renderer;
        if (config) {
            renderer.setViewport(config.x, config.y, config.width, config.height);
        }
        else {
            const domElement = renderer.domElement;
            renderer.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
        }
        return this;
    }
    setScissor(config) {
        const renderer = this.renderer;
        if (config) {
            renderer.setScissorTest(true);
            renderer.setScissor(config.x, config.y, config.width, config.height);
        }
        else {
            renderer.setScissorTest(false);
            const domElement = renderer.domElement;
            renderer.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
        }
        return this;
    }
    setAdaptiveCamera(value) {
        if (!this.engine) {
            console.warn(`renderer compiler is not set engine.`);
            return this;
        }
        const renderer = this.renderer;
        const engine = this.engine;
        const renderManager = engine.renderManager;
        if (!value) {
            if (!this.rendererCacheData.adaptiveCameraFun) {
                return this;
            }
            if (this.rendererCacheData.adaptiveCameraFun) {
                renderManager.removeEventListener('render', this.rendererCacheData.adaptiveCameraFun);
                this.rendererCacheData.adaptiveCameraFun = undefined;
                return this;
            }
        }
        if (value) {
            if (this.rendererCacheData.adaptiveCameraFun) {
                renderManager.addEventListener('render', this.rendererCacheData.adaptiveCameraFun);
                return this;
            }
            const adaptiveCameraFun = (event) => {
                const camera = engine.currentCamera;
                const domWidth = renderer.domElement.offsetWidth;
                const domHeight = renderer.domElement.offsetHeight;
                let width = 0;
                let height = 0;
                let offsetX = 0;
                let offsetY = 0;
                let aspect = 0;
                // 根据相机类型去设置viewPoint
                if (camera instanceof PerspectiveCamera) {
                    aspect = camera.aspect;
                }
                else if (camera instanceof OrthographicCamera) {
                    width = camera.right - camera.left;
                    height = camera.top - camera.bottom;
                    aspect = width / height;
                }
                else {
                    console.warn(`renderer compiler can not support this camera`, camera);
                    return;
                }
                if (aspect >= 1) {
                    width = domWidth;
                    height = width / aspect;
                    offsetY = domHeight / 2 - height / 2;
                }
                else {
                    height = domHeight;
                    width = height * aspect;
                    offsetX = domWidth / 2 - width / 2;
                }
                renderer.setScissor(offsetX, offsetY, width, height);
                renderer.setViewport(offsetX, offsetY, width, height);
                renderer.setScissorTest(true);
            };
            this.rendererCacheData.adaptiveCameraFun = adaptiveCameraFun;
            renderManager.addEventListener('render', this.rendererCacheData.adaptiveCameraFun);
        }
        return this;
    }
    set(path, key, value) {
        const actionMap = {
            clearColor: () => this.setClearColor(value),
            pixelRatio: () => this.setPixelRatio(value),
            size: () => this.setSize(this.target.size),
            viewport: () => this.setViewpoint(this.target.viewport),
            scissor: () => this.setScissor(this.target.scissor),
            adaptiveCamera: () => this.setAdaptiveCamera(value)
        };
        if (actionMap[path[0] || key]) {
            actionMap[path[0] || key]();
            return this;
        }
        let config = this.renderer;
        path.forEach((key, i, arr) => {
            config = config[key];
        });
        config[key] = value;
        this.renderer.clear();
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    compileAll() {
        const target = this.target;
        this.setClearColor(target.clearColor);
        this.setPixelRatio(target.pixelRatio);
        this.setSize(target.size);
        this.setViewpoint(target.viewport);
        this.setScissor(target.scissor);
        this.setAdaptiveCamera(target.adaptiveCamera);
        const otherConfig = JSON.parse(JSON.stringify(target));
        delete otherConfig.vid;
        delete otherConfig.type;
        delete otherConfig.clearColor;
        delete otherConfig.pixelRatio;
        delete otherConfig.size;
        delete otherConfig.viewport;
        delete otherConfig.scissor;
        delete otherConfig.adaptiveCamera;
        Compiler.applyConfig(otherConfig, this.renderer);
        this.renderer.clear();
        return this;
    }
    dispose() {
        this.renderer.dispose();
        return this;
    }
}
//# sourceMappingURL=WebGLRendererCompiler.js.map