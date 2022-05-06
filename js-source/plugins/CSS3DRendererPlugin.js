import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export const CSS3DRendererPlugin = function (params = {}) {
    if (this.css3DRenderer) {
        console.warn("this has installed css3DRenderer plugin.");
        return false;
    }
    this.css3DRenderer = new CSS3DRenderer();
    this.addEventListener("setDom", (event) => {
        event.dom.appendChild(this.css3DRenderer.domElement);
    });
    this.addEventListener("setSize", (event) => {
        this.css3DRenderer.setSize(event.width, event.height);
    });
    if (this.renderManager) {
        this.renderManager.removeEventListener("render", this.render);
        this.renderManager.addEventListener("render", (event) => {
            this.css3DRenderer.render(this.scene, this.camera);
        });
    }
    else {
        if (this.webGLRenderer) {
            const render = this.render.bind(this);
            this.render = function () {
                render();
                this.webGLRenderer.render(this.scene, this.camera);
                return this;
            };
        }
        else {
            this.render = function () {
                this.webGLRenderer.render(this.scene, this.camera);
                return this;
            };
        }
    }
    return true;
};
//# sourceMappingURL=CSS3DRendererPlugin.js.map