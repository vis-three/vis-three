# @vis-three/module-object

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-object">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-object?color=blue">

## 模块信息

这是一个虚拟公共模块，是其他物体模块的基础模块，没有实际的模块对象，只提供相关方法属性。

## 配置

- **详情**

```ts
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
```

## 拓展定义模块

- **详情**

```ts
export const defineObjectModel = defineModel.extend<
  ObjectConfig,
  Object3D,
  ObjectModelContext,
  ObjectModelShared,
  EngineSupport,
  Compiler<EngineSupport>,
  <I extends ObjectConfig = ObjectConfig>(params: {
    model: Model<ObjectConfig, Object3D> &
      ObjectModelContext &
      Readonly<ObjectModelShared>;
    target: Object3D;
    config: ObjectConfig;
    filter: IgnoreAttribute<I>;
    engine: EngineSupport;
  }) => void
>({
  shared: {
    eventSymbol: "vis.event",
    emptyRaycast: () => {},
  },
  context() {
    return {
      cacheLookAt: {
        target: null,
        updateMatrixWorld: null,
      },
    };
  },
  commands: {
    add: {
      pointerdown: addEventHanlder,
      pointerup: addEventHanlder,
      pointermove: addEventHanlder,
      pointerenter: addEventHanlder,
      pointerleave: addEventHanlder,
      click: addEventHanlder,
      dblclick: addEventHanlder,
      contextmenu: addEventHanlder,
      children: addChildrenHanlder,
    },
    set: {
      lookAt: lookAtHandler,
      pointerdown: updateEventHandler,
      pointerup: updateEventHandler,
      pointermove: updateEventHandler,
      pointerenter: updateEventHandler,
      pointerleave: updateEventHandler,
      click: updateEventHandler,
      dblclick: updateEventHandler,
      contextmenu: updateEventHandler,
      parent: emptyHandler,
      raycast: raycastHandler,
      children: {
        $reg: [
          {
            reg: new RegExp(".*"),
            handler: addChildrenHanlder,
          },
        ],
      } as Array<undefined> & {
        $reg?: RegCommand<ObjectConfig, Object3D, EngineSupport>[];
      },
    },
    delete: {
      pointerdown: removeEventHandler,
      pointerup: removeEventHandler,
      pointermove: removeEventHandler,
      pointerenter: removeEventHandler,
      pointerleave: removeEventHandler,
      click: removeEventHandler,
      dblclick: removeEventHandler,
      contextmenu: removeEventHandler,
      children: removeChildrenHandler,
    },
  },
  create({ model, target, config, engine, filter }) {
    // ...
  },
  dispose({ target }) {
    //...
  },
});
```

- **使用**

```ts
const Object3DModel = defineObjectModel((ObjectModel) => {
  type: "Object3D";
});
```

## EventGeneratorManager

配置化事件生成器。

## 静态方法

### register

- **详情**

```ts
/**
 * 注册配置
 * @param config 配置模板
 * @param generator 生成器
 * @returns this
 */
register: <C extends BasicEventConfig>({
  config,
  generator,
}: {
  config: C;
  generator: EventGenerator<C>;
}) => EventGeneratorManager;
```

### generateConfig

- **详情**

```ts
/**
 * 生成配置
 * @param name 配置名
 * @param merge 配置的预设
 * @returns BasicEventConfig
 */
generateConfig<C extends BasicEventConfig = BasicEventConfig>(name: string, merge: DeepPartial<C>): C | null
```

### has

- **详情**

```ts
/**
 * 判断管理器中是否注册该事件
 * @param name 事件名
 * @returns boolean
 */
has(name: string): boolean
```
