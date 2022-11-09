import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import { uniqueSymbol } from "../constants/UNIQUESYMBOL";
import { ControlsAllConfig } from "./ControlsConfig";
import OrbitControlsProcessor from "./processor/OrbitControlsProcessor";
import TransformControlsProcessor from "./processor/TransformControlsProcessor";

export type ControlsAllType = TransformControls | VisOrbitControls;

export class ControlsCompiler extends Compiler<
  ControlsAllConfig,
  ControlsAllType
> {
  MODULE: MODULETYPE = MODULETYPE.CONTROLS;

  constructor() {
    super();
  }

  useEngine(engine: EngineSupport): this {
    if (engine.transformControls) {
      this.map.set(
        uniqueSymbol(CONFIGTYPE.TRNASFORMCONTROLS),
        engine.transformControls
      );
      this.weakMap.set(
        engine.transformControls,
        uniqueSymbol(CONFIGTYPE.TRNASFORMCONTROLS)
      );
    }

    if (engine.orbitControls) {
      this.map.set(
        uniqueSymbol(CONFIGTYPE.ORBITCONTROLS),
        engine.orbitControls
      );
      this.weakMap.set(
        engine.orbitControls,
        uniqueSymbol(CONFIGTYPE.ORBITCONTROLS)
      );
    }

    return super.useEngine(engine);
  }
}

Compiler.processor(OrbitControlsProcessor);
Compiler.processor(TransformControlsProcessor);
