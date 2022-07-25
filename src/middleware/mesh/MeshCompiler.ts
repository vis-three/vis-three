import {
  BoxBufferGeometry,
  BufferGeometry,
  Material,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";
import MeshProcessor from "./MeshProcessor";

export interface MeshCompilerTarget
  extends SolidObjectCompilerTarget<MeshConfig> {}

export class MeshCompiler extends SolidObjectCompiler<
  MeshConfig,
  MeshCompilerTarget,
  Mesh
> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor() {
    super();
  }
}

Compiler.processor(MeshProcessor);
