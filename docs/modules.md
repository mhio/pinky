[@mhio/pinky](README.md) / Exports

# @mhio/pinky

## Table of contents

### Classes

- [AggregateError](classes/AggregateError.md)
- [DetailsError](classes/DetailsError.md)

### Type aliases

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
- [noop](modules.md#noop)
- [outerSettle](modules.md#outersettle)
- [waitFor](modules.md#waitfor)
- [workerAll](modules.md#workerall)

## Type aliases

### MapperFunction

Ƭ **MapperFunction**: (`element`: `any`, `index?`: `any`) => `any`

#### Type declaration

▸ (`element`, `index?`): `any`

map an async function across an iterable with up to N promises

##### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `any` |
| `index?` | `any` |

##### Returns

`any`

- Array of all resolved values

#### Defined in

[src/pinky.ts:109](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L109)

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

[src/pinky.ts:217](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L217)

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

[src/pinky.ts:8](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L8)

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

[src/pinky.ts:41](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L41)

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

[src/pinky.ts:52](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L52)

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

{ description_of_the_return_value }

#### Defined in

[src/pinky.ts:199](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L199)

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

{ description_of_the_return_value }

#### Defined in

[src/pinky.ts:167](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L167)

___

### map

▸ **map**(`iterator`, `asyncFn`): `Promise`<`any`[]\>

map an async function across an iterable

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterator` | `Iterable`<`any`\> |
| `asyncFn` | `Function` |

#### Returns

`Promise`<`any`[]\>

Array of resolved promises

#### Defined in

[src/pinky.ts:63](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L63)

___

### mapConcurrent

▸ **mapConcurrent**(`iterator_in`, `asyncFn`, `worker_count`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterator_in` | `Iterable`<`any`\> |
| `asyncFn` | [`MapperFunction`](modules.md#mapperfunction) |
| `worker_count` | `number` |

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/pinky.ts:111](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L111)

___

### mapSeries

▸ **mapSeries**(`iterable`, `asyncFn`): `Promise`<`any`[]\>

map an async function in series across an iterable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterable` | `Iterable`<`any`\> | - |
| `asyncFn` | `Function` | The asynchronous function |

#### Returns

`Promise`<`any`[]\>

- Array of all resolved values

#### Defined in

[src/pinky.ts:93](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L93)

___

### noop

▸ **noop**(...`args`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

#### Returns

`any`

#### Defined in

[src/pinky.ts:1](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L1)

___

### outerSettle

▸ **outerSettle**(): (`undefined` \| `Promise`<`unknown`\>)[]

Create a promise and return the promise, resolve and reject
Allows you to choose whether to resolve/reject something outside the promise scope

#### Returns

(`undefined` \| `Promise`<`unknown`\>)[]

- [ promise, resolve, reject ]

#### Defined in

[src/pinky.ts:237](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L237)

___

### waitFor

▸ **waitFor**(`timeout_ms`, `condition_fn`, `options?`): `Promise`<{ `count`: `number` ; `result`: `any` = condition\_res; `total_ms`: `number`  }\>

Wait until a timestamp for some condition function to become truthey. Can be an async or standard function

**`throws`** {Error}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `timeout_ms` | `number` | The `Date` timestamp to wait until |
| `condition_fn` | `Function` | The test function to call repeatedly |
| `options` | `Object` | Options |
| `options.label` | `undefined` \| `string` | Label to attach to thrown Error |
| `options.wait_ms` | `undefined` \| `number` | Wait between tests (1000) |

#### Returns

`Promise`<{ `count`: `number` ; `result`: `any` = condition\_res; `total_ms`: `number`  }\>

#### Defined in

[src/pinky.ts:259](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L259)

___

### workerAll

▸ **workerAll**(`number_of_workers`, `iterator_in`, `asyncFn`): `Promise`<`any`[]\>

Use n workers to resolve a function across an iterable. (via `.mapSeries`)
Results array is grouped by worker, then the order a worker iterated in, so doesn't match the initial array order.
if you need to inspect results include some type of id in the return.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `number_of_workers` | `number` | Number of functions to execute |
| `iterator_in` | `Iterable`<`any`\> | The iterator of values to use |
| `asyncFn` | `Function` | The async function |

#### Returns

`Promise`<`any`[]\>

- Unordered array of resolved values

#### Defined in

[src/pinky.ts:145](https://github.com/mhio/pinky/blob/b959e49/src/pinky.ts#L145)
