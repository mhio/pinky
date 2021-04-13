
pinky promise
-------------

```
yarn add @mhio/pinky
```

[API docco](doc/API.md)

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

mhio 2021
