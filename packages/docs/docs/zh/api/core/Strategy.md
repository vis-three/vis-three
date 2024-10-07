# 策略

## StrategyOptions

`vis-three`的最终策略选项，可以通过各种方式获得，最后交给基座进行安装。

- **类型**

```ts
export interface StrategyOptions<E extends Base> {
  /**策略名字 */
  name: string;
  /**策略的条件，条件为插件名字 */
  condition: string[];
  /**执行策略的方法 */
  exec: (engine: E) => void;
  /**回滚策略的方法 */
  rollback: (engine: E) => void;
}
```

- **详情**

执行一个策略一定是有这个策略的特定条件，也就是对应的依赖插件集合，所以策略的条件是必传的，使用插件名字进行校验。

- **示例**

可以自行构建`function`进行，这种情况下可以传入参数控制策略。在没有参数的情况下可以使用下方的`defineStrategy`方法。

```ts
export const WebGLRenderStrategy = function (
  params = {
    fps: 1 / 60,
  }
) {
  return {
    name: "WebGLRenderStrategy",
    condition: ["WebGLRendererPlugin", "RenderManagerPlugin"],
    exec(engine) {
      engine.renderManager.setFPS(params.fps);
      //...
    },
    rollback(engine) {
      // ...
    },
  };
};
```

## defineStrategy()

- **类型**

```ts
export const defineStrategy = function <E extends Base>(
  options: StrategyOptions<E>
): Strategy<E, any> {
  return () => options;
};
```

- **示例**

```ts
export const WebGLRenderStrategy = defineStrategy({
  name: "WebGLRenderStrategy",
  condition: ["WebGLRendererPlugin", "RenderManagerPlugin"],
  exec(engine) {
    //...
  },
  rollback(engine) {
    // ...
  },
});
```
