import { parse, stringify } from "../convenient/JSONHandler";
import { CONFIGFACTORY } from "../middleware/constants/CONFIGFACTORY";
import { ProxyBroadcast } from "./ProxyBroadcast";
import { Translater } from "./Translater";
export class DataSupport {
    data;
    broadcast;
    translater;
    constructor(rule, data, ignore) {
        this.translater = new Translater().setRule(rule);
        this.broadcast = new ProxyBroadcast(ignore);
        this.data = this.broadcast.proxyExtends(data);
        this.broadcast.addEventListener("broadcast", (event) => {
            this.translater.translate(event.notice);
        });
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    proxyData(data) {
        this.data = this.broadcast.proxyExtends(data);
        return this.data;
    }
    existSymbol(vid) {
        return Boolean(this.data[vid]);
    }
    addConfig(config) {
        this.data[config.vid] = config;
        return this;
    }
    getConfig(vid) {
        return this.data[vid];
    }
    removeConfig(vid) {
        const data = this.data;
        data[vid] !== undefined && delete data[vid];
    }
    addCompiler(compiler) {
        compiler.setTarget(this.data);
        compiler.compileAll();
        this.translater.apply(compiler);
        return this;
    }
    /**
     * 导出json化配置单
     * @returns json config
     */
    toJSON(compress = true) {
        if (!compress) {
            return JSON.stringify(this.data, stringify);
        }
        else {
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
            return JSON.parse(JSON.stringify(this.data, stringify), parse);
        }
        else {
            const data = this.data;
            const target = {};
            const cacheConfigTemplate = {};
            const recursion = (config, template, result = {}) => {
                for (const key in template) {
                    if (["vid", "type"].includes(key)) {
                        result[key] = config[key];
                        continue;
                    }
                    if (typeof template[key] === "object" && template[key] !== null) {
                        if (config[key] === null) {
                            continue;
                        }
                        if (Array.isArray(template[key])) {
                            if (!config[key].length) {
                                continue;
                            }
                            result[key] = config[key].map((elem) => {
                                if (typeof elem === "object" && elem !== null) {
                                    return JSON.parse(JSON.stringify(elem));
                                }
                                else {
                                    return elem;
                                }
                            });
                            continue;
                        }
                        result[key] = {};
                        recursion(config[key], template[key], result[key]);
                        if (Object.keys(result[key]).length === 0) {
                            delete result[key];
                        }
                    }
                    else {
                        if (template[key] !== config[key]) {
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
                target[config.vid] = {};
                recursion(config, cacheConfigTemplate[config.type], target[config.vid]);
            }
            return target;
        }
    }
    /**
     * 加载配置
     * @param configMap this module configMap
     * @returns true
     */
    load(configMap) {
        const data = this.data;
        const cacheConfigTemplate = {};
        const restore = (config, template) => {
            for (const key in template) {
                if (typeof config[key] === "object" &&
                    config[key] !== null &&
                    typeof template[key] === "object" &&
                    template[key] !== null) {
                    restore(config[key], template[key]);
                }
                else if (config[key] === undefined) {
                    config[key] = template[key];
                }
            }
        };
        for (const key in configMap) {
            const config = configMap[key];
            if (!cacheConfigTemplate[config.type]) {
                if (!CONFIGFACTORY[config.type]) {
                    console.error(`can not font some config with: ${config.type}`);
                    continue;
                }
                cacheConfigTemplate[config.type] = CONFIGFACTORY[config.type]();
            }
            restore(config, cacheConfigTemplate[config.type]);
            data[key] = config;
        }
        return this;
    }
    remove(config) {
        const data = this.data;
        for (const key in config) {
            data[key] !== undefined && delete data[key];
        }
        return this;
    }
    getModule() {
        return this.MODULE;
    }
}
//# sourceMappingURL=DataSupport.js.map