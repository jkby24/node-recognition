/**
 * 图片处理工具类
 */
import images from 'images';
import BlinkDiff from 'blink-diff';
import Tesseract from 'tesseract.js';
export default class {
    static resize(inputPath, outPath, width, height) {
        images(inputPath).resize(width, height).save(outPath);
    }

    static cut(inputPath, outPath, x, y, width, height) {
        images(images(inputPath), x, y, width, height).save(outPath);
    }

    static cutAndResize(inputPath, outPath, x, y, width, height,rWidth,rHeight) {
        images(images(inputPath), x, y, width, height).resize(rWidth, rHeight).save(outPath);
    }

    static isDiff(imageAPath,imageBPath,threshold = 0.04,outputPath){
        return new Promise(function(resolve, reject) {
            var diff = new BlinkDiff({
                imageAPath: imageAPath, // Use file-path 
                imageBPath: imageBPath,
                thresholdType: BlinkDiff.THRESHOLD_PERCENT,
                threshold: threshold, // 1% threshold 
                imageOutputPath: outputPath,
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

    static getValue(path){
        return new Promise((resolve, reject) =>{ 
            Tesseract.recognize(path)
                .then(function(result){
                    let defaultV = ['A','K','Q','J','9','8','7','6','5','4','3','2','1'] 
                    let value = result.text.replace('\n\n','');
                    if(defaultV.indexOf(value)===-1){
                        value = '10';
                    };
                    resolve(value);
                })
        })
    }
}