// import {ManService} from './service/ManService.js';
// let manService = new ManService();
// manService.recognition().then((data)=>{
//     console.log(data);
// });

//正式代码
import {Server} from './server/server.js';
let server = new Server();
server.init();







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