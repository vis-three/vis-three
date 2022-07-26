import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
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
      this.map.set(CONFIGTYPE.TRNASFORMCONTROLS, engine.transformControls);
      this.weakMap.set(engine.transformControls, CONFIGTYPE.TRNASFORMCONTROLS);
    }

    if (engine.orbitControls) {
      this.map.set(CONFIGTYPE.ORBITCONTROLS, engine.orbitControls);
      this.weakMap.set(engine.orbitControls, CONFIGTYPE.ORBITCONTROLS);
    }

    return super.useEngine(engine);
  }
}

Compiler.processor(OrbitControlsProcessor);
Compiler.processor(TransformControlsProcessor);
