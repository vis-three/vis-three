## vis-three

配置化的three.js开发。

## 基本用法

#### 导入

``` js
// 暂时未传npm
// import * as Vis from 'vis-three'
mport * as Vis from './dist/Vis.es.js'
```

#### 生成配置

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

#### 生成模块配置

``` js
const lightMap = new Vis.SupportDataGenerator()
  .create(Vis.MODULETYPE.LIGHT)
  .add(pointLight)
  .get()
```

#### 使用支持插件
``` js
const lightDataSupport = new Vis.LightDataSupport(lightMap)
```

#### 使用支持建模引擎
``` js
const engine = new Vis.ModelingEngineSupport({
  dom: document.getElementById('app'),
  dataSupportManager: new Vis.DataSupportManager({
    lightDataSupport: lightDataSupport
  }),
  resourceManager: new Vis.ResourceManager()
})
```

#### 快速编辑场景物体
``` js
const lightSupportData = lightDataSupport.getData()
const pointLightSupportData = lightSupportData[pointLight.vid]
pointLightSupportData.position.x = 10
pointLightSupportData.position.y = 20
```

#### 导出配置
``` js
console.log(engine.getDataSupportManager().toJSON())
```

#### 导入配置生成场景
``` js

import config from '/examples/config.json'

const engine = new Vis.ModelingEngineSupport({
  dom: document.getElementById('app'),
  dataSupportManager: new Vis.DataSupportManager().load(config),
  resourceManager: new Vis.ResourceManager()
})

```

## 外部资源加载

#### 加载管理器
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
#### 资源管理器
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

``` js
const engine = new Vis.ModelingEngine(document.getElementById('app'))

const scene = engine.getScene()

scene.add(new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshStandardMaterial({color: 'red'})
))

scene.add(new THREE.PointLight('white', 1))

engine.play()

```

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

refactor
#### 功能

- [x] 相机视角跟随
- [x] 相机自适应窗口
- [x] 窗口自适应相机
- [x] 材质展示器
- [x] 贴图展示器
- [ ] 后期处理模块
- [ ] 模型模块优化 - type -> mode , 根据display去判断展示模型类型
- [ ] 动画帧模块
- [ ] orbitControls可以实时改变相机support 

#### 预设

- [ ] css3Renderer
- [ ] css3相关物体模块
- [ ] svgRenderer
- [ ] svg相关物体模块
- [ ] 拓扑模块
- [ ] 物体约束器

#### bug

- [ ] 切换相机自适应窗口，相机辅助未跟随变化 `普通` 

## 例子demo
github: [https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples](https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples)

gitee: [https://gitee.com/Shiotsukikaedesari/vis-three/tree/main/examples](https://gitee.com/Shiotsukikaedesari/vis-three/tree/main/examples)


## 项目案例

github: [https://github.com/Shiotsukikaedesari/three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)

gitee: [https://gitee.com/Shiotsukikaedesari/three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)


