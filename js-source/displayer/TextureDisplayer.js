import { AmbientLight, PCFSoftShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
export class TextureDisplayer {
    static ambientLight = new AmbientLight('rgb(255, 255, 255)', 1); // 环境光
    dom;
    texture;
    renderer;
    scene;
    camera;
    constructor(parameters) {
        const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('rgb(150, 150, 150)');
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = PCFSoftShadowMap;
        const scene = new Scene();
        const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
        camera.position.set(0, 0, 35);
        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;
        camera.lookAt(new Vector3(0, 0, 0));
        scene.add(TextureDisplayer.ambientLight);
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        parameters?.texture && this.setTexture(parameters.texture);
        parameters?.dom && this.setDom(parameters.dom);
    }
    // 设置贴图
    setTexture(texture) {
        this.scene.background = texture;
        return this;
    }
    // 设置dom
    setDom(dom) {
        this.dom = dom;
        this.setSize();
        dom.appendChild(this.renderer.domElement);
        return this;
    }
    // 设置尺寸
    setSize(width, height) {
        if (width && height) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height, true);
        }
        else {
            if (!this.dom) {
                console.warn(`texture displayer must set dom before setSize with empty parameters`);
                return this;
            }
            const dom = this.dom;
            this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
        }
        return this;
    }
    // 渲染方法
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    // 销毁内存
    dispose() {
        this.renderer.dispose();
    }
}
//# sourceMappingURL=TextureDisplayer.js.map