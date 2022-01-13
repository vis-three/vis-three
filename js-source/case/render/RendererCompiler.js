import { OrthographicCamera, PerspectiveCamera, WebGLRenderer } from "three";
import { Compiler } from "../../middleware/Compiler";
import { RENDERERMANAGER } from "../constants/EVENTTYPE";
import { getWebGLRendererConfig } from "./RendererConfig";
export class RendererCompiler extends Compiler {
    target;
    glRenderer;
    engine;
    glRendererCacheData;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
            parameters.glRenderer && (this.glRenderer = parameters.glRenderer);
            parameters.engine && (this.engine = parameters.engine);
        }
        else {
            this.target = {
                WebGLRenderer: getWebGLRendererConfig()
            };
            this.glRenderer = new WebGLRenderer();
        }
        this.glRendererCacheData = {};
    }
    setClearColor(value) {
        // 取出alpha的值
        const alpha = Number(value.slice(0, -1).split(',').pop().trim());
        this.glRenderer.setClearColor(value, alpha);
        this.glRenderer.clear();
        return this;
    }
    setPixelRatio(value) {
        this.glRenderer.setPixelRatio(value);
        this.glRenderer.clear();
        return this;
    }
    setSize(vector2) {
        const glRenderer = this.glRenderer;
        if (vector2) {
            glRenderer.setSize(vector2.x, vector2.y);
        }
        else {
            const domElement = glRenderer.domElement;
            glRenderer.setSize(domElement.offsetWidth, domElement.offsetHeight);
        }
        return this;
    }
    setViewpoint(config) {
        const glRenderer = this.glRenderer;
        if (config) {
            glRenderer.setViewport(config.x, config.y, config.width, config.height);
        }
        else {
            const domElement = glRenderer.domElement;
            glRenderer.setViewport(0, 0, domElement.offsetWidth, domElement.offsetHeight);
        }
        return this;
    }
    setScissor(config) {
        const glRenderer = this.glRenderer;
        if (config) {
            glRenderer.setScissorTest(true);
            glRenderer.setScissor(config.x, config.y, config.width, config.height);
        }
        else {
            glRenderer.setScissorTest(false);
            const domElement = glRenderer.domElement;
            glRenderer.setScissor(0, 0, domElement.offsetWidth, domElement.offsetHeight);
        }
        return this;
    }
    setAdaptiveCamera(value) {
        if (!this.engine) {
            console.warn(`renderer compiler is not set engine.`);
            return this;
        }
        const glRenderer = this.glRenderer;
        const engine = this.engine;
        const renderManager = engine.getRenderManager();
        if (!value) {
            if (!this.glRendererCacheData.adaptiveCameraFun) {
                return this;
            }
            if (this.glRendererCacheData.adaptiveCameraFun) {
                renderManager.removeEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun);
                this.glRendererCacheData.adaptiveCameraFun = undefined;
                return this;
            }
        }
        if (value) {
            if (this.glRendererCacheData.adaptiveCameraFun) {
                renderManager.addEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun);
                return this;
            }
            const adaptiveCameraFun = (event) => {
                const camera = engine.getCurrentCamera();
                const domWidth = glRenderer.domElement.offsetWidth;
                const domHeight = glRenderer.domElement.offsetHeight;
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
                glRenderer.setScissor(offsetX, offsetY, width, height);
                glRenderer.setViewport(offsetX, offsetY, width, height);
                glRenderer.setScissorTest(true);
            };
            this.glRendererCacheData.adaptiveCameraFun = adaptiveCameraFun;
            renderManager.addEventListener(RENDERERMANAGER.RENDER, this.glRendererCacheData.adaptiveCameraFun);
        }
        return this;
    }
    set(path, key, value) {
        const rendererType = path.shift();
        if (rendererType === 'WebGLRenderer') {
            const glRendererTarget = this.target.WebGLRenderer;
            const actionMap = {
                clearColor: () => this.setClearColor(value),
                pixelRatio: () => this.setPixelRatio(value),
                size: () => this.setSize(glRendererTarget.size),
                viewport: () => this.setViewpoint(glRendererTarget.viewport),
                scissor: () => this.setScissor(glRendererTarget.scissor),
                adaptiveCamera: () => this.setAdaptiveCamera(value)
            };
            if (actionMap[path[0] || key]) {
                actionMap[path[0] || key]();
                return this;
            }
            const glRenderer = this.glRenderer;
            let config = glRenderer;
            path.forEach((key, i, arr) => {
                config = config[key];
            });
            config[key] = value;
            glRenderer.clear();
            return this;
        }
        else {
            console.warn(`renderer compiler can not support this type: ${rendererType}`);
            return this;
        }
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    compileAll() {
        const target = this.target;
        const glRendererTarget = target.WebGLRenderer;
        this.setClearColor(glRendererTarget.clearColor);
        this.setPixelRatio(glRendererTarget.pixelRatio);
        this.setSize(glRendererTarget.size);
        this.setViewpoint(glRendererTarget.viewport);
        this.setScissor(glRendererTarget.scissor);
        this.setAdaptiveCamera(glRendererTarget.adaptiveCamera);
        const otherConfig = JSON.parse(JSON.stringify(glRendererTarget));
        delete otherConfig.vid;
        delete otherConfig.type;
        delete otherConfig.clearColor;
        delete otherConfig.pixelRatio;
        delete otherConfig.size;
        delete otherConfig.viewport;
        delete otherConfig.scissor;
        delete otherConfig.adaptiveCamera;
        Compiler.applyConfig(otherConfig, this.glRenderer);
        this.glRenderer.clear();
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=RendererCompiler.js.map