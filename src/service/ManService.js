/**
 * 主处理类
 */
import config from '../config.js';
import path from 'path';
import fs from 'fs';
import ImageUtil from '../utils/ImageUtil.js';
import FileUtil from '../utils/FileUtil.js';
// import _ from 'lodash';
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
        // FileUtil.deleteFolder(config.originalImagePath);
        // FileUtil.mkdir(config.originalImagePath);
        FileUtil.deleteFolder(config.processedImagePath);
        FileUtil.mkdir(config.processedImagePath);


        let files = fs.readdirSync(config.originalImagePath);
        if (!files || files.length === 0) {
            return;
        }
        let players = [];
        let promises = [];
        files.forEach((file, index) => {
            if(file.indexOf('.DS_Store')!=-1){
                return;
            }
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
            let remainPlayerBoards = []; 

            let values = ['A','K','Q','J','10','9','8','7','6','5','4','3','2'],
                suits = [0,1,2,3];    
            let boardsPooling = [];
            values.forEach(value=>{
                suits.forEach(suit=>{
                    boardsPooling.push({
                        value: value,
                        suit: suit
                    })
                })
            });
            players.forEach((player)=>{
                player.boards.forEach(board=>{
                    let index = boardsPooling.findIndex(bt => { 
                        return board.value == bt.value && board.suit == bt.suit; 
                    });
                    if(index!=-1){
                        boardsPooling.splice(index,1);
                    }else{
                        console.log(`未找到值：${board.value},花色：${board.suit}`)
                    }
                })
            });

            console.log('剩下：')
            boardsPooling.forEach(bo =>{
                console.log(`值：${bo.value},花色：${bo.suit}`);
            })
            // FileUtil.deleteFolder(config.processedImagePath);
            return {
                    players: players,
                    player_four: boardsPooling
                }
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
        let boardsTemp = [];
        // for (let i = 0; i < 8; i++) {
        for (let i = 0; i < this.ogInfo.total; i++) {
            let vPoint = {
                    x: this.ogInfo.fvPoint.x + this.ogInfo.spacing * i + (i >= 9 ? 2 : 0),
                    y: this.ogInfo.fvPoint.y,
                },
                bPoint = {
                    x: this.ogInfo.fbPoint.x + this.ogInfo.spacing * i + (i >= 9 ? 2 : 0),
                    y: this.ogInfo.fbPoint.y,
                };
            let vFileTemp = path.join(config.processedImagePath, `${id}_${i}_v_temp${suffix}`),
                vFile = path.join(config.processedImagePath, `${id}_${i}_v${suffix}`),
                bFile = path.join(config.processedImagePath, `${id}_${i}_b${suffix}`);
            // ImageUtil.cut(resizePath, vFile, vPoint.x, vPoint.y, this.ogInfo.valueI.width, this.ogInfo.valueI.height);
            ImageUtil.cutAndResize(resizePath, vFileTemp, vPoint.x, vPoint.y, this.ogInfo.valueI.width, this.ogInfo.valueI.height,300,300);
            ImageUtil.cut(resizePath, bFile, bPoint.x, bPoint.y, this.ogInfo.boardI.width, this.ogInfo.boardI.height);
            promises.push(()=>{
                return new Promise((resolve) => {
                    return this.boardCp(bFile).then((suit) => {
                        boardsTemp.push({
                            suit: suit,
                            vFile: vFileTemp
                        });
                        resolve();
                    })
                })
            });
        }
        
        return this.sequenceExecutePromise(promises).then(() => {
            return new Promise((resolve)=>{
                var files = [];
                boardsTemp.forEach(board=>{
                    files.push(board.vFile);
                    files.push(path.join(config.testImagePath, `blank${suffix}`));
                });
                let appendFileTemp = path.join(config.processedImagePath, `${id}_append_t${suffix}`);
                let appendFile = path.join(config.processedImagePath, `${id}_append${suffix}`);
                ImageUtil.append(files,appendFileTemp).then(()=>{
                    ImageUtil.contrast(appendFileTemp,appendFile).then(()=>{
                        this.valuesByTesseract(appendFile).then((values)=>{
                            boardsTemp.forEach((board,i)=>{
                                console.log(`值：${values[i]},花色：${board.suit}`);
                                itemInfo.boards.push({
                                    value: values[i],
                                    suit: board.suit
                                });
                            });
                            resolve(itemInfo);
                        });
                    });
                })
            });
        });
    }

    valueByTesseract(file){
        return ImageUtil.getValue(file);
    }
    valuesByTesseract(file){
        return ImageUtil.getValues(file);
    }

    valueByDiff(file){
        let values = fs.readdirSync(config.valuesMImagePath);
        if (!values) {
            throw new Error('config.valuesImagePath目录空');
        }
        
        let resultValue;
        let promises = [];
        values.forEach(value => {
            promises.push(() => {
                return ImageUtil.isDiff(file, path.join(config.valuesMImagePath, value),0.5).then(isDiff => {
                    if (!isDiff) {
                        resultValue = value.split('.')[0];
                    }
                    return resultValue;
                })
            })
        });
        return this.sequenceExecutePromise(promises).then(() => {
            if (!resultValue) {
                console.log(`解析牌值文件${file}失败`);
            }else{
                console.log(`解析牌值文件${file}成功：${resultValue}`);
            }
            return resultValue;
        });
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
            // if (!resultSuit) {
            //     console.log(`解析花色文件${file}失败`);
            // }else{
            //     console.log(`解析花色文件${file}成功：${resultSuit}`);
            // }
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