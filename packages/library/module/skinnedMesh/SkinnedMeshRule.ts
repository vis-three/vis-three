import { ProxyNotice, Rule } from "@vis-three/middleware";
import { SkinnedMeshCompiler } from "./SkinnedMeshCompiler";
import { ObjectRule } from "@vis-three/module-object";
import { SolidObjectRule } from "@vis-three/module-solid-object";
import { SkinnedMeshConfig } from "./SkinnedMeshConfig";
import { SkinnedMesh } from "three";

export type SkinnedMeshRule = SolidObjectRule<
  SkinnedMeshCompiler,
  SkinnedMeshConfig,
  SkinnedMesh
>;

export const SkinnedMeshRule: Rule<SkinnedMeshCompiler> = function (
  input: ProxyNotice,
  compiler
) {
  ObjectRule(input, compiler);
};
