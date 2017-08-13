/**
 * 文件处理工具类
 */
import fs from 'fs';
export default class {

    /**
     * 创建文件夹
     */
    static mkdir(path) {
        if (fs.existsSync(path)) {
            return;
        }
        fs.mkdirSync(path);
    }

    /**
     * 删除文件夹及文件夹下的文件
     * @param {*} path 
     */
    static deleteFolder(path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    deleteFolder(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
}