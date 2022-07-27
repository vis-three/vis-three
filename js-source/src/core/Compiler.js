import { syncObject } from "../utils/utils";
export class Compiler {
    static processors = new Map();
    static processor = function (processor) {
        Compiler.processors.set(processor.configType, processor);
    };
    target = {};
    map = new Map();
    weakMap = new WeakMap();
    engine;
    cacheCompile;
    constructor() { }
    getMap() {
        return this.map;
    }
    useEngine(engine) {
        this.engine = engine;
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    add(config) {
        if (!Compiler.processors.has(config.type)) {
            console.warn(`${this.MODULE} compiler can not support this type: ${config.type}`);
            return null;
        }
        const processor = Compiler.processors.get(config.type);
        const object = processor.create(config, this.engine);
        this.map.set(config.vid, object);
        this.weakMap.set(object, config.vid);
        return object;
    }
    remove(config) {
        const vid = config.vid;
        if (!this.map.has(vid)) {
            console.warn(`${this.MODULE} compiler can not found this vid object: ${vid}.`);
            return this;
        }
        if (!Compiler.processors.has(config.type)) {
            console.warn(`${this.MODULE} compiler can not support this type: ${config.type}`);
            return this;
        }
        const object = this.map.get(vid);
        Compiler.processors.get(config.type).dispose(object);
        this.map.delete(vid);
        this.weakMap.delete(object);
        return this;
    }
    cover(config) {
        const vid = config.vid;
        if (!this.map.has(vid)) {
            console.warn(`${this.MODULE} compiler can not found this vid object: ${vid}.`);
            return this;
        }
        Promise.resolve().then(() => {
            // 兼容初始时候的cover
            // 自己跟自己合并一次
            syncObject(config, config, {
                vid: true,
                type: true,
            });
        });
        return this;
    }
    compile(vid, notice) {
        const cacheCompile = this.cacheCompile;
        let object;
        let config;
        let processor;
        if (cacheCompile && cacheCompile.vid === vid) {
            object = cacheCompile.target;
            config = cacheCompile.config;
            processor = cacheCompile.processor;
        }
        else {
            if (!this.map.has(vid)) {
                console.warn(`${this.MODULE} compiler set function: can not found object which vid is: '${vid}'`);
                return this;
            }
            if (!this.target[vid]) {
                console.warn(`${this.MODULE} compiler set function: can not found config which vid is: '${vid}'`);
                return this;
            }
            object = this.map.get(vid);
            config = this.target[vid];
            if (!Compiler.processors.has(config.type)) {
                console.warn(`PassCompiler can not support this type: ${config.type}`);
                return this;
            }
            processor = Compiler.processors.get(config.type);
            this.cacheCompile = {
                target: object,
                config,
                processor,
                vid,
            };
        }
        processor.process({
            config,
            target: object,
            engine: this.engine,
            processor,
            ...notice,
        });
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
        if (this.cacheCompile) {
            this.cacheCompile = undefined;
        }
        for (const config of Object.values(this.target)) {
            if (!this.map.has(config.vid)) {
                console.warn(`${this.MODULE} compiler set function: can not found object which vid is: '${config.vid}'`);
                continue;
            }
            const object = this.map.get(config.vid);
            if (!Compiler.processors.has(config.type)) {
                console.warn(`${this.MODULE}  can not support this type: ${config.type}`);
                continue;
            }
            Compiler.processors.get(config.type).dispose(object);
        }
        this.map.clear();
        this.target = {};
        return this;
    }
    getObjectSymbol(object) {
        return this.weakMap.get(object) || null;
    }
    getObjectBySymbol(vid) {
        return this.map.get(vid) || null;
    }
}
//# sourceMappingURL=Compiler.js.map