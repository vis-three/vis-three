import { BufferGeometry, Float32BufferAttribute } from "three";
import { CONFIGTYPE } from "../../constants/configType";
import { defineProcessor, ProcessorCommands } from "../../module";
import { CustomGeometryConfig } from "../GeometryInterface";
import { commands, create } from "./common";

const generateGeometry = function (
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
    geometry.setAttribute("uv", new Float32BufferAttribute(attribute.uv, 2));

  attribute.uv2.length &&
    geometry.setAttribute("uv2", new Float32BufferAttribute(attribute.uv2, 2));

  attribute.index.length && geometry.setIndex(attribute.index);
  return geometry;
};

export default defineProcessor<CustomGeometryConfig, BufferGeometry>({
  configType: CONFIGTYPE.CUSTOMGEOMETRY,
  commands: <ProcessorCommands<CustomGeometryConfig, BufferGeometry>>(
    (<unknown>commands)
  ),
  create(config: CustomGeometryConfig): BufferGeometry {
    return create(generateGeometry(config.attribute), config);
  },
  dispose(target) {
    target.dispose();
  },
});
