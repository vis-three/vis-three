import { WebGLRenderer } from "three";
import { Engine } from "../../engine/Engine";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import {
  getWebGLRendererConfig,
  RendererAllType,
  WebGLRendererConfig,
  WebGLRendererScissor,
  WebGLRendererViewPort,
} from "./RendererConfig";
import { CONFIGTYPE } from "../constants/configType";
import { WebGLRendererProcessor } from "./WebGLRendererProcessor";
import { Processor } from "../../core/Processor";
import { EngineSupport } from "../../main";

export interface RendererCompilerTarget extends CompilerTarget {
  [key: string]: WebGLRendererConfig;
}

export interface RendererCompilerParameters {
  target?: RendererCompilerTarget;
  engine: Engine;
}

export class RendererCompiler extends Compiler {
  private target!: RendererCompilerTarget;
  private engine!: Engine;

  private processorMap = {
    [CONFIGTYPE.WEBGLRENDERER]: new WebGLRendererProcessor(),
  };

  private map = new Map<string, WebGLRenderer>();

  constructor(parameters?: RendererCompilerParameters) {
    super();
    if (parameters) {
      parameters.target && (this.target = parameters.target);
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.target = {};
      this.engine = new Engine();
    }
  }

  assembly(vid: string, callback: (params: Processor) => void) {
    const config = this.target[vid];
    if (!config) {
      console.warn(`controls compiler can not found this config: '${vid}'`);
      return;
    }

    const processer = this.processorMap[config.type];

    if (!processer) {
      console.warn(`renderer compiler can not support this renderer: '${vid}'`);
      return;
    }

    const renderer = this.map.get(vid);

    if (!renderer) {
      console.warn(
        `renderer compiler can not found type of renderer: '${config.type}'`
      );
      return;
    }

    processer.dispose().assemble({
      config,
      renderer,
      processer,
      engine: this.engine,
    });

    callback(processer);
  }

  add(config: RendererAllType) {
    if (config.type === CONFIGTYPE.WEBGLRENDERER) {
      // TODO: 支持多renderer?
      this.map.set(config.vid, this.engine.webGLRenderer!);
    }

    this.assembly(config.vid, (processer) => {
      processer.processAll().dispose();
    });
  }

  setTarget(target: RendererCompilerTarget): this {
    this.target = target;
    return this;
  }

  useEngine(engine: EngineSupport): this {
    if (engine.webGLRenderer) {
      this.map.set(CONFIGTYPE.WEBGLRENDERER, engine.webGLRenderer);
    }
    this.engine = engine;
    return this;
  }

  compileAll(): this {
    const target = this.target;
    for (const config of Object.values(target)) {
      this.add(config);
    }
    return this;
  }

  dispose(): this {
    return this;
  }
}
