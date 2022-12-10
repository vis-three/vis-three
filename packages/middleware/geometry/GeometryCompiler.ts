import { BufferGeometry } from "three";
import { GeometryAllType } from "./GeometryInterface";
import { ParametricGeometryProcessors } from "./processor/ParametricGeometryProcessors";
import LoadGeometryProcessor from "./processor/LoadGeometryProcessor";
import CustomGeometryProcessor from "./processor/CustomGeometryProcessor";
import EdgesGeometryProcessor from "./processor/EdgesGeometryProcessor";
import { Compiler } from "@vis-three/core";
import { MODULETYPE } from "../constants";

export class GeometryCompiler extends Compiler<
  GeometryAllType,
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
