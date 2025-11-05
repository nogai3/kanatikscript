var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/object-keys/isArguments.js"(exports, module) {
    "use strict";
    var toStr = Object.prototype.toString;
    module.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    };
  }
});

// node_modules/object-keys/implementation.js
var require_implementation = __commonJS({
  "node_modules/object-keys/implementation.js"(exports, module) {
    "use strict";
    var keysShim;
    if (!Object.keys) {
      has = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = (function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
            return true;
          }
        }
        return false;
      })();
      equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e) {
          return false;
        }
      };
      keysShim = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    var has;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module.exports = keysShim;
  }
});

// node_modules/object-keys/index.js
var require_object_keys = __commonJS({
  "node_modules/object-keys/index.js"(exports, module) {
    "use strict";
    var slice = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? function keys(o) {
      return origKeys(o);
    } : require_implementation();
    var originalKeys = Object.keys;
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = (function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        })(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice.call(object));
            }
            return originalKeys(object);
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module.exports = keysShim;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports, module) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module.exports = $defineProperty;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports, module) {
    "use strict";
    module.exports = SyntaxError;
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports, module) {
    "use strict";
    module.exports = TypeError;
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports, module) {
    "use strict";
    module.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports, module) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module.exports = $gOPD;
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports, module) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var gopd = require_gopd();
    module.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports, module) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      return !!$defineProperty;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    };
    module.exports = hasPropertyDescriptors;
  }
});

// node_modules/define-properties/index.js
var require_define_properties = __commonJS({
  "node_modules/define-properties/index.js"(exports, module) {
    "use strict";
    var keys = require_object_keys();
    var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr = Object.prototype.toString;
    var concat = Array.prototype.concat;
    var defineDataProperty = require_define_data_property();
    var isFunction = function(fn) {
      return typeof fn === "function" && toStr.call(fn) === "[object Function]";
    };
    var supportsDescriptors = require_has_property_descriptors()();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object) {
        if (predicate === true) {
          if (object[name] === value) {
            return;
          }
        } else if (!isFunction(predicate) || !predicate()) {
          return;
        }
      }
      if (supportsDescriptors) {
        defineDataProperty(object, name, value, true);
      } else {
        defineDataProperty(object, name, value);
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols) {
        props = concat.call(props, Object.getOwnPropertySymbols(map));
      }
      for (var i = 0; i < props.length; i += 1) {
        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
      }
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module.exports = defineProperties;
  }
});

// node_modules/globalthis/implementation.browser.js
var require_implementation_browser = __commonJS({
  "node_modules/globalthis/implementation.browser.js"(exports, module) {
    "use strict";
    if (typeof self !== "undefined") {
      module.exports = self;
    } else if (typeof window !== "undefined") {
      module.exports = window;
    } else {
      module.exports = Function("return this")();
    }
  }
});

// node_modules/globalthis/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/globalthis/polyfill.js"(exports, module) {
    "use strict";
    var implementation = require_implementation_browser();
    module.exports = function getPolyfill() {
      if (typeof global !== "object" || !global || global.Math !== Math || global.Array !== Array) {
        return implementation;
      }
      return global;
    };
  }
});

// node_modules/globalthis/shim.js
var require_shim = __commonJS({
  "node_modules/globalthis/shim.js"(exports, module) {
    "use strict";
    var define = require_define_properties();
    var gOPD = require_gopd();
    var getPolyfill = require_polyfill();
    module.exports = function shimGlobal() {
      var polyfill2 = getPolyfill();
      if (define.supportsDescriptors) {
        var descriptor = gOPD(polyfill2, "globalThis");
        if (!descriptor || descriptor.configurable && (descriptor.enumerable || !descriptor.writable || globalThis !== polyfill2)) {
          Object.defineProperty(polyfill2, "globalThis", {
            configurable: true,
            enumerable: false,
            value: polyfill2,
            writable: true
          });
        }
      } else if (typeof globalThis !== "object" || globalThis !== polyfill2) {
        polyfill2.globalThis = polyfill2;
      }
      return polyfill2;
    };
  }
});

// node_modules/globalthis/index.js
var require_globalthis = __commonJS({
  "node_modules/globalthis/index.js"(exports, module) {
    "use strict";
    var defineProperties = require_define_properties();
    var implementation = require_implementation_browser();
    var getPolyfill = require_polyfill();
    var shim = require_shim();
    var polyfill2 = getPolyfill();
    var getGlobal = function() {
      return polyfill2;
    };
    defineProperties(getGlobal, {
      getPolyfill,
      implementation,
      shim
    });
    module.exports = getGlobal;
  }
});

// src/core.ts
var import_globalthis = __toESM(require_globalthis());

