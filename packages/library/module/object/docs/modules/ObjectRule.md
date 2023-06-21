# Module: ObjectRule

## Type Aliases

### ObjectRule

Ƭ **ObjectRule**<`E`, `C`, `O`\>: `Rule`<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\> |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D` |

#### Defined in

[library/module/object/ObjectRule.ts:7](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectRule.ts#L7)

[library/module/object/ObjectRule.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectRule.ts#L20)

## Functions

### ObjectRule

▸ **ObjectRule**<`E`, `C`, `O`\>(`input`, `compiler`, `validateFun?`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`, `E`\> |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `ProxyNotice` | `undefined` | 代理通知输入 |
| `compiler` | `E` | `undefined` | 编译器 |
| `validateFun` | `any` | `validate` | 验证规则 |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectRule.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectRule.ts#L20)
