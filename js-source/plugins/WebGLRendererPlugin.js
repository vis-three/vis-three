import { WebGLRenderer } from "three";
export const WebGLRendererPlugin = function (params = {}) {
    if (this.webGLRenderer) {
        console.warn('this has installed webglRenderer plugin.');
        return false;
    }
    this.webGLRenderer = new WebGLRenderer(params);
    this.dom = this.webGLRenderer.domElement;
    // 设置尺寸
    this.setSize = function (width, height) {
        if (width && width <= 0 || height && height <= 0) {
            console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
            return this;
        }
        !width && (width = this.dom?.offsetWidth);
        !height && (height = this.dom?.offsetHeight);
        this.dispatchEvent({ type: 'setSize', width, height });
        return this;
    };
    // 设置相机
    this.setCamera = function (camera) {
        this.currentCamera = camera;
        this.dispatchEvent({
            type: 'setCamera',
            camera
        });
        return this;
    };
    // 截图
    this.getScreenshot = function (params = {}) {
        const cacheSize = {
            width: this.dom.offsetWidth,
            height: this.dom.offsetHeight
        };
        !params.width && (params.width = this.dom.offsetWidth);
        !params.height && (params.height = this.dom.offsetHeight);
        !params.mine && (params.mine = 'image/png');
        let renderFlag = false;
        if (this.renderManager.hasRendering()) {
            this.renderManager.stop();
            renderFlag = true;
        }
        this.setSize(params.width, params.height);
        this.renderManager.render();
        const element = document.createElement('img');
        const DataURI = this.webGLRenderer.domElement.toDataURL(params.mine);
        element.src = DataURI;
        this.setSize(cacheSize.width, cacheSize.height);
        if (renderFlag) {
            this.renderManager.play();
        }
        return element;
    };
    // 设置渲染的dom
    this.setDom = function (dom) {
        this.dom = dom;
        dom.appendChild(this.webGLRenderer.domElement);
        return this;
    };
    this.addEventListener('setSize', (event) => {
        const width = event.width;
        const height = event.height;
        this.webGLRenderer.setSize(width, height, true);
    });
    this.addEventListener('dispose', () => {
        this.webGLRenderer.dispose();
    });
    return true;
};
//# sourceMappingURL=WebGLRendererPlugin.js.map