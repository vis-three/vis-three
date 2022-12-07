# vis-three

three.js 库二次功能封装 + 配置化的 three.js 开发。

<p>
  <img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/website?color=blue">
  <img alt="npm" src="https://img.shields.io/npm/v/@vis-three/website?color=light">
  <img alt="npm" src="https://img.shields.io/npm/dt/@vis-three/website">
  <img src="https://img.shields.io/nycrc/Shiotsukikaedesari/@vis-three/website?color=red&label=coverage" alt="coverage">
</p>

## 主页、demo、文档在线地址

- [https://shiotsukikaedesari.github.io/vis-three/](https://shiotsukikaedesari.github.io/vis-three/)

- [https://shiotsukikaedesari.gitee.io/vis-three](https://shiotsukikaedesari.gitee.io/vis-three)

> gitee 视频资源会失效

## 安装

```
npm i vis-three
```

## 导入

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

## 备注

- gitee 仓库为 github 的同步备份仓库
- github 地址：[https://github.com/Shiotsukikaedesari/vis-three](https://github.com/Shiotsukikaedesari/vis-three)

## 项目结构说明

- `src`vis-three 库源码
- `website`主页源码
- `docs`文档源码
- `examples`例子库源码
- `arts`美术资源
- `cypress`e2e 测试用例源码
- `dist`vis-three 库 build
- `dist-website`主页 build
- `js-source` tsc 编译 js 版本
- `types`vis-three 的声明文件
- `uitls`项目级别工具库

## 开发说明

- 例子或者网页需要添加额外依赖的，请添加到`devDependencies`中：`npm i xxxx -D`
- 提交更新之后请到`/docs/version`下简写更新功能
- 开发期请使用`jsdoc`进行注释辅助

## 项目命令

website 的最终展现是使用的其他模块的 build 版本，如需要更新请先执行相应的：`bulid`构建。

### 库

- 开发：`npm run dev`
- 构建： `npm run build`
- 代码格式化： `npm run lint`

### 列子

- 例子开发： `npm run examples:dev`
- 例子构建： `npm run examples:build`

### 文档

- 文档开发： `npm run docs:dev`
- 文档构建： `npm run docs:build`
- 文档服务： `npm run docs:serve`

### 主页

- 主页开发： `npm run website:dev`
- 主页构建： `npm run website:build`
- 主页代码格式化： `npm run website:lint`

### 测试

- 单元测试： `npm run test:unit`
- e2e 测试： `npm run test:e2e`
- 自定义测试： `npm run test:open`
- 查看测试报告： `npm run test:report`

## 贡献者

<a href="https://github.com/Shiotsukikaedesari/vis-three/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Shiotsukikaedesari/vis-three" />
</a>
