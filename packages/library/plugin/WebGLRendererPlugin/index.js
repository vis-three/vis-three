import { ENGINE_EVENT, } from "@vis-three/core";
import { WebGLRenderer, } from "three";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const WEBGL_RENDERER_PLUGIN = transPkgName(pkgname);
export const WebGLRendererPlugin = function (params) {
    let setDomFun;
    let setSizeFun;
    let renderFun;
    return {
        name: WEBGL_RENDERER_PLUGIN,
        install(engine) {
            engine.webGLRenderer = new WebGLRenderer(params);
            const domElement = engine.webGLRenderer.domElement;
            domElement.style.position = "absolute";
            domElement.style.top = "0";
            domElement.style.left = "0";
            domElement.classList.add("vis-webgl");
            // 截图
            engine.getScreenshot = async function (params = {}) {
                const cacheSize = {
                    width: this.dom.offsetWidth,
                    height: this.dom.offsetHeight,
                };
                !params.width && (params.width = this.dom.offsetWidth);
                !params.height && (params.height = this.dom.offsetHeight);
                !params.mine && (params.mine = "image/png");
                let DataURI = "";
                // 获取当前机器支持的最大buffer
                const gl = this.webGLRenderer.getContext();
                const maxRenderBufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
                const maxSize = maxRenderBufferSize / 4;
                if (params.width > maxSize || params.height > maxSize) {
                    // 判断宽高形成裁剪渲染队列
                    const renderList = [];
                    const rowNum = Math.ceil(params.width / maxSize);
                    const columnNum = Math.ceil(params.height / maxSize);
                    const partWidth = params.width / rowNum;
                    const partHeight = params.height / columnNum;
                    const tempCanvas = document.createElement("canvas");
                    tempCanvas.setAttribute("width", params.width.toString());
                    tempCanvas.setAttribute("height", params.height.toString());
                    const ctx = tempCanvas.getContext("2d");
                    if (!ctx) {
                        console.warn(`can not support canvas 2d;`);
                        return DataURI;
                    }
                    this.setSize(partWidth, partHeight);
                    for (let rowIndex = 0; rowIndex < rowNum; rowIndex += 1) {
                        for (let columnIndex = 0; columnIndex < columnNum; columnIndex += 1) {
                            renderList.push({
                                x: partWidth * rowIndex,
                                y: partHeight * columnIndex,
                            });
                        }
                    }
                    const drawList = [];
                    renderList.forEach((elem) => {
                        this.camera.setViewOffset(params.width, params.height, elem.x, elem.y, partWidth, partHeight);
                        this.webGLRenderer.render(this.scene, this.camera);
                        const DataURI = this.webGLRenderer.domElement.toDataURL(params.mine);
                        drawList.push(new Promise((resolve, reject) => {
                            const image = new Image();
                            image.src = DataURI;
                            image.onload = () => {
                                ctx.drawImage(image, elem.x, elem.y, partWidth, partHeight);
                                resolve(null);
                            };
                        }));
                    });
                    this.setSize(cacheSize.width, cacheSize.height);
                    await Promise.all(drawList).catch((err) => {
                        console.warn(err);
                    });
                    DataURI = tempCanvas.toDataURL(params.mine);
                    this.camera.clearViewOffset();
                }
                else {
                    this.setSize(params.width, params.height);
                    this.webGLRenderer.render(this.scene, this.camera);
                    DataURI = this.webGLRenderer.domElement.toDataURL(params.mine);
                    this.setSize(cacheSize.width, cacheSize.height);
                }
                return DataURI;
            };
            setDomFun = (event) => {
                event.dom.appendChild(engine.webGLRenderer.domElement);
            };
            // 设置渲染的dom
            engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            setSizeFun = (event) => {
                engine.webGLRenderer.setSize(event.width, event.height, true);
            };
            engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            renderFun = () => {
                engine.webGLRenderer.render(engine.scene, engine.camera);
            };
            engine.addEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
            engine.removeEventListener(ENGINE_EVENT.RENDER, renderFun);
            engine.webGLRenderer.dispose();
            delete engine.webGLRenderer;
            delete engine.getScreenshot;
        },
    };
};
