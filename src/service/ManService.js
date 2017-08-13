/**
 * 主处理类
 */
import config from '../config.js';
import path from 'path';
import fs from 'fs';
import ImageUtil from '../utils/ImageUtil.js';
export class ManService {
    constructor() {}
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
        if(!files || files.length===0){
            return;
        }

        let ogInfo = {
            width:1280,
            height:720,
            fvPoint:{
                x:20,
                y:565
            },
            fbPoint:{
                x:20,
                y:612
            },
            spacing:95,
            valueI:{
                width:30,
                height:47
            },
            boardI:{
                width:30,
                height:30
            },
            total:13
        };
        files.forEach(function(file,index) {
            let suffix = '.png';
            let id = `${file.split('.')[0]}_${index}`;
            let iPath = path.join(config.originalImagePath,file),
                resizePath = path.join(config.processedImagePath,`${id}${suffix}`);
            ImageUtil.resize(iPath,resizePath,ogInfo.width,ogInfo.height);
            let itemInfo = {
                id:id,
                boards:[]
            }
            for(let i =0;i<ogInfo.total;i++){
                let vPoint = {
                    x:ogInfo.fvPoint.x + ogInfo.spacing*i,
                    y:ogInfo.fvPoint.y,
                },bPoint = {
                    x:ogInfo.fbPoint.x + ogInfo.spacing*i,
                    y:ogInfo.fbPoint.y,
                };
                let vFile = path.join(config.processedImagePath,`${id}_${i}_v${suffix}`),
                    bFile = path.join(config.processedImagePath,`${id}_${i}_b${suffix}`);
                ImageUtil.cut(resizePath,vFile,vPoint.x,vPoint.y,ogInfo.valueI.width,ogInfo.valueI.height);
                ImageUtil.cut(resizePath,bFile,bPoint.x,bPoint.y,ogInfo.boardI.width,ogInfo.boardI.height);
                let valueCp = function(path){
                    return 3;
                }
                let boardCp = function(path){
                    let boards = fs.readdirSync(config.boardsImagePath);
                    
                }
                // let value = ;
                // let boards = ;
                itemInfo.boards.push()
            }
        }, this);
        
        
        
        return [{
            value:1,
            suit:0
        }]
    }
}