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
// var BlinkDiff =  require('blink-diff')
// var diff = new BlinkDiff({
//     imageAPath: '1.png', // Use file-path 
//     imageBPath: 'mh.png',
 
//     thresholdType: BlinkDiff.THRESHOLD_PERCENT,
//     threshold: 0.3, // 1% threshold 
 
//     imageOutputPath: 'diff.png'
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

// var images = require("images");
// // images("mhh.png").resize(27,27).save("mhhhc.png");

// images(images("cj.png"),50, 50,100, 100 ).save("testt.png");
console.log('test');



//正式代码
import {Server} from './server/server.js';
let server = new Server();
server.init();