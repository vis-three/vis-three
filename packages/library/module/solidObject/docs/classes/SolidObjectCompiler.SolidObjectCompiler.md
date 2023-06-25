# Class: SolidObjectCompiler<C, O\>

[SolidObjectCompiler](../modules/SolidObjectCompiler.md).SolidObjectCompiler

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `SolidObjectConfig` |
| `O` | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md) |

## Hierarchy

- `ObjectCompiler`<`C`, `O`\>

  ↳ **`SolidObjectCompiler`**

## Constructors

### constructor

• **new SolidObjectCompiler**<`C`, `O`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `SolidObjectConfig` |
| `O` | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Overrides

ObjectCompiler&lt;C, O\&gt;.constructor

#### Defined in

[packages/library/module/solidObject/SolidObjectCompiler.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectCompiler.ts#L18)

## Properties

### MODULE

• **MODULE**: `string` = `""`

#### Inherited from

ObjectCompiler.MODULE

#### Defined in

[packages/middleware/module/compiler/index.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L24)

___

### engine

• **engine**: `EngineSupport`

#### Inherited from

ObjectCompiler.engine

#### Defined in

[packages/middleware/module/compiler/index.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L33)

___

### map

• **map**: `Map`<`string`, `O`\>

#### Inherited from

ObjectCompiler.map

#### Defined in

[packages/middleware/module/compiler/index.ts:31](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L31)

___

### processors

• **processors**: `Map`<`string`, `Processor`<`SymbolConfig`, `object`, `EngineSupport`, `any`\>\>

#### Inherited from

ObjectCompiler.processors

#### Defined in

[packages/middleware/module/compiler/index.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L26)

___

### target

• **target**: `CompilerTarget`<`C`\>

#### Inherited from

ObjectCompiler.target

#### Defined in

[packages/middleware/module/compiler/index.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L30)

___

### weakMap

• **weakMap**: `WeakMap`<`O`, `string`\>

#### Inherited from

ObjectCompiler.weakMap

#### Defined in

[packages/middleware/module/compiler/index.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L32)

## Methods

### add

▸ **add**(`config`): ``null`` \| `O`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

``null`` \| `O`

#### Inherited from

ObjectCompiler.add

#### Defined in

[packages/middleware/module/compiler/index.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L56)

___

### compile

▸ **compile**(`vid`, `notice`): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |
| `notice` | `CompileNotice` |

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.compile

#### Defined in

[packages/middleware/module/compiler/index.ts:137](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L137)

___

### compileAll

▸ **compileAll**(): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.compileAll

#### Defined in

[packages/middleware/module/compiler/index.ts:199](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L199)

___

### cover

▸ **cover**(`config`): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.cover

#### Defined in

[packages/middleware/module/compiler/index.ts:115](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L115)

___

### dispose

▸ **dispose**(): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.dispose

#### Defined in

[packages/middleware/module/compiler/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L207)

___

### getMap

▸ **getMap**(): `Map`<`string`, `O`\>

#### Returns

`Map`<`string`, `O`\>

#### Inherited from

ObjectCompiler.getMap

#### Defined in

[packages/middleware/module/compiler/index.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L42)

___

### getObjectBySymbol

▸ **getObjectBySymbol**(`vid`): ``null`` \| `O`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

``null`` \| `O`

#### Inherited from

ObjectCompiler.getObjectBySymbol

#### Defined in

[packages/middleware/module/compiler/index.ts:257](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L257)

___

### getObjectSymbol

▸ **getObjectSymbol**(`object`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `O` |

#### Returns

``null`` \| `string`

#### Inherited from

ObjectCompiler.getObjectSymbol

#### Defined in

[packages/middleware/module/compiler/index.ts:254](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L254)

___

### reigstProcessor

▸ **reigstProcessor**(`processor`, `fun`): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | `Processor`<`any`, `any`, `any`, `any`\> |
| `fun` | (`compiler`: `Compiler`<`C`, `O`\>) => `void` |

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.reigstProcessor

#### Defined in

[packages/middleware/module/compiler/index.ts:237](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L237)

___

### remove

▸ **remove**(`config`): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.remove

#### Defined in

[packages/middleware/module/compiler/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L82)

___

### setTarget

▸ **setTarget**(`target`): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `CompilerTarget`<`C`\> |

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.setTarget

#### Defined in

[packages/middleware/module/compiler/index.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L51)

___

### useEngine

▸ **useEngine**(`engine`): [`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `EngineSupport` |

#### Returns

[`SolidObjectCompiler`](SolidObjectCompiler.SolidObjectCompiler.md)<`C`, `O`\>

#### Inherited from

ObjectCompiler.useEngine

#### Defined in

[packages/middleware/module/compiler/index.ts:46](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/middleware/module/compiler/index.ts#L46)
