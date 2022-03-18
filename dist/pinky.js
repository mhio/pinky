"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.waitFor = exports.outerSettle = exports.allProps = exports.firstInSeriesWithoutError = exports.AggregateError = exports.DetailsError = exports.firstWithoutError = exports.workerAll = exports.mapConcurrent = exports.mapSeries = exports.map = exports.delayTo = exports.delayFrom = exports.delay = exports.noop = void 0;
function noop() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
exports.noop = noop;
/**
 * delay for ms
 * @param      {Number}           ms            - The milliseconds to delay for
 * @return     {Promise}
 */
function delay(ms) {
    return new Promise(function (ok) {
        setTimeout(ok, ms);
    });
}
exports.delay = delay;
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
function delayFrom(ts, ms) {
    return __awaiter(this, void 0, void 0, function () {
        var delay_so_far;
        return __generator(this, function (_a) {
            delay_so_far = Date.now() - ts;
            if (delay_so_far > ms)
                return [2 /*return*/, delay(ms)];
            if (delay_so_far > 1)
                return [2 /*return*/, delay(ms - delay_so_far)];
            return [2 /*return*/];
        });
    });
}
exports.delayFrom = delayFrom;
/**
 * Delay until a timestamp milliseconds
 * @param      {Number}           ts            - The millisecond `Date` timestamp to start the delay from
 * @return     {Promise}
 */
function delayTo(ts) {
    return __awaiter(this, void 0, void 0, function () {
        var delay_left;
        return __generator(this, function (_a) {
            delay_left = ts - Date.now();
            if (delay_left > 1)
                return [2 /*return*/, delay(delay_left)];
            return [2 /*return*/];
        });
    });
}
exports.delayTo = delayTo;
/**
 * map an async function across an iterable
 * @param iterator
 * @param asyncFn
 * @returns Array of resolved promises
 */
function map(iterator, asyncFn) {
    return __awaiter(this, void 0, void 0, function () {
        var results, iterator_1, iterator_1_1, i;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = [];
                    try {
                        for (iterator_1 = __values(iterator), iterator_1_1 = iterator_1.next(); !iterator_1_1.done; iterator_1_1 = iterator_1.next()) {
                            i = iterator_1_1.value;
                            results.push(asyncFn(i));
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1["return"])) _a.call(iterator_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [4 /*yield*/, Promise.all(results)];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.map = map;
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
function mapSeries(iterable, asyncFn) {
    return __awaiter(this, void 0, void 0, function () {
        var results, iterable_1, iterable_1_1, ent, _a, _b, e_2_1;
        var e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next();
                    _d.label = 2;
                case 2:
                    if (!!iterable_1_1.done) return [3 /*break*/, 5];
                    ent = iterable_1_1.value;
                    _b = (_a = results).push;
                    return [4 /*yield*/, asyncFn(ent)];
                case 3:
                    _b.apply(_a, [_d.sent()]);
                    _d.label = 4;
                case 4:
                    iterable_1_1 = iterable_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (iterable_1_1 && !iterable_1_1.done && (_c = iterable_1["return"])) _c.call(iterable_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/, results];
            }
        });
    });
}
exports.mapSeries = mapSeries;
function mapConcurrent(iterator_in, asyncFn, worker_count) {
    return __awaiter(this, void 0, void 0, function () {
        var results, running, count, iterator_in_1, iterator_in_1_1, item, p, j, e_3_1;
        var e_3, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = [];
                    running = [];
                    count = 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 9]);
                    iterator_in_1 = __values(iterator_in), iterator_in_1_1 = iterator_in_1.next();
                    _b.label = 2;
                case 2:
                    if (!!iterator_in_1_1.done) return [3 /*break*/, 6];
                    item = iterator_in_1_1.value;
                    p = asyncFn(item, count);
                    results.push(p);
                    running.push(p);
                    if (!(running.length > worker_count)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var _loop_1 = function (i) {
                                var j_1 = i;
                                running[j_1].then(function () { return resolve(j_1); }, function () { return resolve(j_1); });
                            };
                            for (var i = 0; i < running.length; i++) {
                                _loop_1(i);
                            }
                        })];
                case 3:
                    j = _b.sent();
                    running.splice(j, 1);
                    _b.label = 4;
                case 4:
                    count++;
                    _b.label = 5;
                case 5:
                    iterator_in_1_1 = iterator_in_1.next();
                    return [3 /*break*/, 2];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (iterator_in_1_1 && !iterator_in_1_1.done && (_a = iterator_in_1["return"])) _a.call(iterator_in_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/, Promise.all(results)];
            }
        });
    });
}
exports.mapConcurrent = mapConcurrent;
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
function workerAll(number_of_workers, iterator_in, asyncFn) {
    return __awaiter(this, void 0, void 0, function () {
        var worker_promises, iterator, i, raw_results, results, raw_results_1, raw_results_1_1, result_array;
        var e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    worker_promises = [];
                    iterator = iterator_in;
                    for (i = 1; i <= number_of_workers; i++) {
                        worker_promises.push(mapSeries(iterator, asyncFn));
                    }
                    return [4 /*yield*/, Promise.all(worker_promises)];
                case 1:
                    raw_results = _b.sent();
                    results = [];
                    try {
                        for (raw_results_1 = __values(raw_results), raw_results_1_1 = raw_results_1.next(); !raw_results_1_1.done; raw_results_1_1 = raw_results_1.next()) {
                            result_array = raw_results_1_1.value;
                            results = results.concat(result_array);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (raw_results_1_1 && !raw_results_1_1.done && (_a = raw_results_1["return"])) _a.call(raw_results_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.workerAll = workerAll;
/**
 * Run a bunch of promises, if the first fails return the next until all promises have been checked.
 * All promises start resolving immediately.
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise}  { description_of_the_return_value }
 */
function firstWithoutError(iterable) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, iterable_2, iterable_2_1, thenable, promise;
        var e_5, _a;
        return __generator(this, function (_b) {
            promises = [];
            try {
                // Start resolving all promises from the iterable
                for (iterable_2 = __values(iterable), iterable_2_1 = iterable_2.next(); !iterable_2_1.done; iterable_2_1 = iterable_2.next()) {
                    thenable = iterable_2_1.value;
                    promise = Promise.resolve(thenable);
                    promises.push(promise);
                    promise["catch"](function () { }); // ignore rejections for now
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (iterable_2_1 && !iterable_2_1.done && (_a = iterable_2["return"])) _a.call(iterable_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return [2 /*return*/, firstInSeriesWithoutError(promises)];
        });
    });
}
exports.firstWithoutError = firstWithoutError;
var DetailsError = /** @class */ (function (_super) {
    __extends(DetailsError, _super);
    function DetailsError(message, details) {
        var _this = _super.call(this, message) || this;
        _this.details = details;
        return _this;
    }
    return DetailsError;
}(Error));
exports.DetailsError = DetailsError;
var AggregateError = /** @class */ (function (_super) {
    __extends(AggregateError, _super);
    function AggregateError(message, errors) {
        var _this = _super.call(this, message) || this;
        _this.errors = errors;
        return _this;
    }
    return AggregateError;
}(Error));
exports.AggregateError = AggregateError;
/**
 * Run a bunch of promises in series, if the one fails move onto the next.
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise}  { description_of_the_return_value }
 */
function firstInSeriesWithoutError(iterable) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, iterable_3, iterable_3_1, thenable, error_1, e_6_1;
        var e_6, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 10]);
                    iterable_3 = __values(iterable), iterable_3_1 = iterable_3.next();
                    _b.label = 2;
                case 2:
                    if (!!iterable_3_1.done) return [3 /*break*/, 7];
                    thenable = iterable_3_1.value;
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, thenable];
                case 4: return [2 /*return*/, _b.sent()];
                case 5:
                    error_1 = _b.sent();
                    errors.push(error_1);
                    return [3 /*break*/, 6];
                case 6:
                    iterable_3_1 = iterable_3.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_6_1 = _b.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (iterable_3_1 && !iterable_3_1.done && (_a = iterable_3["return"])) _a.call(iterable_3);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 10: throw new AggregateError('Series Errors', errors);
            }
        });
    });
}
exports.firstInSeriesWithoutError = firstInSeriesWithoutError;
/**
 * Resolve all promises in an object
 * @param     {object}    obj     - The object to resolve properties of
 * @return    {object}    obj     - New object of resolved promise properties
 */
