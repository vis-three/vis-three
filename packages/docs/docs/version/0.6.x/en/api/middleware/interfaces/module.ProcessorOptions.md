# Interface: ProcessorOptions<S, T, E, C\>

[module](../modules/module.md).ProcessorOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`S`, `T`\> |

## Properties

### commands

• `Optional` **commands**: [`ProcessorCommands`](module.ProcessorCommands.md)<`S`, `T`, `E`, `C`\>

#### Defined in

packages/middleware/module/Processor/index.ts:74

___

### config

• **config**: () => `S`

#### Type declaration

▸ (): `S`

##### Returns

`S`

#### Defined in

packages/middleware/module/Processor/index.ts:73

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

packages/middleware/module/Processor/index.ts:75

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

packages/middleware/module/Processor/index.ts:76

___

### type

• **type**: `string`

#### Defined in

packages/middleware/module/Processor/index.ts:72
