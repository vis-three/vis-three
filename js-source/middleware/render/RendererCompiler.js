import { Engine } from "../../engine/Engine";
import { Compiler } from "../../core/Compiler";
import { WebGLRendererCompiler } from "./WebGLRendererCompiler";
export class RendererCompiler extends Compiler {
    target;
    engine;
    map;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
            parameters.engine && (this.engine = parameters.engine);
        }
        else {
            this.target = {};
            this.engine = new Engine();
        }
        this.map = {};
    }
    add(type, config) {
        if (type === 'WebGLRenderer') {
            const rendererCompiler = new WebGLRendererCompiler({
                engine: this.engine,
                target: config
            });
            rendererCompiler.compileAll();
            this.map[type] = rendererCompiler;
        }
    }
    set(path, key, value) {
        const rendererType = path.shift();
        // 整体替换
        if (!rendererType) {
            this.map[key].setTarget(value).compileAll();
            return this;
        }
        if (this.map[rendererType]) {
            this.map[rendererType].set(path, key, value);
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
        Object.keys(target).forEach(type => {
            this.add(type, target[type]);
        });
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=RendererCompiler.js.map