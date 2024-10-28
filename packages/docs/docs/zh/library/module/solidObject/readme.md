# @vis-three/module-solid-object

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-solid-object">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-solid-object?color=blue">

## 模块信息

这是一个虚拟公共模块，是其他实体物体模块的基础模块，没有实际的模块对象，只提供相关方法属性。

:::tip
实体物体也就是这个物体既有`geometry`又有`material`。
:::

## 拓展定义模块

- **详情**

```ts
export const defineSolidObjectModel = defineObjectModel.extend<
  SolidObjectConfig,
  Object3D,
  {},
  SolidObjectShared,
  EngineSupport,
  Compiler<EngineSupport>,
  <O extends Object3D, C extends SolidObjectConfig>(params: {
    model: SolidObjectModel;
    target: O;
    config: C;
    filter: IgnoreAttribute<C>;
    engine: EngineSupport;
  }) => void,
  <O extends Object3D>(params: { target: O }) => void
>((objectModel) => ({
  shared: {
    replaceMaterial: new ShaderMaterial({
      fragmentShader: `
      void main () {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
      `,
    }),
    replaceGeometry: new BoxGeometry(10, 10, 10),
  },
  commands: {
    add: {
      material: materialHandler,
    },
    set: {
      geometry: geometryHandler,
      material: materialHandler,
    },
    delete: {
      material: materialHandler,
    },
  },
  create({ model, target, config, filter, engine }) {
    if (!filter.geometry) {
      (<Mesh>(<unknown>target)).geometry.dispose();

      geometryHandler.call(model, {
        model,
        target,
        value: config.geometry,
        engine,
      } as unknown as SolidObjectCommandParameters);
    }

    if (!filter.material) {
      materialHandler.call(model, {
        model,
        target,
        config,
        engine,
      } as unknown as SolidObjectCommandParameters);
    }

    objectModel.create!({
      model: model as unknown as ObjectModel,
      target,
      config,
      filter: {
        material: true,
        geometry: true,
        ...filter,
      },
      engine,
    });
  },

  dispose({ target }) {
    objectModel.dispose!({ target });
  },
}));
```

- **使用**

```ts
const meshModel = defineSolidObjectModel(() => {
  type: "Mesh";
});
```
