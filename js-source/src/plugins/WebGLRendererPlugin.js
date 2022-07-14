import { WebGLRenderer, } from "three";
export const WebGLRendererPlugin = function (params = {}) {
    if (this.webGLRenderer) {
        console.warn("this has installed webglRenderer plugin.");
        return false;
    }
    this.webGLRenderer = new WebGLRenderer(params);
    const domElement = this.webGLRenderer.domElement;
    domElement.style.position = "absolute";
    domElement.style.top = "0";
    domElement.style.left = "0";
    domElement.classList.add("vis-webgl");
    // 截图
    this.getScreenshot = async function (params = {}) {
        const cacheSize = {
            width: this.dom.offsetWidth,
            height: this.dom.offsetHeight,
        };
        !params.width && (params.width = this.dom.offsetWidth);
        !params.height && (params.height = this.dom.offsetHeight);
        !params.mine && (params.mine = "image/png");
        let renderFlag = false;
        if (this.renderManager.hasRendering()) {
            this.renderManager.stop();
            renderFlag = true;
        }
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
                this.renderManager.render();
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
            this.renderManager.render();
            DataURI = this.webGLRenderer.domElement.toDataURL(params.mine);
            this.setSize(cacheSize.width, cacheSize.height);
        }
        if (renderFlag) {
            this.renderManager.play();
        }
        return DataURI;
    };
    // 设置渲染的dom
    this.addEventListener("setDom", (event) => {
        event.dom.appendChild(this.webGLRenderer.domElement);
    });
    this.addEventListener("setSize", (event) => {
        this.webGLRenderer.setSize(event.width, event.height, true);
    });
    this.addEventListener("dispose", () => {
        this.webGLRenderer.dispose();
    });
    if (this.renderManager) {
        this.renderManager.removeEventListener("render", this.render);
        this.renderManager.addEventListener("render", (event) => {
            this.webGLRenderer.render(this.scene, this.camera);
        });
    }
    else {
        this.render = function () {
            this.webGLRenderer.render(this.scene, this.camera);
            return this;
        };
    }
    return true;
};
//# sourceMappingURL=WebGLRendererPlugin.js.map