import { AmbientLight, BoxBufferGeometry, Material, Mesh, MeshStandardMaterial, PointLight, SphereBufferGeometry } from "three";
export interface MaterialDisplayerParameters {
    dom?: HTMLElement;
    material?: Material;
}
export declare class MaterialDisplayer {
    static ambientLight: AmbientLight;
    static pointLight: PointLight;
    static geometry: SphereBufferGeometry;
    static plane: Mesh<BoxBufferGeometry, MeshStandardMaterial>;
    static dispose: () => void;
    private material?;
    private dom?;
    private renderer;
    private scene;
    private camera;
    private object;
    constructor(parameters?: MaterialDisplayerParameters);
    setMaterial(material: Material): this;
    setDom(dom: HTMLElement): this;
    setSize(width?: number, height?: number): this;
    render(): void;
    dispose(): void;
}