// src/dict/sortedKanatik.json
var sortedKanatik_default = [
  [
    "getElementById",
    "\u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C\u0420\u0430\u0441\u043F\u0435\u0447\u0430\u0442\u043A\u0443\u041F\u043E\u041D\u043E\u043C\u0435\u0440\u0443"
  ],
  [
    "%",
    "\u043E\u0441\u0442\u0430\u0442\u043E\u043A \u043E\u0442 \u0434\u0435\u043B\u0435\u043D\u0438\u044F \u043D\u0430"
  ],
  [
    "++",
    "\u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u043D\u0430 \u0435\u0434\u0438\u043D\u0438\u0446\u0443"
  ],
  [
    "--",
    "\u0443\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C \u043D\u0430 \u0435\u0434\u0438\u043D\u0438\u0446\u0443"
  ],
  [
    "!==",
    "\u0441\u0442\u0440\u043E\u0433\u043E \u043D\u0435 \u0440\u0430\u0432\u043D\u044F\u0435\u0442\u0441\u044F"
  ],
  [
    "textContent",
    "\u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0435\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435"
  ],
  [
    "setTimeout",
    "\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0443"
  ],
  [
    "setInterval",
    "\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B"
  ],
  [
    "toString",
    "\u0437\u0430\u0441\u0442\u0440\u044F\u0442\u044C \u0432 \u043F\u0430\u0443\u0442\u0438\u043D\u0435"
  ],
  [
    "const",
    "\u043D\u0435 \u0434\u0430\u0442\u044C \u0434\u043E\u043F\u0438\u0441\u0430\u0442\u044C"
  ],
  [
    "else if",
    "\u0438\u043D\u0430\u0447\u0435 \u0435\u0441\u043B\u0438 \u0432\u0434\u0440\u0443\u0433"
  ],
  [
    ">=",
    "\u0431\u043E\u043B\u044C\u0448\u0435 \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E"
  ],
  [
    "<=",
    "\u043C\u0435\u043D\u044C\u0448\u0435 \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E"
  ],
  [
    "===",
    "\u0441\u0442\u0440\u043E\u0433\u043E \u0440\u0430\u0432\u043D\u044F\u0435\u0442\u0441\u044F"
  ],
  [
    "clearTimeout",
    "\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0443"
  ],
  [
    "clearInterval",
    "\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B"
  ],
  [
    "function",
    "\u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u043D\u0441\u043F\u0435\u043A\u0442"
  ],
  [
    "parseFloat",
    "\u0441\u0442\u0430\u0442\u044C \u0441\u0430\u043C\u043E\u0432\u0430\u0440\u043E\u043C"
  ],
  [
    "return",
    "\u0441\u0434\u0430\u0442\u044C \u043D\u043E\u0440\u043C\u0430\u0442\u0438\u0432"
  ],
  [
    "addEventListener",
    "\u0441\u043B\u0443\u0448\u0430\u0442\u044C\u0421\u043E\u0431\u044B\u0442\u0438\u0435"
  ],
  [
    "innerHTML",
    "\u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u0438\u0439\u0425\u0442\u043C\u043B"
  ],
  [
    "double",
    "\u043D\u0435 \u043F\u0435\u0440\u0435\u0436\u0438\u043B \u0432\u043E\u0432"
  ],
  [
    "boolean",
    "\u043B\u043E\u0433\u0438\u043A\u0443 \u0432\u043A\u043B\u044E\u0447\u0430\u0439"
  ],
  [
    "Double",
    "\u041D\u0435 \u043F\u0435\u0440\u0435\u0436\u0438\u043B \u0432\u043E\u0432"
  ],
  [
    "let",
    "\u0434\u0430\u0442\u044C \u0434\u043E\u043F\u0438\u0441\u0430\u0442\u044C"
  ],
  [
    "for",
    "\u043D\u0430 \u043F\u0440\u043E\u0442\u044F\u0436\u0435\u043D\u0438\u0438"
  ],
  [
    "while",
    "\u043F\u043E\u043A\u0430 \u043D\u0435 \u0443\u0441\u0442\u0430\u043B"
  ],
  [
    "Boolean",
    "\u041B\u043E\u0433\u0438\u043A\u0443\u0412\u043A\u043B\u044E\u0447\u0430\u0439"
  ],
  [
    "else",
    "\u0438\u043D\u0430\u0447\u0435 \u0433\u043E\u0432\u043E\u0440\u044F"
  ],
  [
    "log",
    "\u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0447\u0438\u043A\u0438"
  ],
  [
    "!=",
    "\u043D\u0435 \u0440\u0430\u0432\u043D\u044F\u0435\u0442\u0441\u044F"
  ],
  [
    "/",
    "\u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u044C \u043D\u0430"
  ],
  [
    "*",
    "\u0443\u043C\u043D\u043E\u0436\u0438\u0442\u044C \u043D\u0430"
  ],
  [
    "if",
    "\u0435\u0441\u043B\u0438 \u0432\u0434\u0440\u0443\u0433"
  ],
  [
    "null",
    "\u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442"
  ],
  [
    "parseInt",
    "\u0432\u044B\u043B\u0435\u0447\u0438\u0442\u044C\u0441\u044F"
  ],
  [
    "==",
    "\u0440\u0430\u0432\u043D\u044F\u0435\u0442\u0441\u044F"
  ],
  [
    "console",
    "\u0431\u0430\u0439\u0442\u0435\u0440\u0435\u043A"
  ],
  [
    "value",
    "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"
  ],
  [
    "document",
    "\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442"
  ],
  [
    "float",
    "\u0441\u0430\u043C\u043E\u0432\u0430\u0440"
  ],
  [
    "string",
    "\u043F\u0430\u0443\u0442\u0438\u043D\u0430"
  ],
  [
    "Float",
    "\u0421\u0430\u043C\u043E\u0432\u0430\u0440"
  ],
  [
    "String",
    "\u041F\u0430\u0443\u0442\u0438\u043D\u0430"
  ],
  [
    "true",
    "\u043F\u0440\u0430\u0432\u0434\u0430"
  ],
  [
    "-",
    "\u043C\u0438\u043D\u0443\u0441"
  ],
  [
    "int",
    "\u0446\u0435\u043B\u044B\u0439"
  ],
  [
    "Int",
    "\u0426\u0435\u043B\u044B\u0439"
  ],
  [
    "false",
    "\u043B\u043E\u0436\u044C"
  ],
  [
    "error",
    "\u0431\u0435\u0434\u0430"
  ],
  [
    "+",
    "\u043F\u043B\u044E\u0441"
  ]
];

