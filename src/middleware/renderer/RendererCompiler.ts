import {
  BaseEvent,
  Camera,
  OrthographicCamera,
  PerspectiveCamera,
  WebGLRenderer,
} from "three";
import { Engine } from "../../engine/Engine";
import { RenderEvent, RenderManager } from "../../manager/RenderManager";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
import { RENDERERMANAGER } from "../constants/EVENTTYPE";
import {
  getWebGLRendererConfig,
  RendererAllType,
  WebGLRendererConfig,
  WebGLRendererScissor,
  WebGLRendererViewPort,
} from "./RendererConfig";
import { WebGLRendererCompiler } from "./WebGLRendererCompiler";

export interface RendererCompilerTarget extends CompilerTarget {
  [key: string]: WebGLRendererConfig;
}

export interface RendererComilerMap {
  WebGLRenderer?: WebGLRendererCompiler;
}

export interface RendererCompilerParameters {
  target?: RendererCompilerTarget;
  engine: Engine;
}

export class RendererCompiler extends Compiler {
  private target!: RendererCompilerTarget;
  private engine!: Engine;
  private map: RendererComilerMap;

  constructor(parameters?: RendererCompilerParameters) {
    super();
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.target = {};
      this.engine = new Engine();
    }

    this.map = {};
  }

  add(type: string, config: RendererAllType) {
    if (type === "WebGLRenderer") {
      const rendererCompiler = new WebGLRendererCompiler({
        engine: this.engine,
        target: config as WebGLRendererConfig,
      });

      rendererCompiler.compileAll();
      this.map[type] = rendererCompiler;
    }
  }

  set(path: string[], key: string, value: any): this {
    const rendererType = path.shift();

    // 整体替换
    if (!rendererType) {
      this.map[key].setTarget(value).compileAll();
      return this;
    }

    if (this.map[rendererType]) {
      this.map[rendererType].set(path, key, value);
      return this;
    } else {
      console.warn(
        `renderer compiler can not support this type: ${rendererType}`
      );
      return this;
    }
  }

  setTarget(target: RendererCompilerTarget): this {
    this.target = target;
    return this;
  }

  compileAll(): this {
    const target = this.target;
    Object.keys(target).forEach((type) => {
      this.add(type, target[type]);
    });
    return this;
  }

  dispose(): this {
    return this;
  }
}
