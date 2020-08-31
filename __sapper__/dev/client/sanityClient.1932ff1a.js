/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var isFunction_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;

});

var config = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var _enable_super_gross_mode_that_will_cause_bad_things = false;
exports.config = {
    Promise: undefined,
    set useDeprecatedSynchronousErrorHandling(value) {
        if (value) {
            var error = new Error();
            console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
        }
        else if (_enable_super_gross_mode_that_will_cause_bad_things) {
            console.log('RxJS: Back to a better error behavior. Thank you. <3');
        }
        _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
        return _enable_super_gross_mode_that_will_cause_bad_things;
    },
};

});

var hostReportError_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function hostReportError(err) {
    setTimeout(function () { throw err; }, 0);
}
exports.hostReportError = hostReportError;

});

var Observer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) {
        if (config.config.useDeprecatedSynchronousErrorHandling) {
            throw err;
        }
        else {
            hostReportError_1.hostReportError(err);
        }
    },
    complete: function () { }
};

});

var isArray = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

});

var isObject_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(x) {
    return x !== null && typeof x === 'object';
}
exports.isObject = isObject;

});

var UnsubscriptionError = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var UnsubscriptionErrorImpl = (function () {
    function UnsubscriptionErrorImpl(errors) {
        Error.call(this);
        this.message = errors ?
            errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
        this.name = 'UnsubscriptionError';
        this.errors = errors;
        return this;
    }
    UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
    return UnsubscriptionErrorImpl;
})();
exports.UnsubscriptionError = UnsubscriptionErrorImpl;

});

var Subscription_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




var Subscription = (function () {
    function Subscription(unsubscribe) {
        this.closed = false;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._ctorUnsubscribe = true;
            this._unsubscribe = unsubscribe;
        }
    }
    Subscription.prototype.unsubscribe = function () {
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parentOrParents = null;
        this._subscriptions = null;
        if (_parentOrParents instanceof Subscription) {
            _parentOrParents.remove(this);
        }
        else if (_parentOrParents !== null) {
            for (var index = 0; index < _parentOrParents.length; ++index) {
                var parent_1 = _parentOrParents[index];
                parent_1.remove(this);
            }
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            if (_ctorUnsubscribe) {
                this._unsubscribe = undefined;
            }
            try {
                _unsubscribe.call(this);
            }
            catch (e) {
                errors = e instanceof UnsubscriptionError.UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
            }
        }
        if (isArray.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    try {
                        sub.unsubscribe();
                    }
                    catch (e) {
                        errors = errors || [];
                        if (e instanceof UnsubscriptionError.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                        }
                        else {
                            errors.push(e);
                        }
                    }
                }
            }
        }
        if (errors) {
            throw new UnsubscriptionError.UnsubscriptionError(errors);
        }
    };
    Subscription.prototype.add = function (teardown) {
        var subscription = teardown;
        if (!teardown) {
            return Subscription.EMPTY;
        }
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (!(subscription instanceof Subscription)) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default: {
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
            }
        }
        var _parentOrParents = subscription._parentOrParents;
        if (_parentOrParents === null) {
            subscription._parentOrParents = this;
        }
        else if (_parentOrParents instanceof Subscription) {
            if (_parentOrParents === this) {
                return subscription;
            }
            subscription._parentOrParents = [_parentOrParents, this];
        }
        else if (_parentOrParents.indexOf(this) === -1) {
            _parentOrParents.push(this);
        }
        else {
            return subscription;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions === null) {
            this._subscriptions = [subscription];
        }
        else {
            subscriptions.push(subscription);
        }
        return subscription;
    };
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError.UnsubscriptionError) ? err.errors : err); }, []);
}

});

var rxSubscriber = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.rxSubscriber = (function () {
    return typeof Symbol === 'function'
        ? Symbol('rxSubscriber')
        : '@@rxSubscriber_' + Math.random();
})();
exports.$$rxSubscriber = exports.rxSubscriber;

});

var Subscriber_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });






var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this.syncErrorValue = null;
        _this.syncErrorThrown = false;
        _this.syncErrorThrowable = false;
        _this.isStopped = false;
        switch (arguments.length) {
            case 0:
                _this.destination = Observer.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    _this.destination = Observer.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        _this.destination = destinationOrNext;
                        destinationOrNext.add(_this);
                    }
                    else {
                        _this.syncErrorThrowable = true;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }
            default:
                _this.syncErrorThrowable = true;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                break;
        }
        return _this;
    }
    Subscriber.prototype[rxSubscriber.rxSubscriber] = function () { return this; };
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _parentOrParents = this._parentOrParents;
        this._parentOrParents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parentOrParents = _parentOrParents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        _this._parentSubscriber = _parentSubscriber;
        var next;
        var context = _this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    _this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = _this.unsubscribe.bind(_this);
            }
        }
        _this._context = context;
        _this._next = next;
        _this._error = error;
        _this._complete = complete;
        return _this;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!config.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            var useDeprecatedSynchronousErrorHandling = config.config.useDeprecatedSynchronousErrorHandling;
            if (this._error) {
                if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                if (useDeprecatedSynchronousErrorHandling) {
                    throw err;
                }
                hostReportError_1.hostReportError(err);
            }
            else {
                if (useDeprecatedSynchronousErrorHandling) {
                    _parentSubscriber.syncErrorValue = err;
                    _parentSubscriber.syncErrorThrown = true;
                }
                else {
                    hostReportError_1.hostReportError(err);
                }
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!config.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            if (config.config.useDeprecatedSynchronousErrorHandling) {
                throw err;
            }
            else {
                hostReportError_1.hostReportError(err);
            }
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        if (!config.config.useDeprecatedSynchronousErrorHandling) {
            throw new Error('bad call');
        }
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            if (config.config.useDeprecatedSynchronousErrorHandling) {
                parent.syncErrorValue = err;
                parent.syncErrorThrown = true;
                return true;
            }
            else {
                hostReportError_1.hostReportError(err);
                return true;
            }
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
exports.SafeSubscriber = SafeSubscriber;

});

var filter_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

function filter(predicate, thisArg) {
    return function filterOperatorFunction(source) {
        return source.lift(new FilterOperator(predicate, thisArg));
    };
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.predicate = predicate;
        _this.thisArg = thisArg;
        _this.count = 0;
        return _this;
    }
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));

});

var filter_1$1 = filter_1.filter;

var filter = {
	filter: filter_1$1
};

var map_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

function map(project, thisArg) {
    return function mapOperation(source) {
        if (typeof project !== 'function') {
            throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
        }
        return source.lift(new MapOperator(project, thisArg));
    };
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.count = 0;
        _this.thisArg = thisArg || _this;
        return _this;
    }
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));

});

var map_1$1 = map_1.map;

var map = {
	map: map_1$1
};

var isObj = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable$1 = Object.prototype.propertyIsEnumerable;

function toObject$1(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Sources cannot be null or undefined');
	}

	return Object(val);
}

function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty$1.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty$1.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}

function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {
		if (hasOwnProperty$1.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(from);

		for (var i = 0; i < symbols.length; i++) {
			if (propIsEnumerable$1.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

var deepAssign = function deepAssign(target) {
	target = toObject$1(target);

	for (var s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};

var getSelection = function getSelection(sel) {
  if (typeof sel === 'string' || Array.isArray(sel)) {
    return {
      id: sel
    };
  }

  if (sel && sel.query) {
    return {
      query: sel.query
    };
  }

  var selectionOpts = ['* Document ID (<docId>)', '* Array of document IDs', '* Object containing `query`'].join('\n');
  throw new Error("Unknown selection - must be one of:\n\n".concat(selectionOpts));
};

var validators = createCommonjsModule(function (module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var VALID_ASSET_TYPES = ['image', 'file'];
var VALID_INSERT_LOCATIONS = ['before', 'after', 'replace'];

exports.dataset = function (name) {
  if (!/^[-\w]{1,128}$/.test(name)) {
    throw new Error('Datasets can only contain lowercase characters, numbers, underscores and dashes');
  }
};

exports.projectId = function (id) {
  if (!/^[-a-z0-9]+$/i.test(id)) {
    throw new Error('`projectId` can only contain only a-z, 0-9 and dashes');
  }
};

exports.validateAssetType = function (type) {
  if (VALID_ASSET_TYPES.indexOf(type) === -1) {
    throw new Error("Invalid asset type: ".concat(type, ". Must be one of ").concat(VALID_ASSET_TYPES.join(', ')));
  }
};

exports.validateObject = function (op, val) {
  if (val === null || _typeof(val) !== 'object' || Array.isArray(val)) {
    throw new Error("".concat(op, "() takes an object of properties"));
  }
};

exports.requireDocumentId = function (op, doc) {
  if (!doc._id) {
    throw new Error("".concat(op, "() requires that the document contains an ID (\"_id\" property)"));
  }

  exports.validateDocumentId(op, doc._id);
};

exports.validateDocumentId = function (op, id) {
  if (typeof id !== 'string' || !/^[a-z0-9_.-]+$/i.test(id)) {
    throw new Error("".concat(op, "(): \"").concat(id, "\" is not a valid document ID"));
  }
};

exports.validateInsert = function (at, selector, items) {
  var signature = 'insert(at, selector, items)';

  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    var valid = VALID_INSERT_LOCATIONS.map(function (loc) {
      return "\"".concat(loc, "\"");
    }).join(', ');
    throw new Error("".concat(signature, " takes an \"at\"-argument which is one of: ").concat(valid));
  }

  if (typeof selector !== 'string') {
    throw new Error("".concat(signature, " takes a \"selector\"-argument which must be a string"));
  }

  if (!Array.isArray(items)) {
    throw new Error("".concat(signature, " takes an \"items\"-argument which must be an array"));
  }
};

exports.hasDataset = function (config) {
  if (!config.gradientMode && !config.dataset) {
    throw new Error('`dataset` must be provided to perform queries');
  }

  return config.dataset || '';
};
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var validateObject = validators.validateObject;
var validateInsert = validators.validateInsert;

function Patch(selection) {
  var operations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var client = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  this.selection = selection;
  this.operations = objectAssign({}, operations);
  this.client = client;
}

objectAssign(Patch.prototype, {
  clone: function clone() {
    return new Patch(this.selection, objectAssign({}, this.operations), this.client);
  },
  merge: function merge(props) {
    validateObject('merge', props);
    var stack = new Error().stack.toString().split('\n').filter(function (str) {
      return str.trim();
    }).slice(2);
    console.warn("The \"merge\" patch has been deprecated and will be removed in the future\n".concat(stack.join('\n')));
    return this._assign('merge', deepAssign(this.operations.merge || {}, props));
  },
  set: function set(props) {
    return this._assign('set', props);
  },
  diffMatchPatch: function diffMatchPatch(props) {
    validateObject('diffMatchPatch', props);
    return this._assign('diffMatchPatch', props);
  },
  unset: function unset(attrs) {
    if (!Array.isArray(attrs)) {
      throw new Error('unset(attrs) takes an array of attributes to unset, non-array given');
    }

    this.operations = objectAssign({}, this.operations, {
      unset: attrs
    });
    return this;
  },
  setIfMissing: function setIfMissing(props) {
    return this._assign('setIfMissing', props);
  },
  replace: function replace(props) {
    validateObject('replace', props);
    return this._set('set', {
      $: props
    }); // eslint-disable-line id-length
  },
  inc: function inc(props) {
    return this._assign('inc', props);
  },
  dec: function dec(props) {
    return this._assign('dec', props);
  },
  insert: function insert(at, selector, items) {
    var _this$_assign;

    validateInsert(at, selector, items);
    return this._assign('insert', (_this$_assign = {}, _defineProperty(_this$_assign, at, selector), _defineProperty(_this$_assign, "items", items), _this$_assign));
  },
  append: function append(selector, items) {
    return this.insert('after', "".concat(selector, "[-1]"), items);
  },
  prepend: function prepend(selector, items) {
    return this.insert('before', "".concat(selector, "[0]"), items);
  },
  splice: function splice(selector, start, deleteCount, items) {
    // Negative indexes doesn't mean the same in Sanity as they do in JS;
    // -1 means "actually at the end of the array", which allows inserting
    // at the end of the array without knowing its length. We therefore have
    // to substract negative indexes by one to match JS. If you want Sanity-
    // behaviour, just use `insert('replace', selector, items)` directly
    var delAll = typeof deleteCount === 'undefined' || deleteCount === -1;
    var startIndex = start < 0 ? start - 1 : start;
    var delCount = delAll ? -1 : Math.max(0, start + deleteCount);
    var delRange = startIndex < 0 && delCount >= 0 ? '' : delCount;
    var rangeSelector = "".concat(selector, "[").concat(startIndex, ":").concat(delRange, "]");
    return this.insert('replace', rangeSelector, items || []);
  },
  ifRevisionId: function ifRevisionId(rev) {
    this.operations.ifRevisionID = rev;
    return this;
  },
  serialize: function serialize() {
    return objectAssign(getSelection(this.selection), this.operations);
  },
  toJSON: function toJSON() {
    return this.serialize();
  },
  commit: function commit() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (!this.client) {
      throw new Error('No `client` passed to patch, either provide one or pass the ' + 'patch to a clients `mutate()` method');
    }

    var returnFirst = typeof this.selection === 'string';
    var opts = objectAssign({
      returnFirst: returnFirst,
      returnDocuments: true
    }, options);
    return this.client.mutate({
      patch: this.serialize()
    }, opts);
  },
  reset: function reset() {
    this.operations = {};
    return this;
  },
  _set: function _set(op, props) {
    return this._assign(op, props, false);
  },
  _assign: function _assign(op, props) {
    var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    validateObject(op, props);
    this.operations = objectAssign({}, this.operations, _defineProperty({}, op, objectAssign({}, merge && this.operations[op] || {}, props)));
    return this;
  }
});
var patch = Patch;

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var defaultMutateOptions = {
  returnDocuments: false
};

function Transaction() {
  var operations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var client = arguments.length > 1 ? arguments[1] : undefined;
  var transactionId = arguments.length > 2 ? arguments[2] : undefined;
  this.trxId = transactionId;
  this.operations = operations;
  this.client = client;
}

objectAssign(Transaction.prototype, {
  clone: function clone() {
    return new Transaction(this.operations.slice(0), this.client, this.trxId);
  },
  create: function create(doc) {
    validators.validateObject('create', doc);
    return this._add({
      create: doc
    });
  },
  createIfNotExists: function createIfNotExists(doc) {
    var op = 'createIfNotExists';
    validators.validateObject(op, doc);
    validators.requireDocumentId(op, doc);
    return this._add(_defineProperty$1({}, op, doc));
  },
  createOrReplace: function createOrReplace(doc) {
    var op = 'createOrReplace';
    validators.validateObject(op, doc);
    validators.requireDocumentId(op, doc);
    return this._add(_defineProperty$1({}, op, doc));
  },
  delete: function _delete(documentId) {
    validators.validateDocumentId('delete', documentId);
    return this._add({
      delete: {
        id: documentId
      }
    });
  },
  patch: function patch$1(documentId, patchOps) {
    var isBuilder = typeof patchOps === 'function';
    var isPatch = documentId instanceof patch; // transaction.patch(client.patch('documentId').inc({visits: 1}))

    if (isPatch) {
      return this._add({
        patch: documentId.serialize()
      });
    } // patch => patch.inc({visits: 1}).set({foo: 'bar'})


    if (isBuilder) {
      var patch$1 = patchOps(new patch(documentId, {}, this.client));

      if (!(patch$1 instanceof patch)) {
        throw new Error('function passed to `patch()` must return the patch');
      }

      return this._add({
        patch: patch$1.serialize()
      });
    }

    return this._add({
      patch: objectAssign({
        id: documentId
      }, patchOps)
    });
  },
  transactionId: function transactionId(id) {
    if (!id) {
      return this.trxId;
    }

    this.trxId = id;
    return this;
  },
  serialize: function serialize() {
    return this.operations.slice();
  },
  toJSON: function toJSON() {
    return this.serialize();
  },
  commit: function commit(options) {
    if (!this.client) {
      throw new Error('No `client` passed to transaction, either provide one or pass the ' + 'transaction to a clients `mutate()` method');
    }

    return this.client.mutate(this.serialize(), objectAssign({
      transactionId: this.trxId
    }, defaultMutateOptions, options || {}));
  },
  reset: function reset() {
    this.operations = [];
    return this;
  },
  _add: function _add(mut) {
    this.operations.push(mut);
    return this;
  }
});
var transaction = Transaction;

var enc = encodeURIComponent;

var encodeQueryString = function (_ref) {
  var query = _ref.query,
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options;
  var base = "?query=".concat(enc(query));
  var qString = Object.keys(params).reduce(function (qs, param) {
    return "".concat(qs, "&").concat(enc("$".concat(param)), "=").concat(enc(JSON.stringify(params[param])));
  }, base);
  return Object.keys(options).reduce(function (qs, option) {
    // Only include the option if it is truthy
    return options[option] ? "".concat(qs, "&").concat(enc(option), "=").concat(enc(options[option])) : qs;
  }, qString);
};

var canReportError_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

function canReportError(observer) {
    while (observer) {
        var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
        if (closed_1 || isStopped) {
            return false;
        }
        else if (destination && destination instanceof Subscriber_1.Subscriber) {
            observer = destination;
        }
        else {
            observer = null;
        }
    }
    return true;
}
exports.canReportError = canReportError;

});

var toSubscriber_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });



function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber.rxSubscriber]) {
            return nextOrObserver[rxSubscriber.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;

});

var observable = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

});

var identity_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
function identity(x) {
    return x;
}
exports.identity = identity;

});

var pipe_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
function pipeFromArray(fns) {
    if (fns.length === 0) {
        return identity_1.identity;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;

});

var Observable_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });





var Observable = (function () {
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            sink.add(operator.call(sink, this.source));
        }
        else {
            sink.add(this.source || (config.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                this._subscribe(sink) :
                this._trySubscribe(sink));
        }
        if (config.config.useDeprecatedSynchronousErrorHandling) {
            if (sink.syncErrorThrowable) {
                sink.syncErrorThrowable = false;
                if (sink.syncErrorThrown) {
                    throw sink.syncErrorValue;
                }
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            if (config.config.useDeprecatedSynchronousErrorHandling) {
                sink.syncErrorThrown = true;
                sink.syncErrorValue = err;
            }
            if (canReportError_1.canReportError(sink)) {
                sink.error(err);
            }
            else {
                console.warn(err);
            }
        }
    };
    Observable.prototype.forEach = function (next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var subscription;
            subscription = _this.subscribe(function (value) {
                try {
                    next(value);
                }
                catch (err) {
                    reject(err);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        var source = this.source;
        return source && source.subscribe(subscriber);
    };
    Observable.prototype[observable.observable] = function () {
        return this;
    };
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    Observable.prototype.toPromise = function (promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
        promiseCtor = config.config.Promise || Promise;
    }
    if (!promiseCtor) {
        throw new Error('no Promise impl found');
    }
    return promiseCtor;
}

});

var scan_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

function scan(accumulator, seed) {
    var hasSeed = false;
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return function scanOperatorFunction(source) {
        return source.lift(new ScanOperator(accumulator, seed, hasSeed));
    };
}
exports.scan = scan;
var ScanOperator = (function () {
    function ScanOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ScanOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ScanOperator;
}());
var ScanSubscriber = (function (_super) {
    __extends(ScanSubscriber, _super);
    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
        var _this = _super.call(this, destination) || this;
        _this.accumulator = accumulator;
        _this._seed = _seed;
        _this.hasSeed = hasSeed;
        _this.index = 0;
        return _this;
    }
    Object.defineProperty(ScanSubscriber.prototype, "seed", {
        get: function () {
            return this._seed;
        },
        set: function (value) {
            this.hasSeed = true;
            this._seed = value;
        },
        enumerable: true,
        configurable: true
    });
    ScanSubscriber.prototype._next = function (value) {
        if (!this.hasSeed) {
            this.seed = value;
            this.destination.next(value);
        }
        else {
            return this._tryNext(value);
        }
    };
    ScanSubscriber.prototype._tryNext = function (value) {
        var index = this.index++;
        var result;
        try {
            result = this.accumulator(this.seed, value, index);
        }
        catch (err) {
            this.destination.error(err);
        }
        this.seed = result;
        this.destination.next(result);
    };
    return ScanSubscriber;
}(Subscriber_1.Subscriber));

});

var ArgumentOutOfRangeError = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var ArgumentOutOfRangeErrorImpl = (function () {
    function ArgumentOutOfRangeErrorImpl() {
        Error.call(this);
        this.message = 'argument out of range';
        this.name = 'ArgumentOutOfRangeError';
        return this;
    }
    ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
    return ArgumentOutOfRangeErrorImpl;
})();
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

});

var empty_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

exports.EMPTY = new Observable_1.Observable(function (subscriber) { return subscriber.complete(); });
function empty(scheduler) {
    return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
}
exports.empty = empty;
function emptyScheduled(scheduler) {
    return new Observable_1.Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
}

});

var takeLast_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });



function takeLast(count) {
    return function takeLastOperatorFunction(source) {
        if (count === 0) {
            return empty_1.empty();
        }
        else {
            return source.lift(new TakeLastOperator(count));
        }
    };
}
exports.takeLast = takeLast;
var TakeLastOperator = (function () {
    function TakeLastOperator(total) {
        this.total = total;
        if (this.total < 0) {
            throw new ArgumentOutOfRangeError.ArgumentOutOfRangeError;
        }
    }
    TakeLastOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
    };
    return TakeLastOperator;
}());
var TakeLastSubscriber = (function (_super) {
    __extends(TakeLastSubscriber, _super);
    function TakeLastSubscriber(destination, total) {
        var _this = _super.call(this, destination) || this;
        _this.total = total;
        _this.ring = new Array();
        _this.count = 0;
        return _this;
    }
    TakeLastSubscriber.prototype._next = function (value) {
        var ring = this.ring;
        var total = this.total;
        var count = this.count++;
        if (ring.length < total) {
            ring.push(value);
        }
        else {
            var index = count % total;
            ring[index] = value;
        }
    };
    TakeLastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        var count = this.count;
        if (count > 0) {
            var total = this.count >= this.total ? this.total : this.count;
            var ring = this.ring;
            for (var i = 0; i < total; i++) {
                var idx = (count++) % total;
                destination.next(ring[idx]);
            }
        }
        destination.complete();
    };
    return TakeLastSubscriber;
}(Subscriber_1.Subscriber));

});

var defaultIfEmpty_1 = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

function defaultIfEmpty(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
}
exports.defaultIfEmpty = defaultIfEmpty;
var DefaultIfEmptyOperator = (function () {
    function DefaultIfEmptyOperator(defaultValue) {
        this.defaultValue = defaultValue;
    }
    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
    };
    return DefaultIfEmptyOperator;
}());
var DefaultIfEmptySubscriber = (function (_super) {
    __extends(DefaultIfEmptySubscriber, _super);
    function DefaultIfEmptySubscriber(destination, defaultValue) {
        var _this = _super.call(this, destination) || this;
        _this.defaultValue = defaultValue;
        _this.isEmpty = true;
        return _this;
    }
    DefaultIfEmptySubscriber.prototype._next = function (value) {
        this.isEmpty = false;
        this.destination.next(value);
    };
    DefaultIfEmptySubscriber.prototype._complete = function () {
        if (this.isEmpty) {
            this.destination.next(this.defaultValue);
        }
        this.destination.complete();
    };
    return DefaultIfEmptySubscriber;
}(Subscriber_1.Subscriber));

});

var reduce_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });




function reduce(accumulator, seed) {
    if (arguments.length >= 2) {
        return function reduceOperatorFunctionWithSeed(source) {
            return pipe_1.pipe(scan_1.scan(accumulator, seed), takeLast_1.takeLast(1), defaultIfEmpty_1.defaultIfEmpty(seed))(source);
        };
    }
    return function reduceOperatorFunction(source) {
        return pipe_1.pipe(scan_1.scan(function (acc, value, index) { return accumulator(acc, value, index + 1); }), takeLast_1.takeLast(1))(source);
    };
}
exports.reduce = reduce;

});

var reduce_1$1 = reduce_1.reduce;

var reduce = {
	reduce: reduce_1$1
};

var Observable = Observable_1.Observable;



var map$1 = map.map;

var filter$1 = filter.filter;

var reduce$1 = reduce.reduce;
/*
 A minimal rxjs based observable that align as closely as possible with the current es-observable spec,
 without the static factory methods
 */


function SanityObservableMinimal() {
  Observable.apply(this, arguments); // eslint-disable-line prefer-rest-params
}

SanityObservableMinimal.prototype = Object.create(objectAssign(Object.create(null), Observable.prototype));
Object.defineProperty(SanityObservableMinimal.prototype, 'constructor', {
  value: SanityObservableMinimal,
  enumerable: false,
  writable: true,
  configurable: true
});

SanityObservableMinimal.prototype.lift = function lift(operator) {
  var observable = new SanityObservableMinimal();
  observable.source = this;
  observable.operator = operator;
  return observable;
};

function createDeprecatedMemberOp(name, op) {
  var hasWarned = false;
  return function deprecatedOperator() {
    if (!hasWarned) {
      hasWarned = true;
      console.warn(new Error("Calling observable.".concat(name, "(...) is deprecated. Please use observable.pipe(").concat(name, "(...)) instead")));
    }

    return this.pipe(op.apply(this, arguments));
  };
}

SanityObservableMinimal.prototype.map = createDeprecatedMemberOp('map', map$1);
SanityObservableMinimal.prototype.filter = createDeprecatedMemberOp('filter', filter$1);
SanityObservableMinimal.prototype.reduce = createDeprecatedMemberOp('filter', reduce$1);
var SanityObservableMinimal_1 = SanityObservableMinimal;

var minimal = SanityObservableMinimal_1;

var eventsource = createCommonjsModule(function (module) {
(function (root, factory) {
  /* global define */
  if ( module.exports) {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    if (commonjsGlobal.EventSource && !commonjsGlobal._eventSourceImportPrefix) {
      return
    }

    var evsImportName = (root._eventSourceImportPrefix || '') + 'EventSource';
    root[evsImportName] = factory();
  }
})(typeof self === 'undefined' ? commonjsGlobal : self, function () {
  var EventSource = function (url, options) {
    if (!url || typeof url != 'string') {
      throw new SyntaxError('Not enough arguments')
    }

    this.URL = url;
    this.setOptions(options);
    var evs = this;
    setTimeout(function () {
      evs.poll();
    }, 0);
  };

  EventSource.prototype = {
    CONNECTING: 0,

    OPEN: 1,

    CLOSED: 2,

    defaultOptions: {
      loggingEnabled: false,

      loggingPrefix: 'eventsource',

      interval: 500, // milliseconds

      bufferSizeLimit: 256 * 1024, // bytes

      silentTimeout: 300000, // milliseconds

      getArgs: {
        evs_buffer_size_limit: 256 * 1024,
      },

      xhrHeaders: {
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        'X-Requested-With': 'XMLHttpRequest',
      },
    },

    setOptions: function (options) {
      var defaults = this.defaultOptions;
      var option;

      // set all default options...
      for (option in defaults) {
        if (defaults.hasOwnProperty(option)) {
          this[option] = defaults[option];
        }
      }

      // override with what is in options
      for (option in options) {
        if (option in defaults && options.hasOwnProperty(option)) {
          this[option] = options[option];
        }
      }

      // if getArgs option is enabled
      // ensure evs_buffer_size_limit corresponds to bufferSizeLimit
      if (this.getArgs && this.bufferSizeLimit) {
        this.getArgs.evs_buffer_size_limit = this.bufferSizeLimit;
      }

      // if console is not available, force loggingEnabled to false
      // eslint-disable-next-line no-console
      if (typeof console === 'undefined' || typeof console.log === 'undefined') {
        this.loggingEnabled = false;
      }
    },

    log: function (message) {
      if (this.loggingEnabled) {
        // eslint-disable-next-line no-console
        console.log('[' + this.loggingPrefix + ']:' + message);
      }
    },

    poll: function () {
      try {
        if (this.readyState == this.CLOSED) {
          return
        }

        this.cleanup();
        this.readyState = this.CONNECTING;
        this.cursor = 0;
        this.cache = '';
        this._xhr = new this.XHR(this);
        this.resetNoActivityTimer();
      } catch (err) {
        // in an attempt to silence the errors
        this.log('There were errors inside the pool try-catch');
        this.dispatchEvent('error', {type: 'error', data: err.message});
      }
    },

    pollAgain: function (interval) {
      // schedule poll to be called after interval milliseconds
      var evs = this;
      evs.readyState = evs.CONNECTING;
      evs.dispatchEvent('error', {
        type: 'error',
        data: 'Reconnecting ',
      });
      this._pollTimer = setTimeout(function () {
        evs.poll();
      }, interval || 0);
    },

    cleanup: function () {
      this.log('evs cleaning up');

      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }

      if (this._noActivityTimer) {
        clearInterval(this._noActivityTimer);
        this._noActivityTimer = null;
      }

      if (this._xhr) {
        this._xhr.abort();
        this._xhr = null;
      }
    },

    resetNoActivityTimer: function () {
      if (this.silentTimeout) {
        if (this._noActivityTimer) {
          clearInterval(this._noActivityTimer);
        }
        var evs = this;
        this._noActivityTimer = setTimeout(function () {
          evs.log('Timeout! silentTImeout:' + evs.silentTimeout);
          evs.pollAgain();
        }, this.silentTimeout);
      }
    },

    close: function () {
      this.readyState = this.CLOSED;
      this.log('Closing connection. readyState: ' + this.readyState);
      this.cleanup();
    },

    _onxhrdata: function () {
      var request = this._xhr;

      if (request.isReady() && !request.hasError()) {
        // reset the timer, as we have activity
        this.resetNoActivityTimer();

        // move this EventSource to OPEN state...
        if (this.readyState == this.CONNECTING) {
          this.readyState = this.OPEN;
          this.dispatchEvent('open', {type: 'open'});
        }

        var buffer = request.getBuffer();

        if (buffer.length > this.bufferSizeLimit) {
          this.log('buffer.length > this.bufferSizeLimit');
          this.pollAgain();
        }

        if (this.cursor == 0 && buffer.length > 0) {
          // skip byte order mark \uFEFF character if it starts the stream
          if (buffer.substring(0, 1) == '\uFEFF') {
            this.cursor = 1;
          }
        }

        var lastMessageIndex = this.lastMessageIndex(buffer);
        if (lastMessageIndex[0] >= this.cursor) {
          var newcursor = lastMessageIndex[1];
          var toparse = buffer.substring(this.cursor, newcursor);
          this.parseStream(toparse);
          this.cursor = newcursor;
        }

        // if request is finished, reopen the connection
        if (request.isDone()) {
          this.log('request.isDone(). reopening the connection');
          this.pollAgain(this.interval);
        }
      } else if (this.readyState !== this.CLOSED) {
        this.log('this.readyState !== this.CLOSED');
        this.pollAgain(this.interval);

        //MV: Unsure why an error was previously dispatched
      }
    },

    parseStream: function (chunk) {
      // normalize line separators (\r\n,\r,\n) to \n
      // remove white spaces that may precede \n
      chunk = this.cache + this.normalizeToLF(chunk);

      var events = chunk.split('\n\n');

      var i, j, eventType, datas, line, retry;

      for (i = 0; i < events.length - 1; i++) {
        eventType = 'message';
        datas = [];
        var parts = events[i].split('\n');

        for (j = 0; j < parts.length; j++) {
          line = this.trimWhiteSpace(parts[j]);

          if (line.indexOf('event') == 0) {
            eventType = line.replace(/event:?\s*/, '');
          } else if (line.indexOf('retry') == 0) {
            retry = parseInt(line.replace(/retry:?\s*/, ''), 10);
            if (!isNaN(retry)) {
              this.interval = retry;
            }
          } else if (line.indexOf('data') == 0) {
            datas.push(line.replace(/data:?\s*/, ''));
          } else if (line.indexOf('id:') == 0) {
            this.lastEventId = line.replace(/id:?\s*/, '');
          } else if (line.indexOf('id') == 0) {
            // this resets the id

            this.lastEventId = null;
          }
        }

        if (datas.length && this.readyState != this.CLOSED) {
          // dispatch a new event
          var event = new MessageEvent(
            eventType,
            datas.join('\n'),
            typeof window !== 'undefined' && typeof window.location !== 'undefined'
              ? window.location.origin
              : null,
            this.lastEventId
          );
          this.dispatchEvent(eventType, event);
        }
      }

      this.cache = events[events.length - 1];
    },

    dispatchEvent: function (type, event) {
      var handlers = this['_' + type + 'Handlers'];

      if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
          handlers[i].call(this, event);
        }
      }

      if (this['on' + type]) {
        this['on' + type].call(this, event);
      }
    },

    addEventListener: function (type, handler) {
      if (!this['_' + type + 'Handlers']) {
        this['_' + type + 'Handlers'] = [];
      }

      this['_' + type + 'Handlers'].push(handler);
    },

    removeEventListener: function (type, handler) {
      var handlers = this['_' + type + 'Handlers'];
      if (!handlers) {
        return
      }
      for (var i = handlers.length - 1; i >= 0; --i) {
        if (handlers[i] === handler) {
          handlers.splice(i, 1);
          break
        }
      }
    },

    _pollTimer: null,

    _noactivityTimer: null,

    _xhr: null,

    lastEventId: null,

    cache: '',

    cursor: 0,

    onerror: null,

    onmessage: null,

    onopen: null,

    readyState: 0,

    // ===================================================================
    // helpers functions
    // those are attached to prototype to ease reuse and testing...

    urlWithParams: function (baseURL, params) {
      var encodedArgs = [];

      if (params) {
        var key, urlarg;
        var urlize = encodeURIComponent;

        for (key in params) {
          if (params.hasOwnProperty(key)) {
            urlarg = urlize(key) + '=' + urlize(params[key]);
            encodedArgs.push(urlarg);
          }
        }
      }

      if (encodedArgs.length > 0) {
        if (baseURL.indexOf('?') == -1) return baseURL + '?' + encodedArgs.join('&')
        return baseURL + '&' + encodedArgs.join('&')
      }
      return baseURL
    },

    lastMessageIndex: function (text) {
      var ln2 = text.lastIndexOf('\n\n');
      var lr2 = text.lastIndexOf('\r\r');
      var lrln2 = text.lastIndexOf('\r\n\r\n');

      if (lrln2 > Math.max(ln2, lr2)) {
        return [lrln2, lrln2 + 4]
      }
      return [Math.max(ln2, lr2), Math.max(ln2, lr2) + 2]
    },

    trimWhiteSpace: function (str) {
      // to remove whitespaces left and right of string

      var reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
      return str.replace(reTrim, '')
    },

    normalizeToLF: function (str) {
      // replace \r and \r\n with \n
      return str.replace(/\r\n|\r/g, '\n')
    },
  };

  if (isOldIE()) {
    EventSource.isPolyfill = 'IE_8-9';

    // patch EventSource defaultOptions
    var defaults = EventSource.prototype.defaultOptions;
    defaults.xhrHeaders = null; // no headers will be sent
    defaults.getArgs.evs_preamble = 2048 + 8;

    // EventSource will send request using Internet Explorer XDomainRequest
    EventSource.prototype.XHR = function (evs) {
      /* global XDomainRequest */
      var request = new XDomainRequest();
      this._request = request;

      // set handlers
      request.onprogress = function () {
        request._ready = true;
        evs._onxhrdata();
      };

      request.onload = function () {
        this._loaded = true;
        evs._onxhrdata();
      };

      request.onerror = function () {
        this._failed = true;
        evs.readyState = evs.CLOSED;
        evs.dispatchEvent('error', {
          type: 'error',
          data: 'XDomainRequest error',
        });
      };

      request.ontimeout = function () {
        this._failed = true;
        evs.readyState = evs.CLOSED;
        evs.dispatchEvent('error', {
          type: 'error',
          data: 'XDomainRequest timed out',
        });
      };

      // XDomainRequest does not allow setting custom headers
      // If EventSource has enabled the use of GET arguments
      // we add parameters to URL so that server can adapt the stream...
      var reqGetArgs = {};
      if (evs.getArgs) {
        // copy evs.getArgs in reqGetArgs
        var defaultArgs = evs.getArgs;
        for (var key in defaultArgs) {
          if (defaultArgs.hasOwnProperty(key)) {
            reqGetArgs[key] = defaultArgs[key];
          }
        }
        if (evs.lastEventId) {
          reqGetArgs.evs_last_event_id = evs.lastEventId;
        }
      }
      // send the request

      request.open('GET', evs.urlWithParams(evs.URL, reqGetArgs));
      request.send();
    };

    EventSource.prototype.XHR.prototype = {
      useXDomainRequest: true,

      _request: null,

      _ready: false, // true when progress events are dispatched

      _loaded: false, // true when request has been loaded

      _failed: false, // true if when request is in error

      isReady: function () {
        return this._request._ready
      },

      isDone: function () {
        return this._request._loaded
      },

      hasError: function () {
        return this._request._failed
      },

      getBuffer: function () {
        var rv = '';
        try {
          rv = this._request.responseText || '';
        } catch (err) {
          // intentional noop
        }
        return rv
      },

      abort: function () {
        if (this._request) {
          this._request.abort();
        }
      },
    };
  } else {
    EventSource.isPolyfill = 'XHR';

    // EventSource will send request using XMLHttpRequest
    EventSource.prototype.XHR = function (evs) {
      var request = new XMLHttpRequest();
      this._request = request;
      evs._xhr = this;

      // set handlers
      request.onreadystatechange = function () {
        if (request.readyState > 1 && evs.readyState != evs.CLOSED) {
          if (request.status == 200 || (request.status >= 300 && request.status < 400)) {
            evs._onxhrdata();
          } else {
            request._failed = true;
            evs.readyState = evs.CLOSED;
            evs.dispatchEvent('error', {
              type: 'error',
              data: 'The server responded with ' + request.status,
            });
            evs.close();
          }
        }
      };

      request.onprogress = function () {
        // intentional noop
      };

      request.open('GET', evs.urlWithParams(evs.URL, evs.getArgs), true);

      var headers = evs.xhrHeaders; // maybe null
      for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
          request.setRequestHeader(header, headers[header]);
        }
      }
      if (evs.lastEventId) {
        request.setRequestHeader('Last-Event-Id', evs.lastEventId);
      }

      request.send();
    };

    EventSource.prototype.XHR.prototype = {
      useXDomainRequest: false,

      _request: null,

      _failed: false, // true if we have had errors...

      isReady: function () {
        return this._request.readyState >= 2
      },

      isDone: function () {
        return this._request.readyState == 4
      },

      hasError: function () {
        return this._failed || this._request.status >= 400
      },

      getBuffer: function () {
        var rv = '';
        try {
          rv = this._request.responseText || '';
        } catch (err) {
          // intentional noop
        }
        return rv
      },

      abort: function () {
        if (this._request) {
          this._request.abort();
        }
      },
    };
  }

  function MessageEvent(type, data, origin, lastEventId) {
    this.bubbles = false;
    this.cancelBubble = false;
    this.cancelable = false;
    this.data = data || null;
    this.origin = origin || '';
    this.lastEventId = lastEventId || '';
    this.type = type || 'message';
  }

  function isOldIE() {
    //return true if we are in IE8 or IE9
    return Boolean(
      typeof window !== 'undefined' &&
        window.XDomainRequest &&
        window.XMLHttpRequest &&
        new XMLHttpRequest().responseType === undefined
    )
  }

  return EventSource
});
});

/* eslint-disable no-var */


var browser = window.EventSource || eventsource.EventSource;

var pick = function (obj, props) {
  return props.reduce(function (selection, prop) {
    if (typeof obj[prop] === 'undefined') {
      return selection;
    }

    selection[prop] = obj[prop];
    return selection;
  }, {});
};

var defaults = function (obj, defaults) {
  return Object.keys(defaults).concat(Object.keys(obj)).reduce(function (target, prop) {
    target[prop] = typeof obj[prop] === 'undefined' ? defaults[prop] : obj[prop];
    return target;
  }, {});
};

var baseUrl = 'https://docs.sanity.io/help/';

var generateHelpUrl = function generateHelpUrl(slug) {
  return baseUrl + slug
};

var once = function (fn) {
  var didCall = false;
  var returnValue;
  return function () {
    if (didCall) {
      return returnValue;
    }

    returnValue = fn.apply(void 0, arguments);
    didCall = true;
    return returnValue;
  };
};

var tokenWarning = ['Using token with listeners is not supported in browsers. ', "For more info, see ".concat(generateHelpUrl('js-client-listener-tokens-browser'), ".")]; // eslint-disable-next-line no-console

var printTokenWarning = once(function () {
  return console.warn(tokenWarning.join(' '));
});
var isWindowEventSource = Boolean(typeof window !== 'undefined' && window.EventSource);
var EventSource = isWindowEventSource ? window.EventSource // Native browser EventSource
: browser; // Node.js, IE etc

var possibleOptions = ['includePreviousRevision', 'includeResult', 'visibility', 'effectFormat'];
var defaultOptions = {
  includeResult: true
};

var listen = function listen(query, params) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = defaults(opts, defaultOptions);
  var listenOpts = pick(options, possibleOptions);
  var qs = encodeQueryString({
    query: query,
    params: params,
    options: listenOpts
  });
  var _this$clientConfig = this.clientConfig,
      url = _this$clientConfig.url,
      token = _this$clientConfig.token,
      withCredentials = _this$clientConfig.withCredentials;
  var uri = "".concat(url).concat(this.getDataUrl('listen', qs));
  var listenFor = options.events ? options.events : ['mutation'];
  var shouldEmitReconnect = listenFor.indexOf('reconnect') !== -1;

  if (token && isWindowEventSource) {
    printTokenWarning();
  }

  var esOptions = {};

  if (token || withCredentials) {
    esOptions.withCredentials = true;
  }

  if (token) {
    esOptions.headers = {
      Authorization: "Bearer ".concat(token)
    };
  }

  return new minimal(function (observer) {
    var es = getEventSource();
    var reconnectTimer;
    var stopped = false;

    function onError() {
      if (stopped) {
        return;
      }

      emitReconnect(); // Allow event handlers of `emitReconnect` to cancel/close the reconnect attempt

      if (stopped) {
        return;
      } // Unless we've explicitly stopped the ES (in which case `stopped` should be true),
      // we should never be in a disconnected state. By default, EventSource will reconnect
      // automatically, in which case it sets readyState to `CONNECTING`, but in some cases
      // (like when a laptop lid is closed), it closes the connection. In these cases we need
      // to explicitly reconnect.


      if (es.readyState === EventSource.CLOSED) {
        unsubscribe();
        clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(open, 100);
      }
    }

    function onChannelError(err) {
      observer.error(cooerceError(err));
    }

    function onMessage(evt) {
      var event = parseEvent(evt);
      return event instanceof Error ? observer.error(event) : observer.next(event);
    }

    function onDisconnect(evt) {
      stopped = true;
      unsubscribe();
      observer.complete();
    }

    function unsubscribe() {
      es.removeEventListener('error', onError, false);
      es.removeEventListener('channelError', onChannelError, false);
      es.removeEventListener('disconnect', onDisconnect, false);
      listenFor.forEach(function (type) {
        return es.removeEventListener(type, onMessage, false);
      });
      es.close();
    }

    function emitReconnect() {
      if (shouldEmitReconnect) {
        observer.next({
          type: 'reconnect'
        });
      }
    }

    function getEventSource() {
      var evs = new EventSource(uri, esOptions);
      evs.addEventListener('error', onError, false);
      evs.addEventListener('channelError', onChannelError, false);
      evs.addEventListener('disconnect', onDisconnect, false);
      listenFor.forEach(function (type) {
        return evs.addEventListener(type, onMessage, false);
      });
      return evs;
    }

    function open() {
      es = getEventSource();
    }

    function stop() {
      stopped = true;
      unsubscribe();
    }

    return stop;
  });
};

function parseEvent(event) {
  try {
    var data = event.data && JSON.parse(event.data) || {};
    return objectAssign({
      type: event.type
    }, data);
  } catch (err) {
    return err;
  }
}

function cooerceError(err) {
  if (err instanceof Error) {
    return err;
  }

  var evt = parseEvent(err);
  return evt instanceof Error ? evt : new Error(extractErrorMessage(evt));
}

function extractErrorMessage(err) {
  if (!err.error) {
    return err.message || 'Unknown listener error';
  }

  if (err.error.description) {
    return err.error.description;
  }

  return typeof err.error === 'string' ? err.error : JSON.stringify(err.error, null, 2);
}

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var filter$2 = filter.filter;

var map$2 = map.map;













var excludeFalsey = function excludeFalsey(param, defValue) {
  var value = typeof param === 'undefined' ? defValue : param;
  return param === false ? undefined : value;
};

var getMutationQuery = function getMutationQuery() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    returnIds: true,
    returnDocuments: excludeFalsey(options.returnDocuments, true),
    visibility: options.visibility || 'sync'
  };
};

var isResponse = function isResponse(event) {
  return event.type === 'response';
};

var getBody = function getBody(event) {
  return event.body;
};

var indexBy = function indexBy(docs, attr) {
  return docs.reduce(function (indexed, doc) {
    indexed[attr(doc)] = doc;
    return indexed;
  }, Object.create(null));
};

var toPromise = function toPromise(observable) {
  return observable.toPromise();
};

var getQuerySizeLimit = 11264;
var dataMethods = {
  listen: listen,
  getDataUrl: function getDataUrl(operation, path) {
    var config = this.clientConfig;
    var catalog = config.gradientMode ? config.namespace : validators.hasDataset(config);
    var baseUri = "/".concat(operation, "/").concat(catalog);
    var uri = path ? "".concat(baseUri, "/").concat(path) : baseUri;
    return (this.clientConfig.gradientMode ? uri : "/data".concat(uri)).replace(/\/($|\?)/, '$1');
  },
  fetch: function fetch(query, params) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var mapResponse = options.filterResponse === false ? function (res) {
      return res;
    } : function (res) {
      return res.result;
    };

    var observable = this._dataRequest('query', {
      query: query,
      params: params
    }, options).pipe(map$2(mapResponse));

    return this.isPromiseAPI() ? toPromise(observable) : observable;
  },
  getDocument: function getDocument(id) {
    var options = {
      uri: this.getDataUrl('doc', id),
      json: true
    };

    var observable = this._requestObservable(options).pipe(filter$2(isResponse), map$2(function (event) {
      return event.body.documents && event.body.documents[0];
    }));

    return this.isPromiseAPI() ? toPromise(observable) : observable;
  },
  getDocuments: function getDocuments(ids) {
    var options = {
      uri: this.getDataUrl('doc', ids.join(',')),
      json: true
    };

    var observable = this._requestObservable(options).pipe(filter$2(isResponse), map$2(function (event) {
      var indexed = indexBy(event.body.documents || [], function (doc) {
        return doc._id;
      });
      return ids.map(function (id) {
        return indexed[id] || null;
      });
    }));

    return this.isPromiseAPI() ? toPromise(observable) : observable;
  },
  create: function create(doc, options) {
    return this._create(doc, 'create', options);
  },
  createIfNotExists: function createIfNotExists(doc, options) {
    validators.requireDocumentId('createIfNotExists', doc);
    return this._create(doc, 'createIfNotExists', options);
  },
  createOrReplace: function createOrReplace(doc, options) {
    validators.requireDocumentId('createOrReplace', doc);
    return this._create(doc, 'createOrReplace', options);
  },
  patch: function patch$1(selector, operations) {
    return new patch(selector, operations, this);
  },
  delete: function _delete(selection, options) {
    return this.dataRequest('mutate', {
      mutations: [{
        delete: getSelection(selection)
      }]
    }, options);
  },
  mutate: function mutate(mutations, options) {
    var mut = mutations instanceof patch || mutations instanceof transaction ? mutations.serialize() : mutations;
    var muts = Array.isArray(mut) ? mut : [mut];
    var transactionId = options && options.transactionId;
    return this.dataRequest('mutate', {
      mutations: muts,
      transactionId: transactionId
    }, options);
  },
  transaction: function transaction$1(operations) {
    return new transaction(operations, this);
  },
  dataRequest: function dataRequest(endpoint, body) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var request = this._dataRequest(endpoint, body, options);

    return this.isPromiseAPI() ? toPromise(request) : request;
  },
  _dataRequest: function _dataRequest(endpoint, body) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var isMutation = endpoint === 'mutate'; // Check if the query string is within a configured threshold,
    // in which case we can use GET. Otherwise, use POST.

    var strQuery = !isMutation && encodeQueryString(body);
    var useGet = !isMutation && strQuery.length < getQuerySizeLimit;
    var stringQuery = useGet ? strQuery : '';
    var returnFirst = options.returnFirst;
    var timeout = options.timeout,
        token = options.token;
    var uri = this.getDataUrl(endpoint, stringQuery);
    var reqOptions = {
      method: useGet ? 'GET' : 'POST',
      uri: uri,
      json: true,
      body: useGet ? undefined : body,
      query: isMutation && getMutationQuery(options),
      timeout: timeout,
      token: token
    };
    return this._requestObservable(reqOptions).pipe(filter$2(isResponse), map$2(getBody), map$2(function (res) {
      if (!isMutation) {
        return res;
      } // Should we return documents?


      var results = res.results || [];

      if (options.returnDocuments) {
        return returnFirst ? results[0] && results[0].document : results.map(function (mut) {
          return mut.document;
        });
      } // Return a reduced subset


      var key = returnFirst ? 'documentId' : 'documentIds';
      var ids = returnFirst ? results[0] && results[0].id : results.map(function (mut) {
        return mut.id;
      });
      return _defineProperty$2({
        transactionId: res.transactionId,
        results: results
      }, key, ids);
    }));
  },
  _create: function _create(doc, op) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var mutation = _defineProperty$2({}, op, doc);

    var opts = objectAssign({
      returnFirst: true,
      returnDocuments: true
    }, options);
    return this.dataRequest('mutate', {
      mutations: [mutation]
    }, opts);
  }
};

function DatasetsClient(client) {
  this.request = client.request.bind(client);
}

objectAssign(DatasetsClient.prototype, {
  create: function create(name, options) {
    return this._modify('PUT', name, options);
  },
  edit: function edit(name, options) {
    return this._modify('PATCH', name, options);
  },
  delete: function _delete(name) {
    return this._modify('DELETE', name);
  },
  list: function list() {
    return this.request({
      uri: '/datasets'
    });
  },
  _modify: function _modify(method, name, body) {
    validators.dataset(name);
    return this.request({
      method: method,
      uri: "/datasets/".concat(name),
      body: body
    });
  }
});
var datasetsClient = DatasetsClient;

function ProjectsClient(client) {
  this.client = client;
}

objectAssign(ProjectsClient.prototype, {
  list: function list() {
    return this.client.request({
      uri: '/projects'
    });
  },
  getById: function getById(id) {
    return this.client.request({
      uri: "/projects/".concat(id)
    });
  }
});
var projectsClient = ProjectsClient;

var queryString = function (params) {
  var qs = [];

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      qs.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(params[key])));
    }
  }

  return qs.length > 0 ? "?".concat(qs.join('&')) : '';
};

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var map$3 = map.map;

var filter$3 = filter.filter;





function AssetsClient(client) {
  this.client = client;
}

function toDocument(body) {
  // todo: rewrite to just return body.document in a while
  var document = body.document;
  Object.defineProperty(document, 'document', {
    enumerable: false,
    get: function get() {
      // eslint-disable-next-line no-console
      console.warn('The promise returned from client.asset.upload(...) now resolves with the asset document');
      return document;
    }
  });
  return document;
}

function optionsFromFile(opts, file) {
  if (typeof window === 'undefined' || !(file instanceof window.File)) {
    return opts;
  }

  return objectAssign({
    filename: opts.preserveFilename === false ? undefined : file.name,
    contentType: file.type
  }, opts);
}

objectAssign(AssetsClient.prototype, {
  /**
   * Upload an asset
   *
   * @param  {String} assetType `image` or `file`
   * @param  {File|Blob|Buffer|ReadableStream} body File to upload
   * @param  {Object}  opts Options for the upload
   * @param  {Boolean} opts.preserveFilename Whether or not to preserve the original filename (default: true)
   * @param  {String}  opts.filename Filename for this file (optional)
   * @param  {Number}  opts.timeout  Milliseconds to wait before timing the request out (default: 0)
   * @param  {String}  opts.contentType Mime type of the file
   * @param  {Array}   opts.extract Array of metadata parts to extract from image.
   *                                 Possible values: `location`, `exif`, `image`, `palette`
   * @param  {String}  opts.label Label
   * @param  {String}  opts.title Title
   * @param  {String}  opts.description Description
   * @param  {String}  opts.creditLine The credit to person(s) and/or organization(s) required by the supplier of the image to be used when published
   * @param  {Object}  opts.source Source data (when the asset is from an external service)
   * @param  {String}  opts.source.id The (u)id of the asset within the source, i.e. 'i-f323r1E'
   *                                  Required if source is defined
   * @param  {String}  opts.source.name The name of the source, i.e. 'unsplash'
   *                                  Required if source is defined
   * @param  {String}  opts.source.url A url to where to find the asset, or get more info about it in the source
   *                                  Optional
   * @return {Promise} Resolves with the created asset document
   */
  upload: function upload(assetType, body) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    validators.validateAssetType(assetType); // If an empty array is given, explicitly set `none` to override API defaults

    var meta = opts.extract || undefined;

    if (meta && !meta.length) {
      meta = ['none'];
    }

    var dataset = validators.hasDataset(this.client.clientConfig);
    var assetEndpoint = assetType === 'image' ? 'images' : 'files';
    var options = optionsFromFile(opts, body);
    var label = options.label,
        title = options.title,
        description = options.description,
        creditLine = options.creditLine,
        filename = options.filename,
        source = options.source;
    var query = {
      label: label,
      title: title,
      description: description,
      filename: filename,
      meta: meta,
      creditLine: creditLine
    };

    if (source) {
      query.sourceId = source.id;
      query.sourceName = source.name;
      query.sourceUrl = source.url;
    }

    var observable = this.client._requestObservable({
      method: 'POST',
      timeout: options.timeout || 0,
      uri: "/assets/".concat(assetEndpoint, "/").concat(dataset),
      headers: options.contentType ? {
        'Content-Type': options.contentType
      } : {},
      query: query,
      body: body
    });

    return this.client.isPromiseAPI() ? observable.pipe(filter$3(function (event) {
      return event.type === 'response';
    }), map$3(function (event) {
      return toDocument(event.body);
    })).toPromise() : observable;
  },
  delete: function _delete(type, id) {
    // eslint-disable-next-line no-console
    console.warn('client.assets.delete() is deprecated, please use client.delete(<document-id>)');
    var docId = id || '';

    if (!/^(image|file)-/.test(docId)) {
      docId = "".concat(type, "-").concat(docId);
    } else if (type._id) {
      // We could be passing an entire asset document instead of an ID
      docId = type._id;
    }

    validators.hasDataset(this.client.clientConfig);
    return this.client.delete(docId);
  },
  getImageUrl: function getImageUrl(ref, query) {
    var id = ref._ref || ref;

    if (typeof id !== 'string') {
      throw new Error('getImageUrl() needs either an object with a _ref, or a string with an asset document ID');
    }

    if (!/^image-[A-Za-z0-9_]+-\d+x\d+-[a-z]{1,5}$/.test(id)) {
      throw new Error("Unsupported asset ID \"".concat(id, "\". URL generation only works for auto-generated IDs."));
    }

    var _id$split = id.split('-'),
        _id$split2 = _slicedToArray(_id$split, 4),
        assetId = _id$split2[1],
        size = _id$split2[2],
        format = _id$split2[3];

    validators.hasDataset(this.client.clientConfig);
    var _this$client$clientCo = this.client.clientConfig,
        projectId = _this$client$clientCo.projectId,
        dataset = _this$client$clientCo.dataset;
    var qs = query ? queryString(query) : '';
    return "https://cdn.sanity.io/images/".concat(projectId, "/").concat(dataset, "/").concat(assetId, "-").concat(size, ".").concat(format).concat(qs);
  }
});
var assetsClient = AssetsClient;

function UsersClient(client) {
  this.client = client;
}

objectAssign(UsersClient.prototype, {
  getById: function getById(id) {
    return this.client.request({
      uri: "/users/".concat(id)
    });
  }
});
var usersClient = UsersClient;

function AuthClient(client) {
  this.client = client;
}

objectAssign(AuthClient.prototype, {
  getLoginProviders: function getLoginProviders() {
    return this.client.request({
      uri: '/auth/providers'
    });
  },
  logout: function logout() {
    return this.client.request({
      uri: '/auth/logout',
      method: 'POST'
    });
  }
});
var authClient = AuthClient;

var nanoPubsub = function Pubsub() {
  var subscribers = [];
  return {
    subscribe: subscribe,
    publish: publish
  }
  function subscribe(subscriber) {
    subscribers.push(subscriber);
    return function unsubscribe() {
      var idx = subscribers.indexOf(subscriber);
      if (idx > -1) {
        subscribers.splice(idx, 1);
      }
    }
  }
  function publish() {
    for (var i = 0; i < subscribers.length; i++) {
      subscribers[i].apply(null, arguments);
    }
  }
};

var middlewareReducer = function (middleware) {
  var applyMiddleware = function applyMiddleware(hook, defaultValue) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var bailEarly = hook === 'onError';

    var value = defaultValue;
    for (var i = 0; i < middleware[hook].length; i++) {
      var handler = middleware[hook][i];
      value = handler.apply(undefined, [value].concat(args));

      if (bailEarly && !value) {
        break;
      }
    }

    return value;
  };

  return applyMiddleware;
};

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
var requiresPort = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encodeURIComponent(key);
      value = encodeURIComponent(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
var stringify = querystringify;
var parse = querystring;

var querystringify_1 = {
	stringify: stringify,
	parse: parse
};

var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
  , left = new RegExp('^'+ whitespace +'+');

/**
 * Trim a given string.
 *
 * @param {String} str String to trim.
 * @public
 */
function trimLeft(str) {
  return (str ? str : '').toString().replace(left, '');
}

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof commonjsGlobal !== 'undefined') globalVar = commonjsGlobal;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  address = trimLeft(address);
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  if (relative === '') return base;

  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  address = trimLeft(address);

  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = querystringify_1.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!requiresPort(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || querystringify_1.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!requiresPort(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = querystringify_1.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = querystringify_1;

var urlParse = Url;

var isReactNative = typeof navigator === 'undefined' ? false : navigator.product === 'ReactNative';

var has$1 = Object.prototype.hasOwnProperty;
var defaultOptions$1 = { timeout: isReactNative ? 60000 : 120000 };

var defaultOptionsProcessor = function (opts) {
  var options = typeof opts === 'string' ? objectAssign({ url: opts }, defaultOptions$1) : objectAssign({}, defaultOptions$1, opts);

  // Parse URL into parts
  var url = urlParse(options.url, {}, // Don't use current browser location
  true // Parse query strings
  );

  // Normalize timeouts
  options.timeout = normalizeTimeout(options.timeout);

  // Shallow-merge (override) existing query params
  if (options.query) {
    url.query = objectAssign({}, url.query, removeUndefined(options.query));
  }

  // Implicit POST if we have not specified a method but have a body
  options.method = options.body && !options.method ? 'POST' : (options.method || 'GET').toUpperCase();

  // Stringify URL
  options.url = url.toString(stringifyQueryString);

  return options;
};

function stringifyQueryString(obj) {
  var pairs = [];
  for (var key in obj) {
    if (has$1.call(obj, key)) {
      push(key, obj[key]);
    }
  }

  return pairs.length ? pairs.join('&') : '';

  function push(key, val) {
    if (Array.isArray(val)) {
      val.forEach(function (item) {
        return push(key, item);
      });
    } else {
      pairs.push([key, val].map(encodeURIComponent).join('='));
    }
  }
}

function normalizeTimeout(time) {
  if (time === false || time === 0) {
    return false;
  }

  if (time.connect || time.socket) {
    return time;
  }

  var delay = Number(time);
  if (isNaN(delay)) {
    return normalizeTimeout(defaultOptions$1.timeout);
  }

  return { connect: delay, socket: delay };
}

function removeUndefined(obj) {
  var target = {};
  for (var key in obj) {
    if (obj[key] !== undefined) {
      target[key] = obj[key];
    }
  }
  return target;
}

var validUrl = /^https?:\/\//i;

var defaultOptionsValidator = function (options) {
  if (!validUrl.test(options.url)) {
    throw new Error("\"" + options.url + "\" is not a valid URL");
  }
};

/**
 * This file is only used for the browser version of `same-origin`.
 * Used to bring down the size of the browser bundle.
 */

var regex = /^(?:(?:(?:([^:\/#\?]+:)?(?:(?:\/\/)((?:((?:[^:@\/#\?]+)(?:\:(?:[^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((?:\/?(?:[^\/\?#]+\/+)*)(?:[^\?#]*)))?(\?[^#]+)?)(#.*)?/;

var urlParser = {
    regex: regex,
    parse: function(url) {
        var match = regex.exec(url);
        if (!match) {
            return {};
        }

        return {
            protocol: (match[1] || '').toLowerCase() || undefined,
            hostname: (match[5] || '').toLowerCase() || undefined,
            port: match[6] || undefined
        };
    }
};

var sameOrigin = function(uri1, uri2, ieMode) {
    if (uri1 === uri2) {
        return true;
    }

    var url1 = urlParser.parse(uri1, false, true);
    var url2 = urlParser.parse(uri2, false, true);

    var url1Port = url1.port|0 || (url1.protocol === 'https' ? 443 : 80);
    var url2Port = url2.port|0 || (url2.protocol === 'https' ? 443 : 80);

    var match = {
        proto: url1.protocol === url2.protocol,
        hostname: url1.hostname === url2.hostname,
        port: url1Port === url2Port
    };

    return ((match.proto && match.hostname) && (match.port || ieMode));
};

var trim = function(string) {
  return string.replace(/^\s+|\s+$/g, '');
}
  , isArray$1 = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };

var parseHeaders = function (headers) {
  if (!headers)
    return {}

  var result = {};

  var headersArr = trim(headers).split('\n');

  for (var i = 0; i < headersArr.length; i++) {
    var row = headersArr[i];
    var index = row.indexOf(':')
    , key = trim(row.slice(0, index)).toLowerCase()
    , value = trim(row.slice(index + 1));

    if (typeof(result[key]) === 'undefined') {
      result[key] = value;
    } else if (isArray$1(result[key])) {
      result[key].push(value);
    } else {
      result[key] = [ result[key], value ];
    }
  }

  return result
};

/* eslint max-depth: ["error", 4] */


var noop = function noop() {
  /* intentional noop */
};

var win = window;
var XmlHttpRequest = win.XMLHttpRequest || noop;
var hasXhr2 = 'withCredentials' in new XmlHttpRequest();
var XDomainRequest$1 = hasXhr2 ? XmlHttpRequest : win.XDomainRequest;
var adapter = 'xhr';

var browserRequest = function (context, callback) {
  var opts = context.options;
  var options = context.applyMiddleware('finalizeOptions', opts);
  var timers = {};

  // Deep-checking window.location because of react native, where `location` doesn't exist
  var cors = win && win.location && !sameOrigin(win.location.href, options.url);

  // Allow middleware to inject a response, for instance in the case of caching or mocking
  var injectedResponse = context.applyMiddleware('interceptRequest', undefined, {
    adapter: adapter,
    context: context
  });

  // If middleware injected a response, treat it as we normally would and return it
  // Do note that the injected response has to be reduced to a cross-environment friendly response
  if (injectedResponse) {
    var cbTimer = setTimeout(callback, 0, null, injectedResponse);
    var cancel = function cancel() {
      return clearTimeout(cbTimer);
    };
    return { abort: cancel };
  }

  // We'll want to null out the request on success/failure
  var xhr = cors ? new XDomainRequest$1() : new XmlHttpRequest();

  var isXdr = win.XDomainRequest && xhr instanceof win.XDomainRequest;
  var headers = options.headers;

  // Request state
  var aborted = false;
  var loaded = false;
  var timedOut = false;

  // Apply event handlers
  xhr.onerror = onError;
  xhr.ontimeout = onError;
  xhr.onabort = function () {
    aborted = true;
  };

  // IE9 must have onprogress be set to a unique function
  xhr.onprogress = function () {
    /* intentional noop */
  };

  var loadEvent = isXdr ? 'onload' : 'onreadystatechange';
  xhr[loadEvent] = function () {
    // Prevent request from timing out
    resetTimers();

    if (aborted || xhr.readyState !== 4 && !isXdr) {
      return;
    }

    // Will be handled by onError
    if (xhr.status === 0) {
      return;
    }

    onLoad();
  };

  // @todo two last options to open() is username/password
  xhr.open(options.method, options.url, true // Always async
  );

  // Some options need to be applied after open
  xhr.withCredentials = !!options.withCredentials;

  // Set headers
  if (headers && xhr.setRequestHeader) {
    for (var key in headers) {
      if (headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  } else if (headers && isXdr) {
    throw new Error('Headers cannot be set on an XDomainRequest object');
  }

  if (options.rawBody) {
    xhr.responseType = 'arraybuffer';
  }

  // Let middleware know we're about to do a request
  context.applyMiddleware('onRequest', { options: options, adapter: adapter, request: xhr, context: context });

  xhr.send(options.body || null);

  // Figure out which timeouts to use (if any)
  var delays = options.timeout;
  if (delays) {
    timers.connect = setTimeout(function () {
      return timeoutRequest('ETIMEDOUT');
    }, delays.connect);
  }

  return { abort: abort };

  function abort() {
    aborted = true;

    if (xhr) {
      xhr.abort();
    }
  }

  function timeoutRequest(code) {
    timedOut = true;
    xhr.abort();
    var error = new Error(code === 'ESOCKETTIMEDOUT' ? 'Socket timed out on request to ' + options.url : 'Connection timed out on request to ' + options.url);
    error.code = code;
    context.channels.error.publish(error);
  }

  function resetTimers() {
    if (!delays) {
      return;
    }

    stopTimers();
    timers.socket = setTimeout(function () {
      return timeoutRequest('ESOCKETTIMEDOUT');
    }, delays.socket);
  }

  function stopTimers() {
    // Only clear the connect timeout if we've got a connection
    if (aborted || xhr.readyState >= 2 && timers.connect) {
      clearTimeout(timers.connect);
    }

    if (timers.socket) {
      clearTimeout(timers.socket);
    }
  }

  function onError() {
    if (loaded) {
      return;
    }

    // Clean up
    stopTimers();
    loaded = true;
    xhr = null;

    // Annoyingly, details are extremely scarce and hidden from us.
    // We only really know that it is a network error
    var err = new Error('Network error while attempting to reach ' + options.url);
    err.isNetworkError = true;
    err.request = options;
    callback(err);
  }

  function reduceResponse() {
    var statusCode = xhr.status;
    var statusMessage = xhr.statusText;

    if (isXdr && statusCode === undefined) {
      // IE8 CORS GET successful response doesn't have a status field, but body is fine
      statusCode = 200;
    } else if (statusCode > 12000 && statusCode < 12156) {
      // Yet another IE quirk where it emits weird status codes on network errors
      // https://support.microsoft.com/en-us/kb/193625
      return onError();
    } else {
      // Another IE bug where HTTP 204 somehow ends up as 1223
      statusCode = xhr.status === 1223 ? 204 : xhr.status;
      statusMessage = xhr.status === 1223 ? 'No Content' : statusMessage;
    }

    return {
      body: xhr.response || xhr.responseText,
      url: options.url,
      method: options.method,
      headers: isXdr ? {} : parseHeaders(xhr.getAllResponseHeaders()),
      statusCode: statusCode,
      statusMessage: statusMessage
    };
  }

  function onLoad() {
    if (aborted || loaded || timedOut) {
      return;
    }

    if (xhr.status === 0) {
      onError();
      return;
    }

    // Prevent being called twice
    stopTimers();
    loaded = true;
    callback(null, reduceResponse());
  }
};

var request = browserRequest;

// node-request in node, browser-request in browsers

var channelNames = ['request', 'response', 'progress', 'error', 'abort'];
var middlehooks = ['processOptions', 'validateOptions', 'interceptRequest', 'finalizeOptions', 'onRequest', 'onResponse', 'onError', 'onReturn', 'onHeaders'];

var lib = function createRequester() {
  var initMiddleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var loadedMiddleware = [];
  var middleware = middlehooks.reduce(function (ware, name) {
    ware[name] = ware[name] || [];
    return ware;
  }, {
    processOptions: [defaultOptionsProcessor],
    validateOptions: [defaultOptionsValidator]
  });

  function request$1(opts) {
    var channels = channelNames.reduce(function (target, name) {
      target[name] = nanoPubsub();
      return target;
    }, {});

    // Prepare a middleware reducer that can be reused throughout the lifecycle
    var applyMiddleware = middlewareReducer(middleware);

    // Parse the passed options
    var options = applyMiddleware('processOptions', opts);

    // Validate the options
    applyMiddleware('validateOptions', options);

    // Build a context object we can pass to child handlers
    var context = { options: options, channels: channels, applyMiddleware: applyMiddleware

      // We need to hold a reference to the current, ongoing request,
      // in order to allow cancellation. In the case of the retry middleware,
      // a new request might be triggered
    };var ongoingRequest = null;
    var unsubscribe = channels.request.subscribe(function (ctx) {
      // Let request adapters (node/browser) perform the actual request
      ongoingRequest = request(ctx, function (err, res) {
        return onResponse(err, res, ctx);
      });
    });

    // If we abort the request, prevent further requests from happening,
    // and be sure to cancel any ongoing request (obviously)
    channels.abort.subscribe(function () {
      unsubscribe();
      if (ongoingRequest) {
        ongoingRequest.abort();
      }
    });

    // See if any middleware wants to modify the return value - for instance
    // the promise or observable middlewares
    var returnValue = applyMiddleware('onReturn', channels, context);

    // If return value has been modified by a middleware, we expect the middleware
    // to publish on the 'request' channel. If it hasn't been modified, we want to
    // trigger it right away
    if (returnValue === channels) {
      channels.request.publish(context);
    }

    return returnValue;

    function onResponse(reqErr, res, ctx) {
      var error = reqErr;
      var response = res;

      // We're processing non-errors first, in case a middleware converts the
      // response into an error (for instance, status >= 400 == HttpError)
      if (!error) {
        try {
          response = applyMiddleware('onResponse', res, ctx);
        } catch (err) {
          response = null;
          error = err;
        }
      }

      // Apply error middleware - if middleware return the same (or a different) error,
      // publish as an error event. If we *don't* return an error, assume it has been handled
      error = error && applyMiddleware('onError', error, ctx);

      // Figure out if we should publish on error/response channels
      if (error) {
        channels.error.publish(error);
      } else if (response) {
        channels.response.publish(response);
      }
    }
  }

  request$1.use = function use(newMiddleware) {
    if (!newMiddleware) {
      throw new Error('Tried to add middleware that resolved to falsey value');
    }

    if (typeof newMiddleware === 'function') {
      throw new Error('Tried to add middleware that was a function. It probably expects you to pass options to it.');
    }

    if (newMiddleware.onReturn && middleware.onReturn.length > 0) {
      throw new Error('Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event');
    }

    middlehooks.forEach(function (key) {
      if (newMiddleware[key]) {
        middleware[key].push(newMiddleware[key]);
      }
    });

    loadedMiddleware.push(newMiddleware);
    return request$1;
  };

  request$1.clone = function clone() {
    return createRequester(loadedMiddleware);
  };

  initMiddleware.forEach(request$1.use);

  return request$1;
};

var getIt = lib;

var global_1 = createCommonjsModule(function (module) {

/* eslint-disable no-negated-condition */
if (typeof window !== 'undefined') {
  module.exports = window;
} else if (typeof commonjsGlobal !== 'undefined') {
  module.exports = commonjsGlobal;
} else if (typeof self !== 'undefined') {
  module.exports = self;
} else {
  module.exports = {};
}

});

var observable$1 = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var Observable = opts.implementation || global_1.Observable;
  if (!Observable) {
    throw new Error('`Observable` is not available in global scope, and no implementation was passed');
  }

  return {
    onReturn: function onReturn(channels, context) {
      return new Observable(function (observer) {
        channels.error.subscribe(function (err) {
          return observer.error(err);
        });
        channels.progress.subscribe(function (event) {
          return observer.next(objectAssign({ type: 'progress' }, event));
        });
        channels.response.subscribe(function (response) {
          observer.next(objectAssign({ type: 'response' }, response));
          observer.complete();
        });

        channels.request.publish(context);
        return function () {
          return channels.abort.publish();
        };
      });
    }
  };
};

/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var isobject = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

function isObjectObject(o) {
  return isobject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

var isPlainObject = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




var serializeTypes = ['boolean', 'string', 'number'];
var isBuffer = function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
};

var jsonRequest = function () {
  return {
    processOptions: function processOptions(options) {
      var body = options.body;
      if (!body) {
        return options;
      }

      var isStream = typeof body.pipe === 'function';
      var shouldSerialize = !isStream && !isBuffer(body) && (serializeTypes.indexOf(typeof body === 'undefined' ? 'undefined' : _typeof(body)) !== -1 || Array.isArray(body) || isPlainObject(body));

      if (!shouldSerialize) {
        return options;
      }

      return objectAssign({}, options, {
        body: JSON.stringify(options.body),
        headers: objectAssign({}, options.headers, {
          'Content-Type': 'application/json'
        })
      });
    }
  };
};

var jsonResponse = function (opts) {
  return {
    onResponse: function onResponse(response) {
      var contentType = response.headers['content-type'] || '';
      var shouldDecode = opts && opts.force || contentType.indexOf('application/json') !== -1;
      if (!response.body || !contentType || !shouldDecode) {
        return response;
      }

      return objectAssign({}, response, { body: tryParse(response.body) });
    },

    processOptions: function processOptions(options) {
      return objectAssign({}, options, {
        headers: objectAssign({ Accept: 'application/json' }, options.headers)
      });
    }
  };
};

function tryParse(body) {
  try {
    return JSON.parse(body);
  } catch (err) {
    err.message = 'Failed to parsed response body as JSON: ' + err.message;
    throw err;
  }
}

var browserProgress = function () {
  return {
    onRequest: function onRequest(evt) {
      if (evt.adapter !== 'xhr') {
        return;
      }

      var xhr = evt.request;
      var context = evt.context;

      if ('upload' in xhr && 'onprogress' in xhr.upload) {
        xhr.upload.onprogress = handleProgress('upload');
      }

      if ('onprogress' in xhr) {
        xhr.onprogress = handleProgress('download');
      }

      function handleProgress(stage) {
        return function (event) {
          var percent = event.lengthComputable ? event.loaded / event.total * 100 : -1;
          context.channels.progress.publish({
            stage: stage,
            percent: percent,
            total: event.total,
            loaded: event.loaded,
            lengthComputable: event.lengthComputable
          });
        };
      }
    }
  };
};

var progress = browserProgress;

var makeError_1 = createCommonjsModule(function (module, exports) {

// ===================================================================

var construct = typeof Reflect !== "undefined" ? Reflect.construct : undefined;
var defineProperty = Object.defineProperty;

// -------------------------------------------------------------------

var captureStackTrace = Error.captureStackTrace;
if (captureStackTrace === undefined) {
  captureStackTrace = function captureStackTrace(error) {
    var container = new Error();

    defineProperty(error, "stack", {
      configurable: true,
      get: function getStack() {
        var stack = container.stack;

        // Replace property with value for faster future accesses.
        defineProperty(this, "stack", {
          configurable: true,
          value: stack,
          writable: true,
        });

        return stack;
      },
      set: function setStack(stack) {
        defineProperty(error, "stack", {
          configurable: true,
          value: stack,
          writable: true,
        });
      },
    });
  };
}

// -------------------------------------------------------------------

function BaseError(message) {
  if (message !== undefined) {
    defineProperty(this, "message", {
      configurable: true,
      value: message,
      writable: true,
    });
  }

  var cname = this.constructor.name;
  if (cname !== undefined && cname !== this.name) {
    defineProperty(this, "name", {
      configurable: true,
      value: cname,
      writable: true,
    });
  }

  captureStackTrace(this, this.constructor);
}

BaseError.prototype = Object.create(Error.prototype, {
  // See: https://github.com/JsCommunity/make-error/issues/4
  constructor: {
    configurable: true,
    value: BaseError,
    writable: true,
  },
});

// -------------------------------------------------------------------

// Sets the name of a function if possible (depends of the JS engine).
var setFunctionName = (function() {
  function setFunctionName(fn, name) {
    return defineProperty(fn, "name", {
      configurable: true,
      value: name,
    });
  }
  try {
    var f = function() {};
    setFunctionName(f, "foo");
    if (f.name === "foo") {
      return setFunctionName;
    }
  } catch (_) {}
})();

// -------------------------------------------------------------------

function makeError(constructor, super_) {
  if (super_ == null || super_ === Error) {
    super_ = BaseError;
  } else if (typeof super_ !== "function") {
    throw new TypeError("super_ should be a function");
  }

  var name;
  if (typeof constructor === "string") {
    name = constructor;
    constructor =
      construct !== undefined
        ? function() {
            return construct(super_, arguments, this.constructor);
          }
        : function() {
            super_.apply(this, arguments);
          };

    // If the name can be set, do it once and for all.
    if (setFunctionName !== undefined) {
      setFunctionName(constructor, name);
      name = undefined;
    }
  } else if (typeof constructor !== "function") {
    throw new TypeError("constructor should be either a string or a function");
  }

  // Also register the super constructor also as `constructor.super_` just
  // like Node's `util.inherits()`.
  //
  // eslint-disable-next-line dot-notation
  constructor.super_ = constructor["super"] = super_;

  var properties = {
    constructor: {
      configurable: true,
      value: constructor,
      writable: true,
    },
  };

  // If the name could not be set on the constructor, set it on the
  // prototype.
  if (name !== undefined) {
    properties.name = {
      configurable: true,
      value: name,
      writable: true,
    };
  }
  constructor.prototype = Object.create(super_.prototype, properties);

  return constructor;
}
exports = module.exports = makeError;
exports.BaseError = BaseError;
});

function ClientError(res) {
  var props = extractErrorProps(res);
  ClientError.super.call(this, props.message);
  objectAssign(this, props);
}

function ServerError(res) {
  var props = extractErrorProps(res);
  ServerError.super.call(this, props.message);
  objectAssign(this, props);
}

function extractErrorProps(res) {
  var body = res.body;
  var props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res)
  }; // API/Boom style errors ({statusCode, error, message})

  if (body.error && body.message) {
    props.message = "".concat(body.error, " - ").concat(body.message);
    return props;
  } // Query/database errors ({error: {description, other, arb, props}})


  if (body.error && body.error.description) {
    props.message = body.error.description;
    props.details = body.error;
    return props;
  } // Other, more arbitrary errors


  props.message = body.error || body.message || httpErrorMessage(res);
  return props;
}

function httpErrorMessage(res) {
  var statusMessage = res.statusMessage ? " ".concat(res.statusMessage) : '';
  return "".concat(res.method, "-request to ").concat(res.url, " resulted in HTTP ").concat(res.statusCode).concat(statusMessage);
}

function stringifyBody(body, res) {
  var contentType = (res.headers['content-type'] || '').toLowerCase();
  var isJson = contentType.indexOf('application/json') !== -1;
  return isJson ? JSON.stringify(body, null, 2) : body;
}

makeError_1(ClientError);
makeError_1(ServerError);
var ClientError_1 = ClientError;
var ServerError_1 = ServerError;

var errors = {
	ClientError: ClientError_1,
	ServerError: ServerError_1
};

var browserMiddleware = [];

/* eslint-disable no-empty-function, no-process-env */














var ClientError$1 = errors.ClientError,
    ServerError$1 = errors.ServerError;

var httpError = {
  onResponse: function onResponse(res) {
    if (res.statusCode >= 500) {
      throw new ServerError$1(res);
    } else if (res.statusCode >= 400) {
      throw new ClientError$1(res);
    }

    return res;
  }
}; // Environment-specific middleware.



var middleware = browserMiddleware.concat([jsonRequest(), jsonResponse(), progress(), httpError, observable$1({
  implementation: minimal
})]);
var request$1 = getIt(middleware);

function httpRequest(options) {
  var requester = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : request$1;
  return requester(objectAssign({
    maxRedirects: 0
  }, options));
}

httpRequest.defaultRequester = request$1;
httpRequest.ClientError = ClientError$1;
httpRequest.ServerError = ServerError$1;
var request_1 = httpRequest;

var projectHeader = 'X-Sanity-Project-ID';

var requestOptions = function (config) {
  var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var headers = {};
  var token = overrides.token || config.token;

  if (token) {
    headers.Authorization = "Bearer ".concat(token);
  }

  if (!overrides.useGlobalApi && !config.useProjectHostname && config.projectId) {
    headers[projectHeader] = config.projectId;
  }

  var withCredentials = Boolean(typeof overrides.withCredentials === 'undefined' ? config.token || config.withCredentials : overrides.withCredentials);
  var timeout = typeof overrides.timeout === 'undefined' ? config.timeout : overrides.timeout;
  return objectAssign({}, overrides, {
    headers: objectAssign({}, headers, overrides.headers || {}),
    timeout: typeof timeout === 'undefined' ? 5 * 60 * 1000 : timeout,
    json: true,
    withCredentials: withCredentials
  });
};

var defaultCdnHost = 'apicdn.sanity.io';
var defaultConfig = {
  apiHost: 'https://api.sanity.io',
  useProjectHostname: true,
  gradientMode: false,
  isPromiseAPI: true
};
var LOCALHOSTS = ['localhost', '127.0.0.1', '0.0.0.0'];

var isLocal = function isLocal(host) {
  return LOCALHOSTS.indexOf(host) !== -1;
}; // eslint-disable-next-line no-console


var createWarningPrinter = function createWarningPrinter(message) {
  return once(function () {
    return console.warn(message.join(' '));
  });
};

var printCdnWarning = createWarningPrinter(['You are not using the Sanity CDN. That means your data is always fresh, but the CDN is faster and', "cheaper. Think about it! For more info, see ".concat(generateHelpUrl('js-client-cdn-configuration'), "."), 'To hide this warning, please set the `useCdn` option to either `true` or `false` when creating', 'the client.']);
var printBrowserTokenWarning = createWarningPrinter(['You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.', "See ".concat(generateHelpUrl('js-client-browser-token'), " for more information and how to hide this warning.")]);
var printCdnTokenWarning = createWarningPrinter(['You have set `useCdn` to `true` while also specifying a token. This is usually not what you', 'want. The CDN cannot be used with an authorization token, since private data cannot be cached.', "See ".concat(generateHelpUrl('js-client-usecdn-token'), " for more information.")]);
var defaultConfig_1 = defaultConfig;

var initConfig = function (config, prevConfig) {
  var newConfig = objectAssign({}, defaultConfig, prevConfig, config);
  var gradientMode = newConfig.gradientMode;
  var projectBased = !gradientMode && newConfig.useProjectHostname;

  if (typeof Promise === 'undefined') {
    var helpUrl = generateHelpUrl('js-client-promise-polyfill');
    throw new Error("No native Promise-implementation found, polyfill needed - see ".concat(helpUrl));
  }

  if (gradientMode && !newConfig.namespace) {
    throw new Error('Configuration must contain `namespace` when running in gradient mode');
  }

  if (projectBased && !newConfig.projectId) {
    throw new Error('Configuration must contain `projectId`');
  }

  var isBrowser = typeof window !== 'undefined' && window.location && window.location.hostname;
  var isLocalhost = isBrowser && isLocal(window.location.hostname);

  if (isBrowser && isLocalhost && newConfig.token && newConfig.ignoreBrowserTokenWarning !== true) {
    printBrowserTokenWarning();
  } else if ((!isBrowser || isLocalhost) && newConfig.useCdn && newConfig.token) {
    printCdnTokenWarning();
  } else if (typeof newConfig.useCdn === 'undefined') {
    printCdnWarning();
  }

  if (projectBased) {
    validators.projectId(newConfig.projectId);
  }

  if (!gradientMode && newConfig.dataset) {
    validators.dataset(newConfig.dataset, newConfig.gradientMode);
  }

  newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost;
  newConfig.useCdn = Boolean(newConfig.useCdn) && !newConfig.token && !newConfig.withCredentials;

  if (newConfig.gradientMode) {
    newConfig.url = newConfig.apiHost;
    newConfig.cdnUrl = newConfig.apiHost;
  } else {
    var hostParts = newConfig.apiHost.split('://', 2);
    var protocol = hostParts[0];
    var host = hostParts[1];
    var cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;

    if (newConfig.useProjectHostname) {
      newConfig.url = "".concat(protocol, "://").concat(newConfig.projectId, ".").concat(host, "/v1");
      newConfig.cdnUrl = "".concat(protocol, "://").concat(newConfig.projectId, ".").concat(cdnHost, "/v1");
    } else {
      newConfig.url = "".concat(newConfig.apiHost, "/v1");
      newConfig.cdnUrl = newConfig.url;
    }
  }

  return newConfig;
};

var config$1 = {
	defaultConfig: defaultConfig_1,
	initConfig: initConfig
};

var filter$4 = filter.filter;

var map$4 = map.map;





















var defaultConfig$1 = config$1.defaultConfig,
    initConfig$1 = config$1.initConfig;

var toPromise$1 = function toPromise(observable) {
  return observable.toPromise();
};

function SanityClient() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig$1;

  if (!(this instanceof SanityClient)) {
    return new SanityClient(config);
  }

  this.config(config);
  this.assets = new assetsClient(this);
  this.datasets = new datasetsClient(this);
  this.projects = new projectsClient(this);
  this.users = new usersClient(this);
  this.auth = new authClient(this);

  if (this.clientConfig.isPromiseAPI) {
    var observableConfig = objectAssign({}, this.clientConfig, {
      isPromiseAPI: false
    });
    this.observable = new SanityClient(observableConfig);
  }
}

objectAssign(SanityClient.prototype, dataMethods);
objectAssign(SanityClient.prototype, {
  clone: function clone() {
    return new SanityClient(this.config());
  },
  config: function config(newConfig) {
    if (typeof newConfig === 'undefined') {
      return objectAssign({}, this.clientConfig);
    }

    if (this.observable) {
      var observableConfig = objectAssign({}, newConfig, {
        isPromiseAPI: false
      });
      this.observable.config(observableConfig);
    }

    this.clientConfig = initConfig$1(newConfig, this.clientConfig || {});
    return this;
  },
  getUrl: function getUrl(uri) {
    var canUseCdn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var base = canUseCdn ? this.clientConfig.cdnUrl : this.clientConfig.url;
    return "".concat(base, "/").concat(uri.replace(/^\//, ''));
  },
  isPromiseAPI: function isPromiseAPI() {
    return this.clientConfig.isPromiseAPI;
  },
  _requestObservable: function _requestObservable(options) {
    var uri = options.url || options.uri;
    var canUseCdn = this.clientConfig.useCdn && ['GET', 'HEAD'].indexOf(options.method || 'GET') >= 0 && uri.indexOf('/data/') === 0;
    var reqOptions = requestOptions(this.clientConfig, objectAssign({}, options, {
      url: this.getUrl(uri, canUseCdn)
    }));
    return request_1(reqOptions, this.clientConfig.requester);
  },
  request: function request(options) {
    var observable = this._requestObservable(options).pipe(filter$4(function (event) {
      return event.type === 'response';
    }), map$4(function (event) {
      return event.body;
    }));

    return this.isPromiseAPI() ? toPromise$1(observable) : observable;
  }
});
SanityClient.Patch = patch;
SanityClient.Transaction = transaction;
SanityClient.ClientError = request_1.ClientError;
SanityClient.ServerError = request_1.ServerError;
SanityClient.requester = request_1.defaultRequester;
var sanityClient = SanityClient;

export { sanityClient as s };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FuaXR5Q2xpZW50LjE5MzJmZjFhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2ludGVybmFsL3V0aWwvaXNGdW5jdGlvbi5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2ludGVybmFsL2NvbmZpZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2ludGVybmFsL3V0aWwvaG9zdFJlcG9ydEVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9pbnRlcm5hbC91dGlsL2lzQXJyYXkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9pbnRlcm5hbC91dGlsL2lzT2JqZWN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvU3Vic2NyaXB0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvc3ltYm9sL3J4U3Vic2NyaWJlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2ludGVybmFsL1N1YnNjcmliZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZmlsdGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvb2JzZXJ2YWJsZS9vcGVyYXRvcnMvZmlsdGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzL21hcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L29ic2VydmFibGUvb3BlcmF0b3JzL21hcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9pcy1vYmovaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZGVlcC1hc3NpZ24vaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9jbGllbnQvbGliL3V0aWwvZ2V0U2VsZWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvY2xpZW50L2xpYi92YWxpZGF0b3JzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvY2xpZW50L2xpYi9kYXRhL3BhdGNoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvY2xpZW50L2xpYi9kYXRhL3RyYW5zYWN0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvY2xpZW50L2xpYi9kYXRhL2VuY29kZVF1ZXJ5U3RyaW5nLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvdXRpbC9jYW5SZXBvcnRFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2ludGVybmFsL3V0aWwvdG9TdWJzY3JpYmVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvc3ltYm9sL29ic2VydmFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9pbnRlcm5hbC91dGlsL2lkZW50aXR5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvdXRpbC9waXBlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvT2JzZXJ2YWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2ludGVybmFsL29wZXJhdG9ycy9zY2FuLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvaW50ZXJuYWwvdXRpbC9Bcmd1bWVudE91dE9mUmFuZ2VFcnJvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL2ludGVybmFsL29ic2VydmFibGUvZW1wdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvdGFrZUxhc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZGVmYXVsdElmRW1wdHkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcmVkdWNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvb2JzZXJ2YWJsZS9vcGVyYXRvcnMvcmVkdWNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvb2JzZXJ2YWJsZS9saWIvU2FuaXR5T2JzZXJ2YWJsZU1pbmltYWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9vYnNlcnZhYmxlL21pbmltYWwuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHJleHhhcnMvZXZlbnRzb3VyY2UtcG9seWZpbGwvc3JjL2V2ZW50c291cmNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvZXZlbnRzb3VyY2UvYnJvd3Nlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvdXRpbC9waWNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvY2xpZW50L2xpYi91dGlsL2RlZmF1bHRzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvZ2VuZXJhdGUtaGVscC11cmwvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9jbGllbnQvbGliL3V0aWwvb25jZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvZGF0YS9saXN0ZW4uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9jbGllbnQvbGliL2RhdGEvZGF0YU1ldGhvZHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9jbGllbnQvbGliL2RhdGFzZXRzL2RhdGFzZXRzQ2xpZW50LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvY2xpZW50L2xpYi9wcm9qZWN0cy9wcm9qZWN0c0NsaWVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvaHR0cC9xdWVyeVN0cmluZy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvYXNzZXRzL2Fzc2V0c0NsaWVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvdXNlcnMvdXNlcnNDbGllbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9jbGllbnQvbGliL2F1dGgvYXV0aENsaWVudC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uYW5vLXB1YnN1Yi9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaXQvbGliL3V0aWwvbWlkZGxld2FyZVJlZHVjZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVxdWlyZXMtcG9ydC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZ2lmeS9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy91cmwtcGFyc2UvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ2V0LWl0L2xpYi9taWRkbGV3YXJlL2RlZmF1bHRPcHRpb25zUHJvY2Vzc29yLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dldC1pdC9saWIvbWlkZGxld2FyZS9kZWZhdWx0T3B0aW9uc1ZhbGlkYXRvci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYW1lLW9yaWdpbi91cmwtcGFyc2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NhbWUtb3JpZ2luL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3BhcnNlLWhlYWRlcnMvcGFyc2UtaGVhZGVycy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaXQvbGliL3JlcXVlc3QvYnJvd3Nlci1yZXF1ZXN0LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dldC1pdC9saWIvcmVxdWVzdC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaXQvbGliL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dldC1pdC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaXQvbGliL3V0aWwvZ2xvYmFsLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dldC1pdC9saWIvbWlkZGxld2FyZS9vYnNlcnZhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzb2JqZWN0L2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzLXBsYWluLW9iamVjdC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaXQvbGliL21pZGRsZXdhcmUvanNvblJlcXVlc3QuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ2V0LWl0L2xpYi9taWRkbGV3YXJlL2pzb25SZXNwb25zZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaXQvbGliL21pZGRsZXdhcmUvcHJvZ3Jlc3MvYnJvd3Nlci1wcm9ncmVzcy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaXQvbGliL21pZGRsZXdhcmUvcHJvZ3Jlc3MvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbWFrZS1lcnJvci9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvaHR0cC9lcnJvcnMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9jbGllbnQvbGliL2h0dHAvYnJvd3Nlck1pZGRsZXdhcmUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQHNhbml0eS9jbGllbnQvbGliL2h0dHAvcmVxdWVzdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvaHR0cC9yZXF1ZXN0T3B0aW9ucy5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac2FuaXR5L2NsaWVudC9saWIvY29uZmlnLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BzYW5pdHkvY2xpZW50L2xpYi9zYW5pdHlDbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRnVuY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgX2VuYWJsZV9zdXBlcl9ncm9zc19tb2RlX3RoYXRfd2lsbF9jYXVzZV9iYWRfdGhpbmdzID0gZmFsc2U7XG5leHBvcnRzLmNvbmZpZyA9IHtcbiAgICBQcm9taXNlOiB1bmRlZmluZWQsXG4gICAgc2V0IHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignREVQUkVDQVRFRCEgUnhKUyB3YXMgc2V0IHRvIHVzZSBkZXByZWNhdGVkIHN5bmNocm9ub3VzIGVycm9yIGhhbmRsaW5nIGJlaGF2aW9yIGJ5IGNvZGUgYXQ6IFxcbicgKyBlcnJvci5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX2VuYWJsZV9zdXBlcl9ncm9zc19tb2RlX3RoYXRfd2lsbF9jYXVzZV9iYWRfdGhpbmdzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUnhKUzogQmFjayB0byBhIGJldHRlciBlcnJvciBiZWhhdmlvci4gVGhhbmsgeW91LiA8MycpO1xuICAgICAgICB9XG4gICAgICAgIF9lbmFibGVfc3VwZXJfZ3Jvc3NfbW9kZV90aGF0X3dpbGxfY2F1c2VfYmFkX3RoaW5ncyA9IHZhbHVlO1xuICAgIH0sXG4gICAgZ2V0IHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcoKSB7XG4gICAgICAgIHJldHVybiBfZW5hYmxlX3N1cGVyX2dyb3NzX21vZGVfdGhhdF93aWxsX2NhdXNlX2JhZF90aGluZ3M7XG4gICAgfSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb25maWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBob3N0UmVwb3J0RXJyb3IoZXJyKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHRocm93IGVycjsgfSwgMCk7XG59XG5leHBvcnRzLmhvc3RSZXBvcnRFcnJvciA9IGhvc3RSZXBvcnRFcnJvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvc3RSZXBvcnRFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbnZhciBob3N0UmVwb3J0RXJyb3JfMSA9IHJlcXVpcmUoXCIuL3V0aWwvaG9zdFJlcG9ydEVycm9yXCIpO1xuZXhwb3J0cy5lbXB0eSA9IHtcbiAgICBjbG9zZWQ6IHRydWUsXG4gICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7IH0sXG4gICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBob3N0UmVwb3J0RXJyb3JfMS5ob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHsgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc0FycmF5ID0gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkgfHwgKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcic7IH0pOyB9KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAhPT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCc7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09iamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVW5zdWJzY3JpcHRpb25FcnJvckltcGwoZXJyb3JzKSB7XG4gICAgICAgIEVycm9yLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IGVycm9ycyA/XG4gICAgICAgICAgICBlcnJvcnMubGVuZ3RoICsgXCIgZXJyb3JzIG9jY3VycmVkIGR1cmluZyB1bnN1YnNjcmlwdGlvbjpcXG5cIiArIGVycm9ycy5tYXAoZnVuY3Rpb24gKGVyciwgaSkgeyByZXR1cm4gaSArIDEgKyBcIikgXCIgKyBlcnIudG9TdHJpbmcoKTsgfSkuam9pbignXFxuICAnKSA6ICcnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnVW5zdWJzY3JpcHRpb25FcnJvcic7XG4gICAgICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgVW5zdWJzY3JpcHRpb25FcnJvckltcGwucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuICAgIHJldHVybiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbDtcbn0pKCk7XG5leHBvcnRzLlVuc3Vic2NyaXB0aW9uRXJyb3IgPSBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaXNBcnJheV8xID0gcmVxdWlyZShcIi4vdXRpbC9pc0FycmF5XCIpO1xudmFyIGlzT2JqZWN0XzEgPSByZXF1aXJlKFwiLi91dGlsL2lzT2JqZWN0XCIpO1xudmFyIGlzRnVuY3Rpb25fMSA9IHJlcXVpcmUoXCIuL3V0aWwvaXNGdW5jdGlvblwiKTtcbnZhciBVbnN1YnNjcmlwdGlvbkVycm9yXzEgPSByZXF1aXJlKFwiLi91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3JcIik7XG52YXIgU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb24odW5zdWJzY3JpYmUpIHtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50T3JQYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICAgICAgdGhpcy5fY3RvclVuc3Vic2NyaWJlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVycm9ycztcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9hID0gdGhpcywgX3BhcmVudE9yUGFyZW50cyA9IF9hLl9wYXJlbnRPclBhcmVudHMsIF9jdG9yVW5zdWJzY3JpYmUgPSBfYS5fY3RvclVuc3Vic2NyaWJlLCBfdW5zdWJzY3JpYmUgPSBfYS5fdW5zdWJzY3JpYmUsIF9zdWJzY3JpcHRpb25zID0gX2EuX3N1YnNjcmlwdGlvbnM7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcGFyZW50T3JQYXJlbnRzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucyA9IG51bGw7XG4gICAgICAgIGlmIChfcGFyZW50T3JQYXJlbnRzIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBfcGFyZW50T3JQYXJlbnRzLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfcGFyZW50T3JQYXJlbnRzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgX3BhcmVudE9yUGFyZW50cy5sZW5ndGg7ICsraW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50XzEgPSBfcGFyZW50T3JQYXJlbnRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBwYXJlbnRfMS5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKF91bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgIGlmIChfY3RvclVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF91bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBlIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IgPyBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZS5lcnJvcnMpIDogW2VdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0FycmF5XzEuaXNBcnJheShfc3Vic2NyaXB0aW9ucykpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICAgICAgdmFyIGxlbiA9IF9zdWJzY3JpcHRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1YiA9IF9zdWJzY3JpcHRpb25zW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPYmplY3RfMS5pc09iamVjdChzdWIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gZXJyb3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBVbnN1YnNjcmlwdGlvbkVycm9yXzEuVW5zdWJzY3JpcHRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IGVycm9ycy5jb25jYXQoZmxhdHRlblVuc3Vic2NyaXB0aW9uRXJyb3JzKGUuZXJyb3JzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVW5zdWJzY3JpcHRpb25FcnJvcl8xLlVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRlYXJkb3duO1xuICAgICAgICBpZiAoIXRlYXJkb3duKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHRlYXJkb3duKSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0ZWFyZG93bik7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24gPT09IHRoaXMgfHwgc3Vic2NyaXB0aW9uLmNsb3NlZCB8fCB0eXBlb2Ygc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghKHN1YnNjcmlwdGlvbiBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uX3N1YnNjcmlwdGlvbnMgPSBbdG1wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdGVhcmRvd24gJyArIHRlYXJkb3duICsgJyBhZGRlZCB0byBTdWJzY3JpcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9wYXJlbnRPclBhcmVudHMgPSBzdWJzY3JpcHRpb24uX3BhcmVudE9yUGFyZW50cztcbiAgICAgICAgaWYgKF9wYXJlbnRPclBhcmVudHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5fcGFyZW50T3JQYXJlbnRzID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfcGFyZW50T3JQYXJlbnRzIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBpZiAoX3BhcmVudE9yUGFyZW50cyA9PT0gdGhpcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24uX3BhcmVudE9yUGFyZW50cyA9IFtfcGFyZW50T3JQYXJlbnRzLCB0aGlzXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfcGFyZW50T3JQYXJlbnRzLmluZGV4T2YodGhpcykgPT09IC0xKSB7XG4gICAgICAgICAgICBfcGFyZW50T3JQYXJlbnRzLnB1c2godGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbc3Vic2NyaXB0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbkluZGV4ID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5zcGxpY2Uoc3Vic2NyaXB0aW9uSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKGVtcHR5KSB7XG4gICAgICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9KG5ldyBTdWJzY3JpcHRpb24oKSkpO1xuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG59KCkpO1xuZXhwb3J0cy5TdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb247XG5mdW5jdGlvbiBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JzKSB7XG4gICAgcmV0dXJuIGVycm9ycy5yZWR1Y2UoZnVuY3Rpb24gKGVycnMsIGVycikgeyByZXR1cm4gZXJycy5jb25jYXQoKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3JfMS5VbnN1YnNjcmlwdGlvbkVycm9yKSA/IGVyci5lcnJvcnMgOiBlcnIpOyB9LCBbXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TdWJzY3JpcHRpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJ4U3Vic2NyaWJlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBTeW1ib2woJ3J4U3Vic2NyaWJlcicpXG4gICAgICAgIDogJ0BAcnhTdWJzY3JpYmVyXycgKyBNYXRoLnJhbmRvbSgpO1xufSkoKTtcbmV4cG9ydHMuJCRyeFN1YnNjcmliZXIgPSBleHBvcnRzLnJ4U3Vic2NyaWJlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJ4U3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaXNGdW5jdGlvbl8xID0gcmVxdWlyZShcIi4vdXRpbC9pc0Z1bmN0aW9uXCIpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKFwiLi9PYnNlcnZlclwiKTtcbnZhciBTdWJzY3JpcHRpb25fMSA9IHJlcXVpcmUoXCIuL1N1YnNjcmlwdGlvblwiKTtcbnZhciByeFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9pbnRlcm5hbC9zeW1ib2wvcnhTdWJzY3JpYmVyXCIpO1xudmFyIGNvbmZpZ18xID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xudmFyIGhvc3RSZXBvcnRFcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9ob3N0UmVwb3J0RXJyb3JcIik7XG52YXIgU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3Vic2NyaWJlcihkZXN0aW5hdGlvbk9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnN5bmNFcnJvclZhbHVlID0gbnVsbDtcbiAgICAgICAgX3RoaXMuc3luY0Vycm9yVGhyb3duID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmICghZGVzdGluYXRpb25Pck5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBPYnNlcnZlcl8xLmVtcHR5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZXN0aW5hdGlvbk9yTmV4dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc3RpbmF0aW9uT3JOZXh0IGluc3RhbmNlb2YgU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gZGVzdGluYXRpb25Pck5leHQuc3luY0Vycm9yVGhyb3dhYmxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbk9yTmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uT3JOZXh0LmFkZChfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIoX3RoaXMsIGRlc3RpbmF0aW9uT3JOZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIF90aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGVzdGluYXRpb24gPSBuZXcgU2FmZVN1YnNjcmliZXIoX3RoaXMsIGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGVbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG4gICAgU3Vic2NyaWJlci5jcmVhdGUgPSBmdW5jdGlvbiAobmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBzdWJzY3JpYmVyID0gbmV3IFN1YnNjcmliZXIobmV4dCwgZXJyb3IsIGNvbXBsZXRlKTtcbiAgICAgICAgc3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX25leHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudW5zdWJzY3JpYmUuY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZUFuZFJlY3ljbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfcGFyZW50T3JQYXJlbnRzID0gdGhpcy5fcGFyZW50T3JQYXJlbnRzO1xuICAgICAgICB0aGlzLl9wYXJlbnRPclBhcmVudHMgPSBudWxsO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudE9yUGFyZW50cyA9IF9wYXJlbnRPclBhcmVudHM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFN1YnNjcmliZXI7XG59KFN1YnNjcmlwdGlvbl8xLlN1YnNjcmlwdGlvbikpO1xuZXhwb3J0cy5TdWJzY3JpYmVyID0gU3Vic2NyaWJlcjtcbnZhciBTYWZlU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNhZmVTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNhZmVTdWJzY3JpYmVyKF9wYXJlbnRTdWJzY3JpYmVyLCBvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICB2YXIgY29udGV4dCA9IF90aGlzO1xuICAgICAgICBpZiAoaXNGdW5jdGlvbl8xLmlzRnVuY3Rpb24ob2JzZXJ2ZXJPck5leHQpKSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2JzZXJ2ZXJPck5leHQpIHtcbiAgICAgICAgICAgIG5leHQgPSBvYnNlcnZlck9yTmV4dC5uZXh0O1xuICAgICAgICAgICAgZXJyb3IgPSBvYnNlcnZlck9yTmV4dC5lcnJvcjtcbiAgICAgICAgICAgIGNvbXBsZXRlID0gb2JzZXJ2ZXJPck5leHQuY29tcGxldGU7XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJPck5leHQgIT09IE9ic2VydmVyXzEuZW1wdHkpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gT2JqZWN0LmNyZWF0ZShvYnNlcnZlck9yTmV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb25fMS5pc0Z1bmN0aW9uKGNvbnRleHQudW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZChjb250ZXh0LnVuc3Vic2NyaWJlLmJpbmQoY29udGV4dCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0LnVuc3Vic2NyaWJlID0gX3RoaXMudW5zdWJzY3JpYmUuYmluZChfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICBfdGhpcy5fbmV4dCA9IG5leHQ7XG4gICAgICAgIF90aGlzLl9lcnJvciA9IGVycm9yO1xuICAgICAgICBfdGhpcy5fY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkICYmIHRoaXMuX25leHQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAoIWNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nIHx8ICFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9uZXh0LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgdGhpcy5fbmV4dCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICB2YXIgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyA9IGNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nIHx8ICFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBob3N0UmVwb3J0RXJyb3JfMS5ob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaG9zdFJlcG9ydEVycm9yXzEuaG9zdFJlcG9ydEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9jb21wbGV0ZS5jYWxsKF90aGlzLl9jb250ZXh0KTsgfTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nIHx8ICFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIod3JhcHBlZENvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHdyYXBwZWRDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fX3RyeU9yVW5zdWIgPSBmdW5jdGlvbiAoZm4sIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBpZiAoY29uZmlnXzEuY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3N0UmVwb3J0RXJyb3JfMS5ob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JTZXRFcnJvciA9IGZ1bmN0aW9uIChwYXJlbnQsIGZuLCB2YWx1ZSkge1xuICAgICAgICBpZiAoIWNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBjYWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChjb25maWdfMS5jb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvc3RSZXBvcnRFcnJvcl8xLmhvc3RSZXBvcnRFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgX3BhcmVudFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0cy5TYWZlU3Vic2NyaWJlciA9IFNhZmVTdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U3Vic2NyaWJlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBmaWx0ZXIocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZpbHRlck9wZXJhdG9yRnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgRmlsdGVyT3BlcmF0b3IocHJlZGljYXRlLCB0aGlzQXJnKSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuZmlsdGVyID0gZmlsdGVyO1xudmFyIEZpbHRlck9wZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGaWx0ZXJPcGVyYXRvcihwcmVkaWNhdGUsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcmVkaWNhdGUgPSBwcmVkaWNhdGU7XG4gICAgICAgIHRoaXMudGhpc0FyZyA9IHRoaXNBcmc7XG4gICAgfVxuICAgIEZpbHRlck9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRmlsdGVyU3Vic2NyaWJlcihzdWJzY3JpYmVyLCB0aGlzLnByZWRpY2F0ZSwgdGhpcy50aGlzQXJnKSk7XG4gICAgfTtcbiAgICByZXR1cm4gRmlsdGVyT3BlcmF0b3I7XG59KCkpO1xudmFyIEZpbHRlclN1YnNjcmliZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGaWx0ZXJTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZpbHRlclN1YnNjcmliZXIoZGVzdGluYXRpb24sIHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgICAgICBfdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICAgICAgX3RoaXMuY291bnQgPSAwO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEZpbHRlclN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnByZWRpY2F0ZS5jYWxsKHRoaXMudGhpc0FyZywgdmFsdWUsIHRoaXMuY291bnQrKyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBGaWx0ZXJTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmlsdGVyLmpzLm1hcCIsImV4cG9ydHMuZmlsdGVyID0gcmVxdWlyZSgncnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvZmlsdGVyJykuZmlsdGVyXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBtYXAocHJvamVjdCwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbiBtYXBPcGVyYXRpb24oc291cmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvamVjdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgaXMgbm90IGEgZnVuY3Rpb24uIEFyZSB5b3UgbG9va2luZyBmb3IgYG1hcFRvKClgPycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3VyY2UubGlmdChuZXcgTWFwT3BlcmF0b3IocHJvamVjdCwgdGhpc0FyZykpO1xuICAgIH07XG59XG5leHBvcnRzLm1hcCA9IG1hcDtcbnZhciBNYXBPcGVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTWFwT3BlcmF0b3IocHJvamVjdCwgdGhpc0FyZykge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgICAgICB0aGlzLnRoaXNBcmcgPSB0aGlzQXJnO1xuICAgIH1cbiAgICBNYXBPcGVyYXRvci5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IE1hcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0LCB0aGlzLnRoaXNBcmcpKTtcbiAgICB9O1xuICAgIHJldHVybiBNYXBPcGVyYXRvcjtcbn0oKSk7XG5leHBvcnRzLk1hcE9wZXJhdG9yID0gTWFwT3BlcmF0b3I7XG52YXIgTWFwU3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE1hcFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFwU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgcHJvamVjdCwgdGhpc0FyZykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIF90aGlzLmNvdW50ID0gMDtcbiAgICAgICAgX3RoaXMudGhpc0FyZyA9IHRoaXNBcmcgfHwgX3RoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTWFwU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJvamVjdC5jYWxsKHRoaXMudGhpc0FyZywgdmFsdWUsIHRoaXMuY291bnQrKyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChyZXN1bHQpO1xuICAgIH07XG4gICAgcmV0dXJuIE1hcFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXAuanMubWFwIiwiZXhwb3J0cy5tYXAgPSByZXF1aXJlKCdyeGpzL2ludGVybmFsL29wZXJhdG9ycy9tYXAnKS5tYXBcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHgpIHtcblx0dmFyIHR5cGUgPSB0eXBlb2YgeDtcblx0cmV0dXJuIHggIT09IG51bGwgJiYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBpc09iaiA9IHJlcXVpcmUoJ2lzLW9iaicpO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdTb3VyY2VzIGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25LZXkodG8sIGZyb20sIGtleSkge1xuXHR2YXIgdmFsID0gZnJvbVtrZXldO1xuXG5cdGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh0bywga2V5KSkge1xuXHRcdGlmICh0b1trZXldID09PSB1bmRlZmluZWQgfHwgdG9ba2V5XSA9PT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0ICgnICsga2V5ICsgJyknKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodG8sIGtleSkgfHwgIWlzT2JqKHZhbCkpIHtcblx0XHR0b1trZXldID0gdmFsO1xuXHR9IGVsc2Uge1xuXHRcdHRvW2tleV0gPSBhc3NpZ24oT2JqZWN0KHRvW2tleV0pLCBmcm9tW2tleV0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFzc2lnbih0bywgZnJvbSkge1xuXHRpZiAodG8gPT09IGZyb20pIHtcblx0XHRyZXR1cm4gdG87XG5cdH1cblxuXHRmcm9tID0gT2JqZWN0KGZyb20pO1xuXG5cdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0YXNzaWduS2V5KHRvLCBmcm9tLCBrZXkpO1xuXHRcdH1cblx0fVxuXG5cdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0dmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdGFzc2lnbktleSh0bywgZnJvbSwgc3ltYm9sc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZXBBc3NpZ24odGFyZ2V0KSB7XG5cdHRhcmdldCA9IHRvT2JqZWN0KHRhcmdldCk7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRhc3NpZ24odGFyZ2V0LCBhcmd1bWVudHNbc10pO1xuXHR9XG5cblx0cmV0dXJuIHRhcmdldDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRTZWxlY3Rpb24oc2VsKSB7XG4gIGlmICh0eXBlb2Ygc2VsID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KHNlbCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHNlbFxuICAgIH07XG4gIH1cblxuICBpZiAoc2VsICYmIHNlbC5xdWVyeSkge1xuICAgIHJldHVybiB7XG4gICAgICBxdWVyeTogc2VsLnF1ZXJ5XG4gICAgfTtcbiAgfVxuXG4gIHZhciBzZWxlY3Rpb25PcHRzID0gWycqIERvY3VtZW50IElEICg8ZG9jSWQ+KScsICcqIEFycmF5IG9mIGRvY3VtZW50IElEcycsICcqIE9iamVjdCBjb250YWluaW5nIGBxdWVyeWAnXS5qb2luKCdcXG4nKTtcbiAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biBzZWxlY3Rpb24gLSBtdXN0IGJlIG9uZSBvZjpcXG5cXG5cIi5jb25jYXQoc2VsZWN0aW9uT3B0cykpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiOyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG52YXIgVkFMSURfQVNTRVRfVFlQRVMgPSBbJ2ltYWdlJywgJ2ZpbGUnXTtcbnZhciBWQUxJRF9JTlNFUlRfTE9DQVRJT05TID0gWydiZWZvcmUnLCAnYWZ0ZXInLCAncmVwbGFjZSddO1xuXG5leHBvcnRzLmRhdGFzZXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIS9eWy1cXHddezEsMTI4fSQvLnRlc3QobmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFzZXRzIGNhbiBvbmx5IGNvbnRhaW4gbG93ZXJjYXNlIGNoYXJhY3RlcnMsIG51bWJlcnMsIHVuZGVyc2NvcmVzIGFuZCBkYXNoZXMnKTtcbiAgfVxufTtcblxuZXhwb3J0cy5wcm9qZWN0SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKCEvXlstYS16MC05XSskL2kudGVzdChpZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bwcm9qZWN0SWRgIGNhbiBvbmx5IGNvbnRhaW4gb25seSBhLXosIDAtOSBhbmQgZGFzaGVzJyk7XG4gIH1cbn07XG5cbmV4cG9ydHMudmFsaWRhdGVBc3NldFR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICBpZiAoVkFMSURfQVNTRVRfVFlQRVMuaW5kZXhPZih0eXBlKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFzc2V0IHR5cGU6IFwiLmNvbmNhdCh0eXBlLCBcIi4gTXVzdCBiZSBvbmUgb2YgXCIpLmNvbmNhdChWQUxJRF9BU1NFVF9UWVBFUy5qb2luKCcsICcpKSk7XG4gIH1cbn07XG5cbmV4cG9ydHMudmFsaWRhdGVPYmplY3QgPSBmdW5jdGlvbiAob3AsIHZhbCkge1xuICBpZiAodmFsID09PSBudWxsIHx8IF90eXBlb2YodmFsKSAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiXCIuY29uY2F0KG9wLCBcIigpIHRha2VzIGFuIG9iamVjdCBvZiBwcm9wZXJ0aWVzXCIpKTtcbiAgfVxufTtcblxuZXhwb3J0cy5yZXF1aXJlRG9jdW1lbnRJZCA9IGZ1bmN0aW9uIChvcCwgZG9jKSB7XG4gIGlmICghZG9jLl9pZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlwiLmNvbmNhdChvcCwgXCIoKSByZXF1aXJlcyB0aGF0IHRoZSBkb2N1bWVudCBjb250YWlucyBhbiBJRCAoXFxcIl9pZFxcXCIgcHJvcGVydHkpXCIpKTtcbiAgfVxuXG4gIGV4cG9ydHMudmFsaWRhdGVEb2N1bWVudElkKG9wLCBkb2MuX2lkKTtcbn07XG5cbmV4cG9ydHMudmFsaWRhdGVEb2N1bWVudElkID0gZnVuY3Rpb24gKG9wLCBpZCkge1xuICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJyB8fCAhL15bYS16MC05Xy4tXSskL2kudGVzdChpZCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIi5jb25jYXQob3AsIFwiKCk6IFxcXCJcIikuY29uY2F0KGlkLCBcIlxcXCIgaXMgbm90IGEgdmFsaWQgZG9jdW1lbnQgSURcIikpO1xuICB9XG59O1xuXG5leHBvcnRzLnZhbGlkYXRlSW5zZXJ0ID0gZnVuY3Rpb24gKGF0LCBzZWxlY3RvciwgaXRlbXMpIHtcbiAgdmFyIHNpZ25hdHVyZSA9ICdpbnNlcnQoYXQsIHNlbGVjdG9yLCBpdGVtcyknO1xuXG4gIGlmIChWQUxJRF9JTlNFUlRfTE9DQVRJT05TLmluZGV4T2YoYXQpID09PSAtMSkge1xuICAgIHZhciB2YWxpZCA9IFZBTElEX0lOU0VSVF9MT0NBVElPTlMubWFwKGZ1bmN0aW9uIChsb2MpIHtcbiAgICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQobG9jLCBcIlxcXCJcIik7XG4gICAgfSkuam9pbignLCAnKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIi5jb25jYXQoc2lnbmF0dXJlLCBcIiB0YWtlcyBhbiBcXFwiYXRcXFwiLWFyZ3VtZW50IHdoaWNoIGlzIG9uZSBvZjogXCIpLmNvbmNhdCh2YWxpZCkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIi5jb25jYXQoc2lnbmF0dXJlLCBcIiB0YWtlcyBhIFxcXCJzZWxlY3RvclxcXCItYXJndW1lbnQgd2hpY2ggbXVzdCBiZSBhIHN0cmluZ1wiKSk7XG4gIH1cblxuICBpZiAoIUFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiXCIuY29uY2F0KHNpZ25hdHVyZSwgXCIgdGFrZXMgYW4gXFxcIml0ZW1zXFxcIi1hcmd1bWVudCB3aGljaCBtdXN0IGJlIGFuIGFycmF5XCIpKTtcbiAgfVxufTtcblxuZXhwb3J0cy5oYXNEYXRhc2V0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICBpZiAoIWNvbmZpZy5ncmFkaWVudE1vZGUgJiYgIWNvbmZpZy5kYXRhc2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdgZGF0YXNldGAgbXVzdCBiZSBwcm92aWRlZCB0byBwZXJmb3JtIHF1ZXJpZXMnKTtcbiAgfVxuXG4gIHJldHVybiBjb25maWcuZGF0YXNldCB8fCAnJztcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbnZhciBkZWVwQXNzaWduID0gcmVxdWlyZSgnZGVlcC1hc3NpZ24nKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIGdldFNlbGVjdGlvbiA9IHJlcXVpcmUoJy4uL3V0aWwvZ2V0U2VsZWN0aW9uJyk7XG5cbnZhciB2YWxpZGF0ZSA9IHJlcXVpcmUoJy4uL3ZhbGlkYXRvcnMnKTtcblxudmFyIHZhbGlkYXRlT2JqZWN0ID0gdmFsaWRhdGUudmFsaWRhdGVPYmplY3Q7XG52YXIgdmFsaWRhdGVJbnNlcnQgPSB2YWxpZGF0ZS52YWxpZGF0ZUluc2VydDtcblxuZnVuY3Rpb24gUGF0Y2goc2VsZWN0aW9uKSB7XG4gIHZhciBvcGVyYXRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgdmFyIGNsaWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogbnVsbDtcbiAgdGhpcy5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gIHRoaXMub3BlcmF0aW9ucyA9IGFzc2lnbih7fSwgb3BlcmF0aW9ucyk7XG4gIHRoaXMuY2xpZW50ID0gY2xpZW50O1xufVxuXG5hc3NpZ24oUGF0Y2gucHJvdG90eXBlLCB7XG4gIGNsb25lOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFBhdGNoKHRoaXMuc2VsZWN0aW9uLCBhc3NpZ24oe30sIHRoaXMub3BlcmF0aW9ucyksIHRoaXMuY2xpZW50KTtcbiAgfSxcbiAgbWVyZ2U6IGZ1bmN0aW9uIG1lcmdlKHByb3BzKSB7XG4gICAgdmFsaWRhdGVPYmplY3QoJ21lcmdlJywgcHJvcHMpO1xuICAgIHZhciBzdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrLnRvU3RyaW5nKCkuc3BsaXQoJ1xcbicpLmZpbHRlcihmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gc3RyLnRyaW0oKTtcbiAgICB9KS5zbGljZSgyKTtcbiAgICBjb25zb2xlLndhcm4oXCJUaGUgXFxcIm1lcmdlXFxcIiBwYXRjaCBoYXMgYmVlbiBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIGZ1dHVyZVxcblwiLmNvbmNhdChzdGFjay5qb2luKCdcXG4nKSkpO1xuICAgIHJldHVybiB0aGlzLl9hc3NpZ24oJ21lcmdlJywgZGVlcEFzc2lnbih0aGlzLm9wZXJhdGlvbnMubWVyZ2UgfHwge30sIHByb3BzKSk7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0KHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Fzc2lnbignc2V0JywgcHJvcHMpO1xuICB9LFxuICBkaWZmTWF0Y2hQYXRjaDogZnVuY3Rpb24gZGlmZk1hdGNoUGF0Y2gocHJvcHMpIHtcbiAgICB2YWxpZGF0ZU9iamVjdCgnZGlmZk1hdGNoUGF0Y2gnLCBwcm9wcyk7XG4gICAgcmV0dXJuIHRoaXMuX2Fzc2lnbignZGlmZk1hdGNoUGF0Y2gnLCBwcm9wcyk7XG4gIH0sXG4gIHVuc2V0OiBmdW5jdGlvbiB1bnNldChhdHRycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhdHRycykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5zZXQoYXR0cnMpIHRha2VzIGFuIGFycmF5IG9mIGF0dHJpYnV0ZXMgdG8gdW5zZXQsIG5vbi1hcnJheSBnaXZlbicpO1xuICAgIH1cblxuICAgIHRoaXMub3BlcmF0aW9ucyA9IGFzc2lnbih7fSwgdGhpcy5vcGVyYXRpb25zLCB7XG4gICAgICB1bnNldDogYXR0cnNcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgc2V0SWZNaXNzaW5nOiBmdW5jdGlvbiBzZXRJZk1pc3NpbmcocHJvcHMpIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzaWduKCdzZXRJZk1pc3NpbmcnLCBwcm9wcyk7XG4gIH0sXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UocHJvcHMpIHtcbiAgICB2YWxpZGF0ZU9iamVjdCgncmVwbGFjZScsIHByb3BzKTtcbiAgICByZXR1cm4gdGhpcy5fc2V0KCdzZXQnLCB7XG4gICAgICAkOiBwcm9wc1xuICAgIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGlkLWxlbmd0aFxuICB9LFxuICBpbmM6IGZ1bmN0aW9uIGluYyhwcm9wcykge1xuICAgIHJldHVybiB0aGlzLl9hc3NpZ24oJ2luYycsIHByb3BzKTtcbiAgfSxcbiAgZGVjOiBmdW5jdGlvbiBkZWMocHJvcHMpIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzaWduKCdkZWMnLCBwcm9wcyk7XG4gIH0sXG4gIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KGF0LCBzZWxlY3RvciwgaXRlbXMpIHtcbiAgICB2YXIgX3RoaXMkX2Fzc2lnbjtcblxuICAgIHZhbGlkYXRlSW5zZXJ0KGF0LCBzZWxlY3RvciwgaXRlbXMpO1xuICAgIHJldHVybiB0aGlzLl9hc3NpZ24oJ2luc2VydCcsIChfdGhpcyRfYXNzaWduID0ge30sIF9kZWZpbmVQcm9wZXJ0eShfdGhpcyRfYXNzaWduLCBhdCwgc2VsZWN0b3IpLCBfZGVmaW5lUHJvcGVydHkoX3RoaXMkX2Fzc2lnbiwgXCJpdGVtc1wiLCBpdGVtcyksIF90aGlzJF9hc3NpZ24pKTtcbiAgfSxcbiAgYXBwZW5kOiBmdW5jdGlvbiBhcHBlbmQoc2VsZWN0b3IsIGl0ZW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0KCdhZnRlcicsIFwiXCIuY29uY2F0KHNlbGVjdG9yLCBcIlstMV1cIiksIGl0ZW1zKTtcbiAgfSxcbiAgcHJlcGVuZDogZnVuY3Rpb24gcHJlcGVuZChzZWxlY3RvciwgaXRlbXMpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnQoJ2JlZm9yZScsIFwiXCIuY29uY2F0KHNlbGVjdG9yLCBcIlswXVwiKSwgaXRlbXMpO1xuICB9LFxuICBzcGxpY2U6IGZ1bmN0aW9uIHNwbGljZShzZWxlY3Rvciwgc3RhcnQsIGRlbGV0ZUNvdW50LCBpdGVtcykge1xuICAgIC8vIE5lZ2F0aXZlIGluZGV4ZXMgZG9lc24ndCBtZWFuIHRoZSBzYW1lIGluIFNhbml0eSBhcyB0aGV5IGRvIGluIEpTO1xuICAgIC8vIC0xIG1lYW5zIFwiYWN0dWFsbHkgYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXlcIiwgd2hpY2ggYWxsb3dzIGluc2VydGluZ1xuICAgIC8vIGF0IHRoZSBlbmQgb2YgdGhlIGFycmF5IHdpdGhvdXQga25vd2luZyBpdHMgbGVuZ3RoLiBXZSB0aGVyZWZvcmUgaGF2ZVxuICAgIC8vIHRvIHN1YnN0cmFjdCBuZWdhdGl2ZSBpbmRleGVzIGJ5IG9uZSB0byBtYXRjaCBKUy4gSWYgeW91IHdhbnQgU2FuaXR5LVxuICAgIC8vIGJlaGF2aW91ciwganVzdCB1c2UgYGluc2VydCgncmVwbGFjZScsIHNlbGVjdG9yLCBpdGVtcylgIGRpcmVjdGx5XG4gICAgdmFyIGRlbEFsbCA9IHR5cGVvZiBkZWxldGVDb3VudCA9PT0gJ3VuZGVmaW5lZCcgfHwgZGVsZXRlQ291bnQgPT09IC0xO1xuICAgIHZhciBzdGFydEluZGV4ID0gc3RhcnQgPCAwID8gc3RhcnQgLSAxIDogc3RhcnQ7XG4gICAgdmFyIGRlbENvdW50ID0gZGVsQWxsID8gLTEgOiBNYXRoLm1heCgwLCBzdGFydCArIGRlbGV0ZUNvdW50KTtcbiAgICB2YXIgZGVsUmFuZ2UgPSBzdGFydEluZGV4IDwgMCAmJiBkZWxDb3VudCA+PSAwID8gJycgOiBkZWxDb3VudDtcbiAgICB2YXIgcmFuZ2VTZWxlY3RvciA9IFwiXCIuY29uY2F0KHNlbGVjdG9yLCBcIltcIikuY29uY2F0KHN0YXJ0SW5kZXgsIFwiOlwiKS5jb25jYXQoZGVsUmFuZ2UsIFwiXVwiKTtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnQoJ3JlcGxhY2UnLCByYW5nZVNlbGVjdG9yLCBpdGVtcyB8fCBbXSk7XG4gIH0sXG4gIGlmUmV2aXNpb25JZDogZnVuY3Rpb24gaWZSZXZpc2lvbklkKHJldikge1xuICAgIHRoaXMub3BlcmF0aW9ucy5pZlJldmlzaW9uSUQgPSByZXY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHNlcmlhbGl6ZTogZnVuY3Rpb24gc2VyaWFsaXplKCkge1xuICAgIHJldHVybiBhc3NpZ24oZ2V0U2VsZWN0aW9uKHRoaXMuc2VsZWN0aW9uKSwgdGhpcy5vcGVyYXRpb25zKTtcbiAgfSxcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VyaWFsaXplKCk7XG4gIH0sXG4gIGNvbW1pdDogZnVuY3Rpb24gY29tbWl0KCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICAgIGlmICghdGhpcy5jbGllbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYGNsaWVudGAgcGFzc2VkIHRvIHBhdGNoLCBlaXRoZXIgcHJvdmlkZSBvbmUgb3IgcGFzcyB0aGUgJyArICdwYXRjaCB0byBhIGNsaWVudHMgYG11dGF0ZSgpYCBtZXRob2QnKTtcbiAgICB9XG5cbiAgICB2YXIgcmV0dXJuRmlyc3QgPSB0eXBlb2YgdGhpcy5zZWxlY3Rpb24gPT09ICdzdHJpbmcnO1xuICAgIHZhciBvcHRzID0gYXNzaWduKHtcbiAgICAgIHJldHVybkZpcnN0OiByZXR1cm5GaXJzdCxcbiAgICAgIHJldHVybkRvY3VtZW50czogdHJ1ZVxuICAgIH0sIG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5tdXRhdGUoe1xuICAgICAgcGF0Y2g6IHRoaXMuc2VyaWFsaXplKClcbiAgICB9LCBvcHRzKTtcbiAgfSxcbiAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIHRoaXMub3BlcmF0aW9ucyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBfc2V0OiBmdW5jdGlvbiBfc2V0KG9wLCBwcm9wcykge1xuICAgIHJldHVybiB0aGlzLl9hc3NpZ24ob3AsIHByb3BzLCBmYWxzZSk7XG4gIH0sXG4gIF9hc3NpZ246IGZ1bmN0aW9uIF9hc3NpZ24ob3AsIHByb3BzKSB7XG4gICAgdmFyIG1lcmdlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB0cnVlO1xuICAgIHZhbGlkYXRlT2JqZWN0KG9wLCBwcm9wcyk7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gYXNzaWduKHt9LCB0aGlzLm9wZXJhdGlvbnMsIF9kZWZpbmVQcm9wZXJ0eSh7fSwgb3AsIGFzc2lnbih7fSwgbWVyZ2UgJiYgdGhpcy5vcGVyYXRpb25zW29wXSB8fCB7fSwgcHJvcHMpKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBQYXRjaDsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIHZhbGlkYXRvcnMgPSByZXF1aXJlKCcuLi92YWxpZGF0b3JzJyk7XG5cbnZhciBQYXRjaCA9IHJlcXVpcmUoJy4vcGF0Y2gnKTtcblxudmFyIGRlZmF1bHRNdXRhdGVPcHRpb25zID0ge1xuICByZXR1cm5Eb2N1bWVudHM6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBUcmFuc2FjdGlvbigpIHtcbiAgdmFyIG9wZXJhdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICB2YXIgY2xpZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gIHZhciB0cmFuc2FjdGlvbklkID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHRoaXMudHJ4SWQgPSB0cmFuc2FjdGlvbklkO1xuICB0aGlzLm9wZXJhdGlvbnMgPSBvcGVyYXRpb25zO1xuICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbn1cblxuYXNzaWduKFRyYW5zYWN0aW9uLnByb3RvdHlwZSwge1xuICBjbG9uZTogZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBUcmFuc2FjdGlvbih0aGlzLm9wZXJhdGlvbnMuc2xpY2UoMCksIHRoaXMuY2xpZW50LCB0aGlzLnRyeElkKTtcbiAgfSxcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoZG9jKSB7XG4gICAgdmFsaWRhdG9ycy52YWxpZGF0ZU9iamVjdCgnY3JlYXRlJywgZG9jKTtcbiAgICByZXR1cm4gdGhpcy5fYWRkKHtcbiAgICAgIGNyZWF0ZTogZG9jXG4gICAgfSk7XG4gIH0sXG4gIGNyZWF0ZUlmTm90RXhpc3RzOiBmdW5jdGlvbiBjcmVhdGVJZk5vdEV4aXN0cyhkb2MpIHtcbiAgICB2YXIgb3AgPSAnY3JlYXRlSWZOb3RFeGlzdHMnO1xuICAgIHZhbGlkYXRvcnMudmFsaWRhdGVPYmplY3Qob3AsIGRvYyk7XG4gICAgdmFsaWRhdG9ycy5yZXF1aXJlRG9jdW1lbnRJZChvcCwgZG9jKTtcbiAgICByZXR1cm4gdGhpcy5fYWRkKF9kZWZpbmVQcm9wZXJ0eSh7fSwgb3AsIGRvYykpO1xuICB9LFxuICBjcmVhdGVPclJlcGxhY2U6IGZ1bmN0aW9uIGNyZWF0ZU9yUmVwbGFjZShkb2MpIHtcbiAgICB2YXIgb3AgPSAnY3JlYXRlT3JSZXBsYWNlJztcbiAgICB2YWxpZGF0b3JzLnZhbGlkYXRlT2JqZWN0KG9wLCBkb2MpO1xuICAgIHZhbGlkYXRvcnMucmVxdWlyZURvY3VtZW50SWQob3AsIGRvYyk7XG4gICAgcmV0dXJuIHRoaXMuX2FkZChfZGVmaW5lUHJvcGVydHkoe30sIG9wLCBkb2MpKTtcbiAgfSxcbiAgZGVsZXRlOiBmdW5jdGlvbiBfZGVsZXRlKGRvY3VtZW50SWQpIHtcbiAgICB2YWxpZGF0b3JzLnZhbGlkYXRlRG9jdW1lbnRJZCgnZGVsZXRlJywgZG9jdW1lbnRJZCk7XG4gICAgcmV0dXJuIHRoaXMuX2FkZCh7XG4gICAgICBkZWxldGU6IHtcbiAgICAgICAgaWQ6IGRvY3VtZW50SWRcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgcGF0Y2g6IGZ1bmN0aW9uIHBhdGNoKGRvY3VtZW50SWQsIHBhdGNoT3BzKSB7XG4gICAgdmFyIGlzQnVpbGRlciA9IHR5cGVvZiBwYXRjaE9wcyA9PT0gJ2Z1bmN0aW9uJztcbiAgICB2YXIgaXNQYXRjaCA9IGRvY3VtZW50SWQgaW5zdGFuY2VvZiBQYXRjaDsgLy8gdHJhbnNhY3Rpb24ucGF0Y2goY2xpZW50LnBhdGNoKCdkb2N1bWVudElkJykuaW5jKHt2aXNpdHM6IDF9KSlcblxuICAgIGlmIChpc1BhdGNoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkKHtcbiAgICAgICAgcGF0Y2g6IGRvY3VtZW50SWQuc2VyaWFsaXplKClcbiAgICAgIH0pO1xuICAgIH0gLy8gcGF0Y2ggPT4gcGF0Y2guaW5jKHt2aXNpdHM6IDF9KS5zZXQoe2ZvbzogJ2Jhcid9KVxuXG5cbiAgICBpZiAoaXNCdWlsZGVyKSB7XG4gICAgICB2YXIgcGF0Y2ggPSBwYXRjaE9wcyhuZXcgUGF0Y2goZG9jdW1lbnRJZCwge30sIHRoaXMuY2xpZW50KSk7XG5cbiAgICAgIGlmICghKHBhdGNoIGluc3RhbmNlb2YgUGF0Y2gpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb24gcGFzc2VkIHRvIGBwYXRjaCgpYCBtdXN0IHJldHVybiB0aGUgcGF0Y2gnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX2FkZCh7XG4gICAgICAgIHBhdGNoOiBwYXRjaC5zZXJpYWxpemUoKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2FkZCh7XG4gICAgICBwYXRjaDogYXNzaWduKHtcbiAgICAgICAgaWQ6IGRvY3VtZW50SWRcbiAgICAgIH0sIHBhdGNoT3BzKVxuICAgIH0pO1xuICB9LFxuICB0cmFuc2FjdGlvbklkOiBmdW5jdGlvbiB0cmFuc2FjdGlvbklkKGlkKSB7XG4gICAgaWYgKCFpZCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJ4SWQ7XG4gICAgfVxuXG4gICAgdGhpcy50cnhJZCA9IGlkO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBzZXJpYWxpemU6IGZ1bmN0aW9uIHNlcmlhbGl6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb25zLnNsaWNlKCk7XG4gIH0sXG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLnNlcmlhbGl6ZSgpO1xuICB9LFxuICBjb21taXQ6IGZ1bmN0aW9uIGNvbW1pdChvcHRpb25zKSB7XG4gICAgaWYgKCF0aGlzLmNsaWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBgY2xpZW50YCBwYXNzZWQgdG8gdHJhbnNhY3Rpb24sIGVpdGhlciBwcm92aWRlIG9uZSBvciBwYXNzIHRoZSAnICsgJ3RyYW5zYWN0aW9uIHRvIGEgY2xpZW50cyBgbXV0YXRlKClgIG1ldGhvZCcpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNsaWVudC5tdXRhdGUodGhpcy5zZXJpYWxpemUoKSwgYXNzaWduKHtcbiAgICAgIHRyYW5zYWN0aW9uSWQ6IHRoaXMudHJ4SWRcbiAgICB9LCBkZWZhdWx0TXV0YXRlT3B0aW9ucywgb3B0aW9ucyB8fCB7fSkpO1xuICB9LFxuICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gW107XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIF9hZGQ6IGZ1bmN0aW9uIF9hZGQobXV0KSB7XG4gICAgdGhpcy5vcGVyYXRpb25zLnB1c2gobXV0KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zYWN0aW9uOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZW5jID0gZW5jb2RlVVJJQ29tcG9uZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBxdWVyeSA9IF9yZWYucXVlcnksXG4gICAgICBfcmVmJHBhcmFtcyA9IF9yZWYucGFyYW1zLFxuICAgICAgcGFyYW1zID0gX3JlZiRwYXJhbXMgPT09IHZvaWQgMCA/IHt9IDogX3JlZiRwYXJhbXMsXG4gICAgICBfcmVmJG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBvcHRpb25zID0gX3JlZiRvcHRpb25zID09PSB2b2lkIDAgPyB7fSA6IF9yZWYkb3B0aW9ucztcbiAgdmFyIGJhc2UgPSBcIj9xdWVyeT1cIi5jb25jYXQoZW5jKHF1ZXJ5KSk7XG4gIHZhciBxU3RyaW5nID0gT2JqZWN0LmtleXMocGFyYW1zKS5yZWR1Y2UoZnVuY3Rpb24gKHFzLCBwYXJhbSkge1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChxcywgXCImXCIpLmNvbmNhdChlbmMoXCIkXCIuY29uY2F0KHBhcmFtKSksIFwiPVwiKS5jb25jYXQoZW5jKEpTT04uc3RyaW5naWZ5KHBhcmFtc1twYXJhbV0pKSk7XG4gIH0sIGJhc2UpO1xuICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucykucmVkdWNlKGZ1bmN0aW9uIChxcywgb3B0aW9uKSB7XG4gICAgLy8gT25seSBpbmNsdWRlIHRoZSBvcHRpb24gaWYgaXQgaXMgdHJ1dGh5XG4gICAgcmV0dXJuIG9wdGlvbnNbb3B0aW9uXSA/IFwiXCIuY29uY2F0KHFzLCBcIiZcIikuY29uY2F0KGVuYyhvcHRpb24pLCBcIj1cIikuY29uY2F0KGVuYyhvcHRpb25zW29wdGlvbl0pKSA6IHFzO1xuICB9LCBxU3RyaW5nKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmliZXJcIik7XG5mdW5jdGlvbiBjYW5SZXBvcnRFcnJvcihvYnNlcnZlcikge1xuICAgIHdoaWxlIChvYnNlcnZlcikge1xuICAgICAgICB2YXIgX2EgPSBvYnNlcnZlciwgY2xvc2VkXzEgPSBfYS5jbG9zZWQsIGRlc3RpbmF0aW9uID0gX2EuZGVzdGluYXRpb24sIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZDtcbiAgICAgICAgaWYgKGNsb3NlZF8xIHx8IGlzU3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uIGluc3RhbmNlb2YgU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIG9ic2VydmVyID0gZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvYnNlcnZlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5leHBvcnRzLmNhblJlcG9ydEVycm9yID0gY2FuUmVwb3J0RXJyb3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYW5SZXBvcnRFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaWJlclwiKTtcbnZhciByeFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9zeW1ib2wvcnhTdWJzY3JpYmVyXCIpO1xudmFyIE9ic2VydmVyXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2ZXJcIik7XG5mdW5jdGlvbiB0b1N1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSkge1xuICAgIGlmIChuZXh0T3JPYnNlcnZlcikge1xuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXIgaW5zdGFuY2VvZiBTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlcltyeFN1YnNjcmliZXJfMS5yeFN1YnNjcmliZXJdKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyXzEucnhTdWJzY3JpYmVyXSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghbmV4dE9yT2JzZXJ2ZXIgJiYgIWVycm9yICYmICFjb21wbGV0ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKE9ic2VydmVyXzEuZW1wdHkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN1YnNjcmliZXJfMS5TdWJzY3JpYmVyKG5leHRPck9ic2VydmVyLCBlcnJvciwgY29tcGxldGUpO1xufVxuZXhwb3J0cy50b1N1YnNjcmliZXIgPSB0b1N1YnNjcmliZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b1N1YnNjcmliZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9ic2VydmFibGUgPSAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wub2JzZXJ2YWJsZSB8fCAnQEBvYnNlcnZhYmxlJzsgfSkoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5mdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG59XG5leHBvcnRzLmlkZW50aXR5ID0gaWRlbnRpdHk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpZGVudGl0eV8xID0gcmVxdWlyZShcIi4vaWRlbnRpdHlcIik7XG5mdW5jdGlvbiBwaXBlKCkge1xuICAgIHZhciBmbnMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBmbnNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkoZm5zKTtcbn1cbmV4cG9ydHMucGlwZSA9IHBpcGU7XG5mdW5jdGlvbiBwaXBlRnJvbUFycmF5KGZucykge1xuICAgIGlmIChmbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBpZGVudGl0eV8xLmlkZW50aXR5O1xuICAgIH1cbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gZm5zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcGlwZWQoaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGZuKSB7IHJldHVybiBmbihwcmV2KTsgfSwgaW5wdXQpO1xuICAgIH07XG59XG5leHBvcnRzLnBpcGVGcm9tQXJyYXkgPSBwaXBlRnJvbUFycmF5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjYW5SZXBvcnRFcnJvcl8xID0gcmVxdWlyZShcIi4vdXRpbC9jYW5SZXBvcnRFcnJvclwiKTtcbnZhciB0b1N1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuL3V0aWwvdG9TdWJzY3JpYmVyXCIpO1xudmFyIG9ic2VydmFibGVfMSA9IHJlcXVpcmUoXCIuL3N5bWJvbC9vYnNlcnZhYmxlXCIpO1xudmFyIHBpcGVfMSA9IHJlcXVpcmUoXCIuL3V0aWwvcGlwZVwiKTtcbnZhciBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbnZhciBPYnNlcnZhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlKHN1YnNjcmliZSkge1xuICAgICAgICB0aGlzLl9pc1NjYWxhciA9IGZhbHNlO1xuICAgICAgICBpZiAoc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIChvcGVyYXRvcikge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc291cmNlID0gdGhpcztcbiAgICAgICAgb2JzZXJ2YWJsZS5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChvYnNlcnZlck9yTmV4dCwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgICAgIHZhciBvcGVyYXRvciA9IHRoaXMub3BlcmF0b3I7XG4gICAgICAgIHZhciBzaW5rID0gdG9TdWJzY3JpYmVyXzEudG9TdWJzY3JpYmVyKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIHNpbmsuYWRkKG9wZXJhdG9yLmNhbGwoc2luaywgdGhpcy5zb3VyY2UpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpbmsuYWRkKHRoaXMuc291cmNlIHx8IChjb25maWdfMS5jb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyAmJiAhc2luay5zeW5jRXJyb3JUaHJvd2FibGUpID9cbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUoc2luaykgOlxuICAgICAgICAgICAgICAgIHRoaXMuX3RyeVN1YnNjcmliZShzaW5rKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZ18xLmNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICBpZiAoc2luay5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICBzaW5rLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzaW5rLnN5bmNFcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBzaW5rLnN5bmNFcnJvclZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2luaztcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl90cnlTdWJzY3JpYmUgPSBmdW5jdGlvbiAoc2luaykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmliZShzaW5rKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoY29uZmlnXzEuY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICBzaW5rLnN5bmNFcnJvclRocm93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2luay5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYW5SZXBvcnRFcnJvcl8xLmNhblJlcG9ydEVycm9yKHNpbmspKSB7XG4gICAgICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgcHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIHJldHVybiBzb3VyY2UgJiYgc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW29ic2VydmFibGVfMS5vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVyYXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGVfMS5waXBlRnJvbUFycmF5KG9wZXJhdGlvbnMpKHRoaXMpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2VDdG9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHByb21pc2VDdG9yID0gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpO1xuICAgICAgICByZXR1cm4gbmV3IHByb21pc2VDdG9yKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgICAgIF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAoeCkgeyByZXR1cm4gdmFsdWUgPSB4OyB9LCBmdW5jdGlvbiAoZXJyKSB7IHJldHVybiByZWplY3QoZXJyKTsgfSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZSh2YWx1ZSk7IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUuY3JlYXRlID0gZnVuY3Rpb24gKHN1YnNjcmliZSkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoc3Vic2NyaWJlKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlO1xufSgpKTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IE9ic2VydmFibGU7XG5mdW5jdGlvbiBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcikge1xuICAgIGlmICghcHJvbWlzZUN0b3IpIHtcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBjb25maWdfMS5jb25maWcuUHJvbWlzZSB8fCBQcm9taXNlO1xuICAgIH1cbiAgICBpZiAoIXByb21pc2VDdG9yKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gUHJvbWlzZSBpbXBsIGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9taXNlQ3Rvcjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU9ic2VydmFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFN1YnNjcmliZXJfMSA9IHJlcXVpcmUoXCIuLi9TdWJzY3JpYmVyXCIpO1xuZnVuY3Rpb24gc2NhbihhY2N1bXVsYXRvciwgc2VlZCkge1xuICAgIHZhciBoYXNTZWVkID0gZmFsc2U7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICBoYXNTZWVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHNjYW5PcGVyYXRvckZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLmxpZnQobmV3IFNjYW5PcGVyYXRvcihhY2N1bXVsYXRvciwgc2VlZCwgaGFzU2VlZCkpO1xuICAgIH07XG59XG5leHBvcnRzLnNjYW4gPSBzY2FuO1xudmFyIFNjYW5PcGVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2Nhbk9wZXJhdG9yKGFjY3VtdWxhdG9yLCBzZWVkLCBoYXNTZWVkKSB7XG4gICAgICAgIGlmIChoYXNTZWVkID09PSB2b2lkIDApIHsgaGFzU2VlZCA9IGZhbHNlOyB9XG4gICAgICAgIHRoaXMuYWNjdW11bGF0b3IgPSBhY2N1bXVsYXRvcjtcbiAgICAgICAgdGhpcy5zZWVkID0gc2VlZDtcbiAgICAgICAgdGhpcy5oYXNTZWVkID0gaGFzU2VlZDtcbiAgICB9XG4gICAgU2Nhbk9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgU2NhblN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5hY2N1bXVsYXRvciwgdGhpcy5zZWVkLCB0aGlzLmhhc1NlZWQpKTtcbiAgICB9O1xuICAgIHJldHVybiBTY2FuT3BlcmF0b3I7XG59KCkpO1xudmFyIFNjYW5TdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2NhblN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2NhblN1YnNjcmliZXIoZGVzdGluYXRpb24sIGFjY3VtdWxhdG9yLCBfc2VlZCwgaGFzU2VlZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuYWNjdW11bGF0b3IgPSBhY2N1bXVsYXRvcjtcbiAgICAgICAgX3RoaXMuX3NlZWQgPSBfc2VlZDtcbiAgICAgICAgX3RoaXMuaGFzU2VlZCA9IGhhc1NlZWQ7XG4gICAgICAgIF90aGlzLmluZGV4ID0gMDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2NhblN1YnNjcmliZXIucHJvdG90eXBlLCBcInNlZWRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWVkO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5oYXNTZWVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3NlZWQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgU2NhblN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNTZWVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJ5TmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNjYW5TdWJzY3JpYmVyLnByb3RvdHlwZS5fdHJ5TmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmluZGV4Kys7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFjY3VtdWxhdG9yKHRoaXMuc2VlZCwgdmFsdWUsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWVkID0gcmVzdWx0O1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQocmVzdWx0KTtcbiAgICB9O1xuICAgIHJldHVybiBTY2FuU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjYW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JJbXBsID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBcmd1bWVudE91dE9mUmFuZ2VFcnJvckltcGwoKSB7XG4gICAgICAgIEVycm9yLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9ICdhcmd1bWVudCBvdXQgb2YgcmFuZ2UnO1xuICAgICAgICB0aGlzLm5hbWUgPSAnQXJndW1lbnRPdXRPZlJhbmdlRXJyb3InO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JJbXBsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbiAgICByZXR1cm4gQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JJbXBsO1xufSkoKTtcbmV4cG9ydHMuQXJndW1lbnRPdXRPZlJhbmdlRXJyb3IgPSBBcmd1bWVudE91dE9mUmFuZ2VFcnJvckltcGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Bcmd1bWVudE91dE9mUmFuZ2VFcnJvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBPYnNlcnZhYmxlXzEgPSByZXF1aXJlKFwiLi4vT2JzZXJ2YWJsZVwiKTtcbmV4cG9ydHMuRU1QVFkgPSBuZXcgT2JzZXJ2YWJsZV8xLk9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHsgcmV0dXJuIHN1YnNjcmliZXIuY29tcGxldGUoKTsgfSk7XG5mdW5jdGlvbiBlbXB0eShzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gc2NoZWR1bGVyID8gZW1wdHlTY2hlZHVsZWQoc2NoZWR1bGVyKSA6IGV4cG9ydHMuRU1QVFk7XG59XG5leHBvcnRzLmVtcHR5ID0gZW1wdHk7XG5mdW5jdGlvbiBlbXB0eVNjaGVkdWxlZChzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVfMS5PYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7IHJldHVybiBzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KTsgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbXB0eS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU3Vic2NyaWJlcl8xID0gcmVxdWlyZShcIi4uL1N1YnNjcmliZXJcIik7XG52YXIgQXJndW1lbnRPdXRPZlJhbmdlRXJyb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlsL0FyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXCIpO1xudmFyIGVtcHR5XzEgPSByZXF1aXJlKFwiLi4vb2JzZXJ2YWJsZS9lbXB0eVwiKTtcbmZ1bmN0aW9uIHRha2VMYXN0KGNvdW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRha2VMYXN0T3BlcmF0b3JGdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlfMS5lbXB0eSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBUYWtlTGFzdE9wZXJhdG9yKGNvdW50KSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy50YWtlTGFzdCA9IHRha2VMYXN0O1xudmFyIFRha2VMYXN0T3BlcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRha2VMYXN0T3BlcmF0b3IodG90YWwpIHtcbiAgICAgICAgdGhpcy50b3RhbCA9IHRvdGFsO1xuICAgICAgICBpZiAodGhpcy50b3RhbCA8IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBBcmd1bWVudE91dE9mUmFuZ2VFcnJvcl8xLkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIFRha2VMYXN0T3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBUYWtlTGFzdFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy50b3RhbCkpO1xuICAgIH07XG4gICAgcmV0dXJuIFRha2VMYXN0T3BlcmF0b3I7XG59KCkpO1xudmFyIFRha2VMYXN0U3Vic2NyaWJlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRha2VMYXN0U3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUYWtlTGFzdFN1YnNjcmliZXIoZGVzdGluYXRpb24sIHRvdGFsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50b3RhbCA9IHRvdGFsO1xuICAgICAgICBfdGhpcy5yaW5nID0gbmV3IEFycmF5KCk7XG4gICAgICAgIF90aGlzLmNvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBUYWtlTGFzdFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByaW5nID0gdGhpcy5yaW5nO1xuICAgICAgICB2YXIgdG90YWwgPSB0aGlzLnRvdGFsO1xuICAgICAgICB2YXIgY291bnQgPSB0aGlzLmNvdW50Kys7XG4gICAgICAgIGlmIChyaW5nLmxlbmd0aCA8IHRvdGFsKSB7XG4gICAgICAgICAgICByaW5nLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gY291bnQgJSB0b3RhbDtcbiAgICAgICAgICAgIHJpbmdbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRha2VMYXN0U3Vic2NyaWJlci5wcm90b3R5cGUuX2NvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICB2YXIgY291bnQgPSB0aGlzLmNvdW50O1xuICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgICB2YXIgdG90YWwgPSB0aGlzLmNvdW50ID49IHRoaXMudG90YWwgPyB0aGlzLnRvdGFsIDogdGhpcy5jb3VudDtcbiAgICAgICAgICAgIHZhciByaW5nID0gdGhpcy5yaW5nO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlkeCA9IChjb3VudCsrKSAlIHRvdGFsO1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLm5leHQocmluZ1tpZHhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIFRha2VMYXN0U3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcl8xLlN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRha2VMYXN0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTdWJzY3JpYmVyXzEgPSByZXF1aXJlKFwiLi4vU3Vic2NyaWJlclwiKTtcbmZ1bmN0aW9uIGRlZmF1bHRJZkVtcHR5KGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSBudWxsOyB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBEZWZhdWx0SWZFbXB0eU9wZXJhdG9yKGRlZmF1bHRWYWx1ZSkpOyB9O1xufVxuZXhwb3J0cy5kZWZhdWx0SWZFbXB0eSA9IGRlZmF1bHRJZkVtcHR5O1xudmFyIERlZmF1bHRJZkVtcHR5T3BlcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlZmF1bHRJZkVtcHR5T3BlcmF0b3IoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgIH1cbiAgICBEZWZhdWx0SWZFbXB0eU9wZXJhdG9yLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKHN1YnNjcmliZXIsIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlLnN1YnNjcmliZShuZXcgRGVmYXVsdElmRW1wdHlTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMuZGVmYXVsdFZhbHVlKSk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmYXVsdElmRW1wdHlPcGVyYXRvcjtcbn0oKSk7XG52YXIgRGVmYXVsdElmRW1wdHlTdWJzY3JpYmVyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRGVmYXVsdElmRW1wdHlTdWJzY3JpYmVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERlZmF1bHRJZkVtcHR5U3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5kZWZhdWx0VmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgICAgIF90aGlzLmlzRW1wdHkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIERlZmF1bHRJZkVtcHR5U3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dCh2YWx1ZSk7XG4gICAgfTtcbiAgICBEZWZhdWx0SWZFbXB0eVN1YnNjcmliZXIucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbXB0eSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHRoaXMuZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLmNvbXBsZXRlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmYXVsdElmRW1wdHlTdWJzY3JpYmVyO1xufShTdWJzY3JpYmVyXzEuU3Vic2NyaWJlcikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGVmYXVsdElmRW1wdHkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc2Nhbl8xID0gcmVxdWlyZShcIi4vc2NhblwiKTtcbnZhciB0YWtlTGFzdF8xID0gcmVxdWlyZShcIi4vdGFrZUxhc3RcIik7XG52YXIgZGVmYXVsdElmRW1wdHlfMSA9IHJlcXVpcmUoXCIuL2RlZmF1bHRJZkVtcHR5XCIpO1xudmFyIHBpcGVfMSA9IHJlcXVpcmUoXCIuLi91dGlsL3BpcGVcIik7XG5mdW5jdGlvbiByZWR1Y2UoYWNjdW11bGF0b3IsIHNlZWQpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiByZWR1Y2VPcGVyYXRvckZ1bmN0aW9uV2l0aFNlZWQoc291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcGlwZV8xLnBpcGUoc2Nhbl8xLnNjYW4oYWNjdW11bGF0b3IsIHNlZWQpLCB0YWtlTGFzdF8xLnRha2VMYXN0KDEpLCBkZWZhdWx0SWZFbXB0eV8xLmRlZmF1bHRJZkVtcHR5KHNlZWQpKShzb3VyY2UpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gcmVkdWNlT3BlcmF0b3JGdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHBpcGVfMS5waXBlKHNjYW5fMS5zY2FuKGZ1bmN0aW9uIChhY2MsIHZhbHVlLCBpbmRleCkgeyByZXR1cm4gYWNjdW11bGF0b3IoYWNjLCB2YWx1ZSwgaW5kZXggKyAxKTsgfSksIHRha2VMYXN0XzEudGFrZUxhc3QoMSkpKHNvdXJjZSk7XG4gICAgfTtcbn1cbmV4cG9ydHMucmVkdWNlID0gcmVkdWNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVkdWNlLmpzLm1hcCIsImV4cG9ydHMucmVkdWNlID0gcmVxdWlyZSgncnhqcy9pbnRlcm5hbC9vcGVyYXRvcnMvcmVkdWNlJykucmVkdWNlXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJyksXG4gICAgT2JzZXJ2YWJsZSA9IF9yZXF1aXJlLk9ic2VydmFibGU7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCcuLi9vcGVyYXRvcnMvbWFwJyksXG4gICAgbWFwID0gX3JlcXVpcmUyLm1hcDtcblxudmFyIF9yZXF1aXJlMyA9IHJlcXVpcmUoJy4uL29wZXJhdG9ycy9maWx0ZXInKSxcbiAgICBmaWx0ZXIgPSBfcmVxdWlyZTMuZmlsdGVyO1xuXG52YXIgX3JlcXVpcmU0ID0gcmVxdWlyZSgnLi4vb3BlcmF0b3JzL3JlZHVjZScpLFxuICAgIHJlZHVjZSA9IF9yZXF1aXJlNC5yZWR1Y2U7XG4vKlxuIEEgbWluaW1hbCByeGpzIGJhc2VkIG9ic2VydmFibGUgdGhhdCBhbGlnbiBhcyBjbG9zZWx5IGFzIHBvc3NpYmxlIHdpdGggdGhlIGN1cnJlbnQgZXMtb2JzZXJ2YWJsZSBzcGVjLFxuIHdpdGhvdXQgdGhlIHN0YXRpYyBmYWN0b3J5IG1ldGhvZHNcbiAqL1xuXG5cbmZ1bmN0aW9uIFNhbml0eU9ic2VydmFibGVNaW5pbWFsKCkge1xuICBPYnNlcnZhYmxlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG59XG5cblNhbml0eU9ic2VydmFibGVNaW5pbWFsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIE9ic2VydmFibGUucHJvdG90eXBlKSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoU2FuaXR5T2JzZXJ2YWJsZU1pbmltYWwucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7XG4gIHZhbHVlOiBTYW5pdHlPYnNlcnZhYmxlTWluaW1hbCxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIHdyaXRhYmxlOiB0cnVlLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5TYW5pdHlPYnNlcnZhYmxlTWluaW1hbC5wcm90b3R5cGUubGlmdCA9IGZ1bmN0aW9uIGxpZnQob3BlcmF0b3IpIHtcbiAgdmFyIG9ic2VydmFibGUgPSBuZXcgU2FuaXR5T2JzZXJ2YWJsZU1pbmltYWwoKTtcbiAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gIHJldHVybiBvYnNlcnZhYmxlO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlRGVwcmVjYXRlZE1lbWJlck9wKG5hbWUsIG9wKSB7XG4gIHZhciBoYXNXYXJuZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uIGRlcHJlY2F0ZWRPcGVyYXRvcigpIHtcbiAgICBpZiAoIWhhc1dhcm5lZCkge1xuICAgICAgaGFzV2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUud2FybihuZXcgRXJyb3IoXCJDYWxsaW5nIG9ic2VydmFibGUuXCIuY29uY2F0KG5hbWUsIFwiKC4uLikgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBvYnNlcnZhYmxlLnBpcGUoXCIpLmNvbmNhdChuYW1lLCBcIiguLi4pKSBpbnN0ZWFkXCIpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGlwZShvcC5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuU2FuaXR5T2JzZXJ2YWJsZU1pbmltYWwucHJvdG90eXBlLm1hcCA9IGNyZWF0ZURlcHJlY2F0ZWRNZW1iZXJPcCgnbWFwJywgbWFwKTtcblNhbml0eU9ic2VydmFibGVNaW5pbWFsLnByb3RvdHlwZS5maWx0ZXIgPSBjcmVhdGVEZXByZWNhdGVkTWVtYmVyT3AoJ2ZpbHRlcicsIGZpbHRlcik7XG5TYW5pdHlPYnNlcnZhYmxlTWluaW1hbC5wcm90b3R5cGUucmVkdWNlID0gY3JlYXRlRGVwcmVjYXRlZE1lbWJlck9wKCdmaWx0ZXInLCByZWR1Y2UpO1xubW9kdWxlLmV4cG9ydHMgPSBTYW5pdHlPYnNlcnZhYmxlTWluaW1hbDsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL1Nhbml0eU9ic2VydmFibGVNaW5pbWFsJylcbiIsIi8qXG4gKiBFdmVudFNvdXJjZSBwb2x5ZmlsbFxuICogT3JpZ2luYWxseSBwdWJsaXNoZWQgYnkgc2MgQW12VGVrIHNybCAoaHR0cHM6Ly9naXRodWIuY29tL2FtdnRlay9FdmVudFNvdXJjZSkgLSBkZXZlbEBhbXZ0ZWsuY29tXG4gKiBGb3JrZWQgYnkgRXNwZW4gSG92bGFuZHNkYWwgdG8gZml4IGEgZmV3IGlzc3VlcyArIHB1Ymxpc2ggbGF0ZXN0IHZlcnNpb25cbiAqL1xuXG47KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIC8qIGdsb2JhbCBkZWZpbmUgKi9cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZShbXSwgZmFjdG9yeSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIGlmIChnbG9iYWwuRXZlbnRTb3VyY2UgJiYgIWdsb2JhbC5fZXZlbnRTb3VyY2VJbXBvcnRQcmVmaXgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBldnNJbXBvcnROYW1lID0gKHJvb3QuX2V2ZW50U291cmNlSW1wb3J0UHJlZml4IHx8ICcnKSArICdFdmVudFNvdXJjZSdcbiAgICByb290W2V2c0ltcG9ydE5hbWVdID0gZmFjdG9yeSgpXG4gIH1cbn0pKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyA/IHRoaXMgOiBzZWxmLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBFdmVudFNvdXJjZSA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXVybCB8fCB0eXBlb2YgdXJsICE9ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJylcbiAgICB9XG5cbiAgICB0aGlzLlVSTCA9IHVybFxuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIHZhciBldnMgPSB0aGlzXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBldnMucG9sbCgpXG4gICAgfSwgMClcbiAgfVxuXG4gIEV2ZW50U291cmNlLnByb3RvdHlwZSA9IHtcbiAgICBDT05ORUNUSU5HOiAwLFxuXG4gICAgT1BFTjogMSxcblxuICAgIENMT1NFRDogMixcblxuICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICBsb2dnaW5nRW5hYmxlZDogZmFsc2UsXG5cbiAgICAgIGxvZ2dpbmdQcmVmaXg6ICdldmVudHNvdXJjZScsXG5cbiAgICAgIGludGVydmFsOiA1MDAsIC8vIG1pbGxpc2Vjb25kc1xuXG4gICAgICBidWZmZXJTaXplTGltaXQ6IDI1NiAqIDEwMjQsIC8vIGJ5dGVzXG5cbiAgICAgIHNpbGVudFRpbWVvdXQ6IDMwMDAwMCwgLy8gbWlsbGlzZWNvbmRzXG5cbiAgICAgIGdldEFyZ3M6IHtcbiAgICAgICAgZXZzX2J1ZmZlcl9zaXplX2xpbWl0OiAyNTYgKiAxMDI0LFxuICAgICAgfSxcblxuICAgICAgeGhySGVhZGVyczoge1xuICAgICAgICBBY2NlcHQ6ICd0ZXh0L2V2ZW50LXN0cmVhbScsXG4gICAgICAgICdDYWNoZS1Db250cm9sJzogJ25vLWNhY2hlJyxcbiAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgc2V0T3B0aW9uczogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgIHZhciBkZWZhdWx0cyA9IHRoaXMuZGVmYXVsdE9wdGlvbnNcbiAgICAgIHZhciBvcHRpb25cblxuICAgICAgLy8gc2V0IGFsbCBkZWZhdWx0IG9wdGlvbnMuLi5cbiAgICAgIGZvciAob3B0aW9uIGluIGRlZmF1bHRzKSB7XG4gICAgICAgIGlmIChkZWZhdWx0cy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XG4gICAgICAgICAgdGhpc1tvcHRpb25dID0gZGVmYXVsdHNbb3B0aW9uXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG92ZXJyaWRlIHdpdGggd2hhdCBpcyBpbiBvcHRpb25zXG4gICAgICBmb3IgKG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb24gaW4gZGVmYXVsdHMgJiYgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XG4gICAgICAgICAgdGhpc1tvcHRpb25dID0gb3B0aW9uc1tvcHRpb25dXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gaWYgZ2V0QXJncyBvcHRpb24gaXMgZW5hYmxlZFxuICAgICAgLy8gZW5zdXJlIGV2c19idWZmZXJfc2l6ZV9saW1pdCBjb3JyZXNwb25kcyB0byBidWZmZXJTaXplTGltaXRcbiAgICAgIGlmICh0aGlzLmdldEFyZ3MgJiYgdGhpcy5idWZmZXJTaXplTGltaXQpIHtcbiAgICAgICAgdGhpcy5nZXRBcmdzLmV2c19idWZmZXJfc2l6ZV9saW1pdCA9IHRoaXMuYnVmZmVyU2l6ZUxpbWl0XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIGNvbnNvbGUgaXMgbm90IGF2YWlsYWJsZSwgZm9yY2UgbG9nZ2luZ0VuYWJsZWQgdG8gZmFsc2VcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5sb2dnaW5nRW5hYmxlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgfSxcblxuICAgIGxvZzogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLmxvZ2dpbmdFbmFibGVkKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUubG9nKCdbJyArIHRoaXMubG9nZ2luZ1ByZWZpeCArICddOicgKyBtZXNzYWdlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBwb2xsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IHRoaXMuQ0xPU0VEKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsZWFudXAoKVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSB0aGlzLkNPTk5FQ1RJTkdcbiAgICAgICAgdGhpcy5jdXJzb3IgPSAwXG4gICAgICAgIHRoaXMuY2FjaGUgPSAnJ1xuICAgICAgICB0aGlzLl94aHIgPSBuZXcgdGhpcy5YSFIodGhpcylcbiAgICAgICAgdGhpcy5yZXNldE5vQWN0aXZpdHlUaW1lcigpXG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gaW4gYW4gYXR0ZW1wdCB0byBzaWxlbmNlIHRoZSBlcnJvcnNcbiAgICAgICAgdGhpcy5sb2coJ1RoZXJlIHdlcmUgZXJyb3JzIGluc2lkZSB0aGUgcG9vbCB0cnktY2F0Y2gnKVxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2Vycm9yJywge3R5cGU6ICdlcnJvcicsIGRhdGE6IGVyci5tZXNzYWdlfSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcG9sbEFnYWluOiBmdW5jdGlvbiAoaW50ZXJ2YWwpIHtcbiAgICAgIC8vIHNjaGVkdWxlIHBvbGwgdG8gYmUgY2FsbGVkIGFmdGVyIGludGVydmFsIG1pbGxpc2Vjb25kc1xuICAgICAgdmFyIGV2cyA9IHRoaXNcbiAgICAgIGV2cy5yZWFkeVN0YXRlID0gZXZzLkNPTk5FQ1RJTkdcbiAgICAgIGV2cy5kaXNwYXRjaEV2ZW50KCdlcnJvcicsIHtcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgZGF0YTogJ1JlY29ubmVjdGluZyAnLFxuICAgICAgfSlcbiAgICAgIHRoaXMuX3BvbGxUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBldnMucG9sbCgpXG4gICAgICB9LCBpbnRlcnZhbCB8fCAwKVxuICAgIH0sXG5cbiAgICBjbGVhbnVwOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmxvZygnZXZzIGNsZWFuaW5nIHVwJylcblxuICAgICAgaWYgKHRoaXMuX3BvbGxUaW1lcikge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX3BvbGxUaW1lcilcbiAgICAgICAgdGhpcy5fcG9sbFRpbWVyID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fbm9BY3Rpdml0eVRpbWVyKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5fbm9BY3Rpdml0eVRpbWVyKVxuICAgICAgICB0aGlzLl9ub0FjdGl2aXR5VGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl94aHIpIHtcbiAgICAgICAgdGhpcy5feGhyLmFib3J0KClcbiAgICAgICAgdGhpcy5feGhyID0gbnVsbFxuICAgICAgfVxuICAgIH0sXG5cbiAgICByZXNldE5vQWN0aXZpdHlUaW1lcjogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc2lsZW50VGltZW91dCkge1xuICAgICAgICBpZiAodGhpcy5fbm9BY3Rpdml0eVRpbWVyKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9ub0FjdGl2aXR5VGltZXIpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2cyA9IHRoaXNcbiAgICAgICAgdGhpcy5fbm9BY3Rpdml0eVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXZzLmxvZygnVGltZW91dCEgc2lsZW50VEltZW91dDonICsgZXZzLnNpbGVudFRpbWVvdXQpXG4gICAgICAgICAgZXZzLnBvbGxBZ2FpbigpXG4gICAgICAgIH0sIHRoaXMuc2lsZW50VGltZW91dClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xvc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IHRoaXMuQ0xPU0VEXG4gICAgICB0aGlzLmxvZygnQ2xvc2luZyBjb25uZWN0aW9uLiByZWFkeVN0YXRlOiAnICsgdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgdGhpcy5jbGVhbnVwKClcbiAgICB9LFxuXG4gICAgX29ueGhyZGF0YTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlcXVlc3QgPSB0aGlzLl94aHJcblxuICAgICAgaWYgKHJlcXVlc3QuaXNSZWFkeSgpICYmICFyZXF1ZXN0Lmhhc0Vycm9yKCkpIHtcbiAgICAgICAgLy8gcmVzZXQgdGhlIHRpbWVyLCBhcyB3ZSBoYXZlIGFjdGl2aXR5XG4gICAgICAgIHRoaXMucmVzZXROb0FjdGl2aXR5VGltZXIoKVxuXG4gICAgICAgIC8vIG1vdmUgdGhpcyBFdmVudFNvdXJjZSB0byBPUEVOIHN0YXRlLi4uXG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gdGhpcy5DT05ORUNUSU5HKSB7XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gdGhpcy5PUEVOXG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCdvcGVuJywge3R5cGU6ICdvcGVuJ30pXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYnVmZmVyID0gcmVxdWVzdC5nZXRCdWZmZXIoKVxuXG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gdGhpcy5idWZmZXJTaXplTGltaXQpIHtcbiAgICAgICAgICB0aGlzLmxvZygnYnVmZmVyLmxlbmd0aCA+IHRoaXMuYnVmZmVyU2l6ZUxpbWl0JylcbiAgICAgICAgICB0aGlzLnBvbGxBZ2FpbigpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jdXJzb3IgPT0gMCAmJiBidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIHNraXAgYnl0ZSBvcmRlciBtYXJrIFxcdUZFRkYgY2hhcmFjdGVyIGlmIGl0IHN0YXJ0cyB0aGUgc3RyZWFtXG4gICAgICAgICAgaWYgKGJ1ZmZlci5zdWJzdHJpbmcoMCwgMSkgPT0gJ1xcdUZFRkYnKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnNvciA9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGFzdE1lc3NhZ2VJbmRleCA9IHRoaXMubGFzdE1lc3NhZ2VJbmRleChidWZmZXIpXG4gICAgICAgIGlmIChsYXN0TWVzc2FnZUluZGV4WzBdID49IHRoaXMuY3Vyc29yKSB7XG4gICAgICAgICAgdmFyIG5ld2N1cnNvciA9IGxhc3RNZXNzYWdlSW5kZXhbMV1cbiAgICAgICAgICB2YXIgdG9wYXJzZSA9IGJ1ZmZlci5zdWJzdHJpbmcodGhpcy5jdXJzb3IsIG5ld2N1cnNvcilcbiAgICAgICAgICB0aGlzLnBhcnNlU3RyZWFtKHRvcGFyc2UpXG4gICAgICAgICAgdGhpcy5jdXJzb3IgPSBuZXdjdXJzb3JcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHJlcXVlc3QgaXMgZmluaXNoZWQsIHJlb3BlbiB0aGUgY29ubmVjdGlvblxuICAgICAgICBpZiAocmVxdWVzdC5pc0RvbmUoKSkge1xuICAgICAgICAgIHRoaXMubG9nKCdyZXF1ZXN0LmlzRG9uZSgpLiByZW9wZW5pbmcgdGhlIGNvbm5lY3Rpb24nKVxuICAgICAgICAgIHRoaXMucG9sbEFnYWluKHRoaXMuaW50ZXJ2YWwpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSB0aGlzLkNMT1NFRCkge1xuICAgICAgICB0aGlzLmxvZygndGhpcy5yZWFkeVN0YXRlICE9PSB0aGlzLkNMT1NFRCcpXG4gICAgICAgIHRoaXMucG9sbEFnYWluKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICAgICAgLy9NVjogVW5zdXJlIHdoeSBhbiBlcnJvciB3YXMgcHJldmlvdXNseSBkaXNwYXRjaGVkXG4gICAgICB9XG4gICAgfSxcblxuICAgIHBhcnNlU3RyZWFtOiBmdW5jdGlvbiAoY2h1bmspIHtcbiAgICAgIC8vIG5vcm1hbGl6ZSBsaW5lIHNlcGFyYXRvcnMgKFxcclxcbixcXHIsXFxuKSB0byBcXG5cbiAgICAgIC8vIHJlbW92ZSB3aGl0ZSBzcGFjZXMgdGhhdCBtYXkgcHJlY2VkZSBcXG5cbiAgICAgIGNodW5rID0gdGhpcy5jYWNoZSArIHRoaXMubm9ybWFsaXplVG9MRihjaHVuaylcblxuICAgICAgdmFyIGV2ZW50cyA9IGNodW5rLnNwbGl0KCdcXG5cXG4nKVxuXG4gICAgICB2YXIgaSwgaiwgZXZlbnRUeXBlLCBkYXRhcywgbGluZSwgcmV0cnlcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgZXZlbnRUeXBlID0gJ21lc3NhZ2UnXG4gICAgICAgIGRhdGFzID0gW11cbiAgICAgICAgdmFyIHBhcnRzID0gZXZlbnRzW2ldLnNwbGl0KCdcXG4nKVxuXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGxpbmUgPSB0aGlzLnRyaW1XaGl0ZVNwYWNlKHBhcnRzW2pdKVxuXG4gICAgICAgICAgaWYgKGxpbmUuaW5kZXhPZignZXZlbnQnKSA9PSAwKSB7XG4gICAgICAgICAgICBldmVudFR5cGUgPSBsaW5lLnJlcGxhY2UoL2V2ZW50Oj9cXHMqLywgJycpXG4gICAgICAgICAgfSBlbHNlIGlmIChsaW5lLmluZGV4T2YoJ3JldHJ5JykgPT0gMCkge1xuICAgICAgICAgICAgcmV0cnkgPSBwYXJzZUludChsaW5lLnJlcGxhY2UoL3JldHJ5Oj9cXHMqLywgJycpLCAxMClcbiAgICAgICAgICAgIGlmICghaXNOYU4ocmV0cnkpKSB7XG4gICAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSByZXRyeVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAobGluZS5pbmRleE9mKCdkYXRhJykgPT0gMCkge1xuICAgICAgICAgICAgZGF0YXMucHVzaChsaW5lLnJlcGxhY2UoL2RhdGE6P1xccyovLCAnJykpXG4gICAgICAgICAgfSBlbHNlIGlmIChsaW5lLmluZGV4T2YoJ2lkOicpID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdEV2ZW50SWQgPSBsaW5lLnJlcGxhY2UoL2lkOj9cXHMqLywgJycpXG4gICAgICAgICAgfSBlbHNlIGlmIChsaW5lLmluZGV4T2YoJ2lkJykgPT0gMCkge1xuICAgICAgICAgICAgLy8gdGhpcyByZXNldHMgdGhlIGlkXG5cbiAgICAgICAgICAgIHRoaXMubGFzdEV2ZW50SWQgPSBudWxsXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGFzLmxlbmd0aCAmJiB0aGlzLnJlYWR5U3RhdGUgIT0gdGhpcy5DTE9TRUQpIHtcbiAgICAgICAgICAvLyBkaXNwYXRjaCBhIG5ldyBldmVudFxuICAgICAgICAgIHZhciBldmVudCA9IG5ldyBNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICBkYXRhcy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cubG9jYXRpb24gIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgICAgID8gd2luZG93LmxvY2F0aW9uLm9yaWdpblxuICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgICB0aGlzLmxhc3RFdmVudElkXG4gICAgICAgICAgKVxuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudFR5cGUsIGV2ZW50KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FjaGUgPSBldmVudHNbZXZlbnRzLmxlbmd0aCAtIDFdXG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXZlbnQ6IGZ1bmN0aW9uICh0eXBlLCBldmVudCkge1xuICAgICAgdmFyIGhhbmRsZXJzID0gdGhpc1snXycgKyB0eXBlICsgJ0hhbmRsZXJzJ11cblxuICAgICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBoYW5kbGVyc1tpXS5jYWxsKHRoaXMsIGV2ZW50KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzWydvbicgKyB0eXBlXSkge1xuICAgICAgICB0aGlzWydvbicgKyB0eXBlXS5jYWxsKHRoaXMsIGV2ZW50KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiAodHlwZSwgaGFuZGxlcikge1xuICAgICAgaWYgKCF0aGlzWydfJyArIHR5cGUgKyAnSGFuZGxlcnMnXSkge1xuICAgICAgICB0aGlzWydfJyArIHR5cGUgKyAnSGFuZGxlcnMnXSA9IFtdXG4gICAgICB9XG5cbiAgICAgIHRoaXNbJ18nICsgdHlwZSArICdIYW5kbGVycyddLnB1c2goaGFuZGxlcilcbiAgICB9LFxuXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgIHZhciBoYW5kbGVycyA9IHRoaXNbJ18nICsgdHlwZSArICdIYW5kbGVycyddXG4gICAgICBpZiAoIWhhbmRsZXJzKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGhhbmRsZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIGlmIChoYW5kbGVyc1tpXSA9PT0gaGFuZGxlcikge1xuICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShpLCAxKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgX3BvbGxUaW1lcjogbnVsbCxcblxuICAgIF9ub2FjdGl2aXR5VGltZXI6IG51bGwsXG5cbiAgICBfeGhyOiBudWxsLFxuXG4gICAgbGFzdEV2ZW50SWQ6IG51bGwsXG5cbiAgICBjYWNoZTogJycsXG5cbiAgICBjdXJzb3I6IDAsXG5cbiAgICBvbmVycm9yOiBudWxsLFxuXG4gICAgb25tZXNzYWdlOiBudWxsLFxuXG4gICAgb25vcGVuOiBudWxsLFxuXG4gICAgcmVhZHlTdGF0ZTogMCxcblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBoZWxwZXJzIGZ1bmN0aW9uc1xuICAgIC8vIHRob3NlIGFyZSBhdHRhY2hlZCB0byBwcm90b3R5cGUgdG8gZWFzZSByZXVzZSBhbmQgdGVzdGluZy4uLlxuXG4gICAgdXJsV2l0aFBhcmFtczogZnVuY3Rpb24gKGJhc2VVUkwsIHBhcmFtcykge1xuICAgICAgdmFyIGVuY29kZWRBcmdzID0gW11cblxuICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICB2YXIga2V5LCB1cmxhcmdcbiAgICAgICAgdmFyIHVybGl6ZSA9IGVuY29kZVVSSUNvbXBvbmVudFxuXG4gICAgICAgIGZvciAoa2V5IGluIHBhcmFtcykge1xuICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdXJsYXJnID0gdXJsaXplKGtleSkgKyAnPScgKyB1cmxpemUocGFyYW1zW2tleV0pXG4gICAgICAgICAgICBlbmNvZGVkQXJncy5wdXNoKHVybGFyZylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVuY29kZWRBcmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKGJhc2VVUkwuaW5kZXhPZignPycpID09IC0xKSByZXR1cm4gYmFzZVVSTCArICc/JyArIGVuY29kZWRBcmdzLmpvaW4oJyYnKVxuICAgICAgICByZXR1cm4gYmFzZVVSTCArICcmJyArIGVuY29kZWRBcmdzLmpvaW4oJyYnKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2VVUkxcbiAgICB9LFxuXG4gICAgbGFzdE1lc3NhZ2VJbmRleDogZnVuY3Rpb24gKHRleHQpIHtcbiAgICAgIHZhciBsbjIgPSB0ZXh0Lmxhc3RJbmRleE9mKCdcXG5cXG4nKVxuICAgICAgdmFyIGxyMiA9IHRleHQubGFzdEluZGV4T2YoJ1xcclxccicpXG4gICAgICB2YXIgbHJsbjIgPSB0ZXh0Lmxhc3RJbmRleE9mKCdcXHJcXG5cXHJcXG4nKVxuXG4gICAgICBpZiAobHJsbjIgPiBNYXRoLm1heChsbjIsIGxyMikpIHtcbiAgICAgICAgcmV0dXJuIFtscmxuMiwgbHJsbjIgKyA0XVxuICAgICAgfVxuICAgICAgcmV0dXJuIFtNYXRoLm1heChsbjIsIGxyMiksIE1hdGgubWF4KGxuMiwgbHIyKSArIDJdXG4gICAgfSxcblxuICAgIHRyaW1XaGl0ZVNwYWNlOiBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAvLyB0byByZW1vdmUgd2hpdGVzcGFjZXMgbGVmdCBhbmQgcmlnaHQgb2Ygc3RyaW5nXG5cbiAgICAgIHZhciByZVRyaW0gPSAvXihcXHN8XFx1MDBBMCkrfChcXHN8XFx1MDBBMCkrJC9nXG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVUcmltLCAnJylcbiAgICB9LFxuXG4gICAgbm9ybWFsaXplVG9MRjogZnVuY3Rpb24gKHN0cikge1xuICAgICAgLy8gcmVwbGFjZSBcXHIgYW5kIFxcclxcbiB3aXRoIFxcblxuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHJcXG58XFxyL2csICdcXG4nKVxuICAgIH0sXG4gIH1cblxuICBpZiAoaXNPbGRJRSgpKSB7XG4gICAgRXZlbnRTb3VyY2UuaXNQb2x5ZmlsbCA9ICdJRV84LTknXG5cbiAgICAvLyBwYXRjaCBFdmVudFNvdXJjZSBkZWZhdWx0T3B0aW9uc1xuICAgIHZhciBkZWZhdWx0cyA9IEV2ZW50U291cmNlLnByb3RvdHlwZS5kZWZhdWx0T3B0aW9uc1xuICAgIGRlZmF1bHRzLnhockhlYWRlcnMgPSBudWxsIC8vIG5vIGhlYWRlcnMgd2lsbCBiZSBzZW50XG4gICAgZGVmYXVsdHMuZ2V0QXJncy5ldnNfcHJlYW1ibGUgPSAyMDQ4ICsgOFxuXG4gICAgLy8gRXZlbnRTb3VyY2Ugd2lsbCBzZW5kIHJlcXVlc3QgdXNpbmcgSW50ZXJuZXQgRXhwbG9yZXIgWERvbWFpblJlcXVlc3RcbiAgICBFdmVudFNvdXJjZS5wcm90b3R5cGUuWEhSID0gZnVuY3Rpb24gKGV2cykge1xuICAgICAgLyogZ2xvYmFsIFhEb21haW5SZXF1ZXN0ICovXG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYRG9tYWluUmVxdWVzdCgpXG4gICAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdFxuXG4gICAgICAvLyBzZXQgaGFuZGxlcnNcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVxdWVzdC5fcmVhZHkgPSB0cnVlXG4gICAgICAgIGV2cy5fb254aHJkYXRhKClcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IHRydWVcbiAgICAgICAgZXZzLl9vbnhocmRhdGEoKVxuICAgICAgfVxuXG4gICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2ZhaWxlZCA9IHRydWVcbiAgICAgICAgZXZzLnJlYWR5U3RhdGUgPSBldnMuQ0xPU0VEXG4gICAgICAgIGV2cy5kaXNwYXRjaEV2ZW50KCdlcnJvcicsIHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIGRhdGE6ICdYRG9tYWluUmVxdWVzdCBlcnJvcicsXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9mYWlsZWQgPSB0cnVlXG4gICAgICAgIGV2cy5yZWFkeVN0YXRlID0gZXZzLkNMT1NFRFxuICAgICAgICBldnMuZGlzcGF0Y2hFdmVudCgnZXJyb3InLCB7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBkYXRhOiAnWERvbWFpblJlcXVlc3QgdGltZWQgb3V0JyxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgLy8gWERvbWFpblJlcXVlc3QgZG9lcyBub3QgYWxsb3cgc2V0dGluZyBjdXN0b20gaGVhZGVyc1xuICAgICAgLy8gSWYgRXZlbnRTb3VyY2UgaGFzIGVuYWJsZWQgdGhlIHVzZSBvZiBHRVQgYXJndW1lbnRzXG4gICAgICAvLyB3ZSBhZGQgcGFyYW1ldGVycyB0byBVUkwgc28gdGhhdCBzZXJ2ZXIgY2FuIGFkYXB0IHRoZSBzdHJlYW0uLi5cbiAgICAgIHZhciByZXFHZXRBcmdzID0ge31cbiAgICAgIGlmIChldnMuZ2V0QXJncykge1xuICAgICAgICAvLyBjb3B5IGV2cy5nZXRBcmdzIGluIHJlcUdldEFyZ3NcbiAgICAgICAgdmFyIGRlZmF1bHRBcmdzID0gZXZzLmdldEFyZ3NcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRBcmdzKSB7XG4gICAgICAgICAgaWYgKGRlZmF1bHRBcmdzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHJlcUdldEFyZ3Nba2V5XSA9IGRlZmF1bHRBcmdzW2tleV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2cy5sYXN0RXZlbnRJZCkge1xuICAgICAgICAgIHJlcUdldEFyZ3MuZXZzX2xhc3RfZXZlbnRfaWQgPSBldnMubGFzdEV2ZW50SWRcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gc2VuZCB0aGUgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIGV2cy51cmxXaXRoUGFyYW1zKGV2cy5VUkwsIHJlcUdldEFyZ3MpKVxuICAgICAgcmVxdWVzdC5zZW5kKClcbiAgICB9XG5cbiAgICBFdmVudFNvdXJjZS5wcm90b3R5cGUuWEhSLnByb3RvdHlwZSA9IHtcbiAgICAgIHVzZVhEb21haW5SZXF1ZXN0OiB0cnVlLFxuXG4gICAgICBfcmVxdWVzdDogbnVsbCxcblxuICAgICAgX3JlYWR5OiBmYWxzZSwgLy8gdHJ1ZSB3aGVuIHByb2dyZXNzIGV2ZW50cyBhcmUgZGlzcGF0Y2hlZFxuXG4gICAgICBfbG9hZGVkOiBmYWxzZSwgLy8gdHJ1ZSB3aGVuIHJlcXVlc3QgaGFzIGJlZW4gbG9hZGVkXG5cbiAgICAgIF9mYWlsZWQ6IGZhbHNlLCAvLyB0cnVlIGlmIHdoZW4gcmVxdWVzdCBpcyBpbiBlcnJvclxuXG4gICAgICBpc1JlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0Ll9yZWFkeVxuICAgICAgfSxcblxuICAgICAgaXNEb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0Ll9sb2FkZWRcbiAgICAgIH0sXG5cbiAgICAgIGhhc0Vycm9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZXF1ZXN0Ll9mYWlsZWRcbiAgICAgIH0sXG5cbiAgICAgIGdldEJ1ZmZlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcnYgPSAnJ1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJ2ID0gdGhpcy5fcmVxdWVzdC5yZXNwb25zZVRleHQgfHwgJydcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgLy8gaW50ZW50aW9uYWwgbm9vcFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydlxuICAgICAgfSxcblxuICAgICAgYWJvcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlcXVlc3QpIHtcbiAgICAgICAgICB0aGlzLl9yZXF1ZXN0LmFib3J0KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgRXZlbnRTb3VyY2UuaXNQb2x5ZmlsbCA9ICdYSFInXG5cbiAgICAvLyBFdmVudFNvdXJjZSB3aWxsIHNlbmQgcmVxdWVzdCB1c2luZyBYTUxIdHRwUmVxdWVzdFxuICAgIEV2ZW50U291cmNlLnByb3RvdHlwZS5YSFIgPSBmdW5jdGlvbiAoZXZzKSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICB0aGlzLl9yZXF1ZXN0ID0gcmVxdWVzdFxuICAgICAgZXZzLl94aHIgPSB0aGlzXG5cbiAgICAgIC8vIHNldCBoYW5kbGVyc1xuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPiAxICYmIGV2cy5yZWFkeVN0YXRlICE9IGV2cy5DTE9TRUQpIHtcbiAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAwIHx8IChyZXF1ZXN0LnN0YXR1cyA+PSAzMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApKSB7XG4gICAgICAgICAgICBldnMuX29ueGhyZGF0YSgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcXVlc3QuX2ZhaWxlZCA9IHRydWVcbiAgICAgICAgICAgIGV2cy5yZWFkeVN0YXRlID0gZXZzLkNMT1NFRFxuICAgICAgICAgICAgZXZzLmRpc3BhdGNoRXZlbnQoJ2Vycm9yJywge1xuICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICBkYXRhOiAnVGhlIHNlcnZlciByZXNwb25kZWQgd2l0aCAnICsgcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZXZzLmNsb3NlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBpbnRlbnRpb25hbCBub29wXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3Qub3BlbignR0VUJywgZXZzLnVybFdpdGhQYXJhbXMoZXZzLlVSTCwgZXZzLmdldEFyZ3MpLCB0cnVlKVxuXG4gICAgICB2YXIgaGVhZGVycyA9IGV2cy54aHJIZWFkZXJzIC8vIG1heWJlIG51bGxcbiAgICAgIGZvciAodmFyIGhlYWRlciBpbiBoZWFkZXJzKSB7XG4gICAgICAgIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KGhlYWRlcikpIHtcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBoZWFkZXJzW2hlYWRlcl0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChldnMubGFzdEV2ZW50SWQpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdMYXN0LUV2ZW50LUlkJywgZXZzLmxhc3RFdmVudElkKVxuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LnNlbmQoKVxuICAgIH1cblxuICAgIEV2ZW50U291cmNlLnByb3RvdHlwZS5YSFIucHJvdG90eXBlID0ge1xuICAgICAgdXNlWERvbWFpblJlcXVlc3Q6IGZhbHNlLFxuXG4gICAgICBfcmVxdWVzdDogbnVsbCxcblxuICAgICAgX2ZhaWxlZDogZmFsc2UsIC8vIHRydWUgaWYgd2UgaGF2ZSBoYWQgZXJyb3JzLi4uXG5cbiAgICAgIGlzUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QucmVhZHlTdGF0ZSA+PSAyXG4gICAgICB9LFxuXG4gICAgICBpc0RvbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcXVlc3QucmVhZHlTdGF0ZSA9PSA0XG4gICAgICB9LFxuXG4gICAgICBoYXNFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmFpbGVkIHx8IHRoaXMuX3JlcXVlc3Quc3RhdHVzID49IDQwMFxuICAgICAgfSxcblxuICAgICAgZ2V0QnVmZmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBydiA9ICcnXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcnYgPSB0aGlzLl9yZXF1ZXN0LnJlc3BvbnNlVGV4dCB8fCAnJ1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAvLyBpbnRlbnRpb25hbCBub29wXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ2XG4gICAgICB9LFxuXG4gICAgICBhYm9ydDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fcmVxdWVzdCkge1xuICAgICAgICAgIHRoaXMuX3JlcXVlc3QuYWJvcnQoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIE1lc3NhZ2VFdmVudCh0eXBlLCBkYXRhLCBvcmlnaW4sIGxhc3RFdmVudElkKSB7XG4gICAgdGhpcy5idWJibGVzID0gZmFsc2VcbiAgICB0aGlzLmNhbmNlbEJ1YmJsZSA9IGZhbHNlXG4gICAgdGhpcy5jYW5jZWxhYmxlID0gZmFsc2VcbiAgICB0aGlzLmRhdGEgPSBkYXRhIHx8IG51bGxcbiAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbiB8fCAnJ1xuICAgIHRoaXMubGFzdEV2ZW50SWQgPSBsYXN0RXZlbnRJZCB8fCAnJ1xuICAgIHRoaXMudHlwZSA9IHR5cGUgfHwgJ21lc3NhZ2UnXG4gIH1cblxuICBmdW5jdGlvbiBpc09sZElFKCkge1xuICAgIC8vcmV0dXJuIHRydWUgaWYgd2UgYXJlIGluIElFOCBvciBJRTlcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJlxuICAgICAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgJiZcbiAgICAgICAgbmV3IFhNTEh0dHBSZXF1ZXN0KCkucmVzcG9uc2VUeXBlID09PSB1bmRlZmluZWRcbiAgICApXG4gIH1cblxuICByZXR1cm4gRXZlbnRTb3VyY2Vcbn0pXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby12YXIgKi9cbnZhciBldnMgPSByZXF1aXJlKCdAcmV4eGFycy9ldmVudHNvdXJjZS1wb2x5ZmlsbCcpXG5cbm1vZHVsZS5leHBvcnRzID0gd2luZG93LkV2ZW50U291cmNlIHx8IGV2cy5FdmVudFNvdXJjZVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgcHJvcHMpIHtcbiAgcmV0dXJuIHByb3BzLnJlZHVjZShmdW5jdGlvbiAoc2VsZWN0aW9uLCBwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBvYmpbcHJvcF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gc2VsZWN0aW9uO1xuICAgIH1cblxuICAgIHNlbGVjdGlvbltwcm9wXSA9IG9ialtwcm9wXTtcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xuICB9LCB7fSk7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIGRlZmF1bHRzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhkZWZhdWx0cykuY29uY2F0KE9iamVjdC5rZXlzKG9iaikpLnJlZHVjZShmdW5jdGlvbiAodGFyZ2V0LCBwcm9wKSB7XG4gICAgdGFyZ2V0W3Byb3BdID0gdHlwZW9mIG9ialtwcm9wXSA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0c1twcm9wXSA6IG9ialtwcm9wXTtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LCB7fSk7XG59OyIsInZhciBiYXNlVXJsID0gJ2h0dHBzOi8vZG9jcy5zYW5pdHkuaW8vaGVscC8nXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2VuZXJhdGVIZWxwVXJsKHNsdWcpIHtcbiAgcmV0dXJuIGJhc2VVcmwgKyBzbHVnXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGRpZENhbGwgPSBmYWxzZTtcbiAgdmFyIHJldHVyblZhbHVlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChkaWRDYWxsKSB7XG4gICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuVmFsdWUgPSBmbi5hcHBseSh2b2lkIDAsIGFyZ3VtZW50cyk7XG4gICAgZGlkQ2FsbCA9IHRydWU7XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIE9ic2VydmFibGUgPSByZXF1aXJlKCdAc2FuaXR5L29ic2VydmFibGUvbWluaW1hbCcpO1xuXG52YXIgcG9seWZpbGxlZEV2ZW50U291cmNlID0gcmVxdWlyZSgnQHNhbml0eS9ldmVudHNvdXJjZScpO1xuXG52YXIgcGljayA9IHJlcXVpcmUoJy4uL3V0aWwvcGljaycpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi91dGlsL2RlZmF1bHRzJyk7XG5cbnZhciBlbmNvZGVRdWVyeVN0cmluZyA9IHJlcXVpcmUoJy4vZW5jb2RlUXVlcnlTdHJpbmcnKTtcblxudmFyIGdlbmVyYXRlSGVscFVybCA9IHJlcXVpcmUoJ0BzYW5pdHkvZ2VuZXJhdGUtaGVscC11cmwnKTtcblxudmFyIG9uY2UgPSByZXF1aXJlKCcuLi91dGlsL29uY2UnKTtcblxudmFyIHRva2VuV2FybmluZyA9IFsnVXNpbmcgdG9rZW4gd2l0aCBsaXN0ZW5lcnMgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2Vycy4gJywgXCJGb3IgbW9yZSBpbmZvLCBzZWUgXCIuY29uY2F0KGdlbmVyYXRlSGVscFVybCgnanMtY2xpZW50LWxpc3RlbmVyLXRva2Vucy1icm93c2VyJyksIFwiLlwiKV07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cbnZhciBwcmludFRva2VuV2FybmluZyA9IG9uY2UoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY29uc29sZS53YXJuKHRva2VuV2FybmluZy5qb2luKCcgJykpO1xufSk7XG52YXIgaXNXaW5kb3dFdmVudFNvdXJjZSA9IEJvb2xlYW4odHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkV2ZW50U291cmNlKTtcbnZhciBFdmVudFNvdXJjZSA9IGlzV2luZG93RXZlbnRTb3VyY2UgPyB3aW5kb3cuRXZlbnRTb3VyY2UgLy8gTmF0aXZlIGJyb3dzZXIgRXZlbnRTb3VyY2VcbjogcG9seWZpbGxlZEV2ZW50U291cmNlOyAvLyBOb2RlLmpzLCBJRSBldGNcblxudmFyIHBvc3NpYmxlT3B0aW9ucyA9IFsnaW5jbHVkZVByZXZpb3VzUmV2aXNpb24nLCAnaW5jbHVkZVJlc3VsdCcsICd2aXNpYmlsaXR5JywgJ2VmZmVjdEZvcm1hdCddO1xudmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICBpbmNsdWRlUmVzdWx0OiB0cnVlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RlbihxdWVyeSwgcGFyYW1zKSB7XG4gIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgdmFyIG9wdGlvbnMgPSBkZWZhdWx0cyhvcHRzLCBkZWZhdWx0T3B0aW9ucyk7XG4gIHZhciBsaXN0ZW5PcHRzID0gcGljayhvcHRpb25zLCBwb3NzaWJsZU9wdGlvbnMpO1xuICB2YXIgcXMgPSBlbmNvZGVRdWVyeVN0cmluZyh7XG4gICAgcXVlcnk6IHF1ZXJ5LFxuICAgIHBhcmFtczogcGFyYW1zLFxuICAgIG9wdGlvbnM6IGxpc3Rlbk9wdHNcbiAgfSk7XG4gIHZhciBfdGhpcyRjbGllbnRDb25maWcgPSB0aGlzLmNsaWVudENvbmZpZyxcbiAgICAgIHVybCA9IF90aGlzJGNsaWVudENvbmZpZy51cmwsXG4gICAgICB0b2tlbiA9IF90aGlzJGNsaWVudENvbmZpZy50b2tlbixcbiAgICAgIHdpdGhDcmVkZW50aWFscyA9IF90aGlzJGNsaWVudENvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gIHZhciB1cmkgPSBcIlwiLmNvbmNhdCh1cmwpLmNvbmNhdCh0aGlzLmdldERhdGFVcmwoJ2xpc3RlbicsIHFzKSk7XG4gIHZhciBsaXN0ZW5Gb3IgPSBvcHRpb25zLmV2ZW50cyA/IG9wdGlvbnMuZXZlbnRzIDogWydtdXRhdGlvbiddO1xuICB2YXIgc2hvdWxkRW1pdFJlY29ubmVjdCA9IGxpc3RlbkZvci5pbmRleE9mKCdyZWNvbm5lY3QnKSAhPT0gLTE7XG5cbiAgaWYgKHRva2VuICYmIGlzV2luZG93RXZlbnRTb3VyY2UpIHtcbiAgICBwcmludFRva2VuV2FybmluZygpO1xuICB9XG5cbiAgdmFyIGVzT3B0aW9ucyA9IHt9O1xuXG4gIGlmICh0b2tlbiB8fCB3aXRoQ3JlZGVudGlhbHMpIHtcbiAgICBlc09wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0b2tlbikge1xuICAgIGVzT3B0aW9ucy5oZWFkZXJzID0ge1xuICAgICAgQXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIuY29uY2F0KHRva2VuKVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgdmFyIGVzID0gZ2V0RXZlbnRTb3VyY2UoKTtcbiAgICB2YXIgcmVjb25uZWN0VGltZXI7XG4gICAgdmFyIHN0b3BwZWQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIG9uRXJyb3IoKSB7XG4gICAgICBpZiAoc3RvcHBlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGVtaXRSZWNvbm5lY3QoKTsgLy8gQWxsb3cgZXZlbnQgaGFuZGxlcnMgb2YgYGVtaXRSZWNvbm5lY3RgIHRvIGNhbmNlbC9jbG9zZSB0aGUgcmVjb25uZWN0IGF0dGVtcHRcblxuICAgICAgaWYgKHN0b3BwZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBVbmxlc3Mgd2UndmUgZXhwbGljaXRseSBzdG9wcGVkIHRoZSBFUyAoaW4gd2hpY2ggY2FzZSBgc3RvcHBlZGAgc2hvdWxkIGJlIHRydWUpLFxuICAgICAgLy8gd2Ugc2hvdWxkIG5ldmVyIGJlIGluIGEgZGlzY29ubmVjdGVkIHN0YXRlLiBCeSBkZWZhdWx0LCBFdmVudFNvdXJjZSB3aWxsIHJlY29ubmVjdFxuICAgICAgLy8gYXV0b21hdGljYWxseSwgaW4gd2hpY2ggY2FzZSBpdCBzZXRzIHJlYWR5U3RhdGUgdG8gYENPTk5FQ1RJTkdgLCBidXQgaW4gc29tZSBjYXNlc1xuICAgICAgLy8gKGxpa2Ugd2hlbiBhIGxhcHRvcCBsaWQgaXMgY2xvc2VkKSwgaXQgY2xvc2VzIHRoZSBjb25uZWN0aW9uLiBJbiB0aGVzZSBjYXNlcyB3ZSBuZWVkXG4gICAgICAvLyB0byBleHBsaWNpdGx5IHJlY29ubmVjdC5cblxuXG4gICAgICBpZiAoZXMucmVhZHlTdGF0ZSA9PT0gRXZlbnRTb3VyY2UuQ0xPU0VEKSB7XG4gICAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgICAgIGNsZWFyVGltZW91dChyZWNvbm5lY3RUaW1lcik7XG4gICAgICAgIHJlY29ubmVjdFRpbWVyID0gc2V0VGltZW91dChvcGVuLCAxMDApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uQ2hhbm5lbEVycm9yKGVycikge1xuICAgICAgb2JzZXJ2ZXIuZXJyb3IoY29vZXJjZUVycm9yKGVycikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWVzc2FnZShldnQpIHtcbiAgICAgIHZhciBldmVudCA9IHBhcnNlRXZlbnQoZXZ0KTtcbiAgICAgIHJldHVybiBldmVudCBpbnN0YW5jZW9mIEVycm9yID8gb2JzZXJ2ZXIuZXJyb3IoZXZlbnQpIDogb2JzZXJ2ZXIubmV4dChldmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25EaXNjb25uZWN0KGV2dCkge1xuICAgICAgc3RvcHBlZCA9IHRydWU7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGVzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvciwgZmFsc2UpO1xuICAgICAgZXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbm5lbEVycm9yJywgb25DaGFubmVsRXJyb3IsIGZhbHNlKTtcbiAgICAgIGVzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Rpc2Nvbm5lY3QnLCBvbkRpc2Nvbm5lY3QsIGZhbHNlKTtcbiAgICAgIGxpc3RlbkZvci5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHJldHVybiBlcy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIG9uTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICBlcy5jbG9zZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXRSZWNvbm5lY3QoKSB7XG4gICAgICBpZiAoc2hvdWxkRW1pdFJlY29ubmVjdCkge1xuICAgICAgICBvYnNlcnZlci5uZXh0KHtcbiAgICAgICAgICB0eXBlOiAncmVjb25uZWN0J1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFdmVudFNvdXJjZSgpIHtcbiAgICAgIHZhciBldnMgPSBuZXcgRXZlbnRTb3VyY2UodXJpLCBlc09wdGlvbnMpO1xuICAgICAgZXZzLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvciwgZmFsc2UpO1xuICAgICAgZXZzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5uZWxFcnJvcicsIG9uQ2hhbm5lbEVycm9yLCBmYWxzZSk7XG4gICAgICBldnMuYWRkRXZlbnRMaXN0ZW5lcignZGlzY29ubmVjdCcsIG9uRGlzY29ubmVjdCwgZmFsc2UpO1xuICAgICAgbGlzdGVuRm9yLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGV2cy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIG9uTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZXZzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICBlcyA9IGdldEV2ZW50U291cmNlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHN0b3BwZWQgPSB0cnVlO1xuICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RvcDtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBwYXJzZUV2ZW50KGV2ZW50KSB7XG4gIHRyeSB7XG4gICAgdmFyIGRhdGEgPSBldmVudC5kYXRhICYmIEpTT04ucGFyc2UoZXZlbnQuZGF0YSkgfHwge307XG4gICAgcmV0dXJuIGFzc2lnbih7XG4gICAgICB0eXBlOiBldmVudC50eXBlXG4gICAgfSwgZGF0YSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBlcnI7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29vZXJjZUVycm9yKGVycikge1xuICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG5cbiAgdmFyIGV2dCA9IHBhcnNlRXZlbnQoZXJyKTtcbiAgcmV0dXJuIGV2dCBpbnN0YW5jZW9mIEVycm9yID8gZXZ0IDogbmV3IEVycm9yKGV4dHJhY3RFcnJvck1lc3NhZ2UoZXZ0KSk7XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RFcnJvck1lc3NhZ2UoZXJyKSB7XG4gIGlmICghZXJyLmVycm9yKSB7XG4gICAgcmV0dXJuIGVyci5tZXNzYWdlIHx8ICdVbmtub3duIGxpc3RlbmVyIGVycm9yJztcbiAgfVxuXG4gIGlmIChlcnIuZXJyb3IuZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gZXJyLmVycm9yLmRlc2NyaXB0aW9uO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiBlcnIuZXJyb3IgPT09ICdzdHJpbmcnID8gZXJyLmVycm9yIDogSlNPTi5zdHJpbmdpZnkoZXJyLmVycm9yLCBudWxsLCAyKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIF9yZXF1aXJlID0gcmVxdWlyZSgnQHNhbml0eS9vYnNlcnZhYmxlL29wZXJhdG9ycy9maWx0ZXInKSxcbiAgICBmaWx0ZXIgPSBfcmVxdWlyZS5maWx0ZXI7XG5cbnZhciBfcmVxdWlyZTIgPSByZXF1aXJlKCdAc2FuaXR5L29ic2VydmFibGUvb3BlcmF0b3JzL21hcCcpLFxuICAgIG1hcCA9IF9yZXF1aXJlMi5tYXA7XG5cbnZhciB2YWxpZGF0b3JzID0gcmVxdWlyZSgnLi4vdmFsaWRhdG9ycycpO1xuXG52YXIgZ2V0U2VsZWN0aW9uID0gcmVxdWlyZSgnLi4vdXRpbC9nZXRTZWxlY3Rpb24nKTtcblxudmFyIGVuY29kZVF1ZXJ5U3RyaW5nID0gcmVxdWlyZSgnLi9lbmNvZGVRdWVyeVN0cmluZycpO1xuXG52YXIgVHJhbnNhY3Rpb24gPSByZXF1aXJlKCcuL3RyYW5zYWN0aW9uJyk7XG5cbnZhciBQYXRjaCA9IHJlcXVpcmUoJy4vcGF0Y2gnKTtcblxudmFyIGxpc3RlbiA9IHJlcXVpcmUoJy4vbGlzdGVuJyk7XG5cbnZhciBleGNsdWRlRmFsc2V5ID0gZnVuY3Rpb24gZXhjbHVkZUZhbHNleShwYXJhbSwgZGVmVmFsdWUpIHtcbiAgdmFyIHZhbHVlID0gdHlwZW9mIHBhcmFtID09PSAndW5kZWZpbmVkJyA/IGRlZlZhbHVlIDogcGFyYW07XG4gIHJldHVybiBwYXJhbSA9PT0gZmFsc2UgPyB1bmRlZmluZWQgOiB2YWx1ZTtcbn07XG5cbnZhciBnZXRNdXRhdGlvblF1ZXJ5ID0gZnVuY3Rpb24gZ2V0TXV0YXRpb25RdWVyeSgpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICByZXR1cm4ge1xuICAgIHJldHVybklkczogdHJ1ZSxcbiAgICByZXR1cm5Eb2N1bWVudHM6IGV4Y2x1ZGVGYWxzZXkob3B0aW9ucy5yZXR1cm5Eb2N1bWVudHMsIHRydWUpLFxuICAgIHZpc2liaWxpdHk6IG9wdGlvbnMudmlzaWJpbGl0eSB8fCAnc3luYydcbiAgfTtcbn07XG5cbnZhciBpc1Jlc3BvbnNlID0gZnVuY3Rpb24gaXNSZXNwb25zZShldmVudCkge1xuICByZXR1cm4gZXZlbnQudHlwZSA9PT0gJ3Jlc3BvbnNlJztcbn07XG5cbnZhciBnZXRCb2R5ID0gZnVuY3Rpb24gZ2V0Qm9keShldmVudCkge1xuICByZXR1cm4gZXZlbnQuYm9keTtcbn07XG5cbnZhciBpbmRleEJ5ID0gZnVuY3Rpb24gaW5kZXhCeShkb2NzLCBhdHRyKSB7XG4gIHJldHVybiBkb2NzLnJlZHVjZShmdW5jdGlvbiAoaW5kZXhlZCwgZG9jKSB7XG4gICAgaW5kZXhlZFthdHRyKGRvYyldID0gZG9jO1xuICAgIHJldHVybiBpbmRleGVkO1xuICB9LCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbn07XG5cbnZhciB0b1Byb21pc2UgPSBmdW5jdGlvbiB0b1Byb21pc2Uob2JzZXJ2YWJsZSkge1xuICByZXR1cm4gb2JzZXJ2YWJsZS50b1Byb21pc2UoKTtcbn07XG5cbnZhciBnZXRRdWVyeVNpemVMaW1pdCA9IDExMjY0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxpc3RlbjogbGlzdGVuLFxuICBnZXREYXRhVXJsOiBmdW5jdGlvbiBnZXREYXRhVXJsKG9wZXJhdGlvbiwgcGF0aCkge1xuICAgIHZhciBjb25maWcgPSB0aGlzLmNsaWVudENvbmZpZztcbiAgICB2YXIgY2F0YWxvZyA9IGNvbmZpZy5ncmFkaWVudE1vZGUgPyBjb25maWcubmFtZXNwYWNlIDogdmFsaWRhdG9ycy5oYXNEYXRhc2V0KGNvbmZpZyk7XG4gICAgdmFyIGJhc2VVcmkgPSBcIi9cIi5jb25jYXQob3BlcmF0aW9uLCBcIi9cIikuY29uY2F0KGNhdGFsb2cpO1xuICAgIHZhciB1cmkgPSBwYXRoID8gXCJcIi5jb25jYXQoYmFzZVVyaSwgXCIvXCIpLmNvbmNhdChwYXRoKSA6IGJhc2VVcmk7XG4gICAgcmV0dXJuICh0aGlzLmNsaWVudENvbmZpZy5ncmFkaWVudE1vZGUgPyB1cmkgOiBcIi9kYXRhXCIuY29uY2F0KHVyaSkpLnJlcGxhY2UoL1xcLygkfFxcPykvLCAnJDEnKTtcbiAgfSxcbiAgZmV0Y2g6IGZ1bmN0aW9uIGZldGNoKHF1ZXJ5LCBwYXJhbXMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgdmFyIG1hcFJlc3BvbnNlID0gb3B0aW9ucy5maWx0ZXJSZXNwb25zZSA9PT0gZmFsc2UgPyBmdW5jdGlvbiAocmVzKSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0gOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICByZXR1cm4gcmVzLnJlc3VsdDtcbiAgICB9O1xuXG4gICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLl9kYXRhUmVxdWVzdCgncXVlcnknLCB7XG4gICAgICBxdWVyeTogcXVlcnksXG4gICAgICBwYXJhbXM6IHBhcmFtc1xuICAgIH0sIG9wdGlvbnMpLnBpcGUobWFwKG1hcFJlc3BvbnNlKSk7XG5cbiAgICByZXR1cm4gdGhpcy5pc1Byb21pc2VBUEkoKSA/IHRvUHJvbWlzZShvYnNlcnZhYmxlKSA6IG9ic2VydmFibGU7XG4gIH0sXG4gIGdldERvY3VtZW50OiBmdW5jdGlvbiBnZXREb2N1bWVudChpZCkge1xuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdXJpOiB0aGlzLmdldERhdGFVcmwoJ2RvYycsIGlkKSxcbiAgICAgIGpzb246IHRydWVcbiAgICB9O1xuXG4gICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLl9yZXF1ZXN0T2JzZXJ2YWJsZShvcHRpb25zKS5waXBlKGZpbHRlcihpc1Jlc3BvbnNlKSwgbWFwKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LmJvZHkuZG9jdW1lbnRzICYmIGV2ZW50LmJvZHkuZG9jdW1lbnRzWzBdO1xuICAgIH0pKTtcblxuICAgIHJldHVybiB0aGlzLmlzUHJvbWlzZUFQSSgpID8gdG9Qcm9taXNlKG9ic2VydmFibGUpIDogb2JzZXJ2YWJsZTtcbiAgfSxcbiAgZ2V0RG9jdW1lbnRzOiBmdW5jdGlvbiBnZXREb2N1bWVudHMoaWRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICB1cmk6IHRoaXMuZ2V0RGF0YVVybCgnZG9jJywgaWRzLmpvaW4oJywnKSksXG4gICAgICBqc29uOiB0cnVlXG4gICAgfTtcblxuICAgIHZhciBvYnNlcnZhYmxlID0gdGhpcy5fcmVxdWVzdE9ic2VydmFibGUob3B0aW9ucykucGlwZShmaWx0ZXIoaXNSZXNwb25zZSksIG1hcChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHZhciBpbmRleGVkID0gaW5kZXhCeShldmVudC5ib2R5LmRvY3VtZW50cyB8fCBbXSwgZnVuY3Rpb24gKGRvYykge1xuICAgICAgICByZXR1cm4gZG9jLl9pZDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGlkcy5tYXAoZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiBpbmRleGVkW2lkXSB8fCBudWxsO1xuICAgICAgfSk7XG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHRoaXMuaXNQcm9taXNlQVBJKCkgPyB0b1Byb21pc2Uob2JzZXJ2YWJsZSkgOiBvYnNlcnZhYmxlO1xuICB9LFxuICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZShkb2MsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlKGRvYywgJ2NyZWF0ZScsIG9wdGlvbnMpO1xuICB9LFxuICBjcmVhdGVJZk5vdEV4aXN0czogZnVuY3Rpb24gY3JlYXRlSWZOb3RFeGlzdHMoZG9jLCBvcHRpb25zKSB7XG4gICAgdmFsaWRhdG9ycy5yZXF1aXJlRG9jdW1lbnRJZCgnY3JlYXRlSWZOb3RFeGlzdHMnLCBkb2MpO1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGUoZG9jLCAnY3JlYXRlSWZOb3RFeGlzdHMnLCBvcHRpb25zKTtcbiAgfSxcbiAgY3JlYXRlT3JSZXBsYWNlOiBmdW5jdGlvbiBjcmVhdGVPclJlcGxhY2UoZG9jLCBvcHRpb25zKSB7XG4gICAgdmFsaWRhdG9ycy5yZXF1aXJlRG9jdW1lbnRJZCgnY3JlYXRlT3JSZXBsYWNlJywgZG9jKTtcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlKGRvYywgJ2NyZWF0ZU9yUmVwbGFjZScsIG9wdGlvbnMpO1xuICB9LFxuICBwYXRjaDogZnVuY3Rpb24gcGF0Y2goc2VsZWN0b3IsIG9wZXJhdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFBhdGNoKHNlbGVjdG9yLCBvcGVyYXRpb25zLCB0aGlzKTtcbiAgfSxcbiAgZGVsZXRlOiBmdW5jdGlvbiBfZGVsZXRlKHNlbGVjdGlvbiwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLmRhdGFSZXF1ZXN0KCdtdXRhdGUnLCB7XG4gICAgICBtdXRhdGlvbnM6IFt7XG4gICAgICAgIGRlbGV0ZTogZ2V0U2VsZWN0aW9uKHNlbGVjdGlvbilcbiAgICAgIH1dXG4gICAgfSwgb3B0aW9ucyk7XG4gIH0sXG4gIG11dGF0ZTogZnVuY3Rpb24gbXV0YXRlKG11dGF0aW9ucywgb3B0aW9ucykge1xuICAgIHZhciBtdXQgPSBtdXRhdGlvbnMgaW5zdGFuY2VvZiBQYXRjaCB8fCBtdXRhdGlvbnMgaW5zdGFuY2VvZiBUcmFuc2FjdGlvbiA/IG11dGF0aW9ucy5zZXJpYWxpemUoKSA6IG11dGF0aW9ucztcbiAgICB2YXIgbXV0cyA9IEFycmF5LmlzQXJyYXkobXV0KSA/IG11dCA6IFttdXRdO1xuICAgIHZhciB0cmFuc2FjdGlvbklkID0gb3B0aW9ucyAmJiBvcHRpb25zLnRyYW5zYWN0aW9uSWQ7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVJlcXVlc3QoJ211dGF0ZScsIHtcbiAgICAgIG11dGF0aW9uczogbXV0cyxcbiAgICAgIHRyYW5zYWN0aW9uSWQ6IHRyYW5zYWN0aW9uSWRcbiAgICB9LCBvcHRpb25zKTtcbiAgfSxcbiAgdHJhbnNhY3Rpb246IGZ1bmN0aW9uIHRyYW5zYWN0aW9uKG9wZXJhdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKG9wZXJhdGlvbnMsIHRoaXMpO1xuICB9LFxuICBkYXRhUmVxdWVzdDogZnVuY3Rpb24gZGF0YVJlcXVlc3QoZW5kcG9pbnQsIGJvZHkpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG5cbiAgICB2YXIgcmVxdWVzdCA9IHRoaXMuX2RhdGFSZXF1ZXN0KGVuZHBvaW50LCBib2R5LCBvcHRpb25zKTtcblxuICAgIHJldHVybiB0aGlzLmlzUHJvbWlzZUFQSSgpID8gdG9Qcm9taXNlKHJlcXVlc3QpIDogcmVxdWVzdDtcbiAgfSxcbiAgX2RhdGFSZXF1ZXN0OiBmdW5jdGlvbiBfZGF0YVJlcXVlc3QoZW5kcG9pbnQsIGJvZHkpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgdmFyIGlzTXV0YXRpb24gPSBlbmRwb2ludCA9PT0gJ211dGF0ZSc7IC8vIENoZWNrIGlmIHRoZSBxdWVyeSBzdHJpbmcgaXMgd2l0aGluIGEgY29uZmlndXJlZCB0aHJlc2hvbGQsXG4gICAgLy8gaW4gd2hpY2ggY2FzZSB3ZSBjYW4gdXNlIEdFVC4gT3RoZXJ3aXNlLCB1c2UgUE9TVC5cblxuICAgIHZhciBzdHJRdWVyeSA9ICFpc011dGF0aW9uICYmIGVuY29kZVF1ZXJ5U3RyaW5nKGJvZHkpO1xuICAgIHZhciB1c2VHZXQgPSAhaXNNdXRhdGlvbiAmJiBzdHJRdWVyeS5sZW5ndGggPCBnZXRRdWVyeVNpemVMaW1pdDtcbiAgICB2YXIgc3RyaW5nUXVlcnkgPSB1c2VHZXQgPyBzdHJRdWVyeSA6ICcnO1xuICAgIHZhciByZXR1cm5GaXJzdCA9IG9wdGlvbnMucmV0dXJuRmlyc3Q7XG4gICAgdmFyIHRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQsXG4gICAgICAgIHRva2VuID0gb3B0aW9ucy50b2tlbjtcbiAgICB2YXIgdXJpID0gdGhpcy5nZXREYXRhVXJsKGVuZHBvaW50LCBzdHJpbmdRdWVyeSk7XG4gICAgdmFyIHJlcU9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6IHVzZUdldCA/ICdHRVQnIDogJ1BPU1QnLFxuICAgICAgdXJpOiB1cmksXG4gICAgICBqc29uOiB0cnVlLFxuICAgICAgYm9keTogdXNlR2V0ID8gdW5kZWZpbmVkIDogYm9keSxcbiAgICAgIHF1ZXJ5OiBpc011dGF0aW9uICYmIGdldE11dGF0aW9uUXVlcnkob3B0aW9ucyksXG4gICAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgICAgdG9rZW46IHRva2VuXG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWVzdE9ic2VydmFibGUocmVxT3B0aW9ucykucGlwZShmaWx0ZXIoaXNSZXNwb25zZSksIG1hcChnZXRCb2R5KSwgbWFwKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIGlmICghaXNNdXRhdGlvbikge1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSAvLyBTaG91bGQgd2UgcmV0dXJuIGRvY3VtZW50cz9cblxuXG4gICAgICB2YXIgcmVzdWx0cyA9IHJlcy5yZXN1bHRzIHx8IFtdO1xuXG4gICAgICBpZiAob3B0aW9ucy5yZXR1cm5Eb2N1bWVudHMpIHtcbiAgICAgICAgcmV0dXJuIHJldHVybkZpcnN0ID8gcmVzdWx0c1swXSAmJiByZXN1bHRzWzBdLmRvY3VtZW50IDogcmVzdWx0cy5tYXAoZnVuY3Rpb24gKG11dCkge1xuICAgICAgICAgIHJldHVybiBtdXQuZG9jdW1lbnQ7XG4gICAgICAgIH0pO1xuICAgICAgfSAvLyBSZXR1cm4gYSByZWR1Y2VkIHN1YnNldFxuXG5cbiAgICAgIHZhciBrZXkgPSByZXR1cm5GaXJzdCA/ICdkb2N1bWVudElkJyA6ICdkb2N1bWVudElkcyc7XG4gICAgICB2YXIgaWRzID0gcmV0dXJuRmlyc3QgPyByZXN1bHRzWzBdICYmIHJlc3VsdHNbMF0uaWQgOiByZXN1bHRzLm1hcChmdW5jdGlvbiAobXV0KSB7XG4gICAgICAgIHJldHVybiBtdXQuaWQ7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBfZGVmaW5lUHJvcGVydHkoe1xuICAgICAgICB0cmFuc2FjdGlvbklkOiByZXMudHJhbnNhY3Rpb25JZCxcbiAgICAgICAgcmVzdWx0czogcmVzdWx0c1xuICAgICAgfSwga2V5LCBpZHMpO1xuICAgIH0pKTtcbiAgfSxcbiAgX2NyZWF0ZTogZnVuY3Rpb24gX2NyZWF0ZShkb2MsIG9wKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXG4gICAgdmFyIG11dGF0aW9uID0gX2RlZmluZVByb3BlcnR5KHt9LCBvcCwgZG9jKTtcblxuICAgIHZhciBvcHRzID0gYXNzaWduKHtcbiAgICAgIHJldHVybkZpcnN0OiB0cnVlLFxuICAgICAgcmV0dXJuRG9jdW1lbnRzOiB0cnVlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVJlcXVlc3QoJ211dGF0ZScsIHtcbiAgICAgIG11dGF0aW9uczogW211dGF0aW9uXVxuICAgIH0sIG9wdHMpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuLi92YWxpZGF0b3JzJyk7XG5cbmZ1bmN0aW9uIERhdGFzZXRzQ2xpZW50KGNsaWVudCkge1xuICB0aGlzLnJlcXVlc3QgPSBjbGllbnQucmVxdWVzdC5iaW5kKGNsaWVudCk7XG59XG5cbmFzc2lnbihEYXRhc2V0c0NsaWVudC5wcm90b3R5cGUsIHtcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUobmFtZSwgb3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9tb2RpZnkoJ1BVVCcsIG5hbWUsIG9wdGlvbnMpO1xuICB9LFxuICBlZGl0OiBmdW5jdGlvbiBlZGl0KG5hbWUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kaWZ5KCdQQVRDSCcsIG5hbWUsIG9wdGlvbnMpO1xuICB9LFxuICBkZWxldGU6IGZ1bmN0aW9uIF9kZWxldGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9tb2RpZnkoJ0RFTEVURScsIG5hbWUpO1xuICB9LFxuICBsaXN0OiBmdW5jdGlvbiBsaXN0KCkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3Qoe1xuICAgICAgdXJpOiAnL2RhdGFzZXRzJ1xuICAgIH0pO1xuICB9LFxuICBfbW9kaWZ5OiBmdW5jdGlvbiBfbW9kaWZ5KG1ldGhvZCwgbmFtZSwgYm9keSkge1xuICAgIHZhbGlkYXRlLmRhdGFzZXQobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVyaTogXCIvZGF0YXNldHMvXCIuY29uY2F0KG5hbWUpLFxuICAgICAgYm9keTogYm9keVxuICAgIH0pO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRGF0YXNldHNDbGllbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbmZ1bmN0aW9uIFByb2plY3RzQ2xpZW50KGNsaWVudCkge1xuICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbn1cblxuYXNzaWduKFByb2plY3RzQ2xpZW50LnByb3RvdHlwZSwge1xuICBsaXN0OiBmdW5jdGlvbiBsaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgIHVyaTogJy9wcm9qZWN0cydcbiAgICB9KTtcbiAgfSxcbiAgZ2V0QnlJZDogZnVuY3Rpb24gZ2V0QnlJZChpZCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgIHVyaTogXCIvcHJvamVjdHMvXCIuY29uY2F0KGlkKVxuICAgIH0pO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gUHJvamVjdHNDbGllbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICB2YXIgcXMgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBxcy5wdXNoKFwiXCIuY29uY2F0KGVuY29kZVVSSUNvbXBvbmVudChrZXkpLCBcIj1cIikuY29uY2F0KGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XSkpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcXMubGVuZ3RoID4gMCA/IFwiP1wiLmNvbmNhdChxcy5qb2luKCcmJykpIDogJyc7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdAc2FuaXR5L29ic2VydmFibGUvb3BlcmF0b3JzL21hcCcpLFxuICAgIG1hcCA9IF9yZXF1aXJlLm1hcDtcblxudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJ0BzYW5pdHkvb2JzZXJ2YWJsZS9vcGVyYXRvcnMvZmlsdGVyJyksXG4gICAgZmlsdGVyID0gX3JlcXVpcmUyLmZpbHRlcjtcblxudmFyIHF1ZXJ5U3RyaW5nID0gcmVxdWlyZSgnLi4vaHR0cC9xdWVyeVN0cmluZycpO1xuXG52YXIgdmFsaWRhdG9ycyA9IHJlcXVpcmUoJy4uL3ZhbGlkYXRvcnMnKTtcblxuZnVuY3Rpb24gQXNzZXRzQ2xpZW50KGNsaWVudCkge1xuICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbn1cblxuZnVuY3Rpb24gdG9Eb2N1bWVudChib2R5KSB7XG4gIC8vIHRvZG86IHJld3JpdGUgdG8ganVzdCByZXR1cm4gYm9keS5kb2N1bWVudCBpbiBhIHdoaWxlXG4gIHZhciBkb2N1bWVudCA9IGJvZHkuZG9jdW1lbnQ7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCwgJ2RvY3VtZW50Jywge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybignVGhlIHByb21pc2UgcmV0dXJuZWQgZnJvbSBjbGllbnQuYXNzZXQudXBsb2FkKC4uLikgbm93IHJlc29sdmVzIHdpdGggdGhlIGFzc2V0IGRvY3VtZW50Jyk7XG4gICAgICByZXR1cm4gZG9jdW1lbnQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGRvY3VtZW50O1xufVxuXG5mdW5jdGlvbiBvcHRpb25zRnJvbUZpbGUob3B0cywgZmlsZSkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIShmaWxlIGluc3RhbmNlb2Ygd2luZG93LkZpbGUpKSB7XG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cblxuICByZXR1cm4gYXNzaWduKHtcbiAgICBmaWxlbmFtZTogb3B0cy5wcmVzZXJ2ZUZpbGVuYW1lID09PSBmYWxzZSA/IHVuZGVmaW5lZCA6IGZpbGUubmFtZSxcbiAgICBjb250ZW50VHlwZTogZmlsZS50eXBlXG4gIH0sIG9wdHMpO1xufVxuXG5hc3NpZ24oQXNzZXRzQ2xpZW50LnByb3RvdHlwZSwge1xuICAvKipcbiAgICogVXBsb2FkIGFuIGFzc2V0XG4gICAqXG4gICAqIEBwYXJhbSAge1N0cmluZ30gYXNzZXRUeXBlIGBpbWFnZWAgb3IgYGZpbGVgXG4gICAqIEBwYXJhbSAge0ZpbGV8QmxvYnxCdWZmZXJ8UmVhZGFibGVTdHJlYW19IGJvZHkgRmlsZSB0byB1cGxvYWRcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgb3B0cyBPcHRpb25zIGZvciB0aGUgdXBsb2FkXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IG9wdHMucHJlc2VydmVGaWxlbmFtZSBXaGV0aGVyIG9yIG5vdCB0byBwcmVzZXJ2ZSB0aGUgb3JpZ2luYWwgZmlsZW5hbWUgKGRlZmF1bHQ6IHRydWUpXG4gICAqIEBwYXJhbSAge1N0cmluZ30gIG9wdHMuZmlsZW5hbWUgRmlsZW5hbWUgZm9yIHRoaXMgZmlsZSAob3B0aW9uYWwpXG4gICAqIEBwYXJhbSAge051bWJlcn0gIG9wdHMudGltZW91dCAgTWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIHRpbWluZyB0aGUgcmVxdWVzdCBvdXQgKGRlZmF1bHQ6IDApXG4gICAqIEBwYXJhbSAge1N0cmluZ30gIG9wdHMuY29udGVudFR5cGUgTWltZSB0eXBlIG9mIHRoZSBmaWxlXG4gICAqIEBwYXJhbSAge0FycmF5fSAgIG9wdHMuZXh0cmFjdCBBcnJheSBvZiBtZXRhZGF0YSBwYXJ0cyB0byBleHRyYWN0IGZyb20gaW1hZ2UuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9zc2libGUgdmFsdWVzOiBgbG9jYXRpb25gLCBgZXhpZmAsIGBpbWFnZWAsIGBwYWxldHRlYFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBvcHRzLmxhYmVsIExhYmVsXG4gICAqIEBwYXJhbSAge1N0cmluZ30gIG9wdHMudGl0bGUgVGl0bGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgb3B0cy5kZXNjcmlwdGlvbiBEZXNjcmlwdGlvblxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBvcHRzLmNyZWRpdExpbmUgVGhlIGNyZWRpdCB0byBwZXJzb24ocykgYW5kL29yIG9yZ2FuaXphdGlvbihzKSByZXF1aXJlZCBieSB0aGUgc3VwcGxpZXIgb2YgdGhlIGltYWdlIHRvIGJlIHVzZWQgd2hlbiBwdWJsaXNoZWRcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgb3B0cy5zb3VyY2UgU291cmNlIGRhdGEgKHdoZW4gdGhlIGFzc2V0IGlzIGZyb20gYW4gZXh0ZXJuYWwgc2VydmljZSlcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgb3B0cy5zb3VyY2UuaWQgVGhlICh1KWlkIG9mIHRoZSBhc3NldCB3aXRoaW4gdGhlIHNvdXJjZSwgaS5lLiAnaS1mMzIzcjFFJ1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXF1aXJlZCBpZiBzb3VyY2UgaXMgZGVmaW5lZFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBvcHRzLnNvdXJjZS5uYW1lIFRoZSBuYW1lIG9mIHRoZSBzb3VyY2UsIGkuZS4gJ3Vuc3BsYXNoJ1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXF1aXJlZCBpZiBzb3VyY2UgaXMgZGVmaW5lZFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBvcHRzLnNvdXJjZS51cmwgQSB1cmwgdG8gd2hlcmUgdG8gZmluZCB0aGUgYXNzZXQsIG9yIGdldCBtb3JlIGluZm8gYWJvdXQgaXQgaW4gdGhlIHNvdXJjZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPcHRpb25hbFxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBSZXNvbHZlcyB3aXRoIHRoZSBjcmVhdGVkIGFzc2V0IGRvY3VtZW50XG4gICAqL1xuICB1cGxvYWQ6IGZ1bmN0aW9uIHVwbG9hZChhc3NldFR5cGUsIGJvZHkpIHtcbiAgICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgdmFsaWRhdG9ycy52YWxpZGF0ZUFzc2V0VHlwZShhc3NldFR5cGUpOyAvLyBJZiBhbiBlbXB0eSBhcnJheSBpcyBnaXZlbiwgZXhwbGljaXRseSBzZXQgYG5vbmVgIHRvIG92ZXJyaWRlIEFQSSBkZWZhdWx0c1xuXG4gICAgdmFyIG1ldGEgPSBvcHRzLmV4dHJhY3QgfHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKG1ldGEgJiYgIW1ldGEubGVuZ3RoKSB7XG4gICAgICBtZXRhID0gWydub25lJ107XG4gICAgfVxuXG4gICAgdmFyIGRhdGFzZXQgPSB2YWxpZGF0b3JzLmhhc0RhdGFzZXQodGhpcy5jbGllbnQuY2xpZW50Q29uZmlnKTtcbiAgICB2YXIgYXNzZXRFbmRwb2ludCA9IGFzc2V0VHlwZSA9PT0gJ2ltYWdlJyA/ICdpbWFnZXMnIDogJ2ZpbGVzJztcbiAgICB2YXIgb3B0aW9ucyA9IG9wdGlvbnNGcm9tRmlsZShvcHRzLCBib2R5KTtcbiAgICB2YXIgbGFiZWwgPSBvcHRpb25zLmxhYmVsLFxuICAgICAgICB0aXRsZSA9IG9wdGlvbnMudGl0bGUsXG4gICAgICAgIGRlc2NyaXB0aW9uID0gb3B0aW9ucy5kZXNjcmlwdGlvbixcbiAgICAgICAgY3JlZGl0TGluZSA9IG9wdGlvbnMuY3JlZGl0TGluZSxcbiAgICAgICAgZmlsZW5hbWUgPSBvcHRpb25zLmZpbGVuYW1lLFxuICAgICAgICBzb3VyY2UgPSBvcHRpb25zLnNvdXJjZTtcbiAgICB2YXIgcXVlcnkgPSB7XG4gICAgICBsYWJlbDogbGFiZWwsXG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICBmaWxlbmFtZTogZmlsZW5hbWUsXG4gICAgICBtZXRhOiBtZXRhLFxuICAgICAgY3JlZGl0TGluZTogY3JlZGl0TGluZVxuICAgIH07XG5cbiAgICBpZiAoc291cmNlKSB7XG4gICAgICBxdWVyeS5zb3VyY2VJZCA9IHNvdXJjZS5pZDtcbiAgICAgIHF1ZXJ5LnNvdXJjZU5hbWUgPSBzb3VyY2UubmFtZTtcbiAgICAgIHF1ZXJ5LnNvdXJjZVVybCA9IHNvdXJjZS51cmw7XG4gICAgfVxuXG4gICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLmNsaWVudC5fcmVxdWVzdE9ic2VydmFibGUoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB0aW1lb3V0OiBvcHRpb25zLnRpbWVvdXQgfHwgMCxcbiAgICAgIHVyaTogXCIvYXNzZXRzL1wiLmNvbmNhdChhc3NldEVuZHBvaW50LCBcIi9cIikuY29uY2F0KGRhdGFzZXQpLFxuICAgICAgaGVhZGVyczogb3B0aW9ucy5jb250ZW50VHlwZSA/IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IG9wdGlvbnMuY29udGVudFR5cGVcbiAgICAgIH0gOiB7fSxcbiAgICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICAgIGJvZHk6IGJvZHlcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNsaWVudC5pc1Byb21pc2VBUEkoKSA/IG9ic2VydmFibGUucGlwZShmaWx0ZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQudHlwZSA9PT0gJ3Jlc3BvbnNlJztcbiAgICB9KSwgbWFwKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIHRvRG9jdW1lbnQoZXZlbnQuYm9keSk7XG4gICAgfSkpLnRvUHJvbWlzZSgpIDogb2JzZXJ2YWJsZTtcbiAgfSxcbiAgZGVsZXRlOiBmdW5jdGlvbiBfZGVsZXRlKHR5cGUsIGlkKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLndhcm4oJ2NsaWVudC5hc3NldHMuZGVsZXRlKCkgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBjbGllbnQuZGVsZXRlKDxkb2N1bWVudC1pZD4pJyk7XG4gICAgdmFyIGRvY0lkID0gaWQgfHwgJyc7XG5cbiAgICBpZiAoIS9eKGltYWdlfGZpbGUpLS8udGVzdChkb2NJZCkpIHtcbiAgICAgIGRvY0lkID0gXCJcIi5jb25jYXQodHlwZSwgXCItXCIpLmNvbmNhdChkb2NJZCk7XG4gICAgfSBlbHNlIGlmICh0eXBlLl9pZCkge1xuICAgICAgLy8gV2UgY291bGQgYmUgcGFzc2luZyBhbiBlbnRpcmUgYXNzZXQgZG9jdW1lbnQgaW5zdGVhZCBvZiBhbiBJRFxuICAgICAgZG9jSWQgPSB0eXBlLl9pZDtcbiAgICB9XG5cbiAgICB2YWxpZGF0b3JzLmhhc0RhdGFzZXQodGhpcy5jbGllbnQuY2xpZW50Q29uZmlnKTtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuZGVsZXRlKGRvY0lkKTtcbiAgfSxcbiAgZ2V0SW1hZ2VVcmw6IGZ1bmN0aW9uIGdldEltYWdlVXJsKHJlZiwgcXVlcnkpIHtcbiAgICB2YXIgaWQgPSByZWYuX3JlZiB8fCByZWY7XG5cbiAgICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRJbWFnZVVybCgpIG5lZWRzIGVpdGhlciBhbiBvYmplY3Qgd2l0aCBhIF9yZWYsIG9yIGEgc3RyaW5nIHdpdGggYW4gYXNzZXQgZG9jdW1lbnQgSUQnKTtcbiAgICB9XG5cbiAgICBpZiAoIS9eaW1hZ2UtW0EtWmEtejAtOV9dKy1cXGQreFxcZCstW2Etel17MSw1fSQvLnRlc3QoaWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBhc3NldCBJRCBcXFwiXCIuY29uY2F0KGlkLCBcIlxcXCIuIFVSTCBnZW5lcmF0aW9uIG9ubHkgd29ya3MgZm9yIGF1dG8tZ2VuZXJhdGVkIElEcy5cIikpO1xuICAgIH1cblxuICAgIHZhciBfaWQkc3BsaXQgPSBpZC5zcGxpdCgnLScpLFxuICAgICAgICBfaWQkc3BsaXQyID0gX3NsaWNlZFRvQXJyYXkoX2lkJHNwbGl0LCA0KSxcbiAgICAgICAgYXNzZXRJZCA9IF9pZCRzcGxpdDJbMV0sXG4gICAgICAgIHNpemUgPSBfaWQkc3BsaXQyWzJdLFxuICAgICAgICBmb3JtYXQgPSBfaWQkc3BsaXQyWzNdO1xuXG4gICAgdmFsaWRhdG9ycy5oYXNEYXRhc2V0KHRoaXMuY2xpZW50LmNsaWVudENvbmZpZyk7XG4gICAgdmFyIF90aGlzJGNsaWVudCRjbGllbnRDbyA9IHRoaXMuY2xpZW50LmNsaWVudENvbmZpZyxcbiAgICAgICAgcHJvamVjdElkID0gX3RoaXMkY2xpZW50JGNsaWVudENvLnByb2plY3RJZCxcbiAgICAgICAgZGF0YXNldCA9IF90aGlzJGNsaWVudCRjbGllbnRDby5kYXRhc2V0O1xuICAgIHZhciBxcyA9IHF1ZXJ5ID8gcXVlcnlTdHJpbmcocXVlcnkpIDogJyc7XG4gICAgcmV0dXJuIFwiaHR0cHM6Ly9jZG4uc2FuaXR5LmlvL2ltYWdlcy9cIi5jb25jYXQocHJvamVjdElkLCBcIi9cIikuY29uY2F0KGRhdGFzZXQsIFwiL1wiKS5jb25jYXQoYXNzZXRJZCwgXCItXCIpLmNvbmNhdChzaXplLCBcIi5cIikuY29uY2F0KGZvcm1hdCkuY29uY2F0KHFzKTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IEFzc2V0c0NsaWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxuZnVuY3Rpb24gVXNlcnNDbGllbnQoY2xpZW50KSB7XG4gIHRoaXMuY2xpZW50ID0gY2xpZW50O1xufVxuXG5hc3NpZ24oVXNlcnNDbGllbnQucHJvdG90eXBlLCB7XG4gIGdldEJ5SWQ6IGZ1bmN0aW9uIGdldEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQucmVxdWVzdCh7XG4gICAgICB1cmk6IFwiL3VzZXJzL1wiLmNvbmNhdChpZClcbiAgICB9KTtcbiAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJzQ2xpZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG5mdW5jdGlvbiBBdXRoQ2xpZW50KGNsaWVudCkge1xuICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbn1cblxuYXNzaWduKEF1dGhDbGllbnQucHJvdG90eXBlLCB7XG4gIGdldExvZ2luUHJvdmlkZXJzOiBmdW5jdGlvbiBnZXRMb2dpblByb3ZpZGVycygpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQucmVxdWVzdCh7XG4gICAgICB1cmk6ICcvYXV0aC9wcm92aWRlcnMnXG4gICAgfSk7XG4gIH0sXG4gIGxvZ291dDogZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5yZXF1ZXN0KHtcbiAgICAgIHVyaTogJy9hdXRoL2xvZ291dCcsXG4gICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgIH0pO1xuICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gQXV0aENsaWVudDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFB1YnN1YigpIHtcbiAgdmFyIHN1YnNjcmliZXJzID0gW11cbiAgcmV0dXJuIHtcbiAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICBwdWJsaXNoOiBwdWJsaXNoXG4gIH1cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKHN1YnNjcmliZXIpIHtcbiAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgdmFyIGlkeCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcilcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaWR4LCAxKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwdWJsaXNoKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1YnNjcmliZXJzW2ldLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICB9XG4gIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgdmFyIGFwcGx5TWlkZGxld2FyZSA9IGZ1bmN0aW9uIGFwcGx5TWlkZGxld2FyZShob29rLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBiYWlsRWFybHkgPSBob29rID09PSAnb25FcnJvcic7XG5cbiAgICB2YXIgdmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtaWRkbGV3YXJlW2hvb2tdLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGFuZGxlciA9IG1pZGRsZXdhcmVbaG9va11baV07XG4gICAgICB2YWx1ZSA9IGhhbmRsZXIuYXBwbHkodW5kZWZpbmVkLCBbdmFsdWVdLmNvbmNhdChhcmdzKSk7XG5cbiAgICAgIGlmIChiYWlsRWFybHkgJiYgIXZhbHVlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICByZXR1cm4gYXBwbHlNaWRkbGV3YXJlO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1pZGRsZXdhcmVSZWR1Y2VyLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpZiB3ZSdyZSByZXF1aXJlZCB0byBhZGQgYSBwb3J0IG51bWJlci5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZGVmYXVsdC1wb3J0XG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHBvcnQgUG9ydCBudW1iZXIgd2UgbmVlZCB0byBjaGVja1xuICogQHBhcmFtIHtTdHJpbmd9IHByb3RvY29sIFByb3RvY29sIHdlIG5lZWQgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBJcyBpdCBhIGRlZmF1bHQgcG9ydCBmb3IgdGhlIGdpdmVuIHByb3RvY29sXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXF1aXJlZChwb3J0LCBwcm90b2NvbCkge1xuICBwcm90b2NvbCA9IHByb3RvY29sLnNwbGl0KCc6JylbMF07XG4gIHBvcnQgPSArcG9ydDtcblxuICBpZiAoIXBvcnQpIHJldHVybiBmYWxzZTtcblxuICBzd2l0Y2ggKHByb3RvY29sKSB7XG4gICAgY2FzZSAnaHR0cCc6XG4gICAgY2FzZSAnd3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA4MDtcblxuICAgIGNhc2UgJ2h0dHBzJzpcbiAgICBjYXNlICd3c3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA0NDM7XG5cbiAgICBjYXNlICdmdHAnOlxuICAgIHJldHVybiBwb3J0ICE9PSAyMTtcblxuICAgIGNhc2UgJ2dvcGhlcic6XG4gICAgcmV0dXJuIHBvcnQgIT09IDcwO1xuXG4gICAgY2FzZSAnZmlsZSc6XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHBvcnQgIT09IDA7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHVuZGVmO1xuXG4vKipcbiAqIERlY29kZSBhIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd8TnVsbH0gVGhlIGRlY29kZWQgc3RyaW5nLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBlbmNvZGUgYSBnaXZlbiBpbnB1dC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyB0aGF0IG5lZWRzIHRvIGJlIGVuY29kZWQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfE51bGx9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogU2ltcGxlIHF1ZXJ5IHN0cmluZyBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSBzdHJpbmcgdGhhdCBuZWVkcyB0byBiZSBwYXJzZWQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmcocXVlcnkpIHtcbiAgdmFyIHBhcnNlciA9IC8oW149PyZdKyk9PyhbXiZdKikvZ1xuICAgICwgcmVzdWx0ID0ge31cbiAgICAsIHBhcnQ7XG5cbiAgd2hpbGUgKHBhcnQgPSBwYXJzZXIuZXhlYyhxdWVyeSkpIHtcbiAgICB2YXIga2V5ID0gZGVjb2RlKHBhcnRbMV0pXG4gICAgICAsIHZhbHVlID0gZGVjb2RlKHBhcnRbMl0pO1xuXG4gICAgLy9cbiAgICAvLyBQcmV2ZW50IG92ZXJyaWRpbmcgb2YgZXhpc3RpbmcgcHJvcGVydGllcy4gVGhpcyBlbnN1cmVzIHRoYXQgYnVpbGQtaW5cbiAgICAvLyBtZXRob2RzIGxpa2UgYHRvU3RyaW5nYCBvciBfX3Byb3RvX18gYXJlIG5vdCBvdmVycmlkZW4gYnkgbWFsaWNpb3VzXG4gICAgLy8gcXVlcnlzdHJpbmdzLlxuICAgIC8vXG4gICAgLy8gSW4gdGhlIGNhc2UgaWYgZmFpbGVkIGRlY29kaW5nLCB3ZSB3YW50IHRvIG9taXQgdGhlIGtleS92YWx1ZSBwYWlyc1xuICAgIC8vIGZyb20gdGhlIHJlc3VsdC5cbiAgICAvL1xuICAgIGlmIChrZXkgPT09IG51bGwgfHwgdmFsdWUgPT09IG51bGwgfHwga2V5IGluIHJlc3VsdCkgY29udGludWU7XG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGEgcXVlcnkgc3RyaW5nIHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB0aGF0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcmVmaXggT3B0aW9uYWwgcHJlZml4LlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5naWZ5KG9iaiwgcHJlZml4KSB7XG4gIHByZWZpeCA9IHByZWZpeCB8fCAnJztcblxuICB2YXIgcGFpcnMgPSBbXVxuICAgICwgdmFsdWVcbiAgICAsIGtleTtcblxuICAvL1xuICAvLyBPcHRpb25hbGx5IHByZWZpeCB3aXRoIGEgJz8nIGlmIG5lZWRlZFxuICAvL1xuICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBwcmVmaXgpIHByZWZpeCA9ICc/JztcblxuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICB2YWx1ZSA9IG9ialtrZXldO1xuXG4gICAgICAvL1xuICAgICAgLy8gRWRnZSBjYXNlcyB3aGVyZSB3ZSBhY3R1YWxseSB3YW50IHRvIGVuY29kZSB0aGUgdmFsdWUgdG8gYW4gZW1wdHlcbiAgICAgIC8vIHN0cmluZyBpbnN0ZWFkIG9mIHRoZSBzdHJpbmdpZmllZCB2YWx1ZS5cbiAgICAgIC8vXG4gICAgICBpZiAoIXZhbHVlICYmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWYgfHwgaXNOYU4odmFsdWUpKSkge1xuICAgICAgICB2YWx1ZSA9ICcnO1xuICAgICAgfVxuXG4gICAgICBrZXkgPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblxuICAgICAgLy9cbiAgICAgIC8vIElmIHdlIGZhaWxlZCB0byBlbmNvZGUgdGhlIHN0cmluZ3MsIHdlIHNob3VsZCBiYWlsIG91dCBhcyB3ZSBkb24ndFxuICAgICAgLy8gd2FudCB0byBhZGQgaW52YWxpZCBzdHJpbmdzIHRvIHRoZSBxdWVyeS5cbiAgICAgIC8vXG4gICAgICBpZiAoa2V5ID09PSBudWxsIHx8IHZhbHVlID09PSBudWxsKSBjb250aW51ZTtcbiAgICAgIHBhaXJzLnB1c2goa2V5ICsnPScrIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFpcnMubGVuZ3RoID8gcHJlZml4ICsgcGFpcnMuam9pbignJicpIDogJyc7XG59XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5leHBvcnRzLnN0cmluZ2lmeSA9IHF1ZXJ5c3RyaW5naWZ5O1xuZXhwb3J0cy5wYXJzZSA9IHF1ZXJ5c3RyaW5nO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWlyZWQgPSByZXF1aXJlKCdyZXF1aXJlcy1wb3J0JylcbiAgLCBxcyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5naWZ5JylcbiAgLCBzbGFzaGVzID0gL15bQS1aYS16XVtBLVphLXowLTkrLS5dKjpcXC9cXC8vXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFNcXHNdKikvaVxuICAsIHdoaXRlc3BhY2UgPSAnW1xcXFx4MDlcXFxceDBBXFxcXHgwQlxcXFx4MENcXFxceDBEXFxcXHgyMFxcXFx4QTBcXFxcdTE2ODBcXFxcdTE4MEVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMEFcXFxcdTIwMkZcXFxcdTIwNUZcXFxcdTMwMDBcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdUZFRkZdJ1xuICAsIGxlZnQgPSBuZXcgUmVnRXhwKCdeJysgd2hpdGVzcGFjZSArJysnKTtcblxuLyoqXG4gKiBUcmltIGEgZ2l2ZW4gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgU3RyaW5nIHRvIHRyaW0uXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRyaW1MZWZ0KHN0cikge1xuICByZXR1cm4gKHN0ciA/IHN0ciA6ICcnKS50b1N0cmluZygpLnJlcGxhY2UobGVmdCwgJycpO1xufVxuXG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgcGFyc2UgcnVsZXMgZm9yIHRoZSBVUkwgcGFyc2VyLCBpdCBpbmZvcm1zIHRoZSBwYXJzZXJcbiAqIGFib3V0OlxuICpcbiAqIDAuIFRoZSBjaGFyIGl0IE5lZWRzIHRvIHBhcnNlLCBpZiBpdCdzIGEgc3RyaW5nIGl0IHNob3VsZCBiZSBkb25lIHVzaW5nXG4gKiAgICBpbmRleE9mLCBSZWdFeHAgdXNpbmcgZXhlYyBhbmQgTmFOIG1lYW5zIHNldCBhcyBjdXJyZW50IHZhbHVlLlxuICogMS4gVGhlIHByb3BlcnR5IHdlIHNob3VsZCBzZXQgd2hlbiBwYXJzaW5nIHRoaXMgdmFsdWUuXG4gKiAyLiBJbmRpY2F0aW9uIGlmIGl0J3MgYmFja3dhcmRzIG9yIGZvcndhcmQgcGFyc2luZywgd2hlbiBzZXQgYXMgbnVtYmVyIGl0J3NcbiAqICAgIHRoZSB2YWx1ZSBvZiBleHRyYSBjaGFycyB0aGF0IHNob3VsZCBiZSBzcGxpdCBvZmYuXG4gKiAzLiBJbmhlcml0IGZyb20gbG9jYXRpb24gaWYgbm9uIGV4aXN0aW5nIGluIHRoZSBwYXJzZXIuXG4gKiA0LiBgdG9Mb3dlckNhc2VgIHRoZSByZXN1bHRpbmcgdmFsdWUuXG4gKi9cbnZhciBydWxlcyA9IFtcbiAgWycjJywgJ2hhc2gnXSwgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnPycsICdxdWVyeSddLCAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBmdW5jdGlvbiBzYW5pdGl6ZShhZGRyZXNzKSB7ICAgICAgICAgIC8vIFNhbml0aXplIHdoYXQgaXMgbGVmdCBvZiB0aGUgYWRkcmVzc1xuICAgIHJldHVybiBhZGRyZXNzLnJlcGxhY2UoJ1xcXFwnLCAnLycpO1xuICB9LFxuICBbJy8nLCAncGF0aG5hbWUnXSwgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWydAJywgJ2F1dGgnLCAxXSwgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGZyb250LlxuICBbTmFOLCAnaG9zdCcsIHVuZGVmaW5lZCwgMSwgMV0sICAgICAgIC8vIFNldCBsZWZ0IG92ZXIgdmFsdWUuXG4gIFsvOihcXGQrKSQvLCAncG9ydCcsIHVuZGVmaW5lZCwgMV0sICAgIC8vIFJlZ0V4cCB0aGUgYmFjay5cbiAgW05hTiwgJ2hvc3RuYW1lJywgdW5kZWZpbmVkLCAxLCAxXSAgICAvLyBTZXQgbGVmdCBvdmVyLlxuXTtcblxuLyoqXG4gKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBub3QgYmUgY29waWVkIG9yIGluaGVyaXRlZCBmcm9tLiBUaGlzIGlzIG9ubHkgbmVlZGVkXG4gKiBmb3IgYWxsIG5vbiBibG9iIFVSTCdzIGFzIGEgYmxvYiBVUkwgZG9lcyBub3QgaW5jbHVkZSBhIGhhc2gsIG9ubHkgdGhlXG4gKiBvcmlnaW4uXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpZ25vcmUgPSB7IGhhc2g6IDEsIHF1ZXJ5OiAxIH07XG5cbi8qKlxuICogVGhlIGxvY2F0aW9uIG9iamVjdCBkaWZmZXJzIHdoZW4geW91ciBjb2RlIGlzIGxvYWRlZCB0aHJvdWdoIGEgbm9ybWFsIHBhZ2UsXG4gKiBXb3JrZXIgb3IgdGhyb3VnaCBhIHdvcmtlciB1c2luZyBhIGJsb2IuIEFuZCB3aXRoIHRoZSBibG9iYmxlIGJlZ2lucyB0aGVcbiAqIHRyb3VibGUgYXMgdGhlIGxvY2F0aW9uIG9iamVjdCB3aWxsIGNvbnRhaW4gdGhlIFVSTCBvZiB0aGUgYmxvYiwgbm90IHRoZVxuICogbG9jYXRpb24gb2YgdGhlIHBhZ2Ugd2hlcmUgb3VyIGNvZGUgaXMgbG9hZGVkIGluLiBUaGUgYWN0dWFsIG9yaWdpbiBpc1xuICogZW5jb2RlZCBpbiB0aGUgYHBhdGhuYW1lYCBzbyB3ZSBjYW4gdGhhbmtmdWxseSBnZW5lcmF0ZSBhIGdvb2QgXCJkZWZhdWx0XCJcbiAqIGxvY2F0aW9uIGZyb20gaXQgc28gd2UgY2FuIGdlbmVyYXRlIHByb3BlciByZWxhdGl2ZSBVUkwncyBhZ2Fpbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGxvYyBPcHRpb25hbCBkZWZhdWx0IGxvY2F0aW9uIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IGxvbGNhdGlvbiBvYmplY3QuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGxvbGNhdGlvbihsb2MpIHtcbiAgdmFyIGdsb2JhbFZhcjtcblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIGdsb2JhbFZhciA9IHdpbmRvdztcbiAgZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIGdsb2JhbFZhciA9IGdsb2JhbDtcbiAgZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSBnbG9iYWxWYXIgPSBzZWxmO1xuICBlbHNlIGdsb2JhbFZhciA9IHt9O1xuXG4gIHZhciBsb2NhdGlvbiA9IGdsb2JhbFZhci5sb2NhdGlvbiB8fCB7fTtcbiAgbG9jID0gbG9jIHx8IGxvY2F0aW9uO1xuXG4gIHZhciBmaW5hbGRlc3RpbmF0aW9uID0ge31cbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jXG4gICAgLCBrZXk7XG5cbiAgaWYgKCdibG9iOicgPT09IGxvYy5wcm90b2NvbCkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVXJsKHVuZXNjYXBlKGxvYy5wYXRobmFtZSksIHt9KTtcbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZSkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVXJsKGxvYywge30pO1xuICAgIGZvciAoa2V5IGluIGlnbm9yZSkgZGVsZXRlIGZpbmFsZGVzdGluYXRpb25ba2V5XTtcbiAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZSkge1xuICAgIGZvciAoa2V5IGluIGxvYykge1xuICAgICAgaWYgKGtleSBpbiBpZ25vcmUpIGNvbnRpbnVlO1xuICAgICAgZmluYWxkZXN0aW5hdGlvbltrZXldID0gbG9jW2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPSBzbGFzaGVzLnRlc3QobG9jLmhyZWYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmaW5hbGRlc3RpbmF0aW9uO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIFByb3RvY29sRXh0cmFjdFxuICogQHR5cGUgT2JqZWN0XG4gKiBAcHJvcGVydHkge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgbWF0Y2hlZCBpbiB0aGUgVVJMLCBpbiBsb3dlcmNhc2UuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IHNsYXNoZXMgYHRydWVgIGlmIHByb3RvY29sIGlzIGZvbGxvd2VkIGJ5IFwiLy9cIiwgZWxzZSBgZmFsc2VgLlxuICogQHByb3BlcnR5IHtTdHJpbmd9IHJlc3QgUmVzdCBvZiB0aGUgVVJMIHRoYXQgaXMgbm90IHBhcnQgb2YgdGhlIHByb3RvY29sLlxuICovXG5cbi8qKlxuICogRXh0cmFjdCBwcm90b2NvbCBpbmZvcm1hdGlvbiBmcm9tIGEgVVJMIHdpdGgvd2l0aG91dCBkb3VibGUgc2xhc2ggKFwiLy9cIikuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFkZHJlc3MgVVJMIHdlIHdhbnQgdG8gZXh0cmFjdCBmcm9tLlxuICogQHJldHVybiB7UHJvdG9jb2xFeHRyYWN0fSBFeHRyYWN0ZWQgaW5mb3JtYXRpb24uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRyYWN0UHJvdG9jb2woYWRkcmVzcykge1xuICBhZGRyZXNzID0gdHJpbUxlZnQoYWRkcmVzcyk7XG4gIHZhciBtYXRjaCA9IHByb3RvY29scmUuZXhlYyhhZGRyZXNzKTtcblxuICByZXR1cm4ge1xuICAgIHByb3RvY29sOiBtYXRjaFsxXSA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiAnJyxcbiAgICBzbGFzaGVzOiAhIW1hdGNoWzJdLFxuICAgIHJlc3Q6IG1hdGNoWzNdXG4gIH07XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIHJlbGF0aXZlIFVSTCBwYXRobmFtZSBhZ2FpbnN0IGEgYmFzZSBVUkwgcGF0aG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aXZlIFBhdGhuYW1lIG9mIHRoZSByZWxhdGl2ZSBVUkwuXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZSBQYXRobmFtZSBvZiB0aGUgYmFzZSBVUkwuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJlc29sdmVkIHBhdGhuYW1lLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZShyZWxhdGl2ZSwgYmFzZSkge1xuICBpZiAocmVsYXRpdmUgPT09ICcnKSByZXR1cm4gYmFzZTtcblxuICB2YXIgcGF0aCA9IChiYXNlIHx8ICcvJykuc3BsaXQoJy8nKS5zbGljZSgwLCAtMSkuY29uY2F0KHJlbGF0aXZlLnNwbGl0KCcvJykpXG4gICAgLCBpID0gcGF0aC5sZW5ndGhcbiAgICAsIGxhc3QgPSBwYXRoW2kgLSAxXVxuICAgICwgdW5zaGlmdCA9IGZhbHNlXG4gICAgLCB1cCA9IDA7XG5cbiAgd2hpbGUgKGktLSkge1xuICAgIGlmIChwYXRoW2ldID09PSAnLicpIHtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAocGF0aFtpXSA9PT0gJy4uJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIGlmIChpID09PSAwKSB1bnNoaWZ0ID0gdHJ1ZTtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICBpZiAodW5zaGlmdCkgcGF0aC51bnNoaWZ0KCcnKTtcbiAgaWYgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSBwYXRoLnB1c2goJycpO1xuXG4gIHJldHVybiBwYXRoLmpvaW4oJy8nKTtcbn1cblxuLyoqXG4gKiBUaGUgYWN0dWFsIFVSTCBpbnN0YW5jZS4gSW5zdGVhZCBvZiByZXR1cm5pbmcgYW4gb2JqZWN0IHdlJ3ZlIG9wdGVkLWluIHRvXG4gKiBjcmVhdGUgYW4gYWN0dWFsIGNvbnN0cnVjdG9yIGFzIGl0J3MgbXVjaCBtb3JlIG1lbW9yeSBlZmZpY2llbnQgYW5kXG4gKiBmYXN0ZXIgYW5kIGl0IHBsZWFzZXMgbXkgT0NELlxuICpcbiAqIEl0IGlzIHdvcnRoIG5vdGluZyB0aGF0IHdlIHNob3VsZCBub3QgdXNlIGBVUkxgIGFzIGNsYXNzIG5hbWUgdG8gcHJldmVudFxuICogY2xhc2hlcyB3aXRoIHRoZSBnbG9iYWwgVVJMIGluc3RhbmNlIHRoYXQgZ290IGludHJvZHVjZWQgaW4gYnJvd3NlcnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBwYXJzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gW2xvY2F0aW9uXSBMb2NhdGlvbiBkZWZhdWx0cyBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IFtwYXJzZXJdIFBhcnNlciBmb3IgdGhlIHF1ZXJ5IHN0cmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIFVybChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKSB7XG4gIGFkZHJlc3MgPSB0cmltTGVmdChhZGRyZXNzKTtcblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVXJsKSkge1xuICAgIHJldHVybiBuZXcgVXJsKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpO1xuICB9XG5cbiAgdmFyIHJlbGF0aXZlLCBleHRyYWN0ZWQsIHBhcnNlLCBpbnN0cnVjdGlvbiwgaW5kZXgsIGtleVxuICAgICwgaW5zdHJ1Y3Rpb25zID0gcnVsZXMuc2xpY2UoKVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NhdGlvblxuICAgICwgdXJsID0gdGhpc1xuICAgICwgaSA9IDA7XG5cbiAgLy9cbiAgLy8gVGhlIGZvbGxvd2luZyBpZiBzdGF0ZW1lbnRzIGFsbG93cyB0aGlzIG1vZHVsZSB0d28gaGF2ZSBjb21wYXRpYmlsaXR5IHdpdGhcbiAgLy8gMiBkaWZmZXJlbnQgQVBJOlxuICAvL1xuICAvLyAxLiBOb2RlLmpzJ3MgYHVybC5wYXJzZWAgYXBpIHdoaWNoIGFjY2VwdHMgYSBVUkwsIGJvb2xlYW4gYXMgYXJndW1lbnRzXG4gIC8vICAgIHdoZXJlIHRoZSBib29sZWFuIGluZGljYXRlcyB0aGF0IHRoZSBxdWVyeSBzdHJpbmcgc2hvdWxkIGFsc28gYmUgcGFyc2VkLlxuICAvL1xuICAvLyAyLiBUaGUgYFVSTGAgaW50ZXJmYWNlIG9mIHRoZSBicm93c2VyIHdoaWNoIGFjY2VwdHMgYSBVUkwsIG9iamVjdCBhc1xuICAvLyAgICBhcmd1bWVudHMuIFRoZSBzdXBwbGllZCBvYmplY3Qgd2lsbCBiZSB1c2VkIGFzIGRlZmF1bHQgdmFsdWVzIC8gZmFsbC1iYWNrXG4gIC8vICAgIGZvciByZWxhdGl2ZSBwYXRocy5cbiAgLy9cbiAgaWYgKCdvYmplY3QnICE9PSB0eXBlICYmICdzdHJpbmcnICE9PSB0eXBlKSB7XG4gICAgcGFyc2VyID0gbG9jYXRpb247XG4gICAgbG9jYXRpb24gPSBudWxsO1xuICB9XG5cbiAgaWYgKHBhcnNlciAmJiAnZnVuY3Rpb24nICE9PSB0eXBlb2YgcGFyc2VyKSBwYXJzZXIgPSBxcy5wYXJzZTtcblxuICBsb2NhdGlvbiA9IGxvbGNhdGlvbihsb2NhdGlvbik7XG5cbiAgLy9cbiAgLy8gRXh0cmFjdCBwcm90b2NvbCBpbmZvcm1hdGlvbiBiZWZvcmUgcnVubmluZyB0aGUgaW5zdHJ1Y3Rpb25zLlxuICAvL1xuICBleHRyYWN0ZWQgPSBleHRyYWN0UHJvdG9jb2woYWRkcmVzcyB8fCAnJyk7XG4gIHJlbGF0aXZlID0gIWV4dHJhY3RlZC5wcm90b2NvbCAmJiAhZXh0cmFjdGVkLnNsYXNoZXM7XG4gIHVybC5zbGFzaGVzID0gZXh0cmFjdGVkLnNsYXNoZXMgfHwgcmVsYXRpdmUgJiYgbG9jYXRpb24uc2xhc2hlcztcbiAgdXJsLnByb3RvY29sID0gZXh0cmFjdGVkLnByb3RvY29sIHx8IGxvY2F0aW9uLnByb3RvY29sIHx8ICcnO1xuICBhZGRyZXNzID0gZXh0cmFjdGVkLnJlc3Q7XG5cbiAgLy9cbiAgLy8gV2hlbiB0aGUgYXV0aG9yaXR5IGNvbXBvbmVudCBpcyBhYnNlbnQgdGhlIFVSTCBzdGFydHMgd2l0aCBhIHBhdGhcbiAgLy8gY29tcG9uZW50LlxuICAvL1xuICBpZiAoIWV4dHJhY3RlZC5zbGFzaGVzKSBpbnN0cnVjdGlvbnNbM10gPSBbLyguKikvLCAncGF0aG5hbWUnXTtcblxuICBmb3IgKDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zW2ldO1xuXG4gICAgaWYgKHR5cGVvZiBpbnN0cnVjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYWRkcmVzcyA9IGluc3RydWN0aW9uKGFkZHJlc3MpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcGFyc2UgPSBpbnN0cnVjdGlvblswXTtcbiAgICBrZXkgPSBpbnN0cnVjdGlvblsxXTtcblxuICAgIGlmIChwYXJzZSAhPT0gcGFyc2UpIHtcbiAgICAgIHVybFtrZXldID0gYWRkcmVzcztcbiAgICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgcGFyc2UpIHtcbiAgICAgIGlmICh+KGluZGV4ID0gYWRkcmVzcy5pbmRleE9mKHBhcnNlKSkpIHtcbiAgICAgICAgaWYgKCdudW1iZXInID09PSB0eXBlb2YgaW5zdHJ1Y3Rpb25bMl0pIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKGluZGV4ICsgaW5zdHJ1Y3Rpb25bMl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZShpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoaW5kZXggPSBwYXJzZS5leGVjKGFkZHJlc3MpKSkge1xuICAgICAgdXJsW2tleV0gPSBpbmRleFsxXTtcbiAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4LmluZGV4KTtcbiAgICB9XG5cbiAgICB1cmxba2V5XSA9IHVybFtrZXldIHx8IChcbiAgICAgIHJlbGF0aXZlICYmIGluc3RydWN0aW9uWzNdID8gbG9jYXRpb25ba2V5XSB8fCAnJyA6ICcnXG4gICAgKTtcblxuICAgIC8vXG4gICAgLy8gSG9zdG5hbWUsIGhvc3QgYW5kIHByb3RvY29sIHNob3VsZCBiZSBsb3dlcmNhc2VkIHNvIHRoZXkgY2FuIGJlIHVzZWQgdG9cbiAgICAvLyBjcmVhdGUgYSBwcm9wZXIgYG9yaWdpbmAuXG4gICAgLy9cbiAgICBpZiAoaW5zdHJ1Y3Rpb25bNF0pIHVybFtrZXldID0gdXJsW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEFsc28gcGFyc2UgdGhlIHN1cHBsaWVkIHF1ZXJ5IHN0cmluZyBpbiB0byBhbiBvYmplY3QuIElmIHdlJ3JlIHN1cHBsaWVkXG4gIC8vIHdpdGggYSBjdXN0b20gcGFyc2VyIGFzIGZ1bmN0aW9uIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgYnVpbGQtaW5cbiAgLy8gcGFyc2VyLlxuICAvL1xuICBpZiAocGFyc2VyKSB1cmwucXVlcnkgPSBwYXJzZXIodXJsLnF1ZXJ5KTtcblxuICAvL1xuICAvLyBJZiB0aGUgVVJMIGlzIHJlbGF0aXZlLCByZXNvbHZlIHRoZSBwYXRobmFtZSBhZ2FpbnN0IHRoZSBiYXNlIFVSTC5cbiAgLy9cbiAgaWYgKFxuICAgICAgcmVsYXRpdmVcbiAgICAmJiBsb2NhdGlvbi5zbGFzaGVzXG4gICAgJiYgdXJsLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nXG4gICAgJiYgKHVybC5wYXRobmFtZSAhPT0gJycgfHwgbG9jYXRpb24ucGF0aG5hbWUgIT09ICcnKVxuICApIHtcbiAgICB1cmwucGF0aG5hbWUgPSByZXNvbHZlKHVybC5wYXRobmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgLy9cbiAgLy8gV2Ugc2hvdWxkIG5vdCBhZGQgcG9ydCBudW1iZXJzIGlmIHRoZXkgYXJlIGFscmVhZHkgdGhlIGRlZmF1bHQgcG9ydCBudW1iZXJcbiAgLy8gZm9yIGEgZ2l2ZW4gcHJvdG9jb2wuIEFzIHRoZSBob3N0IGFsc28gY29udGFpbnMgdGhlIHBvcnQgbnVtYmVyIHdlJ3JlIGdvaW5nXG4gIC8vIG92ZXJyaWRlIGl0IHdpdGggdGhlIGhvc3RuYW1lIHdoaWNoIGNvbnRhaW5zIG5vIHBvcnQgbnVtYmVyLlxuICAvL1xuICBpZiAoIXJlcXVpcmVkKHVybC5wb3J0LCB1cmwucHJvdG9jb2wpKSB7XG4gICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWU7XG4gICAgdXJsLnBvcnQgPSAnJztcbiAgfVxuXG4gIC8vXG4gIC8vIFBhcnNlIGRvd24gdGhlIGBhdXRoYCBmb3IgdGhlIHVzZXJuYW1lIGFuZCBwYXNzd29yZC5cbiAgLy9cbiAgdXJsLnVzZXJuYW1lID0gdXJsLnBhc3N3b3JkID0gJyc7XG4gIGlmICh1cmwuYXV0aCkge1xuICAgIGluc3RydWN0aW9uID0gdXJsLmF1dGguc3BsaXQoJzonKTtcbiAgICB1cmwudXNlcm5hbWUgPSBpbnN0cnVjdGlvblswXSB8fCAnJztcbiAgICB1cmwucGFzc3dvcmQgPSBpbnN0cnVjdGlvblsxXSB8fCAnJztcbiAgfVxuXG4gIHVybC5vcmlnaW4gPSB1cmwucHJvdG9jb2wgJiYgdXJsLmhvc3QgJiYgdXJsLnByb3RvY29sICE9PSAnZmlsZTonXG4gICAgPyB1cmwucHJvdG9jb2wgKycvLycrIHVybC5ob3N0XG4gICAgOiAnbnVsbCc7XG5cbiAgLy9cbiAgLy8gVGhlIGhyZWYgaXMganVzdCB0aGUgY29tcGlsZWQgcmVzdWx0LlxuICAvL1xuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgY29udmVuaWVuY2UgbWV0aG9kIGZvciBjaGFuZ2luZyBwcm9wZXJ0aWVzIGluIHRoZSBVUkwgaW5zdGFuY2UgdG9cbiAqIGluc3VyZSB0aGF0IHRoZXkgYWxsIHByb3BhZ2F0ZSBjb3JyZWN0bHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcnQgICAgICAgICAgUHJvcGVydHkgd2UgbmVlZCB0byBhZGp1c3QuXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAgICAgICAgICBUaGUgbmV3bHkgYXNzaWduZWQgdmFsdWUuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IGZuICBXaGVuIHNldHRpbmcgdGhlIHF1ZXJ5LCBpdCB3aWxsIGJlIHRoZSBmdW5jdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlZCB0byBwYXJzZSB0aGUgcXVlcnkuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBXaGVuIHNldHRpbmcgdGhlIHByb3RvY29sLCBkb3VibGUgc2xhc2ggd2lsbCBiZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZCBmcm9tIHRoZSBmaW5hbCB1cmwgaWYgaXQgaXMgdHJ1ZS5cbiAqIEByZXR1cm5zIHtVUkx9IFVSTCBpbnN0YW5jZSBmb3IgY2hhaW5pbmcuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHNldChwYXJ0LCB2YWx1ZSwgZm4pIHtcbiAgdmFyIHVybCA9IHRoaXM7XG5cbiAgc3dpdGNoIChwYXJ0KSB7XG4gICAgY2FzZSAncXVlcnknOlxuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlID0gKGZuIHx8IHFzLnBhcnNlKSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwb3J0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoIXJlcXVpcmVkKHZhbHVlLCB1cmwucHJvdG9jb2wpKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgICAgICB1cmxbcGFydF0gPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWUgKyc6JysgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICh1cmwucG9ydCkgdmFsdWUgKz0gJzonKyB1cmwucG9ydDtcbiAgICAgIHVybC5ob3N0ID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3QnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICgvOlxcZCskLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgIHVybC5wb3J0ID0gdmFsdWUucG9wKCk7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlLmpvaW4oJzonKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlO1xuICAgICAgICB1cmwucG9ydCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3Byb3RvY29sJzpcbiAgICAgIHVybC5wcm90b2NvbCA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB1cmwuc2xhc2hlcyA9ICFmbjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncGF0aG5hbWUnOlxuICAgIGNhc2UgJ2hhc2gnOlxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHZhciBjaGFyID0gcGFydCA9PT0gJ3BhdGhuYW1lJyA/ICcvJyA6ICcjJztcbiAgICAgICAgdXJsW3BhcnRdID0gdmFsdWUuY2hhckF0KDApICE9PSBjaGFyID8gY2hhciArIHZhbHVlIDogdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBydWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpbnMgPSBydWxlc1tpXTtcblxuICAgIGlmIChpbnNbNF0pIHVybFtpbnNbMV1dID0gdXJsW2luc1sxXV0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIHVybC5vcmlnaW4gPSB1cmwucHJvdG9jb2wgJiYgdXJsLmhvc3QgJiYgdXJsLnByb3RvY29sICE9PSAnZmlsZTonXG4gICAgPyB1cmwucHJvdG9jb2wgKycvLycrIHVybC5ob3N0XG4gICAgOiAnbnVsbCc7XG5cbiAgdXJsLmhyZWYgPSB1cmwudG9TdHJpbmcoKTtcblxuICByZXR1cm4gdXJsO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgcHJvcGVydGllcyBiYWNrIGluIHRvIGEgdmFsaWQgYW5kIGZ1bGwgVVJMIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmdpZnkgT3B0aW9uYWwgcXVlcnkgc3RyaW5naWZ5IGZ1bmN0aW9uLlxuICogQHJldHVybnMge1N0cmluZ30gQ29tcGlsZWQgdmVyc2lvbiBvZiB0aGUgVVJMLlxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyhzdHJpbmdpZnkpIHtcbiAgaWYgKCFzdHJpbmdpZnkgfHwgJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHN0cmluZ2lmeSkgc3RyaW5naWZ5ID0gcXMuc3RyaW5naWZ5O1xuXG4gIHZhciBxdWVyeVxuICAgICwgdXJsID0gdGhpc1xuICAgICwgcHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLmNoYXJBdChwcm90b2NvbC5sZW5ndGggLSAxKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgdmFyIHJlc3VsdCA9IHByb3RvY29sICsgKHVybC5zbGFzaGVzID8gJy8vJyA6ICcnKTtcblxuICBpZiAodXJsLnVzZXJuYW1lKSB7XG4gICAgcmVzdWx0ICs9IHVybC51c2VybmFtZTtcbiAgICBpZiAodXJsLnBhc3N3b3JkKSByZXN1bHQgKz0gJzonKyB1cmwucGFzc3dvcmQ7XG4gICAgcmVzdWx0ICs9ICdAJztcbiAgfVxuXG4gIHJlc3VsdCArPSB1cmwuaG9zdCArIHVybC5wYXRobmFtZTtcblxuICBxdWVyeSA9ICdvYmplY3QnID09PSB0eXBlb2YgdXJsLnF1ZXJ5ID8gc3RyaW5naWZ5KHVybC5xdWVyeSkgOiB1cmwucXVlcnk7XG4gIGlmIChxdWVyeSkgcmVzdWx0ICs9ICc/JyAhPT0gcXVlcnkuY2hhckF0KDApID8gJz8nKyBxdWVyeSA6IHF1ZXJ5O1xuXG4gIGlmICh1cmwuaGFzaCkgcmVzdWx0ICs9IHVybC5oYXNoO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblVybC5wcm90b3R5cGUgPSB7IHNldDogc2V0LCB0b1N0cmluZzogdG9TdHJpbmcgfTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgVVJMIHBhcnNlciBhbmQgc29tZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdGhhdCBtaWdodCBiZSB1c2VmdWwgZm9yXG4vLyBvdGhlcnMgb3IgdGVzdGluZy5cbi8vXG5VcmwuZXh0cmFjdFByb3RvY29sID0gZXh0cmFjdFByb3RvY29sO1xuVXJsLmxvY2F0aW9uID0gbG9sY2F0aW9uO1xuVXJsLnRyaW1MZWZ0ID0gdHJpbUxlZnQ7XG5VcmwucXMgPSBxcztcblxubW9kdWxlLmV4cG9ydHMgPSBVcmw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvYmplY3RBc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG52YXIgdXJsUGFyc2UgPSByZXF1aXJlKCd1cmwtcGFyc2UnKTtcblxudmFyIGlzUmVhY3ROYXRpdmUgPSB0eXBlb2YgbmF2aWdhdG9yID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZSc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGRlZmF1bHRPcHRpb25zID0geyB0aW1lb3V0OiBpc1JlYWN0TmF0aXZlID8gNjAwMDAgOiAxMjAwMDAgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0cykge1xuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBvcHRzID09PSAnc3RyaW5nJyA/IG9iamVjdEFzc2lnbih7IHVybDogb3B0cyB9LCBkZWZhdWx0T3B0aW9ucykgOiBvYmplY3RBc3NpZ24oe30sIGRlZmF1bHRPcHRpb25zLCBvcHRzKTtcblxuICAvLyBQYXJzZSBVUkwgaW50byBwYXJ0c1xuICB2YXIgdXJsID0gdXJsUGFyc2Uob3B0aW9ucy51cmwsIHt9LCAvLyBEb24ndCB1c2UgY3VycmVudCBicm93c2VyIGxvY2F0aW9uXG4gIHRydWUgLy8gUGFyc2UgcXVlcnkgc3RyaW5nc1xuICApO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aW1lb3V0c1xuICBvcHRpb25zLnRpbWVvdXQgPSBub3JtYWxpemVUaW1lb3V0KG9wdGlvbnMudGltZW91dCk7XG5cbiAgLy8gU2hhbGxvdy1tZXJnZSAob3ZlcnJpZGUpIGV4aXN0aW5nIHF1ZXJ5IHBhcmFtc1xuICBpZiAob3B0aW9ucy5xdWVyeSkge1xuICAgIHVybC5xdWVyeSA9IG9iamVjdEFzc2lnbih7fSwgdXJsLnF1ZXJ5LCByZW1vdmVVbmRlZmluZWQob3B0aW9ucy5xdWVyeSkpO1xuICB9XG5cbiAgLy8gSW1wbGljaXQgUE9TVCBpZiB3ZSBoYXZlIG5vdCBzcGVjaWZpZWQgYSBtZXRob2QgYnV0IGhhdmUgYSBib2R5XG4gIG9wdGlvbnMubWV0aG9kID0gb3B0aW9ucy5ib2R5ICYmICFvcHRpb25zLm1ldGhvZCA/ICdQT1NUJyA6IChvcHRpb25zLm1ldGhvZCB8fCAnR0VUJykudG9VcHBlckNhc2UoKTtcblxuICAvLyBTdHJpbmdpZnkgVVJMXG4gIG9wdGlvbnMudXJsID0gdXJsLnRvU3RyaW5nKHN0cmluZ2lmeVF1ZXJ5U3RyaW5nKTtcblxuICByZXR1cm4gb3B0aW9ucztcbn07XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVF1ZXJ5U3RyaW5nKG9iaikge1xuICB2YXIgcGFpcnMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHB1c2goa2V5LCBvYmpba2V5XSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xuXG4gIGZ1bmN0aW9uIHB1c2goa2V5LCB2YWwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gcHVzaChrZXksIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsXS5tYXAoZW5jb2RlVVJJQ29tcG9uZW50KS5qb2luKCc9JykpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVUaW1lb3V0KHRpbWUpIHtcbiAgaWYgKHRpbWUgPT09IGZhbHNlIHx8IHRpbWUgPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodGltZS5jb25uZWN0IHx8IHRpbWUuc29ja2V0KSB7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cblxuICB2YXIgZGVsYXkgPSBOdW1iZXIodGltZSk7XG4gIGlmIChpc05hTihkZWxheSkpIHtcbiAgICByZXR1cm4gbm9ybWFsaXplVGltZW91dChkZWZhdWx0T3B0aW9ucy50aW1lb3V0KTtcbiAgfVxuXG4gIHJldHVybiB7IGNvbm5lY3Q6IGRlbGF5LCBzb2NrZXQ6IGRlbGF5IH07XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVVuZGVmaW5lZChvYmopIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9ialtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZhdWx0T3B0aW9uc1Byb2Nlc3Nvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHZhbGlkVXJsID0gL15odHRwcz86XFwvXFwvL2k7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgaWYgKCF2YWxpZFVybC50ZXN0KG9wdGlvbnMudXJsKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlxcXCJcIiArIG9wdGlvbnMudXJsICsgXCJcXFwiIGlzIG5vdCBhIHZhbGlkIFVSTFwiKTtcbiAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlZmF1bHRPcHRpb25zVmFsaWRhdG9yLmpzLm1hcCIsIi8qKlxuICogVGhpcyBmaWxlIGlzIG9ubHkgdXNlZCBmb3IgdGhlIGJyb3dzZXIgdmVyc2lvbiBvZiBgc2FtZS1vcmlnaW5gLlxuICogVXNlZCB0byBicmluZyBkb3duIHRoZSBzaXplIG9mIHRoZSBicm93c2VyIGJ1bmRsZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVnZXggPSAvXig/Oig/Oig/OihbXjpcXC8jXFw/XSs6KT8oPzooPzpcXC9cXC8pKCg/OigoPzpbXjpAXFwvI1xcP10rKSg/OlxcOig/OlteOkBcXC8jXFw/XSspKT8pQCk/KChbXjpcXC8jXFw/XFxdXFxbXSt8XFxbW15cXC9cXF1AIz9dK1xcXSkoPzpcXDooWzAtOV0rKSk/KSk/KT8pPygoPzpcXC8/KD86W15cXC9cXD8jXStcXC8rKSopKD86W15cXD8jXSopKSk/KFxcP1teI10rKT8pKCMuKik/LztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVnZXg6IHJlZ2V4LFxuICAgIHBhcnNlOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gcmVnZXguZXhlYyh1cmwpO1xuICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvdG9jb2w6IChtYXRjaFsxXSB8fCAnJykudG9Mb3dlckNhc2UoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBob3N0bmFtZTogKG1hdGNoWzVdIHx8ICcnKS50b0xvd2VyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHBvcnQ6IG1hdGNoWzZdIHx8IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXJsID0gcmVxdWlyZSgndXJsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odXJpMSwgdXJpMiwgaWVNb2RlKSB7XG4gICAgaWYgKHVyaTEgPT09IHVyaTIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIHVybDEgPSB1cmwucGFyc2UodXJpMSwgZmFsc2UsIHRydWUpO1xuICAgIHZhciB1cmwyID0gdXJsLnBhcnNlKHVyaTIsIGZhbHNlLCB0cnVlKTtcblxuICAgIHZhciB1cmwxUG9ydCA9IHVybDEucG9ydHwwIHx8ICh1cmwxLnByb3RvY29sID09PSAnaHR0cHMnID8gNDQzIDogODApO1xuICAgIHZhciB1cmwyUG9ydCA9IHVybDIucG9ydHwwIHx8ICh1cmwyLnByb3RvY29sID09PSAnaHR0cHMnID8gNDQzIDogODApO1xuXG4gICAgdmFyIG1hdGNoID0ge1xuICAgICAgICBwcm90bzogdXJsMS5wcm90b2NvbCA9PT0gdXJsMi5wcm90b2NvbCxcbiAgICAgICAgaG9zdG5hbWU6IHVybDEuaG9zdG5hbWUgPT09IHVybDIuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybDFQb3J0ID09PSB1cmwyUG9ydFxuICAgIH07XG5cbiAgICByZXR1cm4gKChtYXRjaC5wcm90byAmJiBtYXRjaC5ob3N0bmFtZSkgJiYgKG1hdGNoLnBvcnQgfHwgaWVNb2RlKSk7XG59OyIsInZhciB0cmltID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIHZhciBoZWFkZXJzQXJyID0gdHJpbShoZWFkZXJzKS5zcGxpdCgnXFxuJylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhlYWRlcnNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcm93ID0gaGVhZGVyc0FycltpXVxuICAgIHZhciBpbmRleCA9IHJvdy5pbmRleE9mKCc6JylcbiAgICAsIGtleSA9IHRyaW0ocm93LnNsaWNlKDAsIGluZGV4KSkudG9Mb3dlckNhc2UoKVxuICAgICwgdmFsdWUgPSB0cmltKHJvdy5zbGljZShpbmRleCArIDEpKVxuXG4gICAgaWYgKHR5cGVvZihyZXN1bHRba2V5XSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHJlc3VsdFtrZXldKSkge1xuICAgICAgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSBbIHJlc3VsdFtrZXldLCB2YWx1ZSBdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbWF4LWRlcHRoOiBbXCJlcnJvclwiLCA0XSAqL1xudmFyIHNhbWVPcmlnaW4gPSByZXF1aXJlKCdzYW1lLW9yaWdpbicpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJ3BhcnNlLWhlYWRlcnMnKTtcbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHtcbiAgLyogaW50ZW50aW9uYWwgbm9vcCAqL1xufTtcblxudmFyIHdpbiA9IHdpbmRvdztcbnZhciBYbWxIdHRwUmVxdWVzdCA9IHdpbi5YTUxIdHRwUmVxdWVzdCB8fCBub29wO1xudmFyIGhhc1hocjIgPSAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWG1sSHR0cFJlcXVlc3QoKTtcbnZhciBYRG9tYWluUmVxdWVzdCA9IGhhc1hocjIgPyBYbWxIdHRwUmVxdWVzdCA6IHdpbi5YRG9tYWluUmVxdWVzdDtcbnZhciBhZGFwdGVyID0gJ3hocic7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbnRleHQsIGNhbGxiYWNrKSB7XG4gIHZhciBvcHRzID0gY29udGV4dC5vcHRpb25zO1xuICB2YXIgb3B0aW9ucyA9IGNvbnRleHQuYXBwbHlNaWRkbGV3YXJlKCdmaW5hbGl6ZU9wdGlvbnMnLCBvcHRzKTtcbiAgdmFyIHRpbWVycyA9IHt9O1xuXG4gIC8vIERlZXAtY2hlY2tpbmcgd2luZG93LmxvY2F0aW9uIGJlY2F1c2Ugb2YgcmVhY3QgbmF0aXZlLCB3aGVyZSBgbG9jYXRpb25gIGRvZXNuJ3QgZXhpc3RcbiAgdmFyIGNvcnMgPSB3aW4gJiYgd2luLmxvY2F0aW9uICYmICFzYW1lT3JpZ2luKHdpbi5sb2NhdGlvbi5ocmVmLCBvcHRpb25zLnVybCk7XG5cbiAgLy8gQWxsb3cgbWlkZGxld2FyZSB0byBpbmplY3QgYSByZXNwb25zZSwgZm9yIGluc3RhbmNlIGluIHRoZSBjYXNlIG9mIGNhY2hpbmcgb3IgbW9ja2luZ1xuICB2YXIgaW5qZWN0ZWRSZXNwb25zZSA9IGNvbnRleHQuYXBwbHlNaWRkbGV3YXJlKCdpbnRlcmNlcHRSZXF1ZXN0JywgdW5kZWZpbmVkLCB7XG4gICAgYWRhcHRlcjogYWRhcHRlcixcbiAgICBjb250ZXh0OiBjb250ZXh0XG4gIH0pO1xuXG4gIC8vIElmIG1pZGRsZXdhcmUgaW5qZWN0ZWQgYSByZXNwb25zZSwgdHJlYXQgaXQgYXMgd2Ugbm9ybWFsbHkgd291bGQgYW5kIHJldHVybiBpdFxuICAvLyBEbyBub3RlIHRoYXQgdGhlIGluamVjdGVkIHJlc3BvbnNlIGhhcyB0byBiZSByZWR1Y2VkIHRvIGEgY3Jvc3MtZW52aXJvbm1lbnQgZnJpZW5kbHkgcmVzcG9uc2VcbiAgaWYgKGluamVjdGVkUmVzcG9uc2UpIHtcbiAgICB2YXIgY2JUaW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIDAsIG51bGwsIGluamVjdGVkUmVzcG9uc2UpO1xuICAgIHZhciBjYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGNiVGltZXIpO1xuICAgIH07XG4gICAgcmV0dXJuIHsgYWJvcnQ6IGNhbmNlbCB9O1xuICB9XG5cbiAgLy8gV2UnbGwgd2FudCB0byBudWxsIG91dCB0aGUgcmVxdWVzdCBvbiBzdWNjZXNzL2ZhaWx1cmVcbiAgdmFyIHhociA9IGNvcnMgPyBuZXcgWERvbWFpblJlcXVlc3QoKSA6IG5ldyBYbWxIdHRwUmVxdWVzdCgpO1xuXG4gIHZhciBpc1hkciA9IHdpbi5YRG9tYWluUmVxdWVzdCAmJiB4aHIgaW5zdGFuY2VvZiB3aW4uWERvbWFpblJlcXVlc3Q7XG4gIHZhciBoZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzO1xuXG4gIC8vIFJlcXVlc3Qgc3RhdGVcbiAgdmFyIGFib3J0ZWQgPSBmYWxzZTtcbiAgdmFyIGxvYWRlZCA9IGZhbHNlO1xuICB2YXIgdGltZWRPdXQgPSBmYWxzZTtcblxuICAvLyBBcHBseSBldmVudCBoYW5kbGVyc1xuICB4aHIub25lcnJvciA9IG9uRXJyb3I7XG4gIHhoci5vbnRpbWVvdXQgPSBvbkVycm9yO1xuICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgfTtcblxuICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uXG4gIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgIC8qIGludGVudGlvbmFsIG5vb3AgKi9cbiAgfTtcblxuICB2YXIgbG9hZEV2ZW50ID0gaXNYZHIgPyAnb25sb2FkJyA6ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICB4aHJbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBQcmV2ZW50IHJlcXVlc3QgZnJvbSB0aW1pbmcgb3V0XG4gICAgcmVzZXRUaW1lcnMoKTtcblxuICAgIGlmIChhYm9ydGVkIHx8IHhoci5yZWFkeVN0YXRlICE9PSA0ICYmICFpc1hkcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFdpbGwgYmUgaGFuZGxlZCBieSBvbkVycm9yXG4gICAgaWYgKHhoci5zdGF0dXMgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBvbkxvYWQoKTtcbiAgfTtcblxuICAvLyBAdG9kbyB0d28gbGFzdCBvcHRpb25zIHRvIG9wZW4oKSBpcyB1c2VybmFtZS9wYXNzd29yZFxuICB4aHIub3BlbihvcHRpb25zLm1ldGhvZCwgb3B0aW9ucy51cmwsIHRydWUgLy8gQWx3YXlzIGFzeW5jXG4gICk7XG5cbiAgLy8gU29tZSBvcHRpb25zIG5lZWQgdG8gYmUgYXBwbGllZCBhZnRlciBvcGVuXG4gIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xuXG4gIC8vIFNldCBoZWFkZXJzXG4gIGlmIChoZWFkZXJzICYmIHhoci5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGhlYWRlcnMpIHtcbiAgICAgIGlmIChoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChoZWFkZXJzICYmIGlzWGRyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIZWFkZXJzIGNhbm5vdCBiZSBzZXQgb24gYW4gWERvbWFpblJlcXVlc3Qgb2JqZWN0Jyk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5yYXdCb2R5KSB7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gIH1cblxuICAvLyBMZXQgbWlkZGxld2FyZSBrbm93IHdlJ3JlIGFib3V0IHRvIGRvIGEgcmVxdWVzdFxuICBjb250ZXh0LmFwcGx5TWlkZGxld2FyZSgnb25SZXF1ZXN0JywgeyBvcHRpb25zOiBvcHRpb25zLCBhZGFwdGVyOiBhZGFwdGVyLCByZXF1ZXN0OiB4aHIsIGNvbnRleHQ6IGNvbnRleHQgfSk7XG5cbiAgeGhyLnNlbmQob3B0aW9ucy5ib2R5IHx8IG51bGwpO1xuXG4gIC8vIEZpZ3VyZSBvdXQgd2hpY2ggdGltZW91dHMgdG8gdXNlIChpZiBhbnkpXG4gIHZhciBkZWxheXMgPSBvcHRpb25zLnRpbWVvdXQ7XG4gIGlmIChkZWxheXMpIHtcbiAgICB0aW1lcnMuY29ubmVjdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRpbWVvdXRSZXF1ZXN0KCdFVElNRURPVVQnKTtcbiAgICB9LCBkZWxheXMuY29ubmVjdCk7XG4gIH1cblxuICByZXR1cm4geyBhYm9ydDogYWJvcnQgfTtcblxuICBmdW5jdGlvbiBhYm9ydCgpIHtcbiAgICBhYm9ydGVkID0gdHJ1ZTtcblxuICAgIGlmICh4aHIpIHtcbiAgICAgIHhoci5hYm9ydCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVvdXRSZXF1ZXN0KGNvZGUpIHtcbiAgICB0aW1lZE91dCA9IHRydWU7XG4gICAgeGhyLmFib3J0KCk7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKGNvZGUgPT09ICdFU09DS0VUVElNRURPVVQnID8gJ1NvY2tldCB0aW1lZCBvdXQgb24gcmVxdWVzdCB0byAnICsgb3B0aW9ucy51cmwgOiAnQ29ubmVjdGlvbiB0aW1lZCBvdXQgb24gcmVxdWVzdCB0byAnICsgb3B0aW9ucy51cmwpO1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICAgIGNvbnRleHQuY2hhbm5lbHMuZXJyb3IucHVibGlzaChlcnJvcik7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRpbWVycygpIHtcbiAgICBpZiAoIWRlbGF5cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN0b3BUaW1lcnMoKTtcbiAgICB0aW1lcnMuc29ja2V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGltZW91dFJlcXVlc3QoJ0VTT0NLRVRUSU1FRE9VVCcpO1xuICAgIH0sIGRlbGF5cy5zb2NrZXQpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcFRpbWVycygpIHtcbiAgICAvLyBPbmx5IGNsZWFyIHRoZSBjb25uZWN0IHRpbWVvdXQgaWYgd2UndmUgZ290IGEgY29ubmVjdGlvblxuICAgIGlmIChhYm9ydGVkIHx8IHhoci5yZWFkeVN0YXRlID49IDIgJiYgdGltZXJzLmNvbm5lY3QpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcnMuY29ubmVjdCk7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVycy5zb2NrZXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcnMuc29ja2V0KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkVycm9yKCkge1xuICAgIGlmIChsb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDbGVhbiB1cFxuICAgIHN0b3BUaW1lcnMoKTtcbiAgICBsb2FkZWQgPSB0cnVlO1xuICAgIHhociA9IG51bGw7XG5cbiAgICAvLyBBbm5veWluZ2x5LCBkZXRhaWxzIGFyZSBleHRyZW1lbHkgc2NhcmNlIGFuZCBoaWRkZW4gZnJvbSB1cy5cbiAgICAvLyBXZSBvbmx5IHJlYWxseSBrbm93IHRoYXQgaXQgaXMgYSBuZXR3b3JrIGVycm9yXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignTmV0d29yayBlcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIHJlYWNoICcgKyBvcHRpb25zLnVybCk7XG4gICAgZXJyLmlzTmV0d29ya0Vycm9yID0gdHJ1ZTtcbiAgICBlcnIucmVxdWVzdCA9IG9wdGlvbnM7XG4gICAgY2FsbGJhY2soZXJyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZHVjZVJlc3BvbnNlKCkge1xuICAgIHZhciBzdGF0dXNDb2RlID0geGhyLnN0YXR1cztcbiAgICB2YXIgc3RhdHVzTWVzc2FnZSA9IHhoci5zdGF0dXNUZXh0O1xuXG4gICAgaWYgKGlzWGRyICYmIHN0YXR1c0NvZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gSUU4IENPUlMgR0VUIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgZG9lc24ndCBoYXZlIGEgc3RhdHVzIGZpZWxkLCBidXQgYm9keSBpcyBmaW5lXG4gICAgICBzdGF0dXNDb2RlID0gMjAwO1xuICAgIH0gZWxzZSBpZiAoc3RhdHVzQ29kZSA+IDEyMDAwICYmIHN0YXR1c0NvZGUgPCAxMjE1Nikge1xuICAgICAgLy8gWWV0IGFub3RoZXIgSUUgcXVpcmsgd2hlcmUgaXQgZW1pdHMgd2VpcmQgc3RhdHVzIGNvZGVzIG9uIG5ldHdvcmsgZXJyb3JzXG4gICAgICAvLyBodHRwczovL3N1cHBvcnQubWljcm9zb2Z0LmNvbS9lbi11cy9rYi8xOTM2MjVcbiAgICAgIHJldHVybiBvbkVycm9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFub3RoZXIgSUUgYnVnIHdoZXJlIEhUVFAgMjA0IHNvbWVob3cgZW5kcyB1cCBhcyAxMjIzXG4gICAgICBzdGF0dXNDb2RlID0geGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXM7XG4gICAgICBzdGF0dXNNZXNzYWdlID0geGhyLnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHN0YXR1c01lc3NhZ2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJvZHk6IHhoci5yZXNwb25zZSB8fCB4aHIucmVzcG9uc2VUZXh0LFxuICAgICAgdXJsOiBvcHRpb25zLnVybCxcbiAgICAgIG1ldGhvZDogb3B0aW9ucy5tZXRob2QsXG4gICAgICBoZWFkZXJzOiBpc1hkciA/IHt9IDogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSksXG4gICAgICBzdGF0dXNDb2RlOiBzdGF0dXNDb2RlLFxuICAgICAgc3RhdHVzTWVzc2FnZTogc3RhdHVzTWVzc2FnZVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgaWYgKGFib3J0ZWQgfHwgbG9hZGVkIHx8IHRpbWVkT3V0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHhoci5zdGF0dXMgPT09IDApIHtcbiAgICAgIG9uRXJyb3IobmV3IEVycm9yKCdVbmtub3duIFhIUiBlcnJvcicpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IGJlaW5nIGNhbGxlZCB0d2ljZVxuICAgIHN0b3BUaW1lcnMoKTtcbiAgICBsb2FkZWQgPSB0cnVlO1xuICAgIGNhbGxiYWNrKG51bGwsIHJlZHVjZVJlc3BvbnNlKCkpO1xuICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnJvd3Nlci1yZXF1ZXN0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL25vZGUtcmVxdWVzdCcpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHVic3ViID0gcmVxdWlyZSgnbmFuby1wdWJzdWInKTtcbnZhciBtaWRkbGV3YXJlUmVkdWNlciA9IHJlcXVpcmUoJy4vdXRpbC9taWRkbGV3YXJlUmVkdWNlcicpO1xudmFyIHByb2Nlc3NPcHRpb25zID0gcmVxdWlyZSgnLi9taWRkbGV3YXJlL2RlZmF1bHRPcHRpb25zUHJvY2Vzc29yJyk7XG52YXIgdmFsaWRhdGVPcHRpb25zID0gcmVxdWlyZSgnLi9taWRkbGV3YXJlL2RlZmF1bHRPcHRpb25zVmFsaWRhdG9yJyk7XG52YXIgaHR0cFJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTsgLy8gbm9kZS1yZXF1ZXN0IGluIG5vZGUsIGJyb3dzZXItcmVxdWVzdCBpbiBicm93c2Vyc1xuXG52YXIgY2hhbm5lbE5hbWVzID0gWydyZXF1ZXN0JywgJ3Jlc3BvbnNlJywgJ3Byb2dyZXNzJywgJ2Vycm9yJywgJ2Fib3J0J107XG52YXIgbWlkZGxlaG9va3MgPSBbJ3Byb2Nlc3NPcHRpb25zJywgJ3ZhbGlkYXRlT3B0aW9ucycsICdpbnRlcmNlcHRSZXF1ZXN0JywgJ2ZpbmFsaXplT3B0aW9ucycsICdvblJlcXVlc3QnLCAnb25SZXNwb25zZScsICdvbkVycm9yJywgJ29uUmV0dXJuJywgJ29uSGVhZGVycyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3RlcigpIHtcbiAgdmFyIGluaXRNaWRkbGV3YXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcblxuICB2YXIgbG9hZGVkTWlkZGxld2FyZSA9IFtdO1xuICB2YXIgbWlkZGxld2FyZSA9IG1pZGRsZWhvb2tzLnJlZHVjZShmdW5jdGlvbiAod2FyZSwgbmFtZSkge1xuICAgIHdhcmVbbmFtZV0gPSB3YXJlW25hbWVdIHx8IFtdO1xuICAgIHJldHVybiB3YXJlO1xuICB9LCB7XG4gICAgcHJvY2Vzc09wdGlvbnM6IFtwcm9jZXNzT3B0aW9uc10sXG4gICAgdmFsaWRhdGVPcHRpb25zOiBbdmFsaWRhdGVPcHRpb25zXVxuICB9KTtcblxuICBmdW5jdGlvbiByZXF1ZXN0KG9wdHMpIHtcbiAgICB2YXIgY2hhbm5lbHMgPSBjaGFubmVsTmFtZXMucmVkdWNlKGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IHB1YnN1YigpO1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9LCB7fSk7XG5cbiAgICAvLyBQcmVwYXJlIGEgbWlkZGxld2FyZSByZWR1Y2VyIHRoYXQgY2FuIGJlIHJldXNlZCB0aHJvdWdob3V0IHRoZSBsaWZlY3ljbGVcbiAgICB2YXIgYXBwbHlNaWRkbGV3YXJlID0gbWlkZGxld2FyZVJlZHVjZXIobWlkZGxld2FyZSk7XG5cbiAgICAvLyBQYXJzZSB0aGUgcGFzc2VkIG9wdGlvbnNcbiAgICB2YXIgb3B0aW9ucyA9IGFwcGx5TWlkZGxld2FyZSgncHJvY2Vzc09wdGlvbnMnLCBvcHRzKTtcblxuICAgIC8vIFZhbGlkYXRlIHRoZSBvcHRpb25zXG4gICAgYXBwbHlNaWRkbGV3YXJlKCd2YWxpZGF0ZU9wdGlvbnMnLCBvcHRpb25zKTtcblxuICAgIC8vIEJ1aWxkIGEgY29udGV4dCBvYmplY3Qgd2UgY2FuIHBhc3MgdG8gY2hpbGQgaGFuZGxlcnNcbiAgICB2YXIgY29udGV4dCA9IHsgb3B0aW9uczogb3B0aW9ucywgY2hhbm5lbHM6IGNoYW5uZWxzLCBhcHBseU1pZGRsZXdhcmU6IGFwcGx5TWlkZGxld2FyZVxuXG4gICAgICAvLyBXZSBuZWVkIHRvIGhvbGQgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQsIG9uZ29pbmcgcmVxdWVzdCxcbiAgICAgIC8vIGluIG9yZGVyIHRvIGFsbG93IGNhbmNlbGxhdGlvbi4gSW4gdGhlIGNhc2Ugb2YgdGhlIHJldHJ5IG1pZGRsZXdhcmUsXG4gICAgICAvLyBhIG5ldyByZXF1ZXN0IG1pZ2h0IGJlIHRyaWdnZXJlZFxuICAgIH07dmFyIG9uZ29pbmdSZXF1ZXN0ID0gbnVsbDtcbiAgICB2YXIgdW5zdWJzY3JpYmUgPSBjaGFubmVscy5yZXF1ZXN0LnN1YnNjcmliZShmdW5jdGlvbiAoY3R4KSB7XG4gICAgICAvLyBMZXQgcmVxdWVzdCBhZGFwdGVycyAobm9kZS9icm93c2VyKSBwZXJmb3JtIHRoZSBhY3R1YWwgcmVxdWVzdFxuICAgICAgb25nb2luZ1JlcXVlc3QgPSBodHRwUmVxdWVzdChjdHgsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgICByZXR1cm4gb25SZXNwb25zZShlcnIsIHJlcywgY3R4KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gSWYgd2UgYWJvcnQgdGhlIHJlcXVlc3QsIHByZXZlbnQgZnVydGhlciByZXF1ZXN0cyBmcm9tIGhhcHBlbmluZyxcbiAgICAvLyBhbmQgYmUgc3VyZSB0byBjYW5jZWwgYW55IG9uZ29pbmcgcmVxdWVzdCAob2J2aW91c2x5KVxuICAgIGNoYW5uZWxzLmFib3J0LnN1YnNjcmliZShmdW5jdGlvbiAoKSB7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgaWYgKG9uZ29pbmdSZXF1ZXN0KSB7XG4gICAgICAgIG9uZ29pbmdSZXF1ZXN0LmFib3J0KCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTZWUgaWYgYW55IG1pZGRsZXdhcmUgd2FudHMgdG8gbW9kaWZ5IHRoZSByZXR1cm4gdmFsdWUgLSBmb3IgaW5zdGFuY2VcbiAgICAvLyB0aGUgcHJvbWlzZSBvciBvYnNlcnZhYmxlIG1pZGRsZXdhcmVzXG4gICAgdmFyIHJldHVyblZhbHVlID0gYXBwbHlNaWRkbGV3YXJlKCdvblJldHVybicsIGNoYW5uZWxzLCBjb250ZXh0KTtcblxuICAgIC8vIElmIHJldHVybiB2YWx1ZSBoYXMgYmVlbiBtb2RpZmllZCBieSBhIG1pZGRsZXdhcmUsIHdlIGV4cGVjdCB0aGUgbWlkZGxld2FyZVxuICAgIC8vIHRvIHB1Ymxpc2ggb24gdGhlICdyZXF1ZXN0JyBjaGFubmVsLiBJZiBpdCBoYXNuJ3QgYmVlbiBtb2RpZmllZCwgd2Ugd2FudCB0b1xuICAgIC8vIHRyaWdnZXIgaXQgcmlnaHQgYXdheVxuICAgIGlmIChyZXR1cm5WYWx1ZSA9PT0gY2hhbm5lbHMpIHtcbiAgICAgIGNoYW5uZWxzLnJlcXVlc3QucHVibGlzaChjb250ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG5cbiAgICBmdW5jdGlvbiBvblJlc3BvbnNlKHJlcUVyciwgcmVzLCBjdHgpIHtcbiAgICAgIHZhciBlcnJvciA9IHJlcUVycjtcbiAgICAgIHZhciByZXNwb25zZSA9IHJlcztcblxuICAgICAgLy8gV2UncmUgcHJvY2Vzc2luZyBub24tZXJyb3JzIGZpcnN0LCBpbiBjYXNlIGEgbWlkZGxld2FyZSBjb252ZXJ0cyB0aGVcbiAgICAgIC8vIHJlc3BvbnNlIGludG8gYW4gZXJyb3IgKGZvciBpbnN0YW5jZSwgc3RhdHVzID49IDQwMCA9PSBIdHRwRXJyb3IpXG4gICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzcG9uc2UgPSBhcHBseU1pZGRsZXdhcmUoJ29uUmVzcG9uc2UnLCByZXMsIGN0eCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIHJlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgICBlcnJvciA9IGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBcHBseSBlcnJvciBtaWRkbGV3YXJlIC0gaWYgbWlkZGxld2FyZSByZXR1cm4gdGhlIHNhbWUgKG9yIGEgZGlmZmVyZW50KSBlcnJvcixcbiAgICAgIC8vIHB1Ymxpc2ggYXMgYW4gZXJyb3IgZXZlbnQuIElmIHdlICpkb24ndCogcmV0dXJuIGFuIGVycm9yLCBhc3N1bWUgaXQgaGFzIGJlZW4gaGFuZGxlZFxuICAgICAgZXJyb3IgPSBlcnJvciAmJiBhcHBseU1pZGRsZXdhcmUoJ29uRXJyb3InLCBlcnJvciwgY3R4KTtcblxuICAgICAgLy8gRmlndXJlIG91dCBpZiB3ZSBzaG91bGQgcHVibGlzaCBvbiBlcnJvci9yZXNwb25zZSBjaGFubmVsc1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNoYW5uZWxzLmVycm9yLnB1Ymxpc2goZXJyb3IpO1xuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZSkge1xuICAgICAgICBjaGFubmVscy5yZXNwb25zZS5wdWJsaXNoKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXF1ZXN0LnVzZSA9IGZ1bmN0aW9uIHVzZShuZXdNaWRkbGV3YXJlKSB7XG4gICAgaWYgKCFuZXdNaWRkbGV3YXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGFkZCBtaWRkbGV3YXJlIHRoYXQgcmVzb2x2ZWQgdG8gZmFsc2V5IHZhbHVlJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBuZXdNaWRkbGV3YXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyaWVkIHRvIGFkZCBtaWRkbGV3YXJlIHRoYXQgd2FzIGEgZnVuY3Rpb24uIEl0IHByb2JhYmx5IGV4cGVjdHMgeW91IHRvIHBhc3Mgb3B0aW9ucyB0byBpdC4nKTtcbiAgICB9XG5cbiAgICBpZiAobmV3TWlkZGxld2FyZS5vblJldHVybiAmJiBtaWRkbGV3YXJlLm9uUmV0dXJuLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVHJpZWQgdG8gYWRkIG5ldyBtaWRkbGV3YXJlIHdpdGggYG9uUmV0dXJuYCBoYW5kbGVyLCBidXQgYW5vdGhlciBoYW5kbGVyIGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCBmb3IgdGhpcyBldmVudCcpO1xuICAgIH1cblxuICAgIG1pZGRsZWhvb2tzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKG5ld01pZGRsZXdhcmVba2V5XSkge1xuICAgICAgICBtaWRkbGV3YXJlW2tleV0ucHVzaChuZXdNaWRkbGV3YXJlW2tleV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbG9hZGVkTWlkZGxld2FyZS5wdXNoKG5ld01pZGRsZXdhcmUpO1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9O1xuXG4gIHJlcXVlc3QuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICByZXR1cm4gY3JlYXRlUmVxdWVzdGVyKGxvYWRlZE1pZGRsZXdhcmUpO1xuICB9O1xuXG4gIGluaXRNaWRkbGV3YXJlLmZvckVhY2gocmVxdWVzdC51c2UpO1xuXG4gIHJldHVybiByZXF1ZXN0O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWItbm9kZScpXG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLW5lZ2F0ZWQtY29uZGl0aW9uICovXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdsb2JhbC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi91dGlsL2dsb2JhbCcpO1xudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcblxuICB2YXIgT2JzZXJ2YWJsZSA9IG9wdHMuaW1wbGVtZW50YXRpb24gfHwgZ2xvYmFsLk9ic2VydmFibGU7XG4gIGlmICghT2JzZXJ2YWJsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignYE9ic2VydmFibGVgIGlzIG5vdCBhdmFpbGFibGUgaW4gZ2xvYmFsIHNjb3BlLCBhbmQgbm8gaW1wbGVtZW50YXRpb24gd2FzIHBhc3NlZCcpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvblJldHVybjogZnVuY3Rpb24gb25SZXR1cm4oY2hhbm5lbHMsIGNvbnRleHQpIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgY2hhbm5lbHMuZXJyb3Iuc3Vic2NyaWJlKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNoYW5uZWxzLnByb2dyZXNzLnN1YnNjcmliZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIubmV4dChvYmplY3RBc3NpZ24oeyB0eXBlOiAncHJvZ3Jlc3MnIH0sIGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjaGFubmVscy5yZXNwb25zZS5zdWJzY3JpYmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIubmV4dChvYmplY3RBc3NpZ24oeyB0eXBlOiAncmVzcG9uc2UnIH0sIHJlc3BvbnNlKSk7XG4gICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2hhbm5lbHMucmVxdWVzdC5wdWJsaXNoKGNvbnRleHQpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjaGFubmVscy5hYm9ydC5wdWJsaXNoKCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCIvKiFcbiAqIGlzb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pc29iamVjdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNywgSm9uIFNjaGxpbmtlcnQuXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheSh2YWwpID09PSBmYWxzZTtcbn07XG4iLCIvKiFcbiAqIGlzLXBsYWluLW9iamVjdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvaXMtcGxhaW4tb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJ2lzb2JqZWN0Jyk7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0T2JqZWN0KG8pIHtcbiAgcmV0dXJuIGlzT2JqZWN0KG8pID09PSB0cnVlXG4gICAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG8pIHtcbiAgdmFyIGN0b3IscHJvdDtcblxuICBpZiAoaXNPYmplY3RPYmplY3QobykgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgaGFzIG1vZGlmaWVkIGNvbnN0cnVjdG9yXG4gIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuICBpZiAodHlwZW9mIGN0b3IgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiBoYXMgbW9kaWZpZWQgcHJvdG90eXBlXG4gIHByb3QgPSBjdG9yLnByb3RvdHlwZTtcbiAgaWYgKGlzT2JqZWN0T2JqZWN0KHByb3QpID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIGNvbnN0cnVjdG9yIGRvZXMgbm90IGhhdmUgYW4gT2JqZWN0LXNwZWNpZmljIG1ldGhvZFxuICBpZiAocHJvdC5oYXNPd25Qcm9wZXJ0eSgnaXNQcm90b3R5cGVPZicpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIE1vc3QgbGlrZWx5IGEgcGxhaW4gT2JqZWN0XG4gIHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgb2JqZWN0QXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdpcy1wbGFpbi1vYmplY3QnKTtcblxudmFyIHNlcmlhbGl6ZVR5cGVzID0gWydib29sZWFuJywgJ3N0cmluZycsICdudW1iZXInXTtcbnZhciBpc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHByb2Nlc3NPcHRpb25zOiBmdW5jdGlvbiBwcm9jZXNzT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgIH1cblxuICAgICAgdmFyIGlzU3RyZWFtID0gdHlwZW9mIGJvZHkucGlwZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIHZhciBzaG91bGRTZXJpYWxpemUgPSAhaXNTdHJlYW0gJiYgIWlzQnVmZmVyKGJvZHkpICYmIChzZXJpYWxpemVUeXBlcy5pbmRleE9mKHR5cGVvZiBib2R5ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihib2R5KSkgIT09IC0xIHx8IEFycmF5LmlzQXJyYXkoYm9keSkgfHwgaXNQbGFpbk9iamVjdChib2R5KSk7XG5cbiAgICAgIGlmICghc2hvdWxkU2VyaWFsaXplKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqZWN0QXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYm9keSksXG4gICAgICAgIGhlYWRlcnM6IG9iamVjdEFzc2lnbih7fSwgb3B0aW9ucy5oZWFkZXJzLCB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzb25SZXF1ZXN0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9iamVjdEFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0cykge1xuICByZXR1cm4ge1xuICAgIG9uUmVzcG9uc2U6IGZ1bmN0aW9uIG9uUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICAgIHZhciBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgICAgdmFyIHNob3VsZERlY29kZSA9IG9wdHMgJiYgb3B0cy5mb3JjZSB8fCBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgIT09IC0xO1xuICAgICAgaWYgKCFyZXNwb25zZS5ib2R5IHx8ICFjb250ZW50VHlwZSB8fCAhc2hvdWxkRGVjb2RlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iamVjdEFzc2lnbih7fSwgcmVzcG9uc2UsIHsgYm9keTogdHJ5UGFyc2UocmVzcG9uc2UuYm9keSkgfSk7XG4gICAgfSxcblxuICAgIHByb2Nlc3NPcHRpb25zOiBmdW5jdGlvbiBwcm9jZXNzT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb2JqZWN0QXNzaWduKHt9LCBvcHRpb25zLCB7XG4gICAgICAgIGhlYWRlcnM6IG9iamVjdEFzc2lnbih7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nIH0sIG9wdGlvbnMuaGVhZGVycylcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHRyeVBhcnNlKGJvZHkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShib2R5KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyLm1lc3NhZ2UgPSAnRmFpbGVkIHRvIHBhcnNlZCByZXNwb25zZSBib2R5IGFzIEpTT046ICcgKyBlcnIubWVzc2FnZTtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzb25SZXNwb25zZS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIG9uUmVxdWVzdDogZnVuY3Rpb24gb25SZXF1ZXN0KGV2dCkge1xuICAgICAgaWYgKGV2dC5hZGFwdGVyICE9PSAneGhyJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBldnQucmVxdWVzdDtcbiAgICAgIHZhciBjb250ZXh0ID0gZXZ0LmNvbnRleHQ7XG5cbiAgICAgIGlmICgndXBsb2FkJyBpbiB4aHIgJiYgJ29ucHJvZ3Jlc3MnIGluIHhoci51cGxvYWQpIHtcbiAgICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MoJ3VwbG9hZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoJ29ucHJvZ3Jlc3MnIGluIHhocikge1xuICAgICAgICB4aHIub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzKCdkb3dubG9hZCcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcyhzdGFnZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHBlcmNlbnQgPSBldmVudC5sZW5ndGhDb21wdXRhYmxlID8gZXZlbnQubG9hZGVkIC8gZXZlbnQudG90YWwgKiAxMDAgOiAtMTtcbiAgICAgICAgICBjb250ZXh0LmNoYW5uZWxzLnByb2dyZXNzLnB1Ymxpc2goe1xuICAgICAgICAgICAgc3RhZ2U6IHN0YWdlLFxuICAgICAgICAgICAgcGVyY2VudDogcGVyY2VudCxcbiAgICAgICAgICAgIHRvdGFsOiBldmVudC50b3RhbCxcbiAgICAgICAgICAgIGxvYWRlZDogZXZlbnQubG9hZGVkLFxuICAgICAgICAgICAgbGVuZ3RoQ29tcHV0YWJsZTogZXZlbnQubGVuZ3RoQ29tcHV0YWJsZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1icm93c2VyLXByb2dyZXNzLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL25vZGUtcHJvZ3Jlc3MnKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIi8vIElTQyBAIEp1bGllbiBGb250YW5ldFxuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG52YXIgY29uc3RydWN0ID0gdHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgPyBSZWZsZWN0LmNvbnN0cnVjdCA6IHVuZGVmaW5lZDtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY2FwdHVyZVN0YWNrVHJhY2UgPSBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZTtcbmlmIChjYXB0dXJlU3RhY2tUcmFjZSA9PT0gdW5kZWZpbmVkKSB7XG4gIGNhcHR1cmVTdGFja1RyYWNlID0gZnVuY3Rpb24gY2FwdHVyZVN0YWNrVHJhY2UoZXJyb3IpIHtcbiAgICB2YXIgY29udGFpbmVyID0gbmV3IEVycm9yKCk7XG5cbiAgICBkZWZpbmVQcm9wZXJ0eShlcnJvciwgXCJzdGFja1wiLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldFN0YWNrKCkge1xuICAgICAgICB2YXIgc3RhY2sgPSBjb250YWluZXIuc3RhY2s7XG5cbiAgICAgICAgLy8gUmVwbGFjZSBwcm9wZXJ0eSB3aXRoIHZhbHVlIGZvciBmYXN0ZXIgZnV0dXJlIGFjY2Vzc2VzLlxuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN0YWNrXCIsIHtcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgdmFsdWU6IHN0YWNrLFxuICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc3RhY2s7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXRTdGFjayhzdGFjaykge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eShlcnJvciwgXCJzdGFja1wiLCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIHZhbHVlOiBzdGFjayxcbiAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEJhc2VFcnJvcihtZXNzYWdlKSB7XG4gIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm1lc3NhZ2VcIiwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IG1lc3NhZ2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBjbmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKGNuYW1lICE9PSB1bmRlZmluZWQgJiYgY25hbWUgIT09IHRoaXMubmFtZSkge1xuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsIFwibmFtZVwiLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogY25hbWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xufVxuXG5CYXNlRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vSnNDb21tdW5pdHkvbWFrZS1lcnJvci9pc3N1ZXMvNFxuICBjb25zdHJ1Y3Rvcjoge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogQmFzZUVycm9yLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICB9LFxufSk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gU2V0cyB0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIGlmIHBvc3NpYmxlIChkZXBlbmRzIG9mIHRoZSBKUyBlbmdpbmUpLlxudmFyIHNldEZ1bmN0aW9uTmFtZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2V0RnVuY3Rpb25OYW1lKGZuLCBuYW1lKSB7XG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZuLCBcIm5hbWVcIiwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IG5hbWUsXG4gICAgfSk7XG4gIH1cbiAgdHJ5IHtcbiAgICB2YXIgZiA9IGZ1bmN0aW9uKCkge307XG4gICAgc2V0RnVuY3Rpb25OYW1lKGYsIFwiZm9vXCIpO1xuICAgIGlmIChmLm5hbWUgPT09IFwiZm9vXCIpIHtcbiAgICAgIHJldHVybiBzZXRGdW5jdGlvbk5hbWU7XG4gICAgfVxuICB9IGNhdGNoIChfKSB7fVxufSkoKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBtYWtlRXJyb3IoY29uc3RydWN0b3IsIHN1cGVyXykge1xuICBpZiAoc3VwZXJfID09IG51bGwgfHwgc3VwZXJfID09PSBFcnJvcikge1xuICAgIHN1cGVyXyA9IEJhc2VFcnJvcjtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3VwZXJfICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwic3VwZXJfIHNob3VsZCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgdmFyIG5hbWU7XG4gIGlmICh0eXBlb2YgY29uc3RydWN0b3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICBuYW1lID0gY29uc3RydWN0b3I7XG4gICAgY29uc3RydWN0b3IgPVxuICAgICAgY29uc3RydWN0ICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Qoc3VwZXJfLCBhcmd1bWVudHMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHN1cGVyXy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG5cbiAgICAvLyBJZiB0aGUgbmFtZSBjYW4gYmUgc2V0LCBkbyBpdCBvbmNlIGFuZCBmb3IgYWxsLlxuICAgIGlmIChzZXRGdW5jdGlvbk5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0RnVuY3Rpb25OYW1lKGNvbnN0cnVjdG9yLCBuYW1lKTtcbiAgICAgIG5hbWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBjb25zdHJ1Y3RvciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImNvbnN0cnVjdG9yIHNob3VsZCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIC8vIEFsc28gcmVnaXN0ZXIgdGhlIHN1cGVyIGNvbnN0cnVjdG9yIGFsc28gYXMgYGNvbnN0cnVjdG9yLnN1cGVyX2AganVzdFxuICAvLyBsaWtlIE5vZGUncyBgdXRpbC5pbmhlcml0cygpYC5cbiAgLy9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRvdC1ub3RhdGlvblxuICBjb25zdHJ1Y3Rvci5zdXBlcl8gPSBjb25zdHJ1Y3RvcltcInN1cGVyXCJdID0gc3VwZXJfO1xuXG4gIHZhciBwcm9wZXJ0aWVzID0ge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogY29uc3RydWN0b3IsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICB9LFxuICB9O1xuXG4gIC8vIElmIHRoZSBuYW1lIGNvdWxkIG5vdCBiZSBzZXQgb24gdGhlIGNvbnN0cnVjdG9yLCBzZXQgaXQgb24gdGhlXG4gIC8vIHByb3RvdHlwZS5cbiAgaWYgKG5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHByb3BlcnRpZXMubmFtZSA9IHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBuYW1lLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgfTtcbiAgfVxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyXy5wcm90b3R5cGUsIHByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25zdHJ1Y3Rvcjtcbn1cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IG1ha2VFcnJvcjtcbmV4cG9ydHMuQmFzZUVycm9yID0gQmFzZUVycm9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtYWtlRXJyb3IgPSByZXF1aXJlKCdtYWtlLWVycm9yJyk7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbmZ1bmN0aW9uIENsaWVudEVycm9yKHJlcykge1xuICB2YXIgcHJvcHMgPSBleHRyYWN0RXJyb3JQcm9wcyhyZXMpO1xuICBDbGllbnRFcnJvci5zdXBlci5jYWxsKHRoaXMsIHByb3BzLm1lc3NhZ2UpO1xuICBhc3NpZ24odGhpcywgcHJvcHMpO1xufVxuXG5mdW5jdGlvbiBTZXJ2ZXJFcnJvcihyZXMpIHtcbiAgdmFyIHByb3BzID0gZXh0cmFjdEVycm9yUHJvcHMocmVzKTtcbiAgU2VydmVyRXJyb3Iuc3VwZXIuY2FsbCh0aGlzLCBwcm9wcy5tZXNzYWdlKTtcbiAgYXNzaWduKHRoaXMsIHByb3BzKTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEVycm9yUHJvcHMocmVzKSB7XG4gIHZhciBib2R5ID0gcmVzLmJvZHk7XG4gIHZhciBwcm9wcyA9IHtcbiAgICByZXNwb25zZTogcmVzLFxuICAgIHN0YXR1c0NvZGU6IHJlcy5zdGF0dXNDb2RlLFxuICAgIHJlc3BvbnNlQm9keTogc3RyaW5naWZ5Qm9keShib2R5LCByZXMpXG4gIH07IC8vIEFQSS9Cb29tIHN0eWxlIGVycm9ycyAoe3N0YXR1c0NvZGUsIGVycm9yLCBtZXNzYWdlfSlcblxuICBpZiAoYm9keS5lcnJvciAmJiBib2R5Lm1lc3NhZ2UpIHtcbiAgICBwcm9wcy5tZXNzYWdlID0gXCJcIi5jb25jYXQoYm9keS5lcnJvciwgXCIgLSBcIikuY29uY2F0KGJvZHkubWVzc2FnZSk7XG4gICAgcmV0dXJuIHByb3BzO1xuICB9IC8vIFF1ZXJ5L2RhdGFiYXNlIGVycm9ycyAoe2Vycm9yOiB7ZGVzY3JpcHRpb24sIG90aGVyLCBhcmIsIHByb3BzfX0pXG5cblxuICBpZiAoYm9keS5lcnJvciAmJiBib2R5LmVycm9yLmRlc2NyaXB0aW9uKSB7XG4gICAgcHJvcHMubWVzc2FnZSA9IGJvZHkuZXJyb3IuZGVzY3JpcHRpb247XG4gICAgcHJvcHMuZGV0YWlscyA9IGJvZHkuZXJyb3I7XG4gICAgcmV0dXJuIHByb3BzO1xuICB9IC8vIE90aGVyLCBtb3JlIGFyYml0cmFyeSBlcnJvcnNcblxuXG4gIHByb3BzLm1lc3NhZ2UgPSBib2R5LmVycm9yIHx8IGJvZHkubWVzc2FnZSB8fCBodHRwRXJyb3JNZXNzYWdlKHJlcyk7XG4gIHJldHVybiBwcm9wcztcbn1cblxuZnVuY3Rpb24gaHR0cEVycm9yTWVzc2FnZShyZXMpIHtcbiAgdmFyIHN0YXR1c01lc3NhZ2UgPSByZXMuc3RhdHVzTWVzc2FnZSA/IFwiIFwiLmNvbmNhdChyZXMuc3RhdHVzTWVzc2FnZSkgOiAnJztcbiAgcmV0dXJuIFwiXCIuY29uY2F0KHJlcy5tZXRob2QsIFwiLXJlcXVlc3QgdG8gXCIpLmNvbmNhdChyZXMudXJsLCBcIiByZXN1bHRlZCBpbiBIVFRQIFwiKS5jb25jYXQocmVzLnN0YXR1c0NvZGUpLmNvbmNhdChzdGF0dXNNZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5Qm9keShib2R5LCByZXMpIHtcbiAgdmFyIGNvbnRlbnRUeXBlID0gKHJlcy5oZWFkZXJzWydjb250ZW50LXR5cGUnXSB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGlzSnNvbiA9IGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSAhPT0gLTE7XG4gIHJldHVybiBpc0pzb24gPyBKU09OLnN0cmluZ2lmeShib2R5LCBudWxsLCAyKSA6IGJvZHk7XG59XG5cbm1ha2VFcnJvcihDbGllbnRFcnJvcik7XG5tYWtlRXJyb3IoU2VydmVyRXJyb3IpO1xuZXhwb3J0cy5DbGllbnRFcnJvciA9IENsaWVudEVycm9yO1xuZXhwb3J0cy5TZXJ2ZXJFcnJvciA9IFNlcnZlckVycm9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtdOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eS1mdW5jdGlvbiwgbm8tcHJvY2Vzcy1lbnYgKi9cbnZhciBnZXRJdCA9IHJlcXVpcmUoJ2dldC1pdCcpO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgb2JzZXJ2YWJsZSA9IHJlcXVpcmUoJ2dldC1pdC9saWIvbWlkZGxld2FyZS9vYnNlcnZhYmxlJyk7XG5cbnZhciBqc29uUmVxdWVzdCA9IHJlcXVpcmUoJ2dldC1pdC9saWIvbWlkZGxld2FyZS9qc29uUmVxdWVzdCcpO1xuXG52YXIganNvblJlc3BvbnNlID0gcmVxdWlyZSgnZ2V0LWl0L2xpYi9taWRkbGV3YXJlL2pzb25SZXNwb25zZScpO1xuXG52YXIgcHJvZ3Jlc3MgPSByZXF1aXJlKCdnZXQtaXQvbGliL21pZGRsZXdhcmUvcHJvZ3Jlc3MnKTtcblxudmFyIE9ic2VydmFibGUgPSByZXF1aXJlKCdAc2FuaXR5L29ic2VydmFibGUvbWluaW1hbCcpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCcuL2Vycm9ycycpLFxuICAgIENsaWVudEVycm9yID0gX3JlcXVpcmUuQ2xpZW50RXJyb3IsXG4gICAgU2VydmVyRXJyb3IgPSBfcmVxdWlyZS5TZXJ2ZXJFcnJvcjtcblxudmFyIGh0dHBFcnJvciA9IHtcbiAgb25SZXNwb25zZTogZnVuY3Rpb24gb25SZXNwb25zZShyZXMpIHtcbiAgICBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNTAwKSB7XG4gICAgICB0aHJvdyBuZXcgU2VydmVyRXJyb3IocmVzKTtcbiAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlID49IDQwMCkge1xuICAgICAgdGhyb3cgbmV3IENsaWVudEVycm9yKHJlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufTsgLy8gRW52aXJvbm1lbnQtc3BlY2lmaWMgbWlkZGxld2FyZS5cblxudmFyIGVudlNwZWNpZmljID0gcmVxdWlyZSgnLi9ub2RlTWlkZGxld2FyZScpO1xuXG52YXIgbWlkZGxld2FyZSA9IGVudlNwZWNpZmljLmNvbmNhdChbanNvblJlcXVlc3QoKSwganNvblJlc3BvbnNlKCksIHByb2dyZXNzKCksIGh0dHBFcnJvciwgb2JzZXJ2YWJsZSh7XG4gIGltcGxlbWVudGF0aW9uOiBPYnNlcnZhYmxlXG59KV0pO1xudmFyIHJlcXVlc3QgPSBnZXRJdChtaWRkbGV3YXJlKTtcblxuZnVuY3Rpb24gaHR0cFJlcXVlc3Qob3B0aW9ucykge1xuICB2YXIgcmVxdWVzdGVyID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiByZXF1ZXN0O1xuICByZXR1cm4gcmVxdWVzdGVyKGFzc2lnbih7XG4gICAgbWF4UmVkaXJlY3RzOiAwXG4gIH0sIG9wdGlvbnMpKTtcbn1cblxuaHR0cFJlcXVlc3QuZGVmYXVsdFJlcXVlc3RlciA9IHJlcXVlc3Q7XG5odHRwUmVxdWVzdC5DbGllbnRFcnJvciA9IENsaWVudEVycm9yO1xuaHR0cFJlcXVlc3QuU2VydmVyRXJyb3IgPSBTZXJ2ZXJFcnJvcjtcbm1vZHVsZS5leHBvcnRzID0gaHR0cFJlcXVlc3Q7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBwcm9qZWN0SGVhZGVyID0gJ1gtU2FuaXR5LVByb2plY3QtSUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgdmFyIG92ZXJyaWRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gIHZhciBoZWFkZXJzID0ge307XG4gIHZhciB0b2tlbiA9IG92ZXJyaWRlcy50b2tlbiB8fCBjb25maWcudG9rZW47XG5cbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gXCJCZWFyZXIgXCIuY29uY2F0KHRva2VuKTtcbiAgfVxuXG4gIGlmICghb3ZlcnJpZGVzLnVzZUdsb2JhbEFwaSAmJiAhY29uZmlnLnVzZVByb2plY3RIb3N0bmFtZSAmJiBjb25maWcucHJvamVjdElkKSB7XG4gICAgaGVhZGVyc1twcm9qZWN0SGVhZGVyXSA9IGNvbmZpZy5wcm9qZWN0SWQ7XG4gIH1cblxuICB2YXIgd2l0aENyZWRlbnRpYWxzID0gQm9vbGVhbih0eXBlb2Ygb3ZlcnJpZGVzLndpdGhDcmVkZW50aWFscyA9PT0gJ3VuZGVmaW5lZCcgPyBjb25maWcudG9rZW4gfHwgY29uZmlnLndpdGhDcmVkZW50aWFscyA6IG92ZXJyaWRlcy53aXRoQ3JlZGVudGlhbHMpO1xuICB2YXIgdGltZW91dCA9IHR5cGVvZiBvdmVycmlkZXMudGltZW91dCA9PT0gJ3VuZGVmaW5lZCcgPyBjb25maWcudGltZW91dCA6IG92ZXJyaWRlcy50aW1lb3V0O1xuICByZXR1cm4gYXNzaWduKHt9LCBvdmVycmlkZXMsIHtcbiAgICBoZWFkZXJzOiBhc3NpZ24oe30sIGhlYWRlcnMsIG92ZXJyaWRlcy5oZWFkZXJzIHx8IHt9KSxcbiAgICB0aW1lb3V0OiB0eXBlb2YgdGltZW91dCA9PT0gJ3VuZGVmaW5lZCcgPyA1ICogNjAgKiAxMDAwIDogdGltZW91dCxcbiAgICBqc29uOiB0cnVlLFxuICAgIHdpdGhDcmVkZW50aWFsczogd2l0aENyZWRlbnRpYWxzXG4gIH0pO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGdlbmVyYXRlSGVscFVybCA9IHJlcXVpcmUoJ0BzYW5pdHkvZ2VuZXJhdGUtaGVscC11cmwnKTtcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi92YWxpZGF0b3JzJyk7XG5cbnZhciBvbmNlID0gcmVxdWlyZSgnLi91dGlsL29uY2UnKTtcblxudmFyIGRlZmF1bHRDZG5Ib3N0ID0gJ2FwaWNkbi5zYW5pdHkuaW8nO1xudmFyIGRlZmF1bHRDb25maWcgPSB7XG4gIGFwaUhvc3Q6ICdodHRwczovL2FwaS5zYW5pdHkuaW8nLFxuICB1c2VQcm9qZWN0SG9zdG5hbWU6IHRydWUsXG4gIGdyYWRpZW50TW9kZTogZmFsc2UsXG4gIGlzUHJvbWlzZUFQSTogdHJ1ZVxufTtcbnZhciBMT0NBTEhPU1RTID0gWydsb2NhbGhvc3QnLCAnMTI3LjAuMC4xJywgJzAuMC4wLjAnXTtcblxudmFyIGlzTG9jYWwgPSBmdW5jdGlvbiBpc0xvY2FsKGhvc3QpIHtcbiAgcmV0dXJuIExPQ0FMSE9TVFMuaW5kZXhPZihob3N0KSAhPT0gLTE7XG59OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXG5cbnZhciBjcmVhdGVXYXJuaW5nUHJpbnRlciA9IGZ1bmN0aW9uIGNyZWF0ZVdhcm5pbmdQcmludGVyKG1lc3NhZ2UpIHtcbiAgcmV0dXJuIG9uY2UoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjb25zb2xlLndhcm4obWVzc2FnZS5qb2luKCcgJykpO1xuICB9KTtcbn07XG5cbnZhciBwcmludENkbldhcm5pbmcgPSBjcmVhdGVXYXJuaW5nUHJpbnRlcihbJ1lvdSBhcmUgbm90IHVzaW5nIHRoZSBTYW5pdHkgQ0ROLiBUaGF0IG1lYW5zIHlvdXIgZGF0YSBpcyBhbHdheXMgZnJlc2gsIGJ1dCB0aGUgQ0ROIGlzIGZhc3RlciBhbmQnLCBcImNoZWFwZXIuIFRoaW5rIGFib3V0IGl0ISBGb3IgbW9yZSBpbmZvLCBzZWUgXCIuY29uY2F0KGdlbmVyYXRlSGVscFVybCgnanMtY2xpZW50LWNkbi1jb25maWd1cmF0aW9uJyksIFwiLlwiKSwgJ1RvIGhpZGUgdGhpcyB3YXJuaW5nLCBwbGVhc2Ugc2V0IHRoZSBgdXNlQ2RuYCBvcHRpb24gdG8gZWl0aGVyIGB0cnVlYCBvciBgZmFsc2VgIHdoZW4gY3JlYXRpbmcnLCAndGhlIGNsaWVudC4nXSk7XG52YXIgcHJpbnRCcm93c2VyVG9rZW5XYXJuaW5nID0gY3JlYXRlV2FybmluZ1ByaW50ZXIoWydZb3UgaGF2ZSBjb25maWd1cmVkIFNhbml0eSBjbGllbnQgdG8gdXNlIGEgdG9rZW4gaW4gdGhlIGJyb3dzZXIuIFRoaXMgbWF5IGNhdXNlIHVuaW50ZW50aW9uYWwgc2VjdXJpdHkgaXNzdWVzLicsIFwiU2VlIFwiLmNvbmNhdChnZW5lcmF0ZUhlbHBVcmwoJ2pzLWNsaWVudC1icm93c2VyLXRva2VuJyksIFwiIGZvciBtb3JlIGluZm9ybWF0aW9uIGFuZCBob3cgdG8gaGlkZSB0aGlzIHdhcm5pbmcuXCIpXSk7XG52YXIgcHJpbnRDZG5Ub2tlbldhcm5pbmcgPSBjcmVhdGVXYXJuaW5nUHJpbnRlcihbJ1lvdSBoYXZlIHNldCBgdXNlQ2RuYCB0byBgdHJ1ZWAgd2hpbGUgYWxzbyBzcGVjaWZ5aW5nIGEgdG9rZW4uIFRoaXMgaXMgdXN1YWxseSBub3Qgd2hhdCB5b3UnLCAnd2FudC4gVGhlIENETiBjYW5ub3QgYmUgdXNlZCB3aXRoIGFuIGF1dGhvcml6YXRpb24gdG9rZW4sIHNpbmNlIHByaXZhdGUgZGF0YSBjYW5ub3QgYmUgY2FjaGVkLicsIFwiU2VlIFwiLmNvbmNhdChnZW5lcmF0ZUhlbHBVcmwoJ2pzLWNsaWVudC11c2VjZG4tdG9rZW4nKSwgXCIgZm9yIG1vcmUgaW5mb3JtYXRpb24uXCIpXSk7XG5leHBvcnRzLmRlZmF1bHRDb25maWcgPSBkZWZhdWx0Q29uZmlnO1xuXG5leHBvcnRzLmluaXRDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnLCBwcmV2Q29uZmlnKSB7XG4gIHZhciBuZXdDb25maWcgPSBhc3NpZ24oe30sIGRlZmF1bHRDb25maWcsIHByZXZDb25maWcsIGNvbmZpZyk7XG4gIHZhciBncmFkaWVudE1vZGUgPSBuZXdDb25maWcuZ3JhZGllbnRNb2RlO1xuICB2YXIgcHJvamVjdEJhc2VkID0gIWdyYWRpZW50TW9kZSAmJiBuZXdDb25maWcudXNlUHJvamVjdEhvc3RuYW1lO1xuXG4gIGlmICh0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB2YXIgaGVscFVybCA9IGdlbmVyYXRlSGVscFVybCgnanMtY2xpZW50LXByb21pc2UtcG9seWZpbGwnKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBuYXRpdmUgUHJvbWlzZS1pbXBsZW1lbnRhdGlvbiBmb3VuZCwgcG9seWZpbGwgbmVlZGVkIC0gc2VlIFwiLmNvbmNhdChoZWxwVXJsKSk7XG4gIH1cblxuICBpZiAoZ3JhZGllbnRNb2RlICYmICFuZXdDb25maWcubmFtZXNwYWNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb25maWd1cmF0aW9uIG11c3QgY29udGFpbiBgbmFtZXNwYWNlYCB3aGVuIHJ1bm5pbmcgaW4gZ3JhZGllbnQgbW9kZScpO1xuICB9XG5cbiAgaWYgKHByb2plY3RCYXNlZCAmJiAhbmV3Q29uZmlnLnByb2plY3RJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ29uZmlndXJhdGlvbiBtdXN0IGNvbnRhaW4gYHByb2plY3RJZGAnKTtcbiAgfVxuXG4gIHZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubG9jYXRpb24gJiYgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuICB2YXIgaXNMb2NhbGhvc3QgPSBpc0Jyb3dzZXIgJiYgaXNMb2NhbCh3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpO1xuXG4gIGlmIChpc0Jyb3dzZXIgJiYgaXNMb2NhbGhvc3QgJiYgbmV3Q29uZmlnLnRva2VuICYmIG5ld0NvbmZpZy5pZ25vcmVCcm93c2VyVG9rZW5XYXJuaW5nICE9PSB0cnVlKSB7XG4gICAgcHJpbnRCcm93c2VyVG9rZW5XYXJuaW5nKCk7XG4gIH0gZWxzZSBpZiAoKCFpc0Jyb3dzZXIgfHwgaXNMb2NhbGhvc3QpICYmIG5ld0NvbmZpZy51c2VDZG4gJiYgbmV3Q29uZmlnLnRva2VuKSB7XG4gICAgcHJpbnRDZG5Ub2tlbldhcm5pbmcoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbmV3Q29uZmlnLnVzZUNkbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBwcmludENkbldhcm5pbmcoKTtcbiAgfVxuXG4gIGlmIChwcm9qZWN0QmFzZWQpIHtcbiAgICB2YWxpZGF0ZS5wcm9qZWN0SWQobmV3Q29uZmlnLnByb2plY3RJZCk7XG4gIH1cblxuICBpZiAoIWdyYWRpZW50TW9kZSAmJiBuZXdDb25maWcuZGF0YXNldCkge1xuICAgIHZhbGlkYXRlLmRhdGFzZXQobmV3Q29uZmlnLmRhdGFzZXQsIG5ld0NvbmZpZy5ncmFkaWVudE1vZGUpO1xuICB9XG5cbiAgbmV3Q29uZmlnLmlzRGVmYXVsdEFwaSA9IG5ld0NvbmZpZy5hcGlIb3N0ID09PSBkZWZhdWx0Q29uZmlnLmFwaUhvc3Q7XG4gIG5ld0NvbmZpZy51c2VDZG4gPSBCb29sZWFuKG5ld0NvbmZpZy51c2VDZG4pICYmICFuZXdDb25maWcudG9rZW4gJiYgIW5ld0NvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG5cbiAgaWYgKG5ld0NvbmZpZy5ncmFkaWVudE1vZGUpIHtcbiAgICBuZXdDb25maWcudXJsID0gbmV3Q29uZmlnLmFwaUhvc3Q7XG4gICAgbmV3Q29uZmlnLmNkblVybCA9IG5ld0NvbmZpZy5hcGlIb3N0O1xuICB9IGVsc2Uge1xuICAgIHZhciBob3N0UGFydHMgPSBuZXdDb25maWcuYXBpSG9zdC5zcGxpdCgnOi8vJywgMik7XG4gICAgdmFyIHByb3RvY29sID0gaG9zdFBhcnRzWzBdO1xuICAgIHZhciBob3N0ID0gaG9zdFBhcnRzWzFdO1xuICAgIHZhciBjZG5Ib3N0ID0gbmV3Q29uZmlnLmlzRGVmYXVsdEFwaSA/IGRlZmF1bHRDZG5Ib3N0IDogaG9zdDtcblxuICAgIGlmIChuZXdDb25maWcudXNlUHJvamVjdEhvc3RuYW1lKSB7XG4gICAgICBuZXdDb25maWcudXJsID0gXCJcIi5jb25jYXQocHJvdG9jb2wsIFwiOi8vXCIpLmNvbmNhdChuZXdDb25maWcucHJvamVjdElkLCBcIi5cIikuY29uY2F0KGhvc3QsIFwiL3YxXCIpO1xuICAgICAgbmV3Q29uZmlnLmNkblVybCA9IFwiXCIuY29uY2F0KHByb3RvY29sLCBcIjovL1wiKS5jb25jYXQobmV3Q29uZmlnLnByb2plY3RJZCwgXCIuXCIpLmNvbmNhdChjZG5Ib3N0LCBcIi92MVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3Q29uZmlnLnVybCA9IFwiXCIuY29uY2F0KG5ld0NvbmZpZy5hcGlIb3N0LCBcIi92MVwiKTtcbiAgICAgIG5ld0NvbmZpZy5jZG5VcmwgPSBuZXdDb25maWcudXJsO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdDb25maWc7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgX3JlcXVpcmUgPSByZXF1aXJlKCdAc2FuaXR5L29ic2VydmFibGUvb3BlcmF0b3JzL2ZpbHRlcicpLFxuICAgIGZpbHRlciA9IF9yZXF1aXJlLmZpbHRlcjtcblxudmFyIF9yZXF1aXJlMiA9IHJlcXVpcmUoJ0BzYW5pdHkvb2JzZXJ2YWJsZS9vcGVyYXRvcnMvbWFwJyksXG4gICAgbWFwID0gX3JlcXVpcmUyLm1hcDtcblxudmFyIFBhdGNoID0gcmVxdWlyZSgnLi9kYXRhL3BhdGNoJyk7XG5cbnZhciBUcmFuc2FjdGlvbiA9IHJlcXVpcmUoJy4vZGF0YS90cmFuc2FjdGlvbicpO1xuXG52YXIgZGF0YU1ldGhvZHMgPSByZXF1aXJlKCcuL2RhdGEvZGF0YU1ldGhvZHMnKTtcblxudmFyIERhdGFzZXRzQ2xpZW50ID0gcmVxdWlyZSgnLi9kYXRhc2V0cy9kYXRhc2V0c0NsaWVudCcpO1xuXG52YXIgUHJvamVjdHNDbGllbnQgPSByZXF1aXJlKCcuL3Byb2plY3RzL3Byb2plY3RzQ2xpZW50Jyk7XG5cbnZhciBBc3NldHNDbGllbnQgPSByZXF1aXJlKCcuL2Fzc2V0cy9hc3NldHNDbGllbnQnKTtcblxudmFyIFVzZXJzQ2xpZW50ID0gcmVxdWlyZSgnLi91c2Vycy91c2Vyc0NsaWVudCcpO1xuXG52YXIgQXV0aENsaWVudCA9IHJlcXVpcmUoJy4vYXV0aC9hdXRoQ2xpZW50Jyk7XG5cbnZhciBodHRwUmVxdWVzdCA9IHJlcXVpcmUoJy4vaHR0cC9yZXF1ZXN0Jyk7XG5cbnZhciBnZXRSZXF1ZXN0T3B0aW9ucyA9IHJlcXVpcmUoJy4vaHR0cC9yZXF1ZXN0T3B0aW9ucycpO1xuXG52YXIgX3JlcXVpcmUzID0gcmVxdWlyZSgnLi9jb25maWcnKSxcbiAgICBkZWZhdWx0Q29uZmlnID0gX3JlcXVpcmUzLmRlZmF1bHRDb25maWcsXG4gICAgaW5pdENvbmZpZyA9IF9yZXF1aXJlMy5pbml0Q29uZmlnO1xuXG52YXIgdG9Qcm9taXNlID0gZnVuY3Rpb24gdG9Qcm9taXNlKG9ic2VydmFibGUpIHtcbiAgcmV0dXJuIG9ic2VydmFibGUudG9Qcm9taXNlKCk7XG59O1xuXG5mdW5jdGlvbiBTYW5pdHlDbGllbnQoKSB7XG4gIHZhciBjb25maWcgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IGRlZmF1bHRDb25maWc7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNhbml0eUNsaWVudCkpIHtcbiAgICByZXR1cm4gbmV3IFNhbml0eUNsaWVudChjb25maWcpO1xuICB9XG5cbiAgdGhpcy5jb25maWcoY29uZmlnKTtcbiAgdGhpcy5hc3NldHMgPSBuZXcgQXNzZXRzQ2xpZW50KHRoaXMpO1xuICB0aGlzLmRhdGFzZXRzID0gbmV3IERhdGFzZXRzQ2xpZW50KHRoaXMpO1xuICB0aGlzLnByb2plY3RzID0gbmV3IFByb2plY3RzQ2xpZW50KHRoaXMpO1xuICB0aGlzLnVzZXJzID0gbmV3IFVzZXJzQ2xpZW50KHRoaXMpO1xuICB0aGlzLmF1dGggPSBuZXcgQXV0aENsaWVudCh0aGlzKTtcblxuICBpZiAodGhpcy5jbGllbnRDb25maWcuaXNQcm9taXNlQVBJKSB7XG4gICAgdmFyIG9ic2VydmFibGVDb25maWcgPSBhc3NpZ24oe30sIHRoaXMuY2xpZW50Q29uZmlnLCB7XG4gICAgICBpc1Byb21pc2VBUEk6IGZhbHNlXG4gICAgfSk7XG4gICAgdGhpcy5vYnNlcnZhYmxlID0gbmV3IFNhbml0eUNsaWVudChvYnNlcnZhYmxlQ29uZmlnKTtcbiAgfVxufVxuXG5hc3NpZ24oU2FuaXR5Q2xpZW50LnByb3RvdHlwZSwgZGF0YU1ldGhvZHMpO1xuYXNzaWduKFNhbml0eUNsaWVudC5wcm90b3R5cGUsIHtcbiAgY2xvbmU6IGZ1bmN0aW9uIGNsb25lKCkge1xuICAgIHJldHVybiBuZXcgU2FuaXR5Q2xpZW50KHRoaXMuY29uZmlnKCkpO1xuICB9LFxuICBjb25maWc6IGZ1bmN0aW9uIGNvbmZpZyhuZXdDb25maWcpIHtcbiAgICBpZiAodHlwZW9mIG5ld0NvbmZpZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBhc3NpZ24oe30sIHRoaXMuY2xpZW50Q29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vYnNlcnZhYmxlKSB7XG4gICAgICB2YXIgb2JzZXJ2YWJsZUNvbmZpZyA9IGFzc2lnbih7fSwgbmV3Q29uZmlnLCB7XG4gICAgICAgIGlzUHJvbWlzZUFQSTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgdGhpcy5vYnNlcnZhYmxlLmNvbmZpZyhvYnNlcnZhYmxlQ29uZmlnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNsaWVudENvbmZpZyA9IGluaXRDb25maWcobmV3Q29uZmlnLCB0aGlzLmNsaWVudENvbmZpZyB8fCB7fSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGdldFVybDogZnVuY3Rpb24gZ2V0VXJsKHVyaSkge1xuICAgIHZhciBjYW5Vc2VDZG4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuICAgIHZhciBiYXNlID0gY2FuVXNlQ2RuID8gdGhpcy5jbGllbnRDb25maWcuY2RuVXJsIDogdGhpcy5jbGllbnRDb25maWcudXJsO1xuICAgIHJldHVybiBcIlwiLmNvbmNhdChiYXNlLCBcIi9cIikuY29uY2F0KHVyaS5yZXBsYWNlKC9eXFwvLywgJycpKTtcbiAgfSxcbiAgaXNQcm9taXNlQVBJOiBmdW5jdGlvbiBpc1Byb21pc2VBUEkoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50Q29uZmlnLmlzUHJvbWlzZUFQSTtcbiAgfSxcbiAgX3JlcXVlc3RPYnNlcnZhYmxlOiBmdW5jdGlvbiBfcmVxdWVzdE9ic2VydmFibGUob3B0aW9ucykge1xuICAgIHZhciB1cmkgPSBvcHRpb25zLnVybCB8fCBvcHRpb25zLnVyaTtcbiAgICB2YXIgY2FuVXNlQ2RuID0gdGhpcy5jbGllbnRDb25maWcudXNlQ2RuICYmIFsnR0VUJywgJ0hFQUQnXS5pbmRleE9mKG9wdGlvbnMubWV0aG9kIHx8ICdHRVQnKSA+PSAwICYmIHVyaS5pbmRleE9mKCcvZGF0YS8nKSA9PT0gMDtcbiAgICB2YXIgcmVxT3B0aW9ucyA9IGdldFJlcXVlc3RPcHRpb25zKHRoaXMuY2xpZW50Q29uZmlnLCBhc3NpZ24oe30sIG9wdGlvbnMsIHtcbiAgICAgIHVybDogdGhpcy5nZXRVcmwodXJpLCBjYW5Vc2VDZG4pXG4gICAgfSkpO1xuICAgIHJldHVybiBodHRwUmVxdWVzdChyZXFPcHRpb25zLCB0aGlzLmNsaWVudENvbmZpZy5yZXF1ZXN0ZXIpO1xuICB9LFxuICByZXF1ZXN0OiBmdW5jdGlvbiByZXF1ZXN0KG9wdGlvbnMpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZSA9IHRoaXMuX3JlcXVlc3RPYnNlcnZhYmxlKG9wdGlvbnMpLnBpcGUoZmlsdGVyKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgcmV0dXJuIGV2ZW50LnR5cGUgPT09ICdyZXNwb25zZSc7XG4gICAgfSksIG1hcChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIHJldHVybiBldmVudC5ib2R5O1xuICAgIH0pKTtcblxuICAgIHJldHVybiB0aGlzLmlzUHJvbWlzZUFQSSgpID8gdG9Qcm9taXNlKG9ic2VydmFibGUpIDogb2JzZXJ2YWJsZTtcbiAgfVxufSk7XG5TYW5pdHlDbGllbnQuUGF0Y2ggPSBQYXRjaDtcblNhbml0eUNsaWVudC5UcmFuc2FjdGlvbiA9IFRyYW5zYWN0aW9uO1xuU2FuaXR5Q2xpZW50LkNsaWVudEVycm9yID0gaHR0cFJlcXVlc3QuQ2xpZW50RXJyb3I7XG5TYW5pdHlDbGllbnQuU2VydmVyRXJyb3IgPSBodHRwUmVxdWVzdC5TZXJ2ZXJFcnJvcjtcblNhbml0eUNsaWVudC5yZXF1ZXN0ZXIgPSBodHRwUmVxdWVzdC5kZWZhdWx0UmVxdWVzdGVyO1xubW9kdWxlLmV4cG9ydHMgPSBTYW5pdHlDbGllbnQ7Il0sIm5hbWVzIjpbImNvbmZpZ18xIiwiVW5zdWJzY3JpcHRpb25FcnJvcl8xIiwiaXNBcnJheV8xIiwidGhpcyIsIk9ic2VydmVyXzEiLCJyeFN1YnNjcmliZXJfMSIsInJlcXVpcmUkJDAiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3BJc0VudW1lcmFibGUiLCJ0b09iamVjdCIsInZhbGlkYXRlIiwiYXNzaWduIiwiX2RlZmluZVByb3BlcnR5IiwicGF0Y2giLCJQYXRjaCIsIm9ic2VydmFibGVfMSIsIkFyZ3VtZW50T3V0T2ZSYW5nZUVycm9yXzEiLCJfcmVxdWlyZSIsIm1hcCIsIl9yZXF1aXJlMiIsImZpbHRlciIsIl9yZXF1aXJlMyIsInJlZHVjZSIsIl9yZXF1aXJlNCIsImdsb2JhbCIsImV2cyIsInBvbHlmaWxsZWRFdmVudFNvdXJjZSIsIk9ic2VydmFibGUiLCJUcmFuc2FjdGlvbiIsInRyYW5zYWN0aW9uIiwicXMiLCJyZXF1aXJlZCIsImhhcyIsImRlZmF1bHRPcHRpb25zIiwidXJsIiwiaXNBcnJheSIsIlhEb21haW5SZXF1ZXN0IiwicHJvY2Vzc09wdGlvbnMiLCJ2YWxpZGF0ZU9wdGlvbnMiLCJyZXF1ZXN0IiwicHVic3ViIiwiaHR0cFJlcXVlc3QiLCJpc09iamVjdCIsIm1ha2VFcnJvciIsIkNsaWVudEVycm9yIiwiU2VydmVyRXJyb3IiLCJlbnZTcGVjaWZpYyIsIm9ic2VydmFibGUiLCJkZWZhdWx0Q29uZmlnIiwiaW5pdENvbmZpZyIsInRvUHJvbWlzZSIsIkFzc2V0c0NsaWVudCIsIkRhdGFzZXRzQ2xpZW50IiwiUHJvamVjdHNDbGllbnQiLCJVc2Vyc0NsaWVudCIsIkF1dGhDbGllbnQiLCJnZXRSZXF1ZXN0T3B0aW9ucyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0EsSUFBSSxxQkFBcUIsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUM7QUFDekQsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7QUFDckQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO0FBQzdEO0FBQ0EsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLENBQUMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDeEMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLHVEQUF1RCxDQUFDLENBQUM7QUFDL0UsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBQ0Q7QUFDQSxTQUFTLGVBQWUsR0FBRztBQUMzQixDQUFDLElBQUk7QUFDTCxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ3RCLEdBQUcsT0FBTyxLQUFLLENBQUM7QUFDaEIsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDbEIsRUFBRSxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDcEQsR0FBRyxPQUFPLEtBQUssQ0FBQztBQUNoQixHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMvQixHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQyxHQUFHO0FBQ0gsRUFBRSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ2xFLEdBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkIsR0FBRyxDQUFDLENBQUM7QUFDTCxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLEVBQUU7QUFDeEMsR0FBRyxPQUFPLEtBQUssQ0FBQztBQUNoQixHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLEVBQUUsc0JBQXNCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUM3RCxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDMUIsR0FBRyxDQUFDLENBQUM7QUFDTCxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDcEQsSUFBSSxzQkFBc0IsRUFBRTtBQUM1QixHQUFHLE9BQU8sS0FBSyxDQUFDO0FBQ2hCLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDZCxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUU7QUFDZjtBQUNBLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDZixFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0EsZ0JBQWMsR0FBRyxlQUFlLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsTUFBTSxFQUFFLE1BQU0sRUFBRTtBQUMvRSxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ1YsQ0FBQyxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsQ0FBQyxJQUFJLE9BQU8sQ0FBQztBQUNiO0FBQ0EsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QyxFQUFFLElBQUksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUI7QUFDQSxFQUFFLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO0FBQ3hCLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtBQUN2QyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEIsSUFBSTtBQUNKLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxxQkFBcUIsRUFBRTtBQUM3QixHQUFHLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVDLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ2pELEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxLQUFLO0FBQ0wsSUFBSTtBQUNKLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ1gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hGRCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RCxTQUFTLFVBQVUsQ0FBQyxDQUFDLEVBQUU7QUFDdkIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxLQUFLLFVBQVUsQ0FBQztBQUNuQyxDQUFDO0FBQ0Qsa0JBQWtCLEdBQUcsVUFBVSxDQUFDOzs7OztBQ0poQyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RCxJQUFJLG1EQUFtRCxHQUFHLEtBQUssQ0FBQztBQUNoRSxjQUFjLEdBQUc7QUFDakIsSUFBSSxPQUFPLEVBQUUsU0FBUztBQUN0QixJQUFJLElBQUkscUNBQXFDLENBQUMsS0FBSyxFQUFFO0FBQ3JELFFBQVEsSUFBSSxLQUFLLEVBQUU7QUFDbkIsWUFBWSxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3BDLFlBQVksT0FBTyxDQUFDLElBQUksQ0FBQywrRkFBK0YsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEksU0FBUztBQUNULGFBQWEsSUFBSSxtREFBbUQsRUFBRTtBQUN0RSxZQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztBQUNoRixTQUFTO0FBQ1QsUUFBUSxtREFBbUQsR0FBRyxLQUFLLENBQUM7QUFDcEUsS0FBSztBQUNMLElBQUksSUFBSSxxQ0FBcUMsR0FBRztBQUNoRCxRQUFRLE9BQU8sbURBQW1ELENBQUM7QUFDbkUsS0FBSztBQUNMLENBQUMsQ0FBQzs7Ozs7QUNqQkYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUQsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFO0FBQzlCLElBQUksVUFBVSxDQUFDLFlBQVksRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUNELHVCQUF1QixHQUFHLGVBQWUsQ0FBQzs7Ozs7QUNKMUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0I7QUFDdUI7QUFDMUQsYUFBYSxHQUFHO0FBQ2hCLElBQUksTUFBTSxFQUFFLElBQUk7QUFDaEIsSUFBSSxJQUFJLEVBQUUsVUFBVSxLQUFLLEVBQUUsR0FBRztBQUM5QixJQUFJLEtBQUssRUFBRSxVQUFVLEdBQUcsRUFBRTtBQUMxQixRQUFRLElBQUlBLE1BQVEsQ0FBQyxNQUFNLENBQUMscUNBQXFDLEVBQUU7QUFDbkUsWUFBWSxNQUFNLEdBQUcsQ0FBQztBQUN0QixTQUFTO0FBQ1QsYUFBYTtBQUNiLFlBQVksaUJBQWlCLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELFNBQVM7QUFDVCxLQUFLO0FBQ0wsSUFBSSxRQUFRLEVBQUUsWUFBWSxHQUFHO0FBQzdCLENBQUMsQ0FBQzs7Ozs7QUNmRixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RCxlQUFlLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxLQUFLLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQzs7Ozs7QUNENUgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUQsU0FBUyxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3JCLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQztBQUMvQyxDQUFDO0FBQ0QsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDOzs7OztBQ0o1QixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RCxJQUFJLHVCQUF1QixHQUFHLENBQUMsWUFBWTtBQUMzQyxJQUFJLFNBQVMsdUJBQXVCLENBQUMsTUFBTSxFQUFFO0FBQzdDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTTtBQUM3QixZQUFZLE1BQU0sQ0FBQyxNQUFNLEdBQUcsMkNBQTJDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3BLLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBcUIsQ0FBQztBQUMxQyxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQzdCLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsS0FBSztBQUNMLElBQUksdUJBQXVCLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZFLElBQUksT0FBTyx1QkFBdUIsQ0FBQztBQUNuQyxDQUFDLEdBQUcsQ0FBQztBQUNMLDJCQUEyQixHQUFHLHVCQUF1QixDQUFDOzs7OztBQ2J0RCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNwQjtBQUNFO0FBQ0k7QUFDa0I7QUFDbEUsSUFBSSxZQUFZLElBQUksWUFBWTtBQUNoQyxJQUFJLFNBQVMsWUFBWSxDQUFDLFdBQVcsRUFBRTtBQUN2QyxRQUFRLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFFBQVEsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUNyQyxRQUFRLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ25DLFFBQVEsSUFBSSxXQUFXLEVBQUU7QUFDekIsWUFBWSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQ3pDLFlBQVksSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7QUFDNUMsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLFlBQVk7QUFDckQsUUFBUSxJQUFJLE1BQU0sQ0FBQztBQUNuQixRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUN6QixZQUFZLE9BQU87QUFDbkIsU0FBUztBQUNULFFBQVEsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUM7QUFDMUssUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUMzQixRQUFRLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDckMsUUFBUSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztBQUNuQyxRQUFRLElBQUksZ0JBQWdCLFlBQVksWUFBWSxFQUFFO0FBQ3RELFlBQVksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLFNBQVM7QUFDVCxhQUFhLElBQUksZ0JBQWdCLEtBQUssSUFBSSxFQUFFO0FBQzVDLFlBQVksS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRTtBQUMxRSxnQkFBZ0IsSUFBSSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkQsZ0JBQWdCLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsYUFBYTtBQUNiLFNBQVM7QUFDVCxRQUFRLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUNuRCxZQUFZLElBQUksZ0JBQWdCLEVBQUU7QUFDbEMsZ0JBQWdCLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0FBQzlDLGFBQWE7QUFDYixZQUFZLElBQUk7QUFDaEIsZ0JBQWdCLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsYUFBYTtBQUNiLFlBQVksT0FBTyxDQUFDLEVBQUU7QUFDdEIsZ0JBQWdCLE1BQU0sR0FBRyxDQUFDLFlBQVlDLG1CQUFxQixDQUFDLG1CQUFtQixHQUFHLDJCQUEyQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlILGFBQWE7QUFDYixTQUFTO0FBQ1QsUUFBUSxJQUFJQyxPQUFTLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQy9DLFlBQVksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0IsWUFBWSxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0FBQzVDLFlBQVksT0FBTyxFQUFFLEtBQUssR0FBRyxHQUFHLEVBQUU7QUFDbEMsZ0JBQWdCLElBQUksR0FBRyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoRCxnQkFBZ0IsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzlDLG9CQUFvQixJQUFJO0FBQ3hCLHdCQUF3QixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDMUMscUJBQXFCO0FBQ3JCLG9CQUFvQixPQUFPLENBQUMsRUFBRTtBQUM5Qix3QkFBd0IsTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDOUMsd0JBQXdCLElBQUksQ0FBQyxZQUFZRCxtQkFBcUIsQ0FBQyxtQkFBbUIsRUFBRTtBQUNwRiw0QkFBNEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDMUYseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw0QkFBNEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQyx5QkFBeUI7QUFDekIscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNULFFBQVEsSUFBSSxNQUFNLEVBQUU7QUFDcEIsWUFBWSxNQUFNLElBQUlBLG1CQUFxQixDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hFLFNBQVM7QUFDVCxLQUFLLENBQUM7QUFDTixJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVUsUUFBUSxFQUFFO0FBQ3JELFFBQVEsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ3BDLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUN2QixZQUFZLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztBQUN0QyxTQUFTO0FBQ1QsUUFBUSxRQUFRLE9BQU8sUUFBUTtBQUMvQixZQUFZLEtBQUssVUFBVTtBQUMzQixnQkFBZ0IsWUFBWSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFELFlBQVksS0FBSyxRQUFRO0FBQ3pCLGdCQUFnQixJQUFJLFlBQVksS0FBSyxJQUFJLElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxPQUFPLFlBQVksQ0FBQyxXQUFXLEtBQUssVUFBVSxFQUFFO0FBQ3BILG9CQUFvQixPQUFPLFlBQVksQ0FBQztBQUN4QyxpQkFBaUI7QUFDakIscUJBQXFCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUN0QyxvQkFBb0IsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQy9DLG9CQUFvQixPQUFPLFlBQVksQ0FBQztBQUN4QyxpQkFBaUI7QUFDakIscUJBQXFCLElBQUksRUFBRSxZQUFZLFlBQVksWUFBWSxDQUFDLEVBQUU7QUFDbEUsb0JBQW9CLElBQUksR0FBRyxHQUFHLFlBQVksQ0FBQztBQUMzQyxvQkFBb0IsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFDdEQsb0JBQW9CLFlBQVksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4RCxpQkFBaUI7QUFDakIsZ0JBQWdCLE1BQU07QUFDdEIsWUFBWSxTQUFTO0FBQ3JCLGdCQUFnQixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixHQUFHLFFBQVEsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO0FBQ2pHLGFBQWE7QUFDYixTQUFTO0FBQ1QsUUFBUSxJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztBQUM3RCxRQUFRLElBQUksZ0JBQWdCLEtBQUssSUFBSSxFQUFFO0FBQ3ZDLFlBQVksWUFBWSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUNqRCxTQUFTO0FBQ1QsYUFBYSxJQUFJLGdCQUFnQixZQUFZLFlBQVksRUFBRTtBQUMzRCxZQUFZLElBQUksZ0JBQWdCLEtBQUssSUFBSSxFQUFFO0FBQzNDLGdCQUFnQixPQUFPLFlBQVksQ0FBQztBQUNwQyxhQUFhO0FBQ2IsWUFBWSxZQUFZLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyRSxTQUFTO0FBQ1QsYUFBYSxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN4RCxZQUFZLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QyxTQUFTO0FBQ1QsYUFBYTtBQUNiLFlBQVksT0FBTyxZQUFZLENBQUM7QUFDaEMsU0FBUztBQUNULFFBQVEsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztBQUNoRCxRQUFRLElBQUksYUFBYSxLQUFLLElBQUksRUFBRTtBQUNwQyxZQUFZLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNqRCxTQUFTO0FBQ1QsYUFBYTtBQUNiLFlBQVksYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM3QyxTQUFTO0FBQ1QsUUFBUSxPQUFPLFlBQVksQ0FBQztBQUM1QixLQUFLLENBQUM7QUFDTixJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFVBQVUsWUFBWSxFQUFFO0FBQzVELFFBQVEsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztBQUNoRCxRQUFRLElBQUksYUFBYSxFQUFFO0FBQzNCLFlBQVksSUFBSSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hFLFlBQVksSUFBSSxpQkFBaUIsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxQyxnQkFBZ0IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRCxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLElBQUksWUFBWSxDQUFDLEtBQUssSUFBSSxVQUFVLEtBQUssRUFBRTtBQUMzQyxRQUFRLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQzVCLFFBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSyxDQUFDLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNCLElBQUksT0FBTyxZQUFZLENBQUM7QUFDeEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNMLG9CQUFvQixHQUFHLFlBQVksQ0FBQztBQUNwQyxTQUFTLDJCQUEyQixDQUFDLE1BQU0sRUFBRTtBQUM3QyxJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLFlBQVlBLG1CQUFxQixDQUFDLG1CQUFtQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFKLENBQUM7Ozs7O0FDMUlELE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlELG9CQUFvQixHQUFHLENBQUMsWUFBWTtBQUNwQyxJQUFJLE9BQU8sT0FBTyxNQUFNLEtBQUssVUFBVTtBQUN2QyxVQUFVLE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDaEMsVUFBVSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDNUMsQ0FBQyxHQUFHLENBQUM7QUFDTCxzQkFBc0IsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDOzs7OztBQ045QyxJQUFJLFNBQVMsR0FBRyxDQUFDRSxjQUFJLElBQUlBLGNBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxZQUFZO0FBQ3pELElBQUksSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hDLFFBQVEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQzdDLGFBQWEsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN4RixZQUFZLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RixRQUFRLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQyxNQUFLO0FBQ0wsSUFBSSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixRQUFRLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUIsUUFBUSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDL0MsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdGLEtBQUssQ0FBQztBQUNOLENBQUMsR0FBRyxDQUFDO0FBQ0wsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDZDtBQUNUO0FBQ1E7QUFDaUI7QUFDN0I7QUFDdUI7QUFDMUQsSUFBSSxVQUFVLElBQUksVUFBVSxNQUFNLEVBQUU7QUFDcEMsSUFBSSxTQUFTLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLElBQUksU0FBUyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUM1RCxRQUFRLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzlDLFFBQVEsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDcEMsUUFBUSxLQUFLLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztBQUN0QyxRQUFRLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDekMsUUFBUSxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUNoQyxRQUFRLFFBQVEsU0FBUyxDQUFDLE1BQU07QUFDaEMsWUFBWSxLQUFLLENBQUM7QUFDbEIsZ0JBQWdCLEtBQUssQ0FBQyxXQUFXLEdBQUdDLFFBQVUsQ0FBQyxLQUFLLENBQUM7QUFDckQsZ0JBQWdCLE1BQU07QUFDdEIsWUFBWSxLQUFLLENBQUM7QUFDbEIsZ0JBQWdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtBQUN4QyxvQkFBb0IsS0FBSyxDQUFDLFdBQVcsR0FBR0EsUUFBVSxDQUFDLEtBQUssQ0FBQztBQUN6RCxvQkFBb0IsTUFBTTtBQUMxQixpQkFBaUI7QUFDakIsZ0JBQWdCLElBQUksT0FBTyxpQkFBaUIsS0FBSyxRQUFRLEVBQUU7QUFDM0Qsb0JBQW9CLElBQUksaUJBQWlCLFlBQVksVUFBVSxFQUFFO0FBQ2pFLHdCQUF3QixLQUFLLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsa0JBQWtCLENBQUM7QUFDeEYsd0JBQXdCLEtBQUssQ0FBQyxXQUFXLEdBQUcsaUJBQWlCLENBQUM7QUFDOUQsd0JBQXdCLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyRCxxQkFBcUI7QUFDckIseUJBQXlCO0FBQ3pCLHdCQUF3QixLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQ3hELHdCQUF3QixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3pGLHFCQUFxQjtBQUNyQixvQkFBb0IsTUFBTTtBQUMxQixpQkFBaUI7QUFDakIsWUFBWTtBQUNaLGdCQUFnQixLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQ2hELGdCQUFnQixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbEcsZ0JBQWdCLE1BQU07QUFDdEIsU0FBUztBQUNULFFBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSztBQUNMLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQ0MsWUFBYyxDQUFDLFlBQVksQ0FBQyxHQUFHLFlBQVksRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDckYsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDekQsUUFBUSxJQUFJLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQy9ELFFBQVEsVUFBVSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztBQUM5QyxRQUFRLE9BQU8sVUFBVSxDQUFDO0FBQzFCLEtBQUssQ0FBQztBQUNOLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDakQsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUM3QixZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUIsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUU7QUFDaEQsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUM3QixZQUFZLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLFlBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxZQUFZO0FBQ2hELFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDN0IsWUFBWSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUNsQyxZQUFZLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUM3QixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxZQUFZO0FBQ25ELFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3pCLFlBQVksT0FBTztBQUNuQixTQUFTO0FBQ1QsUUFBUSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUM5QixRQUFRLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoRCxLQUFLLENBQUM7QUFDTixJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsS0FBSyxFQUFFO0FBQ2xELFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsS0FBSyxDQUFDO0FBQ04sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQUcsRUFBRTtBQUNqRCxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLFFBQVEsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzNCLEtBQUssQ0FBQztBQUNOLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBWTtBQUNqRCxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDcEMsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0IsS0FBSyxDQUFDO0FBQ04sSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLHNCQUFzQixHQUFHLFlBQVk7QUFDOUQsUUFBUSxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUNyRCxRQUFRLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDckMsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0IsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUM1QixRQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQy9CLFFBQVEsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQ2pELFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDcEIsS0FBSyxDQUFDO0FBQ04sSUFBSSxPQUFPLFVBQVUsQ0FBQztBQUN0QixDQUFDLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDaEMsa0JBQWtCLEdBQUcsVUFBVSxDQUFDO0FBQ2hDLElBQUksY0FBYyxJQUFJLFVBQVUsTUFBTSxFQUFFO0FBQ3hDLElBQUksU0FBUyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN0QyxJQUFJLFNBQVMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2hGLFFBQVEsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDOUMsUUFBUSxLQUFLLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7QUFDcEQsUUFBUSxJQUFJLElBQUksQ0FBQztBQUNqQixRQUFRLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztBQUM1QixRQUFRLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUNyRCxZQUFZLElBQUksR0FBRyxjQUFjLENBQUM7QUFDbEMsU0FBUztBQUNULGFBQWEsSUFBSSxjQUFjLEVBQUU7QUFDakMsWUFBWSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztBQUN2QyxZQUFZLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0FBQ3pDLFlBQVksUUFBUSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUM7QUFDL0MsWUFBWSxJQUFJLGNBQWMsS0FBS0QsUUFBVSxDQUFDLEtBQUssRUFBRTtBQUNyRCxnQkFBZ0IsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDeEQsZ0JBQWdCLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDbEUsb0JBQW9CLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNqRSxpQkFBaUI7QUFDakIsZ0JBQWdCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEUsYUFBYTtBQUNiLFNBQVM7QUFDVCxRQUFRLEtBQUssQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQ2pDLFFBQVEsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDM0IsUUFBUSxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUM3QixRQUFRLEtBQUssQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQ25DLFFBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSztBQUNMLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDckQsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQzNDLFlBQVksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDM0QsWUFBWSxJQUFJLENBQUNKLE1BQVEsQ0FBQyxNQUFNLENBQUMscUNBQXFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRTtBQUNqSCxnQkFBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JELGFBQWE7QUFDYixpQkFBaUIsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7QUFDakYsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQyxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLEVBQUU7QUFDcEQsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUM3QixZQUFZLElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO0FBQzNELFlBQVksSUFBSSxxQ0FBcUMsR0FBR0EsTUFBUSxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQztBQUM5RyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUM3QixnQkFBZ0IsSUFBSSxDQUFDLHFDQUFxQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUU7QUFDckcsb0JBQW9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4RCxvQkFBb0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3ZDLGlCQUFpQjtBQUNqQixxQkFBcUI7QUFDckIsb0JBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM5RSxvQkFBb0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3ZDLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsaUJBQWlCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRTtBQUM1RCxnQkFBZ0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25DLGdCQUFnQixJQUFJLHFDQUFxQyxFQUFFO0FBQzNELG9CQUFvQixNQUFNLEdBQUcsQ0FBQztBQUM5QixpQkFBaUI7QUFDakIsZ0JBQWdCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RCxhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLHFDQUFxQyxFQUFFO0FBQzNELG9CQUFvQixpQkFBaUIsQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBQzNELG9CQUFvQixpQkFBaUIsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQzdELGlCQUFpQjtBQUNqQixxQkFBcUI7QUFDckIsb0JBQW9CLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRCxpQkFBaUI7QUFDakIsZ0JBQWdCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQyxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsWUFBWTtBQUNwRCxRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUN6QixRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzdCLFlBQVksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDM0QsWUFBWSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDaEMsZ0JBQWdCLElBQUksZUFBZSxHQUFHLFlBQVksRUFBRSxPQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDbkcsZ0JBQWdCLElBQUksQ0FBQ0EsTUFBUSxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFO0FBQ3JILG9CQUFvQixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZELG9CQUFvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDdkMsaUJBQWlCO0FBQ2pCLHFCQUFxQjtBQUNyQixvQkFBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUM3RSxvQkFBb0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3ZDLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkMsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLLENBQUM7QUFDTixJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRTtBQUNqRSxRQUFRLElBQUk7QUFDWixZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMxQyxTQUFTO0FBQ1QsUUFBUSxPQUFPLEdBQUcsRUFBRTtBQUNwQixZQUFZLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMvQixZQUFZLElBQUlBLE1BQVEsQ0FBQyxNQUFNLENBQUMscUNBQXFDLEVBQUU7QUFDdkUsZ0JBQWdCLE1BQU0sR0FBRyxDQUFDO0FBQzFCLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsZ0JBQWdCLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2RCxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLElBQUksY0FBYyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsVUFBVSxNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRTtBQUM1RSxRQUFRLElBQUksQ0FBQ0EsTUFBUSxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsRUFBRTtBQUNwRSxZQUFZLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEMsU0FBUztBQUNULFFBQVEsSUFBSTtBQUNaLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFNBQVM7QUFDVCxRQUFRLE9BQU8sR0FBRyxFQUFFO0FBQ3BCLFlBQVksSUFBSUEsTUFBUSxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsRUFBRTtBQUN2RSxnQkFBZ0IsTUFBTSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDNUMsZ0JBQWdCLE1BQU0sQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQzlDLGdCQUFnQixPQUFPLElBQUksQ0FBQztBQUM1QixhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLGdCQUFnQixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkQsZ0JBQWdCLE9BQU8sSUFBSSxDQUFDO0FBQzVCLGFBQWE7QUFDYixTQUFTO0FBQ1QsUUFBUSxPQUFPLEtBQUssQ0FBQztBQUNyQixLQUFLLENBQUM7QUFDTixJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFlBQVk7QUFDeEQsUUFBUSxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztBQUN2RCxRQUFRLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzdCLFFBQVEsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztBQUN0QyxRQUFRLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ3hDLEtBQUssQ0FBQztBQUNOLElBQUksT0FBTyxjQUFjLENBQUM7QUFDMUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDZixzQkFBc0IsR0FBRyxjQUFjLENBQUM7Ozs7O0FDblB4QyxJQUFJLFNBQVMsR0FBRyxDQUFDRyxjQUFJLElBQUlBLGNBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxZQUFZO0FBQ3pELElBQUksSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hDLFFBQVEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQzdDLGFBQWEsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN4RixZQUFZLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RixRQUFRLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQyxNQUFLO0FBQ0wsSUFBSSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixRQUFRLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUIsUUFBUSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDL0MsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdGLEtBQUssQ0FBQztBQUNOLENBQUMsR0FBRyxDQUFDO0FBQ0wsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDbEI7QUFDNUMsU0FBUyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUNwQyxJQUFJLE9BQU8sU0FBUyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUU7QUFDbkQsUUFBUSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbkUsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELGNBQWMsR0FBRyxNQUFNLENBQUM7QUFDeEIsSUFBSSxjQUFjLElBQUksWUFBWTtBQUNsQyxJQUFJLFNBQVMsY0FBYyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUU7QUFDaEQsUUFBUSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUNuQyxRQUFRLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQy9CLEtBQUs7QUFDTCxJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLFVBQVUsVUFBVSxFQUFFLE1BQU0sRUFBRTtBQUNsRSxRQUFRLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2hHLEtBQUssQ0FBQztBQUNOLElBQUksT0FBTyxjQUFjLENBQUM7QUFDMUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNMLElBQUksZ0JBQWdCLElBQUksVUFBVSxNQUFNLEVBQUU7QUFDMUMsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEMsSUFBSSxTQUFTLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQy9ELFFBQVEsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzNELFFBQVEsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDcEMsUUFBUSxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUNoQyxRQUFRLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLFFBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIsS0FBSztBQUNMLElBQUksZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEtBQUssRUFBRTtBQUN4RCxRQUFRLElBQUksTUFBTSxDQUFDO0FBQ25CLFFBQVEsSUFBSTtBQUNaLFlBQVksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzVFLFNBQVM7QUFDVCxRQUFRLE9BQU8sR0FBRyxFQUFFO0FBQ3BCLFlBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEMsWUFBWSxPQUFPO0FBQ25CLFNBQVM7QUFDVCxRQUFRLElBQUksTUFBTSxFQUFFO0FBQ3BCLFlBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLElBQUksT0FBTyxnQkFBZ0IsQ0FBQztBQUM1QixDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7QUN2RDVCLGNBQWMsR0FBR0csUUFBeUMsQ0FBQzs7Ozs7OztBQ0MzRCxJQUFJLFNBQVMsR0FBRyxDQUFDSCxjQUFJLElBQUlBLGNBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxZQUFZO0FBQ3pELElBQUksSUFBSSxhQUFhLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3hDLFFBQVEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQzdDLGFBQWEsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN4RixZQUFZLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2RixRQUFRLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQyxNQUFLO0FBQ0wsSUFBSSxPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUMzQixRQUFRLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUIsUUFBUSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDL0MsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdGLEtBQUssQ0FBQztBQUNOLENBQUMsR0FBRyxDQUFDO0FBQ0wsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDbEI7QUFDNUMsU0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUMvQixJQUFJLE9BQU8sU0FBUyxZQUFZLENBQUMsTUFBTSxFQUFFO0FBQ3pDLFFBQVEsSUFBSSxPQUFPLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDM0MsWUFBWSxNQUFNLElBQUksU0FBUyxDQUFDLDREQUE0RCxDQUFDLENBQUM7QUFDOUYsU0FBUztBQUNULFFBQVEsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzlELEtBQUssQ0FBQztBQUNOLENBQUM7QUFDRCxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLElBQUksV0FBVyxJQUFJLFlBQVk7QUFDL0IsSUFBSSxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQzNDLFFBQVEsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDL0IsUUFBUSxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUMvQixLQUFLO0FBQ0wsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDM0YsS0FBSyxDQUFDO0FBQ04sSUFBSSxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ0wsbUJBQW1CLEdBQUcsV0FBVyxDQUFDO0FBQ2xDLElBQUksYUFBYSxJQUFJLFVBQVUsTUFBTSxFQUFFO0FBQ3ZDLElBQUksU0FBUyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNyQyxJQUFJLFNBQVMsYUFBYSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQzFELFFBQVEsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQzNELFFBQVEsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDaEMsUUFBUSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUN4QixRQUFRLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLEtBQUssQ0FBQztBQUN6QyxRQUFRLE9BQU8sS0FBSyxDQUFDO0FBQ3JCLEtBQUs7QUFDTCxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsS0FBSyxFQUFFO0FBQ3JELFFBQVEsSUFBSSxNQUFNLENBQUM7QUFDbkIsUUFBUSxJQUFJO0FBQ1osWUFBWSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDMUUsU0FBUztBQUNULFFBQVEsT0FBTyxHQUFHLEVBQUU7QUFDcEIsWUFBWSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxZQUFZLE9BQU87QUFDbkIsU0FBUztBQUNULFFBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsS0FBSyxDQUFDO0FBQ04sSUFBSSxPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7QUN6RDVCLFdBQVcsR0FBR0csS0FBc0MsQ0FBQzs7Ozs7O0FDQ3JELFNBQWMsR0FBRyxVQUFVLENBQUMsRUFBRTtBQUM5QixDQUFDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ3JCLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7O0FDRkQsSUFBSUMsZ0JBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztBQUNyRCxJQUFJQyxrQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDO0FBQzdEO0FBQ0EsU0FBU0MsVUFBUSxDQUFDLEdBQUcsRUFBRTtBQUN2QixDQUFDLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3hDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBQzdELEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUNEO0FBQ0EsU0FBUyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7QUFDbEMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckI7QUFDQSxDQUFDLElBQUksR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO0FBQ3hDLEVBQUUsT0FBTztBQUNULEVBQUU7QUFDRjtBQUNBLENBQUMsSUFBSUYsZ0JBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ25DLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7QUFDakQsR0FBRyxNQUFNLElBQUksU0FBUyxDQUFDLDhDQUE4QyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNuRixHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLENBQUNBLGdCQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNuRCxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDaEIsRUFBRSxNQUFNO0FBQ1IsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvQyxFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0EsU0FBUyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtBQUMxQixDQUFDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtBQUNsQixFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ1osRUFBRTtBQUNGO0FBQ0EsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCO0FBQ0EsQ0FBQyxLQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtBQUN2QixFQUFFLElBQUlBLGdCQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtBQUN0QyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDLElBQUksTUFBTSxDQUFDLHFCQUFxQixFQUFFO0FBQ25DLEVBQUUsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25EO0FBQ0EsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzQyxHQUFHLElBQUlDLGtCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEQsSUFBSSxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxJQUFJO0FBQ0osR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDWCxDQUFDO0FBQ0Q7QUFDQSxjQUFjLEdBQUcsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFO0FBQzdDLENBQUMsTUFBTSxHQUFHQyxVQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0I7QUFDQSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVDLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQixFQUFFO0FBQ0Y7QUFDQSxDQUFDLE9BQU8sTUFBTSxDQUFDO0FBQ2YsQ0FBQzs7QUNqRUQsZ0JBQWMsR0FBRyxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDNUMsRUFBRSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3JELElBQUksT0FBTztBQUNYLE1BQU0sRUFBRSxFQUFFLEdBQUc7QUFDYixLQUFLLENBQUM7QUFDTixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7QUFDeEIsSUFBSSxPQUFPO0FBQ1gsTUFBTSxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7QUFDdEIsS0FBSyxDQUFDO0FBQ04sR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLGFBQWEsR0FBRyxDQUFDLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLDZCQUE2QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZILEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUNuRixDQUFDOzs7QUNoQkQ7QUFDQSxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUUsRUFBRSxPQUFPLEdBQUcsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxHQUFHLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsV0FBVyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzFYO0FBQ0EsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMxQyxJQUFJLHNCQUFzQixHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RDtBQUNBLGVBQWUsR0FBRyxVQUFVLElBQUksRUFBRTtBQUNsQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDcEMsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLGlGQUFpRixDQUFDLENBQUM7QUFDdkcsR0FBRztBQUNILENBQUMsQ0FBQztBQUNGO0FBQ0EsaUJBQWlCLEdBQUcsVUFBVSxFQUFFLEVBQUU7QUFDbEMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNqQyxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztBQUM3RSxHQUFHO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSx5QkFBeUIsR0FBRyxVQUFVLElBQUksRUFBRTtBQUM1QyxFQUFFLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQzlDLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkgsR0FBRztBQUNILENBQUMsQ0FBQztBQUNGO0FBQ0Esc0JBQXNCLEdBQUcsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFO0FBQzVDLEVBQUUsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN2RSxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLEdBQUc7QUFDSCxDQUFDLENBQUM7QUFDRjtBQUNBLHlCQUF5QixHQUFHLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRTtBQUMvQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO0FBQ2hCLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpRUFBaUUsQ0FBQyxDQUFDLENBQUM7QUFDdEcsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFDRjtBQUNBLDBCQUEwQixHQUFHLFVBQVUsRUFBRSxFQUFFLEVBQUUsRUFBRTtBQUMvQyxFQUFFLElBQUksT0FBTyxFQUFFLEtBQUssUUFBUSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQzdELElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLCtCQUErQixDQUFDLENBQUMsQ0FBQztBQUN6RixHQUFHO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxzQkFBc0IsR0FBRyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQ3hELEVBQUUsSUFBSSxTQUFTLEdBQUcsNkJBQTZCLENBQUM7QUFDaEQ7QUFDQSxFQUFFLElBQUksc0JBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pELElBQUksSUFBSSxLQUFLLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQzFELE1BQU0sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLDZDQUE2QyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDdkcsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtBQUNwQyxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsdURBQXVELENBQUMsQ0FBQyxDQUFDO0FBQ25HLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDN0IsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLHFEQUFxRCxDQUFDLENBQUMsQ0FBQztBQUNqRyxHQUFHO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxrQkFBa0IsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUN2QyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUMvQyxJQUFJLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztBQUNyRSxHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDOUIsQ0FBQzs7O0FDcEVELFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtBQUNqTjtBQUN3QztBQUN4QztBQUNzQztBQUN0QztBQUNtRDtBQUNuRDtBQUN3QztBQUN4QztBQUNBLElBQUksY0FBYyxHQUFHQyxVQUFRLENBQUMsY0FBYyxDQUFDO0FBQzdDLElBQUksY0FBYyxHQUFHQSxVQUFRLENBQUMsY0FBYyxDQUFDO0FBQzdDO0FBQ0EsU0FBUyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQzFCLEVBQUUsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFGLEVBQUUsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3hGLEVBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDN0IsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHQyxZQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDdkIsQ0FBQztBQUNEO0FBQ0FBLFlBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO0FBQ3hCLEVBQUUsS0FBSyxFQUFFLFNBQVMsS0FBSyxHQUFHO0FBQzFCLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFQSxZQUFNLENBQUMsRUFBRSxFQUFF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QUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUUsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxJQUFJLDBDQUEwQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLGlCQUFpQixDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQ2hhO0FBQ0EsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO0FBQ3ZMO0FBQ0EsU0FBUyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO0FBQ3plO0FBQ0EsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUU7QUFDckU7QUFDc0M7QUFDdEM7QUFDQSxJQUNJTyxLQUFHLEdBQUdELEdBQVEsQ0FBQyxHQUFHLENBQUM7QUFDdkI7QUFD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
