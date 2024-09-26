# 安装

## 工程环境

`vis-three`推荐使用类似`npm` + 支持`es module`的开发环境，因为这套开发体系已经通过了很多项目的验证。

## 版本

`vis-three` 目前还处于快速开发迭代中。目前的大版本号为：`0.7`

## 安装 three.js

`vis-three`依赖于`three`，但是不强制依赖某一个特定版本，最优的依赖版本是官网示例的`three`版本，所以在安装`vis-three`之前，需要先安装`three`。

```
npm i three
npm i @types/three -D
```

::: tip
目前所有示例所使用的 three.js 版本为：`^0.167.1`——`npm i three@^0.167.0`
:::

## 安装 vis-three

`vis-three`框架的构建方式是通过组装的形式进行，通过不同的组装集成，构建不同的引擎功能，进而服务不同的业务需要。你可以根据自己的业务场景去判断使用哪种组织模式：

- [原生化开发](/zh/start/native.md)
- [配置化开发](/zh/start/config.md)
- [组件化开发](/zh/start/widget.md)

文档会通过后面的示例渐进式的引导读者了解`vis-three`的组装构建模式，下面先介绍一下`vis-three`所含的包结构与分类。

## vis-three 模块介绍

### 引擎核心

`@vis-three/core`

引擎核心提供了组装式底层应用逻辑和 3D 引擎的基础 API，是所有包的基础依赖。

### 配置化核心

`@vis-three/tdcm`

`three dimensional config model`配置化核心是在引擎核心的基础上，集成了配置化的基础逻辑和 API 的底座。

### 组件化核心

`@vis-three/widget`
组件化核心是在配置化核心的基础上，集成了组件化的基础逻辑和 API 的底座。

### 插件

`@vis-three/plugin-xxx`

插件的作用是给引擎添加新功能和新能力，官方提供的所有插件包都是以`@vis-three/plugin-`开头。

### 策略

`@vis-three/strategy-xxx`

策略是联调不同的插件功能和能力去完成一项具体的事情或者具体的业务功能，官方提供的所有策略包都是以`@vis-three/strategy-`开头。

### 配置化模块

`@vis-three/module-xxx`

配置化模块是根据不同的功能需要，进而实现的各种`配置` ->`实例`的逻辑模块。

### 便利工具

`@vis-three/convenient`

便利工具是官方在项目活动中遇到的可抽离的各种实用工具的集合库。

### 工具库

`@vis-three/utils`

工具库是为整个`vis-three`开发服务的代码逻辑库。

### 衍生库

`@vis-three/library-xxx`

衍生库是官方提供与 3D 应用相关的集合库，方便快速查找引入，官方提供的所有衍生库都是以`@vis-three/library-`开头。

### 预置引擎

`@vis-three/engine-xxx`

预置引擎是官方根据不同应用场景所组装的引擎，方便快速的引入开发和调试，官方提供的所有预置引擎都是以`@vis-three/engine-`开头。
