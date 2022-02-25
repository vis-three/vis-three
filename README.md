## vis-three

配置化的three.js开发。

<p>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/Versioin-0.0.3-{}" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/License-MIT-{}" alt="License"></a>
</p>

## 项目命令

* 开发：`npm run dev`
* 构建： `npm run build`
* 查看例子： `npm run examples`

## 基本用法

#### 安装
```
npm i vis-three
```

#### 导入

``` js
// 整体导入
import * as Vis from 'vis-three'

// 按需导入
import { 
  ModelingEngineSupport,
  SupportDataGenerator,
  generateConfig
} from 'vis-three'
```

#### 生成配置

``` js
const pointLight = Vis.generateConfig('PointLight', {
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
  lightDataSupport: lightDataSupport
}).setDom(document.getElementById('app'))
  .setSize()
  .play()
```

#### 快速编辑场景物体
``` js
const lightSupportData = lightDataSupport.getData()
const pointLight = lightSupportData[pointLight.vid]
pointLight.position.x = 10
pointLight.position.y = 20
```

#### 导出配置
``` js
console.log(engine.toJSON())
```

#### 导入配置生成场景
``` js

import config from '/examples/config.json'

const engine = new Vis.ModelingEngineSupport()
.setDom(document.getElementById('app'))
.setSize()
.play()
.loadConfig(config, (event) => {
  // loaded do something...
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

const loaderManager = engineSupport.loaderManager

loaderManager.addEventListener('loaded', e => {
  // do something...
})

engineSupport.loadResources(assets)

```
#### 资源管理器
``` js
engineSupport.registerResources({
  'examples.canvas': new document.createElement('canvas')
})

const resourceManager = engineSupport.resourceManager
// 额外资源映射

resourceManager.addEventListener('mapped', e => {
  // do something...
})

```

## 原生THREE应用

``` js
const engine = new Vis.ModelingEngine()
  .setDom(document.getElementById('app'))
  .setSize()
  .play()

engine.scene.add(new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshStandardMaterial({color: 'red'})
))

engine.scene.add(new THREE.PointLight('white', 1))

```

## 多窗口

``` js

```

## 说明
* 内置了ID检查，生成id请使用`npm i uuid`, `import {v4 as getUuid} from 'uuid'`


## 版本更新

#### vsersion 0.03
* 新增loaderManager, resourceManager, compilerManager插件
* 将middleware中的engineSupport模块进行engine插件化处理，部分api有所变动
* 新增Line模块
* 新增Mesh模块
* 新增Points模块

* model模块弃用
#### 预设

- [ ] css3Renderer
- [ ] css3相关物体模块
- [ ] 实时动画系统
- [ ] 物体约束器

## 项目案例

github: 
[three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)


gitee:
[three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)
[vis-model-generator](http://shiotsukikaedesari.gitee.io/vis-model-generator)

