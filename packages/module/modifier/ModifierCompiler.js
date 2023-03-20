import { Compiler } from "@vis-three/middleware";
export class ModifierCompiler extends Compiler {
    cacheRenderFun = new Map();
    sourceModifiers = new Map();
    constructor() {
        super();
    }
    integrateModifer(modifier) {
        if (!this.sourceModifiers.has(modifier.source)) {
            this.sourceModifiers.set(modifier.source, []);
        }
        const list = this.sourceModifiers.get(modifier.source);
        if (!list.includes(modifier)) {
            list.push(modifier);
        }
    }
    chainRender(modifier) {
        if (!this.sourceModifiers.has(modifier.source)) {
            console.error(`${this.MODULE} compiler can not found modifier list`, modifier);
            return;
        }
        const list = this.sourceModifiers.get(modifier.source);
        if (!list.includes(modifier)) {
            console.error(`${this.MODULE} compiler: can not found this modifier in source list`, modifier);
        }
        const renderList = list.slice(list.indexOf(modifier) + 1, list.length);
        for (const modifier of renderList) {
            modifier.render();
        }
    }
}
