export function noop(...args: any[]) : any {}

/**
 * delay for ms
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}   
 */
export function delay(ms: number) : Promise<void> {
  return new Promise(function(ok){
    setTimeout(ok, ms)
  })
}

/**
 * delay for ms
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}   
 */
//  function delayCancel(ms: number) : Promise<void> {
//   let timer: any
//   let reject: Function
//   const promise = new PromiseTimer(function(resolve, promise_reject){
//     timer = setTimeout(resolve, ms)
//     reject = promise_reject
//     return true
//   })
//   promise.timer = timer
//   promise.cancel = function(){
//     clearTimeout(timer)
//     reject(new Error('Timeout cancelled'))
//   }
//   return promise
// }

/**
 * Delay from a timestamp for milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}   
 */
export async function delayFrom(ts: number, ms: number) : Promise<void> {
  const delay_so_far = Date.now() - ts
  if (delay_so_far > ms) return delay(ms)
  if (delay_so_far > 1) return delay(ms - delay_so_far)
}

/**
 * Delay until a timestamp milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @return     {Promise}   
 */
export async function delayTo(ts: number) : Promise<void> {
  const delay_left = ts - Date.now()
  if (delay_left > 1) return delay(delay_left)
}

/**
 * map an async function across an iterable
 * @param iterator 
 * @param asyncFn 
 * @returns Array of resolved promises
 */
export async function map(iterator: Iterable<any>, asyncFn: Function) : Promise<any[]> {
  const results: Promise<any>[] = []
  for (const i of iterator) {
    results.push(asyncFn(i))
  }
  return await Promise.all(results)
}

/*
function* mapP(iterable, fn) {
    let i = 0
    for (const item of iterable)
      yield fn(item, i++, iterable);
}
function* filterP(iterable, fn) {
    let i = 0
    for (const item of iterable)
      if (fn(item, i++, iterable))
        yield item;
}

*/

/**
 * map an async function in series across an iterable
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
export async function mapSeries(iterable: Iterable<any>, asyncFn: Function) : Promise<any[]> {
  const results = []
  for (const ent of iterable) {
    results.push(await asyncFn(ent))
  }
  return results
}

/**
 * map an async function across an iterable with up to N promises
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */

export type MapperFunction = (element: any, index?: any) => any;

export async function mapConcurrent(iterator_in: Iterable<any>, asyncFn: MapperFunction, worker_count: number) : Promise<any[]>{
  const results: any[] = []
  const running: any[] = []
  let count = 0
  for (const item of iterator_in) {
    const p = asyncFn(item, count)
    results.push(p)
    running.push(p)

    if (running.length > worker_count) {
      // await Promise.race(running)
      const j: number = await new Promise((resolve) => {
        for (let i = 0; i < running.length; i++) {
          const j = i
          running[j].then(()=> resolve(j), ()=>resolve(j))
        }
      })
      running.splice(j, 1)
    }
    count++
  }
  return Promise.all(results);
}

/**
 * Use n workers to resolve a function across an iterable. (via `.mapSeries`)
 * Results array is grouped by worker, then the order a worker iterated in, so doesn't match the initial array order.
 * if you need to inspect results include some type of id in the return.
 *
 * @param      {number}    number_of_workers    - Number of functions to execute
 * @param      {Iterable.<Any>}    iterator_in          - The iterator of values to use
 * @param      {Function}  asyncFn             - The async function
 * @return     {Promise<Array>}                 - Unordered array of resolved values
 */
export async function workerAll(number_of_workers: number, iterator_in: Iterable<any>, asyncFn: Function) : Promise<any[]> {
  const worker_promises = []
  // const iterator = (iterator_in.entries) ? iterator_in.entries() : iterator_in
  const iterator = iterator_in
  for (let i=1; i <= number_of_workers; i++) {
    worker_promises.push(mapSeries(iterator, asyncFn))
  }
  const raw_results = await Promise.all(worker_promises)
  let results: any[] = []
  for (const result_array of raw_results) {
    results = results.concat(result_array)
  }
  return results
}

/**
 * Run a bunch of promises, if the first fails return the next until all promises have been checked. 
 * All promises start resolving immediately. 
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise}  { description_of_the_return_value }
 */
export async function firstWithoutError(iterable: Iterable<Promise<any>>) {
  const promises: Promise<any>[] = []
  // Start resolving all promises from the iterable
  for (const thenable of iterable) {
    const promise = Promise.resolve(thenable)
    promises.push(promise)
    promise.catch(() => {}) // ignore rejections for now
  }
  return firstInSeriesWithoutError(promises)
}

export class DetailsError extends Error {
  details: any
  constructor(message: string, details: any){
    super(message)
    this.details = details
  }
}
export class AggregateError extends Error {
  errors: Array<Error>
  constructor(message: string, errors: Array<Error>){
    super(message)
    this.errors = errors
  }
}

/**
 * Run a bunch of promises in series, if the one fails move onto the next. 
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise}  { description_of_the_return_value }
 */
export async function firstInSeriesWithoutError(iterable: Iterable<Promise<any>>) {
  const errors: Error[] = []
  for (const thenable of iterable) {
    try {
      return await thenable
    } catch (error: any) {
      errors.push(error)
    }
  }
  throw new AggregateError('Series Errors', errors)
}


/**
 * Resolve all promises in an object
 * @param     {object}    obj     - The object to resolve properties of
 * @return    {object}    obj     - New object of resolved promise properties
 */
export async function allProps(obj: { [key: string]: Promise<any> }){
  const promises: { [key: string]: Promise<any> } = {}
  for (let key in obj) {
    const promise = Promise.resolve(obj[key])
    promises[key] = promise
    promise.catch(() => { }) // ignore rejections for now
  }
  const results: { [key: string]: any }  = {}
  for (let key in promises) {
    results[key] = await promises[key]
  }
  return results
}


/**
 * Create a promise and return the promise, resolve and reject
 * Allows you to choose whether to resolve/reject something outside the promise scope
 * @returns {Array} - [ promise, resolve, reject ]
 */
export function outerSettle(){
  // can't find/remember the use case, seems Promise.resolve/reject would do this, unless a function in passed in
  let outerResolve
  let outerReject
  const promise = new Promise(function (resolve, reject) {
    outerResolve = resolve
    outerReject = reject
  })
  //return { promise, resolve: outerResolve, reject: outerReject }
  return [ promise, outerResolve, outerReject ]
}

/**
 * Wait until a timestamp for some condition function to become truthey. Can be an async or standard function  
 * @param   {number}    timeout_ms       - The `Date` timestamp to wait until
 * @param   {function}  condition_fn     - The test function to call repeatedly
 * @param   {object}    options          - Options
 * @param   {number}    options.wait_ms  - Wait between tests (1000)
 * @param   {string}    options.label    - Label to attach to thrown Error
 * @returns {object}
 * @throws  {Error}
 */
export async function waitFor (
  timeout_ms: number,
  condition_fn: Function,
  { wait_ms = 1000, label = 'condition' /*backoff = 'linear'*/ } = {}
)
{
  let count = 0
  const start = Date.now()
  const timeout = start + timeout_ms
  while ( timeout > Date.now() ) {
    const condition_res = await Promise.resolve(condition_fn())
    if (condition_res) return { total_ms: Date.now() - start, count, result: condition_res }
    await delay(wait_ms + (count * wait_ms))
    count++
  }
  // Maybe allow `Error` to be user supplied constructor
  throw new DetailsError(`Timeout waiting for ${label}`, {
    wait_ms, label, timeout_ms, condition_fn,
  })
}
