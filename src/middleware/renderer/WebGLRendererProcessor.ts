import { OrthographicCamera, PerspectiveCamera, WebGLRenderer } from "three";
import { Process, Processor } from "../../core/Processor";
import { Engine } from "../../engine/Engine";
import { RenderEvent } from "../../manager/RenderManager";
import { Vector2Config } from "../common/CommonConfig";
import {
  WebGLRendererConfig,
  WebGLRendererScissor,
  WebGLRendererViewPort,
} from "./RendererConfig";

export interface WebGLRendererProcessAssemble {
  renderer: WebGLRenderer;
  config: WebGLRendererConfig;
  engine: Engine;
}

export interface GLRendererCacheData {
  adaptiveCameraFun?: (event: RenderEvent) => void;
}
export class WebGLRendererProcessor implements Processor {
  private renderer?: WebGLRenderer;
  private config?: WebGLRendererConfig;
  private engine?: Engine;
  private assembly = false;
  private rendererCacheData: GLRendererCacheData;

  constructor() {
    this.rendererCacheData = {};
  }

  assemble(params: WebGLRendererProcessAssemble): this {
    this.renderer = params.renderer;
    this.config = params.config;
    this.engine = params.engine;
    this.assembly = true;
    return this;
  }

  process(params: Process): this {
    // 如果有path
    if (!this.assembly) {
      console.warn(`webGLRenderer Processor unassembled`);
      return this;
    }

    if (this[params.key]) {
      this[params.key](params.value);
      return this;
    }

    if (params.path.length) {
      this[params.path[0]] && this[params.path[0]](params.value);
      return this;
    }

    this.merge(params.key, params.value);
    return this;
  }

  processAll(): this {
    if (!this.assembly) {
      console.warn(`webGLRenderer Processor unassembled`);
      return this;
    }

    const config = this.config!;
    for (const key of Object.keys(config)) {
      this.process({
        path: [],
        key,
        value: config[key],
      });
    }

    return this;
  }

  dispose(): this {
    this.renderer = undefined;
    this.config = undefined;
    this.engine = undefined;
    this.assembly = false;
    return this;
  }

  private clearColor(value): this {
    // 取出alpha的值
    const alpha = Number(value.slice(0, -1).split(",").pop().trim());
    this.renderer!.setClearColor(value, alpha);
    this.renderer!.clear();
    return this;
  }

  private pixelRatio(value): this {
    this.renderer!.setPixelRatio(value);
    this.renderer!.clear();
    return this;
  }

  private size(): this {
    const renderer = this.renderer!;
    const vector2 = this.config!.size;
    if (vector2) {
      renderer.setSize(vector2.x, vector2.y);
    } else {
      const domElement = renderer.domElement;
      renderer.setSize(domElement.offsetWidth, domElement.offsetHeight);
    }

    return this;
  }

  private viewport(): this {
    const renderer = this.renderer!;
    const config = this.config!.viewport;
    if (config) {
      renderer.setViewport(config.x, config.y, config.width, config.height);
    } else {
      const domElement = renderer.domElement;
      renderer.setViewport(
        0,
        0,
        domElement.offsetWidth,
        domElement.offsetHeight
      );
    }
    return this;
  }

  private scissor(): this {
    const renderer = this.renderer!;
    const config = this.config!.scissor;
    if (config) {
      renderer.setScissorTest(true);
      renderer.setScissor(config.x, config.y, config.width, config.height);
    } else {
      renderer.setScissorTest(false);
      const domElement = renderer.domElement;
      renderer.setScissor(
        0,
        0,
        domElement.offsetWidth,
        domElement.offsetHeight
      );
    }
    return this;
  }

  private adaptiveCamera(value: boolean): this {
    if (!this.engine) {
      console.warn(`renderer compiler is not set engine.`);
      return this;
    }

    const renderer = this.renderer!;
    const engine = this.engine!;
    const renderManager = engine.renderManager!;

    if (!value) {
      if (!this.rendererCacheData.adaptiveCameraFun) {
        return this;
      }

      if (this.rendererCacheData.adaptiveCameraFun) {
        renderManager.removeEventListener(
          "render",
          this.rendererCacheData.adaptiveCameraFun
        );
        this.rendererCacheData.adaptiveCameraFun = undefined;
        return this;
      }
    }

    if (value) {
      if (this.rendererCacheData.adaptiveCameraFun) {
        renderManager.addEventListener(
          "render",
          this.rendererCacheData.adaptiveCameraFun
        );
        return this;
      }

      const adaptiveCameraFun = (event: RenderEvent) => {
        const camera = engine.currentCamera!;
        const domWidth = renderer.domElement.offsetWidth;
        const domHeight = renderer.domElement.offsetHeight;
        let width = 0;
        let height = 0;
        let offsetX = 0;
        let offsetY = 0;
        let aspect = 0;
        // 根据相机类型去设置viewPoint
        if (camera instanceof PerspectiveCamera) {
          aspect = camera.aspect;
        } else if (camera instanceof OrthographicCamera) {
          width = camera.right - camera.left;
          height = camera.top - camera.bottom;
          aspect = width / height;
        } else {
          console.warn(`renderer compiler can not support this camera`, camera);
          return;
        }

        if (aspect >= 1) {
          width = domWidth;
          height = width / aspect;
          offsetY = domHeight / 2 - height / 2;
        } else {
          height = domHeight;
          width = height * aspect;
          offsetX = domWidth / 2 - width / 2;
        }
        renderer.setScissor(offsetX, offsetY, width, height);
        renderer.setViewport(offsetX, offsetY, width, height);
        renderer.setScissorTest(true);
      };

      this.rendererCacheData.adaptiveCameraFun = adaptiveCameraFun;
      renderManager.addEventListener(
        "render",
        this.rendererCacheData.adaptiveCameraFun
      );
    }

    return this;
  }

  private merge(key: string, value: any): boolean {
    this.renderer![key] = value;
    return true;
  }
}
