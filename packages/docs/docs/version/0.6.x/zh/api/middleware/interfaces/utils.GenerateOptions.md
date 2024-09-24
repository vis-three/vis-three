# Interface: GenerateOptions<C\>

[utils](../modules/utils.md).GenerateOptions

配置单生成的附加选项

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](module.SymbolConfig.md) |

## Properties

### handler

• `Optional` **handler**: (`c`: `C`) => `C`

#### Type declaration

▸ (`c`): `C`

配置额外处理方法，不过建议使用 全局选项`defineOption`,除非特殊情况再使用此方法。

##### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `C` |

##### Returns

`C`

#### Defined in

[packages/middleware/utils/generateConfig.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L18)

___

### strict

• **strict**: `boolean`

严格模式，只允许合并CONFIGTYPE规定的属性，自定义扩展配置下关闭

#### Defined in

[packages/middleware/utils/generateConfig.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L12)

___

### warn

• **warn**: `boolean`

控制台是否输出warn

#### Defined in

[packages/middleware/utils/generateConfig.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L14)
