import {
  BoxBufferGeometry,
  BufferGeometry,
  Material,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
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
