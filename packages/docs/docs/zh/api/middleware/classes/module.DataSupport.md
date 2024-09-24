# Class: DataSupport<C, O, P\>

[module](../modules/module.md).DataSupport

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |
| `P` | extends [`Compiler`](module.Compiler.md)<`C`, `O`\> |

## Constructors

### constructor

• **new DataSupport**<`C`, `O`, `P`\>(`rule`, `data?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |
| `O` | extends `object` |
| `P` | extends [`Compiler`](module.Compiler.md)<`C`, `O`, `P`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `rule` | [`Rule`](../modules/module.md#rule-1)<`P`\> | `undefined` |
| `data` | `C`[] | `[]` |

#### Defined in

[packages/middleware/module/dataSupport/index.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L20)

## Properties

### MODULE

• **MODULE**: `string` = `""`

#### Defined in

[packages/middleware/module/dataSupport/index.ts:15](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L15)

___

### dataContainer

• **dataContainer**: [`DataContainer`](module.DataContainer.md)<`C`\>

#### Defined in

[packages/middleware/module/dataSupport/index.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L17)

___

### translater

• **translater**: [`Translater`](module.Translater.md)<`C`, `O`, `P`\>

#### Defined in

[packages/middleware/module/dataSupport/index.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L18)

## Methods

### addCompiler

▸ **addCompiler**(`compiler`): [`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `compiler` | `P` |

#### Returns

[`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

#### Defined in

[packages/middleware/module/dataSupport/index.ts:55](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L55)

___

### addConfig

▸ **addConfig**(`config`): [`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

[`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

#### Defined in

[packages/middleware/module/dataSupport/index.ts:40](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L40)

___

### existSymbol

▸ **existSymbol**(`vid`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

`boolean`

#### Defined in

[packages/middleware/module/dataSupport/index.ts:36](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L36)

___

### exportConfig

▸ **exportConfig**(`compress?`): `C`[]

导出配置单

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `compress` | `boolean` | `true` | 是否压缩配置单 default true |

#### Returns

`C`[]

config

#### Defined in

[packages/middleware/module/dataSupport/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L82)

___

### getConfig

▸ **getConfig**(`vid`): `C`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

`C`

#### Defined in

[packages/middleware/module/dataSupport/index.ts:46](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L46)

___

### getData

▸ **getData**(): [`CompilerTarget`](../modules/module.md#compilertarget)<`C`\>

#### Returns

[`CompilerTarget`](../modules/module.md#compilertarget)<`C`\>

#### Defined in

[packages/middleware/module/dataSupport/index.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L32)

___

### load

▸ **load**(`configs`): [`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

加载配置

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configs` | `C`[] | this module configs |

#### Returns

[`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

true

#### Defined in

[packages/middleware/module/dataSupport/index.ts:157](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L157)

___

### remove

▸ **remove**(`configs`): [`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `configs` | `C`[] |

#### Returns

[`DataSupport`](module.DataSupport.md)<`C`, `O`, `P`\>

#### Defined in

[packages/middleware/module/dataSupport/index.ts:191](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L191)

___

### removeConfig

▸ **removeConfig**(`vid`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

`void`

#### Defined in

[packages/middleware/module/dataSupport/index.ts:50](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L50)

___

### toJSON

▸ **toJSON**(`compress?`): `string`

导出json化配置单

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `compress` | `boolean` | `true` |

#### Returns

`string`

json config

#### Defined in

[packages/middleware/module/dataSupport/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataSupport/index.ts#L66)
