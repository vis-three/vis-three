# Class: MaterialCompiler

[MaterialCompiler](../modules/MaterialCompiler.md).MaterialCompiler

## Hierarchy

- `Compiler`<[`MaterialAllType`](../modules/MaterialConfig.md#materialalltype), `Material`\>

  ↳ **`MaterialCompiler`**

## Constructors

### constructor

• **new MaterialCompiler**()

#### Overrides

Compiler&lt;MaterialAllType, Material\&gt;.constructor

#### Defined in

[library/module/material/MaterialCompiler.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialCompiler.ts#L6)

## Properties

### MODULE

• **MODULE**: `string` = `""`

#### Inherited from

Compiler.MODULE

#### Defined in

[middleware/module/compiler/index.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L24)

___

### engine

• **engine**: `EngineSupport`

#### Inherited from

Compiler.engine

#### Defined in

[middleware/module/compiler/index.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L33)

___

### map

• **map**: `Map`<`string`, `Material`\>

#### Inherited from

Compiler.map

#### Defined in

[middleware/module/compiler/index.ts:31](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L31)

___

### processors

• **processors**: `Map`<`string`, `Processor`<`SymbolConfig`, `object`, `EngineSupport`, `any`\>\>

#### Inherited from

Compiler.processors

#### Defined in

[middleware/module/compiler/index.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L26)

___

### target

• **target**: `CompilerTarget`<[`MaterialAllType`](../modules/MaterialConfig.md#materialalltype)\>

#### Inherited from

Compiler.target

#### Defined in

[middleware/module/compiler/index.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L30)

___

### weakMap

• **weakMap**: `WeakMap`<`Material`, `string`\>

#### Inherited from

Compiler.weakMap

#### Defined in

[middleware/module/compiler/index.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L32)

## Methods

### add

▸ **add**(`config`): ``null`` \| `Material`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`MaterialAllType`](../modules/MaterialConfig.md#materialalltype) |

#### Returns

``null`` \| `Material`

#### Inherited from

Compiler.add

#### Defined in

[middleware/module/compiler/index.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L56)

___

### compile

▸ **compile**(`vid`, `notice`): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |
| `notice` | `CompileNotice` |

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.compile

#### Defined in

[middleware/module/compiler/index.ts:137](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L137)

___

### compileAll

▸ **compileAll**(): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.compileAll

#### Defined in

[middleware/module/compiler/index.ts:199](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L199)

___

### cover

▸ **cover**(`config`): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`MaterialAllType`](../modules/MaterialConfig.md#materialalltype) |

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.cover

#### Defined in

[middleware/module/compiler/index.ts:115](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L115)

___

### dispose

▸ **dispose**(): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.dispose

#### Defined in

[middleware/module/compiler/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L207)

___

### getMap

▸ **getMap**(): `Map`<`string`, `Material`\>

#### Returns

`Map`<`string`, `Material`\>

#### Inherited from

Compiler.getMap

#### Defined in

[middleware/module/compiler/index.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L42)

___

### getObjectBySymbol

▸ **getObjectBySymbol**(`vid`): ``null`` \| `Material`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

``null`` \| `Material`

#### Inherited from

Compiler.getObjectBySymbol

#### Defined in

[middleware/module/compiler/index.ts:257](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L257)

___

### getObjectSymbol

▸ **getObjectSymbol**(`object`): ``null`` \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Material` |

#### Returns

``null`` \| `string`

#### Inherited from

Compiler.getObjectSymbol

#### Defined in

[middleware/module/compiler/index.ts:254](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L254)

___

### reigstProcessor

▸ **reigstProcessor**(`processor`, `fun`): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | `Processor`<`any`, `any`, `any`, `any`\> |
| `fun` | (`compiler`: `Compiler`<[`MaterialAllType`](../modules/MaterialConfig.md#materialalltype), `Material`\>) => `void` |

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.reigstProcessor

#### Defined in

[middleware/module/compiler/index.ts:237](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L237)

___

### remove

▸ **remove**(`config`): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`MaterialAllType`](../modules/MaterialConfig.md#materialalltype) |

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.remove

#### Defined in

[middleware/module/compiler/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L82)

___

### setTarget

▸ **setTarget**(`target`): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `CompilerTarget`<[`MaterialAllType`](../modules/MaterialConfig.md#materialalltype)\> |

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.setTarget

#### Defined in

[middleware/module/compiler/index.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L51)

___

### useEngine

▸ **useEngine**(`engine`): [`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `EngineSupport` |

#### Returns

[`MaterialCompiler`](MaterialCompiler.MaterialCompiler.md)

#### Inherited from

Compiler.useEngine

#### Defined in

[middleware/module/compiler/index.ts:46](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/compiler/index.ts#L46)
