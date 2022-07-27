import { Pass } from "three/examples/jsm/postprocessing/EffectComposer";
import { Compiler } from "../../core/Compiler";
import { PassConfigAllType } from "./PassConfig";
import { EngineSupport } from "../../engine/EngineSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
export declare class PassCompiler extends Compiler<PassConfigAllType, Pass> {
    MODULE: MODULETYPE;
    private composer;
    constructor();
    useEngine(engine: EngineSupport): this;
    add(config: PassConfigAllType): Pass | null;
    remove(config: PassConfigAllType): this;
}
