## LoaderManager

外部资源加载管理器

### 基础用法

```js
import { LoaderManager } from "vis-three";

const manager = new LoaderManager();

manager.addEventListener("loaded", (event) => {
  console.log(event.resourceMap);
});

manager.load([url]);
```

### 插件用法

```js
import { Engine, ENGINEPLUGIN } from "vis-three";

const engine = new Engine().install(ENGINEPLUGIN.LOADERMANAGER);

engine.loadResources([url]);
```

::: tip
继承于`engineSupport`类内部已经安装了该 manager，可直接使用。
