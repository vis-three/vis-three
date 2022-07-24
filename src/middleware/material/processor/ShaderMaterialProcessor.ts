import { ShaderMaterial } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { ShaderLibrary } from "../../../library/shader/ShaderLibrary";
import { syncObject } from "../../../utils/utils";
import { CONFIGTYPE } from "../../constants/configType";
import { ShaderMaterialConfig } from "../MaterialConfig";
import { commonNeedUpdatesRegCommand, create, dispose } from "./common";

export default defineProcessor<ShaderMaterialConfig, ShaderMaterial>({
  configType: CONFIGTYPE.SHADERMATERIAL,
  commands: {
    set: {
      shader({ target, value }) {
        const shader = ShaderLibrary.getShader(value);
        shader?.vertexShader && (target.vertexShader = shader.vertexShader);
        shader?.fragmentShader &&
          (target.fragmentShader = shader.fragmentShader);
        shader?.uniforms && (target.uniforms = shader.uniforms);
        shader?.defines && (target.defines = shader.defines);
        target.needsUpdate = true;
      },
      $reg: [commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: ShaderMaterialConfig,
    engine: EngineSupport
  ): ShaderMaterial {
    const material = new ShaderMaterial();

    const shader = ShaderLibrary.getShader(config.shader);
    shader?.vertexShader && (material.vertexShader = shader.vertexShader);
    shader?.fragmentShader && (material.fragmentShader = shader.fragmentShader);
    shader?.uniforms && (material.uniforms = shader.uniforms);
    shader?.defines && (material.defines = shader.defines);

    syncObject(config, material, {
      type: true,
      shader: true,
    });

    material.needsUpdate = true;
    return material;
  },
  dispose,
});