// src/core.ts
function escapeRegExp(str) {
  str = str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  if (/^\w+$/.test(str)) {
    str = "\\b" + str + "\\b";
  }
  return str;
}
function replaceAll(text, search, replacement) {
  const regex = new RegExp(escapeRegExp(search), "g");
  return text.replace(regex, replacement);
}
function transformText(text, targetLang = "ks") {
  const sourceIndex = targetLang === "ks" ? 1 : 0;
  const targetIndex = +!sourceIndex;
  const dictionary = sortedKanatik_default.slice().sort((a, b) => b[sourceIndex].length - a[sourceIndex].length);
  dictionary.forEach(([source, target]) => {
    const from = sourceIndex === 0 ? source : target;
    const to = sourceIndex === 0 ? target : source;
    if (typeof from === "string" && typeof to === "string") {
      text = replaceAll(text, from, to);
    }
  });
  return text;
}
function compile(script, lang = "ks") {
  const tmpToken = "ks_" + Date.now() + "_";
  const jsxLiterals = {};
  script = script.replace(/(<[A-Za-z][^>]*>)([\s\S]+?)(?=<\/[A-Za-z])/g, (_, tag, content, offset) => {
    const key = tmpToken + "jsx_" + offset;
    jsxLiterals[key] = content;
    return tag + key;
  });
  const stringLiterals = {};
  script = script.replace(/\"(?:\\.|[^\"\\])*\"|\'(?:\\.|[^\'\\])*\'/g, (val, pos) => {
    const key = tmpToken + pos;
    stringLiterals[key] = val;
    return key;
  });
  const commentRegex = /((?:\/\*(?:[^*]|(?:\*+[^*\/]))*\*+\/)|(?:\/\/.*))/g;
  const comments = script.match(commentRegex) || [];
  script = transformText(script, lang);
  script = script.replace(commentRegex, () => comments.shift() || "");
  for (const key in stringLiterals) script = script.replace(key, stringLiterals[key]);
  for (const key in jsxLiterals) script = script.replace(key, jsxLiterals[key]);
  const globalObj = (0, import_globalthis.default)();
  globalObj.kanatik = compile;
  return script;
}

// src/index.ts
if (typeof window !== "undefined") {
  document.querySelectorAll('[language="KanatikScript"], [type="text/x-kanatikscript"]').forEach(convertKanatikScript);
}
async function convertKanatikScript(scriptNode) {
  if (!scriptNode.parentNode) return;
  const scriptContent = scriptNode.textContent || await fetchScriptContent(scriptNode);
  scriptNode.parentNode.removeChild(scriptNode);
  appendScriptNode(compile(scriptContent, "ks"));
}
async function fetchScriptContent(node) {
  const src = node.getAttribute("src");
  if (!src) return "";
  const response = await fetch(src);
  return response.text();
}
function appendScriptNode(content) {
  const script = document.createElement("script");
  script.innerHTML = content;
  document.body.appendChild(script);
}
export {
  compile as kanatik
};
//# sourceMappingURL=kanatik.js.map
