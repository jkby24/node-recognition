// import {ManService} from './service/ManService.js';
// let manService = new ManService();
// manService.recognition().then((data)=>{
//     console.log(data);
// });

//正式代码
// import {Server} from './server/server.js';
// let server = new Server();
// server.init();
import fs from 'fs';
import config from './config.js';
import path from 'path';
import ImageUtil from './utils/ImageUtil.js';
ImageUtil.contrast(path.join(config.testImagePath, 't2_c1_0_11_b.png'));
// // function sequenceExecutePromise(promises) {
// //     var result = Promise.resolve();
// //     promises.forEach((promise) => {
// //         result = result.then(promise);
// //     });
// //     return result;
// // }

// let file = path.join(config.processedImagePath, 't2_c1_0_11_b.png');
// let boards = fs.readdirSync(config.boardsImagePath);
// let result;
// let promises = [];
// console.time('总时间')
// console.log(boards);
// boards.forEach(boad => {
//     // promises.push(() => {
//         console.log(boad);
//         ImageUtil.isDiff(file, path.join(config.boardsImagePath, boad)).then(isDiff => {
//             if (!isDiff) {
//                 console.log('找到:'+boad);
//                 console.timeEnd('总时间')
//                 result = boad.split('.')[0];
//             }
//             // return result;
//         })
//     // })
// });

// sequenceExecutePromise(promises).then(() => {
//     console.log(`结果${result}`)
//     return result;
// });


// import config from './config.js';
// import path from 'path';
// import fs from 'fs';
// import ImageUtil from './utils/ImageUtil.js';
// ImageUtil.screencap().then(()=>{
//     console.log(123);
// });
// let fload = path.join(process.cwd(),'/src/temp/test');
// ImageUtil.getValues(path.join(fload,'y3.png')).then((values)=>{
//     console.log(values);
// })


//adb 
// import adb from 'node-adb';
// adb({
//     cmd: ['devices']
// },function(result){
//     console.log(result);
// });

// import fs from 'fs';
// import config from './config.js';

// import adb from 'adbkit';
// let client = adb.createClient();
// client.listDevices()
//     .then(function (devices) {
//         devices.forEach(function (device) {

//             // return client.shell(device.id, ' /system/bin/screencap -p /sdcard/12.png')
//             // debugger
//             // client.screencap(device.id).then(function(stream,st) {
//             //     debugger
//             //     console.log(stream)
//             //     fs.writeFileSync('screenshot.png', stream) // Synchronous - bad!
//             // });
//             console.log(device.id);
//             console.log(device);
//             // client.screencap(device.id, function (error, stream) {
//             //     let chunks = [];
//             //     stream.on('data', chunk => {
//             //         console.log(1)
//             //         chunks.push(chunk);
//             //     });
//             //     stream.on('end', () => {
//             //         var buffer = new Buffer.concat(chunks);
//             //         var out = fs.createWriteStream('out.png');
//             //         out.write(buffer);
//             //         out.end();
//             //     });
//             //     // fs.writeFileSync('screenshotadf.png', stream) // Synchronous - bad!
//             // });

//             // client.framebuffer(device.id, 'png', function(err, data){
//             //     var bufs = [];
//             //     data.on('data', function(chunk){
//             //         bufs.push(chunk);
//             //     });
//             //     data.on('end', function(){
//             //         var buffer = new Buffer.concat(bufs);
//             //         fs.writeFileSync('screenshot.png', buffer)

//             //         // var out = fs.createWriteStream('out.jpg');
//             //         // out.write(buffer);
//             //         // out.end();
//             //     });
//             // });
//         })
//     })


// import fs from 'fs';
// import config from './config.js';
// import path from 'path';
// import ImageUtil from './utils/ImageUtil.js';
// ImageUtil.isDiff(path.join(config.testImagePath, 't2_c1_0_11_b.png'), path.join(config.testImagePath, '13.png'),0.01,path.join(config.testImagePath, 'tt2.png')).then(isDiff => {
//     if (!isDiff) {
//         console.log('成功');
//     }
//     return result;
// });