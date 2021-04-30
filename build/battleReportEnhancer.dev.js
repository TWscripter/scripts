/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

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
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/emitter-component/index.js":
/*!*************************************************!*\
  !*** ./node_modules/emitter-component/index.js ***!
  \*************************************************/
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
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



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/safe-buffer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/safe-buffer/index.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ "./node_modules/sax/lib/sax.js":
/*!*************************************!*\
  !*** ./node_modules/sax/lib/sax.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

;(function (sax) { // wrapper for non-node envs
  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
  sax.SAXParser = SAXParser
  sax.SAXStream = SAXStream
  sax.createStream = createStream

  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.
  sax.MAX_BUFFER_LENGTH = 64 * 1024

  var buffers = [
    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
    'procInstName', 'procInstBody', 'entity', 'attribName',
    'attribValue', 'cdata', 'script'
  ]

  sax.EVENTS = [
    'text',
    'processinginstruction',
    'sgmldeclaration',
    'doctype',
    'comment',
    'opentagstart',
    'attribute',
    'opentag',
    'closetag',
    'opencdata',
    'cdata',
    'closecdata',
    'error',
    'end',
    'ready',
    'script',
    'opennamespace',
    'closenamespace'
  ]

  function SAXParser (strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt)
    }

    var parser = this
    clearBuffers(parser)
    parser.q = parser.c = ''
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
    parser.opt = opt || {}
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase'
    parser.tags = []
    parser.closed = parser.closedRoot = parser.sawRoot = false
    parser.tag = parser.error = null
    parser.strict = !!strict
    parser.noscript = !!(strict || parser.opt.noscript)
    parser.state = S.BEGIN
    parser.strictEntities = parser.opt.strictEntities
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES)
    parser.attribList = []

    // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.
    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS)
    }

    // mostly just for error reporting
    parser.trackPosition = parser.opt.position !== false
    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0
    }
    emit(parser, 'onready')
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F () {}
      F.prototype = o
      var newf = new F()
      return newf
    }
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = []
      for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
      return a
    }
  }

  function checkBufferLength (parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    var maxActual = 0
    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length
      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser)
            break

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata)
            parser.cdata = ''
            break

          case 'script':
            emitNode(parser, 'onscript', parser.script)
            parser.script = ''
            break

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i])
        }
      }
      maxActual = Math.max(maxActual, len)
    }
    // schedule the next check for the earliest possible buffer overrun.
    var m = sax.MAX_BUFFER_LENGTH - maxActual
    parser.bufferCheckPosition = m + parser.position
  }

  function clearBuffers (parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = ''
    }
  }

  function flushBuffers (parser) {
    closeText(parser)
    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata)
      parser.cdata = ''
    }
    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }
  }

  SAXParser.prototype = {
    end: function () { end(this) },
    write: write,
    resume: function () { this.error = null; return this },
    close: function () { return this.write(null) },
    flush: function () { flushBuffers(this) }
  }

  var Stream
  try {
    Stream = __webpack_require__(/*! stream */ "./node_modules/stream/index.js").Stream
  } catch (ex) {
    Stream = function () {}
  }

  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end'
  })

  function createStream (strict, opt) {
    return new SAXStream(strict, opt)
  }

  function SAXStream (strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt)
    }

    Stream.apply(this)

    this._parser = new SAXParser(strict, opt)
    this.writable = true
    this.readable = true

    var me = this

    this._parser.onend = function () {
      me.emit('end')
    }

    this._parser.onerror = function (er) {
      me.emit('error', er)

      // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.
      me._parser.error = null
    }

    this._decoder = null

    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function () {
          return me._parser['on' + ev]
        },
        set: function (h) {
          if (!h) {
            me.removeAllListeners(ev)
            me._parser['on' + ev] = h
            return h
          }
          me.on(ev, h)
        },
        enumerable: true,
        configurable: false
      })
    })
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  })

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = __webpack_require__(/*! string_decoder */ "./node_modules/string_decoder/lib/string_decoder.js").StringDecoder
        this._decoder = new SD('utf8')
      }
      data = this._decoder.write(data)
    }

    this._parser.write(data.toString())
    this.emit('data', data)
    return true
  }

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk)
    }
    this._parser.end()
    return true
  }

  SAXStream.prototype.on = function (ev, handler) {
    var me = this
    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
        args.splice(0, 0, ev)
        me.emit.apply(me, args)
      }
    }

    return Stream.prototype.on.call(me, ev, handler)
  }

  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  var CDATA = '[CDATA['
  var DOCTYPE = 'DOCTYPE'
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'
  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  // This implementation works on strings, a single character at a time
  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  // without a significant breaking change to either this  parser, or the
  // JavaScript language.  Implementation of an emoji-capable xml parser
  // is left as an exercise for the reader.
  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  function isWhitespace (c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
  }

  function isQuote (c) {
    return c === '"' || c === '\''
  }

  function isAttribEnd (c) {
    return c === '>' || isWhitespace(c)
  }

  function isMatch (regex, c) {
    return regex.test(c)
  }

  function notMatch (regex, c) {
    return !isMatch(regex, c)
  }

  var S = 0
  sax.STATE = {
    BEGIN: S++, // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++, // leading whitespace
    TEXT: S++, // general stuff
    TEXT_ENTITY: S++, // &amp and such.
    OPEN_WAKA: S++, // <
    SGML_DECL: S++, // <!BLARG
    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
    DOCTYPE: S++, // <!DOCTYPE
    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++, // <!-
    COMMENT: S++, // <!--
    COMMENT_ENDING: S++, // <!-- blah -
    COMMENT_ENDED: S++, // <!-- blah --
    CDATA: S++, // <![CDATA[ something
    CDATA_ENDING: S++, // ]
    CDATA_ENDING_2: S++, // ]]
    PROC_INST: S++, // <?hi
    PROC_INST_BODY: S++, // <?hi there
    PROC_INST_ENDING: S++, // <?hi "there" ?
    OPEN_TAG: S++, // <strong
    OPEN_TAG_SLASH: S++, // <strong /
    ATTRIB: S++, // <a
    ATTRIB_NAME: S++, // <a foo
    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
    ATTRIB_VALUE: S++, // <a foo=
    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
    CLOSE_TAG: S++, // </a
    CLOSE_TAG_SAW_WHITE: S++, // </a   >
    SCRIPT: S++, // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <
  }

  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  }

  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  }

  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
  })

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s
  }

  // shorthand
  S = sax.STATE

  function emit (parser, event, data) {
    parser[event] && parser[event](data)
  }

  function emitNode (parser, nodeType, data) {
    if (parser.textNode) closeText(parser)
    emit(parser, nodeType, data)
  }

  function closeText (parser) {
    parser.textNode = textopts(parser.opt, parser.textNode)
    if (parser.textNode) emit(parser, 'ontext', parser.textNode)
    parser.textNode = ''
  }

  function textopts (opt, text) {
    if (opt.trim) text = text.trim()
    if (opt.normalize) text = text.replace(/\s+/g, ' ')
    return text
  }

  function error (parser, er) {
    closeText(parser)
    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line +
        '\nColumn: ' + parser.column +
        '\nChar: ' + parser.c
    }
    er = new Error(er)
    parser.error = er
    emit(parser, 'onerror', er)
    return parser
  }

  function end (parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag')
    if ((parser.state !== S.BEGIN) &&
      (parser.state !== S.BEGIN_WHITESPACE) &&
      (parser.state !== S.TEXT)) {
      error(parser, 'Unexpected end')
    }
    closeText(parser)
    parser.c = ''
    parser.closed = true
    emit(parser, 'onend')
    SAXParser.call(parser, parser.strict, parser.opt)
    return parser
  }

  function strictFail (parser, message) {
    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail')
    }
    if (parser.strict) {
      error(parser, message)
    }
  }

  function newTag (parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
    var parent = parser.tags[parser.tags.length - 1] || parser
    var tag = parser.tag = { name: parser.tagName, attributes: {} }

    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
    if (parser.opt.xmlns) {
      tag.ns = parent.ns
    }
    parser.attribList.length = 0
    emitNode(parser, 'onopentagstart', tag)
  }

  function qname (name, attribute) {
    var i = name.indexOf(':')
    var qualName = i < 0 ? [ '', name ] : name.split(':')
    var prefix = qualName[0]
    var local = qualName[1]

    // <x "xmlns"="http://foo">
    if (attribute && name === 'xmlns') {
      prefix = 'xmlns'
      local = ''
    }

    return { prefix: prefix, local: local }
  }

  function attrib (parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]()
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = ''
      return
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true)
      var prefix = qn.prefix
      var local = qn.local

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser,
            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser,
            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else {
          var tag = parser.tag
          var parent = parser.tags[parser.tags.length - 1] || parser
          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns)
          }
          tag.ns[local] = parser.attribValue
        }
      }

      // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order
      parser.attribList.push([parser.attribName, parser.attribValue])
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      })
    }

    parser.attribName = parser.attribValue = ''
  }

  function openTag (parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag

      // add namespace info to tag
      var qn = qname(parser.tagName)
      tag.prefix = qn.prefix
      tag.local = qn.local
      tag.uri = tag.ns[qn.prefix] || ''

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' +
          JSON.stringify(parser.tagName))
        tag.uri = qn.prefix
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          })
        })
      }

      // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting
      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i]
        var name = nv[0]
        var value = nv[1]
        var qualName = qname(name, true)
        var prefix = qualName.prefix
        var local = qualName.local
        var uri = prefix === '' ? '' : (tag.ns[prefix] || '')
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri
        }

        // if there's any attributes with an undefined namespace,
        // then fail on them now.
        if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' +
            JSON.stringify(prefix))
          a.uri = prefix
        }
        parser.tag.attributes[name] = a
        emitNode(parser, 'onattribute', a)
      }
      parser.attribList.length = 0
    }

    parser.tag.isSelfClosing = !!selfClosing

    // process the tag
    parser.sawRoot = true
    parser.tags.push(parser.tag)
    emitNode(parser, 'onopentag', parser.tag)
    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT
      } else {
        parser.state = S.TEXT
      }
      parser.tag = null
      parser.tagName = ''
    }
    parser.attribName = parser.attribValue = ''
    parser.attribList.length = 0
  }

  function closeTag (parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.')
      parser.textNode += '</>'
      parser.state = S.TEXT
      return
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>'
        parser.tagName = ''
        parser.state = S.SCRIPT
        return
      }
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }

    // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.
    var t = parser.tags.length
    var tagName = parser.tagName
    if (!parser.strict) {
      tagName = tagName[parser.looseCase]()
    }
    var closeTo = tagName
    while (t--) {
      var close = parser.tags[t]
      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag')
      } else {
        break
      }
    }

    // didn't find it.  we already failed for strict, so just abort.
    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName)
      parser.textNode += '</' + parser.tagName + '>'
      parser.state = S.TEXT
      return
    }
    parser.tagName = tagName
    var s = parser.tags.length
    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop()
      parser.tagName = parser.tag.name
      emitNode(parser, 'onclosetag', parser.tagName)

      var x = {}
      for (var i in tag.ns) {
        x[i] = tag.ns[i]
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p]
          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n })
        })
      }
    }
    if (t === 0) parser.closedRoot = true
    parser.tagName = parser.attribValue = parser.attribName = ''
    parser.attribList.length = 0
    parser.state = S.TEXT
  }

  function parseEntity (parser) {
    var entity = parser.entity
    var entityLC = entity.toLowerCase()
    var num
    var numStr = ''

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity]
    }
    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC]
    }
    entity = entityLC
    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2)
        num = parseInt(entity, 16)
        numStr = num.toString(16)
      } else {
        entity = entity.slice(1)
        num = parseInt(entity, 10)
        numStr = num.toString(10)
      }
    }
    entity = entity.replace(/^0+/, '')
    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity')
      return '&' + parser.entity + ';'
    }

    return String.fromCodePoint(num)
  }

  function beginWhiteSpace (parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA
      parser.startTagPosition = parser.position
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.')
      parser.textNode = c
      parser.state = S.TEXT
    }
  }

  function charAt (chunk, i) {
    var result = ''
    if (i < chunk.length) {
      result = chunk.charAt(i)
    }
    return result
  }

  function write (chunk) {
    var parser = this
    if (this.error) {
      throw this.error
    }
    if (parser.closed) {
      return error(parser,
        'Cannot write after close. Assign an onready handler.')
    }
    if (chunk === null) {
      return end(parser)
    }
    if (typeof chunk === 'object') {
      chunk = chunk.toString()
    }
    var i = 0
    var c = ''
    while (true) {
      c = charAt(chunk, i++)
      parser.c = c

      if (!c) {
        break
      }

      if (parser.trackPosition) {
        parser.position++
        if (c === '\n') {
          parser.line++
          parser.column = 0
        } else {
          parser.column++
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE
          if (c === '\uFEFF') {
            continue
          }
          beginWhiteSpace(parser, c)
          continue

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c)
          continue

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1
            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++)
              if (c && parser.trackPosition) {
                parser.position++
                if (c === '\n') {
                  parser.line++
                  parser.column = 0
                } else {
                  parser.column++
                }
              }
            }
            parser.textNode += chunk.substring(starti, i - 1)
          }
          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA
            parser.startTagPosition = parser.position
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.')
            }
            if (c === '&') {
              parser.state = S.TEXT_ENTITY
            } else {
              parser.textNode += c
            }
          }
          continue

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING
          } else {
            parser.script += c
          }
          continue

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG
          } else {
            parser.script += '<' + c
            parser.state = S.SCRIPT
          }
          continue

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL
            parser.sgmlDecl = ''
          } else if (isWhitespace(c)) {
            // wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG
            parser.tagName = c
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG
            parser.tagName = ''
          } else if (c === '?') {
            parser.state = S.PROC_INST
            parser.procInstName = parser.procInstBody = ''
          } else {
            strictFail(parser, 'Unencoded <')
            // if there was some whitespace, then add that in.
            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition
              c = new Array(pad).join(' ') + c
            }
            parser.textNode += '<' + c
            parser.state = S.TEXT
          }
          continue

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata')
            parser.state = S.CDATA
            parser.sgmlDecl = ''
            parser.cdata = ''
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT
            parser.comment = ''
            parser.sgmlDecl = ''
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE
            if (parser.doctype || parser.sawRoot) {
              strictFail(parser,
                'Inappropriately located doctype declaration')
            }
            parser.doctype = ''
            parser.sgmlDecl = ''
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl)
            parser.sgmlDecl = ''
            parser.state = S.TEXT
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED
            parser.sgmlDecl += c
          } else {
            parser.sgmlDecl += c
          }
          continue

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL
            parser.q = ''
          }
          parser.sgmlDecl += c
          continue

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT
            emitNode(parser, 'ondoctype', parser.doctype)
            parser.doctype = true // just remember that we saw it.
          } else {
            parser.doctype += c
            if (c === '[') {
              parser.state = S.DOCTYPE_DTD
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED
              parser.q = c
            }
          }
          continue

        case S.DOCTYPE_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.q = ''
            parser.state = S.DOCTYPE
          }
          continue

        case S.DOCTYPE_DTD:
          parser.doctype += c
          if (c === ']') {
            parser.state = S.DOCTYPE
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED
            parser.q = c
          }
          continue

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD
            parser.q = ''
          }
          continue

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING
          } else {
            parser.comment += c
          }
          continue

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED
            parser.comment = textopts(parser.opt, parser.comment)
            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment)
            }
            parser.comment = ''
          } else {
            parser.comment += '-' + c
            parser.state = S.COMMENT
          }
          continue

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment')
            // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "
            parser.comment += '--' + c
            parser.state = S.COMMENT
          } else {
            parser.state = S.TEXT
          }
          continue

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING
          } else {
            parser.cdata += c
          }
          continue

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2
          } else {
            parser.cdata += ']' + c
            parser.state = S.CDATA
          }
          continue

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata)
            }
            emitNode(parser, 'onclosecdata')
            parser.cdata = ''
            parser.state = S.TEXT
          } else if (c === ']') {
            parser.cdata += ']'
          } else {
            parser.cdata += ']]' + c
            parser.state = S.CDATA
          }
          continue

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY
          } else {
            parser.procInstName += c
          }
          continue

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else {
            parser.procInstBody += c
          }
          continue

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            })
            parser.procInstName = parser.procInstBody = ''
            parser.state = S.TEXT
          } else {
            parser.procInstBody += '?' + c
            parser.state = S.PROC_INST_BODY
          }
          continue

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else {
            newTag(parser)
            if (c === '>') {
              openTag(parser)
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name')
              }
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true)
            closeTag(parser)
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >')
            parser.state = S.ATTRIB
          }
          continue

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value')
            parser.attribValue = parser.attribName
            attrib(parser)
            openTag(parser)
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (isWhitespace(c)) {
            continue
          } else {
            strictFail(parser, 'Attribute without value')
            parser.tag.attributes[parser.attribName] = ''
            parser.attribValue = ''
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            })
            parser.attribName = ''
            if (c === '>') {
              openTag(parser)
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c
              parser.state = S.ATTRIB_NAME
            } else {
              strictFail(parser, 'Invalid attribute name')
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue
          } else if (isQuote(c)) {
            parser.q = c
            parser.state = S.ATTRIB_VALUE_QUOTED
          } else {
            strictFail(parser, 'Unquoted attribute value')
            parser.state = S.ATTRIB_VALUE_UNQUOTED
            parser.attribValue = c
          }
          continue

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          parser.q = ''
          parser.state = S.ATTRIB_VALUE_CLOSED
          continue

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes')
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          if (c === '>') {
            openTag(parser)
          } else {
            parser.state = S.ATTRIB
          }
          continue

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c
                parser.state = S.SCRIPT
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.')
              }
            } else {
              parser.tagName = c
            }
          } else if (c === '>') {
            closeTag(parser)
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else if (parser.script) {
            parser.script += '</' + parser.tagName
            parser.tagName = ''
            parser.state = S.SCRIPT
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag')
            }
            parser.state = S.CLOSE_TAG_SAW_WHITE
          }
          continue

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue
          }
          if (c === '>') {
            closeTag(parser)
          } else {
            strictFail(parser, 'Invalid characters in closing tag')
          }
          continue

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState
          var buffer
          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT
              buffer = 'textNode'
              break

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED
              buffer = 'attribValue'
              break

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED
              buffer = 'attribValue'
              break
          }

          if (c === ';') {
            parser[buffer] += parseEntity(parser)
            parser.entity = ''
            parser.state = returnState
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c
          } else {
            strictFail(parser, 'Invalid character in entity name')
            parser[buffer] += '&' + parser.entity + c
            parser.entity = ''
            parser.state = returnState
          }

          continue

        default:
          throw new Error(parser, 'Unknown state: ' + parser.state)
      }
    } // while

    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser)
    }
    return parser
  }

  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  /* istanbul ignore next */
  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode
      var floor = Math.floor
      var fromCodePoint = function () {
        var MAX_SIZE = 0x4000
        var codeUnits = []
        var highSurrogate
        var lowSurrogate
        var index = -1
        var length = arguments.length
        if (!length) {
          return ''
        }
        var result = ''
        while (++index < length) {
          var codePoint = Number(arguments[index])
          if (
            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) !== codePoint // not an integer
          ) {
            throw RangeError('Invalid code point: ' + codePoint)
          }
          if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint)
          } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000
            highSurrogate = (codePoint >> 10) + 0xD800
            lowSurrogate = (codePoint % 0x400) + 0xDC00
            codeUnits.push(highSurrogate, lowSurrogate)
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits)
            codeUnits.length = 0
          }
        }
        return result
      }
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        })
      } else {
        String.fromCodePoint = fromCodePoint
      }
    }())
  }
})( false ? 0 : exports)


/***/ }),

/***/ "./node_modules/stream/index.js":
/*!**************************************!*\
  !*** ./node_modules/stream/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

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

var Emitter = __webpack_require__(/*! emitter */ "./node_modules/emitter-component/index.js");

function Stream() {
  Emitter.call(this);
}
Stream.prototype = new Emitter();
module.exports = Stream;
// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (!this.hasListeners('error')) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.off('data', ondata);
    dest.off('drain', ondrain);

    source.off('end', onend);
    source.off('close', onclose);

    source.off('error', onerror);
    dest.off('error', onerror);

    source.off('end', cleanup);
    source.off('close', cleanup);

    dest.off('end', cleanup);
    dest.off('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('end', cleanup);
  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
}


/***/ }),

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
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



/*<replacement>*/

var Buffer = __webpack_require__(/*! safe-buffer */ "./node_modules/safe-buffer/index.js").Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ "./node_modules/timers/index.js":
/*!**************************************!*\
  !*** ./node_modules/timers/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.every = function(str) {
  return new Every(str);
};

/*
  Time map
*/

var time = {
  millisecond: 1,
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000
};

for (var key in time) {
  if (key === 'millisecond') {
    time.ms = time[key];
  } else {
    time[key.charAt(0)] = time[key];
  }
  time[key + 's'] = time[key];
}


/*
  Every constructor
*/

function Every(str) {
  this.count = 0;
  var m = parse(str);
  if (m) {
    this.time = Number(m[0]) * time[m[1]];
    this.type = m[1];
  }
}

Every.prototype.do = function(cb) {
  if (this.time) {
    this.interval = setInterval(callback, this.time);
  }

  var that = this;
  function callback() {
    that.count++;
    cb.call(that);
  }
  return this;
};

Every.prototype.stop = function() {
  if (this.interval) {
    clearInterval(this.interval);
    delete this.interval;
  }
  return this;
};


/*
  Convert string to milliseconds

    ms, millisecond(s)?
    s, second(s)?
    m, minute(s)?
    h, hour(s)?
    d, day(s)?
*/
var reg = /^\s*(\d+(?:\.\d+)?)\s*([a-z]+)\s*$/;

function parse(str) {
  var m = str.match(reg);
  if (m && time[m[2]]) {
    return m.slice(1);
  }
  return null;
}


/***/ }),

/***/ "./src/battle-report-enhancer/localization.ts":
/*!****************************************************!*\
  !*** ./src/battle-report-enhancer/localization.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveLocalizationData": () => (/* binding */ resolveLocalizationData)
/* harmony export */ });
/* harmony import */ var _common_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/model */ "./src/common/model.ts");

function resolveLocalizationData() {
    const localizationData = new Map();
    const gameLocale = game_data.locale;
    /**
     * To localise this script add locale from your game. type `game_data.locale` to web browser console while present on TW page.
     */
    localizationData.set("cs_CZ", {
        parse: {
            resourceStolen: "Kořist",
            buildingDamageSourceCatapult: "Škoda vzniklá střelbou z katapultu:",
            buildingDamageSourceRam: "Škoda vzniklá beranidlem:",
            reportText2BuildingType: [
                { localizedText: "Hlavní", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.MAIN },
                { localizedText: "Kasárna", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.BARRACKS },
                { localizedText: "Stáje", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.STABLE },
                { localizedText: "Dílna", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.SIEGE_FACTORY },
                { localizedText: "Panský", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.SNOB },
                { localizedText: "Kovárna", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.SMITH },
                { localizedText: "Nádvoří", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.PLACE },
                { localizedText: "Socha", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.STATUE },
                { localizedText: "Tržiště", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.MARKET },
                { localizedText: "Dřevorubec", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.WOOD_CUTTER },
                { localizedText: "Lom", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.CLAY_PIT },
                { localizedText: "Železný", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.IRON_MINE },
                { localizedText: "Selský", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.FARM },
                { localizedText: "Skladiště", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.STORAGE },
                { localizedText: "Skrýš", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.HIDE },
                { localizedText: "Hradby", type: _common_model__WEBPACK_IMPORTED_MODULE_0__.BuildingType.WALL }
            ]
        },
        outputText: {
            attackerUnitsLostCostText: "Surovinové ztráty útočníka - jednotky",
            defenderUnitsLostCostText: "Surovinové ztráty obránce - jednotky",
            defenderLostResourcesTotal: "Surovinové ztráty obránce - celkem",
            killScoreAsAttacker: "Jako útočník",
            killScoreAsDefender: "Jako obránce"
        }
    });
    const buildingDamageData = localizationData.get(gameLocale);
    if (buildingDamageData == null) {
        UI.ErrorMessage(`Report enhancer won't work correctly for your game language mutation ${gameLocale}. Add transactions for correct behaviour. 
        Or raise issue to github repo https://github.com/TWscripter/scripts and help to resolve needed translations.`, 5000);
        return localizationData.entries()[0];
    }
    return buildingDamageData;
}



/***/ }),

/***/ "./src/battle-report-enhancer/main.ts":
/*!********************************************!*\
  !*** ./src/battle-report-enhancer/main.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_world_config_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/world-config-logic */ "./src/common/world-config-logic.ts");
/* harmony import */ var _common_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/model */ "./src/common/model.ts");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser */ "./src/battle-report-enhancer/parser.ts");
/* harmony import */ var _localization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./localization */ "./src/battle-report-enhancer/localization.ts");
/* harmony import */ var _common_logic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/logic */ "./src/common/logic.ts");
// ==UserScript==
// @name     Battle Report Enhancer - kill scores, spent resources
// @description Enhance TW report with kill score, lost resources etc
// @include https://*/game.php?*screen=report*
// @include https://*/game.php?*screen=forum*
// @author TW_Scripter
// ==/UserScript==





const numberFormatter = (0,_common_logic__WEBPACK_IMPORTED_MODULE_4__.numberFormatterClosure)("?");
const localization = (0,_localization__WEBPACK_IMPORTED_MODULE_3__.resolveLocalizationData)();
const reportParser = new _parser__WEBPACK_IMPORTED_MODULE_2__.ReportParser(localization, (0,_common_world_config_logic__WEBPACK_IMPORTED_MODULE_0__.loadWorldConfig)());
function addCss() {
    const style = `<style>
            .kill-score-text {
                display: inline-block;
                float: right;
            }
            .green-text {
                color: green;
            }
            .red-text {
                color: red;
            }
    </style>`;
    $("#content_value").prepend(style);
}
addCss();
function enrichReport(context) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (context.find("#attack_info_att_units").length === 0)
        return;
    const parsedReport = reportParser.parseReport(context);
    addUnitLosesData(context.find("#attack_info_att"), "green-text", parsedReport.attacker);
    addUnitLosesData(context.find("#attack_info_def"), "red-text", parsedReport.defender.units);
    const defenderTotalLostResources = _common_model__WEBPACK_IMPORTED_MODULE_1__.Resources.zero()
        .add((_a = parsedReport.defender.units) === null || _a === void 0 ? void 0 : _a.armyLosesCost)
        .add((_c = (_b = parsedReport.defender.buildingDamage) === null || _b === void 0 ? void 0 : _b.cat) === null || _c === void 0 ? void 0 : _c.buildCost)
        .add((_e = (_d = parsedReport.defender.buildingDamage) === null || _d === void 0 ? void 0 : _d.ram) === null || _e === void 0 ? void 0 : _e.buildCost)
        .add(parsedReport.defender.stolen);
    const ramDamage = (_f = parsedReport.defender.buildingDamage) === null || _f === void 0 ? void 0 : _f.ram;
    (_g = ramDamage === null || ramDamage === void 0 ? void 0 : ramDamage.jQueryElement) === null || _g === void 0 ? void 0 : _g.append(formatResourcesWithPopulation(ramDamage === null || ramDamage === void 0 ? void 0 : ramDamage.buildCost));
    const catapultDamage = parsedReport.defender.buildingDamage.cat;
    (_h = catapultDamage === null || catapultDamage === void 0 ? void 0 : catapultDamage.jQueryElement) === null || _h === void 0 ? void 0 : _h.append(formatResourcesWithPopulation(catapultDamage === null || catapultDamage === void 0 ? void 0 : catapultDamage.buildCost));
    context.find("#attack_results tbody").append(`
        <tr>
            <th>${localization.outputText.defenderLostResourcesTotal}:</th>
            <td colspan="2">${formatResourcesWithPopulation(defenderTotalLostResources)}</td>
        </tr>`);
}
function enrichNormalReportWithScores() {
    //normal reports
    const reportScreen = $(".report_ReportAttack");
    reportScreen.each((index, element) => {
        enrichReport($(element));
    });
    if (reportScreen.length === 0) {
        //forum reports
        $("table.vis").each((index, element) => {
            const context = $(element);
            if (context.find("#attack_results")) {
                enrichReport(context);
            }
        });
    }
}
function addUnitLosesData(context, killScoreColor, results) {
    const playerName = context.find('tbody > tr:nth-child(1) > th:nth-child(2)');
    const playerNameLink = $(playerName).find("a");
    //reset added text in case of multiple evaluations
    //@ts-ignore
    playerName.html(playerNameLink);
    playerNameLink.after(`<th class="kill-score-text ${killScoreColor}">${results.killScoreText}: ${numberFormatter(results.killScore)}</th>`);
    context.after(`
        <div class="nowrap">
            <h4>${results.armyLosesText}: </h4>
            ${formatResourcesWithPopulation(results === null || results === void 0 ? void 0 : results.armyLosesCost, results === null || results === void 0 ? void 0 : results.armyLosesPop)}
        </div>
    `);
}
function formatResourcesWithPopulation(resources, pop) {
    const population = pop == null ? "" : `<span class="icon header population"></span>${numberFormatter(pop)}`;
    return `<div class="nowrap">
         <span class="icon wood"></span>${numberFormatter(resources === null || resources === void 0 ? void 0 : resources.wood)}
         <span class="icon stone"></span>${numberFormatter(resources === null || resources === void 0 ? void 0 : resources.stone)}
         <span class="icon iron"></span>${numberFormatter(resources === null || resources === void 0 ? void 0 : resources.iron)}
         ${population}
    </div>`;
}
enrichNormalReportWithScores();
$(function () {
    const target = document.querySelector('.report-preview');
    if (target === null)
        return;
    new MutationObserver(function (mutations) {
        const $report = $(".report-preview");
        if ($report.prop("style").display !== 'none') {
            enrichReport($report);
        }
    }).observe(target, {
        attributes: true
    });
});


/***/ }),

/***/ "./src/battle-report-enhancer/parser.ts":
/*!**********************************************!*\
  !*** ./src/battle-report-enhancer/parser.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReportParser": () => (/* binding */ ReportParser)
/* harmony export */ });
/* harmony import */ var _common_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/model */ "./src/common/model.ts");
/* harmony import */ var _common_logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/logic */ "./src/common/logic.ts");


class ReportParser {
    constructor(localizationData, worldConfig) {
        this.localizationData = localizationData;
        this.worldConfig = worldConfig;
    }
    parseReport(context) {
        const defenderArmyLoses = this.fillArmy(context.find("#attack_info_def_units tbody > tr:nth-child(3) > .unit-item"));
        const attackerArmyLoses = this.fillArmy(context.find("#attack_info_att_units tbody > tr:nth-child(3) > .unit-item"));
        const buildingDamage = this.parseBuildingDamageAndStolenData(context);
        return {
            defender: {
                units: {
                    armyLosesCost: this.worldConfig.units.armyCost(defenderArmyLoses),
                    armyLosesPop: this.worldConfig.units.population(defenderArmyLoses),
                    armyLosesText: this.localizationData.outputText.defenderUnitsLostCostText,
                    killScore: this.worldConfig.units.defenderKillScore(attackerArmyLoses),
                    killScoreText: this.localizationData.outputText.killScoreAsDefender,
                },
                buildingDamage: buildingDamage,
                stolen: buildingDamage.stolen
            },
            attacker: {
                armyLosesCost: this.worldConfig.units.armyCost(attackerArmyLoses),
                armyLosesPop: this.worldConfig.units.population(attackerArmyLoses),
                armyLosesText: this.localizationData.outputText.attackerUnitsLostCostText,
                killScore: this.worldConfig.units.attackerKillScore(defenderArmyLoses),
                killScoreText: this.localizationData.outputText.killScoreAsAttacker
            },
        };
    }
    parseBuildingDamageAndStolenData(context) {
        const demolitions = context.find("#attack_results tbody tr");
        let ram = null;
        let cat = null;
        let stolen = _common_model__WEBPACK_IMPORTED_MODULE_0__.Resources.zero();
        demolitions.each((index, element) => {
            const defenderAdditionalDamages = $(element).find("th").text();
            const data = $(element).find("td");
            if (defenderAdditionalDamages.startsWith(this.localizationData.parse.resourceStolen)) {
                data.find("span").each((index, element) => {
                    const spanQuery = $(element);
                    if (spanQuery.hasClass("wood")) {
                        stolen.wood = (0,_common_logic__WEBPACK_IMPORTED_MODULE_1__.parseIntAndRemoveNonNum)(spanQuery.closest(".nowrap").text());
                    }
                    else if (spanQuery.hasClass("stone")) {
                        stolen.stone = (0,_common_logic__WEBPACK_IMPORTED_MODULE_1__.parseIntAndRemoveNonNum)(spanQuery.closest(".nowrap").text());
                    }
                    else if (spanQuery.hasClass("iron")) {
                        stolen.iron = (0,_common_logic__WEBPACK_IMPORTED_MODULE_1__.parseIntAndRemoveNonNum)(spanQuery.closest(".nowrap").text());
                    }
                });
            }
            else if (defenderAdditionalDamages.startsWith(this.localizationData.parse.buildingDamageSourceRam)) {
                ram = this.parseDemolitions(data);
            }
            else if (defenderAdditionalDamages.startsWith(this.localizationData.parse.buildingDamageSourceCatapult)) {
                cat = this.parseDemolitions(data);
            }
        });
        return {
            ram: ram,
            cat: cat,
            stolen: stolen
        };
    }
    parseDemolitions(source) {
        const text = source.text();
        const demolishedBuilding = this.localizationData.parse.reportText2BuildingType.find((e) => {
            return text.startsWith(e.localizedText);
        }).type;
        const startLevel = (0,_common_logic__WEBPACK_IMPORTED_MODULE_1__.parseIntAndRemoveNonNum)(source.find("b")[0].textContent);
        const demolishedToLevel = (0,_common_logic__WEBPACK_IMPORTED_MODULE_1__.parseIntAndRemoveNonNum)(source.find("b")[1].textContent);
        const buildingConfig = this.worldConfig.buildings.type(demolishedBuilding);
        const resources = buildingConfig.costBetweenLevels(startLevel, demolishedToLevel);
        return {
            buildingType: demolishedBuilding,
            buildCost: resources,
            jQueryElement: source
        };
    }
    fillArmy(allLostUnits) {
        if (allLostUnits.length === 0)
            return null;
        const army = _common_model__WEBPACK_IMPORTED_MODULE_0__.Army.empty();
        this.worldConfig.units.inGameUnits.forEach(unit => {
            const lostUnitsText = allLostUnits.filter(`.unit-item-${unit}`).text();
            const lostUnits = lostUnitsText === "" ? 0 : parseInt(lostUnitsText);
            army.setUnits(unit, lostUnits);
        });
        return army;
    }
}



/***/ }),

/***/ "./src/common/logic.ts":
/*!*****************************!*\
  !*** ./src/common/logic.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "numberFormatterClosure": () => (/* binding */ numberFormatterClosure),
/* harmony export */   "parseIntAndRemoveNonNum": () => (/* binding */ parseIntAndRemoveNonNum)
/* harmony export */ });
/**
 * Create number formatter for game locale which will use default value when formatted values is null
 */
function numberFormatterClosure(defaultValue) {
    const formatter = new Intl.NumberFormat(game_data.locale.replace("_", "-"));
    return (value) => {
        if (value == null)
            return defaultValue;
        return formatter.format(value);
    };
}
function parseIntAndRemoveNonNum(input) {
    const parsed = parseInt(input.replace(/\D/g, ''));
    if (isNaN(parsed)) {
        return 0;
    }
    else
        return parsed;
}



/***/ }),

/***/ "./src/common/model.ts":
/*!*****************************!*\
  !*** ./src/common/model.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resources": () => (/* binding */ Resources),
/* harmony export */   "BuildingType": () => (/* binding */ BuildingType),
/* harmony export */   "UnitTypes": () => (/* binding */ UnitTypes),
/* harmony export */   "Army": () => (/* binding */ Army)
/* harmony export */ });
class Army {
    constructor({ spear = 0, sword = 0, axe = 0, spy = 0, light = 0, heavy = 0, archer = 0, mountedArcher = 0, ram = 0, cat = 0, paladin = 0, snob = 0, militia = 0 }) {
        this.spear = spear;
        this.sword = sword;
        this.axe = axe;
        this.spy = spy;
        this.light = light;
        this.heavy = heavy;
        this.archer = archer;
        this.mountedArcher = mountedArcher;
        this.ram = ram;
        this.cat = cat;
        this.knight = paladin;
        this.snob = snob;
        this.militia = militia;
    }
    units(unitName) {
        //is this ok? or switch?
        return this[unitName];
    }
    setUnits(unitName, count) {
        this[unitName] = count;
    }
    static empty() {
        return new Army({});
    }
}
class Resources {
    constructor({ wood = 0, stone = 0, iron = 0 }) {
        this.wood = wood;
        this.stone = stone;
        this.iron = iron;
    }
    add(resource, times = 1) {
        if (resource === undefined || resource === null)
            return this;
        this.wood += resource.wood * times;
        this.stone += resource.stone * times;
        this.iron += resource.iron * times;
        return this;
    }
    static zero() {
        return new Resources({ wood: 0, stone: 0, iron: 0 });
    }
}
var BuildingType;
(function (BuildingType) {
    BuildingType["MAIN"] = "main";
    BuildingType["BARRACKS"] = "barracks";
    BuildingType["STABLE"] = "stable";
    BuildingType["SIEGE_FACTORY"] = "garage";
    BuildingType["SNOB"] = "snob";
    BuildingType["SMITH"] = "smith";
    BuildingType["PLACE"] = "place";
    BuildingType["STATUE"] = "statue";
    BuildingType["MARKET"] = "market";
    BuildingType["WOOD_CUTTER"] = "wood";
    BuildingType["CLAY_PIT"] = "stone";
    BuildingType["IRON_MINE"] = "iron";
    BuildingType["FARM"] = "farm";
    BuildingType["STORAGE"] = "storage";
    BuildingType["HIDE"] = "hide";
    BuildingType["WALL"] = "wall";
})(BuildingType || (BuildingType = {}));
var UnitTypes;
(function (UnitTypes) {
    UnitTypes["SPEAR"] = "spear";
    UnitTypes["SWORD"] = "sword";
    UnitTypes["AXE"] = "axe";
    UnitTypes["SPY"] = "spy";
    UnitTypes["LIGHT"] = "light";
    UnitTypes["HEAVY"] = "heavy";
    UnitTypes["ARCHER"] = "archer";
    UnitTypes["MOUNTED_ARCHER"] = "marcher";
    UnitTypes["RAM"] = "ram";
    UnitTypes["CATAPULT"] = "catapult";
    UnitTypes["PALADIN"] = "knight";
    UnitTypes["SNOB"] = "snob";
    UnitTypes["MILITIA"] = "militia";
})(UnitTypes || (UnitTypes = {}));



/***/ }),

/***/ "./src/common/storage.ts":
/*!*******************************!*\
  !*** ./src/common/storage.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "genericLocalQuery": () => (/* binding */ genericLocalQuery),
/* harmony export */   "genericCachedLocalQuery": () => (/* binding */ genericCachedLocalQuery)
/* harmony export */ });
function genericLocalQuery(key, defaultValue) {
    return new StorageQuery(key, defaultValue, localStorage);
}
function genericCachedLocalQuery(key, defaultValue) {
    return new CachedStorageQuery(genericLocalQuery(key, defaultValue));
}
/**
 * Storage IO operations in JSON format.
 */
class StorageQuery {
    constructor(key, defaultValueSupplier, storage) {
        this.key = key;
        this.defaultValueSupplier = defaultValueSupplier;
        this.storage = storage;
    }
    get() {
        const storedValue = this.storage.getItem(this.key);
        if (storedValue === null) {
            const defaultValue = this.defaultValueSupplier();
            this.set(defaultValue);
            return defaultValue;
        }
        return JSON.parse(storedValue);
    }
    set(value) {
        this.storage.setItem(this.key, JSON.stringify(value));
    }
    setCallback(storeCallback) {
        const storedVal = this.get();
        storeCallback(storedVal);
        this.set(storedVal);
    }
    exist() {
        return this.storage.getItem(this.key) != null;
    }
    remove() {
        this.storage.removeItem(this.key);
    }
}
class CachedStorageQuery {
    constructor(query) {
        this.query = query;
        this.value = query.get();
    }
    store(storeCallback = (value) => { }) {
        storeCallback(this.value);
        this.query.set(this.value);
    }
    remove() {
        this.query.remove();
    }
    forceRefresh() {
        this.value = this.query.get();
        return this.value;
    }
}


/***/ }),

/***/ "./src/common/world-config-logic.ts":
/*!******************************************!*\
  !*** ./src/common/world-config-logic.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadWorldConfig": () => (/* binding */ loadWorldConfig)
/* harmony export */ });
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/common/model.ts");
/* harmony import */ var _world_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./world-config */ "./src/common/world-config.ts");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/common/storage.ts");



class UnitsConfig {
    constructor(units) {
        this.config = new Map();
        this.inGameUnits = Array();
        this.config = units;
        this.inGameUnits = Object.values(_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes).filter(unitName => {
            return units.get(unitName).inGame;
        });
    }
    unit(name) {
        return this.config.get(name);
    }
    armyCost(army) {
        const resources = _model__WEBPACK_IMPORTED_MODULE_0__.Resources.zero();
        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            resources.wood += unitCount * unitCfg.recruit.wood;
            resources.stone += unitCount * unitCfg.recruit.stone;
            resources.iron += unitCount * unitCfg.recruit.iron;
        });
        return resources;
    }
    attackerKillScore(army) {
        let killScore = 0;
        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            killScore += unitCfg.killScore.asAttacker * unitCount;
        });
        return killScore;
    }
    defenderKillScore(army) {
        let killScore = 0;
        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            killScore += unitCfg.killScore.asDefender * unitCount;
        });
        return killScore;
    }
    population(army) {
        let population = 0;
        this.inGameUnits.forEach(unitName => {
            let unitCfg = UnitsConfig.unitsConfig.get(unitName);
            const unitCount = army.units(unitName);
            population += unitCfg.population * unitCount;
        });
        return population;
    }
}
UnitsConfig.unitsConfig = new Map([
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.SPEAR, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 50, stone: 30, iron: 10 }),
            killScore: {
                asAttacker: 4,
                asDefender: 1
            },
            population: 1
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.SWORD, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 30, stone: 30, iron: 70 }),
            killScore: {
                asAttacker: 5,
                asDefender: 2
            },
            population: 1
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.AXE, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 60, stone: 30, iron: 40 }),
            killScore: {
                asAttacker: 1,
                asDefender: 4
            },
            population: 1
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.ARCHER, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 100, stone: 30, iron: 60 }),
            killScore: {
                asAttacker: 5,
                asDefender: 2
            },
            population: 1
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.SPY, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 50, stone: 50, iron: 20 }),
            killScore: {
                asAttacker: 1,
                asDefender: 2
            },
            population: 2
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.LIGHT, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 125, stone: 100, iron: 250 }),
            killScore: {
                asAttacker: 5,
                asDefender: 13
            },
            population: 4
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.MOUNTED_ARCHER, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 250, stone: 100, iron: 150 }),
            killScore: {
                asAttacker: 6,
                asDefender: 12
            },
            population: 5
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.HEAVY, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 200, stone: 150, iron: 600 }),
            killScore: {
                asAttacker: 23,
                asDefender: 15
            },
            population: 6
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.RAM, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 300, stone: 200, iron: 200 }),
            killScore: {
                asAttacker: 4,
                asDefender: 8
            },
            population: 5
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.CATAPULT, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 320, stone: 400, iron: 100 }),
            killScore: {
                asAttacker: 12,
                asDefender: 10
            },
            population: 8
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.PALADIN, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 20, stone: 20, iron: 40 }),
            killScore: {
                asAttacker: 40,
                asDefender: 20
            },
            population: 10
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.SNOB, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 40000, stone: 50000, iron: 50000 }),
            killScore: {
                asAttacker: 200,
                asDefender: 200
            },
            population: 100
        }],
    [_model__WEBPACK_IMPORTED_MODULE_0__.UnitTypes.MILITIA, {
            recruit: new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({ wood: 0, stone: 0, iron: 0 }),
            killScore: {
                asAttacker: 1,
                asDefender: 4
            },
            population: 0
        }],
]);
class StaticUnitConfig {
}
class BuildingsConfig {
    constructor(buildingsConfig) {
        this.buildingsConfig = buildingsConfig;
    }
    type(type) {
        return this.buildingsConfig.get(type);
    }
}
class BuildingConfig {
    constructor(data) {
        this.data = data;
    }
    costBetweenLevels(startLevel, endLevel) {
        const lowerLevel = Math.min(startLevel, endLevel);
        const higherLevel = Math.max(startLevel, endLevel);
        return new _model__WEBPACK_IMPORTED_MODULE_0__.Resources({
            wood: BuildingConfig.cost(this.data.startPrice.wood, this.data.resourceFactor.wood, lowerLevel, higherLevel),
            stone: BuildingConfig.cost(this.data.startPrice.stone, this.data.resourceFactor.stone, lowerLevel, higherLevel),
            iron: BuildingConfig.cost(this.data.startPrice.iron, this.data.resourceFactor.iron, lowerLevel, higherLevel)
        });
    }
    static cost(startPrice, factor, lowerLevel, higherLevel) {
        let factorStartLevel = Math.pow(factor, lowerLevel);
        let price = 0;
        for (let level = lowerLevel; level < higherLevel; level++) {
            price += factorStartLevel * startPrice;
            factorStartLevel *= factor;
        }
        return Math.ceil(price);
    }
}
/**
 * Retrieve config for current world. Download once and cache results per game world.
 */
function loadWorldConfig() {
    const query = (0,_storage__WEBPACK_IMPORTED_MODULE_2__.genericCachedLocalQuery)(`${game_data.world}-pubWorldConfig_v1`, () => {
        const now = new Date();
        return {
            expireAt: now.setHours(now.getHours() + 24),
            config: (0,_world_config__WEBPACK_IMPORTED_MODULE_1__.fetchWorldConfigData)()
        };
    });
    let cfg = query.value;
    if (cfg.expireAt > Date.now()) {
        query.remove();
        cfg = query.forceRefresh();
    }
    const units = new Map();
    cfg.config.units.forEach(unitCfg => {
        units.set(unitCfg.name, {
            inGame: unitCfg.inGame
        });
    });
    const buildings = new Map();
    cfg.config.buildings.forEach(data => {
        buildings.set(data.buildingType, new BuildingConfig(data));
    });
    return {
        units: new UnitsConfig(units),
        buildings: new BuildingsConfig(buildings),
        night: cfg.config.night
    };
}



/***/ }),

/***/ "./src/common/world-config.ts":
/*!************************************!*\
  !*** ./src/common/world-config.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchWorldConfigData": () => (/* binding */ fetchWorldConfigData)
/* harmony export */ });
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xml2js */ "./node_modules/xml2js/lib/xml2js.js");
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml2js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/common/model.ts");


//todo rewrite those fetches to async + return promise
function fetchUnitsConfig() {
    const cfg = Array();
    $.ajax({
        url: "/interface.php?func=get_unit_info", type: "get", async: false,
        success: function (data) {
            (0,xml2js__WEBPACK_IMPORTED_MODULE_0__.parseString)(new XMLSerializer().serializeToString(data), {
                explicitArray: false,
                normalize: true
            }, function (err, result) {
                for (let unitName of Object.keys(_model__WEBPACK_IMPORTED_MODULE_1__.UnitTypes)) {
                    const unitNameLower = unitName.toLowerCase();
                    const unitIngame = game_data.units.includes(unitNameLower);
                    cfg.push({
                        inGame: unitIngame,
                        name: _model__WEBPACK_IMPORTED_MODULE_1__.UnitTypes[unitName]
                    });
                }
            });
        },
        error: function () {
            UI.ErrorMessage('An error occurred while downloading data. Refresh the page to try again', 5000);
            throw new Error('interrupted script');
        }
    });
    return cfg;
}
function fetchBuildingConfig() {
    let cfg = [];
    $.ajax({
        url: "/interface.php?func=get_building_info", type: "get", async: false,
        success: function (data) {
            (0,xml2js__WEBPACK_IMPORTED_MODULE_0__.parseString)(new XMLSerializer().serializeToString(data), {
                explicitArray: false,
                normalize: true
            }, function (err, result) {
                let config = result.config;
                Object.values(_model__WEBPACK_IMPORTED_MODULE_1__.BuildingType).forEach(buildingType => {
                    if (config.hasOwnProperty(buildingType)) {
                        let buildingConfig = config[buildingType];
                        cfg.push({
                            resourceFactor: {
                                wood: parseFloat(buildingConfig.wood_factor),
                                stone: parseFloat(buildingConfig.stone_factor),
                                iron: parseFloat(buildingConfig.iron_factor)
                            },
                            buildingType: buildingType,
                            startPrice: {
                                wood: parseInt(buildingConfig.wood),
                                stone: parseInt(buildingConfig.stone),
                                iron: parseInt(buildingConfig.iron)
                            },
                            startPopulation: parseInt(buildingConfig.pop),
                            populationFactor: parseInt(buildingConfig.pop_factor),
                            minLevel: parseInt(buildingConfig.min_level),
                            maxLevel: parseInt(buildingConfig.max_level)
                        });
                    }
                });
            });
        },
        error: function () {
            UI.ErrorMessage('An error occurred while downloading data. Refresh the page to try again', 5000);
            throw new Error('interrupted script');
        }
    });
    return cfg;
}
function fetchWorldConfig() {
    let nightBonusCfg;
    $.ajax({
        url: "/interface.php?func=get_config", type: "get", async: false,
        success: function (data) {
            (0,xml2js__WEBPACK_IMPORTED_MODULE_0__.parseString)(new XMLSerializer().serializeToString(data), {
                explicitArray: false,
                normalize: true
            }, function (err, result) {
                let xmlCfg = result.config;
                let night = xmlCfg.night;
                nightBonusCfg = {
                    active: night.active === "1",
                    start: parseInt(night.start_hour) % 24,
                    end: parseInt(night.end_hour) % 24
                };
            });
        },
        error: function () {
            UI.ErrorMessage('An error occurred while downloading data. Refresh the page to try again', 5000);
            throw new Error('interrupted script');
        }
    });
    return nightBonusCfg;
}
function fetchWorldConfigData() {
    return {
        units: fetchUnitsConfig(),
        buildings: fetchBuildingConfig(),
        night: fetchWorldConfig()
    };
}



/***/ }),

/***/ "./node_modules/xml2js/lib/bom.js":
/*!****************************************!*\
  !*** ./node_modules/xml2js/lib/bom.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  exports.stripBOM = function(str) {
    if (str[0] === '\uFEFF') {
      return str.substring(1);
    } else {
      return str;
    }
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/builder.js":
/*!********************************************!*\
  !*** ./node_modules/xml2js/lib/builder.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA,
    hasProp = {}.hasOwnProperty;

  builder = __webpack_require__(/*! xmlbuilder */ "./node_modules/xmlbuilder/lib/index.js");

  defaults = __webpack_require__(/*! ./defaults */ "./node_modules/xml2js/lib/defaults.js").defaults;

  requiresCDATA = function(entry) {
    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
  };

  wrapCDATA = function(entry) {
    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
  };

  escapeCDATA = function(entry) {
    return entry.replace(']]>', ']]]]><![CDATA[>');
  };

  exports.Builder = (function() {
    function Builder(opts) {
      var key, ref, value;
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
    }

    Builder.prototype.buildObject = function(rootObj) {
      var attrkey, charkey, render, rootElement, rootName;
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === defaults['0.2'].rootName)) {
        rootName = Object.keys(rootObj)[0];
        rootObj = rootObj[rootName];
      } else {
        rootName = this.options.rootName;
      }
      render = (function(_this) {
        return function(element, obj) {
          var attr, child, entry, index, key, value;
          if (typeof obj !== 'object') {
            if (_this.options.cdata && requiresCDATA(obj)) {
              element.raw(wrapCDATA(obj));
            } else {
              element.txt(obj);
            }
          } else if (Array.isArray(obj)) {
            for (index in obj) {
              if (!hasProp.call(obj, index)) continue;
              child = obj[index];
              for (key in child) {
                entry = child[key];
                element = render(element.ele(key), entry).up();
              }
            }
          } else {
            for (key in obj) {
              if (!hasProp.call(obj, key)) continue;
              child = obj[key];
              if (key === attrkey) {
                if (typeof child === "object") {
                  for (attr in child) {
                    value = child[attr];
                    element = element.att(attr, value);
                  }
                }
              } else if (key === charkey) {
                if (_this.options.cdata && requiresCDATA(child)) {
                  element = element.raw(wrapCDATA(child));
                } else {
                  element = element.txt(child);
                }
              } else if (Array.isArray(child)) {
                for (index in child) {
                  if (!hasProp.call(child, index)) continue;
                  entry = child[index];
                  if (typeof entry === 'string') {
                    if (_this.options.cdata && requiresCDATA(entry)) {
                      element = element.ele(key).raw(wrapCDATA(entry)).up();
                    } else {
                      element = element.ele(key, entry).up();
                    }
                  } else {
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else if (typeof child === "object") {
                element = render(element.ele(key), child).up();
              } else {
                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
                  element = element.ele(key).raw(wrapCDATA(child)).up();
                } else {
                  if (child == null) {
                    child = '';
                  }
                  element = element.ele(key, child.toString()).up();
                }
              }
            }
          }
          return element;
        };
      })(this);
      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
        headless: this.options.headless,
        allowSurrogateChars: this.options.allowSurrogateChars
      });
      return render(rootElement, rootObj).end(this.options.renderOpts);
    };

    return Builder;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/defaults.js":
/*!*********************************************!*\
  !*** ./node_modules/xml2js/lib/defaults.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  exports.defaults = {
    "0.1": {
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: "@",
      charkey: "#",
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: false,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '@@',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      emptyTag: ''
    },
    "0.2": {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      preserveChildrenOrder: false,
      childkey: '$$',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      rootName: 'root',
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': true
      },
      doctype: null,
      renderOpts: {
        'pretty': true,
        'indent': '  ',
        'newline': '\n'
      },
      headless: false,
      chunkSize: 10000,
      emptyTag: '',
      cdata: false
    }
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/parser.js":
/*!*******************************************!*\
  !*** ./node_modules/xml2js/lib/parser.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var bom, defaults, events, isEmpty, processItem, processors, sax, setImmediate,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  sax = __webpack_require__(/*! sax */ "./node_modules/sax/lib/sax.js");

  events = __webpack_require__(/*! events */ "./node_modules/events/events.js");

  bom = __webpack_require__(/*! ./bom */ "./node_modules/xml2js/lib/bom.js");

  processors = __webpack_require__(/*! ./processors */ "./node_modules/xml2js/lib/processors.js");

  setImmediate = __webpack_require__(/*! timers */ "./node_modules/timers/index.js").setImmediate;

  defaults = __webpack_require__(/*! ./defaults */ "./node_modules/xml2js/lib/defaults.js").defaults;

  isEmpty = function(thing) {
    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
  };

  processItem = function(processors, item, key) {
    var i, len, process;
    for (i = 0, len = processors.length; i < len; i++) {
      process = processors[i];
      item = process(item, key);
    }
    return item;
  };

  exports.Parser = (function(superClass) {
    extend(Parser, superClass);

    function Parser(opts) {
      this.parseStringPromise = bind(this.parseStringPromise, this);
      this.parseString = bind(this.parseString, this);
      this.reset = bind(this.reset, this);
      this.assignOrPush = bind(this.assignOrPush, this);
      this.processAsync = bind(this.processAsync, this);
      var key, ref, value;
      if (!(this instanceof exports.Parser)) {
        return new exports.Parser(opts);
      }
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
      if (this.options.xmlns) {
        this.options.xmlnskey = this.options.attrkey + "ns";
      }
      if (this.options.normalizeTags) {
        if (!this.options.tagNameProcessors) {
          this.options.tagNameProcessors = [];
        }
        this.options.tagNameProcessors.unshift(processors.normalize);
      }
      this.reset();
    }

    Parser.prototype.processAsync = function() {
      var chunk, err;
      try {
        if (this.remaining.length <= this.options.chunkSize) {
          chunk = this.remaining;
          this.remaining = '';
          this.saxParser = this.saxParser.write(chunk);
          return this.saxParser.close();
        } else {
          chunk = this.remaining.substr(0, this.options.chunkSize);
          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
          this.saxParser = this.saxParser.write(chunk);
          return setImmediate(this.processAsync);
        }
      } catch (error1) {
        err = error1;
        if (!this.saxParser.errThrown) {
          this.saxParser.errThrown = true;
          return this.emit(err);
        }
      }
    };

    Parser.prototype.assignOrPush = function(obj, key, newValue) {
      if (!(key in obj)) {
        if (!this.options.explicitArray) {
          return obj[key] = newValue;
        } else {
          return obj[key] = [newValue];
        }
      } else {
        if (!(obj[key] instanceof Array)) {
          obj[key] = [obj[key]];
        }
        return obj[key].push(newValue);
      }
    };

    Parser.prototype.reset = function() {
      var attrkey, charkey, ontext, stack;
      this.removeAllListeners();
      this.saxParser = sax.parser(this.options.strict, {
        trim: false,
        normalize: false,
        xmlns: this.options.xmlns
      });
      this.saxParser.errThrown = false;
      this.saxParser.onerror = (function(_this) {
        return function(error) {
          _this.saxParser.resume();
          if (!_this.saxParser.errThrown) {
            _this.saxParser.errThrown = true;
            return _this.emit("error", error);
          }
        };
      })(this);
      this.saxParser.onend = (function(_this) {
        return function() {
          if (!_this.saxParser.ended) {
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      this.saxParser.ended = false;
      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
      this.resultObject = null;
      stack = [];
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      this.saxParser.onopentag = (function(_this) {
        return function(node) {
          var key, newValue, obj, processedKey, ref;
          obj = {};
          obj[charkey] = "";
          if (!_this.options.ignoreAttrs) {
            ref = node.attributes;
            for (key in ref) {
              if (!hasProp.call(ref, key)) continue;
              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                obj[attrkey] = {};
              }
              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
              if (_this.options.mergeAttrs) {
                _this.assignOrPush(obj, processedKey, newValue);
              } else {
                obj[attrkey][processedKey] = newValue;
              }
            }
          }
          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
          if (_this.options.xmlns) {
            obj[_this.options.xmlnskey] = {
              uri: node.uri,
              local: node.local
            };
          }
          return stack.push(obj);
        };
      })(this);
      this.saxParser.onclosetag = (function(_this) {
        return function() {
          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
          obj = stack.pop();
          nodeName = obj["#name"];
          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
            delete obj["#name"];
          }
          if (obj.cdata === true) {
            cdata = obj.cdata;
            delete obj.cdata;
          }
          s = stack[stack.length - 1];
          if (obj[charkey].match(/^\s*$/) && !cdata) {
            emptyStr = obj[charkey];
            delete obj[charkey];
          } else {
            if (_this.options.trim) {
              obj[charkey] = obj[charkey].trim();
            }
            if (_this.options.normalize) {
              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
            }
            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
              obj = obj[charkey];
            }
          }
          if (isEmpty(obj)) {
            obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
          }
          if (_this.options.validator != null) {
            xpath = "/" + ((function() {
              var i, len, results;
              results = [];
              for (i = 0, len = stack.length; i < len; i++) {
                node = stack[i];
                results.push(node["#name"]);
              }
              return results;
            })()).concat(nodeName).join("/");
            (function() {
              var err;
              try {
                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
              } catch (error1) {
                err = error1;
                return _this.emit("error", err);
              }
            })();
          }
          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
            if (!_this.options.preserveChildrenOrder) {
              node = {};
              if (_this.options.attrkey in obj) {
                node[_this.options.attrkey] = obj[_this.options.attrkey];
                delete obj[_this.options.attrkey];
              }
              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                node[_this.options.charkey] = obj[_this.options.charkey];
                delete obj[_this.options.charkey];
              }
              if (Object.getOwnPropertyNames(obj).length > 0) {
                node[_this.options.childkey] = obj;
              }
              obj = node;
            } else if (s) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              objClone = {};
              for (key in obj) {
                if (!hasProp.call(obj, key)) continue;
                objClone[key] = obj[key];
              }
              s[_this.options.childkey].push(objClone);
              delete obj["#name"];
              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                obj = obj[charkey];
              }
            }
          }
          if (stack.length > 0) {
            return _this.assignOrPush(s, nodeName, obj);
          } else {
            if (_this.options.explicitRoot) {
              old = obj;
              obj = {};
              obj[nodeName] = old;
            }
            _this.resultObject = obj;
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      ontext = (function(_this) {
        return function(text) {
          var charChild, s;
          s = stack[stack.length - 1];
          if (s) {
            s[charkey] += text;
            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              charChild = {
                '#name': '__text__'
              };
              charChild[charkey] = text;
              if (_this.options.normalize) {
                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
              }
              s[_this.options.childkey].push(charChild);
            }
            return s;
          }
        };
      })(this);
      this.saxParser.ontext = ontext;
      return this.saxParser.oncdata = (function(_this) {
        return function(text) {
          var s;
          s = ontext(text);
          if (s) {
            return s.cdata = true;
          }
        };
      })(this);
    };

    Parser.prototype.parseString = function(str, cb) {
      var err;
      if ((cb != null) && typeof cb === "function") {
        this.on("end", function(result) {
          this.reset();
          return cb(null, result);
        });
        this.on("error", function(err) {
          this.reset();
          return cb(err);
        });
      }
      try {
        str = str.toString();
        if (str.trim() === '') {
          this.emit("end", null);
          return true;
        }
        str = bom.stripBOM(str);
        if (this.options.async) {
          this.remaining = str;
          setImmediate(this.processAsync);
          return this.saxParser;
        }
        return this.saxParser.write(str).close();
      } catch (error1) {
        err = error1;
        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
          this.emit('error', err);
          return this.saxParser.errThrown = true;
        } else if (this.saxParser.ended) {
          throw err;
        }
      }
    };

    Parser.prototype.parseStringPromise = function(str) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.parseString(str, function(err, value) {
            if (err) {
              return reject(err);
            } else {
              return resolve(value);
            }
          });
        };
      })(this));
    };

    return Parser;

  })(events);

  exports.parseString = function(str, a, b) {
    var cb, options, parser;
    if (b != null) {
      if (typeof b === 'function') {
        cb = b;
      }
      if (typeof a === 'object') {
        options = a;
      }
    } else {
      if (typeof a === 'function') {
        cb = a;
      }
      options = {};
    }
    parser = new exports.Parser(options);
    return parser.parseString(str, cb);
  };

  exports.parseStringPromise = function(str, a) {
    var options, parser;
    if (typeof a === 'object') {
      options = a;
    }
    parser = new exports.Parser(options);
    return parser.parseStringPromise(str);
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/processors.js":
/*!***********************************************!*\
  !*** ./node_modules/xml2js/lib/processors.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var prefixMatch;

  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  exports.normalize = function(str) {
    return str.toLowerCase();
  };

  exports.firstCharLowerCase = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  exports.stripPrefix = function(str) {
    return str.replace(prefixMatch, '');
  };

  exports.parseNumbers = function(str) {
    if (!isNaN(str)) {
      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
  };

  exports.parseBooleans = function(str) {
    if (/^(?:true|false)$/i.test(str)) {
      str = str.toLowerCase() === 'true';
    }
    return str;
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xml2js/lib/xml2js.js":
/*!*******************************************!*\
  !*** ./node_modules/xml2js/lib/xml2js.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, parser, processors,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  defaults = __webpack_require__(/*! ./defaults */ "./node_modules/xml2js/lib/defaults.js");

  builder = __webpack_require__(/*! ./builder */ "./node_modules/xml2js/lib/builder.js");

  parser = __webpack_require__(/*! ./parser */ "./node_modules/xml2js/lib/parser.js");

  processors = __webpack_require__(/*! ./processors */ "./node_modules/xml2js/lib/processors.js");

  exports.defaults = defaults.defaults;

  exports.processors = processors;

  exports.ValidationError = (function(superClass) {
    extend(ValidationError, superClass);

    function ValidationError(message) {
      this.message = message;
    }

    return ValidationError;

  })(Error);

  exports.Builder = builder.Builder;

  exports.Parser = parser.Parser;

  exports.parseString = parser.parseString;

  exports.parseStringPromise = parser.parseStringPromise;

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/DocumentPosition.js":
/*!*********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/DocumentPosition.js ***!
  \*********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    Disconnected: 1,
    Preceding: 2,
    Following: 4,
    Contains: 8,
    ContainedBy: 16,
    ImplementationSpecific: 32
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/NodeType.js":
/*!*************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/NodeType.js ***!
  \*************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    Element: 1,
    Attribute: 2,
    Text: 3,
    CData: 4,
    EntityReference: 5,
    EntityDeclaration: 6,
    ProcessingInstruction: 7,
    Comment: 8,
    Document: 9,
    DocType: 10,
    DocumentFragment: 11,
    NotationDeclaration: 12,
    Declaration: 201,
    Raw: 202,
    AttributeDeclaration: 203,
    ElementDeclaration: 204,
    Dummy: 205
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/Utility.js":
/*!************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/Utility.js ***!
  \************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject,
    slice = [].slice,
    hasProp = {}.hasOwnProperty;

  assign = function() {
    var i, key, len, source, sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (isFunction(Object.assign)) {
      Object.assign.apply(null, arguments);
    } else {
      for (i = 0, len = sources.length; i < len; i++) {
        source = sources[i];
        if (source != null) {
          for (key in source) {
            if (!hasProp.call(source, key)) continue;
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };

  isFunction = function(val) {
    return !!val && Object.prototype.toString.call(val) === '[object Function]';
  };

  isObject = function(val) {
    var ref;
    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
  };

  isArray = function(val) {
    if (isFunction(Array.isArray)) {
      return Array.isArray(val);
    } else {
      return Object.prototype.toString.call(val) === '[object Array]';
    }
  };

  isEmpty = function(val) {
    var key;
    if (isArray(val)) {
      return !val.length;
    } else {
      for (key in val) {
        if (!hasProp.call(val, key)) continue;
        return false;
      }
      return true;
    }
  };

  isPlainObject = function(val) {
    var ctor, proto;
    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
  };

  getValue = function(obj) {
    if (isFunction(obj.valueOf)) {
      return obj.valueOf();
    } else {
      return obj;
    }
  };

  module.exports.assign = assign;

  module.exports.isFunction = isFunction;

  module.exports.isObject = isObject;

  module.exports.isArray = isArray;

  module.exports.isEmpty = isEmpty;

  module.exports.isPlainObject = isPlainObject;

  module.exports.getValue = getValue;

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/WriterState.js":
/*!****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/WriterState.js ***!
  \****************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    None: 0,
    OpenTag: 1,
    InsideTag: 2,
    CloseTag: 3
  };

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLAttribute.js":
/*!*****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLAttribute.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLAttribute, XMLNode;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLAttribute = (function() {
    function XMLAttribute(parent, name, value) {
      this.parent = parent;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      if (name == null) {
        throw new Error("Missing attribute name. " + this.debugInfo(name));
      }
      this.name = this.stringify.name(name);
      this.value = this.stringify.attValue(value);
      this.type = NodeType.Attribute;
      this.isId = false;
      this.schemaTypeInfo = null;
    }

    Object.defineProperty(XMLAttribute.prototype, 'nodeType', {
      get: function() {
        return this.type;
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'ownerElement', {
      get: function() {
        return this.parent;
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'textContent', {
      get: function() {
        return this.value;
      },
      set: function(value) {
        return this.value = value || '';
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'namespaceURI', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'prefix', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'localName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLAttribute.prototype, 'specified', {
      get: function() {
        return true;
      }
    });

    XMLAttribute.prototype.clone = function() {
      return Object.create(this);
    };

    XMLAttribute.prototype.toString = function(options) {
      return this.options.writer.attribute(this, this.options.writer.filterOptions(options));
    };

    XMLAttribute.prototype.debugInfo = function(name) {
      name = name || this.name;
      if (name == null) {
        return "parent: <" + this.parent.name + ">";
      } else {
        return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
      }
    };

    XMLAttribute.prototype.isEqualNode = function(node) {
      if (node.namespaceURI !== this.namespaceURI) {
        return false;
      }
      if (node.prefix !== this.prefix) {
        return false;
      }
      if (node.localName !== this.localName) {
        return false;
      }
      if (node.value !== this.value) {
        return false;
      }
      return true;
    };

    return XMLAttribute;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLCData.js":
/*!*************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLCData.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCData, XMLCharacterData,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLCData = (function(superClass) {
    extend(XMLCData, superClass);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text. " + this.debugInfo());
      }
      this.name = "#cdata-section";
      this.type = NodeType.CData;
      this.value = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function() {
      return Object.create(this);
    };

    XMLCData.prototype.toString = function(options) {
      return this.options.writer.cdata(this, this.options.writer.filterOptions(options));
    };

    return XMLCData;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLCharacterData.js":
/*!*********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLCharacterData.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCharacterData, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLCharacterData = (function(superClass) {
    extend(XMLCharacterData, superClass);

    function XMLCharacterData(parent) {
      XMLCharacterData.__super__.constructor.call(this, parent);
      this.value = '';
    }

    Object.defineProperty(XMLCharacterData.prototype, 'data', {
      get: function() {
        return this.value;
      },
      set: function(value) {
        return this.value = value || '';
      }
    });

    Object.defineProperty(XMLCharacterData.prototype, 'length', {
      get: function() {
        return this.value.length;
      }
    });

    Object.defineProperty(XMLCharacterData.prototype, 'textContent', {
      get: function() {
        return this.value;
      },
      set: function(value) {
        return this.value = value || '';
      }
    });

    XMLCharacterData.prototype.clone = function() {
      return Object.create(this);
    };

    XMLCharacterData.prototype.substringData = function(offset, count) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.appendData = function(arg) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.insertData = function(offset, arg) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.deleteData = function(offset, count) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.replaceData = function(offset, count, arg) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLCharacterData.prototype.isEqualNode = function(node) {
      if (!XMLCharacterData.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.data !== this.data) {
        return false;
      }
      return true;
    };

    return XMLCharacterData;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLComment.js":
/*!***************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLComment.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCharacterData, XMLComment,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLComment = (function(superClass) {
    extend(XMLComment, superClass);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text. " + this.debugInfo());
      }
      this.name = "#comment";
      this.type = NodeType.Comment;
      this.value = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function() {
      return Object.create(this);
    };

    XMLComment.prototype.toString = function(options) {
      return this.options.writer.comment(this, this.options.writer.filterOptions(options));
    };

    return XMLComment;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js":
/*!************************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMConfiguration, XMLDOMErrorHandler, XMLDOMStringList;

  XMLDOMErrorHandler = __webpack_require__(/*! ./XMLDOMErrorHandler */ "./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js");

  XMLDOMStringList = __webpack_require__(/*! ./XMLDOMStringList */ "./node_modules/xmlbuilder/lib/XMLDOMStringList.js");

  module.exports = XMLDOMConfiguration = (function() {
    function XMLDOMConfiguration() {
      var clonedSelf;
      this.defaultParams = {
        "canonical-form": false,
        "cdata-sections": false,
        "comments": false,
        "datatype-normalization": false,
        "element-content-whitespace": true,
        "entities": true,
        "error-handler": new XMLDOMErrorHandler(),
        "infoset": true,
        "validate-if-schema": false,
        "namespaces": true,
        "namespace-declarations": true,
        "normalize-characters": false,
        "schema-location": '',
        "schema-type": '',
        "split-cdata-sections": true,
        "validate": false,
        "well-formed": true
      };
      this.params = clonedSelf = Object.create(this.defaultParams);
    }

    Object.defineProperty(XMLDOMConfiguration.prototype, 'parameterNames', {
      get: function() {
        return new XMLDOMStringList(Object.keys(this.defaultParams));
      }
    });

    XMLDOMConfiguration.prototype.getParameter = function(name) {
      if (this.params.hasOwnProperty(name)) {
        return this.params[name];
      } else {
        return null;
      }
    };

    XMLDOMConfiguration.prototype.canSetParameter = function(name, value) {
      return true;
    };

    XMLDOMConfiguration.prototype.setParameter = function(name, value) {
      if (value != null) {
        return this.params[name] = value;
      } else {
        return delete this.params[name];
      }
    };

    return XMLDOMConfiguration;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js":
/*!***********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMErrorHandler.js ***!
  \***********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMErrorHandler;

  module.exports = XMLDOMErrorHandler = (function() {
    function XMLDOMErrorHandler() {}

    XMLDOMErrorHandler.prototype.handleError = function(error) {
      throw new Error(error);
    };

    return XMLDOMErrorHandler;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js":
/*!*************************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMImplementation.js ***!
  \*************************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMImplementation;

  module.exports = XMLDOMImplementation = (function() {
    function XMLDOMImplementation() {}

    XMLDOMImplementation.prototype.hasFeature = function(feature, version) {
      return true;
    };

    XMLDOMImplementation.prototype.createDocumentType = function(qualifiedName, publicId, systemId) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLDOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedName, doctype) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLDOMImplementation.prototype.createHTMLDocument = function(title) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLDOMImplementation.prototype.getFeature = function(feature, version) {
      throw new Error("This DOM method is not implemented.");
    };

    return XMLDOMImplementation;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDOMStringList.js":
/*!*********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDOMStringList.js ***!
  \*********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDOMStringList;

  module.exports = XMLDOMStringList = (function() {
    function XMLDOMStringList(arr) {
      this.arr = arr || [];
    }

    Object.defineProperty(XMLDOMStringList.prototype, 'length', {
      get: function() {
        return this.arr.length;
      }
    });

    XMLDOMStringList.prototype.item = function(index) {
      return this.arr[index] || null;
    };

    XMLDOMStringList.prototype.contains = function(str) {
      return this.arr.indexOf(str) !== -1;
    };

    return XMLDOMStringList;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDAttList.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDAttList, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDAttList = (function(superClass) {
    extend(XMLDTDAttList, superClass);

    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      XMLDTDAttList.__super__.constructor.call(this, parent);
      if (elementName == null) {
        throw new Error("Missing DTD element name. " + this.debugInfo());
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
      }
      this.elementName = this.stringify.name(elementName);
      this.type = NodeType.AttributeDeclaration;
      this.attributeName = this.stringify.name(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      if (defaultValue) {
        this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      }
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.toString = function(options) {
      return this.options.writer.dtdAttList(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDAttList;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDElement.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDElement.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDElement, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDElement = (function(superClass) {
    extend(XMLDTDElement, superClass);

    function XMLDTDElement(parent, name, value) {
      XMLDTDElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD element name. " + this.debugInfo());
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (Array.isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.name(name);
      this.type = NodeType.ElementDeclaration;
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.toString = function(options) {
      return this.options.writer.dtdElement(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js":
/*!*****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDEntity.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDEntity, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDEntity = (function(superClass) {
    extend(XMLDTDEntity, superClass);

    function XMLDTDEntity(parent, pe, name, value) {
      XMLDTDEntity.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD entity name. " + this.debugInfo(name));
      }
      if (value == null) {
        throw new Error("Missing DTD entity value. " + this.debugInfo(name));
      }
      this.pe = !!pe;
      this.name = this.stringify.name(name);
      this.type = NodeType.EntityDeclaration;
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
        this.internal = true;
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
        }
        this.internal = false;
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
        }
      }
    }

    Object.defineProperty(XMLDTDEntity.prototype, 'publicId', {
      get: function() {
        return this.pubID;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'systemId', {
      get: function() {
        return this.sysID;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'notationName', {
      get: function() {
        return this.nData || null;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'inputEncoding', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'xmlEncoding', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDTDEntity.prototype, 'xmlVersion', {
      get: function() {
        return null;
      }
    });

    XMLDTDEntity.prototype.toString = function(options) {
      return this.options.writer.dtdEntity(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDEntity;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js":
/*!*******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDTDNotation.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDNotation, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDTDNotation = (function(superClass) {
    extend(XMLDTDNotation, superClass);

    function XMLDTDNotation(parent, name, value) {
      XMLDTDNotation.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD notation name. " + this.debugInfo(name));
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
      }
      this.name = this.stringify.name(name);
      this.type = NodeType.NotationDeclaration;
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    Object.defineProperty(XMLDTDNotation.prototype, 'publicId', {
      get: function() {
        return this.pubID;
      }
    });

    Object.defineProperty(XMLDTDNotation.prototype, 'systemId', {
      get: function() {
        return this.sysID;
      }
    });

    XMLDTDNotation.prototype.toString = function(options) {
      return this.options.writer.dtdNotation(this, this.options.writer.filterOptions(options));
    };

    return XMLDTDNotation;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDeclaration.js":
/*!*******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDeclaration.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDeclaration, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDeclaration = (function(superClass) {
    extend(XMLDeclaration, superClass);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      this.type = NodeType.Declaration;
      this.version = this.stringify.xmlVersion(version);
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.toString = function(options) {
      return this.options.writer.declaration(this, this.options.writer.filterOptions(options));
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDocType.js":
/*!***************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDocType.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNamedNodeMap, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "./node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLNamedNodeMap = __webpack_require__(/*! ./XMLNamedNodeMap */ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");

  module.exports = XMLDocType = (function(superClass) {
    extend(XMLDocType, superClass);

    function XMLDocType(parent, pubID, sysID) {
      var child, i, len, ref, ref1, ref2;
      XMLDocType.__super__.constructor.call(this, parent);
      this.type = NodeType.DocType;
      if (parent.children) {
        ref = parent.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if (child.type === NodeType.Element) {
            this.name = child.name;
            break;
          }
        }
      }
      this.documentObject = parent;
      if (isObject(pubID)) {
        ref1 = pubID, pubID = ref1.pubID, sysID = ref1.sysID;
      }
      if (sysID == null) {
        ref2 = [pubID, sysID], sysID = ref2[0], pubID = ref2[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    Object.defineProperty(XMLDocType.prototype, 'entities', {
      get: function() {
        var child, i, len, nodes, ref;
        nodes = {};
        ref = this.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if ((child.type === NodeType.EntityDeclaration) && !child.pe) {
            nodes[child.name] = child;
          }
        }
        return new XMLNamedNodeMap(nodes);
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'notations', {
      get: function() {
        var child, i, len, nodes, ref;
        nodes = {};
        ref = this.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if (child.type === NodeType.NotationDeclaration) {
            nodes[child.name] = child;
          }
        }
        return new XMLNamedNodeMap(nodes);
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'publicId', {
      get: function() {
        return this.pubID;
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'systemId', {
      get: function() {
        return this.sysID;
      }
    });

    Object.defineProperty(XMLDocType.prototype, 'internalSubset', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    XMLDocType.prototype.element = function(name, value) {
      var child;
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var child;
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function(name, value) {
      var child;
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.toString = function(options) {
      return this.options.writer.docType(this, this.options.writer.filterOptions(options));
    };

    XMLDocType.prototype.ele = function(name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.up = function() {
      return this.root() || this.documentObject;
    };

    XMLDocType.prototype.isEqualNode = function(node) {
      if (!XMLDocType.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.name !== this.name) {
        return false;
      }
      if (node.publicId !== this.publicId) {
        return false;
      }
      if (node.systemId !== this.systemId) {
        return false;
      }
      return true;
    };

    return XMLDocType;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDocument.js":
/*!****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDocument.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDOMConfiguration, XMLDOMImplementation, XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isPlainObject = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").isPlainObject;

  XMLDOMImplementation = __webpack_require__(/*! ./XMLDOMImplementation */ "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js");

  XMLDOMConfiguration = __webpack_require__(/*! ./XMLDOMConfiguration */ "./node_modules/xmlbuilder/lib/XMLDOMConfiguration.js");

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "./node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "./node_modules/xmlbuilder/lib/XMLStringWriter.js");

  module.exports = XMLDocument = (function(superClass) {
    extend(XMLDocument, superClass);

    function XMLDocument(options) {
      XMLDocument.__super__.constructor.call(this, null);
      this.name = "#document";
      this.type = NodeType.Document;
      this.documentURI = null;
      this.domConfig = new XMLDOMConfiguration();
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
    }

    Object.defineProperty(XMLDocument.prototype, 'implementation', {
      value: new XMLDOMImplementation()
    });

    Object.defineProperty(XMLDocument.prototype, 'doctype', {
      get: function() {
        var child, i, len, ref;
        ref = this.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          if (child.type === NodeType.DocType) {
            return child;
          }
        }
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'documentElement', {
      get: function() {
        return this.rootObject || null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'inputEncoding', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'strictErrorChecking', {
      get: function() {
        return false;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'xmlEncoding', {
      get: function() {
        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
          return this.children[0].encoding;
        } else {
          return null;
        }
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'xmlStandalone', {
      get: function() {
        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
          return this.children[0].standalone === 'yes';
        } else {
          return false;
        }
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'xmlVersion', {
      get: function() {
        if (this.children.length !== 0 && this.children[0].type === NodeType.Declaration) {
          return this.children[0].version;
        } else {
          return "1.0";
        }
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'URL', {
      get: function() {
        return this.documentURI;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'origin', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'compatMode', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'characterSet', {
      get: function() {
        return null;
      }
    });

    Object.defineProperty(XMLDocument.prototype, 'contentType', {
      get: function() {
        return null;
      }
    });

    XMLDocument.prototype.end = function(writer) {
      var writerOptions;
      writerOptions = {};
      if (!writer) {
        writer = this.options.writer;
      } else if (isPlainObject(writer)) {
        writerOptions = writer;
        writer = this.options.writer;
      }
      return writer.document(this, writer.filterOptions(writerOptions));
    };

    XMLDocument.prototype.toString = function(options) {
      return this.options.writer.document(this, this.options.writer.filterOptions(options));
    };

    XMLDocument.prototype.createElement = function(tagName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createDocumentFragment = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createTextNode = function(data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createComment = function(data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createCDATASection = function(data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createProcessingInstruction = function(target, data) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createAttribute = function(name) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createEntityReference = function(name) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementsByTagName = function(tagname) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.importNode = function(importedNode, deep) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createElementNS = function(namespaceURI, qualifiedName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementById = function(elementId) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.adoptNode = function(source) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.normalizeDocument = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.getElementsByClassName = function(classNames) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createEvent = function(eventInterface) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createRange = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createNodeIterator = function(root, whatToShow, filter) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLDocument.prototype.createTreeWalker = function(root, whatToShow, filter) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    return XMLDocument;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDocumentCB.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDocumentCB.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocument, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLDocument = __webpack_require__(/*! ./XMLDocument */ "./node_modules/xmlbuilder/lib/XMLDocument.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "./node_modules/xmlbuilder/lib/XMLElement.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "./node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "./node_modules/xmlbuilder/lib/XMLComment.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "./node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "./node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "./node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "./node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "./node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "./node_modules/xmlbuilder/lib/XMLAttribute.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "./node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "./node_modules/xmlbuilder/lib/XMLStringWriter.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports = XMLDocumentCB = (function() {
    function XMLDocumentCB(options, onData, onEnd) {
      var writerOptions;
      this.name = "?xml";
      this.type = NodeType.Document;
      options || (options = {});
      writerOptions = {};
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      } else if (isPlainObject(options.writer)) {
        writerOptions = options.writer;
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.writer = options.writer;
      this.writerOptions = this.writer.filterOptions(writerOptions);
      this.stringify = new XMLStringifier(options);
      this.onDataCallback = onData || function() {};
      this.onEndCallback = onEnd || function() {};
      this.currentNode = null;
      this.currentLevel = -1;
      this.openTags = {};
      this.documentStarted = false;
      this.documentCompleted = false;
      this.root = null;
    }

    XMLDocumentCB.prototype.createChildNode = function(node) {
      var att, attName, attributes, child, i, len, ref1, ref2;
      switch (node.type) {
        case NodeType.CData:
          this.cdata(node.value);
          break;
        case NodeType.Comment:
          this.comment(node.value);
          break;
        case NodeType.Element:
          attributes = {};
          ref1 = node.attribs;
          for (attName in ref1) {
            if (!hasProp.call(ref1, attName)) continue;
            att = ref1[attName];
            attributes[attName] = att.value;
          }
          this.node(node.name, attributes);
          break;
        case NodeType.Dummy:
          this.dummy();
          break;
        case NodeType.Raw:
          this.raw(node.value);
          break;
        case NodeType.Text:
          this.text(node.value);
          break;
        case NodeType.ProcessingInstruction:
          this.instruction(node.target, node.value);
          break;
        default:
          throw new Error("This XML node type is not supported in a JS object: " + node.constructor.name);
      }
      ref2 = node.children;
      for (i = 0, len = ref2.length; i < len; i++) {
        child = ref2[i];
        this.createChildNode(child);
        if (child.type === NodeType.Element) {
          this.up();
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.dummy = function() {
      return this;
    };

    XMLDocumentCB.prototype.node = function(name, attributes, text) {
      var ref1;
      if (name == null) {
        throw new Error("Missing node name.");
      }
      if (this.root && this.currentLevel === -1) {
        throw new Error("Document can only have one root node. " + this.debugInfo(name));
      }
      this.openCurrent();
      name = getValue(name);
      if (attributes == null) {
        attributes = {};
      }
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      this.currentNode = new XMLElement(this, name, attributes);
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      if (text != null) {
        this.text(text);
      }
      return this;
    };

    XMLDocumentCB.prototype.element = function(name, attributes, text) {
      var child, i, len, oldValidationFlag, ref1, root;
      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
        this.dtdElement.apply(this, arguments);
      } else {
        if (Array.isArray(name) || isObject(name) || isFunction(name)) {
          oldValidationFlag = this.options.noValidation;
          this.options.noValidation = true;
          root = new XMLDocument(this.options).element('TEMP_ROOT');
          root.element(name);
          this.options.noValidation = oldValidationFlag;
          ref1 = root.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            this.createChildNode(child);
            if (child.type === NodeType.Element) {
              this.up();
            }
          }
        } else {
          this.node(name, attributes, text);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (!this.currentNode || this.currentNode.children) {
        throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
      }
      if (name != null) {
        name = getValue(name);
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (this.options.keepNullAttributes && (value == null)) {
          this.currentNode.attribs[name] = new XMLAttribute(this, name, "");
        } else if (value != null) {
          this.currentNode.attribs[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.text = function(value) {
      var node;
      this.openCurrent();
      node = new XMLText(this, value);
      this.onData(this.writer.text(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.cdata = function(value) {
      var node;
      this.openCurrent();
      node = new XMLCData(this, value);
      this.onData(this.writer.cdata(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.comment = function(value) {
      var node;
      this.openCurrent();
      node = new XMLComment(this, value);
      this.onData(this.writer.comment(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.raw = function(value) {
      var node;
      this.openCurrent();
      node = new XMLRaw(this, value);
      this.onData(this.writer.raw(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.instruction = function(target, value) {
      var i, insTarget, insValue, len, node;
      this.openCurrent();
      if (target != null) {
        target = getValue(target);
      }
      if (value != null) {
        value = getValue(value);
      }
      if (Array.isArray(target)) {
        for (i = 0, len = target.length; i < len; i++) {
          insTarget = target[i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        node = new XMLProcessingInstruction(this, target, value);
        this.onData(this.writer.processingInstruction(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      }
      return this;
    };

    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
      var node;
      this.openCurrent();
      if (this.documentStarted) {
        throw new Error("declaration() must be the first node.");
      }
      node = new XMLDeclaration(this, version, encoding, standalone);
      this.onData(this.writer.declaration(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
      this.openCurrent();
      if (root == null) {
        throw new Error("Missing root node name.");
      }
      if (this.root) {
        throw new Error("dtd() must come before the root node.");
      }
      this.currentNode = new XMLDocType(this, pubID, sysID);
      this.currentNode.rootNodeName = root;
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      return this;
    };

    XMLDocumentCB.prototype.dtdElement = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDElement(this, name, value);
      this.onData(this.writer.dtdElement(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var node;
      this.openCurrent();
      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.onData(this.writer.dtdAttList(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.entity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, false, name, value);
      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.pEntity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, true, name, value);
      this.onData(this.writer.dtdEntity(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.notation = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDNotation(this, name, value);
      this.onData(this.writer.dtdNotation(node, this.writerOptions, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.up = function() {
      if (this.currentLevel < 0) {
        throw new Error("The document node has no parent.");
      }
      if (this.currentNode) {
        if (this.currentNode.children) {
          this.closeNode(this.currentNode);
        } else {
          this.openNode(this.currentNode);
        }
        this.currentNode = null;
      } else {
        this.closeNode(this.openTags[this.currentLevel]);
      }
      delete this.openTags[this.currentLevel];
      this.currentLevel--;
      return this;
    };

    XMLDocumentCB.prototype.end = function() {
      while (this.currentLevel >= 0) {
        this.up();
      }
      return this.onEnd();
    };

    XMLDocumentCB.prototype.openCurrent = function() {
      if (this.currentNode) {
        this.currentNode.children = true;
        return this.openNode(this.currentNode);
      }
    };

    XMLDocumentCB.prototype.openNode = function(node) {
      var att, chunk, name, ref1;
      if (!node.isOpen) {
        if (!this.root && this.currentLevel === 0 && node.type === NodeType.Element) {
          this.root = node;
        }
        chunk = '';
        if (node.type === NodeType.Element) {
          this.writerOptions.state = WriterState.OpenTag;
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<' + node.name;
          ref1 = node.attribs;
          for (name in ref1) {
            if (!hasProp.call(ref1, name)) continue;
            att = ref1[name];
            chunk += this.writer.attribute(att, this.writerOptions, this.currentLevel);
          }
          chunk += (node.children ? '>' : '/>') + this.writer.endline(node, this.writerOptions, this.currentLevel);
          this.writerOptions.state = WriterState.InsideTag;
        } else {
          this.writerOptions.state = WriterState.OpenTag;
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '<!DOCTYPE ' + node.rootNodeName;
          if (node.pubID && node.sysID) {
            chunk += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
          } else if (node.sysID) {
            chunk += ' SYSTEM "' + node.sysID + '"';
          }
          if (node.children) {
            chunk += ' [';
            this.writerOptions.state = WriterState.InsideTag;
          } else {
            this.writerOptions.state = WriterState.CloseTag;
            chunk += '>';
          }
          chunk += this.writer.endline(node, this.writerOptions, this.currentLevel);
        }
        this.onData(chunk, this.currentLevel);
        return node.isOpen = true;
      }
    };

    XMLDocumentCB.prototype.closeNode = function(node) {
      var chunk;
      if (!node.isClosed) {
        chunk = '';
        this.writerOptions.state = WriterState.CloseTag;
        if (node.type === NodeType.Element) {
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + '</' + node.name + '>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
        } else {
          chunk = this.writer.indent(node, this.writerOptions, this.currentLevel) + ']>' + this.writer.endline(node, this.writerOptions, this.currentLevel);
        }
        this.writerOptions.state = WriterState.None;
        this.onData(chunk, this.currentLevel);
        return node.isClosed = true;
      }
    };

    XMLDocumentCB.prototype.onData = function(chunk, level) {
      this.documentStarted = true;
      return this.onDataCallback(chunk, level + 1);
    };

    XMLDocumentCB.prototype.onEnd = function() {
      this.documentCompleted = true;
      return this.onEndCallback();
    };

    XMLDocumentCB.prototype.debugInfo = function(name) {
      if (name == null) {
        return "";
      } else {
        return "node: <" + name + ">";
      }
    };

    XMLDocumentCB.prototype.ele = function() {
      return this.element.apply(this, arguments);
    };

    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
      return this.doctype(root, pubID, sysID);
    };

    XMLDocumentCB.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLDocumentCB.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.t = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLDocumentCB.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.att = function() {
      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.a = function() {
      if (this.currentNode && this.currentNode.type === NodeType.DocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocumentCB.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocumentCB.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    return XMLDocumentCB;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLDummy.js":
/*!*************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLDummy.js ***!
  \*************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLDummy, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  module.exports = XMLDummy = (function(superClass) {
    extend(XMLDummy, superClass);

    function XMLDummy(parent) {
      XMLDummy.__super__.constructor.call(this, parent);
      this.type = NodeType.Dummy;
    }

    XMLDummy.prototype.clone = function() {
      return Object.create(this);
    };

    XMLDummy.prototype.toString = function(options) {
      return '';
    };

    return XMLDummy;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLElement.js":
/*!***************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLElement.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLAttribute, XMLElement, XMLNamedNodeMap, XMLNode, getValue, isFunction, isObject, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "./node_modules/xmlbuilder/lib/XMLAttribute.js");

  XMLNamedNodeMap = __webpack_require__(/*! ./XMLNamedNodeMap */ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");

  module.exports = XMLElement = (function(superClass) {
    extend(XMLElement, superClass);

    function XMLElement(parent, name, attributes) {
      var child, j, len, ref1;
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name. " + this.debugInfo());
      }
      this.name = this.stringify.name(name);
      this.type = NodeType.Element;
      this.attribs = {};
      this.schemaTypeInfo = null;
      if (attributes != null) {
        this.attribute(attributes);
      }
      if (parent.type === NodeType.Document) {
        this.isRoot = true;
        this.documentObject = parent;
        parent.rootObject = this;
        if (parent.children) {
          ref1 = parent.children;
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            if (child.type === NodeType.DocType) {
              child.name = this.name;
              break;
            }
          }
        }
      }
    }

    Object.defineProperty(XMLElement.prototype, 'tagName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLElement.prototype, 'namespaceURI', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLElement.prototype, 'prefix', {
      get: function() {
        return '';
      }
    });

    Object.defineProperty(XMLElement.prototype, 'localName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLElement.prototype, 'id', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLElement.prototype, 'className', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLElement.prototype, 'classList', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLElement.prototype, 'attributes', {
      get: function() {
        if (!this.attributeMap || !this.attributeMap.nodes) {
          this.attributeMap = new XMLNamedNodeMap(this.attribs);
        }
        return this.attributeMap;
      }
    });

    XMLElement.prototype.clone = function() {
      var att, attName, clonedSelf, ref1;
      clonedSelf = Object.create(this);
      if (clonedSelf.isRoot) {
        clonedSelf.documentObject = null;
      }
      clonedSelf.attribs = {};
      ref1 = this.attribs;
      for (attName in ref1) {
        if (!hasProp.call(ref1, attName)) continue;
        att = ref1[attName];
        clonedSelf.attribs[attName] = att.clone();
      }
      clonedSelf.children = [];
      this.children.forEach(function(child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (name != null) {
        name = getValue(name);
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (this.options.keepNullAttributes && (value == null)) {
          this.attribs[name] = new XMLAttribute(this, name, "");
        } else if (value != null) {
          this.attribs[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function(name) {
      var attName, j, len;
      if (name == null) {
        throw new Error("Missing attribute name. " + this.debugInfo());
      }
      name = getValue(name);
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          attName = name[j];
          delete this.attribs[attName];
        }
      } else {
        delete this.attribs[name];
      }
      return this;
    };

    XMLElement.prototype.toString = function(options) {
      return this.options.writer.element(this, this.options.writer.filterOptions(options));
    };

    XMLElement.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.getAttribute = function(name) {
      if (this.attribs.hasOwnProperty(name)) {
        return this.attribs[name].value;
      } else {
        return null;
      }
    };

    XMLElement.prototype.setAttribute = function(name, value) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getAttributeNode = function(name) {
      if (this.attribs.hasOwnProperty(name)) {
        return this.attribs[name];
      } else {
        return null;
      }
    };

    XMLElement.prototype.setAttributeNode = function(newAttr) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.removeAttributeNode = function(oldAttr) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagName = function(name) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getAttributeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.removeAttributeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setAttributeNodeNS = function(newAttr) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.hasAttribute = function(name) {
      return this.attribs.hasOwnProperty(name);
    };

    XMLElement.prototype.hasAttributeNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setIdAttribute = function(name, isId) {
      if (this.attribs.hasOwnProperty(name)) {
        return this.attribs[name].isId;
      } else {
        return isId;
      }
    };

    XMLElement.prototype.setIdAttributeNS = function(namespaceURI, localName, isId) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.setIdAttributeNode = function(idAttr, isId) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagName = function(tagname) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.getElementsByClassName = function(classNames) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLElement.prototype.isEqualNode = function(node) {
      var i, j, ref1;
      if (!XMLElement.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.namespaceURI !== this.namespaceURI) {
        return false;
      }
      if (node.prefix !== this.prefix) {
        return false;
      }
      if (node.localName !== this.localName) {
        return false;
      }
      if (node.attribs.length !== this.attribs.length) {
        return false;
      }
      for (i = j = 0, ref1 = this.attribs.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
        if (!this.attribs[i].isEqualNode(node.attribs[i])) {
          return false;
        }
      }
      return true;
    };

    return XMLElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js":
/*!********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js ***!
  \********************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNamedNodeMap;

  module.exports = XMLNamedNodeMap = (function() {
    function XMLNamedNodeMap(nodes) {
      this.nodes = nodes;
    }

    Object.defineProperty(XMLNamedNodeMap.prototype, 'length', {
      get: function() {
        return Object.keys(this.nodes).length || 0;
      }
    });

    XMLNamedNodeMap.prototype.clone = function() {
      return this.nodes = null;
    };

    XMLNamedNodeMap.prototype.getNamedItem = function(name) {
      return this.nodes[name];
    };

    XMLNamedNodeMap.prototype.setNamedItem = function(node) {
      var oldNode;
      oldNode = this.nodes[node.nodeName];
      this.nodes[node.nodeName] = node;
      return oldNode || null;
    };

    XMLNamedNodeMap.prototype.removeNamedItem = function(name) {
      var oldNode;
      oldNode = this.nodes[name];
      delete this.nodes[name];
      return oldNode || null;
    };

    XMLNamedNodeMap.prototype.item = function(index) {
      return this.nodes[Object.keys(this.nodes)[index]] || null;
    };

    XMLNamedNodeMap.prototype.getNamedItemNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLNamedNodeMap.prototype.setNamedItemNS = function(node) {
      throw new Error("This DOM method is not implemented.");
    };

    XMLNamedNodeMap.prototype.removeNamedItemNS = function(namespaceURI, localName) {
      throw new Error("This DOM method is not implemented.");
    };

    return XMLNamedNodeMap;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLNode.js":
/*!************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLNode.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var DocumentPosition, NodeType, XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLNamedNodeMap, XMLNode, XMLNodeList, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, ref1,
    hasProp = {}.hasOwnProperty;

  ref1 = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), isObject = ref1.isObject, isFunction = ref1.isFunction, isEmpty = ref1.isEmpty, getValue = ref1.getValue;

  XMLElement = null;

  XMLCData = null;

  XMLComment = null;

  XMLDeclaration = null;

  XMLDocType = null;

  XMLRaw = null;

  XMLText = null;

  XMLProcessingInstruction = null;

  XMLDummy = null;

  NodeType = null;

  XMLNodeList = null;

  XMLNamedNodeMap = null;

  DocumentPosition = null;

  module.exports = XMLNode = (function() {
    function XMLNode(parent1) {
      this.parent = parent1;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      this.value = null;
      this.children = [];
      this.baseURI = null;
      if (!XMLElement) {
        XMLElement = __webpack_require__(/*! ./XMLElement */ "./node_modules/xmlbuilder/lib/XMLElement.js");
        XMLCData = __webpack_require__(/*! ./XMLCData */ "./node_modules/xmlbuilder/lib/XMLCData.js");
        XMLComment = __webpack_require__(/*! ./XMLComment */ "./node_modules/xmlbuilder/lib/XMLComment.js");
        XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "./node_modules/xmlbuilder/lib/XMLDeclaration.js");
        XMLDocType = __webpack_require__(/*! ./XMLDocType */ "./node_modules/xmlbuilder/lib/XMLDocType.js");
        XMLRaw = __webpack_require__(/*! ./XMLRaw */ "./node_modules/xmlbuilder/lib/XMLRaw.js");
        XMLText = __webpack_require__(/*! ./XMLText */ "./node_modules/xmlbuilder/lib/XMLText.js");
        XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");
        XMLDummy = __webpack_require__(/*! ./XMLDummy */ "./node_modules/xmlbuilder/lib/XMLDummy.js");
        NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");
        XMLNodeList = __webpack_require__(/*! ./XMLNodeList */ "./node_modules/xmlbuilder/lib/XMLNodeList.js");
        XMLNamedNodeMap = __webpack_require__(/*! ./XMLNamedNodeMap */ "./node_modules/xmlbuilder/lib/XMLNamedNodeMap.js");
        DocumentPosition = __webpack_require__(/*! ./DocumentPosition */ "./node_modules/xmlbuilder/lib/DocumentPosition.js");
      }
    }

    Object.defineProperty(XMLNode.prototype, 'nodeName', {
      get: function() {
        return this.name;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'nodeType', {
      get: function() {
        return this.type;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'nodeValue', {
      get: function() {
        return this.value;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'parentNode', {
      get: function() {
        return this.parent;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'childNodes', {
      get: function() {
        if (!this.childNodeList || !this.childNodeList.nodes) {
          this.childNodeList = new XMLNodeList(this.children);
        }
        return this.childNodeList;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'firstChild', {
      get: function() {
        return this.children[0] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'lastChild', {
      get: function() {
        return this.children[this.children.length - 1] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'previousSibling', {
      get: function() {
        var i;
        i = this.parent.children.indexOf(this);
        return this.parent.children[i - 1] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'nextSibling', {
      get: function() {
        var i;
        i = this.parent.children.indexOf(this);
        return this.parent.children[i + 1] || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'ownerDocument', {
      get: function() {
        return this.document() || null;
      }
    });

    Object.defineProperty(XMLNode.prototype, 'textContent', {
      get: function() {
        var child, j, len, ref2, str;
        if (this.nodeType === NodeType.Element || this.nodeType === NodeType.DocumentFragment) {
          str = '';
          ref2 = this.children;
          for (j = 0, len = ref2.length; j < len; j++) {
            child = ref2[j];
            if (child.textContent) {
              str += child.textContent;
            }
          }
          return str;
        } else {
          return null;
        }
      },
      set: function(value) {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    XMLNode.prototype.setParent = function(parent) {
      var child, j, len, ref2, results;
      this.parent = parent;
      if (parent) {
        this.options = parent.options;
        this.stringify = parent.stringify;
      }
      ref2 = this.children;
      results = [];
      for (j = 0, len = ref2.length; j < len; j++) {
        child = ref2[j];
        results.push(child.setParent(this));
      }
      return results;
    };

    XMLNode.prototype.element = function(name, attributes, text) {
      var childNode, item, j, k, key, lastChild, len, len1, ref2, ref3, val;
      lastChild = null;
      if (attributes === null && (text == null)) {
        ref2 = [{}, null], attributes = ref2[0], text = ref2[1];
      }
      if (attributes == null) {
        attributes = {};
      }
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref3 = [attributes, text], text = ref3[0], attributes = ref3[1];
      }
      if (name != null) {
        name = getValue(name);
      }
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          item = name[j];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.separateArrayItems && Array.isArray(val) && isEmpty(val)) {
            lastChild = this.dummy();
          } else if (isObject(val) && isEmpty(val)) {
            lastChild = this.element(key);
          } else if (!this.options.keepNullNodes && (val == null)) {
            lastChild = this.dummy();
          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
            for (k = 0, len1 = val.length; k < len1; k++) {
              item = val[k];
              childNode = {};
              childNode[key] = item;
              lastChild = this.element(childNode);
            }
          } else if (isObject(val)) {
            if (!this.options.ignoreDecorators && this.stringify.convertTextKey && key.indexOf(this.stringify.convertTextKey) === 0) {
              lastChild = this.element(val);
            } else {
              lastChild = this.element(key);
              lastChild.element(val);
            }
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else if (!this.options.keepNullNodes && text === null) {
        lastChild = this.dummy();
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function(name, attributes, text) {
      var child, i, newChild, refChild, removed;
      if (name != null ? name.type : void 0) {
        newChild = name;
        refChild = attributes;
        newChild.setParent(this);
        if (refChild) {
          i = children.indexOf(refChild);
          removed = children.splice(i);
          children.push(newChild);
          Array.prototype.push.apply(children, removed);
        } else {
          children.push(newChild);
        }
        return newChild;
      } else {
        if (this.isRoot) {
          throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
        }
        i = this.parent.children.indexOf(this);
        removed = this.parent.children.splice(i);
        child = this.parent.element(name, attributes, text);
        Array.prototype.push.apply(this.parent.children, removed);
        return child;
      }
    };

    XMLNode.prototype.insertAfter = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function() {
      var i, ref2;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element. " + this.debugInfo());
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref2 = [])), ref2;
      return this.parent;
    };

    XMLNode.prototype.node = function(name, attributes, text) {
      var child, ref2;
      if (name != null) {
        name = getValue(name);
      }
      attributes || (attributes = {});
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref2 = [attributes, text], text = ref2[0], attributes = ref2[1];
      }
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function(value) {
      var child;
      if (isObject(value)) {
        this.element(value);
      }
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function(value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function(value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.commentBefore = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.commentAfter = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.raw = function(value) {
      var child;
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.dummy = function() {
      var child;
      child = new XMLDummy(this);
      return child;
    };

    XMLNode.prototype.instruction = function(target, value) {
      var insTarget, insValue, instruction, j, len;
      if (target != null) {
        target = getValue(target);
      }
      if (value != null) {
        value = getValue(value);
      }
      if (Array.isArray(target)) {
        for (j = 0, len = target.length; j < len; j++) {
          insTarget = target[j];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.children.push(instruction);
      }
      return this;
    };

    XMLNode.prototype.instructionBefore = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.instructionAfter = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.declaration = function(version, encoding, standalone) {
      var doc, xmldec;
      doc = this.document();
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      if (doc.children.length === 0) {
        doc.children.unshift(xmldec);
      } else if (doc.children[0].type === NodeType.Declaration) {
        doc.children[0] = xmldec;
      } else {
        doc.children.unshift(xmldec);
      }
      return doc.root() || doc;
    };

    XMLNode.prototype.dtd = function(pubID, sysID) {
      var child, doc, doctype, i, j, k, len, len1, ref2, ref3;
      doc = this.document();
      doctype = new XMLDocType(doc, pubID, sysID);
      ref2 = doc.children;
      for (i = j = 0, len = ref2.length; j < len; i = ++j) {
        child = ref2[i];
        if (child.type === NodeType.DocType) {
          doc.children[i] = doctype;
          return doctype;
        }
      }
      ref3 = doc.children;
      for (i = k = 0, len1 = ref3.length; k < len1; i = ++k) {
        child = ref3[i];
        if (child.isRoot) {
          doc.children.splice(i, 0, doctype);
          return doctype;
        }
      }
      doc.children.push(doctype);
      return doctype;
    };

    XMLNode.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function() {
      var node;
      node = this;
      while (node) {
        if (node.type === NodeType.Document) {
          return node.rootObject;
        } else if (node.isRoot) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.document = function() {
      var node;
      node = this;
      while (node) {
        if (node.type === NodeType.Document) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.end = function(options) {
      return this.document().end(options);
    };

    XMLNode.prototype.prev = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node. " + this.debugInfo());
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node. " + this.debugInfo());
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importDocument = function(doc) {
      var clonedRoot;
      clonedRoot = doc.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.debugInfo = function(name) {
      var ref2, ref3;
      name = name || this.name;
      if ((name == null) && !((ref2 = this.parent) != null ? ref2.name : void 0)) {
        return "";
      } else if (name == null) {
        return "parent: <" + this.parent.name + ">";
      } else if (!((ref3 = this.parent) != null ? ref3.name : void 0)) {
        return "node: <" + name + ">";
      } else {
        return "node: <" + name + ">, parent: <" + this.parent.name + ">";
      }
    };

    XMLNode.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.doc = function() {
      return this.document();
    };

    XMLNode.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLNode.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.u = function() {
      return this.up();
    };

    XMLNode.prototype.importXMLBuilder = function(doc) {
      return this.importDocument(doc);
    };

    XMLNode.prototype.replaceChild = function(newChild, oldChild) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.removeChild = function(oldChild) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.appendChild = function(newChild) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.hasChildNodes = function() {
      return this.children.length !== 0;
    };

    XMLNode.prototype.cloneNode = function(deep) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.normalize = function() {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.isSupported = function(feature, version) {
      return true;
    };

    XMLNode.prototype.hasAttributes = function() {
      return this.attribs.length !== 0;
    };

    XMLNode.prototype.compareDocumentPosition = function(other) {
      var ref, res;
      ref = this;
      if (ref === other) {
        return 0;
      } else if (this.document() !== other.document()) {
        res = DocumentPosition.Disconnected | DocumentPosition.ImplementationSpecific;
        if (Math.random() < 0.5) {
          res |= DocumentPosition.Preceding;
        } else {
          res |= DocumentPosition.Following;
        }
        return res;
      } else if (ref.isAncestor(other)) {
        return DocumentPosition.Contains | DocumentPosition.Preceding;
      } else if (ref.isDescendant(other)) {
        return DocumentPosition.Contains | DocumentPosition.Following;
      } else if (ref.isPreceding(other)) {
        return DocumentPosition.Preceding;
      } else {
        return DocumentPosition.Following;
      }
    };

    XMLNode.prototype.isSameNode = function(other) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.lookupPrefix = function(namespaceURI) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.isDefaultNamespace = function(namespaceURI) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.lookupNamespaceURI = function(prefix) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.isEqualNode = function(node) {
      var i, j, ref2;
      if (node.nodeType !== this.nodeType) {
        return false;
      }
      if (node.children.length !== this.children.length) {
        return false;
      }
      for (i = j = 0, ref2 = this.children.length - 1; 0 <= ref2 ? j <= ref2 : j >= ref2; i = 0 <= ref2 ? ++j : --j) {
        if (!this.children[i].isEqualNode(node.children[i])) {
          return false;
        }
      }
      return true;
    };

    XMLNode.prototype.getFeature = function(feature, version) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.setUserData = function(key, data, handler) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.getUserData = function(key) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLNode.prototype.contains = function(other) {
      if (!other) {
        return false;
      }
      return other === this || this.isDescendant(other);
    };

    XMLNode.prototype.isDescendant = function(node) {
      var child, isDescendantChild, j, len, ref2;
      ref2 = this.children;
      for (j = 0, len = ref2.length; j < len; j++) {
        child = ref2[j];
        if (node === child) {
          return true;
        }
        isDescendantChild = child.isDescendant(node);
        if (isDescendantChild) {
          return true;
        }
      }
      return false;
    };

    XMLNode.prototype.isAncestor = function(node) {
      return node.isDescendant(this);
    };

    XMLNode.prototype.isPreceding = function(node) {
      var nodePos, thisPos;
      nodePos = this.treePosition(node);
      thisPos = this.treePosition(this);
      if (nodePos === -1 || thisPos === -1) {
        return false;
      } else {
        return nodePos < thisPos;
      }
    };

    XMLNode.prototype.isFollowing = function(node) {
      var nodePos, thisPos;
      nodePos = this.treePosition(node);
      thisPos = this.treePosition(this);
      if (nodePos === -1 || thisPos === -1) {
        return false;
      } else {
        return nodePos > thisPos;
      }
    };

    XMLNode.prototype.treePosition = function(node) {
      var found, pos;
      pos = 0;
      found = false;
      this.foreachTreeNode(this.document(), function(childNode) {
        pos++;
        if (!found && childNode === node) {
          return found = true;
        }
      });
      if (found) {
        return pos;
      } else {
        return -1;
      }
    };

    XMLNode.prototype.foreachTreeNode = function(node, func) {
      var child, j, len, ref2, res;
      node || (node = this.document());
      ref2 = node.children;
      for (j = 0, len = ref2.length; j < len; j++) {
        child = ref2[j];
        if (res = func(child)) {
          return res;
        } else {
          res = this.foreachTreeNode(child, func);
          if (res) {
            return res;
          }
        }
      }
    };

    return XMLNode;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLNodeList.js":
/*!****************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLNodeList.js ***!
  \****************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNodeList;

  module.exports = XMLNodeList = (function() {
    function XMLNodeList(nodes) {
      this.nodes = nodes;
    }

    Object.defineProperty(XMLNodeList.prototype, 'length', {
      get: function() {
        return this.nodes.length || 0;
      }
    });

    XMLNodeList.prototype.clone = function() {
      return this.nodes = null;
    };

    XMLNodeList.prototype.item = function(index) {
      return this.nodes[index] || null;
    };

    return XMLNodeList;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCharacterData, XMLProcessingInstruction,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLProcessingInstruction = (function(superClass) {
    extend(XMLProcessingInstruction, superClass);

    function XMLProcessingInstruction(parent, target, value) {
      XMLProcessingInstruction.__super__.constructor.call(this, parent);
      if (target == null) {
        throw new Error("Missing instruction target. " + this.debugInfo());
      }
      this.type = NodeType.ProcessingInstruction;
      this.target = this.stringify.insTarget(target);
      this.name = this.target;
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function() {
      return Object.create(this);
    };

    XMLProcessingInstruction.prototype.toString = function(options) {
      return this.options.writer.processingInstruction(this, this.options.writer.filterOptions(options));
    };

    XMLProcessingInstruction.prototype.isEqualNode = function(node) {
      if (!XMLProcessingInstruction.__super__.isEqualNode.apply(this, arguments).isEqualNode(node)) {
        return false;
      }
      if (node.target !== this.target) {
        return false;
      }
      return true;
    };

    return XMLProcessingInstruction;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLRaw.js":
/*!***********************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLRaw.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLNode, XMLRaw,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLNode = __webpack_require__(/*! ./XMLNode */ "./node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLRaw = (function(superClass) {
    extend(XMLRaw, superClass);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text. " + this.debugInfo());
      }
      this.type = NodeType.Raw;
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function() {
      return Object.create(this);
    };

    XMLRaw.prototype.toString = function(options) {
      return this.options.writer.raw(this, this.options.writer.filterOptions(options));
    };

    return XMLRaw;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLStreamWriter.js":
/*!********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLStreamWriter.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLStreamWriter, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "./node_modules/xmlbuilder/lib/XMLWriterBase.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports = XMLStreamWriter = (function(superClass) {
    extend(XMLStreamWriter, superClass);

    function XMLStreamWriter(stream, options) {
      this.stream = stream;
      XMLStreamWriter.__super__.constructor.call(this, options);
    }

    XMLStreamWriter.prototype.endline = function(node, options, level) {
      if (node.isLastRootNode && options.state === WriterState.CloseTag) {
        return '';
      } else {
        return XMLStreamWriter.__super__.endline.call(this, node, options, level);
      }
    };

    XMLStreamWriter.prototype.document = function(doc, options) {
      var child, i, j, k, len, len1, ref, ref1, results;
      ref = doc.children;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        child = ref[i];
        child.isLastRootNode = i === doc.children.length - 1;
      }
      options = this.filterOptions(options);
      ref1 = doc.children;
      results = [];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        child = ref1[k];
        results.push(this.writeChildNode(child, options, 0));
      }
      return results;
    };

    XMLStreamWriter.prototype.attribute = function(att, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.attribute.call(this, att, options, level));
    };

    XMLStreamWriter.prototype.cdata = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.cdata.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.comment = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.comment.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.declaration = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.declaration.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.docType = function(node, options, level) {
      var child, j, len, ref;
      level || (level = 0);
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      this.stream.write(this.indent(node, options, level));
      this.stream.write('<!DOCTYPE ' + node.root().name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      if (node.children.length > 0) {
        this.stream.write(' [');
        this.stream.write(this.endline(node, options, level));
        options.state = WriterState.InsideTag;
        ref = node.children;
        for (j = 0, len = ref.length; j < len; j++) {
          child = ref[j];
          this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        this.stream.write(']');
      }
      options.state = WriterState.CloseTag;
      this.stream.write(options.spaceBeforeSlash + '>');
      this.stream.write(this.endline(node, options, level));
      options.state = WriterState.None;
      return this.closeNode(node, options, level);
    };

    XMLStreamWriter.prototype.element = function(node, options, level) {
      var att, child, childNodeCount, firstChildNode, j, len, name, prettySuppressed, ref, ref1;
      level || (level = 0);
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      this.stream.write(this.indent(node, options, level) + '<' + node.name);
      ref = node.attribs;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        this.attribute(att, options, level);
      }
      childNodeCount = node.children.length;
      firstChildNode = childNodeCount === 0 ? null : node.children[0];
      if (childNodeCount === 0 || node.children.every(function(e) {
        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
      })) {
        if (options.allowEmpty) {
          this.stream.write('>');
          options.state = WriterState.CloseTag;
          this.stream.write('</' + node.name + '>');
        } else {
          options.state = WriterState.CloseTag;
          this.stream.write(options.spaceBeforeSlash + '/>');
        }
      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
        this.stream.write('>');
        options.state = WriterState.InsideTag;
        options.suppressPrettyCount++;
        prettySuppressed = true;
        this.writeChildNode(firstChildNode, options, level + 1);
        options.suppressPrettyCount--;
        prettySuppressed = false;
        options.state = WriterState.CloseTag;
        this.stream.write('</' + node.name + '>');
      } else {
        this.stream.write('>' + this.endline(node, options, level));
        options.state = WriterState.InsideTag;
        ref1 = node.children;
        for (j = 0, len = ref1.length; j < len; j++) {
          child = ref1[j];
          this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        this.stream.write(this.indent(node, options, level) + '</' + node.name + '>');
      }
      this.stream.write(this.endline(node, options, level));
      options.state = WriterState.None;
      return this.closeNode(node, options, level);
    };

    XMLStreamWriter.prototype.processingInstruction = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.processingInstruction.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.raw = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.raw.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.text = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.text.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdAttList = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdAttList.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdElement = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdElement.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdEntity = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdEntity.call(this, node, options, level));
    };

    XMLStreamWriter.prototype.dtdNotation = function(node, options, level) {
      return this.stream.write(XMLStreamWriter.__super__.dtdNotation.call(this, node, options, level));
    };

    return XMLStreamWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLStringWriter.js":
/*!********************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLStringWriter.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLStringWriter, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "./node_modules/xmlbuilder/lib/XMLWriterBase.js");

  module.exports = XMLStringWriter = (function(superClass) {
    extend(XMLStringWriter, superClass);

    function XMLStringWriter(options) {
      XMLStringWriter.__super__.constructor.call(this, options);
    }

    XMLStringWriter.prototype.document = function(doc, options) {
      var child, i, len, r, ref;
      options = this.filterOptions(options);
      r = '';
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        r += this.writeChildNode(child, options, 0);
      }
      if (options.pretty && r.slice(-options.newline.length) === options.newline) {
        r = r.slice(0, -options.newline.length);
      }
      return r;
    };

    return XMLStringWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLStringifier.js":
/*!*******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLStringifier.js ***!
  \*******************************************************/
/***/ (function(module) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLStringifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = (function() {
    function XMLStringifier(options) {
      this.assertLegalName = bind(this.assertLegalName, this);
      this.assertLegalChar = bind(this.assertLegalChar, this);
      var key, ref, value;
      options || (options = {});
      this.options = options;
      if (!this.options.version) {
        this.options.version = '1.0';
      }
      ref = options.stringify || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.name = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalName('' + val || '');
    };

    XMLStringifier.prototype.text = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar(this.textEscape('' + val || ''));
    };

    XMLStringifier.prototype.cdata = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      val = val.replace(']]>', ']]]]><![CDATA[>');
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return '' + val || '';
    };

    XMLStringifier.prototype.attValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar(this.attEscape(val = '' + val || ''));
    };

    XMLStringifier.prototype.insTarget = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.insValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.xmlVersion = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      val = '' + val || '';
      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
        throw new Error("Invalid encoding: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.xmlStandalone = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdSysID = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdElementValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdAttType = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdAttDefault = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdEntityValue = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.dtdNData = function(val) {
      if (this.options.noValidation) {
        return val;
      }
      return this.assertLegalChar('' + val || '');
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.assertLegalChar = function(str) {
      var regex, res;
      if (this.options.noValidation) {
        return str;
      }
      regex = '';
      if (this.options.version === '1.0') {
        regex = /[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
        if (res = str.match(regex)) {
          throw new Error("Invalid character in string: " + str + " at index " + res.index);
        }
      } else if (this.options.version === '1.1') {
        regex = /[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
        if (res = str.match(regex)) {
          throw new Error("Invalid character in string: " + str + " at index " + res.index);
        }
      }
      return str;
    };

    XMLStringifier.prototype.assertLegalName = function(str) {
      var regex;
      if (this.options.noValidation) {
        return str;
      }
      this.assertLegalChar(str);
      regex = /^([:A-Z_a-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])([\x2D\.0-:A-Z_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
      if (!str.match(regex)) {
        throw new Error("Invalid character in name");
      }
      return str;
    };

    XMLStringifier.prototype.textEscape = function(str) {
      var ampregex;
      if (this.options.noValidation) {
        return str;
      }
      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function(str) {
      var ampregex;
      if (this.options.noValidation) {
        return str;
      }
      ampregex = this.options.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    };

    return XMLStringifier;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLText.js":
/*!************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLText.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, XMLCharacterData, XMLText,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLCharacterData = __webpack_require__(/*! ./XMLCharacterData */ "./node_modules/xmlbuilder/lib/XMLCharacterData.js");

  module.exports = XMLText = (function(superClass) {
    extend(XMLText, superClass);

    function XMLText(parent, text) {
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text. " + this.debugInfo());
      }
      this.name = "#text";
      this.type = NodeType.Text;
      this.value = this.stringify.text(text);
    }

    Object.defineProperty(XMLText.prototype, 'isElementContentWhitespace', {
      get: function() {
        throw new Error("This DOM method is not implemented." + this.debugInfo());
      }
    });

    Object.defineProperty(XMLText.prototype, 'wholeText', {
      get: function() {
        var next, prev, str;
        str = '';
        prev = this.previousSibling;
        while (prev) {
          str = prev.data + str;
          prev = prev.previousSibling;
        }
        str += this.data;
        next = this.nextSibling;
        while (next) {
          str = str + next.data;
          next = next.nextSibling;
        }
        return str;
      }
    });

    XMLText.prototype.clone = function() {
      return Object.create(this);
    };

    XMLText.prototype.toString = function(options) {
      return this.options.writer.text(this, this.options.writer.filterOptions(options));
    };

    XMLText.prototype.splitText = function(offset) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    XMLText.prototype.replaceWholeText = function(content) {
      throw new Error("This DOM method is not implemented." + this.debugInfo());
    };

    return XMLText;

  })(XMLCharacterData);

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/XMLWriterBase.js":
/*!******************************************************!*\
  !*** ./node_modules/xmlbuilder/lib/XMLWriterBase.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDummy, XMLElement, XMLProcessingInstruction, XMLRaw, XMLText, XMLWriterBase, assign,
    hasProp = {}.hasOwnProperty;

  assign = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js").assign;

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "./node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "./node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "./node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "./node_modules/xmlbuilder/lib/XMLComment.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "./node_modules/xmlbuilder/lib/XMLElement.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "./node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "./node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "./node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDummy = __webpack_require__(/*! ./XMLDummy */ "./node_modules/xmlbuilder/lib/XMLDummy.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "./node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "./node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "./node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "./node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports = XMLWriterBase = (function() {
    function XMLWriterBase(options) {
      var key, ref, value;
      options || (options = {});
      this.options = options;
      ref = options.writer || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this["_" + key] = this[key];
        this[key] = value;
      }
    }

    XMLWriterBase.prototype.filterOptions = function(options) {
      var filteredOptions, ref, ref1, ref2, ref3, ref4, ref5, ref6;
      options || (options = {});
      options = assign({}, this.options, options);
      filteredOptions = {
        writer: this
      };
      filteredOptions.pretty = options.pretty || false;
      filteredOptions.allowEmpty = options.allowEmpty || false;
      filteredOptions.indent = (ref = options.indent) != null ? ref : '  ';
      filteredOptions.newline = (ref1 = options.newline) != null ? ref1 : '\n';
      filteredOptions.offset = (ref2 = options.offset) != null ? ref2 : 0;
      filteredOptions.dontPrettyTextNodes = (ref3 = (ref4 = options.dontPrettyTextNodes) != null ? ref4 : options.dontprettytextnodes) != null ? ref3 : 0;
      filteredOptions.spaceBeforeSlash = (ref5 = (ref6 = options.spaceBeforeSlash) != null ? ref6 : options.spacebeforeslash) != null ? ref5 : '';
      if (filteredOptions.spaceBeforeSlash === true) {
        filteredOptions.spaceBeforeSlash = ' ';
      }
      filteredOptions.suppressPrettyCount = 0;
      filteredOptions.user = {};
      filteredOptions.state = WriterState.None;
      return filteredOptions;
    };

    XMLWriterBase.prototype.indent = function(node, options, level) {
      var indentLevel;
      if (!options.pretty || options.suppressPrettyCount) {
        return '';
      } else if (options.pretty) {
        indentLevel = (level || 0) + options.offset + 1;
        if (indentLevel > 0) {
          return new Array(indentLevel).join(options.indent);
        }
      }
      return '';
    };

    XMLWriterBase.prototype.endline = function(node, options, level) {
      if (!options.pretty || options.suppressPrettyCount) {
        return '';
      } else {
        return options.newline;
      }
    };

    XMLWriterBase.prototype.attribute = function(att, options, level) {
      var r;
      this.openAttribute(att, options, level);
      r = ' ' + att.name + '="' + att.value + '"';
      this.closeAttribute(att, options, level);
      return r;
    };

    XMLWriterBase.prototype.cdata = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<![CDATA[';
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += ']]>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.comment = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!-- ';
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += ' -->' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.declaration = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<?xml';
      options.state = WriterState.InsideTag;
      r += ' version="' + node.version + '"';
      if (node.encoding != null) {
        r += ' encoding="' + node.encoding + '"';
      }
      if (node.standalone != null) {
        r += ' standalone="' + node.standalone + '"';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '?>';
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.docType = function(node, options, level) {
      var child, i, len, r, ref;
      level || (level = 0);
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level);
      r += '<!DOCTYPE ' + node.root().name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      if (node.children.length > 0) {
        r += ' [';
        r += this.endline(node, options, level);
        options.state = WriterState.InsideTag;
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        r += ']';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>';
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.element = function(node, options, level) {
      var att, child, childNodeCount, firstChildNode, i, j, len, len1, name, prettySuppressed, r, ref, ref1, ref2;
      level || (level = 0);
      prettySuppressed = false;
      r = '';
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r += this.indent(node, options, level) + '<' + node.name;
      ref = node.attribs;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        r += this.attribute(att, options, level);
      }
      childNodeCount = node.children.length;
      firstChildNode = childNodeCount === 0 ? null : node.children[0];
      if (childNodeCount === 0 || node.children.every(function(e) {
        return (e.type === NodeType.Text || e.type === NodeType.Raw) && e.value === '';
      })) {
        if (options.allowEmpty) {
          r += '>';
          options.state = WriterState.CloseTag;
          r += '</' + node.name + '>' + this.endline(node, options, level);
        } else {
          options.state = WriterState.CloseTag;
          r += options.spaceBeforeSlash + '/>' + this.endline(node, options, level);
        }
      } else if (options.pretty && childNodeCount === 1 && (firstChildNode.type === NodeType.Text || firstChildNode.type === NodeType.Raw) && (firstChildNode.value != null)) {
        r += '>';
        options.state = WriterState.InsideTag;
        options.suppressPrettyCount++;
        prettySuppressed = true;
        r += this.writeChildNode(firstChildNode, options, level + 1);
        options.suppressPrettyCount--;
        prettySuppressed = false;
        options.state = WriterState.CloseTag;
        r += '</' + node.name + '>' + this.endline(node, options, level);
      } else {
        if (options.dontPrettyTextNodes) {
          ref1 = node.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            if ((child.type === NodeType.Text || child.type === NodeType.Raw) && (child.value != null)) {
              options.suppressPrettyCount++;
              prettySuppressed = true;
              break;
            }
          }
        }
        r += '>' + this.endline(node, options, level);
        options.state = WriterState.InsideTag;
        ref2 = node.children;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          child = ref2[j];
          r += this.writeChildNode(child, options, level + 1);
        }
        options.state = WriterState.CloseTag;
        r += this.indent(node, options, level) + '</' + node.name + '>';
        if (prettySuppressed) {
          options.suppressPrettyCount--;
        }
        r += this.endline(node, options, level);
        options.state = WriterState.None;
      }
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.writeChildNode = function(node, options, level) {
      switch (node.type) {
        case NodeType.CData:
          return this.cdata(node, options, level);
        case NodeType.Comment:
          return this.comment(node, options, level);
        case NodeType.Element:
          return this.element(node, options, level);
        case NodeType.Raw:
          return this.raw(node, options, level);
        case NodeType.Text:
          return this.text(node, options, level);
        case NodeType.ProcessingInstruction:
          return this.processingInstruction(node, options, level);
        case NodeType.Dummy:
          return '';
        case NodeType.Declaration:
          return this.declaration(node, options, level);
        case NodeType.DocType:
          return this.docType(node, options, level);
        case NodeType.AttributeDeclaration:
          return this.dtdAttList(node, options, level);
        case NodeType.ElementDeclaration:
          return this.dtdElement(node, options, level);
        case NodeType.EntityDeclaration:
          return this.dtdEntity(node, options, level);
        case NodeType.NotationDeclaration:
          return this.dtdNotation(node, options, level);
        default:
          throw new Error("Unknown XML node type: " + node.constructor.name);
      }
    };

    XMLWriterBase.prototype.processingInstruction = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<?';
      options.state = WriterState.InsideTag;
      r += node.target;
      if (node.value) {
        r += ' ' + node.value;
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '?>';
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.raw = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level);
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.text = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level);
      options.state = WriterState.InsideTag;
      r += node.value;
      options.state = WriterState.CloseTag;
      r += this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdAttList = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!ATTLIST';
      options.state = WriterState.InsideTag;
      r += ' ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
      if (node.defaultValueType !== '#DEFAULT') {
        r += ' ' + node.defaultValueType;
      }
      if (node.defaultValue) {
        r += ' "' + node.defaultValue + '"';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdElement = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!ELEMENT';
      options.state = WriterState.InsideTag;
      r += ' ' + node.name + ' ' + node.value;
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdEntity = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!ENTITY';
      options.state = WriterState.InsideTag;
      if (node.pe) {
        r += ' %';
      }
      r += ' ' + node.name;
      if (node.value) {
        r += ' "' + node.value + '"';
      } else {
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.nData) {
          r += ' NDATA ' + node.nData;
        }
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.dtdNotation = function(node, options, level) {
      var r;
      this.openNode(node, options, level);
      options.state = WriterState.OpenTag;
      r = this.indent(node, options, level) + '<!NOTATION';
      options.state = WriterState.InsideTag;
      r += ' ' + node.name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.pubID) {
        r += ' PUBLIC "' + node.pubID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      options.state = WriterState.CloseTag;
      r += options.spaceBeforeSlash + '>' + this.endline(node, options, level);
      options.state = WriterState.None;
      this.closeNode(node, options, level);
      return r;
    };

    XMLWriterBase.prototype.openNode = function(node, options, level) {};

    XMLWriterBase.prototype.closeNode = function(node, options, level) {};

    XMLWriterBase.prototype.openAttribute = function(att, options, level) {};

    XMLWriterBase.prototype.closeAttribute = function(att, options, level) {};

    return XMLWriterBase;

  })();

}).call(this);


/***/ }),

/***/ "./node_modules/xmlbuilder/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/xmlbuilder/lib/index.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var NodeType, WriterState, XMLDOMImplementation, XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

  ref = __webpack_require__(/*! ./Utility */ "./node_modules/xmlbuilder/lib/Utility.js"), assign = ref.assign, isFunction = ref.isFunction;

  XMLDOMImplementation = __webpack_require__(/*! ./XMLDOMImplementation */ "./node_modules/xmlbuilder/lib/XMLDOMImplementation.js");

  XMLDocument = __webpack_require__(/*! ./XMLDocument */ "./node_modules/xmlbuilder/lib/XMLDocument.js");

  XMLDocumentCB = __webpack_require__(/*! ./XMLDocumentCB */ "./node_modules/xmlbuilder/lib/XMLDocumentCB.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "./node_modules/xmlbuilder/lib/XMLStringWriter.js");

  XMLStreamWriter = __webpack_require__(/*! ./XMLStreamWriter */ "./node_modules/xmlbuilder/lib/XMLStreamWriter.js");

  NodeType = __webpack_require__(/*! ./NodeType */ "./node_modules/xmlbuilder/lib/NodeType.js");

  WriterState = __webpack_require__(/*! ./WriterState */ "./node_modules/xmlbuilder/lib/WriterState.js");

  module.exports.create = function(name, xmldec, doctype, options) {
    var doc, root;
    if (name == null) {
      throw new Error("Root element needs a name.");
    }
    options = assign({}, xmldec, doctype, options);
    doc = new XMLDocument(options);
    root = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if ((options.pubID != null) || (options.sysID != null)) {
        doc.dtd(options);
      }
    }
    return root;
  };

  module.exports.begin = function(options, onData, onEnd) {
    var ref1;
    if (isFunction(options)) {
      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB(options, onData, onEnd);
    } else {
      return new XMLDocument(options);
    }
  };

  module.exports.stringWriter = function(options) {
    return new XMLStringWriter(options);
  };

  module.exports.streamWriter = function(stream, options) {
    return new XMLStreamWriter(stream, options);
  };

  module.exports.implementation = new XMLDOMImplementation();

  module.exports.nodeType = NodeType;

  module.exports.writerState = WriterState;

}).call(this);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/battle-report-enhancer/main.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2VtaXR0ZXItY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9zYWZlLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3NheC9saWIvc2F4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvc3RyZWFtL2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvc3RyaW5nX2RlY29kZXIvbGliL3N0cmluZ19kZWNvZGVyLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvdGltZXJzL2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9zcmMvYmF0dGxlLXJlcG9ydC1lbmhhbmNlci9sb2NhbGl6YXRpb24udHMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL3NyYy9iYXR0bGUtcmVwb3J0LWVuaGFuY2VyL21haW4udHMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL3NyYy9iYXR0bGUtcmVwb3J0LWVuaGFuY2VyL3BhcnNlci50cyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vc3JjL2NvbW1vbi9sb2dpYy50cyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vc3JjL2NvbW1vbi9tb2RlbC50cyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vc3JjL2NvbW1vbi9zdG9yYWdlLnRzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9zcmMvY29tbW9uL3dvcmxkLWNvbmZpZy1sb2dpYy50cyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vc3JjL2NvbW1vbi93b3JsZC1jb25maWcudHMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWwyanMvbGliL2JvbS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIvYnVpbGRlci5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWwyanMvbGliL3BhcnNlci5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIvcHJvY2Vzc29ycy5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIveG1sMmpzLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvRG9jdW1lbnRQb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL05vZGVUeXBlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvVXRpbGl0eS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1dyaXRlclN0YXRlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MQXR0cmlidXRlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MQ0RhdGEuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxDaGFyYWN0ZXJEYXRhLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MQ29tbWVudC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERPTUNvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxET01FcnJvckhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxET01JbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERPTVN0cmluZ0xpc3QuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxEVERBdHRMaXN0LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRFRERWxlbWVudC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERUREVudGl0eS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERURE5vdGF0aW9uLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRGVjbGFyYXRpb24uanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxEb2NUeXBlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxEb2N1bWVudENCLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRHVtbXkuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxFbGVtZW50LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MTmFtZWROb2RlTWFwLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MTm9kZS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTE5vZGVMaXN0LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MUmF3LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MU3RyZWFtV3JpdGVyLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MU3RyaW5nV3JpdGVyLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MU3RyaW5naWZpZXIuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxUZXh0LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MV3JpdGVyQmFzZS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90d19zY3JpcHRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90d19zY3JpcHRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3R3X3NjcmlwdHMvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBWTs7QUFFWixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxVQUFVO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWixlQUFlLG1CQUFPLENBQUMsb0RBQVc7QUFDbEMsZ0JBQWdCLG1CQUFPLENBQUMsZ0RBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLGtCQUFrQjtBQUNsQix5QkFBeUI7O0FBRXpCO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxD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Q0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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QUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscUNBQXFDOztBQUVqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsb0JBQW9CO0FBQ3BFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsV0FBVyxPQUFPLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRUFBRSxNQUE4QixHQUFHLENBQWE7Ozs7Ozs7Ozs7O0FDNWhEakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsMERBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjs7QUFFQSxhQUFhLG9GQUE2QjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0NBQXNDLHNDQUFzQztBQUN6RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN0U0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0UrQztBQTBCL0MsU0FBUyx1QkFBdUI7SUFDNUIs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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELEdBQUc7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLEdBQUc7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVILENBQUM7Ozs7Ozs7Ozs7O0FDL2dCRDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsMEJBQTBCLHlEQUF5RCxFQUFFLGtCQUFrQiwwQkFBMEIsRUFBRSxtQ0FBbUMsOEJBQThCLG9DQUFvQyxjQUFjLEVBQUU7QUFDOVIsZ0JBQWdCOztBQUVoQixZQUFZLG1CQUFPLENBQUMsMkRBQVc7O0FBRS9CLGFBQWEsbUJBQU8sQ0FBQyw2REFBWTs7QUFFakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUgsQ0FBQzs7Ozs7Ozs7Ozs7QUM5QkQ7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDBCQUEwQix5REFBeUQsRUFBRSxrQkFBa0IsMEJBQTBCLEVBQUUsbUNBQW1DLDhCQUE4QixvQ0FBb0MsY0FBYyxFQUFFO0FBQzlSLGdCQUFnQjs7QUFFaEIsUUFBUSxtQkFBTyxDQUFDLDJEQUFXOztBQUUzQixZQUFZLG1CQUFPLENBQUMsMkRBQVc7O0FBRS9CLGFBQWEsbUJBQU8sQ0FBQyw2REFBWTs7QUFFakMsaUJBQWlCLG1CQUFPLENBQUMscUVBQWdCOztBQUV6QyxvQkFBb0IsbUJBQU8sQ0FBQywyRUFBbUI7O0FBRS9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1gsMENBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsbUNBQW1DO0FBQ3pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFELHlDQUF5QyxzQkFBc0Isc0JBQXNCLHdCQUF3QjtBQUM3Rzs7QUFFQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVILENBQUM7Ozs7Ozs7Ozs7O0FDM2FEO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLG1CQUFPLENBQUMsMkRBQVc7O0FBRTNCLHlCQUF5QixtQkFBTyxDQUFDLHFGQUF3Qjs7QUFFekQsZ0JBQWdCLG1CQUFPLENBQUMsbUVBQWU7O0FBRXZDLGtCQUFrQixtQkFBTyxDQUFDLHVFQUFpQjs7QUFFM0Msb0JBQW9CLG1CQUFPLENBQUMsMkVBQW1COztBQUUvQyxvQkFBb0IsbUJBQU8sQ0FBQywyRUFBbUI7O0FBRS9DLGFBQWEsbUJBQU8sQ0FBQyw2REFBWTs7QUFFakMsZ0JBQWdCLG1CQUFPLENBQUMsbUVBQWU7O0FBRXZDLEVBQUUscUJBQXFCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsb0JBQW9CO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLDJCQUEyQjtBQUM3QjtBQUNBOztBQUVBLEVBQUUsMkJBQTJCO0FBQzdCO0FBQ0E7O0FBRUEsRUFBRSw2QkFBNkI7O0FBRS9CLEVBQUUsdUJBQXVCOztBQUV6QixFQUFFLDBCQUEwQjs7QUFFNUIsQ0FBQzs7Ozs7OztVQ2hFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJiYXR0bGVSZXBvcnRFbmhhbmNlci5kZXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwiXG4vKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59O1xuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIGlmIChlcnJvckxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuICAgIHZhciBlcnJvckxpc3RlbmVyO1xuXG4gICAgLy8gQWRkaW5nIGFuIGVycm9yIGxpc3RlbmVyIGlzIG5vdCBvcHRpb25hbCBiZWNhdXNlXG4gICAgLy8gaWYgYW4gZXJyb3IgaXMgdGhyb3duIG9uIGFuIGV2ZW50IGVtaXR0ZXIgd2UgY2Fubm90XG4gICAgLy8gZ3VhcmFudGVlIHRoYXQgdGhlIGFjdHVhbCBldmVudCB3ZSBhcmUgd2FpdGluZyB3aWxsXG4gICAgLy8gYmUgZmlyZWQuIFRoZSByZXN1bHQgY291bGQgYmUgYSBzaWxlbnQgd2F5IHRvIGNyZWF0ZVxuICAgIC8vIG1lbW9yeSBvciBmaWxlIGRlc2NyaXB0b3IgbGVha3MsIHdoaWNoIGlzIHNvbWV0aGluZ1xuICAgIC8vIHdlIHNob3VsZCBhdm9pZC5cbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgZXJyb3JMaXN0ZW5lciA9IGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfTtcblxuICAgICAgZW1pdHRlci5vbmNlKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGVtaXR0ZXIub25jZShuYW1lLCBldmVudExpc3RlbmVyKTtcbiAgfSk7XG59XG4iLCIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby1kZXByZWNhdGVkLWFwaSAqL1xudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG52YXIgQnVmZmVyID0gYnVmZmVyLkJ1ZmZlclxuXG4vLyBhbHRlcm5hdGl2ZSB0byB1c2luZyBPYmplY3Qua2V5cyBmb3Igb2xkIGJyb3dzZXJzXG5mdW5jdGlvbiBjb3B5UHJvcHMgKHNyYywgZHN0KSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBkc3Rba2V5XSA9IHNyY1trZXldXG4gIH1cbn1cbmlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuYWxsb2MgJiYgQnVmZmVyLmFsbG9jVW5zYWZlICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbn0gZWxzZSB7XG4gIC8vIENvcHkgcHJvcGVydGllcyBmcm9tIHJlcXVpcmUoJ2J1ZmZlcicpXG4gIGNvcHlQcm9wcyhidWZmZXIsIGV4cG9ydHMpXG4gIGV4cG9ydHMuQnVmZmVyID0gU2FmZUJ1ZmZlclxufVxuXG5mdW5jdGlvbiBTYWZlQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBDb3B5IHN0YXRpYyBtZXRob2RzIGZyb20gQnVmZmVyXG5jb3B5UHJvcHMoQnVmZmVyLCBTYWZlQnVmZmVyKVxuXG5TYWZlQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cblNhZmVCdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHZhciBidWYgPSBCdWZmZXIoc2l6ZSlcbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBidWYuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmZpbGwoZmlsbClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYnVmLmZpbGwoMClcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihzaXplKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gYnVmZmVyLlNsb3dCdWZmZXIoc2l6ZSlcbn1cbiIsIjsoZnVuY3Rpb24gKHNheCkgeyAvLyB3cmFwcGVyIGZvciBub24tbm9kZSBlbnZzXG4gIHNheC5wYXJzZXIgPSBmdW5jdGlvbiAoc3RyaWN0LCBvcHQpIHsgcmV0dXJuIG5ldyBTQVhQYXJzZXIoc3RyaWN0LCBvcHQpIH1cbiAgc2F4LlNBWFBhcnNlciA9IFNBWFBhcnNlclxuICBzYXguU0FYU3RyZWFtID0gU0FYU3RyZWFtXG4gIHNheC5jcmVhdGVTdHJlYW0gPSBjcmVhdGVTdHJlYW1cblxuICAvLyBXaGVuIHdlIHBhc3MgdGhlIE1BWF9CVUZGRVJfTEVOR1RIIHBvc2l0aW9uLCBzdGFydCBjaGVja2luZyBmb3IgYnVmZmVyIG92ZXJydW5zLlxuICAvLyBXaGVuIHdlIGNoZWNrLCBzY2hlZHVsZSB0aGUgbmV4dCBjaGVjayBmb3IgTUFYX0JVRkZFUl9MRU5HVEggLSAobWF4KGJ1ZmZlciBsZW5ndGhzKSksXG4gIC8vIHNpbmNlIHRoYXQncyB0aGUgZWFybGllc3QgdGhhdCBhIGJ1ZmZlciBvdmVycnVuIGNvdWxkIG9jY3VyLiAgVGhpcyB3YXksIGNoZWNrcyBhcmVcbiAgLy8gYXMgcmFyZSBhcyByZXF1aXJlZCwgYnV0IGFzIG9mdGVuIGFzIG5lY2Vzc2FyeSB0byBlbnN1cmUgbmV2ZXIgY3Jvc3NpbmcgdGhpcyBib3VuZC5cbiAgLy8gRnVydGhlcm1vcmUsIGJ1ZmZlcnMgYXJlIG9ubHkgdGVzdGVkIGF0IG1vc3Qgb25jZSBwZXIgd3JpdGUoKSwgc28gcGFzc2luZyBhIHZlcnlcbiAgLy8gbGFyZ2Ugc3RyaW5nIGludG8gd3JpdGUoKSBtaWdodCBoYXZlIHVuZGVzaXJhYmxlIGVmZmVjdHMsIGJ1dCB0aGlzIGlzIG1hbmFnZWFibGUgYnlcbiAgLy8gdGhlIGNhbGxlciwgc28gaXQgaXMgYXNzdW1lZCB0byBiZSBzYWZlLiAgVGh1cywgYSBjYWxsIHRvIHdyaXRlKCkgbWF5LCBpbiB0aGUgZXh0cmVtZVxuICAvLyBlZGdlIGNhc2UsIHJlc3VsdCBpbiBjcmVhdGluZyBhdCBtb3N0IG9uZSBjb21wbGV0ZSBjb3B5IG9mIHRoZSBzdHJpbmcgcGFzc2VkIGluLlxuICAvLyBTZXQgdG8gSW5maW5pdHkgdG8gaGF2ZSB1bmxpbWl0ZWQgYnVmZmVycy5cbiAgc2F4Lk1BWF9CVUZGRVJfTEVOR1RIID0gNjQgKiAxMDI0XG5cbiAgdmFyIGJ1ZmZlcnMgPSBbXG4gICAgJ2NvbW1lbnQnLCAnc2dtbERlY2wnLCAndGV4dE5vZGUnLCAndGFnTmFtZScsICdkb2N0eXBlJyxcbiAgICAncHJvY0luc3ROYW1lJywgJ3Byb2NJbnN0Qm9keScsICdlbnRpdHknLCAnYXR0cmliTmFtZScsXG4gICAgJ2F0dHJpYlZhbHVlJywgJ2NkYXRhJywgJ3NjcmlwdCdcbiAgXVxuXG4gIHNheC5FVkVOVFMgPSBbXG4gICAgJ3RleHQnLFxuICAgICdwcm9jZXNzaW5naW5zdHJ1Y3Rpb24nLFxuICAgICdzZ21sZGVjbGFyYXRpb24nLFxuICAgICdkb2N0eXBlJyxcbiAgICAnY29tbWVudCcsXG4gICAgJ29wZW50YWdzdGFydCcsXG4gICAgJ2F0dHJpYnV0ZScsXG4gICAgJ29wZW50YWcnLFxuICAgICdjbG9zZXRhZycsXG4gICAgJ29wZW5jZGF0YScsXG4gICAgJ2NkYXRhJyxcbiAgICAnY2xvc2VjZGF0YScsXG4gICAgJ2Vycm9yJyxcbiAgICAnZW5kJyxcbiAgICAncmVhZHknLFxuICAgICdzY3JpcHQnLFxuICAgICdvcGVubmFtZXNwYWNlJyxcbiAgICAnY2xvc2VuYW1lc3BhY2UnXG4gIF1cblxuICBmdW5jdGlvbiBTQVhQYXJzZXIgKHN0cmljdCwgb3B0KSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNBWFBhcnNlcikpIHtcbiAgICAgIHJldHVybiBuZXcgU0FYUGFyc2VyKHN0cmljdCwgb3B0KVxuICAgIH1cblxuICAgIHZhciBwYXJzZXIgPSB0aGlzXG4gICAgY2xlYXJCdWZmZXJzKHBhcnNlcilcbiAgICBwYXJzZXIucSA9IHBhcnNlci5jID0gJydcbiAgICBwYXJzZXIuYnVmZmVyQ2hlY2tQb3NpdGlvbiA9IHNheC5NQVhfQlVGRkVSX0xFTkdUSFxuICAgIHBhcnNlci5vcHQgPSBvcHQgfHwge31cbiAgICBwYXJzZXIub3B0Lmxvd2VyY2FzZSA9IHBhcnNlci5vcHQubG93ZXJjYXNlIHx8IHBhcnNlci5vcHQubG93ZXJjYXNldGFnc1xuICAgIHBhcnNlci5sb29zZUNhc2UgPSBwYXJzZXIub3B0Lmxvd2VyY2FzZSA/ICd0b0xvd2VyQ2FzZScgOiAndG9VcHBlckNhc2UnXG4gICAgcGFyc2VyLnRhZ3MgPSBbXVxuICAgIHBhcnNlci5jbG9zZWQgPSBwYXJzZXIuY2xvc2VkUm9vdCA9IHBhcnNlci5zYXdSb290ID0gZmFsc2VcbiAgICBwYXJzZXIudGFnID0gcGFyc2VyLmVycm9yID0gbnVsbFxuICAgIHBhcnNlci5zdHJpY3QgPSAhIXN0cmljdFxuICAgIHBhcnNlci5ub3NjcmlwdCA9ICEhKHN0cmljdCB8fCBwYXJzZXIub3B0Lm5vc2NyaXB0KVxuICAgIHBhcnNlci5zdGF0ZSA9IFMuQkVHSU5cbiAgICBwYXJzZXIuc3RyaWN0RW50aXRpZXMgPSBwYXJzZXIub3B0LnN0cmljdEVudGl0aWVzXG4gICAgcGFyc2VyLkVOVElUSUVTID0gcGFyc2VyLnN0cmljdEVudGl0aWVzID8gT2JqZWN0LmNyZWF0ZShzYXguWE1MX0VOVElUSUVTKSA6IE9iamVjdC5jcmVhdGUoc2F4LkVOVElUSUVTKVxuICAgIHBhcnNlci5hdHRyaWJMaXN0ID0gW11cblxuICAgIC8vIG5hbWVzcGFjZXMgZm9ybSBhIHByb3RvdHlwZSBjaGFpbi5cbiAgICAvLyBpdCBhbHdheXMgcG9pbnRzIGF0IHRoZSBjdXJyZW50IHRhZyxcbiAgICAvLyB3aGljaCBwcm90b3MgdG8gaXRzIHBhcmVudCB0YWcuXG4gICAgaWYgKHBhcnNlci5vcHQueG1sbnMpIHtcbiAgICAgIHBhcnNlci5ucyA9IE9iamVjdC5jcmVhdGUocm9vdE5TKVxuICAgIH1cblxuICAgIC8vIG1vc3RseSBqdXN0IGZvciBlcnJvciByZXBvcnRpbmdcbiAgICBwYXJzZXIudHJhY2tQb3NpdGlvbiA9IHBhcnNlci5vcHQucG9zaXRpb24gIT09IGZhbHNlXG4gICAgaWYgKHBhcnNlci50cmFja1Bvc2l0aW9uKSB7XG4gICAgICBwYXJzZXIucG9zaXRpb24gPSBwYXJzZXIubGluZSA9IHBhcnNlci5jb2x1bW4gPSAwXG4gICAgfVxuICAgIGVtaXQocGFyc2VyLCAnb25yZWFkeScpXG4gIH1cblxuICBpZiAoIU9iamVjdC5jcmVhdGUpIHtcbiAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgIGZ1bmN0aW9uIEYgKCkge31cbiAgICAgIEYucHJvdG90eXBlID0gb1xuICAgICAgdmFyIG5ld2YgPSBuZXcgRigpXG4gICAgICByZXR1cm4gbmV3ZlxuICAgIH1cbiAgfVxuXG4gIGlmICghT2JqZWN0LmtleXMpIHtcbiAgICBPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICB2YXIgYSA9IFtdXG4gICAgICBmb3IgKHZhciBpIGluIG8pIGlmIChvLmhhc093blByb3BlcnR5KGkpKSBhLnB1c2goaSlcbiAgICAgIHJldHVybiBhXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tCdWZmZXJMZW5ndGggKHBhcnNlcikge1xuICAgIHZhciBtYXhBbGxvd2VkID0gTWF0aC5tYXgoc2F4Lk1BWF9CVUZGRVJfTEVOR1RILCAxMClcbiAgICB2YXIgbWF4QWN0dWFsID0gMFxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYnVmZmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBsZW4gPSBwYXJzZXJbYnVmZmVyc1tpXV0ubGVuZ3RoXG4gICAgICBpZiAobGVuID4gbWF4QWxsb3dlZCkge1xuICAgICAgICAvLyBUZXh0L2NkYXRhIG5vZGVzIGNhbiBnZXQgYmlnLCBhbmQgc2luY2UgdGhleSdyZSBidWZmZXJlZCxcbiAgICAgICAgLy8gd2UgY2FuIGdldCBoZXJlIHVuZGVyIG5vcm1hbCBjb25kaXRpb25zLlxuICAgICAgICAvLyBBdm9pZCBpc3N1ZXMgYnkgZW1pdHRpbmcgdGhlIHRleHQgbm9kZSBub3csXG4gICAgICAgIC8vIHNvIGF0IGxlYXN0IGl0IHdvbid0IGdldCBhbnkgYmlnZ2VyLlxuICAgICAgICBzd2l0Y2ggKGJ1ZmZlcnNbaV0pIHtcbiAgICAgICAgICBjYXNlICd0ZXh0Tm9kZSc6XG4gICAgICAgICAgICBjbG9zZVRleHQocGFyc2VyKVxuICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgIGNhc2UgJ2NkYXRhJzpcbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2RhdGEnLCBwYXJzZXIuY2RhdGEpXG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgPSAnJ1xuICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgIGNhc2UgJ3NjcmlwdCc6XG4gICAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbnNjcmlwdCcsIHBhcnNlci5zY3JpcHQpXG4gICAgICAgICAgICBwYXJzZXIuc2NyaXB0ID0gJydcbiAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZXJyb3IocGFyc2VyLCAnTWF4IGJ1ZmZlciBsZW5ndGggZXhjZWVkZWQ6ICcgKyBidWZmZXJzW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtYXhBY3R1YWwgPSBNYXRoLm1heChtYXhBY3R1YWwsIGxlbilcbiAgICB9XG4gICAgLy8gc2NoZWR1bGUgdGhlIG5leHQgY2hlY2sgZm9yIHRoZSBlYXJsaWVzdCBwb3NzaWJsZSBidWZmZXIgb3ZlcnJ1bi5cbiAgICB2YXIgbSA9IHNheC5NQVhfQlVGRkVSX0xFTkdUSCAtIG1heEFjdHVhbFxuICAgIHBhcnNlci5idWZmZXJDaGVja1Bvc2l0aW9uID0gbSArIHBhcnNlci5wb3NpdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJCdWZmZXJzIChwYXJzZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBwYXJzZXJbYnVmZmVyc1tpXV0gPSAnJ1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoQnVmZmVycyAocGFyc2VyKSB7XG4gICAgY2xvc2VUZXh0KHBhcnNlcilcbiAgICBpZiAocGFyc2VyLmNkYXRhICE9PSAnJykge1xuICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jZGF0YScsIHBhcnNlci5jZGF0YSlcbiAgICAgIHBhcnNlci5jZGF0YSA9ICcnXG4gICAgfVxuICAgIGlmIChwYXJzZXIuc2NyaXB0ICE9PSAnJykge1xuICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25zY3JpcHQnLCBwYXJzZXIuc2NyaXB0KVxuICAgICAgcGFyc2VyLnNjcmlwdCA9ICcnXG4gICAgfVxuICB9XG5cbiAgU0FYUGFyc2VyLnByb3RvdHlwZSA9IHtcbiAgICBlbmQ6IGZ1bmN0aW9uICgpIHsgZW5kKHRoaXMpIH0sXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIHJlc3VtZTogZnVuY3Rpb24gKCkgeyB0aGlzLmVycm9yID0gbnVsbDsgcmV0dXJuIHRoaXMgfSxcbiAgICBjbG9zZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy53cml0ZShudWxsKSB9LFxuICAgIGZsdXNoOiBmdW5jdGlvbiAoKSB7IGZsdXNoQnVmZmVycyh0aGlzKSB9XG4gIH1cblxuICB2YXIgU3RyZWFtXG4gIHRyeSB7XG4gICAgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJykuU3RyZWFtXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgU3RyZWFtID0gZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIHZhciBzdHJlYW1XcmFwcyA9IHNheC5FVkVOVFMuZmlsdGVyKGZ1bmN0aW9uIChldikge1xuICAgIHJldHVybiBldiAhPT0gJ2Vycm9yJyAmJiBldiAhPT0gJ2VuZCdcbiAgfSlcblxuICBmdW5jdGlvbiBjcmVhdGVTdHJlYW0gKHN0cmljdCwgb3B0KSB7XG4gICAgcmV0dXJuIG5ldyBTQVhTdHJlYW0oc3RyaWN0LCBvcHQpXG4gIH1cblxuICBmdW5jdGlvbiBTQVhTdHJlYW0gKHN0cmljdCwgb3B0KSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNBWFN0cmVhbSkpIHtcbiAgICAgIHJldHVybiBuZXcgU0FYU3RyZWFtKHN0cmljdCwgb3B0KVxuICAgIH1cblxuICAgIFN0cmVhbS5hcHBseSh0aGlzKVxuXG4gICAgdGhpcy5fcGFyc2VyID0gbmV3IFNBWFBhcnNlcihzdHJpY3QsIG9wdClcbiAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZVxuICAgIHRoaXMucmVhZGFibGUgPSB0cnVlXG5cbiAgICB2YXIgbWUgPSB0aGlzXG5cbiAgICB0aGlzLl9wYXJzZXIub25lbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBtZS5lbWl0KCdlbmQnKVxuICAgIH1cblxuICAgIHRoaXMuX3BhcnNlci5vbmVycm9yID0gZnVuY3Rpb24gKGVyKSB7XG4gICAgICBtZS5lbWl0KCdlcnJvcicsIGVyKVxuXG4gICAgICAvLyBpZiBkaWRuJ3QgdGhyb3csIHRoZW4gbWVhbnMgZXJyb3Igd2FzIGhhbmRsZWQuXG4gICAgICAvLyBnbyBhaGVhZCBhbmQgY2xlYXIgZXJyb3IsIHNvIHdlIGNhbiB3cml0ZSBhZ2Fpbi5cbiAgICAgIG1lLl9wYXJzZXIuZXJyb3IgPSBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5fZGVjb2RlciA9IG51bGxcblxuICAgIHN0cmVhbVdyYXBzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWUsICdvbicgKyBldiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbWUuX3BhcnNlclsnb24nICsgZXZdXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgICBpZiAoIWgpIHtcbiAgICAgICAgICAgIG1lLnJlbW92ZUFsbExpc3RlbmVycyhldilcbiAgICAgICAgICAgIG1lLl9wYXJzZXJbJ29uJyArIGV2XSA9IGhcbiAgICAgICAgICAgIHJldHVybiBoXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lLm9uKGV2LCBoKVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBTQVhTdHJlYW0ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdHJlYW0ucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBTQVhTdHJlYW1cbiAgICB9XG4gIH0pXG5cbiAgU0FYU3RyZWFtLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBCdWZmZXIuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgaWYgKCF0aGlzLl9kZWNvZGVyKSB7XG4gICAgICAgIHZhciBTRCA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyJykuU3RyaW5nRGVjb2RlclxuICAgICAgICB0aGlzLl9kZWNvZGVyID0gbmV3IFNEKCd1dGY4JylcbiAgICAgIH1cbiAgICAgIGRhdGEgPSB0aGlzLl9kZWNvZGVyLndyaXRlKGRhdGEpXG4gICAgfVxuXG4gICAgdGhpcy5fcGFyc2VyLndyaXRlKGRhdGEudG9TdHJpbmcoKSlcbiAgICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBTQVhTdHJlYW0ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIChjaHVuaykge1xuICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHtcbiAgICAgIHRoaXMud3JpdGUoY2h1bmspXG4gICAgfVxuICAgIHRoaXMuX3BhcnNlci5lbmQoKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBTQVhTdHJlYW0ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2LCBoYW5kbGVyKSB7XG4gICAgdmFyIG1lID0gdGhpc1xuICAgIGlmICghbWUuX3BhcnNlclsnb24nICsgZXZdICYmIHN0cmVhbVdyYXBzLmluZGV4T2YoZXYpICE9PSAtMSkge1xuICAgICAgbWUuX3BhcnNlclsnb24nICsgZXZdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBbYXJndW1lbnRzWzBdXSA6IEFycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgYXJncy5zcGxpY2UoMCwgMCwgZXYpXG4gICAgICAgIG1lLmVtaXQuYXBwbHkobWUsIGFyZ3MpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmVhbS5wcm90b3R5cGUub24uY2FsbChtZSwgZXYsIGhhbmRsZXIpXG4gIH1cblxuICAvLyB0aGlzIHJlYWxseSBuZWVkcyB0byBiZSByZXBsYWNlZCB3aXRoIGNoYXJhY3RlciBjbGFzc2VzLlxuICAvLyBYTUwgYWxsb3dzIGFsbCBtYW5uZXIgb2YgcmlkaWN1bG91cyBudW1iZXJzIGFuZCBkaWdpdHMuXG4gIHZhciBDREFUQSA9ICdbQ0RBVEFbJ1xuICB2YXIgRE9DVFlQRSA9ICdET0NUWVBFJ1xuICB2YXIgWE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnXG4gIHZhciBYTUxOU19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXG4gIHZhciByb290TlMgPSB7IHhtbDogWE1MX05BTUVTUEFDRSwgeG1sbnM6IFhNTE5TX05BTUVTUEFDRSB9XG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC8jTlQtTmFtZVN0YXJ0Q2hhclxuICAvLyBUaGlzIGltcGxlbWVudGF0aW9uIHdvcmtzIG9uIHN0cmluZ3MsIGEgc2luZ2xlIGNoYXJhY3RlciBhdCBhIHRpbWVcbiAgLy8gYXMgc3VjaCwgaXQgY2Fubm90IGV2ZXIgc3VwcG9ydCBhc3RyYWwtcGxhbmUgY2hhcmFjdGVycyAoMTAwMDAtRUZGRkYpXG4gIC8vIHdpdGhvdXQgYSBzaWduaWZpY2FudCBicmVha2luZyBjaGFuZ2UgdG8gZWl0aGVyIHRoaXMgIHBhcnNlciwgb3IgdGhlXG4gIC8vIEphdmFTY3JpcHQgbGFuZ3VhZ2UuICBJbXBsZW1lbnRhdGlvbiBvZiBhbiBlbW9qaS1jYXBhYmxlIHhtbCBwYXJzZXJcbiAgLy8gaXMgbGVmdCBhcyBhbiBleGVyY2lzZSBmb3IgdGhlIHJlYWRlci5cbiAgdmFyIG5hbWVTdGFydCA9IC9bOl9BLVphLXpcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAyRkZcXHUwMzcwLVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDLVxcdTIwMERcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkRdL1xuXG4gIHZhciBuYW1lQm9keSA9IC9bOl9BLVphLXpcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAyRkZcXHUwMzcwLVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDLVxcdTIwMERcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkRcXHUwMEI3XFx1MDMwMC1cXHUwMzZGXFx1MjAzRi1cXHUyMDQwLlxcZC1dL1xuXG4gIHZhciBlbnRpdHlTdGFydCA9IC9bIzpfQS1aYS16XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMkZGXFx1MDM3MC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXS9cbiAgdmFyIGVudGl0eUJvZHkgPSAvWyM6X0EtWmEtelxcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDJGRlxcdTAzNzAtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMEMtXFx1MjAwRFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRFxcdTAwQjdcXHUwMzAwLVxcdTAzNkZcXHUyMDNGLVxcdTIwNDAuXFxkLV0vXG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChjKSB7XG4gICAgcmV0dXJuIGMgPT09ICcgJyB8fCBjID09PSAnXFxuJyB8fCBjID09PSAnXFxyJyB8fCBjID09PSAnXFx0J1xuICB9XG5cbiAgZnVuY3Rpb24gaXNRdW90ZSAoYykge1xuICAgIHJldHVybiBjID09PSAnXCInIHx8IGMgPT09ICdcXCcnXG4gIH1cblxuICBmdW5jdGlvbiBpc0F0dHJpYkVuZCAoYykge1xuICAgIHJldHVybiBjID09PSAnPicgfHwgaXNXaGl0ZXNwYWNlKGMpXG4gIH1cblxuICBmdW5jdGlvbiBpc01hdGNoIChyZWdleCwgYykge1xuICAgIHJldHVybiByZWdleC50ZXN0KGMpXG4gIH1cblxuICBmdW5jdGlvbiBub3RNYXRjaCAocmVnZXgsIGMpIHtcbiAgICByZXR1cm4gIWlzTWF0Y2gocmVnZXgsIGMpXG4gIH1cblxuICB2YXIgUyA9IDBcbiAgc2F4LlNUQVRFID0ge1xuICAgIEJFR0lOOiBTKyssIC8vIGxlYWRpbmcgYnl0ZSBvcmRlciBtYXJrIG9yIHdoaXRlc3BhY2VcbiAgICBCRUdJTl9XSElURVNQQUNFOiBTKyssIC8vIGxlYWRpbmcgd2hpdGVzcGFjZVxuICAgIFRFWFQ6IFMrKywgLy8gZ2VuZXJhbCBzdHVmZlxuICAgIFRFWFRfRU5USVRZOiBTKyssIC8vICZhbXAgYW5kIHN1Y2guXG4gICAgT1BFTl9XQUtBOiBTKyssIC8vIDxcbiAgICBTR01MX0RFQ0w6IFMrKywgLy8gPCFCTEFSR1xuICAgIFNHTUxfREVDTF9RVU9URUQ6IFMrKywgLy8gPCFCTEFSRyBmb28gXCJiYXJcbiAgICBET0NUWVBFOiBTKyssIC8vIDwhRE9DVFlQRVxuICAgIERPQ1RZUEVfUVVPVEVEOiBTKyssIC8vIDwhRE9DVFlQRSBcIi8vYmxhaFxuICAgIERPQ1RZUEVfRFREOiBTKyssIC8vIDwhRE9DVFlQRSBcIi8vYmxhaFwiIFsgLi4uXG4gICAgRE9DVFlQRV9EVERfUVVPVEVEOiBTKyssIC8vIDwhRE9DVFlQRSBcIi8vYmxhaFwiIFsgXCJmb29cbiAgICBDT01NRU5UX1NUQVJUSU5HOiBTKyssIC8vIDwhLVxuICAgIENPTU1FTlQ6IFMrKywgLy8gPCEtLVxuICAgIENPTU1FTlRfRU5ESU5HOiBTKyssIC8vIDwhLS0gYmxhaCAtXG4gICAgQ09NTUVOVF9FTkRFRDogUysrLCAvLyA8IS0tIGJsYWggLS1cbiAgICBDREFUQTogUysrLCAvLyA8IVtDREFUQVsgc29tZXRoaW5nXG4gICAgQ0RBVEFfRU5ESU5HOiBTKyssIC8vIF1cbiAgICBDREFUQV9FTkRJTkdfMjogUysrLCAvLyBdXVxuICAgIFBST0NfSU5TVDogUysrLCAvLyA8P2hpXG4gICAgUFJPQ19JTlNUX0JPRFk6IFMrKywgLy8gPD9oaSB0aGVyZVxuICAgIFBST0NfSU5TVF9FTkRJTkc6IFMrKywgLy8gPD9oaSBcInRoZXJlXCIgP1xuICAgIE9QRU5fVEFHOiBTKyssIC8vIDxzdHJvbmdcbiAgICBPUEVOX1RBR19TTEFTSDogUysrLCAvLyA8c3Ryb25nIC9cbiAgICBBVFRSSUI6IFMrKywgLy8gPGFcbiAgICBBVFRSSUJfTkFNRTogUysrLCAvLyA8YSBmb29cbiAgICBBVFRSSUJfTkFNRV9TQVdfV0hJVEU6IFMrKywgLy8gPGEgZm9vIF9cbiAgICBBVFRSSUJfVkFMVUU6IFMrKywgLy8gPGEgZm9vPVxuICAgIEFUVFJJQl9WQUxVRV9RVU9URUQ6IFMrKywgLy8gPGEgZm9vPVwiYmFyXG4gICAgQVRUUklCX1ZBTFVFX0NMT1NFRDogUysrLCAvLyA8YSBmb289XCJiYXJcIlxuICAgIEFUVFJJQl9WQUxVRV9VTlFVT1RFRDogUysrLCAvLyA8YSBmb289YmFyXG4gICAgQVRUUklCX1ZBTFVFX0VOVElUWV9ROiBTKyssIC8vIDxmb28gYmFyPVwiJnF1b3Q7XCJcbiAgICBBVFRSSUJfVkFMVUVfRU5USVRZX1U6IFMrKywgLy8gPGZvbyBiYXI9JnF1b3RcbiAgICBDTE9TRV9UQUc6IFMrKywgLy8gPC9hXG4gICAgQ0xPU0VfVEFHX1NBV19XSElURTogUysrLCAvLyA8L2EgICA+XG4gICAgU0NSSVBUOiBTKyssIC8vIDxzY3JpcHQ+IC4uLlxuICAgIFNDUklQVF9FTkRJTkc6IFMrKyAvLyA8c2NyaXB0PiAuLi4gPFxuICB9XG5cbiAgc2F4LlhNTF9FTlRJVElFUyA9IHtcbiAgICAnYW1wJzogJyYnLFxuICAgICdndCc6ICc+JyxcbiAgICAnbHQnOiAnPCcsXG4gICAgJ3F1b3QnOiAnXCInLFxuICAgICdhcG9zJzogXCInXCJcbiAgfVxuXG4gIHNheC5FTlRJVElFUyA9IHtcbiAgICAnYW1wJzogJyYnLFxuICAgICdndCc6ICc+JyxcbiAgICAnbHQnOiAnPCcsXG4gICAgJ3F1b3QnOiAnXCInLFxuICAgICdhcG9zJzogXCInXCIsXG4gICAgJ0FFbGlnJzogMTk4LFxuICAgICdBYWN1dGUnOiAxOTMsXG4gICAgJ0FjaXJjJzogMTk0LFxuICAgICdBZ3JhdmUnOiAxOTIsXG4gICAgJ0FyaW5nJzogMTk3LFxuICAgICdBdGlsZGUnOiAxOTUsXG4gICAgJ0F1bWwnOiAxOTYsXG4gICAgJ0NjZWRpbCc6IDE5OSxcbiAgICAnRVRIJzogMjA4LFxuICAgICdFYWN1dGUnOiAyMDEsXG4gICAgJ0VjaXJjJzogMjAyLFxuICAgICdFZ3JhdmUnOiAyMDAsXG4gICAgJ0V1bWwnOiAyMDMsXG4gICAgJ0lhY3V0ZSc6IDIwNSxcbiAgICAnSWNpcmMnOiAyMDYsXG4gICAgJ0lncmF2ZSc6IDIwNCxcbiAgICAnSXVtbCc6IDIwNyxcbiAgICAnTnRpbGRlJzogMjA5LFxuICAgICdPYWN1dGUnOiAyMTEsXG4gICAgJ09jaXJjJzogMjEyLFxuICAgICdPZ3JhdmUnOiAyMTAsXG4gICAgJ09zbGFzaCc6IDIxNixcbiAgICAnT3RpbGRlJzogMjEzLFxuICAgICdPdW1sJzogMjE0LFxuICAgICdUSE9STic6IDIyMixcbiAgICAnVWFjdXRlJzogMjE4LFxuICAgICdVY2lyYyc6IDIxOSxcbiAgICAnVWdyYXZlJzogMjE3LFxuICAgICdVdW1sJzogMjIwLFxuICAgICdZYWN1dGUnOiAyMjEsXG4gICAgJ2FhY3V0ZSc6IDIyNSxcbiAgICAnYWNpcmMnOiAyMjYsXG4gICAgJ2FlbGlnJzogMjMwLFxuICAgICdhZ3JhdmUnOiAyMjQsXG4gICAgJ2FyaW5nJzogMjI5LFxuICAgICdhdGlsZGUnOiAyMjcsXG4gICAgJ2F1bWwnOiAyMjgsXG4gICAgJ2NjZWRpbCc6IDIzMSxcbiAgICAnZWFjdXRlJzogMjMzLFxuICAgICdlY2lyYyc6IDIzNCxcbiAgICAnZWdyYXZlJzogMjMyLFxuICAgICdldGgnOiAyNDAsXG4gICAgJ2V1bWwnOiAyMzUsXG4gICAgJ2lhY3V0ZSc6IDIzNyxcbiAgICAnaWNpcmMnOiAyMzgsXG4gICAgJ2lncmF2ZSc6IDIzNixcbiAgICAnaXVtbCc6IDIzOSxcbiAgICAnbnRpbGRlJzogMjQxLFxuICAgICdvYWN1dGUnOiAyNDMsXG4gICAgJ29jaXJjJzogMjQ0LFxuICAgICdvZ3JhdmUnOiAyNDIsXG4gICAgJ29zbGFzaCc6IDI0OCxcbiAgICAnb3RpbGRlJzogMjQ1LFxuICAgICdvdW1sJzogMjQ2LFxuICAgICdzemxpZyc6IDIyMyxcbiAgICAndGhvcm4nOiAyNTQsXG4gICAgJ3VhY3V0ZSc6IDI1MCxcbiAgICAndWNpcmMnOiAyNTEsXG4gICAgJ3VncmF2ZSc6IDI0OSxcbiAgICAndXVtbCc6IDI1MixcbiAgICAneWFjdXRlJzogMjUzLFxuICAgICd5dW1sJzogMjU1LFxuICAgICdjb3B5JzogMTY5LFxuICAgICdyZWcnOiAxNzQsXG4gICAgJ25ic3AnOiAxNjAsXG4gICAgJ2lleGNsJzogMTYxLFxuICAgICdjZW50JzogMTYyLFxuICAgICdwb3VuZCc6IDE2MyxcbiAgICAnY3VycmVuJzogMTY0LFxuICAgICd5ZW4nOiAxNjUsXG4gICAgJ2JydmJhcic6IDE2NixcbiAgICAnc2VjdCc6IDE2NyxcbiAgICAndW1sJzogMTY4LFxuICAgICdvcmRmJzogMTcwLFxuICAgICdsYXF1byc6IDE3MSxcbiAgICAnbm90JzogMTcyLFxuICAgICdzaHknOiAxNzMsXG4gICAgJ21hY3InOiAxNzUsXG4gICAgJ2RlZyc6IDE3NixcbiAgICAncGx1c21uJzogMTc3LFxuICAgICdzdXAxJzogMTg1LFxuICAgICdzdXAyJzogMTc4LFxuICAgICdzdXAzJzogMTc5LFxuICAgICdhY3V0ZSc6IDE4MCxcbiAgICAnbWljcm8nOiAxODEsXG4gICAgJ3BhcmEnOiAxODIsXG4gICAgJ21pZGRvdCc6IDE4MyxcbiAgICAnY2VkaWwnOiAxODQsXG4gICAgJ29yZG0nOiAxODYsXG4gICAgJ3JhcXVvJzogMTg3LFxuICAgICdmcmFjMTQnOiAxODgsXG4gICAgJ2ZyYWMxMic6IDE4OSxcbiAgICAnZnJhYzM0JzogMTkwLFxuICAgICdpcXVlc3QnOiAxOTEsXG4gICAgJ3RpbWVzJzogMjE1LFxuICAgICdkaXZpZGUnOiAyNDcsXG4gICAgJ09FbGlnJzogMzM4LFxuICAgICdvZWxpZyc6IDMzOSxcbiAgICAnU2Nhcm9uJzogMzUyLFxuICAgICdzY2Fyb24nOiAzNTMsXG4gICAgJ1l1bWwnOiAzNzYsXG4gICAgJ2Zub2YnOiA0MDIsXG4gICAgJ2NpcmMnOiA3MTAsXG4gICAgJ3RpbGRlJzogNzMyLFxuICAgICdBbHBoYSc6IDkxMyxcbiAgICAnQmV0YSc6IDkxNCxcbiAgICAnR2FtbWEnOiA5MTUsXG4gICAgJ0RlbHRhJzogOTE2LFxuICAgICdFcHNpbG9uJzogOTE3LFxuICAgICdaZXRhJzogOTE4LFxuICAgICdFdGEnOiA5MTksXG4gICAgJ1RoZXRhJzogOTIwLFxuICAgICdJb3RhJzogOTIxLFxuICAgICdLYXBwYSc6IDkyMixcbiAgICAnTGFtYmRhJzogOTIzLFxuICAgICdNdSc6IDkyNCxcbiAgICAnTnUnOiA5MjUsXG4gICAgJ1hpJzogOTI2LFxuICAgICdPbWljcm9uJzogOTI3LFxuICAgICdQaSc6IDkyOCxcbiAgICAnUmhvJzogOTI5LFxuICAgICdTaWdtYSc6IDkzMSxcbiAgICAnVGF1JzogOTMyLFxuICAgICdVcHNpbG9uJzogOTMzLFxuICAgICdQaGknOiA5MzQsXG4gICAgJ0NoaSc6IDkzNSxcbiAgICAnUHNpJzogOTM2LFxuICAgICdPbWVnYSc6IDkzNyxcbiAgICAnYWxwaGEnOiA5NDUsXG4gICAgJ2JldGEnOiA5NDYsXG4gICAgJ2dhbW1hJzogOTQ3LFxuICAgICdkZWx0YSc6IDk0OCxcbiAgICAnZXBzaWxvbic6IDk0OSxcbiAgICAnemV0YSc6IDk1MCxcbiAgICAnZXRhJzogOTUxLFxuICAgICd0aGV0YSc6IDk1MixcbiAgICAnaW90YSc6IDk1MyxcbiAgICAna2FwcGEnOiA5NTQsXG4gICAgJ2xhbWJkYSc6IDk1NSxcbiAgICAnbXUnOiA5NTYsXG4gICAgJ251JzogOTU3LFxuICAgICd4aSc6IDk1OCxcbiAgICAnb21pY3Jvbic6IDk1OSxcbiAgICAncGknOiA5NjAsXG4gICAgJ3Jobyc6IDk2MSxcbiAgICAnc2lnbWFmJzogOTYyLFxuICAgICdzaWdtYSc6IDk2MyxcbiAgICAndGF1JzogOTY0LFxuICAgICd1cHNpbG9uJzogOTY1LFxuICAgICdwaGknOiA5NjYsXG4gICAgJ2NoaSc6IDk2NyxcbiAgICAncHNpJzogOTY4LFxuICAgICdvbWVnYSc6IDk2OSxcbiAgICAndGhldGFzeW0nOiA5NzcsXG4gICAgJ3Vwc2loJzogOTc4LFxuICAgICdwaXYnOiA5ODIsXG4gICAgJ2Vuc3AnOiA4MTk0LFxuICAgICdlbXNwJzogODE5NSxcbiAgICAndGhpbnNwJzogODIwMSxcbiAgICAnenduaic6IDgyMDQsXG4gICAgJ3p3aic6IDgyMDUsXG4gICAgJ2xybSc6IDgyMDYsXG4gICAgJ3JsbSc6IDgyMDcsXG4gICAgJ25kYXNoJzogODIxMSxcbiAgICAnbWRhc2gnOiA4MjEyLFxuICAgICdsc3F1byc6IDgyMTYsXG4gICAgJ3JzcXVvJzogODIxNyxcbiAgICAnc2JxdW8nOiA4MjE4LFxuICAgICdsZHF1byc6IDgyMjAsXG4gICAgJ3JkcXVvJzogODIyMSxcbiAgICAnYmRxdW8nOiA4MjIyLFxuICAgICdkYWdnZXInOiA4MjI0LFxuICAgICdEYWdnZXInOiA4MjI1LFxuICAgICdidWxsJzogODIyNixcbiAgICAnaGVsbGlwJzogODIzMCxcbiAgICAncGVybWlsJzogODI0MCxcbiAgICAncHJpbWUnOiA4MjQyLFxuICAgICdQcmltZSc6IDgyNDMsXG4gICAgJ2xzYXF1byc6IDgyNDksXG4gICAgJ3JzYXF1byc6IDgyNTAsXG4gICAgJ29saW5lJzogODI1NCxcbiAgICAnZnJhc2wnOiA4MjYwLFxuICAgICdldXJvJzogODM2NCxcbiAgICAnaW1hZ2UnOiA4NDY1LFxuICAgICd3ZWllcnAnOiA4NDcyLFxuICAgICdyZWFsJzogODQ3NixcbiAgICAndHJhZGUnOiA4NDgyLFxuICAgICdhbGVmc3ltJzogODUwMSxcbiAgICAnbGFycic6IDg1OTIsXG4gICAgJ3VhcnInOiA4NTkzLFxuICAgICdyYXJyJzogODU5NCxcbiAgICAnZGFycic6IDg1OTUsXG4gICAgJ2hhcnInOiA4NTk2LFxuICAgICdjcmFycic6IDg2MjksXG4gICAgJ2xBcnInOiA4NjU2LFxuICAgICd1QXJyJzogODY1NyxcbiAgICAnckFycic6IDg2NTgsXG4gICAgJ2RBcnInOiA4NjU5LFxuICAgICdoQXJyJzogODY2MCxcbiAgICAnZm9yYWxsJzogODcwNCxcbiAgICAncGFydCc6IDg3MDYsXG4gICAgJ2V4aXN0JzogODcwNyxcbiAgICAnZW1wdHknOiA4NzA5LFxuICAgICduYWJsYSc6IDg3MTEsXG4gICAgJ2lzaW4nOiA4NzEyLFxuICAgICdub3Rpbic6IDg3MTMsXG4gICAgJ25pJzogODcxNSxcbiAgICAncHJvZCc6IDg3MTksXG4gICAgJ3N1bSc6IDg3MjEsXG4gICAgJ21pbnVzJzogODcyMixcbiAgICAnbG93YXN0JzogODcyNyxcbiAgICAncmFkaWMnOiA4NzMwLFxuICAgICdwcm9wJzogODczMyxcbiAgICAnaW5maW4nOiA4NzM0LFxuICAgICdhbmcnOiA4NzM2LFxuICAgICdhbmQnOiA4NzQzLFxuICAgICdvcic6IDg3NDQsXG4gICAgJ2NhcCc6IDg3NDUsXG4gICAgJ2N1cCc6IDg3NDYsXG4gICAgJ2ludCc6IDg3NDcsXG4gICAgJ3RoZXJlNCc6IDg3NTYsXG4gICAgJ3NpbSc6IDg3NjQsXG4gICAgJ2NvbmcnOiA4NzczLFxuICAgICdhc3ltcCc6IDg3NzYsXG4gICAgJ25lJzogODgwMCxcbiAgICAnZXF1aXYnOiA4ODAxLFxuICAgICdsZSc6IDg4MDQsXG4gICAgJ2dlJzogODgwNSxcbiAgICAnc3ViJzogODgzNCxcbiAgICAnc3VwJzogODgzNSxcbiAgICAnbnN1Yic6IDg4MzYsXG4gICAgJ3N1YmUnOiA4ODM4LFxuICAgICdzdXBlJzogODgzOSxcbiAgICAnb3BsdXMnOiA4ODUzLFxuICAgICdvdGltZXMnOiA4ODU1LFxuICAgICdwZXJwJzogODg2OSxcbiAgICAnc2RvdCc6IDg5MDEsXG4gICAgJ2xjZWlsJzogODk2OCxcbiAgICAncmNlaWwnOiA4OTY5LFxuICAgICdsZmxvb3InOiA4OTcwLFxuICAgICdyZmxvb3InOiA4OTcxLFxuICAgICdsYW5nJzogOTAwMSxcbiAgICAncmFuZyc6IDkwMDIsXG4gICAgJ2xveic6IDk2NzQsXG4gICAgJ3NwYWRlcyc6IDk4MjQsXG4gICAgJ2NsdWJzJzogOTgyNyxcbiAgICAnaGVhcnRzJzogOTgyOSxcbiAgICAnZGlhbXMnOiA5ODMwXG4gIH1cblxuICBPYmplY3Qua2V5cyhzYXguRU5USVRJRVMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBlID0gc2F4LkVOVElUSUVTW2tleV1cbiAgICB2YXIgcyA9IHR5cGVvZiBlID09PSAnbnVtYmVyJyA/IFN0cmluZy5mcm9tQ2hhckNvZGUoZSkgOiBlXG4gICAgc2F4LkVOVElUSUVTW2tleV0gPSBzXG4gIH0pXG5cbiAgZm9yICh2YXIgcyBpbiBzYXguU1RBVEUpIHtcbiAgICBzYXguU1RBVEVbc2F4LlNUQVRFW3NdXSA9IHNcbiAgfVxuXG4gIC8vIHNob3J0aGFuZFxuICBTID0gc2F4LlNUQVRFXG5cbiAgZnVuY3Rpb24gZW1pdCAocGFyc2VyLCBldmVudCwgZGF0YSkge1xuICAgIHBhcnNlcltldmVudF0gJiYgcGFyc2VyW2V2ZW50XShkYXRhKVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdE5vZGUgKHBhcnNlciwgbm9kZVR5cGUsIGRhdGEpIHtcbiAgICBpZiAocGFyc2VyLnRleHROb2RlKSBjbG9zZVRleHQocGFyc2VyKVxuICAgIGVtaXQocGFyc2VyLCBub2RlVHlwZSwgZGF0YSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlVGV4dCAocGFyc2VyKSB7XG4gICAgcGFyc2VyLnRleHROb2RlID0gdGV4dG9wdHMocGFyc2VyLm9wdCwgcGFyc2VyLnRleHROb2RlKVxuICAgIGlmIChwYXJzZXIudGV4dE5vZGUpIGVtaXQocGFyc2VyLCAnb250ZXh0JywgcGFyc2VyLnRleHROb2RlKVxuICAgIHBhcnNlci50ZXh0Tm9kZSA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0b3B0cyAob3B0LCB0ZXh0KSB7XG4gICAgaWYgKG9wdC50cmltKSB0ZXh0ID0gdGV4dC50cmltKClcbiAgICBpZiAob3B0Lm5vcm1hbGl6ZSkgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgcmV0dXJuIHRleHRcbiAgfVxuXG4gIGZ1bmN0aW9uIGVycm9yIChwYXJzZXIsIGVyKSB7XG4gICAgY2xvc2VUZXh0KHBhcnNlcilcbiAgICBpZiAocGFyc2VyLnRyYWNrUG9zaXRpb24pIHtcbiAgICAgIGVyICs9ICdcXG5MaW5lOiAnICsgcGFyc2VyLmxpbmUgK1xuICAgICAgICAnXFxuQ29sdW1uOiAnICsgcGFyc2VyLmNvbHVtbiArXG4gICAgICAgICdcXG5DaGFyOiAnICsgcGFyc2VyLmNcbiAgICB9XG4gICAgZXIgPSBuZXcgRXJyb3IoZXIpXG4gICAgcGFyc2VyLmVycm9yID0gZXJcbiAgICBlbWl0KHBhcnNlciwgJ29uZXJyb3InLCBlcilcbiAgICByZXR1cm4gcGFyc2VyXG4gIH1cblxuICBmdW5jdGlvbiBlbmQgKHBhcnNlcikge1xuICAgIGlmIChwYXJzZXIuc2F3Um9vdCAmJiAhcGFyc2VyLmNsb3NlZFJvb3QpIHN0cmljdEZhaWwocGFyc2VyLCAnVW5jbG9zZWQgcm9vdCB0YWcnKVxuICAgIGlmICgocGFyc2VyLnN0YXRlICE9PSBTLkJFR0lOKSAmJlxuICAgICAgKHBhcnNlci5zdGF0ZSAhPT0gUy5CRUdJTl9XSElURVNQQUNFKSAmJlxuICAgICAgKHBhcnNlci5zdGF0ZSAhPT0gUy5URVhUKSkge1xuICAgICAgZXJyb3IocGFyc2VyLCAnVW5leHBlY3RlZCBlbmQnKVxuICAgIH1cbiAgICBjbG9zZVRleHQocGFyc2VyKVxuICAgIHBhcnNlci5jID0gJydcbiAgICBwYXJzZXIuY2xvc2VkID0gdHJ1ZVxuICAgIGVtaXQocGFyc2VyLCAnb25lbmQnKVxuICAgIFNBWFBhcnNlci5jYWxsKHBhcnNlciwgcGFyc2VyLnN0cmljdCwgcGFyc2VyLm9wdClcbiAgICByZXR1cm4gcGFyc2VyXG4gIH1cblxuICBmdW5jdGlvbiBzdHJpY3RGYWlsIChwYXJzZXIsIG1lc3NhZ2UpIHtcbiAgICBpZiAodHlwZW9mIHBhcnNlciAhPT0gJ29iamVjdCcgfHwgIShwYXJzZXIgaW5zdGFuY2VvZiBTQVhQYXJzZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBjYWxsIHRvIHN0cmljdEZhaWwnKVxuICAgIH1cbiAgICBpZiAocGFyc2VyLnN0cmljdCkge1xuICAgICAgZXJyb3IocGFyc2VyLCBtZXNzYWdlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld1RhZyAocGFyc2VyKSB7XG4gICAgaWYgKCFwYXJzZXIuc3RyaWN0KSBwYXJzZXIudGFnTmFtZSA9IHBhcnNlci50YWdOYW1lW3BhcnNlci5sb29zZUNhc2VdKClcbiAgICB2YXIgcGFyZW50ID0gcGFyc2VyLnRhZ3NbcGFyc2VyLnRhZ3MubGVuZ3RoIC0gMV0gfHwgcGFyc2VyXG4gICAgdmFyIHRhZyA9IHBhcnNlci50YWcgPSB7IG5hbWU6IHBhcnNlci50YWdOYW1lLCBhdHRyaWJ1dGVzOiB7fSB9XG5cbiAgICAvLyB3aWxsIGJlIG92ZXJyaWRkZW4gaWYgdGFnIGNvbnRhaWxzIGFuIHhtbG5zPVwiZm9vXCIgb3IgeG1sbnM6Zm9vPVwiYmFyXCJcbiAgICBpZiAocGFyc2VyLm9wdC54bWxucykge1xuICAgICAgdGFnLm5zID0gcGFyZW50Lm5zXG4gICAgfVxuICAgIHBhcnNlci5hdHRyaWJMaXN0Lmxlbmd0aCA9IDBcbiAgICBlbWl0Tm9kZShwYXJzZXIsICdvbm9wZW50YWdzdGFydCcsIHRhZylcbiAgfVxuXG4gIGZ1bmN0aW9uIHFuYW1lIChuYW1lLCBhdHRyaWJ1dGUpIHtcbiAgICB2YXIgaSA9IG5hbWUuaW5kZXhPZignOicpXG4gICAgdmFyIHF1YWxOYW1lID0gaSA8IDAgPyBbICcnLCBuYW1lIF0gOiBuYW1lLnNwbGl0KCc6JylcbiAgICB2YXIgcHJlZml4ID0gcXVhbE5hbWVbMF1cbiAgICB2YXIgbG9jYWwgPSBxdWFsTmFtZVsxXVxuXG4gICAgLy8gPHggXCJ4bWxuc1wiPVwiaHR0cDovL2Zvb1wiPlxuICAgIGlmIChhdHRyaWJ1dGUgJiYgbmFtZSA9PT0gJ3htbG5zJykge1xuICAgICAgcHJlZml4ID0gJ3htbG5zJ1xuICAgICAgbG9jYWwgPSAnJ1xuICAgIH1cblxuICAgIHJldHVybiB7IHByZWZpeDogcHJlZml4LCBsb2NhbDogbG9jYWwgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXR0cmliIChwYXJzZXIpIHtcbiAgICBpZiAoIXBhcnNlci5zdHJpY3QpIHtcbiAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gcGFyc2VyLmF0dHJpYk5hbWVbcGFyc2VyLmxvb3NlQ2FzZV0oKVxuICAgIH1cblxuICAgIGlmIChwYXJzZXIuYXR0cmliTGlzdC5pbmRleE9mKHBhcnNlci5hdHRyaWJOYW1lKSAhPT0gLTEgfHxcbiAgICAgIHBhcnNlci50YWcuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShwYXJzZXIuYXR0cmliTmFtZSkpIHtcbiAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChwYXJzZXIub3B0LnhtbG5zKSB7XG4gICAgICB2YXIgcW4gPSBxbmFtZShwYXJzZXIuYXR0cmliTmFtZSwgdHJ1ZSlcbiAgICAgIHZhciBwcmVmaXggPSBxbi5wcmVmaXhcbiAgICAgIHZhciBsb2NhbCA9IHFuLmxvY2FsXG5cbiAgICAgIGlmIChwcmVmaXggPT09ICd4bWxucycpIHtcbiAgICAgICAgLy8gbmFtZXNwYWNlIGJpbmRpbmcgYXR0cmlidXRlLiBwdXNoIHRoZSBiaW5kaW5nIGludG8gc2NvcGVcbiAgICAgICAgaWYgKGxvY2FsID09PSAneG1sJyAmJiBwYXJzZXIuYXR0cmliVmFsdWUgIT09IFhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlcixcbiAgICAgICAgICAgICd4bWw6IHByZWZpeCBtdXN0IGJlIGJvdW5kIHRvICcgKyBYTUxfTkFNRVNQQUNFICsgJ1xcbicgK1xuICAgICAgICAgICAgJ0FjdHVhbDogJyArIHBhcnNlci5hdHRyaWJWYWx1ZSlcbiAgICAgICAgfSBlbHNlIGlmIChsb2NhbCA9PT0gJ3htbG5zJyAmJiBwYXJzZXIuYXR0cmliVmFsdWUgIT09IFhNTE5TX05BTUVTUEFDRSkge1xuICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLFxuICAgICAgICAgICAgJ3htbG5zOiBwcmVmaXggbXVzdCBiZSBib3VuZCB0byAnICsgWE1MTlNfTkFNRVNQQUNFICsgJ1xcbicgK1xuICAgICAgICAgICAgJ0FjdHVhbDogJyArIHBhcnNlci5hdHRyaWJWYWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdGFnID0gcGFyc2VyLnRhZ1xuICAgICAgICAgIHZhciBwYXJlbnQgPSBwYXJzZXIudGFnc1twYXJzZXIudGFncy5sZW5ndGggLSAxXSB8fCBwYXJzZXJcbiAgICAgICAgICBpZiAodGFnLm5zID09PSBwYXJlbnQubnMpIHtcbiAgICAgICAgICAgIHRhZy5ucyA9IE9iamVjdC5jcmVhdGUocGFyZW50Lm5zKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0YWcubnNbbG9jYWxdID0gcGFyc2VyLmF0dHJpYlZhbHVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gZGVmZXIgb25hdHRyaWJ1dGUgZXZlbnRzIHVudGlsIGFsbCBhdHRyaWJ1dGVzIGhhdmUgYmVlbiBzZWVuXG4gICAgICAvLyBzbyBhbnkgbmV3IGJpbmRpbmdzIGNhbiB0YWtlIGVmZmVjdC4gcHJlc2VydmUgYXR0cmlidXRlIG9yZGVyXG4gICAgICAvLyBzbyBkZWZlcnJlZCBldmVudHMgY2FuIGJlIGVtaXR0ZWQgaW4gZG9jdW1lbnQgb3JkZXJcbiAgICAgIHBhcnNlci5hdHRyaWJMaXN0LnB1c2goW3BhcnNlci5hdHRyaWJOYW1lLCBwYXJzZXIuYXR0cmliVmFsdWVdKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbiBub24teG1sbnMgbW9kZSwgd2UgY2FuIGVtaXQgdGhlIGV2ZW50IHJpZ2h0IGF3YXlcbiAgICAgIHBhcnNlci50YWcuYXR0cmlidXRlc1twYXJzZXIuYXR0cmliTmFtZV0gPSBwYXJzZXIuYXR0cmliVmFsdWVcbiAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uYXR0cmlidXRlJywge1xuICAgICAgICBuYW1lOiBwYXJzZXIuYXR0cmliTmFtZSxcbiAgICAgICAgdmFsdWU6IHBhcnNlci5hdHRyaWJWYWx1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBwYXJzZXIuYXR0cmliTmFtZSA9IHBhcnNlci5hdHRyaWJWYWx1ZSA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBvcGVuVGFnIChwYXJzZXIsIHNlbGZDbG9zaW5nKSB7XG4gICAgaWYgKHBhcnNlci5vcHQueG1sbnMpIHtcbiAgICAgIC8vIGVtaXQgbmFtZXNwYWNlIGJpbmRpbmcgZXZlbnRzXG4gICAgICB2YXIgdGFnID0gcGFyc2VyLnRhZ1xuXG4gICAgICAvLyBhZGQgbmFtZXNwYWNlIGluZm8gdG8gdGFnXG4gICAgICB2YXIgcW4gPSBxbmFtZShwYXJzZXIudGFnTmFtZSlcbiAgICAgIHRhZy5wcmVmaXggPSBxbi5wcmVmaXhcbiAgICAgIHRhZy5sb2NhbCA9IHFuLmxvY2FsXG4gICAgICB0YWcudXJpID0gdGFnLm5zW3FuLnByZWZpeF0gfHwgJydcblxuICAgICAgaWYgKHRhZy5wcmVmaXggJiYgIXRhZy51cmkpIHtcbiAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdVbmJvdW5kIG5hbWVzcGFjZSBwcmVmaXg6ICcgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHBhcnNlci50YWdOYW1lKSlcbiAgICAgICAgdGFnLnVyaSA9IHFuLnByZWZpeFxuICAgICAgfVxuXG4gICAgICB2YXIgcGFyZW50ID0gcGFyc2VyLnRhZ3NbcGFyc2VyLnRhZ3MubGVuZ3RoIC0gMV0gfHwgcGFyc2VyXG4gICAgICBpZiAodGFnLm5zICYmIHBhcmVudC5ucyAhPT0gdGFnLm5zKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRhZy5ucykuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29ub3Blbm5hbWVzcGFjZScsIHtcbiAgICAgICAgICAgIHByZWZpeDogcCxcbiAgICAgICAgICAgIHVyaTogdGFnLm5zW3BdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIGRlZmVycmVkIG9uYXR0cmlidXRlIGV2ZW50c1xuICAgICAgLy8gTm90ZTogZG8gbm90IGFwcGx5IGRlZmF1bHQgbnMgdG8gYXR0cmlidXRlczpcbiAgICAgIC8vICAgaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC1uYW1lcy8jZGVmYXVsdGluZ1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXJzZXIuYXR0cmliTGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIG52ID0gcGFyc2VyLmF0dHJpYkxpc3RbaV1cbiAgICAgICAgdmFyIG5hbWUgPSBudlswXVxuICAgICAgICB2YXIgdmFsdWUgPSBudlsxXVxuICAgICAgICB2YXIgcXVhbE5hbWUgPSBxbmFtZShuYW1lLCB0cnVlKVxuICAgICAgICB2YXIgcHJlZml4ID0gcXVhbE5hbWUucHJlZml4XG4gICAgICAgIHZhciBsb2NhbCA9IHF1YWxOYW1lLmxvY2FsXG4gICAgICAgIHZhciB1cmkgPSBwcmVmaXggPT09ICcnID8gJycgOiAodGFnLm5zW3ByZWZpeF0gfHwgJycpXG4gICAgICAgIHZhciBhID0ge1xuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgIGxvY2FsOiBsb2NhbCxcbiAgICAgICAgICB1cmk6IHVyaVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUncyBhbnkgYXR0cmlidXRlcyB3aXRoIGFuIHVuZGVmaW5lZCBuYW1lc3BhY2UsXG4gICAgICAgIC8vIHRoZW4gZmFpbCBvbiB0aGVtIG5vdy5cbiAgICAgICAgaWYgKHByZWZpeCAmJiBwcmVmaXggIT09ICd4bWxucycgJiYgIXVyaSkge1xuICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnVW5ib3VuZCBuYW1lc3BhY2UgcHJlZml4OiAnICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHByZWZpeCkpXG4gICAgICAgICAgYS51cmkgPSBwcmVmaXhcbiAgICAgICAgfVxuICAgICAgICBwYXJzZXIudGFnLmF0dHJpYnV0ZXNbbmFtZV0gPSBhXG4gICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uYXR0cmlidXRlJywgYSlcbiAgICAgIH1cbiAgICAgIHBhcnNlci5hdHRyaWJMaXN0Lmxlbmd0aCA9IDBcbiAgICB9XG5cbiAgICBwYXJzZXIudGFnLmlzU2VsZkNsb3NpbmcgPSAhIXNlbGZDbG9zaW5nXG5cbiAgICAvLyBwcm9jZXNzIHRoZSB0YWdcbiAgICBwYXJzZXIuc2F3Um9vdCA9IHRydWVcbiAgICBwYXJzZXIudGFncy5wdXNoKHBhcnNlci50YWcpXG4gICAgZW1pdE5vZGUocGFyc2VyLCAnb25vcGVudGFnJywgcGFyc2VyLnRhZylcbiAgICBpZiAoIXNlbGZDbG9zaW5nKSB7XG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDxzY3JpcHQ+IGluIG5vbi1zdHJpY3QgbW9kZS5cbiAgICAgIGlmICghcGFyc2VyLm5vc2NyaXB0ICYmIHBhcnNlci50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzY3JpcHQnKSB7XG4gICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0NSSVBUXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlRFWFRcbiAgICAgIH1cbiAgICAgIHBhcnNlci50YWcgPSBudWxsXG4gICAgICBwYXJzZXIudGFnTmFtZSA9ICcnXG4gICAgfVxuICAgIHBhcnNlci5hdHRyaWJOYW1lID0gcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICBwYXJzZXIuYXR0cmliTGlzdC5sZW5ndGggPSAwXG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVRhZyAocGFyc2VyKSB7XG4gICAgaWYgKCFwYXJzZXIudGFnTmFtZSkge1xuICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdXZWlyZCBlbXB0eSBjbG9zZSB0YWcuJylcbiAgICAgIHBhcnNlci50ZXh0Tm9kZSArPSAnPC8+J1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocGFyc2VyLnNjcmlwdCkge1xuICAgICAgaWYgKHBhcnNlci50YWdOYW1lICE9PSAnc2NyaXB0Jykge1xuICAgICAgICBwYXJzZXIuc2NyaXB0ICs9ICc8LycgKyBwYXJzZXIudGFnTmFtZSArICc+J1xuICAgICAgICBwYXJzZXIudGFnTmFtZSA9ICcnXG4gICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0NSSVBUXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25zY3JpcHQnLCBwYXJzZXIuc2NyaXB0KVxuICAgICAgcGFyc2VyLnNjcmlwdCA9ICcnXG4gICAgfVxuXG4gICAgLy8gZmlyc3QgbWFrZSBzdXJlIHRoYXQgdGhlIGNsb3NpbmcgdGFnIGFjdHVhbGx5IGV4aXN0cy5cbiAgICAvLyA8YT48Yj48L2M+PC9iPjwvYT4gd2lsbCBjbG9zZSBldmVyeXRoaW5nLCBvdGhlcndpc2UuXG4gICAgdmFyIHQgPSBwYXJzZXIudGFncy5sZW5ndGhcbiAgICB2YXIgdGFnTmFtZSA9IHBhcnNlci50YWdOYW1lXG4gICAgaWYgKCFwYXJzZXIuc3RyaWN0KSB7XG4gICAgICB0YWdOYW1lID0gdGFnTmFtZVtwYXJzZXIubG9vc2VDYXNlXSgpXG4gICAgfVxuICAgIHZhciBjbG9zZVRvID0gdGFnTmFtZVxuICAgIHdoaWxlICh0LS0pIHtcbiAgICAgIHZhciBjbG9zZSA9IHBhcnNlci50YWdzW3RdXG4gICAgICBpZiAoY2xvc2UubmFtZSAhPT0gY2xvc2VUbykge1xuICAgICAgICAvLyBmYWlsIHRoZSBmaXJzdCB0aW1lIGluIHN0cmljdCBtb2RlXG4gICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnVW5leHBlY3RlZCBjbG9zZSB0YWcnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkaWRuJ3QgZmluZCBpdC4gIHdlIGFscmVhZHkgZmFpbGVkIGZvciBzdHJpY3QsIHNvIGp1c3QgYWJvcnQuXG4gICAgaWYgKHQgPCAwKSB7XG4gICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1VubWF0Y2hlZCBjbG9zaW5nIHRhZzogJyArIHBhcnNlci50YWdOYW1lKVxuICAgICAgcGFyc2VyLnRleHROb2RlICs9ICc8LycgKyBwYXJzZXIudGFnTmFtZSArICc+J1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcGFyc2VyLnRhZ05hbWUgPSB0YWdOYW1lXG4gICAgdmFyIHMgPSBwYXJzZXIudGFncy5sZW5ndGhcbiAgICB3aGlsZSAocy0tID4gdCkge1xuICAgICAgdmFyIHRhZyA9IHBhcnNlci50YWcgPSBwYXJzZXIudGFncy5wb3AoKVxuICAgICAgcGFyc2VyLnRhZ05hbWUgPSBwYXJzZXIudGFnLm5hbWVcbiAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2xvc2V0YWcnLCBwYXJzZXIudGFnTmFtZSlcblxuICAgICAgdmFyIHggPSB7fVxuICAgICAgZm9yICh2YXIgaSBpbiB0YWcubnMpIHtcbiAgICAgICAgeFtpXSA9IHRhZy5uc1tpXVxuICAgICAgfVxuXG4gICAgICB2YXIgcGFyZW50ID0gcGFyc2VyLnRhZ3NbcGFyc2VyLnRhZ3MubGVuZ3RoIC0gMV0gfHwgcGFyc2VyXG4gICAgICBpZiAocGFyc2VyLm9wdC54bWxucyAmJiB0YWcubnMgIT09IHBhcmVudC5ucykge1xuICAgICAgICAvLyByZW1vdmUgbmFtZXNwYWNlIGJpbmRpbmdzIGludHJvZHVjZWQgYnkgdGFnXG4gICAgICAgIE9iamVjdC5rZXlzKHRhZy5ucykuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgIHZhciBuID0gdGFnLm5zW3BdXG4gICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jbG9zZW5hbWVzcGFjZScsIHsgcHJlZml4OiBwLCB1cmk6IG4gfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHQgPT09IDApIHBhcnNlci5jbG9zZWRSb290ID0gdHJ1ZVxuICAgIHBhcnNlci50YWdOYW1lID0gcGFyc2VyLmF0dHJpYlZhbHVlID0gcGFyc2VyLmF0dHJpYk5hbWUgPSAnJ1xuICAgIHBhcnNlci5hdHRyaWJMaXN0Lmxlbmd0aCA9IDBcbiAgICBwYXJzZXIuc3RhdGUgPSBTLlRFWFRcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRW50aXR5IChwYXJzZXIpIHtcbiAgICB2YXIgZW50aXR5ID0gcGFyc2VyLmVudGl0eVxuICAgIHZhciBlbnRpdHlMQyA9IGVudGl0eS50b0xvd2VyQ2FzZSgpXG4gICAgdmFyIG51bVxuICAgIHZhciBudW1TdHIgPSAnJ1xuXG4gICAgaWYgKHBhcnNlci5FTlRJVElFU1tlbnRpdHldKSB7XG4gICAgICByZXR1cm4gcGFyc2VyLkVOVElUSUVTW2VudGl0eV1cbiAgICB9XG4gICAgaWYgKHBhcnNlci5FTlRJVElFU1tlbnRpdHlMQ10pIHtcbiAgICAgIHJldHVybiBwYXJzZXIuRU5USVRJRVNbZW50aXR5TENdXG4gICAgfVxuICAgIGVudGl0eSA9IGVudGl0eUxDXG4gICAgaWYgKGVudGl0eS5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgaWYgKGVudGl0eS5jaGFyQXQoMSkgPT09ICd4Jykge1xuICAgICAgICBlbnRpdHkgPSBlbnRpdHkuc2xpY2UoMilcbiAgICAgICAgbnVtID0gcGFyc2VJbnQoZW50aXR5LCAxNilcbiAgICAgICAgbnVtU3RyID0gbnVtLnRvU3RyaW5nKDE2KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW50aXR5ID0gZW50aXR5LnNsaWNlKDEpXG4gICAgICAgIG51bSA9IHBhcnNlSW50KGVudGl0eSwgMTApXG4gICAgICAgIG51bVN0ciA9IG51bS50b1N0cmluZygxMClcbiAgICAgIH1cbiAgICB9XG4gICAgZW50aXR5ID0gZW50aXR5LnJlcGxhY2UoL14wKy8sICcnKVxuICAgIGlmIChpc05hTihudW0pIHx8IG51bVN0ci50b0xvd2VyQ2FzZSgpICE9PSBlbnRpdHkpIHtcbiAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXIgZW50aXR5JylcbiAgICAgIHJldHVybiAnJicgKyBwYXJzZXIuZW50aXR5ICsgJzsnXG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50KG51bSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlZ2luV2hpdGVTcGFjZSAocGFyc2VyLCBjKSB7XG4gICAgaWYgKGMgPT09ICc8Jykge1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5PUEVOX1dBS0FcbiAgICAgIHBhcnNlci5zdGFydFRhZ1Bvc2l0aW9uID0gcGFyc2VyLnBvc2l0aW9uXG4gICAgfSBlbHNlIGlmICghaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAvLyBoYXZlIHRvIHByb2Nlc3MgdGhpcyBhcyBhIHRleHQgbm9kZS5cbiAgICAgIC8vIHdlaXJkLCBidXQgaGFwcGVucy5cbiAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnTm9uLXdoaXRlc3BhY2UgYmVmb3JlIGZpcnN0IHRhZy4nKVxuICAgICAgcGFyc2VyLnRleHROb2RlID0gY1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hhckF0IChjaHVuaywgaSkge1xuICAgIHZhciByZXN1bHQgPSAnJ1xuICAgIGlmIChpIDwgY2h1bmsubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSBjaHVuay5jaGFyQXQoaSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKGNodW5rKSB7XG4gICAgdmFyIHBhcnNlciA9IHRoaXNcbiAgICBpZiAodGhpcy5lcnJvcikge1xuICAgICAgdGhyb3cgdGhpcy5lcnJvclxuICAgIH1cbiAgICBpZiAocGFyc2VyLmNsb3NlZCkge1xuICAgICAgcmV0dXJuIGVycm9yKHBhcnNlcixcbiAgICAgICAgJ0Nhbm5vdCB3cml0ZSBhZnRlciBjbG9zZS4gQXNzaWduIGFuIG9ucmVhZHkgaGFuZGxlci4nKVxuICAgIH1cbiAgICBpZiAoY2h1bmsgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbmQocGFyc2VyKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGNodW5rID09PSAnb2JqZWN0Jykge1xuICAgICAgY2h1bmsgPSBjaHVuay50b1N0cmluZygpXG4gICAgfVxuICAgIHZhciBpID0gMFxuICAgIHZhciBjID0gJydcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgYyA9IGNoYXJBdChjaHVuaywgaSsrKVxuICAgICAgcGFyc2VyLmMgPSBjXG5cbiAgICAgIGlmICghYykge1xuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyc2VyLnRyYWNrUG9zaXRpb24pIHtcbiAgICAgICAgcGFyc2VyLnBvc2l0aW9uKytcbiAgICAgICAgaWYgKGMgPT09ICdcXG4nKSB7XG4gICAgICAgICAgcGFyc2VyLmxpbmUrK1xuICAgICAgICAgIHBhcnNlci5jb2x1bW4gPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VyLmNvbHVtbisrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChwYXJzZXIuc3RhdGUpIHtcbiAgICAgICAgY2FzZSBTLkJFR0lOOlxuICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQkVHSU5fV0hJVEVTUEFDRVxuICAgICAgICAgIGlmIChjID09PSAnXFx1RkVGRicpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJlZ2luV2hpdGVTcGFjZShwYXJzZXIsIGMpXG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQkVHSU5fV0hJVEVTUEFDRTpcbiAgICAgICAgICBiZWdpbldoaXRlU3BhY2UocGFyc2VyLCBjKVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlRFWFQ6XG4gICAgICAgICAgaWYgKHBhcnNlci5zYXdSb290ICYmICFwYXJzZXIuY2xvc2VkUm9vdCkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0aSA9IGkgLSAxXG4gICAgICAgICAgICB3aGlsZSAoYyAmJiBjICE9PSAnPCcgJiYgYyAhPT0gJyYnKSB7XG4gICAgICAgICAgICAgIGMgPSBjaGFyQXQoY2h1bmssIGkrKylcbiAgICAgICAgICAgICAgaWYgKGMgJiYgcGFyc2VyLnRyYWNrUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIucG9zaXRpb24rK1xuICAgICAgICAgICAgICAgIGlmIChjID09PSAnXFxuJykge1xuICAgICAgICAgICAgICAgICAgcGFyc2VyLmxpbmUrK1xuICAgICAgICAgICAgICAgICAgcGFyc2VyLmNvbHVtbiA9IDBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGFyc2VyLmNvbHVtbisrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIudGV4dE5vZGUgKz0gY2h1bmsuc3Vic3RyaW5nKHN0YXJ0aSwgaSAtIDEpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjID09PSAnPCcgJiYgIShwYXJzZXIuc2F3Um9vdCAmJiBwYXJzZXIuY2xvc2VkUm9vdCAmJiAhcGFyc2VyLnN0cmljdCkpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuT1BFTl9XQUtBXG4gICAgICAgICAgICBwYXJzZXIuc3RhcnRUYWdQb3NpdGlvbiA9IHBhcnNlci5wb3NpdGlvblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWlzV2hpdGVzcGFjZShjKSAmJiAoIXBhcnNlci5zYXdSb290IHx8IHBhcnNlci5jbG9zZWRSb290KSkge1xuICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1RleHQgZGF0YSBvdXRzaWRlIG9mIHJvb3Qgbm9kZS4nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPT09ICcmJykge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlRFWFRfRU5USVRZXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJzZXIudGV4dE5vZGUgKz0gY1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5TQ1JJUFQ6XG4gICAgICAgICAgLy8gb25seSBub24tc3RyaWN0XG4gICAgICAgICAgaWYgKGMgPT09ICc8Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TQ1JJUFRfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zY3JpcHQgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5TQ1JJUFRfRU5ESU5HOlxuICAgICAgICAgIGlmIChjID09PSAnLycpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ0xPU0VfVEFHXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zY3JpcHQgKz0gJzwnICsgY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TQ1JJUFRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuT1BFTl9XQUtBOlxuICAgICAgICAgIC8vIGVpdGhlciBhIC8sID8sICEsIG9yIHRleHQgaXMgY29taW5nIG5leHQuXG4gICAgICAgICAgaWYgKGMgPT09ICchJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TR01MX0RFQ0xcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCA9ICcnXG4gICAgICAgICAgfSBlbHNlIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIGl0Li4uXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuT1BFTl9UQUdcbiAgICAgICAgICAgIHBhcnNlci50YWdOYW1lID0gY1xuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJy8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNMT1NFX1RBR1xuICAgICAgICAgICAgcGFyc2VyLnRhZ05hbWUgPSAnJ1xuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJz8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlBST0NfSU5TVFxuICAgICAgICAgICAgcGFyc2VyLnByb2NJbnN0TmFtZSA9IHBhcnNlci5wcm9jSW5zdEJvZHkgPSAnJ1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1VuZW5jb2RlZCA8JylcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdhcyBzb21lIHdoaXRlc3BhY2UsIHRoZW4gYWRkIHRoYXQgaW4uXG4gICAgICAgICAgICBpZiAocGFyc2VyLnN0YXJ0VGFnUG9zaXRpb24gKyAxIDwgcGFyc2VyLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIHZhciBwYWQgPSBwYXJzZXIucG9zaXRpb24gLSBwYXJzZXIuc3RhcnRUYWdQb3NpdGlvblxuICAgICAgICAgICAgICBjID0gbmV3IEFycmF5KHBhZCkuam9pbignICcpICsgY1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLnRleHROb2RlICs9ICc8JyArIGNcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5TR01MX0RFQ0w6XG4gICAgICAgICAgaWYgKChwYXJzZXIuc2dtbERlY2wgKyBjKS50b1VwcGVyQ2FzZSgpID09PSBDREFUQSkge1xuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25vcGVuY2RhdGEnKVxuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DREFUQVxuICAgICAgICAgICAgcGFyc2VyLnNnbWxEZWNsID0gJydcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSA9ICcnXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuc2dtbERlY2wgKyBjID09PSAnLS0nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCA9ICcnXG4gICAgICAgICAgfSBlbHNlIGlmICgocGFyc2VyLnNnbWxEZWNsICsgYykudG9VcHBlckNhc2UoKSA9PT0gRE9DVFlQRSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFXG4gICAgICAgICAgICBpZiAocGFyc2VyLmRvY3R5cGUgfHwgcGFyc2VyLnNhd1Jvb3QpIHtcbiAgICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsXG4gICAgICAgICAgICAgICAgJ0luYXBwcm9wcmlhdGVseSBsb2NhdGVkIGRvY3R5cGUgZGVjbGFyYXRpb24nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLmRvY3R5cGUgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnNnbWxEZWNsID0gJydcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25zZ21sZGVjbGFyYXRpb24nLCBwYXJzZXIuc2dtbERlY2wpXG4gICAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfSBlbHNlIGlmIChpc1F1b3RlKGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNHTUxfREVDTF9RVU9URURcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCArPSBjXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCArPSBjXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlNHTUxfREVDTF9RVU9URUQ6XG4gICAgICAgICAgaWYgKGMgPT09IHBhcnNlci5xKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNHTUxfREVDTFxuICAgICAgICAgICAgcGFyc2VyLnEgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgKz0gY1xuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkRPQ1RZUEU6XG4gICAgICAgICAgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbmRvY3R5cGUnLCBwYXJzZXIuZG9jdHlwZSlcbiAgICAgICAgICAgIHBhcnNlci5kb2N0eXBlID0gdHJ1ZSAvLyBqdXN0IHJlbWVtYmVyIHRoYXQgd2Ugc2F3IGl0LlxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuZG9jdHlwZSArPSBjXG4gICAgICAgICAgICBpZiAoYyA9PT0gJ1snKSB7XG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuRE9DVFlQRV9EVERcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNRdW90ZShjKSkge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkRPQ1RZUEVfUVVPVEVEXG4gICAgICAgICAgICAgIHBhcnNlci5xID0gY1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5ET0NUWVBFX1FVT1RFRDpcbiAgICAgICAgICBwYXJzZXIuZG9jdHlwZSArPSBjXG4gICAgICAgICAgaWYgKGMgPT09IHBhcnNlci5xKSB7XG4gICAgICAgICAgICBwYXJzZXIucSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkRPQ1RZUEVcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuRE9DVFlQRV9EVEQ6XG4gICAgICAgICAgcGFyc2VyLmRvY3R5cGUgKz0gY1xuICAgICAgICAgIGlmIChjID09PSAnXScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuRE9DVFlQRVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNRdW90ZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFX0RURF9RVU9URURcbiAgICAgICAgICAgIHBhcnNlci5xID0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5ET0NUWVBFX0RURF9RVU9URUQ6XG4gICAgICAgICAgcGFyc2VyLmRvY3R5cGUgKz0gY1xuICAgICAgICAgIGlmIChjID09PSBwYXJzZXIucSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFX0RURFxuICAgICAgICAgICAgcGFyc2VyLnEgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DT01NRU5UOlxuICAgICAgICAgIGlmIChjID09PSAnLScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ09NTUVOVF9FTkRJTkdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLmNvbW1lbnQgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DT01NRU5UX0VORElORzpcbiAgICAgICAgICBpZiAoYyA9PT0gJy0nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRfRU5ERURcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ID0gdGV4dG9wdHMocGFyc2VyLm9wdCwgcGFyc2VyLmNvbW1lbnQpXG4gICAgICAgICAgICBpZiAocGFyc2VyLmNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jb21tZW50JywgcGFyc2VyLmNvbW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIuY29tbWVudCA9ICcnXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ICs9ICctJyArIGNcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ09NTUVOVFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DT01NRU5UX0VOREVEOlxuICAgICAgICAgIGlmIChjICE9PSAnPicpIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnTWFsZm9ybWVkIGNvbW1lbnQnKVxuICAgICAgICAgICAgLy8gYWxsb3cgPCEtLSBibGFoIC0tIGJsb28gLS0+IGluIG5vbi1zdHJpY3QgbW9kZSxcbiAgICAgICAgICAgIC8vIHdoaWNoIGlzIGEgY29tbWVudCBvZiBcIiBibGFoIC0tIGJsb28gXCJcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ICs9ICctLScgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNEQVRBOlxuICAgICAgICAgIGlmIChjID09PSAnXScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ0RBVEFfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSArPSBjXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNEQVRBX0VORElORzpcbiAgICAgICAgICBpZiAoYyA9PT0gJ10nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNEQVRBX0VORElOR18yXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSArPSAnXScgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNEQVRBXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNEQVRBX0VORElOR18yOlxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIGlmIChwYXJzZXIuY2RhdGEpIHtcbiAgICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jZGF0YScsIHBhcnNlci5jZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2xvc2VjZGF0YScpXG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnXScpIHtcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSArPSAnXSdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLmNkYXRhICs9ICddXScgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNEQVRBXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlBST0NfSU5TVDpcbiAgICAgICAgICBpZiAoYyA9PT0gJz8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlBST0NfSU5TVF9FTkRJTkdcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RfQk9EWVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIucHJvY0luc3ROYW1lICs9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuUFJPQ19JTlNUX0JPRFk6XG4gICAgICAgICAgaWYgKCFwYXJzZXIucHJvY0luc3RCb2R5ICYmIGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc/Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5wcm9jSW5zdEJvZHkgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5QUk9DX0lOU1RfRU5ESU5HOlxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29ucHJvY2Vzc2luZ2luc3RydWN0aW9uJywge1xuICAgICAgICAgICAgICBuYW1lOiBwYXJzZXIucHJvY0luc3ROYW1lLFxuICAgICAgICAgICAgICBib2R5OiBwYXJzZXIucHJvY0luc3RCb2R5XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcGFyc2VyLnByb2NJbnN0TmFtZSA9IHBhcnNlci5wcm9jSW5zdEJvZHkgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5wcm9jSW5zdEJvZHkgKz0gJz8nICsgY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RfQk9EWVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5PUEVOX1RBRzpcbiAgICAgICAgICBpZiAoaXNNYXRjaChuYW1lQm9keSwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci50YWdOYW1lICs9IGNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGFnKHBhcnNlcilcbiAgICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgICAgb3BlblRhZyhwYXJzZXIpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICcvJykge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fVEFHX1NMQVNIXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXIgaW4gdGFnIG5hbWUnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLk9QRU5fVEFHX1NMQVNIOlxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyLCB0cnVlKVxuICAgICAgICAgICAgY2xvc2VUYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ZvcndhcmQtc2xhc2ggaW4gb3BlbmluZyB0YWcgbm90IGZvbGxvd2VkIGJ5ID4nKVxuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCOlxuICAgICAgICAgIC8vIGhhdmVuJ3QgcmVhZCB0aGUgYXR0cmlidXRlIG5hbWUgeWV0LlxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJy8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fVEFHX1NMQVNIXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gY1xuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX05BTUVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lJylcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX05BTUU6XG4gICAgICAgICAgaWYgKGMgPT09ICc9Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdBdHRyaWJ1dGUgd2l0aG91dCB2YWx1ZScpXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgPSBwYXJzZXIuYXR0cmliTmFtZVxuICAgICAgICAgICAgYXR0cmliKHBhcnNlcilcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9OQU1FX1NBV19XSElURVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lQm9keSwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJOYW1lICs9IGNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lJylcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX05BTUVfU0FXX1dISVRFOlxuICAgICAgICAgIGlmIChjID09PSAnPScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX1ZBTFVFXG4gICAgICAgICAgfSBlbHNlIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnQXR0cmlidXRlIHdpdGhvdXQgdmFsdWUnKVxuICAgICAgICAgICAgcGFyc2VyLnRhZy5hdHRyaWJ1dGVzW3BhcnNlci5hdHRyaWJOYW1lXSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgPSAnJ1xuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25hdHRyaWJ1dGUnLCB7XG4gICAgICAgICAgICAgIG5hbWU6IHBhcnNlci5hdHRyaWJOYW1lLFxuICAgICAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliTmFtZSA9ICcnXG4gICAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLmF0dHJpYk5hbWUgPSBjXG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX05BTUVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBhdHRyaWJ1dGUgbmFtZScpXG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkFUVFJJQl9WQUxVRTpcbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNRdW90ZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnEgPSBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9RVU9URURcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdVbnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUnKVxuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVfVU5RVU9URURcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJWYWx1ZSA9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX1FVT1RFRDpcbiAgICAgICAgICBpZiAoYyAhPT0gcGFyc2VyLnEpIHtcbiAgICAgICAgICAgIGlmIChjID09PSAnJicpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVfRU5USVRZX1FcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhcnNlci5hdHRyaWJWYWx1ZSArPSBjXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBhdHRyaWIocGFyc2VyKVxuICAgICAgICAgIHBhcnNlci5xID0gJydcbiAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9DTE9TRURcbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfQ0xPU0VEOlxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJy8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fVEFHX1NMQVNIXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnTm8gd2hpdGVzcGFjZSBiZXR3ZWVuIGF0dHJpYnV0ZXMnKVxuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYk5hbWUgPSBjXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfTkFNRVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgYXR0cmlidXRlIG5hbWUnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfVU5RVU9URUQ6XG4gICAgICAgICAgaWYgKCFpc0F0dHJpYkVuZChjKSkge1xuICAgICAgICAgICAgaWYgKGMgPT09ICcmJykge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9FTlRJVFlfVVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyc2VyLmF0dHJpYlZhbHVlICs9IGNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGF0dHJpYihwYXJzZXIpXG4gICAgICAgICAgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgb3BlblRhZyhwYXJzZXIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNMT1NFX1RBRzpcbiAgICAgICAgICBpZiAoIXBhcnNlci50YWdOYW1lKSB7XG4gICAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vdE1hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnNlci5zY3JpcHQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIuc2NyaXB0ICs9ICc8LycgKyBjXG4gICAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TQ1JJUFRcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgdGFnbmFtZSBpbiBjbG9zaW5nIHRhZy4nKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJzZXIudGFnTmFtZSA9IGNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgY2xvc2VUYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lQm9keSwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci50YWdOYW1lICs9IGNcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlci5zY3JpcHQpIHtcbiAgICAgICAgICAgIHBhcnNlci5zY3JpcHQgKz0gJzwvJyArIHBhcnNlci50YWdOYW1lXG4gICAgICAgICAgICBwYXJzZXIudGFnTmFtZSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNDUklQVFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgdGFnbmFtZSBpbiBjbG9zaW5nIHRhZycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNMT1NFX1RBR19TQVdfV0hJVEVcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQ0xPU0VfVEFHX1NBV19XSElURTpcbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICBjbG9zZVRhZyhwYXJzZXIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsb3NpbmcgdGFnJylcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuVEVYVF9FTlRJVFk6XG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfRU5USVRZX1E6XG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfRU5USVRZX1U6XG4gICAgICAgICAgdmFyIHJldHVyblN0YXRlXG4gICAgICAgICAgdmFyIGJ1ZmZlclxuICAgICAgICAgIHN3aXRjaCAocGFyc2VyLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFMuVEVYVF9FTlRJVFk6XG4gICAgICAgICAgICAgIHJldHVyblN0YXRlID0gUy5URVhUXG4gICAgICAgICAgICAgIGJ1ZmZlciA9ICd0ZXh0Tm9kZSdcbiAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSBTLkFUVFJJQl9WQUxVRV9FTlRJVFlfUTpcbiAgICAgICAgICAgICAgcmV0dXJuU3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9RVU9URURcbiAgICAgICAgICAgICAgYnVmZmVyID0gJ2F0dHJpYlZhbHVlJ1xuICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX0VOVElUWV9VOlxuICAgICAgICAgICAgICByZXR1cm5TdGF0ZSA9IFMuQVRUUklCX1ZBTFVFX1VOUVVPVEVEXG4gICAgICAgICAgICAgIGJ1ZmZlciA9ICdhdHRyaWJWYWx1ZSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYyA9PT0gJzsnKSB7XG4gICAgICAgICAgICBwYXJzZXJbYnVmZmVyXSArPSBwYXJzZUVudGl0eShwYXJzZXIpXG4gICAgICAgICAgICBwYXJzZXIuZW50aXR5ID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IHJldHVyblN0YXRlXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKHBhcnNlci5lbnRpdHkubGVuZ3RoID8gZW50aXR5Qm9keSA6IGVudGl0eVN0YXJ0LCBjKSkge1xuICAgICAgICAgICAgcGFyc2VyLmVudGl0eSArPSBjXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXIgaW4gZW50aXR5IG5hbWUnKVxuICAgICAgICAgICAgcGFyc2VyW2J1ZmZlcl0gKz0gJyYnICsgcGFyc2VyLmVudGl0eSArIGNcbiAgICAgICAgICAgIHBhcnNlci5lbnRpdHkgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gcmV0dXJuU3RhdGVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHBhcnNlciwgJ1Vua25vd24gc3RhdGU6ICcgKyBwYXJzZXIuc3RhdGUpXG4gICAgICB9XG4gICAgfSAvLyB3aGlsZVxuXG4gICAgaWYgKHBhcnNlci5wb3NpdGlvbiA+PSBwYXJzZXIuYnVmZmVyQ2hlY2tQb3NpdGlvbikge1xuICAgICAgY2hlY2tCdWZmZXJMZW5ndGgocGFyc2VyKVxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VyXG4gIH1cblxuICAvKiEgaHR0cDovL210aHMuYmUvZnJvbWNvZGVwb2ludCB2MC4xLjAgYnkgQG1hdGhpYXMgKi9cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFTdHJpbmcuZnJvbUNvZGVQb2ludCkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuICAgICAgdmFyIGZsb29yID0gTWF0aC5mbG9vclxuICAgICAgdmFyIGZyb21Db2RlUG9pbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBNQVhfU0laRSA9IDB4NDAwMFxuICAgICAgICB2YXIgY29kZVVuaXRzID0gW11cbiAgICAgICAgdmFyIGhpZ2hTdXJyb2dhdGVcbiAgICAgICAgdmFyIGxvd1N1cnJvZ2F0ZVxuICAgICAgICB2YXIgaW5kZXggPSAtMVxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSAnJ1xuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSBOdW1iZXIoYXJndW1lbnRzW2luZGV4XSlcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhaXNGaW5pdGUoY29kZVBvaW50KSB8fCAvLyBgTmFOYCwgYCtJbmZpbml0eWAsIG9yIGAtSW5maW5pdHlgXG4gICAgICAgICAgICBjb2RlUG9pbnQgPCAwIHx8IC8vIG5vdCBhIHZhbGlkIFVuaWNvZGUgY29kZSBwb2ludFxuICAgICAgICAgICAgY29kZVBvaW50ID4gMHgxMEZGRkYgfHwgLy8gbm90IGEgdmFsaWQgVW5pY29kZSBjb2RlIHBvaW50XG4gICAgICAgICAgICBmbG9vcihjb2RlUG9pbnQpICE9PSBjb2RlUG9pbnQgLy8gbm90IGFuIGludGVnZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludDogJyArIGNvZGVQb2ludClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvZGVQb2ludCA8PSAweEZGRkYpIHsgLy8gQk1QIGNvZGUgcG9pbnRcbiAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludClcbiAgICAgICAgICB9IGVsc2UgeyAvLyBBc3RyYWwgY29kZSBwb2ludDsgc3BsaXQgaW4gc3Vycm9nYXRlIGhhbHZlc1xuICAgICAgICAgICAgLy8gaHR0cDovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcbiAgICAgICAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICAgICAgICBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyAweEQ4MDBcbiAgICAgICAgICAgIGxvd1N1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgJSAweDQwMCkgKyAweERDMDBcbiAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGhpZ2hTdXJyb2dhdGUsIGxvd1N1cnJvZ2F0ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluZGV4ICsgMSA9PT0gbGVuZ3RoIHx8IGNvZGVVbml0cy5sZW5ndGggPiBNQVhfU0laRSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpXG4gICAgICAgICAgICBjb2RlVW5pdHMubGVuZ3RoID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLCAnZnJvbUNvZGVQb2ludCcsIHtcbiAgICAgICAgICB2YWx1ZTogZnJvbUNvZGVQb2ludCxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFN0cmluZy5mcm9tQ29kZVBvaW50ID0gZnJvbUNvZGVQb2ludFxuICAgICAgfVxuICAgIH0oKSlcbiAgfVxufSkodHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gdGhpcy5zYXggPSB7fSA6IGV4cG9ydHMpXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG5cbmZ1bmN0aW9uIFN0cmVhbSgpIHtcbiAgRW1pdHRlci5jYWxsKHRoaXMpO1xufVxuU3RyZWFtLnByb3RvdHlwZSA9IG5ldyBFbWl0dGVyKCk7XG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuNC54XG5TdHJlYW0uU3RyZWFtID0gU3RyZWFtO1xuXG5TdHJlYW0ucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbihkZXN0LCBvcHRpb25zKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIG9uZGF0YShjaHVuaykge1xuICAgIGlmIChkZXN0LndyaXRhYmxlKSB7XG4gICAgICBpZiAoZmFsc2UgPT09IGRlc3Qud3JpdGUoY2h1bmspICYmIHNvdXJjZS5wYXVzZSkge1xuICAgICAgICBzb3VyY2UucGF1c2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2RhdGEnLCBvbmRhdGEpO1xuXG4gIGZ1bmN0aW9uIG9uZHJhaW4oKSB7XG4gICAgaWYgKHNvdXJjZS5yZWFkYWJsZSAmJiBzb3VyY2UucmVzdW1lKSB7XG4gICAgICBzb3VyY2UucmVzdW1lKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdC5vbignZHJhaW4nLCBvbmRyYWluKTtcblxuICAvLyBJZiB0aGUgJ2VuZCcgb3B0aW9uIGlzIG5vdCBzdXBwbGllZCwgZGVzdC5lbmQoKSB3aWxsIGJlIGNhbGxlZCB3aGVuXG4gIC8vIHNvdXJjZSBnZXRzIHRoZSAnZW5kJyBvciAnY2xvc2UnIGV2ZW50cy4gIE9ubHkgZGVzdC5lbmQoKSBvbmNlLlxuICBpZiAoIWRlc3QuX2lzU3RkaW8gJiYgKCFvcHRpb25zIHx8IG9wdGlvbnMuZW5kICE9PSBmYWxzZSkpIHtcbiAgICBzb3VyY2Uub24oJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2Uub24oJ2Nsb3NlJywgb25jbG9zZSk7XG4gIH1cblxuICB2YXIgZGlkT25FbmQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gb25lbmQoKSB7XG4gICAgaWYgKGRpZE9uRW5kKSByZXR1cm47XG4gICAgZGlkT25FbmQgPSB0cnVlO1xuXG4gICAgZGVzdC5lbmQoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIGRlc3QuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgZGVzdC5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBkb24ndCBsZWF2ZSBkYW5nbGluZyBwaXBlcyB3aGVuIHRoZXJlIGFyZSBlcnJvcnMuXG4gIGZ1bmN0aW9uIG9uZXJyb3IoZXIpIHtcbiAgICBjbGVhbnVwKCk7XG4gICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycygnZXJyb3InKSkge1xuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCBzdHJlYW0gZXJyb3IgaW4gcGlwZS5cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2Vycm9yJywgb25lcnJvcik7XG4gIGRlc3Qub24oJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgLy8gcmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRoYXQgd2VyZSBhZGRlZC5cbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBzb3VyY2Uub2ZmKCdkYXRhJywgb25kYXRhKTtcbiAgICBkZXN0Lm9mZignZHJhaW4nLCBvbmRyYWluKTtcblxuICAgIHNvdXJjZS5vZmYoJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2Uub2ZmKCdjbG9zZScsIG9uY2xvc2UpO1xuXG4gICAgc291cmNlLm9mZignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0Lm9mZignZXJyb3InLCBvbmVycm9yKTtcblxuICAgIHNvdXJjZS5vZmYoJ2VuZCcsIGNsZWFudXApO1xuICAgIHNvdXJjZS5vZmYoJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgICBkZXN0Lm9mZignZW5kJywgY2xlYW51cCk7XG4gICAgZGVzdC5vZmYoJ2Nsb3NlJywgY2xlYW51cCk7XG4gIH1cblxuICBzb3VyY2Uub24oJ2VuZCcsIGNsZWFudXApO1xuICBzb3VyY2Uub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5vbignZW5kJywgY2xlYW51cCk7XG4gIGRlc3Qub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5lbWl0KCdwaXBlJywgc291cmNlKTtcblxuICAvLyBBbGxvdyBmb3IgdW5peC1saWtlIHVzYWdlOiBBLnBpcGUoQikucGlwZShDKVxuICByZXR1cm4gZGVzdDtcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgaXNFbmNvZGluZyA9IEJ1ZmZlci5pc0VuY29kaW5nIHx8IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBlbmNvZGluZyA9ICcnICsgZW5jb2Rpbmc7XG4gIHN3aXRjaCAoZW5jb2RpbmcgJiYgZW5jb2RpbmcudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6Y2FzZSAndXRmOCc6Y2FzZSAndXRmLTgnOmNhc2UgJ2FzY2lpJzpjYXNlICdiaW5hcnknOmNhc2UgJ2Jhc2U2NCc6Y2FzZSAndWNzMic6Y2FzZSAndWNzLTInOmNhc2UgJ3V0ZjE2bGUnOmNhc2UgJ3V0Zi0xNmxlJzpjYXNlICdyYXcnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX25vcm1hbGl6ZUVuY29kaW5nKGVuYykge1xuICBpZiAoIWVuYykgcmV0dXJuICd1dGY4JztcbiAgdmFyIHJldHJpZWQ7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmMpIHtcbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gJ3V0ZjgnO1xuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuICd1dGYxNmxlJztcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gJ2xhdGluMSc7XG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGVuYztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChyZXRyaWVkKSByZXR1cm47IC8vIHVuZGVmaW5lZFxuICAgICAgICBlbmMgPSAoJycgKyBlbmMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHJpZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRG8gbm90IGNhY2hlIGBCdWZmZXIuaXNFbmNvZGluZ2Agd2hlbiBjaGVja2luZyBlbmNvZGluZyBuYW1lcyBhcyBzb21lXG4vLyBtb2R1bGVzIG1vbmtleS1wYXRjaCBpdCB0byBzdXBwb3J0IGFkZGl0aW9uYWwgZW5jb2RpbmdzXG5mdW5jdGlvbiBub3JtYWxpemVFbmNvZGluZyhlbmMpIHtcbiAgdmFyIG5lbmMgPSBfbm9ybWFsaXplRW5jb2RpbmcoZW5jKTtcbiAgaWYgKHR5cGVvZiBuZW5jICE9PSAnc3RyaW5nJyAmJiAoQnVmZmVyLmlzRW5jb2RpbmcgPT09IGlzRW5jb2RpbmcgfHwgIWlzRW5jb2RpbmcoZW5jKSkpIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuYyk7XG4gIHJldHVybiBuZW5jIHx8IGVuYztcbn1cblxuLy8gU3RyaW5nRGVjb2RlciBwcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIGVmZmljaWVudGx5IHNwbGl0dGluZyBhIHNlcmllcyBvZlxuLy8gYnVmZmVycyBpbnRvIGEgc2VyaWVzIG9mIEpTIHN0cmluZ3Mgd2l0aG91dCBicmVha2luZyBhcGFydCBtdWx0aS1ieXRlXG4vLyBjaGFyYWN0ZXJzLlxuZXhwb3J0cy5TdHJpbmdEZWNvZGVyID0gU3RyaW5nRGVjb2RlcjtcbmZ1bmN0aW9uIFN0cmluZ0RlY29kZXIoZW5jb2RpbmcpIHtcbiAgdGhpcy5lbmNvZGluZyA9IG5vcm1hbGl6ZUVuY29kaW5nKGVuY29kaW5nKTtcbiAgdmFyIG5iO1xuICBzd2l0Y2ggKHRoaXMuZW5jb2RpbmcpIHtcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIHRoaXMudGV4dCA9IHV0ZjE2VGV4dDtcbiAgICAgIHRoaXMuZW5kID0gdXRmMTZFbmQ7XG4gICAgICBuYiA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICAgIHRoaXMuZmlsbExhc3QgPSB1dGY4RmlsbExhc3Q7XG4gICAgICBuYiA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgdGhpcy50ZXh0ID0gYmFzZTY0VGV4dDtcbiAgICAgIHRoaXMuZW5kID0gYmFzZTY0RW5kO1xuICAgICAgbmIgPSAzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMud3JpdGUgPSBzaW1wbGVXcml0ZTtcbiAgICAgIHRoaXMuZW5kID0gc2ltcGxlRW5kO1xuICAgICAgcmV0dXJuO1xuICB9XG4gIHRoaXMubGFzdE5lZWQgPSAwO1xuICB0aGlzLmxhc3RUb3RhbCA9IDA7XG4gIHRoaXMubGFzdENoYXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobmIpO1xufVxuXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChidWYpIHtcbiAgaWYgKGJ1Zi5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgdmFyIHI7XG4gIHZhciBpO1xuICBpZiAodGhpcy5sYXN0TmVlZCkge1xuICAgIHIgPSB0aGlzLmZpbGxMYXN0KGJ1Zik7XG4gICAgaWYgKHIgPT09IHVuZGVmaW5lZCkgcmV0dXJuICcnO1xuICAgIGkgPSB0aGlzLmxhc3ROZWVkO1xuICAgIHRoaXMubGFzdE5lZWQgPSAwO1xuICB9IGVsc2Uge1xuICAgIGkgPSAwO1xuICB9XG4gIGlmIChpIDwgYnVmLmxlbmd0aCkgcmV0dXJuIHIgPyByICsgdGhpcy50ZXh0KGJ1ZiwgaSkgOiB0aGlzLnRleHQoYnVmLCBpKTtcbiAgcmV0dXJuIHIgfHwgJyc7XG59O1xuXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS5lbmQgPSB1dGY4RW5kO1xuXG4vLyBSZXR1cm5zIG9ubHkgY29tcGxldGUgY2hhcmFjdGVycyBpbiBhIEJ1ZmZlclxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUudGV4dCA9IHV0ZjhUZXh0O1xuXG4vLyBBdHRlbXB0cyB0byBjb21wbGV0ZSBhIHBhcnRpYWwgbm9uLVVURi04IGNoYXJhY3RlciB1c2luZyBieXRlcyBmcm9tIGEgQnVmZmVyXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS5maWxsTGFzdCA9IGZ1bmN0aW9uIChidWYpIHtcbiAgaWYgKHRoaXMubGFzdE5lZWQgPD0gYnVmLmxlbmd0aCkge1xuICAgIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZCwgMCwgdGhpcy5sYXN0TmVlZCk7XG4gICAgcmV0dXJuIHRoaXMubGFzdENoYXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywgMCwgdGhpcy5sYXN0VG90YWwpO1xuICB9XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZCwgMCwgYnVmLmxlbmd0aCk7XG4gIHRoaXMubGFzdE5lZWQgLT0gYnVmLmxlbmd0aDtcbn07XG5cbi8vIENoZWNrcyB0aGUgdHlwZSBvZiBhIFVURi04IGJ5dGUsIHdoZXRoZXIgaXQncyBBU0NJSSwgYSBsZWFkaW5nIGJ5dGUsIG9yIGFcbi8vIGNvbnRpbnVhdGlvbiBieXRlLiBJZiBhbiBpbnZhbGlkIGJ5dGUgaXMgZGV0ZWN0ZWQsIC0yIGlzIHJldHVybmVkLlxuZnVuY3Rpb24gdXRmOENoZWNrQnl0ZShieXRlKSB7XG4gIGlmIChieXRlIDw9IDB4N0YpIHJldHVybiAwO2Vsc2UgaWYgKGJ5dGUgPj4gNSA9PT0gMHgwNikgcmV0dXJuIDI7ZWxzZSBpZiAoYnl0ZSA+PiA0ID09PSAweDBFKSByZXR1cm4gMztlbHNlIGlmIChieXRlID4+IDMgPT09IDB4MUUpIHJldHVybiA0O1xuICByZXR1cm4gYnl0ZSA+PiA2ID09PSAweDAyID8gLTEgOiAtMjtcbn1cblxuLy8gQ2hlY2tzIGF0IG1vc3QgMyBieXRlcyBhdCB0aGUgZW5kIG9mIGEgQnVmZmVyIGluIG9yZGVyIHRvIGRldGVjdCBhblxuLy8gaW5jb21wbGV0ZSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3Rlci4gVGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyAoMiwgMywgb3IgNClcbi8vIG5lZWRlZCB0byBjb21wbGV0ZSB0aGUgVVRGLTggY2hhcmFjdGVyIChpZiBhcHBsaWNhYmxlKSBhcmUgcmV0dXJuZWQuXG5mdW5jdGlvbiB1dGY4Q2hlY2tJbmNvbXBsZXRlKHNlbGYsIGJ1ZiwgaSkge1xuICB2YXIgaiA9IGJ1Zi5sZW5ndGggLSAxO1xuICBpZiAoaiA8IGkpIHJldHVybiAwO1xuICB2YXIgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkgc2VsZi5sYXN0TmVlZCA9IG5iIC0gMTtcbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgaWYgKC0taiA8IGkgfHwgbmIgPT09IC0yKSByZXR1cm4gMDtcbiAgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkgc2VsZi5sYXN0TmVlZCA9IG5iIC0gMjtcbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgaWYgKC0taiA8IGkgfHwgbmIgPT09IC0yKSByZXR1cm4gMDtcbiAgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkge1xuICAgICAgaWYgKG5iID09PSAyKSBuYiA9IDA7ZWxzZSBzZWxmLmxhc3ROZWVkID0gbmIgLSAzO1xuICAgIH1cbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8vIFZhbGlkYXRlcyBhcyBtYW55IGNvbnRpbnVhdGlvbiBieXRlcyBmb3IgYSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3RlciBhc1xuLy8gbmVlZGVkIG9yIGFyZSBhdmFpbGFibGUuIElmIHdlIHNlZSBhIG5vbi1jb250aW51YXRpb24gYnl0ZSB3aGVyZSB3ZSBleHBlY3Rcbi8vIG9uZSwgd2UgXCJyZXBsYWNlXCIgdGhlIHZhbGlkYXRlZCBjb250aW51YXRpb24gYnl0ZXMgd2UndmUgc2VlbiBzbyBmYXIgd2l0aFxuLy8gYSBzaW5nbGUgVVRGLTggcmVwbGFjZW1lbnQgY2hhcmFjdGVyICgnXFx1ZmZmZCcpLCB0byBtYXRjaCB2OCdzIFVURi04IGRlY29kaW5nXG4vLyBiZWhhdmlvci4gVGhlIGNvbnRpbnVhdGlvbiBieXRlIGNoZWNrIGlzIGluY2x1ZGVkIHRocmVlIHRpbWVzIGluIHRoZSBjYXNlXG4vLyB3aGVyZSBhbGwgb2YgdGhlIGNvbnRpbnVhdGlvbiBieXRlcyBmb3IgYSBjaGFyYWN0ZXIgZXhpc3QgaW4gdGhlIHNhbWUgYnVmZmVyLlxuLy8gSXQgaXMgYWxzbyBkb25lIHRoaXMgd2F5IGFzIGEgc2xpZ2h0IHBlcmZvcm1hbmNlIGluY3JlYXNlIGluc3RlYWQgb2YgdXNpbmcgYVxuLy8gbG9vcC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0V4dHJhQnl0ZXMoc2VsZiwgYnVmLCBwKSB7XG4gIGlmICgoYnVmWzBdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICBzZWxmLmxhc3ROZWVkID0gMDtcbiAgICByZXR1cm4gJ1xcdWZmZmQnO1xuICB9XG4gIGlmIChzZWxmLmxhc3ROZWVkID4gMSAmJiBidWYubGVuZ3RoID4gMSkge1xuICAgIGlmICgoYnVmWzFdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgIHNlbGYubGFzdE5lZWQgPSAxO1xuICAgICAgcmV0dXJuICdcXHVmZmZkJztcbiAgICB9XG4gICAgaWYgKHNlbGYubGFzdE5lZWQgPiAyICYmIGJ1Zi5sZW5ndGggPiAyKSB7XG4gICAgICBpZiAoKGJ1ZlsyXSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICAgIHNlbGYubGFzdE5lZWQgPSAyO1xuICAgICAgICByZXR1cm4gJ1xcdWZmZmQnO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBBdHRlbXB0cyB0byBjb21wbGV0ZSBhIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXIuXG5mdW5jdGlvbiB1dGY4RmlsbExhc3QoYnVmKSB7XG4gIHZhciBwID0gdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkO1xuICB2YXIgciA9IHV0ZjhDaGVja0V4dHJhQnl0ZXModGhpcywgYnVmLCBwKTtcbiAgaWYgKHIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHI7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCBwLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgcCwgMCwgYnVmLmxlbmd0aCk7XG4gIHRoaXMubGFzdE5lZWQgLT0gYnVmLmxlbmd0aDtcbn1cblxuLy8gUmV0dXJucyBhbGwgY29tcGxldGUgVVRGLTggY2hhcmFjdGVycyBpbiBhIEJ1ZmZlci4gSWYgdGhlIEJ1ZmZlciBlbmRlZCBvbiBhXG4vLyBwYXJ0aWFsIGNoYXJhY3RlciwgdGhlIGNoYXJhY3RlcidzIGJ5dGVzIGFyZSBidWZmZXJlZCB1bnRpbCB0aGUgcmVxdWlyZWRcbi8vIG51bWJlciBvZiBieXRlcyBhcmUgYXZhaWxhYmxlLlxuZnVuY3Rpb24gdXRmOFRleHQoYnVmLCBpKSB7XG4gIHZhciB0b3RhbCA9IHV0ZjhDaGVja0luY29tcGxldGUodGhpcywgYnVmLCBpKTtcbiAgaWYgKCF0aGlzLmxhc3ROZWVkKSByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGY4JywgaSk7XG4gIHRoaXMubGFzdFRvdGFsID0gdG90YWw7XG4gIHZhciBlbmQgPSBidWYubGVuZ3RoIC0gKHRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIDAsIGVuZCk7XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjgnLCBpLCBlbmQpO1xufVxuXG4vLyBGb3IgVVRGLTgsIGEgcmVwbGFjZW1lbnQgY2hhcmFjdGVyIGlzIGFkZGVkIHdoZW4gZW5kaW5nIG9uIGEgcGFydGlhbFxuLy8gY2hhcmFjdGVyLlxuZnVuY3Rpb24gdXRmOEVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkgcmV0dXJuIHIgKyAnXFx1ZmZmZCc7XG4gIHJldHVybiByO1xufVxuXG4vLyBVVEYtMTZMRSB0eXBpY2FsbHkgbmVlZHMgdHdvIGJ5dGVzIHBlciBjaGFyYWN0ZXIsIGJ1dCBldmVuIGlmIHdlIGhhdmUgYW4gZXZlblxuLy8gbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBlbmQgb24gYSBsZWFkaW5nL2hpZ2hcbi8vIHN1cnJvZ2F0ZS4gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBuZXh0IHR3byBieXRlcyBpbiBvcmRlciB0b1xuLy8gZGVjb2RlIHRoZSBsYXN0IGNoYXJhY3RlciBwcm9wZXJseS5cbmZ1bmN0aW9uIHV0ZjE2VGV4dChidWYsIGkpIHtcbiAgaWYgKChidWYubGVuZ3RoIC0gaSkgJSAyID09PSAwKSB7XG4gICAgdmFyIHIgPSBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpKTtcbiAgICBpZiAocikge1xuICAgICAgdmFyIGMgPSByLmNoYXJDb2RlQXQoci5sZW5ndGggLSAxKTtcbiAgICAgIGlmIChjID49IDB4RDgwMCAmJiBjIDw9IDB4REJGRikge1xuICAgICAgICB0aGlzLmxhc3ROZWVkID0gMjtcbiAgICAgICAgdGhpcy5sYXN0VG90YWwgPSA0O1xuICAgICAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAyXTtcbiAgICAgICAgdGhpcy5sYXN0Q2hhclsxXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiByLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDE7XG4gIHRoaXMubGFzdFRvdGFsID0gMjtcbiAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpLCBidWYubGVuZ3RoIC0gMSk7XG59XG5cbi8vIEZvciBVVEYtMTZMRSB3ZSBkbyBub3QgZXhwbGljaXRseSBhcHBlbmQgc3BlY2lhbCByZXBsYWNlbWVudCBjaGFyYWN0ZXJzIGlmIHdlXG4vLyBlbmQgb24gYSBwYXJ0aWFsIGNoYXJhY3Rlciwgd2Ugc2ltcGx5IGxldCB2OCBoYW5kbGUgdGhhdC5cbmZ1bmN0aW9uIHV0ZjE2RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgdmFyIGVuZCA9IHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZDtcbiAgICByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ3V0ZjE2bGUnLCAwLCBlbmQpO1xuICB9XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUZXh0KGJ1ZiwgaSkge1xuICB2YXIgbiA9IChidWYubGVuZ3RoIC0gaSkgJSAzO1xuICBpZiAobiA9PT0gMCkgcmV0dXJuIGJ1Zi50b1N0cmluZygnYmFzZTY0JywgaSk7XG4gIHRoaXMubGFzdE5lZWQgPSAzIC0gbjtcbiAgdGhpcy5sYXN0VG90YWwgPSAzO1xuICBpZiAobiA9PT0gMSkge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDJdO1xuICAgIHRoaXMubGFzdENoYXJbMV0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ2Jhc2U2NCcsIGksIGJ1Zi5sZW5ndGggLSBuKTtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ2Jhc2U2NCcsIDAsIDMgLSB0aGlzLmxhc3ROZWVkKTtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIFBhc3MgYnl0ZXMgb24gdGhyb3VnaCBmb3Igc2luZ2xlLWJ5dGUgZW5jb2RpbmdzIChlLmcuIGFzY2lpLCBsYXRpbjEsIGhleClcbmZ1bmN0aW9uIHNpbXBsZVdyaXRlKGJ1Zikge1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVFbmQoYnVmKSB7XG4gIHJldHVybiBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xufSIsIlxuZXhwb3J0cy5ldmVyeSA9IGZ1bmN0aW9uKHN0cikge1xuICByZXR1cm4gbmV3IEV2ZXJ5KHN0cik7XG59O1xuXG4vKlxuICBUaW1lIG1hcFxuKi9cblxudmFyIHRpbWUgPSB7XG4gIG1pbGxpc2Vjb25kOiAxLFxuICBzZWNvbmQ6IDEwMDAsXG4gIG1pbnV0ZTogNjAwMDAsXG4gIGhvdXI6IDM2MDAwMDAsXG4gIGRheTogODY0MDAwMDBcbn07XG5cbmZvciAodmFyIGtleSBpbiB0aW1lKSB7XG4gIGlmIChrZXkgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICB0aW1lLm1zID0gdGltZVtrZXldO1xuICB9IGVsc2Uge1xuICAgIHRpbWVba2V5LmNoYXJBdCgwKV0gPSB0aW1lW2tleV07XG4gIH1cbiAgdGltZVtrZXkgKyAncyddID0gdGltZVtrZXldO1xufVxuXG5cbi8qXG4gIEV2ZXJ5IGNvbnN0cnVjdG9yXG4qL1xuXG5mdW5jdGlvbiBFdmVyeShzdHIpIHtcbiAgdGhpcy5jb3VudCA9IDA7XG4gIHZhciBtID0gcGFyc2Uoc3RyKTtcbiAgaWYgKG0pIHtcbiAgICB0aGlzLnRpbWUgPSBOdW1iZXIobVswXSkgKiB0aW1lW21bMV1dO1xuICAgIHRoaXMudHlwZSA9IG1bMV07XG4gIH1cbn1cblxuRXZlcnkucHJvdG90eXBlLmRvID0gZnVuY3Rpb24oY2IpIHtcbiAgaWYgKHRoaXMudGltZSkge1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjYWxsYmFjaywgdGhpcy50aW1lKTtcbiAgfVxuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZnVuY3Rpb24gY2FsbGJhY2soKSB7XG4gICAgdGhhdC5jb3VudCsrO1xuICAgIGNiLmNhbGwodGhhdCk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVyeS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWw7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qXG4gIENvbnZlcnQgc3RyaW5nIHRvIG1pbGxpc2Vjb25kc1xuXG4gICAgbXMsIG1pbGxpc2Vjb25kKHMpP1xuICAgIHMsIHNlY29uZChzKT9cbiAgICBtLCBtaW51dGUocyk/XG4gICAgaCwgaG91cihzKT9cbiAgICBkLCBkYXkocyk/XG4qL1xudmFyIHJlZyA9IC9eXFxzKihcXGQrKD86XFwuXFxkKyk/KVxccyooW2Etel0rKVxccyokLztcblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHZhciBtID0gc3RyLm1hdGNoKHJlZyk7XG4gIGlmIChtICYmIHRpbWVbbVsyXV0pIHtcbiAgICByZXR1cm4gbS5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbiIsImltcG9ydCB7IEJ1aWxkaW5nVHlwZSB9IGZyb20gXCIuLi9jb21tb24vbW9kZWxcIjtcblxuZGVjbGFyZSB2YXIgVUk6IGFueTtcbmRlY2xhcmUgdmFyIGdhbWVfZGF0YTogYW55O1xuXG5pbnRlcmZhY2UgTG9jYWxUZXh0MkJ1aWxkaW5nVHlwZSB7XG4gICAgbG9jYWxpemVkVGV4dDogc3RyaW5nO1xuICAgIHR5cGU6IEJ1aWxkaW5nVHlwZTtcbn1cblxuaW50ZXJmYWNlIExvY2FsaXphdGlvbkRhdGEge1xuICAgIHBhcnNlOiB7XG4gICAgICAgIHJlc291cmNlU3RvbGVuOiBzdHJpbmc7XG4gICAgICAgIGJ1aWxkaW5nRGFtYWdlU291cmNlQ2F0YXB1bHQ6IHN0cmluZztcbiAgICAgICAgYnVpbGRpbmdEYW1hZ2VTb3VyY2VSYW06IHN0cmluZztcbiAgICAgICAgcmVwb3J0VGV4dDJCdWlsZGluZ1R5cGU6IEFycmF5PExvY2FsVGV4dDJCdWlsZGluZ1R5cGU+O1xuICAgIH0sXG4gICAgb3V0cHV0VGV4dDoge1xuICAgICAgICBkZWZlbmRlclVuaXRzTG9zdENvc3RUZXh0OiBzdHJpbmc7XG4gICAgICAgIGF0dGFja2VyVW5pdHNMb3N0Q29zdFRleHQ6IHN0cmluZztcbiAgICAgICAgZGVmZW5kZXJMb3N0UmVzb3VyY2VzVG90YWw6IHN0cmluZztcbiAgICAgICAga2lsbFNjb3JlQXNBdHRhY2tlcjogc3RyaW5nO1xuICAgICAgICBraWxsU2NvcmVBc0RlZmVuZGVyOiBzdHJpbmc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlTG9jYWxpemF0aW9uRGF0YSgpOiBMb2NhbGl6YXRpb25EYXRhIHtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25EYXRhID0gbmV3IE1hcDxzdHJpbmcsIExvY2FsaXphdGlvbkRhdGE+KCk7XG4gICAgY29uc3QgZ2FtZUxvY2FsZSA9IGdhbWVfZGF0YS5sb2NhbGU7XG4gICAgLyoqXG4gICAgICogVG8gbG9jYWxpc2UgdGhpcyBzY3JpcHQgYWRkIGxvY2FsZSBmcm9tIHlvdXIgZ2FtZS4gdHlwZSBgZ2FtZV9kYXRhLmxvY2FsZWAgdG8gd2ViIGJyb3dzZXIgY29uc29sZSB3aGlsZSBwcmVzZW50IG9uIFRXIHBhZ2UuXG4gICAgICovXG4gICAgbG9jYWxpemF0aW9uRGF0YS5zZXQoXCJjc19DWlwiLCB7XG4gICAgICAgIHBhcnNlOiB7XG4gICAgICAgICAgICByZXNvdXJjZVN0b2xlbjogXCJLb8WZaXN0XCIsXG4gICAgICAgICAgICBidWlsZGluZ0RhbWFnZVNvdXJjZUNhdGFwdWx0OiBcIsWga29kYSB2em5pa2zDoSBzdMWZZWxib3UgeiBrYXRhcHVsdHU6XCIsXG4gICAgICAgICAgICBidWlsZGluZ0RhbWFnZVNvdXJjZVJhbTogXCLFoGtvZGEgdnpuaWtsw6EgYmVyYW5pZGxlbTpcIixcbiAgICAgICAgICAgIHJlcG9ydFRleHQyQnVpbGRpbmdUeXBlOiBbXG4gICAgICAgICAgICAgICAgeyBsb2NhbGl6ZWRUZXh0OiBcIkhsYXZuw61cIiwgdHlwZTogQnVpbGRpbmdUeXBlLk1BSU4gfSxcbiAgICAgICAgICAgICAgICB7IGxvY2FsaXplZFRleHQ6IFwiS2Fzw6FybmFcIiwgdHlwZTogQnVpbGRpbmdUeXBlLkJBUlJBQ0tTIH0sXG4gICAgICAgICAgICAgICAgeyBsb2NhbGl6ZWRUZXh0OiBcIlN0w6FqZVwiLCB0eXBlOiBCdWlsZGluZ1R5cGUuU1RBQkxFIH0sXG4gICAgICAgICAgICAgICAgeyBsb2NhbGl6ZWRUZXh0OiBcIkTDrWxuYVwiLCB0eXBlOiBCdWlsZGluZ1R5cGUuU0lFR0VfRkFDVE9SWSB9LFxuICAgICAgICAgICAgICAgIHsgbG9jYWxpemVkVGV4dDogXCJQYW5za8O9XCIsIHR5cGU6IEJ1aWxkaW5nVHlwZS5TTk9CIH0sXG4gICAgICAgICAgICAgICAgeyBsb2NhbGl6ZWRUZXh0OiBcIktvdsOhcm5hXCIsIHR5cGU6IEJ1aWxkaW5nVHlwZS5TTUlUSCB9LFxuICAgICAgICAgICAgICAgIHsgbG9jYWxpemVkVGV4dDogXCJOw6Fkdm/FmcOtXCIsIHR5cGU6IEJ1aWxkaW5nVHlwZS5QTEFDRSB9LFxuICAgICAgICAgICAgICAgIHsgbG9jYWxpemVkVGV4dDogXCJTb2NoYVwiLCB0eXBlOiBCdWlsZGluZ1R5cGUuU1RBVFVFIH0sXG4gICAgICAgICAgICAgICAgeyBsb2NhbGl6ZWRUZXh0OiBcIlRyxb5pxaF0xJtcIiwgdHlwZTogQnVpbGRpbmdUeXBlLk1BUktFVCB9LFxuICAgICAgICAgICAgICAgIHsgbG9jYWxpemVkVGV4dDogXCJExZlldm9ydWJlY1wiLCB0eXBlOiBCdWlsZGluZ1R5cGUuV09PRF9DVVRURVIgfSxcbiAgICAgICAgICAgICAgICB7IGxvY2FsaXplZFRleHQ6IFwiTG9tXCIsIHR5cGU6IEJ1aWxkaW5nVHlwZS5DTEFZX1BJVCB9LFxuICAgICAgICAgICAgICAgIHsgbG9jYWxpemVkVGV4dDogXCLFvWVsZXpuw71cIiwgdHlwZTogQnVpbGRpbmdUeXBlLklST05fTUlORSB9LFxuICAgICAgICAgICAgICAgIHsgbG9jYWxpemVkVGV4dDogXCJTZWxza8O9XCIsIHR5cGU6IEJ1aWxkaW5nVHlwZS5GQVJNIH0sXG4gICAgICAgICAgICAgICAgeyBsb2NhbGl6ZWRUZXh0OiBcIlNrbGFkacWhdMSbXCIsIHR5cGU6IEJ1aWxkaW5nVHlwZS5TVE9SQUdFIH0sXG4gICAgICAgICAgICAgICAgeyBsb2NhbGl6ZWRUZXh0OiBcIlNrcsO9xaFcIiwgdHlwZTogQnVpbGRpbmdUeXBlLkhJREUgfSxcbiAgICAgICAgICAgICAgICB7IGxvY2FsaXplZFRleHQ6IFwiSHJhZGJ5XCIsIHR5cGU6IEJ1aWxkaW5nVHlwZS5XQUxMIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0VGV4dDoge1xuICAgICAgICAgICAgYXR0YWNrZXJVbml0c0xvc3RDb3N0VGV4dDogXCJTdXJvdmlub3bDqSB6dHLDoXR5IMO6dG/EjW7DrWthIC0gamVkbm90a3lcIixcbiAgICAgICAgICAgIGRlZmVuZGVyVW5pdHNMb3N0Q29zdFRleHQ6IFwiU3Vyb3Zpbm92w6kgenRyw6F0eSBvYnLDoW5jZSAtIGplZG5vdGt5XCIsXG4gICAgICAgICAgICBkZWZlbmRlckxvc3RSZXNvdXJjZXNUb3RhbDogXCJTdXJvdmlub3bDqSB6dHLDoXR5IG9icsOhbmNlIC0gY2Vsa2VtXCIsXG4gICAgICAgICAgICBraWxsU2NvcmVBc0F0dGFja2VyOiBcIkpha28gw7p0b8SNbsOta1wiLFxuICAgICAgICAgICAga2lsbFNjb3JlQXNEZWZlbmRlcjogXCJKYWtvIG9icsOhbmNlXCJcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYnVpbGRpbmdEYW1hZ2VEYXRhID0gbG9jYWxpemF0aW9uRGF0YS5nZXQoZ2FtZUxvY2FsZSk7XG4gICAgaWYgKGJ1aWxkaW5nRGFtYWdlRGF0YSA9PSBudWxsKSB7XG4gICAgICAgIFVJLkVycm9yTWVzc2FnZShgUmVwb3J0IGVuaGFuY2VyIHdvbid0IHdvcmsgY29ycmVjdGx5IGZvciB5b3VyIGdhbWUgbGFuZ3VhZ2UgbXV0YXRpb24gJHtnYW1lTG9jYWxlfS4gQWRkIHRyYW5zYWN0aW9ucyBmb3IgY29ycmVjdCBiZWhhdmlvdXIuIFxuICAgICAgICBPciByYWlzZSBpc3N1ZSB0byBnaXRodWIgcmVwbyBodHRwczovL2dpdGh1Yi5jb20vVFdzY3JpcHRlci9zY3JpcHRzIGFuZCBoZWxwIHRvIHJlc29sdmUgbmVlZGVkIHRyYW5zbGF0aW9ucy5gLFxuICAgICAgICAgICAgNTAwMFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbG9jYWxpemF0aW9uRGF0YS5lbnRyaWVzKClbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkaW5nRGFtYWdlRGF0YTtcbn1cblxuZXhwb3J0IHtcbiAgICByZXNvbHZlTG9jYWxpemF0aW9uRGF0YSxcbiAgICBMb2NhbGl6YXRpb25EYXRhXG59IiwiLy8gPT1Vc2VyU2NyaXB0PT1cbi8vIEBuYW1lICAgICBCYXR0bGUgUmVwb3J0IEVuaGFuY2VyIC0ga2lsbCBzY29yZXMsIHNwZW50IHJlc291cmNlc1xuLy8gQGRlc2NyaXB0aW9uIEVuaGFuY2UgVFcgcmVwb3J0IHdpdGgga2lsbCBzY29yZSwgbG9zdCByZXNvdXJjZXMgZXRjXG4vLyBAaW5jbHVkZSBodHRwczovLyovZ2FtZS5waHA/KnNjcmVlbj1yZXBvcnQqXG4vLyBAaW5jbHVkZSBodHRwczovLyovZ2FtZS5waHA/KnNjcmVlbj1mb3J1bSpcbi8vIEBhdXRob3IgVFdfU2NyaXB0ZXJcbi8vID09L1VzZXJTY3JpcHQ9PVxuXG5pbXBvcnQgeyBsb2FkV29ybGRDb25maWcgfSBmcm9tIFwiLi4vY29tbW9uL3dvcmxkLWNvbmZpZy1sb2dpY1wiO1xuaW1wb3J0IHsgUmVzb3VyY2VzIH0gZnJvbSBcIi4uL2NvbW1vbi9tb2RlbFwiO1xuaW1wb3J0IHsgUmVwb3J0UGFyc2VyLCBSZXN1bHRzIH0gZnJvbSBcIi4vcGFyc2VyXCI7XG5pbXBvcnQgeyByZXNvbHZlTG9jYWxpemF0aW9uRGF0YSB9IGZyb20gXCIuL2xvY2FsaXphdGlvblwiO1xuaW1wb3J0IHsgbnVtYmVyRm9ybWF0dGVyQ2xvc3VyZSB9IGZyb20gXCIuLi9jb21tb24vbG9naWNcIjtcblxuY29uc3QgbnVtYmVyRm9ybWF0dGVyID0gbnVtYmVyRm9ybWF0dGVyQ2xvc3VyZShcIj9cIik7XG5jb25zdCBsb2NhbGl6YXRpb24gPSByZXNvbHZlTG9jYWxpemF0aW9uRGF0YSgpO1xuY29uc3QgcmVwb3J0UGFyc2VyID0gbmV3IFJlcG9ydFBhcnNlcihsb2NhbGl6YXRpb24sIGxvYWRXb3JsZENvbmZpZygpKTtcblxuZnVuY3Rpb24gYWRkQ3NzKCkge1xuICAgIGNvbnN0IHN0eWxlID1cbiAgICAgICAgYDxzdHlsZT5cbiAgICAgICAgICAgIC5raWxsLXNjb3JlLXRleHQge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuZ3JlZW4tdGV4dCB7XG4gICAgICAgICAgICAgICAgY29sb3I6IGdyZWVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLnJlZC10ZXh0IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogcmVkO1xuICAgICAgICAgICAgfVxuICAgIDwvc3R5bGU+YDtcbiAgICAkKFwiI2NvbnRlbnRfdmFsdWVcIikucHJlcGVuZChzdHlsZSk7XG59XG5cbmFkZENzcygpO1xuXG5mdW5jdGlvbiBlbnJpY2hSZXBvcnQoY29udGV4dDogSlF1ZXJ5KSB7XG4gICAgaWYgKGNvbnRleHQuZmluZChcIiNhdHRhY2tfaW5mb19hdHRfdW5pdHNcIikubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgY29uc3QgcGFyc2VkUmVwb3J0ID0gcmVwb3J0UGFyc2VyLnBhcnNlUmVwb3J0KGNvbnRleHQpO1xuXG4gICAgYWRkVW5pdExvc2VzRGF0YShjb250ZXh0LmZpbmQoXCIjYXR0YWNrX2luZm9fYXR0XCIpLCBcImdyZWVuLXRleHRcIiwgcGFyc2VkUmVwb3J0LmF0dGFja2VyKTtcbiAgICBhZGRVbml0TG9zZXNEYXRhKGNvbnRleHQuZmluZChcIiNhdHRhY2tfaW5mb19kZWZcIiksIFwicmVkLXRleHRcIiwgcGFyc2VkUmVwb3J0LmRlZmVuZGVyLnVuaXRzKTtcblxuICAgIGNvbnN0IGRlZmVuZGVyVG90YWxMb3N0UmVzb3VyY2VzID0gUmVzb3VyY2VzLnplcm8oKVxuICAgICAgICAuYWRkKHBhcnNlZFJlcG9ydC5kZWZlbmRlci51bml0cz8uYXJteUxvc2VzQ29zdClcbiAgICAgICAgLmFkZChwYXJzZWRSZXBvcnQuZGVmZW5kZXIuYnVpbGRpbmdEYW1hZ2U/LmNhdD8uYnVpbGRDb3N0KVxuICAgICAgICAuYWRkKHBhcnNlZFJlcG9ydC5kZWZlbmRlci5idWlsZGluZ0RhbWFnZT8ucmFtPy5idWlsZENvc3QpXG4gICAgICAgIC5hZGQocGFyc2VkUmVwb3J0LmRlZmVuZGVyLnN0b2xlbik7XG4gICAgY29uc3QgcmFtRGFtYWdlID0gcGFyc2VkUmVwb3J0LmRlZmVuZGVyLmJ1aWxkaW5nRGFtYWdlPy5yYW07XG4gICAgcmFtRGFtYWdlPy5qUXVlcnlFbGVtZW50Py5hcHBlbmQoZm9ybWF0UmVzb3VyY2VzV2l0aFBvcHVsYXRpb24ocmFtRGFtYWdlPy5idWlsZENvc3QpKTtcbiAgICBjb25zdCBjYXRhcHVsdERhbWFnZSA9IHBhcnNlZFJlcG9ydC5kZWZlbmRlci5idWlsZGluZ0RhbWFnZS5jYXQ7XG4gICAgY2F0YXB1bHREYW1hZ2U/LmpRdWVyeUVsZW1lbnQ/LmFwcGVuZChmb3JtYXRSZXNvdXJjZXNXaXRoUG9wdWxhdGlvbihjYXRhcHVsdERhbWFnZT8uYnVpbGRDb3N0KSk7XG5cbiAgICBjb250ZXh0LmZpbmQoXCIjYXR0YWNrX3Jlc3VsdHMgdGJvZHlcIikuYXBwZW5kKGBcbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPiR7bG9jYWxpemF0aW9uLm91dHB1dFRleHQuZGVmZW5kZXJMb3N0UmVzb3VyY2VzVG90YWx9OjwvdGg+XG4gICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjJcIj4ke2Zvcm1hdFJlc291cmNlc1dpdGhQb3B1bGF0aW9uKGRlZmVuZGVyVG90YWxMb3N0UmVzb3VyY2VzKX08L3RkPlxuICAgICAgICA8L3RyPmBcbiAgICApO1xufVxuXG5mdW5jdGlvbiBlbnJpY2hOb3JtYWxSZXBvcnRXaXRoU2NvcmVzKCkge1xuICAgIC8vbm9ybWFsIHJlcG9ydHNcbiAgICBjb25zdCByZXBvcnRTY3JlZW4gPSAkKFwiLnJlcG9ydF9SZXBvcnRBdHRhY2tcIik7XG4gICAgcmVwb3J0U2NyZWVuLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgIGVucmljaFJlcG9ydCgkKGVsZW1lbnQpKTtcbiAgICB9KVxuICAgIGlmIChyZXBvcnRTY3JlZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vZm9ydW0gcmVwb3J0c1xuICAgICAgICAkKFwidGFibGUudmlzXCIpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb250ZXh0ID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmZpbmQoXCIjYXR0YWNrX3Jlc3VsdHNcIikpIHtcbiAgICAgICAgICAgICAgICBlbnJpY2hSZXBvcnQoY29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBhZGRVbml0TG9zZXNEYXRhKGNvbnRleHQ6IEpRdWVyeSwga2lsbFNjb3JlQ29sb3I6IHN0cmluZywgcmVzdWx0czogUmVzdWx0cykge1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBjb250ZXh0LmZpbmQoJ3Rib2R5ID4gdHI6bnRoLWNoaWxkKDEpID4gdGg6bnRoLWNoaWxkKDIpJyk7XG4gICAgY29uc3QgcGxheWVyTmFtZUxpbmsgPSAkKHBsYXllck5hbWUpLmZpbmQoXCJhXCIpO1xuICAgIC8vcmVzZXQgYWRkZWQgdGV4dCBpbiBjYXNlIG9mIG11bHRpcGxlIGV2YWx1YXRpb25zXG4gICAgLy9AdHMtaWdub3JlXG4gICAgcGxheWVyTmFtZS5odG1sKHBsYXllck5hbWVMaW5rKTtcbiAgICBwbGF5ZXJOYW1lTGluay5hZnRlcihgPHRoIGNsYXNzPVwia2lsbC1zY29yZS10ZXh0ICR7a2lsbFNjb3JlQ29sb3J9XCI+JHtyZXN1bHRzLmtpbGxTY29yZVRleHR9OiAke251bWJlckZvcm1hdHRlcihyZXN1bHRzLmtpbGxTY29yZSl9PC90aD5gKTtcbiAgICBjb250ZXh0LmFmdGVyKGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5vd3JhcFwiPlxuICAgICAgICAgICAgPGg0PiR7cmVzdWx0cy5hcm15TG9zZXNUZXh0fTogPC9oND5cbiAgICAgICAgICAgICR7Zm9ybWF0UmVzb3VyY2VzV2l0aFBvcHVsYXRpb24ocmVzdWx0cz8uYXJteUxvc2VzQ29zdCwgcmVzdWx0cz8uYXJteUxvc2VzUG9wKX1cbiAgICAgICAgPC9kaXY+XG4gICAgYCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFJlc291cmNlc1dpdGhQb3B1bGF0aW9uKHJlc291cmNlcz86IFJlc291cmNlcywgcG9wPzogbnVtYmVyKSB7XG4gICAgY29uc3QgcG9wdWxhdGlvbiA9IHBvcCA9PSBudWxsID8gXCJcIiA6IGA8c3BhbiBjbGFzcz1cImljb24gaGVhZGVyIHBvcHVsYXRpb25cIj48L3NwYW4+JHtudW1iZXJGb3JtYXR0ZXIocG9wKX1gXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibm93cmFwXCI+XG4gICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gd29vZFwiPjwvc3Bhbj4ke251bWJlckZvcm1hdHRlcihyZXNvdXJjZXM/Lndvb2QpfVxuICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIHN0b25lXCI+PC9zcGFuPiR7bnVtYmVyRm9ybWF0dGVyKHJlc291cmNlcz8uc3RvbmUpfVxuICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGlyb25cIj48L3NwYW4+JHtudW1iZXJGb3JtYXR0ZXIocmVzb3VyY2VzPy5pcm9uKX1cbiAgICAgICAgICR7cG9wdWxhdGlvbn1cbiAgICA8L2Rpdj5gO1xufVxuXG5lbnJpY2hOb3JtYWxSZXBvcnRXaXRoU2NvcmVzKCk7XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXBvcnQtcHJldmlldycpO1xuICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHJldHVybjtcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgIGNvbnN0ICRyZXBvcnQgPSAkKFwiLnJlcG9ydC1wcmV2aWV3XCIpO1xuICAgICAgICBpZiAoJHJlcG9ydC5wcm9wKFwic3R5bGVcIikuZGlzcGxheSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBlbnJpY2hSZXBvcnQoJHJlcG9ydCk7XG4gICAgICAgIH1cbiAgICB9KS5vYnNlcnZlKHRhcmdldCwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlXG4gICAgfSk7XG59KTsiLCJpbXBvcnQgeyBBcm15LCBCdWlsZGluZ1R5cGUsIFJlc291cmNlcyB9IGZyb20gXCIuLi9jb21tb24vbW9kZWxcIjtcbmltcG9ydCB7IExvY2FsaXphdGlvbkRhdGEgfSBmcm9tIFwiLi9sb2NhbGl6YXRpb25cIjtcbmltcG9ydCB7IFdvcmxkQ29uZmlnIH0gZnJvbSBcIi4uL2NvbW1vbi93b3JsZC1jb25maWctbG9naWNcIjtcbmltcG9ydCB7IHBhcnNlSW50QW5kUmVtb3ZlTm9uTnVtIH0gZnJvbSBcIi4uL2NvbW1vbi9sb2dpY1wiO1xuXG5pbnRlcmZhY2UgUmVzdWx0cyB7XG4gICAgYXJteUxvc2VzQ29zdD86IFJlc291cmNlcztcbiAgICBhcm15TG9zZXNQb3A/OiBudW1iZXI7XG4gICAgYXJteUxvc2VzVGV4dDogc3RyaW5nO1xuICAgIGtpbGxTY29yZT86IG51bWJlcjtcbiAgICBraWxsU2NvcmVUZXh0Pzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgRGVtb2xpdGlvblJlc3VsdCB7XG4gICAgYnVpbGRpbmdUeXBlOiBCdWlsZGluZ1R5cGU7XG4gICAgYnVpbGRDb3N0OiBSZXNvdXJjZXM7XG4gICAgalF1ZXJ5RWxlbWVudDogSlF1ZXJ5XG59XG5cbmNsYXNzIFJlcG9ydFBhcnNlciB7XG4gICAgcmVhZG9ubHkgbG9jYWxpemF0aW9uRGF0YTogTG9jYWxpemF0aW9uRGF0YTtcbiAgICByZWFkb25seSB3b3JsZENvbmZpZzogV29ybGRDb25maWc7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2NhbGl6YXRpb25EYXRhOiBMb2NhbGl6YXRpb25EYXRhLCB3b3JsZENvbmZpZzogV29ybGRDb25maWcpIHtcbiAgICAgICAgdGhpcy5sb2NhbGl6YXRpb25EYXRhID0gbG9jYWxpemF0aW9uRGF0YTtcbiAgICAgICAgdGhpcy53b3JsZENvbmZpZyA9IHdvcmxkQ29uZmlnO1xuICAgIH1cblxuICAgIHBhcnNlUmVwb3J0KGNvbnRleHQ6IEpRdWVyeSkge1xuICAgICAgICBjb25zdCBkZWZlbmRlckFybXlMb3NlcyA9IHRoaXMuZmlsbEFybXkoY29udGV4dC5maW5kKFwiI2F0dGFja19pbmZvX2RlZl91bml0cyB0Ym9keSA+IHRyOm50aC1jaGlsZCgzKSA+IC51bml0LWl0ZW1cIikpO1xuICAgICAgICBjb25zdCBhdHRhY2tlckFybXlMb3NlcyA9IHRoaXMuZmlsbEFybXkoY29udGV4dC5maW5kKFwiI2F0dGFja19pbmZvX2F0dF91bml0cyB0Ym9keSA+IHRyOm50aC1jaGlsZCgzKSA+IC51bml0LWl0ZW1cIikpO1xuICAgICAgICBjb25zdCBidWlsZGluZ0RhbWFnZSA9IHRoaXMucGFyc2VCdWlsZGluZ0RhbWFnZUFuZFN0b2xlbkRhdGEoY29udGV4dCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlZmVuZGVyOiB7XG4gICAgICAgICAgICAgICAgdW5pdHM6ICB7XG4gICAgICAgICAgICAgICAgICAgIGFybXlMb3Nlc0Nvc3Q6IHRoaXMud29ybGRDb25maWcudW5pdHMuYXJteUNvc3QoZGVmZW5kZXJBcm15TG9zZXMpLFxuICAgICAgICAgICAgICAgICAgICBhcm15TG9zZXNQb3A6IHRoaXMud29ybGRDb25maWcudW5pdHMucG9wdWxhdGlvbihkZWZlbmRlckFybXlMb3NlcyksXG4gICAgICAgICAgICAgICAgICAgIGFybXlMb3Nlc1RleHQ6IHRoaXMubG9jYWxpemF0aW9uRGF0YS5vdXRwdXRUZXh0LmRlZmVuZGVyVW5pdHNMb3N0Q29zdFRleHQsXG4gICAgICAgICAgICAgICAgICAgIGtpbGxTY29yZTogdGhpcy53b3JsZENvbmZpZy51bml0cy5kZWZlbmRlcktpbGxTY29yZShhdHRhY2tlckFybXlMb3NlcyksXG4gICAgICAgICAgICAgICAgICAgIGtpbGxTY29yZVRleHQ6IHRoaXMubG9jYWxpemF0aW9uRGF0YS5vdXRwdXRUZXh0LmtpbGxTY29yZUFzRGVmZW5kZXIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWlsZGluZ0RhbWFnZTogYnVpbGRpbmdEYW1hZ2UsXG4gICAgICAgICAgICAgICAgc3RvbGVuOiBidWlsZGluZ0RhbWFnZS5zdG9sZW5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdHRhY2tlcjoge1xuICAgICAgICAgICAgICAgIGFybXlMb3Nlc0Nvc3Q6IHRoaXMud29ybGRDb25maWcudW5pdHMuYXJteUNvc3QoYXR0YWNrZXJBcm15TG9zZXMpLFxuICAgICAgICAgICAgICAgIGFybXlMb3Nlc1BvcDogdGhpcy53b3JsZENvbmZpZy51bml0cy5wb3B1bGF0aW9uKGF0dGFja2VyQXJteUxvc2VzKSxcbiAgICAgICAgICAgICAgICBhcm15TG9zZXNUZXh0OiB0aGlzLmxvY2FsaXphdGlvbkRhdGEub3V0cHV0VGV4dC5hdHRhY2tlclVuaXRzTG9zdENvc3RUZXh0LFxuICAgICAgICAgICAgICAgIGtpbGxTY29yZTogdGhpcy53b3JsZENvbmZpZy51bml0cy5hdHRhY2tlcktpbGxTY29yZShkZWZlbmRlckFybXlMb3NlcyksXG4gICAgICAgICAgICAgICAga2lsbFNjb3JlVGV4dDogdGhpcy5sb2NhbGl6YXRpb25EYXRhLm91dHB1dFRleHQua2lsbFNjb3JlQXNBdHRhY2tlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhcnNlQnVpbGRpbmdEYW1hZ2VBbmRTdG9sZW5EYXRhKGNvbnRleHQ6IEpRdWVyeSk6IHsgcmFtPzogRGVtb2xpdGlvblJlc3VsdCwgY2F0PzogRGVtb2xpdGlvblJlc3VsdCwgc3RvbGVuOiBSZXNvdXJjZXMgfSB7XG4gICAgICAgIGNvbnN0IGRlbW9saXRpb25zID0gY29udGV4dC5maW5kKFwiI2F0dGFja19yZXN1bHRzIHRib2R5IHRyXCIpO1xuICAgICAgICBsZXQgcmFtOiBEZW1vbGl0aW9uUmVzdWx0ID0gbnVsbDtcbiAgICAgICAgbGV0IGNhdDogRGVtb2xpdGlvblJlc3VsdCA9IG51bGw7XG4gICAgICAgIGxldCBzdG9sZW46IFJlc291cmNlcyA9IFJlc291cmNlcy56ZXJvKCk7XG5cbiAgICAgICAgZGVtb2xpdGlvbnMuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmVuZGVyQWRkaXRpb25hbERhbWFnZXMgPSAkKGVsZW1lbnQpLmZpbmQoXCJ0aFwiKS50ZXh0KCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gJChlbGVtZW50KS5maW5kKFwidGRcIik7XG4gICAgICAgICAgICBpZiAoZGVmZW5kZXJBZGRpdGlvbmFsRGFtYWdlcy5zdGFydHNXaXRoKHRoaXMubG9jYWxpemF0aW9uRGF0YS5wYXJzZS5yZXNvdXJjZVN0b2xlbikpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmZpbmQoXCJzcGFuXCIpLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5RdWVyeSA9ICQoZWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW5RdWVyeS5oYXNDbGFzcyhcIndvb2RcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b2xlbi53b29kID0gcGFyc2VJbnRBbmRSZW1vdmVOb25OdW0oc3BhblF1ZXJ5LmNsb3Nlc3QoXCIubm93cmFwXCIpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3BhblF1ZXJ5Lmhhc0NsYXNzKFwic3RvbmVcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b2xlbi5zdG9uZSA9IHBhcnNlSW50QW5kUmVtb3ZlTm9uTnVtKHNwYW5RdWVyeS5jbG9zZXN0KFwiLm5vd3JhcFwiKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNwYW5RdWVyeS5oYXNDbGFzcyhcImlyb25cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b2xlbi5pcm9uID0gcGFyc2VJbnRBbmRSZW1vdmVOb25OdW0oc3BhblF1ZXJ5LmNsb3Nlc3QoXCIubm93cmFwXCIpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZlbmRlckFkZGl0aW9uYWxEYW1hZ2VzLnN0YXJ0c1dpdGgodGhpcy5sb2NhbGl6YXRpb25EYXRhLnBhcnNlLmJ1aWxkaW5nRGFtYWdlU291cmNlUmFtKSkge1xuICAgICAgICAgICAgICAgIHJhbSA9IHRoaXMucGFyc2VEZW1vbGl0aW9ucyhkYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVmZW5kZXJBZGRpdGlvbmFsRGFtYWdlcy5zdGFydHNXaXRoKHRoaXMubG9jYWxpemF0aW9uRGF0YS5wYXJzZS5idWlsZGluZ0RhbWFnZVNvdXJjZUNhdGFwdWx0KSkge1xuICAgICAgICAgICAgICAgIGNhdCA9IHRoaXMucGFyc2VEZW1vbGl0aW9ucyhkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmFtOiByYW0sXG4gICAgICAgICAgICBjYXQ6IGNhdCxcbiAgICAgICAgICAgIHN0b2xlbjogc3RvbGVuXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZURlbW9saXRpb25zKHNvdXJjZTogSlF1ZXJ5KTogRGVtb2xpdGlvblJlc3VsdCB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBzb3VyY2UudGV4dCgpO1xuICAgICAgICBjb25zdCBkZW1vbGlzaGVkQnVpbGRpbmcgPSB0aGlzLmxvY2FsaXphdGlvbkRhdGEucGFyc2UucmVwb3J0VGV4dDJCdWlsZGluZ1R5cGUuZmluZCgoZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRleHQuc3RhcnRzV2l0aChlLmxvY2FsaXplZFRleHQpXG4gICAgICAgIH0pLnR5cGU7XG4gICAgICAgIGNvbnN0IHN0YXJ0TGV2ZWwgPSBwYXJzZUludEFuZFJlbW92ZU5vbk51bShzb3VyY2UuZmluZChcImJcIilbMF0udGV4dENvbnRlbnQpO1xuICAgICAgICBjb25zdCBkZW1vbGlzaGVkVG9MZXZlbCA9IHBhcnNlSW50QW5kUmVtb3ZlTm9uTnVtKHNvdXJjZS5maW5kKFwiYlwiKVsxXS50ZXh0Q29udGVudCk7XG4gICAgICAgIGNvbnN0IGJ1aWxkaW5nQ29uZmlnID0gdGhpcy53b3JsZENvbmZpZy5idWlsZGluZ3MudHlwZShkZW1vbGlzaGVkQnVpbGRpbmcpO1xuICAgICAgICBjb25zdCByZXNvdXJjZXMgPSBidWlsZGluZ0NvbmZpZy5jb3N0QmV0d2VlbkxldmVscyhzdGFydExldmVsLCBkZW1vbGlzaGVkVG9MZXZlbCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJ1aWxkaW5nVHlwZTogZGVtb2xpc2hlZEJ1aWxkaW5nLFxuICAgICAgICAgICAgYnVpbGRDb3N0OiByZXNvdXJjZXMsXG4gICAgICAgICAgICBqUXVlcnlFbGVtZW50OiBzb3VyY2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZmlsbEFybXkoYWxsTG9zdFVuaXRzOiBKUXVlcnkpOiBBcm15IHtcbiAgICAgICAgaWYgKGFsbExvc3RVbml0cy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuICAgICAgICBjb25zdCBhcm15ID0gQXJteS5lbXB0eSgpO1xuICAgICAgICB0aGlzLndvcmxkQ29uZmlnLnVuaXRzLmluR2FtZVVuaXRzLmZvckVhY2godW5pdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb3N0VW5pdHNUZXh0ID0gYWxsTG9zdFVuaXRzLmZpbHRlcihgLnVuaXQtaXRlbS0ke3VuaXR9YCkudGV4dCgpO1xuICAgICAgICAgICAgY29uc3QgbG9zdFVuaXRzID0gbG9zdFVuaXRzVGV4dCA9PT0gXCJcIiA/IDAgOiBwYXJzZUludChsb3N0VW5pdHNUZXh0KTtcbiAgICAgICAgICAgIGFybXkuc2V0VW5pdHModW5pdCwgbG9zdFVuaXRzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGFybXk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIFJlcG9ydFBhcnNlcixcbiAgICBSZXN1bHRzXG59IiwiZGVjbGFyZSB2YXIgZ2FtZV9kYXRhOiBhbnk7XG5cbi8qKlxuICogQ3JlYXRlIG51bWJlciBmb3JtYXR0ZXIgZm9yIGdhbWUgbG9jYWxlIHdoaWNoIHdpbGwgdXNlIGRlZmF1bHQgdmFsdWUgd2hlbiBmb3JtYXR0ZWQgdmFsdWVzIGlzIG51bGxcbiAqL1xuZnVuY3Rpb24gbnVtYmVyRm9ybWF0dGVyQ2xvc3VyZShkZWZhdWx0VmFsdWU6IHN0cmluZyk6ICh2YWx1ZT86IG51bWJlcikgPT4gc3RyaW5nIHtcbiAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoZ2FtZV9kYXRhLmxvY2FsZS5yZXBsYWNlKFwiX1wiLCBcIi1cIikpO1xuICAgIHJldHVybiAodmFsdWU/OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIHJldHVybiBmb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZUludEFuZFJlbW92ZU5vbk51bShpbnB1dDogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChpbnB1dC5yZXBsYWNlKC9cXEQvZywgJycpKTtcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2UgcmV0dXJuIHBhcnNlZDtcbn1cblxuXG5leHBvcnQge1xuICAgIG51bWJlckZvcm1hdHRlckNsb3N1cmUsXG4gICAgcGFyc2VJbnRBbmRSZW1vdmVOb25OdW1cbn0iLCJpbnRlcmZhY2UgVW5pdE51bWJlcnMge1xuICAgIHNwZWFyOiBudW1iZXJcbiAgICBzd29yZDogbnVtYmVyXG4gICAgYXhlOiBudW1iZXJcbiAgICBzcHk6IG51bWJlclxuICAgIGxpZ2h0OiBudW1iZXJcbiAgICBoZWF2eTogbnVtYmVyLFxuICAgIGFyY2hlcjogbnVtYmVyLFxuICAgIG1vdW50ZWRBcmNoZXI6IG51bWJlcixcbiAgICByYW06IG51bWJlcixcbiAgICBjYXQ6IG51bWJlcixcbiAgICBrbmlnaHQ6IG51bWJlcixcbiAgICBzbm9iOiBudW1iZXI7XG4gICAgbWlsaXRpYTogbnVtYmVyO1xufVxuXG5jbGFzcyBBcm15IGltcGxlbWVudHMgVW5pdE51bWJlcnMge1xuICAgIHNwZWFyOiBudW1iZXJcbiAgICBzd29yZDogbnVtYmVyXG4gICAgYXhlOiBudW1iZXJcbiAgICBzcHk6IG51bWJlclxuICAgIGxpZ2h0OiBudW1iZXJcbiAgICBoZWF2eTogbnVtYmVyXG4gICAgYXJjaGVyOiBudW1iZXJcbiAgICBtb3VudGVkQXJjaGVyOiBudW1iZXJcbiAgICByYW06IG51bWJlclxuICAgIGNhdDogbnVtYmVyO1xuICAgIGtuaWdodDogbnVtYmVyO1xuICAgIHNub2I6IG51bWJlcjtcbiAgICBtaWxpdGlhOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICAgICAgICAgIHNwZWFyID0gMCxcbiAgICAgICAgICAgICAgICAgICAgc3dvcmQgPSAwLFxuICAgICAgICAgICAgICAgICAgICBheGUgPSAwLFxuICAgICAgICAgICAgICAgICAgICBzcHkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBsaWdodCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGhlYXZ5ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgYXJjaGVyID0gMCxcbiAgICAgICAgICAgICAgICAgICAgbW91bnRlZEFyY2hlciA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHJhbSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGNhdCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHBhbGFkaW4gPSAwLFxuICAgICAgICAgICAgICAgICAgICBzbm9iID0gMCxcbiAgICAgICAgICAgICAgICAgICAgbWlsaXRpYSA9IDBcbiAgICAgICAgICAgICAgICB9KSB7XG4gICAgICAgIHRoaXMuc3BlYXIgPSBzcGVhcjtcbiAgICAgICAgdGhpcy5zd29yZCA9IHN3b3JkO1xuICAgICAgICB0aGlzLmF4ZSA9IGF4ZTtcbiAgICAgICAgdGhpcy5zcHkgPSBzcHk7XG4gICAgICAgIHRoaXMubGlnaHQgPSBsaWdodDtcbiAgICAgICAgdGhpcy5oZWF2eSA9IGhlYXZ5O1xuICAgICAgICB0aGlzLmFyY2hlciA9IGFyY2hlcjtcbiAgICAgICAgdGhpcy5tb3VudGVkQXJjaGVyID0gbW91bnRlZEFyY2hlcjtcbiAgICAgICAgdGhpcy5yYW0gPSByYW07XG4gICAgICAgIHRoaXMuY2F0ID0gY2F0O1xuICAgICAgICB0aGlzLmtuaWdodCA9IHBhbGFkaW47XG4gICAgICAgIHRoaXMuc25vYiA9IHNub2I7XG4gICAgICAgIHRoaXMubWlsaXRpYSA9IG1pbGl0aWE7XG4gICAgfVxuXG4gICAgdW5pdHModW5pdE5hbWU6IFVuaXRUeXBlcyk6IG51bWJlciB7XG4gICAgICAgIC8vaXMgdGhpcyBvaz8gb3Igc3dpdGNoP1xuICAgICAgICByZXR1cm4gdGhpc1t1bml0TmFtZV07XG4gICAgfVxuXG4gICAgc2V0VW5pdHModW5pdE5hbWU6IFVuaXRUeXBlcywgY291bnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzW3VuaXROYW1lXSA9IGNvdW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBlbXB0eSgpOiBBcm15IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcm15KHt9KTtcbiAgICB9XG59XG5cbmludGVyZmFjZSBSZXNvdXJjZXNEYXRhIHtcbiAgICB3b29kOiBudW1iZXI7XG4gICAgc3RvbmU6IG51bWJlcjtcbiAgICBpcm9uOiBudW1iZXI7XG59XG5cbmNsYXNzIFJlc291cmNlcyBpbXBsZW1lbnRzIFJlc291cmNlc0RhdGEge1xuICAgIHdvb2Q6IG51bWJlcjtcbiAgICBzdG9uZTogbnVtYmVyO1xuICAgIGlyb246IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHt3b29kID0gMCwgc3RvbmUgPSAwLCBpcm9uID0gMH06IFJlc291cmNlc0RhdGEpIHtcbiAgICAgICAgdGhpcy53b29kID0gd29vZDtcbiAgICAgICAgdGhpcy5zdG9uZSA9IHN0b25lO1xuICAgICAgICB0aGlzLmlyb24gPSBpcm9uO1xuICAgIH1cblxuICAgIGFkZChyZXNvdXJjZT86IFJlc291cmNlc0RhdGEsIHRpbWVzOiBudW1iZXIgPSAxKTogUmVzb3VyY2VzIHtcbiAgICAgICAgaWYgKHJlc291cmNlID09PSB1bmRlZmluZWQgfHwgcmVzb3VyY2UgPT09IG51bGwpIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLndvb2QgKz0gcmVzb3VyY2Uud29vZCAqIHRpbWVzO1xuICAgICAgICB0aGlzLnN0b25lICs9IHJlc291cmNlLnN0b25lICogdGltZXM7XG4gICAgICAgIHRoaXMuaXJvbiArPSByZXNvdXJjZS5pcm9uICogdGltZXM7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc3RhdGljIHplcm8oKTogUmVzb3VyY2VzIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDAsIHN0b25lOiAwLCBpcm9uOiAwfSlcbiAgICB9XG59XG5cbmVudW0gQnVpbGRpbmdUeXBlIHtcbiAgICBNQUlOID0gXCJtYWluXCIsXG4gICAgQkFSUkFDS1MgPSBcImJhcnJhY2tzXCIsXG4gICAgU1RBQkxFID0gXCJzdGFibGVcIixcbiAgICBTSUVHRV9GQUNUT1JZID0gXCJnYXJhZ2VcIixcbiAgICBTTk9CID0gXCJzbm9iXCIsXG4gICAgU01JVEggPSBcInNtaXRoXCIsXG4gICAgUExBQ0UgPSBcInBsYWNlXCIsXG4gICAgU1RBVFVFID0gXCJzdGF0dWVcIixcbiAgICBNQVJLRVQgPSBcIm1hcmtldFwiLFxuICAgIFdPT0RfQ1VUVEVSID0gXCJ3b29kXCIsXG4gICAgQ0xBWV9QSVQgPSBcInN0b25lXCIsXG4gICAgSVJPTl9NSU5FID0gXCJpcm9uXCIsXG4gICAgRkFSTSA9IFwiZmFybVwiLFxuICAgIFNUT1JBR0UgPSBcInN0b3JhZ2VcIixcbiAgICBISURFID0gXCJoaWRlXCIsXG4gICAgV0FMTCA9IFwid2FsbFwiXG59XG5cbmVudW0gVW5pdFR5cGVzIHtcbiAgICBTUEVBUiA9IFwic3BlYXJcIixcbiAgICBTV09SRCA9IFwic3dvcmRcIixcbiAgICBBWEUgPSBcImF4ZVwiLFxuICAgIFNQWSA9IFwic3B5XCIsXG4gICAgTElHSFQgPSBcImxpZ2h0XCIsXG4gICAgSEVBVlkgPSBcImhlYXZ5XCIsXG4gICAgQVJDSEVSID0gXCJhcmNoZXJcIixcbiAgICBNT1VOVEVEX0FSQ0hFUiA9IFwibWFyY2hlclwiLFxuICAgIFJBTSA9IFwicmFtXCIsXG4gICAgQ0FUQVBVTFQgPSBcImNhdGFwdWx0XCIsXG4gICAgUEFMQURJTiA9IFwia25pZ2h0XCIsXG4gICAgU05PQiA9IFwic25vYlwiLFxuICAgIE1JTElUSUEgPSBcIm1pbGl0aWFcIlxufVxuXG5leHBvcnQge1xuICAgIFJlc291cmNlcyxcbiAgICBSZXNvdXJjZXNEYXRhLFxuICAgIEJ1aWxkaW5nVHlwZSxcbiAgICBVbml0VHlwZXMsXG4gICAgQXJteVxufSIsImV4cG9ydCBmdW5jdGlvbiBnZW5lcmljTG9jYWxRdWVyeTxUPihrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlOiAoKSA9PiBUKTogU3RvcmFnZVF1ZXJ5PFQ+IHtcbiAgICByZXR1cm4gbmV3IFN0b3JhZ2VRdWVyeTxUPihrZXksIGRlZmF1bHRWYWx1ZSwgbG9jYWxTdG9yYWdlKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyaWNDYWNoZWRMb2NhbFF1ZXJ5PFQ+KGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6ICgpID0+IFQpOiBDYWNoZWRTdG9yYWdlUXVlcnk8VD4ge1xuICAgIHJldHVybiBuZXcgQ2FjaGVkU3RvcmFnZVF1ZXJ5PFQ+KGdlbmVyaWNMb2NhbFF1ZXJ5PFQ+KGtleSwgZGVmYXVsdFZhbHVlKSk7XG59XG5cbi8qKlxuICogU3RvcmFnZSBJTyBvcGVyYXRpb25zIGluIEpTT04gZm9ybWF0LlxuICovXG5jbGFzcyBTdG9yYWdlUXVlcnk8VD4ge1xuICAgIHByaXZhdGUgcmVhZG9ubHkga2V5OiBzdHJpbmdcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlZmF1bHRWYWx1ZVN1cHBsaWVyOiAoKSA9PiBUO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc3RvcmFnZTogU3RvcmFnZTtcblxuICAgIGNvbnN0cnVjdG9yKGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWVTdXBwbGllcjogKCkgPT4gVCwgc3RvcmFnZTogU3RvcmFnZSkge1xuICAgICAgICB0aGlzLmtleSA9IGtleVxuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZVN1cHBsaWVyID0gZGVmYXVsdFZhbHVlU3VwcGxpZXI7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgfVxuXG4gICAgZ2V0KCk6IFQge1xuICAgICAgICBjb25zdCBzdG9yZWRWYWx1ZSA9IHRoaXMuc3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KTtcbiAgICAgICAgaWYgKHN0b3JlZFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZVN1cHBsaWVyKCk7XG4gICAgICAgICAgICB0aGlzLnNldChkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RvcmVkVmFsdWUpO1xuICAgIH1cbiAgICBzZXQodmFsdWU6IFQpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0odGhpcy5rZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSlcbiAgICB9XG4gICAgc2V0Q2FsbGJhY2soc3RvcmVDYWxsYmFjazogKHZhbHVlOiBUKSA9PiB2b2lkKSB7XG4gICAgICAgIGNvbnN0IHN0b3JlZFZhbCA9IHRoaXMuZ2V0KClcbiAgICAgICAgc3RvcmVDYWxsYmFjayhzdG9yZWRWYWwpXG4gICAgICAgIHRoaXMuc2V0KHN0b3JlZFZhbClcbiAgICB9XG4gICAgZXhpc3QoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbSh0aGlzLmtleSkgIT0gbnVsbFxuICAgIH1cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMua2V5KTtcbiAgICB9XG59XG5cbmNsYXNzIENhY2hlZFN0b3JhZ2VRdWVyeTxUPiB7XG4gICAgdmFsdWU6IFQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSBxdWVyeTogU3RvcmFnZVF1ZXJ5PFQ+O1xuXG4gICAgY29uc3RydWN0b3IocXVlcnk6IFN0b3JhZ2VRdWVyeTxUPikge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBxdWVyeS5nZXQoKTtcbiAgICB9XG5cbiAgICBzdG9yZShzdG9yZUNhbGxiYWNrOiAodmFsdWU6IFQpID0+IHZvaWQgPSAodmFsdWU6IFQpID0+IHt9KSB7XG4gICAgICAgIHN0b3JlQ2FsbGJhY2sodGhpcy52YWx1ZSlcbiAgICAgICAgdGhpcy5xdWVyeS5zZXQodGhpcy52YWx1ZSlcbiAgICB9XG4gICAgcmVtb3ZlKCkge1xuICAgICAgICB0aGlzLnF1ZXJ5LnJlbW92ZSgpO1xuICAgIH1cbiAgICBmb3JjZVJlZnJlc2goKTogVCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnF1ZXJ5LmdldCgpO1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICB9XG59IiwiaW1wb3J0IHtBcm15LCBCdWlsZGluZ1R5cGUsIFJlc291cmNlcywgVW5pdFR5cGVzfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgQnVpbGRpbmdDb25maWdEYXRhLCBmZXRjaFdvcmxkQ29uZmlnRGF0YSwgTmlnaHRCb251c0NvbmZpZ0RhdGEsIFdvcmxkQ29uZmlnRGF0YSB9IGZyb20gXCIuL3dvcmxkLWNvbmZpZ1wiO1xuaW1wb3J0IHtnZW5lcmljQ2FjaGVkTG9jYWxRdWVyeX0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5kZWNsYXJlIHZhciBnYW1lX2RhdGE6IGFueTtcblxuY2xhc3MgVW5pdHNDb25maWcge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnID0gbmV3IE1hcDxVbml0VHlwZXMsIFVuaXRDb25maWc+KClcbiAgICByZWFkb25seSBpbkdhbWVVbml0cyA9IEFycmF5PFVuaXRUeXBlcz4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHVuaXRzOiBNYXA8VW5pdFR5cGVzLCBVbml0Q29uZmlnPikge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHVuaXRzO1xuICAgICAgICB0aGlzLmluR2FtZVVuaXRzID0gT2JqZWN0LnZhbHVlcyhVbml0VHlwZXMpLmZpbHRlcih1bml0TmFtZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdW5pdHMuZ2V0KHVuaXROYW1lKS5pbkdhbWVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB1bml0KG5hbWU6IFVuaXRUeXBlcyk6IFVuaXRDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0KG5hbWUpXG4gICAgfVxuXG4gICAgYXJteUNvc3QoYXJteTogQXJteSk6IFJlc291cmNlcyB7XG4gICAgICAgIGNvbnN0IHJlc291cmNlcyA9IFJlc291cmNlcy56ZXJvKCk7XG4gICAgICAgIHRoaXMuaW5HYW1lVW5pdHMuZm9yRWFjaCh1bml0TmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgdW5pdENmZyA9IFVuaXRzQ29uZmlnLnVuaXRzQ29uZmlnLmdldCh1bml0TmFtZSk7XG4gICAgICAgICAgICBjb25zdCB1bml0Q291bnQgPSBhcm15LnVuaXRzKHVuaXROYW1lKTtcbiAgICAgICAgICAgIHJlc291cmNlcy53b29kICs9IHVuaXRDb3VudCAqIHVuaXRDZmcucmVjcnVpdC53b29kO1xuICAgICAgICAgICAgcmVzb3VyY2VzLnN0b25lICs9IHVuaXRDb3VudCAqIHVuaXRDZmcucmVjcnVpdC5zdG9uZTtcbiAgICAgICAgICAgIHJlc291cmNlcy5pcm9uICs9IHVuaXRDb3VudCAqIHVuaXRDZmcucmVjcnVpdC5pcm9uO1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiByZXNvdXJjZXM7XG4gICAgfVxuXG4gICAgYXR0YWNrZXJLaWxsU2NvcmUoYXJteTogQXJteSk6IG51bWJlciB7XG4gICAgICAgIGxldCBraWxsU2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmluR2FtZVVuaXRzLmZvckVhY2godW5pdE5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IHVuaXRDZmcgPSBVbml0c0NvbmZpZy51bml0c0NvbmZpZy5nZXQodW5pdE5hbWUpO1xuICAgICAgICAgICAgY29uc3QgdW5pdENvdW50ID0gYXJteS51bml0cyh1bml0TmFtZSk7XG4gICAgICAgICAgICBraWxsU2NvcmUgKz0gdW5pdENmZy5raWxsU2NvcmUuYXNBdHRhY2tlciAqIHVuaXRDb3VudDtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4ga2lsbFNjb3JlO1xuICAgIH1cblxuICAgIGRlZmVuZGVyS2lsbFNjb3JlKGFybXk6IEFybXkpOiBudW1iZXIge1xuICAgICAgICBsZXQga2lsbFNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5pbkdhbWVVbml0cy5mb3JFYWNoKHVuaXROYW1lID0+IHtcbiAgICAgICAgICAgIGxldCB1bml0Q2ZnID0gVW5pdHNDb25maWcudW5pdHNDb25maWcuZ2V0KHVuaXROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHVuaXRDb3VudCA9IGFybXkudW5pdHModW5pdE5hbWUpO1xuICAgICAgICAgICAga2lsbFNjb3JlICs9IHVuaXRDZmcua2lsbFNjb3JlLmFzRGVmZW5kZXIgKiB1bml0Q291bnQ7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIGtpbGxTY29yZTtcbiAgICB9XG5cbiAgICBwb3B1bGF0aW9uKGFybXk6IEFybXkpOiBudW1iZXIge1xuICAgICAgICBsZXQgcG9wdWxhdGlvbiA9IDA7XG5cbiAgICAgICAgdGhpcy5pbkdhbWVVbml0cy5mb3JFYWNoKHVuaXROYW1lID0+IHtcbiAgICAgICAgICAgIGxldCB1bml0Q2ZnID0gVW5pdHNDb25maWcudW5pdHNDb25maWcuZ2V0KHVuaXROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHVuaXRDb3VudCA9IGFybXkudW5pdHModW5pdE5hbWUpO1xuICAgICAgICAgICAgcG9wdWxhdGlvbiArPSB1bml0Q2ZnLnBvcHVsYXRpb24gKiB1bml0Q291bnQ7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHBvcHVsYXRpb247XG4gICAgfVxuXG4gICAgc3RhdGljIHVuaXRzQ29uZmlnID0gbmV3IE1hcDxVbml0VHlwZXMsIFN0YXRpY1VuaXRDb25maWc+KFtcbiAgICAgICAgW1VuaXRUeXBlcy5TUEVBUiwge1xuICAgICAgICAgICAgcmVjcnVpdDogbmV3IFJlc291cmNlcyh7d29vZDogNTAsIHN0b25lOiAzMCwgaXJvbjogMTB9KSxcbiAgICAgICAgICAgIGtpbGxTY29yZToge1xuICAgICAgICAgICAgICAgIGFzQXR0YWNrZXI6IDQsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDFcbiAgICAgICAgfV0sXG4gICAgICAgIFtVbml0VHlwZXMuU1dPUkQsIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDMwLCBzdG9uZTogMzAsIGlyb246IDcwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiA1LFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiAxXG4gICAgICAgIH1dLFxuICAgICAgICBbVW5pdFR5cGVzLkFYRSwge1xuICAgICAgICAgICAgcmVjcnVpdDogbmV3IFJlc291cmNlcyh7d29vZDogNjAsIHN0b25lOiAzMCwgaXJvbjogNDB9KSxcbiAgICAgICAgICAgIGtpbGxTY29yZToge1xuICAgICAgICAgICAgICAgIGFzQXR0YWNrZXI6IDEsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDFcbiAgICAgICAgfV0sXG4gICAgICAgIFtVbml0VHlwZXMuQVJDSEVSLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiAxMDAsIHN0b25lOiAzMCwgaXJvbjogNjB9KSxcbiAgICAgICAgICAgIGtpbGxTY29yZToge1xuICAgICAgICAgICAgICAgIGFzQXR0YWNrZXI6IDUsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDFcbiAgICAgICAgfV0sXG4gICAgICAgIFtVbml0VHlwZXMuU1BZLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiA1MCwgc3RvbmU6IDUwLCBpcm9uOiAyMH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogMSxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMlxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5MSUdIVCwge1xuICAgICAgICAgICAgcmVjcnVpdDogbmV3IFJlc291cmNlcyh7d29vZDogMTI1LCBzdG9uZTogMTAwLCBpcm9uOiAyNTB9KSxcbiAgICAgICAgICAgIGtpbGxTY29yZToge1xuICAgICAgICAgICAgICAgIGFzQXR0YWNrZXI6IDUsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogMTNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiA0XG4gICAgICAgIH1dLFxuICAgICAgICBbVW5pdFR5cGVzLk1PVU5URURfQVJDSEVSLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiAyNTAsIHN0b25lOiAxMDAsIGlyb246IDE1MH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogNixcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiAxMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDVcbiAgICAgICAgfV0sXG4gICAgICAgIFtVbml0VHlwZXMuSEVBVlksIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDIwMCwgc3RvbmU6IDE1MCwgaXJvbjogNjAwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiAyMyxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiAxNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDZcbiAgICAgICAgfV0sXG4gICAgICAgIFtVbml0VHlwZXMuUkFNLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiAzMDAsIHN0b25lOiAyMDAsIGlyb246IDIwMH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogNCxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiA4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogNVxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5DQVRBUFVMVCwge1xuICAgICAgICAgICAgcmVjcnVpdDogbmV3IFJlc291cmNlcyh7d29vZDogMzIwLCBzdG9uZTogNDAwLCBpcm9uOiAxMDB9KSxcbiAgICAgICAgICAgIGtpbGxTY29yZToge1xuICAgICAgICAgICAgICAgIGFzQXR0YWNrZXI6IDEyLFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDEwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogOFxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5QQUxBRElOLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiAyMCwgc3RvbmU6IDIwLCBpcm9uOiA0MH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogNDAsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogMjBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiAxMFxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5TTk9CLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiA0MDAwMCwgc3RvbmU6IDUwMDAwLCBpcm9uOiA1MDAwMH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogMjAwLFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDIwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDEwMFxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5NSUxJVElBLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiAwLCBzdG9uZTogMCwgaXJvbjogMH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogMSxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiA0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMFxuICAgICAgICB9XSxcbiAgICBdKVxufVxuXG5jbGFzcyBTdGF0aWNVbml0Q29uZmlnIHtcbiAgICByZWFkb25seSByZWNydWl0OiBSZXNvdXJjZXM7XG4gICAgcmVhZG9ubHkgcG9wdWxhdGlvbjogbnVtYmVyO1xuICAgIHJlYWRvbmx5IGtpbGxTY29yZToge1xuICAgICAgICBhc0RlZmVuZGVyOiBudW1iZXIsXG4gICAgICAgIGFzQXR0YWNrZXI6IG51bWJlcjtcbiAgICB9O1xufVxuXG5jbGFzcyBCdWlsZGluZ3NDb25maWcge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYnVpbGRpbmdzQ29uZmlnOiBNYXA8QnVpbGRpbmdUeXBlLCBCdWlsZGluZ0NvbmZpZz47XG5cbiAgICBjb25zdHJ1Y3RvcihidWlsZGluZ3NDb25maWc6IE1hcDxCdWlsZGluZ1R5cGUsIEJ1aWxkaW5nQ29uZmlnPikge1xuICAgICAgICB0aGlzLmJ1aWxkaW5nc0NvbmZpZyA9IGJ1aWxkaW5nc0NvbmZpZztcbiAgICB9XG5cbiAgICB0eXBlKHR5cGU6IEJ1aWxkaW5nVHlwZSk6IEJ1aWxkaW5nQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRpbmdzQ29uZmlnLmdldCh0eXBlKTtcbiAgICB9XG59XG5cbmNsYXNzIEJ1aWxkaW5nQ29uZmlnIHtcbiAgICByZWFkb25seSBkYXRhOiBCdWlsZGluZ0NvbmZpZ0RhdGE7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBCdWlsZGluZ0NvbmZpZ0RhdGEpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICBjb3N0QmV0d2VlbkxldmVscyhzdGFydExldmVsOiBudW1iZXIsIGVuZExldmVsOiBudW1iZXIpOiBSZXNvdXJjZXMge1xuICAgICAgICBjb25zdCBsb3dlckxldmVsID0gTWF0aC5taW4oc3RhcnRMZXZlbCwgZW5kTGV2ZWwpO1xuICAgICAgICBjb25zdCBoaWdoZXJMZXZlbCA9IE1hdGgubWF4KHN0YXJ0TGV2ZWwsIGVuZExldmVsKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXNvdXJjZXMoe1xuICAgICAgICAgICAgd29vZDogQnVpbGRpbmdDb25maWcuY29zdCh0aGlzLmRhdGEuc3RhcnRQcmljZS53b29kLCB0aGlzLmRhdGEucmVzb3VyY2VGYWN0b3Iud29vZCwgbG93ZXJMZXZlbCwgaGlnaGVyTGV2ZWwpLFxuICAgICAgICAgICAgc3RvbmU6IEJ1aWxkaW5nQ29uZmlnLmNvc3QodGhpcy5kYXRhLnN0YXJ0UHJpY2Uuc3RvbmUsIHRoaXMuZGF0YS5yZXNvdXJjZUZhY3Rvci5zdG9uZSwgbG93ZXJMZXZlbCwgaGlnaGVyTGV2ZWwpLFxuICAgICAgICAgICAgaXJvbjogQnVpbGRpbmdDb25maWcuY29zdCh0aGlzLmRhdGEuc3RhcnRQcmljZS5pcm9uLCB0aGlzLmRhdGEucmVzb3VyY2VGYWN0b3IuaXJvbiwgbG93ZXJMZXZlbCwgaGlnaGVyTGV2ZWwpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGNvc3Qoc3RhcnRQcmljZTogbnVtYmVyLCBmYWN0b3I6IG51bWJlciwgbG93ZXJMZXZlbDogbnVtYmVyLCBoaWdoZXJMZXZlbDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGZhY3RvclN0YXJ0TGV2ZWwgPSBNYXRoLnBvdyhmYWN0b3IsIGxvd2VyTGV2ZWwpO1xuICAgICAgICBsZXQgcHJpY2UgPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGxldmVsID0gbG93ZXJMZXZlbDsgbGV2ZWwgPCBoaWdoZXJMZXZlbDsgbGV2ZWwrKykge1xuICAgICAgICAgICAgcHJpY2UgKz0gZmFjdG9yU3RhcnRMZXZlbCAqIHN0YXJ0UHJpY2U7XG4gICAgICAgICAgICBmYWN0b3JTdGFydExldmVsICo9IGZhY3RvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwocHJpY2UpXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgV29ybGRDb25maWcge1xuICAgIHJlYWRvbmx5IHVuaXRzOiBVbml0c0NvbmZpZ1xuICAgIHJlYWRvbmx5IGJ1aWxkaW5nczogQnVpbGRpbmdzQ29uZmlnXG4gICAgcmVhZG9ubHkgbmlnaHQ6IE5pZ2h0Qm9udXNDb25maWdEYXRhXG59XG5cbmludGVyZmFjZSBVbml0Q29uZmlnIHtcbiAgICBpbkdhbWU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogUmV0cmlldmUgY29uZmlnIGZvciBjdXJyZW50IHdvcmxkLiBEb3dubG9hZCBvbmNlIGFuZCBjYWNoZSByZXN1bHRzIHBlciBnYW1lIHdvcmxkLlxuICovXG5mdW5jdGlvbiBsb2FkV29ybGRDb25maWcoKTogV29ybGRDb25maWcge1xuICAgIGNvbnN0IHF1ZXJ5ID0gZ2VuZXJpY0NhY2hlZExvY2FsUXVlcnk8eyBleHBpcmVBdDogbnVtYmVyLCBjb25maWc6IFdvcmxkQ29uZmlnRGF0YSB9PihgJHtnYW1lX2RhdGEud29ybGR9LXB1YldvcmxkQ29uZmlnX3YxYCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXhwaXJlQXQ6IG5vdy5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKSArIDI0KSxcbiAgICAgICAgICAgIGNvbmZpZzogZmV0Y2hXb3JsZENvbmZpZ0RhdGEoKVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgbGV0IGNmZyA9IHF1ZXJ5LnZhbHVlXG4gICAgaWYgKGNmZy5leHBpcmVBdCA+IERhdGUubm93KCkpIHtcbiAgICAgICAgcXVlcnkucmVtb3ZlKCk7XG4gICAgICAgIGNmZyA9IHF1ZXJ5LmZvcmNlUmVmcmVzaCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHVuaXRzID0gbmV3IE1hcDxVbml0VHlwZXMsIFVuaXRDb25maWc+KCk7XG4gICAgY2ZnLmNvbmZpZy51bml0cy5mb3JFYWNoKHVuaXRDZmcgPT4ge1xuICAgICAgICB1bml0cy5zZXQodW5pdENmZy5uYW1lLCB7XG4gICAgICAgICAgICBpbkdhbWU6IHVuaXRDZmcuaW5HYW1lXG4gICAgICAgIH0pO1xuICAgIH0pXG4gICAgY29uc3QgYnVpbGRpbmdzID0gbmV3IE1hcDxCdWlsZGluZ1R5cGUsIEJ1aWxkaW5nQ29uZmlnPigpO1xuICAgIGNmZy5jb25maWcuYnVpbGRpbmdzLmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgIGJ1aWxkaW5ncy5zZXQoZGF0YS5idWlsZGluZ1R5cGUsIG5ldyBCdWlsZGluZ0NvbmZpZyhkYXRhKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdW5pdHM6IG5ldyBVbml0c0NvbmZpZyh1bml0cyksXG4gICAgICAgIGJ1aWxkaW5nczogbmV3IEJ1aWxkaW5nc0NvbmZpZyhidWlsZGluZ3MpLFxuICAgICAgICBuaWdodDogY2ZnLmNvbmZpZy5uaWdodFxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBsb2FkV29ybGRDb25maWcsXG4gICAgV29ybGRDb25maWdcbn0iLCJpbXBvcnQge3BhcnNlU3RyaW5nfSBmcm9tIFwieG1sMmpzXCI7XG5pbXBvcnQge0J1aWxkaW5nVHlwZSwgUmVzb3VyY2VzRGF0YSwgVW5pdFR5cGVzfSBmcm9tIFwiLi9tb2RlbFwiO1xuXG5kZWNsYXJlIHZhciBnYW1lX2RhdGE6IGFueTtcbmRlY2xhcmUgdmFyIFVJOiBhbnk7XG5cbi8vdG9kbyByZXdyaXRlIHRob3NlIGZldGNoZXMgdG8gYXN5bmMgKyByZXR1cm4gcHJvbWlzZVxuZnVuY3Rpb24gZmV0Y2hVbml0c0NvbmZpZygpOiBBcnJheTxVbml0Q29uZmlnRGF0YT4ge1xuICAgIGNvbnN0IGNmZyA9IEFycmF5PFVuaXRDb25maWdEYXRhPigpO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCIvaW50ZXJmYWNlLnBocD9mdW5jPWdldF91bml0X2luZm9cIiwgdHlwZTogXCJnZXRcIiwgYXN5bmM6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogWE1MRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHBhcnNlU3RyaW5nKG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoZGF0YSksIHtcbiAgICAgICAgICAgICAgICBleHBsaWNpdEFycmF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBub3JtYWxpemU6IHRydWVcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgcmVzdWx0OiBhbnkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB1bml0TmFtZSBvZiBPYmplY3Qua2V5cyhVbml0VHlwZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuaXROYW1lTG93ZXIgPSB1bml0TmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1bml0SW5nYW1lID0gZ2FtZV9kYXRhLnVuaXRzLmluY2x1ZGVzKHVuaXROYW1lTG93ZXIpO1xuICAgICAgICAgICAgICAgICAgICBjZmcucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbkdhbWU6IHVuaXRJbmdhbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBVbml0VHlwZXNbdW5pdE5hbWVdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBVSS5FcnJvck1lc3NhZ2UoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGRvd25sb2FkaW5nIGRhdGEuIFJlZnJlc2ggdGhlIHBhZ2UgdG8gdHJ5IGFnYWluJywgNTAwMCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludGVycnVwdGVkIHNjcmlwdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2ZnO1xufVxuXG5mdW5jdGlvbiBmZXRjaEJ1aWxkaW5nQ29uZmlnKCk6IEFycmF5PEJ1aWxkaW5nQ29uZmlnRGF0YT4ge1xuICAgIGxldCBjZmc6IEFycmF5PEJ1aWxkaW5nQ29uZmlnRGF0YT4gPSBbXTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2ludGVyZmFjZS5waHA/ZnVuYz1nZXRfYnVpbGRpbmdfaW5mb1wiLCB0eXBlOiBcImdldFwiLCBhc3luYzogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBYTUxEb2N1bWVudCkge1xuICAgICAgICAgICAgcGFyc2VTdHJpbmcobmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZyhkYXRhKSwge1xuICAgICAgICAgICAgICAgIGV4cGxpY2l0QXJyYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZTogdHJ1ZVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycjogYW55LCByZXN1bHQ6IGFueSkge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSByZXN1bHQuY29uZmlnO1xuICAgICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMoQnVpbGRpbmdUeXBlKS5mb3JFYWNoKGJ1aWxkaW5nVHlwZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkoYnVpbGRpbmdUeXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJ1aWxkaW5nQ29uZmlnID0gY29uZmlnW2J1aWxkaW5nVHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjZmcucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VGYWN0b3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29vZDogcGFyc2VGbG9hdChidWlsZGluZ0NvbmZpZy53b29kX2ZhY3RvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b25lOiBwYXJzZUZsb2F0KGJ1aWxkaW5nQ29uZmlnLnN0b25lX2ZhY3RvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlyb246IHBhcnNlRmxvYXQoYnVpbGRpbmdDb25maWcuaXJvbl9mYWN0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ1R5cGU6IGJ1aWxkaW5nVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFByaWNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdvb2Q6IHBhcnNlSW50KGJ1aWxkaW5nQ29uZmlnLndvb2QpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9uZTogcGFyc2VJbnQoYnVpbGRpbmdDb25maWcuc3RvbmUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpcm9uOiBwYXJzZUludChidWlsZGluZ0NvbmZpZy5pcm9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQb3B1bGF0aW9uOiBwYXJzZUludChidWlsZGluZ0NvbmZpZy5wb3ApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVsYXRpb25GYWN0b3I6IHBhcnNlSW50KGJ1aWxkaW5nQ29uZmlnLnBvcF9mYWN0b3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkxldmVsOiBwYXJzZUludChidWlsZGluZ0NvbmZpZy5taW5fbGV2ZWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heExldmVsOiBwYXJzZUludChidWlsZGluZ0NvbmZpZy5tYXhfbGV2ZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBVSS5FcnJvck1lc3NhZ2UoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGRvd25sb2FkaW5nIGRhdGEuIFJlZnJlc2ggdGhlIHBhZ2UgdG8gdHJ5IGFnYWluJywgNTAwMCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludGVycnVwdGVkIHNjcmlwdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2ZnO1xufVxuXG5cbmZ1bmN0aW9uIGZldGNoV29ybGRDb25maWcoKTogTmlnaHRCb251c0NvbmZpZ0RhdGEge1xuICAgIGxldCBuaWdodEJvbnVzQ2ZnOiBOaWdodEJvbnVzQ29uZmlnRGF0YTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IFwiL2ludGVyZmFjZS5waHA/ZnVuYz1nZXRfY29uZmlnXCIsIHR5cGU6IFwiZ2V0XCIsIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFhNTERvY3VtZW50KSB7XG4gICAgICAgICAgICBwYXJzZVN0cmluZyhuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKGRhdGEpLCB7XG4gICAgICAgICAgICAgICAgZXhwbGljaXRBcnJheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplOiB0cnVlXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgICAgICAgbGV0IHhtbENmZyA9IHJlc3VsdC5jb25maWdcbiAgICAgICAgICAgICAgICBsZXQgbmlnaHQgPSB4bWxDZmcubmlnaHQ7XG4gICAgICAgICAgICAgICAgbmlnaHRCb251c0NmZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBuaWdodC5hY3RpdmUgPT09IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICBzdGFydDogcGFyc2VJbnQobmlnaHQuc3RhcnRfaG91cikgJSAyNCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBwYXJzZUludChuaWdodC5lbmRfaG91cikgJSAyNFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIGVycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBVSS5FcnJvck1lc3NhZ2UoJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGRvd25sb2FkaW5nIGRhdGEuIFJlZnJlc2ggdGhlIHBhZ2UgdG8gdHJ5IGFnYWluJywgNTAwMCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludGVycnVwdGVkIHNjcmlwdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmlnaHRCb251c0NmZztcbn1cblxuaW50ZXJmYWNlIFVuaXRDb25maWdEYXRhIHtcbiAgICBuYW1lOiBVbml0VHlwZXMsXG4gICAgaW5HYW1lOiBib29sZWFuXG59XG5cbmludGVyZmFjZSBXb3JsZENvbmZpZ0RhdGEge1xuICAgIG5pZ2h0OiBOaWdodEJvbnVzQ29uZmlnRGF0YSxcbiAgICB1bml0czogQXJyYXk8VW5pdENvbmZpZ0RhdGE+LFxuICAgIGJ1aWxkaW5nczogQXJyYXk8QnVpbGRpbmdDb25maWdEYXRhPlxufVxuXG5pbnRlcmZhY2UgQnVpbGRpbmdDb25maWdEYXRhIHtcbiAgICBidWlsZGluZ1R5cGU6IEJ1aWxkaW5nVHlwZTtcbiAgICBzdGFydFByaWNlOiBSZXNvdXJjZXNEYXRhO1xuICAgIHN0YXJ0UG9wdWxhdGlvbjogbnVtYmVyO1xuICAgIHBvcHVsYXRpb25GYWN0b3I6IG51bWJlcjtcbiAgICByZXNvdXJjZUZhY3RvcjogUmVzb3VyY2VzRGF0YTtcbiAgICBtaW5MZXZlbDogbnVtYmVyO1xuICAgIG1heExldmVsOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBOaWdodEJvbnVzQ29uZmlnRGF0YSB7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbiAgICBhY3RpdmU6IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIGZldGNoV29ybGRDb25maWdEYXRhKCk6IFdvcmxkQ29uZmlnRGF0YSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdW5pdHM6IGZldGNoVW5pdHNDb25maWcoKSxcbiAgICAgICAgYnVpbGRpbmdzOiBmZXRjaEJ1aWxkaW5nQ29uZmlnKCksXG4gICAgICAgIG5pZ2h0OiBmZXRjaFdvcmxkQ29uZmlnKClcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgZmV0Y2hXb3JsZENvbmZpZ0RhdGEsXG4gICAgV29ybGRDb25maWdEYXRhLFxuICAgIEJ1aWxkaW5nQ29uZmlnRGF0YSxcbiAgICBOaWdodEJvbnVzQ29uZmlnRGF0YVxufSIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBleHBvcnRzLnN0cmlwQk9NID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKHN0clswXSA9PT0gJ1xcdUZFRkYnKSB7XG4gICAgICByZXR1cm4gc3RyLnN1YnN0cmluZygxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH07XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyIGJ1aWxkZXIsIGRlZmF1bHRzLCBlc2NhcGVDREFUQSwgcmVxdWlyZXNDREFUQSwgd3JhcENEQVRBLFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBidWlsZGVyID0gcmVxdWlyZSgneG1sYnVpbGRlcicpO1xuXG4gIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpLmRlZmF1bHRzO1xuXG4gIHJlcXVpcmVzQ0RBVEEgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHJldHVybiB0eXBlb2YgZW50cnkgPT09IFwic3RyaW5nXCIgJiYgKGVudHJ5LmluZGV4T2YoJyYnKSA+PSAwIHx8IGVudHJ5LmluZGV4T2YoJz4nKSA+PSAwIHx8IGVudHJ5LmluZGV4T2YoJzwnKSA+PSAwKTtcbiAgfTtcblxuICB3cmFwQ0RBVEEgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHJldHVybiBcIjwhW0NEQVRBW1wiICsgKGVzY2FwZUNEQVRBKGVudHJ5KSkgKyBcIl1dPlwiO1xuICB9O1xuXG4gIGVzY2FwZUNEQVRBID0gZnVuY3Rpb24oZW50cnkpIHtcbiAgICByZXR1cm4gZW50cnkucmVwbGFjZSgnXV0+JywgJ11dXV0+PCFbQ0RBVEFbPicpO1xuICB9O1xuXG4gIGV4cG9ydHMuQnVpbGRlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBCdWlsZGVyKG9wdHMpIHtcbiAgICAgIHZhciBrZXksIHJlZiwgdmFsdWU7XG4gICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICAgIHJlZiA9IGRlZmF1bHRzW1wiMC4yXCJdO1xuICAgICAgZm9yIChrZXkgaW4gcmVmKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZiwga2V5KSkgY29udGludWU7XG4gICAgICAgIHZhbHVlID0gcmVmW2tleV07XG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBmb3IgKGtleSBpbiBvcHRzKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKG9wdHMsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IG9wdHNba2V5XTtcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBCdWlsZGVyLnByb3RvdHlwZS5idWlsZE9iamVjdCA9IGZ1bmN0aW9uKHJvb3RPYmopIHtcbiAgICAgIHZhciBhdHRya2V5LCBjaGFya2V5LCByZW5kZXIsIHJvb3RFbGVtZW50LCByb290TmFtZTtcbiAgICAgIGF0dHJrZXkgPSB0aGlzLm9wdGlvbnMuYXR0cmtleTtcbiAgICAgIGNoYXJrZXkgPSB0aGlzLm9wdGlvbnMuY2hhcmtleTtcbiAgICAgIGlmICgoT2JqZWN0LmtleXMocm9vdE9iaikubGVuZ3RoID09PSAxKSAmJiAodGhpcy5vcHRpb25zLnJvb3ROYW1lID09PSBkZWZhdWx0c1snMC4yJ10ucm9vdE5hbWUpKSB7XG4gICAgICAgIHJvb3ROYW1lID0gT2JqZWN0LmtleXMocm9vdE9iailbMF07XG4gICAgICAgIHJvb3RPYmogPSByb290T2JqW3Jvb3ROYW1lXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3ROYW1lID0gdGhpcy5vcHRpb25zLnJvb3ROYW1lO1xuICAgICAgfVxuICAgICAgcmVuZGVyID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlbGVtZW50LCBvYmopIHtcbiAgICAgICAgICB2YXIgYXR0ciwgY2hpbGQsIGVudHJ5LCBpbmRleCwga2V5LCB2YWx1ZTtcbiAgICAgICAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmNkYXRhICYmIHJlcXVpcmVzQ0RBVEEob2JqKSkge1xuICAgICAgICAgICAgICBlbGVtZW50LnJhdyh3cmFwQ0RBVEEob2JqKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LnR4dChvYmopO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBmb3IgKGluZGV4IGluIG9iaikge1xuICAgICAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChvYmosIGluZGV4KSkgY29udGludWU7XG4gICAgICAgICAgICAgIGNoaWxkID0gb2JqW2luZGV4XTtcbiAgICAgICAgICAgICAgZm9yIChrZXkgaW4gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICBlbnRyeSA9IGNoaWxkW2tleV07XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IHJlbmRlcihlbGVtZW50LmVsZShrZXkpLCBlbnRyeSkudXAoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwob2JqLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2hpbGQgPSBvYmpba2V5XTtcbiAgICAgICAgICAgICAgaWYgKGtleSA9PT0gYXR0cmtleSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgIGZvciAoYXR0ciBpbiBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNoaWxkW2F0dHJdO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5hdHQoYXR0ciwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IGNoYXJrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5jZGF0YSAmJiByZXF1aXJlc0NEQVRBKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucmF3KHdyYXBDREFUQShjaGlsZCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC50eHQoY2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkge1xuICAgICAgICAgICAgICAgIGZvciAoaW5kZXggaW4gY2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKGNoaWxkLCBpbmRleCkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgZW50cnkgPSBjaGlsZFtpbmRleF07XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudHJ5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5jZGF0YSAmJiByZXF1aXJlc0NEQVRBKGVudHJ5KSkge1xuICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmVsZShrZXkpLnJhdyh3cmFwQ0RBVEEoZW50cnkpKS51cCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmVsZShrZXksIGVudHJ5KS51cCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gcmVuZGVyKGVsZW1lbnQuZWxlKGtleSksIGVudHJ5KS51cCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcmVuZGVyKGVsZW1lbnQuZWxlKGtleSksIGNoaWxkKS51cCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnICYmIF90aGlzLm9wdGlvbnMuY2RhdGEgJiYgcmVxdWlyZXNDREFUQShjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmVsZShrZXkpLnJhdyh3cmFwQ0RBVEEoY2hpbGQpKS51cCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZCA9ICcnO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuZWxlKGtleSwgY2hpbGQudG9TdHJpbmcoKSkudXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIHJvb3RFbGVtZW50ID0gYnVpbGRlci5jcmVhdGUocm9vdE5hbWUsIHRoaXMub3B0aW9ucy54bWxkZWMsIHRoaXMub3B0aW9ucy5kb2N0eXBlLCB7XG4gICAgICAgIGhlYWRsZXNzOiB0aGlzLm9wdGlvbnMuaGVhZGxlc3MsXG4gICAgICAgIGFsbG93U3Vycm9nYXRlQ2hhcnM6IHRoaXMub3B0aW9ucy5hbGxvd1N1cnJvZ2F0ZUNoYXJzXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZW5kZXIocm9vdEVsZW1lbnQsIHJvb3RPYmopLmVuZCh0aGlzLm9wdGlvbnMucmVuZGVyT3B0cyk7XG4gICAgfTtcblxuICAgIHJldHVybiBCdWlsZGVyO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICBleHBvcnRzLmRlZmF1bHRzID0ge1xuICAgIFwiMC4xXCI6IHtcbiAgICAgIGV4cGxpY2l0Q2hhcmtleTogZmFsc2UsXG4gICAgICB0cmltOiB0cnVlLFxuICAgICAgbm9ybWFsaXplOiB0cnVlLFxuICAgICAgbm9ybWFsaXplVGFnczogZmFsc2UsXG4gICAgICBhdHRya2V5OiBcIkBcIixcbiAgICAgIGNoYXJrZXk6IFwiI1wiLFxuICAgICAgZXhwbGljaXRBcnJheTogZmFsc2UsXG4gICAgICBpZ25vcmVBdHRyczogZmFsc2UsXG4gICAgICBtZXJnZUF0dHJzOiBmYWxzZSxcbiAgICAgIGV4cGxpY2l0Um9vdDogZmFsc2UsXG4gICAgICB2YWxpZGF0b3I6IG51bGwsXG4gICAgICB4bWxuczogZmFsc2UsXG4gICAgICBleHBsaWNpdENoaWxkcmVuOiBmYWxzZSxcbiAgICAgIGNoaWxka2V5OiAnQEAnLFxuICAgICAgY2hhcnNBc0NoaWxkcmVuOiBmYWxzZSxcbiAgICAgIGluY2x1ZGVXaGl0ZUNoYXJzOiBmYWxzZSxcbiAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgIHN0cmljdDogdHJ1ZSxcbiAgICAgIGF0dHJOYW1lUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIGF0dHJWYWx1ZVByb2Nlc3NvcnM6IG51bGwsXG4gICAgICB0YWdOYW1lUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIHZhbHVlUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIGVtcHR5VGFnOiAnJ1xuICAgIH0sXG4gICAgXCIwLjJcIjoge1xuICAgICAgZXhwbGljaXRDaGFya2V5OiBmYWxzZSxcbiAgICAgIHRyaW06IGZhbHNlLFxuICAgICAgbm9ybWFsaXplOiBmYWxzZSxcbiAgICAgIG5vcm1hbGl6ZVRhZ3M6IGZhbHNlLFxuICAgICAgYXR0cmtleTogXCIkXCIsXG4gICAgICBjaGFya2V5OiBcIl9cIixcbiAgICAgIGV4cGxpY2l0QXJyYXk6IHRydWUsXG4gICAgICBpZ25vcmVBdHRyczogZmFsc2UsXG4gICAgICBtZXJnZUF0dHJzOiBmYWxzZSxcbiAgICAgIGV4cGxpY2l0Um9vdDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRvcjogbnVsbCxcbiAgICAgIHhtbG5zOiBmYWxzZSxcbiAgICAgIGV4cGxpY2l0Q2hpbGRyZW46IGZhbHNlLFxuICAgICAgcHJlc2VydmVDaGlsZHJlbk9yZGVyOiBmYWxzZSxcbiAgICAgIGNoaWxka2V5OiAnJCQnLFxuICAgICAgY2hhcnNBc0NoaWxkcmVuOiBmYWxzZSxcbiAgICAgIGluY2x1ZGVXaGl0ZUNoYXJzOiBmYWxzZSxcbiAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgIHN0cmljdDogdHJ1ZSxcbiAgICAgIGF0dHJOYW1lUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIGF0dHJWYWx1ZVByb2Nlc3NvcnM6IG51bGwsXG4gICAgICB0YWdOYW1lUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIHZhbHVlUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIHJvb3ROYW1lOiAncm9vdCcsXG4gICAgICB4bWxkZWM6IHtcbiAgICAgICAgJ3ZlcnNpb24nOiAnMS4wJyxcbiAgICAgICAgJ2VuY29kaW5nJzogJ1VURi04JyxcbiAgICAgICAgJ3N0YW5kYWxvbmUnOiB0cnVlXG4gICAgICB9LFxuICAgICAgZG9jdHlwZTogbnVsbCxcbiAgICAgIHJlbmRlck9wdHM6IHtcbiAgICAgICAgJ3ByZXR0eSc6IHRydWUsXG4gICAgICAgICdpbmRlbnQnOiAnICAnLFxuICAgICAgICAnbmV3bGluZSc6ICdcXG4nXG4gICAgICB9LFxuICAgICAgaGVhZGxlc3M6IGZhbHNlLFxuICAgICAgY2h1bmtTaXplOiAxMDAwMCxcbiAgICAgIGVtcHR5VGFnOiAnJyxcbiAgICAgIGNkYXRhOiBmYWxzZVxuICAgIH1cbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgYm9tLCBkZWZhdWx0cywgZXZlbnRzLCBpc0VtcHR5LCBwcm9jZXNzSXRlbSwgcHJvY2Vzc29ycywgc2F4LCBzZXRJbW1lZGlhdGUsXG4gICAgYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH0sXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBzYXggPSByZXF1aXJlKCdzYXgnKTtcblxuICBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcblxuICBib20gPSByZXF1aXJlKCcuL2JvbScpO1xuXG4gIHByb2Nlc3NvcnMgPSByZXF1aXJlKCcuL3Byb2Nlc3NvcnMnKTtcblxuICBzZXRJbW1lZGlhdGUgPSByZXF1aXJlKCd0aW1lcnMnKS5zZXRJbW1lZGlhdGU7XG5cbiAgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJykuZGVmYXVsdHM7XG5cbiAgaXNFbXB0eSA9IGZ1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gXCJvYmplY3RcIiAmJiAodGhpbmcgIT0gbnVsbCkgJiYgT2JqZWN0LmtleXModGhpbmcpLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICBwcm9jZXNzSXRlbSA9IGZ1bmN0aW9uKHByb2Nlc3NvcnMsIGl0ZW0sIGtleSkge1xuICAgIHZhciBpLCBsZW4sIHByb2Nlc3M7XG4gICAgZm9yIChpID0gMCwgbGVuID0gcHJvY2Vzc29ycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcHJvY2VzcyA9IHByb2Nlc3NvcnNbaV07XG4gICAgICBpdGVtID0gcHJvY2VzcyhpdGVtLCBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbTtcbiAgfTtcblxuICBleHBvcnRzLlBhcnNlciA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFBhcnNlciwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBQYXJzZXIob3B0cykge1xuICAgICAgdGhpcy5wYXJzZVN0cmluZ1Byb21pc2UgPSBiaW5kKHRoaXMucGFyc2VTdHJpbmdQcm9taXNlLCB0aGlzKTtcbiAgICAgIHRoaXMucGFyc2VTdHJpbmcgPSBiaW5kKHRoaXMucGFyc2VTdHJpbmcsIHRoaXMpO1xuICAgICAgdGhpcy5yZXNldCA9IGJpbmQodGhpcy5yZXNldCwgdGhpcyk7XG4gICAgICB0aGlzLmFzc2lnbk9yUHVzaCA9IGJpbmQodGhpcy5hc3NpZ25PclB1c2gsIHRoaXMpO1xuICAgICAgdGhpcy5wcm9jZXNzQXN5bmMgPSBiaW5kKHRoaXMucHJvY2Vzc0FzeW5jLCB0aGlzKTtcbiAgICAgIHZhciBrZXksIHJlZiwgdmFsdWU7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgZXhwb3J0cy5QYXJzZXIpKSB7XG4gICAgICAgIHJldHVybiBuZXcgZXhwb3J0cy5QYXJzZXIob3B0cyk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICAgIHJlZiA9IGRlZmF1bHRzW1wiMC4yXCJdO1xuICAgICAgZm9yIChrZXkgaW4gcmVmKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZiwga2V5KSkgY29udGludWU7XG4gICAgICAgIHZhbHVlID0gcmVmW2tleV07XG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBmb3IgKGtleSBpbiBvcHRzKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKG9wdHMsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IG9wdHNba2V5XTtcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMueG1sbnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnhtbG5za2V5ID0gdGhpcy5vcHRpb25zLmF0dHJrZXkgKyBcIm5zXCI7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vcm1hbGl6ZVRhZ3MpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMudGFnTmFtZVByb2Nlc3NvcnMpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMudGFnTmFtZVByb2Nlc3NvcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMudGFnTmFtZVByb2Nlc3NvcnMudW5zaGlmdChwcm9jZXNzb3JzLm5vcm1hbGl6ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5wcm9jZXNzQXN5bmMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaHVuaywgZXJyO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMucmVtYWluaW5nLmxlbmd0aCA8PSB0aGlzLm9wdGlvbnMuY2h1bmtTaXplKSB7XG4gICAgICAgICAgY2h1bmsgPSB0aGlzLnJlbWFpbmluZztcbiAgICAgICAgICB0aGlzLnJlbWFpbmluZyA9ICcnO1xuICAgICAgICAgIHRoaXMuc2F4UGFyc2VyID0gdGhpcy5zYXhQYXJzZXIud3JpdGUoY2h1bmspO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNheFBhcnNlci5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNodW5rID0gdGhpcy5yZW1haW5pbmcuc3Vic3RyKDAsIHRoaXMub3B0aW9ucy5jaHVua1NpemUpO1xuICAgICAgICAgIHRoaXMucmVtYWluaW5nID0gdGhpcy5yZW1haW5pbmcuc3Vic3RyKHRoaXMub3B0aW9ucy5jaHVua1NpemUsIHRoaXMucmVtYWluaW5nLmxlbmd0aCk7XG4gICAgICAgICAgdGhpcy5zYXhQYXJzZXIgPSB0aGlzLnNheFBhcnNlci53cml0ZShjaHVuayk7XG4gICAgICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZSh0aGlzLnByb2Nlc3NBc3luYyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yMSkge1xuICAgICAgICBlcnIgPSBlcnJvcjE7XG4gICAgICAgIGlmICghdGhpcy5zYXhQYXJzZXIuZXJyVGhyb3duKSB7XG4gICAgICAgICAgdGhpcy5zYXhQYXJzZXIuZXJyVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0KGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5hc3NpZ25PclB1c2ggPSBmdW5jdGlvbihvYmosIGtleSwgbmV3VmFsdWUpIHtcbiAgICAgIGlmICghKGtleSBpbiBvYmopKSB7XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmV4cGxpY2l0QXJyYXkpIHtcbiAgICAgICAgICByZXR1cm4gb2JqW2tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2JqW2tleV0gPSBbbmV3VmFsdWVdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIShvYmpba2V5XSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgIG9ialtrZXldID0gW29ialtrZXldXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqW2tleV0ucHVzaChuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhdHRya2V5LCBjaGFya2V5LCBvbnRleHQsIHN0YWNrO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuc2F4UGFyc2VyID0gc2F4LnBhcnNlcih0aGlzLm9wdGlvbnMuc3RyaWN0LCB7XG4gICAgICAgIHRyaW06IGZhbHNlLFxuICAgICAgICBub3JtYWxpemU6IGZhbHNlLFxuICAgICAgICB4bWxuczogdGhpcy5vcHRpb25zLnhtbG5zXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2F4UGFyc2VyLmVyclRocm93biA9IGZhbHNlO1xuICAgICAgdGhpcy5zYXhQYXJzZXIub25lcnJvciA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBfdGhpcy5zYXhQYXJzZXIucmVzdW1lKCk7XG4gICAgICAgICAgaWYgKCFfdGhpcy5zYXhQYXJzZXIuZXJyVGhyb3duKSB7XG4gICAgICAgICAgICBfdGhpcy5zYXhQYXJzZXIuZXJyVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgdGhpcy5zYXhQYXJzZXIub25lbmQgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghX3RoaXMuc2F4UGFyc2VyLmVuZGVkKSB7XG4gICAgICAgICAgICBfdGhpcy5zYXhQYXJzZXIuZW5kZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmVtaXQoXCJlbmRcIiwgX3RoaXMucmVzdWx0T2JqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIHRoaXMuc2F4UGFyc2VyLmVuZGVkID0gZmFsc2U7XG4gICAgICB0aGlzLkVYUExJQ0lUX0NIQVJLRVkgPSB0aGlzLm9wdGlvbnMuZXhwbGljaXRDaGFya2V5O1xuICAgICAgdGhpcy5yZXN1bHRPYmplY3QgPSBudWxsO1xuICAgICAgc3RhY2sgPSBbXTtcbiAgICAgIGF0dHJrZXkgPSB0aGlzLm9wdGlvbnMuYXR0cmtleTtcbiAgICAgIGNoYXJrZXkgPSB0aGlzLm9wdGlvbnMuY2hhcmtleTtcbiAgICAgIHRoaXMuc2F4UGFyc2VyLm9ub3BlbnRhZyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIHZhciBrZXksIG5ld1ZhbHVlLCBvYmosIHByb2Nlc3NlZEtleSwgcmVmO1xuICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgIG9ialtjaGFya2V5XSA9IFwiXCI7XG4gICAgICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLmlnbm9yZUF0dHJzKSB7XG4gICAgICAgICAgICByZWYgPSBub2RlLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwocmVmLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgaWYgKCEoYXR0cmtleSBpbiBvYmopICYmICFfdGhpcy5vcHRpb25zLm1lcmdlQXR0cnMpIHtcbiAgICAgICAgICAgICAgICBvYmpbYXR0cmtleV0gPSB7fTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXdWYWx1ZSA9IF90aGlzLm9wdGlvbnMuYXR0clZhbHVlUHJvY2Vzc29ycyA/IHByb2Nlc3NJdGVtKF90aGlzLm9wdGlvbnMuYXR0clZhbHVlUHJvY2Vzc29ycywgbm9kZS5hdHRyaWJ1dGVzW2tleV0sIGtleSkgOiBub2RlLmF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgICAgICAgcHJvY2Vzc2VkS2V5ID0gX3RoaXMub3B0aW9ucy5hdHRyTmFtZVByb2Nlc3NvcnMgPyBwcm9jZXNzSXRlbShfdGhpcy5vcHRpb25zLmF0dHJOYW1lUHJvY2Vzc29ycywga2V5KSA6IGtleTtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMubWVyZ2VBdHRycykge1xuICAgICAgICAgICAgICAgIF90aGlzLmFzc2lnbk9yUHVzaChvYmosIHByb2Nlc3NlZEtleSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialthdHRya2V5XVtwcm9jZXNzZWRLZXldID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgb2JqW1wiI25hbWVcIl0gPSBfdGhpcy5vcHRpb25zLnRhZ05hbWVQcm9jZXNzb3JzID8gcHJvY2Vzc0l0ZW0oX3RoaXMub3B0aW9ucy50YWdOYW1lUHJvY2Vzc29ycywgbm9kZS5uYW1lKSA6IG5vZGUubmFtZTtcbiAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy54bWxucykge1xuICAgICAgICAgICAgb2JqW190aGlzLm9wdGlvbnMueG1sbnNrZXldID0ge1xuICAgICAgICAgICAgICB1cmk6IG5vZGUudXJpLFxuICAgICAgICAgICAgICBsb2NhbDogbm9kZS5sb2NhbFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0YWNrLnB1c2gob2JqKTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgdGhpcy5zYXhQYXJzZXIub25jbG9zZXRhZyA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNkYXRhLCBlbXB0eVN0ciwga2V5LCBub2RlLCBub2RlTmFtZSwgb2JqLCBvYmpDbG9uZSwgb2xkLCBzLCB4cGF0aDtcbiAgICAgICAgICBvYmogPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICBub2RlTmFtZSA9IG9ialtcIiNuYW1lXCJdO1xuICAgICAgICAgIGlmICghX3RoaXMub3B0aW9ucy5leHBsaWNpdENoaWxkcmVuIHx8ICFfdGhpcy5vcHRpb25zLnByZXNlcnZlQ2hpbGRyZW5PcmRlcikge1xuICAgICAgICAgICAgZGVsZXRlIG9ialtcIiNuYW1lXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob2JqLmNkYXRhID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjZGF0YSA9IG9iai5jZGF0YTtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmouY2RhdGE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHMgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAob2JqW2NoYXJrZXldLm1hdGNoKC9eXFxzKiQvKSAmJiAhY2RhdGEpIHtcbiAgICAgICAgICAgIGVtcHR5U3RyID0gb2JqW2NoYXJrZXldO1xuICAgICAgICAgICAgZGVsZXRlIG9ialtjaGFya2V5XTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMudHJpbSkge1xuICAgICAgICAgICAgICBvYmpbY2hhcmtleV0gPSBvYmpbY2hhcmtleV0udHJpbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMubm9ybWFsaXplKSB7XG4gICAgICAgICAgICAgIG9ialtjaGFya2V5XSA9IG9ialtjaGFya2V5XS5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKS50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvYmpbY2hhcmtleV0gPSBfdGhpcy5vcHRpb25zLnZhbHVlUHJvY2Vzc29ycyA/IHByb2Nlc3NJdGVtKF90aGlzLm9wdGlvbnMudmFsdWVQcm9jZXNzb3JzLCBvYmpbY2hhcmtleV0sIG5vZGVOYW1lKSA6IG9ialtjaGFya2V5XTtcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMSAmJiBjaGFya2V5IGluIG9iaiAmJiAhX3RoaXMuRVhQTElDSVRfQ0hBUktFWSkge1xuICAgICAgICAgICAgICBvYmogPSBvYmpbY2hhcmtleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc0VtcHR5KG9iaikpIHtcbiAgICAgICAgICAgIG9iaiA9IF90aGlzLm9wdGlvbnMuZW1wdHlUYWcgIT09ICcnID8gX3RoaXMub3B0aW9ucy5lbXB0eVRhZyA6IGVtcHR5U3RyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy52YWxpZGF0b3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgeHBhdGggPSBcIi9cIiArICgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gc3RhY2subGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBub2RlID0gc3RhY2tbaV07XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG5vZGVbXCIjbmFtZVwiXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICB9KSgpKS5jb25jYXQobm9kZU5hbWUpLmpvaW4oXCIvXCIpO1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgZXJyO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmogPSBfdGhpcy5vcHRpb25zLnZhbGlkYXRvcih4cGF0aCwgcyAmJiBzW25vZGVOYW1lXSwgb2JqKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IxKSB7XG4gICAgICAgICAgICAgICAgZXJyID0gZXJyb3IxO1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5lbWl0KFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuZXhwbGljaXRDaGlsZHJlbiAmJiAhX3RoaXMub3B0aW9ucy5tZXJnZUF0dHJzICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzLm9wdGlvbnMucHJlc2VydmVDaGlsZHJlbk9yZGVyKSB7XG4gICAgICAgICAgICAgIG5vZGUgPSB7fTtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuYXR0cmtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBub2RlW190aGlzLm9wdGlvbnMuYXR0cmtleV0gPSBvYmpbX3RoaXMub3B0aW9ucy5hdHRya2V5XTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqW190aGlzLm9wdGlvbnMuYXR0cmtleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLmNoYXJzQXNDaGlsZHJlbiAmJiBfdGhpcy5vcHRpb25zLmNoYXJrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgbm9kZVtfdGhpcy5vcHRpb25zLmNoYXJrZXldID0gb2JqW190aGlzLm9wdGlvbnMuY2hhcmtleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG9ialtfdGhpcy5vcHRpb25zLmNoYXJrZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBub2RlW190aGlzLm9wdGlvbnMuY2hpbGRrZXldID0gb2JqO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG9iaiA9IG5vZGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHMpIHtcbiAgICAgICAgICAgICAgc1tfdGhpcy5vcHRpb25zLmNoaWxka2V5XSA9IHNbX3RoaXMub3B0aW9ucy5jaGlsZGtleV0gfHwgW107XG4gICAgICAgICAgICAgIG9iakNsb25lID0ge307XG4gICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKG9iaiwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgb2JqQ2xvbmVba2V5XSA9IG9ialtrZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNbX3RoaXMub3B0aW9ucy5jaGlsZGtleV0ucHVzaChvYmpDbG9uZSk7XG4gICAgICAgICAgICAgIGRlbGV0ZSBvYmpbXCIjbmFtZVwiXTtcbiAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAxICYmIGNoYXJrZXkgaW4gb2JqICYmICFfdGhpcy5FWFBMSUNJVF9DSEFSS0VZKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gb2JqW2NoYXJrZXldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuYXNzaWduT3JQdXNoKHMsIG5vZGVOYW1lLCBvYmopO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5leHBsaWNpdFJvb3QpIHtcbiAgICAgICAgICAgICAgb2xkID0gb2JqO1xuICAgICAgICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgICAgICAgb2JqW25vZGVOYW1lXSA9IG9sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLnJlc3VsdE9iamVjdCA9IG9iajtcbiAgICAgICAgICAgIF90aGlzLnNheFBhcnNlci5lbmRlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuZW1pdChcImVuZFwiLCBfdGhpcy5yZXN1bHRPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgb250ZXh0ID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgdmFyIGNoYXJDaGlsZCwgcztcbiAgICAgICAgICBzID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHNbY2hhcmtleV0gKz0gdGV4dDtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmV4cGxpY2l0Q2hpbGRyZW4gJiYgX3RoaXMub3B0aW9ucy5wcmVzZXJ2ZUNoaWxkcmVuT3JkZXIgJiYgX3RoaXMub3B0aW9ucy5jaGFyc0FzQ2hpbGRyZW4gJiYgKF90aGlzLm9wdGlvbnMuaW5jbHVkZVdoaXRlQ2hhcnMgfHwgdGV4dC5yZXBsYWNlKC9cXFxcbi9nLCAnJykudHJpbSgpICE9PSAnJykpIHtcbiAgICAgICAgICAgICAgc1tfdGhpcy5vcHRpb25zLmNoaWxka2V5XSA9IHNbX3RoaXMub3B0aW9ucy5jaGlsZGtleV0gfHwgW107XG4gICAgICAgICAgICAgIGNoYXJDaGlsZCA9IHtcbiAgICAgICAgICAgICAgICAnI25hbWUnOiAnX190ZXh0X18nXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGNoYXJDaGlsZFtjaGFya2V5XSA9IHRleHQ7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLm5vcm1hbGl6ZSkge1xuICAgICAgICAgICAgICAgIGNoYXJDaGlsZFtjaGFya2V5XSA9IGNoYXJDaGlsZFtjaGFya2V5XS5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKS50cmltKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc1tfdGhpcy5vcHRpb25zLmNoaWxka2V5XS5wdXNoKGNoYXJDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIHRoaXMuc2F4UGFyc2VyLm9udGV4dCA9IG9udGV4dDtcbiAgICAgIHJldHVybiB0aGlzLnNheFBhcnNlci5vbmNkYXRhID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgdmFyIHM7XG4gICAgICAgICAgcyA9IG9udGV4dCh0ZXh0KTtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcmV0dXJuIHMuY2RhdGEgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgIH07XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlU3RyaW5nID0gZnVuY3Rpb24oc3RyLCBjYikge1xuICAgICAgdmFyIGVycjtcbiAgICAgIGlmICgoY2IgIT0gbnVsbCkgJiYgdHlwZW9mIGNiID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhpcy5vbihcImVuZFwiLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgcmV0dXJuIGNiKG51bGwsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgIHJldHVybiBjYihlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xuICAgICAgICBpZiAoc3RyLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoXCJlbmRcIiwgbnVsbCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgc3RyID0gYm9tLnN0cmlwQk9NKHN0cik7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXN5bmMpIHtcbiAgICAgICAgICB0aGlzLnJlbWFpbmluZyA9IHN0cjtcbiAgICAgICAgICBzZXRJbW1lZGlhdGUodGhpcy5wcm9jZXNzQXN5bmMpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNheFBhcnNlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5zYXhQYXJzZXIud3JpdGUoc3RyKS5jbG9zZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IxKSB7XG4gICAgICAgIGVyciA9IGVycm9yMTtcbiAgICAgICAgaWYgKCEodGhpcy5zYXhQYXJzZXIuZXJyVGhyb3duIHx8IHRoaXMuc2F4UGFyc2VyLmVuZGVkKSkge1xuICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICAgIHJldHVybiB0aGlzLnNheFBhcnNlci5lcnJUaHJvd24gPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2F4UGFyc2VyLmVuZGVkKSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VTdHJpbmdQcm9taXNlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMucGFyc2VTdHJpbmcoc3RyLCBmdW5jdGlvbihlcnIsIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFBhcnNlcjtcblxuICB9KShldmVudHMpO1xuXG4gIGV4cG9ydHMucGFyc2VTdHJpbmcgPSBmdW5jdGlvbihzdHIsIGEsIGIpIHtcbiAgICB2YXIgY2IsIG9wdGlvbnMsIHBhcnNlcjtcbiAgICBpZiAoYiAhPSBudWxsKSB7XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2IgPSBiO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvcHRpb25zID0gYTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiBhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNiID0gYTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcGFyc2VyID0gbmV3IGV4cG9ydHMuUGFyc2VyKG9wdGlvbnMpO1xuICAgIHJldHVybiBwYXJzZXIucGFyc2VTdHJpbmcoc3RyLCBjYik7XG4gIH07XG5cbiAgZXhwb3J0cy5wYXJzZVN0cmluZ1Byb21pc2UgPSBmdW5jdGlvbihzdHIsIGEpIHtcbiAgICB2YXIgb3B0aW9ucywgcGFyc2VyO1xuICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdGlvbnMgPSBhO1xuICAgIH1cbiAgICBwYXJzZXIgPSBuZXcgZXhwb3J0cy5QYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZVN0cmluZ1Byb21pc2Uoc3RyKTtcbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgcHJlZml4TWF0Y2g7XG5cbiAgcHJlZml4TWF0Y2ggPSBuZXcgUmVnRXhwKC8oPyF4bWxucyleLio6Lyk7XG5cbiAgZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCk7XG4gIH07XG5cbiAgZXhwb3J0cy5maXJzdENoYXJMb3dlckNhc2UgPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICB9O1xuXG4gIGV4cG9ydHMuc3RyaXBQcmVmaXggPSBmdW5jdGlvbihzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UocHJlZml4TWF0Y2gsICcnKTtcbiAgfTtcblxuICBleHBvcnRzLnBhcnNlTnVtYmVycyA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICghaXNOYU4oc3RyKSkge1xuICAgICAgc3RyID0gc3RyICUgMSA9PT0gMCA/IHBhcnNlSW50KHN0ciwgMTApIDogcGFyc2VGbG9hdChzdHIpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9O1xuXG4gIGV4cG9ydHMucGFyc2VCb29sZWFucyA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGlmICgvXig/OnRydWV8ZmFsc2UpJC9pLnRlc3Qoc3RyKSkge1xuICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCkgPT09ICd0cnVlJztcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgYnVpbGRlciwgZGVmYXVsdHMsIHBhcnNlciwgcHJvY2Vzc29ycyxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4gIGJ1aWxkZXIgPSByZXF1aXJlKCcuL2J1aWxkZXInKTtcblxuICBwYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcicpO1xuXG4gIHByb2Nlc3NvcnMgPSByZXF1aXJlKCcuL3Byb2Nlc3NvcnMnKTtcblxuICBleHBvcnRzLmRlZmF1bHRzID0gZGVmYXVsdHMuZGVmYXVsdHM7XG5cbiAgZXhwb3J0cy5wcm9jZXNzb3JzID0gcHJvY2Vzc29ycztcblxuICBleHBvcnRzLlZhbGlkYXRpb25FcnJvciA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFZhbGlkYXRpb25FcnJvciwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBWYWxpZGF0aW9uRXJyb3IobWVzc2FnZSkge1xuICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG5cbiAgICByZXR1cm4gVmFsaWRhdGlvbkVycm9yO1xuXG4gIH0pKEVycm9yKTtcblxuICBleHBvcnRzLkJ1aWxkZXIgPSBidWlsZGVyLkJ1aWxkZXI7XG5cbiAgZXhwb3J0cy5QYXJzZXIgPSBwYXJzZXIuUGFyc2VyO1xuXG4gIGV4cG9ydHMucGFyc2VTdHJpbmcgPSBwYXJzZXIucGFyc2VTdHJpbmc7XG5cbiAgZXhwb3J0cy5wYXJzZVN0cmluZ1Byb21pc2UgPSBwYXJzZXIucGFyc2VTdHJpbmdQcm9taXNlO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgRGlzY29ubmVjdGVkOiAxLFxuICAgIFByZWNlZGluZzogMixcbiAgICBGb2xsb3dpbmc6IDQsXG4gICAgQ29udGFpbnM6IDgsXG4gICAgQ29udGFpbmVkQnk6IDE2LFxuICAgIEltcGxlbWVudGF0aW9uU3BlY2lmaWM6IDMyXG4gIH07XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBFbGVtZW50OiAxLFxuICAgIEF0dHJpYnV0ZTogMixcbiAgICBUZXh0OiAzLFxuICAgIENEYXRhOiA0LFxuICAgIEVudGl0eVJlZmVyZW5jZTogNSxcbiAgICBFbnRpdHlEZWNsYXJhdGlvbjogNixcbiAgICBQcm9jZXNzaW5nSW5zdHJ1Y3Rpb246IDcsXG4gICAgQ29tbWVudDogOCxcbiAgICBEb2N1bWVudDogOSxcbiAgICBEb2NUeXBlOiAxMCxcbiAgICBEb2N1bWVudEZyYWdtZW50OiAxMSxcbiAgICBOb3RhdGlvbkRlY2xhcmF0aW9uOiAxMixcbiAgICBEZWNsYXJhdGlvbjogMjAxLFxuICAgIFJhdzogMjAyLFxuICAgIEF0dHJpYnV0ZURlY2xhcmF0aW9uOiAyMDMsXG4gICAgRWxlbWVudERlY2xhcmF0aW9uOiAyMDQsXG4gICAgRHVtbXk6IDIwNVxuICB9O1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIGFzc2lnbiwgZ2V0VmFsdWUsIGlzQXJyYXksIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzT2JqZWN0LCBpc1BsYWluT2JqZWN0LFxuICAgIHNsaWNlID0gW10uc2xpY2UsXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGFzc2lnbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpLCBrZXksIGxlbiwgc291cmNlLCBzb3VyY2VzLCB0YXJnZXQ7XG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLCBzb3VyY2VzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWYgKGlzRnVuY3Rpb24oT2JqZWN0LmFzc2lnbikpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gc291cmNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbiAgICAgICAgICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWwpIHtcbiAgICByZXR1cm4gISF2YWwgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG4gIH07XG5cbiAgaXNPYmplY3QgPSBmdW5jdGlvbih2YWwpIHtcbiAgICB2YXIgcmVmO1xuICAgIHJldHVybiAhIXZhbCAmJiAoKHJlZiA9IHR5cGVvZiB2YWwpID09PSAnZnVuY3Rpb24nIHx8IHJlZiA9PT0gJ29iamVjdCcpO1xuICB9O1xuXG4gIGlzQXJyYXkgPSBmdW5jdGlvbih2YWwpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihBcnJheS5pc0FycmF5KSkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cbiAgfTtcblxuICBpc0VtcHR5ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgdmFyIGtleTtcbiAgICBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXR1cm4gIXZhbC5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoa2V5IGluIHZhbCkge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbCh2YWwsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgaXNQbGFpbk9iamVjdCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHZhciBjdG9yLCBwcm90bztcbiAgICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiAocHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKSkgJiYgKGN0b3IgPSBwcm90by5jb25zdHJ1Y3RvcikgJiYgKHR5cGVvZiBjdG9yID09PSAnZnVuY3Rpb24nKSAmJiAoY3RvciBpbnN0YW5jZW9mIGN0b3IpICYmIChGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjdG9yKSA9PT0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoT2JqZWN0KSk7XG4gIH07XG5cbiAgZ2V0VmFsdWUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoaXNGdW5jdGlvbihvYmoudmFsdWVPZikpIHtcbiAgICAgIHJldHVybiBvYmoudmFsdWVPZigpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cy5hc3NpZ24gPSBhc3NpZ247XG5cbiAgbW9kdWxlLmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbiAgbW9kdWxlLmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuICBtb2R1bGUuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuICBtb2R1bGUuZXhwb3J0cy5pc0VtcHR5ID0gaXNFbXB0eTtcblxuICBtb2R1bGUuZXhwb3J0cy5pc1BsYWluT2JqZWN0ID0gaXNQbGFpbk9iamVjdDtcblxuICBtb2R1bGUuZXhwb3J0cy5nZXRWYWx1ZSA9IGdldFZhbHVlO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgTm9uZTogMCxcbiAgICBPcGVuVGFnOiAxLFxuICAgIEluc2lkZVRhZzogMixcbiAgICBDbG9zZVRhZzogM1xuICB9O1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxBdHRyaWJ1dGUsIFhNTE5vZGU7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MQXR0cmlidXRlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTEF0dHJpYnV0ZShwYXJlbnQsIG5hbWUsIHZhbHVlKSB7XG4gICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLnBhcmVudC5vcHRpb25zO1xuICAgICAgICB0aGlzLnN0cmluZ2lmeSA9IHRoaXMucGFyZW50LnN0cmluZ2lmeTtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBhdHRyaWJ1dGUgbmFtZS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnN0cmluZ2lmeS5uYW1lKG5hbWUpO1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5naWZ5LmF0dFZhbHVlKHZhbHVlKTtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkF0dHJpYnV0ZTtcbiAgICAgIHRoaXMuaXNJZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zY2hlbWFUeXBlSW5mbyA9IG51bGw7XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUsICdub2RlVHlwZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MQXR0cmlidXRlLnByb3RvdHlwZSwgJ293bmVyRWxlbWVudCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxBdHRyaWJ1dGUucHJvdG90eXBlLCAndGV4dENvbnRlbnQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlID0gdmFsdWUgfHwgJyc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MQXR0cmlidXRlLnByb3RvdHlwZSwgJ25hbWVzcGFjZVVSSScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxBdHRyaWJ1dGUucHJvdG90eXBlLCAncHJlZml4Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUsICdsb2NhbE5hbWUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUsICdzcGVjaWZpZWQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxBdHRyaWJ1dGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53cml0ZXIuYXR0cmlidXRlKHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUuZGVidWdJbmZvID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgbmFtZSA9IG5hbWUgfHwgdGhpcy5uYW1lO1xuICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJwYXJlbnQ6IDxcIiArIHRoaXMucGFyZW50Lm5hbWUgKyBcIj5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImF0dHJpYnV0ZToge1wiICsgbmFtZSArIFwifSwgcGFyZW50OiA8XCIgKyB0aGlzLnBhcmVudC5uYW1lICsgXCI+XCI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUuaXNFcXVhbE5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5uYW1lc3BhY2VVUkkgIT09IHRoaXMubmFtZXNwYWNlVVJJKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnByZWZpeCAhPT0gdGhpcy5wcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubG9jYWxOYW1lICE9PSB0aGlzLmxvY2FsTmFtZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS52YWx1ZSAhPT0gdGhpcy52YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTEF0dHJpYnV0ZTtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxDRGF0YSwgWE1MQ2hhcmFjdGVyRGF0YSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIFhNTENoYXJhY3RlckRhdGEgPSByZXF1aXJlKCcuL1hNTENoYXJhY3RlckRhdGEnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTENEYXRhID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MQ0RhdGEsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MQ0RhdGEocGFyZW50LCB0ZXh0KSB7XG4gICAgICBYTUxDRGF0YS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIENEQVRBIHRleHQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSBcIiNjZGF0YS1zZWN0aW9uXCI7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5DRGF0YTtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnN0cmluZ2lmeS5jZGF0YSh0ZXh0KTtcbiAgICB9XG5cbiAgICBYTUxDRGF0YS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxDRGF0YS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5jZGF0YSh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MQ0RhdGE7XG5cbiAgfSkoWE1MQ2hhcmFjdGVyRGF0YSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MQ2hhcmFjdGVyRGF0YSwgWE1MTm9kZSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTENoYXJhY3RlckRhdGEgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxDaGFyYWN0ZXJEYXRhLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTENoYXJhY3RlckRhdGEocGFyZW50KSB7XG4gICAgICBYTUxDaGFyYWN0ZXJEYXRhLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLCAnZGF0YScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPSB2YWx1ZSB8fCAnJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZSwgJ2xlbmd0aCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZSwgJ3RleHRDb250ZW50Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9IHZhbHVlIHx8ICcnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MQ2hhcmFjdGVyRGF0YS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZS5zdWJzdHJpbmdEYXRhID0gZnVuY3Rpb24ob2Zmc2V0LCBjb3VudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZS5hcHBlbmREYXRhID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLmluc2VydERhdGEgPSBmdW5jdGlvbihvZmZzZXQsIGFyZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZS5kZWxldGVEYXRhID0gZnVuY3Rpb24ob2Zmc2V0LCBjb3VudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZS5yZXBsYWNlRGF0YSA9IGZ1bmN0aW9uKG9mZnNldCwgY291bnQsIGFyZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZS5pc0VxdWFsTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmICghWE1MQ2hhcmFjdGVyRGF0YS5fX3N1cGVyX18uaXNFcXVhbE5vZGUuYXBwbHkodGhpcywgYXJndW1lbnRzKS5pc0VxdWFsTm9kZShub2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5kYXRhICE9PSB0aGlzLmRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxDaGFyYWN0ZXJEYXRhO1xuXG4gIH0pKFhNTE5vZGUpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxDaGFyYWN0ZXJEYXRhLCBYTUxDb21tZW50LFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MQ2hhcmFjdGVyRGF0YSA9IHJlcXVpcmUoJy4vWE1MQ2hhcmFjdGVyRGF0YScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MQ29tbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTENvbW1lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MQ29tbWVudChwYXJlbnQsIHRleHQpIHtcbiAgICAgIFhNTENvbW1lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIGlmICh0ZXh0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBjb21tZW50IHRleHQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSBcIiNjb21tZW50XCI7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5Db21tZW50O1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5naWZ5LmNvbW1lbnQodGV4dCk7XG4gICAgfVxuXG4gICAgWE1MQ29tbWVudC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxDb21tZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmNvbW1lbnQodGhpcywgdGhpcy5vcHRpb25zLndyaXRlci5maWx0ZXJPcHRpb25zKG9wdGlvbnMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTENvbW1lbnQ7XG5cbiAgfSkoWE1MQ2hhcmFjdGVyRGF0YSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MRE9NQ29uZmlndXJhdGlvbiwgWE1MRE9NRXJyb3JIYW5kbGVyLCBYTUxET01TdHJpbmdMaXN0O1xuXG4gIFhNTERPTUVycm9ySGFuZGxlciA9IHJlcXVpcmUoJy4vWE1MRE9NRXJyb3JIYW5kbGVyJyk7XG5cbiAgWE1MRE9NU3RyaW5nTGlzdCA9IHJlcXVpcmUoJy4vWE1MRE9NU3RyaW5nTGlzdCcpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRE9NQ29uZmlndXJhdGlvbiA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBYTUxET01Db25maWd1cmF0aW9uKCkge1xuICAgICAgdmFyIGNsb25lZFNlbGY7XG4gICAgICB0aGlzLmRlZmF1bHRQYXJhbXMgPSB7XG4gICAgICAgIFwiY2Fub25pY2FsLWZvcm1cIjogZmFsc2UsXG4gICAgICAgIFwiY2RhdGEtc2VjdGlvbnNcIjogZmFsc2UsXG4gICAgICAgIFwiY29tbWVudHNcIjogZmFsc2UsXG4gICAgICAgIFwiZGF0YXR5cGUtbm9ybWFsaXphdGlvblwiOiBmYWxzZSxcbiAgICAgICAgXCJlbGVtZW50LWNvbnRlbnQtd2hpdGVzcGFjZVwiOiB0cnVlLFxuICAgICAgICBcImVudGl0aWVzXCI6IHRydWUsXG4gICAgICAgIFwiZXJyb3ItaGFuZGxlclwiOiBuZXcgWE1MRE9NRXJyb3JIYW5kbGVyKCksXG4gICAgICAgIFwiaW5mb3NldFwiOiB0cnVlLFxuICAgICAgICBcInZhbGlkYXRlLWlmLXNjaGVtYVwiOiBmYWxzZSxcbiAgICAgICAgXCJuYW1lc3BhY2VzXCI6IHRydWUsXG4gICAgICAgIFwibmFtZXNwYWNlLWRlY2xhcmF0aW9uc1wiOiB0cnVlLFxuICAgICAgICBcIm5vcm1hbGl6ZS1jaGFyYWN0ZXJzXCI6IGZhbHNlLFxuICAgICAgICBcInNjaGVtYS1sb2NhdGlvblwiOiAnJyxcbiAgICAgICAgXCJzY2hlbWEtdHlwZVwiOiAnJyxcbiAgICAgICAgXCJzcGxpdC1jZGF0YS1zZWN0aW9uc1wiOiB0cnVlLFxuICAgICAgICBcInZhbGlkYXRlXCI6IGZhbHNlLFxuICAgICAgICBcIndlbGwtZm9ybWVkXCI6IHRydWVcbiAgICAgIH07XG4gICAgICB0aGlzLnBhcmFtcyA9IGNsb25lZFNlbGYgPSBPYmplY3QuY3JlYXRlKHRoaXMuZGVmYXVsdFBhcmFtcyk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERPTUNvbmZpZ3VyYXRpb24ucHJvdG90eXBlLCAncGFyYW1ldGVyTmFtZXMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFhNTERPTVN0cmluZ0xpc3QoT2JqZWN0LmtleXModGhpcy5kZWZhdWx0UGFyYW1zKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxET01Db25maWd1cmF0aW9uLnByb3RvdHlwZS5nZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAodGhpcy5wYXJhbXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW25hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTERPTUNvbmZpZ3VyYXRpb24ucHJvdG90eXBlLmNhblNldFBhcmFtZXRlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgWE1MRE9NQ29uZmlndXJhdGlvbi5wcm90b3R5cGUuc2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmFtc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZSB0aGlzLnBhcmFtc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERPTUNvbmZpZ3VyYXRpb247XG5cbiAgfSkoKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBYTUxET01FcnJvckhhbmRsZXI7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxET01FcnJvckhhbmRsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MRE9NRXJyb3JIYW5kbGVyKCkge31cblxuICAgIFhNTERPTUVycm9ySGFuZGxlci5wcm90b3R5cGUuaGFuZGxlRXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERPTUVycm9ySGFuZGxlcjtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIFhNTERPTUltcGxlbWVudGF0aW9uO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRE9NSW1wbGVtZW50YXRpb24gPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MRE9NSW1wbGVtZW50YXRpb24oKSB7fVxuXG4gICAgWE1MRE9NSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmhhc0ZlYXR1cmUgPSBmdW5jdGlvbihmZWF0dXJlLCB2ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgWE1MRE9NSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmNyZWF0ZURvY3VtZW50VHlwZSA9IGZ1bmN0aW9uKHF1YWxpZmllZE5hbWUsIHB1YmxpY0lkLCBzeXN0ZW1JZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfTtcblxuICAgIFhNTERPTUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5jcmVhdGVEb2N1bWVudCA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSwgZG9jdHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfTtcblxuICAgIFhNTERPTUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5jcmVhdGVIVE1MRG9jdW1lbnQgPSBmdW5jdGlvbih0aXRsZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfTtcblxuICAgIFhNTERPTUltcGxlbWVudGF0aW9uLnByb3RvdHlwZS5nZXRGZWF0dXJlID0gZnVuY3Rpb24oZmVhdHVyZSwgdmVyc2lvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxET01JbXBsZW1lbnRhdGlvbjtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIFhNTERPTVN0cmluZ0xpc3Q7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxET01TdHJpbmdMaXN0ID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTERPTVN0cmluZ0xpc3QoYXJyKSB7XG4gICAgICB0aGlzLmFyciA9IGFyciB8fCBbXTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRE9NU3RyaW5nTGlzdC5wcm90b3R5cGUsICdsZW5ndGgnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcnIubGVuZ3RoO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MRE9NU3RyaW5nTGlzdC5wcm90b3R5cGUuaXRlbSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5hcnJbaW5kZXhdIHx8IG51bGw7XG4gICAgfTtcblxuICAgIFhNTERPTVN0cmluZ0xpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcnIuaW5kZXhPZihzdHIpICE9PSAtMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERPTVN0cmluZ0xpc3Q7XG5cbiAgfSkoKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MRFREQXR0TGlzdCwgWE1MTm9kZSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTERUREF0dExpc3QgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxEVERBdHRMaXN0LCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTERUREF0dExpc3QocGFyZW50LCBlbGVtZW50TmFtZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVHlwZSwgZGVmYXVsdFZhbHVlVHlwZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICBYTUxEVERBdHRMaXN0Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAoZWxlbWVudE5hbWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIERURCBlbGVtZW50IG5hbWUuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgRFREIGF0dHJpYnV0ZSBuYW1lLiBcIiArIHRoaXMuZGVidWdJbmZvKGVsZW1lbnROYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAoIWF0dHJpYnV0ZVR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBEVEQgYXR0cmlidXRlIHR5cGUuIFwiICsgdGhpcy5kZWJ1Z0luZm8oZWxlbWVudE5hbWUpKTtcbiAgICAgIH1cbiAgICAgIGlmICghZGVmYXVsdFZhbHVlVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIERURCBhdHRyaWJ1dGUgZGVmYXVsdC4gXCIgKyB0aGlzLmRlYnVnSW5mbyhlbGVtZW50TmFtZSkpO1xuICAgICAgfVxuICAgICAgaWYgKGRlZmF1bHRWYWx1ZVR5cGUuaW5kZXhPZignIycpICE9PSAwKSB7XG4gICAgICAgIGRlZmF1bHRWYWx1ZVR5cGUgPSAnIycgKyBkZWZhdWx0VmFsdWVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKCFkZWZhdWx0VmFsdWVUeXBlLm1hdGNoKC9eKCNSRVFVSVJFRHwjSU1QTElFRHwjRklYRUR8I0RFRkFVTFQpJC8pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZGVmYXVsdCB2YWx1ZSB0eXBlOyBleHBlY3RlZDogI1JFUVVJUkVELCAjSU1QTElFRCwgI0ZJWEVEIG9yICNERUZBVUxULiBcIiArIHRoaXMuZGVidWdJbmZvKGVsZW1lbnROYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAoZGVmYXVsdFZhbHVlICYmICFkZWZhdWx0VmFsdWVUeXBlLm1hdGNoKC9eKCNGSVhFRHwjREVGQVVMVCkkLykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGVmYXVsdCB2YWx1ZSBvbmx5IGFwcGxpZXMgdG8gI0ZJWEVEIG9yICNERUZBVUxULiBcIiArIHRoaXMuZGVidWdJbmZvKGVsZW1lbnROYW1lKSk7XG4gICAgICB9XG4gICAgICB0aGlzLmVsZW1lbnROYW1lID0gdGhpcy5zdHJpbmdpZnkubmFtZShlbGVtZW50TmFtZSk7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5BdHRyaWJ1dGVEZWNsYXJhdGlvbjtcbiAgICAgIHRoaXMuYXR0cmlidXRlTmFtZSA9IHRoaXMuc3RyaW5naWZ5Lm5hbWUoYXR0cmlidXRlTmFtZSk7XG4gICAgICB0aGlzLmF0dHJpYnV0ZVR5cGUgPSB0aGlzLnN0cmluZ2lmeS5kdGRBdHRUeXBlKGF0dHJpYnV0ZVR5cGUpO1xuICAgICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZSA9IHRoaXMuc3RyaW5naWZ5LmR0ZEF0dERlZmF1bHQoZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVmYXVsdFZhbHVlVHlwZSA9IGRlZmF1bHRWYWx1ZVR5cGU7XG4gICAgfVxuXG4gICAgWE1MRFREQXR0TGlzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5kdGRBdHRMaXN0KHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxEVERBdHRMaXN0O1xuXG4gIH0pKFhNTE5vZGUpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxEVERFbGVtZW50LCBYTUxOb2RlLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRFRERWxlbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTERUREVsZW1lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MRFRERWxlbWVudChwYXJlbnQsIG5hbWUsIHZhbHVlKSB7XG4gICAgICBYTUxEVERFbGVtZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgRFREIGVsZW1lbnQgbmFtZS4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdmFsdWUgPSAnKCNQQ0RBVEEpJztcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9ICcoJyArIHZhbHVlLmpvaW4oJywnKSArICcpJztcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuc3RyaW5naWZ5Lm5hbWUobmFtZSk7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5FbGVtZW50RGVjbGFyYXRpb247XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdpZnkuZHRkRWxlbWVudFZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBYTUxEVERFbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmR0ZEVsZW1lbnQodGhpcywgdGhpcy5vcHRpb25zLndyaXRlci5maWx0ZXJPcHRpb25zKG9wdGlvbnMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERUREVsZW1lbnQ7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTERUREVudGl0eSwgWE1MTm9kZSwgaXNPYmplY3QsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBpc09iamVjdCA9IHJlcXVpcmUoJy4vVXRpbGl0eScpLmlzT2JqZWN0O1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTERUREVudGl0eSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTERUREVudGl0eSwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxEVERFbnRpdHkocGFyZW50LCBwZSwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIFhNTERUREVudGl0eS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIERURCBlbnRpdHkgbmFtZS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIERURCBlbnRpdHkgdmFsdWUuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5wZSA9ICEhcGU7XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnN0cmluZ2lmeS5uYW1lKG5hbWUpO1xuICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuRW50aXR5RGVjbGFyYXRpb247XG4gICAgICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdpZnkuZHRkRW50aXR5VmFsdWUodmFsdWUpO1xuICAgICAgICB0aGlzLmludGVybmFsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdmFsdWUucHViSUQgJiYgIXZhbHVlLnN5c0lEKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHVibGljIGFuZC9vciBzeXN0ZW0gaWRlbnRpZmllcnMgYXJlIHJlcXVpcmVkIGZvciBhbiBleHRlcm5hbCBlbnRpdHkuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5wdWJJRCAmJiAhdmFsdWUuc3lzSUQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTeXN0ZW0gaWRlbnRpZmllciBpcyByZXF1aXJlZCBmb3IgYSBwdWJsaWMgZXh0ZXJuYWwgZW50aXR5LiBcIiArIHRoaXMuZGVidWdJbmZvKG5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmludGVybmFsID0gZmFsc2U7XG4gICAgICAgIGlmICh2YWx1ZS5wdWJJRCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5wdWJJRCA9IHRoaXMuc3RyaW5naWZ5LmR0ZFB1YklEKHZhbHVlLnB1YklEKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUuc3lzSUQgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuc3lzSUQgPSB0aGlzLnN0cmluZ2lmeS5kdGRTeXNJRCh2YWx1ZS5zeXNJRCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLm5EYXRhICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLm5EYXRhID0gdGhpcy5zdHJpbmdpZnkuZHRkTkRhdGEodmFsdWUubkRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBlICYmIHRoaXMubkRhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3RhdGlvbiBkZWNsYXJhdGlvbiBpcyBub3QgYWxsb3dlZCBpbiBhIHBhcmFtZXRlciBlbnRpdHkuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERUREVudGl0eS5wcm90b3R5cGUsICdwdWJsaWNJZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1YklEO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERUREVudGl0eS5wcm90b3R5cGUsICdzeXN0ZW1JZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c0lEO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERUREVudGl0eS5wcm90b3R5cGUsICdub3RhdGlvbk5hbWUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uRGF0YSB8fCBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERUREVudGl0eS5wcm90b3R5cGUsICdpbnB1dEVuY29kaW5nJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRFRERW50aXR5LnByb3RvdHlwZSwgJ3htbEVuY29kaW5nJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRFRERW50aXR5LnByb3RvdHlwZSwgJ3htbFZlcnNpb24nLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTERUREVudGl0eS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5kdGRFbnRpdHkodGhpcywgdGhpcy5vcHRpb25zLndyaXRlci5maWx0ZXJPcHRpb25zKG9wdGlvbnMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERUREVudGl0eTtcblxuICB9KShYTUxOb2RlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MRFRETm90YXRpb24sIFhNTE5vZGUsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBYTUxOb2RlID0gcmVxdWlyZSgnLi9YTUxOb2RlJyk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxEVEROb3RhdGlvbiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTERURE5vdGF0aW9uLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTERURE5vdGF0aW9uKHBhcmVudCwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIFhNTERURE5vdGF0aW9uLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgRFREIG5vdGF0aW9uIG5hbWUuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgfVxuICAgICAgaWYgKCF2YWx1ZS5wdWJJRCAmJiAhdmFsdWUuc3lzSUQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUHVibGljIG9yIHN5c3RlbSBpZGVudGlmaWVycyBhcmUgcmVxdWlyZWQgZm9yIGFuIGV4dGVybmFsIGVudGl0eS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnN0cmluZ2lmeS5uYW1lKG5hbWUpO1xuICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuTm90YXRpb25EZWNsYXJhdGlvbjtcbiAgICAgIGlmICh2YWx1ZS5wdWJJRCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHViSUQgPSB0aGlzLnN0cmluZ2lmeS5kdGRQdWJJRCh2YWx1ZS5wdWJJRCk7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUuc3lzSUQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN5c0lEID0gdGhpcy5zdHJpbmdpZnkuZHRkU3lzSUQodmFsdWUuc3lzSUQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEVEROb3RhdGlvbi5wcm90b3R5cGUsICdwdWJsaWNJZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1YklEO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERURE5vdGF0aW9uLnByb3RvdHlwZSwgJ3N5c3RlbUlkJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzSUQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxEVEROb3RhdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5kdGROb3RhdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRFRETm90YXRpb247XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTERlY2xhcmF0aW9uLCBYTUxOb2RlLCBpc09iamVjdCxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9VdGlsaXR5JykuaXNPYmplY3Q7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRGVjbGFyYXRpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxEZWNsYXJhdGlvbiwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxEZWNsYXJhdGlvbihwYXJlbnQsIHZlcnNpb24sIGVuY29kaW5nLCBzdGFuZGFsb25lKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgWE1MRGVjbGFyYXRpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIGlmIChpc09iamVjdCh2ZXJzaW9uKSkge1xuICAgICAgICByZWYgPSB2ZXJzaW9uLCB2ZXJzaW9uID0gcmVmLnZlcnNpb24sIGVuY29kaW5nID0gcmVmLmVuY29kaW5nLCBzdGFuZGFsb25lID0gcmVmLnN0YW5kYWxvbmU7XG4gICAgICB9XG4gICAgICBpZiAoIXZlcnNpb24pIHtcbiAgICAgICAgdmVyc2lvbiA9ICcxLjAnO1xuICAgICAgfVxuICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuRGVjbGFyYXRpb247XG4gICAgICB0aGlzLnZlcnNpb24gPSB0aGlzLnN0cmluZ2lmeS54bWxWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgaWYgKGVuY29kaW5nICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbmNvZGluZyA9IHRoaXMuc3RyaW5naWZ5LnhtbEVuY29kaW5nKGVuY29kaW5nKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFuZGFsb25lICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdGFuZGFsb25lID0gdGhpcy5zdHJpbmdpZnkueG1sU3RhbmRhbG9uZShzdGFuZGFsb25lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBYTUxEZWNsYXJhdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5kZWNsYXJhdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRGVjbGFyYXRpb247XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTERUREF0dExpc3QsIFhNTERUREVsZW1lbnQsIFhNTERUREVudGl0eSwgWE1MRFRETm90YXRpb24sIFhNTERvY1R5cGUsIFhNTE5hbWVkTm9kZU1hcCwgWE1MTm9kZSwgaXNPYmplY3QsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBpc09iamVjdCA9IHJlcXVpcmUoJy4vVXRpbGl0eScpLmlzT2JqZWN0O1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxEVERBdHRMaXN0ID0gcmVxdWlyZSgnLi9YTUxEVERBdHRMaXN0Jyk7XG5cbiAgWE1MRFRERW50aXR5ID0gcmVxdWlyZSgnLi9YTUxEVERFbnRpdHknKTtcblxuICBYTUxEVERFbGVtZW50ID0gcmVxdWlyZSgnLi9YTUxEVERFbGVtZW50Jyk7XG5cbiAgWE1MRFRETm90YXRpb24gPSByZXF1aXJlKCcuL1hNTERURE5vdGF0aW9uJyk7XG5cbiAgWE1MTmFtZWROb2RlTWFwID0gcmVxdWlyZSgnLi9YTUxOYW1lZE5vZGVNYXAnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTERvY1R5cGUgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxEb2NUeXBlLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTERvY1R5cGUocGFyZW50LCBwdWJJRCwgc3lzSUQpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgbGVuLCByZWYsIHJlZjEsIHJlZjI7XG4gICAgICBYTUxEb2NUeXBlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5Eb2NUeXBlO1xuICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbikge1xuICAgICAgICByZWYgPSBwYXJlbnQuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBjaGlsZC5uYW1lO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmRvY3VtZW50T2JqZWN0ID0gcGFyZW50O1xuICAgICAgaWYgKGlzT2JqZWN0KHB1YklEKSkge1xuICAgICAgICByZWYxID0gcHViSUQsIHB1YklEID0gcmVmMS5wdWJJRCwgc3lzSUQgPSByZWYxLnN5c0lEO1xuICAgICAgfVxuICAgICAgaWYgKHN5c0lEID09IG51bGwpIHtcbiAgICAgICAgcmVmMiA9IFtwdWJJRCwgc3lzSURdLCBzeXNJRCA9IHJlZjJbMF0sIHB1YklEID0gcmVmMlsxXTtcbiAgICAgIH1cbiAgICAgIGlmIChwdWJJRCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHViSUQgPSB0aGlzLnN0cmluZ2lmeS5kdGRQdWJJRChwdWJJRCk7XG4gICAgICB9XG4gICAgICBpZiAoc3lzSUQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN5c0lEID0gdGhpcy5zdHJpbmdpZnkuZHRkU3lzSUQoc3lzSUQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2NUeXBlLnByb3RvdHlwZSwgJ2VudGl0aWVzJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNoaWxkLCBpLCBsZW4sIG5vZGVzLCByZWY7XG4gICAgICAgIG5vZGVzID0ge307XG4gICAgICAgIHJlZiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgIGlmICgoY2hpbGQudHlwZSA9PT0gTm9kZVR5cGUuRW50aXR5RGVjbGFyYXRpb24pICYmICFjaGlsZC5wZSkge1xuICAgICAgICAgICAgbm9kZXNbY2hpbGQubmFtZV0gPSBjaGlsZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBYTUxOYW1lZE5vZGVNYXAobm9kZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY1R5cGUucHJvdG90eXBlLCAnbm90YXRpb25zJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNoaWxkLCBpLCBsZW4sIG5vZGVzLCByZWY7XG4gICAgICAgIG5vZGVzID0ge307XG4gICAgICAgIHJlZiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSBOb2RlVHlwZS5Ob3RhdGlvbkRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgICBub2Rlc1tjaGlsZC5uYW1lXSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFhNTE5hbWVkTm9kZU1hcChub2Rlcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jVHlwZS5wcm90b3R5cGUsICdwdWJsaWNJZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1YklEO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY1R5cGUucHJvdG90eXBlLCAnc3lzdGVtSWQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXNJRDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2NUeXBlLnByb3RvdHlwZSwgJ2ludGVybmFsU3Vic2V0Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUuZWxlbWVudCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICBjaGlsZCA9IG5ldyBYTUxEVERFbGVtZW50KHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUuYXR0TGlzdCA9IGZ1bmN0aW9uKGVsZW1lbnROYW1lLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVUeXBlLCBkZWZhdWx0VmFsdWVUeXBlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTERUREF0dExpc3QodGhpcywgZWxlbWVudE5hbWUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVR5cGUsIGRlZmF1bHRWYWx1ZVR5cGUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLmVudGl0eSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICBjaGlsZCA9IG5ldyBYTUxEVERFbnRpdHkodGhpcywgZmFsc2UsIG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUucEVudGl0eSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICBjaGlsZCA9IG5ldyBYTUxEVERFbnRpdHkodGhpcywgdHJ1ZSwgbmFtZSwgdmFsdWUpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS5ub3RhdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICBjaGlsZCA9IG5ldyBYTUxEVEROb3RhdGlvbih0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53cml0ZXIuZG9jVHlwZSh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS5lbGUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudChuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLmF0dCA9IGZ1bmN0aW9uKGVsZW1lbnROYW1lLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVUeXBlLCBkZWZhdWx0VmFsdWVUeXBlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dExpc3QoZWxlbWVudE5hbWUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVR5cGUsIGRlZmF1bHRWYWx1ZVR5cGUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLmVudCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRpdHkobmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS5wZW50ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnBFbnRpdHkobmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMubm90YXRpb24obmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucm9vdCgpIHx8IHRoaXMuZG9jdW1lbnRPYmplY3Q7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLmlzRXF1YWxOb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKCFYTUxEb2NUeXBlLl9fc3VwZXJfXy5pc0VxdWFsTm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLmlzRXF1YWxOb2RlKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLm5hbWUgIT09IHRoaXMubmFtZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5wdWJsaWNJZCAhPT0gdGhpcy5wdWJsaWNJZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5zeXN0ZW1JZCAhPT0gdGhpcy5zeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERvY1R5cGU7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTERPTUNvbmZpZ3VyYXRpb24sIFhNTERPTUltcGxlbWVudGF0aW9uLCBYTUxEb2N1bWVudCwgWE1MTm9kZSwgWE1MU3RyaW5nV3JpdGVyLCBYTUxTdHJpbmdpZmllciwgaXNQbGFpbk9iamVjdCxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuL1V0aWxpdHknKS5pc1BsYWluT2JqZWN0O1xuXG4gIFhNTERPTUltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9YTUxET01JbXBsZW1lbnRhdGlvbicpO1xuXG4gIFhNTERPTUNvbmZpZ3VyYXRpb24gPSByZXF1aXJlKCcuL1hNTERPTUNvbmZpZ3VyYXRpb24nKTtcblxuICBYTUxOb2RlID0gcmVxdWlyZSgnLi9YTUxOb2RlJyk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MU3RyaW5naWZpZXIgPSByZXF1aXJlKCcuL1hNTFN0cmluZ2lmaWVyJyk7XG5cbiAgWE1MU3RyaW5nV3JpdGVyID0gcmVxdWlyZSgnLi9YTUxTdHJpbmdXcml0ZXInKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTERvY3VtZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MRG9jdW1lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MRG9jdW1lbnQob3B0aW9ucykge1xuICAgICAgWE1MRG9jdW1lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgbnVsbCk7XG4gICAgICB0aGlzLm5hbWUgPSBcIiNkb2N1bWVudFwiO1xuICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuRG9jdW1lbnQ7XG4gICAgICB0aGlzLmRvY3VtZW50VVJJID0gbnVsbDtcbiAgICAgIHRoaXMuZG9tQ29uZmlnID0gbmV3IFhNTERPTUNvbmZpZ3VyYXRpb24oKTtcbiAgICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgICBpZiAoIW9wdGlvbnMud3JpdGVyKSB7XG4gICAgICAgIG9wdGlvbnMud3JpdGVyID0gbmV3IFhNTFN0cmluZ1dyaXRlcigpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgIHRoaXMuc3RyaW5naWZ5ID0gbmV3IFhNTFN0cmluZ2lmaWVyKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICdpbXBsZW1lbnRhdGlvbicsIHtcbiAgICAgIHZhbHVlOiBuZXcgWE1MRE9NSW1wbGVtZW50YXRpb24oKVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ2RvY3R5cGUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hpbGQsIGksIGxlbiwgcmVmO1xuICAgICAgICByZWYgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBjaGlsZCA9IHJlZltpXTtcbiAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gTm9kZVR5cGUuRG9jVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICdkb2N1bWVudEVsZW1lbnQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290T2JqZWN0IHx8IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAnaW5wdXRFbmNvZGluZycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ3N0cmljdEVycm9yQ2hlY2tpbmcnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAneG1sRW5jb2RpbmcnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggIT09IDAgJiYgdGhpcy5jaGlsZHJlblswXS50eXBlID09PSBOb2RlVHlwZS5EZWNsYXJhdGlvbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdLmVuY29kaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAneG1sU3RhbmRhbG9uZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMCAmJiB0aGlzLmNoaWxkcmVuWzBdLnR5cGUgPT09IE5vZGVUeXBlLkRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0uc3RhbmRhbG9uZSA9PT0gJ3llcyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAneG1sVmVyc2lvbicsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMCAmJiB0aGlzLmNoaWxkcmVuWzBdLnR5cGUgPT09IE5vZGVUeXBlLkRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0udmVyc2lvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXCIxLjBcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ1VSTCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50VVJJO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ29yaWdpbicsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ2NvbXBhdE1vZGUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICdjaGFyYWN0ZXJTZXQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICdjb250ZW50VHlwZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKHdyaXRlcikge1xuICAgICAgdmFyIHdyaXRlck9wdGlvbnM7XG4gICAgICB3cml0ZXJPcHRpb25zID0ge307XG4gICAgICBpZiAoIXdyaXRlcikge1xuICAgICAgICB3cml0ZXIgPSB0aGlzLm9wdGlvbnMud3JpdGVyO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHdyaXRlcikpIHtcbiAgICAgICAgd3JpdGVyT3B0aW9ucyA9IHdyaXRlcjtcbiAgICAgICAgd3JpdGVyID0gdGhpcy5vcHRpb25zLndyaXRlcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3cml0ZXIuZG9jdW1lbnQodGhpcywgd3JpdGVyLmZpbHRlck9wdGlvbnMod3JpdGVyT3B0aW9ucykpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5kb2N1bWVudCh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKHRhZ05hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZVRleHROb2RlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQ29tbWVudCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUNEQVRBU2VjdGlvbiA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKHRhcmdldCwgZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRW50aXR5UmVmZXJlbmNlID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBmdW5jdGlvbih0YWduYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5pbXBvcnROb2RlID0gZnVuY3Rpb24oaW1wb3J0ZWROb2RlLCBkZWVwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50TlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUF0dHJpYnV0ZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5nZXRFbGVtZW50c0J5VGFnTmFtZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24oZWxlbWVudElkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5hZG9wdE5vZGUgPSBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLm5vcm1hbGl6ZURvY3VtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5yZW5hbWVOb2RlID0gZnVuY3Rpb24obm9kZSwgbmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gZnVuY3Rpb24oY2xhc3NOYW1lcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRXZlbnQgPSBmdW5jdGlvbihldmVudEludGVyZmFjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlUmFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZU5vZGVJdGVyYXRvciA9IGZ1bmN0aW9uKHJvb3QsIHdoYXRUb1Nob3csIGZpbHRlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlVHJlZVdhbGtlciA9IGZ1bmN0aW9uKHJvb3QsIHdoYXRUb1Nob3csIGZpbHRlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRG9jdW1lbnQ7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFdyaXRlclN0YXRlLCBYTUxBdHRyaWJ1dGUsIFhNTENEYXRhLCBYTUxDb21tZW50LCBYTUxEVERBdHRMaXN0LCBYTUxEVERFbGVtZW50LCBYTUxEVERFbnRpdHksIFhNTERURE5vdGF0aW9uLCBYTUxEZWNsYXJhdGlvbiwgWE1MRG9jVHlwZSwgWE1MRG9jdW1lbnQsIFhNTERvY3VtZW50Q0IsIFhNTEVsZW1lbnQsIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiwgWE1MUmF3LCBYTUxTdHJpbmdXcml0ZXIsIFhNTFN0cmluZ2lmaWVyLCBYTUxUZXh0LCBnZXRWYWx1ZSwgaXNGdW5jdGlvbiwgaXNPYmplY3QsIGlzUGxhaW5PYmplY3QsIHJlZixcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgcmVmID0gcmVxdWlyZSgnLi9VdGlsaXR5JyksIGlzT2JqZWN0ID0gcmVmLmlzT2JqZWN0LCBpc0Z1bmN0aW9uID0gcmVmLmlzRnVuY3Rpb24sIGlzUGxhaW5PYmplY3QgPSByZWYuaXNQbGFpbk9iamVjdCwgZ2V0VmFsdWUgPSByZWYuZ2V0VmFsdWU7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MRG9jdW1lbnQgPSByZXF1aXJlKCcuL1hNTERvY3VtZW50Jyk7XG5cbiAgWE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vWE1MRWxlbWVudCcpO1xuXG4gIFhNTENEYXRhID0gcmVxdWlyZSgnLi9YTUxDRGF0YScpO1xuXG4gIFhNTENvbW1lbnQgPSByZXF1aXJlKCcuL1hNTENvbW1lbnQnKTtcblxuICBYTUxSYXcgPSByZXF1aXJlKCcuL1hNTFJhdycpO1xuXG4gIFhNTFRleHQgPSByZXF1aXJlKCcuL1hNTFRleHQnKTtcblxuICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gPSByZXF1aXJlKCcuL1hNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbicpO1xuXG4gIFhNTERlY2xhcmF0aW9uID0gcmVxdWlyZSgnLi9YTUxEZWNsYXJhdGlvbicpO1xuXG4gIFhNTERvY1R5cGUgPSByZXF1aXJlKCcuL1hNTERvY1R5cGUnKTtcblxuICBYTUxEVERBdHRMaXN0ID0gcmVxdWlyZSgnLi9YTUxEVERBdHRMaXN0Jyk7XG5cbiAgWE1MRFRERW50aXR5ID0gcmVxdWlyZSgnLi9YTUxEVERFbnRpdHknKTtcblxuICBYTUxEVERFbGVtZW50ID0gcmVxdWlyZSgnLi9YTUxEVERFbGVtZW50Jyk7XG5cbiAgWE1MRFRETm90YXRpb24gPSByZXF1aXJlKCcuL1hNTERURE5vdGF0aW9uJyk7XG5cbiAgWE1MQXR0cmlidXRlID0gcmVxdWlyZSgnLi9YTUxBdHRyaWJ1dGUnKTtcblxuICBYTUxTdHJpbmdpZmllciA9IHJlcXVpcmUoJy4vWE1MU3RyaW5naWZpZXInKTtcblxuICBYTUxTdHJpbmdXcml0ZXIgPSByZXF1aXJlKCcuL1hNTFN0cmluZ1dyaXRlcicpO1xuXG4gIFdyaXRlclN0YXRlID0gcmVxdWlyZSgnLi9Xcml0ZXJTdGF0ZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRG9jdW1lbnRDQiA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBYTUxEb2N1bWVudENCKG9wdGlvbnMsIG9uRGF0YSwgb25FbmQpIHtcbiAgICAgIHZhciB3cml0ZXJPcHRpb25zO1xuICAgICAgdGhpcy5uYW1lID0gXCI/eG1sXCI7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5Eb2N1bWVudDtcbiAgICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgICB3cml0ZXJPcHRpb25zID0ge307XG4gICAgICBpZiAoIW9wdGlvbnMud3JpdGVyKSB7XG4gICAgICAgIG9wdGlvbnMud3JpdGVyID0gbmV3IFhNTFN0cmluZ1dyaXRlcigpO1xuICAgICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KG9wdGlvbnMud3JpdGVyKSkge1xuICAgICAgICB3cml0ZXJPcHRpb25zID0gb3B0aW9ucy53cml0ZXI7XG4gICAgICAgIG9wdGlvbnMud3JpdGVyID0gbmV3IFhNTFN0cmluZ1dyaXRlcigpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgIHRoaXMud3JpdGVyID0gb3B0aW9ucy53cml0ZXI7XG4gICAgICB0aGlzLndyaXRlck9wdGlvbnMgPSB0aGlzLndyaXRlci5maWx0ZXJPcHRpb25zKHdyaXRlck9wdGlvbnMpO1xuICAgICAgdGhpcy5zdHJpbmdpZnkgPSBuZXcgWE1MU3RyaW5naWZpZXIob3B0aW9ucyk7XG4gICAgICB0aGlzLm9uRGF0YUNhbGxiYWNrID0gb25EYXRhIHx8IGZ1bmN0aW9uKCkge307XG4gICAgICB0aGlzLm9uRW5kQ2FsbGJhY2sgPSBvbkVuZCB8fCBmdW5jdGlvbigpIHt9O1xuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICB0aGlzLmN1cnJlbnRMZXZlbCA9IC0xO1xuICAgICAgdGhpcy5vcGVuVGFncyA9IHt9O1xuICAgICAgdGhpcy5kb2N1bWVudFN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZG9jdW1lbnRDb21wbGV0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMucm9vdCA9IG51bGw7XG4gICAgfVxuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuY3JlYXRlQ2hpbGROb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgdmFyIGF0dCwgYXR0TmFtZSwgYXR0cmlidXRlcywgY2hpbGQsIGksIGxlbiwgcmVmMSwgcmVmMjtcbiAgICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuQ0RhdGE6XG4gICAgICAgICAgdGhpcy5jZGF0YShub2RlLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5Db21tZW50OlxuICAgICAgICAgIHRoaXMuY29tbWVudChub2RlLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5FbGVtZW50OlxuICAgICAgICAgIGF0dHJpYnV0ZXMgPSB7fTtcbiAgICAgICAgICByZWYxID0gbm9kZS5hdHRyaWJzO1xuICAgICAgICAgIGZvciAoYXR0TmFtZSBpbiByZWYxKSB7XG4gICAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYxLCBhdHROYW1lKSkgY29udGludWU7XG4gICAgICAgICAgICBhdHQgPSByZWYxW2F0dE5hbWVdO1xuICAgICAgICAgICAgYXR0cmlidXRlc1thdHROYW1lXSA9IGF0dC52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5ub2RlKG5vZGUubmFtZSwgYXR0cmlidXRlcyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuRHVtbXk6XG4gICAgICAgICAgdGhpcy5kdW1teSgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLlJhdzpcbiAgICAgICAgICB0aGlzLnJhdyhub2RlLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5UZXh0OlxuICAgICAgICAgIHRoaXMudGV4dChub2RlLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5Qcm9jZXNzaW5nSW5zdHJ1Y3Rpb246XG4gICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbihub2RlLnRhcmdldCwgbm9kZS52YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBYTUwgbm9kZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYSBKUyBvYmplY3Q6IFwiICsgbm9kZS5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHJlZjIgPSBub2RlLmNoaWxkcmVuO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmMi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGlsZCA9IHJlZjJbaV07XG4gICAgICAgIHRoaXMuY3JlYXRlQ2hpbGROb2RlKGNoaWxkKTtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kdW1teSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLm5vZGUgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICB2YXIgcmVmMTtcbiAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBub2RlIG5hbWUuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucm9vdCAmJiB0aGlzLmN1cnJlbnRMZXZlbCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRG9jdW1lbnQgY2FuIG9ubHkgaGF2ZSBvbmUgcm9vdCBub2RlLiBcIiArIHRoaXMuZGVidWdJbmZvKG5hbWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIG5hbWUgPSBnZXRWYWx1ZShuYW1lKTtcbiAgICAgIGlmIChhdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgfVxuICAgICAgYXR0cmlidXRlcyA9IGdldFZhbHVlKGF0dHJpYnV0ZXMpO1xuICAgICAgaWYgKCFpc09iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICByZWYxID0gW2F0dHJpYnV0ZXMsIHRleHRdLCB0ZXh0ID0gcmVmMVswXSwgYXR0cmlidXRlcyA9IHJlZjFbMV07XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gbmV3IFhNTEVsZW1lbnQodGhpcywgbmFtZSwgYXR0cmlidXRlcyk7XG4gICAgICB0aGlzLmN1cnJlbnROb2RlLmNoaWxkcmVuID0gZmFsc2U7XG4gICAgICB0aGlzLmN1cnJlbnRMZXZlbCsrO1xuICAgICAgdGhpcy5vcGVuVGFnc1t0aGlzLmN1cnJlbnRMZXZlbF0gPSB0aGlzLmN1cnJlbnROb2RlO1xuICAgICAgaWYgKHRleHQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnRleHQodGV4dCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuZWxlbWVudCA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgbGVuLCBvbGRWYWxpZGF0aW9uRmxhZywgcmVmMSwgcm9vdDtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnROb2RlICYmIHRoaXMuY3VycmVudE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRG9jVHlwZSkge1xuICAgICAgICB0aGlzLmR0ZEVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5hbWUpIHx8IGlzT2JqZWN0KG5hbWUpIHx8IGlzRnVuY3Rpb24obmFtZSkpIHtcbiAgICAgICAgICBvbGRWYWxpZGF0aW9uRmxhZyA9IHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb247XG4gICAgICAgICAgdGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbiA9IHRydWU7XG4gICAgICAgICAgcm9vdCA9IG5ldyBYTUxEb2N1bWVudCh0aGlzLm9wdGlvbnMpLmVsZW1lbnQoJ1RFTVBfUk9PVCcpO1xuICAgICAgICAgIHJvb3QuZWxlbWVudChuYW1lKTtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uID0gb2xkVmFsaWRhdGlvbkZsYWc7XG4gICAgICAgICAgcmVmMSA9IHJvb3QuY2hpbGRyZW47XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmMS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2hpbGQgPSByZWYxW2ldO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDaGlsZE5vZGUoY2hpbGQpO1xuICAgICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy51cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm5vZGUobmFtZSwgYXR0cmlidXRlcywgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5hdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIGF0dE5hbWUsIGF0dFZhbHVlO1xuICAgICAgaWYgKCF0aGlzLmN1cnJlbnROb2RlIHx8IHRoaXMuY3VycmVudE5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXR0KCkgY2FuIG9ubHkgYmUgdXNlZCBpbW1lZGlhdGVseSBhZnRlciBhbiBlbGUoKSBjYWxsIGluIGNhbGxiYWNrIG1vZGUuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUgIT0gbnVsbCkge1xuICAgICAgICBuYW1lID0gZ2V0VmFsdWUobmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICAgICAgZm9yIChhdHROYW1lIGluIG5hbWUpIHtcbiAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChuYW1lLCBhdHROYW1lKSkgY29udGludWU7XG4gICAgICAgICAgYXR0VmFsdWUgPSBuYW1lW2F0dE5hbWVdO1xuICAgICAgICAgIHRoaXMuYXR0cmlidXRlKGF0dE5hbWUsIGF0dFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMua2VlcE51bGxBdHRyaWJ1dGVzICYmICh2YWx1ZSA9PSBudWxsKSkge1xuICAgICAgICAgIHRoaXMuY3VycmVudE5vZGUuYXR0cmlic1tuYW1lXSA9IG5ldyBYTUxBdHRyaWJ1dGUodGhpcywgbmFtZSwgXCJcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudE5vZGUuYXR0cmlic1tuYW1lXSA9IG5ldyBYTUxBdHRyaWJ1dGUodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIG5vZGUgPSBuZXcgWE1MVGV4dCh0aGlzLCB2YWx1ZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci50ZXh0KG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKSwgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5jZGF0YSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIG5vZGUgPSBuZXcgWE1MQ0RhdGEodGhpcywgdmFsdWUpO1xuICAgICAgdGhpcy5vbkRhdGEodGhpcy53cml0ZXIuY2RhdGEobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICB0aGlzLm9wZW5DdXJyZW50KCk7XG4gICAgICBub2RlID0gbmV3IFhNTENvbW1lbnQodGhpcywgdmFsdWUpO1xuICAgICAgdGhpcy5vbkRhdGEodGhpcy53cml0ZXIuY29tbWVudChub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbm9kZSA9IG5ldyBYTUxSYXcodGhpcywgdmFsdWUpO1xuICAgICAgdGhpcy5vbkRhdGEodGhpcy53cml0ZXIucmF3KG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKSwgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5pbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKHRhcmdldCwgdmFsdWUpIHtcbiAgICAgIHZhciBpLCBpbnNUYXJnZXQsIGluc1ZhbHVlLCBsZW4sIG5vZGU7XG4gICAgICB0aGlzLm9wZW5DdXJyZW50KCk7XG4gICAgICBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0ID0gZ2V0VmFsdWUodGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gZ2V0VmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSB0YXJnZXQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpbnNUYXJnZXQgPSB0YXJnZXRbaV07XG4gICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbihpbnNUYXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICAgICAgZm9yIChpbnNUYXJnZXQgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwodGFyZ2V0LCBpbnNUYXJnZXQpKSBjb250aW51ZTtcbiAgICAgICAgICBpbnNWYWx1ZSA9IHRhcmdldFtpbnNUYXJnZXRdO1xuICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24oaW5zVGFyZ2V0LCBpbnNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlID0gbmV3IFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbih0aGlzLCB0YXJnZXQsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkRhdGEodGhpcy53cml0ZXIucHJvY2Vzc2luZ0luc3RydWN0aW9uKG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKSwgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKHZlcnNpb24sIGVuY29kaW5nLCBzdGFuZGFsb25lKSB7XG4gICAgICB2YXIgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50U3RhcnRlZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZWNsYXJhdGlvbigpIG11c3QgYmUgdGhlIGZpcnN0IG5vZGUuXCIpO1xuICAgICAgfVxuICAgICAgbm9kZSA9IG5ldyBYTUxEZWNsYXJhdGlvbih0aGlzLCB2ZXJzaW9uLCBlbmNvZGluZywgc3RhbmRhbG9uZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5kZWNsYXJhdGlvbihub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuZG9jdHlwZSA9IGZ1bmN0aW9uKHJvb3QsIHB1YklELCBzeXNJRCkge1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgaWYgKHJvb3QgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHJvb3Qgbm9kZSBuYW1lLlwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZHRkKCkgbXVzdCBjb21lIGJlZm9yZSB0aGUgcm9vdCBub2RlLlwiKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBuZXcgWE1MRG9jVHlwZSh0aGlzLCBwdWJJRCwgc3lzSUQpO1xuICAgICAgdGhpcy5jdXJyZW50Tm9kZS5yb290Tm9kZU5hbWUgPSByb290O1xuICAgICAgdGhpcy5jdXJyZW50Tm9kZS5jaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5jdXJyZW50TGV2ZWwrKztcbiAgICAgIHRoaXMub3BlblRhZ3NbdGhpcy5jdXJyZW50TGV2ZWxdID0gdGhpcy5jdXJyZW50Tm9kZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kdGRFbGVtZW50ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbm9kZSA9IG5ldyBYTUxEVERFbGVtZW50KHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMub25EYXRhKHRoaXMud3JpdGVyLmR0ZEVsZW1lbnQobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmF0dExpc3QgPSBmdW5jdGlvbihlbGVtZW50TmFtZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVHlwZSwgZGVmYXVsdFZhbHVlVHlwZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICB2YXIgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIG5vZGUgPSBuZXcgWE1MRFREQXR0TGlzdCh0aGlzLCBlbGVtZW50TmFtZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVHlwZSwgZGVmYXVsdFZhbHVlVHlwZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIHRoaXMub25EYXRhKHRoaXMud3JpdGVyLmR0ZEF0dExpc3Qobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmVudGl0eSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIG5vZGUgPSBuZXcgWE1MRFRERW50aXR5KHRoaXMsIGZhbHNlLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5kdGRFbnRpdHkobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLnBFbnRpdHkgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICB0aGlzLm9wZW5DdXJyZW50KCk7XG4gICAgICBub2RlID0gbmV3IFhNTERUREVudGl0eSh0aGlzLCB0cnVlLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5kdGRFbnRpdHkobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLm5vdGF0aW9uID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbm9kZSA9IG5ldyBYTUxEVEROb3RhdGlvbih0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5kdGROb3RhdGlvbihub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRMZXZlbCA8IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGRvY3VtZW50IG5vZGUgaGFzIG5vIHBhcmVudC5cIik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jdXJyZW50Tm9kZSkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgIHRoaXMuY2xvc2VOb2RlKHRoaXMuY3VycmVudE5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub3Blbk5vZGUodGhpcy5jdXJyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNsb3NlTm9kZSh0aGlzLm9wZW5UYWdzW3RoaXMuY3VycmVudExldmVsXSk7XG4gICAgICB9XG4gICAgICBkZWxldGUgdGhpcy5vcGVuVGFnc1t0aGlzLmN1cnJlbnRMZXZlbF07XG4gICAgICB0aGlzLmN1cnJlbnRMZXZlbC0tO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgd2hpbGUgKHRoaXMuY3VycmVudExldmVsID49IDApIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMub25FbmQoKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUub3BlbkN1cnJlbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnROb2RlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudE5vZGUuY2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuTm9kZSh0aGlzLmN1cnJlbnROb2RlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUub3Blbk5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgYXR0LCBjaHVuaywgbmFtZSwgcmVmMTtcbiAgICAgIGlmICghbm9kZS5pc09wZW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLnJvb3QgJiYgdGhpcy5jdXJyZW50TGV2ZWwgPT09IDAgJiYgbm9kZS50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5yb290ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgICBjaHVuayA9ICcnO1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy53cml0ZXJPcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgICAgICBjaHVuayA9IHRoaXMud3JpdGVyLmluZGVudChub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsKSArICc8JyArIG5vZGUubmFtZTtcbiAgICAgICAgICByZWYxID0gbm9kZS5hdHRyaWJzO1xuICAgICAgICAgIGZvciAobmFtZSBpbiByZWYxKSB7XG4gICAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYxLCBuYW1lKSkgY29udGludWU7XG4gICAgICAgICAgICBhdHQgPSByZWYxW25hbWVdO1xuICAgICAgICAgICAgY2h1bmsgKz0gdGhpcy53cml0ZXIuYXR0cmlidXRlKGF0dCwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNodW5rICs9IChub2RlLmNoaWxkcmVuID8gJz4nIDogJy8+JykgKyB0aGlzLndyaXRlci5lbmRsaW5lKG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwpO1xuICAgICAgICAgIHRoaXMud3JpdGVyT3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLndyaXRlck9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgICAgIGNodW5rID0gdGhpcy53cml0ZXIuaW5kZW50KG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwpICsgJzwhRE9DVFlQRSAnICsgbm9kZS5yb290Tm9kZU5hbWU7XG4gICAgICAgICAgaWYgKG5vZGUucHViSUQgJiYgbm9kZS5zeXNJRCkge1xuICAgICAgICAgICAgY2h1bmsgKz0gJyBQVUJMSUMgXCInICsgbm9kZS5wdWJJRCArICdcIiBcIicgKyBub2RlLnN5c0lEICsgJ1wiJztcbiAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuc3lzSUQpIHtcbiAgICAgICAgICAgIGNodW5rICs9ICcgU1lTVEVNIFwiJyArIG5vZGUuc3lzSUQgKyAnXCInO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY2h1bmsgKz0gJyBbJztcbiAgICAgICAgICAgIHRoaXMud3JpdGVyT3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cml0ZXJPcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgICAgICBjaHVuayArPSAnPic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNodW5rICs9IHRoaXMud3JpdGVyLmVuZGxpbmUobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkRhdGEoY2h1bmssIHRoaXMuY3VycmVudExldmVsKTtcbiAgICAgICAgcmV0dXJuIG5vZGUuaXNPcGVuID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuY2xvc2VOb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgdmFyIGNodW5rO1xuICAgICAgaWYgKCFub2RlLmlzQ2xvc2VkKSB7XG4gICAgICAgIGNodW5rID0gJyc7XG4gICAgICAgIHRoaXMud3JpdGVyT3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSBOb2RlVHlwZS5FbGVtZW50KSB7XG4gICAgICAgICAgY2h1bmsgPSB0aGlzLndyaXRlci5pbmRlbnQobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCkgKyAnPC8nICsgbm9kZS5uYW1lICsgJz4nICsgdGhpcy53cml0ZXIuZW5kbGluZShub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaHVuayA9IHRoaXMud3JpdGVyLmluZGVudChub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsKSArICddPicgKyB0aGlzLndyaXRlci5lbmRsaW5lKG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JpdGVyT3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICAgIHRoaXMub25EYXRhKGNodW5rLCB0aGlzLmN1cnJlbnRMZXZlbCk7XG4gICAgICAgIHJldHVybiBub2RlLmlzQ2xvc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24oY2h1bmssIGxldmVsKSB7XG4gICAgICB0aGlzLmRvY3VtZW50U3RhcnRlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5vbkRhdGFDYWxsYmFjayhjaHVuaywgbGV2ZWwgKyAxKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUub25FbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnRDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMub25FbmRDYWxsYmFjaygpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kZWJ1Z0luZm8gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwibm9kZTogPFwiICsgbmFtZSArIFwiPlwiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5lbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUubm9kID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZShuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUudHh0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2RhdGEodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5jb20gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWVudCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmlucyA9IGZ1bmN0aW9uKHRhcmdldCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3RydWN0aW9uKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kZWMgPSBmdW5jdGlvbih2ZXJzaW9uLCBlbmNvZGluZywgc3RhbmRhbG9uZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVjbGFyYXRpb24odmVyc2lvbiwgZW5jb2RpbmcsIHN0YW5kYWxvbmUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kdGQgPSBmdW5jdGlvbihyb290LCBwdWJJRCwgc3lzSUQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRvY3R5cGUocm9vdCwgcHViSUQsIHN5c0lEKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuZSA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQobmFtZSwgYXR0cmlidXRlcywgdGV4dCk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLm4gPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNkYXRhKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuYyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tZW50KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yYXcodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5pID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zdHJ1Y3Rpb24odGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmF0dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE5vZGUgJiYgdGhpcy5jdXJyZW50Tm9kZS50eXBlID09PSBOb2RlVHlwZS5Eb2NUeXBlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dExpc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5hID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50Tm9kZSAmJiB0aGlzLmN1cnJlbnROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkRvY1R5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0TGlzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmVudCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnRpdHkobmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5wZW50ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnBFbnRpdHkobmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5ub3QgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMubm90YXRpb24obmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRG9jdW1lbnRDQjtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxEdW1teSwgWE1MTm9kZSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTER1bW15ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MRHVtbXksIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MRHVtbXkocGFyZW50KSB7XG4gICAgICBYTUxEdW1teS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuRHVtbXk7XG4gICAgfVxuXG4gICAgWE1MRHVtbXkucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICB9O1xuXG4gICAgWE1MRHVtbXkucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRHVtbXk7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTEF0dHJpYnV0ZSwgWE1MRWxlbWVudCwgWE1MTmFtZWROb2RlTWFwLCBYTUxOb2RlLCBnZXRWYWx1ZSwgaXNGdW5jdGlvbiwgaXNPYmplY3QsIHJlZixcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIHJlZiA9IHJlcXVpcmUoJy4vVXRpbGl0eScpLCBpc09iamVjdCA9IHJlZi5pc09iamVjdCwgaXNGdW5jdGlvbiA9IHJlZi5pc0Z1bmN0aW9uLCBnZXRWYWx1ZSA9IHJlZi5nZXRWYWx1ZTtcblxuICBYTUxOb2RlID0gcmVxdWlyZSgnLi9YTUxOb2RlJyk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MQXR0cmlidXRlID0gcmVxdWlyZSgnLi9YTUxBdHRyaWJ1dGUnKTtcblxuICBYTUxOYW1lZE5vZGVNYXAgPSByZXF1aXJlKCcuL1hNTE5hbWVkTm9kZU1hcCcpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRWxlbWVudCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTEVsZW1lbnQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MRWxlbWVudChwYXJlbnQsIG5hbWUsIGF0dHJpYnV0ZXMpIHtcbiAgICAgIHZhciBjaGlsZCwgaiwgbGVuLCByZWYxO1xuICAgICAgWE1MRWxlbWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGVsZW1lbnQgbmFtZS4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuc3RyaW5naWZ5Lm5hbWUobmFtZSk7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5FbGVtZW50O1xuICAgICAgdGhpcy5hdHRyaWJzID0ge307XG4gICAgICB0aGlzLnNjaGVtYVR5cGVJbmZvID0gbnVsbDtcbiAgICAgIGlmIChhdHRyaWJ1dGVzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUoYXR0cmlidXRlcyk7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50LnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMuaXNSb290ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb2N1bWVudE9iamVjdCA9IHBhcmVudDtcbiAgICAgICAgcGFyZW50LnJvb3RPYmplY3QgPSB0aGlzO1xuICAgICAgICBpZiAocGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgcmVmMSA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHJlZjFbal07XG4gICAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gTm9kZVR5cGUuRG9jVHlwZSkge1xuICAgICAgICAgICAgICBjaGlsZC5uYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRWxlbWVudC5wcm90b3R5cGUsICd0YWdOYW1lJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ25hbWVzcGFjZVVSSScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ3ByZWZpeCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ2xvY2FsTmFtZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRWxlbWVudC5wcm90b3R5cGUsICdpZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ2NsYXNzTmFtZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ2NsYXNzTGlzdCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ2F0dHJpYnV0ZXMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuYXR0cmlidXRlTWFwIHx8ICF0aGlzLmF0dHJpYnV0ZU1hcC5ub2Rlcykge1xuICAgICAgICAgIHRoaXMuYXR0cmlidXRlTWFwID0gbmV3IFhNTE5hbWVkTm9kZU1hcCh0aGlzLmF0dHJpYnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZU1hcDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXR0LCBhdHROYW1lLCBjbG9uZWRTZWxmLCByZWYxO1xuICAgICAgY2xvbmVkU2VsZiA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgICBpZiAoY2xvbmVkU2VsZi5pc1Jvb3QpIHtcbiAgICAgICAgY2xvbmVkU2VsZi5kb2N1bWVudE9iamVjdCA9IG51bGw7XG4gICAgICB9XG4gICAgICBjbG9uZWRTZWxmLmF0dHJpYnMgPSB7fTtcbiAgICAgIHJlZjEgPSB0aGlzLmF0dHJpYnM7XG4gICAgICBmb3IgKGF0dE5hbWUgaW4gcmVmMSkge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYxLCBhdHROYW1lKSkgY29udGludWU7XG4gICAgICAgIGF0dCA9IHJlZjFbYXR0TmFtZV07XG4gICAgICAgIGNsb25lZFNlbGYuYXR0cmlic1thdHROYW1lXSA9IGF0dC5jbG9uZSgpO1xuICAgICAgfVxuICAgICAgY2xvbmVkU2VsZi5jaGlsZHJlbiA9IFtdO1xuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIHZhciBjbG9uZWRDaGlsZDtcbiAgICAgICAgY2xvbmVkQ2hpbGQgPSBjaGlsZC5jbG9uZSgpO1xuICAgICAgICBjbG9uZWRDaGlsZC5wYXJlbnQgPSBjbG9uZWRTZWxmO1xuICAgICAgICByZXR1cm4gY2xvbmVkU2VsZi5jaGlsZHJlbi5wdXNoKGNsb25lZENoaWxkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNsb25lZFNlbGY7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgYXR0TmFtZSwgYXR0VmFsdWU7XG4gICAgICBpZiAobmFtZSAhPSBudWxsKSB7XG4gICAgICAgIG5hbWUgPSBnZXRWYWx1ZShuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgICAgICBmb3IgKGF0dE5hbWUgaW4gbmFtZSkge1xuICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKG5hbWUsIGF0dE5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBhdHRWYWx1ZSA9IG5hbWVbYXR0TmFtZV07XG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGUoYXR0TmFtZSwgYXR0VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZWVwTnVsbEF0dHJpYnV0ZXMgJiYgKHZhbHVlID09IG51bGwpKSB7XG4gICAgICAgICAgdGhpcy5hdHRyaWJzW25hbWVdID0gbmV3IFhNTEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5hdHRyaWJzW25hbWVdID0gbmV3IFhNTEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgYXR0TmFtZSwgaiwgbGVuO1xuICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGF0dHJpYnV0ZSBuYW1lLiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgbmFtZSA9IGdldFZhbHVlKG5hbWUpO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkpIHtcbiAgICAgICAgZm9yIChqID0gMCwgbGVuID0gbmFtZS5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGF0dE5hbWUgPSBuYW1lW2pdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmF0dHJpYnNbYXR0TmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmF0dHJpYnNbbmFtZV07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5lbGVtZW50KHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmF0dCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5hID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGlmICh0aGlzLmF0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlic1tuYW1lXS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5nZXRBdHRyaWJ1dGVOb2RlID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKHRoaXMuYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJzW25hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZU5vZGUgPSBmdW5jdGlvbihuZXdBdHRyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5vZGUgPSBmdW5jdGlvbihvbGRBdHRyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5nZXRBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lLCB2YWx1ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZU5vZGVOUyA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZU5vZGVOUyA9IGZ1bmN0aW9uKG5ld0F0dHIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWVOUyA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmhhc0F0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuc2V0SWRBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCBpc0lkKSB7XG4gICAgICBpZiAodGhpcy5hdHRyaWJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnNbbmFtZV0uaXNJZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpc0lkO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5zZXRJZEF0dHJpYnV0ZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUsIGlzSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuc2V0SWRBdHRyaWJ1dGVOb2RlID0gZnVuY3Rpb24oaWRBdHRyLCBpc0lkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lID0gZnVuY3Rpb24odGFnbmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5nZXRFbGVtZW50c0J5VGFnTmFtZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IGZ1bmN0aW9uKGNsYXNzTmFtZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuaXNFcXVhbE5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgaSwgaiwgcmVmMTtcbiAgICAgIGlmICghWE1MRWxlbWVudC5fX3N1cGVyX18uaXNFcXVhbE5vZGUuYXBwbHkodGhpcywgYXJndW1lbnRzKS5pc0VxdWFsTm9kZShub2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5uYW1lc3BhY2VVUkkgIT09IHRoaXMubmFtZXNwYWNlVVJJKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnByZWZpeCAhPT0gdGhpcy5wcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubG9jYWxOYW1lICE9PSB0aGlzLmxvY2FsTmFtZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5hdHRyaWJzLmxlbmd0aCAhPT0gdGhpcy5hdHRyaWJzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSBqID0gMCwgcmVmMSA9IHRoaXMuYXR0cmlicy5sZW5ndGggLSAxOyAwIDw9IHJlZjEgPyBqIDw9IHJlZjEgOiBqID49IHJlZjE7IGkgPSAwIDw9IHJlZjEgPyArK2ogOiAtLWopIHtcbiAgICAgICAgaWYgKCF0aGlzLmF0dHJpYnNbaV0uaXNFcXVhbE5vZGUobm9kZS5hdHRyaWJzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxFbGVtZW50O1xuXG4gIH0pKFhNTE5vZGUpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIFhNTE5hbWVkTm9kZU1hcDtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTE5hbWVkTm9kZU1hcCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBYTUxOYW1lZE5vZGVNYXAobm9kZXMpIHtcbiAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZSwgJ2xlbmd0aCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm5vZGVzKS5sZW5ndGggfHwgMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTE5hbWVkTm9kZU1hcC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzID0gbnVsbDtcbiAgICB9O1xuXG4gICAgWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZS5nZXROYW1lZEl0ZW0gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZS5zZXROYW1lZEl0ZW0gPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgb2xkTm9kZTtcbiAgICAgIG9sZE5vZGUgPSB0aGlzLm5vZGVzW25vZGUubm9kZU5hbWVdO1xuICAgICAgdGhpcy5ub2Rlc1tub2RlLm5vZGVOYW1lXSA9IG5vZGU7XG4gICAgICByZXR1cm4gb2xkTm9kZSB8fCBudWxsO1xuICAgIH07XG5cbiAgICBYTUxOYW1lZE5vZGVNYXAucHJvdG90eXBlLnJlbW92ZU5hbWVkSXRlbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBvbGROb2RlO1xuICAgICAgb2xkTm9kZSA9IHRoaXMubm9kZXNbbmFtZV07XG4gICAgICBkZWxldGUgdGhpcy5ub2Rlc1tuYW1lXTtcbiAgICAgIHJldHVybiBvbGROb2RlIHx8IG51bGw7XG4gICAgfTtcblxuICAgIFhNTE5hbWVkTm9kZU1hcC5wcm90b3R5cGUuaXRlbSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlc1tPYmplY3Qua2V5cyh0aGlzLm5vZGVzKVtpbmRleF1dIHx8IG51bGw7XG4gICAgfTtcblxuICAgIFhNTE5hbWVkTm9kZU1hcC5wcm90b3R5cGUuZ2V0TmFtZWRJdGVtTlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIGxvY2FsTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIik7XG4gICAgfTtcblxuICAgIFhNTE5hbWVkTm9kZU1hcC5wcm90b3R5cGUuc2V0TmFtZWRJdGVtTlMgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuXG4gICAgWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZS5yZW1vdmVOYW1lZEl0ZW1OUyA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTE5hbWVkTm9kZU1hcDtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIERvY3VtZW50UG9zaXRpb24sIE5vZGVUeXBlLCBYTUxDRGF0YSwgWE1MQ29tbWVudCwgWE1MRGVjbGFyYXRpb24sIFhNTERvY1R5cGUsIFhNTER1bW15LCBYTUxFbGVtZW50LCBYTUxOYW1lZE5vZGVNYXAsIFhNTE5vZGUsIFhNTE5vZGVMaXN0LCBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24sIFhNTFJhdywgWE1MVGV4dCwgZ2V0VmFsdWUsIGlzRW1wdHksIGlzRnVuY3Rpb24sIGlzT2JqZWN0LCByZWYxLFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICByZWYxID0gcmVxdWlyZSgnLi9VdGlsaXR5JyksIGlzT2JqZWN0ID0gcmVmMS5pc09iamVjdCwgaXNGdW5jdGlvbiA9IHJlZjEuaXNGdW5jdGlvbiwgaXNFbXB0eSA9IHJlZjEuaXNFbXB0eSwgZ2V0VmFsdWUgPSByZWYxLmdldFZhbHVlO1xuXG4gIFhNTEVsZW1lbnQgPSBudWxsO1xuXG4gIFhNTENEYXRhID0gbnVsbDtcblxuICBYTUxDb21tZW50ID0gbnVsbDtcblxuICBYTUxEZWNsYXJhdGlvbiA9IG51bGw7XG5cbiAgWE1MRG9jVHlwZSA9IG51bGw7XG5cbiAgWE1MUmF3ID0gbnVsbDtcblxuICBYTUxUZXh0ID0gbnVsbDtcblxuICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gPSBudWxsO1xuXG4gIFhNTER1bW15ID0gbnVsbDtcblxuICBOb2RlVHlwZSA9IG51bGw7XG5cbiAgWE1MTm9kZUxpc3QgPSBudWxsO1xuXG4gIFhNTE5hbWVkTm9kZU1hcCA9IG51bGw7XG5cbiAgRG9jdW1lbnRQb3NpdGlvbiA9IG51bGw7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxOb2RlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTE5vZGUocGFyZW50MSkge1xuICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQxO1xuICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMucGFyZW50Lm9wdGlvbnM7XG4gICAgICAgIHRoaXMuc3RyaW5naWZ5ID0gdGhpcy5wYXJlbnQuc3RyaW5naWZ5O1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICB0aGlzLmJhc2VVUkkgPSBudWxsO1xuICAgICAgaWYgKCFYTUxFbGVtZW50KSB7XG4gICAgICAgIFhNTEVsZW1lbnQgPSByZXF1aXJlKCcuL1hNTEVsZW1lbnQnKTtcbiAgICAgICAgWE1MQ0RhdGEgPSByZXF1aXJlKCcuL1hNTENEYXRhJyk7XG4gICAgICAgIFhNTENvbW1lbnQgPSByZXF1aXJlKCcuL1hNTENvbW1lbnQnKTtcbiAgICAgICAgWE1MRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuL1hNTERlY2xhcmF0aW9uJyk7XG4gICAgICAgIFhNTERvY1R5cGUgPSByZXF1aXJlKCcuL1hNTERvY1R5cGUnKTtcbiAgICAgICAgWE1MUmF3ID0gcmVxdWlyZSgnLi9YTUxSYXcnKTtcbiAgICAgICAgWE1MVGV4dCA9IHJlcXVpcmUoJy4vWE1MVGV4dCcpO1xuICAgICAgICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gPSByZXF1aXJlKCcuL1hNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbicpO1xuICAgICAgICBYTUxEdW1teSA9IHJlcXVpcmUoJy4vWE1MRHVtbXknKTtcbiAgICAgICAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG4gICAgICAgIFhNTE5vZGVMaXN0ID0gcmVxdWlyZSgnLi9YTUxOb2RlTGlzdCcpO1xuICAgICAgICBYTUxOYW1lZE5vZGVNYXAgPSByZXF1aXJlKCcuL1hNTE5hbWVkTm9kZU1hcCcpO1xuICAgICAgICBEb2N1bWVudFBvc2l0aW9uID0gcmVxdWlyZSgnLi9Eb2N1bWVudFBvc2l0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAnbm9kZU5hbWUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAnbm9kZVR5cGUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAnbm9kZVZhbHVlJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdwYXJlbnROb2RlJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAnY2hpbGROb2RlcycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGlsZE5vZGVMaXN0IHx8ICF0aGlzLmNoaWxkTm9kZUxpc3Qubm9kZXMpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkTm9kZUxpc3QgPSBuZXcgWE1MTm9kZUxpc3QodGhpcy5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGROb2RlTGlzdDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxOb2RlLnByb3RvdHlwZSwgJ2ZpcnN0Q2hpbGQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXSB8fCBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAnbGFzdENoaWxkJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxXSB8fCBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAncHJldmlvdXNTaWJsaW5nJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuY2hpbGRyZW5baSAtIDFdIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICduZXh0U2libGluZycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuW2kgKyAxXSB8fCBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAnb3duZXJEb2N1bWVudCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50KCkgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxOb2RlLnByb3RvdHlwZSwgJ3RleHRDb250ZW50Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNoaWxkLCBqLCBsZW4sIHJlZjIsIHN0cjtcbiAgICAgICAgaWYgKHRoaXMubm9kZVR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQgfHwgdGhpcy5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICAgIHN0ciA9ICcnO1xuICAgICAgICAgIHJlZjIgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZjIubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGNoaWxkID0gcmVmMltqXTtcbiAgICAgICAgICAgIGlmIChjaGlsZC50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICBzdHIgKz0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnNldFBhcmVudCA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgICAgdmFyIGNoaWxkLCBqLCBsZW4sIHJlZjIsIHJlc3VsdHM7XG4gICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gcGFyZW50Lm9wdGlvbnM7XG4gICAgICAgIHRoaXMuc3RyaW5naWZ5ID0gcGFyZW50LnN0cmluZ2lmeTtcbiAgICAgIH1cbiAgICAgIHJlZjIgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmMi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBjaGlsZCA9IHJlZjJbal07XG4gICAgICAgIHJlc3VsdHMucHVzaChjaGlsZC5zZXRQYXJlbnQodGhpcykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmVsZW1lbnQgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICB2YXIgY2hpbGROb2RlLCBpdGVtLCBqLCBrLCBrZXksIGxhc3RDaGlsZCwgbGVuLCBsZW4xLCByZWYyLCByZWYzLCB2YWw7XG4gICAgICBsYXN0Q2hpbGQgPSBudWxsO1xuICAgICAgaWYgKGF0dHJpYnV0ZXMgPT09IG51bGwgJiYgKHRleHQgPT0gbnVsbCkpIHtcbiAgICAgICAgcmVmMiA9IFt7fSwgbnVsbF0sIGF0dHJpYnV0ZXMgPSByZWYyWzBdLCB0ZXh0ID0gcmVmMlsxXTtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRyaWJ1dGVzID09IG51bGwpIHtcbiAgICAgICAgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgfVxuICAgICAgYXR0cmlidXRlcyA9IGdldFZhbHVlKGF0dHJpYnV0ZXMpO1xuICAgICAgaWYgKCFpc09iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICByZWYzID0gW2F0dHJpYnV0ZXMsIHRleHRdLCB0ZXh0ID0gcmVmM1swXSwgYXR0cmlidXRlcyA9IHJlZjNbMV07XG4gICAgICB9XG4gICAgICBpZiAobmFtZSAhPSBudWxsKSB7XG4gICAgICAgIG5hbWUgPSBnZXRWYWx1ZShuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5hbWUpKSB7XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IG5hbWUubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICBpdGVtID0gbmFtZVtqXTtcbiAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmVsZW1lbnQoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmVsZW1lbnQobmFtZS5hcHBseSgpKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gbmFtZSkge1xuICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKG5hbWUsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgIHZhbCA9IG5hbWVba2V5XTtcbiAgICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWwuYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlRGVjb3JhdG9ycyAmJiB0aGlzLnN0cmluZ2lmeS5jb252ZXJ0QXR0S2V5ICYmIGtleS5pbmRleE9mKHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRBdHRLZXkpID09PSAwKSB7XG4gICAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmF0dHJpYnV0ZShrZXkuc3Vic3RyKHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRBdHRLZXkubGVuZ3RoKSwgdmFsKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuc2VwYXJhdGVBcnJheUl0ZW1zICYmIEFycmF5LmlzQXJyYXkodmFsKSAmJiBpc0VtcHR5KHZhbCkpIHtcbiAgICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuZHVtbXkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkgJiYgaXNFbXB0eSh2YWwpKSB7XG4gICAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmVsZW1lbnQoa2V5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMua2VlcE51bGxOb2RlcyAmJiAodmFsID09IG51bGwpKSB7XG4gICAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmR1bW15KCk7XG4gICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLnNlcGFyYXRlQXJyYXlJdGVtcyAmJiBBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgIGZvciAoayA9IDAsIGxlbjEgPSB2YWwubGVuZ3RoOyBrIDwgbGVuMTsgaysrKSB7XG4gICAgICAgICAgICAgIGl0ZW0gPSB2YWxba107XG4gICAgICAgICAgICAgIGNoaWxkTm9kZSA9IHt9O1xuICAgICAgICAgICAgICBjaGlsZE5vZGVba2V5XSA9IGl0ZW07XG4gICAgICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuZWxlbWVudChjaGlsZE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlRGVjb3JhdG9ycyAmJiB0aGlzLnN0cmluZ2lmeS5jb252ZXJ0VGV4dEtleSAmJiBrZXkuaW5kZXhPZih0aGlzLnN0cmluZ2lmeS5jb252ZXJ0VGV4dEtleSkgPT09IDApIHtcbiAgICAgICAgICAgICAgbGFzdENoaWxkID0gdGhpcy5lbGVtZW50KHZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmVsZW1lbnQoa2V5KTtcbiAgICAgICAgICAgICAgbGFzdENoaWxkLmVsZW1lbnQodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFzdENoaWxkID0gdGhpcy5lbGVtZW50KGtleSwgdmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5rZWVwTnVsbE5vZGVzICYmIHRleHQgPT09IG51bGwpIHtcbiAgICAgICAgbGFzdENoaWxkID0gdGhpcy5kdW1teSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlRGVjb3JhdG9ycyAmJiB0aGlzLnN0cmluZ2lmeS5jb252ZXJ0VGV4dEtleSAmJiBuYW1lLmluZGV4T2YodGhpcy5zdHJpbmdpZnkuY29udmVydFRleHRLZXkpID09PSAwKSB7XG4gICAgICAgICAgbGFzdENoaWxkID0gdGhpcy50ZXh0KHRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlRGVjb3JhdG9ycyAmJiB0aGlzLnN0cmluZ2lmeS5jb252ZXJ0Q0RhdGFLZXkgJiYgbmFtZS5pbmRleE9mKHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRDRGF0YUtleSkgPT09IDApIHtcbiAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmNkYXRhKHRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlRGVjb3JhdG9ycyAmJiB0aGlzLnN0cmluZ2lmeS5jb252ZXJ0Q29tbWVudEtleSAmJiBuYW1lLmluZGV4T2YodGhpcy5zdHJpbmdpZnkuY29udmVydENvbW1lbnRLZXkpID09PSAwKSB7XG4gICAgICAgICAgbGFzdENoaWxkID0gdGhpcy5jb21tZW50KHRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlRGVjb3JhdG9ycyAmJiB0aGlzLnN0cmluZ2lmeS5jb252ZXJ0UmF3S2V5ICYmIG5hbWUuaW5kZXhPZih0aGlzLnN0cmluZ2lmeS5jb252ZXJ0UmF3S2V5KSA9PT0gMCkge1xuICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMucmF3KHRleHQpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuaWdub3JlRGVjb3JhdG9ycyAmJiB0aGlzLnN0cmluZ2lmeS5jb252ZXJ0UElLZXkgJiYgbmFtZS5pbmRleE9mKHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRQSUtleSkgPT09IDApIHtcbiAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmluc3RydWN0aW9uKG5hbWUuc3Vic3RyKHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRQSUtleS5sZW5ndGgpLCB0ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLm5vZGUobmFtZSwgYXR0cmlidXRlcywgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChsYXN0Q2hpbGQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgY3JlYXRlIGFueSBlbGVtZW50cyB3aXRoOiBcIiArIG5hbWUgKyBcIi4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsYXN0Q2hpbGQ7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmluc2VydEJlZm9yZSA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgbmV3Q2hpbGQsIHJlZkNoaWxkLCByZW1vdmVkO1xuICAgICAgaWYgKG5hbWUgIT0gbnVsbCA/IG5hbWUudHlwZSA6IHZvaWQgMCkge1xuICAgICAgICBuZXdDaGlsZCA9IG5hbWU7XG4gICAgICAgIHJlZkNoaWxkID0gYXR0cmlidXRlcztcbiAgICAgICAgbmV3Q2hpbGQuc2V0UGFyZW50KHRoaXMpO1xuICAgICAgICBpZiAocmVmQ2hpbGQpIHtcbiAgICAgICAgICBpID0gY2hpbGRyZW4uaW5kZXhPZihyZWZDaGlsZCk7XG4gICAgICAgICAgcmVtb3ZlZCA9IGNoaWxkcmVuLnNwbGljZShpKTtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5ld0NoaWxkKTtcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShjaGlsZHJlbiwgcmVtb3ZlZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChuZXdDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSb290KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGluc2VydCBlbGVtZW50cyBhdCByb290IGxldmVsLiBcIiArIHRoaXMuZGVidWdJbmZvKG5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgICAgcmVtb3ZlZCA9IHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpKTtcbiAgICAgICAgY2hpbGQgPSB0aGlzLnBhcmVudC5lbGVtZW50KG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpO1xuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnBhcmVudC5jaGlsZHJlbiwgcmVtb3ZlZCk7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaW5zZXJ0QWZ0ZXIgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICB2YXIgY2hpbGQsIGksIHJlbW92ZWQ7XG4gICAgICBpZiAodGhpcy5pc1Jvb3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGluc2VydCBlbGVtZW50cyBhdCByb290IGxldmVsLiBcIiArIHRoaXMuZGVidWdJbmZvKG5hbWUpKTtcbiAgICAgIH1cbiAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgcmVtb3ZlZCA9IHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpICsgMSk7XG4gICAgICBjaGlsZCA9IHRoaXMucGFyZW50LmVsZW1lbnQobmFtZSwgYXR0cmlidXRlcywgdGV4dCk7XG4gICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnBhcmVudC5jaGlsZHJlbiwgcmVtb3ZlZCk7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIHJlZjI7XG4gICAgICBpZiAodGhpcy5pc1Jvb3QpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHJlbW92ZSB0aGUgcm9vdCBlbGVtZW50LiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgaSA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICBbXS5zcGxpY2UuYXBwbHkodGhpcy5wYXJlbnQuY2hpbGRyZW4sIFtpLCBpIC0gaSArIDFdLmNvbmNhdChyZWYyID0gW10pKSwgcmVmMjtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHZhciBjaGlsZCwgcmVmMjtcbiAgICAgIGlmIChuYW1lICE9IG51bGwpIHtcbiAgICAgICAgbmFtZSA9IGdldFZhbHVlKG5hbWUpO1xuICAgICAgfVxuICAgICAgYXR0cmlidXRlcyB8fCAoYXR0cmlidXRlcyA9IHt9KTtcbiAgICAgIGF0dHJpYnV0ZXMgPSBnZXRWYWx1ZShhdHRyaWJ1dGVzKTtcbiAgICAgIGlmICghaXNPYmplY3QoYXR0cmlidXRlcykpIHtcbiAgICAgICAgcmVmMiA9IFthdHRyaWJ1dGVzLCB0ZXh0XSwgdGV4dCA9IHJlZjJbMF0sIGF0dHJpYnV0ZXMgPSByZWYyWzFdO1xuICAgICAgfVxuICAgICAgY2hpbGQgPSBuZXcgWE1MRWxlbWVudCh0aGlzLCBuYW1lLCBhdHRyaWJ1dGVzKTtcbiAgICAgIGlmICh0ZXh0ICE9IG51bGwpIHtcbiAgICAgICAgY2hpbGQudGV4dCh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGNoaWxkO1xuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQodmFsdWUpO1xuICAgICAgfVxuICAgICAgY2hpbGQgPSBuZXcgWE1MVGV4dCh0aGlzLCB2YWx1ZSk7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmNkYXRhID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTENEYXRhKHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuY29tbWVudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICBjaGlsZCA9IG5ldyBYTUxDb21tZW50KHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuY29tbWVudEJlZm9yZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQsIGksIHJlbW92ZWQ7XG4gICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSk7XG4gICAgICBjaGlsZCA9IHRoaXMucGFyZW50LmNvbW1lbnQodmFsdWUpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5wYXJlbnQuY2hpbGRyZW4sIHJlbW92ZWQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmNvbW1lbnRBZnRlciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQsIGksIHJlbW92ZWQ7XG4gICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSArIDEpO1xuICAgICAgY2hpbGQgPSB0aGlzLnBhcmVudC5jb21tZW50KHZhbHVlKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMucGFyZW50LmNoaWxkcmVuLCByZW1vdmVkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5yYXcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGNoaWxkO1xuICAgICAgY2hpbGQgPSBuZXcgWE1MUmF3KHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZHVtbXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTER1bW15KHRoaXMpO1xuICAgICAgcmV0dXJuIGNoaWxkO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKHRhcmdldCwgdmFsdWUpIHtcbiAgICAgIHZhciBpbnNUYXJnZXQsIGluc1ZhbHVlLCBpbnN0cnVjdGlvbiwgaiwgbGVuO1xuICAgICAgaWYgKHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgIHRhcmdldCA9IGdldFZhbHVlKHRhcmdldCk7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IGdldFZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgZm9yIChqID0gMCwgbGVuID0gdGFyZ2V0Lmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgaW5zVGFyZ2V0ID0gdGFyZ2V0W2pdO1xuICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24oaW5zVGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh0YXJnZXQpKSB7XG4gICAgICAgIGZvciAoaW5zVGFyZ2V0IGluIHRhcmdldCkge1xuICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHRhcmdldCwgaW5zVGFyZ2V0KSkgY29udGludWU7XG4gICAgICAgICAgaW5zVmFsdWUgPSB0YXJnZXRbaW5zVGFyZ2V0XTtcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9uKGluc1RhcmdldCwgaW5zVmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdHJ1Y3Rpb24gPSBuZXcgWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uKHRoaXMsIHRhcmdldCwgdmFsdWUpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goaW5zdHJ1Y3Rpb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmluc3RydWN0aW9uQmVmb3JlID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgdmFyIGNoaWxkLCBpLCByZW1vdmVkO1xuICAgICAgaSA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICByZW1vdmVkID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGkpO1xuICAgICAgY2hpbGQgPSB0aGlzLnBhcmVudC5pbnN0cnVjdGlvbih0YXJnZXQsIHZhbHVlKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMucGFyZW50LmNoaWxkcmVuLCByZW1vdmVkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pbnN0cnVjdGlvbkFmdGVyID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgdmFyIGNoaWxkLCBpLCByZW1vdmVkO1xuICAgICAgaSA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICByZW1vdmVkID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGkgKyAxKTtcbiAgICAgIGNoaWxkID0gdGhpcy5wYXJlbnQuaW5zdHJ1Y3Rpb24odGFyZ2V0LCB2YWx1ZSk7XG4gICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnBhcmVudC5jaGlsZHJlbiwgcmVtb3ZlZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZGVjbGFyYXRpb24gPSBmdW5jdGlvbih2ZXJzaW9uLCBlbmNvZGluZywgc3RhbmRhbG9uZSkge1xuICAgICAgdmFyIGRvYywgeG1sZGVjO1xuICAgICAgZG9jID0gdGhpcy5kb2N1bWVudCgpO1xuICAgICAgeG1sZGVjID0gbmV3IFhNTERlY2xhcmF0aW9uKGRvYywgdmVyc2lvbiwgZW5jb2RpbmcsIHN0YW5kYWxvbmUpO1xuICAgICAgaWYgKGRvYy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZG9jLmNoaWxkcmVuLnVuc2hpZnQoeG1sZGVjKTtcbiAgICAgIH0gZWxzZSBpZiAoZG9jLmNoaWxkcmVuWzBdLnR5cGUgPT09IE5vZGVUeXBlLkRlY2xhcmF0aW9uKSB7XG4gICAgICAgIGRvYy5jaGlsZHJlblswXSA9IHhtbGRlYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvYy5jaGlsZHJlbi51bnNoaWZ0KHhtbGRlYyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZG9jLnJvb3QoKSB8fCBkb2M7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmR0ZCA9IGZ1bmN0aW9uKHB1YklELCBzeXNJRCkge1xuICAgICAgdmFyIGNoaWxkLCBkb2MsIGRvY3R5cGUsIGksIGosIGssIGxlbiwgbGVuMSwgcmVmMiwgcmVmMztcbiAgICAgIGRvYyA9IHRoaXMuZG9jdW1lbnQoKTtcbiAgICAgIGRvY3R5cGUgPSBuZXcgWE1MRG9jVHlwZShkb2MsIHB1YklELCBzeXNJRCk7XG4gICAgICByZWYyID0gZG9jLmNoaWxkcmVuO1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IHJlZjIubGVuZ3RoOyBqIDwgbGVuOyBpID0gKytqKSB7XG4gICAgICAgIGNoaWxkID0gcmVmMltpXTtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IE5vZGVUeXBlLkRvY1R5cGUpIHtcbiAgICAgICAgICBkb2MuY2hpbGRyZW5baV0gPSBkb2N0eXBlO1xuICAgICAgICAgIHJldHVybiBkb2N0eXBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWYzID0gZG9jLmNoaWxkcmVuO1xuICAgICAgZm9yIChpID0gayA9IDAsIGxlbjEgPSByZWYzLmxlbmd0aDsgayA8IGxlbjE7IGkgPSArK2spIHtcbiAgICAgICAgY2hpbGQgPSByZWYzW2ldO1xuICAgICAgICBpZiAoY2hpbGQuaXNSb290KSB7XG4gICAgICAgICAgZG9jLmNoaWxkcmVuLnNwbGljZShpLCAwLCBkb2N0eXBlKTtcbiAgICAgICAgICByZXR1cm4gZG9jdHlwZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZG9jLmNoaWxkcmVuLnB1c2goZG9jdHlwZSk7XG4gICAgICByZXR1cm4gZG9jdHlwZTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUudXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzUm9vdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcm9vdCBub2RlIGhhcyBubyBwYXJlbnQuIFVzZSBkb2MoKSBpZiB5b3UgbmVlZCB0byBnZXQgdGhlIGRvY3VtZW50IG9iamVjdC5cIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgbm9kZSA9IHRoaXM7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSBOb2RlVHlwZS5Eb2N1bWVudCkge1xuICAgICAgICAgIHJldHVybiBub2RlLnJvb3RPYmplY3Q7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5pc1Jvb3QpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZG9jdW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgbm9kZSA9IHRoaXM7XG4gICAgICB3aGlsZSAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS50eXBlID09PSBOb2RlVHlwZS5Eb2N1bWVudCkge1xuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb2N1bWVudCgpLmVuZChvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGk7XG4gICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIGlmIChpIDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBbHJlYWR5IGF0IHRoZSBmaXJzdCBub2RlLiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuW2kgLSAxXTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGk7XG4gICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIGlmIChpID09PSAtMSB8fCBpID09PSB0aGlzLnBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFscmVhZHkgYXQgdGhlIGxhc3Qgbm9kZS4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnBhcmVudC5jaGlsZHJlbltpICsgMV07XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmltcG9ydERvY3VtZW50ID0gZnVuY3Rpb24oZG9jKSB7XG4gICAgICB2YXIgY2xvbmVkUm9vdDtcbiAgICAgIGNsb25lZFJvb3QgPSBkb2Mucm9vdCgpLmNsb25lKCk7XG4gICAgICBjbG9uZWRSb290LnBhcmVudCA9IHRoaXM7XG4gICAgICBjbG9uZWRSb290LmlzUm9vdCA9IGZhbHNlO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNsb25lZFJvb3QpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmRlYnVnSW5mbyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciByZWYyLCByZWYzO1xuICAgICAgbmFtZSA9IG5hbWUgfHwgdGhpcy5uYW1lO1xuICAgICAgaWYgKChuYW1lID09IG51bGwpICYmICEoKHJlZjIgPSB0aGlzLnBhcmVudCkgIT0gbnVsbCA/IHJlZjIubmFtZSA6IHZvaWQgMCkpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2UgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJwYXJlbnQ6IDxcIiArIHRoaXMucGFyZW50Lm5hbWUgKyBcIj5cIjtcbiAgICAgIH0gZWxzZSBpZiAoISgocmVmMyA9IHRoaXMucGFyZW50KSAhPSBudWxsID8gcmVmMy5uYW1lIDogdm9pZCAwKSkge1xuICAgICAgICByZXR1cm4gXCJub2RlOiA8XCIgKyBuYW1lICsgXCI+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJub2RlOiA8XCIgKyBuYW1lICsgXCI+LCBwYXJlbnQ6IDxcIiArIHRoaXMucGFyZW50Lm5hbWUgKyBcIj5cIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZWxlID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudChuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUubm9kID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZShuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUudHh0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5kYXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2RhdGEodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5jb20gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWVudCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmlucyA9IGZ1bmN0aW9uKHRhcmdldCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3RydWN0aW9uKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5kb2MgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50KCk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmRlYyA9IGZ1bmN0aW9uKHZlcnNpb24sIGVuY29kaW5nLCBzdGFuZGFsb25lKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWNsYXJhdGlvbih2ZXJzaW9uLCBlbmNvZGluZywgc3RhbmRhbG9uZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmUgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50KG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5uID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZShuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jZGF0YSh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY29tbWVudCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnIgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmF3KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaSA9IGZ1bmN0aW9uKHRhcmdldCwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmluc3RydWN0aW9uKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS51ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy51cCgpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pbXBvcnRYTUxCdWlsZGVyID0gZnVuY3Rpb24oZG9jKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbXBvcnREb2N1bWVudChkb2MpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5yZXBsYWNlQ2hpbGQgPSBmdW5jdGlvbihuZXdDaGlsZCwgb2xkQ2hpbGQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihvbGRDaGlsZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uKG5ld0NoaWxkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmhhc0NoaWxkTm9kZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuY2xvbmVOb2RlID0gZnVuY3Rpb24oZGVlcCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbihmZWF0dXJlLCB2ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaGFzQXR0cmlidXRlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0cmlicy5sZW5ndGggIT09IDA7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIHZhciByZWYsIHJlcztcbiAgICAgIHJlZiA9IHRoaXM7XG4gICAgICBpZiAocmVmID09PSBvdGhlcikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5kb2N1bWVudCgpICE9PSBvdGhlci5kb2N1bWVudCgpKSB7XG4gICAgICAgIHJlcyA9IERvY3VtZW50UG9zaXRpb24uRGlzY29ubmVjdGVkIHwgRG9jdW1lbnRQb3NpdGlvbi5JbXBsZW1lbnRhdGlvblNwZWNpZmljO1xuICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICAgIHJlcyB8PSBEb2N1bWVudFBvc2l0aW9uLlByZWNlZGluZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgfD0gRG9jdW1lbnRQb3NpdGlvbi5Gb2xsb3dpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0gZWxzZSBpZiAocmVmLmlzQW5jZXN0b3Iob3RoZXIpKSB7XG4gICAgICAgIHJldHVybiBEb2N1bWVudFBvc2l0aW9uLkNvbnRhaW5zIHwgRG9jdW1lbnRQb3NpdGlvbi5QcmVjZWRpbmc7XG4gICAgICB9IGVsc2UgaWYgKHJlZi5pc0Rlc2NlbmRhbnQob3RoZXIpKSB7XG4gICAgICAgIHJldHVybiBEb2N1bWVudFBvc2l0aW9uLkNvbnRhaW5zIHwgRG9jdW1lbnRQb3NpdGlvbi5Gb2xsb3dpbmc7XG4gICAgICB9IGVsc2UgaWYgKHJlZi5pc1ByZWNlZGluZyhvdGhlcikpIHtcbiAgICAgICAgcmV0dXJuIERvY3VtZW50UG9zaXRpb24uUHJlY2VkaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIERvY3VtZW50UG9zaXRpb24uRm9sbG93aW5nO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pc1NhbWVOb2RlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUubG9va3VwUHJlZml4ID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmlzRGVmYXVsdE5hbWVzcGFjZSA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5sb29rdXBOYW1lc3BhY2VVUkkgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaXNFcXVhbE5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgaSwgaiwgcmVmMjtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlICE9PSB0aGlzLm5vZGVUeXBlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCAhPT0gdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gaiA9IDAsIHJlZjIgPSB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDE7IDAgPD0gcmVmMiA/IGogPD0gcmVmMiA6IGogPj0gcmVmMjsgaSA9IDAgPD0gcmVmMiA/ICsraiA6IC0taikge1xuICAgICAgICBpZiAoIXRoaXMuY2hpbGRyZW5baV0uaXNFcXVhbE5vZGUobm9kZS5jaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5nZXRGZWF0dXJlID0gZnVuY3Rpb24oZmVhdHVyZSwgdmVyc2lvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5zZXRVc2VyRGF0YSA9IGZ1bmN0aW9uKGtleSwgZGF0YSwgaGFuZGxlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5nZXRVc2VyRGF0YSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICBpZiAoIW90aGVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdGhlciA9PT0gdGhpcyB8fCB0aGlzLmlzRGVzY2VuZGFudChvdGhlcik7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmlzRGVzY2VuZGFudCA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBjaGlsZCwgaXNEZXNjZW5kYW50Q2hpbGQsIGosIGxlbiwgcmVmMjtcbiAgICAgIHJlZjIgPSB0aGlzLmNoaWxkcmVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmMi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBjaGlsZCA9IHJlZjJbal07XG4gICAgICAgIGlmIChub2RlID09PSBjaGlsZCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlzRGVzY2VuZGFudENoaWxkID0gY2hpbGQuaXNEZXNjZW5kYW50KG5vZGUpO1xuICAgICAgICBpZiAoaXNEZXNjZW5kYW50Q2hpbGQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pc0FuY2VzdG9yID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUuaXNEZXNjZW5kYW50KHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pc1ByZWNlZGluZyA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBub2RlUG9zLCB0aGlzUG9zO1xuICAgICAgbm9kZVBvcyA9IHRoaXMudHJlZVBvc2l0aW9uKG5vZGUpO1xuICAgICAgdGhpc1BvcyA9IHRoaXMudHJlZVBvc2l0aW9uKHRoaXMpO1xuICAgICAgaWYgKG5vZGVQb3MgPT09IC0xIHx8IHRoaXNQb3MgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBub2RlUG9zIDwgdGhpc1BvcztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaXNGb2xsb3dpbmcgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgbm9kZVBvcywgdGhpc1BvcztcbiAgICAgIG5vZGVQb3MgPSB0aGlzLnRyZWVQb3NpdGlvbihub2RlKTtcbiAgICAgIHRoaXNQb3MgPSB0aGlzLnRyZWVQb3NpdGlvbih0aGlzKTtcbiAgICAgIGlmIChub2RlUG9zID09PSAtMSB8fCB0aGlzUG9zID09PSAtMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbm9kZVBvcyA+IHRoaXNQb3M7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnRyZWVQb3NpdGlvbiA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBmb3VuZCwgcG9zO1xuICAgICAgcG9zID0gMDtcbiAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICB0aGlzLmZvcmVhY2hUcmVlTm9kZSh0aGlzLmRvY3VtZW50KCksIGZ1bmN0aW9uKGNoaWxkTm9kZSkge1xuICAgICAgICBwb3MrKztcbiAgICAgICAgaWYgKCFmb3VuZCAmJiBjaGlsZE5vZGUgPT09IG5vZGUpIHtcbiAgICAgICAgICByZXR1cm4gZm91bmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5mb3JlYWNoVHJlZU5vZGUgPSBmdW5jdGlvbihub2RlLCBmdW5jKSB7XG4gICAgICB2YXIgY2hpbGQsIGosIGxlbiwgcmVmMiwgcmVzO1xuICAgICAgbm9kZSB8fCAobm9kZSA9IHRoaXMuZG9jdW1lbnQoKSk7XG4gICAgICByZWYyID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZjIubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgY2hpbGQgPSByZWYyW2pdO1xuICAgICAgICBpZiAocmVzID0gZnVuYyhjaGlsZCkpIHtcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IHRoaXMuZm9yZWFjaFRyZWVOb2RlKGNoaWxkLCBmdW5jKTtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gWE1MTm9kZTtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIFhNTE5vZGVMaXN0O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MTm9kZUxpc3QgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MTm9kZUxpc3Qobm9kZXMpIHtcbiAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZUxpc3QucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoIHx8IDA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxOb2RlTGlzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzID0gbnVsbDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZUxpc3QucHJvdG90eXBlLml0ZW0gPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXNbaW5kZXhdIHx8IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxOb2RlTGlzdDtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxDaGFyYWN0ZXJEYXRhLCBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24sXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxDaGFyYWN0ZXJEYXRhID0gcmVxdWlyZSgnLi9YTUxDaGFyYWN0ZXJEYXRhJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24sIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uKHBhcmVudCwgdGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBpbnN0cnVjdGlvbiB0YXJnZXQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5Qcm9jZXNzaW5nSW5zdHJ1Y3Rpb247XG4gICAgICB0aGlzLnRhcmdldCA9IHRoaXMuc3RyaW5naWZ5Lmluc1RhcmdldCh0YXJnZXQpO1xuICAgICAgdGhpcy5uYW1lID0gdGhpcy50YXJnZXQ7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5naWZ5Lmluc1ZhbHVlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICB9O1xuXG4gICAgWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLnByb2Nlc3NpbmdJbnN0cnVjdGlvbih0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24ucHJvdG90eXBlLmlzRXF1YWxOb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKCFYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24uX19zdXBlcl9fLmlzRXF1YWxOb2RlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykuaXNFcXVhbE5vZGUobm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUudGFyZ2V0ICE9PSB0aGlzLnRhcmdldCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbjtcblxuICB9KShYTUxDaGFyYWN0ZXJEYXRhKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MTm9kZSwgWE1MUmF3LFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MUmF3ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MUmF3LCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTFJhdyhwYXJlbnQsIHRleHQpIHtcbiAgICAgIFhNTFJhdy5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHJhdyB0ZXh0LiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuUmF3O1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5naWZ5LnJhdyh0ZXh0KTtcbiAgICB9XG5cbiAgICBYTUxSYXcucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICB9O1xuXG4gICAgWE1MUmF3LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLnJhdyh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MUmF3O1xuXG4gIH0pKFhNTE5vZGUpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBXcml0ZXJTdGF0ZSwgWE1MU3RyZWFtV3JpdGVyLCBYTUxXcml0ZXJCYXNlLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MV3JpdGVyQmFzZSA9IHJlcXVpcmUoJy4vWE1MV3JpdGVyQmFzZScpO1xuXG4gIFdyaXRlclN0YXRlID0gcmVxdWlyZSgnLi9Xcml0ZXJTdGF0ZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MU3RyZWFtV3JpdGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MU3RyZWFtV3JpdGVyLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTFN0cmVhbVdyaXRlcihzdHJlYW0sIG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZW5kbGluZSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICBpZiAobm9kZS5pc0xhc3RSb290Tm9kZSAmJiBvcHRpb25zLnN0YXRlID09PSBXcml0ZXJTdGF0ZS5DbG9zZVRhZykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5lbmRsaW5lLmNhbGwodGhpcywgbm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmRvY3VtZW50ID0gZnVuY3Rpb24oZG9jLCBvcHRpb25zKSB7XG4gICAgICB2YXIgY2hpbGQsIGksIGosIGssIGxlbiwgbGVuMSwgcmVmLCByZWYxLCByZXN1bHRzO1xuICAgICAgcmVmID0gZG9jLmNoaWxkcmVuO1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGkgPSArK2opIHtcbiAgICAgICAgY2hpbGQgPSByZWZbaV07XG4gICAgICAgIGNoaWxkLmlzTGFzdFJvb3ROb2RlID0gaSA9PT0gZG9jLmNoaWxkcmVuLmxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gdGhpcy5maWx0ZXJPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgcmVmMSA9IGRvYy5jaGlsZHJlbjtcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoayA9IDAsIGxlbjEgPSByZWYxLmxlbmd0aDsgayA8IGxlbjE7IGsrKykge1xuICAgICAgICBjaGlsZCA9IHJlZjFba107XG4gICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLndyaXRlQ2hpbGROb2RlKGNoaWxkLCBvcHRpb25zLCAwKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgWE1MU3RyZWFtV3JpdGVyLnByb3RvdHlwZS5hdHRyaWJ1dGUgPSBmdW5jdGlvbihhdHQsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5hdHRyaWJ1dGUuY2FsbCh0aGlzLCBhdHQsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuY2RhdGEgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLndyaXRlKFhNTFN0cmVhbVdyaXRlci5fX3N1cGVyX18uY2RhdGEuY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLndyaXRlKFhNTFN0cmVhbVdyaXRlci5fX3N1cGVyX18uY29tbWVudC5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZGVjbGFyYXRpb24gPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLndyaXRlKFhNTFN0cmVhbVdyaXRlci5fX3N1cGVyX18uZGVjbGFyYXRpb24uY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmRvY1R5cGUgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIGNoaWxkLCBqLCBsZW4sIHJlZjtcbiAgICAgIGxldmVsIHx8IChsZXZlbCA9IDApO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHRoaXMuc3RyZWFtLndyaXRlKHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgICB0aGlzLnN0cmVhbS53cml0ZSgnPCFET0NUWVBFICcgKyBub2RlLnJvb3QoKS5uYW1lKTtcbiAgICAgIGlmIChub2RlLnB1YklEICYmIG5vZGUuc3lzSUQpIHtcbiAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUoJyBQVUJMSUMgXCInICsgbm9kZS5wdWJJRCArICdcIiBcIicgKyBub2RlLnN5c0lEICsgJ1wiJyk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuc3lzSUQpIHtcbiAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUoJyBTWVNURU0gXCInICsgbm9kZS5zeXNJRCArICdcIicpO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnIFsnKTtcbiAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUodGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICAgIHJlZiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmW2pdO1xuICAgICAgICAgIHRoaXMud3JpdGVDaGlsZE5vZGUoY2hpbGQsIG9wdGlvbnMsIGxldmVsICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnXScpO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgdGhpcy5zdHJlYW0ud3JpdGUob3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJz4nKTtcbiAgICAgIHRoaXMuc3RyZWFtLndyaXRlKHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICByZXR1cm4gdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmVsZW1lbnQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIGF0dCwgY2hpbGQsIGNoaWxkTm9kZUNvdW50LCBmaXJzdENoaWxkTm9kZSwgaiwgbGVuLCBuYW1lLCBwcmV0dHlTdXBwcmVzc2VkLCByZWYsIHJlZjE7XG4gICAgICBsZXZlbCB8fCAobGV2ZWwgPSAwKTtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICB0aGlzLnN0cmVhbS53cml0ZSh0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPCcgKyBub2RlLm5hbWUpO1xuICAgICAgcmVmID0gbm9kZS5hdHRyaWJzO1xuICAgICAgZm9yIChuYW1lIGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIG5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgYXR0ID0gcmVmW25hbWVdO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZShhdHQsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIH1cbiAgICAgIGNoaWxkTm9kZUNvdW50ID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICBmaXJzdENoaWxkTm9kZSA9IGNoaWxkTm9kZUNvdW50ID09PSAwID8gbnVsbCA6IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICBpZiAoY2hpbGROb2RlQ291bnQgPT09IDAgfHwgbm9kZS5jaGlsZHJlbi5ldmVyeShmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiAoZS50eXBlID09PSBOb2RlVHlwZS5UZXh0IHx8IGUudHlwZSA9PT0gTm9kZVR5cGUuUmF3KSAmJiBlLnZhbHVlID09PSAnJztcbiAgICAgIH0pKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFsbG93RW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnPicpO1xuICAgICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnPC8nICsgbm9kZS5uYW1lICsgJz4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUob3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJy8+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wcmV0dHkgJiYgY2hpbGROb2RlQ291bnQgPT09IDEgJiYgKGZpcnN0Q2hpbGROb2RlLnR5cGUgPT09IE5vZGVUeXBlLlRleHQgfHwgZmlyc3RDaGlsZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuUmF3KSAmJiAoZmlyc3RDaGlsZE5vZGUudmFsdWUgIT0gbnVsbCkpIHtcbiAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUoJz4nKTtcbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgICAgb3B0aW9ucy5zdXBwcmVzc1ByZXR0eUNvdW50Kys7XG4gICAgICAgIHByZXR0eVN1cHByZXNzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLndyaXRlQ2hpbGROb2RlKGZpcnN0Q2hpbGROb2RlLCBvcHRpb25zLCBsZXZlbCArIDEpO1xuICAgICAgICBvcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQtLTtcbiAgICAgICAgcHJldHR5U3VwcHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgIHRoaXMuc3RyZWFtLndyaXRlKCc8LycgKyBub2RlLm5hbWUgKyAnPicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUoJz4nICsgdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICAgIHJlZjEgPSBub2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgY2hpbGQgPSByZWYxW2pdO1xuICAgICAgICAgIHRoaXMud3JpdGVDaGlsZE5vZGUoY2hpbGQsIG9wdGlvbnMsIGxldmVsICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSh0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPC8nICsgbm9kZS5uYW1lICsgJz4nKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RyZWFtLndyaXRlKHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICByZXR1cm4gdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLnByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5wcm9jZXNzaW5nSW5zdHJ1Y3Rpb24uY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLnJhdyA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5yYXcuY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLndyaXRlKFhNTFN0cmVhbVdyaXRlci5fX3N1cGVyX18udGV4dC5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZHRkQXR0TGlzdCA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5kdGRBdHRMaXN0LmNhbGwodGhpcywgbm9kZSwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyZWFtV3JpdGVyLnByb3RvdHlwZS5kdGRFbGVtZW50ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS53cml0ZShYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLmR0ZEVsZW1lbnQuY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmR0ZEVudGl0eSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5kdGRFbnRpdHkuY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmR0ZE5vdGF0aW9uID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS53cml0ZShYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLmR0ZE5vdGF0aW9uLmNhbGwodGhpcywgbm9kZSwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTFN0cmVhbVdyaXRlcjtcblxuICB9KShYTUxXcml0ZXJCYXNlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBYTUxTdHJpbmdXcml0ZXIsIFhNTFdyaXRlckJhc2UsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBYTUxXcml0ZXJCYXNlID0gcmVxdWlyZSgnLi9YTUxXcml0ZXJCYXNlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxTdHJpbmdXcml0ZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxTdHJpbmdXcml0ZXIsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MU3RyaW5nV3JpdGVyKG9wdGlvbnMpIHtcbiAgICAgIFhNTFN0cmluZ1dyaXRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBYTUxTdHJpbmdXcml0ZXIucHJvdG90eXBlLmRvY3VtZW50ID0gZnVuY3Rpb24oZG9jLCBvcHRpb25zKSB7XG4gICAgICB2YXIgY2hpbGQsIGksIGxlbiwgciwgcmVmO1xuICAgICAgb3B0aW9ucyA9IHRoaXMuZmlsdGVyT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgIHIgPSAnJztcbiAgICAgIHJlZiA9IGRvYy5jaGlsZHJlbjtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjaGlsZCA9IHJlZltpXTtcbiAgICAgICAgciArPSB0aGlzLndyaXRlQ2hpbGROb2RlKGNoaWxkLCBvcHRpb25zLCAwKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLnByZXR0eSAmJiByLnNsaWNlKC1vcHRpb25zLm5ld2xpbmUubGVuZ3RoKSA9PT0gb3B0aW9ucy5uZXdsaW5lKSB7XG4gICAgICAgIHIgPSByLnNsaWNlKDAsIC1vcHRpb25zLm5ld2xpbmUubGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MU3RyaW5nV3JpdGVyO1xuXG4gIH0pKFhNTFdyaXRlckJhc2UpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIFhNTFN0cmluZ2lmaWVyLFxuICAgIGJpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTFN0cmluZ2lmaWVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTFN0cmluZ2lmaWVyKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuYXNzZXJ0TGVnYWxOYW1lID0gYmluZCh0aGlzLmFzc2VydExlZ2FsTmFtZSwgdGhpcyk7XG4gICAgICB0aGlzLmFzc2VydExlZ2FsQ2hhciA9IGJpbmQodGhpcy5hc3NlcnRMZWdhbENoYXIsIHRoaXMpO1xuICAgICAgdmFyIGtleSwgcmVmLCB2YWx1ZTtcbiAgICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMudmVyc2lvbikge1xuICAgICAgICB0aGlzLm9wdGlvbnMudmVyc2lvbiA9ICcxLjAnO1xuICAgICAgfVxuICAgICAgcmVmID0gb3B0aW9ucy5zdHJpbmdpZnkgfHwge307XG4gICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwocmVmLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLm5hbWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbE5hbWUoJycgKyB2YWwgfHwgJycpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcih0aGlzLnRleHRFc2NhcGUoJycgKyB2YWwgfHwgJycpKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmNkYXRhID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgdmFsID0gJycgKyB2YWwgfHwgJyc7XG4gICAgICB2YWwgPSB2YWwucmVwbGFjZSgnXV0+JywgJ11dXV0+PCFbQ0RBVEFbPicpO1xuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKHZhbCk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5jb21tZW50ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgdmFsID0gJycgKyB2YWwgfHwgJyc7XG4gICAgICBpZiAodmFsLm1hdGNoKC8tLS8pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbW1lbnQgdGV4dCBjYW5ub3QgY29udGFpbiBkb3VibGUtaHlwZW46IFwiICsgdmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcih2YWwpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnICsgdmFsIHx8ICcnO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuYXR0VmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIodGhpcy5hdHRFc2NhcGUodmFsID0gJycgKyB2YWwgfHwgJycpKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmluc1RhcmdldCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcignJyArIHZhbCB8fCAnJyk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5pbnNWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHZhbCA9ICcnICsgdmFsIHx8ICcnO1xuICAgICAgaWYgKHZhbC5tYXRjaCgvXFw/Pi8pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbiB2YWx1ZTogXCIgKyB2YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKHZhbCk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS54bWxWZXJzaW9uID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgdmFsID0gJycgKyB2YWwgfHwgJyc7XG4gICAgICBpZiAoIXZhbC5tYXRjaCgvMVxcLlswLTldKy8pKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmVyc2lvbiBudW1iZXI6IFwiICsgdmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWw7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS54bWxFbmNvZGluZyA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHZhbCA9ICcnICsgdmFsIHx8ICcnO1xuICAgICAgaWYgKCF2YWwubWF0Y2goL15bQS1aYS16XSg/OltBLVphLXowLTkuXy1dKSokLykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBlbmNvZGluZzogXCIgKyB2YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKHZhbCk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS54bWxTdGFuZGFsb25lID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCkge1xuICAgICAgICByZXR1cm4gXCJ5ZXNcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIm5vXCI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5kdGRQdWJJRCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcignJyArIHZhbCB8fCAnJyk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5kdGRTeXNJRCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcignJyArIHZhbCB8fCAnJyk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5kdGRFbGVtZW50VmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIoJycgKyB2YWwgfHwgJycpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuZHRkQXR0VHlwZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcignJyArIHZhbCB8fCAnJyk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5kdGRBdHREZWZhdWx0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKCcnICsgdmFsIHx8ICcnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmR0ZEVudGl0eVZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKCcnICsgdmFsIHx8ICcnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmR0ZE5EYXRhID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKCcnICsgdmFsIHx8ICcnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmNvbnZlcnRBdHRLZXkgPSAnQCc7XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuY29udmVydFBJS2V5ID0gJz8nO1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmNvbnZlcnRUZXh0S2V5ID0gJyN0ZXh0JztcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5jb252ZXJ0Q0RhdGFLZXkgPSAnI2NkYXRhJztcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5jb252ZXJ0Q29tbWVudEtleSA9ICcjY29tbWVudCc7XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuY29udmVydFJhd0tleSA9ICcjcmF3JztcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5hc3NlcnRMZWdhbENoYXIgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHZhciByZWdleCwgcmVzO1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICAgIHJlZ2V4ID0gJyc7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnZlcnNpb24gPT09ICcxLjAnKSB7XG4gICAgICAgIHJlZ2V4ID0gL1tcXDAtXFx4MDhcXHgwQlxcZlxceDBFLVxceDFGXFx1RkZGRVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdLztcbiAgICAgICAgaWYgKHJlcyA9IHN0ci5tYXRjaChyZWdleCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNoYXJhY3RlciBpbiBzdHJpbmc6IFwiICsgc3RyICsgXCIgYXQgaW5kZXggXCIgKyByZXMuaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy52ZXJzaW9uID09PSAnMS4xJykge1xuICAgICAgICByZWdleCA9IC9bXFwwXFx1RkZGRVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdLztcbiAgICAgICAgaWYgKHJlcyA9IHN0ci5tYXRjaChyZWdleCkpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNoYXJhY3RlciBpbiBzdHJpbmc6IFwiICsgc3RyICsgXCIgYXQgaW5kZXggXCIgKyByZXMuaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuYXNzZXJ0TGVnYWxOYW1lID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICB2YXIgcmVnZXg7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgdGhpcy5hc3NlcnRMZWdhbENoYXIoc3RyKTtcbiAgICAgIHJlZ2V4ID0gL14oWzpBLVpfYS16XFx4QzAtXFx4RDZcXHhEOC1cXHhGNlxceEY4LVxcdTAyRkZcXHUwMzcwLVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDXFx1MjAwRFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRF18W1xcdUQ4MDAtXFx1REI3Rl1bXFx1REMwMC1cXHVERkZGXSkoW1xceDJEXFwuMC06QS1aX2EtelxceEI3XFx4QzAtXFx4RDZcXHhEOC1cXHhGNlxceEY4LVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDXFx1MjAwRFxcdTIwM0ZcXHUyMDQwXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXXxbXFx1RDgwMC1cXHVEQjdGXVtcXHVEQzAwLVxcdURGRkZdKSokLztcbiAgICAgIGlmICghc3RyLm1hdGNoKHJlZ2V4KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNoYXJhY3RlciBpbiBuYW1lXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLnRleHRFc2NhcGUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHZhciBhbXByZWdleDtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9XG4gICAgICBhbXByZWdleCA9IHRoaXMub3B0aW9ucy5ub0RvdWJsZUVuY29kaW5nID8gLyg/ISZcXFMrOykmL2cgOiAvJi9nO1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKGFtcHJlZ2V4LCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpLnJlcGxhY2UoL1xcci9nLCAnJiN4RDsnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmF0dEVzY2FwZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgdmFyIGFtcHJlZ2V4O1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICAgIGFtcHJlZ2V4ID0gdGhpcy5vcHRpb25zLm5vRG91YmxlRW5jb2RpbmcgPyAvKD8hJlxcUys7KSYvZyA6IC8mL2c7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoYW1wcmVnZXgsICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JykucmVwbGFjZSgvXFx0L2csICcmI3g5OycpLnJlcGxhY2UoL1xcbi9nLCAnJiN4QTsnKS5yZXBsYWNlKC9cXHIvZywgJyYjeEQ7Jyk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxTdHJpbmdpZmllcjtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxDaGFyYWN0ZXJEYXRhLCBYTUxUZXh0LFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MQ2hhcmFjdGVyRGF0YSA9IHJlcXVpcmUoJy4vWE1MQ2hhcmFjdGVyRGF0YScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MVGV4dCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTFRleHQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MVGV4dChwYXJlbnQsIHRleHQpIHtcbiAgICAgIFhNTFRleHQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIGlmICh0ZXh0ID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBlbGVtZW50IHRleHQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICB0aGlzLm5hbWUgPSBcIiN0ZXh0XCI7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5UZXh0O1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5naWZ5LnRleHQodGV4dCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTFRleHQucHJvdG90eXBlLCAnaXNFbGVtZW50Q29udGVudFdoaXRlc3BhY2UnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MVGV4dC5wcm90b3R5cGUsICd3aG9sZVRleHQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbmV4dCwgcHJldiwgc3RyO1xuICAgICAgICBzdHIgPSAnJztcbiAgICAgICAgcHJldiA9IHRoaXMucHJldmlvdXNTaWJsaW5nO1xuICAgICAgICB3aGlsZSAocHJldikge1xuICAgICAgICAgIHN0ciA9IHByZXYuZGF0YSArIHN0cjtcbiAgICAgICAgICBwcmV2ID0gcHJldi5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgc3RyICs9IHRoaXMuZGF0YTtcbiAgICAgICAgbmV4dCA9IHRoaXMubmV4dFNpYmxpbmc7XG4gICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgc3RyID0gc3RyICsgbmV4dC5kYXRhO1xuICAgICAgICAgIG5leHQgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxUZXh0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgfTtcblxuICAgIFhNTFRleHQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53cml0ZXIudGV4dCh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICBYTUxUZXh0LnByb3RvdHlwZS5zcGxpdFRleHQgPSBmdW5jdGlvbihvZmZzZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MVGV4dC5wcm90b3R5cGUucmVwbGFjZVdob2xlVGV4dCA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTFRleHQ7XG5cbiAgfSkoWE1MQ2hhcmFjdGVyRGF0YSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFdyaXRlclN0YXRlLCBYTUxDRGF0YSwgWE1MQ29tbWVudCwgWE1MRFREQXR0TGlzdCwgWE1MRFRERWxlbWVudCwgWE1MRFRERW50aXR5LCBYTUxEVEROb3RhdGlvbiwgWE1MRGVjbGFyYXRpb24sIFhNTERvY1R5cGUsIFhNTER1bW15LCBYTUxFbGVtZW50LCBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24sIFhNTFJhdywgWE1MVGV4dCwgWE1MV3JpdGVyQmFzZSwgYXNzaWduLFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBhc3NpZ24gPSByZXF1aXJlKCcuL1V0aWxpdHknKS5hc3NpZ247XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuL1hNTERlY2xhcmF0aW9uJyk7XG5cbiAgWE1MRG9jVHlwZSA9IHJlcXVpcmUoJy4vWE1MRG9jVHlwZScpO1xuXG4gIFhNTENEYXRhID0gcmVxdWlyZSgnLi9YTUxDRGF0YScpO1xuXG4gIFhNTENvbW1lbnQgPSByZXF1aXJlKCcuL1hNTENvbW1lbnQnKTtcblxuICBYTUxFbGVtZW50ID0gcmVxdWlyZSgnLi9YTUxFbGVtZW50Jyk7XG5cbiAgWE1MUmF3ID0gcmVxdWlyZSgnLi9YTUxSYXcnKTtcblxuICBYTUxUZXh0ID0gcmVxdWlyZSgnLi9YTUxUZXh0Jyk7XG5cbiAgWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uID0gcmVxdWlyZSgnLi9YTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24nKTtcblxuICBYTUxEdW1teSA9IHJlcXVpcmUoJy4vWE1MRHVtbXknKTtcblxuICBYTUxEVERBdHRMaXN0ID0gcmVxdWlyZSgnLi9YTUxEVERBdHRMaXN0Jyk7XG5cbiAgWE1MRFRERWxlbWVudCA9IHJlcXVpcmUoJy4vWE1MRFRERWxlbWVudCcpO1xuXG4gIFhNTERUREVudGl0eSA9IHJlcXVpcmUoJy4vWE1MRFRERW50aXR5Jyk7XG5cbiAgWE1MRFRETm90YXRpb24gPSByZXF1aXJlKCcuL1hNTERURE5vdGF0aW9uJyk7XG5cbiAgV3JpdGVyU3RhdGUgPSByZXF1aXJlKCcuL1dyaXRlclN0YXRlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxXcml0ZXJCYXNlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTFdyaXRlckJhc2Uob3B0aW9ucykge1xuICAgICAgdmFyIGtleSwgcmVmLCB2YWx1ZTtcbiAgICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgcmVmID0gb3B0aW9ucy53cml0ZXIgfHwge307XG4gICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwocmVmLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICAgdGhpc1tcIl9cIiArIGtleV0gPSB0aGlzW2tleV07XG4gICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmZpbHRlck9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgZmlsdGVyZWRPcHRpb25zLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHJlZjQsIHJlZjUsIHJlZjY7XG4gICAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgICAgb3B0aW9ucyA9IGFzc2lnbih7fSwgdGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICAgIGZpbHRlcmVkT3B0aW9ucyA9IHtcbiAgICAgICAgd3JpdGVyOiB0aGlzXG4gICAgICB9O1xuICAgICAgZmlsdGVyZWRPcHRpb25zLnByZXR0eSA9IG9wdGlvbnMucHJldHR5IHx8IGZhbHNlO1xuICAgICAgZmlsdGVyZWRPcHRpb25zLmFsbG93RW1wdHkgPSBvcHRpb25zLmFsbG93RW1wdHkgfHwgZmFsc2U7XG4gICAgICBmaWx0ZXJlZE9wdGlvbnMuaW5kZW50ID0gKHJlZiA9IG9wdGlvbnMuaW5kZW50KSAhPSBudWxsID8gcmVmIDogJyAgJztcbiAgICAgIGZpbHRlcmVkT3B0aW9ucy5uZXdsaW5lID0gKHJlZjEgPSBvcHRpb25zLm5ld2xpbmUpICE9IG51bGwgPyByZWYxIDogJ1xcbic7XG4gICAgICBmaWx0ZXJlZE9wdGlvbnMub2Zmc2V0ID0gKHJlZjIgPSBvcHRpb25zLm9mZnNldCkgIT0gbnVsbCA/IHJlZjIgOiAwO1xuICAgICAgZmlsdGVyZWRPcHRpb25zLmRvbnRQcmV0dHlUZXh0Tm9kZXMgPSAocmVmMyA9IChyZWY0ID0gb3B0aW9ucy5kb250UHJldHR5VGV4dE5vZGVzKSAhPSBudWxsID8gcmVmNCA6IG9wdGlvbnMuZG9udHByZXR0eXRleHRub2RlcykgIT0gbnVsbCA/IHJlZjMgOiAwO1xuICAgICAgZmlsdGVyZWRPcHRpb25zLnNwYWNlQmVmb3JlU2xhc2ggPSAocmVmNSA9IChyZWY2ID0gb3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoKSAhPSBudWxsID8gcmVmNiA6IG9wdGlvbnMuc3BhY2ViZWZvcmVzbGFzaCkgIT0gbnVsbCA/IHJlZjUgOiAnJztcbiAgICAgIGlmIChmaWx0ZXJlZE9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCA9PT0gdHJ1ZSkge1xuICAgICAgICBmaWx0ZXJlZE9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCA9ICcgJztcbiAgICAgIH1cbiAgICAgIGZpbHRlcmVkT3B0aW9ucy5zdXBwcmVzc1ByZXR0eUNvdW50ID0gMDtcbiAgICAgIGZpbHRlcmVkT3B0aW9ucy51c2VyID0ge307XG4gICAgICBmaWx0ZXJlZE9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgcmV0dXJuIGZpbHRlcmVkT3B0aW9ucztcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUuaW5kZW50ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciBpbmRlbnRMZXZlbDtcbiAgICAgIGlmICghb3B0aW9ucy5wcmV0dHkgfHwgb3B0aW9ucy5zdXBwcmVzc1ByZXR0eUNvdW50KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wcmV0dHkpIHtcbiAgICAgICAgaW5kZW50TGV2ZWwgPSAobGV2ZWwgfHwgMCkgKyBvcHRpb25zLm9mZnNldCArIDE7XG4gICAgICAgIGlmIChpbmRlbnRMZXZlbCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGluZGVudExldmVsKS5qb2luKG9wdGlvbnMuaW5kZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5lbmRsaW5lID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIGlmICghb3B0aW9ucy5wcmV0dHkgfHwgb3B0aW9ucy5zdXBwcmVzc1ByZXR0eUNvdW50KSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm5ld2xpbmU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dCwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuQXR0cmlidXRlKGF0dCwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgciA9ICcgJyArIGF0dC5uYW1lICsgJz1cIicgKyBhdHQudmFsdWUgKyAnXCInO1xuICAgICAgdGhpcy5jbG9zZUF0dHJpYnV0ZShhdHQsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5jZGF0YSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgcjtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICByID0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpICsgJzwhW0NEQVRBWyc7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgciArPSBub2RlLnZhbHVlO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgciArPSAnXV0+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5jb21tZW50ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPCEtLSAnO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgIHIgKz0gbm9kZS52YWx1ZTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gJyAtLT4nICsgdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmRlY2xhcmF0aW9uID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPD94bWwnO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgIHIgKz0gJyB2ZXJzaW9uPVwiJyArIG5vZGUudmVyc2lvbiArICdcIic7XG4gICAgICBpZiAobm9kZS5lbmNvZGluZyAhPSBudWxsKSB7XG4gICAgICAgIHIgKz0gJyBlbmNvZGluZz1cIicgKyBub2RlLmVuY29kaW5nICsgJ1wiJztcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnN0YW5kYWxvbmUgIT0gbnVsbCkge1xuICAgICAgICByICs9ICcgc3RhbmRhbG9uZT1cIicgKyBub2RlLnN0YW5kYWxvbmUgKyAnXCInO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgciArPSBvcHRpb25zLnNwYWNlQmVmb3JlU2xhc2ggKyAnPz4nO1xuICAgICAgciArPSB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUuZG9jVHlwZSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgY2hpbGQsIGksIGxlbiwgciwgcmVmO1xuICAgICAgbGV2ZWwgfHwgKGxldmVsID0gMCk7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHIgKz0gJzwhRE9DVFlQRSAnICsgbm9kZS5yb290KCkubmFtZTtcbiAgICAgIGlmIChub2RlLnB1YklEICYmIG5vZGUuc3lzSUQpIHtcbiAgICAgICAgciArPSAnIFBVQkxJQyBcIicgKyBub2RlLnB1YklEICsgJ1wiIFwiJyArIG5vZGUuc3lzSUQgKyAnXCInO1xuICAgICAgfSBlbHNlIGlmIChub2RlLnN5c0lEKSB7XG4gICAgICAgIHIgKz0gJyBTWVNURU0gXCInICsgbm9kZS5zeXNJRCArICdcIic7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHIgKz0gJyBbJztcbiAgICAgICAgciArPSB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgICByZWYgPSBub2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBjaGlsZCA9IHJlZltpXTtcbiAgICAgICAgICByICs9IHRoaXMud3JpdGVDaGlsZE5vZGUoY2hpbGQsIG9wdGlvbnMsIGxldmVsICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICByICs9ICddJztcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gb3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJz4nO1xuICAgICAgciArPSB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUuZWxlbWVudCA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgYXR0LCBjaGlsZCwgY2hpbGROb2RlQ291bnQsIGZpcnN0Q2hpbGROb2RlLCBpLCBqLCBsZW4sIGxlbjEsIG5hbWUsIHByZXR0eVN1cHByZXNzZWQsIHIsIHJlZiwgcmVmMSwgcmVmMjtcbiAgICAgIGxldmVsIHx8IChsZXZlbCA9IDApO1xuICAgICAgcHJldHR5U3VwcHJlc3NlZCA9IGZhbHNlO1xuICAgICAgciA9ICcnO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgKz0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpICsgJzwnICsgbm9kZS5uYW1lO1xuICAgICAgcmVmID0gbm9kZS5hdHRyaWJzO1xuICAgICAgZm9yIChuYW1lIGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIG5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgYXR0ID0gcmVmW25hbWVdO1xuICAgICAgICByICs9IHRoaXMuYXR0cmlidXRlKGF0dCwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgfVxuICAgICAgY2hpbGROb2RlQ291bnQgPSBub2RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIGZpcnN0Q2hpbGROb2RlID0gY2hpbGROb2RlQ291bnQgPT09IDAgPyBudWxsIDogbm9kZS5jaGlsZHJlblswXTtcbiAgICAgIGlmIChjaGlsZE5vZGVDb3VudCA9PT0gMCB8fCBub2RlLmNoaWxkcmVuLmV2ZXJ5KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIChlLnR5cGUgPT09IE5vZGVUeXBlLlRleHQgfHwgZS50eXBlID09PSBOb2RlVHlwZS5SYXcpICYmIGUudmFsdWUgPT09ICcnO1xuICAgICAgfSkpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dFbXB0eSkge1xuICAgICAgICAgIHIgKz0gJz4nO1xuICAgICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgICAgICByICs9ICc8LycgKyBub2RlLm5hbWUgKyAnPicgKyB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgICAgICByICs9IG9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCArICcvPicgKyB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucHJldHR5ICYmIGNoaWxkTm9kZUNvdW50ID09PSAxICYmIChmaXJzdENoaWxkTm9kZS50eXBlID09PSBOb2RlVHlwZS5UZXh0IHx8IGZpcnN0Q2hpbGROb2RlLnR5cGUgPT09IE5vZGVUeXBlLlJhdykgJiYgKGZpcnN0Q2hpbGROb2RlLnZhbHVlICE9IG51bGwpKSB7XG4gICAgICAgIHIgKz0gJz4nO1xuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgICBvcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQrKztcbiAgICAgICAgcHJldHR5U3VwcHJlc3NlZCA9IHRydWU7XG4gICAgICAgIHIgKz0gdGhpcy53cml0ZUNoaWxkTm9kZShmaXJzdENoaWxkTm9kZSwgb3B0aW9ucywgbGV2ZWwgKyAxKTtcbiAgICAgICAgb3B0aW9ucy5zdXBwcmVzc1ByZXR0eUNvdW50LS07XG4gICAgICAgIHByZXR0eVN1cHByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICByICs9ICc8LycgKyBub2RlLm5hbWUgKyAnPicgKyB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZG9udFByZXR0eVRleHROb2Rlcykge1xuICAgICAgICAgIHJlZjEgPSBub2RlLmNoaWxkcmVuO1xuICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZjEubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkID0gcmVmMVtpXTtcbiAgICAgICAgICAgIGlmICgoY2hpbGQudHlwZSA9PT0gTm9kZVR5cGUuVGV4dCB8fCBjaGlsZC50eXBlID09PSBOb2RlVHlwZS5SYXcpICYmIChjaGlsZC52YWx1ZSAhPSBudWxsKSkge1xuICAgICAgICAgICAgICBvcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQrKztcbiAgICAgICAgICAgICAgcHJldHR5U3VwcHJlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByICs9ICc+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICAgIHJlZjIgPSBub2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmMi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgICBjaGlsZCA9IHJlZjJbal07XG4gICAgICAgICAgciArPSB0aGlzLndyaXRlQ2hpbGROb2RlKGNoaWxkLCBvcHRpb25zLCBsZXZlbCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgICAgciArPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPC8nICsgbm9kZS5uYW1lICsgJz4nO1xuICAgICAgICBpZiAocHJldHR5U3VwcHJlc3NlZCkge1xuICAgICAgICAgIG9wdGlvbnMuc3VwcHJlc3NQcmV0dHlDb3VudC0tO1xuICAgICAgICB9XG4gICAgICAgIHIgKz0gdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUud3JpdGVDaGlsZE5vZGUgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5DRGF0YTpcbiAgICAgICAgICByZXR1cm4gdGhpcy5jZGF0YShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuQ29tbWVudDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb21tZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5FbGVtZW50OlxuICAgICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLlJhdzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5yYXcobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLlRleHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGV4dChub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuUHJvY2Vzc2luZ0luc3RydWN0aW9uOlxuICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NpbmdJbnN0cnVjdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuRHVtbXk6XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkRlY2xhcmF0aW9uOlxuICAgICAgICAgIHJldHVybiB0aGlzLmRlY2xhcmF0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5Eb2NUeXBlOlxuICAgICAgICAgIHJldHVybiB0aGlzLmRvY1R5cGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkF0dHJpYnV0ZURlY2xhcmF0aW9uOlxuICAgICAgICAgIHJldHVybiB0aGlzLmR0ZEF0dExpc3Qobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkVsZW1lbnREZWNsYXJhdGlvbjpcbiAgICAgICAgICByZXR1cm4gdGhpcy5kdGRFbGVtZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5FbnRpdHlEZWNsYXJhdGlvbjpcbiAgICAgICAgICByZXR1cm4gdGhpcy5kdGRFbnRpdHkobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLk5vdGF0aW9uRGVjbGFyYXRpb246XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZHRkTm90YXRpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gWE1MIG5vZGUgdHlwZTogXCIgKyBub2RlLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5wcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8Pyc7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgciArPSBub2RlLnRhcmdldDtcbiAgICAgIGlmIChub2RlLnZhbHVlKSB7XG4gICAgICAgIHIgKz0gJyAnICsgbm9kZS52YWx1ZTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gb3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJz8+JztcbiAgICAgIHIgKz0gdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLnJhdyA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgcjtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICByID0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgIHIgKz0gbm9kZS52YWx1ZTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLnRleHQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICByICs9IG5vZGUudmFsdWU7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICByICs9IHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5kdGRBdHRMaXN0ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPCFBVFRMSVNUJztcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICByICs9ICcgJyArIG5vZGUuZWxlbWVudE5hbWUgKyAnICcgKyBub2RlLmF0dHJpYnV0ZU5hbWUgKyAnICcgKyBub2RlLmF0dHJpYnV0ZVR5cGU7XG4gICAgICBpZiAobm9kZS5kZWZhdWx0VmFsdWVUeXBlICE9PSAnI0RFRkFVTFQnKSB7XG4gICAgICAgIHIgKz0gJyAnICsgbm9kZS5kZWZhdWx0VmFsdWVUeXBlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHIgKz0gJyBcIicgKyBub2RlLmRlZmF1bHRWYWx1ZSArICdcIic7XG4gICAgICB9XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICByICs9IG9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCArICc+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5kdGRFbGVtZW50ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPCFFTEVNRU5UJztcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICByICs9ICcgJyArIG5vZGUubmFtZSArICcgJyArIG5vZGUudmFsdWU7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICByICs9IG9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCArICc+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5kdGRFbnRpdHkgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8IUVOVElUWSc7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgaWYgKG5vZGUucGUpIHtcbiAgICAgICAgciArPSAnICUnO1xuICAgICAgfVxuICAgICAgciArPSAnICcgKyBub2RlLm5hbWU7XG4gICAgICBpZiAobm9kZS52YWx1ZSkge1xuICAgICAgICByICs9ICcgXCInICsgbm9kZS52YWx1ZSArICdcIic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobm9kZS5wdWJJRCAmJiBub2RlLnN5c0lEKSB7XG4gICAgICAgICAgciArPSAnIFBVQkxJQyBcIicgKyBub2RlLnB1YklEICsgJ1wiIFwiJyArIG5vZGUuc3lzSUQgKyAnXCInO1xuICAgICAgICB9IGVsc2UgaWYgKG5vZGUuc3lzSUQpIHtcbiAgICAgICAgICByICs9ICcgU1lTVEVNIFwiJyArIG5vZGUuc3lzSUQgKyAnXCInO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLm5EYXRhKSB7XG4gICAgICAgICAgciArPSAnIE5EQVRBICcgKyBub2RlLm5EYXRhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICByICs9IG9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCArICc+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5kdGROb3RhdGlvbiA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgcjtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICByID0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpICsgJzwhTk9UQVRJT04nO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgIHIgKz0gJyAnICsgbm9kZS5uYW1lO1xuICAgICAgaWYgKG5vZGUucHViSUQgJiYgbm9kZS5zeXNJRCkge1xuICAgICAgICByICs9ICcgUFVCTElDIFwiJyArIG5vZGUucHViSUQgKyAnXCIgXCInICsgbm9kZS5zeXNJRCArICdcIic7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUucHViSUQpIHtcbiAgICAgICAgciArPSAnIFBVQkxJQyBcIicgKyBub2RlLnB1YklEICsgJ1wiJztcbiAgICAgIH0gZWxzZSBpZiAobm9kZS5zeXNJRCkge1xuICAgICAgICByICs9ICcgU1lTVEVNIFwiJyArIG5vZGUuc3lzSUQgKyAnXCInO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgciArPSBvcHRpb25zLnNwYWNlQmVmb3JlU2xhc2ggKyAnPicgKyB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUub3Blbk5vZGUgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge307XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5jbG9zZU5vZGUgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge307XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5vcGVuQXR0cmlidXRlID0gZnVuY3Rpb24oYXR0LCBvcHRpb25zLCBsZXZlbCkge307XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5jbG9zZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dCwgb3B0aW9ucywgbGV2ZWwpIHt9O1xuXG4gICAgcmV0dXJuIFhNTFdyaXRlckJhc2U7XG5cbiAgfSkoKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgV3JpdGVyU3RhdGUsIFhNTERPTUltcGxlbWVudGF0aW9uLCBYTUxEb2N1bWVudCwgWE1MRG9jdW1lbnRDQiwgWE1MU3RyZWFtV3JpdGVyLCBYTUxTdHJpbmdXcml0ZXIsIGFzc2lnbiwgaXNGdW5jdGlvbiwgcmVmO1xuXG4gIHJlZiA9IHJlcXVpcmUoJy4vVXRpbGl0eScpLCBhc3NpZ24gPSByZWYuYXNzaWduLCBpc0Z1bmN0aW9uID0gcmVmLmlzRnVuY3Rpb247XG5cbiAgWE1MRE9NSW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL1hNTERPTUltcGxlbWVudGF0aW9uJyk7XG5cbiAgWE1MRG9jdW1lbnQgPSByZXF1aXJlKCcuL1hNTERvY3VtZW50Jyk7XG5cbiAgWE1MRG9jdW1lbnRDQiA9IHJlcXVpcmUoJy4vWE1MRG9jdW1lbnRDQicpO1xuXG4gIFhNTFN0cmluZ1dyaXRlciA9IHJlcXVpcmUoJy4vWE1MU3RyaW5nV3JpdGVyJyk7XG5cbiAgWE1MU3RyZWFtV3JpdGVyID0gcmVxdWlyZSgnLi9YTUxTdHJlYW1Xcml0ZXInKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBXcml0ZXJTdGF0ZSA9IHJlcXVpcmUoJy4vV3JpdGVyU3RhdGUnKTtcblxuICBtb2R1bGUuZXhwb3J0cy5jcmVhdGUgPSBmdW5jdGlvbihuYW1lLCB4bWxkZWMsIGRvY3R5cGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZG9jLCByb290O1xuICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlJvb3QgZWxlbWVudCBuZWVkcyBhIG5hbWUuXCIpO1xuICAgIH1cbiAgICBvcHRpb25zID0gYXNzaWduKHt9LCB4bWxkZWMsIGRvY3R5cGUsIG9wdGlvbnMpO1xuICAgIGRvYyA9IG5ldyBYTUxEb2N1bWVudChvcHRpb25zKTtcbiAgICByb290ID0gZG9jLmVsZW1lbnQobmFtZSk7XG4gICAgaWYgKCFvcHRpb25zLmhlYWRsZXNzKSB7XG4gICAgICBkb2MuZGVjbGFyYXRpb24ob3B0aW9ucyk7XG4gICAgICBpZiAoKG9wdGlvbnMucHViSUQgIT0gbnVsbCkgfHwgKG9wdGlvbnMuc3lzSUQgIT0gbnVsbCkpIHtcbiAgICAgICAgZG9jLmR0ZChvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJvb3Q7XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMuYmVnaW4gPSBmdW5jdGlvbihvcHRpb25zLCBvbkRhdGEsIG9uRW5kKSB7XG4gICAgdmFyIHJlZjE7XG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgIHJlZjEgPSBbb3B0aW9ucywgb25EYXRhXSwgb25EYXRhID0gcmVmMVswXSwgb25FbmQgPSByZWYxWzFdO1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBpZiAob25EYXRhKSB7XG4gICAgICByZXR1cm4gbmV3IFhNTERvY3VtZW50Q0Iob3B0aW9ucywgb25EYXRhLCBvbkVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgWE1MRG9jdW1lbnQob3B0aW9ucyk7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzLnN0cmluZ1dyaXRlciA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFhNTFN0cmluZ1dyaXRlcihvcHRpb25zKTtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cy5zdHJlYW1Xcml0ZXIgPSBmdW5jdGlvbihzdHJlYW0sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFhNTFN0cmVhbVdyaXRlcihzdHJlYW0sIG9wdGlvbnMpO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzLmltcGxlbWVudGF0aW9uID0gbmV3IFhNTERPTUltcGxlbWVudGF0aW9uKCk7XG5cbiAgbW9kdWxlLmV4cG9ydHMubm9kZVR5cGUgPSBOb2RlVHlwZTtcblxuICBtb2R1bGUuZXhwb3J0cy53cml0ZXJTdGF0ZSA9IFdyaXRlclN0YXRlO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2JhdHRsZS1yZXBvcnQtZW5oYW5jZXIvbWFpbi50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=