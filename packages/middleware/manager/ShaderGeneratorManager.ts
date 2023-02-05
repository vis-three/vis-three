import { IUniform } from "three";
export interface Shader {
  name: string;
  defines?: { [key: string]: any };
  uniforms?: { [uniform: string]: IUniform };
  vertexShader?: string;
  fragmentShader?: string;
}

export class ShaderGeneratorManager {
  private static library = new Map<string, Shader>();

  /**
   * 注册着色器文件
   * @param shader
   */
  static register = function (shader: Shader) {
    if (ShaderGeneratorManager.library.has(shader.name)) {
      console.warn(
        `shader library has exist shader: ${shader.name} that will be cover.`
      );
    }

    ShaderGeneratorManager.library.set(shader.name, shader);
  };

  /**
   * 获取着色器文件
   * @param name 文件名
   * @returns shader | null
   */
  static getShader(name: string): Shader | null {
    if (!ShaderGeneratorManager.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return null;
    }

    return ShaderGeneratorManager.cloneShader(
      ShaderGeneratorManager.library.get(name)!
    );
  }

  /**
   * 获取该着色器文件对应的配置
   * @param name
   * @returns
   */
  static generateConfig(name: string): { [key: string]: any } {
    if (!ShaderGeneratorManager.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return {};
    }

    const shader = ShaderGeneratorManager.library.get(name)!;

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
