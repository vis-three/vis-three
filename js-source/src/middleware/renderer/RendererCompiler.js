import { Engine } from "../../engine/Engine";
import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import { WebGLRendererProcessor } from "./WebGLRendererProcessor";
export class RendererCompiler extends Compiler {
    target;
    engine;
    processorMap = {
        [CONFIGTYPE.WEBGLRENDERER]: new WebGLRendererProcessor(),
    };
    map = new Map();
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
    }
    assembly(vid, callback) {
        const config = this.target[vid];
        if (!config) {
            console.warn(`controls compiler can not found this config: '${vid}'`);
            return;
        }
        const processer = this.processorMap[config.type];
        if (!processer) {
            console.warn(`renderer compiler can not support this renderer: '${vid}'`);
            return;
        }
        const renderer = this.map.get(vid);
        if (!renderer) {
            console.warn(`renderer compiler can not found type of renderer: '${config.type}'`);
            return;
        }
        processer.dispose().assemble({
            config,
            renderer,
            processer,
            engine: this.engine,
        });
        callback(processer);
    }
    add(config) {
        if (config.type === CONFIGTYPE.WEBGLRENDERER) {
            // TODO: 支持多renderer?
            this.map.set(config.vid, this.engine.webGLRenderer);
        }
        this.assembly(config.vid, (processer) => {
            processer.processAll().dispose();
        });
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    useEngine(engine) {
        if (engine.webGLRenderer) {
            this.map.set(CONFIGTYPE.WEBGLRENDERER, engine.webGLRenderer);
        }
        this.engine = engine;
        return this;
    }
    compileAll() {
        const target = this.target;
        for (const config of Object.values(target)) {
            this.add(config);
        }
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=RendererCompiler.js.map