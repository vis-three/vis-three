import { OrthographicCamera, PerspectiveCamera, WebGLRenderer } from "three";
export const WebGLRendererPlugin = function (params) {
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
    this.setCamera = function setCamera(camera) {
        this.currentCamera = camera;
        this.dispatchEvent({
            type: 'setCamera',
            camera
        });
        return this;
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
        const camera = this.currentCamera;
        if (camera) {
            if (camera instanceof PerspectiveCamera) {
                camera.aspect = event.width / event.height;
                camera.updateProjectionMatrix();
            }
            else if (camera instanceof OrthographicCamera) {
                camera.left = -width / 16;
                camera.right = width / 16;
                camera.top = height / 16;
                camera.bottom = -height / 16;
                camera.updateProjectionMatrix();
            }
        }
    });
    this.addEventListener('dispose', () => {
        this.webGLRenderer.dispose();
    });
    return true;
};
//# sourceMappingURL=WebGLRendererPlugin.js.map