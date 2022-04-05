import { CanvasTexture, CubeTexture, Texture } from "three";
import { validate } from "uuid";
import { ImageTexture } from "../../extends/texture/ImageTexture";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { CubeTextureConfig, TextureAllType } from "./TextureConfig";
import { CONFIGTYPE } from "../constants/configType";
import { VideoTexture } from "../../optimize/VideoTexture";

export interface TextureCompilerTarget extends CompilerTarget {
  [key: string]: TextureAllType;
}

export interface TextureCompilerParameters {
  target: TextureCompilerTarget;
}

export class TextureCompiler extends Compiler {
  private target!: TextureCompilerTarget;
  private map: Map<SymbolConfig["type"], Texture>;
  private constructMap: Map<string, Function>;
  private resourceMap: Map<string, unknown>;

  constructor(parameters?: TextureCompilerParameters) {
    super();
    if (parameters) {
      parameters.target && (this.target = parameters.target);
    } else {
      this.target = {};
    }

    this.map = new Map();
    this.resourceMap = new Map();

    const constructMap = new Map();
    constructMap.set(CONFIGTYPE.IMAGETEXTURE, () => new ImageTexture());
    constructMap.set(CONFIGTYPE.CUBETEXTURE, () => new CubeTexture());
    constructMap.set(
      CONFIGTYPE.CANVASTEXTURE,
      () => new CanvasTexture(document.createElement("canvas"))
    );
    constructMap.set(
      CONFIGTYPE.VIDEOTEXTURE,
      () => new VideoTexture(document.createElement("video"))
    );

    this.constructMap = constructMap;
  }

  private getResource(
    url: string
  ): HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | null {
    const resourceMap = this.resourceMap;
    if (resourceMap.has(url)) {
      const resource = resourceMap.get(url)!;
      if (
        resource instanceof HTMLImageElement ||
        resource instanceof HTMLCanvasElement ||
        resource instanceof HTMLVideoElement
      ) {
        return resource;
      } else {
        console.error(
          `this url mapping resource is not a texture image class: ${url}`
        );
        return null;
      }
    } else {
      console.warn(`resource can not font url: ${url}`);
      return null;
    }
  }

  linkRescourceMap(map: Map<string, unknown>): this {
    this.resourceMap = map;
    return this;
  }

  add(vid: string, config: TextureAllType): this {
    if (validate(vid)) {
      if (config.type && this.constructMap.has(config.type)) {
        const texture = this.constructMap.get(config.type)!();
        const tempConfig = JSON.parse(JSON.stringify(config));
        delete tempConfig.type;
        delete tempConfig.vid;

        // 应用资源
        // 区分不同的texture类型

        if (
          [
            CONFIGTYPE.IMAGETEXTURE,
            CONFIGTYPE.CANVASTEXTURE,
            CONFIGTYPE.VIDEOTEXTURE,
          ].includes(config.type as CONFIGTYPE)
        ) {
          texture.image = this.getResource(tempConfig.url);
          delete tempConfig.url;
        } else if (config.type === CONFIGTYPE.CUBETEXTURE) {
          const cube = (config as CubeTextureConfig).cube;
          const images = [
            this.getResource(cube.px),
            this.getResource(cube.nx),

            this.getResource(cube.py),
            this.getResource(cube.ny),

            this.getResource(cube.pz),
            this.getResource(cube.nz),
          ];
          texture.image = images;
          delete tempConfig.cube;
        }

        Compiler.applyConfig(tempConfig, texture);

        texture.needsUpdate = true;

        this.map.set(vid, texture);
      } else {
        console.warn(
          `texture compiler can not support this type: ${config.type}`
        );
      }
    } else {
      console.error(`texture vid parameter is illegal: ${vid}`);
    }
    return this;
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!validate(vid)) {
      console.warn(`texture compiler set function: vid is illeage: '${vid}'`);
      return this;
    }

    if (!this.map.has(vid)) {
      console.warn(
        `texture compiler set function: can not found texture which vid is: '${vid}'`
      );
      return this;
    }

    const texture = this.map.get(vid)!;

    if (key === "needsUpdate") {
      if (value) {
        texture.needsUpdate = true;
        const config = this.target[vid];
        config.needsUpdate = false;
      }
      return this;
    }

    let config = texture;
    path.forEach((key, i, arr) => {
      config = config[key];
    });
    config[key] = value;

    texture.needsUpdate = true;

    return this;
  }

  getMap(): Map<SymbolConfig["type"], Texture> {
    return this.map;
  }

  setTarget(target: TextureCompilerTarget): this {
    this.target = target;
    return this;
  }

  compileAll(): this {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }

  dispose(): this {
    return this;
  }
}
