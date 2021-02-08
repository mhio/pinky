## Functions

<dl>
<dt><a href="#delay">delay(ms)</a> ⇒ <code>Promise</code></dt>
<dd><p>delay for ms</p></dd>
<dt><a href="#map">map(iterator, asyncFn)</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>map an async function across an iterable</p></dd>
<dt><a href="#mapSeries">mapSeries(iterator, asyncFn)</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>map an async function in series across an iterable</p></dd>
<dt><a href="#workerAll">workerAll(number_of_workers, iterator_in, asyncFn)</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Use n workers to resolve a function across an iterable. (via <code>.mapSeries</code>)
Resulting array is in worker order, then work started order, so doesn't match initial order.</p></dd>
<dt><a href="#firstWithoutError">firstWithoutError(iterable)</a> ⇒ <code>Promise</code></dt>
<dd><p>Run a bunch of promises, if the first fails return the next.
All promises start resolving immediately.</p></dd>
<dt><a href="#firstInSeriesWithoutError">firstInSeriesWithoutError(iterable)</a> ⇒ <code>Promise</code></dt>
<dd><p>Run a bunch of promises, if the first fails return the next.
All promises start resolving immediately.</p></dd>
<dt><a href="#allProps">allProps(obj)</a> ⇒ <code>object</code></dt>
<dd><p>Resolve all promises in an object</p></dd>
<dt><a href="#outerSettle">outerSettle()</a></dt>
<dd><p>Create a promise and return the promise,resolve and reject
Allows you to resolve/reject the promise out of the promise scope</p></dd>
<dt><a href="#waitFor">waitFor()</a></dt>
<dd><p>Wait for some condition function to become true. Can be an async function</p></dd>
</dl>

<a name="delay"></a>

## delay(ms) ⇒ <code>Promise</code>
<p>delay for ms</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>Number</code> | <p>The milliseconds to delay for</p> |


* * *

<a name="map"></a>

## map(iterator, asyncFn) ⇒ <code>Promise.&lt;Array&gt;</code>
<p>map an async function across an iterable</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - <ul>
<li>Array of all resolved promise values</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>Iterable.&lt;Any&gt;</code> | <p>The iterator</p> |
| asyncFn | <code>function</code> | <p>The asynchronous function</p> |


* * *

<a name="mapSeries"></a>

## mapSeries(iterator, asyncFn) ⇒ <code>Promise.&lt;Array&gt;</code>
<p>map an async function in series across an iterable</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - <ul>
<li>Array of all resolved values</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>Iterable.&lt;Any&gt;</code> | <p>The iterator</p> |
| asyncFn | <code>function</code> | <p>The asynchronous function</p> |


* * *

<a name="workerAll"></a>

## workerAll(number_of_workers, iterator_in, asyncFn) ⇒ <code>Promise.&lt;Array&gt;</code>
<p>Use n workers to resolve a function across an iterable. (via <code>.mapSeries</code>)
Resulting array is in worker order, then work started order, so doesn't match initial order.</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array&gt;</code> - <ul>
<li>Unordered array of resolved values</li>
</ul>  

| Param | Type | Description |
| --- | --- | --- |
| number_of_workers | <code>number</code> | <p>Number of functions to execute</p> |
| iterator_in | <code>Iterable.&lt;Any&gt;</code> | <p>The iterator of values to use</p> |
| asyncFn | <code>function</code> | <p>The async function</p> |


* * *

<a name="firstWithoutError"></a>

## firstWithoutError(iterable) ⇒ <code>Promise</code>
<p>Run a bunch of promises, if the first fails return the next.
All promises start resolving immediately.</p>

**Kind**: global function  
**Returns**: <code>Promise</code> - <p>{ description_of_the_return_value }</p>  

| Param | Type | Description |
| --- | --- | --- |
| iterable | <code>Iterable.&lt;Promise&gt;</code> | <p>The iterable</p> |


* * *

<a name="firstInSeriesWithoutError"></a>

## firstInSeriesWithoutError(iterable) ⇒ <code>Promise</code>
<p>Run a bunch of promises, if the first fails return the next.
All promises start resolving immediately.</p>

**Kind**: global function  
**Returns**: <code>Promise</code> - <p>{ description_of_the_return_value }</p>  

| Param | Type | Description |
| --- | --- | --- |
| iterable | <code>Iterable.&lt;Promise&gt;</code> | <p>The iterable</p> |


* * *

<a name="allProps"></a>

## allProps(obj) ⇒ <code>object</code>
<p>Resolve all promises in an object</p>

**Kind**: global function  
**Returns**: <code>object</code> - <p>obj     - New object of resolved promise properties</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | <p>The object to resolve properties of</p> |


* * *

<a name="outerSettle"></a>

## outerSettle()
<p>Create a promise and return the promise,resolve and reject
Allows you to resolve/reject the promise out of the promise scope</p>

**Kind**: global function  

* * *

<a name="waitFor"></a>

## waitFor()
<p>Wait for some condition function to become true. Can be an async function</p>

**Kind**: global function  

* * *

