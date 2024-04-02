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
    const mesh = new Mesh();

    mesh.morphTargetInfluences = JSON.parse(
      JSON.stringify(config.morphTargetInfluences)
    );
    mesh.morphTargetDictionary = JSON.parse(
      JSON.stringify(config.morphTargetDictionary)
    );

    return solidObjectCreate(
      mesh,
      config,
      {
        morphTargetInfluences: true,
        morphTargetDictionary: true,
      },
      engine
    );
  },
  dispose: solidObjectDispose,
});
