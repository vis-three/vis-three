import { Compiler } from "../module";
import { Mesh } from "three";
import { MODULETYPE } from "../constants";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";
import MeshProcessor from "./MeshProcessor";

export class MeshCompiler extends SolidObjectCompiler<MeshConfig, Mesh> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor() {
    super();
  }
}

Compiler.processor(MeshProcessor);
