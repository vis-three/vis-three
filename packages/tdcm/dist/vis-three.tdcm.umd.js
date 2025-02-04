(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("@vis-three/utils"), require("@vis-three/core"), require("rxjs"), require("nanoid"), require("@vis-three/plugin-loader-manager"), require("@vis-three/plugin-pointer-manager"), require("@vis-three/plugin-event-manager"), require("@vis-three/plugin-render-manager")) : typeof define === "function" && define.amd ? define(["exports", "@vis-three/utils", "@vis-three/core", "rxjs", "nanoid", "@vis-three/plugin-loader-manager", "@vis-three/plugin-pointer-manager", "@vis-three/plugin-event-manager", "@vis-three/plugin-render-manager"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory((global["vis-three"] = global["vis-three"] || {}, global["vis-three"].tdcm = {}), global.utils, global.core, global.rxjs, global.nanoid, global.pluginLoaderManager, global.pluginPointerManager, global.pluginEventManager, global.pluginRenderManager));
})(this, function(exports2, utils, core, rxjs, nanoid, pluginLoaderManager, pluginPointerManager, pluginEventManager, pluginRenderManager) {
  "use strict";
  const camelize = function(str) {
    str = str.replace(/[\-_\s]+(.)?/g, function(match, chr) {
      return chr ? chr.toUpperCase() : "";
    });
    return str.slice(0, 1).toLowerCase() + str.slice(1);
  };
  const emunCamelize = function(str) {
    return camelize(str).toUpperCase();
  };
  const emunDecamelize = function(str) {
    const split = /(?=[A-Z])/;
    return str.split(split).map((s) => s.toUpperCase()).join("_");
  };
  const CONFIG_FACTORY = {};
  const CONFIG_MODEL = {};
  const MODULE_TYPE = {};
  const CONFIG_TYPE = {};
  const OBJECT_MODULE = {};
  const CONFIG_MODULE = {};
  const CONFIGFACTORY = CONFIG_FACTORY;
  const MODULETYPE = MODULE_TYPE;
  const CONFIGTYPE = CONFIG_TYPE;
  const OBJECTMODULE = OBJECT_MODULE;
  const CONFIGMODULE = CONFIG_MODULE;
  const getModule = (type) => {
    return CONFIG_MODULE[type] || null;
  };
  const isObjectModule = (module2) => {
    return OBJECT_MODULE[module2];
  };
  const isObjectType = (type) => {
    const module2 = getModule(type);
    if (module2) {
      return isObjectModule(module2);
    } else {
      return false;
    }
  };
  const SYMBOL_FATHER = "vis.father";
  const SYMBOL_KEY = "vis.key";
  const SYMBOL_OB = "vis.observer";
  const SYMBOL_MODEL = "vis.model";
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
    if (array.length && utils.isObject(array[0])) {
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
  const getModel = function(object) {
    return object[Symbol.for(SYMBOL_MODEL)];
  };
  const _AsyncScheduler = class _AsyncScheduler {
    static exec(fun) {
      if (fun(false)) {
        return;
      }
      if (!_AsyncScheduler.list.includes(fun)) {
        _AsyncScheduler.list.push(fun);
      }
      let cacheCount = 0;
      const autoSequential = () => {
        _AsyncScheduler.timer && clearTimeout(_AsyncScheduler.timer);
        _AsyncScheduler.timer = window.setTimeout(() => {
          const nextList = [];
          for (const fun2 of _AsyncScheduler.list) {
            if (!fun2(false)) {
              nextList.push(fun2);
            }
          }
          if (nextList.length) {
            if (nextList.length === cacheCount) {
              for (const fun2 of nextList) {
                fun2(true);
              }
              _AsyncScheduler.list = [];
            } else {
              cacheCount = nextList.length;
              _AsyncScheduler.list = nextList;
              autoSequential();
            }
          } else {
            _AsyncScheduler.list = [];
          }
        }, _AsyncScheduler.time);
      };
      autoSequential();
    }
    static append(fun) {
      if (_AsyncScheduler.list.length && !_AsyncScheduler.list.includes(fun)) {
        _AsyncScheduler.list.push(fun);
      } else {
        _AsyncScheduler.exec(fun);
      }
    }
    static nextTick(fun) {
      window.setTimeout(() => {
        fun();
      }, _AsyncScheduler.time);
    }
  };
  _AsyncScheduler.list = [];
  _AsyncScheduler.time = 0;
  let AsyncScheduler = _AsyncScheduler;
  class Model extends core.EventDispatcher {
    constructor(params) {
      super();
      this.resources = {};
      this.config = params.config;
      this.engine = params.engine;
      this.compiler = params.compiler;
    }
    /**
     * 转化为目标配置
     * @param vid vid标识
     * @returns Config | null
     */
    toConfig(vid) {
      return this.engine.getConfigBySymbol(vid);
    }
    /**
     * 转化为目标模型
     * @param vid vid标识或者 目标对象
     * @returns model | null
     */
    toModel(vid) {
      if (typeof vid === "string") {
        return this.engine.compilerManager.getModelBySymbol(vid);
      } else {
        const symbol = this.engine.getObjectSymbol(vid);
        if (symbol) {
          return this.engine.compilerManager.getModelBySymbol(symbol);
        } else {
          console.warn(`Model: can not found object symbol:`, vid);
          return null;
        }
      }
    }
    /**
     * 转化为目标物体
     * @param vid vid标识
     * @returns object
     */
    toObject(vid) {
      return this.engine.getObjectBySymbol(vid);
    }
    /**
     * 转化为目标物体
     * @param vid vid标识
     * @returns object
     */
    toPuppet(vid) {
      return this.toObject(vid);
    }
    /**
     * 转化为异步执行
     * @param fun 所需要执行的函数方法
     */
    toAsync(fun) {
      AsyncScheduler.exec(fun);
    }
    /**
     * 将函数方法加入到下一个异步队列中
     * @param fun 函数方法
     */
    asyncNextTick(fun) {
      AsyncScheduler.nextTick(fun);
    }
    /**
     * 转化为触发器触发
     * @param name 触发器名称
     * @param fun 需要触发器触发的函数方法
     */
    toTrigger(name, fun) {
      const trigger = this.engine.getTrigger(name);
      if (trigger) {
        trigger.register(fun);
      }
    }
    /**
     * 通用的处理方法
     * @param params 操作通知参数
     * @returns
     */
    process(params) {
      const modelParams = {
        ...params,
        path: params.path ? params.path.split(".") : []
      };
      if (!this.commands || !this.commands[params.operate]) {
        this[params.operate](modelParams);
        return;
      }
      let commands = this.commands[params.operate];
      const keyPath = [].concat(modelParams.path, params.key);
      for (const key of keyPath) {
        if (!commands[key] && !commands.$reg) {
          this[params.operate](modelParams);
          return;
        } else if (commands[key]) {
          if (typeof commands[key] === "function") {
            commands[key].call(this, {
              model: this,
              ctx: this,
              config: this.config,
              target: this.puppet,
              puppet: this.puppet,
              engine: this.engine,
              compiler: this.compiler,
              ...modelParams
            });
            return;
          } else {
            commands = commands[key];
          }
        } else if (commands.$reg) {
          for (const item of commands.$reg) {
            if (item.reg.test(key)) {
              item.handler.call(this, {
                model: this,
                ctx: this,
                config: this.config,
                target: this.puppet,
                puppet: this.puppet,
                engine: this.engine,
                compiler: this.compiler,
                resources: this.resources,
                ...modelParams
              });
              return;
            }
          }
        }
      }
      this[params.operate](modelParams);
    }
    /**
     * 通用的操作添加方法
     * @param params 操作通知参数
     * @returns
     */
    add(params) {
      let target = this.puppet;
      for (const key of params.path) {
        if (typeof target[key] !== void 0) {
          target = target[key];
        } else {
          console.warn(`processor can not exec default add operate.`, params);
          return;
        }
      }
      target[params.key] = params.value;
    }
    /**
     * 通用的操作设置方法
     * @param params 操作通知参数
     * @returns
     */
    set(params) {
      let target = this.puppet;
      for (const key of params.path) {
        if (typeof target[key] !== void 0) {
          target = target[key];
        } else {
          console.warn(`processor can not exec default add operate.`, params);
          return;
        }
      }
      target[params.key] = params.value;
    }
    /**
     * 通用的操作删除方法
     * @param params 操作通知参数
     * @returns
     */
    delete(params) {
      let target = this.puppet;
      for (const key of params.path) {
        if (typeof target[key] !== void 0) {
          target = target[key];
        } else {
          console.warn(`processor can not exec default add operate.`, params);
          return;
        }
      }
      target[params.key] = params.value;
    }
    /**
     * 模型生成方法内部会调用createPuppet
     */
    create() {
      this.config[Symbol.for(SYMBOL_MODEL)] = this;
      this.puppet = this.createPuppet.call(this, {
        model: this,
        config: this.config,
        engine: this.engine,
        compiler: this.compiler,
        resources: this.resources || {}
      });
    }
    /**
     * 模型销毁方法内部会调用disposePuppet
     */
    dispose() {
      this.disposePuppet.call(this, {
        model: this,
        target: this.puppet,
        puppet: this.puppet,
        config: this.config,
        engine: this.engine,
        compiler: this.compiler,
        resources: this.resources || {}
      });
      this.config[Symbol.for(SYMBOL_MODEL)] = void 0;
      this.clear();
    }
  }
  const defineModel = function(option) {
    return option;
  };
  defineModel.extend = function(abstract) {
    const extendFun = function(fun) {
      const option = fun(abstract);
      option.shared = Object.assign({}, abstract.shared, option.shared);
      option.commands = utils.objectDeepMerge(option.commands, abstract.commands);
      const optionContext = option.context;
      const abstractContext = abstract.context;
      option.context = function(params) {
        return Object.assign(
          abstractContext ? abstractContext(
            params
          ) : {},
          optionContext ? optionContext.call(this, params) : {}
        );
      };
      return option;
    };
    extendFun.extend = function(fun) {
      const abstractOption = fun(abstract);
      abstractOption.shared = Object.assign(
        {},
        abstract.shared,
        abstractOption.shared
      );
      abstractOption.commands = utils.objectDeepMerge(
        abstractOption.commands,
        abstract.commands
      );
      const abstractContext = abstract.context;
      const abstractOptionContext = abstractOption.context;
      abstractOption.context = function(params) {
        return Object.assign(
          abstractContext ? abstractContext(
            params
          ) : {},
          abstractOptionContext ? abstractOptionContext.call(this, params) : {}
        );
      };
      return defineModel.extend(abstractOption);
    };
    return extendFun;
  };
  defineModel.expand = function(expandOption) {
    return expandOption;
  };
  const defineProcessor = defineModel;
  var MODEL_EVENT = /* @__PURE__ */ ((MODEL_EVENT2) => {
    MODEL_EVENT2["COMPILED_ADD"] = "compiledAdd";
    MODEL_EVENT2["COMPILED_REMOVE"] = "compiledRemove";
    MODEL_EVENT2["COMPILED_ATTR"] = "compiledAttr";
    MODEL_EVENT2["COMPILED_UPDATE"] = "compiledUpdate";
    MODEL_EVENT2["COMPILED"] = "compiled";
    MODEL_EVENT2["NOTICED"] = "noticed";
    return MODEL_EVENT2;
  })(MODEL_EVENT || {});
  class Compiler {
    constructor(params) {
      this.MODULE = "";
      this.builders = /* @__PURE__ */ new Map();
      this.target = {};
      this.map = /* @__PURE__ */ new Map();
      this.symbolMap = /* @__PURE__ */ new WeakMap();
      this.MODULE = params.module;
      for (const option of params.models) {
        this.useModel(option);
      }
    }
    /**
     * @deprecated
     * @returns
     */
    getMap() {
      return null;
    }
    /**
     * 使用引擎
     * @param engine 继承于EngineSupport的engine
     * @returns this
     */
    useEngine(engine) {
      this.engine = engine;
      return this;
    }
    /**
     * 设置配置化编译目标
     * @param target 配置化编译对象结构
     * @returns this
     */
    setTarget(target) {
      this.target = target;
      return this;
    }
    /**
     * 编译操作添加
     * @param config 添加的配置
     * @returns 该配置对应的模型puppet或者空
     */
    add(config) {
      if (!this.builders.has(config.type)) {
        console.warn(
          `${this.MODULE} Compiler: can not support this type: ${config.type}`
        );
        return null;
      }
      const { option, Builder } = this.builders.get(config.type);
      const model = Builder ? new Builder({ config, engine: this.engine, compiler: this }) : new Model({
        config,
        engine: this.engine,
        compiler: this
      });
      if (option.resources) {
        model.resources = {};
        const engine = this.engine;
        for (const key in option.resources) {
          model.resources[key] = engine.loaderManager.getResource(
            typeof option.resources[key] === "object" ? option.resources[key].url : option.resources[key]
          );
        }
      }
      if (option.context) {
        Object.assign(model, option.context({ model }));
      }
      model.createPuppet = option.create;
      model.disposePuppet = option.dispose;
      model.commands = option.commands;
      model.create();
      this.map.set(config.vid, model);
      this.symbolMap.set(model.puppet, config.vid);
      model.emit(MODEL_EVENT.COMPILED_ADD);
      model.emit(MODEL_EVENT.COMPILED);
      return model.puppet;
    }
    /**
     * 编译操作移除
     * @param config 移除的配置
     * @returns this
     */
    remove(config) {
      const vid = config.vid;
      if (!this.map.has(vid)) {
        console.warn(
          `${this.MODULE} Compiler: can not found this vid object: ${vid}.`
        );
        return this;
      }
      if (!this.builders.has(config.type)) {
        console.warn(
          `${this.MODULE} Compiler: can not support this type: ${config.type}`
        );
        return this;
      }
      const model = this.map.get(vid);
      this.map.delete(vid);
      this.symbolMap.delete(model.puppet);
      model.dispose();
      model.emit(MODEL_EVENT.COMPILED_REMOVE);
      model.emit(MODEL_EVENT.COMPILED);
      return this;
    }
    /**
     * 编译操作覆盖
     * @param config 覆盖的配置
     * @returns this
     */
    cover(config) {
      const vid = config.vid;
      if (!this.map.has(vid)) {
        console.warn(
          `${this.MODULE} Compiler: can not found this vid object: ${vid}.`
        );
        return this;
      }
      Promise.resolve().then(() => {
        utils.syncObject(config, config, {
          vid: true,
          type: true
        });
      });
      return this;
    }
    /**
     * 编译操作运行时的编译处理
     * @param vid 配置标识
     * @param notice 运行时的操作通知
     * @returns this
     */
    compile(vid, notice) {
      if (!this.map.has(vid)) {
        console.warn(
          `${this.MODULE} Compiler: can not found model which vid is: '${vid}'`
        );
        return this;
      }
      const model = this.map.get(vid);
      model.process(notice);
      const router = notice.path;
      model.emit(
        `${MODEL_EVENT.COMPILED_ATTR}:${router ? router + "." : router}${notice.key}`
      );
      model.emit(MODEL_EVENT.COMPILED_UPDATE);
      model.emit(MODEL_EVENT.COMPILED);
      return this;
    }
    /**
     * 编译该实例目标下所有的配置
     * @returns this
     */
    compileAll() {
      const target = this.target;
      for (const config of Object.values(target)) {
        this.add(config);
      }
      return this;
    }
    /**
     * 该编译器的销毁方法
     * @returns this
     */
    dispose() {
      for (const model of this.map.values()) {
        model.dispose();
      }
      this.map.clear();
      this.target = {};
      return this;
    }
    /**
     * 获取一个对象的标识
     * @param object 物体对象
     * @returns vid |null
     */
    getObjectSymbol(object) {
      return this.symbolMap.get(object) || null;
    }
    /**
     * 通过对象标识获取物体对象
     * @param vid 对象标识
     * @returns 物体对象 | null
     */
    getObjectBySymbol(vid) {
      var _a;
      return ((_a = this.map.get(vid)) == null ? void 0 : _a.puppet) || null;
    }
    /**
     * 通过对象标识获取配置化模型
     * @param vid 对象标识
     * @returns 配置化模型 | null
     */
    getModelBySymbol(vid) {
      return this.map.get(vid) || null;
    }
    /**
     * 使用一个配置化模型
     * @param option 配置化模型选项
     * @param callback 使用后的回调函数
     * @returns this
     */
    useModel(option, callback) {
      if (CONFIG_MODEL[option.type]) {
        console.warn(
          `${this.MODULE} Compiler: has already exist this model ${option.type}.`
        );
        return this;
      }
      let Builder = void 0;
      if (option.shared) {
        Builder = class extends Model {
          constructor(params) {
            super(params);
          }
        };
        for (const key in option.shared) {
          Builder.prototype[key] = option.shared[key];
        }
      }
      if (option.expand) {
        const expendModel = function(target, merge) {
          if (!target) {
            console.error(
              `Compiler: model expend error, can not found model witch has not been registered.`,
              merge.models,
              CONFIG_MODEL
            );
          } else {
            const targetConfig = target.config;
            target.config = function() {
              return Object.assign(targetConfig(), merge.config());
            };
            !target.commands && (target.commands = {});
            target.commands = utils.objectDeepMerge(target.commands, merge.commands, {
              fresh: false
            });
          }
        };
        for (const rule of option.expand) {
          if (typeof rule.models === "string") {
            expendModel(CONFIG_MODEL[rule.models], rule);
          } else if (Array.isArray(rule.models)) {
            for (const key in rule.models) {
              expendModel(CONFIG_MODEL[key], rule);
            }
          } else if (rule.models instanceof RegExp) {
            for (const key in CONFIG_MODEL) {
              if (rule.models.test(key)) {
                expendModel(CONFIG_MODEL[key], rule);
              }
            }
          }
        }
      }
      this.builders.set(option.type, {
        option,
        Builder
      });
      Object.defineProperty(CONFIG_FACTORY, option.type, {
        get() {
          return () => Object.assign(option.config(), { type: option.type });
        }
      });
      CONFIG_TYPE[emunDecamelize(option.type)] = option.type;
      CONFIGTYPE[emunCamelize(option.type)] = option.type;
      CONFIG_MODULE[option.type] = this.MODULE;
      CONFIG_MODEL[option.type] = option;
      callback && callback(this);
      return this;
    }
    /**
     * @deprecated use useModel
     * @param processor
     * @param callback
     * @returns
     */
    useProcessor(processor, callback) {
      return this.useModel(processor, callback);
    }
  }
  const globalOption = {
    proxy: {
      expand: void 0,
      timing: "before",
      toRaw: void 0
    },
    symbol: {
      generator: nanoid.nanoid,
      validator: (id) => typeof id === "string" && id.length === 21
    },
    engine: void 0
  };
  const defineOption = function(options) {
    if (options.proxy) {
      Object.assign(globalOption.proxy, options.proxy);
    }
    if (options.symbol) {
      Object.assign(globalOption.symbol, options.symbol);
    }
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
        path: "",
        key,
        value,
        symbol: key
      });
      return result;
    } else {
      const result = Reflect.set(target, key, value);
      container.remove(value.vid);
      container.add(value);
      container.next({
        operate: "set",
        path: "",
        key,
        value,
        symbol: key
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
      path: "",
      key,
      value,
      symbol: key
    });
    container.remove(value.vid);
    return result;
  };
  class Container extends rxjs.Subject {
    constructor() {
      super();
      this.subscriptions = /* @__PURE__ */ new Map();
      const generator = globalOption.proxy.expand ? (data = {}) => globalOption.proxy.expand(data) : (data = {}) => data;
      if (globalOption.proxy.timing === "before") {
        this.space = new Proxy(generator(), {
          get: containerGetter,
          set: (target, key, value, receiver) => containerSetter(target, key, value, receiver, this),
          deleteProperty: (target, key) => containerDeleter(target, key, this)
        });
      } else {
        this.space = generator(
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
        console.error("Container: this config can not observer", config);
        return;
      }
      this.subscriptions.set(
        observer.target.vid,
        observer.subscribe((notice) => {
          this.next({
            operate: notice.operate,
            path: notice.path,
            key: notice.key,
            value: notice.value,
            symbol: observer.target.vid
          });
        })
      );
    }
    remove(vid) {
      this.subscriptions.delete(vid);
    }
  }
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
  const JSONHandler = {
    stringify,
    parse,
    clone: clone$1
  };
  const JSONHandler$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    clone: clone$1,
    default: JSONHandler,
    parse,
    stringify
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
    if (!CONFIG_FACTORY[type]) {
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
    let initConfig = CONFIG_FACTORY[type]();
    if (initConfig.vid === "") {
      initConfig.vid = globalOption.symbol.generator();
    }
    if (merge) {
      if (typeof merge.type !== void 0) {
        merge = clone$1(merge);
        delete merge.type;
      }
      recursion(initConfig, merge);
    }
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
        if (isObjectType(initConfig.type) && initConfig.type !== CONFIG_TYPE.SCENE) {
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
        const newVid = createSymbol();
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
      const module2 = config[modulekey];
      module2.forEach((elem, i, arr) => {
        arr[i] = handler2(elem);
      });
    }
    return config;
  };
  const planish = function(configs) {
    const result = {};
    for (const module2 of Object.keys(configs)) {
      for (const config of configs[module2]) {
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
  const template = {
    clone,
    handler: handler$1,
    planish,
    observable: observable$1
  };
  const template$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    clone,
    default: template,
    handler: handler$1,
    observable: observable$1,
    planish
  }, Symbol.toStringTag, { value: "Module" }));
  class AntiShake {
    constructor() {
      this.list = [];
      this.time = 0;
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
  class Converter {
    constructor(params) {
      this.MODULE = "";
      this.container = new Container();
      this.ruler = params.ruler;
      this.MODULE = params.module;
      this.container.subscribe((notice) => {
        this.ruler.execute(notice);
      });
    }
    getData() {
      return this.container.space;
    }
    existSymbol(vid) {
      return Boolean(this.container.space[vid]);
    }
    addConfig(config) {
      this.container.space[config.vid] = config;
      return this;
    }
    getConfig(vid) {
      return this.container.space[vid];
    }
    removeConfig(vid) {
      const data = this.container.space;
      data[vid] !== void 0 && delete data[vid];
    }
    addCompiler(compiler) {
      compiler.setTarget(this.container.space);
      compiler.compileAll();
      this.ruler.link(compiler);
      return this;
    }
    /**
     * 导出json化配置单
     * @returns json config
     */
    toJSON(compress = true) {
      if (!compress) {
        return JSON.stringify(
          Object.values(this.container.space),
          stringify
        );
      } else {
        return JSON.stringify(this.exportConfig(), stringify);
      }
    }
    /**
     * 导出配置单
     * @param compress 是否压缩配置单 default true
     * @returns config
     */
    exportConfig(compress = true) {
      if (!compress) {
        return Object.values(clone$1(this.container.space));
      } else {
        const data = this.container.space;
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
            if (!CONFIG_FACTORY[config.type]) {
              console.error(`can not font some config with: ${config.type}`);
              continue;
            }
            cacheConfigTemplate[config.type] = CONFIG_FACTORY[config.type]();
          }
          const temp = {};
          recursion(config, cacheConfigTemplate[config.type], temp);
          target.push(temp);
        }
        return target;
      }
    }
    /**
     * 加载配置
     * @param configs this module configs
     * @returns true
     */
    load(configs) {
      const data = this.container.space;
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
          if (!CONFIG_FACTORY[config.type]) {
            console.error(`can not font some config with: ${config.type}`);
            continue;
          }
          cacheConfigTemplate[config.type] = CONFIG_FACTORY[config.type]();
        }
        restore(config, cacheConfigTemplate[config.type]);
        data[config.vid] = config;
      }
      return this;
    }
    remove(configs) {
      const data = this.container.space;
      for (const config of configs) {
        data[config.vid] !== void 0 && delete data[config.vid];
      }
      return this;
    }
  }
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
    if (typeof key === "symbol" || observer.ignore(utils.extendPath(path, key))) {
      return Reflect.set(target, key, value, receiver);
    }
    if (utils.isObject(value) && !hasObserver(value)) {
      value = react(observer, value, target, key);
    }
    if (target[key] === void 0) {
      if (utils.isObject(value)) {
        value[Symbol.for(SYMBOL_KEY)] = key;
        utils.isArray(value) && cacheArray(value);
      }
      utils.isArray(target) && arrayMutation.delete(target);
      const result2 = Reflect.set(target, key, value);
      utils.isArray(target) && cacheArray(target);
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
    if (utils.isArray(target)) {
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
    if (typeof key === "symbol" || observer.ignore(path)) {
      return Reflect.deleteProperty(target, key);
    }
    const value = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (utils.isArray(target)) {
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
    if (!utils.isObject(object)) {
      return object;
    }
    if (hasObserver(object)) {
      return object;
    }
    const path = father ? getPath(father) : "";
    if (observer.ignore(path)) {
      return object;
    }
    father && (object[Symbol.for(SYMBOL_FATHER)] = father);
    object[Symbol.for(SYMBOL_OB)] = observer;
    for (const key2 in object) {
      const tempPath = utils.extendPath(path, key2);
      if (observer.ignore(tempPath)) {
        continue;
      }
      if (utils.isObject(object[key2])) {
        if (utils.isArray(object[key2])) {
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
  const _Observer = class _Observer extends rxjs.Subject {
    constructor(object) {
      super();
      this.disable = false;
      this.target = react(this, object);
    }
    ignore(path) {
      const split = path.indexOf(".");
      if (split === -1) {
        return _Observer.IGNORE[path];
      }
      return _Observer.IGNORE[path.slice(0, split)];
    }
    next(value) {
      if (this.disable) {
        return;
      }
      super.next(value);
      const model = getModel(this.target);
      if (model) {
        model.emit(MODEL_EVENT.NOTICED);
      }
    }
  };
  _Observer.IGNORE = {
    vid: true,
    type: true,
    alias: true,
    meta: true
  };
  let Observer = _Observer;
  const observable = function(object) {
    const observer = new Observer(object);
    return observer.target;
  };
  const slientSync = function(config, fun) {
    const ob = getObserver(config);
    if (!ob) {
      console.warn(`this object can not found it observer:`, config);
      return;
    }
    ob.disable = true;
    fun();
    ob.disable = false;
  };
  const DEFAULT_RULE = {
    SYMBOL_VALIDATOR(input) {
      return globalOption.symbol.validator(input.symbol);
    },
    OPERATE_ADD({ operate, path, symbol, key, value }, compiler) {
      if (operate === "add" && !path.length && symbol === key) {
        compiler.add(value);
        return false;
      } else {
        return true;
      }
    },
    OPERATE_DELETE({ operate, path, value }, compiler) {
      if (operate === "delete" && !path.length) {
        compiler.remove(value);
        return false;
      } else {
        return true;
      }
    },
    OPERATE_COVER({ operate, path, value, key, symbol }, compiler) {
      if (operate === "set" && !path.length && key === symbol) {
        compiler.cover(value);
        return false;
      } else {
        return true;
      }
    },
    OPERATE_COMPILE(input, compiler) {
      compiler.compile(input.symbol, input);
      return false;
    }
  };
  class Ruler {
    constructor(rules) {
      this.rules = [];
      this.pointer = null;
      if (rules) {
        this.rules = rules;
      } else {
        this.rules.push(
          DEFAULT_RULE.SYMBOL_VALIDATOR,
          DEFAULT_RULE.OPERATE_ADD,
          DEFAULT_RULE.OPERATE_DELETE,
          DEFAULT_RULE.OPERATE_COVER,
          DEFAULT_RULE.OPERATE_COMPILE
        );
      }
    }
    link(compiler) {
      this.compiler = compiler;
    }
    execute(input) {
      for (const rule of this.rules) {
        if (!rule(input, this.compiler)) {
          break;
        }
      }
    }
    remove(rule) {
      if (this.rules.includes(rule)) {
        const index = this.rules.indexOf(rule);
        this.rules.splice(index, 1);
      } else {
        console.warn(`Ruler: can not found rule`, rule, this.rules);
      }
    }
    add(rule, index) {
      if (this.rules.includes(rule)) {
        console.warn(`Ruler: rules has already exist this rule`, this.rules);
        return this;
      }
      if (index !== void 0) {
        this.rules.splice(index, 0, rule);
        return this;
      }
      if (this.pointer === null) {
        console.error(
          `Ruler:index is undefined, need a index or use before and after api to set a index`
        );
        return this;
      }
      this.rules.splice(this.pointer, 0, rule);
      return this;
    }
    before(rule) {
      if (!this.rules.includes(rule)) {
        console.warn(`Ruler: rules not found this rule`, this.rules);
        return this;
      }
      this.pointer = this.rules.indexOf(rule);
      return this;
    }
    after(rule) {
      if (!this.rules.includes(rule)) {
        console.warn(`Ruler: rules not found this rule`, this.rules);
        return this;
      }
      this.pointer = this.rules.indexOf(rule) + 1;
      return this;
    }
    push(rule) {
      if (this.rules.includes(rule)) {
        console.warn(`Ruler: rules has already exist this rule`, this.rules);
        return this;
      }
      this.rules.push(rule);
      return this;
    }
    unshift(rule) {
      if (this.rules.includes(rule)) {
        console.warn(`Ruler: rules has already exist this rule`, this.rules);
        return this;
      }
      this.rules.unshift(rule);
      return this;
    }
    pop() {
      this.rules.pop();
      return this;
    }
    shift() {
      this.rules.shift();
      return this;
    }
  }
  const defineRule = function(rules) {
    return rules;
  };
  const getBasicConfig = function() {
    return {
      vid: "",
      type: "",
      name: "",
      alias: "",
      meta: {}
    };
  };
  const getSymbolConfig = getBasicConfig;
  const uniqueSymbol = function(type) {
    return `DEFUALT-${type}`;
  };
  const createSymbol = function() {
    return globalOption.symbol.generator();
  };
  const toSymbol = function(config) {
    return config.vid;
  };
  const emptyHandler = function() {
  };
  class Moduler {
    constructor(module2) {
      this.type = "";
      this.preload = [];
      this.module = module2;
      this.type = module2.type;
      this.ruler = new Ruler(module2.rule);
      for (const model of module2.models) {
        if (model.resources) {
          this.preload.push(...Object.values(model.resources));
        }
      }
      this.preload = Array.from(new Set(this.preload));
      this.compiler = module2.compiler ? new module2.compiler({
        module: module2.type,
        models: module2.models
      }) : new Compiler({
        module: module2.type,
        models: module2.models
      });
      this.converter = new Converter({
        module: module2.type,
        ruler: this.ruler
      }).addCompiler(this.compiler);
    }
  }
  const defineModule = function(module2) {
    return module2;
  };
  class CompilerManager extends core.EventDispatcher {
    constructor() {
      super();
      this.compilerMap = /* @__PURE__ */ new Map();
    }
    /**
     * 编译器拓展
     * @param compiler 拓展的编译器
     * @param focus 强制覆盖
     */
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
    /**
     * 获取编译器
     * @param module 编译器所属的模块
     * @returns compiler | null
     */
    getCompiler(module2) {
      if (this.compilerMap.has(module2)) {
        return this.compilerMap.get(module2);
      } else {
        console.warn(`can not found this type in compiler manager: ${module2}`);
        return null;
      }
    }
    /**
     * 获取该three物体的vid标识
     * @param object three object
     * @returns vid or null
     */
    getObjectSymbol(object) {
      for (const compiler of this.compilerMap.values()) {
        const vid = compiler.getObjectSymbol(object);
        if (vid) {
          return vid;
        }
      }
      return null;
    }
    /**
     * 通过vid标识获取相应的three对象
     * @param vid vid标识
     * @returns three object || null
     */
    getObjectBySymbol(vid) {
      for (const compiler of this.compilerMap.values()) {
        const object = compiler.getObjectBySymbol(vid);
        if (object) {
          return object;
        }
      }
      return null;
    }
    /**
     * 通过vid标识获取相应的配置化模型
     * @param vid vid标识
     * @returns model
     */
    getModelBySymbol(vid) {
      for (const compiler of this.compilerMap.values()) {
        const model = compiler.getModelBySymbol(vid);
        if (model) {
          return model;
        }
      }
      return null;
    }
    /**
     * @deprecated use getObjectFromModule
     * @param module
     * @param vid
     * @returns
     */
    getObjectfromModule(module2, vid) {
      return this.getObjectFromModule(module2, vid);
    }
    /**
     * 从一个模块中通过vid获取物体对象
     * @param module 指定模块
     * @param vid vid标识
     * @returns object | null
     */
    getObjectFromModule(module2, vid) {
      var _a;
      if (!this.compilerMap.has(module2)) {
        console.warn(`compiler manager can not found this module: ${module2}`);
        return null;
      }
      const compiler = this.compilerMap.get(module2);
      return ((_a = compiler.map.get(vid)) == null ? void 0 : _a.puppet) || null;
    }
    /**
     * @deprecated use getObjectFromModules
     * @param modules
     * @param vid
     * @returns
     */
    getObjectfromModules(modules, vid) {
      return this.getObjectFromModules(modules, vid);
    }
    /**
     * 从多个模块中通过vid获取物体
     * @param modules 指定的多个模块
     * @param vid vid标识
     * @returns object | null
     */
    getObjectFromModules(modules, vid) {
      var _a;
      if (!Array.isArray(modules)) {
        modules = Object.keys(modules);
      }
      for (const module2 of modules) {
        if (!this.compilerMap.has(module2)) {
          console.warn(`compiler manager can not found this module: ${module2}`);
          continue;
        }
        const compiler = this.compilerMap.get(module2);
        if (compiler.map.has(vid)) {
          return (_a = compiler.map.get(vid)) == null ? void 0 : _a.puppet;
        }
      }
      return null;
    }
    /**
     * 整个编译器的销毁方法
     * @returns this
     */
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
        engine.getObjectfromModule = function(module2, vid) {
          return compilerManager.getObjectfromModule(module2, vid);
        };
        engine.getObjectfromModules = function(modules, vid) {
          return compilerManager.getObjectfromModules(modules, vid);
        };
        engine.getObjectFromModule = function(module2, vid) {
          return compilerManager.getObjectFromModule(module2, vid);
        };
        engine.getObjectFromModules = function(modules, vid) {
          return compilerManager.getObjectFromModules(modules, vid);
        };
        engine.getObject3D = function(vid) {
          return compilerManager.getObjectFromModules(OBJECT_MODULE, vid);
        };
      },
      dispose(engine) {
        engine.compilerManager.dispose();
        delete engine.compilerManager;
        delete engine.getObjectSymbol;
        delete engine.getObjectBySymbol;
        delete engine.getObjectfromModule;
        delete engine.getObjectfromModules;
        delete engine.getObjectFromModule;
        delete engine.getObjectFromModules;
        delete engine.getObject3D;
      }
    };
  };
  class DataSupportManager extends core.EventDispatcher {
    constructor() {
      super();
      this.dataSupportMap = /* @__PURE__ */ new Map();
    }
    /**
     * 转换器拓展
     * @param dataSupport 转换器
     * @param focus 是否强制覆盖
     */
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
    /**
     * 获取该模块下的转换器
     * @param type MODULETYPE
     * @returns Converter
     */
    getDataSupport(type) {
      if (this.dataSupportMap.has(type)) {
        return this.dataSupportMap.get(type);
      } else {
        console.warn(`can not found this type in dataSupportManager: ${type}`);
        return null;
      }
    }
    /**
     * 通过vid标识获取相应配置对象
     * @param vid vid标识
     * @returns config || null
     */
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
    /**
     * @deprecated use getConfigFromModule
     * @param module
     * @param vid
     * @returns
     */
    getConfigfromModule(module2, vid) {
      return this.getConfigFromModule(module2, vid);
    }
    /**
     * 从一个模块中通过vid标识获取配置
     * @param module 模块类型
     * @param vid vid标识
     * @returns 配置
     */
    getConfigFromModule(module2, vid) {
      if (!this.dataSupportMap.has(module2)) {
        console.warn(`data support manager can not found this module: ${module2}`);
        return null;
      }
      const dataSupport = this.dataSupportMap.get(module2);
      return dataSupport.getConfig(vid) || null;
    }
    /**
     * @deprecated use getConfigFromModules
     * @param modules
     * @param vid
     * @returns
     */
    getConfigfromModules(modules, vid) {
      return this.getConfigFromModules(modules, vid);
    }
    /**
     * 从多个模块中通过vid标识获取配置
     * @param modules 模块类型
     * @param vid vid标识
     * @returns 配置
     */
    getConfigFromModules(modules, vid) {
      if (!Array.isArray(modules)) {
        modules = Object.keys(modules);
      }
      for (const module2 of modules) {
        if (!this.dataSupportMap.has(module2)) {
          console.warn(
            `data support manager can not found this module: ${module2}`
          );
          continue;
        }
        const dataSupport = this.dataSupportMap.get(module2);
        const config = dataSupport.getConfig(vid);
        if (config) {
          return config;
        }
      }
      return null;
    }
    /**
     * 通过vid标识移除相关配置对象
     * @param vid ...vid标识
     * @returns this
     */
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
    /**
     * 通过vid标识获取该标识所处的模块
     * @param vid vid标识
     * @returns MODULETYPE || null
     */
    getModuleBySymbol(vid) {
      const dataSupportList = this.dataSupportMap.values();
      for (const dataSupport of dataSupportList) {
        if (dataSupport.existSymbol(vid)) {
          return dataSupport.MODULE;
        }
      }
      return null;
    }
    /**
     * 应用配置对象
     * @param config vis相关配置对象
     * @returns this
     */
    applyConfig(...configs) {
      for (const config of configs) {
        const module2 = getModule(config.type);
        if (module2) {
          this.dataSupportMap.get(module2).addConfig(config);
        } else {
          console.warn(
            `dataSupportManager can not found this config module: ${config.type}`
          );
        }
      }
      return this;
    }
    /**
     * 根据配置单加载对象
     * @param config 符合vis配置选项的配置单对象
     * @returns this
     */
    load(config) {
      const dataSupportMap = this.dataSupportMap;
      dataSupportMap.forEach((dataSupport, module2) => {
        config[module2] && dataSupport.load(config[module2]);
      });
      return this;
    }
    /**
     * 根据模块加载配置
     * @param config
     * @param module
     * @returns
     */
    loadByModule(config, module2) {
      const dataSupport = this.dataSupportMap.get(module2);
      if (!dataSupport) {
        console.warn(`DataSupportManager can not support this module: ${module2}`);
        return this;
      }
      dataSupport.load(config);
      return this;
    }
    /**
     * 根据配置单移除相关对象
     * @param config  符合vis配置选项的配置单对象
     * @returns this
     */
    remove(config) {
      const dataSupportMap = this.dataSupportMap;
      dataSupportMap.forEach((dataSupport, module2) => {
        config[module2] && dataSupport.remove(config[module2]);
      });
      return this;
    }
    /**
     * 获取JSON化的配置单
     * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
     * @param compress 是否压缩配置单 default true
     * @returns JSON string
     */
    toJSON(extendsConfig = {}, compress = true) {
      return JSON.stringify(
        this.exportConfig(extendsConfig, compress),
        stringify
      );
    }
    /**
     * 导出配置单
     * @param extendsConfig 拓展配置对象
     * @param compress 是否压缩配置单 default true
     * @returns LoadOptions
     */
    exportConfig(extendsConfig = {}, compress = true) {
      const dataSupportMap = this.dataSupportMap;
      dataSupportMap.forEach((dataSupport, module2) => {
        extendsConfig[module2] = dataSupport.exportConfig(compress);
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
        engine.getConfigFromModule = function(module2, vid) {
          return dataSupportManager.getConfigfromModule(module2, vid);
        };
        engine.getConfigFromModules = function(modules, vid) {
          return dataSupportManager.getConfigfromModules(modules, vid);
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
      this.selector = (url, resource, parseMap) => {
        return parseMap.get(DefaultParser) || null;
      };
    }
    parse({ url, resource, configMap, resourceMap }) {
      resourceMap.set(url, resource);
    }
  }
  var RESOURCE_EVENT = /* @__PURE__ */ ((RESOURCE_EVENT2) => {
    RESOURCE_EVENT2["MAPPED"] = "mapped";
    return RESOURCE_EVENT2;
  })(RESOURCE_EVENT || {});
  class ResourceManager extends core.EventDispatcher {
    constructor(resources = {}) {
      super();
      this.configMap = /* @__PURE__ */ new Map();
      this.resourceMap = /* @__PURE__ */ new Map();
      this.paserMap = /* @__PURE__ */ new Map();
      this.defalutParser = new DefaultParser();
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
    /**
     * 添加解析器
     * @param parser  extends VIS.Parser
     * @returns this
     */
    addParser(parser) {
      if (this.paserMap.has(parser.constructor)) {
        return this;
      }
      this.paserMap.set(parser.constructor, parser);
      return this;
    }
    /**
     *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
     * @param loadResourceMap loaderManager的resourceMap
     * @param options options.handler: {url, hanlder}可以根据特定的url指定特定的解析器
     * @returns this
     */
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
    /**
     * 获取资源的配置单，该配置单根据资源结构生成
     * @param url 资源url
     * @returns LoadOptions
     */
    getResourceConfig(url) {
      const configMap = this.configMap;
      const loadOptions = {};
      [...configMap.keys()].filter((key) => key.startsWith(url)).forEach((url2) => {
        const config = configMap.get(url2);
        if (!config) {
          console.error(`unknow error: can not found config by url: ${url2}`);
        } else {
          const module2 = getModule(config.type);
          if (!module2) {
            console.error(
              `unknow error: can not found module by type: ${config.type}`,
              config
            );
          } else {
            !loadOptions[module2] && (loadOptions[module2] = []);
            loadOptions[module2].push(config);
          }
        }
      });
      return loadOptions;
    }
    /**
     * 是否有此资源
     * @param url 资源 url
     * @returns boolean
     */
    hasResource(url) {
      return this.resourceMap.has(url);
    }
    /**
     * 移除url下的所有资源
     * @param url url
     * @returns this
     */
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
    /**
     * 清空所有资源
     */
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
        engine.addEventListener(core.ENGINE_EVENT.DISPOSE, () => {
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
      condition: [DATA_SUPPORT_MANAGER_PLUGIN, pluginLoaderManager.LOADER_MANAGER_PLUGIN],
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
      condition: [RESOURCE_MANAGER_PLUGIN, pluginLoaderManager.LOADER_MANAGER_PLUGIN],
      exec(engine) {
        cacheLoadResources = engine.loadResources;
        engine.loadResources = (urlList, callback) => {
          const lodedFun = (event) => {
            callback(void 0, event);
            engine.resourceManager.removeEventListener(
              pluginLoaderManager.LOADER_EVENT.LOADED,
              lodedFun
            );
          };
          try {
            engine.resourceManager.addEventListener(
              pluginLoaderManager.LOADER_EVENT.LOADED,
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
                pluginLoaderManager.LOADER_EVENT.LOADED,
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
        engine.compilerManager.compilerMap.forEach((compiler, module2) => {
          var _a;
          compiler.useEngine(engine);
          (_a = engine.dataSupportManager.dataSupportMap.get(module2)) == null ? void 0 : _a.addCompiler(compiler);
        });
      },
      rollback() {
      }
    };
  };
  class Trigger {
    constructor(validator) {
      this.condition = {};
      this.list = [];
      this.validator = () => true;
      if (validator) {
        this.validator = validator;
      }
    }
    /**
     * 模块条件追加，追加的模块在内部通过校验后会作为触发器的条件模块
     * @param module 模块类型
     * @returns this
     */
    add(module2) {
      if (this.validator(module2)) {
        this.condition[module2] = false;
      }
      return this;
    }
    /**
     * 将一个模块标记为已完成，如果所有的模块都完成会自动触发内部的缓存方法执行。
     * @param module 模块类型
     * @returns this
     */
    reach(module2) {
      if (this.condition[module2] === void 0) {
        return this;
      }
      this.condition[module2] = true;
      if (this.check()) {
        this.trig();
      }
      return this;
    }
    /**
     * 注册一个触发器触发时需要执行的方法
     * @param fun immediate是一个立即执行的标识
     * 这个方法在加入触发器之前会立即执行一次，如果返回为true，就不会加入触发器
     * 如果返回为false就会加入触发器
     * 函数内部可以通过immediate判断是否需要使用该功能
     */
    register(fun) {
      if (!fun(true)) {
        this.list.push(fun);
      }
    }
    /**
     * 触发器的执行方法，执行完之后会自动调用重置方法，不建议手动执行。
     */
    trig() {
      const list = this.list;
      for (const fun of list) {
        fun(false);
      }
      this.reset();
    }
    /**
     * 触发器的重置方法，会重置条件与缓存方法列表。
     */
    reset() {
      this.list = [];
      Object.keys(this.condition).forEach((key) => {
        this.condition[key] = false;
      });
    }
    /**
     * 触发器的检测方法，检测所有的条件是否达成。
     * @returns boolean
     */
    check() {
      return !Object.values(this.condition).includes(false);
    }
  }
  const ObjectTrigger = new Trigger((module2) => {
    return Boolean(OBJECT_MODULE[module2]);
  });
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
  class EngineSupport extends core.Engine {
    constructor(params = {}) {
      super();
      this.moduleLifeCycle = [];
      this.triggers = { object: ObjectTrigger };
      this.modulers = {};
      this.install(pluginLoaderManager.LoaderManagerPlugin(params.LoaderManagerPlugin)).install(pluginPointerManager.PointerManagerPlugin(params.PointerManagerPlugin)).install(pluginEventManager.EventManagerPlugin(params.EventManagerPlugin)).install(pluginRenderManager.RenderManagerPlugin(params.RenderManagerPlugin)).install(ResourceManagerPlugin(params.ResourceManagerPlugin)).install(DataSupportManagerPlugin(params.DataSupportManagerPlugin)).install(CompilerManagerPlugin(params.CompilerManagerPlugin));
      this.exec(LoaderDataSupportStrategy()).exec(LoaderMappingStrategy()).exec(CompilerSupportStrategy());
    }
    /**
     * 导入配置的生命周期执行方法
     * @param config 配置
     */
    loadLifeCycle(config) {
      const dataSupportManager = this.dataSupportManager;
      const triggers = this.triggers;
      const loadCycle = this.moduleLifeCycle.sort((a, b) => a.order - b.order);
      for (const { module: module2 } of loadCycle) {
        config[module2] && dataSupportManager.loadByModule(config[module2], module2);
        for (const key in triggers) {
          triggers[key].reach(module2);
        }
      }
    }
    /**
     * 移除配置时的生命周期执行方法
     * @param config 配置
     */
    removeLifeCycle(config) {
      const dataSupportManager = this.dataSupportManager;
      const removeCycle = this.moduleLifeCycle.sort((a, b) => b.order - a.order);
      for (const { module: module2 } of removeCycle) {
        config[module2] && dataSupportManager.remove({ [module2]: config[module2] });
      }
      const assets = config.assets || [];
      const resourceManager = this.resourceManager;
      const loaderManager = this.loaderManager;
      assets.forEach((url) => {
        resourceManager.remove(url);
        loaderManager.remove(url);
      });
    }
    /**
     * 加载一个配置
     * @param config 配置单
     * @param callback 加载完成后的回调
     * @returns this
     */
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
    /**
     * 异步的加载一个配置
     * @param config 配置单
     * @param pretreat 配置单预处理
     * @returns Promise<MappedEvent>
     */
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
    /**
     * 移除一个配置单
     * @param config 配置单
     */
    removeConfig(config) {
      this.removeLifeCycle(config);
    }
    /**
     * 获取一个对象的配置结构
     * @param object 物体对象
     * @returns 配置 | null
     */
    getObjectConfig(object) {
      const symbol = this.getObjectSymbol(object);
      if (symbol) {
        return this.getConfigBySymbol(symbol);
      } else {
        return null;
      }
    }
    /**
     * 使用一个配置化模块
     * @param options 配置化模块选项
     * @returns this
     */
    useModule(options) {
      const typeName = emunDecamelize(options.type);
      if (MODULE_TYPE[typeName]) {
        console.warn(`Engine:module ${options.type} is already exist.`);
        return this;
      }
      MODULE_TYPE[options.type.toUpperCase()] = options.type;
      MODULE_TYPE[typeName] = options.type;
      if (options.object) {
        OBJECT_MODULE[options.type] = true;
      }
      const moduler = new Moduler(options);
      this.modulers[options.type] = moduler;
      moduler.compiler.useEngine(this);
      this.dataSupportManager.extend(moduler.converter);
      this.compilerManager.extend(moduler.compiler);
      if (options.extend) {
        options.extend(this);
      }
      this.moduleLifeCycle.push({
        module: options.type,
        order: options.lifeOrder || 0
      });
      Object.values(this.triggers).forEach((trigger) => {
        trigger.add(options.type);
      });
      return this;
    }
    /**
     * 添加一个触发器
     * @param name 触发器名称或者标识
     * @param trigger 触发器对象
     * @returns this
     */
    addTrigger(name, trigger) {
      if (!this.triggers[name]) {
        this.triggers[name] = trigger;
      } else {
        console.warn(
          `EngineSupport: this trigger has already exist: ${name}.`,
          this.triggers
        );
      }
      return this;
    }
    /**
     * 获取一个触发器
     * @param name 触发器名称
     * @returns Trigger
     */
    getTrigger(name) {
      if (!this.triggers[name]) {
        console.warn(
          `EngineSupport: not found this trigger: ${name}.`,
          this.triggers
        );
        return null;
      } else {
        return this.triggers[name];
      }
    }
    /**
     * 引擎的初始化，如果定义的模型存在外部资源需要手动调用此api。
     */
    async init() {
      let allPreload = [];
      for (const moduler of Object.values(this.modulers)) {
        allPreload.push(...moduler.preload);
      }
      allPreload = Array.from(new Set(allPreload));
      await this.loadResourcesAsync(allPreload).catch((err) => {
        console.error(`EngineSupport init err: `, err);
      });
    }
    /**
     * @deprecated
     * use useModule
     */
    registModule(options) {
      return this.useModule(options);
    }
  }
  const defineEngineSupport = function(options, params = {}) {
    const engine = new EngineSupport(params);
    if (options.plugins) {
      options.plugins.forEach((plugin) => {
        engine.install(plugin);
      });
    }
    if (options.modules) {
      options.modules.forEach((module2) => {
        engine.useModule(module2);
      });
    }
    if (options.strategy) {
      options.strategy.forEach((strategy) => {
        engine.exec(strategy);
      });
    }
    return engine;
  };
  const PLUGINS = [COMPILER_MANAGER_PLUGIN, DATA_SUPPORT_MANAGER_PLUGIN];
  exports2.AntiShake = AntiShake;
  exports2.COMPILER_MANAGER_PLUGIN = COMPILER_MANAGER_PLUGIN;
  exports2.COMPILER_SUPPORT_STRATEGY = COMPILER_SUPPORT_STRATEGY;
  exports2.CONFIGFACTORY = CONFIGFACTORY;
  exports2.CONFIGMODULE = CONFIGMODULE;
  exports2.CONFIGTYPE = CONFIGTYPE;
  exports2.CONFIG_FACTORY = CONFIG_FACTORY;
  exports2.CONFIG_MODEL = CONFIG_MODEL;
  exports2.CONFIG_MODULE = CONFIG_MODULE;
  exports2.CONFIG_TYPE = CONFIG_TYPE;
  exports2.Compiler = Compiler;
  exports2.CompilerManager = CompilerManager;
  exports2.CompilerManagerPlugin = CompilerManagerPlugin;
  exports2.CompilerSupportStrategy = CompilerSupportStrategy;
  exports2.Container = Container;
  exports2.Converter = Converter;
  exports2.DATA_SUPPORT_MANAGER_PLUGIN = DATA_SUPPORT_MANAGER_PLUGIN;
  exports2.DEFAULT_RULE = DEFAULT_RULE;
  exports2.DataSupportManager = DataSupportManager;
  exports2.DataSupportManagerPlugin = DataSupportManagerPlugin;
  exports2.DefaultParser = DefaultParser;
  exports2.EngineSupport = EngineSupport;
  exports2.JSONHandler = JSONHandler$1;
  exports2.LOADER_DATA_SUPPORT_STRATEGY = LOADER_DATA_SUPPORT_STRATEGY;
  exports2.LOADER_MAPPING_STRATEGY = LOADER_MAPPING_STRATEGY;
  exports2.LoaderDataSupportStrategy = LoaderDataSupportStrategy;
  exports2.LoaderMappingStrategy = LoaderMappingStrategy;
  exports2.MODEL_EVENT = MODEL_EVENT;
  exports2.MODULETYPE = MODULETYPE;
  exports2.MODULE_TYPE = MODULE_TYPE;
  exports2.Model = Model;
  exports2.Moduler = Moduler;
  exports2.OBJECTMODULE = OBJECTMODULE;
  exports2.OBJECT_MODULE = OBJECT_MODULE;
  exports2.PLUGINS = PLUGINS;
  exports2.Parser = Parser;
  exports2.RESOURCE_EVENT = RESOURCE_EVENT;
  exports2.RESOURCE_MANAGER_PLUGIN = RESOURCE_MANAGER_PLUGIN;
  exports2.ResourceManager = ResourceManager;
  exports2.ResourceManagerPlugin = ResourceManagerPlugin;
  exports2.Ruler = Ruler;
  exports2.SUPPORT_LIFE_CYCLE = SUPPORT_LIFE_CYCLE;
  exports2.Template = template$1;
  exports2.createSymbol = createSymbol;
  exports2.defineEngineSupport = defineEngineSupport;
  exports2.defineModel = defineModel;
  exports2.defineModule = defineModule;
  exports2.defineOption = defineOption;
  exports2.defineProcessor = defineProcessor;
  exports2.defineRule = defineRule;
  exports2.emptyHandler = emptyHandler;
  exports2.generateConfig = generateConfig;
  exports2.getBasicConfig = getBasicConfig;
  exports2.getModule = getModule;
  exports2.getObserver = getObserver;
  exports2.getSymbolConfig = getSymbolConfig;
  exports2.globalAntiShake = globalAntiShake;
  exports2.globalOption = globalOption;
  exports2.isObjectModule = isObjectModule;
  exports2.isObjectType = isObjectType;
  exports2.observable = observable;
  exports2.slientSync = slientSync;
  exports2.toSymbol = toSymbol;
  exports2.uniqueSymbol = uniqueSymbol;
  Object.keys(pluginLoaderManager).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k)) Object.defineProperty(exports2, k, {
      enumerable: true,
      get: () => pluginLoaderManager[k]
    });
  });
  Object.keys(pluginPointerManager).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k)) Object.defineProperty(exports2, k, {
      enumerable: true,
      get: () => pluginPointerManager[k]
    });
  });
  Object.keys(pluginEventManager).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k)) Object.defineProperty(exports2, k, {
      enumerable: true,
      get: () => pluginEventManager[k]
    });
  });
  Object.keys(pluginRenderManager).forEach((k) => {
    if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports2, k)) Object.defineProperty(exports2, k, {
      enumerable: true,
      get: () => pluginRenderManager[k]
    });
  });
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
