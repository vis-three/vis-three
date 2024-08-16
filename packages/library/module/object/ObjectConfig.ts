import {
  BasicConfig,
  BasicEventConfig,
  getBasicConfig,
  Vector3Config,
} from "@vis-three/tdcm";

export interface ObjectConfig extends BasicConfig {
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
  /**是否会被射线选中 */
  raycast: boolean;
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

export const getObjectConfig = function (): ObjectConfig {
  return Object.assign(getBasicConfig(), {
    type: "Object3D",
    castShadow: true,
    receiveShadow: true,
    lookAt: "",
    visible: true,
    raycast: true,
    matrixAutoUpdate: true,
    renderOrder: 0,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    up: {
      x: 0,
      y: 1,
      z: 0,
    },
    parent: "",
    children: [],
    pointerdown: [],
    pointermove: [],
    pointerup: [],
    pointerenter: [],
    pointerleave: [],
    click: [],
    dblclick: [],
    contextmenu: [],
  });
};
