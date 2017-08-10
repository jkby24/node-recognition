"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImageUtil = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 图片处理工具类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _images = require("images");

var _images2 = _interopRequireDefault(_images);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageUtil = exports.ImageUtil = function () {
    function ImageUtil() {
        _classCallCheck(this, ImageUtil);
    }

    _createClass(ImageUtil, null, [{
        key: "resize",
        value: function resize() {
            (0, _images2.default)("mhh.png").resize(27, 27).save("mhhhc.png");
        }
    }, {
        key: "cut",
        value: function cut() {
            (0, _images2.default)((0, _images2.default)("cj.png"), 50, 50, 100, 100).save("testt.png");
        }
    }]);

    return ImageUtil;
}();
//# sourceMappingURL=ImageUtil.js.map