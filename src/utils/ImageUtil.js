/**
 * 图片处理工具类
 */
import images from 'images';
import BlinkDiff from 'blink-diff';
import Tesseract from 'tesseract.js';
// import im from 'imagemagick';
import adb from 'adbkit';
import im from '../libs/imagemagick.js';
import path from 'path';
import config from '../config.js';
import fs from 'fs';
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

    static contrast(inputPath, outPath){
        return new Promise((resolve, reject) =>{ 
            im.convert([inputPath, '-brightness-contrast', '0,92', outPath], 
                function(err, stdout){
                    if (err) throw err;
                    resolve();
            });
        })
    }

    static append(inputPaths, outPath){
        return new Promise((resolve, reject) =>{ 
            // inputPaths.push('-monochrome');
            // inputPaths.push('-threshold');
            // inputPaths.push('40%');
            inputPaths.push('-append');
            inputPaths.push(outPath);
            im.convert(inputPaths, 
                function(err, stdout){
                    if (err) throw err;
                    resolve();
            });
        })
    }

    //im_convert 2.png 1.png 3.png 4.png 5.png -append 0.png
    //im_convert t.png -brightness-contrast 0,95 1.png


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
                    let defaultV = ['A','K','Q','J','9','8','7','6','5','4','3','2']; 
                    let value = result.text.replace('\n\n','');
                    if(defaultV.indexOf(value)===-1){
                        value = '10';
                    };
                    resolve(value);
                })
        })
    }
    static getValues(path){
        return new Promise((resolve, reject) =>{ 
            Tesseract.recognize(path)
                .then(function(result){
                    let defaultV = ['A','K','Q','J','9','8','7','6','5','4','3','2'];
                    let text = result.text.replace('\n\n','');
                    let values = [];
                    let orValue = text.split('\n');
                    orValue.forEach(value=>{
                        if(defaultV.indexOf(value)===-1){
                            if(value=='ID'){
                                value = '10';
                            }else{
                                value = 'Q';
                            }
                        }
                        values.push(value);
                    })
                    resolve(values);
                })
        })
    }
    static screencap(){
        let client = adb.createClient();
        return client.listDevices()
            .then(function (devices) {
                devices.forEach(function (device) {
                    client.screencap(device.id).then(stream=> {
                        let chunks = [];
                        stream.on('data', chunk => {
                            chunks.push(chunk);
                        });
                        stream.on('end', () => {
                            var buffer = new Buffer.concat(chunks);
                            var out = fs.createWriteStream(path.join(config.originalImagePath, device.id+'.png'));
                            out.write(buffer);
                            out.end();
                        });
                    });
                })
            })
    }
}