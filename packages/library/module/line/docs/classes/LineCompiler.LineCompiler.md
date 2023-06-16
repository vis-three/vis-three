# Class: LineCompiler

[LineCompiler](../modules/LineCompiler.md).LineCompiler

## Hierarchy

- `SolidObjectCompiler`<[`LineConfig`](../interfaces/LineConfig.LineConfig.md), `Line`\>

  ↳ **`LineCompiler`**

## Constructors

### constructor

• **new LineCompiler**()

#### Overrides

SolidObjectCompiler&lt;LineConfig, Line\&gt;.constructor

#### Defined in

[library/module/line/LineCompiler.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/library/module/line/LineCompiler.ts#L6)

## Properties

### MODULE

• **MODULE**: `string` = `""`

#### Inherited from

SolidObjectCompiler.MODULE

#### Defined in

[middleware/module/compiler/index.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L24)

___

### engine

• **engine**: `EngineSupport`

#### Inherited from

SolidObjectCompiler.engine

#### Defined in

[middleware/module/compiler/index.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L33)

___

### map

• **map**: `Map`<`string`, `Line`<`BufferGeometry`, `Material` \| `Material`[]\>\>

#### Inherited from

SolidObjectCompiler.map

#### Defined in

[middleware/module/compiler/index.ts:31](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L31)

___

### processors

• **processors**: `Map`<`string`, `Processor`<`SymbolConfig`, `object`, `EngineSupport`, `any`\>\>

#### Inherited from

SolidObjectCompiler.processors

#### Defined in

[middleware/module/compiler/index.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L26)

___

### target

• **target**: `CompilerTarget`<[`LineConfig`](../interfaces/LineConfig.LineConfig.md)\>

#### Inherited from

SolidObjectCompiler.target

#### Defined in

[middleware/module/compiler/index.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L30)

___

### weakMap

• **weakMap**: `WeakMap`<`Line`<`BufferGeometry`, `Material` \| `Material`[]\>, `string`\>

#### Inherited from

SolidObjectCompiler.weakMap

#### Defined in

[middleware/module/compiler/index.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L32)

## Methods

### add

▸ **add**(`config`): ``null`` \| `Line`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`LineConfig`](../interfaces/LineConfig.LineConfig.md) |

#### Returns

``null`` \| `Line`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Inherited from

SolidObjectCompiler.add

#### Defined in

[middleware/module/compiler/index.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L56)

___

### compile

▸ **compile**(`vid`, `notice`): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |
| `notice` | `CompileNotice` |

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.compile

#### Defined in

[middleware/module/compiler/index.ts:137](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L137)

___

### compileAll

▸ **compileAll**(): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.compileAll

#### Defined in

[middleware/module/compiler/index.ts:199](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L199)

___

### cover

▸ **cover**(`config`): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`LineConfig`](../interfaces/LineConfig.LineConfig.md) |

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.cover

#### Defined in

[middleware/module/compiler/index.ts:115](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L115)

___

### dispose

▸ **dispose**(): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.dispose

#### Defined in

[middleware/module/compiler/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L207)

___

### getMap

▸ **getMap**(): `Map`<`string`, `Line`<`BufferGeometry`, `Material` \| `Material`[]\>\>

#### Returns

`Map`<`string`, `Line`<`BufferGeometry`, `Material` \| `Material`[]\>\>

#### Inherited from

SolidObjectCompiler.getMap

#### Defined in

[middleware/module/compiler/index.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L42)

___

### getObjectBySymbol

▸ **getObjectBySymbol**(`vid`): ``null`` \| `Line`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

``null`` \| `Line`<`BufferGeometry`, `Material` \| `Material`[]\>

#### Inherited from

SolidObjectCompiler.getObjectBySymbol

#### Defined in

[middleware/module/compiler/index.ts:257](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L257)

___

### getObjectSymbol

▸ **getObjectSymbol**(`object`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Line`<`BufferGeometry`, `Material` \| `Material`[]\> |

#### Returns

``null`` \| `string`

#### Inherited from

SolidObjectCompiler.getObjectSymbol

#### Defined in

[middleware/module/compiler/index.ts:254](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L254)

___

### reigstProcessor

▸ **reigstProcessor**(`processor`, `fun`): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | `Processor`<`any`, `any`, `any`, `any`\> |
| `fun` | (`compiler`: `Compiler`<[`LineConfig`](../interfaces/LineConfig.LineConfig.md), `Line`<`BufferGeometry`, `Material` \| `Material`[]\>\>) => `void` |

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.reigstProcessor

#### Defined in

[middleware/module/compiler/index.ts:237](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L237)

___

### remove

▸ **remove**(`config`): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`LineConfig`](../interfaces/LineConfig.LineConfig.md) |

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.remove

#### Defined in

[middleware/module/compiler/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L82)

___

### setTarget

▸ **setTarget**(`target`): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `CompilerTarget`<[`LineConfig`](../interfaces/LineConfig.LineConfig.md)\> |

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.setTarget

#### Defined in

[middleware/module/compiler/index.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L51)

___

### useEngine

▸ **useEngine**(`engine`): [`LineCompiler`](LineCompiler.LineCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `EngineSupport` |

#### Returns

[`LineCompiler`](LineCompiler.LineCompiler.md)

#### Inherited from

SolidObjectCompiler.useEngine

#### Defined in

[middleware/module/compiler/index.ts:46](https://github.com/Shiotsukikaedesari/vis-three/blob/16950a2b/packages/middleware/module/compiler/index.ts#L46)
