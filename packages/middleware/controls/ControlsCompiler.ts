import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MODULETYPE } from "../constants";
import { Compiler } from "../module";

import { ControlsAllConfig } from "./ControlsConfig";

export type ControlsAllType = TransformControls | OrbitControls;

export class ControlsCompiler extends Compiler<
  ControlsAllConfig,
  ControlsAllType
> {
  MODULE: MODULETYPE = MODULETYPE.CONTROLS;

  constructor() {
    super();
  }
}
