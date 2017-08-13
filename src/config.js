import path from 'path';
export default {
    originalImagePath:path.join(process.cwd(),'/src/temp/original'),//手机截图后的图片目录
    processedImagePath:path.join(process.cwd(),'/src/temp/processed'),//处理的目录
    boardsImagePath:path.join(process.cwd(),'/src/temp/boards'),//处理的目录
}