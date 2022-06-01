## 安装

```
npm i vis-three
```

## 使用

```js
// 整体导入
import * as Vis from "vis-three";

// 按需导入
import {
  ModelingEngineSupport,
  SupportDataGenerator,
  generateConfig,
} from "vis-three";
```

## 基本用法

### 生成配置

```js
// 基础配置单
const pointLight = Vis.generateConfig("PointLight", {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});

// vis响应式
const engine = new Vis.ModelingEngineSupport();
const pointLight = engine.reactiveConfig(
  Vis.generateConfig("PointLight", {
    position: {
      x: 10,
      y: 20,
      z: 20,
    },
  })
);

// vue2 + vis响应式
const engine = new Vis.ModelingEngineSupport();
const pointLight = engine.reactiveConfig(
  Vue.observable(
    Vis.generateConfig("PointLight", {
      position: {
        x: 10,
        y: 20,
        z: 20,
      },
    })
  )
);

// vue3 + vis响应式
const engine = new Vis.ModelingEngineSupport();
const pointLight = reactive(
  engine.reactiveConfig(
    Vis.generateConfig("PointLight", {
      position: {
        x: 10,
        y: 20,
        z: 20,
      },
    })
  )
);
engine.applyConfig(pointLight);
```

### 配置使用

```js
// 动态载入
const engine = new Vis.ModelingEngineSupport();
engine.applyConfig(pointLight);

// 预设加入
const lightDataSupport = new Vis.LightDataSupport({
  [pointLight.vid]: pointLight,
});

const engine = new Vis.ModelingEngineSupport({
  lightDataSupport: lightDataSupport,
});
```

### 使用配置支持模块插件

```js
const lightDataSupport = new Vis.LightDataSupport({
  [pointLight.vid]: pointLight,
});
const cameraDataSupport = new Vis.CameraDataSupport({
  // ...
});

const engine = new Vis.ModelingEngineSupport({
  lightDataSupport,
  cameraDataSupport,
});
```

### 使用支持相关引擎

```js
const engine = new Vis.ModelingEngineSupport({
  lightDataSupport: lightDataSupport,
}).setDom(document.getElementById("app"));
```

### 指定渲染场景

```js
const scene = Vis.generateConfig("Scene", {
  children: [pointLight.vid],
});
engine.applyConfig(scene).setScene(scene.vid);
```

### 指定渲染相机

```js
const camera = Vis.generateConfig("PerspectiveCamera", {
  position: {
    x: 50,
    y: 50,
    z: 50,
  },
  far: 5000,
});

engine.applyConfig(camera).setCamera(camera.vid);
```

### 快速编辑场景物体

```html
<input type="number" v-model="pointLight.position.x" />
```

```js
data() {
  return {
    pointLight
  }
},

method: {
  movePointLight () {
    this.pointLight.position.x = 10;
    this.pointLight.position.y = 20;
  }
}

```

### 导出配置

```js
console.log(engineSupport.toJSON());
```

### 导入配置

```js
import config from "/examples/config.json";

const handlerConfig = JSON.parse(JSON.stringify(config), Vis.JSONHandler.parse);

const engine = new Vis.ModelingEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .play()
  .loadConfigAsync(handlerConfig)
  .then((event) => {
    // loaded do something...
  });
```
