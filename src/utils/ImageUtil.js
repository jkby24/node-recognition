/**
 * 图片处理工具类
 */
import images from 'images';
export default class {
    static resize(inputPath, outPath, width, height) {
        images(inputPath).resize(width, height).save(outPath);
    }
    static cut(inputPath, outPath, x, y, width, height) {
        images(images(inputPath), x, y, width, height).save(outPath);
    }
}