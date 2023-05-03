import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "@vis-three/module-solid-object";
import { Mesh } from "three";

import { MeshCompiler } from "../MeshCompiler";
import { getMeshConfig, MeshConfig } from "../MeshConfig";

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
