# 处理管线

用来分逻辑的连续处理一个对象。

## 构造

- **详情**

```ts
/**
 * 传入的对象
 */
constructor Pipeline(config: any): Pipeline
```

## 属性

### config

处理对象，一般为`@vis-three/tdcm`的配置。

- **类型**

```ts
any;
```

## 方法

### pipe

- **详情**

```ts
/**
 * 管线处理
 * @param fun config => config 会自动传入当前管线的处理对象。
 * @returns this
 */
pipe(fun: (config: any) => any): this
```

### get

- **详情**

```ts
/**
 * 获取处理对象
 * @returns this.config
 */
get(): any
```
