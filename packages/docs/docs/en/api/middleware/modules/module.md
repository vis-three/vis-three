# Module: module

## Enumerations

- [COMPILER\_EVENT](../enums/module.COMPILER_EVENT.md)

## Classes

- [Compiler](../classes/module.Compiler.md)
- [DataContainer](../classes/module.DataContainer.md)
- [DataSupport](../classes/module.DataSupport.md)
- [Processor](../classes/module.Processor.md)
- [Translater](../classes/module.Translater.md)

## Interfaces

- [CompilerSimplifier](../interfaces/module.CompilerSimplifier.md)
- [DataSupportSimplifier](../interfaces/module.DataSupportSimplifier.md)
- [ModuleOptions](../interfaces/module.ModuleOptions.md)
- [ProcessParams](../interfaces/module.ProcessParams.md)
- [ProcessorCommands](../interfaces/module.ProcessorCommands.md)
- [ProcessorOptions](../interfaces/module.ProcessorOptions.md)
- [ProxyNotice](../interfaces/module.ProxyNotice.md)
- [SymbolConfig](../interfaces/module.SymbolConfig.md)
- [Vector2Config](../interfaces/module.Vector2Config.md)
- [Vector3Config](../interfaces/module.Vector3Config.md)

## Type Aliases

### BasicCompiler

Ƭ **BasicCompiler**: [`Compiler`](../classes/module.Compiler.md)<[`SymbolConfig`](../interfaces/module.SymbolConfig.md), `object`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L12)

___

### CommandStructure

Ƭ **CommandStructure**<`S`, `T`, `E`, `C`\>: `DeepIntersection`<`DeepPartial`<`DeepRecord`<`DeepUnion`<`S`, [`KeyCommand`](module.md#keycommand)<`S`, `T`, `E`, `C`\>\>, [`KeyCommand`](module.md#keycommand)<`S`, `T`, `E`, `C`\>\>\>, { `$reg?`: [`RegCommand`](module.md#regcommand)<`S`, `T`, `E`, `C`\>[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`S`, `T`\> |

#### Defined in

packages/middleware/module/Processor/index.ts:43

___

### CompileNotice

Ƭ **CompileNotice**: `Omit`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), ``"path"``\> & { `path`: `string`[]  }

#### Defined in

[packages/middleware/module/compiler/index.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L14)

___

### CompilerTarget

Ƭ **CompilerTarget**<`C`\>: `Record`<`string`, `C`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Defined in

[packages/middleware/module/compiler/index.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L10)

___

### DefineProcessor

Ƭ **DefineProcessor**: <S, T, E, C\>(`options`: [`ProcessorOptions`](../interfaces/module.ProcessorOptions.md)<`S`, `T`, `E`, `C`\>) => [`Processor`](../classes/module.Processor.md)<`S`, `T`, `E`, `C`\>

#### Type declaration

▸ <`S`, `T`, `E`, `C`\>(`options`): [`Processor`](../classes/module.Processor.md)<`S`, `T`, `E`, `C`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`any`, `any`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ProcessorOptions`](../interfaces/module.ProcessorOptions.md)<`S`, `T`, `E`, `C`\> |

##### Returns

[`Processor`](../classes/module.Processor.md)<`S`, `T`, `E`, `C`\>

#### Defined in

packages/middleware/module/Processor/index.ts:79

___

### KeyCommand

Ƭ **KeyCommand**<`S`, `T`, `E`, `C`\>: (`params`: [`ProcessParams`](../interfaces/module.ProcessParams.md)<`S`, `T`, `E`, `C`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`S`, `T`\> |

#### Type declaration

▸ (`params`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ProcessParams`](../interfaces/module.ProcessParams.md)<`S`, `T`, `E`, `C`\> |

##### Returns

`void`

#### Defined in

packages/middleware/module/Processor/index.ts:36

___

### RegCommand

Ƭ **RegCommand**<`S`, `T`, `E`, `C`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md) |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`S`, `T`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `handler` | (`params`: [`ProcessParams`](../interfaces/module.ProcessParams.md)<`S`, `T`, `E`, `C`\>) => `void` |
| `reg` | `RegExp` |

#### Defined in

packages/middleware/module/Processor/index.ts:26

___

### Rule

Ƭ **Rule**<`C`\>: (`input`: [`ProxyNotice`](../interfaces/module.ProxyNotice.md), `output`: `C`, `validateFun?`: (`key`: `string`) => `boolean`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BasicCompiler`](module.md#basiccompiler) |

#### Type declaration

▸ (`input`, `output`, `validateFun?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`ProxyNotice`](../interfaces/module.ProxyNotice.md) |
| `output` | `C` |
| `validateFun?` | (`key`: `string`) => `boolean` |

##### Returns

`void`

#### Defined in

