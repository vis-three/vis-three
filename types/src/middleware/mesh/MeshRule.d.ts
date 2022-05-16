import { Mesh } from "three";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { MeshCompiler, MeshCompilerTarget } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
export declare type MeshRule = SolidObjectRule<MeshCompiler, MeshConfig, MeshCompilerTarget, Mesh>;
export declare const MeshRule: MeshRule;
