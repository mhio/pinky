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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
exports.waitFor = exports.outerSettle = exports.allProps = exports.firstInSeriesWithoutError = exports.AggregateError = exports.DetailsError = exports.firstWithoutError = exports.workerAllAsync = exports.workerAll = exports.mapConcurrent = exports.mapSeriesAsync = exports.mapSeries = exports.map = exports.delayTo = exports.delayFrom = exports.delay = exports.noop = void 0;
//export function noop(...args: any[]) : any {
function noop() {
    // do nothing.
}
exports.noop = noop;
/**
 * delay for ms
 * @param ms The milliseconds to delay for
 * @returns
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
            // Already done, all good
            if (delay_so_far > ms)
                return [2 /*return*/];
            // Bit more to go
            else if (delay_so_far > 0)
                return [2 /*return*/, delay(ms - delay_so_far)
                    // Time went backwards... hmmmm
                ];
            // Time went backwards... hmmmm
            else
                return [2 /*return*/, delay(ms)];
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
        var results, i, iterator_1, iterator_1_1, e;
        var e_1, _a;
        return __generator(this, function (_b) {
            results = [];
            i = 0;
            try {
                for (iterator_1 = __values(iterator), iterator_1_1 = iterator_1.next(); !iterator_1_1.done; iterator_1_1 = iterator_1.next()) {
                    e = iterator_1_1.value;
                    results.push(asyncFn(e, i));
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iterator_1_1 && !iterator_1_1.done && (_a = iterator_1["return"])) _a.call(iterator_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return [2 /*return*/, Promise.all(results)];
        });
    });
}
exports.map = map;
/**
 * map an async function in series across an iterable
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
function mapSeries(iterable, asyncFn) {
    return __awaiter(this, void 0, void 0, function () {
        var results, i, iterable_1, iterable_1_1, e, _a, _b, e_2_1;
        var e_2, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = [];
                    i = 0;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 6, 7, 8]);
                    iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next();
                    _d.label = 2;
                case 2:
                    if (!!iterable_1_1.done) return [3 /*break*/, 5];
                    e = iterable_1_1.value;
                    _b = (_a = results).push;
                    return [4 /*yield*/, asyncFn(e, i)];
                case 3:
                    _b.apply(_a, [_d.sent()]);
                    i++;
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
/**
 * map an async function in series across an async iterable
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
function mapSeriesAsync(iterable, asyncFn) {
    var _a, iterable_2, iterable_2_1;
    var _b, e_3, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var results, i, e, _e, _f, e_3_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    results = [];
                    i = 0;
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 9, 10, 15]);
                    _a = true, iterable_2 = __asyncValues(iterable);
                    _g.label = 2;
                case 2: return [4 /*yield*/, iterable_2.next()];
                case 3:
                    if (!(iterable_2_1 = _g.sent(), _b = iterable_2_1.done, !_b)) return [3 /*break*/, 8];
                    _d = iterable_2_1.value;
                    _a = false;
                    _g.label = 4;
                case 4:
                    _g.trys.push([4, , 6, 7]);
                    e = _d;
                    _f = (_e = results).push;
                    return [4 /*yield*/, asyncFn(e, i)];
                case 5:
                    _f.apply(_e, [_g.sent()]);
                    i++;
                    return [3 /*break*/, 7];
                case 6:
                    _a = true;
                    return [7 /*endfinally*/];
                case 7: return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_3_1 = _g.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _g.trys.push([10, , 13, 14]);
                    if (!(!_a && !_b && (_c = iterable_2["return"]))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _c.call(iterable_2)];
                case 11:
                    _g.sent();
                    _g.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15: return [2 /*return*/, results];
            }
        });
    });
}
exports.mapSeriesAsync = mapSeriesAsync;
/**
 * map an async function across an iterable with up to N promises
 * All promises will resolve,
 *
 * @param      {Iterable.<Any>}    iterator     - The iterator
 * @param      {Function}          asyncFn      - The asynchronous function
 * @return     {Promise.<Array>}                - Array of all resolved values
 */
