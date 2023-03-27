import { Compiler } from "@vis-three/middleware";
import { BufferGeometry } from "three";
import { GeometryAllType } from "./GeometryInterface";

export class GeometryCompiler extends Compiler<
  GeometryAllType,
  BufferGeometry
> {
  constructor() {
    super();
  }
}
