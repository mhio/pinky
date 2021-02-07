
function noop(){}

/**
 * delay for ms
 */
async function delay(ms) {
  let timer
  const promise = new Promise(function(ok){
    timer = setTimeout(ok, ms)
  })
  promise.timer = timer
  return promise 
}


/**
 * map an async function across an iterable
 *
 * @param      {<type>}    iterator  The iterator
 * @param      {Function}  asyncFn  The asynchronous function
 * @return     {Promise}   { description_of_the_return_value }
 */
async function map(iterator, asyncFn){
  const results = []
  for (const i of iterator) {
    results.push(asyncFn(i))
  }
  return await Promise.all(results)
}

/**
 * map an async function in series across an iterable
 *
 * @param      {<type>}    iterator  The iterator
 * @param      {Function}  asyncFn  The asynchronous function
 * @return     {Promise}   { description_of_the_return_value }
 */
async function mapSeries(iterator, asyncFn){
  const results = []
  for (const i of iterator) {
    results.push(await asyncFn(i))
  }
  return results
}

/**
 * Use n workers to resolve a function across an iterable. (via `.mapSeries`)
 * Resulting array is in worker order, then work started order, so doesn't match initial order.
 *
 * @param      {number}    number_of_workers    - Number of functions to execute
 * @param      {<type>}    iterator_in          - The iterator of values to use
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
 * Run a bunch of promises, if the first fails return the next. 
 * All promises start resolving immediately. 
 *
 * @param      {<type>}   iterable  The iterable
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
 * Run a bunch of promises, if the first fails return the next. 
 * All promises start resolving immediately. 
 *
 * @param      {<type>}   iterable  The iterable
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
 * Create a promise and return the promise,resolve and reject
 * Allows you to resolve/reject the promise out of the promise scope
 */
function outerSettle(){
  let outerResolve
  let outerReject
  const promise = new Promise(function (resolve, reject) {
    outerResolve = resolve
    outerReject = reject
  })
  return { promise, resolve: outerResolve, reject: outerReject }
}

/**
 * Wait for some condition function to become true. Can be an async function  
 *
 */
async function waitFor (timeout_ms, condition_fn, { wait_ms = 1000, label = 'condition' /*backoff = 'linear'*/ } = {}) {
  let count = 0
  const start = Date.now()
  const timeout = start + timeout_ms
  while ( timeout > Date.now() ) {
    let condition_res = condition_fn()
    if (condition_res && condition_res.then && condition_res.catch) {
      condition_res = await condition_res
    }
    if (condition_res) return { total_ms: Date.now() - start, count }
    await delay(wait_ms + (count * wait_ms))
    count++
  }
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
  workerAll,
  firstWithoutError,
  firstInSeriesWithoutError,
  allProps,
  delay,
  outerSettle,
  waitFor,
  AggregateError,
}
