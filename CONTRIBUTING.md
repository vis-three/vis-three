# VIS-THREE 贡献指南

欢迎阅读 vis-three 贡献指南。

## 项目管理说明

- 本项目使用的是`pnpm`进行项目开发管理，pnpm 文档：[https://www.pnpm.cn/](https://www.pnpm.cn/)
- 安装依赖：在项目根目录执行：`pnpm i`

## 项目结构

- [/docs](/docs)为本项目的在线静态站点。需要通过`website`更新。
- [/packages/docs](/packages/docs)为文档仓库。执行`pnpm run build`会自动更新到`website`目录。
- [/packages/examples](/packages/examples)为例子仓库。执行`pnpm run build`会自动更新到`website`目录。
- [/packages/website](/packages/website)为静态页面仓库。执行`pnpm run build`后会更新在线静态站点。
- [/packages/create-vis-three](/packages/create-vis-three)为快速构建模块包的命令工具。
- [/packages/core](/packages/core)为**核心**仓库。
- [/packages/middleware](/packages/middleware)为**配置化核心**仓库。
- [/packages/plugins](/packages/plugins)为官方提供的**插件**文件夹。
- [/packages/strategy](/packages/strategy)为官方提供的**策略**文件夹。
- [/packages/packages/engine](/packages/packages/engine)为官方提供的**预置引擎**文件夹。
- [/packages/library](/packages/library)为官方提供的**颜色库**文件夹。
- [/packages/convenient](/packages/convenient)为官方提供的**便利工具**仓库。
- [/packages/utils](/packages/utils)为官方提供的**工具库**。
- [/packages/test](/packages/test)为官方的测试模块，在这里会对所有模板进行单元测试和 e2e 测试。

## 模块包更新

由于本项目使用的是`monorepo`模式，再搭配`pnpm`进行仓库管理，在进行开发时需要注意更新流程与事项。

### 代码更新

当我们在进行模块修改时，可以通过[/packages/examples](/packages/examples)模块，实时修改验证内容，并且顺便提供演示例子。

修改完成后确认无重大 bug，需要在当前模块包内执行`pnpm run build`打包。

### 版本修改

### 全局更新版本依赖

### 测试

## 包发版
