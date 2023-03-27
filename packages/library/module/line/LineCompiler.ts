import { SolidObjectCompiler } from "@vis-three/module-solid-object";
import { Line } from "three";
import { LineConfig } from "./LineConfig";

export class LineCompiler extends SolidObjectCompiler<LineConfig, Line> {
  constructor() {
    super();
  }
}
