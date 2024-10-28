import {
  AmbientLight,
  BoxGeometry,
  Line,
  Material,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Points,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

export interface MaterialDisplayerParameters {
  /**展示的目标dom */
  dom?: HTMLElement;
  /**展示的材质 */
  material?: Material;
}

const pointLight = new PointLight("rgb(255, 255, 255)", 0.5, 200, 1);
pointLight.position.set(-30, 5, 20);
pointLight.castShadow = true;

const plane = new Mesh(
  new BoxGeometry(80, 2, 80),
  new MeshStandardMaterial({
    color: "rgb(255, 255, 255)",
  })
);
plane.position.set(0, -11, 0);
plane.receiveShadow = true;
plane.castShadow = true;

export class MaterialDisplayer {
  public static ambientLight = new AmbientLight("rgb(255, 255, 255)", 0.7);
  public static pointLight = pointLight;
  public static geometry = new SphereGeometry(10, 12, 12);
  public static plane = plane;

  public static dispose = () => {
    MaterialDisplayer.geometry.dispose();
    MaterialDisplayer.plane.geometry.dispose();
  };

  private material?: Material;
  private dom?: HTMLElement;

  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private object: Object3D;

  constructor(parameters?: MaterialDisplayerParameters) {
    const renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("rgb(150, 150, 150)");
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
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

  /**
   * 设置展示材质
   * @param material 要展示的材质
   * @returns this
   */
  setMaterial(material: Material): this {
    this.scene.remove(this.object);

    this.material = material;

    if (
      material.type.includes("Mesh") ||
      material.type === "ShaderMaterial" ||
      material.type === "RawShaderMaterial"
    ) {
      this.object = new Mesh(MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Line")) {
      this.object = new Line(MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Points")) {
      this.object = new Points(MaterialDisplayer.geometry, material);
    } else if (material.type.includes("Sprite")) {
      this.object = new Sprite(material as SpriteMaterial);
    } else {
      console.warn(
        `material displayer can not support this type material: '${material.type}'`
      );
      return this;
    }

    this.object.castShadow = true;
    this.object.receiveShadow = true;
    this.scene.add(this.object);
    return this;
  }

  /**
   * 设置渲染的目标dom
   * @param dom
   * @returns this
   */
  setDom(dom: HTMLElement): this {
    this.dom = dom;

    this.setSize();
    dom.appendChild(this.renderer.domElement);
    return this;
  }

  /**
   * 设置整个展示器的尺寸，不传参默认目标dom大小
   * @param width
   * @param height
   * @returns this
   */
  setSize(width?: number, height?: number): this {
    if (width && height) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, true);
    } else {
      if (!this.dom) {
        console.warn(
          `material displayer must set dom before setSize with empty parameters`
        );
        return this;
      }

      const dom = this.dom;
      this.camera.aspect = dom.offsetWidth / dom.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
    }
    return this;
  }

  /**
   * 渲染展示器
   */
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * 导出图片dataURL
   * @param mine 图片格式
   * @returns DataURL
   */
  getDataURL(mine: string) {
    return this.renderer.domElement.toDataURL(mine || "image/png");
  }

  /**
   * 销毁当前展示器的内存
   */
  dispose() {
    this.renderer.dispose();
  }
}
