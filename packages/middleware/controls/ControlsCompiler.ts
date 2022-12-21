import { VisOrbitControls } from "@vis-three/core";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { uniqueSymbol } from "../common";
import { MODULETYPE } from "../constants";
import { CONFIGTYPE } from "../constants/configType";
import { EngineSupport } from "../engine";
import { Compiler } from "../module";

import { ControlsAllConfig } from "./ControlsConfig";
import OrbitControlsProcessor from "../../strategy/OrbitControlsSupportStrategy/OrbitControlsProcessor";
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

    return super.useEngine(engine);
  }
}

Compiler.processor(OrbitControlsProcessor);
Compiler.processor(TransformControlsProcessor);
