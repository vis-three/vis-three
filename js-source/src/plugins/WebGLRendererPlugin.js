import { WebGLRenderer } from "three";
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
        const DataURI = this.webGLRenderer.domElement.toDataURL(params.mine);
        this.setSize(cacheSize.width, cacheSize.height);
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