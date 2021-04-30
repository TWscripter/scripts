/******/(()=>{// webpackBootstrap
/******/var r={
/***/9742:
/***/(t,e)=>{"use strict";e.byteLength=
// base64 is 4/3 + up to two characters of the original data
function(t){var e=p(t),t=e[0],e=e[1];return 3*(t+e)/4-e},e.toByteArray=function(t){var e,r,n=p(t),i=n[0],n=n[1],o=new h(function(t,e){return 3*(t+e)/4-e}(i,n)),s=0,a=0<n?i-4:i;for(r=0;r<a;r+=4)e=c[t.charCodeAt(r)]<<18|c[t.charCodeAt(r+1)]<<12|c[t.charCodeAt(r+2)]<<6|c[t.charCodeAt(r+3)],o[s++]=e>>16&255,o[s++]=e>>8&255,o[s++]=255&e;2===n&&(e=c[t.charCodeAt(r)]<<2|c[t.charCodeAt(r+1)]>>4,o[s++]=255&e);1===n&&(e=c[t.charCodeAt(r)]<<10|c[t.charCodeAt(r+1)]<<4|c[t.charCodeAt(r+2)]>>2,o[s++]=e>>8&255,o[s++]=255&e);return o},e.fromByteArray=function(t){// must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff later
for(var e,r=t.length,n=r%3,i=[],o=16383,s=0,a=r-n;s<a;s+=o)i.push(function(t,e,r){for(var n,i=[],o=e;o<r;o+=3)n=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(255&t[o+2]),i.push(function(t){return u[t>>18&63]+u[t>>12&63]+u[t>>6&63]+u[63&t]}(n));return i.join("")}(t,s,a<s+o?a:s+o));
// pad the end with zeros, but make sure to not forget the extra bytes
1==n?(e=t[r-1],i.push(u[e>>2]+u[e<<4&63]+"==")):2==n&&(e=(t[r-2]<<8)+t[r-1],i.push(u[e>>10]+u[e>>4&63]+u[e<<2&63]+"="));return i.join("")}
/***/;for(var u=[],c=[],h="undefined"!=typeof Uint8Array?Uint8Array:Array,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=0,i=r.length;n<i;++n)u[n]=r[n],c[r.charCodeAt(n)]=n;
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
function p(t){var e=t.length;if(0<e%4)throw new Error("Invalid string. Length must be a multiple of 4");
// Trim off extra bytes after placeholder bytes are found
// See: https://github.com/beatgammit/base64-js/issues/42
t=t.indexOf("=");return[t=-1===t?e:t,t===e?0:4-t%4]}c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63},
/***/8764:
/***/(t,r,e)=>{"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */const a=e(9742),o=e(645);e="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;r.Buffer=h,r.SlowBuffer=function(t){+t!=t&&(// eslint-disable-line eqeqeq
t=0);return h.alloc(+t)},r.INSPECT_MAX_BYTES=50;const n=2147483647;function i(t){if(t>n)throw new RangeError('The value "'+t+'" is invalid for option "size"');
// Return an augmented `Uint8Array` instance
t=new Uint8Array(t);return Object.setPrototypeOf(t,h.prototype),t}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */function h(t,e,r){
// Common case.
if("number"!=typeof t)return s(t,e,r);if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}// not used by this implementation
function s(t,e,r){if("string"==typeof t)return function(t,e){"string"==typeof e&&""!==e||(e="utf8");if(!h.isEncoding(e))throw new TypeError("Unknown encoding: "+e);var r=0|d(t,e);let n=i(r);e=n.write(t,e);e!==r&&(
// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
n=n.slice(0,e));return n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(k(t,Uint8Array)){var e=new Uint8Array(t);return l(e.buffer,e.byteOffset,e.byteLength)}return p(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(k(t,ArrayBuffer)||t&&k(t.buffer,ArrayBuffer))return l(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(k(t,SharedArrayBuffer)||t&&k(t.buffer,SharedArrayBuffer)))return l(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return h.from(n,e,r);n=function(t){if(h.isBuffer(t)){var e=0|f(t.length),r=i(e);return 0===r.length?r:(t.copy(r,0,0,e),r)}if(void 0!==t.length)return"number"!=typeof t.length||V(t.length)?i(0):p(t);if("Buffer"===t.type&&Array.isArray(t.data))return p(t.data)}(t);if(n)return n;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return h.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return u(t),i(t<0?0:0|f(t))}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */function p(e){var r=e.length<0?0:0|f(e.length);const n=i(r);for(let t=0;t<r;t+=1)n[t]=255&e[t];return n}function l(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),
// Return an augmented `Uint8Array` instance
Object.setPrototypeOf(n,h.prototype),n}function f(t){
// Note: cannot use `length < K_MAX_LENGTH` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if(t>=n)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n.toString(16)+" bytes");return 0|t}function d(t,e){if(h.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||k(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var r=t.length,n=2<arguments.length&&!0===arguments[2];if(!n&&0===r)return 0;
// Use a for loop to avoid recursion
let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return R(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return U(t).length;default:if(i)return n?-1:R(t).length;// assume utf8
e=(""+e).toLowerCase(),i=!0}}function y(t,e,r){let n=!1;
// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if((e=void 0===e||e<0?0:e)>this.length)return"";if((r=void 0===r||r>this.length?this.length:r)<=0)return"";
// Force coercion to uint32. This will also coerce falsey/NaN values to 0.
if((r>>>=0)<=(e>>>=0))return"";for(t=t||"utf8";;)switch(t){case"hex":return function(e,r,n){var t=e.length;(!r||r<0)&&(r=0);(!n||n<0||t<n)&&(n=t);let i="";for(let t=r;t<n;++t)i+=G[e[t]];return i}(this,e,r);case"utf8":case"utf-8":return v(this,e,r);case"ascii":return function(e,r,n){let i="";n=Math.min(e.length,n);for(let t=r;t<n;++t)i+=String.fromCharCode(127&e[t]);return i}(this,e,r);case"latin1":case"binary":return function(e,r,n){let i="";n=Math.min(e.length,n);for(let t=r;t<n;++t)i+=String.fromCharCode(e[t]);return i}(this,e,r);case"base64":return i=this,s=r,0===(o=e)&&s===i.length?a.fromByteArray(i):a.fromByteArray(i.slice(o,s));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(t,e,r){var n=t.slice(e,r);let i="";
// If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
for(let t=0;t<n.length-1;t+=2)i+=String.fromCharCode(n[t]+256*n[t+1]);return i}(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}var i,o,s}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
function g(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function m(t,e,r,n,i){
// Empty buffer means no match
if(0===t.length)return-1;
// Normalize byteOffset
if("string"==typeof r?(n=r,r=0):2147483647<r?r=2147483647:r<-2147483648&&(r=-2147483648),(
// Normalize byteOffset: negative offsets start from the end of the buffer
r=(// Coerce to Number.
// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
r=V(r=+r)?i?0:t.length-1:r)<0?t.length+r:r)>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}
// Normalize val
// Finally, search either indexOf (if dir is true) or lastIndexOf
if("string"==typeof e&&(e=h.from(e,n)),h.isBuffer(e))
// Special case: looking for empty string/buffer always fails
return 0===e.length?-1:w(t,e,r,n,i);if("number"==typeof e)// Search for a byte value [0-255]
return e&=255,"function"==typeof Uint8Array.prototype.indexOf?(i?Uint8Array.prototype.indexOf:Uint8Array.prototype.lastIndexOf).call(t,e,r):w(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function w(r,n,e,t,i){let o=1,s=r.length,a=n.length;if(void 0!==t&&("ucs2"===(t=String(t).toLowerCase())||"ucs-2"===t||"utf16le"===t||"utf-16le"===t)){if(r.length<2||n.length<2)return-1;o=2,s/=2,a/=2,e/=2}function u(t,e){return 1===o?t[e]:t.readUInt16BE(e*o)}let c;if(i){let t=-1;for(c=e;c<s;c++)if(u(r,c)===u(n,-1===t?0:c-t)){if(-1===t&&(t=c),c-t+1===a)return t*o}else-1!==t&&(c-=c-t),t=-1}else for(e+a>s&&(e=s-a),c=e;0<=c;c--){let e=!0;for(let t=0;t<a;t++)if(u(r,c+t)!==u(n,t)){e=!1;break}if(e)return c}return-1}function b(t,e,r,n){return j(function(e){const r=[];for(let t=0;t<e.length;++t)
// Node's code seems to be doing this and not & 0x7F..
r.push(255&e.charCodeAt(t));return r}(e),t,r,n)}function E(t,e,r,n){return j(function(e,r){var n,i;const o=[];for(let t=0;t<e.length&&!((r-=2)<0);++t)i=e.charCodeAt(t),n=i>>8,i=i%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function v(s,t,e){e=Math.min(s.length,e);const r=[];let a=t;for(;a<e;){var u=s[a];let i=null,o=239<u?4:223<u?3:191<u?2:1;if(a+o<=e){let t,e,r,n;switch(o){case 1:u<128&&(i=u);break;case 2:t=s[a+1],128==(192&t)&&(n=(31&u)<<6|63&t,127<n&&(i=n));break;case 3:t=s[a+1],e=s[a+2],128==(192&t)&&128==(192&e)&&(n=(15&u)<<12|(63&t)<<6|63&e,2047<n&&(n<55296||57343<n)&&(i=n));break;case 4:t=s[a+1],e=s[a+2],r=s[a+3],128==(192&t)&&128==(192&e)&&128==(192&r)&&(n=(15&u)<<18|(63&t)<<12|(63&e)<<6|63&r,65535<n&&n<1114112&&(i=n))}}null===i?(
// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
i=65533,o=1):65535<i&&(
// encode to utf16 (surrogate pair dance)
i-=65536,r.push(i>>>10&1023|55296),i=56320|1023&i),r.push(i),a+=o}return function(t){var e=t.length;if(e<=T)return String.fromCharCode.apply(String,t);// avoid extra slice()
// Decode in chunks to avoid "call stack size exceeded".
let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=T));return r}(r)}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
r.kMaxLength=n
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */,(h.TYPED_ARRAY_SUPPORT=function(){
// Can typed array instances can be augmented?
try{const e=new Uint8Array(1);var t={foo:function(){return 42}};return Object.setPrototypeOf(t,Uint8Array.prototype),Object.setPrototypeOf(e,t),42===e.foo()}catch(t){return!1}}())||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(h.prototype,"parent",{enumerable:!0,get:function(){if(h.isBuffer(this))return this.buffer}}),Object.defineProperty(h.prototype,"offset",{enumerable:!0,get:function(){if(h.isBuffer(this))return this.byteOffset}}),h.poolSize=8192,h.from=s,
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(h.prototype,Uint8Array.prototype),Object.setPrototypeOf(h,Uint8Array),
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
h.alloc=function(t,e,r){return e=e,r=r,u(t=t),!(t<=0)&&void 0!==e?"string"==typeof r?i(t).fill(e,r):i(t).fill(e):i(t)},h.allocUnsafe=c
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */,h.allocUnsafeSlow=c,h.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==h.prototype;// so Buffer.isBuffer(Buffer.prototype) will be false
},h.compare=function(r,n){if(k(r,Uint8Array)&&(r=h.from(r,r.offset,r.byteLength)),k(n,Uint8Array)&&(n=h.from(n,n.offset,n.byteLength)),!h.isBuffer(r)||!h.isBuffer(n))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(r===n)return 0;let i=r.length,o=n.length;for(let t=0,e=Math.min(i,o);t<e;++t)if(r[t]!==n[t]){i=r[t],o=n[t];break}return i<o?-1:o<i?1:0},h.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},h.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return h.alloc(0);let r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=h.allocUnsafe(t);let i=0;for(r=0;r<e.length;++r){let t=e[r];if(k(t,Uint8Array))i+t.length>n.length?(h.isBuffer(t)||(t=h.from(t)),t.copy(n,i)):Uint8Array.prototype.set.call(n,t,i);else{if(!h.isBuffer(t))throw new TypeError('"list" argument must be an Array of Buffers');t.copy(n,i)}i+=t.length}return n},h.byteLength=d,h.prototype._isBuffer=!0,h.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)g(this,t,t+1);return this},h.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)g(this,t,t+3),g(this,t+1,t+2);return this},h.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)g(this,t,t+7),g(this,t+1,t+6),g(this,t+2,t+5),g(this,t+3,t+4);return this},h.prototype.toLocaleString=h.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?v(this,0,t):y.apply(this,arguments)},h.prototype.equals=function(t){if(!h.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===h.compare(this,t)},h.prototype.inspect=function(){let t="";var e=r.INSPECT_MAX_BYTES;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"},e&&(h.prototype[e]=h.prototype.inspect),h.prototype.compare=function(t,e,r,n,i){if(k(t,Uint8Array)&&(t=h.from(t,t.offset,t.byteLength)),!h.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),(e=void 0===e?0:e)<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(i<=n&&r<=e)return 0;if(i<=n)return-1;if(r<=e)return 1;if(this===t)return 0;let o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0);var a=Math.min(o,s),u=this.slice(n,i),c=t.slice(e,r);for(let t=0;t<a;++t)if(u[t]!==c[t]){o=u[t],s=c[t];break}return o<s?-1:s<o?1:0},h.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},h.prototype.indexOf=function(t,e,r){return m(this,t,e,r,!0)},h.prototype.lastIndexOf=function(t,e,r){return m(this,t,e,r,!1)},h.prototype.write=function(t,e,r,n){
// Buffer#write(string)
if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i,o,s,a=this.length-e;if((void 0===r||a<r)&&(r=a),0<t.length&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n=n||"utf8";let u=!1;for(;;)switch(n){case"hex":return function(t,e,r,n){r=Number(r)||0;var i=t.length-r;(!n||i<(n=Number(n)))&&(n=i),(i=e.length)/2<n&&(n=i/2);let o;for(o=0;o<n;++o){var s=parseInt(e.substr(2*o,2),16);if(V(s))return o;t[r+o]=s}return o}(this,t,e,r);case"utf8":case"utf-8":return o=e,s=r,j(R(t,(i=this).length-o),i,o,s);case"ascii":case"latin1":case"binary":return b(this,t,e,r);case"base64":
// Warning: maxLength not taken into account in base64Write
return i=this,o=e,s=r,j(U(t),i,o,s);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,e,r);default:if(u)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),u=!0}},h.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const T=4096;
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function I(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(r<t+e)throw new RangeError("Trying to access beyond buffer length")}function _(t,e,r,n,i,o){if(!h.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(i<e||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function O(t,e,r,n,i){L(e,n,i,t,r,7);i=Number(e&BigInt(4294967295));t[r++]=i,t[r++]=i>>=8,t[r++]=i>>=8,t[r++]=i>>=8;e=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=e,t[r++]=e>>=8,t[r++]=e>>=8,t[r++]=e>>=8,r}function D(t,e,r,n,i){L(e,n,i,t,r,7);i=Number(e&BigInt(4294967295));t[r+7]=i,t[r+6]=i>>=8,t[r+5]=i>>=8,t[r+4]=i>>=8;e=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=e,t[r+2]=e>>=8,t[r+1]=e>>=8,t[r]=e>>=8,r+8}function N(t,e,r,n){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function A(t,e,r,n,i){return e=+e,r>>>=0,i||N(t,0,r,4),o.write(t,e,r,n,23,4),r+4}function C(t,e,r,n,i){return e=+e,r>>>=0,i||N(t,0,r,8),o.write(t,e,r,n,52,8),r+8}h.prototype.slice=function(t,e){var r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):r<t&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):r<e&&(e=r);e=this.subarray(t,e=e<t?t:e);
// Return an augmented `Uint8Array` instance
return Object.setPrototypeOf(e,h.prototype),e},h.prototype.readUintLE=h.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||I(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return n},h.prototype.readUintBE=h.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||I(t,e,this.length);let n=this[t+--e],i=1;for(;0<e&&(i*=256);)n+=this[t+--e]*i;return n},h.prototype.readUint8=h.prototype.readUInt8=function(t,e){return t>>>=0,e||I(t,1,this.length),this[t]},h.prototype.readUint16LE=h.prototype.readUInt16LE=function(t,e){return t>>>=0,e||I(t,2,this.length),this[t]|this[t+1]<<8},h.prototype.readUint16BE=h.prototype.readUInt16BE=function(t,e){return t>>>=0,e||I(t,2,this.length),this[t]<<8|this[t+1]},h.prototype.readUint32LE=h.prototype.readUInt32LE=function(t,e){return t>>>=0,e||I(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},h.prototype.readUint32BE=h.prototype.readUInt32BE=function(t,e){return t>>>=0,e||I(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},h.prototype.readBigUInt64LE=Y(function(t){B(t>>>=0,"offset");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||F(t,this.length-8);e=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,r=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(e)+(BigInt(r)<<BigInt(32))}),h.prototype.readBigUInt64BE=Y(function(t){B(t>>>=0,"offset");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||F(t,this.length-8);e=e*2**24+65536*this[++t]+256*this[++t]+this[++t],r=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return(BigInt(e)<<BigInt(32))+BigInt(r)}),h.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||I(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},h.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||I(t,e,this.length);let n=e,i=1,o=this[t+--n];for(;0<n&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},h.prototype.readInt8=function(t,e){return t>>>=0,e||I(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},h.prototype.readInt16LE=function(t,e){t>>>=0,e||I(t,2,this.length);t=this[t]|this[t+1]<<8;return 32768&t?4294901760|t:t},h.prototype.readInt16BE=function(t,e){t>>>=0,e||I(t,2,this.length);t=this[t+1]|this[t]<<8;return 32768&t?4294901760|t:t},h.prototype.readInt32LE=function(t,e){return t>>>=0,e||I(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},h.prototype.readInt32BE=function(t,e){return t>>>=0,e||I(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},h.prototype.readBigInt64LE=Y(function(t){B(t>>>=0,"offset");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||F(t,this.length-8);r=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);// Overflow
return(BigInt(r)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)}),h.prototype.readBigInt64BE=Y(function(t){B(t>>>=0,"offset");var e=this[t],r=this[t+7];void 0!==e&&void 0!==r||F(t,this.length-8);e=(e<<24)+// Overflow
65536*this[++t]+256*this[++t]+this[++t];return(BigInt(e)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)}),h.prototype.readFloatLE=function(t,e){return t>>>=0,e||I(t,4,this.length),o.read(this,t,!0,23,4)},h.prototype.readFloatBE=function(t,e){return t>>>=0,e||I(t,4,this.length),o.read(this,t,!1,23,4)},h.prototype.readDoubleLE=function(t,e){return t>>>=0,e||I(t,8,this.length),o.read(this,t,!0,52,8)},h.prototype.readDoubleBE=function(t,e){return t>>>=0,e||I(t,8,this.length),o.read(this,t,!1,52,8)},h.prototype.writeUintLE=h.prototype.writeUIntLE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||_(this,t,e,r,Math.pow(2,8*r)-1,0);let i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},h.prototype.writeUintBE=h.prototype.writeUIntBE=function(t,e,r,n){t=+t,e>>>=0,r>>>=0,n||_(this,t,e,r,Math.pow(2,8*r)-1,0);let i=r-1,o=1;for(this[e+i]=255&t;0<=--i&&(o*=256);)this[e+i]=t/o&255;return e+r},h.prototype.writeUint8=h.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,1,255,0),this[e]=255&t,e+1},h.prototype.writeUint16LE=h.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},h.prototype.writeUint16BE=h.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},h.prototype.writeUint32LE=h.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},h.prototype.writeUint32BE=h.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},h.prototype.writeBigUInt64LE=Y(function(t,e=0){return O(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))}),h.prototype.writeBigUInt64BE=Y(function(t,e=0){return D(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))}),h.prototype.writeIntLE=function(t,e,r,n){t=+t,e>>>=0,n||_(this,t,e,r,(n=Math.pow(2,8*r-1))-1,-n);let i=0,o=1,s=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+r},h.prototype.writeIntBE=function(t,e,r,n){t=+t,e>>>=0,n||_(this,t,e,r,(n=Math.pow(2,8*r-1))-1,-n);let i=r-1,o=1,s=0;for(this[e+i]=255&t;0<=--i&&(o*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+r},h.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,1,127,-128),this[e]=255&(t=t<0?255+t+1:t),e+1},h.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},h.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},h.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},h.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||_(this,t,e,4,2147483647,-2147483648),this[e]=(t=t<0?4294967295+t+1:t)>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},h.prototype.writeBigInt64LE=Y(function(t,e=0){return O(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),h.prototype.writeBigInt64BE=Y(function(t,e=0){return D(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),h.prototype.writeFloatLE=function(t,e,r){return A(this,t,e,!0,r)},h.prototype.writeFloatBE=function(t,e,r){return A(this,t,e,!1,r)},h.prototype.writeDoubleLE=function(t,e,r){return C(this,t,e,!0,r)},h.prototype.writeDoubleBE=function(t,e,r){return C(this,t,e,!1,r)}
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
,h.prototype.copy=function(t,e,r,n){if(!h.isBuffer(t))throw new TypeError("argument should be a Buffer");
// Copy 0 bytes; we're done
if(r=r||0,n||0===n||(n=this.length),e>=t.length&&(e=t.length),(n=0<n&&n<r?r:n)===r)return 0;if(0===t.length||0===this.length)return 0;
// Fatal error conditions
if((e=e||0)<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");
// Are we oob?
n>this.length&&(n=this.length);var i=(n=t.length-e<n-r?t.length-e+r:n)-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?
// Use built-in when available, missing from IE11
this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),i}
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
,h.prototype.fill=function(t,e,r,n){
// Handle string cases:
if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!h.isEncoding(n))throw new TypeError("Unknown encoding: "+n);var i;1===t.length&&(i=t.charCodeAt(0),("utf8"===n&&i<128||"latin1"===n)&&(
// Fast path: If `val` fits into a single byte, use that numeric value.
t=i))}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));
// Invalid ranges are not set to a default, so can range check early.
if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;e>>>=0,r=void 0===r?this.length:r>>>0;let o;if("number"==typeof(t=t||0))for(o=e;o<r;++o)this[o]=t;else{var s=h.isBuffer(t)?t:h.from(t,n),a=s.length;if(0===a)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<r-e;++o)this[o+e]=s[o%a]}return this}
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage;
const x={};function P(t,e,r){x[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),
// Add the error code to the name to include it in the stack trace.
this.name=`${this.name} [${t}]`,
// Access the stack to generate the error message including the error code
// from the name.
this.stack,// eslint-disable-line no-unused-expressions
// Reset the name to the actual name.
delete this.name}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}function S(t){let e="",r=t.length;for(var n="-"===t[0]?1:0;r>=4+n;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}
// CHECK FUNCTIONS
// ===============
function L(e,r,n,t,i,o){if(n<e||e<r){var s="bigint"==typeof r?"n":"";let t;throw t=3<o?0===r||r===BigInt(0)?`>= 0${s} and < 2${s} ** ${8*(o+1)}${s}`:`>= -(2${s} ** ${8*(o+1)-1}${s}) and < 2 ** `+`${8*(o+1)-1}${s}`:`>= ${r}${s} and <= ${n}${s}`,new x.ERR_OUT_OF_RANGE("value",t,e)}t=t,o=o,B(i=i,"offset"),void 0!==t[i]&&void 0!==t[i+o]||F(i,t.length-(o+1))}function B(t,e){if("number"!=typeof t)throw new x.ERR_INVALID_ARG_TYPE(e,"number",t)}function F(t,e,r){if(Math.floor(t)!==t)throw B(t,r),new x.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new x.ERR_BUFFER_OUT_OF_BOUNDS;throw new x.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}
// HELPER FUNCTIONS
// ================
P("ERR_BUFFER_OUT_OF_BOUNDS",function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),P("ERR_INVALID_ARG_TYPE",function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`},TypeError),P("ERR_OUT_OF_RANGE",function(t,e,r){t=`The value of "${t}" is out of range.`;let n=r;return Number.isInteger(r)&&Math.abs(r)>2**32?n=S(String(r)):"bigint"==typeof r&&(n=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(n=S(n)),n+="n"),t+=` It must be ${e}. Received ${n}`},RangeError);const M=/[^+/0-9A-Za-z-_]/g;function R(e,r){r=r||1/0;let n;var i=e.length;let o=null;const s=[];for(let t=0;t<i;++t){
// is surrogate component
if(n=e.charCodeAt(t),55295<n&&n<57344){
// last char was a lead
if(!o){
// no lead yet
if(56319<n){
// unexpected trail
-1<(r-=3)&&s.push(239,191,189);continue}
// valid lead
if(t+1===i){
// unpaired lead
-1<(r-=3)&&s.push(239,191,189);continue}o=n;continue}
// 2 leads in a row
if(n<56320){-1<(r-=3)&&s.push(239,191,189),o=n;continue}
// valid surrogate pair
n=65536+(o-55296<<10|n-56320)}else o&&-1<(r-=3)&&s.push(239,191,189);
// encode utf8
if(o=null,n<128){if(--r<0)break;s.push(n)}else if(n<2048){if((r-=2)<0)break;s.push(n>>6|192,63&n|128)}else if(n<65536){if((r-=3)<0)break;s.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;s.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return s}function U(t){return a.toByteArray(function(t){
// Node converts strings with length < 2 to ''
if((
// Node strips out invalid characters like \n and \t from the string, base64-js does not
t=(
// Node takes equal signs as end of the Base64 encoding
t=t.split("=")[0]).trim().replace(M,"")).length<2)return"";
// Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
for(;t.length%4!=0;)t+="=";return t}(t))}function j(t,e,r,n){let i;for(i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function k(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function V(t){
// For IE11 support
return t!=t;// eslint-disable-line no-self-compare
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const G=function(){var r="0123456789abcdef";const n=new Array(256);for(let e=0;e<16;++e){var i=16*e;for(let t=0;t<16;++t)n[i+t]=r[e]+r[t]}return n}();
// Return not function with Error if BigInt not supported
function Y(t){return"undefined"==typeof BigInt?q:t}function q(){throw new Error("BigInt not supported")}
/***/},
/***/624:
/***/t=>{
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */
function r(t){if(t)
/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */return function(t){for(var e in r.prototype)t[e]=r.prototype[e];return t}
/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */(t)}(
/**
 * Expose `Emitter`.
 */
t.exports=r).prototype.on=r.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},
/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
r.prototype.once=function(t,e){var r=this;function n(){r.off(t,n),e.apply(this,arguments)}return this._callbacks=this._callbacks||{},n.fn=e,this.on(t,n),this},
/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */
r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(t,e){
// all
if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;
// specific event
var r,n=this._callbacks[t];if(!n)return this;
// remove all handlers
if(1==arguments.length)return delete this._callbacks[t],this;
// remove specific handler
for(var i=0;i<n.length;i++)if((r=n[i])===e||r.fn===e){n.splice(i,1);break}return this},
/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */
r.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),r=this._callbacks[t];if(r)for(var n=0,i=(r=r.slice(0)).length;n<i;++n)r[n].apply(this,e);return this},
/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */
r.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},
/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */
r.prototype.hasListeners=function(t){return!!this.listeners(t).length}},
/***/7187:
/***/t=>{"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var e="object"==typeof Reflect?Reflect:null,u=e&&"function"==typeof e.apply?e.apply:function(t,e,r){return Function.prototype.apply.call(t,e,r)};var r=e&&"function"==typeof e.ownKeys?e.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)},n=Number.isNaN||function(t){return t!=t};function i(){i.init.call(this)}t.exports=i,t.exports.once=function(i,o){return new Promise(function(t,e){function r(){void 0!==n&&i.removeListener("error",n),t([].slice.call(arguments))}var n;
// Adding an error listener is not optional because
// if an error is thrown on an event emitter we cannot
// guarantee that the actual event we are waiting will
// be fired. The result could be a silent way to create
// memory or file descriptor leaks, which is something
// we should avoid.
"error"!==o&&(n=function(t){i.removeListener(o,r),e(t)},i.once("error",n)),i.once(o,r)})}
/***/,(
// Backwards-compat with node 0.10.x
i.EventEmitter=i).prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var o=10;function a(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function s(t){return void 0===t._maxListeners?i.defaultMaxListeners:t._maxListeners}function c(t,e,r,n){var i,o;return a(r),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(
// To avoid recursion in the case that type === "newListener"! Before
// adding it to the listeners, first emit "newListener".
void 0!==i.newListener&&(t.emit("newListener",e,r.listener||r),
// Re-assign `events` because a newListener handler could have caused the
// this._events to be assigned to a new object
i=t._events),o=i[e]),void 0===o?(
// Optimize the case of one listener. Don't need the extra array object.
o=i[e]=r,++t._eventsCount):("function"==typeof o?
// Adding the second element, need to change to array.
o=i[e]=n?[r,o]:[o,r]:n?o.unshift(r):o.push(r),0<(
// Check for listener leak
r=s(t))&&o.length>r&&!o.warned&&(o.warned=!0,(r=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit")).name="MaxListenersExceededWarning",r.emitter=t,r.type=e,r.count=o.length,r=r,console&&console.warn&&console.warn(r))),t}function h(t,e,r){t={fired:!1,wrapFn:void 0,target:t,type:e,listener:r},e=function(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}.bind(t);return e.listener=r,t.wrapFn=e}function p(t,e,r){t=t._events;if(void 0===t)return[];e=t[e];return void 0===e?[]:"function"==typeof e?r?[e.listener||e]:[e]:r?function(t){for(var e=new Array(t.length),r=0;r<e.length;++r)e[r]=t[r].listener||t[r];return e}(e):f(e,e.length)}function l(t){var e=this._events;if(void 0!==e){t=e[t];if("function"==typeof t)return 1;if(void 0!==t)return t.length}return 0}function f(t,e){for(var r=new Array(e),n=0;n<e;++n)r[n]=t[n];return r}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(t){if("number"!=typeof t||t<0||n(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");o=t}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
i.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||n(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},i.prototype.getMaxListeners=function(){return s(this)},i.prototype.emit=function(t){for(var e=[],r=1;r<arguments.length;r++)e.push(arguments[r]);var n,i="error"===t,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;
// If there is no 'error' event listener then throw.
if(i){if((n=0<e.length?e[0]:n)instanceof Error)
// Note: The comments on the `throw` lines are intentional, they show
// up in Node's output if this results in an unhandled exception.
throw n;// Unhandled 'error' event
// At least give some kind of context to the user
i=new Error("Unhandled error."+(n?" ("+n.message+")":""));throw i.context=n,i;// Unhandled 'error' event
}t=o[t];if(void 0===t)return!1;if("function"==typeof t)u(t,this,e);else for(var s=t.length,a=f(t,s),r=0;r<s;++r)u(a[r],this,e);return!0},i.prototype.addListener=function(t,e){return c(this,t,e,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(t,e){return c(this,t,e,!0)},i.prototype.once=function(t,e){return a(e),this.on(t,h(this,t,e)),this},i.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,h(this,t,e)),this},
// Emits a 'removeListener' event if and only if the listener was removed.
i.prototype.removeListener=function(t,e){var r,n,i,o,s;if(a(e),void 0===(n=this._events))return this;if(void 0===(r=n[t]))return this;if(r===e||r.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete n[t],n.removeListener&&this.emit("removeListener",t,r.listener||e));else if("function"!=typeof r){for(i=-1,o=r.length-1;0<=o;o--)if(r[o]===e||r[o].listener===e){s=r[o].listener,i=o;break}if(i<0)return this;0===i?r.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(r,i),1===r.length&&(n[t]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",t,s||e)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(t){var e,r=this._events;if(void 0===r)return this;
// not listening for removeListener, no need to emit
if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[t]),this;
// emit removeListener for all listeners on all events
if(0===arguments.length){for(var n,i=Object.keys(r),o=0;o<i.length;++o)"removeListener"!==(n=i[o])&&this.removeAllListeners(n);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=r[t]))this.removeListener(t,e);else if(void 0!==e)
// LIFO order
for(o=e.length-1;0<=o;o--)this.removeListener(t,e[o]);return this},i.prototype.listeners=function(t){return p(this,t,!0)},i.prototype.rawListeners=function(t){return p(this,t,!1)},i.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):l.call(t,e)},i.prototype.listenerCount=l,i.prototype.eventNames=function(){return 0<this._eventsCount?r(this._events):[]}},
/***/645:
/***/(t,e)=>{
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
e.read=function(t,e,r,n,i){var o,s,a=8*i-n-1,u=(1<<a)-1,c=u>>1,h=-7,p=r?i-1:0,l=r?-1:1,r=t[e+p];for(p+=l,o=r&(1<<-h)-1,r>>=-h,h+=a;0<h;o=256*o+t[e+p],p+=l,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;0<h;s=256*s+t[e+p],p+=l,h-=8);if(0===o)o=1-c;else{if(o===u)return s?NaN:1/0*(r?-1:1);s+=Math.pow(2,n),o-=c}return(r?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,a,u=8*o-i-1,c=(1<<u)-1,h=c>>1,p=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,l=n?0:o-1,f=n?1:-1,o=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(a=isNaN(e)?1:0,s=c):(s=Math.floor(Math.log(e)/Math.LN2),e*(n=Math.pow(2,-s))<1&&(s--,n*=2),2<=(e+=1<=s+h?p/n:p*Math.pow(2,1-h))*n&&(s++,n/=2),c<=s+h?(a=0,s=c):1<=s+h?(a=(e*n-1)*Math.pow(2,i),s+=h):(a=e*Math.pow(2,h-1)*Math.pow(2,i),s=0));8<=i;t[r+l]=255&a,l+=f,a/=256,i-=8);for(s=s<<i|a,u+=i;0<u;t[r+l]=255&s,l+=f,s/=256,u-=8);t[r+l-f]|=128*o}
/***/},
/***/9509:
/***/(t,e,r)=>{
/* eslint-disable node/no-deprecated-api */
var n=r(8764),i=n.Buffer;
// alternative to using Object.keys for old browsers
function o(t,e){for(var r in t)e[r]=t[r]}function s(t,e,r){return i(t,e,r)}
// Copy static methods from Buffer
i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=n:(
// Copy properties from require('buffer')
o(n,e),e.Buffer=s),o(i,s),s.from=function(t,e,r){if("number"==typeof t)throw new TypeError("Argument must not be a number");return i(t,e,r)},s.alloc=function(t,e,r){if("number"!=typeof t)throw new TypeError("Argument must be a number");t=i(t);return void 0!==e?"string"==typeof r?t.fill(e,r):t.fill(e):t.fill(0),t},s.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return i(t)},s.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return n.SlowBuffer(t)}
/***/},
/***/6099:
/***/(t,e,r)=>{!function(a){// wrapper for non-node envs
a.parser=function(t,e){return new i(t,e)},a.SAXParser=i,a.SAXStream=s,a.createStream=function(t,e){return new s(t,e)},
// When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
// When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
// since that's the earliest that a buffer overrun could occur.  This way, checks are
// as rare as required, but as often as necessary to ensure never crossing this bound.
// Furthermore, buffers are only tested at most once per write(), so passing a very
// large string into write() might have undesirable effects, but this is manageable by
// the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
// edge case, result in creating at most one complete copy of the string passed in.
// Set to Infinity to have unlimited buffers.
a.MAX_BUFFER_LENGTH=65536;var n,u=["comment","sgmlDecl","textNode","tagName","doctype","procInstName","procInstBody","entity","attribName","attribValue","cdata","script"];function i(t,e){if(!(this instanceof i))return new i(t,e);var r=this;!function(t){for(var e=0,r=u.length;e<r;e++)t[u[e]]=""}(r),r.q=r.c="",r.bufferCheckPosition=a.MAX_BUFFER_LENGTH,r.opt=e||{},r.opt.lowercase=r.opt.lowercase||r.opt.lowercasetags,r.looseCase=r.opt.lowercase?"toLowerCase":"toUpperCase",r.tags=[],r.closed=r.closedRoot=r.sawRoot=!1,r.tag=r.error=null,r.strict=!!t,r.noscript=!(!t&&!r.opt.noscript),r.state=I.BEGIN,r.strictEntities=r.opt.strictEntities,r.ENTITIES=r.strictEntities?Object.create(a.XML_ENTITIES):Object.create(a.ENTITIES),r.attribList=[],
// namespaces form a prototype chain.
// it always points at the current tag,
// which protos to its parent tag.
r.opt.xmlns&&(r.ns=Object.create(f)),
// mostly just for error reporting
r.trackPosition=!1!==r.opt.position,r.trackPosition&&(r.position=r.line=r.column=0),_(r,"onready")}a.EVENTS=["text","processinginstruction","sgmldeclaration","doctype","comment","opentagstart","attribute","opentag","closetag","opencdata","cdata","closecdata","error","end","ready","script","opennamespace","closenamespace"],Object.create||(Object.create=function(t){function e(){}return e.prototype=t,new e}),Object.keys||(Object.keys=function(t){var e,r=[];for(e in t)t.hasOwnProperty(e)&&r.push(e);return r}),i.prototype={end:function(){C(this)},write:function(t){var e=this;if(this.error)throw this.error;if(e.closed)return A(e,"Cannot write after close. Assign an onready handler.");if(null===t)return C(e);"object"==typeof t&&(t=t.toString());var r,n,i=0,o="";for(;o=M(t,i++),e.c=o;)switch(e.trackPosition&&(e.position++,"\n"===o?(e.line++,e.column=0):e.column++),e.state){case I.BEGIN:if(e.state=I.BEGIN_WHITESPACE,"\ufeff"===o)continue;F(e,o);continue;case I.BEGIN_WHITESPACE:F(e,o);continue;case I.TEXT:if(e.sawRoot&&!e.closedRoot){for(var s=i-1;o&&"<"!==o&&"&"!==o;)(o=M(t,i++))&&e.trackPosition&&(e.position++,"\n"===o?(e.line++,e.column=0):e.column++);e.textNode+=t.substring(s,i-1)}"<"!==o||e.sawRoot&&e.closedRoot&&!e.strict?(w(o)||e.sawRoot&&!e.closedRoot||x(e,"Text data outside of root node."),"&"===o?e.state=I.TEXT_ENTITY:e.textNode+=o):(e.state=I.OPEN_WAKA,e.startTagPosition=e.position);continue;case I.SCRIPT:
// only non-strict
"<"===o?e.state=I.SCRIPT_ENDING:e.script+=o;continue;case I.SCRIPT_ENDING:"/"===o?e.state=I.CLOSE_TAG:(e.script+="<"+o,e.state=I.SCRIPT);continue;case I.OPEN_WAKA:
// either a /, ?, !, or text is coming next.
"!"===o?(e.state=I.SGML_DECL,e.sgmlDecl=""):w(o)||(E(d,o)?(e.state=I.OPEN_TAG,e.tagName=o):"/"===o?(e.state=I.CLOSE_TAG,e.tagName=""):"?"===o?(e.state=I.PROC_INST,e.procInstName=e.procInstBody=""):(x(e,"Unencoded <"),
// if there was some whitespace, then add that in.
e.startTagPosition+1<e.position&&(s=e.position-e.startTagPosition,o=new Array(s).join(" ")+o),e.textNode+="<"+o,e.state=I.TEXT));continue;case I.SGML_DECL:(e.sgmlDecl+o).toUpperCase()===c?(O(e,"onopencdata"),e.state=I.CDATA,e.sgmlDecl="",e.cdata=""):e.sgmlDecl+o==="--"?(e.state=I.COMMENT,e.comment="",e.sgmlDecl=""):(e.sgmlDecl+o).toUpperCase()===h?(e.state=I.DOCTYPE,(e.doctype||e.sawRoot)&&x(e,"Inappropriately located doctype declaration"),e.doctype="",e.sgmlDecl=""):">"===o?(O(e,"onsgmldeclaration",e.sgmlDecl),e.sgmlDecl="",e.state=I.TEXT):(b(o)&&(e.state=I.SGML_DECL_QUOTED),e.sgmlDecl+=o);continue;case I.SGML_DECL_QUOTED:o===e.q&&(e.state=I.SGML_DECL,e.q=""),e.sgmlDecl+=o;continue;case I.DOCTYPE:">"===o?(e.state=I.TEXT,O(e,"ondoctype",e.doctype),e.doctype=!0):(e.doctype+=o,"["===o?e.state=I.DOCTYPE_DTD:b(o)&&(e.state=I.DOCTYPE_QUOTED,e.q=o));continue;case I.DOCTYPE_QUOTED:e.doctype+=o,o===e.q&&(e.q="",e.state=I.DOCTYPE);continue;case I.DOCTYPE_DTD:e.doctype+=o,"]"===o?e.state=I.DOCTYPE:b(o)&&(e.state=I.DOCTYPE_DTD_QUOTED,e.q=o);continue;case I.DOCTYPE_DTD_QUOTED:e.doctype+=o,o===e.q&&(e.state=I.DOCTYPE_DTD,e.q="");continue;case I.COMMENT:"-"===o?e.state=I.COMMENT_ENDING:e.comment+=o;continue;case I.COMMENT_ENDING:"-"===o?(e.state=I.COMMENT_ENDED,e.comment=N(e.opt,e.comment),e.comment&&O(e,"oncomment",e.comment),e.comment=""):(e.comment+="-"+o,e.state=I.COMMENT);continue;case I.COMMENT_ENDED:">"!==o?(x(e,"Malformed comment"),
// allow <!-- blah -- bloo --> in non-strict mode,
// which is a comment of " blah -- bloo "
e.comment+="--"+o,e.state=I.COMMENT):e.state=I.TEXT;continue;case I.CDATA:"]"===o?e.state=I.CDATA_ENDING:e.cdata+=o;continue;case I.CDATA_ENDING:"]"===o?e.state=I.CDATA_ENDING_2:(e.cdata+="]"+o,e.state=I.CDATA);continue;case I.CDATA_ENDING_2:">"===o?(e.cdata&&O(e,"oncdata",e.cdata),O(e,"onclosecdata"),e.cdata="",e.state=I.TEXT):"]"===o?e.cdata+="]":(e.cdata+="]]"+o,e.state=I.CDATA);continue;case I.PROC_INST:"?"===o?e.state=I.PROC_INST_ENDING:w(o)?e.state=I.PROC_INST_BODY:e.procInstName+=o;continue;case I.PROC_INST_BODY:if(!e.procInstBody&&w(o))continue;"?"===o?e.state=I.PROC_INST_ENDING:e.procInstBody+=o;continue;case I.PROC_INST_ENDING:">"===o?(O(e,"onprocessinginstruction",{name:e.procInstName,body:e.procInstBody}),e.procInstName=e.procInstBody="",e.state=I.TEXT):(e.procInstBody+="?"+o,e.state=I.PROC_INST_BODY);continue;case I.OPEN_TAG:E(y,o)?e.tagName+=o:(function(t){t.strict||(t.tagName=t.tagName[t.looseCase]());var e=t.tags[t.tags.length-1]||t,r=t.tag={name:t.tagName,attributes:{}};
// will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
t.opt.xmlns&&(r.ns=e.ns);t.attribList.length=0,O(t,"onopentagstart",r)}(e),">"===o?L(e):"/"===o?e.state=I.OPEN_TAG_SLASH:(w(o)||x(e,"Invalid character in tag name"),e.state=I.ATTRIB));continue;case I.OPEN_TAG_SLASH:">"===o?(L(e,!0),B(e)):(x(e,"Forward-slash in opening tag not followed by >"),e.state=I.ATTRIB);continue;case I.ATTRIB:
// haven't read the attribute name yet.
if(w(o))continue;">"===o?L(e):"/"===o?e.state=I.OPEN_TAG_SLASH:E(d,o)?(e.attribName=o,e.attribValue="",e.state=I.ATTRIB_NAME):x(e,"Invalid attribute name");continue;case I.ATTRIB_NAME:"="===o?e.state=I.ATTRIB_VALUE:">"===o?(x(e,"Attribute without value"),e.attribValue=e.attribName,S(e),L(e)):w(o)?e.state=I.ATTRIB_NAME_SAW_WHITE:E(y,o)?e.attribName+=o:x(e,"Invalid attribute name");continue;case I.ATTRIB_NAME_SAW_WHITE:if("="===o)e.state=I.ATTRIB_VALUE;else{if(w(o))continue;x(e,"Attribute without value"),e.tag.attributes[e.attribName]="",e.attribValue="",O(e,"onattribute",{name:e.attribName,value:""}),e.attribName="",">"===o?L(e):E(d,o)?(e.attribName=o,e.state=I.ATTRIB_NAME):(x(e,"Invalid attribute name"),e.state=I.ATTRIB)}continue;case I.ATTRIB_VALUE:if(w(o))continue;b(o)?(e.q=o,e.state=I.ATTRIB_VALUE_QUOTED):(x(e,"Unquoted attribute value"),e.state=I.ATTRIB_VALUE_UNQUOTED,e.attribValue=o);continue;case I.ATTRIB_VALUE_QUOTED:if(o!==e.q){"&"===o?e.state=I.ATTRIB_VALUE_ENTITY_Q:e.attribValue+=o;continue}S(e),e.q="",e.state=I.ATTRIB_VALUE_CLOSED;continue;case I.ATTRIB_VALUE_CLOSED:w(o)?e.state=I.ATTRIB:">"===o?L(e):"/"===o?e.state=I.OPEN_TAG_SLASH:E(d,o)?(x(e,"No whitespace between attributes"),e.attribName=o,e.attribValue="",e.state=I.ATTRIB_NAME):x(e,"Invalid attribute name");continue;case I.ATTRIB_VALUE_UNQUOTED:if(!function(t){return">"===t||w(t)}(o)){"&"===o?e.state=I.ATTRIB_VALUE_ENTITY_U:e.attribValue+=o;continue}S(e),">"===o?L(e):e.state=I.ATTRIB;continue;case I.CLOSE_TAG:if(e.tagName)">"===o?B(e):E(y,o)?e.tagName+=o:e.script?(e.script+="</"+e.tagName,e.tagName="",e.state=I.SCRIPT):(w(o)||x(e,"Invalid tagname in closing tag"),e.state=I.CLOSE_TAG_SAW_WHITE);else{if(w(o))continue;!function(t,e){return!E(t,e)}(d,o)?e.tagName=o:e.script?(e.script+="</"+o,e.state=I.SCRIPT):x(e,"Invalid tagname in closing tag.")}continue;case I.CLOSE_TAG_SAW_WHITE:if(w(o))continue;">"===o?B(e):x(e,"Invalid characters in closing tag");continue;case I.TEXT_ENTITY:case I.ATTRIB_VALUE_ENTITY_Q:case I.ATTRIB_VALUE_ENTITY_U:switch(e.state){case I.TEXT_ENTITY:r=I.TEXT,n="textNode";break;case I.ATTRIB_VALUE_ENTITY_Q:r=I.ATTRIB_VALUE_QUOTED,n="attribValue";break;case I.ATTRIB_VALUE_ENTITY_U:r=I.ATTRIB_VALUE_UNQUOTED,n="attribValue"}";"===o?(e[n]+=function(t){var e,r=t.entity,n=r.toLowerCase(),i="";if(t.ENTITIES[r])return t.ENTITIES[r];if(t.ENTITIES[n])return t.ENTITIES[n];"#"===(r=n).charAt(0)&&(i="x"===r.charAt(1)?(r=r.slice(2),(e=parseInt(r,16)).toString(16)):(r=r.slice(1),(e=parseInt(r,10)).toString(10)));if(r=r.replace(/^0+/,""),isNaN(e)||i.toLowerCase()!==r)return x(t,"Invalid character entity"),"&"+t.entity+";";return String.fromCodePoint(e)}(e),e.entity="",e.state=r):E(e.entity.length?m:g,o)?e.entity+=o:(x(e,"Invalid character in entity name"),e[n]+="&"+e.entity+o,e.entity="",e.state=r);continue;default:throw new Error(e,"Unknown state: "+e.state)}// while
e.position>=e.bufferCheckPosition&&function(t){for(var e=Math.max(a.MAX_BUFFER_LENGTH,10),r=0,n=0,i=u.length;n<i;n++){var o=t[u[n]].length;if(e<o)
// Text/cdata nodes can get big, and since they're buffered,
// we can get here under normal conditions.
// Avoid issues by emitting the text node now,
// so at least it won't get any bigger.
switch(u[n]){case"textNode":D(t);break;case"cdata":O(t,"oncdata",t.cdata),t.cdata="";break;case"script":O(t,"onscript",t.script),t.script="";break;default:A(t,"Max buffer length exceeded: "+u[n])}r=Math.max(r,o)}
// schedule the next check for the earliest possible buffer overrun.
var s=a.MAX_BUFFER_LENGTH-r;t.bufferCheckPosition=s+t.position}(e);return e}
/*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
/* istanbul ignore next */,resume:function(){return this.error=null,this},close:function(){return this.write(null)},flush:function(){var t;D(t=this),""!==t.cdata&&(O(t,"oncdata",t.cdata),t.cdata=""),""!==t.script&&(O(t,"onscript",t.script),t.script="")}};try{n=r(3086).Stream}catch(t){n=function(){}}var o=a.EVENTS.filter(function(t){return"error"!==t&&"end"!==t});function s(t,e){if(!(this instanceof s))return new s(t,e);n.apply(this),this._parser=new i(t,e),this.writable=!0,this.readable=!0;var r=this;this._parser.onend=function(){r.emit("end")},this._parser.onerror=function(t){r.emit("error",t),
// if didn't throw, then means error was handled.
// go ahead and clear error, so we can write again.
r._parser.error=null},this._decoder=null,o.forEach(function(e){Object.defineProperty(r,"on"+e,{get:function(){return r._parser["on"+e]},set:function(t){if(!t)return r.removeAllListeners(e),r._parser["on"+e]=t;r.on(e,t)},enumerable:!0,configurable:!1})})}(s.prototype=Object.create(n.prototype,{constructor:{value:s}})).write=function(t){var e;return"function"==typeof Buffer&&"function"==typeof Buffer.isBuffer&&Buffer.isBuffer(t)&&(this._decoder||(e=r(2553)/* .StringDecoder */.s,this._decoder=new e("utf8")),t=this._decoder.write(t)),this._parser.write(t.toString()),this.emit("data",t),!0},s.prototype.end=function(t){return t&&t.length&&this.write(t),this._parser.end(),!0},s.prototype.on=function(e,t){var r=this;return r._parser["on"+e]||-1===o.indexOf(e)||(r._parser["on"+e]=function(){var t=1===arguments.length?[arguments[0]]:Array.apply(null,arguments);t.splice(0,0,e),r.emit.apply(r,t)}),n.prototype.on.call(r,e,t)}
// this really needs to be replaced with character classes.
// XML allows all manner of ridiculous numbers and digits.;
var c="[CDATA[",h="DOCTYPE",p="http://www.w3.org/XML/1998/namespace",l="http://www.w3.org/2000/xmlns/",f={xml:p,xmlns:l},d=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,y=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,g=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,m=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;function w(t){return" "===t||"\n"===t||"\r"===t||"\t"===t}function b(t){return'"'===t||"'"===t}function E(t,e){return t.test(e)}var t,v,T,I=0;for(t in a.STATE={BEGIN:I++,// leading byte order mark or whitespace
BEGIN_WHITESPACE:I++,// leading whitespace
TEXT:I++,// general stuff
TEXT_ENTITY:I++,// &amp and such.
OPEN_WAKA:I++,// <
SGML_DECL:I++,// <!BLARG
SGML_DECL_QUOTED:I++,// <!BLARG foo "bar
DOCTYPE:I++,// <!DOCTYPE
DOCTYPE_QUOTED:I++,// <!DOCTYPE "//blah
DOCTYPE_DTD:I++,// <!DOCTYPE "//blah" [ ...
DOCTYPE_DTD_QUOTED:I++,// <!DOCTYPE "//blah" [ "foo
COMMENT_STARTING:I++,// <!-
COMMENT:I++,// <!--
COMMENT_ENDING:I++,// <!-- blah -
COMMENT_ENDED:I++,// <!-- blah --
CDATA:I++,// <![CDATA[ something
CDATA_ENDING:I++,// ]
CDATA_ENDING_2:I++,// ]]
PROC_INST:I++,// <?hi
PROC_INST_BODY:I++,// <?hi there
PROC_INST_ENDING:I++,// <?hi "there" ?
OPEN_TAG:I++,// <strong
OPEN_TAG_SLASH:I++,// <strong /
ATTRIB:I++,// <a
ATTRIB_NAME:I++,// <a foo
ATTRIB_NAME_SAW_WHITE:I++,// <a foo _
ATTRIB_VALUE:I++,// <a foo=
ATTRIB_VALUE_QUOTED:I++,// <a foo="bar
ATTRIB_VALUE_CLOSED:I++,// <a foo="bar"
ATTRIB_VALUE_UNQUOTED:I++,// <a foo=bar
ATTRIB_VALUE_ENTITY_Q:I++,// <foo bar="&quot;"
ATTRIB_VALUE_ENTITY_U:I++,// <foo bar=&quot
CLOSE_TAG:I++,// </a
CLOSE_TAG_SAW_WHITE:I++,// </a   >
SCRIPT:I++,// <script> ...
SCRIPT_ENDING:I++},a.XML_ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'"},a.ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},Object.keys(a.ENTITIES).forEach(function(t){var e=a.ENTITIES[t],e="number"==typeof e?String.fromCharCode(e):e;a.ENTITIES[t]=e}),a.STATE)a.STATE[a.STATE[t]]=t;
// shorthand
function _(t,e,r){t[e]&&t[e](r)}function O(t,e,r){t.textNode&&D(t),_(t,e,r)}function D(t){t.textNode=N(t.opt,t.textNode),t.textNode&&_(t,"ontext",t.textNode),t.textNode=""}function N(t,e){return t.trim&&(e=e.trim()),e=t.normalize?e.replace(/\s+/g," "):e}function A(t,e){return D(t),t.trackPosition&&(e+="\nLine: "+t.line+"\nColumn: "+t.column+"\nChar: "+t.c),e=new Error(e),t.error=e,_(t,"onerror",e),t}function C(t){return t.sawRoot&&!t.closedRoot&&x(t,"Unclosed root tag"),t.state!==I.BEGIN&&t.state!==I.BEGIN_WHITESPACE&&t.state!==I.TEXT&&A(t,"Unexpected end"),D(t),t.c="",t.closed=!0,_(t,"onend"),i.call(t,t.strict,t.opt),t}function x(t,e){if("object"!=typeof t||!(t instanceof i))throw new Error("bad call to strictFail");t.strict&&A(t,e)}function P(t,e){var r=t.indexOf(":")<0?["",t]:t.split(":"),n=r[0],r=r[1];
// <x "xmlns"="http://foo">
return e&&"xmlns"===t&&(n="xmlns",r=""),{prefix:n,local:r}}function S(t){var e,r,n;t.strict||(t.attribName=t.attribName[t.looseCase]()),-1!==t.attribList.indexOf(t.attribName)||t.tag.attributes.hasOwnProperty(t.attribName)||(t.opt.xmlns?(n=(r=P(t.attribName,!0)).prefix,e=r.local,"xmlns"===n&&(
// namespace binding attribute. push the binding into scope
"xml"===e&&t.attribValue!==p?x(t,"xml: prefix must be bound to "+p+"\nActual: "+t.attribValue):"xmlns"===e&&t.attribValue!==l?x(t,"xmlns: prefix must be bound to "+l+"\nActual: "+t.attribValue):(r=t.tag,n=t.tags[t.tags.length-1]||t,r.ns===n.ns&&(r.ns=Object.create(n.ns)),r.ns[e]=t.attribValue)),
// defer onattribute events until all attributes have been seen
// so any new bindings can take effect. preserve attribute order
// so deferred events can be emitted in document order
t.attribList.push([t.attribName,t.attribValue])):(
// in non-xmlns mode, we can emit the event right away
t.tag.attributes[t.attribName]=t.attribValue,O(t,"onattribute",{name:t.attribName,value:t.attribValue}))),t.attribName=t.attribValue=""}function L(e,t){if(e.opt.xmlns){
// emit namespace binding events
var r=e.tag,n=P(e.tagName);
// add namespace info to tag
r.prefix=n.prefix,r.local=n.local,r.uri=r.ns[n.prefix]||"",r.prefix&&!r.uri&&(x(e,"Unbound namespace prefix: "+JSON.stringify(e.tagName)),r.uri=n.prefix);n=e.tags[e.tags.length-1]||e;r.ns&&n.ns!==r.ns&&Object.keys(r.ns).forEach(function(t){O(e,"onopennamespace",{prefix:t,uri:r.ns[t]})});
// handle deferred onattribute events
// Note: do not apply default ns to attributes:
//   http://www.w3.org/TR/REC-xml-names/#defaulting
for(var i=0,o=e.attribList.length;i<o;i++){var s=e.attribList[i],a=s[0],u=s[1],c=P(a,!0),h=c.prefix,s=c.local,c=""!==h&&r.ns[h]||"",s={name:a,value:u,prefix:h,local:s,uri:c};
// if there's any attributes with an undefined namespace,
// then fail on them now.
h&&"xmlns"!==h&&!c&&(x(e,"Unbound namespace prefix: "+JSON.stringify(h)),s.uri=h),e.tag.attributes[a]=s,O(e,"onattribute",s)}e.attribList.length=0}e.tag.isSelfClosing=!!t,
// process the tag
e.sawRoot=!0,e.tags.push(e.tag),O(e,"onopentag",e.tag),t||(
// special case for <script> in non-strict mode.
e.noscript||"script"!==e.tagName.toLowerCase()?e.state=I.TEXT:e.state=I.SCRIPT,e.tag=null,e.tagName=""),e.attribName=e.attribValue="",e.attribList.length=0}function B(r){if(!r.tagName)return x(r,"Weird empty close tag."),r.textNode+="</>",void(r.state=I.TEXT);if(r.script){if("script"!==r.tagName)return r.script+="</"+r.tagName+">",r.tagName="",void(r.state=I.SCRIPT);O(r,"onscript",r.script),r.script=""}
// first make sure that the closing tag actually exists.
// <a><b></c></b></a> will close everything, otherwise.
for(var t=r.tags.length,e=r.tagName,n=e=!r.strict?e[r.looseCase]():e;t--;){if(r.tags[t].name===n)break;
// fail the first time in strict mode
x(r,"Unexpected close tag")}
// didn't find it.  we already failed for strict, so just abort.
if(t<0)return x(r,"Unmatched closing tag: "+r.tagName),r.textNode+="</"+r.tagName+">",void(r.state=I.TEXT);r.tagName=e;for(var i=r.tags.length;i-- >t;){var o=r.tag=r.tags.pop();r.tagName=r.tag.name,O(r,"onclosetag",r.tagName);var s,a={};for(s in o.ns)a[s]=o.ns[s];var u=r.tags[r.tags.length-1]||r;r.opt.xmlns&&o.ns!==u.ns&&
// remove namespace bindings introduced by tag
Object.keys(o.ns).forEach(function(t){var e=o.ns[t];O(r,"onclosenamespace",{prefix:t,uri:e})})}0===t&&(r.closedRoot=!0),r.tagName=r.attribValue=r.attribName="",r.attribList.length=0,r.state=I.TEXT}function F(t,e){"<"===e?(t.state=I.OPEN_WAKA,t.startTagPosition=t.position):w(e)||(
// have to process this as a text node.
// weird, but happens.
x(t,"Non-whitespace before first tag."),t.textNode=e,t.state=I.TEXT)}function M(t,e){var r="";return r=e<t.length?t.charAt(e):r}function e(){var t=[],e=-1,r=arguments.length;if(!r)return"";for(var n="";++e<r;){var i=Number(arguments[e]);if(!isFinite(i)||// `NaN`, `+Infinity`, or `-Infinity`
i<0||// not a valid Unicode code point
1114111<i||// not a valid Unicode code point
T(i)!==i)throw RangeError("Invalid code point: "+i);i<=65535?// BMP code point
t.push(i):(// Astral code point; split in surrogate halves
// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
i-=65536,t.push(55296+(i>>10),i%1024+56320)),(e+1===r||16384<t.length)&&(n+=v.apply(null,t),t.length=0)}return n}
/* istanbul ignore next */I=a.STATE,String.fromCodePoint||(v=String.fromCharCode,T=Math.floor,Object.defineProperty?Object.defineProperty(String,"fromCodePoint",{value:e,configurable:!0,writable:!0}):String.fromCodePoint=e)}(e)
/***/},
/***/3086:
/***/(t,e,r)=>{
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var n=r(624);function i(){n.call(this)}i.prototype=new n,(
// Backwards-compat with node 0.4.x
(t.exports=i).Stream=i).prototype.pipe=function(e,t){var r=this;function n(t){e.writable&&!1===e.write(t)&&r.pause&&r.pause()}function i(){r.readable&&r.resume&&r.resume()}r.on("data",n),e.on("drain",i),
// If the 'end' option is not supplied, dest.end() will be called when
// source gets the 'end' or 'close' events.  Only dest.end() once.
e._isStdio||t&&!1===t.end||(r.on("end",s),r.on("close",a));var o=!1;function s(){o||(o=!0,e.end())}function a(){o||(o=!0,"function"==typeof e.destroy&&e.destroy())}
// don't leave dangling pipes when there are errors.
function u(t){if(c(),!this.hasListeners("error"))throw t;// Unhandled stream error in pipe.
}
// remove all the event listeners that were added.
function c(){r.off("data",n),e.off("drain",i),r.off("end",s),r.off("close",a),r.off("error",u),e.off("error",u),r.off("end",c),r.off("close",c),e.off("end",c),e.off("close",c)}
// Allow for unix-like usage: A.pipe(B).pipe(C)
return r.on("error",u),e.on("error",u),r.on("end",c),r.on("close",c),e.on("end",c),e.on("close",c),e.emit("pipe",r),e}
/***/},
/***/2553:
/***/(t,e,r)=>{"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/var n=r(9509).Buffer,i=n.isEncoding||function(t){switch((t=""+t)&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};
/*</replacement>*/
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function o(t){var e=function(t){if(!t)return"utf8";for(var e;;)switch(t){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return t;default:if(e)return;// undefined
t=(""+t).toLowerCase(),e=!0}}(t);if("string"!=typeof e&&(n.isEncoding===i||!i(t)))throw new Error("Unknown encoding: "+t);return e||t}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
function s(t){var e;switch(this.encoding=o(t),this.encoding){case"utf16le":this.text=c,this.end=h,e=4;break;case"utf8":this.fillLast=u,e=4;break;case"base64":this.text=p,this.end=l,e=3;break;default:return this.write=f,void(this.end=d)}this.lastNeed=0,this.lastTotal=0,this.lastChar=n.allocUnsafe(e)}
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function a(t){return t<=127?0:t>>5==6?2:t>>4==14?3:t>>3==30?4:t>>6==2?-1:-2}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function u(t){var e,r,n=this.lastTotal-this.lastNeed,e=(e=this,128!=(192&(r=t)[0])?(e.lastNeed=0,"�"):1<e.lastNeed&&1<r.length?128!=(192&r[1])?(e.lastNeed=1,"�"):2<e.lastNeed&&2<r.length&&128!=(192&r[2])?(e.lastNeed=2,"�"):void 0:void 0);return void 0!==e?e:this.lastNeed<=t.length?(t.copy(this.lastChar,n,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(t.copy(this.lastChar,n,0,t.length),void(this.lastNeed-=t.length))}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function c(t,e){if((t.length-e)%2!=0)return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=t[t.length-1],t.toString("utf16le",e,t.length-1);var r=t.toString("utf16le",e);if(r){e=r.charCodeAt(r.length-1);if(55296<=e&&e<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1],r.slice(0,-1)}return r}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function h(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed){t=this.lastTotal-this.lastNeed;return e+this.lastChar.toString("utf16le",0,t)}return e}function p(t,e){var r=(t.length-e)%3;return 0==r?t.toString("base64",e):(this.lastNeed=3-r,this.lastTotal=3,1==r?this.lastChar[0]=t[t.length-1]:(this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1]),t.toString("base64",e,t.length-r))}function l(t){t=t&&t.length?this.write(t):"";return this.lastNeed?t+this.lastChar.toString("base64",0,3-this.lastNeed):t}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function f(t){return t.toString(this.encoding)}function d(t){return t&&t.length?this.write(t):""}
/***/(e.s=s).prototype.write=function(t){if(0===t.length)return"";var e,r;if(this.lastNeed){if(void 0===(e=this.fillLast(t)))return"";r=this.lastNeed,this.lastNeed=0}else r=0;return r<t.length?e?e+this.text(t,r):this.text(t,r):e||""},s.prototype.end=
// For UTF-8, a replacement character is added when ending on a partial
// character.
function(t){t=t&&t.length?this.write(t):"";return this.lastNeed?t+"�":t},
// Returns only complete characters in a Buffer
s.prototype.text=function(t,e){var r=function(t,e,r){var n=e.length-1;if(n<r)return 0;var i=a(e[n]);if(0<=i)return 0<i&&(t.lastNeed=i-1),i;if(--n<r||-2===i)return 0;if(0<=(i=a(e[n])))return 0<i&&(t.lastNeed=i-2),i;if(--n<r||-2===i)return 0;if(0<=(i=a(e[n])))return 0<i&&(2===i?i=0:t.lastNeed=i-3),i;return 0}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
(this,t,e);if(!this.lastNeed)return t.toString("utf8",e);this.lastTotal=r;r=t.length-(r-this.lastNeed);return t.copy(this.lastChar,0,r),t.toString("utf8",e,r)},
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
s.prototype.fillLast=function(t){if(this.lastNeed<=t.length)return t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,t.length),this.lastNeed-=t.length}},
/***/5663:
/***/(t,e)=>{var r,n={millisecond:1,second:1e3,minute:6e4,hour:36e5,day:864e5};for(r in n)"millisecond"===r?n.ms=n[r]:n[r.charAt(0)]=n[r],n[r+"s"]=n[r];
/*
  Every constructor
*/},
/***/306:
/***/function(t,e){
// Generated by CoffeeScript 1.12.7
!function(){"use strict";e.stripBOM=function(t){return"\ufeff"===t[0]?t.substring(1):t}}.call(this);
/***/},
/***/4096:
/***/function(t,n,o){
// Generated by CoffeeScript 1.12.7
!function(){"use strict";var r,i,e,l,f,d={}.hasOwnProperty;function t(t){var e,r,n;for(e in this.options={},r=i[.2])d.call(r,e)&&(n=r[e],this.options[e]=n);for(e in t)d.call(t,e)&&(n=t[e],this.options[e]=n)}r=o(5532),i=o(8381).defaults,l=function(t){return"string"==typeof t&&(0<=t.indexOf("&")||0<=t.indexOf(">")||0<=t.indexOf("<"))},f=function(t){return"<![CDATA["+e(t)+"]]>"},e=function(t){return t.replace("]]>","]]]]><![CDATA[>")},n.Builder=(t.prototype.buildObject=function(t){var u,e,c,h=this.options.attrkey,p=this.options.charkey;return 1===Object.keys(t).length&&this.options.rootName===i[.2].rootName?t=t[e=Object.keys(t)[0]]:e=this.options.rootName,c=this,u=function(t,e){var r,n,i,o,s,a;if("object"!=typeof e)c.options.cdata&&l(e)?t.raw(f(e)):t.txt(e);else if(Array.isArray(e)){for(o in e)if(d.call(e,o))for(s in n=e[o])i=n[s],t=u(t.ele(s),i).up()}else for(s in e)if(d.call(e,s))if(n=e[s],s===h){if("object"==typeof n)for(r in n)a=n[r],t=t.att(r,a)}else if(s===p)t=c.options.cdata&&l(n)?t.raw(f(n)):t.txt(n);else if(Array.isArray(n))for(o in n)d.call(n,o)&&(t=("string"==typeof(i=n[o])?c.options.cdata&&l(i)?t.ele(s).raw(f(i)):t.ele(s,i):u(t.ele(s),i)).up());else t="object"==typeof n?u(t.ele(s),n).up():"string"==typeof n&&c.options.cdata&&l(n)?t.ele(s).raw(f(n)).up():(null==n&&(n=""),t.ele(s,n.toString()).up());return t},e=r.create(e,this.options.xmldec,this.options.doctype,{headless:this.options.headless,allowSurrogateChars:this.options.allowSurrogateChars}),u(e,t).end(this.options.renderOpts)},t)}.call(this);
/***/},
/***/8381:
/***/function(t,e){
// Generated by CoffeeScript 1.12.7
!function(){e.defaults={.1:{explicitCharkey:!1,trim:!0,normalize:!0,normalizeTags:!1,attrkey:"@",charkey:"#",explicitArray:!1,ignoreAttrs:!1,mergeAttrs:!1,explicitRoot:!1,validator:null,xmlns:!1,explicitChildren:!1,childkey:"@@",charsAsChildren:!1,includeWhiteChars:!1,async:!1,strict:!0,attrNameProcessors:null,attrValueProcessors:null,tagNameProcessors:null,valueProcessors:null,emptyTag:""},.2:{explicitCharkey:!1,trim:!1,normalize:!1,normalizeTags:!1,attrkey:"$",charkey:"_",explicitArray:!0,ignoreAttrs:!1,mergeAttrs:!1,explicitRoot:!0,validator:null,xmlns:!1,explicitChildren:!1,preserveChildrenOrder:!1,childkey:"$$",charsAsChildren:!1,includeWhiteChars:!1,async:!1,strict:!0,attrNameProcessors:null,attrValueProcessors:null,tagNameProcessors:null,valueProcessors:null,rootName:"root",xmldec:{version:"1.0",encoding:"UTF-8",standalone:!0},doctype:null,renderOpts:{pretty:!0,indent:"  ",newline:"\n"},headless:!1,chunkSize:1e4,emptyTag:"",cdata:!1}}}.call(this);
/***/},
/***/9082:
/***/function(t,a,c){
// Generated by CoffeeScript 1.12.7
!function(){"use strict";function i(t,e){return function(){return t.apply(e,arguments)}}var t,o,e,l,f,s,u,n,d={}.hasOwnProperty;function r(t){var e,r,n;if(this.parseStringPromise=i(this.parseStringPromise,this),this.parseString=i(this.parseString,this),this.reset=i(this.reset,this),this.assignOrPush=i(this.assignOrPush,this),this.processAsync=i(this.processAsync,this),!(this instanceof a.Parser))return new a.Parser(t);for(e in this.options={},r=o[.2])d.call(r,e)&&(n=r[e],this.options[e]=n);for(e in t)d.call(t,e)&&(n=t[e],this.options[e]=n);this.options.xmlns&&(this.options.xmlnskey=this.options.attrkey+"ns"),this.options.normalizeTags&&(this.options.tagNameProcessors||(this.options.tagNameProcessors=[]),this.options.tagNameProcessors.unshift(s.normalize)),this.reset()}u=c(6099),e=c(7187),t=c(306),s=c(7526),n=c(5663).setImmediate,o=c(8381).defaults,l=function(t){return"object"==typeof t&&null!=t&&0===Object.keys(t).length},f=function(t,e,r){for(var n=0,i=t.length;n<i;n++)e=(0,t[n])(e,r);return e},a.Parser=(function(t,e){for(var r in e)d.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(r,e),r.prototype.processAsync=function(){var e;try{return this.remaining.length<=this.options.chunkSize?(e=this.remaining,this.remaining="",this.saxParser=this.saxParser.write(e),this.saxParser.close()):(e=this.remaining.substr(0,this.options.chunkSize),this.remaining=this.remaining.substr(this.options.chunkSize,this.remaining.length),this.saxParser=this.saxParser.write(e),n(this.processAsync))}catch(t){if(e=t,!this.saxParser.errThrown)return this.saxParser.errThrown=!0,this.emit(e)}},r.prototype.assignOrPush=function(t,e,r){return e in t?(t[e]instanceof Array||(t[e]=[t[e]]),t[e].push(r)):this.options.explicitArray?t[e]=[r]:t[e]=r},r.prototype.reset=function(){var s,c,e,h,r,t,a,p,n;return this.removeAllListeners(),this.saxParser=u.parser(this.options.strict,{trim:!1,normalize:!1,xmlns:this.options.xmlns}),this.saxParser.errThrown=!1,this.saxParser.onerror=(r=this,function(t){if(r.saxParser.resume(),!r.saxParser.errThrown)return r.saxParser.errThrown=!0,r.emit("error",t)}),this.saxParser.onend=(t=this,function(){if(!t.saxParser.ended)return t.saxParser.ended=!0,t.emit("end",t.resultObject)}),this.saxParser.ended=!1,this.EXPLICIT_CHARKEY=this.options.explicitCharkey,this.resultObject=null,h=[],s=this.options.attrkey,c=this.options.charkey,this.saxParser.onopentag=(a=this,function(t){var e,r,n,i,o={};if(o[c]="",!a.options.ignoreAttrs)for(e in i=t.attributes)d.call(i,e)&&(s in o||a.options.mergeAttrs||(o[s]={}),r=a.options.attrValueProcessors?f(a.options.attrValueProcessors,t.attributes[e],e):t.attributes[e],n=a.options.attrNameProcessors?f(a.options.attrNameProcessors,e):e,a.options.mergeAttrs?a.assignOrPush(o,n,r):o[s][n]=r);return o["#name"]=a.options.tagNameProcessors?f(a.options.tagNameProcessors,t.name):t.name,a.options.xmlns&&(o[a.options.xmlnskey]={uri:t.uri,local:t.local}),h.push(o)}),this.saxParser.onclosetag=(p=this,function(){var t,e,n,r,i,o,s,a=h.pop(),u=a["#name"];if(p.options.explicitChildren&&p.options.preserveChildrenOrder||delete a["#name"],!0===a.cdata&&(t=a.cdata,delete a.cdata),o=h[h.length-1],a[c].match(/^\s*$/)&&!t?(i=a[c],delete a[c]):(p.options.trim&&(a[c]=a[c].trim()),p.options.normalize&&(a[c]=a[c].replace(/\s{2,}/g," ").trim()),a[c]=p.options.valueProcessors?f(p.options.valueProcessors,a[c],u):a[c],1===Object.keys(a).length&&c in a&&!p.EXPLICIT_CHARKEY&&(a=a[c])),l(a)&&(a=""!==p.options.emptyTag?p.options.emptyTag:i),null!=p.options.validator&&(s="/"+function(){for(var t=[],e=0,r=h.length;e<r;e++)n=h[e],t.push(n["#name"]);return t}().concat(u).join("/"),function(){try{a=p.options.validator(s,o&&o[u],a)}catch(t){return p.emit("error",t)}}()),p.options.explicitChildren&&!p.options.mergeAttrs&&"object"==typeof a)if(p.options.preserveChildrenOrder){if(o){for(e in o[p.options.childkey]=o[p.options.childkey]||[],r={},a)d.call(a,e)&&(r[e]=a[e]);o[p.options.childkey].push(r),delete a["#name"],1===Object.keys(a).length&&c in a&&!p.EXPLICIT_CHARKEY&&(a=a[c])}}else n={},p.options.attrkey in a&&(n[p.options.attrkey]=a[p.options.attrkey],delete a[p.options.attrkey]),!p.options.charsAsChildren&&p.options.charkey in a&&(n[p.options.charkey]=a[p.options.charkey],delete a[p.options.charkey]),0<Object.getOwnPropertyNames(a).length&&(n[p.options.childkey]=a),a=n;return 0<h.length?p.assignOrPush(o,u,a):(p.options.explicitRoot&&(i=a,(a={})[u]=i),p.resultObject=a,p.saxParser.ended=!0,p.emit("end",p.resultObject))}),(n=this).saxParser.ontext=e=function(t){var e,r=h[h.length-1];if(r)return r[c]+=t,n.options.explicitChildren&&n.options.preserveChildrenOrder&&n.options.charsAsChildren&&(n.options.includeWhiteChars||""!==t.replace(/\\n/g,"").trim())&&(r[n.options.childkey]=r[n.options.childkey]||[],(e={"#name":"__text__"})[c]=t,n.options.normalize&&(e[c]=e[c].replace(/\s{2,}/g," ").trim()),r[n.options.childkey].push(e)),r},this.saxParser.oncdata=function(t){t=e(t);if(t)return t.cdata=!0}},r.prototype.parseString=function(e,r){null!=r&&"function"==typeof r&&(this.on("end",function(t){return this.reset(),r(null,t)}),this.on("error",function(t){return this.reset(),r(t)}));try{return""===(e=e.toString()).trim()?(this.emit("end",null),!0):(e=t.stripBOM(e),this.options.async?(this.remaining=e,n(this.processAsync),this.saxParser):this.saxParser.write(e).close())}catch(t){if(e=t,!this.saxParser.errThrown&&!this.saxParser.ended)return this.emit("error",e),this.saxParser.errThrown=!0;if(this.saxParser.ended)throw e}},r.prototype.parseStringPromise=function(t){return new Promise((e=this,function(r,n){return e.parseString(t,function(t,e){return t?n(t):r(e)})}));var e},r),a.parseString=function(t,e,r){var n,i;return null!=r?("function"==typeof r&&(n=r),"object"==typeof e&&(i=e)):("function"==typeof e&&(n=e),i={}),new a.Parser(i).parseString(t,n)},a.parseStringPromise=function(t,e){var r;return new a.Parser(r="object"==typeof e?e:r).parseStringPromise(t)}}.call(this);
/***/},
/***/7526:
/***/function(t,r){
// Generated by CoffeeScript 1.12.7
!function(){"use strict";var e=new RegExp(/(?!xmlns)^.*:/);r.normalize=function(t){return t.toLowerCase()},r.firstCharLowerCase=function(t){return t.charAt(0).toLowerCase()+t.slice(1)},r.stripPrefix=function(t){return t.replace(e,"")},r.parseNumbers=function(t){return t=!isNaN(t)?t%1==0?parseInt(t,10):parseFloat(t):t},r.parseBooleans=function(t){return t=/^(?:true|false)$/i.test(t)?"true"===t.toLowerCase():t}}.call(this);
/***/},
/***/5055:
/***/function(t,s,a){
// Generated by CoffeeScript 1.12.7
!function(){"use strict";var t,e,r,n,i={}.hasOwnProperty;function o(t){this.message=t}e=a(8381),t=a(4096),r=a(9082),n=a(7526),s.defaults=e.defaults,s.processors=n,s.ValidationError=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(o,Error),o),s.Builder=t.Builder,s.Parser=r.Parser,s.parseString=r.parseString,s.parseStringPromise=r.parseStringPromise}.call(this);
/***/},
/***/7557:
/***/function(t){
// Generated by CoffeeScript 1.12.7
!function(){t.exports={Disconnected:1,Preceding:2,Following:4,Contains:8,ContainedBy:16,ImplementationSpecific:32}}.call(this);
/***/},
/***/9335:
/***/function(t){
// Generated by CoffeeScript 1.12.7
!function(){t.exports={Element:1,Attribute:2,Text:3,CData:4,EntityReference:5,EntityDeclaration:6,ProcessingInstruction:7,Comment:8,Document:9,DocType:10,DocumentFragment:11,NotationDeclaration:12,Declaration:201,Raw:202,AttributeDeclaration:203,ElementDeclaration:204,Dummy:205}}.call(this);
/***/},
/***/8369:
/***/function(c){
// Generated by CoffeeScript 1.12.7
!function(){var s=[].slice,a={}.hasOwnProperty,t=function(){var t,e,r,n,i=arguments[0],o=2<=arguments.length?s.call(arguments,1):[];if(u(Object.assign))Object.assign.apply(null,arguments);else for(t=0,r=o.length;t<r;t++)if(null!=(n=o[t]))for(e in n)a.call(n,e)&&(i[e]=n[e]);return i},u=function(t){return!!t&&"[object Function]"===Object.prototype.toString.call(t)},n=function(t){return!!t&&("function"==(t=typeof t)||"object"==t)},r=function(t){return u(Array.isArray)?Array.isArray(t):"[object Array]"===Object.prototype.toString.call(t)},e=function(t){if(r(t))return!t.length;for(var e in t)if(a.call(t,e))return!1;return!0},i=function(t){var e,r;return n(t)&&(r=Object.getPrototypeOf(t))&&(e=r.constructor)&&"function"==typeof e&&e instanceof e&&Function.prototype.toString.call(e)===Function.prototype.toString.call(Object)},o=function(t){return u(t.valueOf)?t.valueOf():t};c.exports.assign=t,c.exports.isFunction=u,c.exports.isObject=n,c.exports.isArray=r,c.exports.isEmpty=e,c.exports.isPlainObject=i,c.exports.getValue=o}.call(this);
/***/},
/***/594:
/***/function(t){
// Generated by CoffeeScript 1.12.7
!function(){t.exports={None:0,OpenTag:1,InsideTag:2,CloseTag:3}}.call(this);
/***/},
/***/2750:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var n;function t(t,e,r){if(this.parent=t,this.parent&&(this.options=this.parent.options,this.stringify=this.parent.stringify),null==e)throw new Error("Missing attribute name. "+this.debugInfo(e));this.name=this.stringify.name(e),this.value=this.stringify.attValue(r),this.type=n.Attribute,this.isId=!1,this.schemaTypeInfo=null}n=r(9335),r(2026),e.exports=(Object.defineProperty(t.prototype,"nodeType",{get:function(){return this.type}}),Object.defineProperty(t.prototype,"ownerElement",{get:function(){return this.parent}}),Object.defineProperty(t.prototype,"textContent",{get:function(){return this.value},set:function(t){return this.value=t||""}}),Object.defineProperty(t.prototype,"namespaceURI",{get:function(){return""}}),Object.defineProperty(t.prototype,"prefix",{get:function(){return""}}),Object.defineProperty(t.prototype,"localName",{get:function(){return this.name}}),Object.defineProperty(t.prototype,"specified",{get:function(){return!0}}),t.prototype.clone=function(){return Object.create(this)},t.prototype.toString=function(t){return this.options.writer.attribute(this,this.options.writer.filterOptions(t))},t.prototype.debugInfo=function(t){return null==(t=t||this.name)?"parent: <"+this.parent.name+">":"attribute: {"+t+"}, parent: <"+this.parent.name+">"},t.prototype.isEqualNode=function(t){return t.namespaceURI===this.namespaceURI&&(t.prefix===this.prefix&&(t.localName===this.localName&&t.value===this.value))},t)}.call(this);
/***/},
/***/6170:
/***/function(e,t,o){
// Generated by CoffeeScript 1.12.7
!function(){var r,t,i={}.hasOwnProperty;function n(t,e){if(n.__super__.constructor.call(this,t),null==e)throw new Error("Missing CDATA text. "+this.debugInfo());this.name="#cdata-section",this.type=r.CData,this.value=this.stringify.cdata(e)}r=o(9335),t=o(6488),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(n,t),n.prototype.clone=function(){return Object.create(this)},n.prototype.toString=function(t){return this.options.writer.cdata(this,this.options.writer.filterOptions(t))},n)}.call(this);
/***/},
/***/6488:
/***/function(r,t,n){
// Generated by CoffeeScript 1.12.7
!function(){var t,i={}.hasOwnProperty;function e(t){e.__super__.constructor.call(this,t),this.value=""}t=n(2026),r.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(e,t),Object.defineProperty(e.prototype,"data",{get:function(){return this.value},set:function(t){return this.value=t||""}}),Object.defineProperty(e.prototype,"length",{get:function(){return this.value.length}}),Object.defineProperty(e.prototype,"textContent",{get:function(){return this.value},set:function(t){return this.value=t||""}}),e.prototype.clone=function(){return Object.create(this)},e.prototype.substringData=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},e.prototype.appendData=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},e.prototype.insertData=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},e.prototype.deleteData=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},e.prototype.replaceData=function(t,e,r){throw new Error("This DOM method is not implemented."+this.debugInfo())},e.prototype.isEqualNode=function(t){return!!e.__super__.isEqualNode.apply(this,arguments).isEqualNode(t)&&t.data===this.data},e)}.call(this);
/***/},
/***/2096:
/***/function(e,t,o){
// Generated by CoffeeScript 1.12.7
!function(){var r,t,i={}.hasOwnProperty;function n(t,e){if(n.__super__.constructor.call(this,t),null==e)throw new Error("Missing comment text. "+this.debugInfo());this.name="#comment",this.type=r.Comment,this.value=this.stringify.comment(e)}r=o(9335),t=o(6488),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(n,t),n.prototype.clone=function(){return Object.create(this)},n.prototype.toString=function(t){return this.options.writer.comment(this,this.options.writer.filterOptions(t))},n)}.call(this);
/***/},
/***/383:
/***/function(n,t,i){
// Generated by CoffeeScript 1.12.7
!function(){var t,e;function r(){this.defaultParams={"canonical-form":!1,"cdata-sections":!1,comments:!1,"datatype-normalization":!1,"element-content-whitespace":!0,entities:!0,"error-handler":new t,infoset:!0,"validate-if-schema":!1,namespaces:!0,"namespace-declarations":!0,"normalize-characters":!1,"schema-location":"","schema-type":"","split-cdata-sections":!0,validate:!1,"well-formed":!0},this.params=Object.create(this.defaultParams)}t=i(3933),e=i(6210),n.exports=(Object.defineProperty(r.prototype,"parameterNames",{get:function(){return new e(Object.keys(this.defaultParams))}}),r.prototype.getParameter=function(t){return this.params.hasOwnProperty(t)?this.params[t]:null},r.prototype.canSetParameter=function(t,e){return!0},r.prototype.setParameter=function(t,e){return null!=e?this.params[t]=e:delete this.params[t]},r)}.call(this);
/***/},
/***/3933:
/***/function(e){
// Generated by CoffeeScript 1.12.7
!function(){function t(){}e.exports=(t.prototype.handleError=function(t){throw new Error(t)},t)}.call(this);
/***/},
/***/1770:
/***/function(e){
// Generated by CoffeeScript 1.12.7
!function(){function t(){}e.exports=(t.prototype.hasFeature=function(t,e){return!0},t.prototype.createDocumentType=function(t,e,r){throw new Error("This DOM method is not implemented.")},t.prototype.createDocument=function(t,e,r){throw new Error("This DOM method is not implemented.")},t.prototype.createHTMLDocument=function(t){throw new Error("This DOM method is not implemented.")},t.prototype.getFeature=function(t,e){throw new Error("This DOM method is not implemented.")},t)}.call(this);
/***/},
/***/6210:
/***/function(e){
// Generated by CoffeeScript 1.12.7
!function(){function t(t){this.arr=t||[]}e.exports=(Object.defineProperty(t.prototype,"length",{get:function(){return this.arr.length}}),t.prototype.item=function(t){return this.arr[t]||null},t.prototype.contains=function(t){return-1!==this.arr.indexOf(t)},t)}.call(this);
/***/},
/***/1179:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var s,t,i={}.hasOwnProperty;function a(t,e,r,n,i,o){if(a.__super__.constructor.call(this,t),null==e)throw new Error("Missing DTD element name. "+this.debugInfo());if(null==r)throw new Error("Missing DTD attribute name. "+this.debugInfo(e));if(!n)throw new Error("Missing DTD attribute type. "+this.debugInfo(e));if(!i)throw new Error("Missing DTD attribute default. "+this.debugInfo(e));if(!(i=0!==i.indexOf("#")?"#"+i:i).match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/))throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. "+this.debugInfo(e));if(o&&!i.match(/^(#FIXED|#DEFAULT)$/))throw new Error("Default value only applies to #FIXED or #DEFAULT. "+this.debugInfo(e));this.elementName=this.stringify.name(e),this.type=s.AttributeDeclaration,this.attributeName=this.stringify.name(r),this.attributeType=this.stringify.dtdAttType(n),o&&(this.defaultValue=this.stringify.dtdAttDefault(o)),this.defaultValueType=i}t=r(2026),s=r(9335),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(a,t),a.prototype.toString=function(t){return this.options.writer.dtdAttList(this,this.options.writer.filterOptions(t))},a)}.call(this);
/***/},
/***/6347:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var n,t,i={}.hasOwnProperty;function o(t,e,r){if(o.__super__.constructor.call(this,t),null==e)throw new Error("Missing DTD element name. "+this.debugInfo());r=r||"(#PCDATA)",Array.isArray(r)&&(r="("+r.join(",")+")"),this.name=this.stringify.name(e),this.type=n.ElementDeclaration,this.value=this.stringify.dtdElementValue(r)}t=r(2026),n=r(9335),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(o,t),o.prototype.toString=function(t){return this.options.writer.dtdElement(this,this.options.writer.filterOptions(t))},o)}.call(this);
/***/},
/***/9078:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var i,t,o,s={}.hasOwnProperty;function a(t,e,r,n){if(a.__super__.constructor.call(this,t),null==r)throw new Error("Missing DTD entity name. "+this.debugInfo(r));if(null==n)throw new Error("Missing DTD entity value. "+this.debugInfo(r));if(this.pe=!!e,this.name=this.stringify.name(r),this.type=i.EntityDeclaration,o(n)){if(!n.pubID&&!n.sysID)throw new Error("Public and/or system identifiers are required for an external entity. "+this.debugInfo(r));if(n.pubID&&!n.sysID)throw new Error("System identifier is required for a public external entity. "+this.debugInfo(r));if(this.internal=!1,null!=n.pubID&&(this.pubID=this.stringify.dtdPubID(n.pubID)),null!=n.sysID&&(this.sysID=this.stringify.dtdSysID(n.sysID)),null!=n.nData&&(this.nData=this.stringify.dtdNData(n.nData)),this.pe&&this.nData)throw new Error("Notation declaration is not allowed in a parameter entity. "+this.debugInfo(r))}else this.value=this.stringify.dtdEntityValue(n),this.internal=!0}o=r(8369).isObject,t=r(2026),i=r(9335),e.exports=(function(t,e){for(var r in e)s.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(a,t),Object.defineProperty(a.prototype,"publicId",{get:function(){return this.pubID}}),Object.defineProperty(a.prototype,"systemId",{get:function(){return this.sysID}}),Object.defineProperty(a.prototype,"notationName",{get:function(){return this.nData||null}}),Object.defineProperty(a.prototype,"inputEncoding",{get:function(){return null}}),Object.defineProperty(a.prototype,"xmlEncoding",{get:function(){return null}}),Object.defineProperty(a.prototype,"xmlVersion",{get:function(){return null}}),a.prototype.toString=function(t){return this.options.writer.dtdEntity(this,this.options.writer.filterOptions(t))},a)}.call(this);
/***/},
/***/4777:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var n,t,i={}.hasOwnProperty;function o(t,e,r){if(o.__super__.constructor.call(this,t),null==e)throw new Error("Missing DTD notation name. "+this.debugInfo(e));if(!r.pubID&&!r.sysID)throw new Error("Public or system identifiers are required for an external entity. "+this.debugInfo(e));this.name=this.stringify.name(e),this.type=n.NotationDeclaration,null!=r.pubID&&(this.pubID=this.stringify.dtdPubID(r.pubID)),null!=r.sysID&&(this.sysID=this.stringify.dtdSysID(r.sysID))}t=r(2026),n=r(9335),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(o,t),Object.defineProperty(o.prototype,"publicId",{get:function(){return this.pubID}}),Object.defineProperty(o.prototype,"systemId",{get:function(){return this.sysID}}),o.prototype.toString=function(t){return this.options.writer.dtdNotation(this,this.options.writer.filterOptions(t))},o)}.call(this);
/***/},
/***/9077:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var i,t,o,s={}.hasOwnProperty;function a(t,e,r,n){a.__super__.constructor.call(this,t),o(e)&&(e=(t=e).version,r=t.encoding,n=t.standalone),e=e||"1.0",this.type=i.Declaration,this.version=this.stringify.xmlVersion(e),null!=r&&(this.encoding=this.stringify.xmlEncoding(r)),null!=n&&(this.standalone=this.stringify.xmlStandalone(n))}o=r(8369).isObject,t=r(2026),i=r(9335),e.exports=(function(t,e){for(var r in e)s.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(a,t),a.prototype.toString=function(t){return this.options.writer.declaration(this,this.options.writer.filterOptions(t))},a)}.call(this);
/***/},
/***/6544:
/***/function(e,t,p){
// Generated by CoffeeScript 1.12.7
!function(){var u,o,r,n,i,s,t,c,a={}.hasOwnProperty;function h(t,e,r){var n,i,o,s,a;if(h.__super__.constructor.call(this,t),this.type=u.DocType,t.children)for(i=0,o=(s=t.children).length;i<o;i++)if((n=s[i]).type===u.Element){this.name=n.name;break}this.documentObject=t,c(e)&&(e=(a=e).pubID,r=a.sysID),null==r&&(r=(a=[e,r])[0],e=a[1]),null!=e&&(this.pubID=this.stringify.dtdPubID(e)),null!=r&&(this.sysID=this.stringify.dtdSysID(r))}c=p(8369).isObject,t=p(2026),u=p(9335),o=p(1179),n=p(9078),r=p(6347),i=p(4777),s=p(663),e.exports=(function(t,e){for(var r in e)a.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(h,t),Object.defineProperty(h.prototype,"entities",{get:function(){for(var t,e={},r=this.children,n=0,i=r.length;n<i;n++)(t=r[n]).type!==u.EntityDeclaration||t.pe||(e[t.name]=t);return new s(e)}}),Object.defineProperty(h.prototype,"notations",{get:function(){for(var t,e={},r=this.children,n=0,i=r.length;n<i;n++)(t=r[n]).type===u.NotationDeclaration&&(e[t.name]=t);return new s(e)}}),Object.defineProperty(h.prototype,"publicId",{get:function(){return this.pubID}}),Object.defineProperty(h.prototype,"systemId",{get:function(){return this.sysID}}),Object.defineProperty(h.prototype,"internalSubset",{get:function(){throw new Error("This DOM method is not implemented."+this.debugInfo())}}),h.prototype.element=function(t,e){e=new r(this,t,e);return this.children.push(e),this},h.prototype.attList=function(t,e,r,n,i){i=new o(this,t,e,r,n,i);return this.children.push(i),this},h.prototype.entity=function(t,e){e=new n(this,!1,t,e);return this.children.push(e),this},h.prototype.pEntity=function(t,e){e=new n(this,!0,t,e);return this.children.push(e),this},h.prototype.notation=function(t,e){e=new i(this,t,e);return this.children.push(e),this},h.prototype.toString=function(t){return this.options.writer.docType(this,this.options.writer.filterOptions(t))},h.prototype.ele=function(t,e){return this.element(t,e)},h.prototype.att=function(t,e,r,n,i){return this.attList(t,e,r,n,i)},h.prototype.ent=function(t,e){return this.entity(t,e)},h.prototype.pent=function(t,e){return this.pEntity(t,e)},h.prototype.not=function(t,e){return this.notation(t,e)},h.prototype.up=function(){return this.root()||this.documentObject},h.prototype.isEqualNode=function(t){return!!h.__super__.isEqualNode.apply(this,arguments).isEqualNode(t)&&(t.name===this.name&&(t.publicId===this.publicId&&t.systemId===this.systemId))},h)}.call(this);
/***/},
/***/6934:
/***/function(c,t,h){
// Generated by CoffeeScript 1.12.7
!function(){var i,e,t,r,n,o,s,a={}.hasOwnProperty;function u(t){u.__super__.constructor.call(this,null),this.name="#document",this.type=i.Document,this.documentURI=null,this.domConfig=new e,(t=t||{}).writer||(t.writer=new n),this.options=t,this.stringify=new o(t)}s=h(8369).isPlainObject,t=h(1770),e=h(383),r=h(2026),i=h(9335),o=h(5549),n=h(6434),c.exports=(function(t,e){for(var r in e)a.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(u,r),Object.defineProperty(u.prototype,"implementation",{value:new t}),Object.defineProperty(u.prototype,"doctype",{get:function(){for(var t,e=this.children,r=0,n=e.length;r<n;r++)if((t=e[r]).type===i.DocType)return t;return null}}),Object.defineProperty(u.prototype,"documentElement",{get:function(){return this.rootObject||null}}),Object.defineProperty(u.prototype,"inputEncoding",{get:function(){return null}}),Object.defineProperty(u.prototype,"strictErrorChecking",{get:function(){return!1}}),Object.defineProperty(u.prototype,"xmlEncoding",{get:function(){return 0!==this.children.length&&this.children[0].type===i.Declaration?this.children[0].encoding:null}}),Object.defineProperty(u.prototype,"xmlStandalone",{get:function(){return 0!==this.children.length&&this.children[0].type===i.Declaration&&"yes"===this.children[0].standalone}}),Object.defineProperty(u.prototype,"xmlVersion",{get:function(){return 0!==this.children.length&&this.children[0].type===i.Declaration?this.children[0].version:"1.0"}}),Object.defineProperty(u.prototype,"URL",{get:function(){return this.documentURI}}),Object.defineProperty(u.prototype,"origin",{get:function(){return null}}),Object.defineProperty(u.prototype,"compatMode",{get:function(){return null}}),Object.defineProperty(u.prototype,"characterSet",{get:function(){return null}}),Object.defineProperty(u.prototype,"contentType",{get:function(){return null}}),u.prototype.end=function(t){var e={};return t?s(t)&&(e=t,t=this.options.writer):t=this.options.writer,t.document(this,t.filterOptions(e))},u.prototype.toString=function(t){return this.options.writer.document(this,this.options.writer.filterOptions(t))},u.prototype.createElement=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createDocumentFragment=function(){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createTextNode=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createComment=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createCDATASection=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createProcessingInstruction=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createAttribute=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createEntityReference=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.getElementsByTagName=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.importNode=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createElementNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createAttributeNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.getElementsByTagNameNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.getElementById=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.adoptNode=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.normalizeDocument=function(){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.renameNode=function(t,e,r){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.getElementsByClassName=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createEvent=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createRange=function(){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createNodeIterator=function(t,e,r){throw new Error("This DOM method is not implemented."+this.debugInfo())},u.prototype.createTreeWalker=function(t,e,r){throw new Error("This DOM method is not implemented."+this.debugInfo())},u)}.call(this);
/***/},
/***/9227:
/***/function(O,t,D){
// Generated by CoffeeScript 1.12.7
!function(){var c,o,i,e,r,s,n,a,u,h,p,l,f,d,y,g,m,w,b,E,v,T,t,I={}.hasOwnProperty;function _(t,e,r){var n;this.name="?xml",this.type=c.Document,n={},(t=t||{}).writer?T(t.writer)&&(n=t.writer,t.writer=new g):t.writer=new g,this.options=t,this.writer=t.writer,this.writerOptions=this.writer.filterOptions(n),this.stringify=new m(t),this.onDataCallback=e||function(){},this.onEndCallback=r||function(){},this.currentNode=null,this.currentLevel=-1,this.openTags={},this.documentStarted=!1,this.documentCompleted=!1,this.root=null}t=D(8369),v=t.isObject,E=t.isFunction,T=t.isPlainObject,b=t.getValue,c=D(9335),l=D(6934),f=D(2161),e=D(6170),r=D(2096),y=D(9406),w=D(3595),d=D(9181),h=D(9077),p=D(6544),s=D(1179),a=D(9078),n=D(6347),u=D(4777),i=D(2750),m=D(5549),g=D(6434),o=D(594),O.exports=(_.prototype.createChildNode=function(t){var e,r,n,i,o,s,a,u;switch(t.type){case c.CData:this.cdata(t.value);break;case c.Comment:this.comment(t.value);break;case c.Element:for(r in n={},a=t.attribs)I.call(a,r)&&(e=a[r],n[r]=e.value);this.node(t.name,n);break;case c.Dummy:this.dummy();break;case c.Raw:this.raw(t.value);break;case c.Text:this.text(t.value);break;case c.ProcessingInstruction:this.instruction(t.target,t.value);break;default:throw new Error("This XML node type is not supported in a JS object: "+t.constructor.name)}for(o=0,s=(u=t.children).length;o<s;o++)i=u[o],this.createChildNode(i),i.type===c.Element&&this.up();return this},_.prototype.dummy=function(){return this},_.prototype.node=function(t,e,r){var n;if(null==t)throw new Error("Missing node name.");if(this.root&&-1===this.currentLevel)throw new Error("Document can only have one root node. "+this.debugInfo(t));return this.openCurrent(),t=b(t),e=b(e=null==e?{}:e),v(e)||(r=(n=[e,r])[0],e=n[1]),this.currentNode=new f(this,t,e),this.currentNode.children=!1,this.currentLevel++,this.openTags[this.currentLevel]=this.currentNode,null!=r&&this.text(r),this},_.prototype.element=function(t,e,r){var n,i,o,s,a,u;if(this.currentNode&&this.currentNode.type===c.DocType)this.dtdElement.apply(this,arguments);else if(Array.isArray(t)||v(t)||E(t))for(s=this.options.noValidation,this.options.noValidation=!0,(u=new l(this.options).element("TEMP_ROOT")).element(t),this.options.noValidation=s,i=0,o=(a=u.children).length;i<o;i++)n=a[i],this.createChildNode(n),n.type===c.Element&&this.up();else this.node(t,e,r);return this},_.prototype.attribute=function(t,e){var r,n;if(!this.currentNode||this.currentNode.children)throw new Error("att() can only be used immediately after an ele() call in callback mode. "+this.debugInfo(t));if(null!=t&&(t=b(t)),v(t))for(r in t)I.call(t,r)&&(n=t[r],this.attribute(r,n));else E(e)&&(e=e.apply()),this.options.keepNullAttributes&&null==e?this.currentNode.attribs[t]=new i(this,t,""):null!=e&&(this.currentNode.attribs[t]=new i(this,t,e));return this},_.prototype.text=function(t){return this.openCurrent(),t=new w(this,t),this.onData(this.writer.text(t,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.cdata=function(t){return this.openCurrent(),t=new e(this,t),this.onData(this.writer.cdata(t,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.comment=function(t){return this.openCurrent(),t=new r(this,t),this.onData(this.writer.comment(t,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.raw=function(t){return this.openCurrent(),t=new y(this,t),this.onData(this.writer.raw(t,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.instruction=function(t,e){var r,n,i,o;if(this.openCurrent(),null!=t&&(t=b(t)),null!=e&&(e=b(e)),Array.isArray(t))for(r=0,o=t.length;r<o;r++)n=t[r],this.instruction(n);else if(v(t))for(n in t)I.call(t,n)&&(i=t[n],this.instruction(n,i));else E(e)&&(e=e.apply()),e=new d(this,t,e),this.onData(this.writer.processingInstruction(e,this.writerOptions,this.currentLevel+1),this.currentLevel+1);return this},_.prototype.declaration=function(t,e,r){if(this.openCurrent(),this.documentStarted)throw new Error("declaration() must be the first node.");return r=new h(this,t,e,r),this.onData(this.writer.declaration(r,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.doctype=function(t,e,r){if(this.openCurrent(),null==t)throw new Error("Missing root node name.");if(this.root)throw new Error("dtd() must come before the root node.");return this.currentNode=new p(this,e,r),this.currentNode.rootNodeName=t,this.currentNode.children=!1,this.currentLevel++,this.openTags[this.currentLevel]=this.currentNode,this},_.prototype.dtdElement=function(t,e){return this.openCurrent(),e=new n(this,t,e),this.onData(this.writer.dtdElement(e,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.attList=function(t,e,r,n,i){return this.openCurrent(),i=new s(this,t,e,r,n,i),this.onData(this.writer.dtdAttList(i,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.entity=function(t,e){return this.openCurrent(),e=new a(this,!1,t,e),this.onData(this.writer.dtdEntity(e,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.pEntity=function(t,e){return this.openCurrent(),e=new a(this,!0,t,e),this.onData(this.writer.dtdEntity(e,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.notation=function(t,e){return this.openCurrent(),e=new u(this,t,e),this.onData(this.writer.dtdNotation(e,this.writerOptions,this.currentLevel+1),this.currentLevel+1),this},_.prototype.up=function(){if(this.currentLevel<0)throw new Error("The document node has no parent.");return this.currentNode?(this.currentNode.children?this.closeNode(this.currentNode):this.openNode(this.currentNode),this.currentNode=null):this.closeNode(this.openTags[this.currentLevel]),delete this.openTags[this.currentLevel],this.currentLevel--,this},_.prototype.end=function(){for(;0<=this.currentLevel;)this.up();return this.onEnd()},_.prototype.openCurrent=function(){if(this.currentNode)return this.currentNode.children=!0,this.openNode(this.currentNode)},_.prototype.openNode=function(t){var e,r,n,i;if(!t.isOpen){if(this.root||0!==this.currentLevel||t.type!==c.Element||(this.root=t),r="",t.type===c.Element){for(n in this.writerOptions.state=o.OpenTag,r=this.writer.indent(t,this.writerOptions,this.currentLevel)+"<"+t.name,i=t.attribs)I.call(i,n)&&(e=i[n],r+=this.writer.attribute(e,this.writerOptions,this.currentLevel));r+=(t.children?">":"/>")+this.writer.endline(t,this.writerOptions,this.currentLevel),this.writerOptions.state=o.InsideTag}else this.writerOptions.state=o.OpenTag,r=this.writer.indent(t,this.writerOptions,this.currentLevel)+"<!DOCTYPE "+t.rootNodeName,t.pubID&&t.sysID?r+=' PUBLIC "'+t.pubID+'" "'+t.sysID+'"':t.sysID&&(r+=' SYSTEM "'+t.sysID+'"'),t.children?(r+=" [",this.writerOptions.state=o.InsideTag):(this.writerOptions.state=o.CloseTag,r+=">"),r+=this.writer.endline(t,this.writerOptions,this.currentLevel);return this.onData(r,this.currentLevel),t.isOpen=!0}},_.prototype.closeNode=function(t){var e;if(!t.isClosed)return e="",this.writerOptions.state=o.CloseTag,e=t.type===c.Element?this.writer.indent(t,this.writerOptions,this.currentLevel)+"</"+t.name+">"+this.writer.endline(t,this.writerOptions,this.currentLevel):this.writer.indent(t,this.writerOptions,this.currentLevel)+"]>"+this.writer.endline(t,this.writerOptions,this.currentLevel),this.writerOptions.state=o.None,this.onData(e,this.currentLevel),t.isClosed=!0},_.prototype.onData=function(t,e){return this.documentStarted=!0,this.onDataCallback(t,e+1)},_.prototype.onEnd=function(){return this.documentCompleted=!0,this.onEndCallback()},_.prototype.debugInfo=function(t){return null==t?"":"node: <"+t+">"},_.prototype.ele=function(){return this.element.apply(this,arguments)},_.prototype.nod=function(t,e,r){return this.node(t,e,r)},_.prototype.txt=function(t){return this.text(t)},_.prototype.dat=function(t){return this.cdata(t)},_.prototype.com=function(t){return this.comment(t)},_.prototype.ins=function(t,e){return this.instruction(t,e)},_.prototype.dec=function(t,e,r){return this.declaration(t,e,r)},_.prototype.dtd=function(t,e,r){return this.doctype(t,e,r)},_.prototype.e=function(t,e,r){return this.element(t,e,r)},_.prototype.n=function(t,e,r){return this.node(t,e,r)},_.prototype.t=function(t){return this.text(t)},_.prototype.d=function(t){return this.cdata(t)},_.prototype.c=function(t){return this.comment(t)},_.prototype.r=function(t){return this.raw(t)},_.prototype.i=function(t,e){return this.instruction(t,e)},_.prototype.att=function(){return(this.currentNode&&this.currentNode.type===c.DocType?this.attList:this.attribute).apply(this,arguments)},_.prototype.a=function(){return(this.currentNode&&this.currentNode.type===c.DocType?this.attList:this.attribute).apply(this,arguments)},_.prototype.ent=function(t,e){return this.entity(t,e)},_.prototype.pent=function(t,e){return this.pEntity(t,e)},_.prototype.not=function(t,e){return this.notation(t,e)},_)}.call(this);
/***/},
/***/8833:
/***/function(n,t,o){
// Generated by CoffeeScript 1.12.7
!function(){var e,t,i={}.hasOwnProperty;function r(t){r.__super__.constructor.call(this,t),this.type=e.Dummy}t=o(2026),e=o(9335),n.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(r,t),r.prototype.clone=function(){return Object.create(this)},r.prototype.toString=function(t){return""},r)}.call(this);
/***/},
/***/2161:
/***/function(r,t,n){
// Generated by CoffeeScript 1.12.7
!function(){var a,i,t,o,s,u,e,c={}.hasOwnProperty;function h(t,e,r){var n,i,o,s;if(h.__super__.constructor.call(this,t),null==e)throw new Error("Missing element name. "+this.debugInfo());if(this.name=this.stringify.name(e),this.type=a.Element,this.attribs={},(this.schemaTypeInfo=null)!=r&&this.attribute(r),t.type===a.Document&&(this.isRoot=!0,(this.documentObject=t).rootObject=this,t.children))for(i=0,o=(s=t.children).length;i<o;i++)if((n=s[i]).type===a.DocType){n.name=this.name;break}}e=n(8369),u=e.isObject,s=e.isFunction,o=e.getValue,e=n(2026),a=n(9335),i=n(2750),t=n(663),r.exports=(function(t,e){for(var r in e)c.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(h,e),Object.defineProperty(h.prototype,"tagName",{get:function(){return this.name}}),Object.defineProperty(h.prototype,"namespaceURI",{get:function(){return""}}),Object.defineProperty(h.prototype,"prefix",{get:function(){return""}}),Object.defineProperty(h.prototype,"localName",{get:function(){return this.name}}),Object.defineProperty(h.prototype,"id",{get:function(){throw new Error("This DOM method is not implemented."+this.debugInfo())}}),Object.defineProperty(h.prototype,"className",{get:function(){throw new Error("This DOM method is not implemented."+this.debugInfo())}}),Object.defineProperty(h.prototype,"classList",{get:function(){throw new Error("This DOM method is not implemented."+this.debugInfo())}}),Object.defineProperty(h.prototype,"attributes",{get:function(){return this.attributeMap&&this.attributeMap.nodes||(this.attributeMap=new t(this.attribs)),this.attributeMap}}),h.prototype.clone=function(){var t,e,r,n=Object.create(this);for(e in n.isRoot&&(n.documentObject=null),n.attribs={},r=this.attribs)c.call(r,e)&&(t=r[e],n.attribs[e]=t.clone());return n.children=[],this.children.forEach(function(t){t=t.clone();return(t.parent=n).children.push(t)}),n},h.prototype.attribute=function(t,e){var r,n;if(null!=t&&(t=o(t)),u(t))for(r in t)c.call(t,r)&&(n=t[r],this.attribute(r,n));else s(e)&&(e=e.apply()),this.options.keepNullAttributes&&null==e?this.attribs[t]=new i(this,t,""):null!=e&&(this.attribs[t]=new i(this,t,e));return this},h.prototype.removeAttribute=function(t){var e,r,n;if(null==t)throw new Error("Missing attribute name. "+this.debugInfo());if(t=o(t),Array.isArray(t))for(r=0,n=t.length;r<n;r++)e=t[r],delete this.attribs[e];else delete this.attribs[t];return this},h.prototype.toString=function(t){return this.options.writer.element(this,this.options.writer.filterOptions(t))},h.prototype.att=function(t,e){return this.attribute(t,e)},h.prototype.a=function(t,e){return this.attribute(t,e)},h.prototype.getAttribute=function(t){return this.attribs.hasOwnProperty(t)?this.attribs[t].value:null},h.prototype.setAttribute=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getAttributeNode=function(t){return this.attribs.hasOwnProperty(t)?this.attribs[t]:null},h.prototype.setAttributeNode=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.removeAttributeNode=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getElementsByTagName=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getAttributeNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.setAttributeNS=function(t,e,r){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.removeAttributeNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getAttributeNodeNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.setAttributeNodeNS=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getElementsByTagNameNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.hasAttribute=function(t){return this.attribs.hasOwnProperty(t)},h.prototype.hasAttributeNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.setIdAttribute=function(t,e){return this.attribs.hasOwnProperty(t)?this.attribs[t].isId:e},h.prototype.setIdAttributeNS=function(t,e,r){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.setIdAttributeNode=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getElementsByTagName=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getElementsByTagNameNS=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.getElementsByClassName=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},h.prototype.isEqualNode=function(t){var e,r,n;if(!h.__super__.isEqualNode.apply(this,arguments).isEqualNode(t))return!1;if(t.namespaceURI!==this.namespaceURI)return!1;if(t.prefix!==this.prefix)return!1;if(t.localName!==this.localName)return!1;if(t.attribs.length!==this.attribs.length)return!1;for(e=r=0,n=this.attribs.length-1;0<=n?r<=n:n<=r;e=0<=n?++r:--r)if(!this.attribs[e].isEqualNode(t.attribs[e]))return!1;return!0},h)}.call(this);
/***/},
/***/663:
/***/function(e){
// Generated by CoffeeScript 1.12.7
!function(){function t(t){this.nodes=t}e.exports=(Object.defineProperty(t.prototype,"length",{get:function(){return Object.keys(this.nodes).length||0}}),t.prototype.clone=function(){return this.nodes=null},t.prototype.getNamedItem=function(t){return this.nodes[t]},t.prototype.setNamedItem=function(t){var e=this.nodes[t.nodeName];return this.nodes[t.nodeName]=t,e||null},t.prototype.removeNamedItem=function(t){var e=this.nodes[t];return delete this.nodes[t],e||null},t.prototype.item=function(t){return this.nodes[Object.keys(this.nodes)[t]]||null},t.prototype.getNamedItemNS=function(t,e){throw new Error("This DOM method is not implemented.")},t.prototype.setNamedItemNS=function(t){throw new Error("This DOM method is not implemented.")},t.prototype.removeNamedItemNS=function(t,e){throw new Error("This DOM method is not implemented.")},t)}.call(this);
/***/},
/***/2026:
/***/function(b,t,E){
// Generated by CoffeeScript 1.12.7
!function(){var r,p,e,n,i,l,o,s,a,u,c,h,f,d,y,g,t,m={}.hasOwnProperty;function w(t){this.parent=t,this.parent&&(this.options=this.parent.options,this.stringify=this.parent.stringify),this.value=null,this.children=[],this.baseURI=null,s||(s=E(2161),e=E(6170),n=E(2096),i=E(9077),l=E(6544),c=E(9406),h=E(3595),u=E(9181),o=E(8833),p=E(9335),a=E(2390),E(663),r=E(7557))}t=E(8369),g=t.isObject,y=t.isFunction,d=t.isEmpty,f=t.getValue,r=a=p=o=u=h=c=l=i=n=e=s=null,b.exports=(Object.defineProperty(w.prototype,"nodeName",{get:function(){return this.name}}),Object.defineProperty(w.prototype,"nodeType",{get:function(){return this.type}}),Object.defineProperty(w.prototype,"nodeValue",{get:function(){return this.value}}),Object.defineProperty(w.prototype,"parentNode",{get:function(){return this.parent}}),Object.defineProperty(w.prototype,"childNodes",{get:function(){return this.childNodeList&&this.childNodeList.nodes||(this.childNodeList=new a(this.children)),this.childNodeList}}),Object.defineProperty(w.prototype,"firstChild",{get:function(){return this.children[0]||null}}),Object.defineProperty(w.prototype,"lastChild",{get:function(){return this.children[this.children.length-1]||null}}),Object.defineProperty(w.prototype,"previousSibling",{get:function(){var t=this.parent.children.indexOf(this);return this.parent.children[t-1]||null}}),Object.defineProperty(w.prototype,"nextSibling",{get:function(){var t=this.parent.children.indexOf(this);return this.parent.children[t+1]||null}}),Object.defineProperty(w.prototype,"ownerDocument",{get:function(){return this.document()||null}}),Object.defineProperty(w.prototype,"textContent",{get:function(){var t,e,r,n,i;if(this.nodeType!==p.Element&&this.nodeType!==p.DocumentFragment)return null;for(i="",e=0,r=(n=this.children).length;e<r;e++)(t=n[e]).textContent&&(i+=t.textContent);return i},set:function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())}}),w.prototype.setParent=function(t){var e,r,n,i,o;for((this.parent=t)&&(this.options=t.options,this.stringify=t.stringify),o=[],r=0,n=(i=this.children).length;r<n;r++)e=i[r],o.push(e.setParent(this));return o},w.prototype.element=function(t,e,r){var n,i,o,s,a,u,c,h,p,l=null;if(null===e&&null==r&&(e=(h=[{},null])[0],r=h[1]),e=f(e=null==e?{}:e),g(e)||(r=(h=[e,r])[0],e=h[1]),null!=t&&(t=f(t)),Array.isArray(t))for(o=0,u=t.length;o<u;o++)i=t[o],l=this.element(i);else if(y(t))l=this.element(t.apply());else if(g(t)){for(a in t)if(m.call(t,a))if(p=t[a],y(p)&&(p=p.apply()),!this.options.ignoreDecorators&&this.stringify.convertAttKey&&0===a.indexOf(this.stringify.convertAttKey))l=this.attribute(a.substr(this.stringify.convertAttKey.length),p);else if(!this.options.separateArrayItems&&Array.isArray(p)&&d(p))l=this.dummy();else if(g(p)&&d(p))l=this.element(a);else if(this.options.keepNullNodes||null!=p)if(!this.options.separateArrayItems&&Array.isArray(p))for(s=0,c=p.length;s<c;s++)i=p[s],(n={})[a]=i,l=this.element(n);else g(p)?!this.options.ignoreDecorators&&this.stringify.convertTextKey&&0===a.indexOf(this.stringify.convertTextKey)?l=this.element(p):(l=this.element(a)).element(p):l=this.element(a,p);else l=this.dummy()}else l=this.options.keepNullNodes||null!==r?!this.options.ignoreDecorators&&this.stringify.convertTextKey&&0===t.indexOf(this.stringify.convertTextKey)?this.text(r):!this.options.ignoreDecorators&&this.stringify.convertCDataKey&&0===t.indexOf(this.stringify.convertCDataKey)?this.cdata(r):!this.options.ignoreDecorators&&this.stringify.convertCommentKey&&0===t.indexOf(this.stringify.convertCommentKey)?this.comment(r):!this.options.ignoreDecorators&&this.stringify.convertRawKey&&0===t.indexOf(this.stringify.convertRawKey)?this.raw(r):!this.options.ignoreDecorators&&this.stringify.convertPIKey&&0===t.indexOf(this.stringify.convertPIKey)?this.instruction(t.substr(this.stringify.convertPIKey.length),r):this.node(t,e,r):this.dummy();if(null==l)throw new Error("Could not create any elements with: "+t+". "+this.debugInfo());return l},w.prototype.insertBefore=function(t,e,r){var n,i,o,s;if(null!=t&&t.type)return o=e,(i=t).setParent(this),o?(n=children.indexOf(o),s=children.splice(n),children.push(i),Array.prototype.push.apply(children,s)):children.push(i),i;if(this.isRoot)throw new Error("Cannot insert elements at root level. "+this.debugInfo(t));return n=this.parent.children.indexOf(this),s=this.parent.children.splice(n),r=this.parent.element(t,e,r),Array.prototype.push.apply(this.parent.children,s),r},w.prototype.insertAfter=function(t,e,r){var n;if(this.isRoot)throw new Error("Cannot insert elements at root level. "+this.debugInfo(t));return n=this.parent.children.indexOf(this),n=this.parent.children.splice(n+1),r=this.parent.element(t,e,r),Array.prototype.push.apply(this.parent.children,n),r},w.prototype.remove=function(){var t;if(this.isRoot)throw new Error("Cannot remove the root element. "+this.debugInfo());return t=this.parent.children.indexOf(this),[].splice.apply(this.parent.children,[t,t-t+1].concat([])),this.parent},w.prototype.node=function(t,e,r){var n;return null!=t&&(t=f(t)),e=f(e=e||{}),g(e)||(r=(n=[e,r])[0],e=n[1]),e=new s(this,t,e),null!=r&&e.text(r),this.children.push(e),e},w.prototype.text=function(t){return g(t)&&this.element(t),t=new h(this,t),this.children.push(t),this},w.prototype.cdata=function(t){t=new e(this,t);return this.children.push(t),this},w.prototype.comment=function(t){t=new n(this,t);return this.children.push(t),this},w.prototype.commentBefore=function(t){var e=this.parent.children.indexOf(this),e=this.parent.children.splice(e);this.parent.comment(t);return Array.prototype.push.apply(this.parent.children,e),this},w.prototype.commentAfter=function(t){var e=this.parent.children.indexOf(this),e=this.parent.children.splice(e+1);this.parent.comment(t);return Array.prototype.push.apply(this.parent.children,e),this},w.prototype.raw=function(t){t=new c(this,t);return this.children.push(t),this},w.prototype.dummy=function(){return new o(this)},w.prototype.instruction=function(t,e){var r,n,i,o;if(null!=t&&(t=f(t)),null!=e&&(e=f(e)),Array.isArray(t))for(i=0,o=t.length;i<o;i++)r=t[i],this.instruction(r);else if(g(t))for(r in t)m.call(t,r)&&(n=t[r],this.instruction(r,n));else y(e)&&(e=e.apply()),e=new u(this,t,e),this.children.push(e);return this},w.prototype.instructionBefore=function(t,e){var r=this.parent.children.indexOf(this),r=this.parent.children.splice(r);this.parent.instruction(t,e);return Array.prototype.push.apply(this.parent.children,r),this},w.prototype.instructionAfter=function(t,e){var r=this.parent.children.indexOf(this),r=this.parent.children.splice(r+1);this.parent.instruction(t,e);return Array.prototype.push.apply(this.parent.children,r),this},w.prototype.declaration=function(t,e,r){var n=this.document(),r=new i(n,t,e,r);return 0!==n.children.length&&n.children[0].type===p.Declaration?n.children[0]=r:n.children.unshift(r),n.root()||n},w.prototype.dtd=function(t,e){for(var r,n,i,o,s=this.document(),a=new l(s,t,e),u=s.children,c=r=0,h=u.length;r<h;c=++r)if(u[c].type===p.DocType)return s.children[c]=a;for(c=n=0,i=(o=s.children).length;n<i;c=++n)if(o[c].isRoot)return s.children.splice(c,0,a),a;return s.children.push(a),a},w.prototype.up=function(){if(this.isRoot)throw new Error("The root node has no parent. Use doc() if you need to get the document object.");return this.parent},w.prototype.root=function(){for(var t=this;t;){if(t.type===p.Document)return t.rootObject;if(t.isRoot)return t;t=t.parent}},w.prototype.document=function(){for(var t=this;t;){if(t.type===p.Document)return t;t=t.parent}},w.prototype.end=function(t){return this.document().end(t)},w.prototype.prev=function(){var t=this.parent.children.indexOf(this);if(t<1)throw new Error("Already at the first node. "+this.debugInfo());return this.parent.children[t-1]},w.prototype.next=function(){var t=this.parent.children.indexOf(this);if(-1===t||t===this.parent.children.length-1)throw new Error("Already at the last node. "+this.debugInfo());return this.parent.children[t+1]},w.prototype.importDocument=function(t){t=t.root().clone();return t.parent=this,t.isRoot=!1,this.children.push(t),this},w.prototype.debugInfo=function(t){var e;return null!=(t=t||this.name)||null!=(e=this.parent)&&e.name?null==t?"parent: <"+this.parent.name+">":null!=(e=this.parent)&&e.name?"node: <"+t+">, parent: <"+this.parent.name+">":"node: <"+t+">":""},w.prototype.ele=function(t,e,r){return this.element(t,e,r)},w.prototype.nod=function(t,e,r){return this.node(t,e,r)},w.prototype.txt=function(t){return this.text(t)},w.prototype.dat=function(t){return this.cdata(t)},w.prototype.com=function(t){return this.comment(t)},w.prototype.ins=function(t,e){return this.instruction(t,e)},w.prototype.doc=function(){return this.document()},w.prototype.dec=function(t,e,r){return this.declaration(t,e,r)},w.prototype.e=function(t,e,r){return this.element(t,e,r)},w.prototype.n=function(t,e,r){return this.node(t,e,r)},w.prototype.t=function(t){return this.text(t)},w.prototype.d=function(t){return this.cdata(t)},w.prototype.c=function(t){return this.comment(t)},w.prototype.r=function(t){return this.raw(t)},w.prototype.i=function(t,e){return this.instruction(t,e)},w.prototype.u=function(){return this.up()},w.prototype.importXMLBuilder=function(t){return this.importDocument(t)},w.prototype.replaceChild=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.removeChild=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.appendChild=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.hasChildNodes=function(){return 0!==this.children.length},w.prototype.cloneNode=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.normalize=function(){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.isSupported=function(t,e){return!0},w.prototype.hasAttributes=function(){return 0!==this.attribs.length},w.prototype.compareDocumentPosition=function(t){var e;return this===t?0:this.document()!==t.document()?(e=r.Disconnected|r.ImplementationSpecific,Math.random()<.5?e|=r.Preceding:e|=r.Following,e):this.isAncestor(t)?r.Contains|r.Preceding:this.isDescendant(t)?r.Contains|r.Following:this.isPreceding(t)?r.Preceding:r.Following},w.prototype.isSameNode=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.lookupPrefix=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.isDefaultNamespace=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.lookupNamespaceURI=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.isEqualNode=function(t){var e,r,n;if(t.nodeType!==this.nodeType)return!1;if(t.children.length!==this.children.length)return!1;for(e=r=0,n=this.children.length-1;0<=n?r<=n:n<=r;e=0<=n?++r:--r)if(!this.children[e].isEqualNode(t.children[e]))return!1;return!0},w.prototype.getFeature=function(t,e){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.setUserData=function(t,e,r){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.getUserData=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},w.prototype.contains=function(t){return!!t&&(t===this||this.isDescendant(t))},w.prototype.isDescendant=function(t){for(var e,r=this.children,n=0,i=r.length;n<i;n++){if(t===(e=r[n]))return!0;if(e.isDescendant(t))return!0}return!1},w.prototype.isAncestor=function(t){return t.isDescendant(this)},w.prototype.isPreceding=function(t){var e=this.treePosition(t),t=this.treePosition(this);return-1!==e&&-1!==t&&e<t},w.prototype.isFollowing=function(t){var e=this.treePosition(t),t=this.treePosition(this);return-1!==e&&-1!==t&&t<e},w.prototype.treePosition=function(e){var r=0,n=!1;return this.foreachTreeNode(this.document(),function(t){if(r++,!n&&t===e)return n=!0}),n?r:-1},w.prototype.foreachTreeNode=function(t,e){for(var r,n,i,o=0,s=(n=(t=t||this.document()).children).length;o<s;o++){if(i=e(r=n[o]))return i;if(i=this.foreachTreeNode(r,e))return i}},w)}.call(this);
/***/},
/***/2390:
/***/function(e){
// Generated by CoffeeScript 1.12.7
!function(){function t(t){this.nodes=t}e.exports=(Object.defineProperty(t.prototype,"length",{get:function(){return this.nodes.length||0}}),t.prototype.clone=function(){return this.nodes=null},t.prototype.item=function(t){return this.nodes[t]||null},t)}.call(this);
/***/},
/***/9181:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var n,t,i={}.hasOwnProperty;function o(t,e,r){if(o.__super__.constructor.call(this,t),null==e)throw new Error("Missing instruction target. "+this.debugInfo());this.type=n.ProcessingInstruction,this.target=this.stringify.insTarget(e),this.name=this.target,r&&(this.value=this.stringify.insValue(r))}n=r(9335),t=r(6488),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(o,t),o.prototype.clone=function(){return Object.create(this)},o.prototype.toString=function(t){return this.options.writer.processingInstruction(this,this.options.writer.filterOptions(t))},o.prototype.isEqualNode=function(t){return!!o.__super__.isEqualNode.apply(this,arguments).isEqualNode(t)&&t.target===this.target},o)}.call(this);
/***/},
/***/9406:
/***/function(e,t,o){
// Generated by CoffeeScript 1.12.7
!function(){var r,t,i={}.hasOwnProperty;function n(t,e){if(n.__super__.constructor.call(this,t),null==e)throw new Error("Missing raw text. "+this.debugInfo());this.type=r.Raw,this.value=this.stringify.raw(e)}r=o(9335),t=o(2026),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(n,t),n.prototype.clone=function(){return Object.create(this)},n.prototype.toString=function(t){return this.options.writer.raw(this,this.options.writer.filterOptions(t))},n)}.call(this);
/***/},
/***/1996:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var l,f,t,d={}.hasOwnProperty;function n(t,e){this.stream=t,n.__super__.constructor.call(this,e)}l=r(9335),t=r(751),f=r(594),e.exports=(function(t,e){for(var r in e)d.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(n,t),n.prototype.endline=function(t,e,r){return t.isLastRootNode&&e.state===f.CloseTag?"":n.__super__.endline.call(this,t,e,r)},n.prototype.document=function(t,e){for(var r,n,i,o,s,a,u=t.children,c=n=0,h=u.length;n<h;c=++n)(r=u[c]).isLastRootNode=c===t.children.length-1;for(e=this.filterOptions(e),a=[],i=0,o=(s=t.children).length;i<o;i++)r=s[i],a.push(this.writeChildNode(r,e,0));return a},n.prototype.attribute=function(t,e,r){return this.stream.write(n.__super__.attribute.call(this,t,e,r))},n.prototype.cdata=function(t,e,r){return this.stream.write(n.__super__.cdata.call(this,t,e,r))},n.prototype.comment=function(t,e,r){return this.stream.write(n.__super__.comment.call(this,t,e,r))},n.prototype.declaration=function(t,e,r){return this.stream.write(n.__super__.declaration.call(this,t,e,r))},n.prototype.docType=function(t,e,r){var n,i,o,s;if(this.openNode(t,e,r=r||0),e.state=f.OpenTag,this.stream.write(this.indent(t,e,r)),this.stream.write("<!DOCTYPE "+t.root().name),t.pubID&&t.sysID?this.stream.write(' PUBLIC "'+t.pubID+'" "'+t.sysID+'"'):t.sysID&&this.stream.write(' SYSTEM "'+t.sysID+'"'),0<t.children.length){for(this.stream.write(" ["),this.stream.write(this.endline(t,e,r)),e.state=f.InsideTag,i=0,o=(s=t.children).length;i<o;i++)n=s[i],this.writeChildNode(n,e,r+1);e.state=f.CloseTag,this.stream.write("]")}return e.state=f.CloseTag,this.stream.write(e.spaceBeforeSlash+">"),this.stream.write(this.endline(t,e,r)),e.state=f.None,this.closeNode(t,e,r)},n.prototype.element=function(t,e,r){var n,i,o,s,a,u,c,h,p;for(c in this.openNode(t,e,r=r||0),e.state=f.OpenTag,this.stream.write(this.indent(t,e,r)+"<"+t.name),h=t.attribs)d.call(h,c)&&(n=h[c],this.attribute(n,e,r));if(s=0===(o=t.children.length)?null:t.children[0],0===o||t.children.every(function(t){return(t.type===l.Text||t.type===l.Raw)&&""===t.value}))e.allowEmpty?(this.stream.write(">"),e.state=f.CloseTag,this.stream.write("</"+t.name+">")):(e.state=f.CloseTag,this.stream.write(e.spaceBeforeSlash+"/>"));else if(!e.pretty||1!==o||s.type!==l.Text&&s.type!==l.Raw||null==s.value){for(this.stream.write(">"+this.endline(t,e,r)),e.state=f.InsideTag,a=0,u=(p=t.children).length;a<u;a++)i=p[a],this.writeChildNode(i,e,r+1);e.state=f.CloseTag,this.stream.write(this.indent(t,e,r)+"</"+t.name+">")}else this.stream.write(">"),e.state=f.InsideTag,e.suppressPrettyCount++,this.writeChildNode(s,e,r+1),e.suppressPrettyCount--,e.state=f.CloseTag,this.stream.write("</"+t.name+">");return this.stream.write(this.endline(t,e,r)),e.state=f.None,this.closeNode(t,e,r)},n.prototype.processingInstruction=function(t,e,r){return this.stream.write(n.__super__.processingInstruction.call(this,t,e,r))},n.prototype.raw=function(t,e,r){return this.stream.write(n.__super__.raw.call(this,t,e,r))},n.prototype.text=function(t,e,r){return this.stream.write(n.__super__.text.call(this,t,e,r))},n.prototype.dtdAttList=function(t,e,r){return this.stream.write(n.__super__.dtdAttList.call(this,t,e,r))},n.prototype.dtdElement=function(t,e,r){return this.stream.write(n.__super__.dtdElement.call(this,t,e,r))},n.prototype.dtdEntity=function(t,e,r){return this.stream.write(n.__super__.dtdEntity.call(this,t,e,r))},n.prototype.dtdNotation=function(t,e,r){return this.stream.write(n.__super__.dtdNotation.call(this,t,e,r))},n)}.call(this);
/***/},
/***/6434:
/***/function(r,t,n){
// Generated by CoffeeScript 1.12.7
!function(){var t,i={}.hasOwnProperty;function e(t){e.__super__.constructor.call(this,t)}t=n(751),r.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(e,t),e.prototype.document=function(t,e){var r,n,i,o,s;for(e=this.filterOptions(e),o="",n=0,i=(s=t.children).length;n<i;n++)r=s[n],o+=this.writeChildNode(r,e,0);return o=e.pretty&&o.slice(-e.newline.length)===e.newline?o.slice(0,-e.newline.length):o},e)}.call(this);
/***/},
/***/5549:
/***/function(e){
// Generated by CoffeeScript 1.12.7
!function(){function i(t,e){return function(){return t.apply(e,arguments)}}var o={}.hasOwnProperty;function t(t){var e,r,n;for(e in this.assertLegalName=i(this.assertLegalName,this),this.assertLegalChar=i(this.assertLegalChar,this),this.options=t=t||{},this.options.version||(this.options.version="1.0"),r=t.stringify||{})o.call(r,e)&&(n=r[e],this[e]=n)}e.exports=(t.prototype.name=function(t){return this.options.noValidation?t:this.assertLegalName(""+t||"")},t.prototype.text=function(t){return this.options.noValidation?t:this.assertLegalChar(this.textEscape(""+t||""))},t.prototype.cdata=function(t){return this.options.noValidation?t:(t=(t=""+t||"").replace("]]>","]]]]><![CDATA[>"),this.assertLegalChar(t))},t.prototype.comment=function(t){if(this.options.noValidation)return t;if((t=""+t||"").match(/--/))throw new Error("Comment text cannot contain double-hypen: "+t);return this.assertLegalChar(t)},t.prototype.raw=function(t){return this.options.noValidation?t:""+t||""},t.prototype.attValue=function(t){return this.options.noValidation?t:this.assertLegalChar(this.attEscape(t=""+t||""))},t.prototype.insTarget=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.insValue=function(t){if(this.options.noValidation)return t;if((t=""+t||"").match(/\?>/))throw new Error("Invalid processing instruction value: "+t);return this.assertLegalChar(t)},t.prototype.xmlVersion=function(t){if(this.options.noValidation)return t;if(!(t=""+t||"").match(/1\.[0-9]+/))throw new Error("Invalid version number: "+t);return t},t.prototype.xmlEncoding=function(t){if(this.options.noValidation)return t;if(!(t=""+t||"").match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/))throw new Error("Invalid encoding: "+t);return this.assertLegalChar(t)},t.prototype.xmlStandalone=function(t){return this.options.noValidation?t:t?"yes":"no"},t.prototype.dtdPubID=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.dtdSysID=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.dtdElementValue=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.dtdAttType=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.dtdAttDefault=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.dtdEntityValue=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.dtdNData=function(t){return this.options.noValidation?t:this.assertLegalChar(""+t||"")},t.prototype.convertAttKey="@",t.prototype.convertPIKey="?",t.prototype.convertTextKey="#text",t.prototype.convertCDataKey="#cdata",t.prototype.convertCommentKey="#comment",t.prototype.convertRawKey="#raw",t.prototype.assertLegalChar=function(t){var e;if(this.options.noValidation)return t;if("1.0"===this.options.version){if(e=t.match(/[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/))throw new Error("Invalid character in string: "+t+" at index "+e.index)}else if("1.1"===this.options.version&&(e=t.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/)))throw new Error("Invalid character in string: "+t+" at index "+e.index);return t},t.prototype.assertLegalName=function(t){if(this.options.noValidation)return t;if(this.assertLegalChar(t),!t.match(/^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/))throw new Error("Invalid character in name");return t},t.prototype.textEscape=function(t){var e;return this.options.noValidation?t:(e=this.options.noDoubleEncoding?/(?!&\S+;)&/g:/&/g,t.replace(e,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\r/g,"&#xD;"))},t.prototype.attEscape=function(t){var e;return this.options.noValidation?t:(e=this.options.noDoubleEncoding?/(?!&\S+;)&/g:/&/g,t.replace(e,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/\t/g,"&#x9;").replace(/\n/g,"&#xA;").replace(/\r/g,"&#xD;"))},t)}.call(this);
/***/},
/***/3595:
/***/function(e,t,o){
// Generated by CoffeeScript 1.12.7
!function(){var r,t,i={}.hasOwnProperty;function n(t,e){if(n.__super__.constructor.call(this,t),null==e)throw new Error("Missing element text. "+this.debugInfo());this.name="#text",this.type=r.Text,this.value=this.stringify.text(e)}r=o(9335),t=o(6488),e.exports=(function(t,e){for(var r in e)i.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype}(n,t),Object.defineProperty(n.prototype,"isElementContentWhitespace",{get:function(){throw new Error("This DOM method is not implemented."+this.debugInfo())}}),Object.defineProperty(n.prototype,"wholeText",{get:function(){for(var t,e="",r=this.previousSibling;r;)e=r.data+e,r=r.previousSibling;for(e+=this.data,t=this.nextSibling;t;)e+=t.data,t=t.nextSibling;return e}}),n.prototype.clone=function(){return Object.create(this)},n.prototype.toString=function(t){return this.options.writer.text(this,this.options.writer.filterOptions(t))},n.prototype.splitText=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},n.prototype.replaceWholeText=function(t){throw new Error("This DOM method is not implemented."+this.debugInfo())},n)}.call(this);
/***/},
/***/751:
/***/function(e,t,r){
// Generated by CoffeeScript 1.12.7
!function(){var m,w,n,b={}.hasOwnProperty;function t(t){var e,r,n;for(e in r=(this.options=t=t||{}).writer||{})b.call(r,e)&&(n=r[e],this["_"+e]=this[e],this[e]=n)}n=r(8369).assign,m=r(9335),r(9077),r(6544),r(6170),r(2096),r(2161),r(9406),r(3595),r(9181),r(8833),r(1179),r(6347),r(9078),r(4777),w=r(594),e.exports=(t.prototype.filterOptions=function(t){var e,r;return t=n({},this.options,t=t||{}),(e={writer:this}).pretty=t.pretty||!1,e.allowEmpty=t.allowEmpty||!1,e.indent=null!=(r=t.indent)?r:"  ",e.newline=null!=(r=t.newline)?r:"\n",e.offset=null!=(r=t.offset)?r:0,e.dontPrettyTextNodes=null!=(r=null!=(r=t.dontPrettyTextNodes)?r:t.dontprettytextnodes)?r:0,e.spaceBeforeSlash=null!=(t=null!=(r=t.spaceBeforeSlash)?r:t.spacebeforeslash)?t:"",!0===e.spaceBeforeSlash&&(e.spaceBeforeSlash=" "),e.suppressPrettyCount=0,e.user={},e.state=w.None,e},t.prototype.indent=function(t,e,r){var n;return e.pretty&&!e.suppressPrettyCount&&e.pretty&&0<(n=(r||0)+e.offset+1)?new Array(n).join(e.indent):""},t.prototype.endline=function(t,e,r){return!e.pretty||e.suppressPrettyCount?"":e.newline},t.prototype.attribute=function(t,e,r){var n;return this.openAttribute(t,e,r),n=" "+t.name+'="'+t.value+'"',this.closeAttribute(t,e,r),n},t.prototype.cdata=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"<![CDATA[",e.state=w.InsideTag,n+=t.value,e.state=w.CloseTag,n+="]]>"+this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.comment=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"\x3c!-- ",e.state=w.InsideTag,n+=t.value,e.state=w.CloseTag,n+=" --\x3e"+this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.declaration=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"<?xml",e.state=w.InsideTag,n+=' version="'+t.version+'"',null!=t.encoding&&(n+=' encoding="'+t.encoding+'"'),null!=t.standalone&&(n+=' standalone="'+t.standalone+'"'),e.state=w.CloseTag,n+=e.spaceBeforeSlash+"?>",n+=this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.docType=function(t,e,r){var n,i,o,s,a;if(this.openNode(t,e,r=r||0),e.state=w.OpenTag,s=this.indent(t,e,r),s+="<!DOCTYPE "+t.root().name,t.pubID&&t.sysID?s+=' PUBLIC "'+t.pubID+'" "'+t.sysID+'"':t.sysID&&(s+=' SYSTEM "'+t.sysID+'"'),0<t.children.length){for(s+=" [",s+=this.endline(t,e,r),e.state=w.InsideTag,i=0,o=(a=t.children).length;i<o;i++)n=a[i],s+=this.writeChildNode(n,e,r+1);e.state=w.CloseTag,s+="]"}return e.state=w.CloseTag,s+=e.spaceBeforeSlash+">",s+=this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),s},t.prototype.element=function(t,e,r){var n,i,o,s,a,u,c,h,p,l,f,d,y=!1,g="";for(p in this.openNode(t,e,r=r||0),e.state=w.OpenTag,g+=this.indent(t,e,r)+"<"+t.name,l=t.attribs)b.call(l,p)&&(n=l[p],g+=this.attribute(n,e,r));if(s=0===(o=t.children.length)?null:t.children[0],0===o||t.children.every(function(t){return(t.type===m.Text||t.type===m.Raw)&&""===t.value}))e.allowEmpty?(g+=">",e.state=w.CloseTag,g+="</"+t.name+">"+this.endline(t,e,r)):(e.state=w.CloseTag,g+=e.spaceBeforeSlash+"/>"+this.endline(t,e,r));else if(!e.pretty||1!==o||s.type!==m.Text&&s.type!==m.Raw||null==s.value){if(e.dontPrettyTextNodes)for(a=0,c=(f=t.children).length;a<c;a++)if(((i=f[a]).type===m.Text||i.type===m.Raw)&&null!=i.value){e.suppressPrettyCount++,y=!0;break}for(g+=">"+this.endline(t,e,r),e.state=w.InsideTag,u=0,h=(d=t.children).length;u<h;u++)i=d[u],g+=this.writeChildNode(i,e,r+1);e.state=w.CloseTag,g+=this.indent(t,e,r)+"</"+t.name+">",y&&e.suppressPrettyCount--,g+=this.endline(t,e,r),e.state=w.None}else g+=">",e.state=w.InsideTag,e.suppressPrettyCount++,y=!0,g+=this.writeChildNode(s,e,r+1),e.suppressPrettyCount--,y=!1,e.state=w.CloseTag,g+="</"+t.name+">"+this.endline(t,e,r);return this.closeNode(t,e,r),g},t.prototype.writeChildNode=function(t,e,r){switch(t.type){case m.CData:return this.cdata(t,e,r);case m.Comment:return this.comment(t,e,r);case m.Element:return this.element(t,e,r);case m.Raw:return this.raw(t,e,r);case m.Text:return this.text(t,e,r);case m.ProcessingInstruction:return this.processingInstruction(t,e,r);case m.Dummy:return"";case m.Declaration:return this.declaration(t,e,r);case m.DocType:return this.docType(t,e,r);case m.AttributeDeclaration:return this.dtdAttList(t,e,r);case m.ElementDeclaration:return this.dtdElement(t,e,r);case m.EntityDeclaration:return this.dtdEntity(t,e,r);case m.NotationDeclaration:return this.dtdNotation(t,e,r);default:throw new Error("Unknown XML node type: "+t.constructor.name)}},t.prototype.processingInstruction=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"<?",e.state=w.InsideTag,n+=t.target,t.value&&(n+=" "+t.value),e.state=w.CloseTag,n+=e.spaceBeforeSlash+"?>",n+=this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.raw=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r),e.state=w.InsideTag,n+=t.value,e.state=w.CloseTag,n+=this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.text=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r),e.state=w.InsideTag,n+=t.value,e.state=w.CloseTag,n+=this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.dtdAttList=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"<!ATTLIST",e.state=w.InsideTag,n+=" "+t.elementName+" "+t.attributeName+" "+t.attributeType,"#DEFAULT"!==t.defaultValueType&&(n+=" "+t.defaultValueType),t.defaultValue&&(n+=' "'+t.defaultValue+'"'),e.state=w.CloseTag,n+=e.spaceBeforeSlash+">"+this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.dtdElement=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"<!ELEMENT",e.state=w.InsideTag,n+=" "+t.name+" "+t.value,e.state=w.CloseTag,n+=e.spaceBeforeSlash+">"+this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.dtdEntity=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"<!ENTITY",e.state=w.InsideTag,t.pe&&(n+=" %"),n+=" "+t.name,t.value?n+=' "'+t.value+'"':(t.pubID&&t.sysID?n+=' PUBLIC "'+t.pubID+'" "'+t.sysID+'"':t.sysID&&(n+=' SYSTEM "'+t.sysID+'"'),t.nData&&(n+=" NDATA "+t.nData)),e.state=w.CloseTag,n+=e.spaceBeforeSlash+">"+this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.dtdNotation=function(t,e,r){var n;return this.openNode(t,e,r),e.state=w.OpenTag,n=this.indent(t,e,r)+"<!NOTATION",e.state=w.InsideTag,n+=" "+t.name,t.pubID&&t.sysID?n+=' PUBLIC "'+t.pubID+'" "'+t.sysID+'"':t.pubID?n+=' PUBLIC "'+t.pubID+'"':t.sysID&&(n+=' SYSTEM "'+t.sysID+'"'),e.state=w.CloseTag,n+=e.spaceBeforeSlash+">"+this.endline(t,e,r),e.state=w.None,this.closeNode(t,e,r),n},t.prototype.openNode=function(t,e,r){},t.prototype.closeNode=function(t,e,r){},t.prototype.openAttribute=function(t,e,r){},t.prototype.closeAttribute=function(t,e,r){},t)}.call(this);
/***/},
/***/5532:
/***/function(c,t,h){
// Generated by CoffeeScript 1.12.7
!function(){var t=h(8369),i=t.assign,o=t.isFunction,e=h(1770),s=h(6934),a=h(9227),r=h(6434),n=h(1996),u=h(9335),t=h(594);c.exports.create=function(t,e,r,n){if(null==t)throw new Error("Root element needs a name.");return n=i({},e,r,n),t=(r=new s(n)).element(t),n.headless||(r.declaration(n),null==n.pubID&&null==n.sysID||r.dtd(n)),t},c.exports.begin=function(t,e,r){var n;return o(t)&&(e=(n=[t,e])[0],r=n[1],t={}),e?new a(t,e,r):new s(t)},c.exports.stringWriter=function(t){return new r(t)},c.exports.streamWriter=function(t,e){return new n(t,e)},c.exports.implementation=new e,c.exports.nodeType=u,c.exports.writerState=t}.call(this);
/***/}
/******/},n={};
/************************************************************************/
/******/ // The module cache
/******/
/******/
/******/ // The require function
/******/function d(t){
/******/ // Check if module is in cache
/******/if(n[t])
/******/return n[t].exports;
/******/
/******/ // Create a new module (and put it into the cache)
/******/var e=n[t]={
/******/ // no module.id needed
/******/ // no module.loaded needed
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/
/******/
/******/ // Return the exports of the module
/******/return r[t].call(e.exports,e,e.exports,d),e.exports;
/******/}
/******/
/************************************************************************/
(()=>{"use strict";class i{constructor({wood:t=0,stone:e=0,iron:r=0}){this.wood=t,this.stone=e,this.iron=r}add(t,e=1){return null==t||(this.wood+=t.wood*e,this.stone+=t.stone*e,this.iron+=t.iron*e),this}static zero(){return new i({wood:0,stone:0,iron:0})}}var o,s,t;(t=o=o||{}).MAIN="main",t.BARRACKS="barracks",t.STABLE="stable",t.SIEGE_FACTORY="garage",t.SNOB="snob",t.SMITH="smith",t.PLACE="place",t.STATUE="statue",t.MARKET="market",t.WOOD_CUTTER="wood",t.CLAY_PIT="stone",t.IRON_MINE="iron",t.FARM="farm",t.STORAGE="storage",t.HIDE="hide",t.WALL="wall",(t=s=s||{}).SPEAR="spear",t.SWORD="sword",t.AXE="axe",t.SPY="spy",t.LIGHT="light",t.HEAVY="heavy",t.ARCHER="archer",t.MOUNTED_ARCHER="marcher",t.RAM="ram",t.CATAPULT="catapult",t.PALADIN="knight",t.SNOB="snob",t.MILITIA="militia";
// EXTERNAL MODULE: ./node_modules/xml2js/lib/xml2js.js
var e=d(5055);function a(){return{units:// CONCATENATED MODULE: ./src/common/world-config.ts
//todo rewrite those fetches to async + return promise
function(){const i=Array();return $.ajax({url:"/interface.php?func=get_unit_info",type:"get",async:!1,success:function(t){(0,e.parseString)((new XMLSerializer).serializeToString(t),{explicitArray:!1,normalize:!0},function(t,e){for(var r of Object.keys(s)){var n=r.toLowerCase(),n=game_data.units.includes(n);i.push({inGame:n,name:s[r]})}})},error:function(){throw UI.ErrorMessage("An error occurred while downloading data. Refresh the page to try again",5e3),new Error("interrupted script")}}),i}(),buildings:function(){let n=[];return $.ajax({url:"/interface.php?func=get_building_info",type:"get",async:!1,success:function(t){(0,e.parseString)((new XMLSerializer).serializeToString(t),{explicitArray:!1,normalize:!0},function(t,e){let r=e.config;Object.values(o).forEach(t=>{var e;r.hasOwnProperty(t)&&(e=r[t],n.push({resourceFactor:{wood:parseFloat(e.wood_factor),stone:parseFloat(e.stone_factor),iron:parseFloat(e.iron_factor)},buildingType:t,startPrice:{wood:parseInt(e.wood),stone:parseInt(e.stone),iron:parseInt(e.iron)},startPopulation:parseInt(e.pop),populationFactor:parseInt(e.pop_factor),minLevel:parseInt(e.min_level),maxLevel:parseInt(e.max_level)}))})})},error:function(){throw UI.ErrorMessage("An error occurred while downloading data. Refresh the page to try again",5e3),new Error("interrupted script")}}),n}(),night:function(){let r;return $.ajax({url:"/interface.php?func=get_config",type:"get",async:!1,success:function(t){(0,e.parseString)((new XMLSerializer).serializeToString(t),{explicitArray:!1,normalize:!0},function(t,e){e=e.config.night;r={active:"1"===e.active,start:parseInt(e.start_hour)%24,end:parseInt(e.end_hour)%24}})},error:function(){throw UI.ErrorMessage("An error occurred while downloading data. Refresh the page to try again",5e3),new Error("interrupted script")}}),r}()}}function u(t,e){return new n((t=t,e=e,new r(t,e,localStorage)))}
/**
 * Storage IO operations in JSON format.
 */class r{constructor(t,e,r){this.key=t,this.defaultValueSupplier=e,this.storage=r}get(){var t=this.storage.getItem(this.key);if(null!==t)return JSON.parse(t);t=this.defaultValueSupplier();return this.set(t),t}set(t){this.storage.setItem(this.key,JSON.stringify(t))}setCallback(t){var e=this.get();t(e),this.set(e)}exist(){return null!=this.storage.getItem(this.key)}remove(){this.storage.removeItem(this.key)}}class n{constructor(t){this.query=t,this.value=t.get()}store(t=t=>{}){t(this.value),this.query.set(this.value)}remove(){this.query.remove()}forceRefresh(){return this.value=this.query.get(),this.value}}// CONCATENATED MODULE: ./src/common/world-config-logic.ts
class c{constructor(e){this.config=new Map,this.inGameUnits=Array(),this.config=e,this.inGameUnits=Object.values(s).filter(t=>e.get(t).inGame)}unit(t){return this.config.get(t)}armyCost(r){const n=i.zero();return this.inGameUnits.forEach(t=>{var e=c.unitsConfig.get(t),t=r.units(t);n.wood+=t*e.recruit.wood,n.stone+=t*e.recruit.stone,n.iron+=t*e.recruit.iron}),n}attackerKillScore(r){let n=0;return this.inGameUnits.forEach(t=>{var e=c.unitsConfig.get(t),t=r.units(t);n+=e.killScore.asAttacker*t}),n}defenderKillScore(r){let n=0;return this.inGameUnits.forEach(t=>{var e=c.unitsConfig.get(t),t=r.units(t);n+=e.killScore.asDefender*t}),n}population(r){let n=0;return this.inGameUnits.forEach(t=>{var e=c.unitsConfig.get(t),t=r.units(t);n+=e.population*t}),n}}c.unitsConfig=new Map([[s.SPEAR,{recruit:new i({wood:50,stone:30,iron:10}),killScore:{asAttacker:4,asDefender:1},population:1}],[s.SWORD,{recruit:new i({wood:30,stone:30,iron:70}),killScore:{asAttacker:5,asDefender:2},population:1}],[s.AXE,{recruit:new i({wood:60,stone:30,iron:40}),killScore:{asAttacker:1,asDefender:4},population:1}],[s.ARCHER,{recruit:new i({wood:100,stone:30,iron:60}),killScore:{asAttacker:5,asDefender:2},population:1}],[s.SPY,{recruit:new i({wood:50,stone:50,iron:20}),killScore:{asAttacker:1,asDefender:2},population:2}],[s.LIGHT,{recruit:new i({wood:125,stone:100,iron:250}),killScore:{asAttacker:5,asDefender:13},population:4}],[s.MOUNTED_ARCHER,{recruit:new i({wood:250,stone:100,iron:150}),killScore:{asAttacker:6,asDefender:12},population:5}],[s.HEAVY,{recruit:new i({wood:200,stone:150,iron:600}),killScore:{asAttacker:23,asDefender:15},population:6}],[s.RAM,{recruit:new i({wood:300,stone:200,iron:200}),killScore:{asAttacker:4,asDefender:8},population:5}],[s.CATAPULT,{recruit:new i({wood:320,stone:400,iron:100}),killScore:{asAttacker:12,asDefender:10},population:8}],[s.PALADIN,{recruit:new i({wood:20,stone:20,iron:40}),killScore:{asAttacker:40,asDefender:20},population:10}],[s.SNOB,{recruit:new i({wood:4e4,stone:5e4,iron:5e4}),killScore:{asAttacker:200,asDefender:200},population:100}],[s.MILITIA,{recruit:new i({wood:0,stone:0,iron:0}),killScore:{asAttacker:1,asDefender:4},population:0}]]);class h{constructor(t){this.buildingsConfig=t}type(t){return this.buildingsConfig.get(t)}}class p{constructor(t){this.data=t}costBetweenLevels(t,e){var r=Math.min(t,e),e=Math.max(t,e);return new i({wood:p.cost(this.data.startPrice.wood,this.data.resourceFactor.wood,r,e),stone:p.cost(this.data.startPrice.stone,this.data.resourceFactor.stone,r,e),iron:p.cost(this.data.startPrice.iron,this.data.resourceFactor.iron,r,e)})}static cost(e,r,n,i){let o=Math.pow(r,n),s=0;for(let t=n;t<i;t++)s+=o*e,o*=r;return Math.ceil(s)}}
/**
 * Retrieve config for current world. Download once and cache results per game world.
 */// CONCATENATED MODULE: ./src/map-unit-arrival/index.ts
// ==UserScript==
// @name        Map - Unit Arrival
// @description  TW Map - Unit Arrival on pointed village
// @include https://*/game.php?*screen=map*
// @author TW_Scripter
// ==/UserScript==
const l=function(){const t=u(`${game_data.world}-pubWorldConfig_v1`,()=>{const t=new Date;return{expireAt:t.setHours(t.getHours()+24),config:a()}});let e=t.value;e.expireAt>Date.now()&&(t.remove(),e=t.forceRefresh());const r=new Map;e.config.units.forEach(t=>{r.set(t.name,{inGame:t.inGame})});const n=new Map;return e.config.buildings.forEach(t=>{n.set(t.buildingType,new p(t))}),{units:new c(r),buildings:new h(n),night:e.config.night}}();function f(){const t=$("#map_popup");if(0!==t.find("#info_points_row").length){t.find(".unit_landing_times").remove();const a=new Intl.DateTimeFormat("cs-CZ",{month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",hour12:!1});t.find("#info_content > tbody tr").each((t,e)=>{const r=$(e).find("td > table > tbody");if(0!==r.length){const s=Array();
//ehm there is not way how to distinguish between tables used for building, unit march times etc so lest just try to parse it
$(e).find("td > table > tbody").find("tr > td").each((t,e)=>{const r=e.textContent;if(null!=r){var n=r.trim().split(":");if(3===n.length){var i=parseInt(n[0]),e=parseInt(n[1]),n=parseInt(n[2]);const o=new Date;o.setHours(o.getHours()+i),o.setMinutes(o.getMinutes()+e),o.setSeconds(o.getSeconds()+n);n=(n=o,!!l.night.active&&(n.getHours()>=l.night.start&&n.getHours()<l.night.end))?"red":"green",t=t%2==0?"#F8F4E8":"#DED3B9";s.push(`<td style="color: ${n}; padding:2px;background-color:${t}">${a.format(o)}</td>`)}}}),0!==s.length&&r.append(`
            <tr class="center unit_landing_times">
                ${s}
            </tr>
        `)}})}}$(function(){var t=document.querySelector("#map_popup");null!==t&&new MutationObserver(function(t){f()}).observe(t,{attributes:!0})})})()})();