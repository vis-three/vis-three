import { BufferGeometry, Euler, Mesh, Quaternion, Vector3 } from "three";
import { getDecalGeometryConfig } from "../GeometryConfig";
import { DecalGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry.js";

export default defineGeometryModel<
  DecalGeometryConfig,
  DecalGeometry,
  {},
  {
    tempGeometry: BufferGeometry;
    tempMesh: Mesh;
  }
>((geometryModel) => ({
  type: "DecalGeometry",
  config: getDecalGeometryConfig,
  shared: {
    tempGeometry: new BufferGeometry(),
    tempMesh: new Mesh(),
  },
  create({ model, config, engine }) {
    const geometry = config.target.geometry
      ? engine.getObjectBySymbol(config.target.geometry) || model.tempGeometry
      : model.tempGeometry;

    model.tempMesh.geometry = geometry;

    model.tempMesh.matrixWorld.compose(
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

    return geometryModel.create!(
      new DecalGeometry(
        model.tempMesh,
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
  dispose({ target }) {
    geometryModel.dispose!(target);
  },
}));
