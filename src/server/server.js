/**
 * 服务类
 */
import express from 'express';
export class Server {
    constructor() {}
    init() {
        let app = express();
        app.use(express.static('public'));
        app.get('/index.htm', function (req, res) {
            res.sendFile(__dirname + "/" + "index.htm");
        });
        let server = app.listen(8081, function () {

            var host = server.address().address
            var port = server.address().port

            console.log("应用实例，访问地址为 http://%s:%s", host, port)

        })
        app.get('/rt', function (req, res) {

            // 输出 JSON 格式
            let response = {
                first_name: 1,
                last_name: 2
            };
            console.log(response);
            res.end(JSON.stringify(response));
        })
    }
}