import {
  Engine,
  Plugin,
  SetDomEvent,
  ENGINE_EVENT,
  SetSizeEvent,
} from "@vis-three/core";

import {
  RenderManagerEngine,
  RENDER_EVENT,
} from "@vis-three/render-manager-plugin";

import {
  PerspectiveCamera,
  WebGLRenderer,
  WebGLRendererParameters,
} from "three";

export interface Screenshot {
  width?: number;
  height?: number;
  mine?: string;
}
export interface WebGLRendererEngine extends Engine {
  webGLRenderer: WebGLRenderer;
  getScreenshot: (params?: Screenshot) => Promise<string>;
}

export interface WebGLAndRenderEngine
  extends WebGLRendererEngine,
    RenderManagerEngine {
  webGLRenderer: WebGLRenderer;
  getScreenshot: (params?: Screenshot) => Promise<string>;
}

export const WebGLRendererPlugin: Plugin<WebGLRendererEngine> = function (
  params: WebGLRendererParameters
) {
  return {
    name: "WebGLRendererPlugin",
    install(engine: WebGLRendererEngine) {
      engine.webGLRenderer = new WebGLRenderer(params);
      const domElement = engine.webGLRenderer.domElement;
      domElement.style.position = "absolute";
      domElement.style.top = "0";
      domElement.style.left = "0";
      domElement.classList.add("vis-webgl");

      // 截图
      engine.getScreenshot = async function (params: Screenshot = {}) {
        const cacheSize = {
          width: this.dom.offsetWidth,
          height: this.dom.offsetHeight,
        };

        !params.width && (params.width = this.dom!.offsetWidth);
        !params.height && (params.height = this.dom!.offsetHeight);
        !params.mine && (params.mine = "image/png");

        let DataURI = "";

        // 获取当前机器支持的最大buffer
        const gl = this.webGLRenderer.getContext();

        const maxRenderBufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);

        const maxSize = maxRenderBufferSize / 4;

        if (params.width > maxSize || params.height > maxSize) {
          // 判断宽高形成裁剪渲染队列
          const renderList: {
            x: number;
            y: number;
          }[] = [];

          const rowNum = Math.ceil(params.width / maxSize);
          const columnNum = Math.ceil(params.height / maxSize);
          const partWidth = params.width / rowNum;
          const partHeight = params.height / columnNum;

          const tempCanvas = document.createElement("canvas");
          tempCanvas.setAttribute("width", params.width!.toString());
          tempCanvas.setAttribute("height", params.height!.toString());
          const ctx = tempCanvas.getContext("2d");
          if (!ctx) {
            console.warn(`can not support canvas 2d;`);
            return DataURI;
          }

          this.setSize(partWidth, partHeight);

          for (let rowIndex = 0; rowIndex < rowNum; rowIndex += 1) {
            for (
              let columnIndex = 0;
              columnIndex < columnNum;
              columnIndex += 1
            ) {
              renderList.push({
                x: partWidth * rowIndex,
                y: partHeight * columnIndex,
              });
            }
          }

          const drawList: Promise<null>[] = [];
          renderList.forEach((elem) => {
            (this.camera as PerspectiveCamera).setViewOffset(
              params.width!,
              params.height!,
              elem.x,
              elem.y,
              partWidth,
              partHeight
            );
            this.webGLRenderer.render(this.scene, this.camera);

            const DataURI = this.webGLRenderer!.domElement.toDataURL(
              params.mine
            );

            drawList.push(
              new Promise<null>((resolve, reject) => {
                const image = new Image();
                image.src = DataURI;
                image.onload = () => {
                  ctx!.drawImage(image, elem.x, elem.y, partWidth, partHeight);
                  resolve(null);
                };
              })
            );
          });

          this.setSize(cacheSize.width, cacheSize.height);

          await Promise.all(drawList).catch((err) => {
            console.warn(err);
          });

          DataURI = tempCanvas.toDataURL(params.mine);
          (this.camera as PerspectiveCamera).clearViewOffset();
        } else {
          this.setSize(params.width, params.height);
          this.webGLRenderer.render(this.scene, this.camera);
          DataURI = this.webGLRenderer!.domElement.toDataURL(params.mine);
          this.setSize!(cacheSize.width, cacheSize.height);
        }

        return DataURI;
      };

      // 设置渲染的dom
      engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, (event) => {
        event.dom.appendChild(engine.webGLRenderer!.domElement);
      });

      engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, (event) => {
        engine.webGLRenderer!.setSize(event.width, event.height, true);
      });
    },
    installDeps: {
      RenderManagerPlugin(engine: WebGLAndRenderEngine) {
        engine.renderManager.addEventListener(RENDER_EVENT.RENDER, (event) => {
          engine.webGLRenderer.render(engine.scene, engine.camera);
        });

        engine.getScreenshot = async function (params: Screenshot = {}) {
          const cacheSize = {
            width: this.dom.offsetWidth,
            height: this.dom.offsetHeight,
          };

          !params.width && (params.width = this.dom!.offsetWidth);
          !params.height && (params.height = this.dom!.offsetHeight);
          !params.mine && (params.mine = "image/png");

          let renderFlag = false;

          if (engine.renderManager.hasRendering()) {
            engine.renderManager.stop();
            renderFlag = true;
          }

          let DataURI = "";

          // 获取当前机器支持的最大buffer
          const gl = this.webGLRenderer!.getContext();

          const maxRenderBufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);

          const maxSize = maxRenderBufferSize / 4;

          if (params.width > maxSize || params.height > maxSize) {
            // 判断宽高形成裁剪渲染队列
            const renderList: {
              x: number;
              y: number;
            }[] = [];

            const rowNum = Math.ceil(params.width / maxSize);
            const columnNum = Math.ceil(params.height / maxSize);
            const partWidth = params.width / rowNum;
            const partHeight = params.height / columnNum;

            const tempCanvas = document.createElement("canvas");
            tempCanvas.setAttribute("width", params.width!.toString());
            tempCanvas.setAttribute("height", params.height!.toString());
            const ctx = tempCanvas.getContext("2d");
            if (!ctx) {
              console.warn(`can not support canvas 2d;`);
              return DataURI;
            }

            this.setSize(partWidth, partHeight);

            for (let rowIndex = 0; rowIndex < rowNum; rowIndex += 1) {
              for (
                let columnIndex = 0;
                columnIndex < columnNum;
                columnIndex += 1
              ) {
                renderList.push({
                  x: partWidth * rowIndex,
                  y: partHeight * columnIndex,
                });
              }
            }

            const drawList: Promise<null>[] = [];
            renderList.forEach((elem) => {
              (this.camera as PerspectiveCamera).setViewOffset(
                params.width!,
                params.height!,
                elem.x,
                elem.y,
                partWidth,
                partHeight
              );
              this.renderManager.render();

              const DataURI = this.webGLRenderer!.domElement.toDataURL(
                params.mine
              );

              drawList.push(
                new Promise<null>((resolve, reject) => {
                  const image = new Image();
                  image.src = DataURI;
                  image.onload = () => {
                    ctx!.drawImage(
                      image,
                      elem.x,
                      elem.y,
                      partWidth,
                      partHeight
                    );
                    resolve(null);
                  };
                })
              );
            });

            this.setSize(cacheSize.width, cacheSize.height);

            await Promise.all(drawList).catch((err) => {
              console.warn(err);
            });

            DataURI = tempCanvas.toDataURL(params.mine);
            (this.camera as PerspectiveCamera).clearViewOffset();
          } else {
            this.setSize(params.width, params.height);
            this.renderManager.render();
            DataURI = this.webGLRenderer!.domElement.toDataURL(params.mine);
            this.setSize(cacheSize.width, cacheSize.height);
          }

          if (renderFlag) {
            this.renderManager.play();
          }

          return DataURI;
        };
      },
    },
    dispose(engine) {
      engine.webGLRenderer.dispose();
    },
  };
};
