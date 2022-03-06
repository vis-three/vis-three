## vis-three

配置化的three.js开发。

<p>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/Versioin-0.0.6-{}" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/License-MIT-{}" alt="License"></a>
</p>

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
## 渲染引擎

#### 内置引擎
##### ModelingEngine开发下的渲染引擎
* 提供物体可视化辅助
* 内置变换控制器，轨道控制器, 性能监视器，事件管理器，后期插件
* 使用ModelingScene提供多视角观察，场景渲染模式：geometry,material,light, env

##### DisplayEngine展示下的渲染引擎
* 内置轨道控制器，事件管理器，后期插件

##### EngineSupport（xxxEngineSupport） 配置化支持引擎
* 能够使用配置化开发
* 内置loader管理器，资源管理器，配置化support的相关插件

#### 自定义引擎

##### 引擎基板
* Engine 纯净的引擎基板
* EngineSupport 配置化支持引擎基板

##### 引擎插件
* WebGLRenderer: 3D渲染器插件
* Scene: 普通场景插件
* ModelingScene: 开发下的场景插件
* RenderManager: 渲染管理器插件
* OrbitControls: 轨道控制器插件
* Stats: 资源监视器插件
* EffectComposer: 后期处理器插件
* PointerManager: 指针管理器插件
* EventManager: 事件管理器插件
* TransformControls: 变换控制器插件
* LoaderManager: 加载器管理器插件
* ResourceManager: 资源管理器插件
* DataSupportManager: 数据支持管理器插件
* CompilerManager: 编译管理器插件
* CSS3DRenderer: CSS3D渲染器插件（预）

##### 自定义引擎使用
``` js
// ModelingEngine
const engine = new Engine()
  .install('WebGLRenderer', {
      antialias: true,
      alpha: true
    })
  .install('ModelingScene', {
    hasDefaultPerspectiveCamera: true,
    hasDefaultOrthographicCamera: true,
    hasAxesHelper: true,
    hasGridHelper: true,
    hasDisplayMode: true,
    displayMode: 'env'
  })
  .install('RenderManager')
  .install('Stats')
  .install('EffectComposer', {
    WebGLMultisampleRenderTarget: true
  })
  .install('OrbitControls')
  .install('PointerManager')
  .install('EventManager')
  .install('TransformControls')
  .complete() // 安装插件完成后调用
  .setDom(document.getElementById('app'))
  .setSize()
  .setStats(true)
  .play()
```

## 资源管理

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

## 支持原生THREE应用

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

## 项目命令

* 开发：`npm run dev`
* 构建： `npm run build`
* 查看例子： `npm run examples`

## 说明
* 内置了ID检查，生成id请使用`npm i uuid`, `import {v4 as getUuid} from 'uuid'`


## 版本更新

* `/doc/**/*`

#### 预设

- [ ] css3Renderer
- [ ] css3相关物体模块
- [ ] 物体约束器

## 项目案例

github: 
[three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)


gitee:
[three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)
[vis-model-generator](http://shiotsukikaedesari.gitee.io/vis-model-generator)

