# Interface: ProcessorCommands<S, T, E, C\>

[module](../modules/module.md).ProcessorCommands

## Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`any`, `any`\> |

## Properties

### add

• `Optional` **add**: `DeepIntersection`<`DeepPartial`<`DeepRecord`<`DeepUnion`<`S`, [`KeyCommand`](../modules/module.md#keycommand)<`S`, `T`, `E`, `C`\>\>, [`KeyCommand`](../modules/module.md#keycommand)<`S`, `T`, `E`, `C`\>\>\>, { `$reg?`: [`RegCommand`](../modules/module.md#regcommand)<`S`, `T`, `E`, `C`\>[]  }\>

#### Defined in

packages/middleware/module/Processor/index.ts:61

___

### delete

• `Optional` **delete**: `DeepIntersection`<`DeepPartial`<`DeepRecord`<`DeepUnion`<`S`, [`KeyCommand`](../modules/module.md#keycommand)<`S`, `T`, `E`, `C`\>\>, [`KeyCommand`](../modules/module.md#keycommand)<`S`, `T`, `E`, `C`\>\>\>, { `$reg?`: [`RegCommand`](../modules/module.md#regcommand)<`S`, `T`, `E`, `C`\>[]  }\>

#### Defined in

packages/middleware/module/Processor/index.ts:63

___

### set

• `Optional` **set**: `DeepIntersection`<`DeepPartial`<`DeepRecord`<`DeepUnion`<`S`, [`KeyCommand`](../modules/module.md#keycommand)<`S`, `T`, `E`, `C`\>\>, [`KeyCommand`](../modules/module.md#keycommand)<`S`, `T`, `E`, `C`\>\>\>, { `$reg?`: [`RegCommand`](../modules/module.md#regcommand)<`S`, `T`, `E`, `C`\>[]  }\>

#### Defined in

packages/middleware/module/Processor/index.ts:62
