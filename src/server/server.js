/**
 * 服务类
 */
import express from 'express';
import {ManService} from '../service/ManService.js'
export class Server {
    constructor() {}
    init() {
        let app = express();
        app.use(express.static('public'));
        app.get('/index.html', function (req, res) {
            res.sendFile(__dirname + "/" + "index.html");
        });
        app.get('/vue.js', function (req, res) {
            res.sendFile(__dirname + "/resource/" + "vue.js");
        });
        app.get('/index.js', function (req, res) {
            res.sendFile(__dirname + "/resource/" + "index.js");
        });
        app.get('/vue-resource.js', function (req, res) {
            res.sendFile(__dirname + "/resource/" + "vue-resource.js");
        });
        app.get('/index.css', function (req, res) {
            res.sendFile(__dirname + "/resource/" + "index.css");
        });
        let server = app.listen(8081, function () {

            var host = server.address().address
            var port = server.address().port

            console.log("应用实例，访问地址为 http://%s:%s", host, port)

        })
        let manService = new ManService();
        app.get('/rt', function (req, res) {

            // 输出 JSON 格式
            // let response = manService.recognition();
            console.log('2313');
            let response={
                a:123
            }
            res.end(JSON.stringify(response));
        })
    }
}