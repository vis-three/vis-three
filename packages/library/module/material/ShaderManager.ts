import { IUniform } from "three";
export interface Shader {
  name: string;
  defines?: { [key: string]: any };
  uniforms?: Record<string, IUniform>;
  vertexShader?: string;
  fragmentShader?: string;
}

export interface ShaderConfig {
  shader: string;
  uniforms: Record<string, IUniform>;
}

export class ShaderManager {
  private static library = new Map<string, Shader>();

  /**
   * 注册着色器文件
   * @param shader
   */
  static register = function (shader: Shader) {
    if (ShaderManager.library.has(shader.name)) {
      console.warn(
        `shader library has exist shader: ${shader.name} that will be cover.`
      );
    }

    ShaderManager.library.set(shader.name, shader);
  };

  /**
   * 获取着色器文件
   * @param name 文件名
   * @returns shader | null
   */
  static getShader(name: string): Shader | null {
    if (!ShaderManager.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return null;
    }

    return ShaderManager.cloneShader(ShaderManager.library.get(name)!);
  }

  /**
   * 获取该着色器文件对应的配置
   * @param name
   * @returns
   */
  static generateConfig(
    name: string,
    uniforms?: Record<string, IUniform>
  ): ShaderConfig {
    if (!ShaderManager.library.has(name)) {
      console.warn(`con not found shader in shader library: ${name}`);
      return { shader: name, uniforms: {} };
    }

    const shader = ShaderManager.library.get(name)!;

    const config: ShaderConfig = {
      shader: name,
      uniforms: {},
    };

    shader.uniforms &&
      (config.uniforms = JSON.parse(JSON.stringify(shader.uniforms)));

    if (uniforms) {
      const recursion = (config: object, merge: object) => {
        for (const key in merge) {
          if (config[key] === undefined) {
            continue;
          }
          if (
            typeof merge[key] === "object" &&
            merge[key] !== null &&
            !Array.isArray(merge[key])
          ) {
            if (config[key] === null) {
              config[key] = { ...merge[key] };
            }
            recursion(config[key], merge[key]);
          } else {
            config[key] = merge[key];
          }
        }
      };

      recursion(config.uniforms!, uniforms);
    }

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
