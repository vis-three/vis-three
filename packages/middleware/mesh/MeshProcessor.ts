import { Mesh } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { MeshCompiler } from "./MeshCompiler";
import { getMeshConfig, MeshConfig } from "./MeshConfig";

export default defineProcessor<MeshConfig, Mesh, EngineSupport, MeshCompiler>({
  type: "Mesh",
  config: getMeshConfig,
  commands: <SolidObjectCommands<MeshConfig, Mesh>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: MeshConfig, engine: EngineSupport): Mesh {
    return solidObjectCreate(new Mesh(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
