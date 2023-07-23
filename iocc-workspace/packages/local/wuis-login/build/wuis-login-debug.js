var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = false;
$jscomp.ASSUME_NO_NATIVE_MAP = false;
$jscomp.ASSUME_NO_NATIVE_SET = false;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || typeof Object.defineProperties == 'function' ? Object.defineProperty : function(target, property, descriptor) {
  descriptor = descriptor;
  if (target == Array.prototype || target == Object.prototype) {
    return;
  }
  target[property] = descriptor.value;
};
$jscomp.getGlobal = function(maybeGlobal) {
  return typeof window != 'undefined' && window === maybeGlobal ? maybeGlobal : typeof global != 'undefined' && global != null ? global : maybeGlobal;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(target, polyfill, fromLang, toLang) {
  if (!polyfill) {
    return;
  }
  var obj = $jscomp.global;
  var split = target.split('.');
  for (var i = 0; i < split.length - 1; i++) {
    var key = split[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  var property = split[split.length - 1];
  var orig = obj[property];
  var impl = polyfill(orig);
  if (impl == orig || impl == null) {
    return;
  }
  $jscomp.defineProperty(obj, property, {configurable:true, writable:true, value:impl});
};
$jscomp.polyfill('Array.prototype.copyWithin', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, start, opt_end) {
    var len = this.length;
    target = Number(target);
    start = Number(start);
    opt_end = Number(opt_end != null ? opt_end : len);
    if (target < start) {
      opt_end = Math.min(opt_end, len);
      while (start < opt_end) {
        if (start in this) {
          this[target++] = this[start++];
        } else {
          delete this[target++];
          start++;
        }
      }
    } else {
      opt_end = Math.min(opt_end, len + start - target);
      target += opt_end - start;
      while (opt_end > start) {
        if (--opt_end in this) {
          this[--target] = this[opt_end];
        } else {
          delete this[target];
        }
      }
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.SYMBOL_PREFIX = 'jscomp_symbol_';
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  if (!$jscomp.global['Symbol']) {
    $jscomp.global['Symbol'] = $jscomp.Symbol;
  }
};
$jscomp.Symbol = function() {
  var counter = 0;
  function Symbol(opt_description) {
    return $jscomp.SYMBOL_PREFIX + (opt_description || '') + counter++;
  }
  return Symbol;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var symbolIterator = $jscomp.global['Symbol'].iterator;
  if (!symbolIterator) {
    symbolIterator = $jscomp.global['Symbol'].iterator = $jscomp.global['Symbol']('iterator');
  }
  if (typeof Array.prototype[symbolIterator] != 'function') {
    $jscomp.defineProperty(Array.prototype, symbolIterator, {configurable:true, writable:true, value:function() {
      return $jscomp.arrayIterator(this);
    }});
  }
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(array) {
  var index = 0;
  return $jscomp.iteratorPrototype(function() {
    if (index < array.length) {
      return {done:false, value:array[index++]};
    } else {
      return {done:true};
    }
  });
};
$jscomp.iteratorPrototype = function(next) {
  $jscomp.initSymbolIterator();
  var iterator = {next:next};
  iterator[$jscomp.global['Symbol'].iterator] = function() {
    return this;
  };
  return iterator;
};
$jscomp.iteratorFromArray = function(array, transform) {
  $jscomp.initSymbolIterator();
  if (array instanceof String) {
    array = array + '';
  }
  var i = 0;
  var iter = {next:function() {
    if (i < array.length) {
      var index = i++;
      return {value:transform(index, array[index]), done:false};
    }
    iter.next = function() {
      return {done:true, value:void 0};
    };
    return iter.next();
  }};
  iter[Symbol.iterator] = function() {
    return iter;
  };
  return iter;
};
$jscomp.polyfill('Array.prototype.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i, v) {
      return [i, v];
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.fill', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(value, opt_start, opt_end) {
    var length = this.length || 0;
    if (opt_start < 0) {
      opt_start = Math.max(0, length + opt_start);
    }
    if (opt_end == null || opt_end > length) {
      opt_end = length;
    }
    opt_end = Number(opt_end);
    if (opt_end < 0) {
      opt_end = Math.max(0, length + opt_end);
    }
    for (var i = Number(opt_start || 0); i < opt_end; i++) {
      this[i] = value;
    }
    return this;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.findInternal = function(array, callback, thisArg) {
  if (array instanceof String) {
    array = String(array);
  }
  var len = array.length;
  for (var i = 0; i < len; i++) {
    var value = array[i];
    if (callback.call(thisArg, value, i, array)) {
      return {i:i, v:value};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill('Array.prototype.find', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).v;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.findIndex', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(callback, opt_thisArg) {
    return $jscomp.findInternal(this, callback, opt_thisArg).i;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.from', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(arrayLike, opt_mapFn, opt_thisArg) {
    $jscomp.initSymbolIterator();
    opt_mapFn = opt_mapFn != null ? opt_mapFn : function(x) {
      return x;
    };
    var result = [];
    var iteratorFunction = arrayLike[Symbol.iterator];
    if (typeof iteratorFunction == 'function') {
      arrayLike = iteratorFunction.call(arrayLike);
      var next;
      var k = 0;
      while (!(next = arrayLike.next()).done) {
        result.push(opt_mapFn.call(opt_thisArg, next.value, k++));
      }
    } else {
      var len = arrayLike.length;
      for (var i = 0; i < len; i++) {
        result.push(opt_mapFn.call(opt_thisArg, arrayLike[i], i));
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Object.is', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(left, right) {
    if (left === right) {
      return left !== 0 || 1 / left === 1 / right;
    } else {
      return left !== left && right !== right;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var includes = function(searchElement, opt_fromIndex) {
    var array = this;
    if (array instanceof String) {
      array = String(array);
    }
    var len = array.length;
    var i = opt_fromIndex || 0;
    if (i < 0) {
      i = Math.max(i + len, 0);
    }
    for (; i < len; i++) {
      var element = array[i];
      if (element === searchElement || Object.is(element, searchElement)) {
        return true;
      }
    }
    return false;
  };
  return includes;
}, 'es7', 'es3');
$jscomp.polyfill('Array.prototype.keys', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(i) {
      return i;
    });
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.of', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    return Array.from(arguments);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Array.prototype.values', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function() {
    return $jscomp.iteratorFromArray(this, function(k, v) {
      return v;
    });
  };
  return polyfill;
}, 'es8', 'es3');
$jscomp.makeIterator = function(iterable) {
  $jscomp.initSymbolIterator();
  var iteratorFunction = iterable[Symbol.iterator];
  return iteratorFunction ? iteratorFunction.call(iterable) : $jscomp.arrayIterator(iterable);
};
$jscomp.FORCE_POLYFILL_PROMISE = false;
$jscomp.polyfill('Promise', function(NativePromise) {
  if (NativePromise && !$jscomp.FORCE_POLYFILL_PROMISE) {
    return NativePromise;
  }
  function AsyncExecutor() {
    this.batch_ = null;
  }
  AsyncExecutor.prototype.asyncExecute = function(f) {
    if (this.batch_ == null) {
      this.batch_ = [];
      this.asyncExecuteBatch_();
    }
    this.batch_.push(f);
    return this;
  };
  AsyncExecutor.prototype.asyncExecuteBatch_ = function() {
    var self = this;
    this.asyncExecuteFunction(function() {
      self.executeBatch_();
    });
  };
  var nativeSetTimeout = $jscomp.global['setTimeout'];
  AsyncExecutor.prototype.asyncExecuteFunction = function(f) {
    nativeSetTimeout(f, 0);
  };
  AsyncExecutor.prototype.executeBatch_ = function() {
    while (this.batch_ && this.batch_.length) {
      var executingBatch = this.batch_;
      this.batch_ = [];
      for (var i = 0; i < executingBatch.length; ++i) {
        var f = executingBatch[i];
        executingBatch[i] = null;
        try {
          f();
        } catch (error) {
          this.asyncThrow_(error);
        }
      }
    }
    this.batch_ = null;
  };
  AsyncExecutor.prototype.asyncThrow_ = function(exception) {
    this.asyncExecuteFunction(function() {
      throw exception;
    });
  };
  var PromiseState = {PENDING:0, FULFILLED:1, REJECTED:2};
  var PolyfillPromise = function(executor) {
    this.state_ = PromiseState.PENDING;
    this.result_ = undefined;
    this.onSettledCallbacks_ = [];
    var resolveAndReject = this.createResolveAndReject_();
    try {
      executor(resolveAndReject.resolve, resolveAndReject.reject);
    } catch (e) {
      resolveAndReject.reject(e);
    }
  };
  PolyfillPromise.prototype.createResolveAndReject_ = function() {
    var thisPromise = this;
    var alreadyCalled = false;
    function firstCallWins(method) {
      return function(x) {
        if (!alreadyCalled) {
          alreadyCalled = true;
          method.call(thisPromise, x);
        }
      };
    }
    return {resolve:firstCallWins(this.resolveTo_), reject:firstCallWins(this.reject_)};
  };
  PolyfillPromise.prototype.resolveTo_ = function(value) {
    if (value === this) {
      this.reject_(new TypeError('A Promise cannot resolve to itself'));
    } else {
      if (value instanceof PolyfillPromise) {
        this.settleSameAsPromise_(value);
      } else {
        if (isObject(value)) {
          this.resolveToNonPromiseObj_(value);
        } else {
          this.fulfill_(value);
        }
      }
    }
  };
  PolyfillPromise.prototype.resolveToNonPromiseObj_ = function(obj) {
    var thenMethod = undefined;
    try {
      thenMethod = obj.then;
    } catch (error) {
      this.reject_(error);
      return;
    }
    if (typeof thenMethod == 'function') {
      this.settleSameAsThenable_(thenMethod, obj);
    } else {
      this.fulfill_(obj);
    }
  };
  function isObject(value) {
    switch(typeof value) {
      case 'object':
        return value != null;
      case 'function':
        return true;
      default:
        return false;
    }
  }
  PolyfillPromise.prototype.reject_ = function(reason) {
    this.settle_(PromiseState.REJECTED, reason);
  };
  PolyfillPromise.prototype.fulfill_ = function(value) {
    this.settle_(PromiseState.FULFILLED, value);
  };
  PolyfillPromise.prototype.settle_ = function(settledState, valueOrReason) {
    if (this.state_ != PromiseState.PENDING) {
      throw new Error('Cannot settle(' + settledState + ', ' + valueOrReason + '): Promise already settled in state' + this.state_);
    }
    this.state_ = settledState;
    this.result_ = valueOrReason;
    this.executeOnSettledCallbacks_();
  };
  PolyfillPromise.prototype.executeOnSettledCallbacks_ = function() {
    if (this.onSettledCallbacks_ != null) {
      for (var i = 0; i < this.onSettledCallbacks_.length; ++i) {
        asyncExecutor.asyncExecute(this.onSettledCallbacks_[i]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var asyncExecutor = new AsyncExecutor;
  PolyfillPromise.prototype.settleSameAsPromise_ = function(promise) {
    var methods = this.createResolveAndReject_();
    promise.callWhenSettled_(methods.resolve, methods.reject);
  };
  PolyfillPromise.prototype.settleSameAsThenable_ = function(thenMethod, thenable) {
    var methods = this.createResolveAndReject_();
    try {
      thenMethod.call(thenable, methods.resolve, methods.reject);
    } catch (error) {
      methods.reject(error);
    }
  };
  PolyfillPromise.prototype.then = function(onFulfilled, onRejected) {
    var resolveChild;
    var rejectChild;
    var childPromise = new PolyfillPromise(function(resolve, reject) {
      resolveChild = resolve;
      rejectChild = reject;
    });
    function createCallback(paramF, defaultF) {
      if (typeof paramF == 'function') {
        return function(x) {
          try {
            resolveChild(paramF(x));
          } catch (error) {
            rejectChild(error);
          }
        };
      } else {
        return defaultF;
      }
    }
    this.callWhenSettled_(createCallback(onFulfilled, resolveChild), createCallback(onRejected, rejectChild));
    return childPromise;
  };
  PolyfillPromise.prototype['catch'] = function(onRejected) {
    return this.then(undefined, onRejected);
  };
  PolyfillPromise.prototype.callWhenSettled_ = function(onFulfilled, onRejected) {
    var thisPromise = this;
    function callback() {
      switch(thisPromise.state_) {
        case PromiseState.FULFILLED:
          onFulfilled(thisPromise.result_);
          break;
        case PromiseState.REJECTED:
          onRejected(thisPromise.result_);
          break;
        default:
          throw new Error('Unexpected state: ' + thisPromise.state_);
      }
    }
    if (this.onSettledCallbacks_ == null) {
      asyncExecutor.asyncExecute(callback);
    } else {
      this.onSettledCallbacks_.push(callback);
    }
  };
  function resolvingPromise(opt_value) {
    if (opt_value instanceof PolyfillPromise) {
      return opt_value;
    } else {
      return new PolyfillPromise(function(resolve, reject) {
        resolve(opt_value);
      });
    }
  }
  PolyfillPromise['resolve'] = resolvingPromise;
  PolyfillPromise['reject'] = function(opt_reason) {
    return new PolyfillPromise(function(resolve, reject) {
      reject(opt_reason);
    });
  };
  PolyfillPromise['race'] = function(thenablesOrValues) {
    return new PolyfillPromise(function(resolve, reject) {
      var iterator = $jscomp.makeIterator(thenablesOrValues);
      for (var iterRec = iterator.next(); !iterRec.done; iterRec = iterator.next()) {
        resolvingPromise(iterRec.value).callWhenSettled_(resolve, reject);
      }
    });
  };
  PolyfillPromise['all'] = function(thenablesOrValues) {
    var iterator = $jscomp.makeIterator(thenablesOrValues);
    var iterRec = iterator.next();
    if (iterRec.done) {
      return resolvingPromise([]);
    } else {
      return new PolyfillPromise(function(resolveAll, rejectAll) {
        var resultsArray = [];
        var unresolvedCount = 0;
        function onFulfilled(i) {
          return function(ithResult) {
            resultsArray[i] = ithResult;
            unresolvedCount--;
            if (unresolvedCount == 0) {
              resolveAll(resultsArray);
            }
          };
        }
        do {
          resultsArray.push(undefined);
          unresolvedCount++;
          resolvingPromise(iterRec.value).callWhenSettled_(onFulfilled(resultsArray.length - 1), rejectAll);
          iterRec = iterator.next();
        } while (!iterRec.done);
      });
    }
  };
  return PolyfillPromise;
}, 'es6', 'es3');
$jscomp.polyfill('Promise.prototype.finally', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(onFinally) {
    return this.then(function(value) {
      var promise = Promise.resolve(onFinally());
      return promise.then(function() {
        return value;
      });
    }, function(reason) {
      var promise = Promise.resolve(onFinally());
      return promise.then(function() {
        throw reason;
      });
    });
  };
  return polyfill;
}, 'es9', 'es3');
$jscomp.underscoreProtoCanBeSet = function() {
  var x = {a:true};
  var y = {};
  try {
    y.__proto__ = x;
    return y.a;
  } catch (e) {
  }
  return false;
};
$jscomp.setPrototypeOf = typeof Object.setPrototypeOf == 'function' ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(target, proto) {
  target.__proto__ = proto;
  if (target.__proto__ !== proto) {
    throw new TypeError(target + ' is not extensible');
  }
  return target;
} : null;
$jscomp.generator = {};
$jscomp.generator.ensureIteratorResultIsObject_ = function(result) {
  if (result instanceof Object) {
    return;
  }
  throw new TypeError('Iterator result ' + result + ' is not an object');
};
$jscomp.generator.Context = function() {
  this.isRunning_ = false;
  this.yieldAllIterator_ = null;
  this.yieldResult = undefined;
  this.nextAddress = 1;
  this.catchAddress_ = 0;
  this.finallyAddress_ = 0;
  this.abruptCompletion_ = null;
  this.finallyContexts_ = null;
};
$jscomp.generator.Context.prototype.start_ = function() {
  if (this.isRunning_) {
    throw new TypeError('Generator is already running');
  }
  this.isRunning_ = true;
};
$jscomp.generator.Context.prototype.stop_ = function() {
  this.isRunning_ = false;
};
$jscomp.generator.Context.prototype.jumpToErrorHandler_ = function() {
  this.nextAddress = this.catchAddress_ || this.finallyAddress_;
};
$jscomp.generator.Context.prototype.next_ = function(value) {
  this.yieldResult = value;
};
$jscomp.generator.Context.prototype.throw_ = function(e) {
  this.abruptCompletion_ = {exception:e, isException:true};
  this.jumpToErrorHandler_();
};
$jscomp.generator.Context.prototype['return'] = function(value) {
  this.abruptCompletion_ = {'return':value};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks = function(nextAddress) {
  this.abruptCompletion_ = {jumpTo:nextAddress};
  this.nextAddress = this.finallyAddress_;
};
$jscomp.generator.Context.prototype.yield = function(value, resumeAddress) {
  this.nextAddress = resumeAddress;
  return {value:value};
};
$jscomp.generator.Context.prototype.yieldAll = function(iterable, resumeAddress) {
  var iterator = $jscomp.makeIterator(iterable);
  var result = iterator.next();
  $jscomp.generator.ensureIteratorResultIsObject_(result);
  if (result.done) {
    this.yieldResult = result.value;
    this.nextAddress = resumeAddress;
    return;
  }
  this.yieldAllIterator_ = iterator;
  return this.yield(result.value, resumeAddress);
};
$jscomp.generator.Context.prototype.jumpTo = function(nextAddress) {
  this.nextAddress = nextAddress;
};
$jscomp.generator.Context.prototype.jumpToEnd = function() {
  this.nextAddress = 0;
};
$jscomp.generator.Context.prototype.setCatchFinallyBlocks = function(catchAddress, finallyAddress) {
  this.catchAddress_ = catchAddress;
  if (finallyAddress != undefined) {
    this.finallyAddress_ = finallyAddress;
  }
};
$jscomp.generator.Context.prototype.setFinallyBlock = function(finallyAddress) {
  this.catchAddress_ = 0;
  this.finallyAddress_ = finallyAddress || 0;
};
$jscomp.generator.Context.prototype.leaveTryBlock = function(nextAddress, catchAddress) {
  this.nextAddress = nextAddress;
  this.catchAddress_ = catchAddress || 0;
};
$jscomp.generator.Context.prototype.enterCatchBlock = function(nextCatchBlockAddress) {
  this.catchAddress_ = nextCatchBlockAddress || 0;
  var exception = this.abruptCompletion_.exception;
  this.abruptCompletion_ = null;
  return exception;
};
$jscomp.generator.Context.prototype.enterFinallyBlock = function(nextCatchAddress, nextFinallyAddress, finallyDepth) {
  if (!finallyDepth) {
    this.finallyContexts_ = [this.abruptCompletion_];
  } else {
    this.finallyContexts_[finallyDepth] = this.abruptCompletion_;
  }
  this.catchAddress_ = nextCatchAddress || 0;
  this.finallyAddress_ = nextFinallyAddress || 0;
};
$jscomp.generator.Context.prototype.leaveFinallyBlock = function(nextAddress, finallyDepth) {
  var preservedContext = this.finallyContexts_.splice(finallyDepth || 0)[0];
  var abruptCompletion = this.abruptCompletion_ = this.abruptCompletion_ || preservedContext;
  if (abruptCompletion) {
    if (abruptCompletion.isException) {
      return this.jumpToErrorHandler_();
    }
    if (abruptCompletion.jumpTo != undefined && this.finallyAddress_ < abruptCompletion.jumpTo) {
      this.nextAddress = abruptCompletion.jumpTo;
      this.abruptCompletion_ = null;
    } else {
      this.nextAddress = this.finallyAddress_;
    }
  } else {
    this.nextAddress = nextAddress;
  }
};
$jscomp.generator.Context.prototype.forIn = function(object) {
  return new $jscomp.generator.Context.PropertyIterator(object);
};
$jscomp.generator.Context.PropertyIterator = function(object) {
  this.object_ = object;
  this.properties_ = [];
  for (var property in object) {
    this.properties_.push(property);
  }
  this.properties_.reverse();
};
$jscomp.generator.Context.PropertyIterator.prototype.getNext = function() {
  while (this.properties_.length > 0) {
    var property = this.properties_.pop();
    if (property in this.object_) {
      return property;
    }
  }
  return null;
};
$jscomp.generator.Engine_ = function(program) {
  this.context_ = new $jscomp.generator.Context;
  this.program_ = program;
};
$jscomp.generator.Engine_.prototype.next_ = function(value) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_.next, value, this.context_.next_);
  }
  this.context_.next_(value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.return_ = function(value) {
  this.context_.start_();
  var yieldAllIterator = this.context_.yieldAllIterator_;
  if (yieldAllIterator) {
    var returnFunction = 'return' in yieldAllIterator ? yieldAllIterator['return'] : function(v) {
      return {value:v, done:true};
    };
    return this.yieldAllStep_(returnFunction, value, this.context_['return']);
  }
  this.context_['return'](value);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.throw_ = function(exception) {
  this.context_.start_();
  if (this.context_.yieldAllIterator_) {
    return this.yieldAllStep_(this.context_.yieldAllIterator_['throw'], exception, this.context_.next_);
  }
  this.context_.throw_(exception);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.yieldAllStep_ = function(action, value, nextAction) {
  try {
    var result = action.call(this.context_.yieldAllIterator_, value);
    $jscomp.generator.ensureIteratorResultIsObject_(result);
    if (!result.done) {
      this.context_.stop_();
      return result;
    }
    var resultValue = result.value;
  } catch (e) {
    this.context_.yieldAllIterator_ = null;
    this.context_.throw_(e);
    return this.nextStep_();
  }
  this.context_.yieldAllIterator_ = null;
  nextAction.call(this.context_, resultValue);
  return this.nextStep_();
};
$jscomp.generator.Engine_.prototype.nextStep_ = function() {
  while (this.context_.nextAddress) {
    try {
      var yieldValue = this.program_(this.context_);
      if (yieldValue) {
        this.context_.stop_();
        return {value:yieldValue.value, done:false};
      }
    } catch (e) {
      this.context_.yieldResult = undefined;
      this.context_.throw_(e);
    }
  }
  this.context_.stop_();
  if (this.context_.abruptCompletion_) {
    var abruptCompletion = this.context_.abruptCompletion_;
    this.context_.abruptCompletion_ = null;
    if (abruptCompletion.isException) {
      throw abruptCompletion.exception;
    }
    return {value:abruptCompletion['return'], done:true};
  }
  return {value:undefined, done:true};
};
$jscomp.generator.Generator_ = function(engine) {
  this.next = function(opt_value) {
    return engine.next_(opt_value);
  };
  this['throw'] = function(exception) {
    return engine.throw_(exception);
  };
  this['return'] = function(value) {
    return engine.return_(value);
  };
  $jscomp.initSymbolIterator();
  this[Symbol.iterator] = function() {
    return this;
  };
};
$jscomp.generator.createGenerator = function(generator, program) {
  var result = new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program));
  if ($jscomp.setPrototypeOf) {
    $jscomp.setPrototypeOf(result, generator.prototype);
  }
  return result;
};
$jscomp.asyncExecutePromiseGenerator = function(generator) {
  function passValueToGenerator(value) {
    return generator.next(value);
  }
  function passErrorToGenerator(error) {
    return generator['throw'](error);
  }
  return new Promise(function(resolve, reject) {
    function handleGeneratorRecord(genRec) {
      if (genRec.done) {
        resolve(genRec.value);
      } else {
        Promise.resolve(genRec.value).then(passValueToGenerator, passErrorToGenerator).then(handleGeneratorRecord, reject);
      }
    }
    handleGeneratorRecord(generator.next());
  });
};
$jscomp.asyncExecutePromiseGeneratorFunction = function(generatorFunction) {
  return $jscomp.asyncExecutePromiseGenerator(generatorFunction());
};
$jscomp.asyncExecutePromiseGeneratorProgram = function(program) {
  return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(program)));
};
$jscomp.checkEs6ConformanceViaProxy = function() {
  try {
    var proxied = {};
    var proxy = Object.create(new $jscomp.global['Proxy'](proxied, {'get':function(target, key, receiver) {
      return target == proxied && key == 'q' && receiver == proxy;
    }}));
    return proxy['q'] === true;
  } catch (err) {
    return false;
  }
};
$jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = false;
$jscomp.ES6_CONFORMANCE = $jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && $jscomp.checkEs6ConformanceViaProxy();
$jscomp.owns = function(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
$jscomp.polyfill('WeakMap', function(NativeWeakMap) {
  function isConformant() {
    if (!NativeWeakMap || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var map = new NativeWeakMap([[x, 2], [y, 3]]);
      if (map.get(x) != 2 || map.get(y) != 3) {
        return false;
      }
      map['delete'](x);
      map.set(y, 4);
      return !map.has(x) && map.get(y) == 4;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeWeakMap && $jscomp.ES6_CONFORMANCE) {
      return NativeWeakMap;
    }
  } else {
    if (isConformant()) {
      return NativeWeakMap;
    }
  }
  var prop = '$jscomp_hidden_' + Math.random();
  function insert(target) {
    if (!$jscomp.owns(target, prop)) {
      var obj = {};
      $jscomp.defineProperty(target, prop, {value:obj});
    }
  }
  function patch(name) {
    var prev = Object[name];
    if (prev) {
      Object[name] = function(target) {
        insert(target);
        return prev(target);
      };
    }
  }
  patch('freeze');
  patch('preventExtensions');
  patch('seal');
  var index = 0;
  var PolyfillWeakMap = function(opt_iterable) {
    this.id_ = (index += Math.random() + 1).toString();
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillWeakMap.prototype.set = function(key, value) {
    insert(key);
    if (!$jscomp.owns(key, prop)) {
      throw new Error('WeakMap key fail: ' + key);
    }
    key[prop][this.id_] = value;
    return this;
  };
  PolyfillWeakMap.prototype.get = function(key) {
    return $jscomp.owns(key, prop) ? key[prop][this.id_] : undefined;
  };
  PolyfillWeakMap.prototype.has = function(key) {
    return $jscomp.owns(key, prop) && $jscomp.owns(key[prop], this.id_);
  };
  PolyfillWeakMap.prototype['delete'] = function(key) {
    if (!$jscomp.owns(key, prop) || !$jscomp.owns(key[prop], this.id_)) {
      return false;
    }
    return delete key[prop][this.id_];
  };
  return PolyfillWeakMap;
}, 'es6', 'es3');
$jscomp.MapEntry = function() {
  this.previous;
  this.next;
  this.head;
  this.key;
  this.value;
};
$jscomp.polyfill('Map', function(NativeMap) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_MAP || !NativeMap || typeof NativeMap != 'function' || !NativeMap.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeMap = NativeMap;
      var key = Object.seal({x:4});
      var map = new NativeMap($jscomp.makeIterator([[key, 's']]));
      if (map.get(key) != 's' || map.size != 1 || map.get({x:4}) || map.set({x:4}, 't') != map || map.size != 2) {
        return false;
      }
      var iter = map.entries();
      var item = iter.next();
      if (item.done || item.value[0] != key || item.value[1] != 's') {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0].x != 4 || item.value[1] != 't' || !iter.next().done) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeMap && $jscomp.ES6_CONFORMANCE) {
      return NativeMap;
    }
  } else {
    if (isConformant()) {
      return NativeMap;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var idMap = new WeakMap;
  var PolyfillMap = function(opt_iterable) {
    this.data_ = {};
    this.head_ = createHead();
    this.size = 0;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.set(item[0], item[1]);
      }
    }
  };
  PolyfillMap.prototype.set = function(key, value) {
    key = key === 0 ? 0 : key;
    var r = maybeGetEntry(this, key);
    if (!r.list) {
      r.list = this.data_[r.id] = [];
    }
    if (!r.entry) {
      r.entry = {next:this.head_, previous:this.head_.previous, head:this.head_, key:key, value:value};
      r.list.push(r.entry);
      this.head_.previous.next = r.entry;
      this.head_.previous = r.entry;
      this.size++;
    } else {
      r.entry.value = value;
    }
    return this;
  };
  PolyfillMap.prototype['delete'] = function(key) {
    var r = maybeGetEntry(this, key);
    if (r.entry && r.list) {
      r.list.splice(r.index, 1);
      if (!r.list.length) {
        delete this.data_[r.id];
      }
      r.entry.previous.next = r.entry.next;
      r.entry.next.previous = r.entry.previous;
      r.entry.head = null;
      this.size--;
      return true;
    }
    return false;
  };
  PolyfillMap.prototype.clear = function() {
    this.data_ = {};
    this.head_ = this.head_.previous = createHead();
    this.size = 0;
  };
  PolyfillMap.prototype.has = function(key) {
    return !!maybeGetEntry(this, key).entry;
  };
  PolyfillMap.prototype.get = function(key) {
    var entry = maybeGetEntry(this, key).entry;
    return entry && entry.value;
  };
  PolyfillMap.prototype.entries = function() {
    return makeIterator(this, function(entry) {
      return [entry.key, entry.value];
    });
  };
  PolyfillMap.prototype.keys = function() {
    return makeIterator(this, function(entry) {
      return entry.key;
    });
  };
  PolyfillMap.prototype.values = function() {
    return makeIterator(this, function(entry) {
      return entry.value;
    });
  };
  PolyfillMap.prototype.forEach = function(callback, opt_thisArg) {
    var iter = this.entries();
    var item;
    while (!(item = iter.next()).done) {
      var entry = item.value;
      callback.call(opt_thisArg, entry[1], entry[0], this);
    }
  };
  PolyfillMap.prototype[Symbol.iterator] = PolyfillMap.prototype.entries;
  var maybeGetEntry = function(map, key) {
    var id = getId(key);
    var list = map.data_[id];
    if (list && $jscomp.owns(map.data_, id)) {
      for (var index = 0; index < list.length; index++) {
        var entry = list[index];
        if (key !== key && entry.key !== entry.key || key === entry.key) {
          return {id:id, list:list, index:index, entry:entry};
        }
      }
    }
    return {id:id, list:list, index:-1, entry:undefined};
  };
  var makeIterator = function(map, func) {
    var entry = map.head_;
    return $jscomp.iteratorPrototype(function() {
      if (entry) {
        while (entry.head != map.head_) {
          entry = entry.previous;
        }
        while (entry.next != entry.head) {
          entry = entry.next;
          return {done:false, value:func(entry)};
        }
        entry = null;
      }
      return {done:true, value:void 0};
    });
  };
  var createHead = function() {
    var head = {};
    head.previous = head.next = head.head = head;
    return head;
  };
  var mapIndex = 0;
  var getId = function(obj) {
    var type = obj && typeof obj;
    if (type == 'object' || type == 'function') {
      obj = obj;
      if (!idMap.has(obj)) {
        var id = '' + ++mapIndex;
        idMap.set(obj, id);
        return id;
      }
      return idMap.get(obj);
    }
    return 'p_' + obj;
  };
  return PolyfillMap;
}, 'es6', 'es3');
$jscomp.polyfill('Math.acosh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return Math.log(x + Math.sqrt(x * x - 1));
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.asinh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.log(Math.abs(x) + Math.sqrt(x * x + 1));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log1p', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < 0.25 && x > -0.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      var s = 1;
      while (zPrev != z) {
        y *= x;
        s *= -1;
        z = (zPrev = z) + s * y / ++d;
      }
      return z;
    }
    return Math.log(1 + x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.atanh', function(orig) {
  if (orig) {
    return orig;
  }
  var log1p = Math.log1p;
  var polyfill = function(x) {
    x = Number(x);
    return (log1p(x) - log1p(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cbrt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (x === 0) {
      return x;
    }
    x = Number(x);
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.clz32', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x) >>> 0;
    if (x === 0) {
      return 32;
    }
    var result = 0;
    if ((x & 4294901760) === 0) {
      x <<= 16;
      result += 16;
    }
    if ((x & 4278190080) === 0) {
      x <<= 8;
      result += 8;
    }
    if ((x & 4026531840) === 0) {
      x <<= 4;
      result += 4;
    }
    if ((x & 3221225472) === 0) {
      x <<= 2;
      result += 2;
    }
    if ((x & 2147483648) === 0) {
      result++;
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.cosh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    return (exp(x) + exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.expm1', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x < .25 && x > -.25) {
      var y = x;
      var d = 1;
      var z = x;
      var zPrev = 0;
      while (zPrev != z) {
        y *= x / ++d;
        z = (zPrev = z) + y;
      }
      return z;
    }
    return Math.exp(x) - 1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.hypot', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x, y, var_args) {
    x = Number(x);
    y = Number(y);
    var i, z, sum;
    var max = Math.max(Math.abs(x), Math.abs(y));
    for (i = 2; i < arguments.length; i++) {
      max = Math.max(max, Math.abs(arguments[i]));
    }
    if (max > 1e100 || max < 1e-100) {
      if (!max) {
        return max;
      }
      x = x / max;
      y = y / max;
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]) / max;
        sum += z * z;
      }
      return Math.sqrt(sum) * max;
    } else {
      sum = x * x + y * y;
      for (i = 2; i < arguments.length; i++) {
        z = Number(arguments[i]);
        sum += z * z;
      }
      return Math.sqrt(sum);
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.imul', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(a, b) {
    a = Number(a);
    b = Number(b);
    var ah = a >>> 16 & 65535;
    var al = a & 65535;
    var bh = b >>> 16 & 65535;
    var bl = b & 65535;
    var lh = ah * bl + al * bh << 16 >>> 0;
    return al * bl + lh | 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log10', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN10;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.log2', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Math.log(x) / Math.LN2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sign', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    return x === 0 || isNaN(x) ? x : x > 0 ? 1 : -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.sinh', function(orig) {
  if (orig) {
    return orig;
  }
  var exp = Math.exp;
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    return (exp(x) - exp(-x)) / 2;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.tanh', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (x === 0) {
      return x;
    }
    var y = Math.exp(-2 * Math.abs(x));
    var z = (1 - y) / (1 + y);
    return x < 0 ? -z : z;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Math.trunc', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    x = Number(x);
    if (isNaN(x) || x === Infinity || x === -Infinity || x === 0) {
      return x;
    }
    var y = Math.floor(Math.abs(x));
    return x < 0 ? -y : y;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.EPSILON', function(orig) {
  return Math.pow(2, -52);
}, 'es6', 'es3');
$jscomp.polyfill('Number.MAX_SAFE_INTEGER', function() {
  return 9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.MIN_SAFE_INTEGER', function() {
  return -9007199254740991;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isFinite', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (typeof x !== 'number') {
      return false;
    }
    return !isNaN(x) && x !== Infinity && x !== -Infinity;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    if (!Number.isFinite(x)) {
      return false;
    }
    return x === Math.floor(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isNaN', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return typeof x === 'number' && isNaN(x);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.isSafeInteger', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(x) {
    return Number.isInteger(x) && Math.abs(x) <= Number.MAX_SAFE_INTEGER;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Number.parseFloat', function(orig) {
  return orig || parseFloat;
}, 'es6', 'es3');
$jscomp.polyfill('Number.parseInt', function(orig) {
  return orig || parseInt;
}, 'es6', 'es3');
$jscomp.assign = typeof Object.assign == 'function' ? Object.assign : function(target, var_args) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    if (!source) {
      continue;
    }
    for (var key in source) {
      if ($jscomp.owns(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
$jscomp.polyfill('Object.assign', function(orig) {
  return orig || $jscomp.assign;
}, 'es6', 'es3');
$jscomp.polyfill('Object.entries', function(orig) {
  if (orig) {
    return orig;
  }
  var entries = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push([key, obj[key]]);
      }
    }
    return result;
  };
  return entries;
}, 'es8', 'es3');
$jscomp.polyfill('Object.getOwnPropertySymbols', function(orig) {
  if (orig) {
    return orig;
  }
  return function() {
    return [];
  };
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.ownKeys', function(orig) {
  if (orig) {
    return orig;
  }
  var symbolPrefix = 'jscomp_symbol_';
  function isSymbol(key) {
    return key.substring(0, symbolPrefix.length) == symbolPrefix;
  }
  var polyfill = function(target) {
    var keys = [];
    var names = Object.getOwnPropertyNames(target);
    var symbols = Object.getOwnPropertySymbols(target);
    for (var i = 0; i < names.length; i++) {
      (isSymbol(names[i]) ? symbols : keys).push(names[i]);
    }
    return keys.concat(symbols);
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Object.getOwnPropertyDescriptors', function(orig) {
  if (orig) {
    return orig;
  }
  var getOwnPropertyDescriptors = function(obj) {
    var result = {};
    var keys = Reflect.ownKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return result;
  };
  return getOwnPropertyDescriptors;
}, 'es8', 'es5');
$jscomp.polyfill('Object.setPrototypeOf', function(orig) {
  return orig || $jscomp.setPrototypeOf;
}, 'es6', 'es5');
$jscomp.polyfill('Object.values', function(orig) {
  if (orig) {
    return orig;
  }
  var values = function(obj) {
    var result = [];
    for (var key in obj) {
      if ($jscomp.owns(obj, key)) {
        result.push(obj[key]);
      }
    }
    return result;
  };
  return values;
}, 'es8', 'es3');
$jscomp.polyfill('Reflect.apply', function(orig) {
  if (orig) {
    return orig;
  }
  var apply = Function.prototype.apply;
  var polyfill = function(target, thisArg, argList) {
    return apply.call(target, thisArg, argList);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || typeof Object.create == 'function' ? Object.create : function(prototype) {
  var ctor = function() {
  };
  ctor.prototype = prototype;
  return new ctor;
};
$jscomp.construct = function() {
  function reflectConstructWorks() {
    function Base() {
    }
    function Derived() {
    }
    new Base;
    Reflect.construct(Base, [], Derived);
    return new Base instanceof Base;
  }
  if (typeof Reflect != 'undefined' && Reflect.construct) {
    if (reflectConstructWorks()) {
      return Reflect.construct;
    }
    var brokenConstruct = Reflect.construct;
    var patchedConstruct = function(target, argList, opt_newTarget) {
      var out = brokenConstruct(target, argList);
      if (opt_newTarget) {
        Reflect.setPrototypeOf(out, opt_newTarget.prototype);
      }
      return out;
    };
    return patchedConstruct;
  }
  function construct(target, argList, opt_newTarget) {
    if (opt_newTarget === undefined) {
      opt_newTarget = target;
    }
    var proto = opt_newTarget.prototype || Object.prototype;
    var obj = $jscomp.objectCreate(proto);
    var apply = Function.prototype.apply;
    var out = apply.call(target, obj, argList);
    return out || obj;
  }
  return construct;
}();
$jscomp.polyfill('Reflect.construct', function(orig) {
  return $jscomp.construct;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.defineProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, attributes) {
    try {
      Object.defineProperty(target, propertyKey, attributes);
      var desc = Object.getOwnPropertyDescriptor(target, propertyKey);
      if (!desc) {
        return false;
      }
      return desc.configurable === (attributes.configurable || false) && desc.enumerable === (attributes.enumerable || false) && ('value' in desc ? desc.value === attributes.value && desc.writable === (attributes.writable || false) : desc.get === attributes.get && desc.set === attributes.set);
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.deleteProperty', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    if (!$jscomp.owns(target, propertyKey)) {
      return true;
    }
    try {
      return delete target[propertyKey];
    } catch (err) {
      return false;
    }
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.getOwnPropertyDescriptor', function(orig) {
  return orig || Object.getOwnPropertyDescriptor;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.getPrototypeOf', function(orig) {
  return orig || Object.getPrototypeOf;
}, 'es6', 'es5');
$jscomp.findDescriptor = function(target, propertyKey) {
  var obj = target;
  while (obj) {
    var property = Reflect.getOwnPropertyDescriptor(obj, propertyKey);
    if (property) {
      return property;
    }
    obj = Reflect.getPrototypeOf(obj);
  }
  return undefined;
};
$jscomp.polyfill('Reflect.get', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, opt_receiver) {
    if (arguments.length <= 2) {
      return target[propertyKey];
    }
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (property) {
      return property.get ? property.get.call(opt_receiver) : property.value;
    }
    return undefined;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.has', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey) {
    return propertyKey in target;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.isExtensible', function(orig) {
  if (orig) {
    return orig;
  }
  if ($jscomp.ASSUME_ES5 || typeof Object.isExtensible == 'function') {
    return Object.isExtensible;
  }
  return function() {
    return true;
  };
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.preventExtensions', function(orig) {
  if (orig) {
    return orig;
  }
  if (!($jscomp.ASSUME_ES5 || typeof Object.preventExtensions == 'function')) {
    return function() {
      return false;
    };
  }
  var polyfill = function(target) {
    Object.preventExtensions(target);
    return !Object.isExtensible(target);
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('Reflect.set', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(target, propertyKey, value, opt_receiver) {
    var property = $jscomp.findDescriptor(target, propertyKey);
    if (!property) {
      if (Reflect.isExtensible(target)) {
        target[propertyKey] = value;
        return true;
      }
      return false;
    }
    if (property.set) {
      property.set.call(arguments.length > 3 ? opt_receiver : target, value);
      return true;
    } else {
      if (property.writable && !Object.isFrozen(target)) {
        target[propertyKey] = value;
        return true;
      }
    }
    return false;
  };
  return polyfill;
}, 'es6', 'es5');
$jscomp.polyfill('Reflect.setPrototypeOf', function(orig) {
  if (orig) {
    return orig;
  } else {
    if ($jscomp.setPrototypeOf) {
      var setPrototypeOf = $jscomp.setPrototypeOf;
      var polyfill = function(target, proto) {
        try {
          setPrototypeOf(target, proto);
          return true;
        } catch (e) {
          return false;
        }
      };
      return polyfill;
    } else {
      return null;
    }
  }
}, 'es6', 'es5');
$jscomp.polyfill('Set', function(NativeSet) {
  function isConformant() {
    if ($jscomp.ASSUME_NO_NATIVE_SET || !NativeSet || typeof NativeSet != 'function' || !NativeSet.prototype.entries || typeof Object.seal != 'function') {
      return false;
    }
    try {
      NativeSet = NativeSet;
      var value = Object.seal({x:4});
      var set = new NativeSet($jscomp.makeIterator([value]));
      if (!set.has(value) || set.size != 1 || set.add(value) != set || set.size != 1 || set.add({x:4}) != set || set.size != 2) {
        return false;
      }
      var iter = set.entries();
      var item = iter.next();
      if (item.done || item.value[0] != value || item.value[1] != value) {
        return false;
      }
      item = iter.next();
      if (item.done || item.value[0] == value || item.value[0].x != 4 || item.value[1] != item.value[0]) {
        return false;
      }
      return iter.next().done;
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeSet && $jscomp.ES6_CONFORMANCE) {
      return NativeSet;
    }
  } else {
    if (isConformant()) {
      return NativeSet;
    }
  }
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var PolyfillSet = function(opt_iterable) {
    this.map_ = new Map;
    if (opt_iterable) {
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
    this.size = this.map_.size;
  };
  PolyfillSet.prototype.add = function(value) {
    value = value === 0 ? 0 : value;
    this.map_.set(value, value);
    this.size = this.map_.size;
    return this;
  };
  PolyfillSet.prototype['delete'] = function(value) {
    var result = this.map_['delete'](value);
    this.size = this.map_.size;
    return result;
  };
  PolyfillSet.prototype.clear = function() {
    this.map_.clear();
    this.size = 0;
  };
  PolyfillSet.prototype.has = function(value) {
    return this.map_.has(value);
  };
  PolyfillSet.prototype.entries = function() {
    return this.map_.entries();
  };
  PolyfillSet.prototype.values = function() {
    return this.map_.values();
  };
  PolyfillSet.prototype.keys = PolyfillSet.prototype.values;
  PolyfillSet.prototype[Symbol.iterator] = PolyfillSet.prototype.values;
  PolyfillSet.prototype.forEach = function(callback, opt_thisArg) {
    var set = this;
    this.map_.forEach(function(value) {
      return callback.call(opt_thisArg, value, value, set);
    });
  };
  return PolyfillSet;
}, 'es6', 'es3');
$jscomp.checkStringArgs = function(thisArg, arg, func) {
  if (thisArg == null) {
    throw new TypeError("The 'this' value for String.prototype." + func + ' must not be null or undefined');
  }
  if (arg instanceof RegExp) {
    throw new TypeError('First argument to String.prototype.' + func + ' must not be a regular expression');
  }
  return thisArg + '';
};
$jscomp.polyfill('String.prototype.codePointAt', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(position) {
    var string = $jscomp.checkStringArgs(this, null, 'codePointAt');
    var size = string.length;
    position = Number(position) || 0;
    if (!(position >= 0 && position < size)) {
      return void 0;
    }
    position = position | 0;
    var first = string.charCodeAt(position);
    if (first < 55296 || first > 56319 || position + 1 === size) {
      return first;
    }
    var second = string.charCodeAt(position + 1);
    if (second < 56320 || second > 57343) {
      return first;
    }
    return (first - 55296) * 1024 + second + 9216;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.endsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'endsWith');
    searchString = searchString + '';
    if (opt_position === void 0) {
      opt_position = string.length;
    }
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = searchString.length;
    while (j > 0 && i > 0) {
      if (string[--i] != searchString[--j]) {
        return false;
      }
    }
    return j <= 0;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.fromCodePoint', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(var_args) {
    var result = '';
    for (var i = 0; i < arguments.length; i++) {
      var code = Number(arguments[i]);
      if (code < 0 || code > 1114111 || code !== Math.floor(code)) {
        throw new RangeError('invalid_code_point ' + code);
      }
      if (code <= 65535) {
        result += String.fromCharCode(code);
      } else {
        code -= 65536;
        result += String.fromCharCode(code >>> 10 & 1023 | 55296);
        result += String.fromCharCode(code & 1023 | 56320);
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.includes', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'includes');
    return string.indexOf(searchString, opt_position || 0) !== -1;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.polyfill('String.prototype.repeat', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(copies) {
    var string = $jscomp.checkStringArgs(this, null, 'repeat');
    if (copies < 0 || copies > 1342177279) {
      throw new RangeError('Invalid count value');
    }
    copies = copies | 0;
    var result = '';
    while (copies) {
      if (copies & 1) {
        result += string;
      }
      if (copies >>>= 1) {
        string += string;
      }
    }
    return result;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.stringPadding = function(padString, padLength) {
  var padding = padString !== undefined ? String(padString) : ' ';
  if (!(padLength > 0) || !padding) {
    return '';
  }
  var repeats = Math.ceil(padLength / padding.length);
  return padding.repeat(repeats).substring(0, padLength);
};
$jscomp.polyfill('String.prototype.padEnd', function(orig) {
  if (orig) {
    return orig;
  }
  var padEnd = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return string + $jscomp.stringPadding(opt_padString, padLength);
  };
  return padEnd;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.padStart', function(orig) {
  if (orig) {
    return orig;
  }
  var padStart = function(targetLength, opt_padString) {
    var string = $jscomp.checkStringArgs(this, null, 'padStart');
    var padLength = targetLength - string.length;
    return $jscomp.stringPadding(opt_padString, padLength) + string;
  };
  return padStart;
}, 'es8', 'es3');
$jscomp.polyfill('String.prototype.startsWith', function(orig) {
  if (orig) {
    return orig;
  }
  var polyfill = function(searchString, opt_position) {
    var string = $jscomp.checkStringArgs(this, searchString, 'startsWith');
    searchString = searchString + '';
    var strLen = string.length;
    var searchLen = searchString.length;
    var i = Math.max(0, Math.min(opt_position | 0, string.length));
    var j = 0;
    while (j < searchLen && i < strLen) {
      if (string[i++] != searchString[j++]) {
        return false;
      }
    }
    return j >= searchLen;
  };
  return polyfill;
}, 'es6', 'es3');
$jscomp.arrayFromIterator = function(iterator) {
  var i;
  var arr = [];
  while (!(i = iterator.next()).done) {
    arr.push(i.value);
  }
  return arr;
};
$jscomp.arrayFromIterable = function(iterable) {
  if (iterable instanceof Array) {
    return iterable;
  } else {
    return $jscomp.arrayFromIterator($jscomp.makeIterator(iterable));
  }
};
$jscomp.inherits = function(childCtor, parentCtor) {
  childCtor.prototype = $jscomp.objectCreate(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
  if ($jscomp.setPrototypeOf) {
    var setPrototypeOf = $jscomp.setPrototypeOf;
    setPrototypeOf(childCtor, parentCtor);
  } else {
    for (var p in parentCtor) {
      if (p == 'prototype') {
        continue;
      }
      if (Object.defineProperties) {
        var descriptor = Object.getOwnPropertyDescriptor(parentCtor, p);
        if (descriptor) {
          Object.defineProperty(childCtor, p, descriptor);
        }
      } else {
        childCtor[p] = parentCtor[p];
      }
    }
  }
  childCtor.superClass_ = parentCtor.prototype;
};
$jscomp.polyfill('WeakSet', function(NativeWeakSet) {
  function isConformant() {
    if (!NativeWeakSet || !Object.seal) {
      return false;
    }
    try {
      var x = Object.seal({});
      var y = Object.seal({});
      var set = new NativeWeakSet([x]);
      if (!set.has(x) || set.has(y)) {
        return false;
      }
      set['delete'](x);
      set.add(y);
      return !set.has(x) && set.has(y);
    } catch (err) {
      return false;
    }
  }
  if ($jscomp.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (NativeWeakSet && $jscomp.ES6_CONFORMANCE) {
      return NativeWeakSet;
    }
  } else {
    if (isConformant()) {
      return NativeWeakSet;
    }
  }
  var PolyfillWeakSet = function(opt_iterable) {
    this.map_ = new WeakMap;
    if (opt_iterable) {
      $jscomp.initSymbol();
      $jscomp.initSymbolIterator();
      var iter = $jscomp.makeIterator(opt_iterable);
      var entry;
      while (!(entry = iter.next()).done) {
        var item = entry.value;
        this.add(item);
      }
    }
  };
  PolyfillWeakSet.prototype.add = function(elem) {
    this.map_.set(elem, true);
    return this;
  };
  PolyfillWeakSet.prototype.has = function(elem) {
    return this.map_.has(elem);
  };
  PolyfillWeakSet.prototype['delete'] = function(elem) {
    return this.map_['delete'](elem);
  };
  return PolyfillWeakSet;
}, 'es6', 'es3');
try {
  if (Array.prototype.values.toString().indexOf('[native code]') == -1) {
    delete Array.prototype.values;
  }
} catch (e) {
}
Ext.define('WuisLogin.util.VTypes', {override:'Ext.form.field.VTypes', wuisPassword:function(c, e) {
  var d = e.next('#pwStrength');
  var a = true;
  var b = '';
  if (!c) {
    a = false;
  }
  if (a && c.length < 8) {
    b = 'Invalid password. Must be min. 8 characters!';
    a = false;
  }
  if (a && !/^(?=.*[a-z].*[a-z].*[a-z])/.test(c)) {
    b = 'Must contain at least 3 lower case characters!';
    a = false;
  }
  if (a && !/^(?=.*[A-Z])/.test(c)) {
    b = 'Must contain at least 1 upper case character!';
    a = false;
  }
  if (a && !/^(?=.*[0-9])/.test(c)) {
    b = 'Must contain at least 1 digit!';
    a = false;
  }
  if (a && !/^(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(c)) {
    b = 'Must contain at least 1 symbol (!@#$%^\x26*)!';
    a = false;
  }
  this.wuisPasswordText = b;
  if (d) {
    if (!a) {
      d.setValue(b);
    } else {
      d.setValue('Valid password.');
    }
  }
  return a;
}, wuisPasswordText:'Invalid password. Must be min. 8 characters and must contain at least 1 upper case character, 3 lower case character,1 digit or digit character in the middle and 1 symbol character!'});
Ext.define('WuisLogin.Common', {singleton:true, tenantKeyLS:'NeoSecurity-Tenant', applications:{usrMgmt:{name:'usrMgmt', requiredRight:'readIdentity'}, ioccSecurity:{name:'iocc-security-webui', requiredRight:'View_SecurityAdminApplication'}, ioccSecurityAuthorization:{name:'iocc-security-authorization', requiredRight:'editRight'}, ioccSecurityIdentity:{name:'iocc-security-identity', requiredRight:'editIdentity'}, briefing:{name:'Briefing', requiredRight:'View_myBriefingApplication'}, opsTimesSquare:{name:'NetLineOps', 
requiredRight:'View_TimesSquareApplication'}, crewLinkRoster:{name:'CrewLink', requiredRight:'View_CrewLinkRosterApplication'}, crewLinkAdmin:{name:'CrewLink', requiredRight:'View_CrewLinkNoCrewApplication'}, crewLinkCrewInformation:{name:'CrewLink', requiredRight:'View_CrewLinkCrewApplication'}, crewLinkCheckIn:{name:'CrewLink', requiredRight:'View_CrewLinkCrewApplication'}}, messageMap:{'iocc.sec.internal.config.load.error':'An unexpected error has occurred while loading the security configuration! Please try again later or contact the system administrator!', 
'iocc.sec.unexpected.exception':'An unexpected server error has occurred while processing your request! Please try again later or contact the system administrator!', 'iocc.sec.authorization.failed':'Authorization failed! Please try again later or contact the system administrator!', 'iocc.sec.authentication.failed':'Authentication failed: username or password invalid!', 'iocc.sec.authentication.failed.user.not.activated':'Authentication failed: user not activated!', 'iocc.sec.authentication.failed.incorrect.pw':'Authentication failed: incorrect password', 
'iocc.sec.authentication.validation.failed':'The certificate has expired!', 'iocc.sec.authentication.certificate.nullorempty':'You have logged out from the application or the login session is expired.\x3cbr/\x3eYou can close this window or reload the application to sign in again!', 'iocc.sec.authentication.certificate.decodingerror':'The certificate could not be decoded!', 'iocc.sec.authentication.certificate.expired':'The login session has been expired.\x3cbr/\x3ePlease reauthenticate yourself with your username and password!', 
'iocc.sec.authentication.certificate.notyetvalid':'The current Date or the specified Date is before the notBefore date/time in the Certificate validity period!', 'iocc.sec.authentication.certificate.invalidkey':'Certificate public key not found!', 'iocc.sec.authentication.certificate.exception':'Certificate validation failed!', 'iocc.sec.authentication.certificate.nosuchalgorithm':'Certificate validation failed!', 'iocc.sec.authentication.certificate.nosuchprovider':'Certificate validation failed!', 
'iocc.sec.authentication.certificate.wrongsignature':'Generic Signature exception occurred!', 'iocc.sec.authentication.notfound':'Authentication failed: user not found!', 'iocc.sec.authentication.publickey.notfound':'Certificate public key not found!', 'iocc.sec.connection.error':'Connection to security service could not be created!', 'iocc.sec.identity.password.weak':'New password too weak, password not changed!', 'iocc.sec.identity.password.incorrect':'Provided credentials are not correct, password not changed!', 
'iocc.sec.identity.password.notallowed':'Password change not allowed!', 'iocc.sec.identity.password.exception':'Could not cahnge password. An error happened!', 'iocc.sec.internal.session.expired.close':'The login session has been expired.\x3cbr/\x3eYou must close this window and restart the application to sign in again!', 'iocc.sec.internal.session.expired.reload':'The login session has been expired.\x3cbr/\x3eYou must close this window or reload the application to sign in again!', 'iocc.sec.internal.session.expired.reauthenticate':'The login session has been expired.\x3cbr/\x3ePlease reauthenticate yourself with your username and password!', 
'iocc.sec.internal.logged.out':'You have logged out from the application!\x3cbr/\x3eYou can close this window or reload the application to sign in again!', 'iocc.sec.internal.warning.identity.changed':'Application must be reloaded, because login credentials has been changed since last login!', 'iocc.sec.internal.button.reload':'Reload Application', 'iocc.sec.internal.button.close':'Close Application', 'iocc.sec.internal.error.load.config':'Unable to retrieve security configuration from server!\x3cbr/\x3eApplication can continue, but some features might not work properly.\x3cbr/\x3eIf the problem persist, please call system administrator!\x3cbr/\x3e', 
'iocc.sec.internal.logged.out.or.session.expired':'You have logged out from the application or the login session is expired!\x3cbr/\x3eYou can close this window or reload the application to sign in again!', 'iocc.sec.internal.error.no.message':'Either your user name or password is invalid.\x3cbr/\x3ePlease retry the operation or click the "forgot password to reset your password.', 'iocc.sec.internal.authentication.not.found':'You are not authorized to use this application!\x3cbr/\x3eYou have to log in with a different credential, or contact the system administrator!', 
'iocc.sec.mailsending.error':'Unable to complete the operation as server is not able to send e-mails now.\x3cbr/\x3eIf the problem persist, please call system administrator!\x3cbr/\x3e'}, hasApplicationAccess:function(id) {
  var $scope = this;
  var schema = WuisLogin.Security.applications;
  var p = WuisLogin.Security.rights;
  var collection = $scope.applications;
  var obj = collection[id];
  var type;
  if (!obj || !schema) {
    return false;
  }
  type = obj.name;
  if (schema[type] === true && Ext.isObject(p)) {
    return p[type + '.' + obj.requiredRight] === true;
  }
  return schema[type] && schema[type][obj.requiredRight];
}, checkCompatibleRights:function(eventMapping) {
  var rights = WuisLogin.Security.rights;
  var a = true;
  Ext.iterate(eventMapping, function(action, canCreateDiscussions) {
    if (canCreateDiscussions && !rights[action]) {
      a = false;
      return false;
    }
  });
  return a;
}, loadTenant:function() {
  return window.localStorage && window.localStorage.getItem(this.tenantKeyLS) || null;
}, saveTenant:function(a) {
  var course = this;
  if (!window.localStorage) {
    return false;
  }
  if (!a) {
    window.localStorage.removeItem(course.tenantKeyLS);
    return null;
  }
  if (!Ext.isString(a)) {
    return false;
  }
  window.localStorage.setItem(course.tenantKeyLS, a);
  return a;
}});
Ext.define('WuisLogin.Security', {singleton:true, data:null, identity:null, rights:null, applications:null, config:null, tenants:null, authorize:function(action, options) {
  var self = this;
  if (!action) {
    Ext.log.error('WuisLogin.Security.authorize() method requires url parameter to be set!');
  }
  Ext.Ajax.request({url:action, method:'GET', disableCaching:true, success:function(file, i) {
    var response = Ext.decode(file.responseText, true);
    var item = null;
    var rights = null;
    var clients = null;
    if (response && response.success && response.result) {
      response = response.result;
      if (response.aggregatedRights) {
        rights = {};
        clients = {};
        Ext.each(response.aggregatedRights, function(entry) {
          var path = entry.application;
          rights[(path ? path + '.' : '') + entry.name] = entry.active;
          if (path) {
            clients[path] = clients[path] || entry.active;
          }
        });
      }
      if (response.identity) {
        item = {};
        Ext.apply(item, {id:response.identity.id, name:response.identity.name, type:response.identity.type, roles:{}, attributes:{}});
        if (response.ownRoles) {
          Ext.each(response.ownRoles, function(action) {
            item.roles[action.name] = true;
          });
        }
        if (response.identity.attributes) {
          Ext.each(response.identity.attributes, function(b) {
            item.attributes[b.attribute.name] = b.value;
          });
        }
      }
      self.data = response;
      self.identity = item;
      self.rights = rights;
      self.applications = clients;
      if (options && options.success) {
        options.success.call(options.scope || self, file, i, response);
      }
    } else {
      if (options && options.failure) {
        options.failure.call(options.scope || self, file, i, response);
      }
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    if (options && options.failure) {
      options.failure.call(options.scope || self, response, t, overlayFrag);
    }
  }});
}, neoSecurityAuthorize:function(c, config) {
  var me = this;
  if (!c) {
    Ext.log.error('WuisLogin.Security.authorize() method requires url parameter to be set!');
  }
  Ext.Ajax.request({url:c, method:'GET', disableCaching:true, success:function(e, changeset_id) {
    var data = Ext.decode(e.responseText, true);
    var origin = null;
    var value = null;
    var result = null;
    if (!data || !data.tenant || !data.userName) {
      if (config && config.failure) {
        config.failure.call(config.scope || me, e, changeset_id, data);
      }
      return;
    }
    me.data = data;
    if (data.rights) {
      value = {};
      result = {};
      Ext.each(data.rights, function(host) {
        var name = host.module;
        var a = host.name;
        result[name] = result[name] || {};
        result[name][a] = true;
        value[a] = value[a] || {};
        value[a][name] = true;
      });
    }
    origin = {name:data.userName || null, attributes:data.attributes || {}, tenant:data.tenant || null};
    me.identity = origin;
    me.rights = value;
    me.applications = result;
    if (config && config.success) {
      config.success.call(config.scope || me, e, changeset_id, data);
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    if (config && config.failure) {
      config.failure.call(config.scope || me, response, t, overlayFrag);
    }
  }});
}, authenticate:function(res, config) {
  var me = this;
  if (!res) {
    Ext.log.error('WuisLogin.Security.authenticate() method requires at least url parameter to be set!');
  }
  Ext.Ajax.request({url:res, method:'GET', disableCaching:true, success:function(xhr, status) {
    var data = Ext.decode(xhr.responseText, true);
    if (data && data.success) {
      if (config && config.success) {
        config.success.call(config.scope || me, xhr, status, data);
      }
    } else {
      if (config && config.failure) {
        config.failure.call(config.scope || me, xhr, status, data);
      }
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    if (config && config.failure) {
      config.failure.call(config.scope || me, response, t, overlayFrag);
    }
  }});
}, authenticateWithPost:function(c, config) {
  var me = this;
  if (!c) {
    Ext.log.error('WuisLogin.Security.authenticateWithPost() method requires at least url parameter to be set!');
  }
  Ext.Ajax.request({url:c, method:'POST', disableCaching:true, headers:{password:config.password}, success:function(xhr, status) {
    var data = Ext.decode(xhr.responseText);
    if (data && data.success) {
      if (config && config.success) {
        config.success.call(config.scope || me, xhr, status, data);
      }
    } else {
      if (config && config.failure) {
        config.failure.call(config.scope || me, xhr, status, data);
      }
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText);
    if (config && config.failure) {
      config.failure.call(config.scope || me, response, t, overlayFrag);
    }
  }});
}, neoSecurityAuthenticate:function(c, config) {
  var me = this;
  if (!c) {
    Ext.log.error('WuisLogin.Security.authenticate() method requires at least url parameter to be set!');
  }
  Ext.Ajax.request({url:c, method:'POST', jsonData:Ext.encode(config.credentials), success:function(xhr, status) {
    var data = Ext.decode(xhr.responseText, true);
    if (data && data.success) {
      if (config && config.success) {
        config.success.call(config.scope || me, xhr, status, data);
      }
    } else {
      if (config && config.failure) {
        config.failure.call(config.scope || me, xhr, status, data);
      }
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    if (config && config.failure) {
      config.failure.call(config.scope || me, response, t, overlayFrag);
    }
  }});
}, logout:function(options, config) {
  var me = this;
  config = config || {};
  if (Ext.isString(options)) {
    config.url = options;
    config.method = 'GET';
  } else {
    if (Ext.isObject(options)) {
      config = Ext.apply(Ext.apply({}, options), config);
    }
  }
  if (!config.url) {
    Ext.log.error('WuisLogin.Security.logout() method requires at least url parameter to be set!');
  }
  Ext.Ajax.request({url:config.url, method:config.method || 'GET', headers:{'Content-Type':'application/json'}, success:function(xhr, status) {
    var data = Ext.decode(xhr.responseText, true) || null;
    if (data && data.success) {
      if (config && config.success) {
        config.success.call(config.scope || me, xhr, status, data);
      }
    } else {
      if (config && config.failure) {
        config.failure.call(config.scope || me, xhr, status, data);
      }
    }
    me.resetAuthorizationData();
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    if (config && config.failure) {
      config.failure.call(config.scope || me, response, t, overlayFrag);
    }
  }});
}, validate:function(b, options) {
  var filter = this;
  if (!b) {
    Ext.log.error('WuisLogin.Security.validate() method requires url parameter to be set!');
  }
  options = options || {};
  Ext.log.info('Validating session...');
  Ext.Ajax.request({url:b, method:'GET', disableCaching:true, success:function(xhr, status) {
    var overlayFrag = Ext.decode(xhr.responseText, true);
    Ext.log.info('Session validation was successful.');
    if (options.success) {
      options.success.call(options.scope || filter, xhr, status, overlayFrag);
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    Ext.log.warn('Session validation failed with error code ' + response.status);
    if (options.failure) {
      options.failure.call(options.scope || filter, response, t, overlayFrag);
    }
  }});
}, renewCertificate:function(b, options) {
  var filter = this;
  if (!b) {
    Ext.log.error('WuisLogin.Security.renewCertificate() method requires url parameter to be set!');
  }
  options = options || {};
  Ext.log.info('Renewing certificate...');
  Ext.Ajax.request({url:b, method:'GET', disableCaching:true, success:function(xhr, status) {
    var overlayFrag = Ext.decode(xhr.responseText, true);
    Ext.log.info('Certificate renewal was successful.');
    if (options.success) {
      options.success.call(options.scope || filter, xhr, status, overlayFrag);
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    Ext.log.warn('Certificate renewal failed with error code ' + response.status);
    if (options.failure) {
      options.failure.call(options.scope || filter, response, t, overlayFrag);
    }
  }});
}, loadConfig:function(server, config) {
  var me = this;
  if (!server) {
    Ext.log.error('WuisLogin.Security.loadConfig() method requires url parameter to be set!');
  }
  config = config || {};
  Ext.Ajax.request({url:server, method:'GET', disableCaching:true, success:function(xhr, status) {
    var responseText = Ext.decode(xhr.responseText, true);
    if (!Ext.isObject(responseText)) {
      if (config && config.failure) {
        config.failure.call(config.scope || me, xhr, status, responseText);
      }
      return;
    }
    me.config = responseText;
    if (config && config.success) {
      config.success.call(config.scope || me, xhr, status, responseText);
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    if (config && config.failure) {
      config.failure.call(config.scope || me, response, t, overlayFrag);
    }
  }});
}, resetAuthorizationData:function() {
  var $scope = this;
  $scope.data = null;
  $scope.identity = null;
  $scope.applications = null;
  $scope.rights = null;
  $scope.tenants = null;
}, loadTenants:function(c, config) {
  var me = this;
  if (!c) {
    Ext.log.error('WuisLogin.Security.loadTenants() method requires url parameter to be set!');
  }
  config = config || {};
  Ext.Ajax.request({url:c, method:'GET', disableCaching:true, headers:{'Content-Type':'application/json', 'Accept':'application/json'}, success:function(xhr, status) {
    var d = Ext.decode(xhr.responseText, true);
    var res = [];
    if (!d || !Ext.isArray(d)) {
      if (config && config.failure) {
        config.failure.call(config.scope || me, xhr, status, d);
      }
      return;
    }
    Ext.each(d, function(newPrinter) {
      res.push({name:newPrinter});
    });
    me.tenants = res;
    if (config && config.success) {
      config.success.call(config.scope || me, xhr, status, d);
    }
  }, failure:function(response, t) {
    var overlayFrag = Ext.decode(response.responseText, true);
    if (config && config.failure) {
      config.failure.call(config.scope || me, response, t, overlayFrag);
    }
  }});
}, hasRight:function(i, i2) {
  var indices = i.split('.');
  if (indices.length === 2) {
    i = indices[0];
    i2 = indices[1];
  }
  return this.applications && this.applications[i] && this.applications[i][i2];
}, getUrlFromConfig:function(name, result, url) {
  var req = this;
  var key = Ext.String.uncapitalize(name) + 'Url';
  var param = Ext.String.uncapitalize(name) + 'Method';
  var str = req.config && req.config[key] || null;
  var method = req.config && req.config[param] || 'GET';
  result = result || '';
  if (str && Ext.isString(str)) {
    if (str.indexOf('http') === -1) {
      str = result + str;
    }
    return {url:str, method:method};
  }
  return url ? {url:result + url, method:method} : null;
}});
Ext.define('WuisLogin.controller.Login', {extend:'Ext.app.Controller', handleAjaxException:true, handleForbiddenAsUnauthorized:false, showPasswordChange:true, passwordChangeWidget:'WuisLoginPasswordChange', passwordChangeViewConfig:null, showForgottenPassword:false, forgottenPasswordWidget:null, forgottenPasswordViewConfig:null, loginWidget:'WuisLogin', loginViewConfig:null, loginService:null, passwordChangeService:null, forgottenPasswordService:null, init:function() {
  var me = this;
  if (me.handleAjaxException) {
    Ext.Ajax.on('requestexception', me.onAjaxRequestException, me);
  }
  me.on({login:me.onLogin, passwordchangeclick:me.onPasswordChangeClick, validatepassword:me.onValidatePassword, passwordchange:me.onPasswordChange, passwordchangecancel:me.onCancelPasswordChange, forgottenpasswordclick:me.onForgottenPasswordClick, forgottenpasswordchange:me.onForgottenPasswordChange, forgottenpasswordcancel:me.onCancelForgottenPassword, scope:me});
}, checkCertificateValidity:function() {
}, getLoginWin:function() {
  return Ext.ComponentQuery.query(this.loginWidget)[0];
}, getPasswordChangeWin:function() {
  return Ext.ComponentQuery.query(this.passwordChangeWidget)[0];
}, getForgottenPasswordWin:function() {
  return Ext.ComponentQuery.query(this.forgottenPasswordWidget)[0];
}, showLoginWindow:function(config) {
  var me = this;
  var self = me.getLoginWin();
  var view;
  var w;
  config = Ext.apply(Ext.apply({showForgottenPassword:me.showForgottenPassword, showPasswordChange:me.showPasswordChange}, me.loginViewConfig), config);
  if (!self) {
    self = Ext.widget(me.loginWidget, Ext.apply(config, {eventController:me, showPasswordChange:config.showPasswordChange && !!me.passwordChangeWidget, showForgottenPassword:config.showForgottenPassword && !!me.forgottenPasswordWidget}, config));
    if (self.parentContainer) {
      self.parentContainer.add(self);
    } else {
      self.show();
    }
  } else {
    if (self.isHidden()) {
      self.show();
    }
  }
  view = self.getUserField();
  w = self.getPasswordField();
  view.setValue(config.userName || '');
  view.setReadOnly(config.userNameReadOnly || false);
  w.setValue('');
  (view.readOnly ? w : view).focus(true);
}, hasToBeReload:function() {
  var spColor = this;
  var b = spColor.loginWidget;
  if (spColor.passwordChangeWidget) {
    b = b + (',' + spColor.passwordChangeWidget);
  }
  if (spColor.forgottenPasswordWidget) {
    b = b + (',' + spColor.forgottenPasswordWidget);
  }
  return !Ext.ComponentQuery.query(b).length;
}, onAjaxRequestException:function(shipping, item) {
  var _ = this;
  if (item.status === 401 && _.hasToBeReload(shipping, item)) {
    _.reloadApplication();
  }
}, reloadApplication:function() {
  location.href = location.href.replace(/#.*/, '');
}, checkUnauthenticated:function(testsStatus) {
  return testsStatus && (testsStatus.status === 401 || this.handleForbiddenAsUnauthorized && testsStatus.status === 403) || false;
}, onPasswordChangeClick:function(a, ud) {
  this.showPasswordChangeWindow(a, ud);
}, showPasswordChangeWindow:function(view, value) {
  var me = this;
  var entry = Ext.widget(me.passwordChangeWidget, Ext.apply({eventController:me}, me.passwordChangeViewConfig));
  var result = entry && entry.getUserField();
  var response = entry && entry.getOldPasswordField();
  if (view && value === true) {
    value = Ext.isFunction(view.getForm) && view.getForm().getValue() || null;
  }
  if (result) {
    result.setValue(value && value.user || '');
  }
  if (response) {
    response.setValue(value && value.password || '');
  }
  if (view) {
    if (view.parentContainer) {
      view.parentContainer.remove(view);
    } else {
      view.destroy();
    }
  }
  if (entry.parentContainer) {
    entry.parentContainer.add(entry);
  } else {
    entry.show();
  }
}, onForgottenPasswordClick:function(view, data) {
  var me = this;
  var action = Ext.widget(me.forgottenPasswordWidget, Ext.apply({eventController:me}, me.forgottenPasswordViewConfig));
  var attrField = action.getUserField();
  if (attrField) {
    attrField.setValue(data && data.user || '');
  }
  if (view) {
    if (view.parentContainer) {
      view.parentContainer.remove(view);
    } else {
      view.destroy();
    }
  }
  if (action.parentContainer) {
    action.parentContainer.add(action);
  } else {
    action.show();
  }
}, onValidatePassword:function(f, data) {
  var self = this;
  var d = Ext.isObject(data) ? data.newPassword : data;
  if (!self.passwordValidatorService) {
    Ext.log.error('[WuisLogin] Please, set passwordValidatorService property or implement the onValidatePassword method!');
    return;
  }
  if (f.lastValidatedPassword === d) {
    return;
  }
  f.lastValidatedPassword = d;
  f.passwordErrors = 'Checking password strength...';
  f.getForm().isValid();
  if (!Ext.isObject(data)) {
    data = {newPassword:data};
  }
  self.passwordValidatorService(data, self.validatePasswordCallback, self);
}, validatePasswordCallback:function(response) {
  var key = this;
  var $scope = key.getPasswordChangeWin();
  var attrType = $scope && $scope.getPasswordField().getValue();
  var gridcontX = $scope && $scope.getPwStrengthField();
  var g = $scope.getErrorMsgBox();
  var options = response && response.success && response.result;
  var left;
  if (!$scope) {
    return;
  }
  if (options && attrType === $scope.getPasswordField().getValue()) {
    gridcontX.removeCls('pw-ok');
    gridcontX.removeCls('pw-error');
    gridcontX.removeCls('pw-warn');
    if (Ext.isEmpty(options.texts)) {
      gridcontX.addCls('pw-ok');
      $scope.passwordErrors = null;
      g.update('');
    } else {
      gridcontX.addCls(options.passed ? 'pw-warn' : 'pw-error');
      left = Ext.isArray(options.texts) ? options.texts : [options.texts || ''];
      left = left.map(key.translateValidationError.bind(key)).map(Ext.htmlEncode).join('\x3cbr\x3e');
      $scope.passwordErrors = options.passed ? '' : left;
      g.update(left);
    }
  } else {
    gridcontX.addCls('pw-error');
    $scope.passwordErrors = 'Password check failed!';
  }
  $scope.getForm().isValid();
}, translateValidationError:function(a) {
  return a;
}, onLogin:function(identityId, provider) {
  var options = this;
  if (options.loginService) {
    identityId.setLoading('Login...');
    options.loginService(provider, options.loginCallback, options);
  } else {
    Ext.log.error('[WuisLogin] Please, set loginService property or implement the onLogin method!');
  }
}, loginCallback:function(data) {
  var command_codes = this;
  var newSourceWindow = command_codes.getLoginWin();
  if (newSourceWindow) {
    newSourceWindow.setLoading(false);
  }
  command_codes[data && data.success ? 'onSuccessLogin' : 'onFailureLogin'](data);
}, onSuccessLogin:function() {
  this.closeLoginWindow();
}, onFailureLogin:function() {
  var d = this;
  var User = d.getLoginWin();
  var params = User.getUserField();
  var last = User.getPasswordField();
  Ext.Msg.alert('Error', 'Wrong login name or password!', function() {
    (params.readOnly ? last : params).focus(true);
  });
}, closeLoginWindow:function() {
  var view = this.getLoginWin();
  if (view) {
    if (view.parentContainer) {
      view.parentContainer.remove(view);
    } else {
      view.destroy();
    }
  }
}, onCancelPasswordChange:function(container, result) {
  var res = this;
  var user = result.user;
  if (container.parentContainer) {
    container.parentContainer.remove(container);
  } else {
    container.destroy();
  }
  res.showLoginWindow({userName:user});
}, onCancelForgottenPassword:function() {
  var res = this;
  var view = res.getForgottenPasswordWin();
  var userName = view.down('#user').getValue();
  if (view.parentContainer) {
    view.parentContainer.remove(view);
  } else {
    view.destroy();
  }
  res.showLoginWindow({userName:userName});
}, onPasswordChange:function(event, data) {
  var _this = this;
  if (!_this.passwordChangeService) {
    Ext.log.error('[WuisLogin] Please, set the passwordChangeService property or implement the onPasswordChange method!');
    return;
  }
  _this.passwordChangeService({newPassword:data.password1, currentPassword:data.oldPassword, userName:data.user}, _this.passwordChangeCallback, _this);
}, passwordChangeCallback:function(res) {
  var me = this;
  var formContainer = me.getPasswordChangeWin();
  if (res && res.success) {
    me.onCancelPasswordChange(formContainer, formContainer.down('form').getValues());
    return;
  }
  Ext.Msg.alert('Error', res && res.result || 'Error on service calling!');
}, onForgottenPasswordChange:function(depsOptions, node) {
  var res = this;
  if (!res.forgottenPasswordService) {
    Ext.log.error('[WuisLogin] Please, set the forgottenPasswordService property or implement the onForgottenPasswordChange method!');
    return;
  }
  res.forgottenPasswordService({userName:node.user}, res.forgottenPasswordCallback, res);
}, forgottenPasswordCallback:function(res) {
  var me = this;
  var formContainer = me.getForgottenPasswordWin();
  if (res && res.success) {
    me.onCancelForgottenPassword(formContainer, formContainer.down('form').getValues());
    return;
  }
  Ext.Msg.alert('Error', res && res.result || 'Error on service calling!');
}});
Ext.define('WuisLogin.controller.LoginEx', {extend:'WuisLogin.controller.Login', titleMap:{ERROR:'Error in Operation', WARNING:'Warning', INFO:'Information'}, messageMap:null, errorState:null, restPrefix:'/rest', applicationId:null, checkCertificateOnFocus:!1, allowInactivityControl:!1, userInteractionOccured:!1, checkInactivityTask:null, checkInactivityInterval:30, propertiesConfigUrl:'resources/config/properties.json', propertiesConfig:null, autoLoadSecurityConfig:!0, allowSaml2Auth:!1, suppressSaml2Hash:'nosaml2', 
actionMap:{certificateNotFound:['CLOSE', 'iocc.sec.internal.button.close'], invalidCertificate:'REVALIDATE', fatalError:'CLOSE', certificateExpired:'LOGOUT', sessionExpired:['RELOAD', 'iocc.sec.internal.button.reload'], sessionExpiredLogout:['CLOSE', 'iocc.sec.internal.button.close'], logout:'NOTIFY/CLOSE', initError:['NOTIFY/CLOSE', 'iocc.sec.internal.button.close']}, ssoLogoutTimeoutInterval:30000, loggingOut:!1, init:function() {
  var a = this;
  a.handleAjaxException = !1;
  if (!a.iconMap) {
    a.iconMap = {ERROR:Ext.Msg.ERROR, WARNING:Ext.Msg.WARNING, INFO:Ext.Msg.INFO};
  }
  WuisLogin.controller.Login.prototype.init.call(this);
  if (!a.messageMap) {
    Ext.log.warn('Application messages not set in messagesMap: only `WuisLogin.Common.messageMap` messages will be translated!');
  }
  a.messageMap = Ext.applyIf(a.messageMap || {}, WuisLogin.Common.messageMap);
  a.on('serviceError', a.handleServiceError, a);
  if (a.checkCertificateOnFocus) {
    window.onfocus = a.checkCertificateValidity.bind(a);
  }
  if (!a.loadProperties() && a.autoLoadSecurityConfig) {
    a.loadSecurityConfig();
  }
}, handleInitError:function() {
  var c = this, a = window.location, d = a.hash || '', b = Ext.Object.fromQueryString(d.substr(1));
  if (c.isSaml2Allowed() && b && +b.errorCode === 102) {
    a.href = a.href.split('#')[0] + '#';
    c.logout({forced:!0, logoutActionKey:'initError', notifyMessageKey:b.messageKey || 'iocc.sec.internal.authentication.not.found'});
    return !0;
  }
  return !1;
}, loadProperties:function(b) {
  var a = this;
  b = b || a.propertiesConfigUrl;
  if (!b) {
    return !1;
  }
  Ext.log.info('Loading application properties config...');
  Ext.Ajax.request({url:b, method:'GET', disableCaching:!0, success:function(d, e) {
    var c = Ext.decode(d.responseText, !0);
    a.propertiesConfig = c;
    if (Ext.isObject(c.applications)) {
      Ext.apply(WuisLogin.Common.applications, c.applications);
    } else {
      Ext.log.warn('Unable to get application configuration from properties.json! Using the default applications / requiredRight config!');
    }
    if (a.fireEvent('propertiesloaded', c, !0, d, e) === !1) {
      return;
    }
    if (a.autoLoadSecurityConfig) {
      a.loadSecurityConfig();
    }
  }, failure:function(c, d) {
    var e = Ext.decode(c.responseText, !0);
    Ext.log.warn('Unable to load properties.json (' + d.url + ')! It can be a network/service error or even the file is not bundled with the application. Using the default applications / requiredRight config (status: ' + (c.status || 'N/A') + ')!');
    if (a.fireEvent('propertiesloaded', e, !1, c, d) === !1) {
      return;
    }
    if (a.autoLoadSecurityConfig) {
      a.loadSecurityConfig();
    }
  }});
  return !0;
}, loadSecurityConfig:function() {
  var a = this;
  WuisLogin.Security.loadConfig(a.restPrefix + 'config', {success:function(b, c) {
    var d = Ext.decode(b.responseText, !0);
    if (a.handleInitError()) {
      return;
    }
    if (a.fireEvent('securityconfigloaded', d, !0, b, c) === !1) {
      return;
    }
    a.startInactivityControl();
  }, failure:function(b, c) {
    var d = Ext.decode(b.responseText, !0);
    Ext.log.warn('Unable to load security configuration (' + c.url + ') - application can continue, but with reduced functionality only!');
    if (a.handleInitError()) {
      return;
    }
    if (a.fireEvent('securityconfigloaded', d, !1, b, c) === !1) {
      return;
    }
    a.startInactivityControl();
  }});
}, onForgottenPasswordChange:function(c, b) {
  var a = this;
  Ext.Ajax.request({url:a.restPrefix + 'identity/resetpassword/' + encodeURIComponent(b.user), method:'GET', disableCaching:!0, serviceName:'Reset Password', headers:{'Content-Type':'application/json', 'Accept':'application/json'}, success:a.successResetPassword.bind(a), failure:function(d, e) {
    a.fireEvent('serviceError', d, e, null, a.onCancelForgottenPassword, a);
  }, scope:a});
}, successResetPassword:function(b, d) {
  var a = this, c = b && Ext.decode(b.responseText, !0);
  if (!c.success) {
    a.fireEvent('serviceError', b, d, c, a.onCancelForgottenPassword, a);
    return;
  }
  Ext.Msg.alert('Password Reset', 'Please check your email for the activation link!', function() {
    a.onCancelForgottenPassword();
  });
}, checkActivation:function() {
  var c = this, e = document.location.href.split('?')[1], a = e && Ext.Object.fromQueryString(e) || null, d = a && a.token, b = a && a.user;
  if (d && b) {
    Ext.Ajax.request({url:c.restPrefix + 'activation/check/' + encodeURIComponent(b) + '?token\x3d' + encodeURIComponent(d), method:'GET', disableCaching:!0, headers:{'Content-Type':'application/json', 'Accept':'application/json'}, success:function(a, d) {
      c.onSuccessCheckActivation(a, d, b);
    }, failure:function(a, b) {
      c.fireEvent('serviceError', a, b);
    }});
    return !0;
  }
  return !1;
}, onSuccessCheckActivation:function(f, h, i) {
  var a = this, c = Ext.decode(f.responseText, !0), b = c && c.result || 'UNKNOWN', g, d, e;
  if (!c.success) {
    a.fireEvent('serviceError', f, h, c, a.showLoginWindow, a);
    return;
  }
  if (b === 'VALID') {
    g = a.passwordChangeViewConfig && a.passwordChangeViewConfig.parentContainer;
    e = Ext.widget('WuisLoginPasswordReset', Ext.apply({eventController:a}, a.passwordChangeViewConfig));
    d = e.down('[itemId\x3duser]');
    if (d && i) {
      d.setValue(i);
    }
    g.add(e);
    return;
  }
  if (b === 'ALREADYACTIVATED') {
    Ext.Msg.alert('Information', 'You have already activated your password! Please login!', a.showLoginWindow, a);
    return;
  }
  if (b === 'INVALID') {
    Ext.Msg.alert('Error', 'This activation link is invalid! Please check the URL or send a new password reset request!', a.showLoginWindow, a);
    return;
  }
  if (b === 'EXPIRED') {
    Ext.Msg.alert('Error', 'This activation link has expired. Please send a new password reset request!', a.showLoginWindow, a);
    return;
  }
  if (b === 'UNKNOWN') {
    Ext.Msg.alert('Error', 'The validity of the activation link cannot be verified, please contact system administrator!', a.showLoginWindow, a);
    return;
  }
  a.fireEvent('serviceError', f, h, c, a.showLoginWindow, a);
}, onPasswordChange:function(f, a) {
  var b = this, e = document.location.href.split('?')[1], c = e && Ext.Object.fromQueryString(e) || null, d = {}, g = c && c.token;
  d.newPassword = a.password1;
  Ext.Ajax.request({url:b.restPrefix + 'activation/activate/' + encodeURIComponent(a.user) + '?token\x3d' + encodeURIComponent(g), method:'POST', disableCaching:!0, jsonData:d, headers:{'Content-Type':'application/json', 'Accept':'application/json'}, success:function(c, d) {
    b.onPasswordChangeSuccess(f, a, c, d);
  }, failure:function(c, d) {
    b.fireEvent('serviceError', c, d, null, function() {
      b.onCancelPasswordChange(f, a);
    });
  }});
}, onPasswordChangeSuccess:function(f, e, d, g) {
  var a = this, c = Ext.decode(d.responseText, !0), b = c && c.result || 'UNKNOWN', h = document.location.href.split('?')[0];
  if (!c.success || !b) {
    a.fireEvent('serviceError', d, g, c, function() {
      a.onCancelPasswordChange(f, e);
    });
    return;
  }
  if (b === 'VALID') {
    Ext.Msg.alert('Password Reset', 'Successfully reset your password. Please login with your new password!', function() {
      window.history.pushState({}, '', h);
      a.onCancelPasswordChange(f, e);
    });
    return;
  }
  if (b === 'ALREADYACTIVATED') {
    Ext.Msg.alert('Information', 'You have already activated your password! Please login!', a.showLoginWindow, a);
    return;
  }
  if (b === 'INVALID') {
    Ext.Msg.alert('Error', 'This activation link is invalid! Please check the URL or send a new password reset request!', a.showLoginWindow, a);
    return;
  }
  if (b === 'EXPIRED') {
    Ext.Msg.alert('Error', 'This activation link has expired. Please send a new password reset request!', a.showLoginWindow, a);
    return;
  }
  if (b === 'UNKNOWN') {
    Ext.Msg.alert('Error', 'The validity of the activation link cannot be verified, please contact system administrator!', a.showLoginWindow, a);
    return;
  }
  a.fireEvent('serviceError', d, g, c, function() {
    a.onCancelPasswordChange(f, e);
  });
}, onPasswordChangeFailure:function(b, a) {
  var c = this;
  Ext.Msg.alert('Error', 'Please try again later or contact the system administrator.', function() {
    c.onCancelPasswordChange(b, a);
  });
}, doAuthorization:function(b) {
  var a = this;
  WuisLogin.Security.authorize(a.restPrefix + 'authorization', {success:a.onAuthorizationSuccess, failure:function(d, c) {
    console.log('doAuthorization: FAILURE!');
    c.afterLogin = b === !0;
    a.onAuthorizationFailure(d, c);
  }, scope:a});
}, checkCertificateValidity:function() {
  this.validateSession();
}, onAuthorizationSuccess:function() {
  console.log('onAuthorizationSuccess...');
  var a = this, b = a.errorState;
  if (b) {
    if (!WuisLogin.Common.checkCompatibleRights(b.rights)) {
      a.reloadApplication();
    }
    if (a.handleServiceErrorComplete()) {
      return !1;
    }
  }
  if (a.applicationId && !WuisLogin.Common.hasApplicationAccess(a.applicationId)) {
    a.resetAuthorizationData();
    Ext.Msg.alert('Authorization Error', 'You are not authorized to access this application!\x3cbr/\x3ePlease contact your system administrator or try log in with a different credential.', function() {
      a.showLoginWindow();
    });
    return !1;
  }
  a.fireEvent('userauthorized');
  return !0;
}, isSaml2Allowed:function() {
  var b = this, e = window.location.hash || '', a = b.suppressSaml2Hash, c = WuisLogin.Security.config && WuisLogin.Security.config.authUrl, d = WuisLogin.Security.config && WuisLogin.Security.config.useSso;
  return b.allowSaml2Auth && d && c && (!a || e.toLowerCase().indexOf('#' + a) < 0);
}, redirectToAuthenticationUrl:function() {
  var c = this, a = WuisLogin.Security.config && WuisLogin.Security.config.authUrl, b = window.location.origin || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  if (c.isSaml2Allowed()) {
    a += '?' + Ext.Object.toQueryString({backUrl:b + window.location.pathname});
    Ext.log.info('Session is unauthenticated, but SAML2/SSO authentication is enabled: redirecting to `' + a + '` ...');
    window.location.href = a;
    return !0;
  }
  return !1;
}, onAuthorizationFailure:function(c, b, e) {
  var a = this, f = b && b.afterLogin, d = a.isSaml2Allowed();
  if (a.checkUnauthenticated(c)) {
    if (a.handleSessionExpired(c, b, e)) {
      return;
    }
    Ext.log.info('Session is unauthenticated, and SAML2/SSO authentication is ' + (a.isSaml2Allowed() ? 'enabled' : 'disabled') + ': showing login window...');
    if (!f && !d) {
      a.showLoginWindow();
      return;
    }
    Ext.Msg.show({title:a.titleMap.INFO, icon:Ext.Msg.INFO, msg:a.messageMap['iocc.sec.authorization.failed'], message:a.messageMap['iocc.sec.authorization.failed'], closable:!1, buttons:Ext.Msg.OK, buttonText:{ok:'Ok'}, fn:function() {
      if (d) {
        a.closeApplication();
      } else {
        a.showLoginWindow();
      }
    }});
    return;
  }
  a.fireEvent('serviceError', c, b, e, a.showLoginWindow);
}, onLogin:function(c, b) {
  var a = this;
  c.setLoading('Login...');
  WuisLogin.Security.authenticate(a.restPrefix + 'authentication/' + encodeURIComponent(b.user) + '?password\x3d' + encodeURIComponent(b.password), {success:a.onSuccessLogin, failure:a.onFailureLogin, scope:a});
}, onSuccessLogin:function(a, e) {
  var b = this, d = b.getLoginWin(), c = a && Ext.decode(a.responseText, !0) || null;
  if (d) {
    d.setLoading(!1);
  }
  if (!c || !c.success) {
    b.fireEvent('serviceError', a, e, null);
    return;
  }
  WuisLogin.controller.Login.prototype.onSuccessLogin.apply(this, arguments);
  b.doAuthorization(!0);
}, onFailureLogin:function(c, d) {
  var b = this, a = b.getLoginWin();
  if (a) {
    a.setLoading(!1);
  }
  b.fireEvent('serviceError', c, d, null);
}, handleServiceError:function(b, e, d, f, g) {
  var a = this, c;
  if (a.errorState) {
    Ext.log.warn('Repeated error occurred while processing requests!');
  }
  a.errorState = {response:b, opts:e, data:d, rights:a.errorState && a.errorState.rights, identity:WuisLogin.Security.identity, callback:f, scope:g};
  c = a.processMessages(b, e, d);
  if (b && a.checkUnauthenticated(b)) {
    a.showMessages(c, 0, function() {
      if (a.handleSessionExpired(b, e, d)) {
        return;
      }
      a.handleServiceErrorReauthenticate();
    });
    return;
  }
  a.showMessages(c, 0, a.handleServiceErrorComplete, a);
}, handleServiceErrorReauthenticate:function() {
  var a = this, d = '', c = !1, b = Ext.ComponentQuery.query('WuisLoginPasswordReset')[0];
  if (WuisLogin.Security.identity) {
    d = a.getLoginUserName();
    c = !0;
  }
  if (b) {
    b.destroy();
  }
  a.errorState.rights = WuisLogin.Security.rights;
  a.showLoginWindow({userName:d, userNameReadOnly:c});
}, handleServiceErrorComplete:function() {
  var a = this, b = a.errorState && a.errorState.callback, c = a.errorState && a.errorState.scope;
  if (b) {
    b.call(c || a);
    a.errorState = null;
    return !0;
  }
  a.errorState = null;
  return !1;
}, processMessages:function(e, g, b, i) {
  var c = this, a = [], f = c.messageMap, h, d = g && g.serviceName && ' - ' + g.serviceName || '';
  if (!e) {
    a.push({icon:Ext.Msg.ERROR, title:'Error in Service' + d, message:f['iocc.sec.unexpected.exception']});
    return a;
  }
  if (!b && e.responseText) {
    try {
      b = Ext.decode(e.responseText, !0);
    } catch (j) {
      Ext.log.warn('Unable to decode response text.', j);
    }
  }
  if (b) {
    if (Ext.isString(b)) {
      a.push({icon:Ext.Msg.ERROR, title:c.titleMap.ERROR + d, message:b});
    } else {
      if (b.errState && b.errState.errMessage) {
        a.push({icon:Ext.Msg.ERROR, title:c.titleMap.ERROR + d, message:b.errState.errMessage});
      } else {
        if (b.messages) {
          Ext.each(b.messages, function(j) {
            var l = Ext.isString(j) ? j : Ext.isObject(f) && f[j.messageKey] || j.messageKey, k = Ext.isArray(j.params) ? j.params : [];
            if (!l) {
              Ext.iterate(j, function(a, c) {
                if (a !== 'params' && a !== 'messageKey' && a !== 'popUpType' && a !== 'severity') {
                  l = c;
                  return !1;
                }
              });
            }
            if (k[0] && Ext.isNumber(k[0])) {
              h = k[0];
            }
            a.push({icon:c.iconMap[j.severity] || Ext.Msg.ERROR, title:(c.titleMap[j.severity] || c.titleMap.ERROR) + d, message:Ext.String.format(l, k.join(', ')) || 'An unrecongnized error occurred', errorCode:h});
          });
        }
      }
    }
  }
  if (a.length) {
    return a;
  }
  if (c.checkUnauthenticated(e)) {
    a.push({icon:Ext.Msg.ERROR, title:'Unauthorized Operation' + d, message:f[i ? 'iocc.sec.internal.logged.out.or.session.expired' : 'iocc.sec.internal.error.no.message']});
    return a;
  }
  a.push({icon:Ext.Msg.ERROR, title:c.titleMap.ERROR + d, message:'An unexpected error (status: ' + (e.status || 'none') + ') occurred while trying to process your request!\x3cbr/\x3ePlease try again or notify the system administrator if the problem persists!'});
  return a;
}, showMessages:function(d, b, c, e) {
  b = b || 0;
  var f = this, a = d[b];
  if (!a) {
    if (c) {
      c.call(e || f);
    }
    return;
  }
  Ext.Msg.show({title:a.title, msg:a.message, message:a.message, icon:a.icon || Ext.Msg.ERROR, buttons:Ext.Msg.OK, closable:!1, fn:function() {
    f.showMessages(d, b + 1, c, e);
  }});
}, startInactivityControl:function() {
  var a = this;
  if (!a.allowInactivityControl) {
    Ext.log.info('Inactivity control is disabled on client-side.');
    return !1;
  }
  if (!a.getCheckInactivityInterval()) {
    Ext.log.info('Inactivity control is disabled on server-side.');
    return !1;
  }
  a.resetInactivityCheckTask(!0);
  Ext.getBody().on({click:a.handleUserInteraction, keypress:a.handleUserInteraction, scope:a});
  return !0;
}, getCheckInactivityInterval:function() {
  var b = this, a;
  if (b.checkInactivityInterval) {
    return b.checkInactivityInterval;
  }
  a = WuisLogin.Security.config && WuisLogin.Security.config.certValidity || null;
  return a ? Math.floor(a * 60 / 3) : null;
}, resetInactivityCheckTask:function(d) {
  var a = this, b = a.getCheckInactivityInterval(), c = !1;
  if (a.checkInactivityTask) {
    c = !0;
    a.checkInactivityTask.stop();
    a.checkInactivityTask = null;
  }
  if (!a.allowInactivityControl) {
    d = !1;
  }
  if (!d || !b || !a.allowInactivityControl) {
    Ext.log.info(c ? 'User inactivity check is stopped.' : 'User inactivity check has already stopped.');
    return;
  }
  a.checkInactivityTask = Ext.TaskManager.newTask({run:a.checkInactivity, scope:a, interval:b * 1000});
  a.checkInactivityTask.start();
  Ext.log.info('User inactivity check is ' + (c ? 'restarted ' : 'started') + ' (' + b + ' sec).');
}, checkInactivity:function() {
  var a = this, b = a.userInteractionOccured;
  a.userInteractionOccured = !1;
  a.resetInactivityCheckTask(!0);
  if (!a.isLoggedIn()) {
    return;
  }
  if (b) {
    a.renewSession();
    return;
  }
  a.validateSession();
}, validateSession:function() {
  var a = this, b = a.messageMap;
  if (!a.isLoggedIn()) {
    return;
  }
  WuisLogin.Security.validate(a.restPrefix + 'authentication/validate', {success:function(e, f, c) {
    var d = c && c.userName || null;
    if (!a.isLoggedIn()) {
      return;
    }
    if (d.toUpperCase() !== a.getLoginUserName().toUpperCase()) {
      a.resetAuthorizationData();
      Ext.Msg.show({title:a.titleMap.WARNING, icon:a.iconMap.WARNING, msg:b['iocc.sec.internal.warning.identity.changed'], message:b['iocc.sec.internal.warning.identity.changed'], closable:!1, buttons:Ext.Msg.OK, buttonText:{ok:b['iocc.sec.internal.button.reload']}, fn:function() {
        a.reloadApplication();
      }});
      return;
    }
  }, failure:function(b, c, d) {
    if (a.checkUnauthenticated(b)) {
      a.handleSessionExpired(b, c, d, !0);
    }
  }});
}, renewSession:function() {
  var a = this, b = a.messageMap, c = a.getLoginUserName();
  if (!a.isLoggedIn()) {
    return;
  }
  if (!c) {
    Ext.log.warn('Unable to start heartbeat: identity name is missing!');
    return;
  }
  WuisLogin.Security.renewCertificate(a.restPrefix + 'authentication/renew/' + encodeURIComponent(c), {success:function(f, g, d) {
    var e = d && d.user || null;
    if (!a.isLoggedIn()) {
      return;
    }
    if (e.toUpperCase() !== c.toUpperCase()) {
      a.resetAuthorizationData();
      Ext.Msg.show({title:a.titleMap.WARNING, icon:a.iconMap.WARNING, msg:b['iocc.sec.internal.warning.identity.changed'], message:b['iocc.sec.internal.warning.identity.changed'], closable:!1, buttons:Ext.Msg.OK, buttonText:{ok:b['iocc.sec.internal.button.reload']}, fn:function() {
        a.reloadApplication();
      }});
      return;
    }
  }, failure:function(b, c, d) {
    if (a.checkUnauthenticated(b)) {
      a.handleSessionExpired(b, c, d, !0);
    }
  }});
}, isLoggedIn:function() {
  return this.loggingOut ? !1 : !!WuisLogin.Security.identity;
}, getLoginUserName:function() {
  return WuisLogin.Security.identity && Ext.isString(WuisLogin.Security.identity.name) ? WuisLogin.Security.identity.name : null;
}, handleUserInteraction:function(a) {
  var b = this;
  if (!b.userInteractionOccured) {
    b.userInteractionOccured = !0;
    Ext.log.info('User interaction occured (' + (a && a.type || '???') + ').');
  }
}, logout:function(a) {
  var b = this;
  a = a || {};
  if (a.forced !== !0 && !b.isLoggedIn()) {
    return !1;
  }
  b.loggingOut = !0;
  Ext.getBody().mask();
  WuisLogin.Security.logout(Ext.apply(WuisLogin.Security.getUrlFromConfig('logout', b.restPrefix, 'logout'), {success:function(d, c, e) {
    Ext.getBody().unmask();
    b.logoutInIframe(function() {
      b.loggingOut = !1;
      if (a.success && a.success.call(a.scope || b, d, c, e) === !1) {
        return;
      }
      b.handleLogout(d, c, a, e, !0);
    });
  }, failure:function(c, d) {
    b.loggingOut = !1;
    Ext.getBody().unmask();
    if (a.failure && a.failure.call(a.scope || b, c, d) === !1) {
      return;
    }
    b.fireEvent('serviceError', c, a, null);
  }}));
  return !0;
}, logoutInIframe:function(b, f) {
  var d = this, e = WuisLogin.Security.config && WuisLogin.Security.config.useSsoLogoutUrl ? WuisLogin.Security.getUrlFromConfig('ssoLogout') : null, c = !1, a;
  if (d.isSaml2Allowed() && e && e.url) {
    Ext.getBody().mask();
    a = document.createElement('iframe');
    a.setAttribute('border', 0);
    a.setAttribute('height', 0);
    a.setAttribute('width', 0);
    a.src = e.url;
    a.onload = function() {
      Ext.getBody().unmask();
      if (!c) {
        return;
      }
      c = !1;
      if (b) {
        b.call(f || d, !0);
      }
    };
    c = !0;
    Ext.getBody().dom.appendChild(a);
    Ext.defer(function() {
      Ext.getBody().unmask();
      if (!c) {
        return;
      }
      c = !1;
      if (b) {
        b.call(f || d, !1);
      }
    }, d.ssoLogoutTimeoutInterval);
    return;
  }
  if (b) {
    b.call(f || d);
  }
}, handleSessionExpired:function(h, l, e, o, f) {
  var a = this, m = {100:'certificateNotFound', 101:'invalidCertificate', 102:'fatalError', 103:'certificateExpired'}, n = a.messageMap, j = a.actionMap, i = 'OK', d = [], g, c, k, b;
  if (o !== !0 && !a.isLoggedIn()) {
    return !1;
  }
  e = e || Ext.decode(h.responseText, !0);
  d = a.processMessages(h, l, e, !0);
  if (d && d.length) {
    c = d[0].errorCode;
    g = d[0].message;
  }
  k = c && m[c] || 'sessionExpired';
  b = j[k] || j.sessionExpired;
  if (Ext.isArray(b)) {
    i = n[b[1]] || 'OK';
    b = b[0];
  }
  if (a.isSaml2Allowed() && b === 'REAUTHENTICATE') {
    b = 'CLOSE';
  }
  if (f && (!c || c === 100)) {
    a.handleValidateResponse('RELOAD', !0);
    return !0;
  }
  if (!f && a.fireEvent('sessionexpired', h, l, e, b) === !1) {
    return !0;
  }
  if (!c || !a.isSaml2Allowed()) {
    if (b === 'RELOAD') {
      a.resetAuthorizationData();
      a.logoutInIframe(function() {
        a.reloadApplication();
      });
      return !0;
    }
    if (b === 'REAUTHENTICATE') {
      if (f) {
        a.showLoginWindow();
      } else {
        a.resetAuthorizationData();
        a.logoutInIframe(function() {
          a.reloadApplication();
        });
      }
      return !0;
    }
  }
  if (b !== 'LOGOUT') {
    a.resetAuthorizationData();
  } else {
    a.loggingOut = !0;
  }
  a.logoutInIframe(function() {
    Ext.Msg.show({title:a.titleMap.INFO, icon:Ext.Msg.INFO, msg:g, message:g, closable:!1, buttons:Ext.Msg.OK, buttonText:{ok:i}, fn:function() {
      a.handleValidateResponse(b);
    }});
  });
  return !0;
}, handleValidateResponse:function(b, c) {
  var a = this;
  if (b === 'CLOSE') {
    a.closeApplication();
    return;
  }
  if (b === 'CLOSE/RELOAD') {
    a.closeApplication();
    a.reloadApplication();
    return;
  }
  if (b === 'REVALIDATE') {
    a.validateSession();
    return;
  }
  if (b === 'REAUTHENTICATE' || b === 'RELOAD') {
    if (!a.redirectToAuthenticationUrl()) {
      if (c) {
        a.showLoginWindow();
      } else {
        a.reloadApplication();
      }
    }
    return;
  }
  if (b === 'LOGOUT') {
    a.logout({forced:!0, logoutActionKey:'sessionExpiredLogout'});
    return;
  }
}, handleLogout:function(f, g, c, d, h) {
  var b = this, a = b.actionMap[c.logoutActionKey || 'logout'] || b.actionMap.logout, e = 'OK';
  if (Ext.isArray(a)) {
    e = b.messageMap[a[1]] || 'OK';
    a = a[0];
  }
  d = d || Ext.decode(f.responseText, !0);
  if (b.fireEvent('logout', f, g, c, d, h, a) === !1) {
    return;
  }
  Ext.util.Cookies.clear('IOCC-Cert');
  Ext.util.Cookies.clear('IOCC-Cert-zipped');
  b.resetAuthorizationData();
  if (a.indexOf('NOTIFY') !== 0 && b.handleDefaultAction(a)) {
    return !1;
  }
  b.notifyMessage(c.notifyMessageKey || 'iocc.sec.internal.logged.out', e, a);
}, notifyMessage:function(a, d, e) {
  var c = this, b = c.messageMap;
  Ext.Msg.show({title:c.titleMap.INFO, icon:Ext.Msg.INFO, msg:b[a] || a, message:b[a] || a, closable:!1, buttons:Ext.Msg.OK, buttonText:{ok:b[d] || d}, fn:function() {
    c.handleDefaultAction(e);
  }});
}, handleDefaultAction:function(b) {
  var a = this;
  if (b.indexOf('CLOSE/RELOAD') >= 0) {
    a.closeApplication();
    a.reloadApplication();
    return !0;
  }
  if (b.indexOf('RELOAD') >= 0) {
    a.reloadApplication();
    return !0;
  }
  if (b.indexOf('CLOSE') >= 0) {
    a.closeApplication();
    return !0;
  }
  return !1;
}, resetAuthorizationData:function() {
  WuisLogin.Security.resetAuthorizationData();
}, closeApplication:function() {
  window.close();
}});
Ext.cmd.derive('WuisLogin.view.ForgottenPasswordForm', Ext.panel.Panel, {cls:'wuislogin-forgottenpwd', layout:'fit', closable:false, resizable:false, constrain:true, width:300, title:'Forgotten Password - Password Reset', iconCls:'icon-key', frame:false, bodyBorder:false, border:true, hideBorders:true, buttonTextOk:'Send Password Reset', buttonTextCancel:'Cancel', passwordResetText:'', eventController:null, headerHtml:'\x3cimg src\x3d"resources/wuis-login/lsy-logo-small.png" style\x3d"width:250px;height:30px;margin-top:10px" /\x3e', 
initComponent:function() {
  var me = this;
  me.createItems();
  me.createButtons();
  Ext.panel.Panel.prototype.initComponent.apply(this, arguments);
}, createItems:function() {
  var me = this;
  me.items = {xtype:'form', frame:false, bodyBorder:false, border:false, hideBorders:true, bodyPadding:15, dockedItems:[{xtype:'box', html:me.headerHtml}], items:[{xtype:'textfield', labelAlign:'top', fieldLabel:'User Name', name:'user', itemId:'user', margin:'0 0 5 0', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:false, listeners:{specialkey:me.onSpecialKey, scope:me}}], listeners:{validitychange:me.onFormValidityChange, scope:me}};
}, createButtons:function() {
  var me = this;
  me.buttons = [{text:me.buttonTextCancel || 'Cancel', itemId:'cancelBtn', cls:'id-cancelBtn', handler:me.onCancelClick, scope:me}, {text:me.buttonTextOk || 'Send reset instructions', itemId:'okBtn', cls:'id-okBtn', disabled:true, handler:me.onOkClick, scope:me}];
}, afterRender:function() {
  Ext.panel.Panel.prototype.afterRender.call(this);
  this.focus();
  this.down('[name\x3duser]').focus();
}, onFormValidityChange:function(uvy1, a) {
  this.down('#okBtn').setDisabled(!a);
}, onSpecialKey:function(t, event) {
  if (event.getKey() === event.ENTER) {
    this.onOkClick();
  }
}, onCancelClick:function() {
  var node = this;
  var invalidateStub = node.down('form');
  (node.eventController || node).fireEvent('forgottenpasswordcancel', node, invalidateStub.getValues());
}, onOkClick:function() {
  var node = this;
  var b = node.down('form');
  if (!b.isValid()) {
    return;
  }
  node.down('#okBtn').setDisabled(true);
  (node.eventController || node).fireEvent('forgottenpasswordchange', node, b.getValues());
}, getUserField:function() {
  return this.down('#user');
}}, 0, ['WuisLoginForgottenPasswordForm'], ['component', 'box', 'container', 'panel', 'WuisLoginForgottenPasswordForm'], {'component':true, 'box':true, 'container':true, 'panel':true, 'WuisLoginForgottenPasswordForm':true}, ['widget.WuisLoginForgottenPasswordForm'], 0, [WuisLogin.view, 'ForgottenPasswordForm'], 0);
Ext.define('WuisLogin.view.Login', {extend:'Ext.window.Window', alias:'widget.WuisLogin', component:true, box:true, container:true, panel:true, window:true, WuisLogin:true, cls:'wuislogin-window', layout:'fit', closable:false, resizable:false, modal:true, constrain:true, width:500, y:140, title:'Login', iconCls:'icon-key', eventController:null, headerHtml:null, initComponent:function() {
  var me = this;
  me.createItems();
  me.createButtons();
  Ext.window.Window.prototype.initComponent.apply(this, arguments);
}, createItems:function() {
  var me = this;
  var items = [];
  if (me.headerHtml) {
    items.push({xtype:'box', cls:'login-header', html:me.headerHtml});
  }
  if (WuisLogin.Security.tenants) {
    items.push({xtype:'combobox', name:'tenant', labelAlign:'top', fieldLabel:'Airline', emptyText:'Please choose an airline', store:{fields:['name'], data:WuisLogin.Security.tenants}, queryMode:'local', displayField:'name', valueField:'name', allowBlank:false, itemId:'tenant', margin:'0 0 5 280', labelStyle:'margin-bottom:5px', anchor:'100%', value:WuisLogin.Common.loadTenant(), editable:false});
  }
  items.push({xtype:'textfield', labelAlign:'top', fieldLabel:'Login Name', name:'user', itemId:'user', margin:'0 0 5 280', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:false, value:me.userName || '', readOnly:me.userNameReadOnly || false, listeners:{specialkey:me.onSpecialKey, scope:me}});
  items.push({xtype:'textfield', labelAlign:'top', fieldLabel:'Password', inputType:'password', name:'password', itemId:'password', margin:'0 0 30 280', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:false, listeners:{specialkey:me.onSpecialKey, scope:me}});
  if (me.showForgottenPassword) {
    items.push({xtype:'component', autoEl:{tag:'a', href:'#', html:'Forgot your password?'}, listeners:{el:{click:me.onForgottenPasswordClick}, scope:me}});
  }
  me.items = {xtype:'form', border:0, bodyPadding:15, items:items, listeners:{validitychange:me.onFormValidityChange, scope:me}};
}, createButtons:function() {
  var self = this;
  var data = {text:'Change password', itemId:'changePasswordBtn', cls:'id-changePasswordBtn', hidden:!self.showPasswordChange, handler:self.onPasswordChangeClick, scope:self};
  var defaults = {text:'Login', iconCls:'icon-key', cls:'id-loginBtn', itemId:'loginBtn', disabled:true, handler:self.onLoginClick, scope:self};
  self.buttons = self.loginFirst ? [defaults, data] : [data, defaults];
}, afterRender:function() {
  Ext.window.Window.prototype.afterRender.call(this);
  this.focus();
  this.getUserField().focus();
}, onFormValidityChange:function(uvy1, a) {
  this.down('#loginBtn').setDisabled(!a);
}, onSpecialKey:function(t, event) {
  if (event.getKey() === event.ENTER) {
    this.onLoginClick();
  }
}, onForgottenPasswordClick:function(event) {
  event.preventDefault();
  var node = this;
  var invalidateStub = node.down('form');
  (node.eventController || node).fireEvent('forgottenpasswordclick', node, invalidateStub.getValues());
}, onPasswordChangeClick:function() {
  var self = this;
  var checklistForm = self.getForm();
  (self.eventController || self).fireEvent('passwordchangeclick', self, checklistForm.getValues());
}, onLoginClick:function() {
  var self = this;
  var initialValueMoment = self.getForm();
  if (!initialValueMoment.isValid()) {
    return;
  }
  (self.eventController || self).fireEvent('login', self, initialValueMoment.getValues());
}, getUserField:function() {
  return this.getForm().items.get('user');
}, getPasswordField:function() {
  return this.getForm().items.get('password');
}, getForm:function() {
  return this.items.getAt(0);
}});
Ext.cmd.derive('WuisLogin.view.LoginForm', Ext.panel.Panel, {cls:'wuislogin-form', layout:'fit', closable:!1, resizable:!1, constrain:!0, width:300, frame:!1, bodyBorder:!1, border:!0, hideBorders:!0, bodyPadding:15, headerHtml:null, eventController:null, initComponent:function() {
  var a = this;
  a.createItems();
  a.createButtons();
  Ext.panel.Panel.prototype.initComponent.apply(this, arguments);
}, createItems:function() {
  var a = this, b = [];
  if (a.headerHtml) {
    b.push({xtype:'box', html:a.headerHtml});
  }
  if (WuisLogin.Security.tenants) {
    b.push({xtype:'combobox', name:'tenant', labelAlign:'top', fieldLabel:'Airline', emptyText:'Please choose an airline', store:{fields:['name'], data:WuisLogin.Security.tenants}, queryMode:'local', displayField:'name', valueField:'name', allowBlank:!1, itemId:'tenant', margin:'0 0 5 0', labelStyle:'margin-bottom:5px', anchor:'100%', value:WuisLogin.Common.loadTenant(), editable:!1});
  }
  b.push({xtype:'textfield', labelAlign:'top', fieldLabel:'User Name', name:'user', itemId:'user', margin:'0 0 5 0', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:!1, value:a.userName || '', readOnly:a.userNameReadOnly || !1, listeners:{specialkey:a.onSpecialKey, scope:a}});
  b.push({xtype:'textfield', labelAlign:'top', fieldLabel:'Password', inputType:'password', name:'password', itemId:'password', margin:'0 0 30 0', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:a.emptyPasswordEnabled, listeners:{specialkey:a.onSpecialKey, scope:a}});
  if (a.showForgottenPassword) {
    b.push({xtype:'component', autoEl:{tag:'a', href:'#', html:'Forgot your password?'}, listeners:{el:{click:a.onForgottenPasswordClick, scope:a}}});
  }
  a.items = {xtype:'form', frame:!1, bodyBorder:!1, border:!1, hideBorders:!0, items:b, listeners:{validitychange:a.onFormValidityChange, scope:a}};
}, createButtons:function() {
  var a = this;
  a.buttons = [{text:'Change password', itemId:'changePasswordBtn', cls:'id-changePasswordBtn', hidden:!a.showPasswordChange, handler:a.onPasswordChangeClick, scope:a}, {text:'Login', iconCls:'icon-key', cls:'id-loginBtn', itemId:'loginBtn', disabled:!0, handler:a.onLoginClick, scope:a}];
}, afterRender:function() {
  Ext.panel.Panel.prototype.afterRender.call(this);
  this.focus();
  this.down('#user').focus();
}, onFormValidityChange:function(b, a) {
  this.down('#loginBtn').setDisabled(!a);
}, onSpecialKey:function(b, a) {
  if (a.getKey() === a.ENTER) {
    this.onLoginClick();
  }
}, onForgottenPasswordClick:function(c) {
  c.preventDefault();
  var a = this, b = a.getForm();
  (a.eventController || a).fireEvent('forgottenpasswordclick', a, b.getValues());
}, onPasswordChangeClick:function() {
  var a = this, b = a.getForm();
  (a.eventController || a).fireEvent('passwordchangeclick', a, b.getValues());
}, onLoginClick:function() {
  var a = this, b = a.getForm();
  if (!b.isValid()) {
    return;
  }
  (a.eventController || a).fireEvent('login', a, b.getValues());
}, getUserField:function() {
  return this.down('#user');
}, getPasswordField:function() {
  return this.down('#password');
}, getForm:function() {
  return this.items.getAt(0);
}}, 0, ['WuisLoginForm'], ['component', 'box', 'container', 'panel', 'WuisLoginForm'], {'component':!0, 'box':!0, 'container':!0, 'panel':!0, 'WuisLoginForm':!0}, ['widget.WuisLoginForm'], 0, [WuisLogin.view, 'LoginForm'], 0);
Ext.cmd.derive('WuisLogin.view.PasswordChange', Ext.window.Window, {cls:'wuislogin-passwordchange', layout:'fit', closable:false, resizable:false, modal:true, constrain:true, width:500, y:100, title:'Change Password', iconCls:'icon-key', passwordVtype:'wuisPassword', passwordValidator:null, eventController:null, headerHtml:null, validateMethod:'validator', passwordValidateTimerId:null, passwordErrors:null, initComponent:function() {
  var me = this;
  me.createItems();
  me.createButtons();
  Ext.window.Window.prototype.initComponent.apply(this, arguments);
}, createItems:function() {
  var me = this;
  var items = [];
  if (me.headerHtml) {
    items.push({xtype:'box', cls:'login-header', padding:'15 15 0 15', html:me.headerHtml});
  }
  items.push({xtype:'box', dock:'left', itemId:'errorMsg', padding:'19 15 15 15', html:'', width:230});
  me.items = {xtype:'form', border:0, bodyStyle:'border:0 none', bodyPadding:15, dockedItems:items, items:[{xtype:'textfield', labelAlign:'top', fieldLabel:'User Name', name:'user', itemId:'user', margin:'0 0 5 20', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:false, listeners:{specialkey:me.onSpecialKey, scope:me}}, {xtype:'textfield', labelAlign:'top', fieldLabel:'Old Password', inputType:'password', name:'oldPassword', itemId:'oldPassword', margin:'0 0 5 20', labelStyle:'margin-bottom:5px', 
  anchor:'100%', allowBlank:false, listeners:{specialkey:me.onSpecialKey, scope:me}}, {xtype:'textfield', labelAlign:'top', fieldLabel:'New Password', inputType:'password', name:'password1', itemId:'password1', margin:'0 0 5 20', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:false, vtype:me.passwordVtype, validator:me.validateMethod === 'validator' ? me.passwordValidator : null, listeners:{specialkey:me.onSpecialKey, change:me.onPassword1Change, errorchange:me.onPassword1ErrorChange, 
  scope:me}}, {xtype:'textfield', labelAlign:'top', fieldLabel:'New Password Again', inputType:'password', name:'password2', itemId:'password2', margin:'0 0 5 20', labelStyle:'margin-bottom:5px', anchor:'100%', allowBlank:false, validator:function(isSelection) {
    return isSelection === this.prev().getValue() ? true : 'Passwords do not match!';
  }, listeners:{specialkey:me.onSpecialKey, scope:me}}, {xtype:'textfield', labelAlign:'top', fieldLabel:' ', labelSeparator:'', margin:'0 0 5 20', labelStyle:'margin-bottom:5px', anchor:'100%', readOnly:true, itemId:'pwStrength', value:'Password Strength', cls:'password-strength-field', validator:function() {
    return me.validateMethod !== 'service' || !me.passwordErrors ? true : me.passwordErrors;
  }}], listeners:{validitychange:me.onFormValidityChange, scope:me}};
}, createButtons:function() {
  var me = this;
  me.buttons = [{text:'Ok', itemId:'okBtn', cls:'id-okBtn', disabled:true, handler:me.onPasswordChangeClick, scope:me}, {text:'Cancel', itemId:'cancelBtn', cls:'id-cancelBtn', handler:me.onCancelClick, scope:me}];
}, afterRender:function() {
  var inlineEditor2 = this;
  var domainTextField = inlineEditor2.getOldPasswordField();
  Ext.window.Window.prototype.afterRender.call(this);
  inlineEditor2.focus();
  if (domainTextField.getValue()) {
    inlineEditor2.getPasswordField().focus();
  } else {
    domainTextField.focus();
  }
}, onFormValidityChange:function(eventStr, a) {
  this.down('#okBtn').setDisabled(!a);
}, onSpecialKey:function(cmp, event) {
  if (event.getKey() === event.ENTER) {
    this.doPasswordChange();
  }
}, onCancelClick:function() {
  var self = this;
  (self.eventController || self).fireEvent('passwordchangecancel', self, self.getForm().getValues());
}, onPasswordChangeClick:function() {
  this.doPasswordChange();
}, onPassword1Change:function() {
  var me = this;
  me.getForm().items.get('password2').isValid();
  if (me.validateMethod === 'service') {
    if (me.passwordValidateTimerId) {
      clearTimeout(me.passwordValidateTimerId);
    }
    me.passwordValidateTimerId = Ext.defer(me.firePasswordValidationEvent, 500, me);
  }
}, firePasswordValidationEvent:function() {
  var self = this;
  (self.eventController || self).fireEvent('validatepassword', self, self.getForm().getValues());
}, onPassword1ErrorChange:function(md, s) {
  var c = this;
  var b = !md.getValue();
  var gridcontX = this.getPwStrengthField();
  if (c.validateMethod === 'service') {
    return;
  }
  gridcontX.removeCls(['pw-ok', 'pw-error']);
  if (!b && !s) {
    gridcontX.addCls('pw-ok');
  } else {
    if (!b) {
      gridcontX.addCls('pw-error');
    }
  }
}, getUserField:function() {
  return this.getForm().items.get('user');
}, getOldPasswordField:function() {
  return this.getForm().items.get('oldPassword');
}, getPasswordField:function() {
  return this.getForm().items.get('password1');
}, getPwStrengthField:function() {
  return this.getForm().items.get('pwStrength');
}, getErrorMsgBox:function() {
  return this.down('#errorMsg');
}, getForm:function() {
  return this.items.getAt(0);
}, doPasswordChange:function() {
  var self = this;
  var form = self.getForm();
  if (!form.isValid()) {
    return;
  }
  (self.eventController || self).fireEvent('passwordchange', self, form.getValues());
}}, 0, ['WuisLoginPasswordChange'], ['component', 'box', 'container', 'panel', 'window', 'WuisLoginPasswordChange'], {'component':true, 'box':true, 'container':true, 'panel':true, 'window':true, 'WuisLoginPasswordChange':true}, ['widget.WuisLoginPasswordChange'], 0, [WuisLogin.view, 'PasswordChange'], 0);
Ext.cmd.derive('WuisLogin.view.ResetPasswordForm', Ext.panel.Panel, {cls:'wuislogin-passwordchange', layout:'fit', closable:false, resizable:false, modal:true, constrain:true, width:360, title:'Change Password', iconCls:'icon-key', passwordVtype:'wuisPassword', passwordValidator:null, validateMethod:'validator', eventController:null, passwordValidateTimerId:null, passwordErrors:null, headerHtml:'\x3cdiv style\x3d"font-size:14px;color:#194C7F;font-weight:bold"\x3eChange password\x3c/div\x3e\x3cimg src\x3d"resources/wuis-login/lsy-logo-small.png" style\x3d"width:250px;height:30px;margin-top:10px" /\x3e', 
initComponent:function() {
  var me = this;
  me.createItems();
  me.createButtons();
  Ext.panel.Panel.prototype.initComponent.apply(this, arguments);
}, createItems:function() {
  var me = this;
  me.items = {xtype:'form', border:0, bodyStyle:'border:0 none', bodyPadding:15, dockedItems:[me.headerHtml ? {xtype:'box', html:me.headerHtml} : null], defaults:{labelAlign:'top', minWidth:300, margin:'0 0 5 20'}, items:[{xtype:'textfield', fieldLabel:'User Name', itemId:'user', name:'user', allowBlank:false, listeners:{specialkey:me.onSpecialKey, scope:me}}, {xtype:'textfield', fieldLabel:'New Password', inputType:'password', itemId:'password1', name:'password1', allowBlank:me.emptyPasswordEnabled, 
  vtype:me.passwordVtype, validator:me.validateMethod === 'validator' ? me.passwordValidator : null, listeners:{specialkey:me.onSpecialKey, change:me.onPassword1Change, errorchange:me.onPassword1ErrorChange, scope:me}}, {xtype:'textfield', fieldLabel:'New Password Again', inputType:'password', itemId:'password2', name:'password2', allowBlank:me.emptyPasswordEnabled, validator:function(isSelection) {
    return isSelection === this.prev('#password1').getValue() ? true : 'Passwords do not match!';
  }, listeners:{specialkey:me.onSpecialKey, change:me.onPassword2Change, scope:me}}, {xtype:'textfield', fieldLabel:' ', labelSeparator:'', readOnly:true, itemId:'pwStrength', value:'Password Strength', cls:'password-strength-field', validator:function() {
    return me.validateMethod !== 'service' || !me.passwordErrors ? true : me.passwordErrors;
  }}, {xtype:'box', cls:'password-errors', itemId:'errorMsg', html:''}], listeners:{validitychange:me.onFormValidityChange, scope:me}};
}, createButtons:function() {
  var me = this;
  me.buttons = [{text:'Ok', itemId:'okBtn', cls:'id-okBtn', disabled:true, handler:me.onPasswordChangeClick, scope:me}, {text:'Cancel', itemId:'cancelBtn', cls:'id-cancelBtn', handler:me.onCancelClick, scope:me}];
}, afterRender:function() {
  Ext.panel.Panel.prototype.afterRender.call(this);
  this.focus();
}, updateButtonStatus:function() {
  var me = this;
  var formMetadata = me.getForm();
  var date = me.down('#okBtn');
  var month = formMetadata && formMetadata.getForm();
  if (date && month) {
    date.setDisabled(!month.isValid() || me.validateMethod === 'service' && me.passwordValidateTimerId);
  }
}, onFormValidityChange:function() {
  this.updateButtonStatus();
}, onSpecialKey:function(cmp, event) {
  if (event.getKey() === event.ENTER) {
    this.doPasswordChange();
  }
}, onCancelClick:function() {
  var node = this;
  var form = node.down('form');
  (node.eventController || node).fireEvent('passwordchangecancel', node, form.getValues());
}, onPasswordChangeClick:function() {
  this.doPasswordChange();
}, onPassword1Change:function() {
  var me = this;
  me.getForm().items.get('password2').isValid();
  me.updateButtonStatus();
  if (me.validateMethod === 'service') {
    if (me.passwordValidateTimerId) {
      clearTimeout(me.passwordValidateTimerId);
      me.passwordValidateTimerId = null;
    }
    me.passwordValidateTimerId = Ext.defer(me.firePasswordValidationEvent, 500, me);
  }
}, firePasswordValidationEvent:function() {
  var self = this;
  self.passwordValidateTimerId = null;
  (self.eventController || self).fireEvent('validatepassword', self, self.getForm().getValues());
  self.updateButtonStatus();
}, onPassword2Change:function() {
  this.updateButtonStatus();
}, onPassword1ErrorChange:function(ecPropertyDesc, ecGroupId) {
  var c = this;
  var b = !ecPropertyDesc.getValue();
  var textarea = this.getPwStrengthField();
  if (c.validateMethod === 'service') {
    return;
  }
  textarea.removeCls(['pw-ok', 'pw-error']);
  if (b) {
    textarea.setValue('Password Strength');
  } else {
    if (!ecGroupId) {
      textarea.addCls('pw-ok');
    } else {
      textarea.addCls('pw-error');
    }
  }
}, getForm:function() {
  return this.items.getAt(0);
}, getUserField:function() {
  return this.getForm().items.get('user');
}, getPasswordField:function() {
  return this.getForm().items.get('password1');
}, getPwStrengthField:function() {
  return this.getForm().items.get('pwStrength');
}, getErrorMsgBox:function() {
  return this.getForm().items.get('errorMsg');
}, doPasswordChange:function() {
  var self = this;
  var p = self.getForm();
  var c = self.down('#okBtn');
  if (!p || !c || c.isDisabled() || !p.isValid()) {
    return;
  }
  (self.eventController || self).fireEvent('passwordchange', self, p.getValues());
}}, 0, ['WuisLoginPasswordReset'], ['component', 'box', 'container', 'panel', 'WuisLoginPasswordReset'], {'component':true, 'box':true, 'container':true, 'panel':true, 'WuisLoginPasswordReset':true}, ['widget.WuisLoginPasswordReset'], 0, [WuisLogin.view, 'ResetPasswordForm'], 0);
