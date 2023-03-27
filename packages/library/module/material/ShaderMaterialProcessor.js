import { syncObject } from "@vis-three/utils";
import { ShaderMaterial } from "three";
import { getShaderMaterialConfig, } from "./MaterialConfig";
import { commonNeedUpdatesRegCommand, dispose } from "./common";
import { defineProcessor, ShaderGeneratorManager, } from "@vis-three/middleware";
export default defineProcessor({
    type: "ShaderMaterial",
    config: getShaderMaterialConfig,
    commands: {
        set: {
            shader({ target, value }) {
                const shader = ShaderGeneratorManager.getShader(value);
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
    create: function (config, engine) {
        const material = new ShaderMaterial();
        const shader = ShaderGeneratorManager.getShader(config.shader);
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
