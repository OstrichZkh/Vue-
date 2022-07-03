(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function parseHTML(html) {
    while (html) {
      html.indexOf('<');
    }
  }

  function compileToFunction(template) {
    // 将template转为ast
    parseHTML(template); // 生成render方法
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  // 重写数组的部分方法
  var oldArrayProto = Array.prototype;
  var newArrayProto = Object.create(oldArrayProto);
  var methods = ['push', 'pop', 'unshift', 'shift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    newArrayProto[method] = function () {
      var _oldArrayProto$method;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args));

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
          inserted = args;
          break;

        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
      }

      if (inserted) {
        ob.observeArray(inserted);
      }

      return result;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // 把实例放到data上面去
      Object.defineProperty(data, '__ob__', {
        value: this,
        enumerable: false
      });

      if (!Array.isArray(data)) {
        this.walk(data);
      } else {
        //重写数组的7个变异方法，并劫持数组中的引用对象
        data.__proto__ = newArrayProto;
        this.observeArray(data);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {// data.forEach(item=>observe(item))
      }
    }]);

    return Observer;
  }();

  function defineReactive(target, key, value) {
    observe(value);
    Object.defineProperty(target, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue == value) return;
        observe(newValue);
        value = newValue;
      }
    });
  }
  function observe(data) {
    if (_typeof(data) !== 'object' || data == null) return;
    if (data.__ob__ instanceof Observer) return data.__ob__;
    return new Observer(data);
  }

  function initState(vm) {
    var options = vm.$options;

    if (options.data) {
      initData(vm);
    }
  }

  function proxy(vm, target, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[target][key];
      },
      set: function set(newVal) {
        vm[target][key] = newVal;
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = typeof data === 'function' ? data.call(this) : data;
    vm._data = data; //劫持数据

    observe(data);

    for (var key in data) {
      proxy(vm, '_data', key);
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this; // 绑定用户的配置

      vm.$options = options; // 初始化状态

      initState(vm);

      if (options.el) {
        vm.$mount(options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var ops = vm.$options;
      el = document.querySelector(el);

      if (!ops.render) {
        // 获取HTML
        var template;

        if (!ops.template && el) {
          template = el.outerHTML;
        } else {
          if (el) {
            template = ops.template;
          }
        } // 编译模板


        if (template) {
          var render = compileToFunction(template);
          ops.render = render;
        }
      }

      ops.render;
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