function allProps(obj) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, key, promise, results, _a, _b, _i, key, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    promises = {};
                    for (key in obj) {
                        promise = Promise.resolve(obj[key]);
                        promises[key] = promise;
                        promise["catch"](function () { }); // ignore rejections for now
                    }
                    results = {};
                    _a = [];
                    for (_b in promises)
                        _a.push(_b);
                    _i = 0;
                    _e.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    key = _a[_i];
                    _c = results;
                    _d = key;
                    return [4 /*yield*/, promises[key]];
                case 2:
                    _c[_d] = _e.sent();
                    _e.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
exports.allProps = allProps;
/**
 * Create a promise and return the promise, resolve and reject
 * Allows you to choose whether to resolve/reject something outside the promise scope
 * @returns {Array} - [ promise, resolve, reject ]
 */
function outerSettle() {
    // can't find/remember the use case, seems Promise.resolve/reject would do this, unless a function in passed in
    var outerResolve;
    var outerReject;
    var promise = new Promise(function (resolve, reject) {
        outerResolve = resolve;
        outerReject = reject;
    });
    //return { promise, resolve: outerResolve, reject: outerReject }
    return [promise, outerResolve, outerReject];
}
exports.outerSettle = outerSettle;
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
function waitFor(timeout_ms, condition_fn, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.wait_ms, wait_ms = _c === void 0 ? 1000 : _c, _d = _b.label /*backoff = 'linear'*/, label = _d === void 0 ? 'condition' : _d /*backoff = 'linear'*/;
    return __awaiter(this, void 0, void 0, function () {
        var count, start, timeout, condition_res;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    count = 0;
                    start = Date.now();
                    timeout = start + timeout_ms;
                    _e.label = 1;
                case 1:
                    if (!(timeout > Date.now())) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.resolve(condition_fn())];
                case 2:
                    condition_res = _e.sent();
                    if (condition_res)
                        return [2 /*return*/, { total_ms: Date.now() - start, count: count, result: condition_res }];
                    return [4 /*yield*/, delay(wait_ms + (count * wait_ms))];
                case 3:
                    _e.sent();
                    count++;
                    return [3 /*break*/, 1];
                case 4: 
                // Maybe allow `Error` to be user supplied constructor
                throw new DetailsError("Timeout waiting for ".concat(label), {
                    wait_ms: wait_ms,
                    label: label,
                    timeout_ms: timeout_ms,
                    condition_fn: condition_fn
                });
            }
        });
    });
}
exports.waitFor = waitFor;
