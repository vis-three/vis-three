# Class: Compiler<C, O\>

[module](../modules/module.md).Compiler

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |

## Constructors

### constructor

• **new Compiler**<`C`, `O`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |

## Properties

### MODULE

• **MODULE**: `string` = `""`

#### Defined in

[packages/middleware/module/compiler/index.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L24)

___

### cacheCompile

• `Private` `Optional` **cacheCompile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `config` | `C` |
| `processor` | [`Processor`](module.Processor.md)<[`SymbolConfig`](../interfaces/module.SymbolConfig.md), `object`, [`EngineSupport`](engine.EngineSupport.md), `any`\> |
| `target` | `O` |
| `vid` | `string` |

#### Defined in

[packages/middleware/module/compiler/index.ts:35](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L35)

___

### engine

• **engine**: [`EngineSupport`](engine.EngineSupport.md)

#### Defined in

[packages/middleware/module/compiler/index.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L33)

___

### map

• **map**: `Map`<`string`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:31](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L31)

___

### processors

• **processors**: `Map`<`string`, [`Processor`](module.Processor.md)<[`SymbolConfig`](../interfaces/module.SymbolConfig.md), `object`, [`EngineSupport`](engine.EngineSupport.md), `any`\>\>

#### Defined in

[packages/middleware/module/compiler/index.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L26)

___

### target

• **target**: [`CompilerTarget`](../modules/module.md#compilertarget)<`C`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L30)

___

### weakMap

• **weakMap**: `WeakMap`<`O`, `string`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L32)

## Methods

### add

▸ **add**(`config`): ``null`` \| `O`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

``null`` \| `O`

#### Defined in

[packages/middleware/module/compiler/index.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L56)

___

### compile

▸ **compile**(`vid`, `notice`): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |
| `notice` | [`CompileNotice`](../modules/module.md#compilenotice) |

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:137](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L137)

___

### compileAll

▸ **compileAll**(): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:199](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L199)

___

### cover

▸ **cover**(`config`): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:115](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L115)

___

### dispose

▸ **dispose**(): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L207)

___

### getMap

▸ **getMap**(): `Map`<`string`, `O`\>

#### Returns

`Map`<`string`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L42)

___

### getObjectBySymbol

▸ **getObjectBySymbol**(`vid`): ``null`` \| `O`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

``null`` \| `O`

#### Defined in

[packages/middleware/module/compiler/index.ts:257](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L257)

___

### getObjectSymbol

▸ **getObjectSymbol**(`object`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `O` |

#### Returns

``null`` \| `string`

#### Defined in

[packages/middleware/module/compiler/index.ts:254](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L254)

___

### reigstProcessor

▸ **reigstProcessor**(`processor`, `fun`): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | [`Processor`](module.Processor.md)<`any`, `any`, `any`, `any`\> |
| `fun` | (`compiler`: [`Compiler`](module.Compiler.md)<`C`, `O`\>) => `void` |

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:237](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L237)

___

### remove

▸ **remove**(`config`): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L82)

___

### setTarget

▸ **setTarget**(`target`): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | [`CompilerTarget`](../modules/module.md#compilertarget)<`C`\> |

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L51)

___

### useEngine

▸ **useEngine**(`engine`): [`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | [`EngineSupport`](engine.EngineSupport.md) |

#### Returns

[`Compiler`](module.Compiler.md)<`C`, `O`\>

#### Defined in

[packages/middleware/module/compiler/index.ts:46](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/compiler/index.ts#L46)
