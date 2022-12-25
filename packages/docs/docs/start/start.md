## 为什么要用 VIS-THREE

### 原生 three.js 项目开发功能模块难以组织

当我们使用 three.js 进行 web3D 相关项目的开发，不管我们是参考[three.js 官网](https://threejs.org/)的例子，还是其他的插件 demo，或者是自己从事项目开发都会发现一个很大的问题，就是使用 three.js 进行开发构建项目时候的 **代码组织** 问题。

我们会发现使用原生 three.js 进行项目开发的时候很难找到一个很好的形式去组织我们的项目代码。第一阶段的功能完成之后，大多数情况下，我们会得到一个“又臭又长”的引擎文件，就算在项目初期进行了很好的模块划分，但是我们还会遇到后面的问题。

![/image/start/long-engine.png](/image/start/long-engine.png)

### 项目迭代非常困难麻烦

项目功能迭代会非常头疼，每当要增加功能或者逻辑实现的时候，我们很难下手，因为很多功能逻辑的增加没有一个统一的接入点，我们需要在各种已经完成的逻辑块或者功能块之间去添加新的功能逻辑，如果这个时候再加上“敏捷开发”的 buff，项目会何去何从？开发人员们又将何去何从？

### 开发中所涉及到的“坑”特别多

three.js 算是一个 web3D 的库，它只提供了最基本或者最原始的项目构建手段，就是因为原始和基本，使得功能非常强大，但是也是因为原始基本，在项目构建的过程中，会有很多的细节问题需要我们去发现和攻克，“坑”踩了一遍，换了一个项目，还要踩第二遍？你踩了一遍，别人再踩一遍？

## 安装

### 整体安装

`vis-three`依赖于`three`，但是不强制起来某一个特定版本，最优的依赖版本是官网示例的`three`版本，所以在安装`vis-three`之前，需要先安装`three`。

```
npm i three
npm i vis-three
```

### 整体安装后的使用

```js
import * as VIS from "vis-three";

const engine = new VIS.DisplayEngine();
```

### 按需安装

推荐使用按需安装，由于大多数情况下，大部分项目使用不到所有的插件，策略，各种库，为了保证构建效率和依赖下载效率，推荐使用按需安装，能够优化整体的开发流程。

```
npm i three
npm i @vis-three/display-engine
```

### 按需安装后的使用

```js
import { DisplayEngine } from "@vis-three/display-engine";

const engine = new DisplayEngine();
```

::: tip
`vis-three`官方的所有子包都在`npm`的`@vis-three`组织下，大家可以根据需要进行相关的查找安装使用。
:::

## 引擎构建
