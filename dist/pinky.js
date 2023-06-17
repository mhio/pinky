var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
//export function noop(...args: any[]) : any {
export function noop() {
    // do nothing.
}
/**
 * delay for ms
 * @param ms The milliseconds to delay for
 * @returns
 */
export function delay(ms) {
    return new Promise(function (ok) {
        setTimeout(ok, ms);
    });
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
export async function delayFrom(ts, ms) {
    const delay_so_far = Date.now() - ts;
    // Already done, all good
    if (delay_so_far > ms)
        return;
    // Bit more to go
    else if (delay_so_far > 0)
        return delay(ms - delay_so_far);
    // Time went backwards... hmmmm
    else
        return delay(ms);
}
/**
 * Delay until a timestamp milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @return     {Promise}
 */
export async function delayTo(ts) {
    const delay_left = ts - Date.now();
    if (delay_left > 1)
        return delay(delay_left);
}
/**
 * map an async function across an iterable
 * @param iterator
 * @param asyncFn
 * @returns Array of resolved promises
 */
export async function map(iterator, asyncFn) {
    const results = [];
    let i = 0;
    for (const e of iterator) {
        results.push(asyncFn(e, i));
        i++;
    }
    return Promise.all(results);
}
/**
 * map an async function in series across an iterable
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
export async function mapSeries(iterable, asyncFn) {
    const results = [];
    let i = 0;
    for (const e of iterable) {
        results.push(await asyncFn(e, i));
        i++;
    }
    return results;
}
/**
 * map an async function in series across an async iterable
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
export async function mapSeriesAsync(iterable, asyncFn) {
    var _a, e_1, _b, _c;
    const results = [];
    let i = 0;
    try {
        for (var _d = true, iterable_1 = __asyncValues(iterable), iterable_1_1; iterable_1_1 = await iterable_1.next(), _a = iterable_1_1.done, !_a; _d = true) {
            _c = iterable_1_1.value;
            _d = false;
            const e = _c;
            results.push(await asyncFn(e, i));
            i++;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = iterable_1.return)) await _b.call(iterable_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return results;
}
/**
 * map an async function across an iterable with up to N promises
 * All promises will resolve,
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
export async function mapConcurrent(iterator_in, asyncFn, worker_count) {
    const results = [];
    const running = new Map();
    let count = 0;
    for (const item of iterator_in) {
        const p_index = count;
        const p = asyncFn(item, p_index);
        results.push(p);
        // Now track the running promises
        const mapConcurrentRunningResolver = () => p_index;
        running.set(p_index, p.then(mapConcurrentRunningResolver, mapConcurrentRunningResolver));
        if (running.size >= worker_count) {
            running.delete(await Promise.race(running.values()));
        }
        // Continue on
        count++;
    }
    // Might need to check the rest of running here
    // this should probably be allSettled, all promises have resolved due to the loop ignoring errors. 
    return Promise.all(results);
}
/**
 * Use n workers to resolve a function across an iterable. (via `.mapSeries`)
 * Results array is grouped by worker, then the order a worker iterated in, so doesn't match the initial array order.
 * if you need to inspect results include some type of id in the return.
 * `mapConcurrent` should replace this
 *
 * @param      {number}    number_of_workers    - Number of functions to execute
 * @param      {Iterable.<Any>}    iterator_in          - The iterator of values to use
 * @param      {Function}  asyncFn             - The async function
 * @return     {Promise<Array>}                 - Unordered array of resolved values
 */
export async function workerAll(number_of_workers, iterator_in, asyncFn) {
    const worker_promises = [];
    // const iterator = (iterator_in.entries) ? iterator_in.entries() : iterator_in
    const iterator = iterator_in;
    for (let i = 1; i <= number_of_workers; i++) {
        worker_promises.push(mapSeries(iterator, asyncFn));
    }
    const raw_results = await Promise.all(worker_promises);
    let results = [];
    for (const result_array of raw_results) {
        results = results.concat(result_array);
    }
    return results;
}
/**
 * Use n workers to resolve a function across an async iterable. (via `.mapSeriesAsync`)
 * Results array is grouped by worker, then the order a worker iterated in, so doesn't match the initial array order.
 * if you need to inspect results include some type of id in the return.
 * `mapConcurrent` should replace this
 *
 * @param      {number}                 number_of_workers   - Number of functions to execute
 * @param      {AsyncIterable.<Any>}    async_iterator      - The iterator of values to use
 * @param      {Function}               asyncFn             - The async function
 * @return     {Promise<Array>}                             - Unordered array of resolved values
 */
export async function workerAllAsync(number_of_workers, async_iterator, asyncFn) {
    const worker_promises = [];
    for (let i = 1; i <= number_of_workers; i++) {
        worker_promises.push(mapSeriesAsync(async_iterator, asyncFn));
    }
    const raw_results = await Promise.all(worker_promises);
    let results = [];
    for (const result_array of raw_results) {
        results = results.concat(result_array);
    }
    return results;
}
/**
 * Run a bunch of promises, if the first fails return the next until all promises have been checked.
 * All promises start resolving immediately.
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise<any>}
 */
export async function firstWithoutError(iterable) {
    const promises = [];
    // Start resolving all promises from the iterable
    for (const thenable of iterable) {
        const promise = Promise.resolve(thenable);
        promises.push(promise);
        promise.catch(noop); // ignore rejections for now
    }
    return firstInSeriesWithoutError(promises);
}
export class DetailsError extends Error {
    constructor(message, details) {
        super(message);
        this.details = details;
    }
}
export class AggregateError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
    }
}
/**
 * Run a bunch of promises in series, if the one fails move onto the next.
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise<any>}
 */
