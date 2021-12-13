## vis-three

配置化的three.js开发。

## 基本用法

#### 导入

``` js
// 暂时未传npm
// import * as Vis from 'vis-three'
mport * as Vis from './dist/Vis.es.js'
```

##### 生成配置

``` js
const pointLight = Vis.generateConfig('pointLight', {
  vid: getUUid(),
  position: {
    x: 10,
    y: 20,
    z: 20
  }
})
```

##### 生成模块配置

``` js
const lightMap = new Vis.SupportDataGenerator()
  .create(Vis.MODULETYPE.LIGHT)
  .add(pointLight)
  .get()
```

##### 使用支持插件
``` js
const lightDataSupport = new Vis.LightDataSupport(lightMap)
```

##### 使用支持建模引擎
``` js
const engine = new Vis.ModelingEngineSupport({
  dom: document.getElementById('app'),
  dataSupportManager: new Vis.DataSupportManager({
    lightDataSupport: lightDataSupport
  }),
  resourceManager: new Vis.ResourceManager()
})
```

##### 快速编辑场景物体
``` js
const lightSupportData = lightDataSupport.getData()
const pointLightSupportData = lightSupportData[pointLight.vid]
pointLightSupportData.position.x = 10
pointLightSupportData.position.y = 20
```

##### 导出配置
``` js
console.log(engine.getDataSupportManager().toJSON())
```

##### 导入配置生成场景
``` js

import config from '/examples/config.json'

const engine = new Vis.ModelingEngineSupport({
  dom: document.getElementById('app'),
  dataSupportManager: new Vis.DataSupportManager().load(config),
  resourceManager: new Vis.ResourceManager()
})

```

## 外部资源加载

##### 加载管理器
``` js
const assets = [
  "/examples/public/model/katana/katana.obj",
  "/examples/public/texture/katana/katana_BaseColor.png",
  "/examples/public/texture/katana/katana_Normal.png",
  "/examples/public/texture/katana/katana_Roughness.png",
  "/examples/public/texture/katana/katanal_Metallic.png"
]

const loaderManager = new Vis.LoaderManager()

loaderManager.addEventListener(Vis.LOADEEVENTTYPE.LOADED, e => {
  // do something...
})

loaderManager.load(assets)
```
##### 资源管理器
``` js
const resourceManager = new Vis.ResourceManager()

// 资源映射
loaderManager.addEventListener(Vis.LOADEEVENTTYPE.LOADED, e => {
  resourceManager.mappingResource(e.resourceMap)
})

resourceManager.addEventListener(Vis.RESOURCEEVENTTYPE.MAPPED, e => {
  // do something...
})

```

## 原生THREE应用

## 多窗口

``` js
const resourceManager = new Vis.ResourceManager()
const dataSupportManager = new Vis.DataSupportManager().load(config)

const connector = new Vis.ModelingEngineSupportConnector({
  domList: [
    document.getElementById('window1'),
    document.getElementById('window2'),
  ],
  dataSupportManager,
  resourceManager
})

const engine1 = connector.getEngineSupport(document.getElementById('window1'))
engine1.play()

const engine2 = connector.getEngineSupport(document.getElementById('window2'))
engine2.play()

```

## 项目
* 开发：`npm run dev`
* 构建： `npm run build`
* 查看例子： `npm run examples`

## 阶段

##### 功能
* 多窗口变换控制器同步
* 精灵模块
* 场景结构模块
* 后期模块
* 运行时编译
* 材质展示器
* 纹理展示器
* canvas纹理加载器
* video纹理加载器


##### 优化
* 多窗口物体变换同步
* 多窗口物体材质同步
* 多窗口物体几何同步
* 翻译器通知阻断
* 加载管理器优化

## 例子demo
github: [https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples](https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples)

gitee: [https://gitee.com/Shiotsukikaedesari/vis-three/tree/main/examples](https://gitee.com/Shiotsukikaedesari/vis-three/tree/main/examples)


## 项目案例

github: [https://github.com/Shiotsukikaedesari/three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)

gitee: [https://gitee.com/Shiotsukikaedesari/three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)


