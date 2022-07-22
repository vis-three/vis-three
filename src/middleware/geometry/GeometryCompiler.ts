import { BufferGeometry } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { GeometryAllType } from "./GeometryInterface";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ParametricGeometryProcessors } from "./processor/ParametricGeometryProcessors";
import LoadGeometryProcessor from "./processor/LoadGeometryProcessor";
import CustomGeometryProcessor from "./processor/CustomGeometryProcessor";
import EdgesGeometryProcessor from "./processor/EdgesGeometryProcessor";

export interface GeometryCompilerTarget
  extends CompilerTarget<GeometryAllType> {}

export class GeometryCompiler extends Compiler<
  GeometryAllType,
  GeometryCompilerTarget,
  BufferGeometry
> {
  MODULE: MODULETYPE = MODULETYPE.GEOMETRY;

  constructor() {
    super();
  }
}

ParametricGeometryProcessors.forEach((processor) => {
  Compiler.processor(processor);
});

Compiler.processor(LoadGeometryProcessor);
Compiler.processor(CustomGeometryProcessor);
Compiler.processor(EdgesGeometryProcessor);
