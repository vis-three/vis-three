import { WebGLRenderer } from "three";
import { Compiler } from "../../middleware/Compiler";
import { getWebGLRendererConfig } from "./RendererConfig";
export class RendererCompiler extends Compiler {
    target;
    glRenderer;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
            parameters.glRenderer && (this.glRenderer = parameters.glRenderer);
        }
        else {
            this.target = {
                WebGLRenderer: getWebGLRendererConfig()
            };
            this.glRenderer = new WebGLRenderer();
        }
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
                scissor: () => this.setScissor(glRendererTarget.scissor)
            };
            if (actionMap[path[0]]) {
                actionMap[path[0]]();
                return this;
            }
            let glRenderer = this.glRenderer;
            path.forEach((key, i, arr) => {
                glRenderer = glRenderer[key];
            });
            glRenderer[key] = value;
            glRenderer.clear();
            return this;
        }
        else {
            console.warn(`renderer compiler can not support this type: ${rendererType}`);
            return this;
        }
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
        const otherConfig = JSON.parse(JSON.stringify(glRendererTarget));
        delete otherConfig.vid;
        delete otherConfig.type;
        delete otherConfig.clearColor;
        delete otherConfig.pixelRatio;
        delete otherConfig.size;
        delete otherConfig.viewport;
        delete otherConfig.scissor;
        Compiler.applyConfig(otherConfig, this.glRenderer);
        this.glRenderer.clear();
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=RendererCompiler.js.map