function mapConcurrent(iterator_in, asyncFn, worker_count) {
    return __awaiter(this, void 0, void 0, function () {
        var results, running, count, _loop_1, iterator_in_1, iterator_in_1_1, item, e_4_1;
        var e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    results = [];
                    running = new Map();
                    count = 0;
                    _loop_1 = function (item) {
                        var p_index, p, mapConcurrentRunningResolver, _c, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    p_index = count;
                                    p = asyncFn(item, p_index);
                                    results.push(p);
                                    mapConcurrentRunningResolver = function () { return p_index; };
                                    running.set(p_index, p.then(mapConcurrentRunningResolver, mapConcurrentRunningResolver));
                                    if (!(running.size >= worker_count)) return [3 /*break*/, 2];
                                    _d = (_c = running)["delete"];
                                    return [4 /*yield*/, Promise.race(running.values())];
                                case 1:
                                    _d.apply(_c, [_e.sent()]);
                                    _e.label = 2;
                                case 2:
                                    // Continue on
                                    count++;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    iterator_in_1 = __values(iterator_in), iterator_in_1_1 = iterator_in_1.next();
                    _b.label = 2;
                case 2:
                    if (!!iterator_in_1_1.done) return [3 /*break*/, 5];
                    item = iterator_in_1_1.value;
                    return [5 /*yield**/, _loop_1(item)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    iterator_in_1_1 = iterator_in_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_4_1 = _b.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (iterator_in_1_1 && !iterator_in_1_1.done && (_a = iterator_in_1["return"])) _a.call(iterator_in_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 8: 
                // Might need to check the rest of running here
                // this should probably be allSettled, all promises have resolved due to the loop ignoring errors. 
                return [2 /*return*/, Promise.all(results)];
            }
        });
    });
}
exports.mapConcurrent = mapConcurrent;
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
function workerAll(number_of_workers, iterator_in, asyncFn) {
    return __awaiter(this, void 0, void 0, function () {
        var worker_promises, iterator, i, raw_results, results, raw_results_1, raw_results_1_1, result_array;
        var e_5, _a;
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
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (raw_results_1_1 && !raw_results_1_1.done && (_a = raw_results_1["return"])) _a.call(raw_results_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.workerAll = workerAll;
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
function workerAllAsync(number_of_workers, async_iterator, asyncFn) {
    return __awaiter(this, void 0, void 0, function () {
        var worker_promises, i, raw_results, results, raw_results_2, raw_results_2_1, result_array;
        var e_6, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    worker_promises = [];
                    for (i = 1; i <= number_of_workers; i++) {
                        worker_promises.push(mapSeriesAsync(async_iterator, asyncFn));
                    }
                    return [4 /*yield*/, Promise.all(worker_promises)];
                case 1:
                    raw_results = _b.sent();
                    results = [];
                    try {
                        for (raw_results_2 = __values(raw_results), raw_results_2_1 = raw_results_2.next(); !raw_results_2_1.done; raw_results_2_1 = raw_results_2.next()) {
                            result_array = raw_results_2_1.value;
                            results = results.concat(result_array);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (raw_results_2_1 && !raw_results_2_1.done && (_a = raw_results_2["return"])) _a.call(raw_results_2);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.workerAllAsync = workerAllAsync;
/**
 * Run a bunch of promises, if the first fails return the next until all promises have been checked.
 * All promises start resolving immediately.
 *
 * @param      {Iterable.<Promise>}   iterable  The iterable
 * @return     {Promise<any>}
 */
function firstWithoutError(iterable) {
    return __awaiter(this, void 0, void 0, function () {
        var promises, iterable_3, iterable_3_1, thenable, promise;
        var e_7, _a;
        return __generator(this, function (_b) {
            promises = [];
            try {
                // Start resolving all promises from the iterable
                for (iterable_3 = __values(iterable), iterable_3_1 = iterable_3.next(); !iterable_3_1.done; iterable_3_1 = iterable_3.next()) {
                    thenable = iterable_3_1.value;
                    promise = Promise.resolve(thenable);
                    promises.push(promise);
                    promise["catch"](noop); // ignore rejections for now
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (iterable_3_1 && !iterable_3_1.done && (_a = iterable_3["return"])) _a.call(iterable_3);
                }
                finally { if (e_7) throw e_7.error; }
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
 * @return     {Promise<any>}
 */
function firstInSeriesWithoutError(iterable) {
    return __awaiter(this, void 0, void 0, function () {
        var errors, iterable_4, iterable_4_1, thenable, error_1, e_8_1;
        var e_8, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    errors = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 10]);
                    iterable_4 = __values(iterable), iterable_4_1 = iterable_4.next();
                    _b.label = 2;
                case 2:
                    if (!!iterable_4_1.done) return [3 /*break*/, 7];
                    thenable = iterable_4_1.value;
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
                    iterable_4_1 = iterable_4.next();
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 10];
                case 8:
                    e_8_1 = _b.sent();
                    e_8 = { error: e_8_1 };
                    return [3 /*break*/, 10];
                case 9:
                    try {
                        if (iterable_4_1 && !iterable_4_1.done && (_a = iterable_4["return"])) _a.call(iterable_4);
                    }
                    finally { if (e_8) throw e_8.error; }
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
        var promises, key, promise, results, _a, _b, _c, _i, key, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    promises = {};
                    for (key in obj) {
                        promise = Promise.resolve(obj[key]);
                        promises[key] = promise;
                        promise["catch"](noop); // ignore rejections for now
                    }
                    results = {};
                    _a = promises;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _f.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    key = _c;
                    _d = results;
                    _e = key;
                    return [4 /*yield*/, promises[key]];
                case 2:
                    _d[_e] = _f.sent();
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    });
}
exports.allProps = allProps;
// interface OuterSettleReturn {
//   promise: PromiseLike<any>
//   resolve: PromiseResolve
//   reject: PromiseReject
// }
/**
 * Create a promise and return the promise object, resolve and reject
 * Allows you to choose whether to resolve/reject something outside the promise scope
 * @returns {OuterSettleReturn}
 */
function outerSettle() {
    var outerResolve;
    var outerReject;
    var promise = new Promise(function (resolve, reject) {
        outerResolve = resolve;
        outerReject = reject;
    });
    // return { promise, resolve: outerResolve, reject: outerReject }
    return [promise, outerResolve, outerReject];
}
exports.outerSettle = outerSettle;
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
//# sourceMappingURL=pinky.js.map