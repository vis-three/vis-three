import { AmbientLight, BoxGeometry, Material, Mesh, MeshStandardMaterial, PointLight, SphereGeometry } from "three";
export interface MaterialDisplayerParameters {
    dom?: HTMLElement;
    material?: Material;
}
export declare class MaterialDisplayer {
    static ambientLight: AmbientLight;
    static pointLight: PointLight;
    static geometry: SphereGeometry;
    static plane: Mesh<BoxGeometry, MeshStandardMaterial, import("three").Object3DEventMap>;
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
    /**
     * 导出图片dataURL
     * @param mine 图片格式
     * @returns DataURL
     */
    getDataURL(mine: string): string;
    dispose(): void;
}
