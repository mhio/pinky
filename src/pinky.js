
const pMap = require('p-map')
function noop(){}

/**
 * delay for ms
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}   
 */
function delay(ms) {
  let timer
  const promise = new Promise(function(ok){
    timer = setTimeout(ok, ms)
  })
  promise.timer = timer
  return promise
}

/**
 * Delay from a timestamp for milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}   
 */
async function delayFrom(ts, ms) {
  const delay_left = Date.now() - ts
  if (delay_left > ms) return delay(ms)
  if (delay_left > 0) return delay(delay_left)
  return undefined
}

/**
 * Delay until a timestamp milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @return     {Promise}   
 */
async function delayTo(ts) {
  const delay_left = Date.now() - ts
  if (delay_left > 0) return delay(delay_left)
  return undefined
}

/**
 * map an async function across an iterable
 *
 * @param      {Iterable.<Any>}   iterator      - The iterator
 * @param      {Function}         asyncFn       - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved promise values
 */
async function map(iterator, asyncFn){
  const results = []
  for (const i of iterator) {
    results.push(asyncFn(i))
  }
  return await Promise.all(results)
}

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

/**
 * map an async function in series across an iterable
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
async function mapSeries(iterator, asyncFn){
  const results = []
  for (const i of iterator) {
    results.push(await asyncFn(i))
  }
  return results
}

/**
 * map an async function in across an iterable with N workers in parallel (if node permits)
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
async function mapWorkers(iterable, worker_count, asyncFn){
  return pMap(iterable, asyncFn, { concurrency: worker_count })
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
async function workerAll(number_of_workers, iterator_in, asyncFn){
  const worker_promises = []
  // const iterator = (iterator_in.entries) ? iterator_in.entries() : iterator_in
  const iterator = iterator_in
  for (let i=1; i <= number_of_workers; i++) {
    worker_promises.push(mapSeries(iterator, asyncFn))
  }
  const raw_results = await Promise.all(worker_promises)
  let results = []
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
async function firstWithoutError(iterable) {
  const promises = []
  // Start resolving all promises from the iterable
  for (const thenable of iterable) {
    const promise = Promise.resolve(thenable)
    promises.push(promise)
    promise.catch(() => {}) // ignore rejections for now
  }
  return firstInSeriesWithoutError(promises)
}


class AggregateError extends Error {
  constructor(errors){
    super('Multiple errors')
    this.errors = errors
  }
}

/**
 * Run a bunch of promises in series, if the one fails move onto the next. 
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise}  { description_of_the_return_value }
 */
async function firstInSeriesWithoutError(iterable) {
  const errors = []
  for (const thenable of iterable) {
    try {
      return await thenable
    } catch (error) {
      errors.push(error)
    }
  }
  throw new AggregateError(errors)
}


/**
 * Resolve all promises in an object
 * @param     {object}    obj     - The object to resolve properties of
 * @return    {object}    obj     - New object of resolved promise properties
 */
async function allProps(obj){
  const promises = {}
  for (let key in obj) {
    const promise = Promise.resolve(obj[key])
    promises[key] = promise
    promise.catch(() => { }) // ignore rejections for now
  }
  const results = {}
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
function outerSettle(){
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
async function waitFor (timeout_ms, condition_fn, { wait_ms = 1000, label = 'condition' /*backoff = 'linear'*/ } = {}) {
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
  const err = new Error(`Timeout waiting for ${label}`)
  err.details = {
    wait_ms, label, timeout_ms, condition_fn,
  }
  throw err
}


// Exports
module.exports = { 
  noop,
  map,
  mapSeries,
  mapWorkers,
  workerAll,
  firstWithoutError,
  firstInSeriesWithoutError,
  allProps,
  delay,
  delayFrom,
  delayTo,
  outerSettle,
  waitFor,
  AggregateError,
}
