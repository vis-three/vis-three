# Three.js 基础引擎

通过继承基座，并提供`three.js`的最基础设置和`api`的`engine`，进而可以开展相关的渲染工作。

## 示例

```ts
const engine = new Engine();

engine
  .install(WebGLRendererPlugin())
  .install(RenderManagerPlugin())
  .exec(WebGLRenderStrategy());

engine.scene.add(new Mesh(new BoxGeometry(), new MeshBasicMaterial()));

engine.render();
```

## 继承

[Base](./Base.md)

## 构造

无

## 属性

### dom

渲染挂载的目标 dom。

- **类型**

```ts
HTMLElement;
```

### camera

当前渲染的相机，`three.js` 对应的`camera`对象。

- **类型**

```ts
Camera;
```

### scene

当前渲染的场景。

- **类型**

```ts
Scene;
```

## 方法

### setDom

- **详情**

```ts
/**
 * 设置输出的dom，调用时会发布'setDom'事件
 * @param dom 挂载的dom对象
 * @returns this
 */
setDom(dom: HTMLElement): this
```

- **示例**

```ts
const engine = new Engine();

engine.on("setDom", (event) => {
  console.log(event.dom);
});

engine.setDom(document.getElementById("app"));
```

### setSize

- **详情**

```ts
/**
 * 设置渲染窗口的整体尺寸，单位为px，调用时会发布'setSize'事件。
 * 不传时会自动获取当前挂载dom对象的宽高。
 * @param width 窗口宽度
 * @param height 窗口高度
 * @returns this
 */
setSize(width?: number, height?: number): this
```

- **示例**

```ts
const engine = new Engine();

engine.on("setSize", (event) => {
  console.log(event.width, event.height);
});

engine.setSize();

engine.setSize(1920, 1080);
```

### setCamera

- **详情**

```ts
/**
 * 设置当前相机，调用时会发布'setCamera'事件。
 * @param camera 设置当前渲染的相机对象
 * @param options 额外的选项设置，这些选项会加入到发布的'setCamera'事件中。
 * @returns this
 */
setCamera(camera: Camera, options?: SetCameraOptions): this
```

- **示例**

```ts
const engine = new Engine();

engine.on("setCamera", (event) => {
  console.log(event.camera);

  if (event.orbitControls) {
    engine.orbitControls.setCamera(event.camera);
  }
});

engine.setCamera(new PersepectiveCamera());

engine.setCamera(new PersepectiveCamera(), {
  orbitControls: false,
  transformControls: true,
});
```

### setScene

- **详情**

```ts
/**
 * 设置渲染场景，调用时会发布'setScene'事件。
 * 事件包含上一个场景，和切换的场景。
 * @param scene 新的场景对象
 * @returns this
 */
setScene(scene: Scene): this
```

- **示例**

```ts
const engine = new Engine();

engine.on("setScene", (event) => {
  console.log(event.scene, event.oldScene);
});

engine.setScene(new Scene());
```

### render

- **详情**

```ts
/**
 * 渲染方法，调用时会发布'render'事件。
 * @param delta 传入的渲染帧插值，默认为0，会加入到发布的`render`事件中。
 * @returns this
 */
render(delta: number = 0): this
```

- **示例**

```ts
const engine = new Base();

engine.on("render", (event) => {
  console.log(event.delta);
});

engine.render();
```

### dispose

- **详情**

```ts
/**
 * 清除引擎缓存，调用时会发布'dispose'事件。
 * @returns this
 */
dispose(): this
```

- **示例**

```ts
const engine = new Base();

engine.on("dispose", (event) => {});

engine.dispose();
```
