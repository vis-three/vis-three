import { Shader } from "./shader";
import uvPulseShader from "./shader/uvPulseShader";
import fragCoordTestingShader from "./shader/fragCoordTestingShader";

export class ShaderLibrary {
  private static library = new Map<string, Shader>();

  /**
   * 注册着色器文件
   * @param shader
   */
  static reigster = function (shader: Shader) {
    if (ShaderLibrary.library.has(shader.name)) {
      console.warn(
        `shader library has exist shader: ${shader.name} that will be cover.`
      );
    }

    ShaderLibrary.library.set(shader.name, shader);
  };

  /**
   * 获取着色器文件
   * @param name 文件名
   * @returns shader | null
   */
  static getShader(name: string): Shader | null {
    if (!ShaderLibrary.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return null;
    }

    return ShaderLibrary.cloneShader(ShaderLibrary.library.get(name)!);
  }

  /**
   * 获取该着色器文件对应的配置
   * @param name
   * @returns
   */
  static generateConfig(name: string): { [key: string]: any } {
    if (!ShaderLibrary.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return {};
    }

    const shader = ShaderLibrary.library.get(name)!;

    const config = {
      shader: name,
      uniforms: {},
    };

    shader.uniforms &&
      (config.uniforms = JSON.parse(JSON.stringify(shader.uniforms)));

    return config;
  }

  /**
   * 克隆着色器
   * @param shader
   * @returns
   */
  static cloneShader(shader: Shader): Shader {
    const newShader: Shader = {
      name: shader.name,
    };

    shader.vertexShader && (newShader.vertexShader = shader.vertexShader);
    shader.fragmentShader && (newShader.fragmentShader = shader.fragmentShader);
    shader.uniforms &&
      (newShader.uniforms = JSON.parse(JSON.stringify(shader.uniforms)));

    return newShader;
  }
}

export const defaultShader = {
  name: "defaultShader",
};

ShaderLibrary.reigster(defaultShader);
ShaderLibrary.reigster(uvPulseShader);
ShaderLibrary.reigster(fragCoordTestingShader);
