import { PerspectiveCamera, Scene } from "three";
import { EventDispatcher } from "../eventDispatcher";
export var ENGINE_EVENT;
(function (ENGINE_EVENT) {
    ENGINE_EVENT["SETDOM"] = "setDom";
    ENGINE_EVENT["SETSIZE"] = "setSize";
    ENGINE_EVENT["SETCAMERA"] = "setCamera";
    ENGINE_EVENT["SETSCENE"] = "setScene";
    ENGINE_EVENT["RENDER"] = "render";
    ENGINE_EVENT["DISPOSE"] = "dispose";
})(ENGINE_EVENT || (ENGINE_EVENT = {}));
// 引擎槽
export class Engine extends EventDispatcher {
    pluginTables = new Map();
    strategyTables = new Map();
    dom = document.createElement("div");
    camera = new PerspectiveCamera();
    scene = new Scene();
    constructor() {
        super();
        this.camera.position.set(50, 50, 50);
        this.camera.lookAt(0, 0, 0);
    }
    /**
     * 安装插件
     * @param plugin
     * @returns
     */
    install(plugin) {
        if (this.pluginTables.has(plugin.name)) {
            console.warn(`This plugin already exists`, plugin.name);
            return this;
        }
        const validateDep = (name) => {
            if (!this.pluginTables.has(name)) {
                console.error(`${plugin.name} must install this plugin before: ${name}`);
                return false;
            }
            return true;
        };
        // 检测deps
        if (plugin.deps) {
            if (Array.isArray(plugin.deps)) {
                for (const name of plugin.deps) {
                    if (!validateDep(name)) {
                        this;
                    }
                }
            }
            else {
                if (!validateDep(plugin.deps)) {
                    this;
                }
            }
        }
        plugin.install(this);
        this.pluginTables.set(plugin.name, plugin);
        return this;
    }
    /**
     * 卸载插件
     * @param plugin
     * @returns
     */
    unistall(name) {
        if (!this.pluginTables.has(name)) {
            return this;
        }
        const plugin = this.pluginTables.get(name);
        plugin.dispose(this);
        this.pluginTables.delete(name);
        return this;
    }
    /**
     * 执行策略
     * @returns
     */
    exec(strategy) {
        const tables = this.strategyTables;
        if (tables.has(strategy.name)) {
            console.warn(`This strategy already exists`, strategy.name);
            return this;
        }
        // 检测条件
        const plugins = this.pluginTables;
        for (const plugin of strategy.condition) {
            if (!plugins.has(plugin)) {
                console.warn(`${strategy.name} does not meet the conditions for execution: ${plugin}`);
                return this;
            }
        }
        strategy.exec(this);
        tables.set(strategy.name, strategy);
        return this;
    }
    /**
     * 回滚策略
     * @returns
     */
    rollback(name) {
        const tables = this.strategyTables;
        if (!tables.has(name)) {
            return this;
        }
        const strategy = tables.get(name);
        strategy.rollback(this);
        tables.delete(name);
        return this;
    }
    /**
     * 设置输出的dom
     * @param dom HTMLElement
     * @returns this
     */
    setDom(dom) {
        this.dom = dom;
        this.dispatchEvent({
            type: ENGINE_EVENT.SETDOM,
            dom: dom,
        });
        return this;
    }
    /**
     * 设置引擎整体尺寸
     * @param width number
     * @param height number
     * @returns this
     */
    setSize(width, height) {
        if ((width && width <= 0) || (height && height <= 0)) {
            console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
            return this;
        }
        !width && (width = this.dom?.offsetWidth || window.innerWidth);
        !height && (height = this.dom?.offsetHeight || window.innerHeight);
        this.dispatchEvent({ type: ENGINE_EVENT.SETSIZE, width, height });
        return this;
    }
    /**
     * 设置当前相机
     * @param camera
     * @param options
     * @returns
     */
    setCamera(camera, options) {
        this.dispatchEvent({
            type: ENGINE_EVENT.SETCAMERA,
            camera,
            oldCamera: this.camera,
            options: Object.assign({
                orbitControls: true,
                transformControls: true,
            }, options || {}),
        });
        this.camera = camera;
        return this;
    }
    /**
     * 设置渲染场景
     * @param scene
     * @returns
     */
    setScene(scene) {
        this.dispatchEvent({
            type: ENGINE_EVENT.SETSCENE,
            scene,
            oldScene: this.scene,
        });
        this.scene = scene;
        return this;
    }
    /**
     * 渲染方法
     * @param delta
     * @returns
     */
    render(delta) {
        this.dispatchEvent({
            type: ENGINE_EVENT.RENDER,
            delta,
        });
        return this;
    }
    /**
     * 清除引擎缓存
     * @returns this
     */
    dispose() {
        this.dispatchEvent({
            type: ENGINE_EVENT.DISPOSE,
        });
        return this;
    }
}
export const defineEngine = function (options) {
    const engine = new Engine();
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
