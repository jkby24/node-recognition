import path from 'path';
export default {
    originalImagePath:path.join(process.cwd(),'/src/temp/original'),//手机截图后的图片目录
    processedImagePath:path.join(process.cwd(),'/src/temp/processed'),//处理的目录
    boardsImagePath:path.join(process.cwd(),'/src/temp/boards'),//花色模板的目录
    valuesImagePath:path.join(process.cwd(),'/src/temp/values'),//牌值的目录
    valuesMImagePath:path.join(process.cwd(),'/src/temp/values-m'),//牌值大图的目录
    testImagePath:path.join(process.cwd(),'/src/temp/test'),//测试的目录
}