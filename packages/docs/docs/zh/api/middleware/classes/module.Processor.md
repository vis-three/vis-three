# Class: Processor<S, T, E, C\>

[module](../modules/module.md).Processor

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](engine.EngineSupport.md) |
| `C` | extends [`Compiler`](module.Compiler.md)<`S`, `T`\> |

## Constructors

### constructor

• **new Processor**<`S`, `T`, `E`, `C`\>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](engine.EngineSupport.md)<`E`\> |
| `C` | extends [`Compiler`](module.Compiler.md)<`S`, `T`, `C`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ProcessorOptions`](../interfaces/module.ProcessorOptions.md)<`S`, `T`, `E`, `C`\> |

#### Defined in

packages/middleware/module/Processor/index.ts:100

## Properties

### commands

• `Optional` **commands**: [`ProcessorCommands`](../interfaces/module.ProcessorCommands.md)<`S`, `T`, `E`, `C`\>

#### Defined in

packages/middleware/module/Processor/index.ts:96

___

### config

• **config**: () => `S`

#### Type declaration

▸ (): `S`

##### Returns

`S`

#### Defined in

packages/middleware/module/Processor/index.ts:95

___

### create

• **create**: (`config`: `S`, `engine`: `E`, `compiler`: `C`) => `T`

#### Type declaration

▸ (`config`, `engine`, `compiler`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `S` |
| `engine` | `E` |
| `compiler` | `C` |

##### Returns

`T`

#### Defined in

packages/middleware/module/Processor/index.ts:97

___

### dispose

• **dispose**: (`target`: `T`, `engine`: `E`, `compiler`: `C`) => `void`

#### Type declaration

▸ (`target`, `engine`, `compiler`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |
| `engine` | `E` |
| `compiler` | `C` |

##### Returns

`void`

#### Defined in

packages/middleware/module/Processor/index.ts:98

___

### type

• **type**: `string`

#### Defined in

packages/middleware/module/Processor/index.ts:94

## Methods

### add

▸ **add**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ProcessParams`](../interfaces/module.ProcessParams.md)<`S`, `T`, `E`, `C`\> |

#### Returns

`void`

#### Defined in

packages/middleware/module/Processor/index.ts:148

___

### delete

▸ **delete**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ProcessParams`](../interfaces/module.ProcessParams.md)<`S`, `T`, `E`, `C`\> |

#### Returns

`void`

#### Defined in

packages/middleware/module/Processor/index.ts:180

___

### expand

▸ **expand**<`P`\>(`commands`): [`Processor`](module.Processor.md)<`P`, `T`, `E`, [`Compiler`](module.Compiler.md)<`P`, `T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `commands` | [`ProcessorCommands`](../interfaces/module.ProcessorCommands.md)<`P`, `T`, `E`, `C`\> |

#### Returns

[`Processor`](module.Processor.md)<`P`, `T`, `E`, [`Compiler`](module.Compiler.md)<`P`, `T`\>\>

#### Defined in

packages/middleware/module/Processor/index.ts:196

___

### process

▸ **process**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ProcessParams`](../interfaces/module.ProcessParams.md)<`S`, `T`, `E`, `C`\> |

#### Returns

`void`

#### Defined in

packages/middleware/module/Processor/index.ts:117

___

### set

▸ **set**(`params`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ProcessParams`](../interfaces/module.ProcessParams.md)<`S`, `T`, `E`, `C`\> |

#### Returns

`void`

#### Defined in

packages/middleware/module/Processor/index.ts:164
