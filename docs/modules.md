[@mhio/pinky](README.md) / Exports

# @mhio/pinky

## Table of contents

### Classes

- [AggregateError](classes/AggregateError.md)
- [DetailsError](classes/DetailsError.md)

### Type Aliases

- [BoolOrPromiseBoolFunction](modules.md#boolorpromiseboolfunction)
- [MapperFunction](modules.md#mapperfunction)

### Functions

- [allProps](modules.md#allprops)
- [delay](modules.md#delay)
- [delayFrom](modules.md#delayfrom)
- [delayTo](modules.md#delayto)
- [firstInSeriesWithoutError](modules.md#firstinserieswithouterror)
- [firstWithoutError](modules.md#firstwithouterror)
- [map](modules.md#map)
- [mapConcurrent](modules.md#mapconcurrent)
- [mapSeries](modules.md#mapseries)
- [mapSeriesAsync](modules.md#mapseriesasync)
- [noop](modules.md#noop)
- [outerSettle](modules.md#outersettle)
- [waitFor](modules.md#waitfor)
- [workerAll](modules.md#workerall)
- [workerAllAsync](modules.md#workerallasync)

## Type Aliases

### BoolOrPromiseBoolFunction

Ƭ **BoolOrPromiseBoolFunction**: () => `boolean` \| `Promise`<`boolean`\>

#### Type declaration

▸ (): `boolean` \| `Promise`<`boolean`\>

##### Returns

`boolean` \| `Promise`<`boolean`\>

#### Defined in

[src/pinky.ts:3](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L3)

___

### MapperFunction

Ƭ **MapperFunction**: (`element`: `any`, `index?`: `any`) => `any`

#### Type declaration

▸ (`element`, `index?`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `any` |
| `index?` | `any` |

##### Returns

`any`

#### Defined in

[src/pinky.ts:2](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L2)

## Functions

### allProps

▸ **allProps**(`obj`): `Promise`<{ `[key: string]`: `any`;  }\>

Resolve all promises in an object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Object` | The object to resolve properties of |

#### Returns

`Promise`<{ `[key: string]`: `any`;  }\>

obj     - New object of resolved promise properties

#### Defined in

[src/pinky.ts:264](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L264)

___

### delay

▸ **delay**(`ms`): `Promise`<`void`\>

delay for ms

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | The milliseconds to delay for |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/pinky.ts:15](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L15)

___

### delayFrom

▸ **delayFrom**(`ts`, `ms`): `Promise`<`void`\>

Delay from a timestamp for milliseconds

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The millisecond `Date` timestamp to start the delay from |
| `ms` | `number` | The milliseconds to delay for |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/pinky.ts:48](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L48)

___

### delayTo

▸ **delayTo**(`ts`): `Promise`<`void`\>

Delay until a timestamp milliseconds

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ts` | `number` | The millisecond `Date` timestamp to start the delay from |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/pinky.ts:63](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L63)

___

### firstInSeriesWithoutError

▸ **firstInSeriesWithoutError**(`iterable`): `Promise`<`any`\>

Run a bunch of promises in series, if the one fails move onto the next.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `Iterable`<`Promise`<`any`\>\> | The iterable |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/pinky.ts:246](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L246)

___

### firstWithoutError

▸ **firstWithoutError**(`iterable`): `Promise`<`any`\>

Run a bunch of promises, if the first fails return the next until all promises have been checked. 
All promises start resolving immediately.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `Iterable`<`Promise`<`any`\>\> | The iterable |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/pinky.ts:214](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L214)

___

### map

▸ **map**(`iterator`, `asyncFn`): `Promise`<`any`[]\>

map an async function across an iterable

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterator` | `Iterable`<`any`\> |
| `asyncFn` | [`MapperFunction`](modules.md#mapperfunction) |

#### Returns

`Promise`<`any`[]\>

Array of resolved promises

#### Defined in

[src/pinky.ts:74](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L74)

___

### mapConcurrent

▸ **mapConcurrent**(`iterator_in`, `asyncFn`, `worker_count`): `Promise`<`any`[]\>

map an async function across an iterable with up to N promises
All promises will resolve,

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterator_in` | `Iterable`<`any`\> | - |
| `asyncFn` | [`MapperFunction`](modules.md#mapperfunction) | The asynchronous function |
| `worker_count` | `number` | - |

#### Returns

`Promise`<`any`[]\>

- Array of all resolved values

#### Defined in

[src/pinky.ts:127](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L127)

___

### mapSeries

▸ **mapSeries**(`iterable`, `asyncFn`): `Promise`<`any`[]\>

map an async function in series across an iterable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `Iterable`<`any`\> | - |
| `asyncFn` | [`MapperFunction`](modules.md#mapperfunction) | The asynchronous function |

#### Returns

`Promise`<`any`[]\>

- Array of all resolved values

#### Defined in

[src/pinky.ts:91](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L91)

___

### mapSeriesAsync

▸ **mapSeriesAsync**(`iterable`, `asyncFn`): `Promise`<`any`[]\>

map an async function in series across an async iterable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `AsyncIterable`<`any`\> | - |
| `asyncFn` | [`MapperFunction`](modules.md#mapperfunction) | The asynchronous function |

#### Returns

`Promise`<`any`[]\>

- Array of all resolved values

#### Defined in

[src/pinky.ts:108](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L108)

___

### noop

▸ **noop**(): `void`

#### Returns

`void`

#### Defined in

[src/pinky.ts:6](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L6)

___

### outerSettle

▸ **outerSettle**(): `OuterSettleReturn`

Create a promise and return the promise, resolve and reject
Allows you to choose whether to resolve/reject something outside the promise scope

#### Returns

`OuterSettleReturn`

#### Defined in

[src/pinky.ts:292](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L292)

___

### waitFor

▸ **waitFor**(`timeout_ms`, `condition_fn`, `options?`): `Promise`<{ `count`: `number` ; `result`: ``true`` = condition\_res; `total_ms`: `number`  }\>

Wait until a timestamp or some condition function to become truthey. Can be an async or standard function

**`Throws`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout_ms` | `number` | The `Date` timestamp to wait until |
| `condition_fn` | [`BoolOrPromiseBoolFunction`](modules.md#boolorpromiseboolfunction) | The test function to call repeatedly |
| `options` | `Object` | Options |
| `options.label` | `undefined` \| `string` | Label to attach to thrown Error |
| `options.wait_ms` | `undefined` \| `number` | Wait between tests (1000) |

#### Returns

`Promise`<{ `count`: `number` ; `result`: ``true`` = condition\_res; `total_ms`: `number`  }\>

#### Defined in

[src/pinky.ts:313](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L313)

___

### workerAll

▸ **workerAll**(`number_of_workers`, `iterator_in`, `asyncFn`): `Promise`<`any`[]\>

Use n workers to resolve a function across an iterable. (via `.mapSeries`)
Results array is grouped by worker, then the order a worker iterated in, so doesn't match the initial array order.
if you need to inspect results include some type of id in the return.
`mapConcurrent` should replace this

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number_of_workers` | `number` | Number of functions to execute |
| `iterator_in` | `Iterable`<`any`\> | The iterator of values to use |
| `asyncFn` | [`MapperFunction`](modules.md#mapperfunction) | The async function |

#### Returns

`Promise`<`any`[]\>

- Unordered array of resolved values

#### Defined in

[src/pinky.ts:165](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L165)

___

### workerAllAsync

▸ **workerAllAsync**(`number_of_workers`, `async_iterator`, `asyncFn`): `Promise`<`any`[]\>

Use n workers to resolve a function across an async iterable. (via `.mapSeriesAsync`)
Results array is grouped by worker, then the order a worker iterated in, so doesn't match the initial array order.
if you need to inspect results include some type of id in the return.
`mapConcurrent` should replace this

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number_of_workers` | `number` | Number of functions to execute |
| `async_iterator` | `AsyncIterable`<`any`\> | The iterator of values to use |
| `asyncFn` | [`MapperFunction`](modules.md#mapperfunction) | The async function |

#### Returns

`Promise`<`any`[]\>

- Unordered array of resolved values

#### Defined in

[src/pinky.ts:191](https://github.com/mhio/pinky/blob/00f0f16/src/pinky.ts#L191)
