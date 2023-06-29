# @vis-three/plugin-loader-manager

加载管理器插件。

此插件为所有资源加载器提供一个统一的入口，方便进行加载资源的内存管理和时间周期管理。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-loader-manager">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-loader-manager?color=blue">

## 插件名称

`LoaderManagerPlugin`

:::tip
可以使用枚举：`LOADER_MANAGER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface LoaderManagerParameters {
  /**加载器拓展 */
  loaderExtends: { [key: string]: Loader };
}

export interface LoaderManagerPluginParameters extends LoaderManagerParameters {
  /**公共前缀路径 */
  path?: string;
}
```

### loaderExtends

支持拓展不同格式的加载资源类型和覆盖当前的加载器。

```ts
import { Loader } from "three";
class MyGLFTLoader extends Loader {}

engine.install(
  LoaderManagerPlugin({
    loaderExtends: {
      pmx: new PMXLoader(),
      glft: new MyGLTFLoader(),
    },
  })
);
```

:::tip

自定义的加载器建议继承`three.js`的`Loader`。
:::

### path

统一的资源前缀，这个对于有不同域名的服务地址会很有用。

```ts
engine.install(
  LoaderManagerPlugin({
    path: "https://www.mywebsite.com/model",
  })
);

engine.loadResources(["/home/desk.fbx"]);

// /home/desk.fbx -> https://www.mywebsite.com/model/home/desk.fbx
```

## 引擎拓展

```ts
export interface LoaderManagerEngine extends Engine {
  /**资源加载器管理器 */
  loaderManager: LoaderManager;
  /**加载资源函数 */
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: LoadedEvent) => void
  ) => LoaderManagerEngine;
  /**异步加载资源函数 */
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}
```

## 加载 Blob 临时链接

可以通过指定当前资源的类型进行。

```ts
engine.loadResources([
  {
    url: "blob:https://shiotsukikaedesari.gitee.io/1e09dae0-94a2-4a32-bd9f-eeae8df51907",
    ext: "glft",
  },
]);
```

## LoaderManager

此类继承`@vis-three/core`的`Dispatcher`
