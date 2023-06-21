# Class: ObjectCompiler<C, O\>

[ObjectCompiler](../modules/ObjectCompiler.md).ObjectCompiler

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D` |

## Hierarchy

- `Compiler`<`C`, `O`\>

  ↳ **`ObjectCompiler`**

## Constructors

### constructor

• **new ObjectCompiler**<`C`, `O`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Overrides

Compiler&lt;C, O\&gt;.constructor

#### Defined in

[library/module/object/ObjectCompiler.ts:13](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectCompiler.ts#L13)

## Properties

### MODULE

• **MODULE**: `string` = `""`

#### Inherited from

Compiler.MODULE

#### Defined in

[middleware/module/compiler/index.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L24)

___

### engine

• **engine**: `EngineSupport`

#### Inherited from

Compiler.engine

#### Defined in

[middleware/module/compiler/index.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L33)

___

### map

• **map**: `Map`<`string`, `O`\>

#### Inherited from

Compiler.map

#### Defined in

[middleware/module/compiler/index.ts:31](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L31)

___

### processors

• **processors**: `Map`<`string`, `Processor`<`SymbolConfig`, `object`, `EngineSupport`, `any`\>\>

#### Inherited from

Compiler.processors

#### Defined in

[middleware/module/compiler/index.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L26)

___

### target

• **target**: `CompilerTarget`<`C`\>

#### Inherited from

Compiler.target

#### Defined in

[middleware/module/compiler/index.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L30)

___

### weakMap

• **weakMap**: `WeakMap`<`O`, `string`\>

#### Inherited from

Compiler.weakMap

#### Defined in

[middleware/module/compiler/index.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L32)

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

Compiler.add

#### Defined in

[middleware/module/compiler/index.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L56)

___

### compile

▸ **compile**(`vid`, `notice`): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |
| `notice` | `CompileNotice` |

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.compile

#### Defined in

[middleware/module/compiler/index.ts:137](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L137)

___

### compileAll

▸ **compileAll**(): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.compileAll

#### Defined in

[middleware/module/compiler/index.ts:199](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L199)

___

### cover

▸ **cover**(`config`): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.cover

#### Defined in

[middleware/module/compiler/index.ts:115](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L115)

___

### dispose

▸ **dispose**(): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.dispose

#### Defined in

[middleware/module/compiler/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L207)

___

### getMap

▸ **getMap**(): `Map`<`string`, `O`\>

#### Returns

`Map`<`string`, `O`\>

#### Inherited from

Compiler.getMap

#### Defined in

[middleware/module/compiler/index.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L42)

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

Compiler.getObjectBySymbol

#### Defined in

[middleware/module/compiler/index.ts:257](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L257)

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

Compiler.getObjectSymbol

#### Defined in

[middleware/module/compiler/index.ts:254](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L254)

___

### reigstProcessor

▸ **reigstProcessor**(`processor`, `fun`): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `processor` | `Processor`<`any`, `any`, `any`, `any`\> |
| `fun` | (`compiler`: `Compiler`<`C`, `O`\>) => `void` |

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.reigstProcessor

#### Defined in

[middleware/module/compiler/index.ts:237](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L237)

___

### remove

▸ **remove**(`config`): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.remove

#### Defined in

[middleware/module/compiler/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L82)

___

### setTarget

▸ **setTarget**(`target`): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `CompilerTarget`<`C`\> |

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.setTarget

#### Defined in

[middleware/module/compiler/index.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L51)

___

### useEngine

▸ **useEngine**(`engine`): [`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `EngineSupport` |

#### Returns

[`ObjectCompiler`](ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>

#### Inherited from

Compiler.useEngine

#### Defined in

[middleware/module/compiler/index.ts:46](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/middleware/module/compiler/index.ts#L46)
