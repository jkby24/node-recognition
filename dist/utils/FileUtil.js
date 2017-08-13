"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 文件处理工具类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    _createClass(_class, null, [{
        key: "mkdir",


        /**
         * 创建文件夹
         */
        value: function mkdir(path) {
            if (_fs2.default.existsSync(path)) {
                return;
            }
            _fs2.default.mkdirSync(path);
        }

        /**
         * 删除文件夹及文件夹下的文件
         * @param {*} path 
         */

    }, {
        key: "deleteFolder",
        value: function (_deleteFolder) {
            function deleteFolder(_x) {
                return _deleteFolder.apply(this, arguments);
            }

            deleteFolder.toString = function () {
                return _deleteFolder.toString();
            };

            return deleteFolder;
        }(function (path) {
            var files = [];
            if (_fs2.default.existsSync(path)) {
                files = _fs2.default.readdirSync(path);
                files.forEach(function (file, index) {
                    var curPath = path + "/" + file;
                    if (_fs2.default.statSync(curPath).isDirectory()) {
                        // recurse
                        deleteFolder(curPath);
                    } else {
                        // delete file
                        _fs2.default.unlinkSync(curPath);
                    }
                });
                _fs2.default.rmdirSync(path);
            }
        })
    }]);

    return _class;
}();

exports.default = _class;
//# sourceMappingURL=FileUtil.js.map