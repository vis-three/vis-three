import SMAAPassProcessor from "./processor/SMAAPassProcessor";
import UnrealBloomPassProcessor from "./processor/UnrealBloomPassProcessor";
import SelectiveBloomPassProcessor from "./processor/SelectiveBloomPassProcessor";
import { Compiler, MODULETYPE } from "@vis-three/middleware";
export class PassCompiler extends Compiler {
    MODULE = MODULETYPE.PASS;
    composer;
    constructor() {
        super();
    }
    useEngine(engine) {
        super.useEngine(engine);
        if (!engine.effectComposer) {
            console.warn(`engine need install effectComposer plugin that can use pass compiler.`);
            return this;
        }
        this.composer = engine.effectComposer;
        return this;
    }
    add(config) {
        const pass = super.add(config);
        pass && this.composer.addPass(pass);
        return pass;
    }
    remove(config) {
        if (!this.map.has(config.vid)) {
            console.warn(`PassCompiler can not found this vid pass: ${config.vid}.`);
            return this;
        }
        const pass = this.map.get(config.vid);
        this.composer.removePass(pass);
        super.remove(config);
        return this;
    }
}
Compiler.processor(SMAAPassProcessor);
Compiler.processor(UnrealBloomPassProcessor);
Compiler.processor(SelectiveBloomPassProcessor);
