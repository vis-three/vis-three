# 组件化引擎

该引擎继承了配置化核心引擎，并添加了相关的组件化能力与有关`api`。

```ts
const engine = new EngineWidget()
  .install(WebGLRendererPlugin())
  .exec(WebGLRenderStrategy())
  .play();

const box = defineComponent({
  render() {
    h("PointLight", {
      position: {
        x: 30,
        y: 50,
      },
      distance: 100,
    });

    h("Mesh", {
      geometry: h("BoxGeometry", {
        width: 20,
        height: 40,
        depth: 60,
      }),
      material: h("MeshStandardMaterial", {
        color: "rgb(255, 0, 0)",
      }),
    });
  },
});

engine.createWidget(box).mount();
```

## 继承

[EngineSupport](../tdcm/EngineSupport.md)

## 方法

### createWidget

- **详情**

```ts
/**
 * 创建一个小部件
 * @param component 组件
 * @returns Widget
 */
createWidget<Props extends object = {}, RawBindings extends object = {}>(component: ComponentOptions<typeof this, Props, RawBindings>): Widget<this, Props, RawBindings>
```
