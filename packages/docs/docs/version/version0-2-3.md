## version 0.2.3

#### feat

- 支持 Object3D 模块 - `Object3DDataSupport`
- 支持 GLTF 模型导入
- 支持 GLB 模型导入
- 支持 MeshPhysicalMaterial 材质
- keyboardManager 新增`getDocs`
- LoaderManager 新增`setRequestHeader`、`setResponseType`
- 增加模板化模块：`template`, `template.clone`
- 增加 resourceManager 的 parser 支持

#### fix

- 修复 ScriptAnimation set 与 remove 的部分问题

#### perf

- 优化 ScirptAnimation set 与 remove 时，会基于原配置进行
- 优化快捷键描述

#### deprecated

- resourceManager 废弃了 structureMap，内容将返回空。
- LoaderManager 废弃`getLoadDetailMap`,`setLoadDetailMap`
