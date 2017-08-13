'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 图片处理工具类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _images = require('images');

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: 'resize',
        value: function resize(inputPath, outPath, width, height) {
            (0, _images2.default)(inputPath).resize(width, height).save(outPath);
        }
    }, {
        key: 'cut',
        value: function cut(inputPath, outPath, x, y, width, height) {
            (0, _images2.default)((0, _images2.default)(inputPath), x, y, width, height).save(outPath);
        }
    }]);

    return _class;
}();

exports.default = _class;
//# sourceMappingURL=ImageUtil.js.map