# Interface: GenerateOptions<C\>

[utils](../modules/utils.md).GenerateOptions

Additional Options for Configuration Generation

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](module.SymbolConfig.md) |

## Properties

### handler

• `Optional` **handler**: (`c`: `C`) => `C`

#### Type declaration

▸ (`c`): `C`

Additional configuration handling methods are available. However, it is recommended to use the global option `defineOption`, and only use these methods in special cases.

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

Strict mode allows only the merging of properties specified by CONFIGTYPE. It is disabled under custom extended configurations.

#### Defined in

[packages/middleware/utils/generateConfig.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L12)

___

### warn

• **warn**: `boolean`

Whether to output warnings to the console

#### Defined in

[packages/middleware/utils/generateConfig.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/generateConfig.ts#L14)
