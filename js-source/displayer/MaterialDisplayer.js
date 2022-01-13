import { AmbientLight, BoxBufferGeometry, Line, Mesh, MeshStandardMaterial, Object3D, PCFSoftShadowMap, PerspectiveCamera, PointLight, Points, Scene, SphereBufferGeometry, Sprite, Vector3, WebGLRenderer } from "three";
const pointLight = new PointLight('rgb(255, 255, 255)', 0.5, 200, 1);
pointLight.position.set(-30, 5, 20);
pointLight.castShadow = true;
const plane = new Mesh(new BoxBufferGeometry(80, 2, 80), new MeshStandardMaterial({
    color: 'rgb(255, 255, 255)'
}));
plane.position.set(0, -11, 0);
plane.receiveShadow = true;
plane.castShadow = true;
export class MaterialDisplayer {
    static ambientLight = new AmbientLight('rgb(255, 255, 255)', 0.7);
    static pointLight = pointLight;
    static geometry = new SphereBufferGeometry(10, 12, 12);
    static plane = plane;
    static dispose = () => {
        MaterialDisplayer.geometry.dispose();
        MaterialDisplayer.plane.geometry.dispose();
    };
    material;
    dom;
    renderer;
    scene;
    camera;
    object;
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
        scene.add(MaterialDisplayer.ambientLight);
        scene.add(MaterialDisplayer.pointLight);
        scene.add(MaterialDisplayer.plane);
        this.scene = scene;
        this.renderer = renderer;
        this.camera = camera;
        this.object = new Object3D();
        parameters?.material && this.setMaterial(parameters.material);
        parameters?.dom && this.setDom(parameters.dom);
    }
    // 设置展示的材质
    setMaterial(material) {
        this.scene.remove(this.object);
        this.material = material;
        if (material.type.includes('Mesh')) {
            this.object = new Mesh(MaterialDisplayer.geometry, material);
        }
        else if (material.type.includes('Line')) {
            this.object = new Line(MaterialDisplayer.geometry, material);
        }
        else if (material.type.includes('Ponits')) {
            this.object = new Points(MaterialDisplayer.geometry, material);
        }
        else if (material.type.includes('Sprite')) {
            this.object = new Sprite(material);
        }
        else {
            console.warn(`material displayer can not support this type material: '${material.type}'`);
            return this;
        }
        this.object.castShadow = true;
        this.object.receiveShadow = true;
        this.scene.add(this.object);
        return this;
    }
    // 设置目标dom对象
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
                console.warn(`material displayer must set dom before setSize with empty parameters`);
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
    // 内存销毁
    dispose() {
        this.renderer.dispose();
    }
}
//# sourceMappingURL=MaterialDisplayer.js.map