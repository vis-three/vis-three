## @vis-three/module-animation

## 最新版本

   <img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-animation">
## license
   <img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-animation?color=blue">
## 模块信息

### module.type

- **值**: `animation`

### module.object

- **值**: `false`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.NINE` - 900

## 提供配置

### AnimationConfig

- **配置类型**:

```ts
export interface AnimationConfig extends BasicConfig {
  /**播放 */
  play: boolean;
}
```

:::tip
此类型为内部调用
:::

### ScriptAnimationConfig

- **配置类型**:

```ts
export interface ScriptAnimationConfig extends Omit<AnimationConfig, "target"> {
  /**动画目标 */
  target: string;
  /**脚本配置 */
  script: BasicAniScriptConfig;
  /**动画的属性 */
  attribute: string;
}
```

- **默认配置**：

```ts
{
    target: "",
    script: { name: "" },
    attribute: "",
  }
```

### MixerAnimationConfig

- **配置类型**:

```ts
export interface MixerAnimationConfig extends AnimationConfig {
  /**动画目标 */
  target: string | string[];
  /**动画时间*/
  time: number;
  /**动画时间缩放*/
  timeScale: number;
}
```

- **默认配置**：

```ts
{
    target: "",
    time: 0,
    timeScale: 1,
  }
```

# AniScriptGeneratorManager

脚本动画生成器管理器。

## 静态方法

### register

- **详情**

```ts
/**
 * 注册脚本配置动画
 * @param config 配置模板
 * @param generator 脚本动画生成器函数
 * @returns this
 */
register<C extends BasicAniScriptConfig>({ config, generator, }: {
    config: C;
    generator: AniScriptGenerator<C>;
}): AniScriptGeneratorManager
```

### generateConfig

- **详情**

```ts
/**
* 生成脚本配置
* @param name 动画名
* @param merge 初始参数
* @returns BasicAniScriptConfig
*/
generateConfig(name: string, merge: object): BasicAniScriptConfig
```

### generateScript

- **详情**

```ts
/**
* 生成脚本
* @param engine 当前使用的engine
* @param target 生成脚本的目标对象
* @param attribute 生成脚本目标对象的动画属性
* @param config 生成的配置单
* @returns fun
*/
generateScript(engine: EngineSupport, target: object, attribute: string, config: BasicAniScriptConfig): (event: RenderEvent) => void
```

### has

- **详情**

```ts
/**
* 管理器中是否已经注册了脚本
* @param name 脚本名
* @returns boolean
*/
has(name: string): boolean
```
