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

/***/ "./src/map-unit-arrival/index.ts":
/*!***************************************!*\
  !*** ./src/map-unit-arrival/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_world_config_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/world-config-logic */ "./src/common/world-config-logic.ts");
// ==UserScript==
// @name        Map - Unit Arrival
// @description  TW Map - Unit Arrival on pointed village
// @include https://*/game.php?*screen=map*
// @author TW_Scripter
// ==/UserScript==

const worldConfig = (0,_common_world_config_logic__WEBPACK_IMPORTED_MODULE_0__.loadWorldConfig)();
function computeLandingTimes() {
    const mapPopup = $("#map_popup");
    if (mapPopup.find("#info_points_row").length === 0)
        return;
    mapPopup.find(".unit_landing_times").remove();
    const dateFormatter = new Intl.DateTimeFormat('cs-CZ', {
        month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
    });
    mapPopup.find("#info_content > tbody tr").each((index, element) => {
        const unitsTable = $(element).find("td > table > tbody");
        if (unitsTable.length === 0)
            return;
        const landingTimes = Array();
        //ehm there is not way how to distinguish between tables used for building, unit march times etc so lest just try to parse it
        $(element).find("td > table > tbody").find("tr > td").each((index, element) => {
            const textContent = element.textContent;
            if (textContent == null)
                return;
            const duration = textContent.trim().split(":");
            if (duration.length !== 3)
                return;
            const hours = parseInt(duration[0]);
            const minutes = parseInt(duration[1]);
            const seconds = parseInt(duration[2]);
            const now = new Date();
            now.setHours(now.getHours() + hours);
            now.setMinutes(now.getMinutes() + minutes);
            now.setSeconds(now.getSeconds() + seconds);
            const willArriveInNight = willArriveInNightBonus(now);
            const color = willArriveInNight ? "red" : "green";
            const backgroundColor = index % 2 === 0 ? "#F8F4E8" : "#DED3B9";
            landingTimes.push(`<td style="color: ${color}; padding:2px;background-color:${backgroundColor}">${dateFormatter.format(now)}</td>`);
        });
        if (landingTimes.length !== 0) {
            unitsTable.append(`
            <tr class="center unit_landing_times">
                ${landingTimes}
            </tr>
        `);
        }
    });
    function willArriveInNightBonus(arrival) {
        if (!worldConfig.night.active)
            return false;
        return arrival.getHours() >= worldConfig.night.start && arrival.getHours() < worldConfig.night.end;
    }
}
$(function () {
    const target = document.querySelector('#map_popup');
    if (target === null)
        return;
    new MutationObserver(function (mutations) {
        computeLandingTimes();
    }).observe(target, {
        attributes: true
    });
});


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
/******/ 	__webpack_require__("./src/map-unit-arrival/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2VtaXR0ZXItY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy9zYWZlLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3NheC9saWIvc2F4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvc3RyZWFtL2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvc3RyaW5nX2RlY29kZXIvbGliL3N0cmluZ19kZWNvZGVyLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMvdGltZXJzL2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9zcmMvY29tbW9uL21vZGVsLnRzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9zcmMvY29tbW9uL3N0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL3NyYy9jb21tb24vd29ybGQtY29uZmlnLWxvZ2ljLnRzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9zcmMvY29tbW9uL3dvcmxkLWNvbmZpZy50cyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vc3JjL21hcC11bml0LWFycml2YWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWwyanMvbGliL2JvbS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIvYnVpbGRlci5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWwyanMvbGliL3BhcnNlci5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIvcHJvY2Vzc29ycy5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbDJqcy9saWIveG1sMmpzLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvRG9jdW1lbnRQb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL05vZGVUeXBlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvVXRpbGl0eS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1dyaXRlclN0YXRlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MQXR0cmlidXRlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MQ0RhdGEuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxDaGFyYWN0ZXJEYXRhLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MQ29tbWVudC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERPTUNvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxET01FcnJvckhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxET01JbXBsZW1lbnRhdGlvbi5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERPTVN0cmluZ0xpc3QuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxEVERBdHRMaXN0LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRFRERWxlbWVudC5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERUREVudGl0eS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTERURE5vdGF0aW9uLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRGVjbGFyYXRpb24uanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxEb2NUeXBlLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxEb2N1bWVudENCLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MRHVtbXkuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxFbGVtZW50LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MTmFtZWROb2RlTWFwLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MTm9kZS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL1hNTE5vZGVMaXN0LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MUmF3LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MU3RyZWFtV3JpdGVyLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MU3RyaW5nV3JpdGVyLmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MU3RyaW5naWZpZXIuanMiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy8uL25vZGVfbW9kdWxlcy94bWxidWlsZGVyL2xpYi9YTUxUZXh0LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvLi9ub2RlX21vZHVsZXMveG1sYnVpbGRlci9saWIvWE1MV3JpdGVyQmFzZS5qcyIsIndlYnBhY2s6Ly90d19zY3JpcHRzLy4vbm9kZV9tb2R1bGVzL3htbGJ1aWxkZXIvbGliL2luZGV4LmpzIiwid2VicGFjazovL3R3X3NjcmlwdHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90d19zY3JpcHRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90d19zY3JpcHRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdHdfc2NyaXB0cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3R3X3NjcmlwdHMvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBWTs7QUFFWixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQyxVQUFVO0FBQ3BEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFWTs7QUFFWixlQUFlLG1CQUFPLENBQUMsb0RBQVc7QUFDbEMsZ0JBQWdCLG1CQUFPLENBQUMsZ0RBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkLGtCQUFrQjtBQUNsQix5QkFBeUI7O0FBRXpCO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFlBQVk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7QUFFbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx5QkFBeUI7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7O0FDM2RBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxXQUFXOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxRQUFRLFdBQVc7O0FBRW5CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsV0FBVzs7QUFFbkI7QUFDQTtBQUNBLFFBQVEsVUFBVTs7QUFFbEI7QUFDQTs7Ozs7Ozs7Ozs7QUNwRkE7QUFDQSxhQUFhLG1CQUFPLENBQUMsOENBQVE7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsRUFBRSxjQUFjO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUM3REEsQ0FBQyxpQkFBaUI7QUFDbEIsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0EseUJBQXlCLG1CQUFtQixjQUFjO0FBQzFELHdCQUF3QiwwQkFBMEI7QUFDbEQsd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQSxhQUFhLDBFQUF3QjtBQUNyQyxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhHQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7O0FBRWhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIscUNBQXFDOztBQUVqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Qsb0JBQW9CO0FBQ3BFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EsV0FBVyxPQUFPLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRUFBRSxNQUE4QixHQUFHLENBQWE7Ozs7Ozs7Ozs7O0FDNWhEakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFjLG1CQUFPLENBQUMsMERBQVM7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjs7QUFFQSxhQUFhLG9GQUE2QjtBQUMxQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0NBQXNDLHNDQUFzQztBQUN6RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQzs7Ozs7Ozs7Ozs7QUN0U0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvREEsTUFBTSxJQUFJO0lBZU4sWUFBWSxFQUNJLEtBQUssR0FBRyxDQUFDLEVBQ1QsS0FBSyxHQUFHLENBQUMsRUFDVCxHQUFHLEdBQUcsQ0FBQyxFQUNQLEdBQUcsR0FBRyxDQUFDLEVBQ1AsS0FBSyxHQUFHLENBQUMsRUFDVCxLQUFLLEdBQUcsQ0FBQyxFQUNULE1BQU0sR0FBRyxDQUFDLEVBQ1YsYUFBYSxHQUFHLENBQUMsRUFDakIsR0FBRyxHQUFHLENBQUMsRUFD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QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELEdBQUc7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUgsQ0FBQzs7Ozs7Ozs7Ozs7QUNqUEQ7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCOztBQUVoQixRQUFRLG1CQUFPLENBQUMsMkRBQVc7O0FBRTNCLGFBQWEsbUJBQU8sQ0FBQyw2REFBWTs7QUFFakMsZ0JBQWdCLG1CQUFPLENBQUMsbUVBQWU7O0FBRXZDLGVBQWUsbUJBQU8sQ0FBQyxpRUFBYzs7QUFFckMsYUFBYSxtQkFBTyxDQUFDLDZEQUFZOztBQUVqQyxlQUFlLG1CQUFPLENBQUMsaUVBQWM7O0FBRXJDLFdBQVcsbUJBQU8sQ0FBQyx5REFBVTs7QUFFN0IsWUFBWSxtQkFBTyxDQUFDLDJEQUFXOztBQUUvQiw2QkFBNkIsbUJBQU8sQ0FBQyw2RkFBNEI7O0FBRWpFLG1CQUFtQixtQkFBTyxDQUFDLHlFQUFrQjs7QUFFN0MsZUFBZSxtQkFBTyxDQUFDLGlFQUFjOztBQUVyQyxrQkFBa0IsbUJBQU8sQ0FBQyx1RUFBaUI7O0FBRTNDLGlCQUFpQixtQkFBTyxDQUFDLHFFQUFnQjs7QUFFekMsa0JBQWtCLG1CQUFPLENBQUMsdUVBQWlCOztBQUUzQyxtQkFBbUIsbUJBQU8sQ0FBQyx5RUFBa0I7O0FBRTdDLGlCQUFpQixtQkFBTyxDQUFDLHFFQUFnQjs7QUFFekMsbUJBQW1CLG1CQUFPLENBQUMseUVBQWtCOztBQUU3QyxvQkFBb0IsbUJBQU8sQ0FBQywyRUFBbUI7O0FBRS9DLGdCQUFnQixtQkFBTyxDQUFDLG1FQUFlOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVILENBQUM7Ozs7Ozs7Ozs7O0FDL2dCRDtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsMEJBQTBCLHlEQUF5RCxFQUFFLGtCQUFrQiwwQkFBMEIsRUFBRSxtQ0FBbUMsOEJBQThCLG9DQUFvQyxjQUFjLEVBQUU7QUFDOVIsZ0JBQWdCOztBQUVoQixZQUFZLG1CQUFPLENBQUMsMkRBQVc7O0FBRS9CLGFBQWEsbUJBQU8sQ0FBQyw2REFBWTs7QUFFakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUgsQ0FBQzs7Ozs7Ozs7Ozs7QUM5QkQ7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLDBCQUEwQix5REFBeUQsRUFBRSxrQkFBa0IsMEJBQTBCLEVBQUUsbUNBQW1DLDhCQUE4QixvQ0FBb0MsY0FBYyxFQUFFO0FBQzlSLGdCQUFnQjs7QUFFaEIsUUFBUSxtQkFBTyxDQUFDLDJEQUFXOztBQUUzQixZQUFZLG1CQUFPLENBQUMsMkRBQVc7O0FBRS9CLGFBQWEsbUJBQU8sQ0FBQyw2REFBWTs7QUFFakMsaUJBQWlCLG1CQUFPLENBQUMscUVBQWdCOztBQUV6QyxvQkFBb0IsbUJBQU8sQ0FBQywyRUFBbUI7O0FBRS9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFNBQVM7QUFDL0M7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsU0FBUztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVB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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsU0FBUztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVILENBQUM7Ozs7Ozs7Ozs7O0FDM2FEO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLG1CQUFPLENBQUMsMkRBQVc7O0FBRTNCLHlCQUF5QixtQkFBTyxDQUFDLHFGQUF3Qjs7QUFFekQsZ0JBQWdCLG1CQUFPLENBQUMsbUVBQWU7O0FBRXZDLGtCQUFrQixtQkFBTyxDQUFDLHVFQUFpQjs7QUFFM0Msb0JBQW9CLG1CQUFPLENBQUMsMkVBQW1COztBQUUvQyxvQkFBb0IsbUJBQU8sQ0FBQywyRUFBbUI7O0FBRS9DLGFBQWEsbUJBQU8sQ0FBQyw2REFBWTs7QUFFakMsZ0JBQWdCLG1CQUFPLENBQUMsbUVBQWU7O0FBRXZDLEVBQUUscUJBQXFCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsb0JBQW9CO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxFQUFFLDJCQUEyQjtBQUM3QjtBQUNBOztBQUVBLEVBQUUsMkJBQTJCO0FBQzdCO0FBQ0E7O0FBRUEsRUFBRSw2QkFBNkI7O0FBRS9CLEVBQUUsdUJBQXVCOztBQUV6QixFQUFFLDBCQUEwQjs7QUFFNUIsQ0FBQzs7Ozs7OztVQ2hFRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYXBVbml0QXJyaXZhbC5kZXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwiXG4vKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59O1xuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcigpIHtcbiAgICAgIGlmIChlcnJvckxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuICAgIHZhciBlcnJvckxpc3RlbmVyO1xuXG4gICAgLy8gQWRkaW5nIGFuIGVycm9yIGxpc3RlbmVyIGlzIG5vdCBvcHRpb25hbCBiZWNhdXNlXG4gICAgLy8gaWYgYW4gZXJyb3IgaXMgdGhyb3duIG9uIGFuIGV2ZW50IGVtaXR0ZXIgd2UgY2Fubm90XG4gICAgLy8gZ3VhcmFudGVlIHRoYXQgdGhlIGFjdHVhbCBldmVudCB3ZSBhcmUgd2FpdGluZyB3aWxsXG4gICAgLy8gYmUgZmlyZWQuIFRoZSByZXN1bHQgY291bGQgYmUgYSBzaWxlbnQgd2F5IHRvIGNyZWF0ZVxuICAgIC8vIG1lbW9yeSBvciBmaWxlIGRlc2NyaXB0b3IgbGVha3MsIHdoaWNoIGlzIHNvbWV0aGluZ1xuICAgIC8vIHdlIHNob3VsZCBhdm9pZC5cbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgZXJyb3JMaXN0ZW5lciA9IGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfTtcblxuICAgICAgZW1pdHRlci5vbmNlKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGVtaXR0ZXIub25jZShuYW1lLCBldmVudExpc3RlbmVyKTtcbiAgfSk7XG59XG4iLCIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby1kZXByZWNhdGVkLWFwaSAqL1xudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG52YXIgQnVmZmVyID0gYnVmZmVyLkJ1ZmZlclxuXG4vLyBhbHRlcm5hdGl2ZSB0byB1c2luZyBPYmplY3Qua2V5cyBmb3Igb2xkIGJyb3dzZXJzXG5mdW5jdGlvbiBjb3B5UHJvcHMgKHNyYywgZHN0KSB7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBkc3Rba2V5XSA9IHNyY1trZXldXG4gIH1cbn1cbmlmIChCdWZmZXIuZnJvbSAmJiBCdWZmZXIuYWxsb2MgJiYgQnVmZmVyLmFsbG9jVW5zYWZlICYmIEJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBidWZmZXJcbn0gZWxzZSB7XG4gIC8vIENvcHkgcHJvcGVydGllcyBmcm9tIHJlcXVpcmUoJ2J1ZmZlcicpXG4gIGNvcHlQcm9wcyhidWZmZXIsIGV4cG9ydHMpXG4gIGV4cG9ydHMuQnVmZmVyID0gU2FmZUJ1ZmZlclxufVxuXG5mdW5jdGlvbiBTYWZlQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBDb3B5IHN0YXRpYyBtZXRob2RzIGZyb20gQnVmZmVyXG5jb3B5UHJvcHMoQnVmZmVyLCBTYWZlQnVmZmVyKVxuXG5TYWZlQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHJldHVybiBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cblNhZmVCdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9XG4gIHZhciBidWYgPSBCdWZmZXIoc2l6ZSlcbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBidWYuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmZpbGwoZmlsbClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYnVmLmZpbGwoMClcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cblNhZmVCdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlcihzaXplKVxufVxuXG5TYWZlQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfVxuICByZXR1cm4gYnVmZmVyLlNsb3dCdWZmZXIoc2l6ZSlcbn1cbiIsIjsoZnVuY3Rpb24gKHNheCkgeyAvLyB3cmFwcGVyIGZvciBub24tbm9kZSBlbnZzXG4gIHNheC5wYXJzZXIgPSBmdW5jdGlvbiAoc3RyaWN0LCBvcHQpIHsgcmV0dXJuIG5ldyBTQVhQYXJzZXIoc3RyaWN0LCBvcHQpIH1cbiAgc2F4LlNBWFBhcnNlciA9IFNBWFBhcnNlclxuICBzYXguU0FYU3RyZWFtID0gU0FYU3RyZWFtXG4gIHNheC5jcmVhdGVTdHJlYW0gPSBjcmVhdGVTdHJlYW1cblxuICAvLyBXaGVuIHdlIHBhc3MgdGhlIE1BWF9CVUZGRVJfTEVOR1RIIHBvc2l0aW9uLCBzdGFydCBjaGVja2luZyBmb3IgYnVmZmVyIG92ZXJydW5zLlxuICAvLyBXaGVuIHdlIGNoZWNrLCBzY2hlZHVsZSB0aGUgbmV4dCBjaGVjayBmb3IgTUFYX0JVRkZFUl9MRU5HVEggLSAobWF4KGJ1ZmZlciBsZW5ndGhzKSksXG4gIC8vIHNpbmNlIHRoYXQncyB0aGUgZWFybGllc3QgdGhhdCBhIGJ1ZmZlciBvdmVycnVuIGNvdWxkIG9jY3VyLiAgVGhpcyB3YXksIGNoZWNrcyBhcmVcbiAgLy8gYXMgcmFyZSBhcyByZXF1aXJlZCwgYnV0IGFzIG9mdGVuIGFzIG5lY2Vzc2FyeSB0byBlbnN1cmUgbmV2ZXIgY3Jvc3NpbmcgdGhpcyBib3VuZC5cbiAgLy8gRnVydGhlcm1vcmUsIGJ1ZmZlcnMgYXJlIG9ubHkgdGVzdGVkIGF0IG1vc3Qgb25jZSBwZXIgd3JpdGUoKSwgc28gcGFzc2luZyBhIHZlcnlcbiAgLy8gbGFyZ2Ugc3RyaW5nIGludG8gd3JpdGUoKSBtaWdodCBoYXZlIHVuZGVzaXJhYmxlIGVmZmVjdHMsIGJ1dCB0aGlzIGlzIG1hbmFnZWFibGUgYnlcbiAgLy8gdGhlIGNhbGxlciwgc28gaXQgaXMgYXNzdW1lZCB0byBiZSBzYWZlLiAgVGh1cywgYSBjYWxsIHRvIHdyaXRlKCkgbWF5LCBpbiB0aGUgZXh0cmVtZVxuICAvLyBlZGdlIGNhc2UsIHJlc3VsdCBpbiBjcmVhdGluZyBhdCBtb3N0IG9uZSBjb21wbGV0ZSBjb3B5IG9mIHRoZSBzdHJpbmcgcGFzc2VkIGluLlxuICAvLyBTZXQgdG8gSW5maW5pdHkgdG8gaGF2ZSB1bmxpbWl0ZWQgYnVmZmVycy5cbiAgc2F4Lk1BWF9CVUZGRVJfTEVOR1RIID0gNjQgKiAxMDI0XG5cbiAgdmFyIGJ1ZmZlcnMgPSBbXG4gICAgJ2NvbW1lbnQnLCAnc2dtbERlY2wnLCAndGV4dE5vZGUnLCAndGFnTmFtZScsICdkb2N0eXBlJyxcbiAgICAncHJvY0luc3ROYW1lJywgJ3Byb2NJbnN0Qm9keScsICdlbnRpdHknLCAnYXR0cmliTmFtZScsXG4gICAgJ2F0dHJpYlZhbHVlJywgJ2NkYXRhJywgJ3NjcmlwdCdcbiAgXVxuXG4gIHNheC5FVkVOVFMgPSBbXG4gICAgJ3RleHQnLFxuICAgICdwcm9jZXNzaW5naW5zdHJ1Y3Rpb24nLFxuICAgICdzZ21sZGVjbGFyYXRpb24nLFxuICAgICdkb2N0eXBlJyxcbiAgICAnY29tbWVudCcsXG4gICAgJ29wZW50YWdzdGFydCcsXG4gICAgJ2F0dHJpYnV0ZScsXG4gICAgJ29wZW50YWcnLFxuICAgICdjbG9zZXRhZycsXG4gICAgJ29wZW5jZGF0YScsXG4gICAgJ2NkYXRhJyxcbiAgICAnY2xvc2VjZGF0YScsXG4gICAgJ2Vycm9yJyxcbiAgICAnZW5kJyxcbiAgICAncmVhZHknLFxuICAgICdzY3JpcHQnLFxuICAgICdvcGVubmFtZXNwYWNlJyxcbiAgICAnY2xvc2VuYW1lc3BhY2UnXG4gIF1cblxuICBmdW5jdGlvbiBTQVhQYXJzZXIgKHN0cmljdCwgb3B0KSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNBWFBhcnNlcikpIHtcbiAgICAgIHJldHVybiBuZXcgU0FYUGFyc2VyKHN0cmljdCwgb3B0KVxuICAgIH1cblxuICAgIHZhciBwYXJzZXIgPSB0aGlzXG4gICAgY2xlYXJCdWZmZXJzKHBhcnNlcilcbiAgICBwYXJzZXIucSA9IHBhcnNlci5jID0gJydcbiAgICBwYXJzZXIuYnVmZmVyQ2hlY2tQb3NpdGlvbiA9IHNheC5NQVhfQlVGRkVSX0xFTkdUSFxuICAgIHBhcnNlci5vcHQgPSBvcHQgfHwge31cbiAgICBwYXJzZXIub3B0Lmxvd2VyY2FzZSA9IHBhcnNlci5vcHQubG93ZXJjYXNlIHx8IHBhcnNlci5vcHQubG93ZXJjYXNldGFnc1xuICAgIHBhcnNlci5sb29zZUNhc2UgPSBwYXJzZXIub3B0Lmxvd2VyY2FzZSA/ICd0b0xvd2VyQ2FzZScgOiAndG9VcHBlckNhc2UnXG4gICAgcGFyc2VyLnRhZ3MgPSBbXVxuICAgIHBhcnNlci5jbG9zZWQgPSBwYXJzZXIuY2xvc2VkUm9vdCA9IHBhcnNlci5zYXdSb290ID0gZmFsc2VcbiAgICBwYXJzZXIudGFnID0gcGFyc2VyLmVycm9yID0gbnVsbFxuICAgIHBhcnNlci5zdHJpY3QgPSAhIXN0cmljdFxuICAgIHBhcnNlci5ub3NjcmlwdCA9ICEhKHN0cmljdCB8fCBwYXJzZXIub3B0Lm5vc2NyaXB0KVxuICAgIHBhcnNlci5zdGF0ZSA9IFMuQkVHSU5cbiAgICBwYXJzZXIuc3RyaWN0RW50aXRpZXMgPSBwYXJzZXIub3B0LnN0cmljdEVudGl0aWVzXG4gICAgcGFyc2VyLkVOVElUSUVTID0gcGFyc2VyLnN0cmljdEVudGl0aWVzID8gT2JqZWN0LmNyZWF0ZShzYXguWE1MX0VOVElUSUVTKSA6IE9iamVjdC5jcmVhdGUoc2F4LkVOVElUSUVTKVxuICAgIHBhcnNlci5hdHRyaWJMaXN0ID0gW11cblxuICAgIC8vIG5hbWVzcGFjZXMgZm9ybSBhIHByb3RvdHlwZSBjaGFpbi5cbiAgICAvLyBpdCBhbHdheXMgcG9pbnRzIGF0IHRoZSBjdXJyZW50IHRhZyxcbiAgICAvLyB3aGljaCBwcm90b3MgdG8gaXRzIHBhcmVudCB0YWcuXG4gICAgaWYgKHBhcnNlci5vcHQueG1sbnMpIHtcbiAgICAgIHBhcnNlci5ucyA9IE9iamVjdC5jcmVhdGUocm9vdE5TKVxuICAgIH1cblxuICAgIC8vIG1vc3RseSBqdXN0IGZvciBlcnJvciByZXBvcnRpbmdcbiAgICBwYXJzZXIudHJhY2tQb3NpdGlvbiA9IHBhcnNlci5vcHQucG9zaXRpb24gIT09IGZhbHNlXG4gICAgaWYgKHBhcnNlci50cmFja1Bvc2l0aW9uKSB7XG4gICAgICBwYXJzZXIucG9zaXRpb24gPSBwYXJzZXIubGluZSA9IHBhcnNlci5jb2x1bW4gPSAwXG4gICAgfVxuICAgIGVtaXQocGFyc2VyLCAnb25yZWFkeScpXG4gIH1cblxuICBpZiAoIU9iamVjdC5jcmVhdGUpIHtcbiAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgIGZ1bmN0aW9uIEYgKCkge31cbiAgICAgIEYucHJvdG90eXBlID0gb1xuICAgICAgdmFyIG5ld2YgPSBuZXcgRigpXG4gICAgICByZXR1cm4gbmV3ZlxuICAgIH1cbiAgfVxuXG4gIGlmICghT2JqZWN0LmtleXMpIHtcbiAgICBPYmplY3Qua2V5cyA9IGZ1bmN0aW9uIChvKSB7XG4gICAgICB2YXIgYSA9IFtdXG4gICAgICBmb3IgKHZhciBpIGluIG8pIGlmIChvLmhhc093blByb3BlcnR5KGkpKSBhLnB1c2goaSlcbiAgICAgIHJldHVybiBhXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tCdWZmZXJMZW5ndGggKHBhcnNlcikge1xuICAgIHZhciBtYXhBbGxvd2VkID0gTWF0aC5tYXgoc2F4Lk1BWF9CVUZGRVJfTEVOR1RILCAxMClcbiAgICB2YXIgbWF4QWN0dWFsID0gMFxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYnVmZmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBsZW4gPSBwYXJzZXJbYnVmZmVyc1tpXV0ubGVuZ3RoXG4gICAgICBpZiAobGVuID4gbWF4QWxsb3dlZCkge1xuICAgICAgICAvLyBUZXh0L2NkYXRhIG5vZGVzIGNhbiBnZXQgYmlnLCBhbmQgc2luY2UgdGhleSdyZSBidWZmZXJlZCxcbiAgICAgICAgLy8gd2UgY2FuIGdldCBoZXJlIHVuZGVyIG5vcm1hbCBjb25kaXRpb25zLlxuICAgICAgICAvLyBBdm9pZCBpc3N1ZXMgYnkgZW1pdHRpbmcgdGhlIHRleHQgbm9kZSBub3csXG4gICAgICAgIC8vIHNvIGF0IGxlYXN0IGl0IHdvbid0IGdldCBhbnkgYmlnZ2VyLlxuICAgICAgICBzd2l0Y2ggKGJ1ZmZlcnNbaV0pIHtcbiAgICAgICAgICBjYXNlICd0ZXh0Tm9kZSc6XG4gICAgICAgICAgICBjbG9zZVRleHQocGFyc2VyKVxuICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgIGNhc2UgJ2NkYXRhJzpcbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2RhdGEnLCBwYXJzZXIuY2RhdGEpXG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgPSAnJ1xuICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgIGNhc2UgJ3NjcmlwdCc6XG4gICAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbnNjcmlwdCcsIHBhcnNlci5zY3JpcHQpXG4gICAgICAgICAgICBwYXJzZXIuc2NyaXB0ID0gJydcbiAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZXJyb3IocGFyc2VyLCAnTWF4IGJ1ZmZlciBsZW5ndGggZXhjZWVkZWQ6ICcgKyBidWZmZXJzW2ldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtYXhBY3R1YWwgPSBNYXRoLm1heChtYXhBY3R1YWwsIGxlbilcbiAgICB9XG4gICAgLy8gc2NoZWR1bGUgdGhlIG5leHQgY2hlY2sgZm9yIHRoZSBlYXJsaWVzdCBwb3NzaWJsZSBidWZmZXIgb3ZlcnJ1bi5cbiAgICB2YXIgbSA9IHNheC5NQVhfQlVGRkVSX0xFTkdUSCAtIG1heEFjdHVhbFxuICAgIHBhcnNlci5idWZmZXJDaGVja1Bvc2l0aW9uID0gbSArIHBhcnNlci5wb3NpdGlvblxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJCdWZmZXJzIChwYXJzZXIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGJ1ZmZlcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBwYXJzZXJbYnVmZmVyc1tpXV0gPSAnJ1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoQnVmZmVycyAocGFyc2VyKSB7XG4gICAgY2xvc2VUZXh0KHBhcnNlcilcbiAgICBpZiAocGFyc2VyLmNkYXRhICE9PSAnJykge1xuICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jZGF0YScsIHBhcnNlci5jZGF0YSlcbiAgICAgIHBhcnNlci5jZGF0YSA9ICcnXG4gICAgfVxuICAgIGlmIChwYXJzZXIuc2NyaXB0ICE9PSAnJykge1xuICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25zY3JpcHQnLCBwYXJzZXIuc2NyaXB0KVxuICAgICAgcGFyc2VyLnNjcmlwdCA9ICcnXG4gICAgfVxuICB9XG5cbiAgU0FYUGFyc2VyLnByb3RvdHlwZSA9IHtcbiAgICBlbmQ6IGZ1bmN0aW9uICgpIHsgZW5kKHRoaXMpIH0sXG4gICAgd3JpdGU6IHdyaXRlLFxuICAgIHJlc3VtZTogZnVuY3Rpb24gKCkgeyB0aGlzLmVycm9yID0gbnVsbDsgcmV0dXJuIHRoaXMgfSxcbiAgICBjbG9zZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy53cml0ZShudWxsKSB9LFxuICAgIGZsdXNoOiBmdW5jdGlvbiAoKSB7IGZsdXNoQnVmZmVycyh0aGlzKSB9XG4gIH1cblxuICB2YXIgU3RyZWFtXG4gIHRyeSB7XG4gICAgU3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJykuU3RyZWFtXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgU3RyZWFtID0gZnVuY3Rpb24gKCkge31cbiAgfVxuXG4gIHZhciBzdHJlYW1XcmFwcyA9IHNheC5FVkVOVFMuZmlsdGVyKGZ1bmN0aW9uIChldikge1xuICAgIHJldHVybiBldiAhPT0gJ2Vycm9yJyAmJiBldiAhPT0gJ2VuZCdcbiAgfSlcblxuICBmdW5jdGlvbiBjcmVhdGVTdHJlYW0gKHN0cmljdCwgb3B0KSB7XG4gICAgcmV0dXJuIG5ldyBTQVhTdHJlYW0oc3RyaWN0LCBvcHQpXG4gIH1cblxuICBmdW5jdGlvbiBTQVhTdHJlYW0gKHN0cmljdCwgb3B0KSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNBWFN0cmVhbSkpIHtcbiAgICAgIHJldHVybiBuZXcgU0FYU3RyZWFtKHN0cmljdCwgb3B0KVxuICAgIH1cblxuICAgIFN0cmVhbS5hcHBseSh0aGlzKVxuXG4gICAgdGhpcy5fcGFyc2VyID0gbmV3IFNBWFBhcnNlcihzdHJpY3QsIG9wdClcbiAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZVxuICAgIHRoaXMucmVhZGFibGUgPSB0cnVlXG5cbiAgICB2YXIgbWUgPSB0aGlzXG5cbiAgICB0aGlzLl9wYXJzZXIub25lbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBtZS5lbWl0KCdlbmQnKVxuICAgIH1cblxuICAgIHRoaXMuX3BhcnNlci5vbmVycm9yID0gZnVuY3Rpb24gKGVyKSB7XG4gICAgICBtZS5lbWl0KCdlcnJvcicsIGVyKVxuXG4gICAgICAvLyBpZiBkaWRuJ3QgdGhyb3csIHRoZW4gbWVhbnMgZXJyb3Igd2FzIGhhbmRsZWQuXG4gICAgICAvLyBnbyBhaGVhZCBhbmQgY2xlYXIgZXJyb3IsIHNvIHdlIGNhbiB3cml0ZSBhZ2Fpbi5cbiAgICAgIG1lLl9wYXJzZXIuZXJyb3IgPSBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5fZGVjb2RlciA9IG51bGxcblxuICAgIHN0cmVhbVdyYXBzLmZvckVhY2goZnVuY3Rpb24gKGV2KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWUsICdvbicgKyBldiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbWUuX3BhcnNlclsnb24nICsgZXZdXG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGgpIHtcbiAgICAgICAgICBpZiAoIWgpIHtcbiAgICAgICAgICAgIG1lLnJlbW92ZUFsbExpc3RlbmVycyhldilcbiAgICAgICAgICAgIG1lLl9wYXJzZXJbJ29uJyArIGV2XSA9IGhcbiAgICAgICAgICAgIHJldHVybiBoXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lLm9uKGV2LCBoKVxuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBTQVhTdHJlYW0ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdHJlYW0ucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBTQVhTdHJlYW1cbiAgICB9XG4gIH0pXG5cbiAgU0FYU3RyZWFtLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBCdWZmZXIuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkge1xuICAgICAgaWYgKCF0aGlzLl9kZWNvZGVyKSB7XG4gICAgICAgIHZhciBTRCA9IHJlcXVpcmUoJ3N0cmluZ19kZWNvZGVyJykuU3RyaW5nRGVjb2RlclxuICAgICAgICB0aGlzLl9kZWNvZGVyID0gbmV3IFNEKCd1dGY4JylcbiAgICAgIH1cbiAgICAgIGRhdGEgPSB0aGlzLl9kZWNvZGVyLndyaXRlKGRhdGEpXG4gICAgfVxuXG4gICAgdGhpcy5fcGFyc2VyLndyaXRlKGRhdGEudG9TdHJpbmcoKSlcbiAgICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBTQVhTdHJlYW0ucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uIChjaHVuaykge1xuICAgIGlmIChjaHVuayAmJiBjaHVuay5sZW5ndGgpIHtcbiAgICAgIHRoaXMud3JpdGUoY2h1bmspXG4gICAgfVxuICAgIHRoaXMuX3BhcnNlci5lbmQoKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBTQVhTdHJlYW0ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2LCBoYW5kbGVyKSB7XG4gICAgdmFyIG1lID0gdGhpc1xuICAgIGlmICghbWUuX3BhcnNlclsnb24nICsgZXZdICYmIHN0cmVhbVdyYXBzLmluZGV4T2YoZXYpICE9PSAtMSkge1xuICAgICAgbWUuX3BhcnNlclsnb24nICsgZXZdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBbYXJndW1lbnRzWzBdXSA6IEFycmF5LmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgYXJncy5zcGxpY2UoMCwgMCwgZXYpXG4gICAgICAgIG1lLmVtaXQuYXBwbHkobWUsIGFyZ3MpXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmVhbS5wcm90b3R5cGUub24uY2FsbChtZSwgZXYsIGhhbmRsZXIpXG4gIH1cblxuICAvLyB0aGlzIHJlYWxseSBuZWVkcyB0byBiZSByZXBsYWNlZCB3aXRoIGNoYXJhY3RlciBjbGFzc2VzLlxuICAvLyBYTUwgYWxsb3dzIGFsbCBtYW5uZXIgb2YgcmlkaWN1bG91cyBudW1iZXJzIGFuZCBkaWdpdHMuXG4gIHZhciBDREFUQSA9ICdbQ0RBVEFbJ1xuICB2YXIgRE9DVFlQRSA9ICdET0NUWVBFJ1xuICB2YXIgWE1MX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnXG4gIHZhciBYTUxOU19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nXG4gIHZhciByb290TlMgPSB7IHhtbDogWE1MX05BTUVTUEFDRSwgeG1sbnM6IFhNTE5TX05BTUVTUEFDRSB9XG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC8jTlQtTmFtZVN0YXJ0Q2hhclxuICAvLyBUaGlzIGltcGxlbWVudGF0aW9uIHdvcmtzIG9uIHN0cmluZ3MsIGEgc2luZ2xlIGNoYXJhY3RlciBhdCBhIHRpbWVcbiAgLy8gYXMgc3VjaCwgaXQgY2Fubm90IGV2ZXIgc3VwcG9ydCBhc3RyYWwtcGxhbmUgY2hhcmFjdGVycyAoMTAwMDAtRUZGRkYpXG4gIC8vIHdpdGhvdXQgYSBzaWduaWZpY2FudCBicmVha2luZyBjaGFuZ2UgdG8gZWl0aGVyIHRoaXMgIHBhcnNlciwgb3IgdGhlXG4gIC8vIEphdmFTY3JpcHQgbGFuZ3VhZ2UuICBJbXBsZW1lbnRhdGlvbiBvZiBhbiBlbW9qaS1jYXBhYmxlIHhtbCBwYXJzZXJcbiAgLy8gaXMgbGVmdCBhcyBhbiBleGVyY2lzZSBmb3IgdGhlIHJlYWRlci5cbiAgdmFyIG5hbWVTdGFydCA9IC9bOl9BLVphLXpcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAyRkZcXHUwMzcwLVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDLVxcdTIwMERcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkRdL1xuXG4gIHZhciBuYW1lQm9keSA9IC9bOl9BLVphLXpcXHUwMEMwLVxcdTAwRDZcXHUwMEQ4LVxcdTAwRjZcXHUwMEY4LVxcdTAyRkZcXHUwMzcwLVxcdTAzN0RcXHUwMzdGLVxcdTFGRkZcXHUyMDBDLVxcdTIwMERcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkRcXHUwMEI3XFx1MDMwMC1cXHUwMzZGXFx1MjAzRi1cXHUyMDQwLlxcZC1dL1xuXG4gIHZhciBlbnRpdHlTdGFydCA9IC9bIzpfQS1aYS16XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2XFx1MDBGOC1cXHUwMkZGXFx1MDM3MC1cXHUwMzdEXFx1MDM3Ri1cXHUxRkZGXFx1MjAwQy1cXHUyMDBEXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXS9cbiAgdmFyIGVudGl0eUJvZHkgPSAvWyM6X0EtWmEtelxcdTAwQzAtXFx1MDBENlxcdTAwRDgtXFx1MDBGNlxcdTAwRjgtXFx1MDJGRlxcdTAzNzAtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMEMtXFx1MjAwRFxcdTIwNzAtXFx1MjE4RlxcdTJDMDAtXFx1MkZFRlxcdTMwMDEtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZGRFxcdTAwQjdcXHUwMzAwLVxcdTAzNkZcXHUyMDNGLVxcdTIwNDAuXFxkLV0vXG5cbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChjKSB7XG4gICAgcmV0dXJuIGMgPT09ICcgJyB8fCBjID09PSAnXFxuJyB8fCBjID09PSAnXFxyJyB8fCBjID09PSAnXFx0J1xuICB9XG5cbiAgZnVuY3Rpb24gaXNRdW90ZSAoYykge1xuICAgIHJldHVybiBjID09PSAnXCInIHx8IGMgPT09ICdcXCcnXG4gIH1cblxuICBmdW5jdGlvbiBpc0F0dHJpYkVuZCAoYykge1xuICAgIHJldHVybiBjID09PSAnPicgfHwgaXNXaGl0ZXNwYWNlKGMpXG4gIH1cblxuICBmdW5jdGlvbiBpc01hdGNoIChyZWdleCwgYykge1xuICAgIHJldHVybiByZWdleC50ZXN0KGMpXG4gIH1cblxuICBmdW5jdGlvbiBub3RNYXRjaCAocmVnZXgsIGMpIHtcbiAgICByZXR1cm4gIWlzTWF0Y2gocmVnZXgsIGMpXG4gIH1cblxuICB2YXIgUyA9IDBcbiAgc2F4LlNUQVRFID0ge1xuICAgIEJFR0lOOiBTKyssIC8vIGxlYWRpbmcgYnl0ZSBvcmRlciBtYXJrIG9yIHdoaXRlc3BhY2VcbiAgICBCRUdJTl9XSElURVNQQUNFOiBTKyssIC8vIGxlYWRpbmcgd2hpdGVzcGFjZVxuICAgIFRFWFQ6IFMrKywgLy8gZ2VuZXJhbCBzdHVmZlxuICAgIFRFWFRfRU5USVRZOiBTKyssIC8vICZhbXAgYW5kIHN1Y2guXG4gICAgT1BFTl9XQUtBOiBTKyssIC8vIDxcbiAgICBTR01MX0RFQ0w6IFMrKywgLy8gPCFCTEFSR1xuICAgIFNHTUxfREVDTF9RVU9URUQ6IFMrKywgLy8gPCFCTEFSRyBmb28gXCJiYXJcbiAgICBET0NUWVBFOiBTKyssIC8vIDwhRE9DVFlQRVxuICAgIERPQ1RZUEVfUVVPVEVEOiBTKyssIC8vIDwhRE9DVFlQRSBcIi8vYmxhaFxuICAgIERPQ1RZUEVfRFREOiBTKyssIC8vIDwhRE9DVFlQRSBcIi8vYmxhaFwiIFsgLi4uXG4gICAgRE9DVFlQRV9EVERfUVVPVEVEOiBTKyssIC8vIDwhRE9DVFlQRSBcIi8vYmxhaFwiIFsgXCJmb29cbiAgICBDT01NRU5UX1NUQVJUSU5HOiBTKyssIC8vIDwhLVxuICAgIENPTU1FTlQ6IFMrKywgLy8gPCEtLVxuICAgIENPTU1FTlRfRU5ESU5HOiBTKyssIC8vIDwhLS0gYmxhaCAtXG4gICAgQ09NTUVOVF9FTkRFRDogUysrLCAvLyA8IS0tIGJsYWggLS1cbiAgICBDREFUQTogUysrLCAvLyA8IVtDREFUQVsgc29tZXRoaW5nXG4gICAgQ0RBVEFfRU5ESU5HOiBTKyssIC8vIF1cbiAgICBDREFUQV9FTkRJTkdfMjogUysrLCAvLyBdXVxuICAgIFBST0NfSU5TVDogUysrLCAvLyA8P2hpXG4gICAgUFJPQ19JTlNUX0JPRFk6IFMrKywgLy8gPD9oaSB0aGVyZVxuICAgIFBST0NfSU5TVF9FTkRJTkc6IFMrKywgLy8gPD9oaSBcInRoZXJlXCIgP1xuICAgIE9QRU5fVEFHOiBTKyssIC8vIDxzdHJvbmdcbiAgICBPUEVOX1RBR19TTEFTSDogUysrLCAvLyA8c3Ryb25nIC9cbiAgICBBVFRSSUI6IFMrKywgLy8gPGFcbiAgICBBVFRSSUJfTkFNRTogUysrLCAvLyA8YSBmb29cbiAgICBBVFRSSUJfTkFNRV9TQVdfV0hJVEU6IFMrKywgLy8gPGEgZm9vIF9cbiAgICBBVFRSSUJfVkFMVUU6IFMrKywgLy8gPGEgZm9vPVxuICAgIEFUVFJJQl9WQUxVRV9RVU9URUQ6IFMrKywgLy8gPGEgZm9vPVwiYmFyXG4gICAgQVRUUklCX1ZBTFVFX0NMT1NFRDogUysrLCAvLyA8YSBmb289XCJiYXJcIlxuICAgIEFUVFJJQl9WQUxVRV9VTlFVT1RFRDogUysrLCAvLyA8YSBmb289YmFyXG4gICAgQVRUUklCX1ZBTFVFX0VOVElUWV9ROiBTKyssIC8vIDxmb28gYmFyPVwiJnF1b3Q7XCJcbiAgICBBVFRSSUJfVkFMVUVfRU5USVRZX1U6IFMrKywgLy8gPGZvbyBiYXI9JnF1b3RcbiAgICBDTE9TRV9UQUc6IFMrKywgLy8gPC9hXG4gICAgQ0xPU0VfVEFHX1NBV19XSElURTogUysrLCAvLyA8L2EgICA+XG4gICAgU0NSSVBUOiBTKyssIC8vIDxzY3JpcHQ+IC4uLlxuICAgIFNDUklQVF9FTkRJTkc6IFMrKyAvLyA8c2NyaXB0PiAuLi4gPFxuICB9XG5cbiAgc2F4LlhNTF9FTlRJVElFUyA9IHtcbiAgICAnYW1wJzogJyYnLFxuICAgICdndCc6ICc+JyxcbiAgICAnbHQnOiAnPCcsXG4gICAgJ3F1b3QnOiAnXCInLFxuICAgICdhcG9zJzogXCInXCJcbiAgfVxuXG4gIHNheC5FTlRJVElFUyA9IHtcbiAgICAnYW1wJzogJyYnLFxuICAgICdndCc6ICc+JyxcbiAgICAnbHQnOiAnPCcsXG4gICAgJ3F1b3QnOiAnXCInLFxuICAgICdhcG9zJzogXCInXCIsXG4gICAgJ0FFbGlnJzogMTk4LFxuICAgICdBYWN1dGUnOiAxOTMsXG4gICAgJ0FjaXJjJzogMTk0LFxuICAgICdBZ3JhdmUnOiAxOTIsXG4gICAgJ0FyaW5nJzogMTk3LFxuICAgICdBdGlsZGUnOiAxOTUsXG4gICAgJ0F1bWwnOiAxOTYsXG4gICAgJ0NjZWRpbCc6IDE5OSxcbiAgICAnRVRIJzogMjA4LFxuICAgICdFYWN1dGUnOiAyMDEsXG4gICAgJ0VjaXJjJzogMjAyLFxuICAgICdFZ3JhdmUnOiAyMDAsXG4gICAgJ0V1bWwnOiAyMDMsXG4gICAgJ0lhY3V0ZSc6IDIwNSxcbiAgICAnSWNpcmMnOiAyMDYsXG4gICAgJ0lncmF2ZSc6IDIwNCxcbiAgICAnSXVtbCc6IDIwNyxcbiAgICAnTnRpbGRlJzogMjA5LFxuICAgICdPYWN1dGUnOiAyMTEsXG4gICAgJ09jaXJjJzogMjEyLFxuICAgICdPZ3JhdmUnOiAyMTAsXG4gICAgJ09zbGFzaCc6IDIxNixcbiAgICAnT3RpbGRlJzogMjEzLFxuICAgICdPdW1sJzogMjE0LFxuICAgICdUSE9STic6IDIyMixcbiAgICAnVWFjdXRlJzogMjE4LFxuICAgICdVY2lyYyc6IDIxOSxcbiAgICAnVWdyYXZlJzogMjE3LFxuICAgICdVdW1sJzogMjIwLFxuICAgICdZYWN1dGUnOiAyMjEsXG4gICAgJ2FhY3V0ZSc6IDIyNSxcbiAgICAnYWNpcmMnOiAyMjYsXG4gICAgJ2FlbGlnJzogMjMwLFxuICAgICdhZ3JhdmUnOiAyMjQsXG4gICAgJ2FyaW5nJzogMjI5LFxuICAgICdhdGlsZGUnOiAyMjcsXG4gICAgJ2F1bWwnOiAyMjgsXG4gICAgJ2NjZWRpbCc6IDIzMSxcbiAgICAnZWFjdXRlJzogMjMzLFxuICAgICdlY2lyYyc6IDIzNCxcbiAgICAnZWdyYXZlJzogMjMyLFxuICAgICdldGgnOiAyNDAsXG4gICAgJ2V1bWwnOiAyMzUsXG4gICAgJ2lhY3V0ZSc6IDIzNyxcbiAgICAnaWNpcmMnOiAyMzgsXG4gICAgJ2lncmF2ZSc6IDIzNixcbiAgICAnaXVtbCc6IDIzOSxcbiAgICAnbnRpbGRlJzogMjQxLFxuICAgICdvYWN1dGUnOiAyNDMsXG4gICAgJ29jaXJjJzogMjQ0LFxuICAgICdvZ3JhdmUnOiAyNDIsXG4gICAgJ29zbGFzaCc6IDI0OCxcbiAgICAnb3RpbGRlJzogMjQ1LFxuICAgICdvdW1sJzogMjQ2LFxuICAgICdzemxpZyc6IDIyMyxcbiAgICAndGhvcm4nOiAyNTQsXG4gICAgJ3VhY3V0ZSc6IDI1MCxcbiAgICAndWNpcmMnOiAyNTEsXG4gICAgJ3VncmF2ZSc6IDI0OSxcbiAgICAndXVtbCc6IDI1MixcbiAgICAneWFjdXRlJzogMjUzLFxuICAgICd5dW1sJzogMjU1LFxuICAgICdjb3B5JzogMTY5LFxuICAgICdyZWcnOiAxNzQsXG4gICAgJ25ic3AnOiAxNjAsXG4gICAgJ2lleGNsJzogMTYxLFxuICAgICdjZW50JzogMTYyLFxuICAgICdwb3VuZCc6IDE2MyxcbiAgICAnY3VycmVuJzogMTY0LFxuICAgICd5ZW4nOiAxNjUsXG4gICAgJ2JydmJhcic6IDE2NixcbiAgICAnc2VjdCc6IDE2NyxcbiAgICAndW1sJzogMTY4LFxuICAgICdvcmRmJzogMTcwLFxuICAgICdsYXF1byc6IDE3MSxcbiAgICAnbm90JzogMTcyLFxuICAgICdzaHknOiAxNzMsXG4gICAgJ21hY3InOiAxNzUsXG4gICAgJ2RlZyc6IDE3NixcbiAgICAncGx1c21uJzogMTc3LFxuICAgICdzdXAxJzogMTg1LFxuICAgICdzdXAyJzogMTc4LFxuICAgICdzdXAzJzogMTc5LFxuICAgICdhY3V0ZSc6IDE4MCxcbiAgICAnbWljcm8nOiAxODEsXG4gICAgJ3BhcmEnOiAxODIsXG4gICAgJ21pZGRvdCc6IDE4MyxcbiAgICAnY2VkaWwnOiAxODQsXG4gICAgJ29yZG0nOiAxODYsXG4gICAgJ3JhcXVvJzogMTg3LFxuICAgICdmcmFjMTQnOiAxODgsXG4gICAgJ2ZyYWMxMic6IDE4OSxcbiAgICAnZnJhYzM0JzogMTkwLFxuICAgICdpcXVlc3QnOiAxOTEsXG4gICAgJ3RpbWVzJzogMjE1LFxuICAgICdkaXZpZGUnOiAyNDcsXG4gICAgJ09FbGlnJzogMzM4LFxuICAgICdvZWxpZyc6IDMzOSxcbiAgICAnU2Nhcm9uJzogMzUyLFxuICAgICdzY2Fyb24nOiAzNTMsXG4gICAgJ1l1bWwnOiAzNzYsXG4gICAgJ2Zub2YnOiA0MDIsXG4gICAgJ2NpcmMnOiA3MTAsXG4gICAgJ3RpbGRlJzogNzMyLFxuICAgICdBbHBoYSc6IDkxMyxcbiAgICAnQmV0YSc6IDkxNCxcbiAgICAnR2FtbWEnOiA5MTUsXG4gICAgJ0RlbHRhJzogOTE2LFxuICAgICdFcHNpbG9uJzogOTE3LFxuICAgICdaZXRhJzogOTE4LFxuICAgICdFdGEnOiA5MTksXG4gICAgJ1RoZXRhJzogOTIwLFxuICAgICdJb3RhJzogOTIxLFxuICAgICdLYXBwYSc6IDkyMixcbiAgICAnTGFtYmRhJzogOTIzLFxuICAgICdNdSc6IDkyNCxcbiAgICAnTnUnOiA5MjUsXG4gICAgJ1hpJzogOTI2LFxuICAgICdPbWljcm9uJzogOTI3LFxuICAgICdQaSc6IDkyOCxcbiAgICAnUmhvJzogOTI5LFxuICAgICdTaWdtYSc6IDkzMSxcbiAgICAnVGF1JzogOTMyLFxuICAgICdVcHNpbG9uJzogOTMzLFxuICAgICdQaGknOiA5MzQsXG4gICAgJ0NoaSc6IDkzNSxcbiAgICAnUHNpJzogOTM2LFxuICAgICdPbWVnYSc6IDkzNyxcbiAgICAnYWxwaGEnOiA5NDUsXG4gICAgJ2JldGEnOiA5NDYsXG4gICAgJ2dhbW1hJzogOTQ3LFxuICAgICdkZWx0YSc6IDk0OCxcbiAgICAnZXBzaWxvbic6IDk0OSxcbiAgICAnemV0YSc6IDk1MCxcbiAgICAnZXRhJzogOTUxLFxuICAgICd0aGV0YSc6IDk1MixcbiAgICAnaW90YSc6IDk1MyxcbiAgICAna2FwcGEnOiA5NTQsXG4gICAgJ2xhbWJkYSc6IDk1NSxcbiAgICAnbXUnOiA5NTYsXG4gICAgJ251JzogOTU3LFxuICAgICd4aSc6IDk1OCxcbiAgICAnb21pY3Jvbic6IDk1OSxcbiAgICAncGknOiA5NjAsXG4gICAgJ3Jobyc6IDk2MSxcbiAgICAnc2lnbWFmJzogOTYyLFxuICAgICdzaWdtYSc6IDk2MyxcbiAgICAndGF1JzogOTY0LFxuICAgICd1cHNpbG9uJzogOTY1LFxuICAgICdwaGknOiA5NjYsXG4gICAgJ2NoaSc6IDk2NyxcbiAgICAncHNpJzogOTY4LFxuICAgICdvbWVnYSc6IDk2OSxcbiAgICAndGhldGFzeW0nOiA5NzcsXG4gICAgJ3Vwc2loJzogOTc4LFxuICAgICdwaXYnOiA5ODIsXG4gICAgJ2Vuc3AnOiA4MTk0LFxuICAgICdlbXNwJzogODE5NSxcbiAgICAndGhpbnNwJzogODIwMSxcbiAgICAnenduaic6IDgyMDQsXG4gICAgJ3p3aic6IDgyMDUsXG4gICAgJ2xybSc6IDgyMDYsXG4gICAgJ3JsbSc6IDgyMDcsXG4gICAgJ25kYXNoJzogODIxMSxcbiAgICAnbWRhc2gnOiA4MjEyLFxuICAgICdsc3F1byc6IDgyMTYsXG4gICAgJ3JzcXVvJzogODIxNyxcbiAgICAnc2JxdW8nOiA4MjE4LFxuICAgICdsZHF1byc6IDgyMjAsXG4gICAgJ3JkcXVvJzogODIyMSxcbiAgICAnYmRxdW8nOiA4MjIyLFxuICAgICdkYWdnZXInOiA4MjI0LFxuICAgICdEYWdnZXInOiA4MjI1LFxuICAgICdidWxsJzogODIyNixcbiAgICAnaGVsbGlwJzogODIzMCxcbiAgICAncGVybWlsJzogODI0MCxcbiAgICAncHJpbWUnOiA4MjQyLFxuICAgICdQcmltZSc6IDgyNDMsXG4gICAgJ2xzYXF1byc6IDgyNDksXG4gICAgJ3JzYXF1byc6IDgyNTAsXG4gICAgJ29saW5lJzogODI1NCxcbiAgICAnZnJhc2wnOiA4MjYwLFxuICAgICdldXJvJzogODM2NCxcbiAgICAnaW1hZ2UnOiA4NDY1LFxuICAgICd3ZWllcnAnOiA4NDcyLFxuICAgICdyZWFsJzogODQ3NixcbiAgICAndHJhZGUnOiA4NDgyLFxuICAgICdhbGVmc3ltJzogODUwMSxcbiAgICAnbGFycic6IDg1OTIsXG4gICAgJ3VhcnInOiA4NTkzLFxuICAgICdyYXJyJzogODU5NCxcbiAgICAnZGFycic6IDg1OTUsXG4gICAgJ2hhcnInOiA4NTk2LFxuICAgICdjcmFycic6IDg2MjksXG4gICAgJ2xBcnInOiA4NjU2LFxuICAgICd1QXJyJzogODY1NyxcbiAgICAnckFycic6IDg2NTgsXG4gICAgJ2RBcnInOiA4NjU5LFxuICAgICdoQXJyJzogODY2MCxcbiAgICAnZm9yYWxsJzogODcwNCxcbiAgICAncGFydCc6IDg3MDYsXG4gICAgJ2V4aXN0JzogODcwNyxcbiAgICAnZW1wdHknOiA4NzA5LFxuICAgICduYWJsYSc6IDg3MTEsXG4gICAgJ2lzaW4nOiA4NzEyLFxuICAgICdub3Rpbic6IDg3MTMsXG4gICAgJ25pJzogODcxNSxcbiAgICAncHJvZCc6IDg3MTksXG4gICAgJ3N1bSc6IDg3MjEsXG4gICAgJ21pbnVzJzogODcyMixcbiAgICAnbG93YXN0JzogODcyNyxcbiAgICAncmFkaWMnOiA4NzMwLFxuICAgICdwcm9wJzogODczMyxcbiAgICAnaW5maW4nOiA4NzM0LFxuICAgICdhbmcnOiA4NzM2LFxuICAgICdhbmQnOiA4NzQzLFxuICAgICdvcic6IDg3NDQsXG4gICAgJ2NhcCc6IDg3NDUsXG4gICAgJ2N1cCc6IDg3NDYsXG4gICAgJ2ludCc6IDg3NDcsXG4gICAgJ3RoZXJlNCc6IDg3NTYsXG4gICAgJ3NpbSc6IDg3NjQsXG4gICAgJ2NvbmcnOiA4NzczLFxuICAgICdhc3ltcCc6IDg3NzYsXG4gICAgJ25lJzogODgwMCxcbiAgICAnZXF1aXYnOiA4ODAxLFxuICAgICdsZSc6IDg4MDQsXG4gICAgJ2dlJzogODgwNSxcbiAgICAnc3ViJzogODgzNCxcbiAgICAnc3VwJzogODgzNSxcbiAgICAnbnN1Yic6IDg4MzYsXG4gICAgJ3N1YmUnOiA4ODM4LFxuICAgICdzdXBlJzogODgzOSxcbiAgICAnb3BsdXMnOiA4ODUzLFxuICAgICdvdGltZXMnOiA4ODU1LFxuICAgICdwZXJwJzogODg2OSxcbiAgICAnc2RvdCc6IDg5MDEsXG4gICAgJ2xjZWlsJzogODk2OCxcbiAgICAncmNlaWwnOiA4OTY5LFxuICAgICdsZmxvb3InOiA4OTcwLFxuICAgICdyZmxvb3InOiA4OTcxLFxuICAgICdsYW5nJzogOTAwMSxcbiAgICAncmFuZyc6IDkwMDIsXG4gICAgJ2xveic6IDk2NzQsXG4gICAgJ3NwYWRlcyc6IDk4MjQsXG4gICAgJ2NsdWJzJzogOTgyNyxcbiAgICAnaGVhcnRzJzogOTgyOSxcbiAgICAnZGlhbXMnOiA5ODMwXG4gIH1cblxuICBPYmplY3Qua2V5cyhzYXguRU5USVRJRVMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBlID0gc2F4LkVOVElUSUVTW2tleV1cbiAgICB2YXIgcyA9IHR5cGVvZiBlID09PSAnbnVtYmVyJyA/IFN0cmluZy5mcm9tQ2hhckNvZGUoZSkgOiBlXG4gICAgc2F4LkVOVElUSUVTW2tleV0gPSBzXG4gIH0pXG5cbiAgZm9yICh2YXIgcyBpbiBzYXguU1RBVEUpIHtcbiAgICBzYXguU1RBVEVbc2F4LlNUQVRFW3NdXSA9IHNcbiAgfVxuXG4gIC8vIHNob3J0aGFuZFxuICBTID0gc2F4LlNUQVRFXG5cbiAgZnVuY3Rpb24gZW1pdCAocGFyc2VyLCBldmVudCwgZGF0YSkge1xuICAgIHBhcnNlcltldmVudF0gJiYgcGFyc2VyW2V2ZW50XShkYXRhKVxuICB9XG5cbiAgZnVuY3Rpb24gZW1pdE5vZGUgKHBhcnNlciwgbm9kZVR5cGUsIGRhdGEpIHtcbiAgICBpZiAocGFyc2VyLnRleHROb2RlKSBjbG9zZVRleHQocGFyc2VyKVxuICAgIGVtaXQocGFyc2VyLCBub2RlVHlwZSwgZGF0YSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlVGV4dCAocGFyc2VyKSB7XG4gICAgcGFyc2VyLnRleHROb2RlID0gdGV4dG9wdHMocGFyc2VyLm9wdCwgcGFyc2VyLnRleHROb2RlKVxuICAgIGlmIChwYXJzZXIudGV4dE5vZGUpIGVtaXQocGFyc2VyLCAnb250ZXh0JywgcGFyc2VyLnRleHROb2RlKVxuICAgIHBhcnNlci50ZXh0Tm9kZSA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0b3B0cyAob3B0LCB0ZXh0KSB7XG4gICAgaWYgKG9wdC50cmltKSB0ZXh0ID0gdGV4dC50cmltKClcbiAgICBpZiAob3B0Lm5vcm1hbGl6ZSkgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxzKy9nLCAnICcpXG4gICAgcmV0dXJuIHRleHRcbiAgfVxuXG4gIGZ1bmN0aW9uIGVycm9yIChwYXJzZXIsIGVyKSB7XG4gICAgY2xvc2VUZXh0KHBhcnNlcilcbiAgICBpZiAocGFyc2VyLnRyYWNrUG9zaXRpb24pIHtcbiAgICAgIGVyICs9ICdcXG5MaW5lOiAnICsgcGFyc2VyLmxpbmUgK1xuICAgICAgICAnXFxuQ29sdW1uOiAnICsgcGFyc2VyLmNvbHVtbiArXG4gICAgICAgICdcXG5DaGFyOiAnICsgcGFyc2VyLmNcbiAgICB9XG4gICAgZXIgPSBuZXcgRXJyb3IoZXIpXG4gICAgcGFyc2VyLmVycm9yID0gZXJcbiAgICBlbWl0KHBhcnNlciwgJ29uZXJyb3InLCBlcilcbiAgICByZXR1cm4gcGFyc2VyXG4gIH1cblxuICBmdW5jdGlvbiBlbmQgKHBhcnNlcikge1xuICAgIGlmIChwYXJzZXIuc2F3Um9vdCAmJiAhcGFyc2VyLmNsb3NlZFJvb3QpIHN0cmljdEZhaWwocGFyc2VyLCAnVW5jbG9zZWQgcm9vdCB0YWcnKVxuICAgIGlmICgocGFyc2VyLnN0YXRlICE9PSBTLkJFR0lOKSAmJlxuICAgICAgKHBhcnNlci5zdGF0ZSAhPT0gUy5CRUdJTl9XSElURVNQQUNFKSAmJlxuICAgICAgKHBhcnNlci5zdGF0ZSAhPT0gUy5URVhUKSkge1xuICAgICAgZXJyb3IocGFyc2VyLCAnVW5leHBlY3RlZCBlbmQnKVxuICAgIH1cbiAgICBjbG9zZVRleHQocGFyc2VyKVxuICAgIHBhcnNlci5jID0gJydcbiAgICBwYXJzZXIuY2xvc2VkID0gdHJ1ZVxuICAgIGVtaXQocGFyc2VyLCAnb25lbmQnKVxuICAgIFNBWFBhcnNlci5jYWxsKHBhcnNlciwgcGFyc2VyLnN0cmljdCwgcGFyc2VyLm9wdClcbiAgICByZXR1cm4gcGFyc2VyXG4gIH1cblxuICBmdW5jdGlvbiBzdHJpY3RGYWlsIChwYXJzZXIsIG1lc3NhZ2UpIHtcbiAgICBpZiAodHlwZW9mIHBhcnNlciAhPT0gJ29iamVjdCcgfHwgIShwYXJzZXIgaW5zdGFuY2VvZiBTQVhQYXJzZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBjYWxsIHRvIHN0cmljdEZhaWwnKVxuICAgIH1cbiAgICBpZiAocGFyc2VyLnN0cmljdCkge1xuICAgICAgZXJyb3IocGFyc2VyLCBtZXNzYWdlKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5ld1RhZyAocGFyc2VyKSB7XG4gICAgaWYgKCFwYXJzZXIuc3RyaWN0KSBwYXJzZXIudGFnTmFtZSA9IHBhcnNlci50YWdOYW1lW3BhcnNlci5sb29zZUNhc2VdKClcbiAgICB2YXIgcGFyZW50ID0gcGFyc2VyLnRhZ3NbcGFyc2VyLnRhZ3MubGVuZ3RoIC0gMV0gfHwgcGFyc2VyXG4gICAgdmFyIHRhZyA9IHBhcnNlci50YWcgPSB7IG5hbWU6IHBhcnNlci50YWdOYW1lLCBhdHRyaWJ1dGVzOiB7fSB9XG5cbiAgICAvLyB3aWxsIGJlIG92ZXJyaWRkZW4gaWYgdGFnIGNvbnRhaWxzIGFuIHhtbG5zPVwiZm9vXCIgb3IgeG1sbnM6Zm9vPVwiYmFyXCJcbiAgICBpZiAocGFyc2VyLm9wdC54bWxucykge1xuICAgICAgdGFnLm5zID0gcGFyZW50Lm5zXG4gICAgfVxuICAgIHBhcnNlci5hdHRyaWJMaXN0Lmxlbmd0aCA9IDBcbiAgICBlbWl0Tm9kZShwYXJzZXIsICdvbm9wZW50YWdzdGFydCcsIHRhZylcbiAgfVxuXG4gIGZ1bmN0aW9uIHFuYW1lIChuYW1lLCBhdHRyaWJ1dGUpIHtcbiAgICB2YXIgaSA9IG5hbWUuaW5kZXhPZignOicpXG4gICAgdmFyIHF1YWxOYW1lID0gaSA8IDAgPyBbICcnLCBuYW1lIF0gOiBuYW1lLnNwbGl0KCc6JylcbiAgICB2YXIgcHJlZml4ID0gcXVhbE5hbWVbMF1cbiAgICB2YXIgbG9jYWwgPSBxdWFsTmFtZVsxXVxuXG4gICAgLy8gPHggXCJ4bWxuc1wiPVwiaHR0cDovL2Zvb1wiPlxuICAgIGlmIChhdHRyaWJ1dGUgJiYgbmFtZSA9PT0gJ3htbG5zJykge1xuICAgICAgcHJlZml4ID0gJ3htbG5zJ1xuICAgICAgbG9jYWwgPSAnJ1xuICAgIH1cblxuICAgIHJldHVybiB7IHByZWZpeDogcHJlZml4LCBsb2NhbDogbG9jYWwgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXR0cmliIChwYXJzZXIpIHtcbiAgICBpZiAoIXBhcnNlci5zdHJpY3QpIHtcbiAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gcGFyc2VyLmF0dHJpYk5hbWVbcGFyc2VyLmxvb3NlQ2FzZV0oKVxuICAgIH1cblxuICAgIGlmIChwYXJzZXIuYXR0cmliTGlzdC5pbmRleE9mKHBhcnNlci5hdHRyaWJOYW1lKSAhPT0gLTEgfHxcbiAgICAgIHBhcnNlci50YWcuYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShwYXJzZXIuYXR0cmliTmFtZSkpIHtcbiAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChwYXJzZXIub3B0LnhtbG5zKSB7XG4gICAgICB2YXIgcW4gPSBxbmFtZShwYXJzZXIuYXR0cmliTmFtZSwgdHJ1ZSlcbiAgICAgIHZhciBwcmVmaXggPSBxbi5wcmVmaXhcbiAgICAgIHZhciBsb2NhbCA9IHFuLmxvY2FsXG5cbiAgICAgIGlmIChwcmVmaXggPT09ICd4bWxucycpIHtcbiAgICAgICAgLy8gbmFtZXNwYWNlIGJpbmRpbmcgYXR0cmlidXRlLiBwdXNoIHRoZSBiaW5kaW5nIGludG8gc2NvcGVcbiAgICAgICAgaWYgKGxvY2FsID09PSAneG1sJyAmJiBwYXJzZXIuYXR0cmliVmFsdWUgIT09IFhNTF9OQU1FU1BBQ0UpIHtcbiAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlcixcbiAgICAgICAgICAgICd4bWw6IHByZWZpeCBtdXN0IGJlIGJvdW5kIHRvICcgKyBYTUxfTkFNRVNQQUNFICsgJ1xcbicgK1xuICAgICAgICAgICAgJ0FjdHVhbDogJyArIHBhcnNlci5hdHRyaWJWYWx1ZSlcbiAgICAgICAgfSBlbHNlIGlmIChsb2NhbCA9PT0gJ3htbG5zJyAmJiBwYXJzZXIuYXR0cmliVmFsdWUgIT09IFhNTE5TX05BTUVTUEFDRSkge1xuICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLFxuICAgICAgICAgICAgJ3htbG5zOiBwcmVmaXggbXVzdCBiZSBib3VuZCB0byAnICsgWE1MTlNfTkFNRVNQQUNFICsgJ1xcbicgK1xuICAgICAgICAgICAgJ0FjdHVhbDogJyArIHBhcnNlci5hdHRyaWJWYWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdGFnID0gcGFyc2VyLnRhZ1xuICAgICAgICAgIHZhciBwYXJlbnQgPSBwYXJzZXIudGFnc1twYXJzZXIudGFncy5sZW5ndGggLSAxXSB8fCBwYXJzZXJcbiAgICAgICAgICBpZiAodGFnLm5zID09PSBwYXJlbnQubnMpIHtcbiAgICAgICAgICAgIHRhZy5ucyA9IE9iamVjdC5jcmVhdGUocGFyZW50Lm5zKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0YWcubnNbbG9jYWxdID0gcGFyc2VyLmF0dHJpYlZhbHVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gZGVmZXIgb25hdHRyaWJ1dGUgZXZlbnRzIHVudGlsIGFsbCBhdHRyaWJ1dGVzIGhhdmUgYmVlbiBzZWVuXG4gICAgICAvLyBzbyBhbnkgbmV3IGJpbmRpbmdzIGNhbiB0YWtlIGVmZmVjdC4gcHJlc2VydmUgYXR0cmlidXRlIG9yZGVyXG4gICAgICAvLyBzbyBkZWZlcnJlZCBldmVudHMgY2FuIGJlIGVtaXR0ZWQgaW4gZG9jdW1lbnQgb3JkZXJcbiAgICAgIHBhcnNlci5hdHRyaWJMaXN0LnB1c2goW3BhcnNlci5hdHRyaWJOYW1lLCBwYXJzZXIuYXR0cmliVmFsdWVdKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpbiBub24teG1sbnMgbW9kZSwgd2UgY2FuIGVtaXQgdGhlIGV2ZW50IHJpZ2h0IGF3YXlcbiAgICAgIHBhcnNlci50YWcuYXR0cmlidXRlc1twYXJzZXIuYXR0cmliTmFtZV0gPSBwYXJzZXIuYXR0cmliVmFsdWVcbiAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uYXR0cmlidXRlJywge1xuICAgICAgICBuYW1lOiBwYXJzZXIuYXR0cmliTmFtZSxcbiAgICAgICAgdmFsdWU6IHBhcnNlci5hdHRyaWJWYWx1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBwYXJzZXIuYXR0cmliTmFtZSA9IHBhcnNlci5hdHRyaWJWYWx1ZSA9ICcnXG4gIH1cblxuICBmdW5jdGlvbiBvcGVuVGFnIChwYXJzZXIsIHNlbGZDbG9zaW5nKSB7XG4gICAgaWYgKHBhcnNlci5vcHQueG1sbnMpIHtcbiAgICAgIC8vIGVtaXQgbmFtZXNwYWNlIGJpbmRpbmcgZXZlbnRzXG4gICAgICB2YXIgdGFnID0gcGFyc2VyLnRhZ1xuXG4gICAgICAvLyBhZGQgbmFtZXNwYWNlIGluZm8gdG8gdGFnXG4gICAgICB2YXIgcW4gPSBxbmFtZShwYXJzZXIudGFnTmFtZSlcbiAgICAgIHRhZy5wcmVmaXggPSBxbi5wcmVmaXhcbiAgICAgIHRhZy5sb2NhbCA9IHFuLmxvY2FsXG4gICAgICB0YWcudXJpID0gdGFnLm5zW3FuLnByZWZpeF0gfHwgJydcblxuICAgICAgaWYgKHRhZy5wcmVmaXggJiYgIXRhZy51cmkpIHtcbiAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdVbmJvdW5kIG5hbWVzcGFjZSBwcmVmaXg6ICcgK1xuICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHBhcnNlci50YWdOYW1lKSlcbiAgICAgICAgdGFnLnVyaSA9IHFuLnByZWZpeFxuICAgICAgfVxuXG4gICAgICB2YXIgcGFyZW50ID0gcGFyc2VyLnRhZ3NbcGFyc2VyLnRhZ3MubGVuZ3RoIC0gMV0gfHwgcGFyc2VyXG4gICAgICBpZiAodGFnLm5zICYmIHBhcmVudC5ucyAhPT0gdGFnLm5zKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRhZy5ucykuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29ub3Blbm5hbWVzcGFjZScsIHtcbiAgICAgICAgICAgIHByZWZpeDogcCxcbiAgICAgICAgICAgIHVyaTogdGFnLm5zW3BdXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIGRlZmVycmVkIG9uYXR0cmlidXRlIGV2ZW50c1xuICAgICAgLy8gTm90ZTogZG8gbm90IGFwcGx5IGRlZmF1bHQgbnMgdG8gYXR0cmlidXRlczpcbiAgICAgIC8vICAgaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC1uYW1lcy8jZGVmYXVsdGluZ1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXJzZXIuYXR0cmliTGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIG52ID0gcGFyc2VyLmF0dHJpYkxpc3RbaV1cbiAgICAgICAgdmFyIG5hbWUgPSBudlswXVxuICAgICAgICB2YXIgdmFsdWUgPSBudlsxXVxuICAgICAgICB2YXIgcXVhbE5hbWUgPSBxbmFtZShuYW1lLCB0cnVlKVxuICAgICAgICB2YXIgcHJlZml4ID0gcXVhbE5hbWUucHJlZml4XG4gICAgICAgIHZhciBsb2NhbCA9IHF1YWxOYW1lLmxvY2FsXG4gICAgICAgIHZhciB1cmkgPSBwcmVmaXggPT09ICcnID8gJycgOiAodGFnLm5zW3ByZWZpeF0gfHwgJycpXG4gICAgICAgIHZhciBhID0ge1xuICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgIGxvY2FsOiBsb2NhbCxcbiAgICAgICAgICB1cmk6IHVyaVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlcmUncyBhbnkgYXR0cmlidXRlcyB3aXRoIGFuIHVuZGVmaW5lZCBuYW1lc3BhY2UsXG4gICAgICAgIC8vIHRoZW4gZmFpbCBvbiB0aGVtIG5vdy5cbiAgICAgICAgaWYgKHByZWZpeCAmJiBwcmVmaXggIT09ICd4bWxucycgJiYgIXVyaSkge1xuICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnVW5ib3VuZCBuYW1lc3BhY2UgcHJlZml4OiAnICtcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHByZWZpeCkpXG4gICAgICAgICAgYS51cmkgPSBwcmVmaXhcbiAgICAgICAgfVxuICAgICAgICBwYXJzZXIudGFnLmF0dHJpYnV0ZXNbbmFtZV0gPSBhXG4gICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uYXR0cmlidXRlJywgYSlcbiAgICAgIH1cbiAgICAgIHBhcnNlci5hdHRyaWJMaXN0Lmxlbmd0aCA9IDBcbiAgICB9XG5cbiAgICBwYXJzZXIudGFnLmlzU2VsZkNsb3NpbmcgPSAhIXNlbGZDbG9zaW5nXG5cbiAgICAvLyBwcm9jZXNzIHRoZSB0YWdcbiAgICBwYXJzZXIuc2F3Um9vdCA9IHRydWVcbiAgICBwYXJzZXIudGFncy5wdXNoKHBhcnNlci50YWcpXG4gICAgZW1pdE5vZGUocGFyc2VyLCAnb25vcGVudGFnJywgcGFyc2VyLnRhZylcbiAgICBpZiAoIXNlbGZDbG9zaW5nKSB7XG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDxzY3JpcHQ+IGluIG5vbi1zdHJpY3QgbW9kZS5cbiAgICAgIGlmICghcGFyc2VyLm5vc2NyaXB0ICYmIHBhcnNlci50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzY3JpcHQnKSB7XG4gICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0NSSVBUXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlRFWFRcbiAgICAgIH1cbiAgICAgIHBhcnNlci50YWcgPSBudWxsXG4gICAgICBwYXJzZXIudGFnTmFtZSA9ICcnXG4gICAgfVxuICAgIHBhcnNlci5hdHRyaWJOYW1lID0gcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICBwYXJzZXIuYXR0cmliTGlzdC5sZW5ndGggPSAwXG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZVRhZyAocGFyc2VyKSB7XG4gICAgaWYgKCFwYXJzZXIudGFnTmFtZSkge1xuICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdXZWlyZCBlbXB0eSBjbG9zZSB0YWcuJylcbiAgICAgIHBhcnNlci50ZXh0Tm9kZSArPSAnPC8+J1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocGFyc2VyLnNjcmlwdCkge1xuICAgICAgaWYgKHBhcnNlci50YWdOYW1lICE9PSAnc2NyaXB0Jykge1xuICAgICAgICBwYXJzZXIuc2NyaXB0ICs9ICc8LycgKyBwYXJzZXIudGFnTmFtZSArICc+J1xuICAgICAgICBwYXJzZXIudGFnTmFtZSA9ICcnXG4gICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuU0NSSVBUXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25zY3JpcHQnLCBwYXJzZXIuc2NyaXB0KVxuICAgICAgcGFyc2VyLnNjcmlwdCA9ICcnXG4gICAgfVxuXG4gICAgLy8gZmlyc3QgbWFrZSBzdXJlIHRoYXQgdGhlIGNsb3NpbmcgdGFnIGFjdHVhbGx5IGV4aXN0cy5cbiAgICAvLyA8YT48Yj48L2M+PC9iPjwvYT4gd2lsbCBjbG9zZSBldmVyeXRoaW5nLCBvdGhlcndpc2UuXG4gICAgdmFyIHQgPSBwYXJzZXIudGFncy5sZW5ndGhcbiAgICB2YXIgdGFnTmFtZSA9IHBhcnNlci50YWdOYW1lXG4gICAgaWYgKCFwYXJzZXIuc3RyaWN0KSB7XG4gICAgICB0YWdOYW1lID0gdGFnTmFtZVtwYXJzZXIubG9vc2VDYXNlXSgpXG4gICAgfVxuICAgIHZhciBjbG9zZVRvID0gdGFnTmFtZVxuICAgIHdoaWxlICh0LS0pIHtcbiAgICAgIHZhciBjbG9zZSA9IHBhcnNlci50YWdzW3RdXG4gICAgICBpZiAoY2xvc2UubmFtZSAhPT0gY2xvc2VUbykge1xuICAgICAgICAvLyBmYWlsIHRoZSBmaXJzdCB0aW1lIGluIHN0cmljdCBtb2RlXG4gICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnVW5leHBlY3RlZCBjbG9zZSB0YWcnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBkaWRuJ3QgZmluZCBpdC4gIHdlIGFscmVhZHkgZmFpbGVkIGZvciBzdHJpY3QsIHNvIGp1c3QgYWJvcnQuXG4gICAgaWYgKHQgPCAwKSB7XG4gICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1VubWF0Y2hlZCBjbG9zaW5nIHRhZzogJyArIHBhcnNlci50YWdOYW1lKVxuICAgICAgcGFyc2VyLnRleHROb2RlICs9ICc8LycgKyBwYXJzZXIudGFnTmFtZSArICc+J1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcGFyc2VyLnRhZ05hbWUgPSB0YWdOYW1lXG4gICAgdmFyIHMgPSBwYXJzZXIudGFncy5sZW5ndGhcbiAgICB3aGlsZSAocy0tID4gdCkge1xuICAgICAgdmFyIHRhZyA9IHBhcnNlci50YWcgPSBwYXJzZXIudGFncy5wb3AoKVxuICAgICAgcGFyc2VyLnRhZ05hbWUgPSBwYXJzZXIudGFnLm5hbWVcbiAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2xvc2V0YWcnLCBwYXJzZXIudGFnTmFtZSlcblxuICAgICAgdmFyIHggPSB7fVxuICAgICAgZm9yICh2YXIgaSBpbiB0YWcubnMpIHtcbiAgICAgICAgeFtpXSA9IHRhZy5uc1tpXVxuICAgICAgfVxuXG4gICAgICB2YXIgcGFyZW50ID0gcGFyc2VyLnRhZ3NbcGFyc2VyLnRhZ3MubGVuZ3RoIC0gMV0gfHwgcGFyc2VyXG4gICAgICBpZiAocGFyc2VyLm9wdC54bWxucyAmJiB0YWcubnMgIT09IHBhcmVudC5ucykge1xuICAgICAgICAvLyByZW1vdmUgbmFtZXNwYWNlIGJpbmRpbmdzIGludHJvZHVjZWQgYnkgdGFnXG4gICAgICAgIE9iamVjdC5rZXlzKHRhZy5ucykuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgIHZhciBuID0gdGFnLm5zW3BdXG4gICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jbG9zZW5hbWVzcGFjZScsIHsgcHJlZml4OiBwLCB1cmk6IG4gfSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHQgPT09IDApIHBhcnNlci5jbG9zZWRSb290ID0gdHJ1ZVxuICAgIHBhcnNlci50YWdOYW1lID0gcGFyc2VyLmF0dHJpYlZhbHVlID0gcGFyc2VyLmF0dHJpYk5hbWUgPSAnJ1xuICAgIHBhcnNlci5hdHRyaWJMaXN0Lmxlbmd0aCA9IDBcbiAgICBwYXJzZXIuc3RhdGUgPSBTLlRFWFRcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRW50aXR5IChwYXJzZXIpIHtcbiAgICB2YXIgZW50aXR5ID0gcGFyc2VyLmVudGl0eVxuICAgIHZhciBlbnRpdHlMQyA9IGVudGl0eS50b0xvd2VyQ2FzZSgpXG4gICAgdmFyIG51bVxuICAgIHZhciBudW1TdHIgPSAnJ1xuXG4gICAgaWYgKHBhcnNlci5FTlRJVElFU1tlbnRpdHldKSB7XG4gICAgICByZXR1cm4gcGFyc2VyLkVOVElUSUVTW2VudGl0eV1cbiAgICB9XG4gICAgaWYgKHBhcnNlci5FTlRJVElFU1tlbnRpdHlMQ10pIHtcbiAgICAgIHJldHVybiBwYXJzZXIuRU5USVRJRVNbZW50aXR5TENdXG4gICAgfVxuICAgIGVudGl0eSA9IGVudGl0eUxDXG4gICAgaWYgKGVudGl0eS5jaGFyQXQoMCkgPT09ICcjJykge1xuICAgICAgaWYgKGVudGl0eS5jaGFyQXQoMSkgPT09ICd4Jykge1xuICAgICAgICBlbnRpdHkgPSBlbnRpdHkuc2xpY2UoMilcbiAgICAgICAgbnVtID0gcGFyc2VJbnQoZW50aXR5LCAxNilcbiAgICAgICAgbnVtU3RyID0gbnVtLnRvU3RyaW5nKDE2KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW50aXR5ID0gZW50aXR5LnNsaWNlKDEpXG4gICAgICAgIG51bSA9IHBhcnNlSW50KGVudGl0eSwgMTApXG4gICAgICAgIG51bVN0ciA9IG51bS50b1N0cmluZygxMClcbiAgICAgIH1cbiAgICB9XG4gICAgZW50aXR5ID0gZW50aXR5LnJlcGxhY2UoL14wKy8sICcnKVxuICAgIGlmIChpc05hTihudW0pIHx8IG51bVN0ci50b0xvd2VyQ2FzZSgpICE9PSBlbnRpdHkpIHtcbiAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXIgZW50aXR5JylcbiAgICAgIHJldHVybiAnJicgKyBwYXJzZXIuZW50aXR5ICsgJzsnXG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ29kZVBvaW50KG51bSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlZ2luV2hpdGVTcGFjZSAocGFyc2VyLCBjKSB7XG4gICAgaWYgKGMgPT09ICc8Jykge1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5PUEVOX1dBS0FcbiAgICAgIHBhcnNlci5zdGFydFRhZ1Bvc2l0aW9uID0gcGFyc2VyLnBvc2l0aW9uXG4gICAgfSBlbHNlIGlmICghaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAvLyBoYXZlIHRvIHByb2Nlc3MgdGhpcyBhcyBhIHRleHQgbm9kZS5cbiAgICAgIC8vIHdlaXJkLCBidXQgaGFwcGVucy5cbiAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnTm9uLXdoaXRlc3BhY2UgYmVmb3JlIGZpcnN0IHRhZy4nKVxuICAgICAgcGFyc2VyLnRleHROb2RlID0gY1xuICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hhckF0IChjaHVuaywgaSkge1xuICAgIHZhciByZXN1bHQgPSAnJ1xuICAgIGlmIChpIDwgY2h1bmsubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSBjaHVuay5jaGFyQXQoaSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUgKGNodW5rKSB7XG4gICAgdmFyIHBhcnNlciA9IHRoaXNcbiAgICBpZiAodGhpcy5lcnJvcikge1xuICAgICAgdGhyb3cgdGhpcy5lcnJvclxuICAgIH1cbiAgICBpZiAocGFyc2VyLmNsb3NlZCkge1xuICAgICAgcmV0dXJuIGVycm9yKHBhcnNlcixcbiAgICAgICAgJ0Nhbm5vdCB3cml0ZSBhZnRlciBjbG9zZS4gQXNzaWduIGFuIG9ucmVhZHkgaGFuZGxlci4nKVxuICAgIH1cbiAgICBpZiAoY2h1bmsgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbmQocGFyc2VyKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGNodW5rID09PSAnb2JqZWN0Jykge1xuICAgICAgY2h1bmsgPSBjaHVuay50b1N0cmluZygpXG4gICAgfVxuICAgIHZhciBpID0gMFxuICAgIHZhciBjID0gJydcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgYyA9IGNoYXJBdChjaHVuaywgaSsrKVxuICAgICAgcGFyc2VyLmMgPSBjXG5cbiAgICAgIGlmICghYykge1xuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyc2VyLnRyYWNrUG9zaXRpb24pIHtcbiAgICAgICAgcGFyc2VyLnBvc2l0aW9uKytcbiAgICAgICAgaWYgKGMgPT09ICdcXG4nKSB7XG4gICAgICAgICAgcGFyc2VyLmxpbmUrK1xuICAgICAgICAgIHBhcnNlci5jb2x1bW4gPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFyc2VyLmNvbHVtbisrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChwYXJzZXIuc3RhdGUpIHtcbiAgICAgICAgY2FzZSBTLkJFR0lOOlxuICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQkVHSU5fV0hJVEVTUEFDRVxuICAgICAgICAgIGlmIChjID09PSAnXFx1RkVGRicpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJlZ2luV2hpdGVTcGFjZShwYXJzZXIsIGMpXG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQkVHSU5fV0hJVEVTUEFDRTpcbiAgICAgICAgICBiZWdpbldoaXRlU3BhY2UocGFyc2VyLCBjKVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlRFWFQ6XG4gICAgICAgICAgaWYgKHBhcnNlci5zYXdSb290ICYmICFwYXJzZXIuY2xvc2VkUm9vdCkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0aSA9IGkgLSAxXG4gICAgICAgICAgICB3aGlsZSAoYyAmJiBjICE9PSAnPCcgJiYgYyAhPT0gJyYnKSB7XG4gICAgICAgICAgICAgIGMgPSBjaGFyQXQoY2h1bmssIGkrKylcbiAgICAgICAgICAgICAgaWYgKGMgJiYgcGFyc2VyLnRyYWNrUG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIucG9zaXRpb24rK1xuICAgICAgICAgICAgICAgIGlmIChjID09PSAnXFxuJykge1xuICAgICAgICAgICAgICAgICAgcGFyc2VyLmxpbmUrK1xuICAgICAgICAgICAgICAgICAgcGFyc2VyLmNvbHVtbiA9IDBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGFyc2VyLmNvbHVtbisrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIudGV4dE5vZGUgKz0gY2h1bmsuc3Vic3RyaW5nKHN0YXJ0aSwgaSAtIDEpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjID09PSAnPCcgJiYgIShwYXJzZXIuc2F3Um9vdCAmJiBwYXJzZXIuY2xvc2VkUm9vdCAmJiAhcGFyc2VyLnN0cmljdCkpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuT1BFTl9XQUtBXG4gICAgICAgICAgICBwYXJzZXIuc3RhcnRUYWdQb3NpdGlvbiA9IHBhcnNlci5wb3NpdGlvblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWlzV2hpdGVzcGFjZShjKSAmJiAoIXBhcnNlci5zYXdSb290IHx8IHBhcnNlci5jbG9zZWRSb290KSkge1xuICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1RleHQgZGF0YSBvdXRzaWRlIG9mIHJvb3Qgbm9kZS4nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGMgPT09ICcmJykge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlRFWFRfRU5USVRZXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJzZXIudGV4dE5vZGUgKz0gY1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5TQ1JJUFQ6XG4gICAgICAgICAgLy8gb25seSBub24tc3RyaWN0XG4gICAgICAgICAgaWYgKGMgPT09ICc8Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TQ1JJUFRfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zY3JpcHQgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5TQ1JJUFRfRU5ESU5HOlxuICAgICAgICAgIGlmIChjID09PSAnLycpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ0xPU0VfVEFHXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zY3JpcHQgKz0gJzwnICsgY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TQ1JJUFRcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuT1BFTl9XQUtBOlxuICAgICAgICAgIC8vIGVpdGhlciBhIC8sID8sICEsIG9yIHRleHQgaXMgY29taW5nIG5leHQuXG4gICAgICAgICAgaWYgKGMgPT09ICchJykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TR01MX0RFQ0xcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCA9ICcnXG4gICAgICAgICAgfSBlbHNlIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIGl0Li4uXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuT1BFTl9UQUdcbiAgICAgICAgICAgIHBhcnNlci50YWdOYW1lID0gY1xuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJy8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNMT1NFX1RBR1xuICAgICAgICAgICAgcGFyc2VyLnRhZ05hbWUgPSAnJ1xuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJz8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlBST0NfSU5TVFxuICAgICAgICAgICAgcGFyc2VyLnByb2NJbnN0TmFtZSA9IHBhcnNlci5wcm9jSW5zdEJvZHkgPSAnJ1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ1VuZW5jb2RlZCA8JylcbiAgICAgICAgICAgIC8vIGlmIHRoZXJlIHdhcyBzb21lIHdoaXRlc3BhY2UsIHRoZW4gYWRkIHRoYXQgaW4uXG4gICAgICAgICAgICBpZiAocGFyc2VyLnN0YXJ0VGFnUG9zaXRpb24gKyAxIDwgcGFyc2VyLnBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIHZhciBwYWQgPSBwYXJzZXIucG9zaXRpb24gLSBwYXJzZXIuc3RhcnRUYWdQb3NpdGlvblxuICAgICAgICAgICAgICBjID0gbmV3IEFycmF5KHBhZCkuam9pbignICcpICsgY1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLnRleHROb2RlICs9ICc8JyArIGNcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuVEVYVFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5TR01MX0RFQ0w6XG4gICAgICAgICAgaWYgKChwYXJzZXIuc2dtbERlY2wgKyBjKS50b1VwcGVyQ2FzZSgpID09PSBDREFUQSkge1xuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25vcGVuY2RhdGEnKVxuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5DREFUQVxuICAgICAgICAgICAgcGFyc2VyLnNnbWxEZWNsID0gJydcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSA9ICcnXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJzZXIuc2dtbERlY2wgKyBjID09PSAnLS0nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCA9ICcnXG4gICAgICAgICAgfSBlbHNlIGlmICgocGFyc2VyLnNnbWxEZWNsICsgYykudG9VcHBlckNhc2UoKSA9PT0gRE9DVFlQRSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFXG4gICAgICAgICAgICBpZiAocGFyc2VyLmRvY3R5cGUgfHwgcGFyc2VyLnNhd1Jvb3QpIHtcbiAgICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsXG4gICAgICAgICAgICAgICAgJ0luYXBwcm9wcmlhdGVseSBsb2NhdGVkIGRvY3R5cGUgZGVjbGFyYXRpb24nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFyc2VyLmRvY3R5cGUgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnNnbWxEZWNsID0gJydcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25zZ21sZGVjbGFyYXRpb24nLCBwYXJzZXIuc2dtbERlY2wpXG4gICAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfSBlbHNlIGlmIChpc1F1b3RlKGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNHTUxfREVDTF9RVU9URURcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCArPSBjXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zZ21sRGVjbCArPSBjXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlNHTUxfREVDTF9RVU9URUQ6XG4gICAgICAgICAgaWYgKGMgPT09IHBhcnNlci5xKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNHTUxfREVDTFxuICAgICAgICAgICAgcGFyc2VyLnEgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJzZXIuc2dtbERlY2wgKz0gY1xuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkRPQ1RZUEU6XG4gICAgICAgICAgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgICBlbWl0Tm9kZShwYXJzZXIsICdvbmRvY3R5cGUnLCBwYXJzZXIuZG9jdHlwZSlcbiAgICAgICAgICAgIHBhcnNlci5kb2N0eXBlID0gdHJ1ZSAvLyBqdXN0IHJlbWVtYmVyIHRoYXQgd2Ugc2F3IGl0LlxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIuZG9jdHlwZSArPSBjXG4gICAgICAgICAgICBpZiAoYyA9PT0gJ1snKSB7XG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuRE9DVFlQRV9EVERcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNRdW90ZShjKSkge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkRPQ1RZUEVfUVVPVEVEXG4gICAgICAgICAgICAgIHBhcnNlci5xID0gY1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5ET0NUWVBFX1FVT1RFRDpcbiAgICAgICAgICBwYXJzZXIuZG9jdHlwZSArPSBjXG4gICAgICAgICAgaWYgKGMgPT09IHBhcnNlci5xKSB7XG4gICAgICAgICAgICBwYXJzZXIucSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkRPQ1RZUEVcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuRE9DVFlQRV9EVEQ6XG4gICAgICAgICAgcGFyc2VyLmRvY3R5cGUgKz0gY1xuICAgICAgICAgIGlmIChjID09PSAnXScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuRE9DVFlQRVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNRdW90ZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFX0RURF9RVU9URURcbiAgICAgICAgICAgIHBhcnNlci5xID0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5ET0NUWVBFX0RURF9RVU9URUQ6XG4gICAgICAgICAgcGFyc2VyLmRvY3R5cGUgKz0gY1xuICAgICAgICAgIGlmIChjID09PSBwYXJzZXIucSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5ET0NUWVBFX0RURFxuICAgICAgICAgICAgcGFyc2VyLnEgPSAnJ1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DT01NRU5UOlxuICAgICAgICAgIGlmIChjID09PSAnLScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ09NTUVOVF9FTkRJTkdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLmNvbW1lbnQgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DT01NRU5UX0VORElORzpcbiAgICAgICAgICBpZiAoYyA9PT0gJy0nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRfRU5ERURcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ID0gdGV4dG9wdHMocGFyc2VyLm9wdCwgcGFyc2VyLmNvbW1lbnQpXG4gICAgICAgICAgICBpZiAocGFyc2VyLmNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jb21tZW50JywgcGFyc2VyLmNvbW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIuY29tbWVudCA9ICcnXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ICs9ICctJyArIGNcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ09NTUVOVFxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5DT01NRU5UX0VOREVEOlxuICAgICAgICAgIGlmIChjICE9PSAnPicpIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnTWFsZm9ybWVkIGNvbW1lbnQnKVxuICAgICAgICAgICAgLy8gYWxsb3cgPCEtLSBibGFoIC0tIGJsb28gLS0+IGluIG5vbi1zdHJpY3QgbW9kZSxcbiAgICAgICAgICAgIC8vIHdoaWNoIGlzIGEgY29tbWVudCBvZiBcIiBibGFoIC0tIGJsb28gXCJcbiAgICAgICAgICAgIHBhcnNlci5jb21tZW50ICs9ICctLScgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNPTU1FTlRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNEQVRBOlxuICAgICAgICAgIGlmIChjID09PSAnXScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQ0RBVEFfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSArPSBjXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNEQVRBX0VORElORzpcbiAgICAgICAgICBpZiAoYyA9PT0gJ10nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNEQVRBX0VORElOR18yXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSArPSAnXScgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNEQVRBXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNEQVRBX0VORElOR18yOlxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIGlmIChwYXJzZXIuY2RhdGEpIHtcbiAgICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25jZGF0YScsIHBhcnNlci5jZGF0YSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29uY2xvc2VjZGF0YScpXG4gICAgICAgICAgICBwYXJzZXIuY2RhdGEgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnXScpIHtcbiAgICAgICAgICAgIHBhcnNlci5jZGF0YSArPSAnXSdcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VyLmNkYXRhICs9ICddXScgKyBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNEQVRBXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLlBST0NfSU5TVDpcbiAgICAgICAgICBpZiAoYyA9PT0gJz8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlBST0NfSU5TVF9FTkRJTkdcbiAgICAgICAgICB9IGVsc2UgaWYgKGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RfQk9EWVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZXIucHJvY0luc3ROYW1lICs9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuUFJPQ19JTlNUX0JPRFk6XG4gICAgICAgICAgaWYgKCFwYXJzZXIucHJvY0luc3RCb2R5ICYmIGlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc/Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RfRU5ESU5HXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5wcm9jSW5zdEJvZHkgKz0gY1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5QUk9DX0lOU1RfRU5ESU5HOlxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIGVtaXROb2RlKHBhcnNlciwgJ29ucHJvY2Vzc2luZ2luc3RydWN0aW9uJywge1xuICAgICAgICAgICAgICBuYW1lOiBwYXJzZXIucHJvY0luc3ROYW1lLFxuICAgICAgICAgICAgICBib2R5OiBwYXJzZXIucHJvY0luc3RCb2R5XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcGFyc2VyLnByb2NJbnN0TmFtZSA9IHBhcnNlci5wcm9jSW5zdEJvZHkgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5URVhUXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5wcm9jSW5zdEJvZHkgKz0gJz8nICsgY1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5QUk9DX0lOU1RfQk9EWVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5PUEVOX1RBRzpcbiAgICAgICAgICBpZiAoaXNNYXRjaChuYW1lQm9keSwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci50YWdOYW1lICs9IGNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGFnKHBhcnNlcilcbiAgICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgICAgb3BlblRhZyhwYXJzZXIpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICcvJykge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fVEFHX1NMQVNIXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXIgaW4gdGFnIG5hbWUnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLk9QRU5fVEFHX1NMQVNIOlxuICAgICAgICAgIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyLCB0cnVlKVxuICAgICAgICAgICAgY2xvc2VUYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ZvcndhcmQtc2xhc2ggaW4gb3BlbmluZyB0YWcgbm90IGZvbGxvd2VkIGJ5ID4nKVxuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCOlxuICAgICAgICAgIC8vIGhhdmVuJ3QgcmVhZCB0aGUgYXR0cmlidXRlIG5hbWUgeWV0LlxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJy8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fVEFHX1NMQVNIXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJOYW1lID0gY1xuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYlZhbHVlID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX05BTUVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lJylcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX05BTUU6XG4gICAgICAgICAgaWYgKGMgPT09ICc9Jykge1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVcbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdBdHRyaWJ1dGUgd2l0aG91dCB2YWx1ZScpXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgPSBwYXJzZXIuYXR0cmliTmFtZVxuICAgICAgICAgICAgYXR0cmliKHBhcnNlcilcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9OQU1FX1NBV19XSElURVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lQm9keSwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJOYW1lICs9IGNcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdJbnZhbGlkIGF0dHJpYnV0ZSBuYW1lJylcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX05BTUVfU0FXX1dISVRFOlxuICAgICAgICAgIGlmIChjID09PSAnPScpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX1ZBTFVFXG4gICAgICAgICAgfSBlbHNlIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnQXR0cmlidXRlIHdpdGhvdXQgdmFsdWUnKVxuICAgICAgICAgICAgcGFyc2VyLnRhZy5hdHRyaWJ1dGVzW3BhcnNlci5hdHRyaWJOYW1lXSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgPSAnJ1xuICAgICAgICAgICAgZW1pdE5vZGUocGFyc2VyLCAnb25hdHRyaWJ1dGUnLCB7XG4gICAgICAgICAgICAgIG5hbWU6IHBhcnNlci5hdHRyaWJOYW1lLFxuICAgICAgICAgICAgICB2YWx1ZTogJydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliTmFtZSA9ICcnXG4gICAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLmF0dHJpYk5hbWUgPSBjXG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCX05BTUVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBhdHRyaWJ1dGUgbmFtZScpXG4gICAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkFUVFJJQl9WQUxVRTpcbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNRdW90ZShjKSkge1xuICAgICAgICAgICAgcGFyc2VyLnEgPSBjXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9RVU9URURcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaWN0RmFpbChwYXJzZXIsICdVbnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUnKVxuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVfVU5RVU9URURcbiAgICAgICAgICAgIHBhcnNlci5hdHRyaWJWYWx1ZSA9IGNcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX1FVT1RFRDpcbiAgICAgICAgICBpZiAoYyAhPT0gcGFyc2VyLnEpIHtcbiAgICAgICAgICAgIGlmIChjID09PSAnJicpIHtcbiAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfVkFMVUVfRU5USVRZX1FcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhcnNlci5hdHRyaWJWYWx1ZSArPSBjXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBhdHRyaWIocGFyc2VyKVxuICAgICAgICAgIHBhcnNlci5xID0gJydcbiAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9DTE9TRURcbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfQ0xPU0VEOlxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoYykpIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicpIHtcbiAgICAgICAgICAgIG9wZW5UYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJy8nKSB7XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLk9QRU5fVEFHX1NMQVNIXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnTm8gd2hpdGVzcGFjZSBiZXR3ZWVuIGF0dHJpYnV0ZXMnKVxuICAgICAgICAgICAgcGFyc2VyLmF0dHJpYk5hbWUgPSBjXG4gICAgICAgICAgICBwYXJzZXIuYXR0cmliVmFsdWUgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5BVFRSSUJfTkFNRVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgYXR0cmlidXRlIG5hbWUnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfVU5RVU9URUQ6XG4gICAgICAgICAgaWYgKCFpc0F0dHJpYkVuZChjKSkge1xuICAgICAgICAgICAgaWYgKGMgPT09ICcmJykge1xuICAgICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9FTlRJVFlfVVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyc2VyLmF0dHJpYlZhbHVlICs9IGNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGF0dHJpYihwYXJzZXIpXG4gICAgICAgICAgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgb3BlblRhZyhwYXJzZXIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IFMuQVRUUklCXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgY2FzZSBTLkNMT1NFX1RBRzpcbiAgICAgICAgICBpZiAoIXBhcnNlci50YWdOYW1lKSB7XG4gICAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vdE1hdGNoKG5hbWVTdGFydCwgYykpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnNlci5zY3JpcHQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIuc2NyaXB0ICs9ICc8LycgKyBjXG4gICAgICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gUy5TQ1JJUFRcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgdGFnbmFtZSBpbiBjbG9zaW5nIHRhZy4nKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYXJzZXIudGFnTmFtZSA9IGNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+Jykge1xuICAgICAgICAgICAgY2xvc2VUYWcocGFyc2VyKVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNNYXRjaChuYW1lQm9keSwgYykpIHtcbiAgICAgICAgICAgIHBhcnNlci50YWdOYW1lICs9IGNcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcnNlci5zY3JpcHQpIHtcbiAgICAgICAgICAgIHBhcnNlci5zY3JpcHQgKz0gJzwvJyArIHBhcnNlci50YWdOYW1lXG4gICAgICAgICAgICBwYXJzZXIudGFnTmFtZSA9ICcnXG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLlNDUklQVFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWlzV2hpdGVzcGFjZShjKSkge1xuICAgICAgICAgICAgICBzdHJpY3RGYWlsKHBhcnNlciwgJ0ludmFsaWQgdGFnbmFtZSBpbiBjbG9zaW5nIHRhZycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJzZXIuc3RhdGUgPSBTLkNMT1NFX1RBR19TQVdfV0hJVEVcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuQ0xPU0VfVEFHX1NBV19XSElURTpcbiAgICAgICAgICBpZiAoaXNXaGl0ZXNwYWNlKGMpKSB7XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYyA9PT0gJz4nKSB7XG4gICAgICAgICAgICBjbG9zZVRhZyhwYXJzZXIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXJzIGluIGNsb3NpbmcgdGFnJylcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGludWVcblxuICAgICAgICBjYXNlIFMuVEVYVF9FTlRJVFk6XG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfRU5USVRZX1E6XG4gICAgICAgIGNhc2UgUy5BVFRSSUJfVkFMVUVfRU5USVRZX1U6XG4gICAgICAgICAgdmFyIHJldHVyblN0YXRlXG4gICAgICAgICAgdmFyIGJ1ZmZlclxuICAgICAgICAgIHN3aXRjaCAocGFyc2VyLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFMuVEVYVF9FTlRJVFk6XG4gICAgICAgICAgICAgIHJldHVyblN0YXRlID0gUy5URVhUXG4gICAgICAgICAgICAgIGJ1ZmZlciA9ICd0ZXh0Tm9kZSdcbiAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSBTLkFUVFJJQl9WQUxVRV9FTlRJVFlfUTpcbiAgICAgICAgICAgICAgcmV0dXJuU3RhdGUgPSBTLkFUVFJJQl9WQUxVRV9RVU9URURcbiAgICAgICAgICAgICAgYnVmZmVyID0gJ2F0dHJpYlZhbHVlJ1xuICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICBjYXNlIFMuQVRUUklCX1ZBTFVFX0VOVElUWV9VOlxuICAgICAgICAgICAgICByZXR1cm5TdGF0ZSA9IFMuQVRUUklCX1ZBTFVFX1VOUVVPVEVEXG4gICAgICAgICAgICAgIGJ1ZmZlciA9ICdhdHRyaWJWYWx1ZSdcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYyA9PT0gJzsnKSB7XG4gICAgICAgICAgICBwYXJzZXJbYnVmZmVyXSArPSBwYXJzZUVudGl0eShwYXJzZXIpXG4gICAgICAgICAgICBwYXJzZXIuZW50aXR5ID0gJydcbiAgICAgICAgICAgIHBhcnNlci5zdGF0ZSA9IHJldHVyblN0YXRlXG4gICAgICAgICAgfSBlbHNlIGlmIChpc01hdGNoKHBhcnNlci5lbnRpdHkubGVuZ3RoID8gZW50aXR5Qm9keSA6IGVudGl0eVN0YXJ0LCBjKSkge1xuICAgICAgICAgICAgcGFyc2VyLmVudGl0eSArPSBjXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmljdEZhaWwocGFyc2VyLCAnSW52YWxpZCBjaGFyYWN0ZXIgaW4gZW50aXR5IG5hbWUnKVxuICAgICAgICAgICAgcGFyc2VyW2J1ZmZlcl0gKz0gJyYnICsgcGFyc2VyLmVudGl0eSArIGNcbiAgICAgICAgICAgIHBhcnNlci5lbnRpdHkgPSAnJ1xuICAgICAgICAgICAgcGFyc2VyLnN0YXRlID0gcmV0dXJuU3RhdGVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHBhcnNlciwgJ1Vua25vd24gc3RhdGU6ICcgKyBwYXJzZXIuc3RhdGUpXG4gICAgICB9XG4gICAgfSAvLyB3aGlsZVxuXG4gICAgaWYgKHBhcnNlci5wb3NpdGlvbiA+PSBwYXJzZXIuYnVmZmVyQ2hlY2tQb3NpdGlvbikge1xuICAgICAgY2hlY2tCdWZmZXJMZW5ndGgocGFyc2VyKVxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VyXG4gIH1cblxuICAvKiEgaHR0cDovL210aHMuYmUvZnJvbWNvZGVwb2ludCB2MC4xLjAgYnkgQG1hdGhpYXMgKi9cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKCFTdHJpbmcuZnJvbUNvZGVQb2ludCkge1xuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuICAgICAgdmFyIGZsb29yID0gTWF0aC5mbG9vclxuICAgICAgdmFyIGZyb21Db2RlUG9pbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBNQVhfU0laRSA9IDB4NDAwMFxuICAgICAgICB2YXIgY29kZVVuaXRzID0gW11cbiAgICAgICAgdmFyIGhpZ2hTdXJyb2dhdGVcbiAgICAgICAgdmFyIGxvd1N1cnJvZ2F0ZVxuICAgICAgICB2YXIgaW5kZXggPSAtMVxuICAgICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSAnJ1xuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgIHZhciBjb2RlUG9pbnQgPSBOdW1iZXIoYXJndW1lbnRzW2luZGV4XSlcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhaXNGaW5pdGUoY29kZVBvaW50KSB8fCAvLyBgTmFOYCwgYCtJbmZpbml0eWAsIG9yIGAtSW5maW5pdHlgXG4gICAgICAgICAgICBjb2RlUG9pbnQgPCAwIHx8IC8vIG5vdCBhIHZhbGlkIFVuaWNvZGUgY29kZSBwb2ludFxuICAgICAgICAgICAgY29kZVBvaW50ID4gMHgxMEZGRkYgfHwgLy8gbm90IGEgdmFsaWQgVW5pY29kZSBjb2RlIHBvaW50XG4gICAgICAgICAgICBmbG9vcihjb2RlUG9pbnQpICE9PSBjb2RlUG9pbnQgLy8gbm90IGFuIGludGVnZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludDogJyArIGNvZGVQb2ludClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvZGVQb2ludCA8PSAweEZGRkYpIHsgLy8gQk1QIGNvZGUgcG9pbnRcbiAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludClcbiAgICAgICAgICB9IGVsc2UgeyAvLyBBc3RyYWwgY29kZSBwb2ludDsgc3BsaXQgaW4gc3Vycm9nYXRlIGhhbHZlc1xuICAgICAgICAgICAgLy8gaHR0cDovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcbiAgICAgICAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICAgICAgICBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyAweEQ4MDBcbiAgICAgICAgICAgIGxvd1N1cnJvZ2F0ZSA9IChjb2RlUG9pbnQgJSAweDQwMCkgKyAweERDMDBcbiAgICAgICAgICAgIGNvZGVVbml0cy5wdXNoKGhpZ2hTdXJyb2dhdGUsIGxvd1N1cnJvZ2F0ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluZGV4ICsgMSA9PT0gbGVuZ3RoIHx8IGNvZGVVbml0cy5sZW5ndGggPiBNQVhfU0laRSkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlVW5pdHMpXG4gICAgICAgICAgICBjb2RlVW5pdHMubGVuZ3RoID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICB9XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3RyaW5nLCAnZnJvbUNvZGVQb2ludCcsIHtcbiAgICAgICAgICB2YWx1ZTogZnJvbUNvZGVQb2ludCxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFN0cmluZy5mcm9tQ29kZVBvaW50ID0gZnJvbUNvZGVQb2ludFxuICAgICAgfVxuICAgIH0oKSlcbiAgfVxufSkodHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gdGhpcy5zYXggPSB7fSA6IGV4cG9ydHMpXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdlbWl0dGVyJyk7XG5cbmZ1bmN0aW9uIFN0cmVhbSgpIHtcbiAgRW1pdHRlci5jYWxsKHRoaXMpO1xufVxuU3RyZWFtLnByb3RvdHlwZSA9IG5ldyBFbWl0dGVyKCk7XG5tb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuNC54XG5TdHJlYW0uU3RyZWFtID0gU3RyZWFtO1xuXG5TdHJlYW0ucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbihkZXN0LCBvcHRpb25zKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzO1xuXG4gIGZ1bmN0aW9uIG9uZGF0YShjaHVuaykge1xuICAgIGlmIChkZXN0LndyaXRhYmxlKSB7XG4gICAgICBpZiAoZmFsc2UgPT09IGRlc3Qud3JpdGUoY2h1bmspICYmIHNvdXJjZS5wYXVzZSkge1xuICAgICAgICBzb3VyY2UucGF1c2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2RhdGEnLCBvbmRhdGEpO1xuXG4gIGZ1bmN0aW9uIG9uZHJhaW4oKSB7XG4gICAgaWYgKHNvdXJjZS5yZWFkYWJsZSAmJiBzb3VyY2UucmVzdW1lKSB7XG4gICAgICBzb3VyY2UucmVzdW1lKCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdC5vbignZHJhaW4nLCBvbmRyYWluKTtcblxuICAvLyBJZiB0aGUgJ2VuZCcgb3B0aW9uIGlzIG5vdCBzdXBwbGllZCwgZGVzdC5lbmQoKSB3aWxsIGJlIGNhbGxlZCB3aGVuXG4gIC8vIHNvdXJjZSBnZXRzIHRoZSAnZW5kJyBvciAnY2xvc2UnIGV2ZW50cy4gIE9ubHkgZGVzdC5lbmQoKSBvbmNlLlxuICBpZiAoIWRlc3QuX2lzU3RkaW8gJiYgKCFvcHRpb25zIHx8IG9wdGlvbnMuZW5kICE9PSBmYWxzZSkpIHtcbiAgICBzb3VyY2Uub24oJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2Uub24oJ2Nsb3NlJywgb25jbG9zZSk7XG4gIH1cblxuICB2YXIgZGlkT25FbmQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gb25lbmQoKSB7XG4gICAgaWYgKGRpZE9uRW5kKSByZXR1cm47XG4gICAgZGlkT25FbmQgPSB0cnVlO1xuXG4gICAgZGVzdC5lbmQoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICBpZiAoZGlkT25FbmQpIHJldHVybjtcbiAgICBkaWRPbkVuZCA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIGRlc3QuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykgZGVzdC5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBkb24ndCBsZWF2ZSBkYW5nbGluZyBwaXBlcyB3aGVuIHRoZXJlIGFyZSBlcnJvcnMuXG4gIGZ1bmN0aW9uIG9uZXJyb3IoZXIpIHtcbiAgICBjbGVhbnVwKCk7XG4gICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycygnZXJyb3InKSkge1xuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCBzdHJlYW0gZXJyb3IgaW4gcGlwZS5cbiAgICB9XG4gIH1cblxuICBzb3VyY2Uub24oJ2Vycm9yJywgb25lcnJvcik7XG4gIGRlc3Qub24oJ2Vycm9yJywgb25lcnJvcik7XG5cbiAgLy8gcmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzIHRoYXQgd2VyZSBhZGRlZC5cbiAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBzb3VyY2Uub2ZmKCdkYXRhJywgb25kYXRhKTtcbiAgICBkZXN0Lm9mZignZHJhaW4nLCBvbmRyYWluKTtcblxuICAgIHNvdXJjZS5vZmYoJ2VuZCcsIG9uZW5kKTtcbiAgICBzb3VyY2Uub2ZmKCdjbG9zZScsIG9uY2xvc2UpO1xuXG4gICAgc291cmNlLm9mZignZXJyb3InLCBvbmVycm9yKTtcbiAgICBkZXN0Lm9mZignZXJyb3InLCBvbmVycm9yKTtcblxuICAgIHNvdXJjZS5vZmYoJ2VuZCcsIGNsZWFudXApO1xuICAgIHNvdXJjZS5vZmYoJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgICBkZXN0Lm9mZignZW5kJywgY2xlYW51cCk7XG4gICAgZGVzdC5vZmYoJ2Nsb3NlJywgY2xlYW51cCk7XG4gIH1cblxuICBzb3VyY2Uub24oJ2VuZCcsIGNsZWFudXApO1xuICBzb3VyY2Uub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5vbignZW5kJywgY2xlYW51cCk7XG4gIGRlc3Qub24oJ2Nsb3NlJywgY2xlYW51cCk7XG5cbiAgZGVzdC5lbWl0KCdwaXBlJywgc291cmNlKTtcblxuICAvLyBBbGxvdyBmb3IgdW5peC1saWtlIHVzYWdlOiBBLnBpcGUoQikucGlwZShDKVxuICByZXR1cm4gZGVzdDtcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8qPHJlcGxhY2VtZW50PiovXG5cbnZhciBCdWZmZXIgPSByZXF1aXJlKCdzYWZlLWJ1ZmZlcicpLkJ1ZmZlcjtcbi8qPC9yZXBsYWNlbWVudD4qL1xuXG52YXIgaXNFbmNvZGluZyA9IEJ1ZmZlci5pc0VuY29kaW5nIHx8IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBlbmNvZGluZyA9ICcnICsgZW5jb2Rpbmc7XG4gIHN3aXRjaCAoZW5jb2RpbmcgJiYgZW5jb2RpbmcudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6Y2FzZSAndXRmOCc6Y2FzZSAndXRmLTgnOmNhc2UgJ2FzY2lpJzpjYXNlICdiaW5hcnknOmNhc2UgJ2Jhc2U2NCc6Y2FzZSAndWNzMic6Y2FzZSAndWNzLTInOmNhc2UgJ3V0ZjE2bGUnOmNhc2UgJ3V0Zi0xNmxlJzpjYXNlICdyYXcnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX25vcm1hbGl6ZUVuY29kaW5nKGVuYykge1xuICBpZiAoIWVuYykgcmV0dXJuICd1dGY4JztcbiAgdmFyIHJldHJpZWQ7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmMpIHtcbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gJ3V0ZjgnO1xuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuICd1dGYxNmxlJztcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gJ2xhdGluMSc7XG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGVuYztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChyZXRyaWVkKSByZXR1cm47IC8vIHVuZGVmaW5lZFxuICAgICAgICBlbmMgPSAoJycgKyBlbmMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHJpZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuLy8gRG8gbm90IGNhY2hlIGBCdWZmZXIuaXNFbmNvZGluZ2Agd2hlbiBjaGVja2luZyBlbmNvZGluZyBuYW1lcyBhcyBzb21lXG4vLyBtb2R1bGVzIG1vbmtleS1wYXRjaCBpdCB0byBzdXBwb3J0IGFkZGl0aW9uYWwgZW5jb2RpbmdzXG5mdW5jdGlvbiBub3JtYWxpemVFbmNvZGluZyhlbmMpIHtcbiAgdmFyIG5lbmMgPSBfbm9ybWFsaXplRW5jb2RpbmcoZW5jKTtcbiAgaWYgKHR5cGVvZiBuZW5jICE9PSAnc3RyaW5nJyAmJiAoQnVmZmVyLmlzRW5jb2RpbmcgPT09IGlzRW5jb2RpbmcgfHwgIWlzRW5jb2RpbmcoZW5jKSkpIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuYyk7XG4gIHJldHVybiBuZW5jIHx8IGVuYztcbn1cblxuLy8gU3RyaW5nRGVjb2RlciBwcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIGVmZmljaWVudGx5IHNwbGl0dGluZyBhIHNlcmllcyBvZlxuLy8gYnVmZmVycyBpbnRvIGEgc2VyaWVzIG9mIEpTIHN0cmluZ3Mgd2l0aG91dCBicmVha2luZyBhcGFydCBtdWx0aS1ieXRlXG4vLyBjaGFyYWN0ZXJzLlxuZXhwb3J0cy5TdHJpbmdEZWNvZGVyID0gU3RyaW5nRGVjb2RlcjtcbmZ1bmN0aW9uIFN0cmluZ0RlY29kZXIoZW5jb2RpbmcpIHtcbiAgdGhpcy5lbmNvZGluZyA9IG5vcm1hbGl6ZUVuY29kaW5nKGVuY29kaW5nKTtcbiAgdmFyIG5iO1xuICBzd2l0Y2ggKHRoaXMuZW5jb2RpbmcpIHtcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIHRoaXMudGV4dCA9IHV0ZjE2VGV4dDtcbiAgICAgIHRoaXMuZW5kID0gdXRmMTZFbmQ7XG4gICAgICBuYiA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICAgIHRoaXMuZmlsbExhc3QgPSB1dGY4RmlsbExhc3Q7XG4gICAgICBuYiA9IDQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgdGhpcy50ZXh0ID0gYmFzZTY0VGV4dDtcbiAgICAgIHRoaXMuZW5kID0gYmFzZTY0RW5kO1xuICAgICAgbmIgPSAzO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRoaXMud3JpdGUgPSBzaW1wbGVXcml0ZTtcbiAgICAgIHRoaXMuZW5kID0gc2ltcGxlRW5kO1xuICAgICAgcmV0dXJuO1xuICB9XG4gIHRoaXMubGFzdE5lZWQgPSAwO1xuICB0aGlzLmxhc3RUb3RhbCA9IDA7XG4gIHRoaXMubGFzdENoYXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobmIpO1xufVxuXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChidWYpIHtcbiAgaWYgKGJ1Zi5sZW5ndGggPT09IDApIHJldHVybiAnJztcbiAgdmFyIHI7XG4gIHZhciBpO1xuICBpZiAodGhpcy5sYXN0TmVlZCkge1xuICAgIHIgPSB0aGlzLmZpbGxMYXN0KGJ1Zik7XG4gICAgaWYgKHIgPT09IHVuZGVmaW5lZCkgcmV0dXJuICcnO1xuICAgIGkgPSB0aGlzLmxhc3ROZWVkO1xuICAgIHRoaXMubGFzdE5lZWQgPSAwO1xuICB9IGVsc2Uge1xuICAgIGkgPSAwO1xuICB9XG4gIGlmIChpIDwgYnVmLmxlbmd0aCkgcmV0dXJuIHIgPyByICsgdGhpcy50ZXh0KGJ1ZiwgaSkgOiB0aGlzLnRleHQoYnVmLCBpKTtcbiAgcmV0dXJuIHIgfHwgJyc7XG59O1xuXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS5lbmQgPSB1dGY4RW5kO1xuXG4vLyBSZXR1cm5zIG9ubHkgY29tcGxldGUgY2hhcmFjdGVycyBpbiBhIEJ1ZmZlclxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUudGV4dCA9IHV0ZjhUZXh0O1xuXG4vLyBBdHRlbXB0cyB0byBjb21wbGV0ZSBhIHBhcnRpYWwgbm9uLVVURi04IGNoYXJhY3RlciB1c2luZyBieXRlcyBmcm9tIGEgQnVmZmVyXG5TdHJpbmdEZWNvZGVyLnByb3RvdHlwZS5maWxsTGFzdCA9IGZ1bmN0aW9uIChidWYpIHtcbiAgaWYgKHRoaXMubGFzdE5lZWQgPD0gYnVmLmxlbmd0aCkge1xuICAgIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZCwgMCwgdGhpcy5sYXN0TmVlZCk7XG4gICAgcmV0dXJuIHRoaXMubGFzdENoYXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywgMCwgdGhpcy5sYXN0VG90YWwpO1xuICB9XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZCwgMCwgYnVmLmxlbmd0aCk7XG4gIHRoaXMubGFzdE5lZWQgLT0gYnVmLmxlbmd0aDtcbn07XG5cbi8vIENoZWNrcyB0aGUgdHlwZSBvZiBhIFVURi04IGJ5dGUsIHdoZXRoZXIgaXQncyBBU0NJSSwgYSBsZWFkaW5nIGJ5dGUsIG9yIGFcbi8vIGNvbnRpbnVhdGlvbiBieXRlLiBJZiBhbiBpbnZhbGlkIGJ5dGUgaXMgZGV0ZWN0ZWQsIC0yIGlzIHJldHVybmVkLlxuZnVuY3Rpb24gdXRmOENoZWNrQnl0ZShieXRlKSB7XG4gIGlmIChieXRlIDw9IDB4N0YpIHJldHVybiAwO2Vsc2UgaWYgKGJ5dGUgPj4gNSA9PT0gMHgwNikgcmV0dXJuIDI7ZWxzZSBpZiAoYnl0ZSA+PiA0ID09PSAweDBFKSByZXR1cm4gMztlbHNlIGlmIChieXRlID4+IDMgPT09IDB4MUUpIHJldHVybiA0O1xuICByZXR1cm4gYnl0ZSA+PiA2ID09PSAweDAyID8gLTEgOiAtMjtcbn1cblxuLy8gQ2hlY2tzIGF0IG1vc3QgMyBieXRlcyBhdCB0aGUgZW5kIG9mIGEgQnVmZmVyIGluIG9yZGVyIHRvIGRldGVjdCBhblxuLy8gaW5jb21wbGV0ZSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3Rlci4gVGhlIHRvdGFsIG51bWJlciBvZiBieXRlcyAoMiwgMywgb3IgNClcbi8vIG5lZWRlZCB0byBjb21wbGV0ZSB0aGUgVVRGLTggY2hhcmFjdGVyIChpZiBhcHBsaWNhYmxlKSBhcmUgcmV0dXJuZWQuXG5mdW5jdGlvbiB1dGY4Q2hlY2tJbmNvbXBsZXRlKHNlbGYsIGJ1ZiwgaSkge1xuICB2YXIgaiA9IGJ1Zi5sZW5ndGggLSAxO1xuICBpZiAoaiA8IGkpIHJldHVybiAwO1xuICB2YXIgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkgc2VsZi5sYXN0TmVlZCA9IG5iIC0gMTtcbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgaWYgKC0taiA8IGkgfHwgbmIgPT09IC0yKSByZXR1cm4gMDtcbiAgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkgc2VsZi5sYXN0TmVlZCA9IG5iIC0gMjtcbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgaWYgKC0taiA8IGkgfHwgbmIgPT09IC0yKSByZXR1cm4gMDtcbiAgbmIgPSB1dGY4Q2hlY2tCeXRlKGJ1ZltqXSk7XG4gIGlmIChuYiA+PSAwKSB7XG4gICAgaWYgKG5iID4gMCkge1xuICAgICAgaWYgKG5iID09PSAyKSBuYiA9IDA7ZWxzZSBzZWxmLmxhc3ROZWVkID0gbmIgLSAzO1xuICAgIH1cbiAgICByZXR1cm4gbmI7XG4gIH1cbiAgcmV0dXJuIDA7XG59XG5cbi8vIFZhbGlkYXRlcyBhcyBtYW55IGNvbnRpbnVhdGlvbiBieXRlcyBmb3IgYSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3RlciBhc1xuLy8gbmVlZGVkIG9yIGFyZSBhdmFpbGFibGUuIElmIHdlIHNlZSBhIG5vbi1jb250aW51YXRpb24gYnl0ZSB3aGVyZSB3ZSBleHBlY3Rcbi8vIG9uZSwgd2UgXCJyZXBsYWNlXCIgdGhlIHZhbGlkYXRlZCBjb250aW51YXRpb24gYnl0ZXMgd2UndmUgc2VlbiBzbyBmYXIgd2l0aFxuLy8gYSBzaW5nbGUgVVRGLTggcmVwbGFjZW1lbnQgY2hhcmFjdGVyICgnXFx1ZmZmZCcpLCB0byBtYXRjaCB2OCdzIFVURi04IGRlY29kaW5nXG4vLyBiZWhhdmlvci4gVGhlIGNvbnRpbnVhdGlvbiBieXRlIGNoZWNrIGlzIGluY2x1ZGVkIHRocmVlIHRpbWVzIGluIHRoZSBjYXNlXG4vLyB3aGVyZSBhbGwgb2YgdGhlIGNvbnRpbnVhdGlvbiBieXRlcyBmb3IgYSBjaGFyYWN0ZXIgZXhpc3QgaW4gdGhlIHNhbWUgYnVmZmVyLlxuLy8gSXQgaXMgYWxzbyBkb25lIHRoaXMgd2F5IGFzIGEgc2xpZ2h0IHBlcmZvcm1hbmNlIGluY3JlYXNlIGluc3RlYWQgb2YgdXNpbmcgYVxuLy8gbG9vcC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0V4dHJhQnl0ZXMoc2VsZiwgYnVmLCBwKSB7XG4gIGlmICgoYnVmWzBdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICBzZWxmLmxhc3ROZWVkID0gMDtcbiAgICByZXR1cm4gJ1xcdWZmZmQnO1xuICB9XG4gIGlmIChzZWxmLmxhc3ROZWVkID4gMSAmJiBidWYubGVuZ3RoID4gMSkge1xuICAgIGlmICgoYnVmWzFdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgIHNlbGYubGFzdE5lZWQgPSAxO1xuICAgICAgcmV0dXJuICdcXHVmZmZkJztcbiAgICB9XG4gICAgaWYgKHNlbGYubGFzdE5lZWQgPiAyICYmIGJ1Zi5sZW5ndGggPiAyKSB7XG4gICAgICBpZiAoKGJ1ZlsyXSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICAgIHNlbGYubGFzdE5lZWQgPSAyO1xuICAgICAgICByZXR1cm4gJ1xcdWZmZmQnO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBBdHRlbXB0cyB0byBjb21wbGV0ZSBhIG11bHRpLWJ5dGUgVVRGLTggY2hhcmFjdGVyIHVzaW5nIGJ5dGVzIGZyb20gYSBCdWZmZXIuXG5mdW5jdGlvbiB1dGY4RmlsbExhc3QoYnVmKSB7XG4gIHZhciBwID0gdGhpcy5sYXN0VG90YWwgLSB0aGlzLmxhc3ROZWVkO1xuICB2YXIgciA9IHV0ZjhDaGVja0V4dHJhQnl0ZXModGhpcywgYnVmLCBwKTtcbiAgaWYgKHIgIT09IHVuZGVmaW5lZCkgcmV0dXJuIHI7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCBwLCAwLCB0aGlzLmxhc3ROZWVkKTtcbiAgICByZXR1cm4gdGhpcy5sYXN0Q2hhci50b1N0cmluZyh0aGlzLmVuY29kaW5nLCAwLCB0aGlzLmxhc3RUb3RhbCk7XG4gIH1cbiAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgcCwgMCwgYnVmLmxlbmd0aCk7XG4gIHRoaXMubGFzdE5lZWQgLT0gYnVmLmxlbmd0aDtcbn1cblxuLy8gUmV0dXJucyBhbGwgY29tcGxldGUgVVRGLTggY2hhcmFjdGVycyBpbiBhIEJ1ZmZlci4gSWYgdGhlIEJ1ZmZlciBlbmRlZCBvbiBhXG4vLyBwYXJ0aWFsIGNoYXJhY3RlciwgdGhlIGNoYXJhY3RlcidzIGJ5dGVzIGFyZSBidWZmZXJlZCB1bnRpbCB0aGUgcmVxdWlyZWRcbi8vIG51bWJlciBvZiBieXRlcyBhcmUgYXZhaWxhYmxlLlxuZnVuY3Rpb24gdXRmOFRleHQoYnVmLCBpKSB7XG4gIHZhciB0b3RhbCA9IHV0ZjhDaGVja0luY29tcGxldGUodGhpcywgYnVmLCBpKTtcbiAgaWYgKCF0aGlzLmxhc3ROZWVkKSByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGY4JywgaSk7XG4gIHRoaXMubGFzdFRvdGFsID0gdG90YWw7XG4gIHZhciBlbmQgPSBidWYubGVuZ3RoIC0gKHRvdGFsIC0gdGhpcy5sYXN0TmVlZCk7XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIDAsIGVuZCk7XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjgnLCBpLCBlbmQpO1xufVxuXG4vLyBGb3IgVVRGLTgsIGEgcmVwbGFjZW1lbnQgY2hhcmFjdGVyIGlzIGFkZGVkIHdoZW4gZW5kaW5nIG9uIGEgcGFydGlhbFxuLy8gY2hhcmFjdGVyLlxuZnVuY3Rpb24gdXRmOEVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkgcmV0dXJuIHIgKyAnXFx1ZmZmZCc7XG4gIHJldHVybiByO1xufVxuXG4vLyBVVEYtMTZMRSB0eXBpY2FsbHkgbmVlZHMgdHdvIGJ5dGVzIHBlciBjaGFyYWN0ZXIsIGJ1dCBldmVuIGlmIHdlIGhhdmUgYW4gZXZlblxuLy8gbnVtYmVyIG9mIGJ5dGVzIGF2YWlsYWJsZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBlbmQgb24gYSBsZWFkaW5nL2hpZ2hcbi8vIHN1cnJvZ2F0ZS4gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBuZXh0IHR3byBieXRlcyBpbiBvcmRlciB0b1xuLy8gZGVjb2RlIHRoZSBsYXN0IGNoYXJhY3RlciBwcm9wZXJseS5cbmZ1bmN0aW9uIHV0ZjE2VGV4dChidWYsIGkpIHtcbiAgaWYgKChidWYubGVuZ3RoIC0gaSkgJSAyID09PSAwKSB7XG4gICAgdmFyIHIgPSBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpKTtcbiAgICBpZiAocikge1xuICAgICAgdmFyIGMgPSByLmNoYXJDb2RlQXQoci5sZW5ndGggLSAxKTtcbiAgICAgIGlmIChjID49IDB4RDgwMCAmJiBjIDw9IDB4REJGRikge1xuICAgICAgICB0aGlzLmxhc3ROZWVkID0gMjtcbiAgICAgICAgdGhpcy5sYXN0VG90YWwgPSA0O1xuICAgICAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAyXTtcbiAgICAgICAgdGhpcy5sYXN0Q2hhclsxXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gICAgICAgIHJldHVybiByLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHI7XG4gIH1cbiAgdGhpcy5sYXN0TmVlZCA9IDE7XG4gIHRoaXMubGFzdFRvdGFsID0gMjtcbiAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMV07XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ3V0ZjE2bGUnLCBpLCBidWYubGVuZ3RoIC0gMSk7XG59XG5cbi8vIEZvciBVVEYtMTZMRSB3ZSBkbyBub3QgZXhwbGljaXRseSBhcHBlbmQgc3BlY2lhbCByZXBsYWNlbWVudCBjaGFyYWN0ZXJzIGlmIHdlXG4vLyBlbmQgb24gYSBwYXJ0aWFsIGNoYXJhY3Rlciwgd2Ugc2ltcGx5IGxldCB2OCBoYW5kbGUgdGhhdC5cbmZ1bmN0aW9uIHV0ZjE2RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSB7XG4gICAgdmFyIGVuZCA9IHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZDtcbiAgICByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ3V0ZjE2bGUnLCAwLCBlbmQpO1xuICB9XG4gIHJldHVybiByO1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUZXh0KGJ1ZiwgaSkge1xuICB2YXIgbiA9IChidWYubGVuZ3RoIC0gaSkgJSAzO1xuICBpZiAobiA9PT0gMCkgcmV0dXJuIGJ1Zi50b1N0cmluZygnYmFzZTY0JywgaSk7XG4gIHRoaXMubGFzdE5lZWQgPSAzIC0gbjtcbiAgdGhpcy5sYXN0VG90YWwgPSAzO1xuICBpZiAobiA9PT0gMSkge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9IGVsc2Uge1xuICAgIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDJdO1xuICAgIHRoaXMubGFzdENoYXJbMV0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICB9XG4gIHJldHVybiBidWYudG9TdHJpbmcoJ2Jhc2U2NCcsIGksIGJ1Zi5sZW5ndGggLSBuKTtcbn1cblxuZnVuY3Rpb24gYmFzZTY0RW5kKGJ1Zikge1xuICB2YXIgciA9IGJ1ZiAmJiBidWYubGVuZ3RoID8gdGhpcy53cml0ZShidWYpIDogJyc7XG4gIGlmICh0aGlzLmxhc3ROZWVkKSByZXR1cm4gciArIHRoaXMubGFzdENoYXIudG9TdHJpbmcoJ2Jhc2U2NCcsIDAsIDMgLSB0aGlzLmxhc3ROZWVkKTtcbiAgcmV0dXJuIHI7XG59XG5cbi8vIFBhc3MgYnl0ZXMgb24gdGhyb3VnaCBmb3Igc2luZ2xlLWJ5dGUgZW5jb2RpbmdzIChlLmcuIGFzY2lpLCBsYXRpbjEsIGhleClcbmZ1bmN0aW9uIHNpbXBsZVdyaXRlKGJ1Zikge1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcpO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVFbmQoYnVmKSB7XG4gIHJldHVybiBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xufSIsIlxuZXhwb3J0cy5ldmVyeSA9IGZ1bmN0aW9uKHN0cikge1xuICByZXR1cm4gbmV3IEV2ZXJ5KHN0cik7XG59O1xuXG4vKlxuICBUaW1lIG1hcFxuKi9cblxudmFyIHRpbWUgPSB7XG4gIG1pbGxpc2Vjb25kOiAxLFxuICBzZWNvbmQ6IDEwMDAsXG4gIG1pbnV0ZTogNjAwMDAsXG4gIGhvdXI6IDM2MDAwMDAsXG4gIGRheTogODY0MDAwMDBcbn07XG5cbmZvciAodmFyIGtleSBpbiB0aW1lKSB7XG4gIGlmIChrZXkgPT09ICdtaWxsaXNlY29uZCcpIHtcbiAgICB0aW1lLm1zID0gdGltZVtrZXldO1xuICB9IGVsc2Uge1xuICAgIHRpbWVba2V5LmNoYXJBdCgwKV0gPSB0aW1lW2tleV07XG4gIH1cbiAgdGltZVtrZXkgKyAncyddID0gdGltZVtrZXldO1xufVxuXG5cbi8qXG4gIEV2ZXJ5IGNvbnN0cnVjdG9yXG4qL1xuXG5mdW5jdGlvbiBFdmVyeShzdHIpIHtcbiAgdGhpcy5jb3VudCA9IDA7XG4gIHZhciBtID0gcGFyc2Uoc3RyKTtcbiAgaWYgKG0pIHtcbiAgICB0aGlzLnRpbWUgPSBOdW1iZXIobVswXSkgKiB0aW1lW21bMV1dO1xuICAgIHRoaXMudHlwZSA9IG1bMV07XG4gIH1cbn1cblxuRXZlcnkucHJvdG90eXBlLmRvID0gZnVuY3Rpb24oY2IpIHtcbiAgaWYgKHRoaXMudGltZSkge1xuICAgIHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjYWxsYmFjaywgdGhpcy50aW1lKTtcbiAgfVxuXG4gIHZhciB0aGF0ID0gdGhpcztcbiAgZnVuY3Rpb24gY2FsbGJhY2soKSB7XG4gICAgdGhhdC5jb3VudCsrO1xuICAgIGNiLmNhbGwodGhhdCk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVyeS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgZGVsZXRlIHRoaXMuaW50ZXJ2YWw7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qXG4gIENvbnZlcnQgc3RyaW5nIHRvIG1pbGxpc2Vjb25kc1xuXG4gICAgbXMsIG1pbGxpc2Vjb25kKHMpP1xuICAgIHMsIHNlY29uZChzKT9cbiAgICBtLCBtaW51dGUocyk/XG4gICAgaCwgaG91cihzKT9cbiAgICBkLCBkYXkocyk/XG4qL1xudmFyIHJlZyA9IC9eXFxzKihcXGQrKD86XFwuXFxkKyk/KVxccyooW2Etel0rKVxccyokLztcblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHZhciBtID0gc3RyLm1hdGNoKHJlZyk7XG4gIGlmIChtICYmIHRpbWVbbVsyXV0pIHtcbiAgICByZXR1cm4gbS5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbiIsImludGVyZmFjZSBVbml0TnVtYmVycyB7XG4gICAgc3BlYXI6IG51bWJlclxuICAgIHN3b3JkOiBudW1iZXJcbiAgICBheGU6IG51bWJlclxuICAgIHNweTogbnVtYmVyXG4gICAgbGlnaHQ6IG51bWJlclxuICAgIGhlYXZ5OiBudW1iZXIsXG4gICAgYXJjaGVyOiBudW1iZXIsXG4gICAgbW91bnRlZEFyY2hlcjogbnVtYmVyLFxuICAgIHJhbTogbnVtYmVyLFxuICAgIGNhdDogbnVtYmVyLFxuICAgIGtuaWdodDogbnVtYmVyLFxuICAgIHNub2I6IG51bWJlcjtcbiAgICBtaWxpdGlhOiBudW1iZXI7XG59XG5cbmNsYXNzIEFybXkgaW1wbGVtZW50cyBVbml0TnVtYmVycyB7XG4gICAgc3BlYXI6IG51bWJlclxuICAgIHN3b3JkOiBudW1iZXJcbiAgICBheGU6IG51bWJlclxuICAgIHNweTogbnVtYmVyXG4gICAgbGlnaHQ6IG51bWJlclxuICAgIGhlYXZ5OiBudW1iZXJcbiAgICBhcmNoZXI6IG51bWJlclxuICAgIG1vdW50ZWRBcmNoZXI6IG51bWJlclxuICAgIHJhbTogbnVtYmVyXG4gICAgY2F0OiBudW1iZXI7XG4gICAga25pZ2h0OiBudW1iZXI7XG4gICAgc25vYjogbnVtYmVyO1xuICAgIG1pbGl0aWE6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgc3BlYXIgPSAwLFxuICAgICAgICAgICAgICAgICAgICBzd29yZCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGF4ZSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHNweSA9IDAsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgaGVhdnkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBhcmNoZXIgPSAwLFxuICAgICAgICAgICAgICAgICAgICBtb3VudGVkQXJjaGVyID0gMCxcbiAgICAgICAgICAgICAgICAgICAgcmFtID0gMCxcbiAgICAgICAgICAgICAgICAgICAgY2F0ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgcGFsYWRpbiA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHNub2IgPSAwLFxuICAgICAgICAgICAgICAgICAgICBtaWxpdGlhID0gMFxuICAgICAgICAgICAgICAgIH0pIHtcbiAgICAgICAgdGhpcy5zcGVhciA9IHNwZWFyO1xuICAgICAgICB0aGlzLnN3b3JkID0gc3dvcmQ7XG4gICAgICAgIHRoaXMuYXhlID0gYXhlO1xuICAgICAgICB0aGlzLnNweSA9IHNweTtcbiAgICAgICAgdGhpcy5saWdodCA9IGxpZ2h0O1xuICAgICAgICB0aGlzLmhlYXZ5ID0gaGVhdnk7XG4gICAgICAgIHRoaXMuYXJjaGVyID0gYXJjaGVyO1xuICAgICAgICB0aGlzLm1vdW50ZWRBcmNoZXIgPSBtb3VudGVkQXJjaGVyO1xuICAgICAgICB0aGlzLnJhbSA9IHJhbTtcbiAgICAgICAgdGhpcy5jYXQgPSBjYXQ7XG4gICAgICAgIHRoaXMua25pZ2h0ID0gcGFsYWRpbjtcbiAgICAgICAgdGhpcy5zbm9iID0gc25vYjtcbiAgICAgICAgdGhpcy5taWxpdGlhID0gbWlsaXRpYTtcbiAgICB9XG5cbiAgICB1bml0cyh1bml0TmFtZTogVW5pdFR5cGVzKTogbnVtYmVyIHtcbiAgICAgICAgLy9pcyB0aGlzIG9rPyBvciBzd2l0Y2g/XG4gICAgICAgIHJldHVybiB0aGlzW3VuaXROYW1lXTtcbiAgICB9XG5cbiAgICBzZXRVbml0cyh1bml0TmFtZTogVW5pdFR5cGVzLCBjb3VudDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXNbdW5pdE5hbWVdID0gY291bnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGVtcHR5KCk6IEFybXkge1xuICAgICAgICByZXR1cm4gbmV3IEFybXkoe30pO1xuICAgIH1cbn1cblxuaW50ZXJmYWNlIFJlc291cmNlc0RhdGEge1xuICAgIHdvb2Q6IG51bWJlcjtcbiAgICBzdG9uZTogbnVtYmVyO1xuICAgIGlyb246IG51bWJlcjtcbn1cblxuY2xhc3MgUmVzb3VyY2VzIGltcGxlbWVudHMgUmVzb3VyY2VzRGF0YSB7XG4gICAgd29vZDogbnVtYmVyO1xuICAgIHN0b25lOiBudW1iZXI7XG4gICAgaXJvbjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3Ioe3dvb2QgPSAwLCBzdG9uZSA9IDAsIGlyb24gPSAwfTogUmVzb3VyY2VzRGF0YSkge1xuICAgICAgICB0aGlzLndvb2QgPSB3b29kO1xuICAgICAgICB0aGlzLnN0b25lID0gc3RvbmU7XG4gICAgICAgIHRoaXMuaXJvbiA9IGlyb247XG4gICAgfVxuXG4gICAgYWRkKHJlc291cmNlPzogUmVzb3VyY2VzRGF0YSwgdGltZXM6IG51bWJlciA9IDEpOiBSZXNvdXJjZXMge1xuICAgICAgICBpZiAocmVzb3VyY2UgPT09IHVuZGVmaW5lZCB8fCByZXNvdXJjZSA9PT0gbnVsbCkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMud29vZCArPSByZXNvdXJjZS53b29kICogdGltZXM7XG4gICAgICAgIHRoaXMuc3RvbmUgKz0gcmVzb3VyY2Uuc3RvbmUgKiB0aW1lcztcbiAgICAgICAgdGhpcy5pcm9uICs9IHJlc291cmNlLmlyb24gKiB0aW1lcztcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdGF0aWMgemVybygpOiBSZXNvdXJjZXMge1xuICAgICAgICByZXR1cm4gbmV3IFJlc291cmNlcyh7d29vZDogMCwgc3RvbmU6IDAsIGlyb246IDB9KVxuICAgIH1cbn1cblxuZW51bSBCdWlsZGluZ1R5cGUge1xuICAgIE1BSU4gPSBcIm1haW5cIixcbiAgICBCQVJSQUNLUyA9IFwiYmFycmFja3NcIixcbiAgICBTVEFCTEUgPSBcInN0YWJsZVwiLFxuICAgIFNJRUdFX0ZBQ1RPUlkgPSBcImdhcmFnZVwiLFxuICAgIFNOT0IgPSBcInNub2JcIixcbiAgICBTTUlUSCA9IFwic21pdGhcIixcbiAgICBQTEFDRSA9IFwicGxhY2VcIixcbiAgICBTVEFUVUUgPSBcInN0YXR1ZVwiLFxuICAgIE1BUktFVCA9IFwibWFya2V0XCIsXG4gICAgV09PRF9DVVRURVIgPSBcIndvb2RcIixcbiAgICBDTEFZX1BJVCA9IFwic3RvbmVcIixcbiAgICBJUk9OX01JTkUgPSBcImlyb25cIixcbiAgICBGQVJNID0gXCJmYXJtXCIsXG4gICAgU1RPUkFHRSA9IFwic3RvcmFnZVwiLFxuICAgIEhJREUgPSBcImhpZGVcIixcbiAgICBXQUxMID0gXCJ3YWxsXCJcbn1cblxuZW51bSBVbml0VHlwZXMge1xuICAgIFNQRUFSID0gXCJzcGVhclwiLFxuICAgIFNXT1JEID0gXCJzd29yZFwiLFxuICAgIEFYRSA9IFwiYXhlXCIsXG4gICAgU1BZID0gXCJzcHlcIixcbiAgICBMSUdIVCA9IFwibGlnaHRcIixcbiAgICBIRUFWWSA9IFwiaGVhdnlcIixcbiAgICBBUkNIRVIgPSBcImFyY2hlclwiLFxuICAgIE1PVU5URURfQVJDSEVSID0gXCJtYXJjaGVyXCIsXG4gICAgUkFNID0gXCJyYW1cIixcbiAgICBDQVRBUFVMVCA9IFwiY2F0YXB1bHRcIixcbiAgICBQQUxBRElOID0gXCJrbmlnaHRcIixcbiAgICBTTk9CID0gXCJzbm9iXCIsXG4gICAgTUlMSVRJQSA9IFwibWlsaXRpYVwiXG59XG5cbmV4cG9ydCB7XG4gICAgUmVzb3VyY2VzLFxuICAgIFJlc291cmNlc0RhdGEsXG4gICAgQnVpbGRpbmdUeXBlLFxuICAgIFVuaXRUeXBlcyxcbiAgICBBcm15XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdlbmVyaWNMb2NhbFF1ZXJ5PFQ+KGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6ICgpID0+IFQpOiBTdG9yYWdlUXVlcnk8VD4ge1xuICAgIHJldHVybiBuZXcgU3RvcmFnZVF1ZXJ5PFQ+KGtleSwgZGVmYXVsdFZhbHVlLCBsb2NhbFN0b3JhZ2UpXG59XG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJpY0NhY2hlZExvY2FsUXVlcnk8VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogKCkgPT4gVCk6IENhY2hlZFN0b3JhZ2VRdWVyeTxUPiB7XG4gICAgcmV0dXJuIG5ldyBDYWNoZWRTdG9yYWdlUXVlcnk8VD4oZ2VuZXJpY0xvY2FsUXVlcnk8VD4oa2V5LCBkZWZhdWx0VmFsdWUpKTtcbn1cblxuLyoqXG4gKiBTdG9yYWdlIElPIG9wZXJhdGlvbnMgaW4gSlNPTiBmb3JtYXQuXG4gKi9cbmNsYXNzIFN0b3JhZ2VRdWVyeTxUPiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBrZXk6IHN0cmluZ1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdFZhbHVlU3VwcGxpZXI6ICgpID0+IFQ7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzdG9yYWdlOiBTdG9yYWdlO1xuXG4gICAgY29uc3RydWN0b3Ioa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZVN1cHBsaWVyOiAoKSA9PiBULCBzdG9yYWdlOiBTdG9yYWdlKSB7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlU3VwcGxpZXIgPSBkZWZhdWx0VmFsdWVTdXBwbGllcjtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgICB9XG5cbiAgICBnZXQoKTogVCB7XG4gICAgICAgIGNvbnN0IHN0b3JlZFZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0odGhpcy5rZXkpO1xuICAgICAgICBpZiAoc3RvcmVkVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZGVmYXVsdFZhbHVlU3VwcGxpZXIoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0KGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdG9yZWRWYWx1ZSk7XG4gICAgfVxuICAgIHNldCh2YWx1ZTogVCkge1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKVxuICAgIH1cbiAgICBzZXRDYWxsYmFjayhzdG9yZUNhbGxiYWNrOiAodmFsdWU6IFQpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkVmFsID0gdGhpcy5nZXQoKVxuICAgICAgICBzdG9yZUNhbGxiYWNrKHN0b3JlZFZhbClcbiAgICAgICAgdGhpcy5zZXQoc3RvcmVkVmFsKVxuICAgIH1cbiAgICBleGlzdCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKHRoaXMua2V5KSAhPSBudWxsXG4gICAgfVxuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5rZXkpO1xuICAgIH1cbn1cblxuY2xhc3MgQ2FjaGVkU3RvcmFnZVF1ZXJ5PFQ+IHtcbiAgICB2YWx1ZTogVDtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHF1ZXJ5OiBTdG9yYWdlUXVlcnk8VD47XG5cbiAgICBjb25zdHJ1Y3RvcihxdWVyeTogU3RvcmFnZVF1ZXJ5PFQ+KSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHF1ZXJ5LmdldCgpO1xuICAgIH1cblxuICAgIHN0b3JlKHN0b3JlQ2FsbGJhY2s6ICh2YWx1ZTogVCkgPT4gdm9pZCA9ICh2YWx1ZTogVCkgPT4ge30pIHtcbiAgICAgICAgc3RvcmVDYWxsYmFjayh0aGlzLnZhbHVlKVxuICAgICAgICB0aGlzLnF1ZXJ5LnNldCh0aGlzLnZhbHVlKVxuICAgIH1cbiAgICByZW1vdmUoKSB7XG4gICAgICAgIHRoaXMucXVlcnkucmVtb3ZlKCk7XG4gICAgfVxuICAgIGZvcmNlUmVmcmVzaCgpOiBUIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucXVlcnkuZ2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH1cbn0iLCJpbXBvcnQge0FybXksIEJ1aWxkaW5nVHlwZSwgUmVzb3VyY2VzLCBVbml0VHlwZXN9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyBCdWlsZGluZ0NvbmZpZ0RhdGEsIGZldGNoV29ybGRDb25maWdEYXRhLCBOaWdodEJvbnVzQ29uZmlnRGF0YSwgV29ybGRDb25maWdEYXRhIH0gZnJvbSBcIi4vd29ybGQtY29uZmlnXCI7XG5pbXBvcnQge2dlbmVyaWNDYWNoZWRMb2NhbFF1ZXJ5fSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmRlY2xhcmUgdmFyIGdhbWVfZGF0YTogYW55O1xuXG5jbGFzcyBVbml0c0NvbmZpZyB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25maWcgPSBuZXcgTWFwPFVuaXRUeXBlcywgVW5pdENvbmZpZz4oKVxuICAgIHJlYWRvbmx5IGluR2FtZVVuaXRzID0gQXJyYXk8VW5pdFR5cGVzPigpO1xuXG4gICAgY29uc3RydWN0b3IodW5pdHM6IE1hcDxVbml0VHlwZXMsIFVuaXRDb25maWc+KSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gdW5pdHM7XG4gICAgICAgIHRoaXMuaW5HYW1lVW5pdHMgPSBPYmplY3QudmFsdWVzKFVuaXRUeXBlcykuZmlsdGVyKHVuaXROYW1lID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1bml0cy5nZXQodW5pdE5hbWUpLmluR2FtZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHVuaXQobmFtZTogVW5pdFR5cGVzKTogVW5pdENvbmZpZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXQobmFtZSlcbiAgICB9XG5cbiAgICBhcm15Q29zdChhcm15OiBBcm15KTogUmVzb3VyY2VzIHtcbiAgICAgICAgY29uc3QgcmVzb3VyY2VzID0gUmVzb3VyY2VzLnplcm8oKTtcbiAgICAgICAgdGhpcy5pbkdhbWVVbml0cy5mb3JFYWNoKHVuaXROYW1lID0+IHtcbiAgICAgICAgICAgIGxldCB1bml0Q2ZnID0gVW5pdHNDb25maWcudW5pdHNDb25maWcuZ2V0KHVuaXROYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHVuaXRDb3VudCA9IGFybXkudW5pdHModW5pdE5hbWUpO1xuICAgICAgICAgICAgcmVzb3VyY2VzLndvb2QgKz0gdW5pdENvdW50ICogdW5pdENmZy5yZWNydWl0Lndvb2Q7XG4gICAgICAgICAgICByZXNvdXJjZXMuc3RvbmUgKz0gdW5pdENvdW50ICogdW5pdENmZy5yZWNydWl0LnN0b25lO1xuICAgICAgICAgICAgcmVzb3VyY2VzLmlyb24gKz0gdW5pdENvdW50ICogdW5pdENmZy5yZWNydWl0Lmlyb247XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHJlc291cmNlcztcbiAgICB9XG5cbiAgICBhdHRhY2tlcktpbGxTY29yZShhcm15OiBBcm15KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGtpbGxTY29yZSA9IDA7XG4gICAgICAgIHRoaXMuaW5HYW1lVW5pdHMuZm9yRWFjaCh1bml0TmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgdW5pdENmZyA9IFVuaXRzQ29uZmlnLnVuaXRzQ29uZmlnLmdldCh1bml0TmFtZSk7XG4gICAgICAgICAgICBjb25zdCB1bml0Q291bnQgPSBhcm15LnVuaXRzKHVuaXROYW1lKTtcbiAgICAgICAgICAgIGtpbGxTY29yZSArPSB1bml0Q2ZnLmtpbGxTY29yZS5hc0F0dGFja2VyICogdW5pdENvdW50O1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiBraWxsU2NvcmU7XG4gICAgfVxuXG4gICAgZGVmZW5kZXJLaWxsU2NvcmUoYXJteTogQXJteSk6IG51bWJlciB7XG4gICAgICAgIGxldCBraWxsU2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmluR2FtZVVuaXRzLmZvckVhY2godW5pdE5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IHVuaXRDZmcgPSBVbml0c0NvbmZpZy51bml0c0NvbmZpZy5nZXQodW5pdE5hbWUpO1xuICAgICAgICAgICAgY29uc3QgdW5pdENvdW50ID0gYXJteS51bml0cyh1bml0TmFtZSk7XG4gICAgICAgICAgICBraWxsU2NvcmUgKz0gdW5pdENmZy5raWxsU2NvcmUuYXNEZWZlbmRlciAqIHVuaXRDb3VudDtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4ga2lsbFNjb3JlO1xuICAgIH1cblxuICAgIHBvcHVsYXRpb24oYXJteTogQXJteSk6IG51bWJlciB7XG4gICAgICAgIGxldCBwb3B1bGF0aW9uID0gMDtcblxuICAgICAgICB0aGlzLmluR2FtZVVuaXRzLmZvckVhY2godW5pdE5hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IHVuaXRDZmcgPSBVbml0c0NvbmZpZy51bml0c0NvbmZpZy5nZXQodW5pdE5hbWUpO1xuICAgICAgICAgICAgY29uc3QgdW5pdENvdW50ID0gYXJteS51bml0cyh1bml0TmFtZSk7XG4gICAgICAgICAgICBwb3B1bGF0aW9uICs9IHVuaXRDZmcucG9wdWxhdGlvbiAqIHVuaXRDb3VudDtcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcG9wdWxhdGlvbjtcbiAgICB9XG5cbiAgICBzdGF0aWMgdW5pdHNDb25maWcgPSBuZXcgTWFwPFVuaXRUeXBlcywgU3RhdGljVW5pdENvbmZpZz4oW1xuICAgICAgICBbVW5pdFR5cGVzLlNQRUFSLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiA1MCwgc3RvbmU6IDMwLCBpcm9uOiAxMH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogNCxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMVxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5TV09SRCwge1xuICAgICAgICAgICAgcmVjcnVpdDogbmV3IFJlc291cmNlcyh7d29vZDogMzAsIHN0b25lOiAzMCwgaXJvbjogNzB9KSxcbiAgICAgICAgICAgIGtpbGxTY29yZToge1xuICAgICAgICAgICAgICAgIGFzQXR0YWNrZXI6IDUsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDFcbiAgICAgICAgfV0sXG4gICAgICAgIFtVbml0VHlwZXMuQVhFLCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiA2MCwgc3RvbmU6IDMwLCBpcm9uOiA0MH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogMSxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiA0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMVxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5BUkNIRVIsIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDEwMCwgc3RvbmU6IDMwLCBpcm9uOiA2MH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogNSxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMVxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5TUFksIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDUwLCBzdG9uZTogNTAsIGlyb246IDIwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiAxLFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiAyXG4gICAgICAgIH1dLFxuICAgICAgICBbVW5pdFR5cGVzLkxJR0hULCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiAxMjUsIHN0b25lOiAxMDAsIGlyb246IDI1MH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogNSxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiAxM1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDRcbiAgICAgICAgfV0sXG4gICAgICAgIFtVbml0VHlwZXMuTU9VTlRFRF9BUkNIRVIsIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDI1MCwgc3RvbmU6IDEwMCwgaXJvbjogMTUwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiA2LFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDEyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogNVxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5IRUFWWSwge1xuICAgICAgICAgICAgcmVjcnVpdDogbmV3IFJlc291cmNlcyh7d29vZDogMjAwLCBzdG9uZTogMTUwLCBpcm9uOiA2MDB9KSxcbiAgICAgICAgICAgIGtpbGxTY29yZToge1xuICAgICAgICAgICAgICAgIGFzQXR0YWNrZXI6IDIzLFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDE1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogNlxuICAgICAgICB9XSxcbiAgICAgICAgW1VuaXRUeXBlcy5SQU0sIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDMwMCwgc3RvbmU6IDIwMCwgaXJvbjogMjAwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiA0LFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiA1XG4gICAgICAgIH1dLFxuICAgICAgICBbVW5pdFR5cGVzLkNBVEFQVUxULCB7XG4gICAgICAgICAgICByZWNydWl0OiBuZXcgUmVzb3VyY2VzKHt3b29kOiAzMjAsIHN0b25lOiA0MDAsIGlyb246IDEwMH0pLFxuICAgICAgICAgICAga2lsbFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgYXNBdHRhY2tlcjogMTIsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogMTBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiA4XG4gICAgICAgIH1dLFxuICAgICAgICBbVW5pdFR5cGVzLlBBTEFESU4sIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDIwLCBzdG9uZTogMjAsIGlyb246IDQwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiA0MCxcbiAgICAgICAgICAgICAgICBhc0RlZmVuZGVyOiAyMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvcHVsYXRpb246IDEwXG4gICAgICAgIH1dLFxuICAgICAgICBbVW5pdFR5cGVzLlNOT0IsIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDQwMDAwLCBzdG9uZTogNTAwMDAsIGlyb246IDUwMDAwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiAyMDAsXG4gICAgICAgICAgICAgICAgYXNEZWZlbmRlcjogMjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9wdWxhdGlvbjogMTAwXG4gICAgICAgIH1dLFxuICAgICAgICBbVW5pdFR5cGVzLk1JTElUSUEsIHtcbiAgICAgICAgICAgIHJlY3J1aXQ6IG5ldyBSZXNvdXJjZXMoe3dvb2Q6IDAsIHN0b25lOiAwLCBpcm9uOiAwfSksXG4gICAgICAgICAgICBraWxsU2NvcmU6IHtcbiAgICAgICAgICAgICAgICBhc0F0dGFja2VyOiAxLFxuICAgICAgICAgICAgICAgIGFzRGVmZW5kZXI6IDRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3B1bGF0aW9uOiAwXG4gICAgICAgIH1dLFxuICAgIF0pXG59XG5cbmNsYXNzIFN0YXRpY1VuaXRDb25maWcge1xuICAgIHJlYWRvbmx5IHJlY3J1aXQ6IFJlc291cmNlcztcbiAgICByZWFkb25seSBwb3B1bGF0aW9uOiBudW1iZXI7XG4gICAgcmVhZG9ubHkga2lsbFNjb3JlOiB7XG4gICAgICAgIGFzRGVmZW5kZXI6IG51bWJlcixcbiAgICAgICAgYXNBdHRhY2tlcjogbnVtYmVyO1xuICAgIH07XG59XG5cbmNsYXNzIEJ1aWxkaW5nc0NvbmZpZyB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBidWlsZGluZ3NDb25maWc6IE1hcDxCdWlsZGluZ1R5cGUsIEJ1aWxkaW5nQ29uZmlnPjtcblxuICAgIGNvbnN0cnVjdG9yKGJ1aWxkaW5nc0NvbmZpZzogTWFwPEJ1aWxkaW5nVHlwZSwgQnVpbGRpbmdDb25maWc+KSB7XG4gICAgICAgIHRoaXMuYnVpbGRpbmdzQ29uZmlnID0gYnVpbGRpbmdzQ29uZmlnO1xuICAgIH1cblxuICAgIHR5cGUodHlwZTogQnVpbGRpbmdUeXBlKTogQnVpbGRpbmdDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5idWlsZGluZ3NDb25maWcuZ2V0KHR5cGUpO1xuICAgIH1cbn1cblxuY2xhc3MgQnVpbGRpbmdDb25maWcge1xuICAgIHJlYWRvbmx5IGRhdGE6IEJ1aWxkaW5nQ29uZmlnRGF0YTtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IEJ1aWxkaW5nQ29uZmlnRGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIGNvc3RCZXR3ZWVuTGV2ZWxzKHN0YXJ0TGV2ZWw6IG51bWJlciwgZW5kTGV2ZWw6IG51bWJlcik6IFJlc291cmNlcyB7XG4gICAgICAgIGNvbnN0IGxvd2VyTGV2ZWwgPSBNYXRoLm1pbihzdGFydExldmVsLCBlbmRMZXZlbCk7XG4gICAgICAgIGNvbnN0IGhpZ2hlckxldmVsID0gTWF0aC5tYXgoc3RhcnRMZXZlbCwgZW5kTGV2ZWwpO1xuICAgICAgICByZXR1cm4gbmV3IFJlc291cmNlcyh7XG4gICAgICAgICAgICB3b29kOiBCdWlsZGluZ0NvbmZpZy5jb3N0KHRoaXMuZGF0YS5zdGFydFByaWNlLndvb2QsIHRoaXMuZGF0YS5yZXNvdXJjZUZhY3Rvci53b29kLCBsb3dlckxldmVsLCBoaWdoZXJMZXZlbCksXG4gICAgICAgICAgICBzdG9uZTogQnVpbGRpbmdDb25maWcuY29zdCh0aGlzLmRhdGEuc3RhcnRQcmljZS5zdG9uZSwgdGhpcy5kYXRhLnJlc291cmNlRmFjdG9yLnN0b25lLCBsb3dlckxldmVsLCBoaWdoZXJMZXZlbCksXG4gICAgICAgICAgICBpcm9uOiBCdWlsZGluZ0NvbmZpZy5jb3N0KHRoaXMuZGF0YS5zdGFydFByaWNlLmlyb24sIHRoaXMuZGF0YS5yZXNvdXJjZUZhY3Rvci5pcm9uLCBsb3dlckxldmVsLCBoaWdoZXJMZXZlbClcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY29zdChzdGFydFByaWNlOiBudW1iZXIsIGZhY3RvcjogbnVtYmVyLCBsb3dlckxldmVsOiBudW1iZXIsIGhpZ2hlckxldmVsOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgZmFjdG9yU3RhcnRMZXZlbCA9IE1hdGgucG93KGZhY3RvciwgbG93ZXJMZXZlbCk7XG4gICAgICAgIGxldCBwcmljZSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgbGV2ZWwgPSBsb3dlckxldmVsOyBsZXZlbCA8IGhpZ2hlckxldmVsOyBsZXZlbCsrKSB7XG4gICAgICAgICAgICBwcmljZSArPSBmYWN0b3JTdGFydExldmVsICogc3RhcnRQcmljZTtcbiAgICAgICAgICAgIGZhY3RvclN0YXJ0TGV2ZWwgKj0gZmFjdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChwcmljZSlcbiAgICB9XG59XG5cbmludGVyZmFjZSBXb3JsZENvbmZpZyB7XG4gICAgcmVhZG9ubHkgdW5pdHM6IFVuaXRzQ29uZmlnXG4gICAgcmVhZG9ubHkgYnVpbGRpbmdzOiBCdWlsZGluZ3NDb25maWdcbiAgICByZWFkb25seSBuaWdodDogTmlnaHRCb251c0NvbmZpZ0RhdGFcbn1cblxuaW50ZXJmYWNlIFVuaXRDb25maWcge1xuICAgIGluR2FtZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBjb25maWcgZm9yIGN1cnJlbnQgd29ybGQuIERvd25sb2FkIG9uY2UgYW5kIGNhY2hlIHJlc3VsdHMgcGVyIGdhbWUgd29ybGQuXG4gKi9cbmZ1bmN0aW9uIGxvYWRXb3JsZENvbmZpZygpOiBXb3JsZENvbmZpZyB7XG4gICAgY29uc3QgcXVlcnkgPSBnZW5lcmljQ2FjaGVkTG9jYWxRdWVyeTx7IGV4cGlyZUF0OiBudW1iZXIsIGNvbmZpZzogV29ybGRDb25maWdEYXRhIH0+KGAke2dhbWVfZGF0YS53b3JsZH0tcHViV29ybGRDb25maWdfdjFgLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBleHBpcmVBdDogbm93LnNldEhvdXJzKG5vdy5nZXRIb3VycygpICsgMjQpLFxuICAgICAgICAgICAgY29uZmlnOiBmZXRjaFdvcmxkQ29uZmlnRGF0YSgpXG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBsZXQgY2ZnID0gcXVlcnkudmFsdWVcbiAgICBpZiAoY2ZnLmV4cGlyZUF0ID4gRGF0ZS5ub3coKSkge1xuICAgICAgICBxdWVyeS5yZW1vdmUoKTtcbiAgICAgICAgY2ZnID0gcXVlcnkuZm9yY2VSZWZyZXNoKCk7XG4gICAgfVxuXG4gICAgY29uc3QgdW5pdHMgPSBuZXcgTWFwPFVuaXRUeXBlcywgVW5pdENvbmZpZz4oKTtcbiAgICBjZmcuY29uZmlnLnVuaXRzLmZvckVhY2godW5pdENmZyA9PiB7XG4gICAgICAgIHVuaXRzLnNldCh1bml0Q2ZnLm5hbWUsIHtcbiAgICAgICAgICAgIGluR2FtZTogdW5pdENmZy5pbkdhbWVcbiAgICAgICAgfSk7XG4gICAgfSlcbiAgICBjb25zdCBidWlsZGluZ3MgPSBuZXcgTWFwPEJ1aWxkaW5nVHlwZSwgQnVpbGRpbmdDb25maWc+KCk7XG4gICAgY2ZnLmNvbmZpZy5idWlsZGluZ3MuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgICAgYnVpbGRpbmdzLnNldChkYXRhLmJ1aWxkaW5nVHlwZSwgbmV3IEJ1aWxkaW5nQ29uZmlnKGRhdGEpKTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICB1bml0czogbmV3IFVuaXRzQ29uZmlnKHVuaXRzKSxcbiAgICAgICAgYnVpbGRpbmdzOiBuZXcgQnVpbGRpbmdzQ29uZmlnKGJ1aWxkaW5ncyksXG4gICAgICAgIG5pZ2h0OiBjZmcuY29uZmlnLm5pZ2h0XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGxvYWRXb3JsZENvbmZpZyxcbiAgICBXb3JsZENvbmZpZ1xufSIsImltcG9ydCB7cGFyc2VTdHJpbmd9IGZyb20gXCJ4bWwyanNcIjtcbmltcG9ydCB7QnVpbGRpbmdUeXBlLCBSZXNvdXJjZXNEYXRhLCBVbml0VHlwZXN9IGZyb20gXCIuL21vZGVsXCI7XG5cbmRlY2xhcmUgdmFyIGdhbWVfZGF0YTogYW55O1xuZGVjbGFyZSB2YXIgVUk6IGFueTtcblxuLy90b2RvIHJld3JpdGUgdGhvc2UgZmV0Y2hlcyB0byBhc3luYyArIHJldHVybiBwcm9taXNlXG5mdW5jdGlvbiBmZXRjaFVuaXRzQ29uZmlnKCk6IEFycmF5PFVuaXRDb25maWdEYXRhPiB7XG4gICAgY29uc3QgY2ZnID0gQXJyYXk8VW5pdENvbmZpZ0RhdGE+KCk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBcIi9pbnRlcmZhY2UucGhwP2Z1bmM9Z2V0X3VuaXRfaW5mb1wiLCB0eXBlOiBcImdldFwiLCBhc3luYzogZmFsc2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhOiBYTUxEb2N1bWVudCkge1xuICAgICAgICAgICAgcGFyc2VTdHJpbmcobmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZyhkYXRhKSwge1xuICAgICAgICAgICAgICAgIGV4cGxpY2l0QXJyYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZTogdHJ1ZVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycjogYW55LCByZXN1bHQ6IGFueSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IHVuaXROYW1lIG9mIE9iamVjdC5rZXlzKFVuaXRUeXBlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5pdE5hbWVMb3dlciA9IHVuaXROYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVuaXRJbmdhbWUgPSBnYW1lX2RhdGEudW5pdHMuaW5jbHVkZXModW5pdE5hbWVMb3dlcik7XG4gICAgICAgICAgICAgICAgICAgIGNmZy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluR2FtZTogdW5pdEluZ2FtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFVuaXRUeXBlc1t1bml0TmFtZV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFVJLkVycm9yTWVzc2FnZSgnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZG93bmxvYWRpbmcgZGF0YS4gUmVmcmVzaCB0aGUgcGFnZSB0byB0cnkgYWdhaW4nLCA1MDAwKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW50ZXJydXB0ZWQgc2NyaXB0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjZmc7XG59XG5cbmZ1bmN0aW9uIGZldGNoQnVpbGRpbmdDb25maWcoKTogQXJyYXk8QnVpbGRpbmdDb25maWdEYXRhPiB7XG4gICAgbGV0IGNmZzogQXJyYXk8QnVpbGRpbmdDb25maWdEYXRhPiA9IFtdO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCIvaW50ZXJmYWNlLnBocD9mdW5jPWdldF9idWlsZGluZ19pbmZvXCIsIHR5cGU6IFwiZ2V0XCIsIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGE6IFhNTERvY3VtZW50KSB7XG4gICAgICAgICAgICBwYXJzZVN0cmluZyhuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKGRhdGEpLCB7XG4gICAgICAgICAgICAgICAgZXhwbGljaXRBcnJheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbm9ybWFsaXplOiB0cnVlXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyOiBhbnksIHJlc3VsdDogYW55KSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHJlc3VsdC5jb25maWc7XG4gICAgICAgICAgICAgICAgT2JqZWN0LnZhbHVlcyhCdWlsZGluZ1R5cGUpLmZvckVhY2goYnVpbGRpbmdUeXBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShidWlsZGluZ1R5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYnVpbGRpbmdDb25maWcgPSBjb25maWdbYnVpbGRpbmdUeXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmZy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUZhY3Rvcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b29kOiBwYXJzZUZsb2F0KGJ1aWxkaW5nQ29uZmlnLndvb2RfZmFjdG9yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvbmU6IHBhcnNlRmxvYXQoYnVpbGRpbmdDb25maWcuc3RvbmVfZmFjdG9yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXJvbjogcGFyc2VGbG9hdChidWlsZGluZ0NvbmZpZy5pcm9uX2ZhY3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nVHlwZTogYnVpbGRpbmdUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJpY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd29vZDogcGFyc2VJbnQoYnVpbGRpbmdDb25maWcud29vZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b25lOiBwYXJzZUludChidWlsZGluZ0NvbmZpZy5zdG9uZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlyb246IHBhcnNlSW50KGJ1aWxkaW5nQ29uZmlnLmlyb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBvcHVsYXRpb246IHBhcnNlSW50KGJ1aWxkaW5nQ29uZmlnLnBvcCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGlvbkZhY3RvcjogcGFyc2VJbnQoYnVpbGRpbmdDb25maWcucG9wX2ZhY3RvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluTGV2ZWw6IHBhcnNlSW50KGJ1aWxkaW5nQ29uZmlnLm1pbl9sZXZlbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGV2ZWw6IHBhcnNlSW50KGJ1aWxkaW5nQ29uZmlnLm1heF9sZXZlbClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFVJLkVycm9yTWVzc2FnZSgnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZG93bmxvYWRpbmcgZGF0YS4gUmVmcmVzaCB0aGUgcGFnZSB0byB0cnkgYWdhaW4nLCA1MDAwKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW50ZXJydXB0ZWQgc2NyaXB0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjZmc7XG59XG5cblxuZnVuY3Rpb24gZmV0Y2hXb3JsZENvbmZpZygpOiBOaWdodEJvbnVzQ29uZmlnRGF0YSB7XG4gICAgbGV0IG5pZ2h0Qm9udXNDZmc6IE5pZ2h0Qm9udXNDb25maWdEYXRhO1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogXCIvaW50ZXJmYWNlLnBocD9mdW5jPWdldF9jb25maWdcIiwgdHlwZTogXCJnZXRcIiwgYXN5bmM6IGZhbHNlLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YTogWE1MRG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHBhcnNlU3RyaW5nKG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoZGF0YSksIHtcbiAgICAgICAgICAgICAgICBleHBsaWNpdEFycmF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBub3JtYWxpemU6IHRydWVcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnI6IGFueSwgcmVzdWx0OiBhbnkpIHtcbiAgICAgICAgICAgICAgICBsZXQgeG1sQ2ZnID0gcmVzdWx0LmNvbmZpZ1xuICAgICAgICAgICAgICAgIGxldCBuaWdodCA9IHhtbENmZy5uaWdodDtcbiAgICAgICAgICAgICAgICBuaWdodEJvbnVzQ2ZnID0ge1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmU6IG5pZ2h0LmFjdGl2ZSA9PT0gXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBwYXJzZUludChuaWdodC5zdGFydF9ob3VyKSAlIDI0LFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IHBhcnNlSW50KG5pZ2h0LmVuZF9ob3VyKSAlIDI0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgZXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFVJLkVycm9yTWVzc2FnZSgnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZG93bmxvYWRpbmcgZGF0YS4gUmVmcmVzaCB0aGUgcGFnZSB0byB0cnkgYWdhaW4nLCA1MDAwKTtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW50ZXJydXB0ZWQgc2NyaXB0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuaWdodEJvbnVzQ2ZnO1xufVxuXG5pbnRlcmZhY2UgVW5pdENvbmZpZ0RhdGEge1xuICAgIG5hbWU6IFVuaXRUeXBlcyxcbiAgICBpbkdhbWU6IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIFdvcmxkQ29uZmlnRGF0YSB7XG4gICAgbmlnaHQ6IE5pZ2h0Qm9udXNDb25maWdEYXRhLFxuICAgIHVuaXRzOiBBcnJheTxVbml0Q29uZmlnRGF0YT4sXG4gICAgYnVpbGRpbmdzOiBBcnJheTxCdWlsZGluZ0NvbmZpZ0RhdGE+XG59XG5cbmludGVyZmFjZSBCdWlsZGluZ0NvbmZpZ0RhdGEge1xuICAgIGJ1aWxkaW5nVHlwZTogQnVpbGRpbmdUeXBlO1xuICAgIHN0YXJ0UHJpY2U6IFJlc291cmNlc0RhdGE7XG4gICAgc3RhcnRQb3B1bGF0aW9uOiBudW1iZXI7XG4gICAgcG9wdWxhdGlvbkZhY3RvcjogbnVtYmVyO1xuICAgIHJlc291cmNlRmFjdG9yOiBSZXNvdXJjZXNEYXRhO1xuICAgIG1pbkxldmVsOiBudW1iZXI7XG4gICAgbWF4TGV2ZWw6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE5pZ2h0Qm9udXNDb25maWdEYXRhIHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gZmV0Y2hXb3JsZENvbmZpZ0RhdGEoKTogV29ybGRDb25maWdEYXRhIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1bml0czogZmV0Y2hVbml0c0NvbmZpZygpLFxuICAgICAgICBidWlsZGluZ3M6IGZldGNoQnVpbGRpbmdDb25maWcoKSxcbiAgICAgICAgbmlnaHQ6IGZldGNoV29ybGRDb25maWcoKVxuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBmZXRjaFdvcmxkQ29uZmlnRGF0YSxcbiAgICBXb3JsZENvbmZpZ0RhdGEsXG4gICAgQnVpbGRpbmdDb25maWdEYXRhLFxuICAgIE5pZ2h0Qm9udXNDb25maWdEYXRhXG59IiwiLy8gPT1Vc2VyU2NyaXB0PT1cbi8vIEBuYW1lICAgICAgICBNYXAgLSBVbml0IEFycml2YWxcbi8vIEBkZXNjcmlwdGlvbiAgVFcgTWFwIC0gVW5pdCBBcnJpdmFsIG9uIHBvaW50ZWQgdmlsbGFnZVxuLy8gQGluY2x1ZGUgaHR0cHM6Ly8qL2dhbWUucGhwPypzY3JlZW49bWFwKlxuLy8gQGF1dGhvciBUV19TY3JpcHRlclxuLy8gPT0vVXNlclNjcmlwdD09XG5cbmltcG9ydCB7IGxvYWRXb3JsZENvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vd29ybGQtY29uZmlnLWxvZ2ljXCI7XG5cbmNvbnN0IHdvcmxkQ29uZmlnID0gbG9hZFdvcmxkQ29uZmlnKCk7XG5cbmZ1bmN0aW9uIGNvbXB1dGVMYW5kaW5nVGltZXMoKSB7XG4gICAgY29uc3QgbWFwUG9wdXAgPSAkKFwiI21hcF9wb3B1cFwiKTtcbiAgICBpZiAobWFwUG9wdXAuZmluZChcIiNpbmZvX3BvaW50c19yb3dcIikubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgbWFwUG9wdXAuZmluZChcIi51bml0X2xhbmRpbmdfdGltZXNcIikucmVtb3ZlKCk7XG5cbiAgICBjb25zdCBkYXRlRm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQoJ2NzLUNaJywgIHtcbiAgICAgICAgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycsXG4gICAgICAgIGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycsIHNlY29uZDogJ251bWVyaWMnLFxuICAgICAgICBob3VyMTI6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgbWFwUG9wdXAuZmluZChcIiNpbmZvX2NvbnRlbnQgPiB0Ym9keSB0clwiKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCB1bml0c1RhYmxlID0gJChlbGVtZW50KS5maW5kKFwidGQgPiB0YWJsZSA+IHRib2R5XCIpO1xuICAgICAgICBpZiAodW5pdHNUYWJsZS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBjb25zdCBsYW5kaW5nVGltZXMgPSBBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgIC8vZWhtIHRoZXJlIGlzIG5vdCB3YXkgaG93IHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gdGFibGVzIHVzZWQgZm9yIGJ1aWxkaW5nLCB1bml0IG1hcmNoIHRpbWVzIGV0YyBzbyBsZXN0IGp1c3QgdHJ5IHRvIHBhcnNlIGl0XG4gICAgICAgICQoZWxlbWVudCkuZmluZChcInRkID4gdGFibGUgPiB0Ym9keVwiKS5maW5kKFwidHIgPiB0ZFwiKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGV4dENvbnRlbnQgPSBlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgaWYgKHRleHRDb250ZW50ID09IG51bGwpIHJldHVybjtcblxuICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSB0ZXh0Q29udGVudC50cmltKCkuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgaWYgKGR1cmF0aW9uLmxlbmd0aCAhPT0gMykgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IHBhcnNlSW50KGR1cmF0aW9uWzBdKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludChkdXJhdGlvblsxXSk7XG4gICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gcGFyc2VJbnQoZHVyYXRpb25bMl0pO1xuICAgICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIG5vdy5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKSArIGhvdXJzKTtcbiAgICAgICAgICAgIG5vdy5zZXRNaW51dGVzKG5vdy5nZXRNaW51dGVzKCkgKyBtaW51dGVzKTtcbiAgICAgICAgICAgIG5vdy5zZXRTZWNvbmRzKG5vdy5nZXRTZWNvbmRzKCkgKyBzZWNvbmRzKTtcbiAgICAgICAgICAgIGNvbnN0IHdpbGxBcnJpdmVJbk5pZ2h0ID0gd2lsbEFycml2ZUluTmlnaHRCb251cyhub3cpO1xuICAgICAgICAgICAgY29uc3QgY29sb3IgPSB3aWxsQXJyaXZlSW5OaWdodCA/IFwicmVkXCIgOiBcImdyZWVuXCI7XG4gICAgICAgICAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3IgPSBpbmRleCAlIDIgPT09IDAgPyBcIiNGOEY0RThcIiA6IFwiI0RFRDNCOVwiO1xuXG4gICAgICAgICAgICBsYW5kaW5nVGltZXMucHVzaChgPHRkIHN0eWxlPVwiY29sb3I6ICR7Y29sb3J9OyBwYWRkaW5nOjJweDtiYWNrZ3JvdW5kLWNvbG9yOiR7YmFja2dyb3VuZENvbG9yfVwiPiR7ZGF0ZUZvcm1hdHRlci5mb3JtYXQobm93KX08L3RkPmApO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxhbmRpbmdUaW1lcy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIHVuaXRzVGFibGUuYXBwZW5kKGBcbiAgICAgICAgICAgIDx0ciBjbGFzcz1cImNlbnRlciB1bml0X2xhbmRpbmdfdGltZXNcIj5cbiAgICAgICAgICAgICAgICAke2xhbmRpbmdUaW1lc31cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIGApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB3aWxsQXJyaXZlSW5OaWdodEJvbnVzKGFycml2YWw6IERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF3b3JsZENvbmZpZy5uaWdodC5hY3RpdmUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGFycml2YWwuZ2V0SG91cnMoKSA+PSB3b3JsZENvbmZpZy5uaWdodC5zdGFydCAmJiBhcnJpdmFsLmdldEhvdXJzKCkgPCB3b3JsZENvbmZpZy5uaWdodC5lbmRcbiAgICB9XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYXBfcG9wdXAnKTtcbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSByZXR1cm47XG4gICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICBjb21wdXRlTGFuZGluZ1RpbWVzKCk7XG4gICAgfSkub2JzZXJ2ZSh0YXJnZXQsIHtcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZVxuICAgIH0pO1xufSk7IiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIGV4cG9ydHMuc3RyaXBCT00gPSBmdW5jdGlvbihzdHIpIHtcbiAgICBpZiAoc3RyWzBdID09PSAnXFx1RkVGRicpIHtcbiAgICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgYnVpbGRlciwgZGVmYXVsdHMsIGVzY2FwZUNEQVRBLCByZXF1aXJlc0NEQVRBLCB3cmFwQ0RBVEEsXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGJ1aWxkZXIgPSByZXF1aXJlKCd4bWxidWlsZGVyJyk7XG5cbiAgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJykuZGVmYXVsdHM7XG5cbiAgcmVxdWlyZXNDREFUQSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlbnRyeSA9PT0gXCJzdHJpbmdcIiAmJiAoZW50cnkuaW5kZXhPZignJicpID49IDAgfHwgZW50cnkuaW5kZXhPZignPicpID49IDAgfHwgZW50cnkuaW5kZXhPZignPCcpID49IDApO1xuICB9O1xuXG4gIHdyYXBDREFUQSA9IGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgcmV0dXJuIFwiPCFbQ0RBVEFbXCIgKyAoZXNjYXBlQ0RBVEEoZW50cnkpKSArIFwiXV0+XCI7XG4gIH07XG5cbiAgZXNjYXBlQ0RBVEEgPSBmdW5jdGlvbihlbnRyeSkge1xuICAgIHJldHVybiBlbnRyeS5yZXBsYWNlKCddXT4nLCAnXV1dXT48IVtDREFUQVs+Jyk7XG4gIH07XG5cbiAgZXhwb3J0cy5CdWlsZGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEJ1aWxkZXIob3B0cykge1xuICAgICAgdmFyIGtleSwgcmVmLCB2YWx1ZTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgICAgcmVmID0gZGVmYXVsdHNbXCIwLjJcIl07XG4gICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwocmVmLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoa2V5IGluIG9wdHMpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwob3B0cywga2V5KSkgY29udGludWU7XG4gICAgICAgIHZhbHVlID0gb3B0c1trZXldO1xuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIEJ1aWxkZXIucHJvdG90eXBlLmJ1aWxkT2JqZWN0ID0gZnVuY3Rpb24ocm9vdE9iaikge1xuICAgICAgdmFyIGF0dHJrZXksIGNoYXJrZXksIHJlbmRlciwgcm9vdEVsZW1lbnQsIHJvb3ROYW1lO1xuICAgICAgYXR0cmtleSA9IHRoaXMub3B0aW9ucy5hdHRya2V5O1xuICAgICAgY2hhcmtleSA9IHRoaXMub3B0aW9ucy5jaGFya2V5O1xuICAgICAgaWYgKChPYmplY3Qua2V5cyhyb290T2JqKS5sZW5ndGggPT09IDEpICYmICh0aGlzLm9wdGlvbnMucm9vdE5hbWUgPT09IGRlZmF1bHRzWycwLjInXS5yb290TmFtZSkpIHtcbiAgICAgICAgcm9vdE5hbWUgPSBPYmplY3Qua2V5cyhyb290T2JqKVswXTtcbiAgICAgICAgcm9vdE9iaiA9IHJvb3RPYmpbcm9vdE5hbWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdE5hbWUgPSB0aGlzLm9wdGlvbnMucm9vdE5hbWU7XG4gICAgICB9XG4gICAgICByZW5kZXIgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGVsZW1lbnQsIG9iaikge1xuICAgICAgICAgIHZhciBhdHRyLCBjaGlsZCwgZW50cnksIGluZGV4LCBrZXksIHZhbHVlO1xuICAgICAgICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuY2RhdGEgJiYgcmVxdWlyZXNDREFUQShvYmopKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQucmF3KHdyYXBDREFUQShvYmopKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1lbnQudHh0KG9iaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIGZvciAoaW5kZXggaW4gb2JqKSB7XG4gICAgICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKG9iaiwgaW5kZXgpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2hpbGQgPSBvYmpbaW5kZXhdO1xuICAgICAgICAgICAgICBmb3IgKGtleSBpbiBjaGlsZCkge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gY2hpbGRba2V5XTtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gcmVuZGVyKGVsZW1lbnQuZWxlKGtleSksIGVudHJ5KS51cCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChvYmosIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBjaGlsZCA9IG9ialtrZXldO1xuICAgICAgICAgICAgICBpZiAoa2V5ID09PSBhdHRya2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgZm9yIChhdHRyIGluIGNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2hpbGRbYXR0cl07XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LmF0dChhdHRyLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gY2hhcmtleSkge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmNkYXRhICYmIHJlcXVpcmVzQ0RBVEEoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yYXcod3JhcENEQVRBKGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnR4dChjaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpbmRleCBpbiBjaGlsZCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwoY2hpbGQsIGluZGV4KSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICBlbnRyeSA9IGNoaWxkW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50cnkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmNkYXRhICYmIHJlcXVpcmVzQ0RBVEEoZW50cnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuZWxlKGtleSkucmF3KHdyYXBDREFUQShlbnRyeSkpLnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuZWxlKGtleSwgZW50cnkpLnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSByZW5kZXIoZWxlbWVudC5lbGUoa2V5KSwgZW50cnkpLnVwKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjaGlsZCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSByZW5kZXIoZWxlbWVudC5lbGUoa2V5KSwgY2hpbGQpLnVwKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycgJiYgX3RoaXMub3B0aW9ucy5jZGF0YSAmJiByZXF1aXJlc0NEQVRBKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuZWxlKGtleSkucmF3KHdyYXBDREFUQShjaGlsZCkpLnVwKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjaGlsZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gJyc7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5lbGUoa2V5LCBjaGlsZC50b1N0cmluZygpKS51cCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgcm9vdEVsZW1lbnQgPSBidWlsZGVyLmNyZWF0ZShyb290TmFtZSwgdGhpcy5vcHRpb25zLnhtbGRlYywgdGhpcy5vcHRpb25zLmRvY3R5cGUsIHtcbiAgICAgICAgaGVhZGxlc3M6IHRoaXMub3B0aW9ucy5oZWFkbGVzcyxcbiAgICAgICAgYWxsb3dTdXJyb2dhdGVDaGFyczogdGhpcy5vcHRpb25zLmFsbG93U3Vycm9nYXRlQ2hhcnNcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlbmRlcihyb290RWxlbWVudCwgcm9vdE9iaikuZW5kKHRoaXMub3B0aW9ucy5yZW5kZXJPcHRzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJ1aWxkZXI7XG5cbiAgfSkoKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIGV4cG9ydHMuZGVmYXVsdHMgPSB7XG4gICAgXCIwLjFcIjoge1xuICAgICAgZXhwbGljaXRDaGFya2V5OiBmYWxzZSxcbiAgICAgIHRyaW06IHRydWUsXG4gICAgICBub3JtYWxpemU6IHRydWUsXG4gICAgICBub3JtYWxpemVUYWdzOiBmYWxzZSxcbiAgICAgIGF0dHJrZXk6IFwiQFwiLFxuICAgICAgY2hhcmtleTogXCIjXCIsXG4gICAgICBleHBsaWNpdEFycmF5OiBmYWxzZSxcbiAgICAgIGlnbm9yZUF0dHJzOiBmYWxzZSxcbiAgICAgIG1lcmdlQXR0cnM6IGZhbHNlLFxuICAgICAgZXhwbGljaXRSb290OiBmYWxzZSxcbiAgICAgIHZhbGlkYXRvcjogbnVsbCxcbiAgICAgIHhtbG5zOiBmYWxzZSxcbiAgICAgIGV4cGxpY2l0Q2hpbGRyZW46IGZhbHNlLFxuICAgICAgY2hpbGRrZXk6ICdAQCcsXG4gICAgICBjaGFyc0FzQ2hpbGRyZW46IGZhbHNlLFxuICAgICAgaW5jbHVkZVdoaXRlQ2hhcnM6IGZhbHNlLFxuICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgc3RyaWN0OiB0cnVlLFxuICAgICAgYXR0ck5hbWVQcm9jZXNzb3JzOiBudWxsLFxuICAgICAgYXR0clZhbHVlUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIHRhZ05hbWVQcm9jZXNzb3JzOiBudWxsLFxuICAgICAgdmFsdWVQcm9jZXNzb3JzOiBudWxsLFxuICAgICAgZW1wdHlUYWc6ICcnXG4gICAgfSxcbiAgICBcIjAuMlwiOiB7XG4gICAgICBleHBsaWNpdENoYXJrZXk6IGZhbHNlLFxuICAgICAgdHJpbTogZmFsc2UsXG4gICAgICBub3JtYWxpemU6IGZhbHNlLFxuICAgICAgbm9ybWFsaXplVGFnczogZmFsc2UsXG4gICAgICBhdHRya2V5OiBcIiRcIixcbiAgICAgIGNoYXJrZXk6IFwiX1wiLFxuICAgICAgZXhwbGljaXRBcnJheTogdHJ1ZSxcbiAgICAgIGlnbm9yZUF0dHJzOiBmYWxzZSxcbiAgICAgIG1lcmdlQXR0cnM6IGZhbHNlLFxuICAgICAgZXhwbGljaXRSb290OiB0cnVlLFxuICAgICAgdmFsaWRhdG9yOiBudWxsLFxuICAgICAgeG1sbnM6IGZhbHNlLFxuICAgICAgZXhwbGljaXRDaGlsZHJlbjogZmFsc2UsXG4gICAgICBwcmVzZXJ2ZUNoaWxkcmVuT3JkZXI6IGZhbHNlLFxuICAgICAgY2hpbGRrZXk6ICckJCcsXG4gICAgICBjaGFyc0FzQ2hpbGRyZW46IGZhbHNlLFxuICAgICAgaW5jbHVkZVdoaXRlQ2hhcnM6IGZhbHNlLFxuICAgICAgYXN5bmM6IGZhbHNlLFxuICAgICAgc3RyaWN0OiB0cnVlLFxuICAgICAgYXR0ck5hbWVQcm9jZXNzb3JzOiBudWxsLFxuICAgICAgYXR0clZhbHVlUHJvY2Vzc29yczogbnVsbCxcbiAgICAgIHRhZ05hbWVQcm9jZXNzb3JzOiBudWxsLFxuICAgICAgdmFsdWVQcm9jZXNzb3JzOiBudWxsLFxuICAgICAgcm9vdE5hbWU6ICdyb290JyxcbiAgICAgIHhtbGRlYzoge1xuICAgICAgICAndmVyc2lvbic6ICcxLjAnLFxuICAgICAgICAnZW5jb2RpbmcnOiAnVVRGLTgnLFxuICAgICAgICAnc3RhbmRhbG9uZSc6IHRydWVcbiAgICAgIH0sXG4gICAgICBkb2N0eXBlOiBudWxsLFxuICAgICAgcmVuZGVyT3B0czoge1xuICAgICAgICAncHJldHR5JzogdHJ1ZSxcbiAgICAgICAgJ2luZGVudCc6ICcgICcsXG4gICAgICAgICduZXdsaW5lJzogJ1xcbidcbiAgICAgIH0sXG4gICAgICBoZWFkbGVzczogZmFsc2UsXG4gICAgICBjaHVua1NpemU6IDEwMDAwLFxuICAgICAgZW1wdHlUYWc6ICcnLFxuICAgICAgY2RhdGE6IGZhbHNlXG4gICAgfVxuICB9O1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBib20sIGRlZmF1bHRzLCBldmVudHMsIGlzRW1wdHksIHByb2Nlc3NJdGVtLCBwcm9jZXNzb3JzLCBzYXgsIHNldEltbWVkaWF0ZSxcbiAgICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIHNheCA9IHJlcXVpcmUoJ3NheCcpO1xuXG4gIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuXG4gIGJvbSA9IHJlcXVpcmUoJy4vYm9tJyk7XG5cbiAgcHJvY2Vzc29ycyA9IHJlcXVpcmUoJy4vcHJvY2Vzc29ycycpO1xuXG4gIHNldEltbWVkaWF0ZSA9IHJlcXVpcmUoJ3RpbWVycycpLnNldEltbWVkaWF0ZTtcblxuICBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKS5kZWZhdWx0cztcblxuICBpc0VtcHR5ID0gZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmICh0aGluZyAhPSBudWxsKSAmJiBPYmplY3Qua2V5cyh0aGluZykubGVuZ3RoID09PSAwO1xuICB9O1xuXG4gIHByb2Nlc3NJdGVtID0gZnVuY3Rpb24ocHJvY2Vzc29ycywgaXRlbSwga2V5KSB7XG4gICAgdmFyIGksIGxlbiwgcHJvY2VzcztcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBwcm9jZXNzb3JzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBwcm9jZXNzID0gcHJvY2Vzc29yc1tpXTtcbiAgICAgIGl0ZW0gPSBwcm9jZXNzKGl0ZW0sIGtleSk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtO1xuICB9O1xuXG4gIGV4cG9ydHMuUGFyc2VyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoUGFyc2VyLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFBhcnNlcihvcHRzKSB7XG4gICAgICB0aGlzLnBhcnNlU3RyaW5nUHJvbWlzZSA9IGJpbmQodGhpcy5wYXJzZVN0cmluZ1Byb21pc2UsIHRoaXMpO1xuICAgICAgdGhpcy5wYXJzZVN0cmluZyA9IGJpbmQodGhpcy5wYXJzZVN0cmluZywgdGhpcyk7XG4gICAgICB0aGlzLnJlc2V0ID0gYmluZCh0aGlzLnJlc2V0LCB0aGlzKTtcbiAgICAgIHRoaXMuYXNzaWduT3JQdXNoID0gYmluZCh0aGlzLmFzc2lnbk9yUHVzaCwgdGhpcyk7XG4gICAgICB0aGlzLnByb2Nlc3NBc3luYyA9IGJpbmQodGhpcy5wcm9jZXNzQXN5bmMsIHRoaXMpO1xuICAgICAgdmFyIGtleSwgcmVmLCB2YWx1ZTtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBleHBvcnRzLlBhcnNlcikpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBleHBvcnRzLlBhcnNlcihvcHRzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgICAgcmVmID0gZGVmYXVsdHNbXCIwLjJcIl07XG4gICAgICBmb3IgKGtleSBpbiByZWYpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwocmVmLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoa2V5IGluIG9wdHMpIHtcbiAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwob3B0cywga2V5KSkgY29udGludWU7XG4gICAgICAgIHZhbHVlID0gb3B0c1trZXldO1xuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy54bWxucykge1xuICAgICAgICB0aGlzLm9wdGlvbnMueG1sbnNrZXkgPSB0aGlzLm9wdGlvbnMuYXR0cmtleSArIFwibnNcIjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9ybWFsaXplVGFncykge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy50YWdOYW1lUHJvY2Vzc29ycykge1xuICAgICAgICAgIHRoaXMub3B0aW9ucy50YWdOYW1lUHJvY2Vzc29ycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucy50YWdOYW1lUHJvY2Vzc29ycy51bnNoaWZ0KHByb2Nlc3NvcnMubm9ybWFsaXplKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLnByb2Nlc3NBc3luYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNodW5rLCBlcnI7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5yZW1haW5pbmcubGVuZ3RoIDw9IHRoaXMub3B0aW9ucy5jaHVua1NpemUpIHtcbiAgICAgICAgICBjaHVuayA9IHRoaXMucmVtYWluaW5nO1xuICAgICAgICAgIHRoaXMucmVtYWluaW5nID0gJyc7XG4gICAgICAgICAgdGhpcy5zYXhQYXJzZXIgPSB0aGlzLnNheFBhcnNlci53cml0ZShjaHVuayk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2F4UGFyc2VyLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2h1bmsgPSB0aGlzLnJlbWFpbmluZy5zdWJzdHIoMCwgdGhpcy5vcHRpb25zLmNodW5rU2l6ZSk7XG4gICAgICAgICAgdGhpcy5yZW1haW5pbmcgPSB0aGlzLnJlbWFpbmluZy5zdWJzdHIodGhpcy5vcHRpb25zLmNodW5rU2l6ZSwgdGhpcy5yZW1haW5pbmcubGVuZ3RoKTtcbiAgICAgICAgICB0aGlzLnNheFBhcnNlciA9IHRoaXMuc2F4UGFyc2VyLndyaXRlKGNodW5rKTtcbiAgICAgICAgICByZXR1cm4gc2V0SW1tZWRpYXRlKHRoaXMucHJvY2Vzc0FzeW5jKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IxKSB7XG4gICAgICAgIGVyciA9IGVycm9yMTtcbiAgICAgICAgaWYgKCF0aGlzLnNheFBhcnNlci5lcnJUaHJvd24pIHtcbiAgICAgICAgICB0aGlzLnNheFBhcnNlci5lcnJUaHJvd24gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiB0aGlzLmVtaXQoZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLmFzc2lnbk9yUHVzaCA9IGZ1bmN0aW9uKG9iaiwga2V5LCBuZXdWYWx1ZSkge1xuICAgICAgaWYgKCEoa2V5IGluIG9iaikpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZXhwbGljaXRBcnJheSkge1xuICAgICAgICAgIHJldHVybiBvYmpba2V5XSA9IG5ld1ZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvYmpba2V5XSA9IFtuZXdWYWx1ZV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghKG9ialtrZXldIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgb2JqW2tleV0gPSBbb2JqW2tleV1dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpba2V5XS5wdXNoKG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGF0dHJrZXksIGNoYXJrZXksIG9udGV4dCwgc3RhY2s7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgdGhpcy5zYXhQYXJzZXIgPSBzYXgucGFyc2VyKHRoaXMub3B0aW9ucy5zdHJpY3QsIHtcbiAgICAgICAgdHJpbTogZmFsc2UsXG4gICAgICAgIG5vcm1hbGl6ZTogZmFsc2UsXG4gICAgICAgIHhtbG5zOiB0aGlzLm9wdGlvbnMueG1sbnNcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zYXhQYXJzZXIuZXJyVGhyb3duID0gZmFsc2U7XG4gICAgICB0aGlzLnNheFBhcnNlci5vbmVycm9yID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIF90aGlzLnNheFBhcnNlci5yZXN1bWUoKTtcbiAgICAgICAgICBpZiAoIV90aGlzLnNheFBhcnNlci5lcnJUaHJvd24pIHtcbiAgICAgICAgICAgIF90aGlzLnNheFBhcnNlci5lcnJUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmVtaXQoXCJlcnJvclwiLCBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICB0aGlzLnNheFBhcnNlci5vbmVuZCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCFfdGhpcy5zYXhQYXJzZXIuZW5kZWQpIHtcbiAgICAgICAgICAgIF90aGlzLnNheFBhcnNlci5lbmRlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMuZW1pdChcImVuZFwiLCBfdGhpcy5yZXN1bHRPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgdGhpcy5zYXhQYXJzZXIuZW5kZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuRVhQTElDSVRfQ0hBUktFWSA9IHRoaXMub3B0aW9ucy5leHBsaWNpdENoYXJrZXk7XG4gICAgICB0aGlzLnJlc3VsdE9iamVjdCA9IG51bGw7XG4gICAgICBzdGFjayA9IFtdO1xuICAgICAgYXR0cmtleSA9IHRoaXMub3B0aW9ucy5hdHRya2V5O1xuICAgICAgY2hhcmtleSA9IHRoaXMub3B0aW9ucy5jaGFya2V5O1xuICAgICAgdGhpcy5zYXhQYXJzZXIub25vcGVudGFnID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgdmFyIGtleSwgbmV3VmFsdWUsIG9iaiwgcHJvY2Vzc2VkS2V5LCByZWY7XG4gICAgICAgICAgb2JqID0ge307XG4gICAgICAgICAgb2JqW2NoYXJrZXldID0gXCJcIjtcbiAgICAgICAgICBpZiAoIV90aGlzLm9wdGlvbnMuaWdub3JlQXR0cnMpIHtcbiAgICAgICAgICAgIHJlZiA9IG5vZGUuYXR0cmlidXRlcztcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICBpZiAoIShhdHRya2V5IGluIG9iaikgJiYgIV90aGlzLm9wdGlvbnMubWVyZ2VBdHRycykge1xuICAgICAgICAgICAgICAgIG9ialthdHRya2V5XSA9IHt9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld1ZhbHVlID0gX3RoaXMub3B0aW9ucy5hdHRyVmFsdWVQcm9jZXNzb3JzID8gcHJvY2Vzc0l0ZW0oX3RoaXMub3B0aW9ucy5hdHRyVmFsdWVQcm9jZXNzb3JzLCBub2RlLmF0dHJpYnV0ZXNba2V5XSwga2V5KSA6IG5vZGUuYXR0cmlidXRlc1trZXldO1xuICAgICAgICAgICAgICBwcm9jZXNzZWRLZXkgPSBfdGhpcy5vcHRpb25zLmF0dHJOYW1lUHJvY2Vzc29ycyA/IHByb2Nlc3NJdGVtKF90aGlzLm9wdGlvbnMuYXR0ck5hbWVQcm9jZXNzb3JzLCBrZXkpIDoga2V5O1xuICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5tZXJnZUF0dHJzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYXNzaWduT3JQdXNoKG9iaiwgcHJvY2Vzc2VkS2V5LCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2F0dHJrZXldW3Byb2Nlc3NlZEtleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBvYmpbXCIjbmFtZVwiXSA9IF90aGlzLm9wdGlvbnMudGFnTmFtZVByb2Nlc3NvcnMgPyBwcm9jZXNzSXRlbShfdGhpcy5vcHRpb25zLnRhZ05hbWVQcm9jZXNzb3JzLCBub2RlLm5hbWUpIDogbm9kZS5uYW1lO1xuICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLnhtbG5zKSB7XG4gICAgICAgICAgICBvYmpbX3RoaXMub3B0aW9ucy54bWxuc2tleV0gPSB7XG4gICAgICAgICAgICAgIHVyaTogbm9kZS51cmksXG4gICAgICAgICAgICAgIGxvY2FsOiBub2RlLmxvY2FsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RhY2sucHVzaChvYmopO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICB0aGlzLnNheFBhcnNlci5vbmNsb3NldGFnID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2RhdGEsIGVtcHR5U3RyLCBrZXksIG5vZGUsIG5vZGVOYW1lLCBvYmosIG9iakNsb25lLCBvbGQsIHMsIHhwYXRoO1xuICAgICAgICAgIG9iaiA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgIG5vZGVOYW1lID0gb2JqW1wiI25hbWVcIl07XG4gICAgICAgICAgaWYgKCFfdGhpcy5vcHRpb25zLmV4cGxpY2l0Q2hpbGRyZW4gfHwgIV90aGlzLm9wdGlvbnMucHJlc2VydmVDaGlsZHJlbk9yZGVyKSB7XG4gICAgICAgICAgICBkZWxldGUgb2JqW1wiI25hbWVcIl07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvYmouY2RhdGEgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNkYXRhID0gb2JqLmNkYXRhO1xuICAgICAgICAgICAgZGVsZXRlIG9iai5jZGF0YTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcyA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmIChvYmpbY2hhcmtleV0ubWF0Y2goL15cXHMqJC8pICYmICFjZGF0YSkge1xuICAgICAgICAgICAgZW1wdHlTdHIgPSBvYmpbY2hhcmtleV07XG4gICAgICAgICAgICBkZWxldGUgb2JqW2NoYXJrZXldO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy50cmltKSB7XG4gICAgICAgICAgICAgIG9ialtjaGFya2V5XSA9IG9ialtjaGFya2V5XS50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5ub3JtYWxpemUpIHtcbiAgICAgICAgICAgICAgb2JqW2NoYXJrZXldID0gb2JqW2NoYXJrZXldLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpLnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ialtjaGFya2V5XSA9IF90aGlzLm9wdGlvbnMudmFsdWVQcm9jZXNzb3JzID8gcHJvY2Vzc0l0ZW0oX3RoaXMub3B0aW9ucy52YWx1ZVByb2Nlc3NvcnMsIG9ialtjaGFya2V5XSwgbm9kZU5hbWUpIDogb2JqW2NoYXJrZXldO1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAxICYmIGNoYXJrZXkgaW4gb2JqICYmICFfdGhpcy5FWFBMSUNJVF9DSEFSS0VZKSB7XG4gICAgICAgICAgICAgIG9iaiA9IG9ialtjaGFya2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlzRW1wdHkob2JqKSkge1xuICAgICAgICAgICAgb2JqID0gX3RoaXMub3B0aW9ucy5lbXB0eVRhZyAhPT0gJycgPyBfdGhpcy5vcHRpb25zLmVtcHR5VGFnIDogZW1wdHlTdHI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLnZhbGlkYXRvciAhPSBudWxsKSB7XG4gICAgICAgICAgICB4cGF0aCA9IFwiL1wiICsgKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBzdGFjay5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIG5vZGUgPSBzdGFja1tpXTtcbiAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gobm9kZVtcIiNuYW1lXCJdKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgIH0pKCkpLmNvbmNhdChub2RlTmFtZSkuam9pbihcIi9cIik7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBlcnI7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiA9IF90aGlzLm9wdGlvbnMudmFsaWRhdG9yKHhwYXRoLCBzICYmIHNbbm9kZU5hbWVdLCBvYmopO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICAgICAgICAgICAgICBlcnIgPSBlcnJvcjE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmVtaXQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5leHBsaWNpdENoaWxkcmVuICYmICFfdGhpcy5vcHRpb25zLm1lcmdlQXR0cnMgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMub3B0aW9ucy5wcmVzZXJ2ZUNoaWxkcmVuT3JkZXIpIHtcbiAgICAgICAgICAgICAgbm9kZSA9IHt9O1xuICAgICAgICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy5hdHRya2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgIG5vZGVbX3RoaXMub3B0aW9ucy5hdHRya2V5XSA9IG9ialtfdGhpcy5vcHRpb25zLmF0dHJrZXldO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBvYmpbX3RoaXMub3B0aW9ucy5hdHRya2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIV90aGlzLm9wdGlvbnMuY2hhcnNBc0NoaWxkcmVuICYmIF90aGlzLm9wdGlvbnMuY2hhcmtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICBub2RlW190aGlzLm9wdGlvbnMuY2hhcmtleV0gPSBvYmpbX3RoaXMub3B0aW9ucy5jaGFya2V5XTtcbiAgICAgICAgICAgICAgICBkZWxldGUgb2JqW190aGlzLm9wdGlvbnMuY2hhcmtleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG5vZGVbX3RoaXMub3B0aW9ucy5jaGlsZGtleV0gPSBvYmo7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb2JqID0gbm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocykge1xuICAgICAgICAgICAgICBzW190aGlzLm9wdGlvbnMuY2hpbGRrZXldID0gc1tfdGhpcy5vcHRpb25zLmNoaWxka2V5XSB8fCBbXTtcbiAgICAgICAgICAgICAgb2JqQ2xvbmUgPSB7fTtcbiAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwob2JqLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBvYmpDbG9uZVtrZXldID0gb2JqW2tleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc1tfdGhpcy5vcHRpb25zLmNoaWxka2V5XS5wdXNoKG9iakNsb25lKTtcbiAgICAgICAgICAgICAgZGVsZXRlIG9ialtcIiNuYW1lXCJdO1xuICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDEgJiYgY2hhcmtleSBpbiBvYmogJiYgIV90aGlzLkVYUExJQ0lUX0NIQVJLRVkpIHtcbiAgICAgICAgICAgICAgICBvYmogPSBvYmpbY2hhcmtleV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5hc3NpZ25PclB1c2gocywgbm9kZU5hbWUsIG9iaik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vcHRpb25zLmV4cGxpY2l0Um9vdCkge1xuICAgICAgICAgICAgICBvbGQgPSBvYmo7XG4gICAgICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgICAgICBvYmpbbm9kZU5hbWVdID0gb2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMucmVzdWx0T2JqZWN0ID0gb2JqO1xuICAgICAgICAgICAgX3RoaXMuc2F4UGFyc2VyLmVuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5lbWl0KFwiZW5kXCIsIF90aGlzLnJlc3VsdE9iamVjdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICBvbnRleHQgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICB2YXIgY2hhckNoaWxkLCBzO1xuICAgICAgICAgIHMgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgc1tjaGFya2V5XSArPSB0ZXh0O1xuICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMuZXhwbGljaXRDaGlsZHJlbiAmJiBfdGhpcy5vcHRpb25zLnByZXNlcnZlQ2hpbGRyZW5PcmRlciAmJiBfdGhpcy5vcHRpb25zLmNoYXJzQXNDaGlsZHJlbiAmJiAoX3RoaXMub3B0aW9ucy5pbmNsdWRlV2hpdGVDaGFycyB8fCB0ZXh0LnJlcGxhY2UoL1xcXFxuL2csICcnKS50cmltKCkgIT09ICcnKSkge1xuICAgICAgICAgICAgICBzW190aGlzLm9wdGlvbnMuY2hpbGRrZXldID0gc1tfdGhpcy5vcHRpb25zLmNoaWxka2V5XSB8fCBbXTtcbiAgICAgICAgICAgICAgY2hhckNoaWxkID0ge1xuICAgICAgICAgICAgICAgICcjbmFtZSc6ICdfX3RleHRfXydcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgY2hhckNoaWxkW2NoYXJrZXldID0gdGV4dDtcbiAgICAgICAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMubm9ybWFsaXplKSB7XG4gICAgICAgICAgICAgICAgY2hhckNoaWxkW2NoYXJrZXldID0gY2hhckNoaWxkW2NoYXJrZXldLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpLnRyaW0oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzW190aGlzLm9wdGlvbnMuY2hpbGRrZXldLnB1c2goY2hhckNoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH0pKHRoaXMpO1xuICAgICAgdGhpcy5zYXhQYXJzZXIub250ZXh0ID0gb250ZXh0O1xuICAgICAgcmV0dXJuIHRoaXMuc2F4UGFyc2VyLm9uY2RhdGEgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICB2YXIgcztcbiAgICAgICAgICBzID0gb250ZXh0KHRleHQpO1xuICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5jZGF0YSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgfTtcblxuICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VTdHJpbmcgPSBmdW5jdGlvbihzdHIsIGNiKSB7XG4gICAgICB2YXIgZXJyO1xuICAgICAgaWYgKChjYiAhPSBudWxsKSAmJiB0eXBlb2YgY2IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLm9uKFwiZW5kXCIsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICByZXR1cm4gY2IobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub24oXCJlcnJvclwiLCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgcmV0dXJuIGNiKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChzdHIudHJpbSgpID09PSAnJykge1xuICAgICAgICAgIHRoaXMuZW1pdChcImVuZFwiLCBudWxsKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBzdHIgPSBib20uc3RyaXBCT00oc3RyKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hc3luYykge1xuICAgICAgICAgIHRoaXMucmVtYWluaW5nID0gc3RyO1xuICAgICAgICAgIHNldEltbWVkaWF0ZSh0aGlzLnByb2Nlc3NBc3luYyk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2F4UGFyc2VyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNheFBhcnNlci53cml0ZShzdHIpLmNsb3NlKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICAgICAgZXJyID0gZXJyb3IxO1xuICAgICAgICBpZiAoISh0aGlzLnNheFBhcnNlci5lcnJUaHJvd24gfHwgdGhpcy5zYXhQYXJzZXIuZW5kZWQpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2F4UGFyc2VyLmVyclRocm93biA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zYXhQYXJzZXIuZW5kZWQpIHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZVN0cmluZ1Byb21pc2UgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5wYXJzZVN0cmluZyhzdHIsIGZ1bmN0aW9uKGVyciwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gUGFyc2VyO1xuXG4gIH0pKGV2ZW50cyk7XG5cbiAgZXhwb3J0cy5wYXJzZVN0cmluZyA9IGZ1bmN0aW9uKHN0ciwgYSwgYikge1xuICAgIHZhciBjYiwgb3B0aW9ucywgcGFyc2VyO1xuICAgIGlmIChiICE9IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYiA9IGI7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG9wdGlvbnMgPSBhO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2IgPSBhO1xuICAgICAgfVxuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBwYXJzZXIgPSBuZXcgZXhwb3J0cy5QYXJzZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIHBhcnNlci5wYXJzZVN0cmluZyhzdHIsIGNiKTtcbiAgfTtcblxuICBleHBvcnRzLnBhcnNlU3RyaW5nUHJvbWlzZSA9IGZ1bmN0aW9uKHN0ciwgYSkge1xuICAgIHZhciBvcHRpb25zLCBwYXJzZXI7XG4gICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xuICAgICAgb3B0aW9ucyA9IGE7XG4gICAgfVxuICAgIHBhcnNlciA9IG5ldyBleHBvcnRzLlBhcnNlcihvcHRpb25zKTtcbiAgICByZXR1cm4gcGFyc2VyLnBhcnNlU3RyaW5nUHJvbWlzZShzdHIpO1xuICB9O1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBwcmVmaXhNYXRjaDtcblxuICBwcmVmaXhNYXRjaCA9IG5ldyBSZWdFeHAoLyg/IXhtbG5zKV4uKjovKTtcblxuICBleHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKTtcbiAgfTtcblxuICBleHBvcnRzLmZpcnN0Q2hhckxvd2VyQ2FzZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gIH07XG5cbiAgZXhwb3J0cy5zdHJpcFByZWZpeCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShwcmVmaXhNYXRjaCwgJycpO1xuICB9O1xuXG4gIGV4cG9ydHMucGFyc2VOdW1iZXJzID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKCFpc05hTihzdHIpKSB7XG4gICAgICBzdHIgPSBzdHIgJSAxID09PSAwID8gcGFyc2VJbnQoc3RyLCAxMCkgOiBwYXJzZUZsb2F0KHN0cik7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH07XG5cbiAgZXhwb3J0cy5wYXJzZUJvb2xlYW5zID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKC9eKD86dHJ1ZXxmYWxzZSkkL2kudGVzdChzdHIpKSB7XG4gICAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKSA9PT0gJ3RydWUnO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9O1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciBidWlsZGVyLCBkZWZhdWx0cywgcGFyc2VyLCBwcm9jZXNzb3JzLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbiAgYnVpbGRlciA9IHJlcXVpcmUoJy4vYnVpbGRlcicpO1xuXG4gIHBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyJyk7XG5cbiAgcHJvY2Vzc29ycyA9IHJlcXVpcmUoJy4vcHJvY2Vzc29ycycpO1xuXG4gIGV4cG9ydHMuZGVmYXVsdHMgPSBkZWZhdWx0cy5kZWZhdWx0cztcblxuICBleHBvcnRzLnByb2Nlc3NvcnMgPSBwcm9jZXNzb3JzO1xuXG4gIGV4cG9ydHMuVmFsaWRhdGlvbkVycm9yID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoVmFsaWRhdGlvbkVycm9yLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFZhbGlkYXRpb25FcnJvcihtZXNzYWdlKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cblxuICAgIHJldHVybiBWYWxpZGF0aW9uRXJyb3I7XG5cbiAgfSkoRXJyb3IpO1xuXG4gIGV4cG9ydHMuQnVpbGRlciA9IGJ1aWxkZXIuQnVpbGRlcjtcblxuICBleHBvcnRzLlBhcnNlciA9IHBhcnNlci5QYXJzZXI7XG5cbiAgZXhwb3J0cy5wYXJzZVN0cmluZyA9IHBhcnNlci5wYXJzZVN0cmluZztcblxuICBleHBvcnRzLnBhcnNlU3RyaW5nUHJvbWlzZSA9IHBhcnNlci5wYXJzZVN0cmluZ1Byb21pc2U7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBEaXNjb25uZWN0ZWQ6IDEsXG4gICAgUHJlY2VkaW5nOiAyLFxuICAgIEZvbGxvd2luZzogNCxcbiAgICBDb250YWluczogOCxcbiAgICBDb250YWluZWRCeTogMTYsXG4gICAgSW1wbGVtZW50YXRpb25TcGVjaWZpYzogMzJcbiAgfTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgIEVsZW1lbnQ6IDEsXG4gICAgQXR0cmlidXRlOiAyLFxuICAgIFRleHQ6IDMsXG4gICAgQ0RhdGE6IDQsXG4gICAgRW50aXR5UmVmZXJlbmNlOiA1LFxuICAgIEVudGl0eURlY2xhcmF0aW9uOiA2LFxuICAgIFByb2Nlc3NpbmdJbnN0cnVjdGlvbjogNyxcbiAgICBDb21tZW50OiA4LFxuICAgIERvY3VtZW50OiA5LFxuICAgIERvY1R5cGU6IDEwLFxuICAgIERvY3VtZW50RnJhZ21lbnQ6IDExLFxuICAgIE5vdGF0aW9uRGVjbGFyYXRpb246IDEyLFxuICAgIERlY2xhcmF0aW9uOiAyMDEsXG4gICAgUmF3OiAyMDIsXG4gICAgQXR0cmlidXRlRGVjbGFyYXRpb246IDIwMyxcbiAgICBFbGVtZW50RGVjbGFyYXRpb246IDIwNCxcbiAgICBEdW1teTogMjA1XG4gIH07XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgYXNzaWduLCBnZXRWYWx1ZSwgaXNBcnJheSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNPYmplY3QsIGlzUGxhaW5PYmplY3QsXG4gICAgc2xpY2UgPSBbXS5zbGljZSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIGtleSwgbGVuLCBzb3VyY2UsIHNvdXJjZXMsIHRhcmdldDtcbiAgICB0YXJnZXQgPSBhcmd1bWVudHNbMF0sIHNvdXJjZXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZiAoaXNGdW5jdGlvbihPYmplY3QuYXNzaWduKSkge1xuICAgICAgT2JqZWN0LmFzc2lnbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBzb3VyY2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHJldHVybiAhIXZhbCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgfTtcblxuICBpc09iamVjdCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIHZhciByZWY7XG4gICAgcmV0dXJuICEhdmFsICYmICgocmVmID0gdHlwZW9mIHZhbCkgPT09ICdmdW5jdGlvbicgfHwgcmVmID09PSAnb2JqZWN0Jyk7XG4gIH07XG5cbiAgaXNBcnJheSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKEFycmF5LmlzQXJyYXkpKSB7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuICB9O1xuXG4gIGlzRW1wdHkgPSBmdW5jdGlvbih2YWwpIHtcbiAgICB2YXIga2V5O1xuICAgIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJldHVybiAhdmFsLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChrZXkgaW4gdmFsKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHZhbCwga2V5KSkgY29udGludWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfTtcblxuICBpc1BsYWluT2JqZWN0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgdmFyIGN0b3IsIHByb3RvO1xuICAgIHJldHVybiBpc09iamVjdCh2YWwpICYmIChwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpKSAmJiAoY3RvciA9IHByb3RvLmNvbnN0cnVjdG9yKSAmJiAodHlwZW9mIGN0b3IgPT09ICdmdW5jdGlvbicpICYmIChjdG9yIGluc3RhbmNlb2YgY3RvcikgJiYgKEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGN0b3IpID09PSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChPYmplY3QpKTtcbiAgfTtcblxuICBnZXRWYWx1ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChpc0Z1bmN0aW9uKG9iai52YWx1ZU9mKSkge1xuICAgICAgcmV0dXJuIG9iai52YWx1ZU9mKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzLmFzc2lnbiA9IGFzc2lnbjtcblxuICBtb2R1bGUuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuICBtb2R1bGUuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG4gIG1vZHVsZS5leHBvcnRzLmlzQXJyYXkgPSBpc0FycmF5O1xuXG4gIG1vZHVsZS5leHBvcnRzLmlzRW1wdHkgPSBpc0VtcHR5O1xuXG4gIG1vZHVsZS5leHBvcnRzLmlzUGxhaW5PYmplY3QgPSBpc1BsYWluT2JqZWN0O1xuXG4gIG1vZHVsZS5leHBvcnRzLmdldFZhbHVlID0gZ2V0VmFsdWU7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBOb25lOiAwLFxuICAgIE9wZW5UYWc6IDEsXG4gICAgSW5zaWRlVGFnOiAyLFxuICAgIENsb3NlVGFnOiAzXG4gIH07XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTEF0dHJpYnV0ZSwgWE1MTm9kZTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxOb2RlID0gcmVxdWlyZSgnLi9YTUxOb2RlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxBdHRyaWJ1dGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MQXR0cmlidXRlKHBhcmVudCwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMucGFyZW50Lm9wdGlvbnM7XG4gICAgICAgIHRoaXMuc3RyaW5naWZ5ID0gdGhpcy5wYXJlbnQuc3RyaW5naWZ5O1xuICAgICAgfVxuICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGF0dHJpYnV0ZSBuYW1lLiBcIiArIHRoaXMuZGVidWdJbmZvKG5hbWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuc3RyaW5naWZ5Lm5hbWUobmFtZSk7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdpZnkuYXR0VmFsdWUodmFsdWUpO1xuICAgICAgdGhpcy50eXBlID0gTm9kZVR5cGUuQXR0cmlidXRlO1xuICAgICAgdGhpcy5pc0lkID0gZmFsc2U7XG4gICAgICB0aGlzLnNjaGVtYVR5cGVJbmZvID0gbnVsbDtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MQXR0cmlidXRlLnByb3RvdHlwZSwgJ25vZGVUeXBlJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxBdHRyaWJ1dGUucHJvdG90eXBlLCAnb3duZXJFbGVtZW50Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUsICd0ZXh0Q29udGVudCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgPSB2YWx1ZSB8fCAnJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxBdHRyaWJ1dGUucHJvdG90eXBlLCAnbmFtZXNwYWNlVVJJJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUsICdwcmVmaXgnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MQXR0cmlidXRlLnByb3RvdHlwZSwgJ2xvY2FsTmFtZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MQXR0cmlidXRlLnByb3RvdHlwZSwgJ3NwZWNpZmllZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MQXR0cmlidXRlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgfTtcblxuICAgIFhNTEF0dHJpYnV0ZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5hdHRyaWJ1dGUodGhpcywgdGhpcy5vcHRpb25zLndyaXRlci5maWx0ZXJPcHRpb25zKG9wdGlvbnMpKTtcbiAgICB9O1xuXG4gICAgWE1MQXR0cmlidXRlLnByb3RvdHlwZS5kZWJ1Z0luZm8gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBuYW1lID0gbmFtZSB8fCB0aGlzLm5hbWU7XG4gICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcInBhcmVudDogPFwiICsgdGhpcy5wYXJlbnQubmFtZSArIFwiPlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiYXR0cmlidXRlOiB7XCIgKyBuYW1lICsgXCJ9LCBwYXJlbnQ6IDxcIiArIHRoaXMucGFyZW50Lm5hbWUgKyBcIj5cIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MQXR0cmlidXRlLnByb3RvdHlwZS5pc0VxdWFsTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5hbWVzcGFjZVVSSSAhPT0gdGhpcy5uYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUucHJlZml4ICE9PSB0aGlzLnByZWZpeCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5sb2NhbE5hbWUgIT09IHRoaXMubG9jYWxOYW1lKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnZhbHVlICE9PSB0aGlzLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MQXR0cmlidXRlO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTENEYXRhLCBYTUxDaGFyYWN0ZXJEYXRhLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgWE1MQ2hhcmFjdGVyRGF0YSA9IHJlcXVpcmUoJy4vWE1MQ2hhcmFjdGVyRGF0YScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MQ0RhdGEgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxDRGF0YSwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxDRGF0YShwYXJlbnQsIHRleHQpIHtcbiAgICAgIFhNTENEYXRhLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAodGV4dCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgQ0RBVEEgdGV4dC4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IFwiI2NkYXRhLXNlY3Rpb25cIjtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkNEYXRhO1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc3RyaW5naWZ5LmNkYXRhKHRleHQpO1xuICAgIH1cblxuICAgIFhNTENEYXRhLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgfTtcblxuICAgIFhNTENEYXRhLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmNkYXRhKHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxDRGF0YTtcblxuICB9KShYTUxDaGFyYWN0ZXJEYXRhKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBYTUxDaGFyYWN0ZXJEYXRhLCBYTUxOb2RlLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MQ2hhcmFjdGVyRGF0YSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTENoYXJhY3RlckRhdGEsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MQ2hhcmFjdGVyRGF0YShwYXJlbnQpIHtcbiAgICAgIFhNTENoYXJhY3RlckRhdGEuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MQ2hhcmFjdGVyRGF0YS5wcm90b3R5cGUsICdkYXRhJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSA9IHZhbHVlIHx8ICcnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUubGVuZ3RoO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLCAndGV4dENvbnRlbnQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlID0gdmFsdWUgfHwgJyc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxDaGFyYWN0ZXJEYXRhLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgfTtcblxuICAgIFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLnN1YnN0cmluZ0RhdGEgPSBmdW5jdGlvbihvZmZzZXQsIGNvdW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLmFwcGVuZERhdGEgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MQ2hhcmFjdGVyRGF0YS5wcm90b3R5cGUuaW5zZXJ0RGF0YSA9IGZ1bmN0aW9uKG9mZnNldCwgYXJnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLmRlbGV0ZURhdGEgPSBmdW5jdGlvbihvZmZzZXQsIGNvdW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLnJlcGxhY2VEYXRhID0gZnVuY3Rpb24ob2Zmc2V0LCBjb3VudCwgYXJnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTENoYXJhY3RlckRhdGEucHJvdG90eXBlLmlzRXF1YWxOb2RlID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKCFYTUxDaGFyYWN0ZXJEYXRhLl9fc3VwZXJfXy5pc0VxdWFsTm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLmlzRXF1YWxOb2RlKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLmRhdGEgIT09IHRoaXMuZGF0YSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTENoYXJhY3RlckRhdGE7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTENoYXJhY3RlckRhdGEsIFhNTENvbW1lbnQsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxDaGFyYWN0ZXJEYXRhID0gcmVxdWlyZSgnLi9YTUxDaGFyYWN0ZXJEYXRhJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxDb21tZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MQ29tbWVudCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxDb21tZW50KHBhcmVudCwgdGV4dCkge1xuICAgICAgWE1MQ29tbWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGNvbW1lbnQgdGV4dC4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IFwiI2NvbW1lbnRcIjtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkNvbW1lbnQ7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdpZnkuY29tbWVudCh0ZXh0KTtcbiAgICB9XG5cbiAgICBYTUxDb21tZW50LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgfTtcblxuICAgIFhNTENvbW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53cml0ZXIuY29tbWVudCh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MQ29tbWVudDtcblxuICB9KShYTUxDaGFyYWN0ZXJEYXRhKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBYTUxET01Db25maWd1cmF0aW9uLCBYTUxET01FcnJvckhhbmRsZXIsIFhNTERPTVN0cmluZ0xpc3Q7XG5cbiAgWE1MRE9NRXJyb3JIYW5kbGVyID0gcmVxdWlyZSgnLi9YTUxET01FcnJvckhhbmRsZXInKTtcblxuICBYTUxET01TdHJpbmdMaXN0ID0gcmVxdWlyZSgnLi9YTUxET01TdHJpbmdMaXN0Jyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxET01Db25maWd1cmF0aW9uID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTERPTUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICB2YXIgY2xvbmVkU2VsZjtcbiAgICAgIHRoaXMuZGVmYXVsdFBhcmFtcyA9IHtcbiAgICAgICAgXCJjYW5vbmljYWwtZm9ybVwiOiBmYWxzZSxcbiAgICAgICAgXCJjZGF0YS1zZWN0aW9uc1wiOiBmYWxzZSxcbiAgICAgICAgXCJjb21tZW50c1wiOiBmYWxzZSxcbiAgICAgICAgXCJkYXRhdHlwZS1ub3JtYWxpemF0aW9uXCI6IGZhbHNlLFxuICAgICAgICBcImVsZW1lbnQtY29udGVudC13aGl0ZXNwYWNlXCI6IHRydWUsXG4gICAgICAgIFwiZW50aXRpZXNcIjogdHJ1ZSxcbiAgICAgICAgXCJlcnJvci1oYW5kbGVyXCI6IG5ldyBYTUxET01FcnJvckhhbmRsZXIoKSxcbiAgICAgICAgXCJpbmZvc2V0XCI6IHRydWUsXG4gICAgICAgIFwidmFsaWRhdGUtaWYtc2NoZW1hXCI6IGZhbHNlLFxuICAgICAgICBcIm5hbWVzcGFjZXNcIjogdHJ1ZSxcbiAgICAgICAgXCJuYW1lc3BhY2UtZGVjbGFyYXRpb25zXCI6IHRydWUsXG4gICAgICAgIFwibm9ybWFsaXplLWNoYXJhY3RlcnNcIjogZmFsc2UsXG4gICAgICAgIFwic2NoZW1hLWxvY2F0aW9uXCI6ICcnLFxuICAgICAgICBcInNjaGVtYS10eXBlXCI6ICcnLFxuICAgICAgICBcInNwbGl0LWNkYXRhLXNlY3Rpb25zXCI6IHRydWUsXG4gICAgICAgIFwidmFsaWRhdGVcIjogZmFsc2UsXG4gICAgICAgIFwid2VsbC1mb3JtZWRcIjogdHJ1ZVxuICAgICAgfTtcbiAgICAgIHRoaXMucGFyYW1zID0gY2xvbmVkU2VsZiA9IE9iamVjdC5jcmVhdGUodGhpcy5kZWZhdWx0UGFyYW1zKTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRE9NQ29uZmlndXJhdGlvbi5wcm90b3R5cGUsICdwYXJhbWV0ZXJOYW1lcycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgWE1MRE9NU3RyaW5nTGlzdChPYmplY3Qua2V5cyh0aGlzLmRlZmF1bHRQYXJhbXMpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTERPTUNvbmZpZ3VyYXRpb24ucHJvdG90eXBlLmdldFBhcmFtZXRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGlmICh0aGlzLnBhcmFtcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJhbXNbbmFtZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MRE9NQ29uZmlndXJhdGlvbi5wcm90b3R5cGUuY2FuU2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBYTUxET01Db25maWd1cmF0aW9uLnByb3RvdHlwZS5zZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW25hbWVdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGVsZXRlIHRoaXMucGFyYW1zW25hbWVdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRE9NQ29uZmlndXJhdGlvbjtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIFhNTERPTUVycm9ySGFuZGxlcjtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTERPTUVycm9ySGFuZGxlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBYTUxET01FcnJvckhhbmRsZXIoKSB7fVxuXG4gICAgWE1MRE9NRXJyb3JIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVFcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRE9NRXJyb3JIYW5kbGVyO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MRE9NSW1wbGVtZW50YXRpb247XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxET01JbXBsZW1lbnRhdGlvbiA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBYTUxET01JbXBsZW1lbnRhdGlvbigpIHt9XG5cbiAgICBYTUxET01JbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuaGFzRmVhdHVyZSA9IGZ1bmN0aW9uKGZlYXR1cmUsIHZlcnNpb24pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBYTUxET01JbXBsZW1lbnRhdGlvbi5wcm90b3R5cGUuY3JlYXRlRG9jdW1lbnRUeXBlID0gZnVuY3Rpb24ocXVhbGlmaWVkTmFtZSwgcHVibGljSWQsIHN5c3RlbUlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuXG4gICAgWE1MRE9NSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmNyZWF0ZURvY3VtZW50ID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBxdWFsaWZpZWROYW1lLCBkb2N0eXBlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuXG4gICAgWE1MRE9NSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmNyZWF0ZUhUTUxEb2N1bWVudCA9IGZ1bmN0aW9uKHRpdGxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuXG4gICAgWE1MRE9NSW1wbGVtZW50YXRpb24ucHJvdG90eXBlLmdldEZlYXR1cmUgPSBmdW5jdGlvbihmZWF0dXJlLCB2ZXJzaW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERPTUltcGxlbWVudGF0aW9uO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MRE9NU3RyaW5nTGlzdDtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTERPTVN0cmluZ0xpc3QgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MRE9NU3RyaW5nTGlzdChhcnIpIHtcbiAgICAgIHRoaXMuYXJyID0gYXJyIHx8IFtdO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxET01TdHJpbmdMaXN0LnByb3RvdHlwZSwgJ2xlbmd0aCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyci5sZW5ndGg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxET01TdHJpbmdMaXN0LnByb3RvdHlwZS5pdGVtID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgIHJldHVybiB0aGlzLmFycltpbmRleF0gfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgWE1MRE9NU3RyaW5nTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHJldHVybiB0aGlzLmFyci5pbmRleE9mKHN0cikgIT09IC0xO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRE9NU3RyaW5nTGlzdDtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxEVERBdHRMaXN0LCBYTUxOb2RlLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRFREQXR0TGlzdCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTERUREF0dExpc3QsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MRFREQXR0TGlzdChwYXJlbnQsIGVsZW1lbnROYW1lLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVUeXBlLCBkZWZhdWx0VmFsdWVUeXBlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIFhNTERUREF0dExpc3QuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIGlmIChlbGVtZW50TmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgRFREIGVsZW1lbnQgbmFtZS4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBEVEQgYXR0cmlidXRlIG5hbWUuIFwiICsgdGhpcy5kZWJ1Z0luZm8oZWxlbWVudE5hbWUpKTtcbiAgICAgIH1cbiAgICAgIGlmICghYXR0cmlidXRlVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIERURCBhdHRyaWJ1dGUgdHlwZS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhlbGVtZW50TmFtZSkpO1xuICAgICAgfVxuICAgICAgaWYgKCFkZWZhdWx0VmFsdWVUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgRFREIGF0dHJpYnV0ZSBkZWZhdWx0LiBcIiArIHRoaXMuZGVidWdJbmZvKGVsZW1lbnROYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAoZGVmYXVsdFZhbHVlVHlwZS5pbmRleE9mKCcjJykgIT09IDApIHtcbiAgICAgICAgZGVmYXVsdFZhbHVlVHlwZSA9ICcjJyArIGRlZmF1bHRWYWx1ZVR5cGU7XG4gICAgICB9XG4gICAgICBpZiAoIWRlZmF1bHRWYWx1ZVR5cGUubWF0Y2goL14oI1JFUVVJUkVEfCNJTVBMSUVEfCNGSVhFRHwjREVGQVVMVCkkLykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkZWZhdWx0IHZhbHVlIHR5cGU7IGV4cGVjdGVkOiAjUkVRVUlSRUQsICNJTVBMSUVELCAjRklYRUQgb3IgI0RFRkFVTFQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oZWxlbWVudE5hbWUpKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWZhdWx0VmFsdWUgJiYgIWRlZmF1bHRWYWx1ZVR5cGUubWF0Y2goL14oI0ZJWEVEfCNERUZBVUxUKSQvKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEZWZhdWx0IHZhbHVlIG9ubHkgYXBwbGllcyB0byAjRklYRUQgb3IgI0RFRkFVTFQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oZWxlbWVudE5hbWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZWxlbWVudE5hbWUgPSB0aGlzLnN0cmluZ2lmeS5uYW1lKGVsZW1lbnROYW1lKTtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkF0dHJpYnV0ZURlY2xhcmF0aW9uO1xuICAgICAgdGhpcy5hdHRyaWJ1dGVOYW1lID0gdGhpcy5zdHJpbmdpZnkubmFtZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgIHRoaXMuYXR0cmlidXRlVHlwZSA9IHRoaXMuc3RyaW5naWZ5LmR0ZEF0dFR5cGUoYXR0cmlidXRlVHlwZSk7XG4gICAgICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gdGhpcy5zdHJpbmdpZnkuZHRkQXR0RGVmYXVsdChkZWZhdWx0VmFsdWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWZhdWx0VmFsdWVUeXBlID0gZGVmYXVsdFZhbHVlVHlwZTtcbiAgICB9XG5cbiAgICBYTUxEVERBdHRMaXN0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmR0ZEF0dExpc3QodGhpcywgdGhpcy5vcHRpb25zLndyaXRlci5maWx0ZXJPcHRpb25zKG9wdGlvbnMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTERUREF0dExpc3Q7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTERUREVsZW1lbnQsIFhNTE5vZGUsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBYTUxOb2RlID0gcmVxdWlyZSgnLi9YTUxOb2RlJyk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxEVERFbGVtZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MRFRERWxlbWVudCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxEVERFbGVtZW50KHBhcmVudCwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIFhNTERUREVsZW1lbnQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBEVEQgZWxlbWVudCBuYW1lLiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB2YWx1ZSA9ICcoI1BDREFUQSknO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gJygnICsgdmFsdWUuam9pbignLCcpICsgJyknO1xuICAgICAgfVxuICAgICAgdGhpcy5uYW1lID0gdGhpcy5zdHJpbmdpZnkubmFtZShuYW1lKTtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkVsZW1lbnREZWNsYXJhdGlvbjtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnN0cmluZ2lmeS5kdGRFbGVtZW50VmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIFhNTERUREVsZW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53cml0ZXIuZHRkRWxlbWVudCh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRFRERWxlbWVudDtcblxuICB9KShYTUxOb2RlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MRFRERW50aXR5LCBYTUxOb2RlLCBpc09iamVjdCxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9VdGlsaXR5JykuaXNPYmplY3Q7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRFRERW50aXR5ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MRFRERW50aXR5LCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTERUREVudGl0eShwYXJlbnQsIHBlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgWE1MRFRERW50aXR5Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgRFREIGVudGl0eSBuYW1lLiBcIiArIHRoaXMuZGVidWdJbmZvKG5hbWUpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgRFREIGVudGl0eSB2YWx1ZS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnBlID0gISFwZTtcbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuc3RyaW5naWZ5Lm5hbWUobmFtZSk7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5FbnRpdHlEZWNsYXJhdGlvbjtcbiAgICAgIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnN0cmluZ2lmeS5kdGRFbnRpdHlWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuaW50ZXJuYWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF2YWx1ZS5wdWJJRCAmJiAhdmFsdWUuc3lzSUQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQdWJsaWMgYW5kL29yIHN5c3RlbSBpZGVudGlmaWVycyBhcmUgcmVxdWlyZWQgZm9yIGFuIGV4dGVybmFsIGVudGl0eS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlLnB1YklEICYmICF2YWx1ZS5zeXNJRCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlN5c3RlbSBpZGVudGlmaWVyIGlzIHJlcXVpcmVkIGZvciBhIHB1YmxpYyBleHRlcm5hbCBlbnRpdHkuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW50ZXJuYWwgPSBmYWxzZTtcbiAgICAgICAgaWYgKHZhbHVlLnB1YklEICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnB1YklEID0gdGhpcy5zdHJpbmdpZnkuZHRkUHViSUQodmFsdWUucHViSUQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5zeXNJRCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5zeXNJRCA9IHRoaXMuc3RyaW5naWZ5LmR0ZFN5c0lEKHZhbHVlLnN5c0lEKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUubkRhdGEgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubkRhdGEgPSB0aGlzLnN0cmluZ2lmeS5kdGRORGF0YSh2YWx1ZS5uRGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGUgJiYgdGhpcy5uRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdGF0aW9uIGRlY2xhcmF0aW9uIGlzIG5vdCBhbGxvd2VkIGluIGEgcGFyYW1ldGVyIGVudGl0eS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRFRERW50aXR5LnByb3RvdHlwZSwgJ3B1YmxpY0lkJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHViSUQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRFRERW50aXR5LnByb3RvdHlwZSwgJ3N5c3RlbUlkJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzSUQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRFRERW50aXR5LnByb3RvdHlwZSwgJ25vdGF0aW9uTmFtZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5EYXRhIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRFRERW50aXR5LnByb3RvdHlwZSwgJ2lucHV0RW5jb2RpbmcnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEVERFbnRpdHkucHJvdG90eXBlLCAneG1sRW5jb2RpbmcnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEVERFbnRpdHkucHJvdG90eXBlLCAneG1sVmVyc2lvbicsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MRFRERW50aXR5LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmR0ZEVudGl0eSh0aGlzLCB0aGlzLm9wdGlvbnMud3JpdGVyLmZpbHRlck9wdGlvbnMob3B0aW9ucykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRFRERW50aXR5O1xuXG4gIH0pKFhNTE5vZGUpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxEVEROb3RhdGlvbiwgWE1MTm9kZSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTERURE5vdGF0aW9uID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MRFRETm90YXRpb24sIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MRFRETm90YXRpb24ocGFyZW50LCBuYW1lLCB2YWx1ZSkge1xuICAgICAgWE1MRFRETm90YXRpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBEVEQgbm90YXRpb24gbmFtZS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAoIXZhbHVlLnB1YklEICYmICF2YWx1ZS5zeXNJRCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQdWJsaWMgb3Igc3lzdGVtIGlkZW50aWZpZXJzIGFyZSByZXF1aXJlZCBmb3IgYW4gZXh0ZXJuYWwgZW50aXR5LiBcIiArIHRoaXMuZGVidWdJbmZvKG5hbWUpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IHRoaXMuc3RyaW5naWZ5Lm5hbWUobmFtZSk7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5Ob3RhdGlvbkRlY2xhcmF0aW9uO1xuICAgICAgaWYgKHZhbHVlLnB1YklEICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wdWJJRCA9IHRoaXMuc3RyaW5naWZ5LmR0ZFB1YklEKHZhbHVlLnB1YklEKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZS5zeXNJRCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3lzSUQgPSB0aGlzLnN0cmluZ2lmeS5kdGRTeXNJRCh2YWx1ZS5zeXNJRCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERURE5vdGF0aW9uLnByb3RvdHlwZSwgJ3B1YmxpY0lkJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHViSUQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRFRETm90YXRpb24ucHJvdG90eXBlLCAnc3lzdGVtSWQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXNJRDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTERURE5vdGF0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmR0ZE5vdGF0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxEVEROb3RhdGlvbjtcblxuICB9KShYTUxOb2RlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MRGVjbGFyYXRpb24sIFhNTE5vZGUsIGlzT2JqZWN0LFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgaXNPYmplY3QgPSByZXF1aXJlKCcuL1V0aWxpdHknKS5pc09iamVjdDtcblxuICBYTUxOb2RlID0gcmVxdWlyZSgnLi9YTUxOb2RlJyk7XG5cbiAgTm9kZVR5cGUgPSByZXF1aXJlKCcuL05vZGVUeXBlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxEZWNsYXJhdGlvbiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTERlY2xhcmF0aW9uLCBzdXBlckNsYXNzKTtcblxuICAgIGZ1bmN0aW9uIFhNTERlY2xhcmF0aW9uKHBhcmVudCwgdmVyc2lvbiwgZW5jb2RpbmcsIHN0YW5kYWxvbmUpIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBYTUxEZWNsYXJhdGlvbi5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgaWYgKGlzT2JqZWN0KHZlcnNpb24pKSB7XG4gICAgICAgIHJlZiA9IHZlcnNpb24sIHZlcnNpb24gPSByZWYudmVyc2lvbiwgZW5jb2RpbmcgPSByZWYuZW5jb2RpbmcsIHN0YW5kYWxvbmUgPSByZWYuc3RhbmRhbG9uZTtcbiAgICAgIH1cbiAgICAgIGlmICghdmVyc2lvbikge1xuICAgICAgICB2ZXJzaW9uID0gJzEuMCc7XG4gICAgICB9XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5EZWNsYXJhdGlvbjtcbiAgICAgIHRoaXMudmVyc2lvbiA9IHRoaXMuc3RyaW5naWZ5LnhtbFZlcnNpb24odmVyc2lvbik7XG4gICAgICBpZiAoZW5jb2RpbmcgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVuY29kaW5nID0gdGhpcy5zdHJpbmdpZnkueG1sRW5jb2RpbmcoZW5jb2RpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKHN0YW5kYWxvbmUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnN0YW5kYWxvbmUgPSB0aGlzLnN0cmluZ2lmeS54bWxTdGFuZGFsb25lKHN0YW5kYWxvbmUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIFhNTERlY2xhcmF0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmRlY2xhcmF0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxEZWNsYXJhdGlvbjtcblxuICB9KShYTUxOb2RlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MRFREQXR0TGlzdCwgWE1MRFRERWxlbWVudCwgWE1MRFRERW50aXR5LCBYTUxEVEROb3RhdGlvbiwgWE1MRG9jVHlwZSwgWE1MTmFtZWROb2RlTWFwLCBYTUxOb2RlLCBpc09iamVjdCxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9VdGlsaXR5JykuaXNPYmplY3Q7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIFhNTERUREF0dExpc3QgPSByZXF1aXJlKCcuL1hNTERUREF0dExpc3QnKTtcblxuICBYTUxEVERFbnRpdHkgPSByZXF1aXJlKCcuL1hNTERUREVudGl0eScpO1xuXG4gIFhNTERUREVsZW1lbnQgPSByZXF1aXJlKCcuL1hNTERUREVsZW1lbnQnKTtcblxuICBYTUxEVEROb3RhdGlvbiA9IHJlcXVpcmUoJy4vWE1MRFRETm90YXRpb24nKTtcblxuICBYTUxOYW1lZE5vZGVNYXAgPSByZXF1aXJlKCcuL1hNTE5hbWVkTm9kZU1hcCcpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRG9jVHlwZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTERvY1R5cGUsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MRG9jVHlwZShwYXJlbnQsIHB1YklELCBzeXNJRCkge1xuICAgICAgdmFyIGNoaWxkLCBpLCBsZW4sIHJlZiwgcmVmMSwgcmVmMjtcbiAgICAgIFhNTERvY1R5cGUuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkRvY1R5cGU7XG4gICAgICBpZiAocGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgIHJlZiA9IHBhcmVudC5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgY2hpbGQgPSByZWZbaV07XG4gICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGNoaWxkLm5hbWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuZG9jdW1lbnRPYmplY3QgPSBwYXJlbnQ7XG4gICAgICBpZiAoaXNPYmplY3QocHViSUQpKSB7XG4gICAgICAgIHJlZjEgPSBwdWJJRCwgcHViSUQgPSByZWYxLnB1YklELCBzeXNJRCA9IHJlZjEuc3lzSUQ7XG4gICAgICB9XG4gICAgICBpZiAoc3lzSUQgPT0gbnVsbCkge1xuICAgICAgICByZWYyID0gW3B1YklELCBzeXNJRF0sIHN5c0lEID0gcmVmMlswXSwgcHViSUQgPSByZWYyWzFdO1xuICAgICAgfVxuICAgICAgaWYgKHB1YklEICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wdWJJRCA9IHRoaXMuc3RyaW5naWZ5LmR0ZFB1YklEKHB1YklEKTtcbiAgICAgIH1cbiAgICAgIGlmIChzeXNJRCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuc3lzSUQgPSB0aGlzLnN0cmluZ2lmeS5kdGRTeXNJRChzeXNJRCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY1R5cGUucHJvdG90eXBlLCAnZW50aXRpZXMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hpbGQsIGksIGxlbiwgbm9kZXMsIHJlZjtcbiAgICAgICAgbm9kZXMgPSB7fTtcbiAgICAgICAgcmVmID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgY2hpbGQgPSByZWZbaV07XG4gICAgICAgICAgaWYgKChjaGlsZC50eXBlID09PSBOb2RlVHlwZS5FbnRpdHlEZWNsYXJhdGlvbikgJiYgIWNoaWxkLnBlKSB7XG4gICAgICAgICAgICBub2Rlc1tjaGlsZC5uYW1lXSA9IGNoaWxkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFhNTE5hbWVkTm9kZU1hcChub2Rlcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jVHlwZS5wcm90b3R5cGUsICdub3RhdGlvbnMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hpbGQsIGksIGxlbiwgbm9kZXMsIHJlZjtcbiAgICAgICAgbm9kZXMgPSB7fTtcbiAgICAgICAgcmVmID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgY2hpbGQgPSByZWZbaV07XG4gICAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09IE5vZGVUeXBlLk5vdGF0aW9uRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICAgIG5vZGVzW2NoaWxkLm5hbWVdID0gY2hpbGQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgWE1MTmFtZWROb2RlTWFwKG5vZGVzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2NUeXBlLnByb3RvdHlwZSwgJ3B1YmxpY0lkJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHViSUQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jVHlwZS5wcm90b3R5cGUsICdzeXN0ZW1JZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c0lEO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY1R5cGUucHJvdG90eXBlLCAnaW50ZXJuYWxTdWJzZXQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS5lbGVtZW50ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTERUREVsZW1lbnQodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS5hdHRMaXN0ID0gZnVuY3Rpb24oZWxlbWVudE5hbWUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVR5cGUsIGRlZmF1bHRWYWx1ZVR5cGUsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgdmFyIGNoaWxkO1xuICAgICAgY2hpbGQgPSBuZXcgWE1MRFREQXR0TGlzdCh0aGlzLCBlbGVtZW50TmFtZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVHlwZSwgZGVmYXVsdFZhbHVlVHlwZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUuZW50aXR5ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTERUREVudGl0eSh0aGlzLCBmYWxzZSwgbmFtZSwgdmFsdWUpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2NUeXBlLnByb3RvdHlwZS5wRW50aXR5ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTERUREVudGl0eSh0aGlzLCB0cnVlLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLm5vdGF0aW9uID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTERURE5vdGF0aW9uKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci5kb2NUeXBlKHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLmVsZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50KG5hbWUsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUuYXR0ID0gZnVuY3Rpb24oZWxlbWVudE5hbWUsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVR5cGUsIGRlZmF1bHRWYWx1ZVR5cGUsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0TGlzdChlbGVtZW50TmFtZSwgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVHlwZSwgZGVmYXVsdFZhbHVlVHlwZSwgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUuZW50ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmVudGl0eShuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLnBlbnQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucEVudGl0eShuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub3RhdGlvbihuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY1R5cGUucHJvdG90eXBlLnVwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5yb290KCkgfHwgdGhpcy5kb2N1bWVudE9iamVjdDtcbiAgICB9O1xuXG4gICAgWE1MRG9jVHlwZS5wcm90b3R5cGUuaXNFcXVhbE5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAoIVhNTERvY1R5cGUuX19zdXBlcl9fLmlzRXF1YWxOb2RlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykuaXNFcXVhbE5vZGUobm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubmFtZSAhPT0gdGhpcy5uYW1lKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnB1YmxpY0lkICE9PSB0aGlzLnB1YmxpY0lkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnN5c3RlbUlkICE9PSB0aGlzLnN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MRG9jVHlwZTtcblxuICB9KShYTUxOb2RlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MRE9NQ29uZmlndXJhdGlvbiwgWE1MRE9NSW1wbGVtZW50YXRpb24sIFhNTERvY3VtZW50LCBYTUxOb2RlLCBYTUxTdHJpbmdXcml0ZXIsIFhNTFN0cmluZ2lmaWVyLCBpc1BsYWluT2JqZWN0LFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4vVXRpbGl0eScpLmlzUGxhaW5PYmplY3Q7XG5cbiAgWE1MRE9NSW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL1hNTERPTUltcGxlbWVudGF0aW9uJyk7XG5cbiAgWE1MRE9NQ29uZmlndXJhdGlvbiA9IHJlcXVpcmUoJy4vWE1MRE9NQ29uZmlndXJhdGlvbicpO1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxTdHJpbmdpZmllciA9IHJlcXVpcmUoJy4vWE1MU3RyaW5naWZpZXInKTtcblxuICBYTUxTdHJpbmdXcml0ZXIgPSByZXF1aXJlKCcuL1hNTFN0cmluZ1dyaXRlcicpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRG9jdW1lbnQgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxEb2N1bWVudCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxEb2N1bWVudChvcHRpb25zKSB7XG4gICAgICBYTUxEb2N1bWVudC5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBudWxsKTtcbiAgICAgIHRoaXMubmFtZSA9IFwiI2RvY3VtZW50XCI7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5Eb2N1bWVudDtcbiAgICAgIHRoaXMuZG9jdW1lbnRVUkkgPSBudWxsO1xuICAgICAgdGhpcy5kb21Db25maWcgPSBuZXcgWE1MRE9NQ29uZmlndXJhdGlvbigpO1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgIGlmICghb3B0aW9ucy53cml0ZXIpIHtcbiAgICAgICAgb3B0aW9ucy53cml0ZXIgPSBuZXcgWE1MU3RyaW5nV3JpdGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdGhpcy5zdHJpbmdpZnkgPSBuZXcgWE1MU3RyaW5naWZpZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ2ltcGxlbWVudGF0aW9uJywge1xuICAgICAgdmFsdWU6IG5ldyBYTUxET01JbXBsZW1lbnRhdGlvbigpXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAnZG9jdHlwZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjaGlsZCwgaSwgbGVuLCByZWY7XG4gICAgICAgIHJlZiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSBOb2RlVHlwZS5Eb2NUeXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ2RvY3VtZW50RWxlbWVudCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3RPYmplY3QgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICdpbnB1dEVuY29kaW5nJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAnc3RyaWN0RXJyb3JDaGVja2luZycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICd4bWxFbmNvZGluZycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMCAmJiB0aGlzLmNoaWxkcmVuWzBdLnR5cGUgPT09IE5vZGVUeXBlLkRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW5bMF0uZW5jb2Rpbmc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICd4bWxTdGFuZGFsb25lJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAwICYmIHRoaXMuY2hpbGRyZW5bMF0udHlwZSA9PT0gTm9kZVR5cGUuRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS5zdGFuZGFsb25lID09PSAneWVzJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxEb2N1bWVudC5wcm90b3R5cGUsICd4bWxWZXJzaW9uJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAwICYmIHRoaXMuY2hpbGRyZW5bMF0udHlwZSA9PT0gTm9kZVR5cGUuRGVjbGFyYXRpb24pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlblswXS52ZXJzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBcIjEuMFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAnVVJMJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnRVUkk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAnb3JpZ2luJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MRG9jdW1lbnQucHJvdG90eXBlLCAnY29tcGF0TW9kZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ2NoYXJhY3RlclNldCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTERvY3VtZW50LnByb3RvdHlwZSwgJ2NvbnRlbnRUeXBlJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24od3JpdGVyKSB7XG4gICAgICB2YXIgd3JpdGVyT3B0aW9ucztcbiAgICAgIHdyaXRlck9wdGlvbnMgPSB7fTtcbiAgICAgIGlmICghd3JpdGVyKSB7XG4gICAgICAgIHdyaXRlciA9IHRoaXMub3B0aW9ucy53cml0ZXI7XG4gICAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qod3JpdGVyKSkge1xuICAgICAgICB3cml0ZXJPcHRpb25zID0gd3JpdGVyO1xuICAgICAgICB3cml0ZXIgPSB0aGlzLm9wdGlvbnMud3JpdGVyO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyaXRlci5kb2N1bWVudCh0aGlzLCB3cml0ZXIuZmlsdGVyT3B0aW9ucyh3cml0ZXJPcHRpb25zKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmRvY3VtZW50KHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24odGFnTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlVGV4dE5vZGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVDb21tZW50ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQ0RBVEFTZWN0aW9uID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlUHJvY2Vzc2luZ0luc3RydWN0aW9uID0gZnVuY3Rpb24odGFyZ2V0LCBkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFbnRpdHlSZWZlcmVuY2UgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IGZ1bmN0aW9uKHRhZ25hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmltcG9ydE5vZGUgPSBmdW5jdGlvbihpbXBvcnRlZE5vZGUsIGRlZXApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmNyZWF0ZUVsZW1lbnROUyA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgcXVhbGlmaWVkTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQXR0cmlidXRlTlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lTlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIGxvY2FsTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbihlbGVtZW50SWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmFkb3B0Tm9kZSA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUubm9ybWFsaXplRG9jdW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLnJlbmFtZU5vZGUgPSBmdW5jdGlvbihub2RlLCBuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjbGFzc05hbWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50SW50ZXJmYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVSYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlTm9kZUl0ZXJhdG9yID0gZnVuY3Rpb24ocm9vdCwgd2hhdFRvU2hvdywgZmlsdGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVUcmVlV2Fsa2VyID0gZnVuY3Rpb24ocm9vdCwgd2hhdFRvU2hvdywgZmlsdGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxEb2N1bWVudDtcblxuICB9KShYTUxOb2RlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgV3JpdGVyU3RhdGUsIFhNTEF0dHJpYnV0ZSwgWE1MQ0RhdGEsIFhNTENvbW1lbnQsIFhNTERUREF0dExpc3QsIFhNTERUREVsZW1lbnQsIFhNTERUREVudGl0eSwgWE1MRFRETm90YXRpb24sIFhNTERlY2xhcmF0aW9uLCBYTUxEb2NUeXBlLCBYTUxEb2N1bWVudCwgWE1MRG9jdW1lbnRDQiwgWE1MRWxlbWVudCwgWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uLCBYTUxSYXcsIFhNTFN0cmluZ1dyaXRlciwgWE1MU3RyaW5naWZpZXIsIFhNTFRleHQsIGdldFZhbHVlLCBpc0Z1bmN0aW9uLCBpc09iamVjdCwgaXNQbGFpbk9iamVjdCwgcmVmLFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICByZWYgPSByZXF1aXJlKCcuL1V0aWxpdHknKSwgaXNPYmplY3QgPSByZWYuaXNPYmplY3QsIGlzRnVuY3Rpb24gPSByZWYuaXNGdW5jdGlvbiwgaXNQbGFpbk9iamVjdCA9IHJlZi5pc1BsYWluT2JqZWN0LCBnZXRWYWx1ZSA9IHJlZi5nZXRWYWx1ZTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxEb2N1bWVudCA9IHJlcXVpcmUoJy4vWE1MRG9jdW1lbnQnKTtcblxuICBYTUxFbGVtZW50ID0gcmVxdWlyZSgnLi9YTUxFbGVtZW50Jyk7XG5cbiAgWE1MQ0RhdGEgPSByZXF1aXJlKCcuL1hNTENEYXRhJyk7XG5cbiAgWE1MQ29tbWVudCA9IHJlcXVpcmUoJy4vWE1MQ29tbWVudCcpO1xuXG4gIFhNTFJhdyA9IHJlcXVpcmUoJy4vWE1MUmF3Jyk7XG5cbiAgWE1MVGV4dCA9IHJlcXVpcmUoJy4vWE1MVGV4dCcpO1xuXG4gIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IHJlcXVpcmUoJy4vWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uJyk7XG5cbiAgWE1MRGVjbGFyYXRpb24gPSByZXF1aXJlKCcuL1hNTERlY2xhcmF0aW9uJyk7XG5cbiAgWE1MRG9jVHlwZSA9IHJlcXVpcmUoJy4vWE1MRG9jVHlwZScpO1xuXG4gIFhNTERUREF0dExpc3QgPSByZXF1aXJlKCcuL1hNTERUREF0dExpc3QnKTtcblxuICBYTUxEVERFbnRpdHkgPSByZXF1aXJlKCcuL1hNTERUREVudGl0eScpO1xuXG4gIFhNTERUREVsZW1lbnQgPSByZXF1aXJlKCcuL1hNTERUREVsZW1lbnQnKTtcblxuICBYTUxEVEROb3RhdGlvbiA9IHJlcXVpcmUoJy4vWE1MRFRETm90YXRpb24nKTtcblxuICBYTUxBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL1hNTEF0dHJpYnV0ZScpO1xuXG4gIFhNTFN0cmluZ2lmaWVyID0gcmVxdWlyZSgnLi9YTUxTdHJpbmdpZmllcicpO1xuXG4gIFhNTFN0cmluZ1dyaXRlciA9IHJlcXVpcmUoJy4vWE1MU3RyaW5nV3JpdGVyJyk7XG5cbiAgV3JpdGVyU3RhdGUgPSByZXF1aXJlKCcuL1dyaXRlclN0YXRlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxEb2N1bWVudENCID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTERvY3VtZW50Q0Iob3B0aW9ucywgb25EYXRhLCBvbkVuZCkge1xuICAgICAgdmFyIHdyaXRlck9wdGlvbnM7XG4gICAgICB0aGlzLm5hbWUgPSBcIj94bWxcIjtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkRvY3VtZW50O1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgIHdyaXRlck9wdGlvbnMgPSB7fTtcbiAgICAgIGlmICghb3B0aW9ucy53cml0ZXIpIHtcbiAgICAgICAgb3B0aW9ucy53cml0ZXIgPSBuZXcgWE1MU3RyaW5nV3JpdGVyKCk7XG4gICAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qob3B0aW9ucy53cml0ZXIpKSB7XG4gICAgICAgIHdyaXRlck9wdGlvbnMgPSBvcHRpb25zLndyaXRlcjtcbiAgICAgICAgb3B0aW9ucy53cml0ZXIgPSBuZXcgWE1MU3RyaW5nV3JpdGVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgdGhpcy53cml0ZXIgPSBvcHRpb25zLndyaXRlcjtcbiAgICAgIHRoaXMud3JpdGVyT3B0aW9ucyA9IHRoaXMud3JpdGVyLmZpbHRlck9wdGlvbnMod3JpdGVyT3B0aW9ucyk7XG4gICAgICB0aGlzLnN0cmluZ2lmeSA9IG5ldyBYTUxTdHJpbmdpZmllcihvcHRpb25zKTtcbiAgICAgIHRoaXMub25EYXRhQ2FsbGJhY2sgPSBvbkRhdGEgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICAgIHRoaXMub25FbmRDYWxsYmFjayA9IG9uRW5kIHx8IGZ1bmN0aW9uKCkge307XG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgIHRoaXMuY3VycmVudExldmVsID0gLTE7XG4gICAgICB0aGlzLm9wZW5UYWdzID0ge307XG4gICAgICB0aGlzLmRvY3VtZW50U3RhcnRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5kb2N1bWVudENvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5yb290ID0gbnVsbDtcbiAgICB9XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5jcmVhdGVDaGlsZE5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgYXR0LCBhdHROYW1lLCBhdHRyaWJ1dGVzLCBjaGlsZCwgaSwgbGVuLCByZWYxLCByZWYyO1xuICAgICAgc3dpdGNoIChub2RlLnR5cGUpIHtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5DRGF0YTpcbiAgICAgICAgICB0aGlzLmNkYXRhKG5vZGUudmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkNvbW1lbnQ6XG4gICAgICAgICAgdGhpcy5jb21tZW50KG5vZGUudmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkVsZW1lbnQ6XG4gICAgICAgICAgYXR0cmlidXRlcyA9IHt9O1xuICAgICAgICAgIHJlZjEgPSBub2RlLmF0dHJpYnM7XG4gICAgICAgICAgZm9yIChhdHROYW1lIGluIHJlZjEpIHtcbiAgICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZjEsIGF0dE5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICAgIGF0dCA9IHJlZjFbYXR0TmFtZV07XG4gICAgICAgICAgICBhdHRyaWJ1dGVzW2F0dE5hbWVdID0gYXR0LnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm5vZGUobm9kZS5uYW1lLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5EdW1teTpcbiAgICAgICAgICB0aGlzLmR1bW15KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuUmF3OlxuICAgICAgICAgIHRoaXMucmF3KG5vZGUudmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLlRleHQ6XG4gICAgICAgICAgdGhpcy50ZXh0KG5vZGUudmFsdWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLlByb2Nlc3NpbmdJbnN0cnVjdGlvbjpcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9uKG5vZGUudGFyZ2V0LCBub2RlLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIFhNTCBub2RlIHR5cGUgaXMgbm90IHN1cHBvcnRlZCBpbiBhIEpTIG9iamVjdDogXCIgKyBub2RlLmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgfVxuICAgICAgcmVmMiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNoaWxkID0gcmVmMltpXTtcbiAgICAgICAgdGhpcy5jcmVhdGVDaGlsZE5vZGUoY2hpbGQpO1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCkge1xuICAgICAgICAgIHRoaXMudXAoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmR1bW15ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUubm9kZSA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHZhciByZWYxO1xuICAgICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIG5vZGUgbmFtZS5cIik7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5yb290ICYmIHRoaXMuY3VycmVudExldmVsID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEb2N1bWVudCBjYW4gb25seSBoYXZlIG9uZSByb290IG5vZGUuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgfVxuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbmFtZSA9IGdldFZhbHVlKG5hbWUpO1xuICAgICAgaWYgKGF0dHJpYnV0ZXMgPT0gbnVsbCkge1xuICAgICAgICBhdHRyaWJ1dGVzID0ge307XG4gICAgICB9XG4gICAgICBhdHRyaWJ1dGVzID0gZ2V0VmFsdWUoYXR0cmlidXRlcyk7XG4gICAgICBpZiAoIWlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIHJlZjEgPSBbYXR0cmlidXRlcywgdGV4dF0sIHRleHQgPSByZWYxWzBdLCBhdHRyaWJ1dGVzID0gcmVmMVsxXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBuZXcgWE1MRWxlbWVudCh0aGlzLCBuYW1lLCBhdHRyaWJ1dGVzKTtcbiAgICAgIHRoaXMuY3VycmVudE5vZGUuY2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgIHRoaXMuY3VycmVudExldmVsKys7XG4gICAgICB0aGlzLm9wZW5UYWdzW3RoaXMuY3VycmVudExldmVsXSA9IHRoaXMuY3VycmVudE5vZGU7XG4gICAgICBpZiAodGV4dCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudGV4dCh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5lbGVtZW50ID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgdmFyIGNoaWxkLCBpLCBsZW4sIG9sZFZhbGlkYXRpb25GbGFnLCByZWYxLCByb290O1xuICAgICAgaWYgKHRoaXMuY3VycmVudE5vZGUgJiYgdGhpcy5jdXJyZW50Tm9kZS50eXBlID09PSBOb2RlVHlwZS5Eb2NUeXBlKSB7XG4gICAgICAgIHRoaXMuZHRkRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkgfHwgaXNPYmplY3QobmFtZSkgfHwgaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgICAgIG9sZFZhbGlkYXRpb25GbGFnID0gdGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbjtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICByb290ID0gbmV3IFhNTERvY3VtZW50KHRoaXMub3B0aW9ucykuZWxlbWVudCgnVEVNUF9ST09UJyk7XG4gICAgICAgICAgcm9vdC5lbGVtZW50KG5hbWUpO1xuICAgICAgICAgIHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24gPSBvbGRWYWxpZGF0aW9uRmxhZztcbiAgICAgICAgICByZWYxID0gcm9vdC5jaGlsZHJlbjtcbiAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjaGlsZCA9IHJlZjFbaV07XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUNoaWxkTm9kZShjaGlsZCk7XG4gICAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCkge1xuICAgICAgICAgICAgICB0aGlzLnVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubm9kZShuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgYXR0TmFtZSwgYXR0VmFsdWU7XG4gICAgICBpZiAoIXRoaXMuY3VycmVudE5vZGUgfHwgdGhpcy5jdXJyZW50Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhdHQoKSBjYW4gb25seSBiZSB1c2VkIGltbWVkaWF0ZWx5IGFmdGVyIGFuIGVsZSgpIGNhbGwgaW4gY2FsbGJhY2sgbW9kZS4gXCIgKyB0aGlzLmRlYnVnSW5mbyhuYW1lKSk7XG4gICAgICB9XG4gICAgICBpZiAobmFtZSAhPSBudWxsKSB7XG4gICAgICAgIG5hbWUgPSBnZXRWYWx1ZShuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgICAgICBmb3IgKGF0dE5hbWUgaW4gbmFtZSkge1xuICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKG5hbWUsIGF0dE5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICBhdHRWYWx1ZSA9IG5hbWVbYXR0TmFtZV07XG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGUoYXR0TmFtZSwgYXR0VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZWVwTnVsbEF0dHJpYnV0ZXMgJiYgKHZhbHVlID09IG51bGwpKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Tm9kZS5hdHRyaWJzW25hbWVdID0gbmV3IFhNTEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCBcIlwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50Tm9kZS5hdHRyaWJzW25hbWVdID0gbmV3IFhNTEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbm9kZSA9IG5ldyBYTUxUZXh0KHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMub25EYXRhKHRoaXMud3JpdGVyLnRleHQobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmNkYXRhID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbm9kZSA9IG5ldyBYTUxDRGF0YSh0aGlzLCB2YWx1ZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5jZGF0YShub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuY29tbWVudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIG5vZGUgPSBuZXcgWE1MQ29tbWVudCh0aGlzLCB2YWx1ZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5jb21tZW50KG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKSwgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5yYXcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICB0aGlzLm9wZW5DdXJyZW50KCk7XG4gICAgICBub2RlID0gbmV3IFhNTFJhdyh0aGlzLCB2YWx1ZSk7XG4gICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5yYXcobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmluc3RydWN0aW9uID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgdmFyIGksIGluc1RhcmdldCwgaW5zVmFsdWUsIGxlbiwgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICB0YXJnZXQgPSBnZXRWYWx1ZSh0YXJnZXQpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSBnZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHRhcmdldC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGluc1RhcmdldCA9IHRhcmdldFtpXTtcbiAgICAgICAgICB0aGlzLmluc3RydWN0aW9uKGluc1RhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodGFyZ2V0KSkge1xuICAgICAgICBmb3IgKGluc1RhcmdldCBpbiB0YXJnZXQpIHtcbiAgICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbCh0YXJnZXQsIGluc1RhcmdldCkpIGNvbnRpbnVlO1xuICAgICAgICAgIGluc1ZhbHVlID0gdGFyZ2V0W2luc1RhcmdldF07XG4gICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbihpbnNUYXJnZXQsIGluc1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5hcHBseSgpO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUgPSBuZXcgWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uKHRoaXMsIHRhcmdldCwgdmFsdWUpO1xuICAgICAgICB0aGlzLm9uRGF0YSh0aGlzLndyaXRlci5wcm9jZXNzaW5nSW5zdHJ1Y3Rpb24obm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpLCB0aGlzLmN1cnJlbnRMZXZlbCArIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmRlY2xhcmF0aW9uID0gZnVuY3Rpb24odmVyc2lvbiwgZW5jb2RpbmcsIHN0YW5kYWxvbmUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgaWYgKHRoaXMuZG9jdW1lbnRTdGFydGVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImRlY2xhcmF0aW9uKCkgbXVzdCBiZSB0aGUgZmlyc3Qgbm9kZS5cIik7XG4gICAgICB9XG4gICAgICBub2RlID0gbmV3IFhNTERlY2xhcmF0aW9uKHRoaXMsIHZlcnNpb24sIGVuY29kaW5nLCBzdGFuZGFsb25lKTtcbiAgICAgIHRoaXMub25EYXRhKHRoaXMud3JpdGVyLmRlY2xhcmF0aW9uKG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKSwgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5kb2N0eXBlID0gZnVuY3Rpb24ocm9vdCwgcHViSUQsIHN5c0lEKSB7XG4gICAgICB0aGlzLm9wZW5DdXJyZW50KCk7XG4gICAgICBpZiAocm9vdCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3Npbmcgcm9vdCBub2RlIG5hbWUuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkdGQoKSBtdXN0IGNvbWUgYmVmb3JlIHRoZSByb290IG5vZGUuXCIpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IG5ldyBYTUxEb2NUeXBlKHRoaXMsIHB1YklELCBzeXNJRCk7XG4gICAgICB0aGlzLmN1cnJlbnROb2RlLnJvb3ROb2RlTmFtZSA9IHJvb3Q7XG4gICAgICB0aGlzLmN1cnJlbnROb2RlLmNoaWxkcmVuID0gZmFsc2U7XG4gICAgICB0aGlzLmN1cnJlbnRMZXZlbCsrO1xuICAgICAgdGhpcy5vcGVuVGFnc1t0aGlzLmN1cnJlbnRMZXZlbF0gPSB0aGlzLmN1cnJlbnROb2RlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmR0ZEVsZW1lbnQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICB0aGlzLm9wZW5DdXJyZW50KCk7XG4gICAgICBub2RlID0gbmV3IFhNTERUREVsZW1lbnQodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgICAgdGhpcy5vbkRhdGEodGhpcy53cml0ZXIuZHRkRWxlbWVudChub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuYXR0TGlzdCA9IGZ1bmN0aW9uKGVsZW1lbnROYW1lLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVUeXBlLCBkZWZhdWx0VmFsdWVUeXBlLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbm9kZSA9IG5ldyBYTUxEVERBdHRMaXN0KHRoaXMsIGVsZW1lbnROYW1lLCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVUeXBlLCBkZWZhdWx0VmFsdWVUeXBlLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgdGhpcy5vbkRhdGEodGhpcy53cml0ZXIuZHRkQXR0TGlzdChub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuZW50aXR5ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBub2RlO1xuICAgICAgdGhpcy5vcGVuQ3VycmVudCgpO1xuICAgICAgbm9kZSA9IG5ldyBYTUxEVERFbnRpdHkodGhpcywgZmFsc2UsIG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMub25EYXRhKHRoaXMud3JpdGVyLmR0ZEVudGl0eShub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUucEVudGl0eSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgbm9kZTtcbiAgICAgIHRoaXMub3BlbkN1cnJlbnQoKTtcbiAgICAgIG5vZGUgPSBuZXcgWE1MRFRERW50aXR5KHRoaXMsIHRydWUsIG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMub25EYXRhKHRoaXMud3JpdGVyLmR0ZEVudGl0eShub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsICsgMSksIHRoaXMuY3VycmVudExldmVsICsgMSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUubm90YXRpb24gPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICB0aGlzLm9wZW5DdXJyZW50KCk7XG4gICAgICBub2RlID0gbmV3IFhNTERURE5vdGF0aW9uKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgIHRoaXMub25EYXRhKHRoaXMud3JpdGVyLmR0ZE5vdGF0aW9uKG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKSwgdGhpcy5jdXJyZW50TGV2ZWwgKyAxKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudExldmVsIDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZG9jdW1lbnQgbm9kZSBoYXMgbm8gcGFyZW50LlwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmN1cnJlbnROb2RlKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnROb2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU5vZGUodGhpcy5jdXJyZW50Tm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vcGVuTm9kZSh0aGlzLmN1cnJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2xvc2VOb2RlKHRoaXMub3BlblRhZ3NbdGhpcy5jdXJyZW50TGV2ZWxdKTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLm9wZW5UYWdzW3RoaXMuY3VycmVudExldmVsXTtcbiAgICAgIHRoaXMuY3VycmVudExldmVsLS07XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aGlsZSAodGhpcy5jdXJyZW50TGV2ZWwgPj0gMCkge1xuICAgICAgICB0aGlzLnVwKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5vbkVuZCgpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5vcGVuQ3VycmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuY3VycmVudE5vZGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Tm9kZS5jaGlsZHJlbiA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5Ob2RlKHRoaXMuY3VycmVudE5vZGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5vcGVuTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBhdHQsIGNodW5rLCBuYW1lLCByZWYxO1xuICAgICAgaWYgKCFub2RlLmlzT3Blbikge1xuICAgICAgICBpZiAoIXRoaXMucm9vdCAmJiB0aGlzLmN1cnJlbnRMZXZlbCA9PT0gMCAmJiBub2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLnJvb3QgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIGNodW5rID0gJyc7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLndyaXRlck9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgICAgIGNodW5rID0gdGhpcy53cml0ZXIuaW5kZW50KG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwpICsgJzwnICsgbm9kZS5uYW1lO1xuICAgICAgICAgIHJlZjEgPSBub2RlLmF0dHJpYnM7XG4gICAgICAgICAgZm9yIChuYW1lIGluIHJlZjEpIHtcbiAgICAgICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZjEsIG5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICAgIGF0dCA9IHJlZjFbbmFtZV07XG4gICAgICAgICAgICBjaHVuayArPSB0aGlzLndyaXRlci5hdHRyaWJ1dGUoYXR0LCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2h1bmsgKz0gKG5vZGUuY2hpbGRyZW4gPyAnPicgOiAnLz4nKSArIHRoaXMud3JpdGVyLmVuZGxpbmUobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCk7XG4gICAgICAgICAgdGhpcy53cml0ZXJPcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMud3JpdGVyT3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICAgICAgY2h1bmsgPSB0aGlzLndyaXRlci5pbmRlbnQobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCkgKyAnPCFET0NUWVBFICcgKyBub2RlLnJvb3ROb2RlTmFtZTtcbiAgICAgICAgICBpZiAobm9kZS5wdWJJRCAmJiBub2RlLnN5c0lEKSB7XG4gICAgICAgICAgICBjaHVuayArPSAnIFBVQkxJQyBcIicgKyBub2RlLnB1YklEICsgJ1wiIFwiJyArIG5vZGUuc3lzSUQgKyAnXCInO1xuICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5zeXNJRCkge1xuICAgICAgICAgICAgY2h1bmsgKz0gJyBTWVNURU0gXCInICsgbm9kZS5zeXNJRCArICdcIic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjaHVuayArPSAnIFsnO1xuICAgICAgICAgICAgdGhpcy53cml0ZXJPcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlck9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgICAgICAgIGNodW5rICs9ICc+JztcbiAgICAgICAgICB9XG4gICAgICAgICAgY2h1bmsgKz0gdGhpcy53cml0ZXIuZW5kbGluZShub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRGF0YShjaHVuaywgdGhpcy5jdXJyZW50TGV2ZWwpO1xuICAgICAgICByZXR1cm4gbm9kZS5pc09wZW4gPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5jbG9zZU5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICB2YXIgY2h1bms7XG4gICAgICBpZiAoIW5vZGUuaXNDbG9zZWQpIHtcbiAgICAgICAgY2h1bmsgPSAnJztcbiAgICAgICAgdGhpcy53cml0ZXJPcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLkVsZW1lbnQpIHtcbiAgICAgICAgICBjaHVuayA9IHRoaXMud3JpdGVyLmluZGVudChub2RlLCB0aGlzLndyaXRlck9wdGlvbnMsIHRoaXMuY3VycmVudExldmVsKSArICc8LycgKyBub2RlLm5hbWUgKyAnPicgKyB0aGlzLndyaXRlci5lbmRsaW5lKG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNodW5rID0gdGhpcy53cml0ZXIuaW5kZW50KG5vZGUsIHRoaXMud3JpdGVyT3B0aW9ucywgdGhpcy5jdXJyZW50TGV2ZWwpICsgJ10+JyArIHRoaXMud3JpdGVyLmVuZGxpbmUobm9kZSwgdGhpcy53cml0ZXJPcHRpb25zLCB0aGlzLmN1cnJlbnRMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZXJPcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgICAgdGhpcy5vbkRhdGEoY2h1bmssIHRoaXMuY3VycmVudExldmVsKTtcbiAgICAgICAgcmV0dXJuIG5vZGUuaXNDbG9zZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbihjaHVuaywgbGV2ZWwpIHtcbiAgICAgIHRoaXMuZG9jdW1lbnRTdGFydGVkID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLm9uRGF0YUNhbGxiYWNrKGNodW5rLCBsZXZlbCArIDEpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5vbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb2N1bWVudENvbXBsZXRlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5vbkVuZENhbGxiYWNrKCk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmRlYnVnSW5mbyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGlmIChuYW1lID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJub2RlOiA8XCIgKyBuYW1lICsgXCI+XCI7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmVsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5ub2QgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS50eHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmRhdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jZGF0YSh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmNvbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tZW50KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuaW5zID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zdHJ1Y3Rpb24odGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmRlYyA9IGZ1bmN0aW9uKHZlcnNpb24sIGVuY29kaW5nLCBzdGFuZGFsb25lKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWNsYXJhdGlvbih2ZXJzaW9uLCBlbmNvZGluZywgc3RhbmRhbG9uZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmR0ZCA9IGZ1bmN0aW9uKHJvb3QsIHB1YklELCBzeXNJRCkge1xuICAgICAgcmV0dXJuIHRoaXMuZG9jdHlwZShyb290LCBwdWJJRCwgc3lzSUQpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5lID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudChuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUubiA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUobmFtZSwgYXR0cmlidXRlcywgdGV4dCk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuY2RhdGEodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5jID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbW1lbnQodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxEb2N1bWVudENCLnByb3RvdHlwZS5yID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnJhdyh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmkgPSBmdW5jdGlvbih0YXJnZXQsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnN0cnVjdGlvbih0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuYXR0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50Tm9kZSAmJiB0aGlzLmN1cnJlbnROb2RlLnR5cGUgPT09IE5vZGVUeXBlLkRvY1R5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0TGlzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLmEgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnROb2RlICYmIHRoaXMuY3VycmVudE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuRG9jVHlwZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRMaXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MRG9jdW1lbnRDQi5wcm90b3R5cGUuZW50ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmVudGl0eShuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLnBlbnQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucEVudGl0eShuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTERvY3VtZW50Q0IucHJvdG90eXBlLm5vdCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub3RhdGlvbihuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxEb2N1bWVudENCO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTER1bW15LCBYTUxOb2RlLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgWE1MTm9kZSA9IHJlcXVpcmUoJy4vWE1MTm9kZScpO1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MRHVtbXkgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxEdW1teSwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxEdW1teShwYXJlbnQpIHtcbiAgICAgIFhNTER1bW15Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5EdW1teTtcbiAgICB9XG5cbiAgICBYTUxEdW1teS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxEdW1teS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxEdW1teTtcblxuICB9KShYTUxOb2RlKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgWE1MQXR0cmlidXRlLCBYTUxFbGVtZW50LCBYTUxOYW1lZE5vZGVNYXAsIFhNTE5vZGUsIGdldFZhbHVlLCBpc0Z1bmN0aW9uLCBpc09iamVjdCwgcmVmLFxuICAgIGV4dGVuZCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoaGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBoYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHk7XG5cbiAgcmVmID0gcmVxdWlyZSgnLi9VdGlsaXR5JyksIGlzT2JqZWN0ID0gcmVmLmlzT2JqZWN0LCBpc0Z1bmN0aW9uID0gcmVmLmlzRnVuY3Rpb24sIGdldFZhbHVlID0gcmVmLmdldFZhbHVlO1xuXG4gIFhNTE5vZGUgPSByZXF1aXJlKCcuL1hNTE5vZGUnKTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL1hNTEF0dHJpYnV0ZScpO1xuXG4gIFhNTE5hbWVkTm9kZU1hcCA9IHJlcXVpcmUoJy4vWE1MTmFtZWROb2RlTWFwJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxFbGVtZW50ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MRWxlbWVudCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxFbGVtZW50KHBhcmVudCwgbmFtZSwgYXR0cmlidXRlcykge1xuICAgICAgdmFyIGNoaWxkLCBqLCBsZW4sIHJlZjE7XG4gICAgICBYTUxFbGVtZW50Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgZWxlbWVudCBuYW1lLiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5uYW1lID0gdGhpcy5zdHJpbmdpZnkubmFtZShuYW1lKTtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLkVsZW1lbnQ7XG4gICAgICB0aGlzLmF0dHJpYnMgPSB7fTtcbiAgICAgIHRoaXMuc2NoZW1hVHlwZUluZm8gPSBudWxsO1xuICAgICAgaWYgKGF0dHJpYnV0ZXMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZShhdHRyaWJ1dGVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJlbnQudHlwZSA9PT0gTm9kZVR5cGUuRG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5pc1Jvb3QgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvY3VtZW50T2JqZWN0ID0gcGFyZW50O1xuICAgICAgICBwYXJlbnQucm9vdE9iamVjdCA9IHRoaXM7XG4gICAgICAgIGlmIChwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICByZWYxID0gcGFyZW50LmNoaWxkcmVuO1xuICAgICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGNoaWxkID0gcmVmMVtqXTtcbiAgICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSBOb2RlVHlwZS5Eb2NUeXBlKSB7XG4gICAgICAgICAgICAgIGNoaWxkLm5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ3RhZ05hbWUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEVsZW1lbnQucHJvdG90eXBlLCAnbmFtZXNwYWNlVVJJJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEVsZW1lbnQucHJvdG90eXBlLCAncHJlZml4Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEVsZW1lbnQucHJvdG90eXBlLCAnbG9jYWxOYW1lJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxFbGVtZW50LnByb3RvdHlwZSwgJ2lkJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEVsZW1lbnQucHJvdG90eXBlLCAnY2xhc3NOYW1lJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEVsZW1lbnQucHJvdG90eXBlLCAnY2xhc3NMaXN0Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTEVsZW1lbnQucHJvdG90eXBlLCAnYXR0cmlidXRlcycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5hdHRyaWJ1dGVNYXAgfHwgIXRoaXMuYXR0cmlidXRlTWFwLm5vZGVzKSB7XG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGVNYXAgPSBuZXcgWE1MTmFtZWROb2RlTWFwKHRoaXMuYXR0cmlicyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlTWFwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhdHQsIGF0dE5hbWUsIGNsb25lZFNlbGYsIHJlZjE7XG4gICAgICBjbG9uZWRTZWxmID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICAgIGlmIChjbG9uZWRTZWxmLmlzUm9vdCkge1xuICAgICAgICBjbG9uZWRTZWxmLmRvY3VtZW50T2JqZWN0ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNsb25lZFNlbGYuYXR0cmlicyA9IHt9O1xuICAgICAgcmVmMSA9IHRoaXMuYXR0cmlicztcbiAgICAgIGZvciAoYXR0TmFtZSBpbiByZWYxKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZjEsIGF0dE5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgYXR0ID0gcmVmMVthdHROYW1lXTtcbiAgICAgICAgY2xvbmVkU2VsZi5hdHRyaWJzW2F0dE5hbWVdID0gYXR0LmNsb25lKCk7XG4gICAgICB9XG4gICAgICBjbG9uZWRTZWxmLmNoaWxkcmVuID0gW107XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgdmFyIGNsb25lZENoaWxkO1xuICAgICAgICBjbG9uZWRDaGlsZCA9IGNoaWxkLmNsb25lKCk7XG4gICAgICAgIGNsb25lZENoaWxkLnBhcmVudCA9IGNsb25lZFNlbGY7XG4gICAgICAgIHJldHVybiBjbG9uZWRTZWxmLmNoaWxkcmVuLnB1c2goY2xvbmVkQ2hpbGQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY2xvbmVkU2VsZjtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuYXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBhdHROYW1lLCBhdHRWYWx1ZTtcbiAgICAgIGlmIChuYW1lICE9IG51bGwpIHtcbiAgICAgICAgbmFtZSA9IGdldFZhbHVlKG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgICAgIGZvciAoYXR0TmFtZSBpbiBuYW1lKSB7XG4gICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwobmFtZSwgYXR0TmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGF0dFZhbHVlID0gbmFtZVthdHROYW1lXTtcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZShhdHROYW1lLCBhdHRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmtlZXBOdWxsQXR0cmlidXRlcyAmJiAodmFsdWUgPT0gbnVsbCkpIHtcbiAgICAgICAgICB0aGlzLmF0dHJpYnNbbmFtZV0gPSBuZXcgWE1MQXR0cmlidXRlKHRoaXMsIG5hbWUsIFwiXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmF0dHJpYnNbbmFtZV0gPSBuZXcgWE1MQXR0cmlidXRlKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBhdHROYW1lLCBqLCBsZW47XG4gICAgICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgYXR0cmlidXRlIG5hbWUuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICBuYW1lID0gZ2V0VmFsdWUobmFtZSk7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShuYW1lKSkge1xuICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSBuYW1lLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgYXR0TmFtZSA9IG5hbWVbal07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuYXR0cmlic1thdHROYW1lXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYXR0cmlic1tuYW1lXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMud3JpdGVyLmVsZW1lbnQodGhpcywgdGhpcy5vcHRpb25zLndyaXRlci5maWx0ZXJPcHRpb25zKG9wdGlvbnMpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuYXR0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmEgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuZ2V0QXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKHRoaXMuYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRyaWJzW25hbWVdLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZU5vZGUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBpZiAodGhpcy5hdHRyaWJzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF0dHJpYnNbbmFtZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlTm9kZSA9IGZ1bmN0aW9uKG5ld0F0dHIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlTm9kZSA9IGZ1bmN0aW9uKG9sZEF0dHIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlTlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIHF1YWxpZmllZE5hbWUsIHZhbHVlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuZ2V0QXR0cmlidXRlTm9kZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlTm9kZU5TID0gZnVuY3Rpb24obmV3QXR0cikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5nZXRFbGVtZW50c0J5VGFnTmFtZU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuaGFzQXR0cmlidXRlID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0cmlicy5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIGxvY2FsTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5zZXRJZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKG5hbWUsIGlzSWQpIHtcbiAgICAgIGlmICh0aGlzLmF0dHJpYnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0cmlic1tuYW1lXS5pc0lkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGlzSWQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLnNldElkQXR0cmlidXRlTlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIGxvY2FsTmFtZSwgaXNJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5zZXRJZEF0dHJpYnV0ZU5vZGUgPSBmdW5jdGlvbihpZEF0dHIsIGlzSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MRWxlbWVudC5wcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBmdW5jdGlvbih0YWduYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTEVsZW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lTlMgPSBmdW5jdGlvbihuYW1lc3BhY2VVUkksIGxvY2FsTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gZnVuY3Rpb24oY2xhc3NOYW1lcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxFbGVtZW50LnByb3RvdHlwZS5pc0VxdWFsTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBpLCBqLCByZWYxO1xuICAgICAgaWYgKCFYTUxFbGVtZW50Ll9fc3VwZXJfXy5pc0VxdWFsTm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLmlzRXF1YWxOb2RlKG5vZGUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLm5hbWVzcGFjZVVSSSAhPT0gdGhpcy5uYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUucHJlZml4ICE9PSB0aGlzLnByZWZpeCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5sb2NhbE5hbWUgIT09IHRoaXMubG9jYWxOYW1lKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLmF0dHJpYnMubGVuZ3RoICE9PSB0aGlzLmF0dHJpYnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IGogPSAwLCByZWYxID0gdGhpcy5hdHRyaWJzLmxlbmd0aCAtIDE7IDAgPD0gcmVmMSA/IGogPD0gcmVmMSA6IGogPj0gcmVmMTsgaSA9IDAgPD0gcmVmMSA/ICsraiA6IC0taikge1xuICAgICAgICBpZiAoIXRoaXMuYXR0cmlic1tpXS5pc0VxdWFsTm9kZShub2RlLmF0dHJpYnNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTEVsZW1lbnQ7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MTmFtZWROb2RlTWFwO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MTmFtZWROb2RlTWFwID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhNTE5hbWVkTm9kZU1hcChub2Rlcykge1xuICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxOYW1lZE5vZGVNYXAucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubm9kZXMpLmxlbmd0aCB8fCAwO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMgPSBudWxsO1xuICAgIH07XG5cbiAgICBYTUxOYW1lZE5vZGVNYXAucHJvdG90eXBlLmdldE5hbWVkSXRlbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzW25hbWVdO1xuICAgIH07XG5cbiAgICBYTUxOYW1lZE5vZGVNYXAucHJvdG90eXBlLnNldE5hbWVkSXRlbSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBvbGROb2RlO1xuICAgICAgb2xkTm9kZSA9IHRoaXMubm9kZXNbbm9kZS5ub2RlTmFtZV07XG4gICAgICB0aGlzLm5vZGVzW25vZGUubm9kZU5hbWVdID0gbm9kZTtcbiAgICAgIHJldHVybiBvbGROb2RlIHx8IG51bGw7XG4gICAgfTtcblxuICAgIFhNTE5hbWVkTm9kZU1hcC5wcm90b3R5cGUucmVtb3ZlTmFtZWRJdGVtID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIG9sZE5vZGU7XG4gICAgICBvbGROb2RlID0gdGhpcy5ub2Rlc1tuYW1lXTtcbiAgICAgIGRlbGV0ZSB0aGlzLm5vZGVzW25hbWVdO1xuICAgICAgcmV0dXJuIG9sZE5vZGUgfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZS5pdGVtID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzW09iamVjdC5rZXlzKHRoaXMubm9kZXMpW2luZGV4XV0gfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZS5nZXROYW1lZEl0ZW1OUyA9IGZ1bmN0aW9uKG5hbWVzcGFjZVVSSSwgbG9jYWxOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiKTtcbiAgICB9O1xuXG4gICAgWE1MTmFtZWROb2RlTWFwLnByb3RvdHlwZS5zZXROYW1lZEl0ZW1OUyA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgIH07XG5cbiAgICBYTUxOYW1lZE5vZGVNYXAucHJvdG90eXBlLnJlbW92ZU5hbWVkSXRlbU5TID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJLCBsb2NhbE5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MTmFtZWROb2RlTWFwO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgRG9jdW1lbnRQb3NpdGlvbiwgTm9kZVR5cGUsIFhNTENEYXRhLCBYTUxDb21tZW50LCBYTUxEZWNsYXJhdGlvbiwgWE1MRG9jVHlwZSwgWE1MRHVtbXksIFhNTEVsZW1lbnQsIFhNTE5hbWVkTm9kZU1hcCwgWE1MTm9kZSwgWE1MTm9kZUxpc3QsIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiwgWE1MUmF3LCBYTUxUZXh0LCBnZXRWYWx1ZSwgaXNFbXB0eSwgaXNGdW5jdGlvbiwgaXNPYmplY3QsIHJlZjEsXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIHJlZjEgPSByZXF1aXJlKCcuL1V0aWxpdHknKSwgaXNPYmplY3QgPSByZWYxLmlzT2JqZWN0LCBpc0Z1bmN0aW9uID0gcmVmMS5pc0Z1bmN0aW9uLCBpc0VtcHR5ID0gcmVmMS5pc0VtcHR5LCBnZXRWYWx1ZSA9IHJlZjEuZ2V0VmFsdWU7XG5cbiAgWE1MRWxlbWVudCA9IG51bGw7XG5cbiAgWE1MQ0RhdGEgPSBudWxsO1xuXG4gIFhNTENvbW1lbnQgPSBudWxsO1xuXG4gIFhNTERlY2xhcmF0aW9uID0gbnVsbDtcblxuICBYTUxEb2NUeXBlID0gbnVsbDtcblxuICBYTUxSYXcgPSBudWxsO1xuXG4gIFhNTFRleHQgPSBudWxsO1xuXG4gIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IG51bGw7XG5cbiAgWE1MRHVtbXkgPSBudWxsO1xuXG4gIE5vZGVUeXBlID0gbnVsbDtcblxuICBYTUxOb2RlTGlzdCA9IG51bGw7XG5cbiAgWE1MTmFtZWROb2RlTWFwID0gbnVsbDtcblxuICBEb2N1bWVudFBvc2l0aW9uID0gbnVsbDtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTE5vZGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MTm9kZShwYXJlbnQxKSB7XG4gICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDE7XG4gICAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5wYXJlbnQub3B0aW9ucztcbiAgICAgICAgdGhpcy5zdHJpbmdpZnkgPSB0aGlzLnBhcmVudC5zdHJpbmdpZnk7XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgIHRoaXMuYmFzZVVSSSA9IG51bGw7XG4gICAgICBpZiAoIVhNTEVsZW1lbnQpIHtcbiAgICAgICAgWE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vWE1MRWxlbWVudCcpO1xuICAgICAgICBYTUxDRGF0YSA9IHJlcXVpcmUoJy4vWE1MQ0RhdGEnKTtcbiAgICAgICAgWE1MQ29tbWVudCA9IHJlcXVpcmUoJy4vWE1MQ29tbWVudCcpO1xuICAgICAgICBYTUxEZWNsYXJhdGlvbiA9IHJlcXVpcmUoJy4vWE1MRGVjbGFyYXRpb24nKTtcbiAgICAgICAgWE1MRG9jVHlwZSA9IHJlcXVpcmUoJy4vWE1MRG9jVHlwZScpO1xuICAgICAgICBYTUxSYXcgPSByZXF1aXJlKCcuL1hNTFJhdycpO1xuICAgICAgICBYTUxUZXh0ID0gcmVxdWlyZSgnLi9YTUxUZXh0Jyk7XG4gICAgICAgIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IHJlcXVpcmUoJy4vWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uJyk7XG4gICAgICAgIFhNTER1bW15ID0gcmVxdWlyZSgnLi9YTUxEdW1teScpO1xuICAgICAgICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcbiAgICAgICAgWE1MTm9kZUxpc3QgPSByZXF1aXJlKCcuL1hNTE5vZGVMaXN0Jyk7XG4gICAgICAgIFhNTE5hbWVkTm9kZU1hcCA9IHJlcXVpcmUoJy4vWE1MTmFtZWROb2RlTWFwJyk7XG4gICAgICAgIERvY3VtZW50UG9zaXRpb24gPSByZXF1aXJlKCcuL0RvY3VtZW50UG9zaXRpb24nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdub2RlTmFtZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdub2RlVHlwZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdub2RlVmFsdWUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxOb2RlLnByb3RvdHlwZSwgJ3BhcmVudE5vZGUnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdjaGlsZE5vZGVzJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoaWxkTm9kZUxpc3QgfHwgIXRoaXMuY2hpbGROb2RlTGlzdC5ub2Rlcykge1xuICAgICAgICAgIHRoaXMuY2hpbGROb2RlTGlzdCA9IG5ldyBYTUxOb2RlTGlzdCh0aGlzLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVMaXN0O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAnZmlyc3RDaGlsZCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuWzBdIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdsYXN0Q2hpbGQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdwcmV2aW91c1NpYmxpbmcnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgaSA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmVudC5jaGlsZHJlbltpIC0gMV0gfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxOb2RlLnByb3RvdHlwZSwgJ25leHRTaWJsaW5nJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnQuY2hpbGRyZW5baSArIDFdIHx8IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MTm9kZS5wcm90b3R5cGUsICdvd25lckRvY3VtZW50Jywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQoKSB8fCBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFhNTE5vZGUucHJvdG90eXBlLCAndGV4dENvbnRlbnQnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2hpbGQsIGosIGxlbiwgcmVmMiwgc3RyO1xuICAgICAgICBpZiAodGhpcy5ub2RlVHlwZSA9PT0gTm9kZVR5cGUuRWxlbWVudCB8fCB0aGlzLm5vZGVUeXBlID09PSBOb2RlVHlwZS5Eb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICAgICAgc3RyID0gJyc7XG4gICAgICAgICAgcmVmMiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmMi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgY2hpbGQgPSByZWYyW2pdO1xuICAgICAgICAgICAgaWYgKGNoaWxkLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgIHN0ciArPSBjaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuc2V0UGFyZW50ID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgICB2YXIgY2hpbGQsIGosIGxlbiwgcmVmMiwgcmVzdWx0cztcbiAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBwYXJlbnQub3B0aW9ucztcbiAgICAgICAgdGhpcy5zdHJpbmdpZnkgPSBwYXJlbnQuc3RyaW5naWZ5O1xuICAgICAgfVxuICAgICAgcmVmMiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYyLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIGNoaWxkID0gcmVmMltqXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNoaWxkLnNldFBhcmVudCh0aGlzKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZWxlbWVudCA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHZhciBjaGlsZE5vZGUsIGl0ZW0sIGosIGssIGtleSwgbGFzdENoaWxkLCBsZW4sIGxlbjEsIHJlZjIsIHJlZjMsIHZhbDtcbiAgICAgIGxhc3RDaGlsZCA9IG51bGw7XG4gICAgICBpZiAoYXR0cmlidXRlcyA9PT0gbnVsbCAmJiAodGV4dCA9PSBudWxsKSkge1xuICAgICAgICByZWYyID0gW3t9LCBudWxsXSwgYXR0cmlidXRlcyA9IHJlZjJbMF0sIHRleHQgPSByZWYyWzFdO1xuICAgICAgfVxuICAgICAgaWYgKGF0dHJpYnV0ZXMgPT0gbnVsbCkge1xuICAgICAgICBhdHRyaWJ1dGVzID0ge307XG4gICAgICB9XG4gICAgICBhdHRyaWJ1dGVzID0gZ2V0VmFsdWUoYXR0cmlidXRlcyk7XG4gICAgICBpZiAoIWlzT2JqZWN0KGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIHJlZjMgPSBbYXR0cmlidXRlcywgdGV4dF0sIHRleHQgPSByZWYzWzBdLCBhdHRyaWJ1dGVzID0gcmVmM1sxXTtcbiAgICAgIH1cbiAgICAgIGlmIChuYW1lICE9IG51bGwpIHtcbiAgICAgICAgbmFtZSA9IGdldFZhbHVlKG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmFtZSkpIHtcbiAgICAgICAgZm9yIChqID0gMCwgbGVuID0gbmFtZS5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgIGl0ZW0gPSBuYW1lW2pdO1xuICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuZWxlbWVudChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKG5hbWUpKSB7XG4gICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuZWxlbWVudChuYW1lLmFwcGx5KCkpO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgICAgICBmb3IgKGtleSBpbiBuYW1lKSB7XG4gICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwobmFtZSwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgdmFsID0gbmFtZVtrZXldO1xuICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbCkpIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbC5hcHBseSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5pZ25vcmVEZWNvcmF0b3JzICYmIHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRBdHRLZXkgJiYga2V5LmluZGV4T2YodGhpcy5zdHJpbmdpZnkuY29udmVydEF0dEtleSkgPT09IDApIHtcbiAgICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuYXR0cmlidXRlKGtleS5zdWJzdHIodGhpcy5zdHJpbmdpZnkuY29udmVydEF0dEtleS5sZW5ndGgpLCB2YWwpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5zZXBhcmF0ZUFycmF5SXRlbXMgJiYgQXJyYXkuaXNBcnJheSh2YWwpICYmIGlzRW1wdHkodmFsKSkge1xuICAgICAgICAgICAgbGFzdENoaWxkID0gdGhpcy5kdW1teSgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsKSAmJiBpc0VtcHR5KHZhbCkpIHtcbiAgICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuZWxlbWVudChrZXkpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5rZWVwTnVsbE5vZGVzICYmICh2YWwgPT0gbnVsbCkpIHtcbiAgICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuZHVtbXkoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMuc2VwYXJhdGVBcnJheUl0ZW1zICYmIEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgZm9yIChrID0gMCwgbGVuMSA9IHZhbC5sZW5ndGg7IGsgPCBsZW4xOyBrKyspIHtcbiAgICAgICAgICAgICAgaXRlbSA9IHZhbFtrXTtcbiAgICAgICAgICAgICAgY2hpbGROb2RlID0ge307XG4gICAgICAgICAgICAgIGNoaWxkTm9kZVtrZXldID0gaXRlbTtcbiAgICAgICAgICAgICAgbGFzdENoaWxkID0gdGhpcy5lbGVtZW50KGNoaWxkTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5pZ25vcmVEZWNvcmF0b3JzICYmIHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRUZXh0S2V5ICYmIGtleS5pbmRleE9mKHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRUZXh0S2V5KSA9PT0gMCkge1xuICAgICAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmVsZW1lbnQodmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuZWxlbWVudChrZXkpO1xuICAgICAgICAgICAgICBsYXN0Q2hpbGQuZWxlbWVudCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmVsZW1lbnQoa2V5LCB2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb25zLmtlZXBOdWxsTm9kZXMgJiYgdGV4dCA9PT0gbnVsbCkge1xuICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmR1bW15KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5pZ25vcmVEZWNvcmF0b3JzICYmIHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRUZXh0S2V5ICYmIG5hbWUuaW5kZXhPZih0aGlzLnN0cmluZ2lmeS5jb252ZXJ0VGV4dEtleSkgPT09IDApIHtcbiAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLnRleHQodGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5pZ25vcmVEZWNvcmF0b3JzICYmIHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRDRGF0YUtleSAmJiBuYW1lLmluZGV4T2YodGhpcy5zdHJpbmdpZnkuY29udmVydENEYXRhS2V5KSA9PT0gMCkge1xuICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuY2RhdGEodGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5pZ25vcmVEZWNvcmF0b3JzICYmIHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRDb21tZW50S2V5ICYmIG5hbWUuaW5kZXhPZih0aGlzLnN0cmluZ2lmeS5jb252ZXJ0Q29tbWVudEtleSkgPT09IDApIHtcbiAgICAgICAgICBsYXN0Q2hpbGQgPSB0aGlzLmNvbW1lbnQodGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5pZ25vcmVEZWNvcmF0b3JzICYmIHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRSYXdLZXkgJiYgbmFtZS5pbmRleE9mKHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRSYXdLZXkpID09PSAwKSB7XG4gICAgICAgICAgbGFzdENoaWxkID0gdGhpcy5yYXcodGV4dCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMub3B0aW9ucy5pZ25vcmVEZWNvcmF0b3JzICYmIHRoaXMuc3RyaW5naWZ5LmNvbnZlcnRQSUtleSAmJiBuYW1lLmluZGV4T2YodGhpcy5zdHJpbmdpZnkuY29udmVydFBJS2V5KSA9PT0gMCkge1xuICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMuaW5zdHJ1Y3Rpb24obmFtZS5zdWJzdHIodGhpcy5zdHJpbmdpZnkuY29udmVydFBJS2V5Lmxlbmd0aCksIHRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxhc3RDaGlsZCA9IHRoaXMubm9kZShuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGxhc3RDaGlsZCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBjcmVhdGUgYW55IGVsZW1lbnRzIHdpdGg6IFwiICsgbmFtZSArIFwiLiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxhc3RDaGlsZDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgdmFyIGNoaWxkLCBpLCBuZXdDaGlsZCwgcmVmQ2hpbGQsIHJlbW92ZWQ7XG4gICAgICBpZiAobmFtZSAhPSBudWxsID8gbmFtZS50eXBlIDogdm9pZCAwKSB7XG4gICAgICAgIG5ld0NoaWxkID0gbmFtZTtcbiAgICAgICAgcmVmQ2hpbGQgPSBhdHRyaWJ1dGVzO1xuICAgICAgICBuZXdDaGlsZC5zZXRQYXJlbnQodGhpcyk7XG4gICAgICAgIGlmIChyZWZDaGlsZCkge1xuICAgICAgICAgIGkgPSBjaGlsZHJlbi5pbmRleE9mKHJlZkNoaWxkKTtcbiAgICAgICAgICByZW1vdmVkID0gY2hpbGRyZW4uc3BsaWNlKGkpO1xuICAgICAgICAgIGNoaWxkcmVuLnB1c2gobmV3Q2hpbGQpO1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGNoaWxkcmVuLCByZW1vdmVkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3Q2hpbGQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pc1Jvb3QpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgaW5zZXJ0IGVsZW1lbnRzIGF0IHJvb3QgbGV2ZWwuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgICByZW1vdmVkID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGkpO1xuICAgICAgICBjaGlsZCA9IHRoaXMucGFyZW50LmVsZW1lbnQobmFtZSwgYXR0cmlidXRlcywgdGV4dCk7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMucGFyZW50LmNoaWxkcmVuLCByZW1vdmVkKTtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgcmVtb3ZlZDtcbiAgICAgIGlmICh0aGlzLmlzUm9vdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgaW5zZXJ0IGVsZW1lbnRzIGF0IHJvb3QgbGV2ZWwuIFwiICsgdGhpcy5kZWJ1Z0luZm8obmFtZSkpO1xuICAgICAgfVxuICAgICAgaSA9IHRoaXMucGFyZW50LmNoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICByZW1vdmVkID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGkgKyAxKTtcbiAgICAgIGNoaWxkID0gdGhpcy5wYXJlbnQuZWxlbWVudChuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMucGFyZW50LmNoaWxkcmVuLCByZW1vdmVkKTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgcmVmMjtcbiAgICAgIGlmICh0aGlzLmlzUm9vdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgcmVtb3ZlIHRoZSByb290IGVsZW1lbnQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIFtdLnNwbGljZS5hcHBseSh0aGlzLnBhcmVudC5jaGlsZHJlbiwgW2ksIGkgLSBpICsgMV0uY29uY2F0KHJlZjIgPSBbXSkpLCByZWYyO1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5ub2RlID0gZnVuY3Rpb24obmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgICAgdmFyIGNoaWxkLCByZWYyO1xuICAgICAgaWYgKG5hbWUgIT0gbnVsbCkge1xuICAgICAgICBuYW1lID0gZ2V0VmFsdWUobmFtZSk7XG4gICAgICB9XG4gICAgICBhdHRyaWJ1dGVzIHx8IChhdHRyaWJ1dGVzID0ge30pO1xuICAgICAgYXR0cmlidXRlcyA9IGdldFZhbHVlKGF0dHJpYnV0ZXMpO1xuICAgICAgaWYgKCFpc09iamVjdChhdHRyaWJ1dGVzKSkge1xuICAgICAgICByZWYyID0gW2F0dHJpYnV0ZXMsIHRleHRdLCB0ZXh0ID0gcmVmMlswXSwgYXR0cmlidXRlcyA9IHJlZjJbMV07XG4gICAgICB9XG4gICAgICBjaGlsZCA9IG5ldyBYTUxFbGVtZW50KHRoaXMsIG5hbWUsIGF0dHJpYnV0ZXMpO1xuICAgICAgaWYgKHRleHQgIT0gbnVsbCkge1xuICAgICAgICBjaGlsZC50ZXh0KHRleHQpO1xuICAgICAgfVxuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiBjaGlsZDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCh2YWx1ZSk7XG4gICAgICB9XG4gICAgICBjaGlsZCA9IG5ldyBYTUxUZXh0KHRoaXMsIHZhbHVlKTtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuY2RhdGEgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIGNoaWxkO1xuICAgICAgY2hpbGQgPSBuZXcgWE1MQ0RhdGEodGhpcywgdmFsdWUpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5jb21tZW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZDtcbiAgICAgIGNoaWxkID0gbmV3IFhNTENvbW1lbnQodGhpcywgdmFsdWUpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5jb21tZW50QmVmb3JlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgcmVtb3ZlZDtcbiAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgcmVtb3ZlZCA9IHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpKTtcbiAgICAgIGNoaWxkID0gdGhpcy5wYXJlbnQuY29tbWVudCh2YWx1ZSk7XG4gICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLnBhcmVudC5jaGlsZHJlbiwgcmVtb3ZlZCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuY29tbWVudEFmdGVyID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgcmVtb3ZlZDtcbiAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgcmVtb3ZlZCA9IHRoaXMucGFyZW50LmNoaWxkcmVuLnNwbGljZShpICsgMSk7XG4gICAgICBjaGlsZCA9IHRoaXMucGFyZW50LmNvbW1lbnQodmFsdWUpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5wYXJlbnQuY2hpbGRyZW4sIHJlbW92ZWQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnJhdyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQ7XG4gICAgICBjaGlsZCA9IG5ldyBYTUxSYXcodGhpcywgdmFsdWUpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5kdW1teSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNoaWxkO1xuICAgICAgY2hpbGQgPSBuZXcgWE1MRHVtbXkodGhpcyk7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmluc3RydWN0aW9uID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgdmFyIGluc1RhcmdldCwgaW5zVmFsdWUsIGluc3RydWN0aW9uLCBqLCBsZW47XG4gICAgICBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0ID0gZ2V0VmFsdWUodGFyZ2V0KTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gZ2V0VmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICBmb3IgKGogPSAwLCBsZW4gPSB0YXJnZXQubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICBpbnNUYXJnZXQgPSB0YXJnZXRbal07XG4gICAgICAgICAgdGhpcy5pbnN0cnVjdGlvbihpbnNUYXJnZXQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHRhcmdldCkpIHtcbiAgICAgICAgZm9yIChpbnNUYXJnZXQgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwodGFyZ2V0LCBpbnNUYXJnZXQpKSBjb250aW51ZTtcbiAgICAgICAgICBpbnNWYWx1ZSA9IHRhcmdldFtpbnNUYXJnZXRdO1xuICAgICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb24oaW5zVGFyZ2V0LCBpbnNWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUuYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0cnVjdGlvbiA9IG5ldyBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24odGhpcywgdGFyZ2V0LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChpbnN0cnVjdGlvbik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaW5zdHJ1Y3Rpb25CZWZvcmUgPSBmdW5jdGlvbih0YXJnZXQsIHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQsIGksIHJlbW92ZWQ7XG4gICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSk7XG4gICAgICBjaGlsZCA9IHRoaXMucGFyZW50Lmluc3RydWN0aW9uKHRhcmdldCwgdmFsdWUpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5wYXJlbnQuY2hpbGRyZW4sIHJlbW92ZWQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmluc3RydWN0aW9uQWZ0ZXIgPSBmdW5jdGlvbih0YXJnZXQsIHZhbHVlKSB7XG4gICAgICB2YXIgY2hpbGQsIGksIHJlbW92ZWQ7XG4gICAgICBpID0gdGhpcy5wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaSArIDEpO1xuICAgICAgY2hpbGQgPSB0aGlzLnBhcmVudC5pbnN0cnVjdGlvbih0YXJnZXQsIHZhbHVlKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHRoaXMucGFyZW50LmNoaWxkcmVuLCByZW1vdmVkKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5kZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKHZlcnNpb24sIGVuY29kaW5nLCBzdGFuZGFsb25lKSB7XG4gICAgICB2YXIgZG9jLCB4bWxkZWM7XG4gICAgICBkb2MgPSB0aGlzLmRvY3VtZW50KCk7XG4gICAgICB4bWxkZWMgPSBuZXcgWE1MRGVjbGFyYXRpb24oZG9jLCB2ZXJzaW9uLCBlbmNvZGluZywgc3RhbmRhbG9uZSk7XG4gICAgICBpZiAoZG9jLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkb2MuY2hpbGRyZW4udW5zaGlmdCh4bWxkZWMpO1xuICAgICAgfSBlbHNlIGlmIChkb2MuY2hpbGRyZW5bMF0udHlwZSA9PT0gTm9kZVR5cGUuRGVjbGFyYXRpb24pIHtcbiAgICAgICAgZG9jLmNoaWxkcmVuWzBdID0geG1sZGVjO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jLmNoaWxkcmVuLnVuc2hpZnQoeG1sZGVjKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkb2Mucm9vdCgpIHx8IGRvYztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZHRkID0gZnVuY3Rpb24ocHViSUQsIHN5c0lEKSB7XG4gICAgICB2YXIgY2hpbGQsIGRvYywgZG9jdHlwZSwgaSwgaiwgaywgbGVuLCBsZW4xLCByZWYyLCByZWYzO1xuICAgICAgZG9jID0gdGhpcy5kb2N1bWVudCgpO1xuICAgICAgZG9jdHlwZSA9IG5ldyBYTUxEb2NUeXBlKGRvYywgcHViSUQsIHN5c0lEKTtcbiAgICAgIHJlZjIgPSBkb2MuY2hpbGRyZW47XG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuID0gcmVmMi5sZW5ndGg7IGogPCBsZW47IGkgPSArK2opIHtcbiAgICAgICAgY2hpbGQgPSByZWYyW2ldO1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gTm9kZVR5cGUuRG9jVHlwZSkge1xuICAgICAgICAgIGRvYy5jaGlsZHJlbltpXSA9IGRvY3R5cGU7XG4gICAgICAgICAgcmV0dXJuIGRvY3R5cGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlZjMgPSBkb2MuY2hpbGRyZW47XG4gICAgICBmb3IgKGkgPSBrID0gMCwgbGVuMSA9IHJlZjMubGVuZ3RoOyBrIDwgbGVuMTsgaSA9ICsraykge1xuICAgICAgICBjaGlsZCA9IHJlZjNbaV07XG4gICAgICAgIGlmIChjaGlsZC5pc1Jvb3QpIHtcbiAgICAgICAgICBkb2MuY2hpbGRyZW4uc3BsaWNlKGksIDAsIGRvY3R5cGUpO1xuICAgICAgICAgIHJldHVybiBkb2N0eXBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkb2MuY2hpbGRyZW4ucHVzaChkb2N0eXBlKTtcbiAgICAgIHJldHVybiBkb2N0eXBlO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNSb290KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSByb290IG5vZGUgaGFzIG5vIHBhcmVudC4gVXNlIGRvYygpIGlmIHlvdSBuZWVkIHRvIGdldCB0aGUgZG9jdW1lbnQgb2JqZWN0LlwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICBub2RlID0gdGhpcztcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGUucm9vdE9iamVjdDtcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLmlzUm9vdCkge1xuICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5kb2N1bWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vZGU7XG4gICAgICBub2RlID0gdGhpcztcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnR5cGUgPT09IE5vZGVUeXBlLkRvY3VtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmRvY3VtZW50KCkuZW5kKG9wdGlvbnMpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgaWYgKGkgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFscmVhZHkgYXQgdGhlIGZpcnN0IG5vZGUuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQuY2hpbGRyZW5baSAtIDFdO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIGkgPSB0aGlzLnBhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpO1xuICAgICAgaWYgKGkgPT09IC0xIHx8IGkgPT09IHRoaXMucGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSBhdCB0aGUgbGFzdCBub2RlLiBcIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucGFyZW50LmNoaWxkcmVuW2kgKyAxXTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaW1wb3J0RG9jdW1lbnQgPSBmdW5jdGlvbihkb2MpIHtcbiAgICAgIHZhciBjbG9uZWRSb290O1xuICAgICAgY2xvbmVkUm9vdCA9IGRvYy5yb290KCkuY2xvbmUoKTtcbiAgICAgIGNsb25lZFJvb3QucGFyZW50ID0gdGhpcztcbiAgICAgIGNsb25lZFJvb3QuaXNSb290ID0gZmFsc2U7XG4gICAgICB0aGlzLmNoaWxkcmVuLnB1c2goY2xvbmVkUm9vdCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZGVidWdJbmZvID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIHJlZjIsIHJlZjM7XG4gICAgICBuYW1lID0gbmFtZSB8fCB0aGlzLm5hbWU7XG4gICAgICBpZiAoKG5hbWUgPT0gbnVsbCkgJiYgISgocmVmMiA9IHRoaXMucGFyZW50KSAhPSBudWxsID8gcmVmMi5uYW1lIDogdm9pZCAwKSkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcInBhcmVudDogPFwiICsgdGhpcy5wYXJlbnQubmFtZSArIFwiPlwiO1xuICAgICAgfSBlbHNlIGlmICghKChyZWYzID0gdGhpcy5wYXJlbnQpICE9IG51bGwgPyByZWYzLm5hbWUgOiB2b2lkIDApKSB7XG4gICAgICAgIHJldHVybiBcIm5vZGU6IDxcIiArIG5hbWUgKyBcIj5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIm5vZGU6IDxcIiArIG5hbWUgKyBcIj4sIHBhcmVudDogPFwiICsgdGhpcy5wYXJlbnQubmFtZSArIFwiPlwiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5lbGUgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50KG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5ub2QgPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS50eHQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmRhdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jZGF0YSh2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmNvbSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tZW50KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaW5zID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zdHJ1Y3Rpb24odGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmRvYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZG9jdW1lbnQoKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZGVjID0gZnVuY3Rpb24odmVyc2lvbiwgZW5jb2RpbmcsIHN0YW5kYWxvbmUpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlY2xhcmF0aW9uKHZlcnNpb24sIGVuY29kaW5nLCBzdGFuZGFsb25lKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuZSA9IGZ1bmN0aW9uKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQobmFtZSwgYXR0cmlidXRlcywgdGV4dCk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLm4gPSBmdW5jdGlvbihuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlKG5hbWUsIGF0dHJpYnV0ZXMsIHRleHQpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5kID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmNkYXRhKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuYyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tZW50KHZhbHVlKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yYXcodmFsdWUpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pID0gZnVuY3Rpb24odGFyZ2V0LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zdHJ1Y3Rpb24odGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnVwKCk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmltcG9ydFhNTEJ1aWxkZXIgPSBmdW5jdGlvbihkb2MpIHtcbiAgICAgIHJldHVybiB0aGlzLmltcG9ydERvY3VtZW50KGRvYyk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnJlcGxhY2VDaGlsZCA9IGZ1bmN0aW9uKG5ld0NoaWxkLCBvbGRDaGlsZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKG9sZENoaWxkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmFwcGVuZENoaWxkID0gZnVuY3Rpb24obmV3Q2hpbGQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaGFzQ2hpbGROb2RlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoICE9PSAwO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5jbG9uZU5vZGUgPSBmdW5jdGlvbihkZWVwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKGZlYXR1cmUsIHZlcnNpb24pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5oYXNBdHRyaWJ1dGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyaWJzLmxlbmd0aCAhPT0gMDtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24gPSBmdW5jdGlvbihvdGhlcikge1xuICAgICAgdmFyIHJlZiwgcmVzO1xuICAgICAgcmVmID0gdGhpcztcbiAgICAgIGlmIChyZWYgPT09IG90aGVyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmRvY3VtZW50KCkgIT09IG90aGVyLmRvY3VtZW50KCkpIHtcbiAgICAgICAgcmVzID0gRG9jdW1lbnRQb3NpdGlvbi5EaXNjb25uZWN0ZWQgfCBEb2N1bWVudFBvc2l0aW9uLkltcGxlbWVudGF0aW9uU3BlY2lmaWM7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgMC41KSB7XG4gICAgICAgICAgcmVzIHw9IERvY3VtZW50UG9zaXRpb24uUHJlY2VkaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyB8PSBEb2N1bWVudFBvc2l0aW9uLkZvbGxvd2luZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSBlbHNlIGlmIChyZWYuaXNBbmNlc3RvcihvdGhlcikpIHtcbiAgICAgICAgcmV0dXJuIERvY3VtZW50UG9zaXRpb24uQ29udGFpbnMgfCBEb2N1bWVudFBvc2l0aW9uLlByZWNlZGluZztcbiAgICAgIH0gZWxzZSBpZiAocmVmLmlzRGVzY2VuZGFudChvdGhlcikpIHtcbiAgICAgICAgcmV0dXJuIERvY3VtZW50UG9zaXRpb24uQ29udGFpbnMgfCBEb2N1bWVudFBvc2l0aW9uLkZvbGxvd2luZztcbiAgICAgIH0gZWxzZSBpZiAocmVmLmlzUHJlY2VkaW5nKG90aGVyKSkge1xuICAgICAgICByZXR1cm4gRG9jdW1lbnRQb3NpdGlvbi5QcmVjZWRpbmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRG9jdW1lbnRQb3NpdGlvbi5Gb2xsb3dpbmc7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmlzU2FtZU5vZGUgPSBmdW5jdGlvbihvdGhlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5sb29rdXBQcmVmaXggPSBmdW5jdGlvbihuYW1lc3BhY2VVUkkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaXNEZWZhdWx0TmFtZXNwYWNlID0gZnVuY3Rpb24obmFtZXNwYWNlVVJJKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmxvb2t1cE5hbWVzcGFjZVVSSSA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pc0VxdWFsTm9kZSA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBpLCBqLCByZWYyO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgIT09IHRoaXMubm9kZVR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoICE9PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSBqID0gMCwgcmVmMiA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgMCA8PSByZWYyID8gaiA8PSByZWYyIDogaiA+PSByZWYyOyBpID0gMCA8PSByZWYyID8gKytqIDogLS1qKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGlsZHJlbltpXS5pc0VxdWFsTm9kZShub2RlLmNoaWxkcmVuW2ldKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmdldEZlYXR1cmUgPSBmdW5jdGlvbihmZWF0dXJlLCB2ZXJzaW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLnNldFVzZXJEYXRhID0gZnVuY3Rpb24oa2V5LCBkYXRhLCBoYW5kbGVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmdldFVzZXJEYXRhID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIERPTSBtZXRob2QgaXMgbm90IGltcGxlbWVudGVkLlwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgIGlmICghb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG90aGVyID09PSB0aGlzIHx8IHRoaXMuaXNEZXNjZW5kYW50KG90aGVyKTtcbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUuaXNEZXNjZW5kYW50ID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgdmFyIGNoaWxkLCBpc0Rlc2NlbmRhbnRDaGlsZCwgaiwgbGVuLCByZWYyO1xuICAgICAgcmVmMiA9IHRoaXMuY2hpbGRyZW47XG4gICAgICBmb3IgKGogPSAwLCBsZW4gPSByZWYyLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIGNoaWxkID0gcmVmMltqXTtcbiAgICAgICAgaWYgKG5vZGUgPT09IGNoaWxkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaXNEZXNjZW5kYW50Q2hpbGQgPSBjaGlsZC5pc0Rlc2NlbmRhbnQobm9kZSk7XG4gICAgICAgIGlmIChpc0Rlc2NlbmRhbnRDaGlsZCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmlzQW5jZXN0b3IgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZS5pc0Rlc2NlbmRhbnQodGhpcyk7XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmlzUHJlY2VkaW5nID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgdmFyIG5vZGVQb3MsIHRoaXNQb3M7XG4gICAgICBub2RlUG9zID0gdGhpcy50cmVlUG9zaXRpb24obm9kZSk7XG4gICAgICB0aGlzUG9zID0gdGhpcy50cmVlUG9zaXRpb24odGhpcyk7XG4gICAgICBpZiAobm9kZVBvcyA9PT0gLTEgfHwgdGhpc1BvcyA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5vZGVQb3MgPCB0aGlzUG9zO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBYTUxOb2RlLnByb3RvdHlwZS5pc0ZvbGxvd2luZyA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHZhciBub2RlUG9zLCB0aGlzUG9zO1xuICAgICAgbm9kZVBvcyA9IHRoaXMudHJlZVBvc2l0aW9uKG5vZGUpO1xuICAgICAgdGhpc1BvcyA9IHRoaXMudHJlZVBvc2l0aW9uKHRoaXMpO1xuICAgICAgaWYgKG5vZGVQb3MgPT09IC0xIHx8IHRoaXNQb3MgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBub2RlUG9zID4gdGhpc1BvcztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MTm9kZS5wcm90b3R5cGUudHJlZVBvc2l0aW9uID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgdmFyIGZvdW5kLCBwb3M7XG4gICAgICBwb3MgPSAwO1xuICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZm9yZWFjaFRyZWVOb2RlKHRoaXMuZG9jdW1lbnQoKSwgZnVuY3Rpb24oY2hpbGROb2RlKSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgICBpZiAoIWZvdW5kICYmIGNoaWxkTm9kZSA9PT0gbm9kZSkge1xuICAgICAgICAgIHJldHVybiBmb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTE5vZGUucHJvdG90eXBlLmZvcmVhY2hUcmVlTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIGZ1bmMpIHtcbiAgICAgIHZhciBjaGlsZCwgaiwgbGVuLCByZWYyLCByZXM7XG4gICAgICBub2RlIHx8IChub2RlID0gdGhpcy5kb2N1bWVudCgpKTtcbiAgICAgIHJlZjIgPSBub2RlLmNoaWxkcmVuO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmMi5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICBjaGlsZCA9IHJlZjJbal07XG4gICAgICAgIGlmIChyZXMgPSBmdW5jKGNoaWxkKSkge1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gdGhpcy5mb3JlYWNoVHJlZU5vZGUoY2hpbGQsIGZ1bmMpO1xuICAgICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxOb2RlO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MTm9kZUxpc3Q7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxOb2RlTGlzdCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBYTUxOb2RlTGlzdChub2Rlcykge1xuICAgICAgdGhpcy5ub2RlcyA9IG5vZGVzO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxOb2RlTGlzdC5wcm90b3R5cGUsICdsZW5ndGgnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5sZW5ndGggfHwgMDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTE5vZGVMaXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMgPSBudWxsO1xuICAgIH07XG5cbiAgICBYTUxOb2RlTGlzdC5wcm90b3R5cGUuaXRlbSA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlc1tpbmRleF0gfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTE5vZGVMaXN0O1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTENoYXJhY3RlckRhdGEsIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbixcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIFhNTENoYXJhY3RlckRhdGEgPSByZXF1aXJlKCcuL1hNTENoYXJhY3RlckRhdGEnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24ocGFyZW50LCB0YXJnZXQsIHZhbHVlKSB7XG4gICAgICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24uX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgcGFyZW50KTtcbiAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGluc3RydWN0aW9uIHRhcmdldC4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLlByb2Nlc3NpbmdJbnN0cnVjdGlvbjtcbiAgICAgIHRoaXMudGFyZ2V0ID0gdGhpcy5zdHJpbmdpZnkuaW5zVGFyZ2V0KHRhcmdldCk7XG4gICAgICB0aGlzLm5hbWUgPSB0aGlzLnRhcmdldDtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdpZnkuaW5zVmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53cml0ZXIucHJvY2Vzc2luZ0luc3RydWN0aW9uKHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbi5wcm90b3R5cGUuaXNFcXVhbE5vZGUgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAoIVhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbi5fX3N1cGVyX18uaXNFcXVhbE5vZGUuYXBwbHkodGhpcywgYXJndW1lbnRzKS5pc0VxdWFsTm9kZShub2RlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS50YXJnZXQgIT09IHRoaXMudGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MUHJvY2Vzc2luZ0luc3RydWN0aW9uO1xuXG4gIH0pKFhNTENoYXJhY3RlckRhdGEpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBYTUxOb2RlLCBYTUxSYXcsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxOb2RlID0gcmVxdWlyZSgnLi9YTUxOb2RlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxSYXcgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxSYXcsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MUmF3KHBhcmVudCwgdGV4dCkge1xuICAgICAgWE1MUmF3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHBhcmVudCk7XG4gICAgICBpZiAodGV4dCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgcmF3IHRleHQuIFwiICsgdGhpcy5kZWJ1Z0luZm8oKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnR5cGUgPSBOb2RlVHlwZS5SYXc7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdpZnkucmF3KHRleHQpO1xuICAgIH1cblxuICAgIFhNTFJhdy5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIH07XG5cbiAgICBYTUxSYXcucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy53cml0ZXIucmF3KHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxSYXc7XG5cbiAgfSkoWE1MTm9kZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFdyaXRlclN0YXRlLCBYTUxTdHJlYW1Xcml0ZXIsIFhNTFdyaXRlckJhc2UsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxXcml0ZXJCYXNlID0gcmVxdWlyZSgnLi9YTUxXcml0ZXJCYXNlJyk7XG5cbiAgV3JpdGVyU3RhdGUgPSByZXF1aXJlKCcuL1dyaXRlclN0YXRlJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxTdHJlYW1Xcml0ZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChYTUxTdHJlYW1Xcml0ZXIsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gWE1MU3RyZWFtV3JpdGVyKHN0cmVhbSwgb3B0aW9ucykge1xuICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG4gICAgICBYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgWE1MU3RyZWFtV3JpdGVyLnByb3RvdHlwZS5lbmRsaW5lID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIGlmIChub2RlLmlzTGFzdFJvb3ROb2RlICYmIG9wdGlvbnMuc3RhdGUgPT09IFdyaXRlclN0YXRlLkNsb3NlVGFnKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLmVuZGxpbmUuY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZG9jdW1lbnQgPSBmdW5jdGlvbihkb2MsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgaiwgaywgbGVuLCBsZW4xLCByZWYsIHJlZjEsIHJlc3VsdHM7XG4gICAgICByZWYgPSBkb2MuY2hpbGRyZW47XG4gICAgICBmb3IgKGkgPSBqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaSA9ICsraikge1xuICAgICAgICBjaGlsZCA9IHJlZltpXTtcbiAgICAgICAgY2hpbGQuaXNMYXN0Um9vdE5vZGUgPSBpID09PSBkb2MuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSB0aGlzLmZpbHRlck9wdGlvbnMob3B0aW9ucyk7XG4gICAgICByZWYxID0gZG9jLmNoaWxkcmVuO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBrIDwgbGVuMTsgaysrKSB7XG4gICAgICAgIGNoaWxkID0gcmVmMVtrXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMud3JpdGVDaGlsZE5vZGUoY2hpbGQsIG9wdGlvbnMsIDApKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmF0dHJpYnV0ZSA9IGZ1bmN0aW9uKGF0dCwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS53cml0ZShYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLmF0dHJpYnV0ZS5jYWxsKHRoaXMsIGF0dCwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyZWFtV3JpdGVyLnByb3RvdHlwZS5jZGF0YSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5jZGF0YS5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuY29tbWVudCA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5jb21tZW50LmNhbGwodGhpcywgbm9kZSwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyZWFtV3JpdGVyLnByb3RvdHlwZS5kZWNsYXJhdGlvbiA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy5kZWNsYXJhdGlvbi5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZG9jVHlwZSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgY2hpbGQsIGosIGxlbiwgcmVmO1xuICAgICAgbGV2ZWwgfHwgKGxldmVsID0gMCk7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgdGhpcy5zdHJlYW0ud3JpdGUodGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICAgIHRoaXMuc3RyZWFtLndyaXRlKCc8IURPQ1RZUEUgJyArIG5vZGUucm9vdCgpLm5hbWUpO1xuICAgICAgaWYgKG5vZGUucHViSUQgJiYgbm9kZS5zeXNJRCkge1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnIFBVQkxJQyBcIicgKyBub2RlLnB1YklEICsgJ1wiIFwiJyArIG5vZGUuc3lzSUQgKyAnXCInKTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZS5zeXNJRCkge1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnIFNZU1RFTSBcIicgKyBub2RlLnN5c0lEICsgJ1wiJyk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc3RyZWFtLndyaXRlKCcgWycpO1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSh0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgICAgcmVmID0gbm9kZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgY2hpbGQgPSByZWZbal07XG4gICAgICAgICAgdGhpcy53cml0ZUNoaWxkTm9kZShjaGlsZCwgb3B0aW9ucywgbGV2ZWwgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgIHRoaXMuc3RyZWFtLndyaXRlKCddJyk7XG4gICAgICB9XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICB0aGlzLnN0cmVhbS53cml0ZShvcHRpb25zLnNwYWNlQmVmb3JlU2xhc2ggKyAnPicpO1xuICAgICAgdGhpcy5zdHJlYW0ud3JpdGUodGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHJldHVybiB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZWxlbWVudCA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgYXR0LCBjaGlsZCwgY2hpbGROb2RlQ291bnQsIGZpcnN0Q2hpbGROb2RlLCBqLCBsZW4sIG5hbWUsIHByZXR0eVN1cHByZXNzZWQsIHJlZiwgcmVmMTtcbiAgICAgIGxldmVsIHx8IChsZXZlbCA9IDApO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHRoaXMuc3RyZWFtLndyaXRlKHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8JyArIG5vZGUubmFtZSk7XG4gICAgICByZWYgPSBub2RlLmF0dHJpYnM7XG4gICAgICBmb3IgKG5hbWUgaW4gcmVmKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZiwgbmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICBhdHQgPSByZWZbbmFtZV07XG4gICAgICAgIHRoaXMuYXR0cmlidXRlKGF0dCwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgfVxuICAgICAgY2hpbGROb2RlQ291bnQgPSBub2RlLmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgIGZpcnN0Q2hpbGROb2RlID0gY2hpbGROb2RlQ291bnQgPT09IDAgPyBudWxsIDogbm9kZS5jaGlsZHJlblswXTtcbiAgICAgIGlmIChjaGlsZE5vZGVDb3VudCA9PT0gMCB8fCBub2RlLmNoaWxkcmVuLmV2ZXJ5KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIChlLnR5cGUgPT09IE5vZGVUeXBlLlRleHQgfHwgZS50eXBlID09PSBOb2RlVHlwZS5SYXcpICYmIGUudmFsdWUgPT09ICcnO1xuICAgICAgfSkpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxsb3dFbXB0eSkge1xuICAgICAgICAgIHRoaXMuc3RyZWFtLndyaXRlKCc+Jyk7XG4gICAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICAgIHRoaXMuc3RyZWFtLndyaXRlKCc8LycgKyBub2RlLm5hbWUgKyAnPicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgICAgICB0aGlzLnN0cmVhbS53cml0ZShvcHRpb25zLnNwYWNlQmVmb3JlU2xhc2ggKyAnLz4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnByZXR0eSAmJiBjaGlsZE5vZGVDb3VudCA9PT0gMSAmJiAoZmlyc3RDaGlsZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuVGV4dCB8fCBmaXJzdENoaWxkTm9kZS50eXBlID09PSBOb2RlVHlwZS5SYXcpICYmIChmaXJzdENoaWxkTm9kZS52YWx1ZSAhPSBudWxsKSkge1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnPicpO1xuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgICBvcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQrKztcbiAgICAgICAgcHJldHR5U3VwcHJlc3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMud3JpdGVDaGlsZE5vZGUoZmlyc3RDaGlsZE5vZGUsIG9wdGlvbnMsIGxldmVsICsgMSk7XG4gICAgICAgIG9wdGlvbnMuc3VwcHJlc3NQcmV0dHlDb3VudC0tO1xuICAgICAgICBwcmV0dHlTdXBwcmVzc2VkID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgICAgdGhpcy5zdHJlYW0ud3JpdGUoJzwvJyArIG5vZGUubmFtZSArICc+Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0cmVhbS53cml0ZSgnPicgKyB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgICAgcmVmMSA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbiA9IHJlZjEubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICBjaGlsZCA9IHJlZjFbal07XG4gICAgICAgICAgdGhpcy53cml0ZUNoaWxkTm9kZShjaGlsZCwgb3B0aW9ucywgbGV2ZWwgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgIHRoaXMuc3RyZWFtLndyaXRlKHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8LycgKyBub2RlLm5hbWUgKyAnPicpO1xuICAgICAgfVxuICAgICAgdGhpcy5zdHJlYW0ud3JpdGUodGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHJldHVybiB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUucHJvY2Vzc2luZ0luc3RydWN0aW9uID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS53cml0ZShYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLnByb2Nlc3NpbmdJbnN0cnVjdGlvbi5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS53cml0ZShYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLnJhdy5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHJlYW0ud3JpdGUoWE1MU3RyZWFtV3JpdGVyLl9fc3VwZXJfXy50ZXh0LmNhbGwodGhpcywgbm9kZSwgb3B0aW9ucywgbGV2ZWwpKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyZWFtV3JpdGVyLnByb3RvdHlwZS5kdGRBdHRMaXN0ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS53cml0ZShYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLmR0ZEF0dExpc3QuY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICBYTUxTdHJlYW1Xcml0ZXIucHJvdG90eXBlLmR0ZEVsZW1lbnQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLndyaXRlKFhNTFN0cmVhbVdyaXRlci5fX3N1cGVyX18uZHRkRWxlbWVudC5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZHRkRW50aXR5ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0cmVhbS53cml0ZShYTUxTdHJlYW1Xcml0ZXIuX19zdXBlcl9fLmR0ZEVudGl0eS5jYWxsKHRoaXMsIG5vZGUsIG9wdGlvbnMsIGxldmVsKSk7XG4gICAgfTtcblxuICAgIFhNTFN0cmVhbVdyaXRlci5wcm90b3R5cGUuZHRkTm90YXRpb24gPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLndyaXRlKFhNTFN0cmVhbVdyaXRlci5fX3N1cGVyX18uZHRkTm90YXRpb24uY2FsbCh0aGlzLCBub2RlLCBvcHRpb25zLCBsZXZlbCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MU3RyZWFtV3JpdGVyO1xuXG4gIH0pKFhNTFdyaXRlckJhc2UpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIFhNTFN0cmluZ1dyaXRlciwgWE1MV3JpdGVyQmFzZSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIFhNTFdyaXRlckJhc2UgPSByZXF1aXJlKCcuL1hNTFdyaXRlckJhc2UnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTFN0cmluZ1dyaXRlciA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKFhNTFN0cmluZ1dyaXRlciwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxTdHJpbmdXcml0ZXIob3B0aW9ucykge1xuICAgICAgWE1MU3RyaW5nV3JpdGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIFhNTFN0cmluZ1dyaXRlci5wcm90b3R5cGUuZG9jdW1lbnQgPSBmdW5jdGlvbihkb2MsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgbGVuLCByLCByZWY7XG4gICAgICBvcHRpb25zID0gdGhpcy5maWx0ZXJPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgciA9ICcnO1xuICAgICAgcmVmID0gZG9jLmNoaWxkcmVuO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICByICs9IHRoaXMud3JpdGVDaGlsZE5vZGUoY2hpbGQsIG9wdGlvbnMsIDApO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMucHJldHR5ICYmIHIuc2xpY2UoLW9wdGlvbnMubmV3bGluZS5sZW5ndGgpID09PSBvcHRpb25zLm5ld2xpbmUpIHtcbiAgICAgICAgciA9IHIuc2xpY2UoMCwgLW9wdGlvbnMubmV3bGluZS5sZW5ndGgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIHJldHVybiBYTUxTdHJpbmdXcml0ZXI7XG5cbiAgfSkoWE1MV3JpdGVyQmFzZSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgWE1MU3RyaW5naWZpZXIsXG4gICAgYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH0sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIG1vZHVsZS5leHBvcnRzID0gWE1MU3RyaW5naWZpZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MU3RyaW5naWZpZXIob3B0aW9ucykge1xuICAgICAgdGhpcy5hc3NlcnRMZWdhbE5hbWUgPSBiaW5kKHRoaXMuYXNzZXJ0TGVnYWxOYW1lLCB0aGlzKTtcbiAgICAgIHRoaXMuYXNzZXJ0TGVnYWxDaGFyID0gYmluZCh0aGlzLmFzc2VydExlZ2FsQ2hhciwgdGhpcyk7XG4gICAgICB2YXIga2V5LCByZWYsIHZhbHVlO1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy52ZXJzaW9uKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy52ZXJzaW9uID0gJzEuMCc7XG4gICAgICB9XG4gICAgICByZWYgPSBvcHRpb25zLnN0cmluZ2lmeSB8fCB7fTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICB0aGlzW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUubmFtZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsTmFtZSgnJyArIHZhbCB8fCAnJyk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS50ZXh0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKHRoaXMudGV4dEVzY2FwZSgnJyArIHZhbCB8fCAnJykpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuY2RhdGEgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICB2YWwgPSAnJyArIHZhbCB8fCAnJztcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKCddXT4nLCAnXV1dXT48IVtDREFUQVs+Jyk7XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIodmFsKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICB2YWwgPSAnJyArIHZhbCB8fCAnJztcbiAgICAgIGlmICh2YWwubWF0Y2goLy0tLykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29tbWVudCB0ZXh0IGNhbm5vdCBjb250YWluIGRvdWJsZS1oeXBlbjogXCIgKyB2YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKHZhbCk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5yYXcgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gJycgKyB2YWwgfHwgJyc7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5hdHRWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcih0aGlzLmF0dEVzY2FwZSh2YWwgPSAnJyArIHZhbCB8fCAnJykpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuaW5zVGFyZ2V0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKCcnICsgdmFsIHx8ICcnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmluc1ZhbHVlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgdmFsID0gJycgKyB2YWwgfHwgJyc7XG4gICAgICBpZiAodmFsLm1hdGNoKC9cXD8+LykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwcm9jZXNzaW5nIGluc3RydWN0aW9uIHZhbHVlOiBcIiArIHZhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIodmFsKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLnhtbFZlcnNpb24gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICB2YWwgPSAnJyArIHZhbCB8fCAnJztcbiAgICAgIGlmICghdmFsLm1hdGNoKC8xXFwuWzAtOV0rLykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2ZXJzaW9uIG51bWJlcjogXCIgKyB2YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLnhtbEVuY29kaW5nID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgdmFsID0gJycgKyB2YWwgfHwgJyc7XG4gICAgICBpZiAoIXZhbC5tYXRjaCgvXltBLVphLXpdKD86W0EtWmEtejAtOS5fLV0pKiQvKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGVuY29kaW5nOiBcIiArIHZhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIodmFsKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLnhtbFN0YW5kYWxvbmUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIHJldHVybiBcInllc1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwibm9cIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmR0ZFB1YklEID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKCcnICsgdmFsIHx8ICcnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmR0ZFN5c0lEID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKCcnICsgdmFsIHx8ICcnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmR0ZEVsZW1lbnRWYWx1ZSA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmFzc2VydExlZ2FsQ2hhcignJyArIHZhbCB8fCAnJyk7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5kdGRBdHRUeXBlID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0TGVnYWxDaGFyKCcnICsgdmFsIHx8ICcnKTtcbiAgICB9O1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmR0ZEF0dERlZmF1bHQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIoJycgKyB2YWwgfHwgJycpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuZHRkRW50aXR5VmFsdWUgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIoJycgKyB2YWwgfHwgJycpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuZHRkTkRhdGEgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hc3NlcnRMZWdhbENoYXIoJycgKyB2YWwgfHwgJycpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuY29udmVydEF0dEtleSA9ICdAJztcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5jb252ZXJ0UElLZXkgPSAnPyc7XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuY29udmVydFRleHRLZXkgPSAnI3RleHQnO1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmNvbnZlcnRDRGF0YUtleSA9ICcjY2RhdGEnO1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmNvbnZlcnRDb21tZW50S2V5ID0gJyNjb21tZW50JztcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5jb252ZXJ0UmF3S2V5ID0gJyNyYXcnO1xuXG4gICAgWE1MU3RyaW5naWZpZXIucHJvdG90eXBlLmFzc2VydExlZ2FsQ2hhciA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgdmFyIHJlZ2V4LCByZXM7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgcmVnZXggPSAnJztcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudmVyc2lvbiA9PT0gJzEuMCcpIHtcbiAgICAgICAgcmVnZXggPSAvW1xcMC1cXHgwOFxceDBCXFxmXFx4MEUtXFx4MUZcXHVGRkZFXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0vO1xuICAgICAgICBpZiAocmVzID0gc3RyLm1hdGNoKHJlZ2V4KSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIHN0cmluZzogXCIgKyBzdHIgKyBcIiBhdCBpbmRleCBcIiArIHJlcy5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnZlcnNpb24gPT09ICcxLjEnKSB7XG4gICAgICAgIHJlZ2V4ID0gL1tcXDBcXHVGRkZFXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0vO1xuICAgICAgICBpZiAocmVzID0gc3RyLm1hdGNoKHJlZ2V4KSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIHN0cmluZzogXCIgKyBzdHIgKyBcIiBhdCBpbmRleCBcIiArIHJlcy5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfTtcblxuICAgIFhNTFN0cmluZ2lmaWVyLnByb3RvdHlwZS5hc3NlcnRMZWdhbE5hbWUgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgIHZhciByZWdleDtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubm9WYWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgICB9XG4gICAgICB0aGlzLmFzc2VydExlZ2FsQ2hhcihzdHIpO1xuICAgICAgcmVnZXggPSAvXihbOkEtWl9hLXpcXHhDMC1cXHhENlxceEQ4LVxceEY2XFx4RjgtXFx1MDJGRlxcdTAzNzAtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMENcXHUyMDBEXFx1MjA3MC1cXHUyMThGXFx1MkMwMC1cXHUyRkVGXFx1MzAwMS1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkZEXXxbXFx1RDgwMC1cXHVEQjdGXVtcXHVEQzAwLVxcdURGRkZdKShbXFx4MkRcXC4wLTpBLVpfYS16XFx4QjdcXHhDMC1cXHhENlxceEQ4LVxceEY2XFx4RjgtXFx1MDM3RFxcdTAzN0YtXFx1MUZGRlxcdTIwMENcXHUyMDBEXFx1MjAzRlxcdTIwNDBcXHUyMDcwLVxcdTIxOEZcXHUyQzAwLVxcdTJGRUZcXHUzMDAxLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRkRdfFtcXHVEODAwLVxcdURCN0ZdW1xcdURDMDAtXFx1REZGRl0pKiQvO1xuICAgICAgaWYgKCFzdHIubWF0Y2gocmVnZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY2hhcmFjdGVyIGluIG5hbWVcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUudGV4dEVzY2FwZSA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgdmFyIGFtcHJlZ2V4O1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5ub1ZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICAgIGFtcHJlZ2V4ID0gdGhpcy5vcHRpb25zLm5vRG91YmxlRW5jb2RpbmcgPyAvKD8hJlxcUys7KSYvZyA6IC8mL2c7XG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UoYW1wcmVnZXgsICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7JykucmVwbGFjZSgvXFxyL2csICcmI3hEOycpO1xuICAgIH07XG5cbiAgICBYTUxTdHJpbmdpZmllci5wcm90b3R5cGUuYXR0RXNjYXBlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICB2YXIgYW1wcmVnZXg7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLm5vVmFsaWRhdGlvbikge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuICAgICAgYW1wcmVnZXggPSB0aGlzLm9wdGlvbnMubm9Eb3VibGVFbmNvZGluZyA/IC8oPyEmXFxTKzspJi9nIDogLyYvZztcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZShhbXByZWdleCwgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKS5yZXBsYWNlKC9cXHQvZywgJyYjeDk7JykucmVwbGFjZSgvXFxuL2csICcmI3hBOycpLnJlcGxhY2UoL1xcci9nLCAnJiN4RDsnKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFhNTFN0cmluZ2lmaWVyO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuMTIuN1xuKGZ1bmN0aW9uKCkge1xuICB2YXIgTm9kZVR5cGUsIFhNTENoYXJhY3RlckRhdGEsIFhNTFRleHQsXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChoYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxDaGFyYWN0ZXJEYXRhID0gcmVxdWlyZSgnLi9YTUxDaGFyYWN0ZXJEYXRhJyk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBYTUxUZXh0ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoWE1MVGV4dCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBYTUxUZXh0KHBhcmVudCwgdGV4dCkge1xuICAgICAgWE1MVGV4dC5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuICAgICAgaWYgKHRleHQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGVsZW1lbnQgdGV4dC4gXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubmFtZSA9IFwiI3RleHRcIjtcbiAgICAgIHRoaXMudHlwZSA9IE5vZGVUeXBlLlRleHQ7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5zdHJpbmdpZnkudGV4dCh0ZXh0KTtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoWE1MVGV4dC5wcm90b3R5cGUsICdpc0VsZW1lbnRDb250ZW50V2hpdGVzcGFjZScsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoaXMgRE9NIG1ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQuXCIgKyB0aGlzLmRlYnVnSW5mbygpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShYTUxUZXh0LnByb3RvdHlwZSwgJ3dob2xlVGV4dCcsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBuZXh0LCBwcmV2LCBzdHI7XG4gICAgICAgIHN0ciA9ICcnO1xuICAgICAgICBwcmV2ID0gdGhpcy5wcmV2aW91c1NpYmxpbmc7XG4gICAgICAgIHdoaWxlIChwcmV2KSB7XG4gICAgICAgICAgc3RyID0gcHJldi5kYXRhICsgc3RyO1xuICAgICAgICAgIHByZXYgPSBwcmV2LnByZXZpb3VzU2libGluZztcbiAgICAgICAgfVxuICAgICAgICBzdHIgKz0gdGhpcy5kYXRhO1xuICAgICAgICBuZXh0ID0gdGhpcy5uZXh0U2libGluZztcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICBzdHIgPSBzdHIgKyBuZXh0LmRhdGE7XG4gICAgICAgICAgbmV4dCA9IG5leHQubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFhNTFRleHQucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICB9O1xuXG4gICAgWE1MVGV4dC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLndyaXRlci50ZXh0KHRoaXMsIHRoaXMub3B0aW9ucy53cml0ZXIuZmlsdGVyT3B0aW9ucyhvcHRpb25zKSk7XG4gICAgfTtcblxuICAgIFhNTFRleHQucHJvdG90eXBlLnNwbGl0VGV4dCA9IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICBYTUxUZXh0LnByb3RvdHlwZS5yZXBsYWNlV2hvbGVUZXh0ID0gZnVuY3Rpb24oY29udGVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBET00gbWV0aG9kIGlzIG5vdCBpbXBsZW1lbnRlZC5cIiArIHRoaXMuZGVidWdJbmZvKCkpO1xuICAgIH07XG5cbiAgICByZXR1cm4gWE1MVGV4dDtcblxuICB9KShYTUxDaGFyYWN0ZXJEYXRhKTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS4xMi43XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBOb2RlVHlwZSwgV3JpdGVyU3RhdGUsIFhNTENEYXRhLCBYTUxDb21tZW50LCBYTUxEVERBdHRMaXN0LCBYTUxEVERFbGVtZW50LCBYTUxEVERFbnRpdHksIFhNTERURE5vdGF0aW9uLCBYTUxEZWNsYXJhdGlvbiwgWE1MRG9jVHlwZSwgWE1MRHVtbXksIFhNTEVsZW1lbnQsIFhNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbiwgWE1MUmF3LCBYTUxUZXh0LCBYTUxXcml0ZXJCYXNlLCBhc3NpZ24sXG4gICAgaGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5O1xuXG4gIGFzc2lnbiA9IHJlcXVpcmUoJy4vVXRpbGl0eScpLmFzc2lnbjtcblxuICBOb2RlVHlwZSA9IHJlcXVpcmUoJy4vTm9kZVR5cGUnKTtcblxuICBYTUxEZWNsYXJhdGlvbiA9IHJlcXVpcmUoJy4vWE1MRGVjbGFyYXRpb24nKTtcblxuICBYTUxEb2NUeXBlID0gcmVxdWlyZSgnLi9YTUxEb2NUeXBlJyk7XG5cbiAgWE1MQ0RhdGEgPSByZXF1aXJlKCcuL1hNTENEYXRhJyk7XG5cbiAgWE1MQ29tbWVudCA9IHJlcXVpcmUoJy4vWE1MQ29tbWVudCcpO1xuXG4gIFhNTEVsZW1lbnQgPSByZXF1aXJlKCcuL1hNTEVsZW1lbnQnKTtcblxuICBYTUxSYXcgPSByZXF1aXJlKCcuL1hNTFJhdycpO1xuXG4gIFhNTFRleHQgPSByZXF1aXJlKCcuL1hNTFRleHQnKTtcblxuICBYTUxQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24gPSByZXF1aXJlKCcuL1hNTFByb2Nlc3NpbmdJbnN0cnVjdGlvbicpO1xuXG4gIFhNTER1bW15ID0gcmVxdWlyZSgnLi9YTUxEdW1teScpO1xuXG4gIFhNTERUREF0dExpc3QgPSByZXF1aXJlKCcuL1hNTERUREF0dExpc3QnKTtcblxuICBYTUxEVERFbGVtZW50ID0gcmVxdWlyZSgnLi9YTUxEVERFbGVtZW50Jyk7XG5cbiAgWE1MRFRERW50aXR5ID0gcmVxdWlyZSgnLi9YTUxEVERFbnRpdHknKTtcblxuICBYTUxEVEROb3RhdGlvbiA9IHJlcXVpcmUoJy4vWE1MRFRETm90YXRpb24nKTtcblxuICBXcml0ZXJTdGF0ZSA9IHJlcXVpcmUoJy4vV3JpdGVyU3RhdGUnKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFhNTFdyaXRlckJhc2UgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWE1MV3JpdGVyQmFzZShvcHRpb25zKSB7XG4gICAgICB2YXIga2V5LCByZWYsIHZhbHVlO1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICByZWYgPSBvcHRpb25zLndyaXRlciB8fCB7fTtcbiAgICAgIGZvciAoa2V5IGluIHJlZikge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbChyZWYsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICB2YWx1ZSA9IHJlZltrZXldO1xuICAgICAgICB0aGlzW1wiX1wiICsga2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUuZmlsdGVyT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBmaWx0ZXJlZE9wdGlvbnMsIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcmVmNCwgcmVmNSwgcmVmNjtcbiAgICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgICBvcHRpb25zID0gYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgZmlsdGVyZWRPcHRpb25zID0ge1xuICAgICAgICB3cml0ZXI6IHRoaXNcbiAgICAgIH07XG4gICAgICBmaWx0ZXJlZE9wdGlvbnMucHJldHR5ID0gb3B0aW9ucy5wcmV0dHkgfHwgZmFsc2U7XG4gICAgICBmaWx0ZXJlZE9wdGlvbnMuYWxsb3dFbXB0eSA9IG9wdGlvbnMuYWxsb3dFbXB0eSB8fCBmYWxzZTtcbiAgICAgIGZpbHRlcmVkT3B0aW9ucy5pbmRlbnQgPSAocmVmID0gb3B0aW9ucy5pbmRlbnQpICE9IG51bGwgPyByZWYgOiAnICAnO1xuICAgICAgZmlsdGVyZWRPcHRpb25zLm5ld2xpbmUgPSAocmVmMSA9IG9wdGlvbnMubmV3bGluZSkgIT0gbnVsbCA/IHJlZjEgOiAnXFxuJztcbiAgICAgIGZpbHRlcmVkT3B0aW9ucy5vZmZzZXQgPSAocmVmMiA9IG9wdGlvbnMub2Zmc2V0KSAhPSBudWxsID8gcmVmMiA6IDA7XG4gICAgICBmaWx0ZXJlZE9wdGlvbnMuZG9udFByZXR0eVRleHROb2RlcyA9IChyZWYzID0gKHJlZjQgPSBvcHRpb25zLmRvbnRQcmV0dHlUZXh0Tm9kZXMpICE9IG51bGwgPyByZWY0IDogb3B0aW9ucy5kb250cHJldHR5dGV4dG5vZGVzKSAhPSBudWxsID8gcmVmMyA6IDA7XG4gICAgICBmaWx0ZXJlZE9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCA9IChyZWY1ID0gKHJlZjYgPSBvcHRpb25zLnNwYWNlQmVmb3JlU2xhc2gpICE9IG51bGwgPyByZWY2IDogb3B0aW9ucy5zcGFjZWJlZm9yZXNsYXNoKSAhPSBudWxsID8gcmVmNSA6ICcnO1xuICAgICAgaWYgKGZpbHRlcmVkT3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoID09PSB0cnVlKSB7XG4gICAgICAgIGZpbHRlcmVkT3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoID0gJyAnO1xuICAgICAgfVxuICAgICAgZmlsdGVyZWRPcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQgPSAwO1xuICAgICAgZmlsdGVyZWRPcHRpb25zLnVzZXIgPSB7fTtcbiAgICAgIGZpbHRlcmVkT3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICByZXR1cm4gZmlsdGVyZWRPcHRpb25zO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5pbmRlbnQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIGluZGVudExldmVsO1xuICAgICAgaWYgKCFvcHRpb25zLnByZXR0eSB8fCBvcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnByZXR0eSkge1xuICAgICAgICBpbmRlbnRMZXZlbCA9IChsZXZlbCB8fCAwKSArIG9wdGlvbnMub2Zmc2V0ICsgMTtcbiAgICAgICAgaWYgKGluZGVudExldmVsID4gMCkge1xuICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoaW5kZW50TGV2ZWwpLmpvaW4ob3B0aW9ucy5pbmRlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmVuZGxpbmUgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgaWYgKCFvcHRpb25zLnByZXR0eSB8fCBvcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubmV3bGluZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUuYXR0cmlidXRlID0gZnVuY3Rpb24oYXR0LCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5BdHRyaWJ1dGUoYXR0LCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByID0gJyAnICsgYXR0Lm5hbWUgKyAnPVwiJyArIGF0dC52YWx1ZSArICdcIic7XG4gICAgICB0aGlzLmNsb3NlQXR0cmlidXRlKGF0dCwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmNkYXRhID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPCFbQ0RBVEFbJztcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICByICs9IG5vZGUudmFsdWU7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICByICs9ICddXT4nICsgdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmNvbW1lbnQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8IS0tICc7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgciArPSBub2RlLnZhbHVlO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgciArPSAnIC0tPicgKyB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUuZGVjbGFyYXRpb24gPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8P3htbCc7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgciArPSAnIHZlcnNpb249XCInICsgbm9kZS52ZXJzaW9uICsgJ1wiJztcbiAgICAgIGlmIChub2RlLmVuY29kaW5nICE9IG51bGwpIHtcbiAgICAgICAgciArPSAnIGVuY29kaW5nPVwiJyArIG5vZGUuZW5jb2RpbmcgKyAnXCInO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuc3RhbmRhbG9uZSAhPSBudWxsKSB7XG4gICAgICAgIHIgKz0gJyBzdGFuZGFsb25lPVwiJyArIG5vZGUuc3RhbmRhbG9uZSArICdcIic7XG4gICAgICB9XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICByICs9IG9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCArICc/Pic7XG4gICAgICByICs9IHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5kb2NUeXBlID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciBjaGlsZCwgaSwgbGVuLCByLCByZWY7XG4gICAgICBsZXZlbCB8fCAobGV2ZWwgPSAwKTtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICByID0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgciArPSAnPCFET0NUWVBFICcgKyBub2RlLnJvb3QoKS5uYW1lO1xuICAgICAgaWYgKG5vZGUucHViSUQgJiYgbm9kZS5zeXNJRCkge1xuICAgICAgICByICs9ICcgUFVCTElDIFwiJyArIG5vZGUucHViSUQgKyAnXCIgXCInICsgbm9kZS5zeXNJRCArICdcIic7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUuc3lzSUQpIHtcbiAgICAgICAgciArPSAnIFNZU1RFTSBcIicgKyBub2RlLnN5c0lEICsgJ1wiJztcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgciArPSAnIFsnO1xuICAgICAgICByICs9IHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICAgIHJlZiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmW2ldO1xuICAgICAgICAgIHIgKz0gdGhpcy53cml0ZUNoaWxkTm9kZShjaGlsZCwgb3B0aW9ucywgbGV2ZWwgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgIHIgKz0gJ10nO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgciArPSBvcHRpb25zLnNwYWNlQmVmb3JlU2xhc2ggKyAnPic7XG4gICAgICByICs9IHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5lbGVtZW50ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciBhdHQsIGNoaWxkLCBjaGlsZE5vZGVDb3VudCwgZmlyc3RDaGlsZE5vZGUsIGksIGosIGxlbiwgbGVuMSwgbmFtZSwgcHJldHR5U3VwcHJlc3NlZCwgciwgcmVmLCByZWYxLCByZWYyO1xuICAgICAgbGV2ZWwgfHwgKGxldmVsID0gMCk7XG4gICAgICBwcmV0dHlTdXBwcmVzc2VkID0gZmFsc2U7XG4gICAgICByID0gJyc7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciArPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPCcgKyBub2RlLm5hbWU7XG4gICAgICByZWYgPSBub2RlLmF0dHJpYnM7XG4gICAgICBmb3IgKG5hbWUgaW4gcmVmKSB7XG4gICAgICAgIGlmICghaGFzUHJvcC5jYWxsKHJlZiwgbmFtZSkpIGNvbnRpbnVlO1xuICAgICAgICBhdHQgPSByZWZbbmFtZV07XG4gICAgICAgIHIgKz0gdGhpcy5hdHRyaWJ1dGUoYXR0LCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICB9XG4gICAgICBjaGlsZE5vZGVDb3VudCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgZmlyc3RDaGlsZE5vZGUgPSBjaGlsZE5vZGVDb3VudCA9PT0gMCA/IG51bGwgOiBub2RlLmNoaWxkcmVuWzBdO1xuICAgICAgaWYgKGNoaWxkTm9kZUNvdW50ID09PSAwIHx8IG5vZGUuY2hpbGRyZW4uZXZlcnkoZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gKGUudHlwZSA9PT0gTm9kZVR5cGUuVGV4dCB8fCBlLnR5cGUgPT09IE5vZGVUeXBlLlJhdykgJiYgZS52YWx1ZSA9PT0gJyc7XG4gICAgICB9KSkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbGxvd0VtcHR5KSB7XG4gICAgICAgICAgciArPSAnPic7XG4gICAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICAgIHIgKz0gJzwvJyArIG5vZGUubmFtZSArICc+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICAgIHIgKz0gb3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJy8+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wcmV0dHkgJiYgY2hpbGROb2RlQ291bnQgPT09IDEgJiYgKGZpcnN0Q2hpbGROb2RlLnR5cGUgPT09IE5vZGVUeXBlLlRleHQgfHwgZmlyc3RDaGlsZE5vZGUudHlwZSA9PT0gTm9kZVR5cGUuUmF3KSAmJiAoZmlyc3RDaGlsZE5vZGUudmFsdWUgIT0gbnVsbCkpIHtcbiAgICAgICAgciArPSAnPic7XG4gICAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICAgIG9wdGlvbnMuc3VwcHJlc3NQcmV0dHlDb3VudCsrO1xuICAgICAgICBwcmV0dHlTdXBwcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgciArPSB0aGlzLndyaXRlQ2hpbGROb2RlKGZpcnN0Q2hpbGROb2RlLCBvcHRpb25zLCBsZXZlbCArIDEpO1xuICAgICAgICBvcHRpb25zLnN1cHByZXNzUHJldHR5Q291bnQtLTtcbiAgICAgICAgcHJldHR5U3VwcHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICAgIHIgKz0gJzwvJyArIG5vZGUubmFtZSArICc+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAob3B0aW9ucy5kb250UHJldHR5VGV4dE5vZGVzKSB7XG4gICAgICAgICAgcmVmMSA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmMS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2hpbGQgPSByZWYxW2ldO1xuICAgICAgICAgICAgaWYgKChjaGlsZC50eXBlID09PSBOb2RlVHlwZS5UZXh0IHx8IGNoaWxkLnR5cGUgPT09IE5vZGVUeXBlLlJhdykgJiYgKGNoaWxkLnZhbHVlICE9IG51bGwpKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnMuc3VwcHJlc3NQcmV0dHlDb3VudCsrO1xuICAgICAgICAgICAgICBwcmV0dHlTdXBwcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHIgKz0gJz4nICsgdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgICAgcmVmMiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYyLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICAgIGNoaWxkID0gcmVmMltqXTtcbiAgICAgICAgICByICs9IHRoaXMud3JpdGVDaGlsZE5vZGUoY2hpbGQsIG9wdGlvbnMsIGxldmVsICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgICByICs9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8LycgKyBub2RlLm5hbWUgKyAnPic7XG4gICAgICAgIGlmIChwcmV0dHlTdXBwcmVzc2VkKSB7XG4gICAgICAgICAgb3B0aW9ucy5zdXBwcmVzc1ByZXR0eUNvdW50LS07XG4gICAgICAgIH1cbiAgICAgICAgciArPSB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS53cml0ZUNoaWxkTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkNEYXRhOlxuICAgICAgICAgIHJldHVybiB0aGlzLmNkYXRhKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5Db21tZW50OlxuICAgICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkVsZW1lbnQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudChub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuUmF3OlxuICAgICAgICAgIHJldHVybiB0aGlzLnJhdyhub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuVGV4dDpcbiAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0KG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5Qcm9jZXNzaW5nSW5zdHJ1Y3Rpb246XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc2luZ0luc3RydWN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgICAgY2FzZSBOb2RlVHlwZS5EdW1teTpcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuRGVjbGFyYXRpb246XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGVjbGFyYXRpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkRvY1R5cGU6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZG9jVHlwZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuQXR0cmlidXRlRGVjbGFyYXRpb246XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZHRkQXR0TGlzdChub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuRWxlbWVudERlY2xhcmF0aW9uOlxuICAgICAgICAgIHJldHVybiB0aGlzLmR0ZEVsZW1lbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgICBjYXNlIE5vZGVUeXBlLkVudGl0eURlY2xhcmF0aW9uOlxuICAgICAgICAgIHJldHVybiB0aGlzLmR0ZEVudGl0eShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGNhc2UgTm9kZVR5cGUuTm90YXRpb25EZWNsYXJhdGlvbjpcbiAgICAgICAgICByZXR1cm4gdGhpcy5kdGROb3RhdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBYTUwgbm9kZSB0eXBlOiBcIiArIG5vZGUuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLnByb2Nlc3NpbmdJbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgcjtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICByID0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpICsgJzw/JztcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICByICs9IG5vZGUudGFyZ2V0O1xuICAgICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgICAgciArPSAnICcgKyBub2RlLnZhbHVlO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgciArPSBvcHRpb25zLnNwYWNlQmVmb3JlU2xhc2ggKyAnPz4nO1xuICAgICAgciArPSB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgciArPSBub2RlLnZhbHVlO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkNsb3NlVGFnO1xuICAgICAgciArPSB0aGlzLmVuZGxpbmUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk5vbmU7XG4gICAgICB0aGlzLmNsb3NlTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICByZXR1cm4gcjtcbiAgICB9O1xuXG4gICAgWE1MV3JpdGVyQmFzZS5wcm90b3R5cGUudGV4dCA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgcjtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICByID0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgIHIgKz0gbm9kZS52YWx1ZTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmR0ZEF0dExpc3QgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8IUFUVExJU1QnO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgIHIgKz0gJyAnICsgbm9kZS5lbGVtZW50TmFtZSArICcgJyArIG5vZGUuYXR0cmlidXRlTmFtZSArICcgJyArIG5vZGUuYXR0cmlidXRlVHlwZTtcbiAgICAgIGlmIChub2RlLmRlZmF1bHRWYWx1ZVR5cGUgIT09ICcjREVGQVVMVCcpIHtcbiAgICAgICAgciArPSAnICcgKyBub2RlLmRlZmF1bHRWYWx1ZVR5cGU7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgciArPSAnIFwiJyArIG5vZGUuZGVmYXVsdFZhbHVlICsgJ1wiJztcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gb3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJz4nICsgdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmR0ZEVsZW1lbnQgPSBmdW5jdGlvbihub2RlLCBvcHRpb25zLCBsZXZlbCkge1xuICAgICAgdmFyIHI7XG4gICAgICB0aGlzLm9wZW5Ob2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5PcGVuVGFnO1xuICAgICAgciA9IHRoaXMuaW5kZW50KG5vZGUsIG9wdGlvbnMsIGxldmVsKSArICc8IUVMRU1FTlQnO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLkluc2lkZVRhZztcbiAgICAgIHIgKz0gJyAnICsgbm9kZS5uYW1lICsgJyAnICsgbm9kZS52YWx1ZTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gb3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJz4nICsgdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmR0ZEVudGl0eSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7XG4gICAgICB2YXIgcjtcbiAgICAgIHRoaXMub3Blbk5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgb3B0aW9ucy5zdGF0ZSA9IFdyaXRlclN0YXRlLk9wZW5UYWc7XG4gICAgICByID0gdGhpcy5pbmRlbnQobm9kZSwgb3B0aW9ucywgbGV2ZWwpICsgJzwhRU5USVRZJztcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5JbnNpZGVUYWc7XG4gICAgICBpZiAobm9kZS5wZSkge1xuICAgICAgICByICs9ICcgJSc7XG4gICAgICB9XG4gICAgICByICs9ICcgJyArIG5vZGUubmFtZTtcbiAgICAgIGlmIChub2RlLnZhbHVlKSB7XG4gICAgICAgIHIgKz0gJyBcIicgKyBub2RlLnZhbHVlICsgJ1wiJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChub2RlLnB1YklEICYmIG5vZGUuc3lzSUQpIHtcbiAgICAgICAgICByICs9ICcgUFVCTElDIFwiJyArIG5vZGUucHViSUQgKyAnXCIgXCInICsgbm9kZS5zeXNJRCArICdcIic7XG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5zeXNJRCkge1xuICAgICAgICAgIHIgKz0gJyBTWVNURU0gXCInICsgbm9kZS5zeXNJRCArICdcIic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUubkRhdGEpIHtcbiAgICAgICAgICByICs9ICcgTkRBVEEgJyArIG5vZGUubkRhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5DbG9zZVRhZztcbiAgICAgIHIgKz0gb3B0aW9ucy5zcGFjZUJlZm9yZVNsYXNoICsgJz4nICsgdGhpcy5lbmRsaW5lKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIG9wdGlvbnMuc3RhdGUgPSBXcml0ZXJTdGF0ZS5Ob25lO1xuICAgICAgdGhpcy5jbG9zZU5vZGUobm9kZSwgb3B0aW9ucywgbGV2ZWwpO1xuICAgICAgcmV0dXJuIHI7XG4gICAgfTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmR0ZE5vdGF0aW9uID0gZnVuY3Rpb24obm9kZSwgb3B0aW9ucywgbGV2ZWwpIHtcbiAgICAgIHZhciByO1xuICAgICAgdGhpcy5vcGVuTm9kZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuT3BlblRhZztcbiAgICAgIHIgPSB0aGlzLmluZGVudChub2RlLCBvcHRpb25zLCBsZXZlbCkgKyAnPCFOT1RBVElPTic7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuSW5zaWRlVGFnO1xuICAgICAgciArPSAnICcgKyBub2RlLm5hbWU7XG4gICAgICBpZiAobm9kZS5wdWJJRCAmJiBub2RlLnN5c0lEKSB7XG4gICAgICAgIHIgKz0gJyBQVUJMSUMgXCInICsgbm9kZS5wdWJJRCArICdcIiBcIicgKyBub2RlLnN5c0lEICsgJ1wiJztcbiAgICAgIH0gZWxzZSBpZiAobm9kZS5wdWJJRCkge1xuICAgICAgICByICs9ICcgUFVCTElDIFwiJyArIG5vZGUucHViSUQgKyAnXCInO1xuICAgICAgfSBlbHNlIGlmIChub2RlLnN5c0lEKSB7XG4gICAgICAgIHIgKz0gJyBTWVNURU0gXCInICsgbm9kZS5zeXNJRCArICdcIic7XG4gICAgICB9XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuQ2xvc2VUYWc7XG4gICAgICByICs9IG9wdGlvbnMuc3BhY2VCZWZvcmVTbGFzaCArICc+JyArIHRoaXMuZW5kbGluZShub2RlLCBvcHRpb25zLCBsZXZlbCk7XG4gICAgICBvcHRpb25zLnN0YXRlID0gV3JpdGVyU3RhdGUuTm9uZTtcbiAgICAgIHRoaXMuY2xvc2VOb2RlKG5vZGUsIG9wdGlvbnMsIGxldmVsKTtcbiAgICAgIHJldHVybiByO1xuICAgIH07XG5cbiAgICBYTUxXcml0ZXJCYXNlLnByb3RvdHlwZS5vcGVuTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7fTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmNsb3NlTm9kZSA9IGZ1bmN0aW9uKG5vZGUsIG9wdGlvbnMsIGxldmVsKSB7fTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLm9wZW5BdHRyaWJ1dGUgPSBmdW5jdGlvbihhdHQsIG9wdGlvbnMsIGxldmVsKSB7fTtcblxuICAgIFhNTFdyaXRlckJhc2UucHJvdG90eXBlLmNsb3NlQXR0cmlidXRlID0gZnVuY3Rpb24oYXR0LCBvcHRpb25zLCBsZXZlbCkge307XG5cbiAgICByZXR1cm4gWE1MV3JpdGVyQmFzZTtcblxuICB9KSgpO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEyLjdcbihmdW5jdGlvbigpIHtcbiAgdmFyIE5vZGVUeXBlLCBXcml0ZXJTdGF0ZSwgWE1MRE9NSW1wbGVtZW50YXRpb24sIFhNTERvY3VtZW50LCBYTUxEb2N1bWVudENCLCBYTUxTdHJlYW1Xcml0ZXIsIFhNTFN0cmluZ1dyaXRlciwgYXNzaWduLCBpc0Z1bmN0aW9uLCByZWY7XG5cbiAgcmVmID0gcmVxdWlyZSgnLi9VdGlsaXR5JyksIGFzc2lnbiA9IHJlZi5hc3NpZ24sIGlzRnVuY3Rpb24gPSByZWYuaXNGdW5jdGlvbjtcblxuICBYTUxET01JbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vWE1MRE9NSW1wbGVtZW50YXRpb24nKTtcblxuICBYTUxEb2N1bWVudCA9IHJlcXVpcmUoJy4vWE1MRG9jdW1lbnQnKTtcblxuICBYTUxEb2N1bWVudENCID0gcmVxdWlyZSgnLi9YTUxEb2N1bWVudENCJyk7XG5cbiAgWE1MU3RyaW5nV3JpdGVyID0gcmVxdWlyZSgnLi9YTUxTdHJpbmdXcml0ZXInKTtcblxuICBYTUxTdHJlYW1Xcml0ZXIgPSByZXF1aXJlKCcuL1hNTFN0cmVhbVdyaXRlcicpO1xuXG4gIE5vZGVUeXBlID0gcmVxdWlyZSgnLi9Ob2RlVHlwZScpO1xuXG4gIFdyaXRlclN0YXRlID0gcmVxdWlyZSgnLi9Xcml0ZXJTdGF0ZScpO1xuXG4gIG1vZHVsZS5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uKG5hbWUsIHhtbGRlYywgZG9jdHlwZSwgb3B0aW9ucykge1xuICAgIHZhciBkb2MsIHJvb3Q7XG4gICAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUm9vdCBlbGVtZW50IG5lZWRzIGEgbmFtZS5cIik7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBhc3NpZ24oe30sIHhtbGRlYywgZG9jdHlwZSwgb3B0aW9ucyk7XG4gICAgZG9jID0gbmV3IFhNTERvY3VtZW50KG9wdGlvbnMpO1xuICAgIHJvb3QgPSBkb2MuZWxlbWVudChuYW1lKTtcbiAgICBpZiAoIW9wdGlvbnMuaGVhZGxlc3MpIHtcbiAgICAgIGRvYy5kZWNsYXJhdGlvbihvcHRpb25zKTtcbiAgICAgIGlmICgob3B0aW9ucy5wdWJJRCAhPSBudWxsKSB8fCAob3B0aW9ucy5zeXNJRCAhPSBudWxsKSkge1xuICAgICAgICBkb2MuZHRkKG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcm9vdDtcbiAgfTtcblxuICBtb2R1bGUuZXhwb3J0cy5iZWdpbiA9IGZ1bmN0aW9uKG9wdGlvbnMsIG9uRGF0YSwgb25FbmQpIHtcbiAgICB2YXIgcmVmMTtcbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgcmVmMSA9IFtvcHRpb25zLCBvbkRhdGFdLCBvbkRhdGEgPSByZWYxWzBdLCBvbkVuZCA9IHJlZjFbMV07XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGlmIChvbkRhdGEpIHtcbiAgICAgIHJldHVybiBuZXcgWE1MRG9jdW1lbnRDQihvcHRpb25zLCBvbkRhdGEsIG9uRW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBYTUxEb2N1bWVudChvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMuc3RyaW5nV3JpdGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgWE1MU3RyaW5nV3JpdGVyKG9wdGlvbnMpO1xuICB9O1xuXG4gIG1vZHVsZS5leHBvcnRzLnN0cmVhbVdyaXRlciA9IGZ1bmN0aW9uKHN0cmVhbSwgb3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgWE1MU3RyZWFtV3JpdGVyKHN0cmVhbSwgb3B0aW9ucyk7XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMuaW1wbGVtZW50YXRpb24gPSBuZXcgWE1MRE9NSW1wbGVtZW50YXRpb24oKTtcblxuICBtb2R1bGUuZXhwb3J0cy5ub2RlVHlwZSA9IE5vZGVUeXBlO1xuXG4gIG1vZHVsZS5leHBvcnRzLndyaXRlclN0YXRlID0gV3JpdGVyU3RhdGU7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFwLXVuaXQtYXJyaXZhbC9pbmRleC50c1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=