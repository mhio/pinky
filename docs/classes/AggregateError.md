[@mhio/pinky](../README.md) / [Exports](../modules.md) / AggregateError

# Class: AggregateError

## Hierarchy

- `Error`

  ↳ **`AggregateError`**

## Table of contents

### Constructors

- [constructor](AggregateError.md#constructor)

### Properties

- [prepareStackTrace](AggregateError.md#preparestacktrace)
- [stackTraceLimit](AggregateError.md#stacktracelimit)
- [errors](AggregateError.md#errors)
- [message](AggregateError.md#message)
- [name](AggregateError.md#name)
- [stack](AggregateError.md#stack)

### Methods

- [captureStackTrace](AggregateError.md#capturestacktrace)

## Constructors

### constructor

• **new AggregateError**(`message`, `errors`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `errors` | `Error`[] |

#### Overrides

Error.constructor

#### Defined in

[src/pinky.ts:233](https://github.com/mhio/pinky/blob/cf5f758/src/pinky.ts#L233)

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

___

### errors

• **errors**: `Error`[]

#### Defined in

[src/pinky.ts:232](https://github.com/mhio/pinky/blob/cf5f758/src/pinky.ts#L232)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
