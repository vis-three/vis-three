# Class: DataContainer<C\>

[module](../modules/module.md).DataContainer

## Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

## Hierarchy

- `Subject`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

  ↳ **`DataContainer`**

## Constructors

### constructor

• **new DataContainer**<`C`\>()

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Overrides

Subject&lt;ProxyNotice\&gt;.constructor

#### Defined in

[packages/middleware/module/dataContainer/index.ts:95](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L95)

## Properties

### closed

• **closed**: `boolean`

#### Inherited from

Subject.closed

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:12

___

### container

• **container**: [`CompilerTarget`](../modules/module.md#compilertarget)<`C`\>

#### Defined in

[packages/middleware/module/dataContainer/index.ts:91](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L91)

___

### hasError

• **hasError**: `boolean`

**`Deprecated`**

Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.hasError

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:19

___

### isStopped

• **isStopped**: `boolean`

**`Deprecated`**

Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.isStopped

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:17

___

### observers

• **observers**: `Observer`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>[]

**`Deprecated`**

Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.observers

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:15

___

### operator

• **operator**: `undefined` \| `Operator`<`any`, [`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

**`Deprecated`**

Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.operator

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:19

___

### source

• **source**: `undefined` \| `Observable`<`any`\>

**`Deprecated`**

Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.source

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:15

___

### subscriptions

• **subscriptions**: `Map`<`string`, `Subscription`\>

#### Defined in

[packages/middleware/module/dataContainer/index.ts:93](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L93)

___

### thrownError

• **thrownError**: `any`

**`Deprecated`**

Internal implementation detail, do not use directly. Will be made internal in v8.

#### Inherited from

Subject.thrownError

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:21

___

### create

▪ `Static` **create**: (...`args`: `any`[]) => `any`

#### Type declaration

▸ (`...args`): `any`

Creates a "subject" by basically gluing an observer to an observable.

**`Nocollapse`**

**`Deprecated`**

Recommended you do not use. Will be removed at some point in the future. Plans for replacement still under discussion.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Inherited from

Subject.create

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:28

## Accessors

### observed

• `get` **observed**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Subject.observed

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:36

## Methods

### add

▸ **add**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `C` |

#### Returns

`void`

#### Defined in

[packages/middleware/module/dataContainer/index.ts:130](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L130)

___

### asObservable

▸ **asObservable**(): `Observable`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

Creates a new Observable with this Subject as the source. You can do this
to create custom Observer-side logic of the Subject and conceal it from
code that uses the Observable.

#### Returns

`Observable`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

Observable that the Subject casts to

#### Inherited from

Subject.asObservable

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:43

___

### complete

▸ **complete**(): `void`

#### Returns

`void`

#### Inherited from

Subject.complete

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:34

___

### error

▸ **error**(`err`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `any` |

#### Returns

`void`

#### Inherited from

Subject.error

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:33

___

### forEach

▸ **forEach**(`next`): `Promise`<`void`\>

Used as a NON-CANCELLABLE means of subscribing to an observable, for use with
APIs that expect promises, like `async/await`. You cannot unsubscribe from this.

**WARNING**: Only use this with observables you *know* will complete. If the source
observable does not complete, you will end up with a promise that is hung up, and
potentially all of the state of an async function hanging out in memory. To avoid
this situation, look into adding something like timeout, take,
takeWhile, or takeUntil amongst others.

#### Example

```ts
import { interval, take } from 'rxjs';

const source$ = interval(1000).pipe(take(4));

async function getTotal() {
  let total = 0;

  await source$.forEach(value => {
    total += value;
    console.log('observable -> ' + value);
  });

  return total;
}

getTotal().then(
  total => console.log('Total: ' + total)
);

// Expected:
// 'observable -> 0'
// 'observable -> 1'
// 'observable -> 2'
// 'observable -> 3'
// 'Total: 6'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: [`ProxyNotice`](../interfaces/module.ProxyNotice.md)) => `void` | a handler for each value emitted by the observable |

#### Returns

`Promise`<`void`\>

a promise that either resolves on observable completion or
 rejects with the handled error

#### Inherited from

Subject.forEach

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:97

▸ **forEach**(`next`, `promiseCtor`): `Promise`<`void`\>

**`Deprecated`**

Passing a Promise constructor will no longer be available
in upcoming versions of RxJS. This is because it adds weight to the library, for very
little benefit. If you need this functionality, it is recommended that you either
polyfill Promise, or you create an adapter to convert the returned native promise
to whatever promise implementation you wanted. Will be removed in v8.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: [`ProxyNotice`](../interfaces/module.ProxyNotice.md)) => `void` | a handler for each value emitted by the observable |
| `promiseCtor` | `PromiseConstructorLike` | a constructor function used to instantiate the Promise |

#### Returns

`Promise`<`void`\>

a promise that either resolves on observable completion or
 rejects with the handled error

#### Inherited from

Subject.forEach

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:109

___

### lift

▸ **lift**<`R`\>(`operator`): `Observable`<`R`\>

**`Deprecated`**

Internal implementation detail, do not use directly. Will be made internal in v8.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `operator` | `Operator`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `R`\> |

#### Returns

`Observable`<`R`\>

#### Inherited from

Subject.lift

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:31

___

### next

▸ **next**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ProxyNotice`](../interfaces/module.ProxyNotice.md) |

#### Returns

`void`

#### Inherited from

Subject.next

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:32

___

### pipe

▸ **pipe**(): `Observable`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

#### Returns

`Observable`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:110

▸ **pipe**<`A`\>(`op1`): `Observable`<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |

#### Returns

`Observable`<`A`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:111

▸ **pipe**<`A`, `B`\>(`op1`, `op2`): `Observable`<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |

#### Returns

`Observable`<`B`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:112

▸ **pipe**<`A`, `B`, `C`\>(`op1`, `op2`, `op3`): `Observable`<`C`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |

#### Returns

`Observable`<`C`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:113

▸ **pipe**<`A`, `B`, `C`, `D`\>(`op1`, `op2`, `op3`, `op4`): `Observable`<`D`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |

#### Returns

`Observable`<`D`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:114

▸ **pipe**<`A`, `B`, `C`, `D`, `E`\>(`op1`, `op2`, `op3`, `op4`, `op5`): `Observable`<`E`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |

#### Returns

`Observable`<`E`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:115

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`): `Observable`<`F`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |

