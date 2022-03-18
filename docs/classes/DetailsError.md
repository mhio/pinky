[@mhio/pinky](../README.md) / [Exports](../modules.md) / DetailsError

# Class: DetailsError

## Hierarchy

- `Error`

  ↳ **`DetailsError`**

## Table of contents

### Methods

- [captureStackTrace](DetailsError.md#capturestacktrace)

### Properties

- [prepareStackTrace](DetailsError.md#preparestacktrace)
- [stackTraceLimit](DetailsError.md#stacktracelimit)
- [details](DetailsError.md#details)
- [message](DetailsError.md#message)
- [name](DetailsError.md#name)
- [stack](DetailsError.md#stack)

### Constructors

- [constructor](DetailsError.md#constructor)

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

## Properties

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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

### details

• **details**: `any`

#### Defined in

[src/pinky.ts:179](https://github.com/mhio/pinky/blob/c34cff9/src/pinky.ts#L179)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1023

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1022

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1024

## Constructors

### constructor

• **new DetailsError**(`message`, `details`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `details` | `any` |

#### Overrides

Error.constructor

#### Defined in

[src/pinky.ts:180](https://github.com/mhio/pinky/blob/c34cff9/src/pinky.ts#L180)