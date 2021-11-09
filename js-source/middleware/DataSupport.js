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
    addCompiler(compiler) {
        this.translater.apply(compiler);
        return this;
    }
}
//# sourceMappingURL=DataSupport.js.map