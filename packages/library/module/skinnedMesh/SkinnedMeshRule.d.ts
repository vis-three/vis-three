import { Rule } from "@vis-three/middleware";
import { SkinnedMeshCompiler } from "./SkinnedMeshCompiler";
import { SolidObjectRule } from "@vis-three/module-solid-object";
import { SkinnedMeshConfig } from "./SkinnedMeshConfig";
import { SkinnedMesh } from "three";
export type SkinnedMeshRule = SolidObjectRule<SkinnedMeshCompiler, SkinnedMeshConfig, SkinnedMesh>;
export declare const SkinnedMeshRule: Rule<SkinnedMeshCompiler>;
