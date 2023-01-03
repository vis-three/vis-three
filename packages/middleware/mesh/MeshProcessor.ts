import { Mesh } from "three";
import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { MeshConfig } from "./MeshConfig";

export default defineProcessor<MeshConfig, Mesh, EngineSupport>({
  configType: CONFIGTYPE.MESH,
  commands: <SolidObjectCommands<MeshConfig, Mesh>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: MeshConfig, engine: EngineSupport): Mesh {
    return solidObjectCreate(new Mesh(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
