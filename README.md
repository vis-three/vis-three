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

engine.getDataSupportManager().load(config)

```

## 外部资源加载

## 原生THREE应用

## 多窗口

## 项目
* 开发：`npm run dev`
* 构建： `npm run build`
* 查看例子： `npm run examples`

## 阶段

* 完善构建逻辑
* 核心抽离与js->ts重构


## 例子demo
github: [https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples](https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples)

gitee: [https://gitee.com/Shiotsukikaedesari/vis-three/tree/main/examples](https://gitee.com/Shiotsukikaedesari/vis-three/tree/main/examples)


## 项目案例

github: [https://github.com/Shiotsukikaedesari/three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)

gitee: [https://gitee.com/Shiotsukikaedesari/three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)


