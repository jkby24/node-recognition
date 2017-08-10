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
            return [{
                value: 1,
                suit: 0
            }];
        }
    }]);

    return ManService;
}();
//# sourceMappingURL=ManService.js.map