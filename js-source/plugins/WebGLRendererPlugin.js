import { WebGLRenderer } from "three";
export const WebGLRendererPlugin = function (params = {}) {
    if (this.webGLRenderer) {
        console.warn("this has installed webglRenderer plugin.");
        return false;
    }
    this.webGLRenderer = new WebGLRenderer(params);
    this.dom = this.webGLRenderer.domElement;
    // 截图
    this.getScreenshot = function (params = {}) {
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
        this.setSize(params.width, params.height);
        this.renderManager.render();
        const element = document.createElement("img");
        const DataURI = this.webGLRenderer.domElement.toDataURL(params.mine);
        element.src = DataURI;
        this.setSize(cacheSize.width, cacheSize.height);
        if (renderFlag) {
            this.renderManager.play();
        }
        return element;
    };
    // 设置渲染的dom
    this.addEventListener("setDom", (event) => {
        if (this.dom) {
            this.dom.appendChild(this.webGLRenderer.domElement);
        }
        else {
            console.warn(`There are no dom set for the engine`);
        }
    });
    this.addEventListener("setSize", (event) => {
        const width = event.width;
        const height = event.height;
        this.webGLRenderer.setSize(width, height, true);
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