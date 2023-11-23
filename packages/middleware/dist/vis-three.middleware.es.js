var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { syncObject, isObject, extendPath, isArray } from "@vis-three/utils";
import { v4, validate } from "uuid";
import { EventDispatcher, ENGINE_EVENT, Engine } from "@vis-three/core";
import { Subject } from "rxjs";
import { LOADER_MANAGER_PLUGIN, LOADER_EVENT, LoaderManagerPlugin } from "@vis-three/plugin-loader-manager";
export * from "@vis-three/plugin-loader-manager";
import { PointerManagerPlugin } from "@vis-three/plugin-pointer-manager";
export * from "@vis-three/plugin-pointer-manager";
import { EventManagerPlugin } from "@vis-three/plugin-event-manager";
export * from "@vis-three/plugin-event-manager";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
export * from "@vis-three/plugin-render-manager";
const CONFIGFACTORY = {};
const MODULETYPE = {};
const CONFIGTYPE = {};
const OBJECTMODULE = {};
const CONFIGMODULE = {};
const ProcessorMembers = {};
const getModule = (type) => {
  return CONFIGMODULE[type] || null;
};
const isObjectModule = (module) => {
  return OBJECTMODULE[module];
};
const isObjectType = (type) => {
  const module = getModule(type);
  if (module) {
    return isObjectModule(module);
  } else {
    return false;
  }
};
const installProcessor = function(processor, module) {
  ProcessorMembers[processor.type] = processor;
  CONFIGTYPE[processor.type.toLocaleUpperCase()] = processor.type;
  CONFIGFACTORY[processor.type] = processor.config;
  CONFIGMODULE[processor.type] = module;
};
const globalOption = {
  proxy: {
    expand: void 0,
    timing: "before",
    toRaw: void 0,
    ignore: {}
  },
  symbol: {
    generator: v4,
    validator: validate
  }
};
const defineOption = function(options) {
  if (options.proxy) {
    Object.assign(globalOption.proxy, options.proxy);
  }
  if (options.symbol) {
    Object.assign(globalOption.symbol, options.symbol);
  }
};
const stringify = (key, value) => {
  if (value === Infinity) {
    return "Infinity";
  }
  if (value === -Infinity) {
    return "-Infinity";
  }
  return value;
};
const parse = (key, value) => {
  if (value === "Infinity") {
    return Infinity;
  }
  if (value === "-Infinity") {
    return -Infinity;
  }
  return value;
};
const clone$1 = (object) => {
  return JSON.parse(JSON.stringify(object, stringify), parse);
};
class Pipeline {
  constructor(config) {
    __publicField(this, "config");
    this.config = config;
  }
  pipe(fun) {
    this.config = fun(this.config);
    return this;
  }
  get() {
    return this.config;
  }
}
var JSONHandler = {
  stringify,
  parse,
  clone: clone$1,
  Pipeline
};
var JSONHandler$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  stringify,
  parse,
  clone: clone$1,
  Pipeline,
  "default": JSONHandler
}, Symbol.toStringTag, { value: "Module" }));
const generateConfig = function(type, merge, options = {
  observer: true,
  strict: true,
  warn: true
}) {
  if (options.observer === void 0) {
    options.observer = true;
  }
  if (options.strict === void 0) {
    options.strict = true;
  }
  if (options.warn === void 0) {
    options.warn = true;
  }
  if (options.handler === void 0) {
    options.handler = globalOption.proxy.expand;
  }
  if (!CONFIGFACTORY[type]) {
    console.error(`type: ${type} can not be found in configList.`);
    return {
      vid: "",
      type
    };
  }
  const recursion = (config, merge2) => {
    for (const key in merge2) {
      if (config[key] === void 0) {
        !options.strict && (config[key] = merge2[key]);
        options.strict && options.warn && console.warn(`'${type}' config can not set key: ${key}`);
        continue;
      }
      if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
        if (config[key] === null) {
          config[key] = { ...merge2[key] };
        }
        recursion(config[key], merge2[key]);
      } else {
        config[key] = merge2[key];
      }
    }
  };
  let initConfig = CONFIGFACTORY[type]();
  if (initConfig.vid === "") {
    initConfig.vid = globalOption.symbol.generator();
  }
  merge && recursion(initConfig, merge);
  if (options.observer === false) {
    return initConfig;
  }
  if (options.handler && globalOption.proxy.timing === "before") {
    initConfig = options.handler(initConfig);
  }
  let ob = observable(initConfig);
  if (options.handler && globalOption.proxy.timing === "after") {
    ob = options.handler(ob);
  }
  if (generateConfig.autoInject && generateConfig.injectEngine) {
    const engine = generateConfig.injectEngine;
    engine.applyConfig(ob);
    if (generateConfig.injectScene) {
      if (isObjectType(initConfig.type) && initConfig.type !== CONFIGTYPE.SCENE) {
        let sceneConfig = null;
        if (typeof generateConfig.injectScene === "boolean") {
          sceneConfig = engine.getObjectConfig(engine.scene);
        } else if (typeof generateConfig.injectScene === "string") {
          sceneConfig = engine.getConfigBySymbol(generateConfig.injectScene);
        }
        if (!sceneConfig) {
          console.warn(
            `current engine scene can not found it config`,
            engine,
            engine.scene
          );
        } else {
          sceneConfig.children.push(
            initConfig.vid
          );
        }
      }
    }
    return ob;
  }
  return ob;
};
generateConfig.autoInject = true;
generateConfig.injectScene = false;
generateConfig.injectEngine = null;
const clone = (object, options = {}) => {
  let jsonObject = JSON.stringify(object, JSONHandler.stringify);
  const detail = {};
  !options.filter && (options.filter = ["assets"]);
  const modulekeys = Object.keys(object).filter(
    (key) => !options.filter.includes(key)
  );
  for (const modulekey of modulekeys) {
    for (const config of object[modulekey]) {
      const vid = config.vid;
      const newVid = v4();
      jsonObject = jsonObject.replace(new RegExp(vid, "g"), newVid);
      if (options.detail) {
        detail[vid] = newVid;
      }
    }
  }
  const newConfig = JSON.parse(jsonObject, JSONHandler.parse);
  if (options.fillName) {
    if (typeof options.fillName === "function") {
      for (const modulekey of modulekeys) {
        for (const config of newConfig[modulekey]) {
          if (!config.name) {
            config.name = options.fillName(config);
          }
        }
      }
    } else {
      for (const modulekey of modulekeys) {
        for (const config of newConfig[modulekey]) {
          if (!config.name) {
            config.name = `${config.type}-${config.vid.slice(-2)}`;
          }
        }
      }
    }
  }
  return options.detail ? { config: newConfig, detail } : newConfig;
};
const handler$1 = (object, handler2, options = {
  filter: ["assets"],
  clone: true
}) => {
  const config = options.clone ? JSONHandler.clone(object) : object;
  !options.filter && (options.filter = ["assets"]);
  const modulekeys = Object.keys(config).filter(
    (key) => !options.filter.includes(key)
  );
  for (const modulekey of modulekeys) {
    const module = config[modulekey];
    module.forEach((elem, i, arr) => {
      arr[i] = handler2(elem);
    });
  }
  return config;
};
const planish = function(configs) {
  const result = {};
  for (const module of Object.keys(configs)) {
    for (const config of configs[module]) {
      result[config.name] = config;
    }
  }
  return result;
};
const observable$1 = function(object, obCallback) {
  if (typeof object === "string") {
    object = JSON.parse(object, JSONHandler.parse);
  }
  return handler$1(JSONHandler.clone(object), (c) => {
    c = generateConfig(c.type, c, { strict: false });
    if (obCallback) {
      return obCallback(c);
    } else {
      return c;
    }
  });
};
var template = {
  clone,
  handler: handler$1,
  planish,
  observable: observable$1
};
var template$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clone,
  handler: handler$1,
  planish,
  observable: observable$1,
  "default": template
}, Symbol.toStringTag, { value: "Module" }));
class AntiShake {
  constructor() {
    __publicField(this, "list", []);
    __publicField(this, "timer");
    __publicField(this, "time", 0);
  }
  exec(fun) {
    if (fun(false)) {
      return;
    }
    if (!this.list.includes(fun)) {
      this.list.push(fun);
    }
    let cacheCount = 0;
    const autoSequential = () => {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const nextList = [];
        for (const fun2 of this.list) {
          if (!fun2(false)) {
            nextList.push(fun2);
          }
        }
        if (nextList.length) {
          if (nextList.length === cacheCount) {
            for (const fun2 of nextList) {
              fun2(true);
            }
            this.list = [];
          } else {
            cacheCount = nextList.length;
            this.list = nextList;
            autoSequential();
          }
        } else {
          this.list = [];
        }
      }, this.time);
    };
    autoSequential();
  }
  append(fun) {
    if (this.list.length && !this.list.includes(fun)) {
      this.list.push(fun);
    } else {
      this.exec(fun);
    }
  }
  nextTick(fun) {
    setTimeout(() => {
      fun();
    }, this.time);
  }
}
const globalAntiShake = new AntiShake();
class Bus {
  constructor() {
    __publicField(this, "map", /* @__PURE__ */ new WeakMap());
  }
  create(object) {
    if (this.map.has(object)) {
      console.warn(`object is exist.`, object);
      return;
    }
    this.map.set(object, new EventDispatcher());
  }
  dispose(object) {
    this.map.delete(object);
  }
  check(object) {
    return this.map.has(object);
  }
  emit(object, type, data) {
    if (!this.map.has(object)) {
      console.warn(
        `object can not create eventDispatcher please create it`,
        object
      );
      return;
    }
    const eventDispatcher = this.map.get(object);
    eventDispatcher.emit(type, data);
  }
  on(object, type, callback) {
    if (!this.map.has(object)) {
      console.warn(
        `object can not create eventDispatcher please create it`,
        object
      );
      return;
    }
    const eventDispatcher = this.map.get(object);
    eventDispatcher.on(type, callback);
  }
  off(object, type, callback) {
    if (!this.map.has(object)) {
      console.warn(
        `object can not create eventDispatcher please create it`,
        object
      );
      return;
    }
    const eventDispatcher = this.map.get(object);
    eventDispatcher.off(type, callback);
  }
}
const compilerEvent = new Bus();
const configEvent = new Bus();
var Bus$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Bus,
  compilerEvent,
  configEvent
}, Symbol.toStringTag, { value: "Module" }));
class ModuleTrigger {
  constructor() {
    __publicField(this, "condition", {});
  }
  registerModule(module) {
    this.condition[module] = false;
    return this;
  }
  updateCondition(module) {
    if (typeof this.condition[module] !== "undefined") {
      this.condition[module] = true;
    }
    return this;
  }
  reset() {
    Object.keys(this.condition).forEach((key) => {
      this.condition[key] = false;
    });
  }
  test() {
    return !Object.values(this.condition).includes(false);
  }
  trig() {
  }
}
class ObjectModuleTrigger extends ModuleTrigger {
  constructor() {
    super();
    __publicField(this, "triggerList", []);
  }
  registerModule(module) {
    if (OBJECTMODULE[module]) {
      return super.registerModule(module);
    }
    return this;
  }
  registerExec(fun) {
    if (!fun(true)) {
      this.triggerList.push(fun);
    }
  }
  trig() {
    const list = this.triggerList;
    for (const fun of list) {
      fun();
    }
    this.reset();
  }
  reset() {
    this.triggerList = [];
    super.reset();
  }
}
const globalObjectModuleTrigger = new ObjectModuleTrigger();
const createSymbol = function() {
  return globalOption.symbol.generator();
};
var COMPILER_EVENT = /* @__PURE__ */ ((COMPILER_EVENT2) => {
  COMPILER_EVENT2["ADD"] = "compiler.add";
  COMPILER_EVENT2["REMOVE"] = "compiler.remove";
  COMPILER_EVENT2["COMPILE"] = "compiler.compile";
  COMPILER_EVENT2["UPDATE"] = "compiler.update";
  return COMPILER_EVENT2;
})(COMPILER_EVENT || {});
class Compiler {
  constructor() {
    __publicField(this, "MODULE", "");
    __publicField(this, "processors", /* @__PURE__ */ new Map());
    __publicField(this, "target", {});
    __publicField(this, "map", /* @__PURE__ */ new Map());
    __publicField(this, "weakMap", /* @__PURE__ */ new WeakMap());
    __publicField(this, "engine");
    __publicField(this, "cacheCompile");
  }
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
    if (!this.processors.has(config.type)) {
      console.warn(
        `${this.MODULE} compiler can not support this type: ${config.type}`
      );
      return null;
    }
    const processor = this.processors.get(config.type);
    const object = processor.create(config, this.engine, this);
    this.map.set(config.vid, object);
    this.weakMap.set(object, config.vid);
    compilerEvent.create(object);
    compilerEvent.emit(object, "compiler.add");
    return object;
  }
  remove(config) {
    const vid = config.vid;
    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid object: ${vid}.`
      );
      return this;
    }
    if (!this.processors.has(config.type)) {
      console.warn(
        `${this.MODULE} compiler can not support this type: ${config.type}`
      );
      return this;
    }
    const object = this.map.get(vid);
    this.processors.get(config.type).dispose(object, this.engine, this);
    this.map.delete(vid);
    this.weakMap.delete(object);
    compilerEvent.emit(object, "compiler.remove");
    compilerEvent.dispose(object);
    if (this.cacheCompile && this.cacheCompile.vid === vid) {
      this.cacheCompile = void 0;
    }
    return this;
  }
  cover(config) {
    const vid = config.vid;
    if (!this.map.has(vid)) {
      console.warn(
        `${this.MODULE} compiler can not found this vid object: ${vid}.`
      );
      return this;
    }
    Promise.resolve().then(() => {
      syncObject(config, config, {
        vid: true,
        type: true
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
    } else {
      if (!this.map.has(vid)) {
        console.warn(
          `${this.MODULE} compiler set function: can not found object which vid is: '${vid}'`
        );
        return this;
      }
      if (!this.target[vid]) {
        console.warn(
          `${this.MODULE} compiler set function: can not found config which vid is: '${vid}'`
        );
        return this;
      }
      object = this.map.get(vid);
      config = this.target[vid];
      if (!this.processors.has(config.type)) {
        console.warn(`PassCompiler can not support this type: ${config.type}`);
        return this;
      }
      processor = this.processors.get(config.type);
      this.cacheCompile = {
        target: object,
        config,
        processor,
        vid
      };
    }
    processor.process({
      config,
      target: object,
      engine: this.engine,
      processor,
      compiler: this,
      ...notice
    });
    const router = notice.path.join(".");
    compilerEvent.emit(
      object,
      `${"compiler.compile"}:${router ? router + "." : router}${notice.key}`
    );
    compilerEvent.emit(object, `${"compiler.update"}`);
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
      this.cacheCompile = void 0;
    }
    for (const config of Object.values(this.target)) {
      if (!this.map.has(config.vid)) {
        console.warn(
          `${this.MODULE} compiler set function: can not found object which vid is: '${config.vid}'`
        );
        continue;
      }
      const object = this.map.get(config.vid);
      if (!this.processors.has(config.type)) {
        console.warn(
          `${this.MODULE}  can not support this type: ${config.type}`
        );
        continue;
      }
      this.processors.get(config.type).dispose(object, this.engine, this);
    }
    this.map.clear();
    this.target = {};
    return this;
  }
  reigstProcessor(processor, fun) {
    if (this.processors.has(processor.type)) {
      console.warn(
        `${this.MODULE} compiler has already exist this processor ${processor.type}, that will be cover.`
      );
      return this;
    }
    this.processors.set(processor.type, processor);
    installProcessor(processor, this.MODULE);
    fun(this);
    return this;
  }
  getObjectSymbol(object) {
    return this.weakMap.get(object) || null;
  }
  getObjectBySymbol(vid) {
    return this.map.get(vid) || null;
  }
}
const CompilerFactory = function(type, compiler, processors) {
  return class extends compiler {
    constructor() {
      super();
      __publicField(this, "MODULE", type);
      for (const processor of processors) {
        this.processors.set(processor.type, processor);
      }
    }
  };
};
const SYMBOL_FATHER = "vis.father";
const SYMBOL_KEY = "vis.key";
const SYMBOL_OB = "vis.observer";
const arrayCache = /* @__PURE__ */ new WeakMap();
const cacheArray = function(object) {
  if (Array.isArray(object)) {
    arrayCache.set(object, object.concat([]));
  }
};
const getCacheArray = function(object) {
  return arrayCache.get(object);
};
const getPath = function(object) {
  let path = "";
  const recursion = (object2) => {
    if (object2[Symbol.for(SYMBOL_KEY)] !== void 0) {
      path = `${object2[Symbol.for(SYMBOL_KEY)]}${path ? `.${path}` : ""}`;
      if (object2[Symbol.for(SYMBOL_FATHER)]) {
        recursion(object2[Symbol.for(SYMBOL_FATHER)]);
      }
    }
  };
  recursion(object);
  return path;
};
const updateArraySymbol = function(array) {
  if (array.length && isObject(array[0])) {
    const length = array.length;
    for (let index = 0; index < length; index += 1) {
      array[index][Symbol.for(SYMBOL_KEY)] = index;
    }
  }
};
const getObserver = function(object) {
  return object[Symbol.for(SYMBOL_OB)];
};
const hasObserver = function(object) {
  return Boolean(object[Symbol.for(SYMBOL_OB)]);
};
const containerGetter = function(target, key, receiver) {
  return Reflect.get(target, key, receiver);
};
const containerSetter = function(target, key, value, receiver, container) {
  if (typeof key === "symbol") {
    return Reflect.set(target, key, value, receiver);
  }
  if (target[key] === void 0) {
    const result = Reflect.set(target, key, value);
    container.add(value);
    container.next({
      operate: "add",
      path: key,
      key,
      value
    });
    return result;
  } else {
    const result = Reflect.set(target, key, value);
    container.remove(value.vid);
    container.add(value);
    container.next({
      operate: "set",
      path: key,
      key,
      value
    });
    return result;
  }
};
const containerDeleter = function(target, key, container) {
  if (typeof key === "symbol") {
    return Reflect.deleteProperty(target, key);
  }
  const value = target[key];
  const result = Reflect.deleteProperty(target, key);
  container.next({
    operate: "delete",
    path: key,
    key,
    value
  });
  container.remove(value.vid);
  return result;
};
class DataContainer extends Subject {
  constructor() {
    super();
    __publicField(this, "container");
    __publicField(this, "subscriptions", /* @__PURE__ */ new Map());
    const generator = globalOption.proxy.expand ? (data = {}) => globalOption.proxy.expand(data) : (data = {}) => data;
    if (globalOption.proxy.timing === "before") {
      this.container = new Proxy(generator(), {
        get: containerGetter,
        set: (target, key, value, receiver) => containerSetter(target, key, value, receiver, this),
        deleteProperty: (target, key) => containerDeleter(target, key, this)
      });
    } else {
      this.container = generator(
        new Proxy(
          {},
          {
            get: containerGetter,
            set: (target, key, value, receiver) => containerSetter(target, key, value, receiver, this),
            deleteProperty: (target, key) => containerDeleter(target, key, this)
          }
        )
      );
    }
  }
  add(config) {
    const observer = getObserver(config);
    if (!observer) {
      console.error("DataContainer: this config can not observer", config);
      return;
    }
    this.subscriptions.set(
      observer.target.vid,
      observer.subscribe((notice) => {
        this.next({
          operate: notice.operate,
          path: extendPath(observer.target.vid, notice.path),
          key: notice.key,
          value: notice.value
        });
      })
    );
  }
  remove(vid) {
    this.subscriptions.delete(vid);
  }
}
class Translater {
  constructor() {
    __publicField(this, "rule", () => {
    });
    __publicField(this, "members", []);
  }
  apply(compiler) {
    if (!this.members.includes(compiler)) {
      this.members.push(compiler);
    }
    return this;
  }
  cancel(compiler) {
    if (this.members.includes(compiler)) {
      this.members.splice(this.members.indexOf(compiler), 1);
    }
    return this;
  }
  setRule(rule) {
    this.rule = rule;
    return this;
  }
  translate(notice) {
    const rule = this.rule;
    for (const compiler of this.members) {
      rule(notice, compiler);
    }
    return this;
  }
}
class DataSupport {
  constructor(rule, data = []) {
    __publicField(this, "MODULE", "");
    __publicField(this, "dataContainer", new DataContainer());
    __publicField(this, "translater");
    this.translater = new Translater().setRule(rule);
    this.dataContainer.subscribe((notice) => {
      this.translater.translate(notice);
    });
    for (const config of data) {
      this.addConfig(config);
    }
  }
  getData() {
    return this.dataContainer.container;
  }
  existSymbol(vid) {
    return Boolean(this.dataContainer.container[vid]);
  }
  addConfig(config) {
    this.dataContainer.container[config.vid] = config;
    return this;
  }
  getConfig(vid) {
    return this.dataContainer.container[vid];
  }
  removeConfig(vid) {
    const data = this.dataContainer.container;
    data[vid] !== void 0 && delete data[vid];
  }
  addCompiler(compiler) {
    compiler.setTarget(this.dataContainer.container);
    compiler.compileAll();
    this.translater.apply(compiler);
    return this;
  }
  toJSON(compress = true) {
    if (!compress) {
      return JSON.stringify(
        Object.values(this.dataContainer.container),
        stringify
      );
    } else {
      return JSON.stringify(this.exportConfig(), stringify);
    }
  }
  exportConfig(compress = true) {
    if (!compress) {
      return Object.values(clone$1(this.dataContainer.container));
    } else {
      const data = this.dataContainer.container;
      const target = [];
      const cacheConfigTemplate = {};
      const recursion = (config, template2, result = {}) => {
        for (const key in config) {
          if (["vid", "type"].includes(key)) {
            result[key] = config[key];
            continue;
          }
          if (typeof config[key] === "object" && config[key] !== null) {
            if (Array.isArray(config[key])) {
              if (!config[key].length) {
                continue;
              }
              result[key] = config[key].map((elem) => {
                if (typeof elem === "object" && elem !== null) {
                  return clone$1(elem);
                } else {
                  return elem;
                }
              });
              continue;
            }
            result[key] = {};
            if (!template2[key]) {
              result[key] = clone$1(config[key]);
            } else {
              recursion(config[key], template2[key], result[key]);
              if (Object.keys(result[key]).length === 0) {
                delete result[key];
              }
            }
          } else {
            if (template2[key] !== config[key]) {
              result[key] = config[key];
            }
          }
        }
      };
      for (const config of Object.values(data)) {
        if (!cacheConfigTemplate[config.type]) {
          if (!CONFIGFACTORY[config.type]) {
            console.error(`can not font some config with: ${config.type}`);
            continue;
          }
          cacheConfigTemplate[config.type] = CONFIGFACTORY[config.type]();
        }
        const temp = {};
        recursion(config, cacheConfigTemplate[config.type], temp);
        target.push(temp);
      }
      return target;
    }
  }
  load(configs) {
    const data = this.dataContainer.container;
    const cacheConfigTemplate = {};
    const restore = (config, template2) => {
      for (const key in template2) {
        if (typeof config[key] === "object" && config[key] !== null && typeof template2[key] === "object" && template2[key] !== null) {
          restore(config[key], template2[key]);
        } else if (config[key] === void 0) {
          config[key] = template2[key];
        }
      }
    };
    for (const config of configs) {
      if (!cacheConfigTemplate[config.type]) {
        if (!CONFIGFACTORY[config.type]) {
          console.error(`can not font some config with: ${config.type}`);
          continue;
        }
        cacheConfigTemplate[config.type] = CONFIGFACTORY[config.type]();
      }
      restore(config, cacheConfigTemplate[config.type]);
      data[config.vid] = config;
    }
    return this;
  }
  remove(configs) {
    const data = this.dataContainer.container;
    for (const config of configs) {
      data[config.vid] !== void 0 && delete data[config.vid];
    }
    return this;
  }
}
const DataSupportFactory = function(type, rule) {
  return class extends DataSupport {
    constructor(data = []) {
      super(rule, data);
      __publicField(this, "MODULE", type);
    }
  };
};
const arrayMethods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
const arrayMutation = /* @__PURE__ */ new WeakSet();
const proxyGetter = function(target, key, receiver) {
  if (Array.isArray(target) && arrayMethods.includes(key)) {
    arrayMutation.add(target);
  }
  return Reflect.get(target, key, receiver);
};
const proxySetter = function(target, key, value, receiver) {
  const path = getPath(target);
  const observer = getObserver(target);
  if (typeof key === "symbol" || observer.isIgnore(extendPath(path, key))) {
    return Reflect.set(target, key, value, receiver);
  }
  if (isObject(value) && !hasObserver(value)) {
    value = react(observer, value, target, key);
  }
  if (target[key] === void 0) {
    if (isObject(value)) {
      value[Symbol.for(SYMBOL_KEY)] = key;
      isArray(value) && cacheArray(value);
    }
    isArray(target) && arrayMutation.delete(target);
    const result2 = Reflect.set(target, key, value);
    isArray(target) && cacheArray(target);
    observer.next({
      operate: "add",
      path,
      key,
      value
    });
    return result2;
  }
  const oldValue = target[key];
  const result = Reflect.set(target, key, value);
  if (isArray(target)) {
    if (arrayMutation.has(target) && key === "length") {
      const cacheValue = getCacheArray(target);
      if (!cacheValue) {
        if (Array.isArray(oldValue)) {
          console.error("array value is not be cached:", target);
        }
        return result;
      }
      updateArraySymbol(target);
      const num = Math.abs(cacheValue.length - target.length);
      const operate = cacheValue.length >= target.length ? "delete" : "add";
      const contrast = cacheValue.length >= target.length ? target : cacheValue;
      let execNum = 0;
      let index = 0;
      for (const member of operate === "delete" ? cacheValue : target) {
        if (!contrast.includes(member)) {
          observer.next({
            operate,
            path,
            key: index.toString(),
            value: member
          });
          execNum += 1;
          if (execNum === num) {
            break;
          }
        }
        index += 1;
      }
      cacheArray(target);
      arrayMutation.delete(target);
      return result;
    } else if (arrayMutation.has(target) || key === "length") {
      return result;
    }
  }
  observer.next({
    operate: "set",
    path,
    key,
    value
  });
  return result;
};
const proxyDeleter = function(target, key) {
  const path = getPath(target);
  const observer = getObserver(target);
  if (typeof key === "symbol" || observer.isIgnore(path)) {
    return Reflect.deleteProperty(target, key);
  }
  const value = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (isArray(target)) {
    return result;
  }
  observer.next({
    operate: "delete",
    path,
    key,
    value
  });
  return result;
};
const handler = {
  get: proxyGetter,
  set: proxySetter,
  deleteProperty: proxyDeleter
};
const react = function(observer, object, father, key) {
  if (!isObject(object)) {
    return object;
  }
  if (hasObserver(object)) {
    return object;
  }
  const path = father ? getPath(father) : "";
  if (observer.isIgnore(path)) {
    return object;
  }
  father && (object[Symbol.for(SYMBOL_FATHER)] = father);
  object[Symbol.for(SYMBOL_OB)] = observer;
  for (const key2 in object) {
    const tempPath = extendPath(path, key2);
    if (observer.isIgnore(tempPath)) {
      continue;
    }
    if (isObject(object[key2])) {
      if (isArray(object[key2])) {
        const rawArray = object[key2];
        object[key2] = react(
          observer,
          object[key2],
          object
        );
        cacheArray(rawArray);
      } else {
        object[key2] = react(
          observer,
          object[key2],
          object
        );
      }
      object[key2][Symbol.for(SYMBOL_KEY)] = key2;
    }
  }
  if (key) {
    object[Symbol.for(SYMBOL_KEY)] = key;
  }
  const proxy = new Proxy(object, handler);
  return proxy;
};
class Observer extends Subject {
  constructor(object, ignore) {
    super();
    __publicField(this, "ignore", {});
    __publicField(this, "target");
    if (ignore) {
      this.ignore = ignore;
    } else {
      this.ignore = Object.assign(
        { meta: true, alias: true },
        globalOption.proxy.ignore || {}
      );
    }
    this.target = react(this, object);
  }
  isIgnore(path) {
    let ignore = this.ignore;
    for (const key of path.split(".")) {
      if (ignore[key] === void 0) {
        return false;
      }
      if (typeof ignore[key] === "boolean" && ignore[key]) {
        return true;
      } else {
        ignore = ignore[key];
      }
    }
    return false;
  }
  setIgnore(ignore) {
    this.ignore = ignore;
  }
  mergeIgnore(ignore) {
    this.ignore = Object.assign(this.ignore, ignore);
  }
}
const observable = function(object, ignore) {
  const observer = new Observer(object, ignore);
  return observer.target;
};
class Processor {
  constructor(options) {
    __publicField(this, "type");
    __publicField(this, "config");
    __publicField(this, "commands");
    __publicField(this, "create");
    __publicField(this, "dispose");
    this.type = options.type;
    this.commands = options.commands;
    this.create = options.create;
    this.dispose = options.dispose;
    this.config = () => {
      const c = options.config();
      c.type = this.type;
      return c;
    };
    CONFIGTYPE[this.type.toLocaleUpperCase()] = this.type;
    CONFIGFACTORY[this.type] = this.config;
  }
  process(params) {
    if (!this.commands || !this.commands[params.operate]) {
      this[params.operate](params);
      return;
    }
    let commands = this.commands[params.operate];
    for (const key of [].concat(params.path, params.key)) {
      if (!commands[key] && !commands.$reg) {
        this[params.operate](params);
        return;
      } else if (commands[key]) {
        if (typeof commands[key] === "function") {
          commands[key](params);
          return;
        } else {
          commands = commands[key];
        }
      } else if (commands.$reg) {
        for (const item of commands.$reg) {
          if (item.reg.test(key)) {
            item.handler(params);
            return;
          }
        }
      }
    }
    this[params.operate](params);
  }
  add(params) {
    let target = params.target;
    const path = params.path;
    for (const key of path) {
      if (typeof target[key] !== void 0) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default add operate.`, params);
        return;
      }
    }
    target[params.key] = params.value;
  }
  set(params) {
    let target = params.target;
    const path = params.path;
    for (const key of path) {
      if (typeof target[key] !== void 0) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default set operate.`, params);
        return;
      }
    }
    target[params.key] = params.value;
  }
  delete(params) {
    let target = params.target;
    const path = params.path;
    for (const key of path) {
      if (typeof target[key] !== void 0) {
        target = target[key];
      } else {
        console.warn(`processor can not exec default delete operate.`, params);
        return;
      }
    }
    delete target[params.key];
  }
  expand(commands) {
    const assignCommands = function(oldCommand, newCommand) {
      for (const key in newCommand) {
        if (isObject(newCommand[key]) && isObject(oldCommand[key])) {
          assignCommands(oldCommand[key], newCommand[key]);
        } else if (isObject(newCommand[key]) && !oldCommand[key] || !isObject(newCommand[key]) && !oldCommand[key]) {
          oldCommand[key] = newCommand[key];
        }
      }
    };
    if (!this.commands) {
      this.commands = {};
    }
    assignCommands(this.commands, commands);
    return this;
  }
}
const defineProcessor = (options) => {
  return new Processor(options);
};
const Rule = (input, compiler, validateFun = validate) => {
  const { operate, key, path, value } = input;
  let vid = key;
  const tempPath = path.split(".");
  if (tempPath.length) {
    vid = tempPath.shift();
  }
  if (!validateFun(vid)) {
    console.warn(`${compiler.MODULE} Rule: vid is illeage: ${vid}`);
    return;
  }
  if (operate === "add" && !tempPath.length && vid === key) {
    compiler.add(value);
    return;
  }
  if (input.operate === "delete" && !tempPath.length) {
    compiler.remove(value);
    return;
  }
  if (input.operate === "set" && !tempPath.length && key === vid) {
    compiler.cover(value);
    return;
  }
  compiler.compile(vid, { operate, key, path: tempPath, value });
};
const getSymbolConfig = function() {
  return {
    vid: "",
    type: "",
    name: "",
    alias: "",
    meta: {}
  };
};
const uniqueSymbol = function(type) {
  return `DEFUALT-${type}`;
};
const emptyHandler = function() {
};
class CompilerManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "compilerMap", /* @__PURE__ */ new Map());
  }
  extend(compiler, focus = false) {
    if (this.compilerMap.has(compiler.MODULE)) {
      console.warn("compiler manager has exist this compiler", compiler);
      if (focus) {
        this.compilerMap.set(compiler.MODULE, compiler);
      }
    } else {
      this.compilerMap.set(compiler.MODULE, compiler);
    }
  }
  getCompiler(module) {
    if (this.compilerMap.has(module)) {
      return this.compilerMap.get(module);
    } else {
      console.warn(`can not found this type in compiler manager: ${module}`);
      return null;
    }
  }
  getObjectSymbol(object) {
    for (const compiler of this.compilerMap.values()) {
      const vid = compiler.getObjectSymbol(object);
      if (vid) {
        return vid;
      }
    }
    return null;
  }
  getObjectBySymbol(vid) {
    for (const compiler of this.compilerMap.values()) {
      const object = compiler.getObjectBySymbol(vid);
      if (object) {
        return object;
      }
    }
    return null;
  }
  getObjectfromModule(module, vid) {
    if (!this.compilerMap.has(module)) {
      console.warn(`compiler manager can not found this module: ${module}`);
      return null;
    }
    const compiler = this.compilerMap.get(module);
    return compiler.map.get(vid) || null;
  }
  getObjectfromModules(modules, vid) {
    if (!Array.isArray(modules)) {
      modules = Object.keys(modules);
    }
    for (const module of modules) {
      if (!this.compilerMap.has(module)) {
        console.warn(`compiler manager can not found this module: ${module}`);
        continue;
      }
      const compiler = this.compilerMap.get(module);
      if (compiler.map.has(vid)) {
        return compiler.map.get(vid);
      }
    }
    return null;
  }
  dispose() {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose();
    }
    this.compilerMap.clear();
    return this;
  }
}
const COMPILER_MANAGER_PLUGIN = "CompilerManagerPlugin";
const CompilerManagerPlugin = function() {
  return {
    name: COMPILER_MANAGER_PLUGIN,
    install(engine) {
      const compilerManager = new CompilerManager();
      engine.compilerManager = compilerManager;
      engine.getObjectSymbol = function(object) {
        return compilerManager.getObjectSymbol(object);
      };
      engine.getObjectBySymbol = function(vid) {
        return compilerManager.getObjectBySymbol(vid);
      };
      engine.getObjectfromModule = function(module, vid) {
        return compilerManager.getObjectfromModule(module, vid);
      };
      engine.getObjectfromModules = function(modules, vid) {
        return compilerManager.getObjectfromModules(modules, vid);
      };
      engine.getObject3D = function(vid) {
        return compilerManager.getObjectfromModules(
          OBJECTMODULE,
          vid
        );
      };
    },
    dispose(engine) {
      engine.compilerManager.dispose();
      delete engine.compilerManager;
      delete engine.getObjectSymbol;
      delete engine.getObjectBySymbol;
      delete engine.getObjectfromModule;
      delete engine.getObjectfromModules;
      delete engine.getObject3D;
    }
  };
};
class DataSupportManager extends EventDispatcher {
  constructor() {
    super();
    __publicField(this, "dataSupportMap", /* @__PURE__ */ new Map());
  }
  extend(dataSupport, focus = false) {
    if (this.dataSupportMap.has(dataSupport.MODULE)) {
      console.warn(
        "dataSupport manager has exist this dataSupport",
        dataSupport
      );
      if (focus) {
        this.dataSupportMap.set(dataSupport.MODULE, dataSupport);
      }
    } else {
      this.dataSupportMap.set(dataSupport.MODULE, dataSupport);
    }
  }
  getDataSupport(type) {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type);
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }
  getConfigBySymbol(vid) {
    const dataSupportList = this.dataSupportMap.values();
    for (const dataSupport of dataSupportList) {
      const config = dataSupport.getConfig(vid);
      if (config) {
        return config;
      }
    }
    return null;
  }
  removeConfigBySymbol(...vids) {
    for (const vid of vids) {
      for (const dataSupport of this.dataSupportMap.values()) {
        if (dataSupport.existSymbol(vid)) {
          dataSupport.removeConfig(vid);
          break;
        }
      }
    }
    return this;
  }
  getModuleBySymbol(vid) {
    const dataSupportList = this.dataSupportMap.values();
    for (const dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        return dataSupport.MODULE;
      }
    }
    return null;
  }
  applyConfig(...configs) {
    for (const config of configs) {
      const module = getModule(config.type);
      if (module) {
        this.dataSupportMap.get(module).addConfig(config);
      } else {
        console.warn(
          `dataSupportManager can not found this config module: ${config.type}`
        );
      }
    }
    return this;
  }
  load(config) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.load(config[module]);
    });
    return this;
  }
  loadByModule(config, module) {
    const dataSupport = this.dataSupportMap.get(module);
    if (!dataSupport) {
      console.warn(`DataSupportManager can not support this module: ${module}`);
      return this;
    }
    dataSupport.load(config);
    return this;
  }
  remove(config) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.remove(config[module]);
    });
    return this;
  }
  toJSON(extendsConfig = {}, compress = true) {
    return JSON.stringify(
      this.exportConfig(extendsConfig, compress),
      stringify
    );
  }
  exportConfig(extendsConfig = {}, compress = true) {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      extendsConfig[module] = dataSupport.exportConfig(compress);
    });
    return extendsConfig;
  }
}
const DATA_SUPPORT_MANAGER_PLUGIN = "DataSupportManagerPlugin";
const DataSupportManagerPlugin = function() {
  return {
    name: DATA_SUPPORT_MANAGER_PLUGIN,
    install(engine) {
      const dataSupportManager = new DataSupportManager();
      engine.dataSupportManager = dataSupportManager;
      engine.applyConfig = function(...config) {
        dataSupportManager.applyConfig(...config);
        return engine;
      };
      engine.getConfigBySymbol = function(vid) {
        return dataSupportManager.getConfigBySymbol(vid);
      };
      engine.removeConfigBySymbol = function(...vids) {
        dataSupportManager.removeConfigBySymbol(...vids);
        return engine;
      };
      engine.toJSON = function() {
        return dataSupportManager.toJSON();
      };
      engine.exportConfig = function() {
        return dataSupportManager.exportConfig();
      };
    },
    dispose(engine) {
      delete engine.dataSupportManager;
      delete engine.applyConfig;
      delete engine.getConfigBySymbol;
      delete engine.removeConfigBySymbol;
      delete engine.toJSON;
      delete engine.exportConfig;
    }
  };
};
class Parser {
}
class DefaultParser extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "selector", (url, resource, parseMap) => {
      return parseMap.get(DefaultParser) || null;
    });
  }
  parse({ url, resource, configMap, resourceMap }) {
    resourceMap.set(url, resource);
  }
}
var RESOURCE_EVENT = /* @__PURE__ */ ((RESOURCE_EVENT2) => {
  RESOURCE_EVENT2["MAPPED"] = "mapped";
  return RESOURCE_EVENT2;
})(RESOURCE_EVENT || {});
class ResourceManager extends EventDispatcher {
  constructor(resources = {}) {
    super();
    __publicField(this, "configMap", /* @__PURE__ */ new Map());
    __publicField(this, "resourceMap", /* @__PURE__ */ new Map());
    __publicField(this, "paserMap", /* @__PURE__ */ new Map());
    __publicField(this, "defalutParser", new DefaultParser());
    const map = /* @__PURE__ */ new Map();
    for (const key in resources) {
      if (map.has(key)) {
        console.warn(
          `resourceManager construct params rescource already exist: ${key}, that will be cover.`
        );
      }
      map.set(key, resources[key]);
    }
    this.mappingResource(map);
  }
  addParser(parser) {
    if (this.paserMap.has(parser.constructor)) {
      return this;
    }
    this.paserMap.set(parser.constructor, parser);
    return this;
  }
  mappingResource(loadResourceMap, options) {
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    const parserList = [...this.paserMap.values()];
    const resourceConfig = {};
    for (const [url, resource] of loadResourceMap.entries()) {
      if ((options == null ? void 0 : options.parser) && options.parser[url]) {
        options.parser[url].parse({
          url,
          resource,
          configMap,
          resourceMap
        });
        continue;
      }
      if ((options == null ? void 0 : options.selector) && options.selector[url]) {
        const parser2 = options.selector[url](url, resource, this.paserMap);
        if (!parser2) {
          console.warn(
            `resource manager hanlder can not found this resource parser: `,
            resource,
            options.selector[url]
          );
          continue;
        }
        parser2.parse({
          url,
          resource,
          configMap,
          resourceMap
        });
        resourceConfig[url] = this.getResourceConfig(url);
        continue;
      }
      let parser = null;
      for (const TParser of parserList) {
        parser = TParser.selector(url, resource, this.paserMap);
        if (parser) {
          break;
        }
      }
      if (!parser) {
        console.warn(
          `resouce manager can not found some handler to parser this resource, that will use default parser do it:`,
          resource
        );
        this.defalutParser.parse({
          url,
          resource,
          configMap,
          resourceMap
        });
        continue;
      }
      parser.parse({
        url,
        resource,
        configMap,
        resourceMap
      });
      resourceConfig[url] = this.getResourceConfig(url);
    }
    this.dispatchEvent({
      type: "mapped",
      configMap,
      resourceMap,
      resourceConfig
    });
    return this;
  }
  getResourceConfig(url) {
    const configMap = this.configMap;
    const loadOptions = {};
    [...configMap.keys()].filter((key) => key.startsWith(url)).forEach((url2) => {
      const config = configMap.get(url2);
      if (!config) {
        console.error(`unknow error: can not found config by url: ${url2}`);
      } else {
        const module = getModule(config.type);
        if (!module) {
          console.error(
            `unknow error: can not found module by type: ${config.type}`,
            config
          );
        } else {
          !loadOptions[module] && (loadOptions[module] = []);
          loadOptions[module].push(config);
        }
      }
    });
    return loadOptions;
  }
  hasResource(url) {
    return this.resourceMap.has(url);
  }
  remove(url) {
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;
    [...configMap.keys()].filter((key) => key.startsWith(url)).forEach((url2) => {
      configMap.delete(url2);
      const resource = resourceMap.get(url2);
      resource.dispose && resource.dispose();
      resourceMap.delete(url2);
    });
    return this;
  }
  dispose() {
    this.resourceMap.forEach((object, url) => {
      object.dispose && object.dispose();
    });
    this.resourceMap.clear();
    this.configMap.clear();
  }
}
const RESOURCE_MANAGER_PLUGIN = "ResourceManagerPlugin";
const ResourceManagerPlugin = function(params = {}) {
  return {
    name: RESOURCE_MANAGER_PLUGIN,
    install(engine) {
      const resourceManager = new ResourceManager(params.resources);
      engine.resourceManager = resourceManager;
      engine.registerResources = (resourceMap) => {
        const map = /* @__PURE__ */ new Map();
        Object.keys(resourceMap).forEach((key) => {
          map.set(key, resourceMap[key]);
        });
        resourceManager.mappingResource(map);
        return engine;
      };
    },
    dispose(engine) {
      engine.addEventListener(ENGINE_EVENT.DISPOSE, () => {
        engine.resourceManager.dispose();
      });
    }
  };
};
const LOADER_DATA_SUPPORT_STRATEGY = "LoaderDataSupportStrategy";
const LoaderDataSupportStrategy = function() {
  let cacheToJSON;
  let cacheExportConfig;
  return {
    name: LOADER_DATA_SUPPORT_STRATEGY,
    condition: [DATA_SUPPORT_MANAGER_PLUGIN, LOADER_MANAGER_PLUGIN],
    exec(engine) {
      cacheToJSON = engine.toJSON;
      engine.toJSON = function() {
        const assets = {
          assets: JSON.parse(engine.loaderManager.toJSON())
        };
        return engine.dataSupportManager.toJSON(assets);
      };
      cacheExportConfig = engine.exportConfig;
      engine.exportConfig = function() {
        let extendConfig = {};
        extendConfig = {
          assets: engine.loaderManager.exportConfig()
        };
        return engine.dataSupportManager.exportConfig(extendConfig);
      };
    },
    rollback(engine) {
      engine.toJSON = cacheToJSON;
      engine.exportConfig = cacheExportConfig;
    }
  };
};
const LOADER_MAPPING_STRATEGY = "LoaderMappingStrategy";
const LoaderMappingStrategy = function() {
  let cacheLoadResources;
  let cacheAsync;
  return {
    name: LOADER_MAPPING_STRATEGY,
    condition: [RESOURCE_MANAGER_PLUGIN, LOADER_MANAGER_PLUGIN],
    exec(engine) {
      cacheLoadResources = engine.loadResources;
      engine.loadResources = (urlList, callback) => {
        const lodedFun = (event) => {
          callback(void 0, event);
          engine.resourceManager.removeEventListener(
            LOADER_EVENT.LOADED,
            lodedFun
          );
        };
        try {
          engine.resourceManager.addEventListener(
            LOADER_EVENT.LOADED,
            lodedFun
          );
        } catch (error) {
          callback(error);
        }
        engine.loaderManager.reset().load(urlList);
        return engine;
      };
      cacheAsync = engine.loadResourcesAsync;
      engine.loadResourcesAsync = (urlList) => {
        return new Promise((resolve, reject) => {
          try {
            engine.loaderManager.once(
              LOADER_EVENT.LOADED,
              (e) => {
                engine.resourceManager.once(
                  RESOURCE_EVENT.MAPPED,
                  (event) => {
                    resolve(event);
                  }
                );
                const map = /* @__PURE__ */ new Map();
                urlList.forEach((unit) => {
                  if (typeof unit === "string") {
                    map.set(unit, e.resourceMap.get(unit));
                  } else {
                    map.set(unit.url, e.resourceMap.get(unit.url));
                  }
                });
                engine.resourceManager.mappingResource(map);
              }
            );
          } catch (error) {
            reject(error);
          }
          engine.loaderManager.reset().load(urlList);
        });
      };
    },
    rollback(engine) {
      engine.loadResources = cacheLoadResources;
      engine.loadResourcesAsync = cacheAsync;
    }
  };
};
const COMPILER_SUPPORT_STRATEGY = "CompilerSupportStrategy";
const CompilerSupportStrategy = function() {
  return {
    name: COMPILER_SUPPORT_STRATEGY,
    condition: [COMPILER_MANAGER_PLUGIN, DATA_SUPPORT_MANAGER_PLUGIN],
    exec(engine) {
      engine.compilerManager.compilerMap.forEach((compiler, module) => {
        var _a;
        compiler.useEngine(engine);
        (_a = engine.dataSupportManager.dataSupportMap.get(module)) == null ? void 0 : _a.addCompiler(compiler);
      });
    },
    rollback() {
    }
  };
};
var SUPPORT_LIFE_CYCLE = /* @__PURE__ */ ((SUPPORT_LIFE_CYCLE2) => {
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["ZERO"] = 0] = "ZERO";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["ONE"] = 100] = "ONE";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["TWO"] = 200] = "TWO";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["THREE"] = 300] = "THREE";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["FOUR"] = 400] = "FOUR";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["FIVE"] = 500] = "FIVE";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["SIX"] = 600] = "SIX";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["SEVEN"] = 700] = "SEVEN";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["EIGHT"] = 800] = "EIGHT";
  SUPPORT_LIFE_CYCLE2[SUPPORT_LIFE_CYCLE2["NINE"] = 900] = "NINE";
  return SUPPORT_LIFE_CYCLE2;
})(SUPPORT_LIFE_CYCLE || {});
class EngineSupport extends Engine {
  constructor(params = {}) {
    super();
    __publicField(this, "moduleLifeCycle", []);
    __publicField(this, "moduleTriggers", [globalObjectModuleTrigger]);
    __publicField(this, "processorExpands", []);
    this.install(LoaderManagerPlugin(params.LoaderManagerPlugin)).install(PointerManagerPlugin(params.PointerManagerPlugin)).install(EventManagerPlugin(params.EventManagerPlugin)).install(RenderManagerPlugin(params.RenderManagerPlugin)).install(ResourceManagerPlugin(params.ResourceManagerPlugin)).install(DataSupportManagerPlugin(params.DataSupportManagerPlugin)).install(CompilerManagerPlugin(params.CompilerManagerPlugin));
    this.exec(LoaderDataSupportStrategy()).exec(LoaderMappingStrategy()).exec(CompilerSupportStrategy());
  }
  loadLifeCycle(config) {
    const dataSupportManager = this.dataSupportManager;
    const moduleTriggers = this.moduleTriggers;
    const loadCycle = this.moduleLifeCycle.sort((a, b) => a.order - b.order);
    for (const { module } of loadCycle) {
      config[module] && dataSupportManager.loadByModule(config[module], module);
      for (const trigger of moduleTriggers) {
        trigger.updateCondition(module);
        if (trigger.test()) {
          trigger.trig();
        }
      }
    }
  }
  removeLifeCycle(config) {
    const dataSupportManager = this.dataSupportManager;
    const removeCycle = this.moduleLifeCycle.sort((a, b) => b.order - a.order);
    for (const { module } of removeCycle) {
      config[module] && dataSupportManager.remove({ [module]: config[module] });
    }
    const assets = config.assets || [];
    const resourceManager = this.resourceManager;
    const loaderManager = this.loaderManager;
    assets.forEach((url) => {
      resourceManager.remove(url);
      loaderManager.remove(url);
    });
  }
  loadConfig(config, callback) {
    const renderFlag = this.renderManager.hasRendering();
    if (renderFlag) {
      this.renderManager.stop();
    }
    if (config.assets && config.assets.length) {
      const mappedFun = (event) => {
        delete config.assets;
        this.loadLifeCycle(config);
        this.resourceManager.removeEventListener("mapped", mappedFun);
        callback && callback(event);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
      };
      this.resourceManager.addEventListener("mapped", mappedFun);
      this.loaderManager.reset().load(config.assets);
    } else {
      this.loadLifeCycle(config);
      callback && callback();
      if (renderFlag) {
        this.renderManager.play();
      } else {
        this.renderManager.render();
      }
    }
    return this;
  }
  loadConfigAsync(config, pretreat) {
    return new Promise((resolve, reject) => {
      const renderFlag = this.renderManager.hasRendering();
      if (renderFlag) {
        this.renderManager.stop();
      }
      if (config.assets && config.assets.length) {
        this.loadResourcesAsync(config.assets).then((event) => {
          delete config.assets;
          this.loadLifeCycle(config);
          if (renderFlag) {
            this.renderManager.play();
          } else {
            this.renderManager.render();
          }
          resolve(event);
        });
      } else {
        this.loadLifeCycle(config);
        if (renderFlag) {
          this.renderManager.play();
        } else {
          this.renderManager.render();
        }
        resolve({
          type: RESOURCE_EVENT.MAPPED,
          configMap: this.resourceManager.configMap,
          resourceMap: this.resourceManager.resourceMap,
          resourceConfig: {}
        });
      }
    });
  }
  removeConfig(config) {
    this.removeLifeCycle(config);
  }
  getObjectConfig(object) {
    const symbol = this.getObjectSymbol(object);
    if (symbol) {
      return this.getConfigBySymbol(symbol);
    } else {
      return null;
    }
  }
  registModule(options) {
    if (MODULETYPE[options.type.toLocaleUpperCase()]) {
      console.warn(`module ${options.type} is already exist.`);
      return this;
    }
    MODULETYPE[options.type.toLocaleUpperCase()] = options.type;
    if (options.object) {
      OBJECTMODULE[options.type] = true;
    }
    const DataSupportClass = DataSupportFactory(options.type, options.rule);
    const CompilerClass = CompilerFactory(
      options.type,
      options.compiler,
      options.processors
    );
    for (const processor of options.processors) {
      installProcessor(processor, options.type);
    }
    const compiler = new CompilerClass();
    const dataSupport = new DataSupportClass([]);
    this.dataSupportManager.extend(dataSupport);
    this.compilerManager.extend(compiler);
    compiler.useEngine(this);
    dataSupport.addCompiler(compiler);
    if (options.extend) {
      options.extend(this);
    }
    options.processors.forEach((processor) => {
    });
    if (options.expand) {
      this.processorExpands.push(...options.expand);
    }
    for (const config of this.processorExpands) {
      if (Array.isArray(config.processors)) {
        Object.values(ProcessorMembers).forEach((processor) => {
          if (config.processors.includes(processor.type)) {
            processor.expand(config.command);
          }
        });
      } else {
        Object.values(ProcessorMembers).forEach((processor) => {
          if (config.processors.test(processor.type)) {
            processor.expand(config.command);
          }
        });
      }
    }
    this.moduleLifeCycle.push({
      module: options.type,
      order: options.lifeOrder || 0
    });
    this.moduleTriggers.forEach((trigger) => {
      trigger.registerModule(options.type);
    });
    return this;
  }
}
const defineEngineSupport = function(options, params = {}) {
  const engine = new EngineSupport(params);
  if (options.modules) {
    options.modules.forEach((module) => {
      engine.registModule(module);
    });
  }
  if (options.plugins) {
    options.plugins.forEach((plugin) => {
      engine.install(plugin);
    });
  }
  if (options.strategy) {
    options.strategy.forEach((strategy) => {
      engine.exec(strategy);
    });
  }
  return engine;
};
const _AniScriptGeneratorManager = class {
  static generateConfig(name, merge) {
    if (!_AniScriptGeneratorManager.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return {
        name: ""
      };
    }
    const recursion = (config, merge2) => {
      for (const key in merge2) {
        if (config[key] === void 0) {
          continue;
        }
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config[key], merge2[key]);
        } else {
          config[key] = merge2[key];
        }
      }
    };
    const template2 = JSON.parse(
      JSON.stringify(_AniScriptGeneratorManager.configLibrary.get(name))
    );
    recursion(template2, merge);
    return template2;
  }
  static generateScript(engine, target, attribute, config) {
    if (!_AniScriptGeneratorManager.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {
      };
    }
    return _AniScriptGeneratorManager.generatorLibrary.get(config.name)(
      engine,
      target,
      attribute,
      config
    );
  }
  static has(name) {
    return _AniScriptGeneratorManager.configLibrary.has(name);
  }
};
let AniScriptGeneratorManager = _AniScriptGeneratorManager;
__publicField(AniScriptGeneratorManager, "configLibrary", /* @__PURE__ */ new Map());
__publicField(AniScriptGeneratorManager, "generatorLibrary", /* @__PURE__ */ new Map());
__publicField(AniScriptGeneratorManager, "register", function({
  config,
  generator
}) {
  if (_AniScriptGeneratorManager.configLibrary.has(config.name)) {
    console.warn(
      `EventLibrary has already exist this event generator: ${config.name}, that will be cover.`
    );
    return _AniScriptGeneratorManager;
  }
  _AniScriptGeneratorManager.configLibrary.set(
    config.name,
    JSON.parse(JSON.stringify(config))
  );
  _AniScriptGeneratorManager.generatorLibrary.set(config.name, generator);
  return _AniScriptGeneratorManager;
});
const _EventGeneratorManager = class {
  static generateConfig(name, merge) {
    if (!_EventGeneratorManager.configLibrary.has(name)) {
      console.warn(`event library can not found config by name: ${name}`);
      return {
        name: ""
      };
    }
    const recursion = (config, merge2) => {
      for (const key in merge2) {
        if (typeof merge2[key] === "object" && merge2[key] !== null && !Array.isArray(merge2[key])) {
          recursion(config[key], merge2[key]);
        } else {
          config[key] = merge2[key];
        }
      }
    };
    const template2 = JSON.parse(
      JSON.stringify(_EventGeneratorManager.configLibrary.get(name))
    );
    recursion(template2, merge);
    return template2;
  }
  static generateEvent(config, engine) {
    if (!_EventGeneratorManager.generatorLibrary.has(config.name)) {
      console.error(
        `event library can not found generator by name: ${config.name}`
      );
      return () => {
      };
    }
    return _EventGeneratorManager.generatorLibrary.get(config.name)(
      engine,
      config
    );
  }
  static has(name) {
    return _EventGeneratorManager.configLibrary.has(name);
  }
};
let EventGeneratorManager = _EventGeneratorManager;
__publicField(EventGeneratorManager, "configLibrary", /* @__PURE__ */ new Map());
__publicField(EventGeneratorManager, "generatorLibrary", /* @__PURE__ */ new Map());
__publicField(EventGeneratorManager, "register", function({
  config,
  generator
}) {
  if (_EventGeneratorManager.configLibrary.has(config.name)) {
    console.warn(
      `EventGeneratorManager has already exist this event generator: ${config.name}, that will be cover.`
    );
    return _EventGeneratorManager;
  }
  _EventGeneratorManager.configLibrary.set(
    config.name,
    JSON.parse(JSON.stringify(config))
  );
  _EventGeneratorManager.generatorLibrary.set(config.name, generator);
  return _EventGeneratorManager;
});
const _ShaderGeneratorManager = class {
  static getShader(name) {
    if (!_ShaderGeneratorManager.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return null;
    }
    return _ShaderGeneratorManager.cloneShader(
      _ShaderGeneratorManager.library.get(name)
    );
  }
  static generateConfig(name, uniforms) {
    if (!_ShaderGeneratorManager.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return { shader: name, uniforms: {} };
    }
    const shader = _ShaderGeneratorManager.library.get(name);
    const config = {
      shader: name,
      uniforms: {}
    };
    shader.uniforms && (config.uniforms = JSON.parse(JSON.stringify(shader.uniforms)));
    if (uniforms) {
      const recursion = (config2, merge) => {
        for (const key in merge) {
          if (config2[key] === void 0) {
            continue;
          }
          if (typeof merge[key] === "object" && merge[key] !== null && !Array.isArray(merge[key])) {
            if (config2[key] === null) {
              config2[key] = { ...merge[key] };
            }
            recursion(config2[key], merge[key]);
          } else {
            config2[key] = merge[key];
          }
        }
      };
      recursion(config.uniforms, uniforms);
    }
    return config;
  }
  static cloneShader(shader) {
    const newShader = {
      name: shader.name
    };
    shader.vertexShader && (newShader.vertexShader = shader.vertexShader);
    shader.fragmentShader && (newShader.fragmentShader = shader.fragmentShader);
    shader.uniforms && (newShader.uniforms = JSON.parse(JSON.stringify(shader.uniforms)));
    return newShader;
  }
};
let ShaderGeneratorManager = _ShaderGeneratorManager;
__publicField(ShaderGeneratorManager, "library", /* @__PURE__ */ new Map());
__publicField(ShaderGeneratorManager, "register", function(shader) {
  if (_ShaderGeneratorManager.library.has(shader.name)) {
    console.warn(
      `shader library has exist shader: ${shader.name} that will be cover.`
    );
  }
  _ShaderGeneratorManager.library.set(shader.name, shader);
});
const PLUGINS = [COMPILER_MANAGER_PLUGIN, DATA_SUPPORT_MANAGER_PLUGIN];
export { AniScriptGeneratorManager, AntiShake, Bus$1 as Bus, COMPILER_EVENT, COMPILER_MANAGER_PLUGIN, COMPILER_SUPPORT_STRATEGY, CONFIGFACTORY, CONFIGMODULE, CONFIGTYPE, Compiler, CompilerFactory, CompilerManager, CompilerManagerPlugin, CompilerSupportStrategy, DATA_SUPPORT_MANAGER_PLUGIN, DataContainer, DataSupport, DataSupportFactory, DataSupportManager, DataSupportManagerPlugin, DefaultParser, EngineSupport, EventGeneratorManager, JSONHandler$1 as JSONHandler, LOADER_DATA_SUPPORT_STRATEGY, LOADER_MAPPING_STRATEGY, LoaderDataSupportStrategy, LoaderMappingStrategy, MODULETYPE, ModuleTrigger, OBJECTMODULE, ObjectModuleTrigger, PLUGINS, Parser, Processor, ProcessorMembers, RESOURCE_EVENT, RESOURCE_MANAGER_PLUGIN, ResourceManager, ResourceManagerPlugin, Rule, SUPPORT_LIFE_CYCLE, ShaderGeneratorManager, template$1 as Template, Translater, createSymbol, defineEngineSupport, defineOption, defineProcessor, emptyHandler, generateConfig, getModule, getObserver, getSymbolConfig, globalAntiShake, globalObjectModuleTrigger, globalOption, installProcessor, isObjectModule, isObjectType, observable, uniqueSymbol };
