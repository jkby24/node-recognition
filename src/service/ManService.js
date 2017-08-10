/**
 * 主处理类
 */
import config from '../config.js';
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
            return [{
                value:1,
                suit:0
            }]
    }
}