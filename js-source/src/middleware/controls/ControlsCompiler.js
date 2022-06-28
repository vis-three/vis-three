import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import { OrbitControlsProcessor } from "./OrbitControlsProcessor";
import { TransformControlsProcessor } from "./TransformControlsProcessor";
export class ControlsCompiler extends Compiler {
    MODULE = MODULETYPE.CONTROLS;
    target = {};
    map = new Map();
    weakMap = new Map();
    engine;
    processorMap = {
        [CONFIGTYPE.TRNASFORMCONTROLS]: new TransformControlsProcessor(),
        [CONFIGTYPE.ORBITCONTROLS]: new OrbitControlsProcessor(),
    };
    constructor() {
        super();
    }
    getAssembly(vid) {
        const config = this.target[vid];
        if (!config) {
            console.warn(`controls compiler can not found this config: '${vid}'`);
            return null;
        }
        const processer = this.processorMap[config.type];
        if (!processer) {
            console.warn(`controls compiler can not support this controls: '${vid}'`);
            return null;
        }
        const control = this.map.get(config.type);
        if (!control) {
            console.warn(`controls compiler can not found type of control: '${config.type}'`);
            return null;
        }
        return {
            config,
            processer,
            control,
        };
    }
    set(vid, path, key, value) {
        const assembly = this.getAssembly(vid);
        if (!assembly) {
            return this;
        }
        assembly.processer
            .assemble({
            config: assembly.config,
            control: assembly.control,
            engine: this.engine,
        })
            .process({
            key,
            path,
            value,
        });
        return this;
    }
    setAll(vid) {
        const assembly = this.getAssembly(vid);
        if (!assembly) {
            return this;
        }
        assembly.processer
            .assemble({
            config: assembly.config,
            control: assembly.control,
            engine: this.engine,
        })
            .processAll()
            .dispose();
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    useEngine(engine) {
        if (engine.transformControls) {
            this.map.set(CONFIGTYPE.TRNASFORMCONTROLS, engine.transformControls);
            this.weakMap.set(engine.transformControls, CONFIGTYPE.TRNASFORMCONTROLS);
        }
        if (engine.orbitControls) {
            this.map.set(CONFIGTYPE.ORBITCONTROLS, engine.orbitControls);
            this.weakMap.set(engine.orbitControls, CONFIGTYPE.ORBITCONTROLS);
        }
        this.engine = engine;
        return this;
    }
    compileAll() {
        for (const vid of Object.keys(this.target)) {
            const assembly = this.getAssembly(vid);
            if (!assembly) {
                continue;
            }
            assembly.processer
                .assemble({
                config: assembly.config,
                control: assembly.control,
                engine: this.engine,
            })
                .processAll()
                .dispose();
        }
        return this;
    }
    dispose() {
        this.map.forEach((controls) => {
            controls.dispose && controls.dispose();
        });
        this.map.clear();
        return this;
    }
    getObjectSymbol(texture) {
        return this.weakMap.get(texture) || null;
    }
    getObjectBySymbol(vid) {
        return this.map.get(vid) || null;
    }
}
//# sourceMappingURL=ControlsCompiler.js.map