define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.data = '# Hello __world__';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('markdown-aurelia',['exports', 'marked', 'aurelia-framework'], function (exports, _marked, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MarkdownAurelia = undefined;

  var _marked2 = _interopRequireDefault(_marked);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _desc, _value, _class, _descriptor;

  var MarkdownAurelia = exports.MarkdownAurelia = (_dec = (0, _aureliaFramework.bindable)({
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay
  }), (_class = function () {
    function MarkdownAurelia() {
      _classCallCheck(this, MarkdownAurelia);

      _initDefineProp(this, 'raw', _descriptor, this);

      this.html = '';
    }

    MarkdownAurelia.prototype.rawChanged = function rawChanged(newValue) {
      this.html = (0, _marked2.default)(newValue);
    };

    return MarkdownAurelia;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'raw', [_dec], {
    enumerable: true,
    initializer: null
  })), _class));
});
define('markdown-redux',['exports', 'marked', 'redux', 'aurelia-framework'], function (exports, _marked, _redux, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TEXT_UPDATE = exports.MarkdownRedux = undefined;
  exports.textUpdater = textUpdater;

  var _marked2 = _interopRequireDefault(_marked);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _desc, _value, _class, _descriptor;

  var MarkdownRedux = exports.MarkdownRedux = (_dec = (0, _aureliaFramework.bindable)({
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay
  }), (_class = function () {
    function MarkdownRedux() {
      _classCallCheck(this, MarkdownRedux);

      _initDefineProp(this, 'raw', _descriptor, this);

      this.store = (0, _redux.createStore)(textUpdater);
      this.html = '';

      this.store.subscribe(this.update.bind(this));
    }

    MarkdownRedux.prototype.update = function update() {
      var state = this.store.getState();
      this.html = state.html;
      this.raw = state.raw;
    };

    MarkdownRedux.prototype.keyupHandler = function keyupHandler(newValue) {
      this.store.dispatch(updateText(newValue));
    };

    MarkdownRedux.prototype.attached = function attached() {
      this.keyupHandler(this.raw);
    };

    return MarkdownRedux;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'raw', [_dec], {
    enumerable: true,
    initializer: null
  })), _class));
  var TEXT_UPDATE = exports.TEXT_UPDATE = 'UPDATE';

  var updateText = function updateText(text) {
    return {
      type: TEXT_UPDATE,
      text: text
    };
  };

  function textUpdater() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? { raw: '', html: '' } : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case TEXT_UPDATE:
        return {
          raw: action.text,
          html: (0, _marked2.default)(action.text)
        };
      default:
        return state;
    }
  }
});
define('markdown',['exports', 'marked', 'redux', 'redux-undo', 'aurelia-framework'], function (exports, _marked, _redux, _reduxUndo, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TEXT_UPDATE = exports.Markdown = undefined;
  exports.textUpdater = textUpdater;

  var _marked2 = _interopRequireDefault(_marked);

  var _reduxUndo2 = _interopRequireDefault(_reduxUndo);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _desc, _value, _class, _descriptor;

  var Markdown = exports.Markdown = (_dec = (0, _aureliaFramework.bindable)({
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay
  }), (_class = function () {
    function Markdown() {
      _classCallCheck(this, Markdown);

      _initDefineProp(this, 'raw', _descriptor, this);

      this.store = (0, _redux.createStore)((0, _reduxUndo2.default)(textUpdater));
      this.html = '';
      this.pastCount = 0;
      this.futureCount = 0;

      this.store.subscribe(this.update.bind(this));
      this.update();
    }

    Markdown.prototype.update = function update() {
      var state = this.store.getState().present;
      this.html = state.html;
      this.raw = state.raw;
      this.pastCount = this.store.getState().past.length;
      this.futureCount = this.store.getState().future.length;
    };

    Markdown.prototype.keyupHandler = function keyupHandler(newValue) {
      this.store.dispatch(updateText(newValue));
    };

    Markdown.prototype.undo = function undo() {
      this.store.dispatch(_reduxUndo.ActionCreators.undo());
    };

    Markdown.prototype.redo = function redo() {
      this.store.dispatch(_reduxUndo.ActionCreators.redo());
    };

    Markdown.prototype.attached = function attached() {
      this.keyupHandler(this.raw);
    };

    return Markdown;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'raw', [_dec], {
    enumerable: true,
    initializer: null
  })), _class));
  var TEXT_UPDATE = exports.TEXT_UPDATE = 'UPDATE';

  var updateText = function updateText(text) {
    return {
      type: TEXT_UPDATE,
      text: text
    };
  };

  function textUpdater() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? { raw: '', html: '' } : arguments[0];
    var action = arguments[1];

    switch (action.type) {
      case TEXT_UPDATE:
        return {
          raw: action.text,
          html: (0, _marked2.default)(action.text)
        };
      default:
        return state;
    }
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  \n  <!-- The Aurelia Way -->\n  <!--<require from=\"./markdown-aurelia\"></require>\n  <markdown-aurelia raw.bind=\"data\"></markdown-aurelia>-->\n\n  <!-- The Redux Way -->\n  <!--<require from=\"./markdown-redux\"></require>\n  <markdown-redux raw.bind=\"data\"></markdown-redux>-->\n\n  <!-- The Redux Way with Undo/Redo -->\n  <require from=\"./markdown\"></require>\n  <markdown raw.bind=\"data\"></markdown>\n\n</template>\n"; });
define('text!markdown-aurelia.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    body {\n      background-color: lightcyan;\n    }\n    .markdown-editor {\n      width: 100%;\n      height: 80vh;\n    }\n    \n    .markdown-editor .editor,\n    .markdown-editor .preview {\n      float: left;\n      width: 45%;\n      height: 100%;\n      padding: 10px;\n    }\n    .markdown-editor .editor {\n      border: solid 5px black;\n    }\n    .markdown-editor .preview {\n      margin-left: 50px;\n    }\n  </style>\n\n  <h1>Aurelia Markdown Redux</h1>\n\n  <div class=\"markdown-editor\">\n    <textarea class=\"editor\" value.bind=\"raw\"></textarea>\n    <div class=\"preview\" innerHTML.bind=\"html\"></div>\n  </div>\n</template>\n"; });
define('text!markdown-redux.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    body {\n      background-color: lightcyan;\n    }\n    .markdown-editor {\n      width: 100%;\n      height: 80vh;\n    }\n    \n    .markdown-editor .editor,\n    .markdown-editor .preview {\n      float: left;\n      width: 45%;\n      height: 100%;\n      padding: 10px;\n    }\n    .markdown-editor .editor {\n      border: solid 5px black;\n    }\n    .markdown-editor .preview {\n      margin-left: 50px;\n    }\n\n    .toolbar {\n      margin-bottom: 20px;\n    }\n  </style>\n\n  <h1>Aurelia Markdown Redux</h1>\n  \n  <div class=\"markdown-editor\">\n    <textarea class=\"editor\"\n              keyup.trigger=\"keyupHandler($event.target.value) & debounce\"\n              value.one-way=\"raw\"></textarea>\n    <div class=\"preview\" innerHTML.bind=\"html\"></div>\n  </div>\n</template>\n"; });
define('text!markdown.html', ['module'], function(module) { module.exports = "<template>\n  <style>\n    body {\n      background-color: lightcyan;\n    }\n    .markdown-editor {\n      width: 100%;\n      height: 80vh;\n    }\n    \n    .markdown-editor .editor,\n    .markdown-editor .preview {\n      float: left;\n      width: 45%;\n      height: 100%;\n      padding: 10px;\n    }\n    .markdown-editor .editor {\n      border: solid 5px black;\n    }\n    .markdown-editor .preview {\n      margin-left: 50px;\n    }\n\n    .toolbar {\n      margin-bottom: 20px;\n    }\n  </style>\n\n  <h1>Aurelia Markdown Redux</h1>\n  \n  <div class=\"toolbar\">\n    <button click.trigger=\"undo()\">(${pastCount}) <- Undo</button>\n    <button click.trigger=\"redo()\">Redo -> (${futureCount})</button>\n  </div>\n\n  <div class=\"markdown-editor\">\n    <textarea class=\"editor\"\n              keyup.trigger=\"keyupHandler($event.target.value) & debounce\"\n              value.one-way=\"raw\"></textarea>\n    <div class=\"preview\" innerHTML.bind=\"html\"></div>\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map