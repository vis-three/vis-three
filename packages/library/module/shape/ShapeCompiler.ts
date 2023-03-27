import { Compiler } from "@vis-three/middleware";
import { Shape } from "three";
import { ShapeConfig } from "./ShapeConfig";

export class ShapeCompiler extends Compiler<ShapeConfig, Shape> {
  constructor() {
    super();
  }
}