#### Returns

`Observable`<`F`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:116

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`): `Observable`<`G`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |

#### Returns

`Observable`<`G`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:117

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`): `Observable`<`H`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |

#### Returns

`Observable`<`H`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:118

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`): `Observable`<`I`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |
| `op9` | `OperatorFunction`<`H`, `I`\> |

#### Returns

`Observable`<`I`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:119

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`op1`, `op2`, `op3`, `op4`, `op5`, `op6`, `op7`, `op8`, `op9`, `...operations`): `Observable`<`unknown`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `op1` | `OperatorFunction`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md), `A`\> |
| `op2` | `OperatorFunction`<`A`, `B`\> |
| `op3` | `OperatorFunction`<`B`, `C`\> |
| `op4` | `OperatorFunction`<`C`, `D`\> |
| `op5` | `OperatorFunction`<`D`, `E`\> |
| `op6` | `OperatorFunction`<`E`, `F`\> |
| `op7` | `OperatorFunction`<`F`, `G`\> |
| `op8` | `OperatorFunction`<`G`, `H`\> |
| `op9` | `OperatorFunction`<`H`, `I`\> |
| `...operations` | `OperatorFunction`<`any`, `any`\>[] |

#### Returns

`Observable`<`unknown`\>

#### Inherited from

Subject.pipe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:120

___

### remove

▸ **remove**(`vid`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

#### Returns

`void`

#### Defined in

[packages/middleware/module/dataContainer/index.ts:151](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/module/dataContainer/index.ts#L151)

___

### subscribe

▸ **subscribe**(`observerOrNext?`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `observerOrNext?` | `Partial`<`Observer`<[`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>\> \| (`value`: [`ProxyNotice`](../interfaces/module.ProxyNotice.md)) => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:50

▸ **subscribe**(`next?`, `error?`, `complete?`): `Subscription`

**`Deprecated`**

Instead of passing separate callback arguments, use an observer argument. Signatures taking separate callback arguments will be removed in v8. Details: https://rxjs.dev/deprecations/subscribe-arguments

#### Parameters

| Name | Type |
| :------ | :------ |
| `next?` | ``null`` \| (`value`: [`ProxyNotice`](../interfaces/module.ProxyNotice.md)) => `void` |
| `error?` | ``null`` \| (`error`: `any`) => `void` |
| `complete?` | ``null`` \| () => `void` |

#### Returns

`Subscription`

#### Inherited from

Subject.subscribe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:52

___

### toPromise

▸ **toPromise**(): `Promise`<`undefined` \| [`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

**`Deprecated`**

Replaced with firstValueFrom and lastValueFrom. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Returns

`Promise`<`undefined` \| [`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:122

▸ **toPromise**(`PromiseCtor`): `Promise`<`undefined` \| [`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

**`Deprecated`**

Replaced with firstValueFrom and lastValueFrom. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | `PromiseConstructor` |

#### Returns

`Promise`<`undefined` \| [`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:124

▸ **toPromise**(`PromiseCtor`): `Promise`<`undefined` \| [`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

**`Deprecated`**

Replaced with firstValueFrom and lastValueFrom. Will be removed in v8. Details: https://rxjs.dev/deprecations/to-promise

#### Parameters

| Name | Type |
| :------ | :------ |
| `PromiseCtor` | `PromiseConstructorLike` |

#### Returns

`Promise`<`undefined` \| [`ProxyNotice`](../interfaces/module.ProxyNotice.md)\>

#### Inherited from

Subject.toPromise

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Observable.d.ts:126

___

### unsubscribe

▸ **unsubscribe**(): `void`

#### Returns

`void`

#### Inherited from

Subject.unsubscribe

#### Defined in

node_modules/.pnpm/rxjs@7.6.0/node_modules/rxjs/dist/types/internal/Subject.d.ts:35
