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
        FileUtil.deleteFolder(config.originalImagePath);
        FileUtil.mkdir(config.originalImagePath);
        FileUtil.deleteFolder(config.processedImagePath);
        FileUtil.mkdir(config.processedImagePath);

        return ImageUtil.screencap().then(() => {
            let files = fs.readdirSync(config.originalImagePath);
            if (!files || files.length === 0) {
                return Promise.resolve();
            }
            let players = [];
            let promises = [];

            promises.push((() => {
                return ImageUtil.screencap();
            })());

            files.forEach((file, index) => {
                if (file.indexOf('.DS_Store') != -1) {
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
                return {
                    players: players
                    // player_four: boardsPooling
                }
            });
        })
    }


    fileProcess(file, index) {
        let suffix = '.png';
        let id = `${file.split('.')[0]}_${index}`;
        let iPath = path.join(config.originalImagePath, file),
            rotatePath = path.join(config.processedImagePath, `${id}_r${suffix}`),
            resizePath = path.join(config.processedImagePath, `${id}${suffix}`);

        let itemInfo = {
            id: id,
            boards: []
        }
        let promises = [];
        let boardsTemp = [];
        promises.push(() => {
            return new Promise((resolve) => {
                return ImageUtil.rotate(iPath, rotatePath).then(() => {
                    ImageUtil.resize(rotatePath, resizePath, this.ogInfo.width, this.ogInfo.height);
                    resolve();
                })
            })
        });
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
            
            promises.push(() => {
                return new Promise((resolve) => {
                    ImageUtil.cutAndResize(resizePath, vFileTemp, vPoint.x, vPoint.y, this.ogInfo.valueI.width, this.ogInfo.valueI.height, 300, 300);
                    ImageUtil.cut(resizePath, bFile, bPoint.x, bPoint.y, this.ogInfo.boardI.width, this.ogInfo.boardI.height);
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
            return new Promise((resolve) => {
                let files = [];
                let suits = [];
                boardsTemp.forEach(board => {
                    suits.push(board.suit)
                    files.push(board.vFile);
                    files.push(path.join(config.testImagePath, `blank${suffix}`));
                });
                let appendFileTemp = path.join(config.processedImagePath, `${id}_append_t${suffix}`);
                let appendFileName = `${id}_append${suffix}`;
                let appendFile = path.join(config.processedImagePath, appendFileName);
                ImageUtil.append(files, appendFileTemp).then(() => {
                    ImageUtil.contrast(appendFileTemp, appendFile).then(() => {
                        resolve({
                            id: id,
                            boards: {
                                suits: suits,
                                file: appendFileName
                            }
                        });
                        // this.valuesByTesseract(appendFile).then((values)=>{
                        //     boardsTemp.forEach((board,i)=>{
                        //         console.log(`值：${values[i]},花色：${board.suit}`);
                        //         itemInfo.boards.push({
                        //             value: values[i],
                        //             suit: board.suit
                        //         });
                        //     });
                        //     resolve(itemInfo);
                        // });
                    });
                })
            });
        });
    }

    valueByTesseract(file) {
        return ImageUtil.getValue(file);
    }
    valuesByTesseract(file) {
        return ImageUtil.getValues(file);
    }

    valueByDiff(file) {
        let values = fs.readdirSync(config.valuesMImagePath);
        if (!values) {
            throw new Error('config.valuesImagePath目录空');
        }

        let resultValue;
        let promises = [];
        values.forEach(value => {
            promises.push(() => {
                return ImageUtil.isDiff(file, path.join(config.valuesMImagePath, value), 0.5).then(isDiff => {
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
            } else {
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