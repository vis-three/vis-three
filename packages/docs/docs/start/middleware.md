# 配置化开发

配置化开发根据配置化去形成场景结构与可视化面，还能够在运行期通过对配置的更改去影响 3D 场景，如何进行配置化开发，下面进行介绍。

## 生成配置

配置化开发的首要部分就是各种配置单的生成和配置单对应的对象功能，配置生成需要用到`@vis-three/middleware`中的`generateConfig`方法来生成配置。

```js
import { DisplayEngineSupport } from "@vis-three/engine-display-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
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
```

::: tip

- 配置化开发需要使用支持配置化的引擎，也就是继承`EngineSupport`的引擎。
- `generateConfig`是生成配置的统一 api。
- `CONFIGTYPE`中枚举了当下支持的所有物体配置单。
- `generateConfig`详情请参考 API 文档
  :::

## 应用配置

生成配置以后，就是如何应用配置，应用配置我们可以手动应用。

```js
engine.applyConfig(material, geometry, mesh, scene);
```

::: tip
手动应用配置注意应用配置的先后顺序，比如`mesh`需要依赖`material`, `geometry`这两个配置，那么`mesh`的应用要在`material`和`geometry`之后。
:::

手动应用配置对应与复杂的项目场景是有必要的，能够让我们更好的跟踪配置的加入移除，那么对于简单一点的项目或者 demo 来说，我们可以使用自动应用配置。

```js
import { DisplayEngineSupport } from "@vis-three/engine-display-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .play();

generateConfig.injectEngine = engine;
generateConfig.autoInject = true;

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
```

## 编辑配置

通过`generateConfig`生成的配置，其实就是一个很简单的对象，我们只用操作这个对象的相关属性，就能够影响 3D 场景中对象做出相关的变化。

```js
mesh.position.x = 10;
mesh.rotation.y = Math.PI / 2;

scene.children.pop();
```

::: warning
这里要注意，对于`generateConfig`生成的配置不要直接替换整个配置对象里面的引用对象，比如：

```js{2}
const mesh = generateConfig(CONFIGTYPE.MESH);
mesh.position = { x: 10, y: 10, z: 10 };
```

主要是因为：

1. 直接替换掉整个引用，会造成额外性能开销。

2. 直接替换引用，在相应模块内可能会丢失对象的跟踪处理。

3. 在配置对象版本更新的时候，会缺失新版本的配置属性。

:::

## 保存配置

配置化开发的一大特点就是，只要有相关的配置的，在哪里都能够复现当前的场景，那么首要的部分就是配置单的保存。

```js
const json = engine.toJSON(); // 直接导出json配置单

const jsObject = engine.exportConfig(); // 导出干净的js对象
```

::: tip
有很多的需求是在保存之前需要对配置单进行统一的操作，可以直接操作`jsObject`对象，`exportConfig`导出的 js 对象是深拷贝对象，不会影响运行期的配置。
:::

## 导入配置

如何通过配置单还原整个场景？我们只用调用几个`api`就能搞定！

```js
import jsonConfig from "jsonConfig.json";
import { generateConfig, Template, JSONHanlder } from "@vis-three/middleware";

const config = Template.handler(JSONHanlder.clone(jsonConfig), (c) =>
  generateConfig(c.type, c)
);

engine.loadConfig(config, (res) => {
  // do something
});

engine.loadConfigAsync(config).then((res) => {
  // do something
});
```

::: tip

1. 在应用配置单之前，我们需要通过`JSONHanlder`处理一次，因为比如`Infinity`, `-Infinity`等的数字对象在普通的`json`化过程中会丢失，所以需要特殊处理。

2. 有很多的需求是在加载配置完成之后，还会对配置进行相关处理，所以目前的加载函数不会对配置进行自动的响应式转译，需要手动进行，这里可以使用`Template`模板处理方法进行。
   :::
