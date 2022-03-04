import { Compiler } from "../../core/Compiler";
import { EVENTNAME } from "../../manager/EventManager";
import { isValidEnum } from "../../utils/utils";
import { v4 as getUuid } from 'uuid';
import * as BasicEventLbirary from '../../convenient/BasicEventLibrary/handler';
import * as RealTimeAnimateLibrary from '../../convenient/RealTimeAnimateLibrary/handler';
export class EventCompiler extends Compiler {
    static eventLibrary = {};
    static registerEvent = function (map) {
        EventCompiler.eventLibrary = Object.assign(EventCompiler.eventLibrary, map);
    };
    engine;
    target;
    map;
    funMap;
    objectMapSet;
    constructor(parameters) {
        super();
        if (parameters) {
            this.target = parameters.target;
            this.engine = parameters.engine;
        }
        else {
            this.target = {};
            // TSC: Uncaught ReferenceError: Cannot access 'Engine' before initialization
            // this.engine = new EngineSupport()
        }
        this.map = new Map();
        this.funMap = new Map();
        this.objectMapSet = new Set();
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
    // 获取目标物体
    getTargetObject(vid) {
        if (!this.map.has(vid)) {
            return null;
        }
        const structure = this.map.get(vid);
        return this.getObject(structure.target);
    }
    linkObjectMap(...map) {
        for (let objectMap of map) {
            if (!this.objectMapSet.has(objectMap)) {
                this.objectMapSet.add(objectMap);
            }
        }
        return this;
    }
    add(vid, config) {
        const structure = {
            target: config.target,
            [EVENTNAME.POINTERDOWN]: [],
            [EVENTNAME.POINTERUP]: [],
            [EVENTNAME.POINTERMOVE]: [],
            [EVENTNAME.POINTERENTER]: [],
            [EVENTNAME.POINTERLEAVE]: [],
            [EVENTNAME.CLICK]: [],
            [EVENTNAME.DBLCLICK]: [],
            [EVENTNAME.CONTEXTMENU]: []
        };
        this.map.set(vid, structure);
        for (let key in config) {
            let value = config[key];
            if (Array.isArray(value) && isValidEnum(EVENTNAME, key) && value.length) {
                for (let configure of value) {
                    this.addEvent(vid, key, configure);
                }
            }
        }
        return this;
    }
    addEvent(vid, eventName, config) {
        if (!this.map.has(vid)) {
            console.warn(`EventCompiler: No matching vid found: ${vid}`);
            return this;
        }
        if (!EventCompiler.eventLibrary[config.name]) {
            console.warn(`EventCompiler: can not support this event: ${config.name}`);
            return this;
        }
        const targetObject = this.getTargetObject(vid);
        if (!targetObject) {
            console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
            return this;
        }
        // 生成函数
        const fun = EventCompiler.eventLibrary[config.name](this, config);
        const funSymbol = getUuid();
        // 映射缓存
        this.funMap.set(funSymbol, fun);
        const structure = this.map.get(vid);
        structure[eventName].push(funSymbol);
        // 绑定事件
        targetObject.addEventListener(eventName, fun);
        return this;
    }
    removeEvent(vid, eventName, index) {
        if (!this.map.has(vid)) {
            console.warn(`EventCompiler: No matching vid found: ${vid}`);
            return this;
        }
        const targetObject = this.getTargetObject(vid);
        if (!targetObject) {
            console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
            return this;
        }
        const structure = this.map.get(vid);
        const funSymbol = structure[eventName][index];
        const fun = this.funMap.get(funSymbol);
        if (!fun) {
            console.warn(`EventCompiler: No matching fun found: ${vid}, ${eventName}, ${index}`);
            return this;
        }
        targetObject.removeEventListener(eventName, fun);
        this.funMap.delete(funSymbol);
        structure[eventName].splice(index, 1);
        return this;
    }
    updateEvent(vid, eventName, index) {
        this.removeEvent(vid, eventName, index);
        // 找到最新配置
        const config = this.target[vid][eventName][index];
        this.addEvent(vid, eventName, config);
    }
    remove(vid) {
        if (!this.map.has(vid)) {
            console.warn(`EventCompiler: No matching vid found: ${vid}`);
            return this;
        }
        const targetObject = this.getTargetObject(vid);
        if (!targetObject) {
            console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
            return this;
        }
        const structure = this.map.get(vid);
        for (let key in structure) {
            let funSymbolList = structure[key];
            if (Array.isArray(funSymbolList) && isValidEnum(EVENTNAME, key) && funSymbolList.length) {
                for (let funSymbol of funSymbolList) {
                    this.removeEvent(vid, key, funSymbol);
                }
            }
        }
        this.map.delete(vid);
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    compileAll() {
        const target = this.target;
        for (const key in target) {
            this.add(key, target[key]);
        }
        return this;
    }
    dispose() {
        this.map.clear();
        this.funMap.clear();
        this.objectMapSet.clear();
        return this;
    }
}
EventCompiler.registerEvent(BasicEventLbirary);
EventCompiler.registerEvent(RealTimeAnimateLibrary);
//# sourceMappingURL=EventCompiler.js.map