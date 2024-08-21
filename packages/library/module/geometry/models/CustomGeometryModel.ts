import { BufferGeometry, Float32BufferAttribute } from "three";
import { getCustomGeometryConfig } from "../GeometryConfig";
import { CustomGeometryConfig } from "../GeometryInterface";
import { defineGeometryModel } from "./common";

export default defineGeometryModel<
  CustomGeometryConfig,
  BufferGeometry,
  {},
  {
    generateGeometry: (
      attribute: CustomGeometryConfig["attribute"]
    ) => BufferGeometry;
  }
>((geometryModel) => ({
  type: "CustomGeometry",
  config: getCustomGeometryConfig,
  shared: {
    generateGeometry(
      attribute: CustomGeometryConfig["attribute"]
    ): BufferGeometry {
      const geometry = new BufferGeometry();
      attribute.position.length &&
        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(attribute.position, 3)
        );

      attribute.color.length &&
        geometry.setAttribute(
          "color",
          new Float32BufferAttribute(attribute.color, 3)
        );
      attribute.normal.length &&
        geometry.setAttribute(
          "normal",
          new Float32BufferAttribute(attribute.normal, 3)
        );
      attribute.uv.length &&
        geometry.setAttribute(
          "uv",
          new Float32BufferAttribute(attribute.uv, 2)
        );

      attribute.uv2.length &&
        geometry.setAttribute(
          "uv2",
          new Float32BufferAttribute(attribute.uv2, 2)
        );

      attribute.index.length && geometry.setIndex(attribute.index);
      return geometry;
    },
  },
  create({ model, config }) {
    return geometryModel.create!(
      model.generateGeometry(config.attribute),
      config
    );
  },
  dispose({ target }) {
    geometryModel.dispose!(target);
  },
}));
