# 常量

## ENGINE_EVENT

引擎事件的枚举，可以快速获取相关的引擎事件。

- **详情**

```ts
enum ENGINE_EVENT {
  SETDOM = "setDom",
  SETSIZE = "setSize",
  SETCAMERA = "setCamera",
  SETSCENE = "setScene",
  RENDER = "render",
  DISPOSE = "dispose",
}
```

- **示例**

```ts
const engine = new Engine();

engine.on(ENGINE_EVENT.SETDOM, (event) => {
  console.log(event.dom);
});

engine.setDom(document.getElementById("app"));
```
