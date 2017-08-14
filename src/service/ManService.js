/**
 * 主处理类
 */
import config from '../config.js';
import path from 'path';
import fs from 'fs';
import ImageUtil from '../utils/ImageUtil.js';
import FileUtil from '../utils/FileUtil.js';
// import BoardsConst from '../utils/BoardsConst.js';
export class ManService {
    constructor() {
        this.ogInfo = {
            width: 1280,
            height: 720,
            fvPoint: {
                x: 20,
                y: 570
            },
            fbPoint: {
                x: 20,
                y: 612
            },
            spacing: 95,
            valueI: {
                width: 32,
                height: 42
            },
            boardI: {
                width: 30,
                height: 28
            },
            total: 13
        };
    }

    recognition() {

        /** players = [{
         *      id:'1',
         *      boards:[{
         *          value : '',
         *          suit : ''
         *      }]
         * }]
         * 
         *  发送adb命令截图保存到original目录下,根据设备名来保存
         * 
         *  files = 遍历original目录
         * 
         * files.forEach(file=>{
         *    fileItem = {
         *          id:file.name,
         *          boards:[]
         *      }
         *      
         *    rFile = 把图片统一缩小为指定尺寸到resize目录下
         *    boards = 把rFile截取为一张张小图
         *    boards.forEach(board =>{
         *           infoFiles = board 对半截图
         *           value = 获取牌值(infoFiles[0])
         *           suit = 获取花色(infoFiles[1])
         *          fileItem.boards.push({
         *              value :value,
         *              suit : suit
         *          })
         *      })
         *    清理目录
         *    boardsPooling = [{}]  
         *    remainPlayerBoards = []; 
         *    根据三家牌算出第四个牌
         *    players.forEach(player=>{
         *          
         *      })
         * })
         * 
         * 
         * 
         * 
         * 
         */
        if (!fs.existsSync(config.originalImagePath)) {
            return;
        }
        let files = fs.readdirSync(config.originalImagePath);
        if (!files || files.length === 0) {
            return;
        }
        let players = [];
        let promises = [];
        FileUtil.deleteFolder(config.processedImagePath);
        FileUtil.mkdir(config.processedImagePath);
        files.forEach((file, index) => {
            console.log(`开始解析${file}`);
            promises.push((() => {
                return this.fileProcess(file, index).then((info) => {
                    players.push(info);
                    console.log(`${file}解析完成`);
                    return;
                })
            })());
        }, this);

        return Promise.all(promises).then((data) => {
            console.log(players);
            // let remainPlayerBoards = []; 

            // let values = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'],
            //     suits = [0,1,2,3];    
            // let boardsPooling = [];
            // values.forEach(value=>{
            //     suits.forEach(suit=>{
            //         boardsPooling.push({
            //             value: value,
            //             suit: suit
            //         })
            //     })
            // })
            // players.forEach((player)=>{

            // });

            // FileUtil.deleteFolder(config.processedImagePath);
            return [{
                value: 1,
                suit: 0
            }]
        });
    }

    fileProcess(file, index) {
        let suffix = '.png';
        let id = `${file.split('.')[0]}_${index}`;
        let iPath = path.join(config.originalImagePath, file),
            resizePath = path.join(config.processedImagePath, `${id}${suffix}`);
        ImageUtil.resize(iPath, resizePath, this.ogInfo.width, this.ogInfo.height);
        let itemInfo = {
            id: id,
            boards: []
        }
        let promises = [];
        // for (let i = 0; i < 8; i++) {
        for (let i = 0; i < this.ogInfo.total; i++) {
            let vPoint = {
                    x: this.ogInfo.fvPoint.x + this.ogInfo.spacing * i + (i >= 10 ? 2 : 0),
                    y: this.ogInfo.fvPoint.y,
                },
                bPoint = {
                    x: this.ogInfo.fbPoint.x + this.ogInfo.spacing * i + (i >= 10 ? 2 : 0),
                    y: this.ogInfo.fbPoint.y,
                };
            let vFile = path.join(config.processedImagePath, `${id}_${i}_v${suffix}`),
                bFile = path.join(config.processedImagePath, `${id}_${i}_b${suffix}`);
            ImageUtil.cut(resizePath, vFile, vPoint.x, vPoint.y, this.ogInfo.valueI.width, this.ogInfo.valueI.height);
            ImageUtil.cut(resizePath, bFile, bPoint.x, bPoint.y, this.ogInfo.boardI.width, this.ogInfo.boardI.height);
            let value = this.valueCp(vFile);
            promises.push(new Promise((resolve) => {
                return this.boardCp(bFile).then((suit) => {
                    itemInfo.boards.push({
                        value: value,
                        suit: suit
                    });
                    resolve(suit);
                })
            }));
        }
        return Promise.all(promises).then(() => {
            console.log(`file文件值为：${itemInfo}`);
            return itemInfo;
        });
    }

    valueCp(path) {
        let value = 3;
        // console.log(`读取${path}值成功${value}`);
        return value;
    }

    boardCp(file) {
        let boards = fs.readdirSync(config.boardsImagePath);
        if (!boards) {
            throw new Error('config.boardsImagePath目录空');
        }
        let resultSuit;
        let promises = [];
        boards.forEach(boad => {
            promises.push(() => {
                return ImageUtil.isDiff(file, path.join(config.boardsImagePath, boad)).then(isDiff => {
                    if (!isDiff) {
                        resultSuit = boad.split('.')[0];
                    }
                    return resultSuit;
                })
            })
        });
        return this.sequenceExecutePromise(promises).then(() => {
            if (!resultSuit) {
                console.log(`解析花色文件${file}失败`);
            }
            console.log(`解析花色文件${file}成功：${resultSuit}`);
            return resultSuit;
        });
    }

    sequenceExecutePromise(promises) {
        var result = Promise.resolve();
        promises.forEach((promise) => {
            result = result.then(promise);
        });
        return result;
    }
}