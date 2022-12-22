# vis-three

three.js 库二次功能封装 + 配置化的 three.js 开发。

- 功能插件化
- 逻辑策略化
- 场景配置化

<p>
  <img alt="NPM" src="https://img.shields.io/npm/l/vis-three?color=blue">
  <img alt="npm" src="https://img.shields.io/npm/v/vis-three?color=light">
  <img alt="npm" src="https://img.shields.io/npm/dt/vis-three">
  <img src="https://img.shields.io/nycrc/Shiotsukikaedesari/vis-three?color=red&label=coverage" alt="coverage">
</p>

## 主页、demo、文档在线地址

- [https://shiotsukikaedesari.github.io/vis-three/](https://shiotsukikaedesari.github.io/vis-three/)

- [https://shiotsukikaedesari.gitee.io/vis-three](https://shiotsukikaedesari.gitee.io/vis-three)

> gitee 视频资源会失效

## 进度

version0.3.2 -> version0.5.0

## 安装

### 安装总包

```
npm i vis-three
```

### 按需安装

```
npm i @vis-three/modeling-engine-support
```

## 使用

```js
import * as VIS from "vis-three";

import {
  ModelingEngineSupport,
  SupportDataGenerator,
  generateConfig,
} from "vis-three";
```

```js
import { ModelingEngineSupport } from "@vis-three/modeling-engine-support";

const engine = new ModelingEngineSupport();
```

## 备注

- gitee 仓库为 github 的同步备份仓库
- github 地址：[https://github.com/Shiotsukikaedesari/vis-three](https://github.com/Shiotsukikaedesari/vis-three)

## 项目结构说明

## 项目命令

website 的最终展现是使用的其他模块的 build 版本，如需要更新请先执行相应的：`bulid`构建。

## 贡献者

<a href="https://github.com/Shiotsukikaedesari/vis-three/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Shiotsukikaedesari/vis-three" />
</a>
