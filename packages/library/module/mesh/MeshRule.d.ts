import { SolidObjectRule } from "@vis-three/module-solid-object";
import { Mesh } from "three";
import { MeshCompiler } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";
export type MeshRule = SolidObjectRule<MeshCompiler, MeshConfig, Mesh>;
export declare const MeshRule: MeshRule;
