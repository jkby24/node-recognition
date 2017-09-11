/**
 * 服务类
 */
import express from 'express';
import {ManService} from '../service/ManService.js'
import sd from 'silly-datetime';
import config from '../config.js';
import path from 'path';
export class Server {
    constructor() {}
    init() {
        let app = express();
        app.use(express.static('public'));
        app.get('/index.html', function (req, res) {
            res.sendFile(__dirname + "/" + "index.html");
        });
        app.get('/demo.html', function (req, res) {
            res.sendFile(__dirname + "/" + "demo.html");
        });
        app.get('/resource/:name', function (req, res) {
            res.sendFile(__dirname + "/resource/"+ req.params.name);
        });
        app.get('/file/:name', function (req, res) {
            res.sendFile(path.join(config.processedImagePath, req.params.name));
        });
        app.get('/file/og/:name', function (req, res) {
            res.sendFile(path.join(config.originalImagePath, req.params.name));
        });
        app.get('/tesseract/:name', function (req, res) {
            res.sendFile(__dirname + "/tesseract/"+ req.params.name);
        });
        app.get("/boards/:suit", function(req, res) {
            res.sendFile(__dirname + "/resource/boards/"+ req.params.suit + ".png");
        });
        app.get("/resource/fonts/:name", function(req, res) {
            res.sendFile(__dirname + "/resource/"+ req.params.name);
        });
        let server = app.listen(8081, function () {

            var host = server.address().address
            var port = server.address().port

            console.log("应用实例，访问地址为 http://%s:%s", host, port)

        })
        let manService = new ManService();
        app.get('/rt', function (req, res) {
            // if(!req.query.pw|| req.query.pw !=(+sd.format(new Date(), 'DDMMYYYY')).toString(36)){
            //     res.end(JSON.stringify({error:'安全码错误！'}));
            // }else{
                // 输出 JSON 格式
                manService.recognition().then(data=>{
                    
                    // console.log(JSON.stringify(data));
                    let response={
                        data:data
                    }
                    res.end(JSON.stringify(response));
                });
                // let data = JSON.parse(`{"players":[{"id":"C2_0","boards":[{"value":"4","suit":"2"},{"value":"6","suit":"3"},{"value":"6","suit":"2"},{"value":"9","suit":"1"},{"value":"10","suit":"2"},{"value":"10","suit":"0"},{"value":"J","suit":"2"},{"value":"J","suit":"3"},{"value":"Q","suit":"2"},{"value":"K","suit":"3"},{"value":"A","suit":"0"},{"value":"A","suit":"1"},{"value":"5","suit":"2"}]},{"id":"R2_1","boards":[{"value":"5","suit":"3"},{"value":"6","suit":"1"},{"value":"7","suit":"0"},{"value":"8","suit":"3"},{"value":"8","suit":"0"},{"value":"10","suit":"1"},{"value":"Q","suit":"0"},{"value":"K","suit":"1"},{"value":"A","suit":"3"},{"value":"A","suit":"2"},{"value":"2","suit":"2"},{"value":"2","suit":"3"},{"value":"3","suit":"0"}]},{"id":"T2_2","boards":[{"value":"4","suit":"3"},{"value":"5","suit":"0"},{"value":"7","suit":"2"},{"value":"7","suit":"3"},{"value":"8","suit":"2"},{"value":"9","suit":"2"},{"value":"9","suit":"3"},{"value":"J","suit":"0"},{"value":"Q","suit":"3"},{"value":"Q","suit":"1"},{"value":"3","suit":"3"},{"value":"2","suit":"1"},{"value":"3","suit":"2"}]}],"player_four":[{"value":"K","suit":0},{"value":"K","suit":2},{"value":"J","suit":1},{"value":"10","suit":3},{"value":"9","suit":0},{"value":"8","suit":1},{"value":"7","suit":1},{"value":"6","suit":0},{"value":"5","suit":1},{"value":"4","suit":0},{"value":"4","suit":1},{"value":"3","suit":1},{"value":"2","suit":0}]}`);


                // let response={
                //     data:data
                // }
                // res.end(JSON.stringify(response));
            // }
            
            
        })
    }
}