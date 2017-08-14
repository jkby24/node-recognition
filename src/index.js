// var Tesseract = require('tesseract.js')
// var Tesseract = Tesseract.create({
//     workerPath: './libs/worker.js',
//     langPath: './libs/',
// })
// Tesseract.recognize('t.png')
// .then(function(result){
//     console.log(result)
// })
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
//     imageAPath: path.join(config.boardsImagePath,"1.png"), // Use file-path 
//     imageBPath: path.join(config.boardsImagePath,"og_0_9_b.png"),

//     thresholdType: BlinkDiff.THRESHOLD_PERCENT,
//     threshold: 0.04, // 1% threshold 

//     imageOutputPath: path.join(config.boardsImagePath,"diff.png"),
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




import {ManService} from './service/ManService.js';
let manService = new ManService();
manService.recognition().then(()=>{

});




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
// import {Server} from './server/server.js';
// let server = new Server();
// server.init();