import { BasicEventConfig, SymbolConfig, Vector3Config } from "@vis-three/middleware";
export interface ObjectConfig extends SymbolConfig {
    /**造成阴影 */
    castShadow: boolean;
    /**接收阴影 */
    receiveShadow: boolean;
    /**看向目标 vid 标识 */
    lookAt: string;
    /**物体位置 本地矩阵*/
    position: Vector3Config;
    /**物体旋转 本地矩阵 */
    rotation: Vector3Config;
    /**物体缩放 本地矩阵 */
    scale: Vector3Config;
    /**物体上部朝向 */
    up: Vector3Config;
    /**物体是否可见 */
    visible: boolean;
    /**物体是否会自动更新世界矩阵 */
    matrixAutoUpdate: boolean;
    /**物体渲染顺序 */
    renderOrder: number;
    /**物体的父级 vid 标识 */
    parent: string;
    /**物体的子集 vid 标识 */
    children: string[];
    /**鼠标按下事件列表 */
    pointerdown: BasicEventConfig[];
    /**鼠标移动事件列表 */
    pointermove: BasicEventConfig[];
    /**鼠标抬起事件列表 */
    pointerup: BasicEventConfig[];
    /**鼠标进入事件列表 */
    pointerenter: BasicEventConfig[];
    /**鼠标离开事件列表 */
    pointerleave: BasicEventConfig[];
    /**鼠标点击事件列表 */
    click: BasicEventConfig[];
    /**鼠标双击事件列表 */
    dblclick: BasicEventConfig[];
    /**鼠标右键事件列表 */
    contextmenu: BasicEventConfig[];
}
export declare const getObjectConfig: () => ObjectConfig;
