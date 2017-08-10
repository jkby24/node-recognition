'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Server = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 服务类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ManService = require('../service/ManService.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = exports.Server = function () {
    function Server() {
        _classCallCheck(this, Server);
    }

    _createClass(Server, [{
        key: 'init',
        value: function init() {
            var app = (0, _express2.default)();
            app.use(_express2.default.static('public'));
            app.get('/index.htm', function (req, res) {
                res.sendFile(__dirname + "/" + "index.htm");
            });
            var server = app.listen(8081, function () {

                var host = server.address().address;
                var port = server.address().port;

                console.log("应用实例，访问地址为 http://%s:%s", host, port);
            });
            var manService = new _ManService.ManService();
            app.get('/rt', function (req, res) {

                // 输出 JSON 格式
                var response = manService.recognition();
                console.log(response);
                res.end(JSON.stringify(response));
            });
        }
    }]);

    return Server;
}();
//# sourceMappingURL=server.js.map