[packages/middleware/module/rule/index.ts:5](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/rule/index.ts#L5)

[packages/middleware/module/rule/index.ts:11](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/rule/index.ts#L11)

## Variables

### CONFIGFACTORY

• `Const` **CONFIGFACTORY**: `Record`<`string`, () => [`SymbolConfig`](../interfaces/module.SymbolConfig.md)\> = `{}`

#### Defined in

[packages/middleware/module/space/index.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L6)

___

### CONFIGMODULE

• `Const` **CONFIGMODULE**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[packages/middleware/module/space/index.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L14)

___

### CONFIGTYPE

• `Const` **CONFIGTYPE**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[packages/middleware/module/space/index.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L10)

___

### MODULETYPE

• `Const` **MODULETYPE**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[packages/middleware/module/space/index.ts:8](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L8)

___

### OBJECTMODULE

• `Const` **OBJECTMODULE**: `Record`<`string`, `boolean`\> = `{}`

#### Defined in

[packages/middleware/module/space/index.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L12)

___

### ProcessorMembers

• `Const` **ProcessorMembers**: `Record`<`string`, [`Processor`](../classes/module.Processor.md)<`any`, `any`, `any`, `any`\>\> = `{}`

#### Defined in

[packages/middleware/module/space/index.ts:16](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L16)

## Functions

### CompilerFactory

▸ **CompilerFactory**<`C`, `O`\>(`type`, `compiler`, `processors`): [`CompilerSimplifier`](../interfaces/module.CompilerSimplifier.md)<`C`, `O`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `compiler` | `Object` |
| `processors` | [`Processor`](../classes/module.Processor.md)<`any`, `any`, `any`, `any`\>[] |

#### Returns

[`CompilerSimplifier`](../interfaces/module.CompilerSimplifier.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:266](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L266)

___

### DataSupportFactory

▸ **DataSupportFactory**<`C`, `O`, `P`\>(`type`, `rule`): [`DataSupportSimplifier`](../interfaces/module.DataSupportSimplifier.md)<`C`, `O`, `P`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |
| `P` | extends [`Compiler`](../classes/module.Compiler.md)<`C`, `O`, `P`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `rule` | [`Rule`](module.md#rule-1)<`P`\> |

#### Returns

[`DataSupportSimplifier`](../interfaces/module.DataSupportSimplifier.md)<`C`, `O`, `P`\>

#### Defined in

[packages/middleware/module/dataSupport/index.ts:208](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L208)

___

### Rule

▸ **Rule**(`input`, `output`, `validateFun?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | [`ProxyNotice`](../interfaces/module.ProxyNotice.md) |
| `output` | [`BasicCompiler`](module.md#basiccompiler) |
| `validateFun?` | (`key`: `string`) => `boolean` |

#### Returns

`void`

#### Defined in

[packages/middleware/module/rule/index.ts:5](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/rule/index.ts#L5)

___

### defineProcessor

▸ **defineProcessor**<`S`, `T`, `E`, `C`\>(`options`): [`Processor`](../classes/module.Processor.md)<`S`, `T`, `E`, `C`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `T` | extends `object` |
| `E` | extends [`EngineSupport`](../classes/engine.EngineSupport.md)<`E`\> |
| `C` | extends [`Compiler`](../classes/module.Compiler.md)<`any`, `any`, `C`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ProcessorOptions`](../interfaces/module.ProcessorOptions.md)<`S`, `T`, `E`, `C`\> |

#### Returns

[`Processor`](../classes/module.Processor.md)<`S`, `T`, `E`, `C`\>

#### Defined in

packages/middleware/module/Processor/index.ts:79

___

### emptyHandler

▸ **emptyHandler**(): `void`

#### Returns

`void`

#### Defined in

[packages/middleware/module/common/index.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/common/index.ts#L30)

___

### getModule

▸ **getModule**(`type`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

``null`` \| `string`

#### Defined in

[packages/middleware/module/space/index.ts:21](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L21)

___

### getObserver

▸ **getObserver**<`T`\>(`object`): `Observer`<`T`\>

获取数据的观察者实例

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

`Observer`<`T`\>

#### Defined in

[packages/middleware/module/observer/index.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/observer/index.ts#L26)

___

### getSymbolConfig

▸ **getSymbolConfig**(): [`SymbolConfig`](../interfaces/module.SymbolConfig.md)

#### Returns

[`SymbolConfig`](../interfaces/module.SymbolConfig.md)

#### Defined in

[packages/middleware/module/common/index.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/common/index.ts#L18)

___

### installProcessor

▸ **installProcessor**(`processor`, `module`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | [`Processor`](../classes/module.Processor.md)<`any`, `any`, `any`, `any`\> |
| `module` | `string` |

#### Returns

`void`

#### Defined in

[packages/middleware/module/space/index.ts:38](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L38)

___

### isObjectModule

▸ **isObjectModule**(`module`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `module` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/middleware/module/space/index.ts:25](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L25)

___

### isObjectType

▸ **isObjectType**(`type`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/middleware/module/space/index.ts:29](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/space/index.ts#L29)

___

### observable

▸ **observable**<`T`\>(`object`, `ignore?`): `T`

Proxy the incoming data and create observers for the data

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `ignore?` | `Ignore` |

#### Returns

`T`

#### Defined in

[packages/middleware/module/observer/index.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/observer/index.ts#L12)

___

### uniqueSymbol

▸ **uniqueSymbol**(`type`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`string`

#### Defined in

[packages/middleware/module/common/index.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/common/index.ts#L26)
