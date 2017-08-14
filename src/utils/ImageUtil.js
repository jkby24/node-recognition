/**
 * 图片处理工具类
 */
import images from 'images';
import BlinkDiff from 'blink-diff';
export default class {
    static resize(inputPath, outPath, width, height) {
        images(inputPath).resize(width, height).save(outPath);
    }

    static cut(inputPath, outPath, x, y, width, height) {
        images(images(inputPath), x, y, width, height).save(outPath);
    }

    static isDiff(imageAPath,imageBPath){
        return new Promise(function(resolve, reject) {
            var diff = new BlinkDiff({
                imageAPath: imageAPath, // Use file-path 
                imageBPath: imageBPath,
                thresholdType: BlinkDiff.THRESHOLD_PERCENT,
                threshold: 0.04, // 1% threshold 
                // imageOutputPath: path.join(config.originalImagePath,"diff.png"),
            });
            diff.run(function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(!diff.hasPassed(result.code));
                }
            });
        });
        
    }
}