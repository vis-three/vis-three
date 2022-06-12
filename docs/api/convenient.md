## generateConfig

生成 VIS 可支持对象的配置单函数

```ts
export interface GenerateConfig {
  (
    type: CONFIGTYPE | string,
    merge?:
      | DeepPartial<ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>>
      | undefined,
    strict?: boolean,
    warn?: boolean
  ): ReturnType<typeof CONFIGFACTORY[CONFIGTYPE]>;

  autoInject: boolean;
  injectEngine: EngineSupport | null;
  injectScene: string | boolean;
}
```

### 参数

| 参数   | 类型                    | 说明                                                                           | 默认值 | 必传    | 版本      |
| ------ | ----------------------- | ------------------------------------------------------------------------------ | ------ | ------- | --------- |
| type   | `CONFIGTYPE` 、`string` | VIS 支持对象枚举类型或者`string`                                               | -      | `true`  | `@latest` |
| merge  | `object`                | 用来合并默认对象的拓展对象，对象结构与想要获取的配置对象一致，可以按需提供属性 | -      | `false` | `@latest` |
| strict | `boolean`               | 是否严格检查`merge`对象与支持对象的一致性，不一致不会合并                      | `true` | `false` | `@latest` |
| warn   | `warn`                  | `strict`模式下不通过是否发出警告`console.warn`                                 | `true` | `false` | `@latest` |

### 返回值

| 类型     | 说明                                             | 默认值               | 版本      |
| -------- | ------------------------------------------------ | -------------------- | --------- |
| `object` | 由`CONFIGFACTORY`提供的 VIS 支持对象，包括合并值 | `{vid: '', type:''}` | `@latest` |

### 静态属性

| 参数         | 类型                 | 说明                                                                                                        | 默认值  | 版本      |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------- | ------- | --------- |
| autoInject   | `boolean`            | 是否开启配置自动注入                                                                                        | `false` | `@latest` |
| injectEngine | `EngineSupport`      | 自动注入的目标引擎                                                                                          | `null`  | `@latest` |
| injectScene  | `string` 、`boolean` | 自动注入的目标场景，`true`时会自动注入到`EngineSupport.scene`下场景， `string`为`vid`时会注入到相应的场景中 | `false` | `@latest` |
