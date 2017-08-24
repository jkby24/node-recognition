
// import {ManService} from './service/ManService.js';
// let manService = new ManService();
// manService.recognition().then(()=>{

// });

//正式代码
// import {Server} from './server/server.js';
// let server = new Server();
// server.init();







import config from './config.js';
import path from 'path';
import fs from 'fs';
import ImageUtil from './utils/ImageUtil.js';

let fload = path.join(process.cwd(),'/src/temp/test');
ImageUtil.getValues(path.join(fload,'y3.png')).then((values)=>{
    console.log(values);
})


//adb 
// import adb from 'node-adb';
// adb({
//     cmd: ['devices']
// },function(result){
//     console.log(result);
// });