import { Mesh } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { MeshCompiler, MeshCompilerTarget } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
export declare type MeshRule = ObjectRule<MeshCompiler, MeshConfig, MeshCompilerTarget, Mesh>;
export declare const MeshRule: MeshRule;
