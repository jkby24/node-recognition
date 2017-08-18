// import Tesseract from 'tesseract.js'
// // Tesseract = Tesseract.create({
// //     workerPath: './libs/worker.js',
// //     langPath: './libs/',
// // })
// Tesseract.recognize('./src/temp/processed/C2_0_7_v.png')
// .then(function(result){
//     console.log(result.text)
// })
// import path from 'path'
// import config from './config.js';
// import ImageUtil from './utils/ImageUtil.js'; 
// ImageUtil.getValue(path.join(config.testImagePath,"T2_0_4_v.png"))


// var getPixels = require("get-pixels")


//缩放

// getPixels("t.png", function(err, pixels) {
//   if(err) {
//     console.log("Bad image path")
//     return
//   }
//   console.log(pixels)
// })

// var gm = require('gm')
// ,  fs = require('fs')
// ,	imageMagick = gm.subClass({ imageMagick : true });

// // imageMagick('mhh.png').resize(27, 27,'!').autoOrient().write('1.png', function(err){
// //     if (err) {
// //         console.log(err);
// //     }
// // });

// //裁剪
// imageMagick('cj.png').crop(100, 100, 50, 50).autoOrient().write('test.png', function(err){
//     if (err) {
//         console.log(err);
//     }
// });

//比较
// import path from 'path'
// import config from './config.js';
// var BlinkDiff =  require('blink-diff')
// var images = require("images");
// // images(path.join(config.originalImagePath,"1.jpeg")).save(path.join(config.originalImagePath,"1.png"));
// // images(path.join(config.originalImagePath,"2.jpeg")).save(path.join(config.originalImagePath,"2.png"));
// var diff = new BlinkDiff({
//     imageAPath: path.join(path.join(process.cwd(),'/src/temp/test'),"T2_2_12_v.png"), // Use file-path 
//     imageBPath: path.join(path.join(process.cwd(),'/src/temp/test'),"2.b.png"),

//     thresholdType: BlinkDiff.THRESHOLD_PERCENT,
//     threshold: 0.05, // 1% threshold 

//     imageOutputPath:path.join(path.join(process.cwd(),'/src/temp/test'),"diff.png"),
// });

// diff.run(function (error, result) {
//    if (error) {
//       throw error;
//    } else {
//       console.log(diff.hasPassed(result.code) ? 'Passed' : 'Failed');
//       console.log(result);
//       console.log('Found ' + result.differences + ' differences.');
//    }
// });





// import path from 'path';
// var images = require("images");
// import config from './config.js';
// let inputPath = path.join(config.originalImagePath,"og.jpeg"),
// outPath = path.join(__dirname,"./temp/",'mhhhct.jpeg')
// images(inputPath).resize(27,27).save(outPath);

//清理目录下文件
// import fileUtil from './utils/FileUtil.js';
// fileUtil.mkdir(config.originalImagePath);
// fileUtil.deleteFolder(config.originalImagePath);

// deleteFolder(config.originalImagePath);
// images(images(path.join(config.originalImagePath,"og.jpeg"),),20, 565,100, 200 ).save("testt.jpeg");
// console.log('test');
// import fs from 'fs'




// import {ManService} from './service/ManService.js';
// let manService = new ManService();
// manService.recognition().then(()=>{

// });




// console.log(config.originalImagePath)
// if (fs.existsSync(config.originalImagePath)) {
//             console.log('13123');
//         }
// let files = fs.readdirSync(config.originalImagePath);
//         console.log(files);
//         files.forEach(function(file) {
//             console.log(file)
//         }, this);

//正式代码
import {Server} from './server/server.js';
let server = new Server();
server.init();







// import config from './config.js';
// import path from 'path';
// import fs from 'fs';
// import ImageUtil from './utils/ImageUtil.js';

// // // // //转换为大图
// // // // let values = fs.readdirSync(config.valuesImagePath);
// // // // values.forEach(value => {
// // // //     // let names = value.split('.');
// // // //     let bef = path.join(config.valuesImagePath,value);
// // // //     let af = path.join(config.valuesMImagePath,value);
// // // //     ImageUtil.resize(bef, af, 100,100);
// // // // });

// // let fload = path.join(process.cwd(),'/src/temp/test');

// // // let APath = path.join(fload,'Q.r.png');
// // // let BPath = path.join(fload,'C2_0_4_v.png');

// // // let APath = path.join(fload,'Q.r.png');
// // // let BPath = path.join(fload,'C2_0_4_v.png');

// // let APath = path.join(fload,'5.r.png');
// // let BPath = path.join(fload,'T2_2_8_v.png');



// // let CPath = path.join(fload,'3.b.png');
// // // let APath2 =  path.join(fload,'5.b.l.png');
// // // let BPath2 =  path.join(fload,'6.b.l.png');
// // // let CPath2 =  path.join(fload,'3.b.l.png');


// // // // ImageUtil.resize(APath, APath2, 200,200);
// // // // ImageUtil.resize(BPath, BPath2, 200,200);
// // // // ImageUtil.resize(CPath, CPath2, 200,200);

// // ImageUtil.isDiff(APath, BPath,0.1,path.join(config.testImagePath,"diff.png")).then(isDiff => {
// //     console.log(isDiff)
// // // })
// // import im from './libs/imagemagick.js';
// let fload = path.join(process.cwd(),'/src/temp/test');
// // im.convert([path.join(fload,'ct1.png'),'-brightness-contrast', '0,500', path.join(fload,'ct1_29.png')], 
// // function(err, stdout){
// //   if (err) throw err;
// //   console.log('stdout:', stdout);
// // });

// ImageUtil.contrast(path.join(fload,'ct1.png'),path.join(fload,'ct1_30.png'))




//adb 
// import adb from 'node-adb';
// adb({
//     cmd: ['devices']
// },function(result){
//     console.log(result);
// });