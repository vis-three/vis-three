import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import { getOrbitControlsConfig, getTransformControlsConfig } from "./ControlsConfig";
import { OrbitControlsProcessor } from "./OrbitControlsProcessor";
import { TransformControlsProcessor } from "./TransformControlsProcessor";
export class ControlsCompiler extends Compiler {
    target;
    // TODO: 需要支持不止一个控件
    transformControls;
    orbitControls;
    processorMap = {
        [CONFIGTYPE.TRNASFORMCONTROLS]: new TransformControlsProcessor(),
        [CONFIGTYPE.ORBITCONTROLS]: new OrbitControlsProcessor()
    };
    controlMap = {
        [CONFIGTYPE.TRNASFORMCONTROLS]: undefined,
        [CONFIGTYPE.ORBITCONTROLS]: undefined
    };
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
            parameters.transformControls && (this.controlMap[CONFIGTYPE.TRNASFORMCONTROLS] = parameters.transformControls);
            parameters.orbitControls && (this.controlMap[CONFIGTYPE.ORBITCONTROLS] = parameters.orbitControls);
        }
        else {
            this.target = {
                [CONFIGTYPE.TRNASFORMCONTROLS]: getTransformControlsConfig(),
                [CONFIGTYPE.ORBITCONTROLS]: getOrbitControlsConfig()
            };
        }
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
        const control = this.controlMap[config.type];
        if (!control) {
            console.warn(`controls compiler can not found type of control: '${config.type}'`);
            return null;
        }
        return {
            config,
            processer,
            control
        };
    }
    set(vid, path, key, value) {
        const assembly = this.getAssembly(vid);
        if (!assembly) {
            return this;
        }
        assembly.processer.assemble({
            config: assembly.config,
            control: assembly.control
        }).process({
            key,
            path,
            value
        });
        return this;
    }
    setAll(vid) {
        const assembly = this.getAssembly(vid);
        if (!assembly) {
            return this;
        }
        assembly.processer.assemble({
            config: assembly.config,
            control: assembly.control
        }).processAll().dispose();
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    compileAll() {
        for (let vid of Object.keys(this.target)) {
            const assembly = this.getAssembly(vid);
            if (!assembly) {
                continue;
            }
            assembly.processer.assemble({
                config: assembly.config,
                control: assembly.control
            }).processAll().dispose();
        }
        return this;
    }
    dispose() {
        return this;
    }
}
//# sourceMappingURL=ControlsCompiler.js.map