import { PointsMaterial, ShaderMaterial } from "three";
import {
  getPointsMaterialConfig,
  getShaderMaterialConfig,
  PointsMaterialConfig,
  ShaderMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";
import { ShaderManager } from "../ShaderManager";
import { syncObject } from "@vis-three/utils";

export default defineMaterialModel<
  ShaderMaterialConfig,
  ShaderMaterial,
  {},
  {
    defaultVertexShader: string;
    defaultFragmentShader: string;
  }
>((materialModel) => ({
  type: "ShaderMaterial",
  config: getShaderMaterialConfig,
  shared: {
    defaultVertexShader: `
  void main () {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
    defaultFragmentShader: `
    void main () {
      gl_FragColor = vec4(0.8,0.8,0.8,1.0);
    }`,
  },
  commands: {
    set: {
      shader({ model, target, value }) {
        target.vertexShader = model.defaultVertexShader;
        target.fragmentShader = model.defaultFragmentShader;

        if (value) {
          const shader = ShaderManager.getShader(value);
          shader?.vertexShader && (target.vertexShader = shader.vertexShader);
          shader?.fragmentShader &&
            (target.fragmentShader = shader.fragmentShader);
          shader?.uniforms && (target.uniforms = shader.uniforms);
          shader?.defines && (target.defines = shader.defines);
        }

        target.needsUpdate = true;
      },
    },
  },
  create({ model, config, engine }) {
    const material = new ShaderMaterial();
    material.vertexShader = model.defaultVertexShader;
    material.fragmentShader = model.defaultFragmentShader;

    if (config.shader) {
      const shader = ShaderManager.getShader(config.shader);
      shader?.vertexShader && (material.vertexShader = shader.vertexShader);
      shader?.fragmentShader &&
        (material.fragmentShader = shader.fragmentShader);
      shader?.uniforms && (material.uniforms = shader.uniforms);
      shader?.defines && (material.defines = shader.defines);
    }

    syncObject(config, material, {
      type: true,
      shader: true,
    });

    material.needsUpdate = true;
    return material;
  },
  dispose({ target }) {
    materialModel.dispose!({ target });
  },
}));
