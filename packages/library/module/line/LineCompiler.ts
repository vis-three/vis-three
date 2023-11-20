import { SolidObjectCompiler } from "@vis-three/module-solid-object";
import { Line, LineSegments } from "three";
import { LineConfig } from "./LineConfig";

export class LineCompiler extends SolidObjectCompiler<LineConfig, Line> {
  constructor() {
    super();
  }
}
