# Interface: ModuleOptions<C\>

[module](../modules/module.md).ModuleOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`any`, `any`\> |

## Properties

### compiler

• **compiler**: () => `C`

#### Type declaration

• **new compiler**()

#### Defined in

[packages/middleware/module/index.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L18)

___

### expand

• `Optional` **expand**: { `command`: [`ProcessorCommands`](module.ProcessorCommands.md)<`any`, `any`, `any`, `any`\> ; `processors`: `RegExp` \| `string`[]  }[]

#### Defined in

[packages/middleware/module/index.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L24)

___

### extend

• `Optional` **extend**: <E\>(`engine`: `E`) => `void`

#### Type declaration

▸ <`E`\>(`engine`): `void`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md)<`E`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `E` |

##### Returns

`void`

#### Defined in

[packages/middleware/module/index.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L22)

___

### lifeOrder

• `Optional` **lifeOrder**: `number`

#### Defined in

[packages/middleware/module/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L23)

___

### object

• `Optional` **object**: `boolean`

#### Defined in

[packages/middleware/module/index.ts:21](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L21)

___

### processors

• **processors**: [`Processor`](../classes/module.Processor.md)<`any`, `any`, `any`, `C`\>[]

#### Defined in

[packages/middleware/module/index.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L20)

___

### rule

• **rule**: [`Rule`](../modules/module.md#rule-1)<`C`\>

#### Defined in

[packages/middleware/module/index.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L19)

___

### type

• **type**: `string`

#### Defined in

[packages/middleware/module/index.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/index.ts#L17)