export async function firstInSeriesWithoutError(iterable) {
    const errors = [];
    for (const thenable of iterable) {
        try {
            return await thenable;
        }
        catch (error) {
            errors.push(error);
        }
    }
    throw new AggregateError('Series Errors', errors);
}
/**
 * Resolve all promises in an object
 * @param     {object}    obj     - The object to resolve properties of
 * @return    {object}    obj     - New object of resolved promise properties
 */
export async function allProps(obj) {
    const promises = {};
    for (const key in obj) {
        const promise = Promise.resolve(obj[key]);
        promises[key] = promise;
        promise.catch(noop); // ignore rejections for now
    }
    const results = {};
    for (const key in promises) {
        results[key] = await promises[key];
    }
    return results;
}
/**
 * Create a promise and return the promise object, resolve and reject
 * Allows you to choose whether to resolve/reject something outside the promise scope
 */
export function outerSettlePromise() {
    let outerResolve;
    let outerReject;
    const promise = new Promise(function (resolve, reject) {
        outerResolve = resolve;
        outerReject = reject;
    });
    return {
        promise,
        resolve: outerResolve,
        reject: outerReject,
    };
}
/**
 * Wait until a timestamp or some condition function to become truthey. Can be an async or standard function
 * @param   {number}    timeout_ms       - The `Date` timestamp to wait until
 * @param   {function}  condition_fn     - The test function to call repeatedly
 * @param   {object}    options          - Options
 * @param   {number}    options.wait_ms  - Wait between tests (1000)
 * @param   {string}    options.label    - Label to attach to thrown Error
 * @returns {object}
 * @throws  {Error}
 */
export async function waitFor(timeout_ms, condition_fn, { wait_ms = 1000, label = 'condition' /*backoff = 'linear'*/ } = {}) {
    let count = 0;
    const start = Date.now();
    const timeout = start + timeout_ms;
    while (timeout > Date.now()) {
        const condition_res = await Promise.resolve(condition_fn());
        if (condition_res)
            return { total_ms: Date.now() - start, count, result: condition_res };
        await delay(wait_ms + (count * wait_ms));
        count++;
    }
    // Maybe allow `Error` to be user supplied constructor
    throw new DetailsError(`Timeout waiting for ${label}`, {
        wait_ms, label, timeout_ms, condition_fn,
    });
}
//# sourceMappingURL=pinky.js.map