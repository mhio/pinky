export declare type MapperFunction = (element: any, index?: any) => any;
export declare type BoolOrPromiseBoolFunction = () => boolean | Promise<boolean>;
export declare function noop(): void;
/**
 * delay for ms
 * @param ms The milliseconds to delay for
 * @returns
 */
export declare function delay(ms: number): Promise<void>;
/**
 * delay for ms
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}
 */
/**
 * Delay from a timestamp for milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}
 */
export declare function delayFrom(ts: number, ms: number): Promise<void>;
/**
 * Delay until a timestamp milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @return     {Promise}
 */
export declare function delayTo(ts: number): Promise<void>;
/**
 * map an async function across an iterable
 * @param iterator
 * @param asyncFn
 * @returns Array of resolved promises
 */
export declare function map(iterator: Iterable<any>, asyncFn: MapperFunction): Promise<any[]>;
/**
 * map an async function in series across an iterable
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
export declare function mapSeries(iterable: Iterable<any>, asyncFn: MapperFunction): Promise<any[]>;
/**
 * map an async function across an iterable with up to N promises
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
export declare function mapConcurrent(iterator_in: Iterable<any>, asyncFn: MapperFunction, worker_count: number): Promise<any[]>;
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
export declare function workerAll(number_of_workers: number, iterator_in: Iterable<any>, asyncFn: MapperFunction): Promise<any[]>;
/**
 * Run a bunch of promises, if the first fails return the next until all promises have been checked.
 * All promises start resolving immediately.
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise}  { description_of_the_return_value }
 */
export declare function firstWithoutError(iterable: Iterable<Promise<any>>): Promise<any>;
export declare class DetailsError extends Error {
    details: any;
    constructor(message: string, details: any);
}
export declare class AggregateError extends Error {
    errors: Array<Error>;
    constructor(message: string, errors: Array<Error>);
}
/**
 * Run a bunch of promises in series, if the one fails move onto the next.
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise}  { description_of_the_return_value }
 */
export declare function firstInSeriesWithoutError(iterable: Iterable<Promise<any>>): Promise<any>;
/**
 * Resolve all promises in an object
 * @param     {object}    obj     - The object to resolve properties of
 * @return    {object}    obj     - New object of resolved promise properties
 */
export declare function allProps(obj: {
    [key: string]: Promise<any>;
}): Promise<{
    [key: string]: any;
}>;
/**
 * Create a promise and return the promise, resolve and reject
 * Allows you to choose whether to resolve/reject something outside the promise scope
 * @returns {Array} - [ promise, resolve, reject ]
 */
export declare function outerSettle(): any[];
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
export declare function waitFor(timeout_ms: number, condition_fn: BoolOrPromiseBoolFunction, { wait_ms, label }?: {
    wait_ms?: number;
    label?: string;
}): Promise<{
    total_ms: number;
    count: number;
    result: true;
}>;
