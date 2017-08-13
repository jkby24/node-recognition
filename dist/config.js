'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    originalImagePath: _path2.default.join(process.cwd(), '/src/temp/original'), //手机截图后的图片目录
    processedImagePath: _path2.default.join(process.cwd(), '/src/temp/processed'), //处理的目录
    boardsImagePath: _path2.default.join(process.cwd(), '/src/temp/boards') //处理的目录
};
//# sourceMappingURL=config.js.map