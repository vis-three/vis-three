import { Camera } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler } from "../../core/Compiler";
import { getTransformControlsConfig } from "./ControlsConfig";
export class ControlsCompiler extends Compiler {
    target;
    transformControls;
    constructor(parameters) {
        super();
        if (parameters) {
            parameters.target && (this.target = parameters.target);
            parameters.transformControls && (this.transformControls = parameters.transformControls);
        }
        else {
            this.target = {
                TransformControls: getTransformControlsConfig()
            };
            this.transformControls = new TransformControls(new Camera());
        }
    }
    set(type, path, key, value) {
        if (type === 'TransformControls') {
            const controls = this.transformControls;
            if (key === 'snapAllow') {
                const config = this.target['TransformControls'];
                if (value) {
                    controls.translationSnap = config.translationSnap;
                    controls.rotationSnap = config.rotationSnap;
                    // @ts-ignore types 没写 源码有这个属性
                    controls.scaleSnap = config.scaleSnap;
                }
                else {
                    controls.translationSnap = null;
                    controls.rotationSnap = null;
                    // @ts-ignore types 没写 源码有这个属性
                    controls.scaleSnap = null;
                }
                return this;
            }
            controls[key] = value;
        }
        else {
            console.warn(`controls compiler can not support this controls: '${type}'`);
            return this;
        }
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    compileAll() {
        return this;
    }
    dispose(parameter) {
        return this;
    }
}
//# sourceMappingURL=ControlsCompiler.js.map