import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
import { commands, create, dispose } from "./common";
import { GeometryCompiler } from "../GeometryCompiler";
import { getDecalGeometryConfig } from "../GeometryConfig";
import { DecalGeometryConfig } from "../GeometryInterface";
import { BufferGeometry, Euler, Mesh, Quaternion, Vector3 } from "three";

const tempGeometry = new BufferGeometry();
const tempMesh = new Mesh();

export default defineProcessor<
  DecalGeometryConfig,
  DecalGeometry,
  EngineSupport,
  GeometryCompiler
>({
  type: "DecalGeometry",
  config: getDecalGeometryConfig,
  commands: commands as unknown as ProcessorCommands<
    DecalGeometryConfig,
    DecalGeometry,
    EngineSupport,
    GeometryCompiler
  >,
  create: (config, engine) => {
    const geometry = config.target.geometry
      ? engine.getObjectBySymbol(config.target.geometry) || tempGeometry
      : tempGeometry;

    tempMesh.geometry = geometry;

    tempMesh.matrixWorld.compose(
      new Vector3(
        config.target.position.x,
        config.target.position.y,
        config.target.position.z
      ),
      new Quaternion().setFromEuler(
        new Euler(
          config.target.rotation.x,
          config.target.rotation.y,
          config.target.rotation.z
        )
      ),
      new Vector3(
        config.target.scale.x,
        config.target.scale.y,
        config.target.scale.z
      )
    );

    return create(
      new DecalGeometry(
        tempMesh,
        new Vector3(config.point.x, config.point.y, config.point.z),
        new Euler(
          config.orientation.x,
          config.orientation.y,
          config.orientation.z
        ),
        new Vector3(config.size.x, config.size.y, config.size.z)
      ),
      config
    );
  },
  dispose: dispose,
});
