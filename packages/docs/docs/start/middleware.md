### 安装配置化开发

```
npm i @vis-three/middleware
```

::: tip

配置化开发的核心部分在`@vis-three/middleware`这个包中。
:::

### 生成配置

配置化开发的首要部分就是各种配置单的生成和配置单对应的对象功能。

```js
import { DisplayEngineSupport } from "@vis-three/display-engine-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .play();

const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

const mesh = generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
});

const scene = generateConfig(CONFIGTYPE.SCENE, {
  children: [mesh.vid],
});

engine.applyConfig(material, geometry, mesh, scene);
```

::: tip

- 配置化开发需要使用支持配置化的引擎，也就是继承`EngineSupport`的引擎。
- `generateConfig`是生成配置的统一 api。
- `CONFIGTYPE`中枚举了当下支持的所有物体配置单。
  :::

### 编辑配置

通过`generateConfig`生成的配置，其实就是一个很简单的对象，我们只用操作这个对象的相关属性，就能够影响 3D 场景中对象做出相关的变化。

```js
mesh.position.x = 10;
mesh.rotation.y = Math.PI / 2;

scene.children.pop();
```

### 保存配置

配置化开发的一大特点就是，只要有相关的配置的，在哪里都能够复现当前的场景，那么首要的部分就是配置单的保存。

```js
const json = engine.toJSON(); // 直接导出json配置单

const jsObject = engine.exportConfig(); // 导出干净的js对象
```

::: tip
有很多的需求是在保存之前需要对配置单进行统一的操作，可以直接操作`jsObject`对象，`exportConfig`导出的 js 对象是深拷贝对象，不会影响运行期的配置。
:::

### 应用配置

如何通过配置单还原整个场景？我们只用调用一个`api`就能搞定！

```js
import jsonConfig from "jsonConfig.json";
import { JSONHanlder } from "@vis-three/middleware";

const config = JSONHanlder.clone(jsonConfig);

engine.loadConfig(config. () => {
  // do something
  });

engine.loadConfigAsync(config).then((res) => {
  // do something
});
```

::: tip
在应用配置单之前，我们需要通过`JSONHanlder`处理一次，因为比如`Infinity`, `-Infinity`等的数字对象在普通的`json`化过程中会丢失，所以需要特殊处理。
:::
