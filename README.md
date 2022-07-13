# vis-three

three.js 库二次功能封装 + 配置化的 three.js 开发。

<p>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/Version-0.1.3-{}" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/License-MPL2.0-{}" alt="License"></a>
</p>

## 主页、demo、文档在线地址

[https://shiotsukikaedesari.gitee.io/vis-three](https://shiotsukikaedesari.gitee.io/vis-three)

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
  github 地址：[https://github.com/Shiotsukikaedesari/vis-three](https://github.com/Shiotsukikaedesari/vis-three)

## 项目结构说明
- `src`vis-three库源码
- `website`主页源码
- `docs`文档源码
- `examples`例子库源码
- `arts`美术资源
- `cypress`e2e测试用例源码
- `dist`vis-three库build
- `dist-website`主页build
- `js-source` tsc编译js版本
- `types`vis-three的声明文件地址
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

### 测试

- 例子开发： `npm run examples:dev`
- 例子构建： `npm run examples:build`
- e2e 测试： `npm run e2e:open`

### 文档

- 文档开发： `npm run docs:dev`
- 文档构建： `npm run docs:build`
- 文档服务： `npm run docs:serve`

### 主页

- 主页开发： `npm run website:dev`
- 主页构建： `npm run website:build`
- 主页代码格式化： `npm run website:lint`

## 项目案例

github:

- [https://github.com/Shiotsukikaedesari/three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://github.com/Shiotsukikaedesari/vis-model-generator](https://github.com/Shiotsukikaedesari/vis-model-generator)

gitee:

- [https://gitee.com/Shiotsukikaedesari/three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://gitee.com/Shiotsukikaedesari/vis-model-generator](https://gitee.com/Shiotsukikaedesari/vis-model-generator)
