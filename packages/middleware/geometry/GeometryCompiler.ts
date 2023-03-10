import { BufferGeometry } from "three";
import { GeometryAllType } from "./GeometryInterface";
import { Compiler } from "../module";

export class GeometryCompiler extends Compiler<
  GeometryAllType,
  BufferGeometry
> {
  constructor() {
    super();
  }
}
