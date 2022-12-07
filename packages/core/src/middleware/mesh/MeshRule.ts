import { Mesh } from "three";
import { ProxyNotice } from "../../core/DataContainer";
import { ObjectRule } from "../object/ObjectRule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { MeshCompiler } from "./MeshCompiler";
import { MeshConfig } from "./MeshConfig";

export type MeshRule = SolidObjectRule<MeshCompiler, MeshConfig, Mesh>;

export const MeshRule: MeshRule = function (
  notice: ProxyNotice,
  compiler: MeshCompiler
) {
  ObjectRule(notice, compiler);
};
