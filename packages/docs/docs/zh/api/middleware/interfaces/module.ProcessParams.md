# Interface: ProcessParams<S, T, E, C\>

[module](../modules/module.md).ProcessParams

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`any`, `any`\> |

## Hierarchy

- [`CompileNotice`](../modules/module.md#compilenotice)

  ↳ **`ProcessParams`**

## Properties

### compiler

• **compiler**: `C`

#### Defined in

packages/middleware/module/Processor/index.ts:21

___

### config

• **config**: `S`

#### Defined in

packages/middleware/module/Processor/index.ts:19

___

### engine

• **engine**: `E`

#### Defined in

packages/middleware/module/Processor/index.ts:22

___

### key

• **key**: `string`

#### Inherited from

CompileNotice.key

#### Defined in

[packages/middleware/module/dataContainer/index.ts:11](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L11)

___

### operate

• **operate**: ``"set"`` \| ``"add"`` \| ``"delete"``

#### Inherited from

CompileNotice.operate

#### Defined in

[packages/middleware/module/dataContainer/index.ts:9](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L9)

___

### path

• **path**: `string`[]

#### Inherited from

CompileNotice.path

#### Defined in

[packages/middleware/module/compiler/index.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L14)

___

### processor

• **processor**: [`Processor`](../classes/module.Processor.md)<`S`, `T`, `E`, `C`\>

#### Defined in

packages/middleware/module/Processor/index.ts:23

___

### target

• **target**: `T`

#### Defined in

packages/middleware/module/Processor/index.ts:20

___

### value

• **value**: `any`

#### Inherited from

CompileNotice.value

#### Defined in

[packages/middleware/module/dataContainer/index.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L12)
