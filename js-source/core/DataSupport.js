import { stringify } from "../convenient/JSONHandler";
import { ProxyBroadcast } from "./ProxyBroadcast";
import { Translater } from "./Translater";
export class DataSupport {
    data;
    broadcast;
    translater;
    constructor(rule, data) {
        this.translater = new Translater().setRule(rule);
        this.broadcast = new ProxyBroadcast();
        this.data = this.broadcast.proxyExtends(data);
        this.broadcast.addEventListener('broadcast', (event) => {
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
    getConfig(vid) {
        return this.data[vid];
    }
    removeConfig(vid) {
        const data = this.data;
        data[vid] !== undefined && (delete data[vid]);
    }
    addCompiler(compiler) {
        compiler.setTarget(this.data);
        compiler.compileAll();
        this.translater.apply(compiler);
        return this;
    }
    toJSON() {
        return JSON.stringify(this.data, stringify);
    }
    load(config) {
        const data = this.data;
        for (const key in config) {
            data[key] = config[key];
        }
        return this;
    }
    remove(config) {
        const data = this.data;
        for (const key in config) {
            data[key] !== undefined && (delete data[key]);
        }
        return this;
    }
    getModule() {
        return this.MODULE;
    }
}
//# sourceMappingURL=DataSupport.js.map