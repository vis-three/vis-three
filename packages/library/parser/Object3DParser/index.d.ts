import { ParseParams, Parser, ResourceHanlder } from "@vis-three/middleware";
export declare class Object3DParser extends Parser {
    selector: ResourceHanlder;
    parse(params: ParseParams): void;
    /**
     * 解析颜色
     * @param color
     * @returns examples - rgb(255, 255,255)
     */
    private parseColor;
    /**
     * 对象增强,class对象的get set属性转key， three中的是通过_key进行闭包
     * @param object
     * @returns object
     */
    private attributeEnhance;
    /**
     *  解析贴图
     * @param params
     */
    private parseTexture;
    private parseMaterial;
    private parseGeometry;
    private parseSkeleton;
    private parseObject3D;
}
