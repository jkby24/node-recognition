/**
 * 主处理类
 */
import config from '../config.js';
import path from 'path';
import fs from 'fs';
import ImageUtil from '../utils/ImageUtil.js';
import FileUtil from '../utils/FileUtil.js';
import sd from 'silly-datetime';
// import _ from 'lodash';
// import BoardsConst from '../utils/BoardsConst.js';
export class ManService {
    constructor() {
        // this.ogInfo = {
        //     width: 1280,
        //     height: 720,
        //     fvPoint: {
        //         x: 20,
        //         y: 570
        //     },
        //     fbPoint: {
        //         x: 20,
        //         y: 612
        //     },
        //     spacing: 95,
        //     valueI: {
        //         width: 32,
        //         height: 42
        //     },
        //     boardI: {
        //         width: 30,
        //         height: 28
        //     },
        //     total: 13
        // };
        // this.ogInfo = {
        //     total: 13,
        //     firstPoint:{
        //         x: 75,
        //         y: 20
        //     },
        //     suitInfo: {
        //         width: 30,
        //         height: 30
        //     },
        //     boardInfo:{
        //         width: 75,
        //         height: 30
        //     },
        //     spacing: 95,
        // };
        let xt = 1.725;
        this.ogInfo = {
            total: 13,
            firstPoint: {
                x: 75 * xt,
                y: 20 * xt
            },
            boardInfo: {
                width: 75 * xt,
                height: 30 * xt
            },
            spacing: 95 * xt,
        };
    }

    recognition() {
        // FileUtil.deleteFolder(config.originalImagePath);
        // FileUtil.mkdir(config.originalImagePath);
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
                promises.push((() => {
                    return this.fileProcess3(file, index).then((info) => {
                        players.push(info);
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
                    return this.suitCp(bFile).then((suit) => {
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
                return ImageUtil.isDiff(file, path.join(config.valuesMImagePath, value), 0.04).then(isDiff => {
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

    suitCp(file) {
        let suits = fs.readdirSync(config.suitsImagePath);
        if (!suits) {
            throw new Error('config.suitsImagePath目录空');
        }
        let resultSuit;
        let promises = [];
        suits.forEach(suit => {
            promises.push(() => {
                return ImageUtil.isDiff(file, path.join(config.suitsImagePath, suit)).then(isDiff => {
                    if (!isDiff) {
                        resultSuit = suit.split('.')[0];
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


    //花色和值同时分析模式
    fileProcess2(file, index) {

        let suffix = '.png';
        let id = `${file.split('.')[0]}_${index}`;
        let originalPath = path.join(config.originalImagePath, file);
        // ImageUtil.rotate(originalPath,path.join(config.originalImagePath, `r_${file.split('.')[0]}_${suffix}`))
        let itemInfo = {
            id: file.split('.')[0],
            boards: []
        }
        let promises = [];
        let boardsTemp = [];
        for (let i = 0; i < this.ogInfo.total; i++) {
            let bPoint = {
                x: this.ogInfo.firstPoint.x,
                y: this.ogInfo.firstPoint.y + this.ogInfo.spacing * i + (i >= 9 ? 2 : 0),
            };
            let boardFile = path.join(config.processedImagePath, `${id}_${i}_b${suffix}`),
                suitFile = path.join(config.processedImagePath, `${id}_${i}_s${suffix}`);
            promises.push(() => {

                return new Promise((resolve) => {
                    ImageUtil.cut(originalPath, boardFile, bPoint.x, bPoint.y, this.ogInfo.boardInfo.width, this.ogInfo.boardInfo.height);
                    console.time(boardFile);
                    return this.find(boardFile, config.boardsImagePath, 0.01).then((board) => {
                        console.timeEnd(boardFile);
                        let arrys = board.split('_');
                        boardsTemp.push({
                            suit: arrys[1],
                            value: arrys[0]
                        });
                        resolve();
                    });
                })
            });
        }

        return this.sequenceExecutePromise(promises).then(() => {
            itemInfo.boards = boardsTemp;
            console.log(itemInfo);
            return itemInfo;
        });
    }
    find(sourceFile, comparePath, threshold) {
        let files = fs.readdirSync(comparePath);
        if (!files) {
            throw new Error('config.boardsImagePath目录空');
        }
        let result;
        let promises = [];
        files.forEach((file, index) => {
            if (file.indexOf('.DS_Store') != -1) {
                return;
            }
            promises.push((isFind) => {
                if (isFind) {
                    return Promise.resolve(isFind);
                } else {
                    return ImageUtil.isDiff(sourceFile, path.join(comparePath, file), threshold, path.join(config.processedImagePath, 't.png')).then(isDiff => {
                        if (!isDiff) {
                            result = file.split('.')[0];
                            return true;
                        }
                        return false;
                    })
                }

            })
        });
        return this.sequenceExecutePromise(promises).then(() => {
            return result;
        });
    }
    //花色和值同时分析模式(客户端分析)
    fileProcess3(file, index) {

        let suffix = '.png';
        let id = `${file.split('.')[0]}_${index}`;
        let originalPath = path.join(config.originalImagePath, file);
        // ImageUtil.rotate(originalPath,path.join(config.originalImagePath, `r_${file.split('.')[0]}_${suffix}`))
        let itemInfo = {
            id: file.split('.')[0],
            boards: []
        }
        let time = sd.format(new Date(), 'MMDDHHmmss');
        let promises = [];
        let boardsTemp = [];
        for (let i = 0; i < this.ogInfo.total; i++) {
            let bPoint = {
                x: this.ogInfo.firstPoint.x,
                y: this.ogInfo.firstPoint.y + this.ogInfo.spacing * i + (i >= 9 ? 2 : 0),
            };
            let boardId = `${id}_${i}_${time}${suffix}`;
            promises.push(() => {
                return new Promise((resolve) => {
                    ImageUtil.cut(originalPath, path.join(config.processedImagePath, boardId), bPoint.x, bPoint.y, this.ogInfo.boardInfo.width, this.ogInfo.boardInfo.height);
                    boardsTemp.push({
                        file:boardId
                    });
                    resolve();
                })
            });
        }

        return this.sequenceExecutePromise(promises).then(() => {
            itemInfo.boards = boardsTemp;
            console.log(itemInfo);
            return itemInfo;
        });
    }
}