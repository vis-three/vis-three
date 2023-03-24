import { defineProcessor, } from "@vis-three/middleware";
import { BufferGeometry, Float32BufferAttribute } from "three";
import { commands, create } from "./common";
import { getCustomGeometryConfig } from "./GeometryConfig";
const generateGeometry = function (attribute) {
    const geometry = new BufferGeometry();
    attribute.position.length &&
        geometry.setAttribute("position", new Float32BufferAttribute(attribute.position, 3));
    attribute.color.length &&
        geometry.setAttribute("color", new Float32BufferAttribute(attribute.color, 3));
    attribute.normal.length &&
        geometry.setAttribute("normal", new Float32BufferAttribute(attribute.normal, 3));
    attribute.uv.length &&
        geometry.setAttribute("uv", new Float32BufferAttribute(attribute.uv, 2));
    attribute.uv2.length &&
        geometry.setAttribute("uv2", new Float32BufferAttribute(attribute.uv2, 2));
    attribute.index.length && geometry.setIndex(attribute.index);
    return geometry;
};
export default defineProcessor({
    type: "CustomGeometry",
    config: getCustomGeometryConfig,
    commands: commands,
    create(config) {
        return create(generateGeometry(config.attribute), config);
    },
    dispose(target) {
        target.dispose();
    },
});
