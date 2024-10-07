# 插件

## PluginOptions

`vis-three`的最终插件选项，可以通过各种方式获得，最后交给基座进行安装。

- **类型**

```ts
export interface PluginOptions<E extends Base> {
  /**插件的名字 */
  name: string;
  /**插件的依赖，依赖值为插件名字 */
  deps?: string | string[];
  /**插件的安装方法 */
  install: (Base: E) => void;
  /**插件的销毁方法 */
  dispose: (Base: E) => void;
}
```

- **详情**

插件可以有依赖，可以有多个依赖，也可以没有依赖，所以`deps`可以根据需要进行不传或者传入相应的类型。

- **示例**

可以自行构建`function`进行，这种情况下可以传入参数控制插件。在没有参数的情况下可以使用下方的`definePlugin`方法。

```ts
export const EffectComposerLPlugin = function (
  params = {
    MSAA: true,
  }
) {
  return {
    name: "EffectComposerLPlugin",
    deps: "WebGLRendererPlugin",
    install(engine) {
      if (params.MSAA) {
        // ...
      }
      //...
    },
    dispose(engine) {
      // ...
    },
  };
};
```

## definePlugin()

无参数化的定义一个插件。

- **类型**

```ts
export const definePlugin = function <E extends Base>(
  options: PluginOptions<E>
): Plugin<E, any> {
  return () => options;
};
```

- **示例**

```ts
export const EffectComposerLPlugin = definePlugin({
  name: "EffectComposerLPlugin",
  deps: "WebGLRendererPlugin",
  install(engine) {
    //...
  },
  dispose(engine) {
    // ...
  },
});
```
