'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ManService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 主处理类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ImageUtil = require('../utils/ImageUtil.js');

var _ImageUtil2 = _interopRequireDefault(_ImageUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ManService = exports.ManService = function () {
    function ManService() {
        _classCallCheck(this, ManService);
    }

    _createClass(ManService, [{
        key: 'recognition',
        value: function recognition() {

            /** players = [{
             *      id:'1',
             *      boards:[{
             *          value : '',
             *          suit : ''
             *      }]
             * }]
             * 
             *  发送adb命令截图保存到original目录下,根据设备名来保存
             * 
             *  files = 遍历original目录
             * 
             * files.forEach(file=>{
             *    fileItem = {
             *          id:file.name,
             *          boards:[]
             *      }
             *      
             *    rFile = 把图片统一缩小为指定尺寸到resize目录下
             *    boards = 把rFile截取为一张张小图
             *    boards.forEach(board =>{
             *           infoFiles = board 对半截图
             *           value = 获取牌值(infoFiles[0])
             *           suit = 获取花色(infoFiles[1])
             *          fileItem.boards.push({
             *              value :value,
             *              suit : suit
             *          })
             *      })
             *    清理目录
             *    boardsPooling = [{}]  
             *    remainPlayerBoards = []; 
             *    根据三家牌算出第四个牌
             *    players.forEach(player=>{
             *          
             *      })
             * })
             * 
             * 
             * 
             * 
             * 
             */
            if (!_fs2.default.existsSync(_config2.default.originalImagePath)) {
                return;
            }
            var files = _fs2.default.readdirSync(_config2.default.originalImagePath);
            if (!files || files.length === 0) {
                return;
            }

            var ogInfo = {
                width: 1280,
                height: 720,
                fvPoint: {
                    x: 20,
                    y: 565
                },
                fbPoint: {
                    x: 20,
                    y: 612
                },
                spacing: 95,
                valueI: {
                    width: 30,
                    height: 47
                },
                boardI: {
                    width: 30,
                    height: 30
                },
                total: 13
            };
            files.forEach(function (file, index) {
                var suffix = '.png';
                var id = file.split('.')[0] + '_' + index;
                var iPath = _path2.default.join(_config2.default.originalImagePath, file),
                    resizePath = _path2.default.join(_config2.default.processedImagePath, '' + id + suffix);
                _ImageUtil2.default.resize(iPath, resizePath, ogInfo.width, ogInfo.height);
                var itemInfo = {
                    id: id,
                    boards: []
                };
                for (var i = 0; i < ogInfo.total; i++) {
                    var vPoint = {
                        x: ogInfo.fvPoint.x + ogInfo.spacing * i,
                        y: ogInfo.fvPoint.y
                    },
                        bPoint = {
                        x: ogInfo.fbPoint.x + ogInfo.spacing * i,
                        y: ogInfo.fbPoint.y
                    };
                    var vFile = _path2.default.join(_config2.default.processedImagePath, id + '_' + i + '_v' + suffix),
                        bFile = _path2.default.join(_config2.default.processedImagePath, id + '_' + i + '_b' + suffix);
                    _ImageUtil2.default.cut(resizePath, vFile, vPoint.x, vPoint.y, ogInfo.valueI.width, ogInfo.valueI.height);
                    _ImageUtil2.default.cut(resizePath, bFile, bPoint.x, bPoint.y, ogInfo.boardI.width, ogInfo.boardI.height);
                    var valueCp = function valueCp(path) {
                        return 3;
                    };
                    var boardCp = function boardCp(path) {
                        var boards = _fs2.default.readdirSync(_config2.default.boardsImagePath);
                    };
                    // let value = ;
                    // let boards = ;
                    itemInfo.boards.push();
                }
            }, this);

            return [{
                value: 1,
                suit: 0
            }];
        }
    }]);

    return ManService;
}();
//# sourceMappingURL=ManService.js.map