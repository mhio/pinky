
pinky promise
-------------

[github.com/mhio/pinky](https://github.com/mhio/pinky)

```
yarn add @mhio/pinky
```

`delay(ms) ⇒ Promise`<br>
delay for ms

`delayFrom(ts, ms) ⇒ Promise`<br>
Delay from a timestamp for milliseconds

`delayTo(ts) ⇒ Promise`<br>
Delay until a timestamp milliseconds

`map(iterator, asyncFn) ⇒ Promise.<Array>`<br>
map an async function across an iterable

`mapSeries(iterator, asyncFn) ⇒ Promise.<Array>`<br>
map an async function in series across an iterable

`mapConcurrent(iterator_in, asyncFn, concurrent_num) ⇒ Promise.<Array>`<br>
Use n workers to resolve a function across an iterable. (via .mapSeries) Resulting array is in worker order, then work started order, so doesn't match initial order.

`firstWithoutError(iterable) ⇒ Promise`<br>
Run a bunch of promises, if the first fails return the next until all promises have been checked. All promises start resolving immediately.

`firstInSeriesWithoutError(iterable) ⇒ Promise`<br>
Run a bunch of promises in series, if the one fails move onto the next.

`allProps(obj) ⇒ object`<br>
Resolve all promises in an object

`outerSettle()`<br>
Create a promise and return the promise,resolve and reject Allows you to resolve/reject the promise out of the promise scope

`waitFor(timeout_ms, condition_fn, options) ⇒ object`<br>
Wait until a timestamp for some condition function to become truthey. Can be an async or standard function


[API docco](https://mhio.github.io/pinky/modules.html)

```
const { delay, mapSeries } = require('@mhio/pinky')
import { delay, mapSeries } from '@mhio/pinky'

async function go(){
  const waits = [ 60, 10, 50, 5, 35, 19 ]
  const res = await mapSeries(waits, async (ms) => {
    console.log('wait ms', ms)
    await delay(ms)
    return ms
  })
}

go().catch(console.error)
```

mhio 2022
