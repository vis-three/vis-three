import { Scene } from "three";
import { Compiler } from "../../core/Compiler";
import { EVENTNAME } from "../../manager/EventManager";
export class ObjectCompiler extends Compiler {
    static eventLibrary = {};
    static eventSymbol = "vis.event";
    IS_OBJECTCOMPILER = true;
    scene;
    target;
    map;
    weakMap;
    objectCacheMap;
    objectMapSet;
    // merge 属性的时候会直接被过滤的属性
    filterAttribute = {
        lookAt: true,
        children: true,
        pointerdown: true,
        pointermove: true,
        pointerup: true,
        pointerenter: true,
        pointerleave: true,
        click: true,
        dblclick: true,
        contextmenu: true,
    };
    engine;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.scene && (this.scene = parameters.scene);
            parameters.target && (this.target = parameters.target);
        }
        else {
            this.scene = new Scene();
            this.target = {};
        }
        this.map = new Map();
        this.weakMap = new WeakMap();
        this.objectMapSet = new Set();
        this.objectCacheMap = new WeakMap();
    }
    // 获取物体
    getObject(vid) {
        for (const map of this.objectMapSet) {
            if (map.has(vid)) {
                return map.get(vid);
            }
        }
        return null;
    }
    mergeFilterAttribute(object) {
        const recursion = (config, merge) => {
            for (const key in merge) {
                if (config[key] === undefined) {
                    config[key] = merge[key];
                    continue;
                }
                if (typeof merge[key] === "object") {
                    recursion(config[key], merge[key]);
                }
                else {
                    config[key] = merge[key];
                }
            }
        };
        recursion(this.filterAttribute, object);
        return this;
    }
    // 设置物体的lookAt方法
    setLookAt(vid, target) {
        // 不能自己看自己
        if (vid === target) {
            console.error(`can not set object lookAt itself.`);
            return this;
        }
        if (!this.map.has(vid)) {
            console.error(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
            return this;
        }
        const model = this.map.get(vid);
        let cacheData = this.objectCacheMap.get(model);
        if (!cacheData) {
            cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
            this.objectCacheMap.set(model, cacheData);
        }
        if (!target) {
            if (!cacheData.updateMatrixWorldFun) {
                return this;
            }
            model.updateMatrixWorld = cacheData.updateMatrixWorldFun;
            cacheData.lookAtTarget = null;
            cacheData.updateMatrixWorldFun = null;
            return this;
        }
        const lookAtTarget = this.getObject(target);
        if (!lookAtTarget) {
            console.warn(`${this.COMPILER_NAME}Compiler: can not found this vid mapping object: '${vid}'`);
            return this;
        }
        const updateMatrixWorldFun = model.updateMatrixWorld;
        cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
        cacheData.lookAtTarget = lookAtTarget.position;
        model.updateMatrixWorld = (focus) => {
            updateMatrixWorldFun.bind(model)(focus);
            model.lookAt(cacheData.lookAtTarget);
        };
        return this;
    }
    // 添加物体事件
    addEvent(vid, eventName, config) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME} compiler : No matching vid found: ${vid}`);
            return this;
        }
        if (!ObjectCompiler.eventLibrary[config.name]) {
            console.warn(`${this.COMPILER_NAME} compiler: can not support this event: ${config.name}`);
            return this;
        }
        const object = this.map.get(vid);
        // 生成函数
        const fun = ObjectCompiler.eventLibrary[config.name](this, config);
        // 映射缓存
        const symbol = Symbol.for(ObjectCompiler.eventSymbol);
        config[symbol] = fun;
        // 绑定事件
        object.addEventListener(eventName, fun);
        return this;
    }
    // 移除事件
    removeEvent(vid, eventName, index) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME} compiler: No matching vid found: ${vid}`);
            return this;
        }
        const object = this.map.get(vid);
        const config = this.target[vid][eventName][index];
        const fun = config[Symbol.for(ObjectCompiler.eventSymbol)];
        if (!fun) {
            console.warn(`${this.COMPILER_NAME} compiler: can not fun found event: ${vid}, ${eventName}, ${index}`);
            return this;
        }
        object.removeEventListener(eventName, fun);
        delete config[Symbol.for(ObjectCompiler.eventSymbol)];
        return this;
    }
    // 更新事件
    updateEvent(vid, eventName, index) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME} compiler: No matching vid found: ${vid}`);
            return this;
        }
        const object = this.map.get(vid);
        const symbol = Symbol.for(ObjectCompiler.eventSymbol);
        const config = this.target[vid][eventName][index];
        const fun = config[symbol];
        if (!fun) {
            console.warn(`${this.COMPILER_NAME} compiler: can not fun found event: ${vid}, ${eventName}, ${index}`);
            return this;
        }
        object.removeEventListener(eventName, fun);
        // 生成函数
        const newFun = ObjectCompiler.eventLibrary[config.name](this, config);
        // 映射缓存
        config[symbol] = fun;
        // 绑定事件
        object.addEventListener(eventName, newFun);
        return this;
    }
    linkObjectMap(...map) {
        for (const objectMap of map) {
            if (!this.objectMapSet.has(objectMap)) {
                this.objectMapSet.add(objectMap);
            }
        }
        return this;
    }
    useEngine(engine) {
        if (!engine.scene) {
            console.warn(`engine muset install scene plugin.`);
            return this;
        }
        this.scene = engine.scene;
        this.engine = engine;
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    getMap() {
        return this.map;
    }
    getObjectSymbol(object) {
        if (this.weakMap.has(object)) {
            return this.weakMap.get(object);
        }
        else {
            return null;
        }
    }
    compileAll() {
        const target = this.target;
        for (const key in target) {
            this.add(key, target[key]);
        }
        return this;
    }
    remove(vid) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`);
            return this;
        }
        const object = this.map.get(vid);
        this.scene.remove(object);
        this.weakMap.delete(object);
        this.objectCacheMap.delete(this.map.get(vid));
        this.map.delete(vid);
        return this;
    }
    dispose() {
        this.map.clear();
        this.objectMapSet.clear();
        return this;
    }
    add(vid, config) {
        const object = this.map.get(vid);
        if (!object) {
            console.error(`${this.COMPILER_NAME} compiler can not finish add method.`);
        }
        // lookAt
        this.setLookAt(vid, config.lookAt);
        // children
        // event
        for (const eventName of Object.values(EVENTNAME)) {
            const eventList = config[eventName];
            if (eventList.length) {
                for (const event of eventList) {
                    this.addEvent(vid, eventName, event);
                }
            }
        }
        Compiler.applyConfig(config, object, this.filterAttribute);
        this.scene.add(object);
        return this;
    }
    set(vid, path, key, value) {
        if (!this.map.has(vid)) {
            console.warn(`${this.COMPILER_NAME} compiler can not found this vid mapping object: '${vid}'`);
            return this;
        }
        const attribute = path.length ? path[0] : key;
        // lookAt
        if (attribute === "lookAt") {
            return this.setLookAt(vid, value);
        }
        // children
        if (attribute === "children") {
        }
        // event
        if (attribute.toLocaleUpperCase() in EVENTNAME) {
            return this.updateEvent(vid, key, Number(path[1]));
        }
        // merge
        let object = this.map.get(vid);
        let filter = this.filterAttribute;
        for (const key of path) {
            if (filter[key]) {
                if (filter[key] === true) {
                    return this;
                }
                else {
                    filter = filter[key];
                }
            }
            object = object[key];
        }
        object[key] = value;
        return this;
    }
}
//# sourceMappingURL=ObjectCompiler.js.map